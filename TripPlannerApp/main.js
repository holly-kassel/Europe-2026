const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const Anthropic = require('@anthropic-ai/sdk');



// Data file path - stored in user's app data directory
const getDataPath = () => {
  const userDataPath = app.getPath('userData');
  return path.join(userDataPath, 'trips-data.json');
};

// Default trips data
const defaultTripsData = {
  trips: {},
  settings: {
    lastOpenedTrip: null,
    theme: 'light'
  }
};

// Load trips from file
function loadTrips() {
  const dataPath = getDataPath();
  try {
    if (fs.existsSync(dataPath)) {
      const data = fs.readFileSync(dataPath, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading trips:', error);
  }
  return defaultTripsData;
}

// Save trips to file
function saveTrips(data) {
  const dataPath = getDataPath();
  try {
    const dirPath = path.dirname(dataPath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving trips:', error);
    return false;
  }
}

// Create the main window
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    titleBarStyle: 'hiddenInset',
    trafficLightPosition: { x: 15, y: 15 },
    icon: path.join(__dirname, 'src/helen.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.loadFile('src/index.html');

  // Open DevTools in development
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }
}

// App ready
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed (except on macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC Handlers

// Load all trips data
ipcMain.handle('trips:load', async () => {
  return loadTrips();
});

// Save all trips data
ipcMain.handle('trips:save', async (event, data) => {
  return saveTrips(data);
});

// Add or update a trip
ipcMain.handle('trips:upsert', async (event, tripId, tripData) => {
  const data = loadTrips();
  data.trips[tripId] = {
    ...tripData,
    lastModified: new Date().toISOString()
  };
  return saveTrips(data);
});

// Delete a trip
ipcMain.handle('trips:delete', async (event, tripId) => {
  const data = loadTrips();
  delete data.trips[tripId];
  return saveTrips(data);
});

// Export trip to JSON file
ipcMain.handle('trips:export', async (event, tripId) => {
  const data = loadTrips();
  const trip = data.trips[tripId];

  if (!trip) {
    return { success: false, error: 'Trip not found' };
  }

  const { filePath } = await dialog.showSaveDialog({
    defaultPath: `${trip.trip?.name || tripId}.json`,
    filters: [{ name: 'JSON Files', extensions: ['json'] }]
  });

  if (filePath) {
    try {
      fs.writeFileSync(filePath, JSON.stringify(trip, null, 2));
      return { success: true, filePath };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  return { success: false, error: 'Cancelled' };
});

// Import trip from JSON file
ipcMain.handle('trips:import', async () => {
  const { filePaths } = await dialog.showOpenDialog({
    filters: [{ name: 'JSON Files', extensions: ['json'] }],
    properties: ['openFile']
  });

  if (filePaths && filePaths.length > 0) {
    try {
      const content = fs.readFileSync(filePaths[0], 'utf8');
      const tripData = JSON.parse(content);
      return { success: true, data: tripData };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  return { success: false, error: 'Cancelled' };
});

// Get app version
ipcMain.handle('app:version', () => {
  return app.getVersion();
});

// Get data file path (for debugging)
ipcMain.handle('app:dataPath', () => {
  return getDataPath();
});

// --- API Key Management ---
const getSettingsPath = () => {
  const userDataPath = app.getPath('userData');
  return path.join(userDataPath, 'settings.json');
};

function loadSettings() {
  try {
    const settingsPath = getSettingsPath();
    if (fs.existsSync(settingsPath)) {
      return JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
    }
  } catch (e) {
    console.error('Error loading settings:', e);
  }
  return {};
}

function saveSettings(settings) {
  try {
    const settingsPath = getSettingsPath();
    const dirPath = path.dirname(settingsPath);
    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
    fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
    return true;
  } catch (e) {
    console.error('Error saving settings:', e);
    return false;
  }
}

ipcMain.handle('settings:getApiKey', () => {
  const settings = loadSettings();
  return settings.anthropicApiKey || '';
});

ipcMain.handle('settings:setApiKey', (event, key) => {
  const settings = loadSettings();
  settings.anthropicApiKey = key;
  return saveSettings(settings);
});

// --- Image Storage ---
// Images are stored as files in the workspace images/ folder (sibling to TripPlannerApp)
const getImagesDir = () => {
  // app.getAppPath() is the most reliable way to get the app location in Electron
  const appPath = app.getAppPath();
  const parentDir = path.dirname(appPath);
  
  const candidates = [
    path.join(parentDir, 'images'),                             // Europe-2026/images (sibling to TripPlannerApp)
    path.join(path.dirname(path.resolve(__dirname)), 'images'), // fallback via __dirname
    path.join(process.cwd(), '..', 'images'),                   // fallback via cwd
    path.join(app.getPath('userData'), 'images')                 // last resort: app data
  ];
  
  for (const dir of candidates) {
    if (fs.existsSync(dir)) {
      return dir;
    }
  }
  // Create in first candidate location
  const dir = candidates[0];
  fs.mkdirSync(dir, { recursive: true });
  return dir;
};

ipcMain.handle('images:save', (event, imageId, dataUrl) => {
  try {
    const imagesDir = getImagesDir();
    // If dataUrl is a data URI, save as the appropriate file type
    // Handle PDF data URLs
    const pdfMatch = dataUrl.match(/^data:application\/pdf;base64,(.+)$/);
    if (pdfMatch) {
      const filename = imageId.endsWith('.pdf') ? imageId : `${imageId}.pdf`;
      const buffer = Buffer.from(pdfMatch[1], 'base64');
      fs.writeFileSync(path.join(imagesDir, filename), buffer);
      return { success: true, imageId: filename };
    }
    // Handle image data URLs
    const match = dataUrl.match(/^data:image\/(\w+);base64,(.+)$/);
    if (match) {
      const ext = match[1] === 'jpeg' ? 'jpg' : match[1];
      const filename = imageId.endsWith(`.${ext}`) ? imageId : `${imageId}.${ext}`;
      const buffer = Buffer.from(match[2], 'base64');
      fs.writeFileSync(path.join(imagesDir, filename), buffer);
      return { success: true, imageId: filename };
    } else {
      // Plain data or text — save as .txt
      const filename = imageId.endsWith('.txt') ? imageId : `${imageId}.txt`;
      fs.writeFileSync(path.join(imagesDir, filename), dataUrl, 'utf8');
      return { success: true, imageId: filename };
    }
  } catch (err) {
    console.error('Error saving image:', err);
    return { success: false, error: err.message };
  }
});

ipcMain.handle('images:load', (event, imageId) => {
  try {
    const imagesDir = getImagesDir();
    
    // Try exact match first
    let filePath = path.join(imagesDir, imageId);
    if (fs.existsSync(filePath)) {
      return imageFileToDataUrl(filePath);
    }
    
    // Try with common extensions
    for (const ext of ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.txt']) {
      filePath = path.join(imagesDir, imageId + ext);
      if (fs.existsSync(filePath)) {
        return imageFileToDataUrl(filePath);
      }
    }
    
    // Try finding by partial match (for flexibility)
    const files = fs.readdirSync(imagesDir);
    const match = files.find(f => f.startsWith(imageId) || f.replace(/\.\w+$/, '') === imageId);
    if (match) {
      return imageFileToDataUrl(path.join(imagesDir, match));
    }
    
    console.log('[images:load] not found:', imageId);
    return { success: false, error: 'Image not found: ' + imageId };
  } catch (err) {
    console.error('[images:load] error:', err.message);
    return { success: false, error: err.message };
  }
});

ipcMain.handle('files:open', (event, fileName) => {
  const { shell } = require('electron');
  const imagesDir = getImagesDir();
  const filePath = path.join(imagesDir, fileName);
  if (fs.existsSync(filePath)) {
    shell.openPath(filePath);
    return { success: true };
  }
  return { success: false, error: 'File not found' };
});

function imageFileToDataUrl(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === '.txt') {
    // Already stored as data URL text
    const dataUrl = fs.readFileSync(filePath, 'utf8');
    const isPdf = dataUrl.startsWith('data:application/pdf');
    return { success: true, dataUrl, isPdf, fileName: isPdf ? path.basename(filePath, '.txt') + '.pdf' : path.basename(filePath) };
  }
  if (ext === '.pdf') {
    // PDF file — return base64 data URL with pdf mime type
    const buffer = fs.readFileSync(filePath);
    const dataUrl = `data:application/pdf;base64,${buffer.toString('base64')}`;
    return { success: true, dataUrl, isPdf: true, fileName: path.basename(filePath) };
  }
  // Binary image file — convert to data URL
  const mimeTypes = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.gif': 'image/gif' };
  const mime = mimeTypes[ext] || 'image/png';
  const buffer = fs.readFileSync(filePath);
  const dataUrl = `data:${mime};base64,${buffer.toString('base64')}`;
  return { success: true, dataUrl };
}

// --- Image Parsing with Claude Vision ---
ipcMain.handle('ai:parseImage', async (event, imageBase64, mediaType, tripData) => {
  const settings = loadSettings();
  const apiKey = settings.anthropicApiKey;

  if (!apiKey) {
    return { success: false, error: 'No API key configured. Go to Settings to add your Anthropic API key.' };
  }

  try {
    const client = new Anthropic({ apiKey });

    const systemPrompt = `You are a travel itinerary assistant. You analyze images of travel bookings, confirmations, and reservations and extract structured data from them.

The user has a trip with the following structure:
${JSON.stringify(tripData, null, 2)}

When you see an image, extract ALL relevant travel information and return a JSON object with the following structure:
{
  "type": "flight" | "train" | "hotel" | "restaurant" | "activity" | "event" | "unknown",
  "summary": "Brief human-readable description of what was found",
  "data": {
    // For flights:
    "airline": "", "flightNumber": "", "confirmation": "", "date": "YYYY-MM-DD",
    "from": "", "fromCode": "", "to": "", "toCode": "",
    "departTime": "", "arriveTime": "", "duration": "",
    "class": "", "seats": "", "terminal": "", "aircraft": "",
    "passengers": [],
    "status": "Booked"

    // For trains:
    "operator": "", "confirmation": "", "date": "YYYY-MM-DD",
    "from": "", "to": "", "via": "",
    "departTime": "", "arriveTime": "", "duration": "",
    "seats": "", "cost": "",
    "status": "Booked"

    // For hotels:
    "name": "", "address": "", "phone": "",
    "checkIn": "YYYY-MM-DD", "checkOut": "YYYY-MM-DD",
    "confirmation": "", "room": "", "cost": "",
    "nights": 0, "guests": 0,
    "status": "Booked"

    // For restaurants/activities/events:
    "name": "", "date": "YYYY-MM-DD", "time": "",
    "location": "", "confirmation": "", "cost": "",
    "category": "", "notes": ""
  },
  "suggestedDestination": "paris" | "rome-first" | "sorrento" | "rome-second" | null,
  "suggestedAction": "add_flight" | "update_flight" | "add_train" | "update_train" | "update_hotel" | "add_activity" | "add_restaurant" | "add_event"
}

IMPORTANT:
- Only include fields that you can actually read from the image
- Use the trip data context to match destinations by date ranges
- Return ONLY valid JSON, no markdown fences, no extra text
- If you can read multiple bookings from one image, return an array of objects
- Dates should be in YYYY-MM-DD format when possible`;

    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: mediaType,
                data: imageBase64
              }
            },
            {
              type: 'text',
              text: 'Please analyze this travel-related image and extract all booking/reservation details. Return structured JSON as specified.'
            }
          ]
        }
      ],
      system: systemPrompt
    });

    const responseText = response.content[0].text.trim();

    // Try to parse as JSON (handle possible markdown fences)
    let parsed;
    try {
      const jsonStr = responseText.replace(/^```(?:json)?\n?/gm, '').replace(/```$/gm, '').trim();
      parsed = JSON.parse(jsonStr);
    } catch (parseErr) {
      return { success: false, error: 'Could not parse AI response as JSON', raw: responseText };
    }

    return { success: true, result: parsed };
  } catch (err) {
    console.error('AI parsing error:', err);
    return { success: false, error: err.message || 'Unknown error calling Claude API' };
  }
});

// --- PDF Parsing with Claude ---
ipcMain.handle('ai:parsePdf', async (event, pdfBase64, tripData) => {
  const settings = loadSettings();
  const apiKey = settings.anthropicApiKey;

  if (!apiKey) {
    return { success: false, error: 'No API key configured. Go to Settings to add your Anthropic API key.' };
  }

  try {
    // Extract text from PDF (lazy-load to avoid DOMMatrix error at startup)
    const pdfParse = require('pdf-parse');
    const pdfBuffer = Buffer.from(pdfBase64, 'base64');
    const pdfData = await pdfParse(pdfBuffer);
    const pdfText = pdfData.text;

    if (!pdfText || pdfText.trim().length === 0) {
      return { success: false, error: 'Could not extract any text from the PDF. The file may be image-based — try uploading a screenshot instead.' };
    }

    const client = new Anthropic({ apiKey });

    const systemPrompt = `You are a travel itinerary assistant. You analyze text extracted from travel booking PDFs, confirmations, and reservations and extract structured data from them.

The user has a trip with the following structure:
${JSON.stringify(tripData, null, 2)}

When you see extracted PDF text, extract ALL relevant travel information and return a JSON object with the following structure:
{
  "type": "flight" | "train" | "hotel" | "restaurant" | "activity" | "event" | "unknown",
  "summary": "Brief human-readable description of what was found",
  "data": {
    // For flights:
    "airline": "", "flightNumber": "", "confirmation": "", "date": "YYYY-MM-DD",
    "from": "", "fromCode": "", "to": "", "toCode": "",
    "departTime": "", "arriveTime": "", "duration": "",
    "class": "", "seats": "", "terminal": "", "aircraft": "",
    "passengers": [],
    "status": "Booked"

    // For trains:
    "operator": "", "confirmation": "", "date": "YYYY-MM-DD",
    "from": "", "to": "", "via": "",
    "departTime": "", "arriveTime": "", "duration": "",
    "seats": "", "cost": "",
    "status": "Booked"

    // For hotels:
    "name": "", "address": "", "phone": "",
    "checkIn": "YYYY-MM-DD", "checkOut": "YYYY-MM-DD",
    "confirmation": "", "room": "", "cost": "",
    "nights": 0, "guests": 0,
    "status": "Booked"

    // For restaurants/activities/events:
    "name": "", "date": "YYYY-MM-DD", "time": "",
    "location": "", "confirmation": "", "cost": "",
    "category": "", "notes": ""
  },
  "suggestedDestination": "paris" | "rome-first" | "sorrento" | "rome-second" | null,
  "suggestedAction": "add_flight" | "update_flight" | "add_train" | "update_train" | "update_hotel" | "add_activity" | "add_restaurant" | "add_event"
}

IMPORTANT:
- Only include fields that you can actually read from the text
- Use the trip data context to match destinations by date ranges
- Return ONLY valid JSON, no markdown fences, no extra text
- If you can read multiple bookings from the text, return an array of objects
- Dates should be in YYYY-MM-DD format when possible`;

    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: `Please analyze this text extracted from a travel-related PDF and extract all booking/reservation details. Return structured JSON as specified.\n\n--- PDF Text ---\n${pdfText}\n--- End PDF Text ---`
        }
      ],
      system: systemPrompt
    });

    const responseText = response.content[0].text.trim();

    let parsed;
    try {
      const jsonStr = responseText.replace(/^```(?:json)?\n?/gm, '').replace(/```$/gm, '').trim();
      parsed = JSON.parse(jsonStr);
    } catch (parseErr) {
      return { success: false, error: 'Could not parse AI response as JSON', raw: responseText };
    }

    return { success: true, result: parsed };
  } catch (err) {
    console.error('AI PDF parsing error:', err);
    return { success: false, error: err.message || 'Unknown error parsing PDF' };
  }
});

// --- AI Quick Add ---
ipcMain.handle('ai:quickAdd', async (event, userText, tripData) => {
  const settings = loadSettings();
  const apiKey = settings.anthropicApiKey;

  if (!apiKey) {
    return { success: false, error: 'No API key configured. Go to Settings to add your Anthropic API key.' };
  }

  try {
    const client = new Anthropic({ apiKey });

    const systemPrompt = `You are a travel itinerary assistant. The user is adding something to their trip using natural language. Interpret what they want to add and return structured JSON.

The user's trip:
${JSON.stringify(tripData, null, 2)}

Return a JSON object with this structure:
{
  "type": "restaurant" | "activity" | "event",
  "name": "Properly formatted name",
  "category": "food" | "culture" | "nature" | "nightlife" | "shopping" | "relaxation" | "activity",
  "suggestedDestination": "destination-id or null",
  "date": "YYYY-MM-DD or null",
  "time": "HH:MM or null",
  "eventType": "dining" | "opera" | "concert" | "day-trip" | "exhibition" | "festival" | "show" | "activity" | null,
  "note": "any extra context from what the user said, or null",
  "confidence": "high" | "medium" | "low"
}

Guidelines:
- Infer the type from context: if it's a restaurant/cafe/bar, use "restaurant". If it's a museum, landmark, tour, hike, etc., use "activity". If they mention a specific date/time or it's a ticketed show/performance/event, use "event".
- Clean up and properly capitalize the name (e.g., "louvre museum" → "Musée du Louvre", "try some pizza" → relevant local restaurant).
- Use the trip's destinations to suggest which destination this belongs to. Match by city name, date range, or contextual clues.
- If the user mentions a date or day ("on April 25th", "saturday"), convert it to YYYY-MM-DD using the trip dates.
- If the user mentions a time ("at 7pm", "evening"), convert to 24h format.
- For events, infer eventType from context.
- Return ONLY valid JSON, no markdown fences, no extra text.`;

    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: userText
        }
      ],
      system: systemPrompt
    });

    const responseText = response.content[0].text.trim();

    let parsed;
    try {
      const jsonStr = responseText.replace(/^```(?:json)?\n?/gm, '').replace(/```$/gm, '').trim();
      parsed = JSON.parse(jsonStr);
    } catch (parseErr) {
      return { success: false, error: 'Could not parse AI response', raw: responseText };
    }

    return { success: true, result: parsed };
  } catch (err) {
    console.error('AI quick add error:', err);
    return { success: false, error: err.message || 'Unknown error' };
  }
});

// --- AI Discover Events ---
ipcMain.handle('ai:discoverEvents', async (event, city, country, dates, tripData) => {
  const settings = loadSettings();
  const apiKey = settings.anthropicApiKey;

  if (!apiKey) {
    return { success: false, error: 'No API key configured. Go to Settings to add your Anthropic API key.' };
  }

  try {
    const client = new Anthropic({ apiKey });

    const systemPrompt = `You are a knowledgeable travel concierge. The user is visiting ${city}, ${country} during ${dates}. Suggest interesting events, experiences, and things happening during their visit.

Consider:
- Seasonal events, festivals, and holidays during their dates
- Notable exhibitions at museums/galleries
- Concerts, theater, opera performances
- Food festivals or markets
- Local cultural events
- Unique experiences specific to the destination and time of year

Return a JSON array of 5-8 suggestions. Each item:
{
  "name": "Event or experience name",
  "type": "event" | "activity" | "restaurant",
  "category": "culture" | "food" | "nature" | "nightlife" | "activity" | "festival" | "exhibition",
  "eventType": "dining" | "opera" | "concert" | "day-trip" | "exhibition" | "festival" | "show" | "activity" | null,
  "description": "1-2 sentence description of why this is worth doing",
  "date": "YYYY-MM-DD if specific, or null for anytime during visit",
  "time": "HH:MM if relevant, or null",
  "tip": "A short insider tip or practical note (optional)",
  "confidence": "high" | "medium"
}

Guidelines:
- Focus on things actually happening during their dates, not generic tourist attractions
- Be specific: real venue names, real events when possible
- Mix different categories for variety
- Return ONLY valid JSON array, no markdown fences`;

    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2048,
      messages: [
        {
          role: 'user',
          content: `I'm visiting ${city}, ${country} during ${dates}. What interesting events, experiences, or things should I check out during my visit? Here's my full trip for context:\n${JSON.stringify(tripData, null, 2)}`
        }
      ],
      system: systemPrompt
    });

    const responseText = response.content[0].text.trim();

    let parsed;
    try {
      const jsonStr = responseText.replace(/^```(?:json)?\n?/gm, '').replace(/```$/gm, '').trim();
      parsed = JSON.parse(jsonStr);
    } catch (parseErr) {
      return { success: false, error: 'Could not parse AI response', raw: responseText };
    }

    return { success: true, result: Array.isArray(parsed) ? parsed : [parsed] };
  } catch (err) {
    console.error('AI discover events error:', err);
    return { success: false, error: err.message || 'Unknown error' };
  }
});
