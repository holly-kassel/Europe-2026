// Trip Planner Desktop App
// Pure JavaScript implementation for Electron

// Default trip data
const defaultTrips = {
  'mexico-costa-rica-2026': {
    trip: {
      id: 'mexico-costa-rica-2026',
      name: 'Mexico & Costa Rica 2026',
      subtitle: 'Sweet Retreat + Costa Rica',
      emoji: '🌴',
      startDate: '2026-08-07',
      endDate: '2026-08-22',
      duration: 16,
      travelers: ['Holly']
    },
    flights: [
      { id: 'outbound', date: '2026-08-07', from: 'Home', fromCode: 'TBD', to: 'Mexico City', toCode: 'MEX', airline: 'TBD' },
      { id: 'internal', date: '2026-08-08', from: 'Mexico City', fromCode: 'MEX', to: 'Puerto Escondido', toCode: 'PXM', airline: 'TBD' },
      { id: 'connection', date: '2026-08-15', from: 'Puerto Escondido', fromCode: 'PXM', to: 'San José', toCode: 'SJO', airline: 'TBD' },
      { id: 'return', date: '2026-08-22', from: 'San José', fromCode: 'SJO', to: 'Home', toCode: 'TBD', airline: 'TBD' }
    ],
    trains: [],
    destinations: [
      {
        id: 'mexico-city',
        city: 'Mexico City',
        country: 'Mexico',
        flag: '🇲🇽',
        dates: 'Aug 7-8',
        nights: 1,
        color: 'emerald',
        accommodation: { status: 'TBD' },
        highlights: ['Arrival day exploration', 'Pre-retreat preparation'],
        thingsToDo: [],
        restaurants: []
      },
      {
        id: 'sweet-retreat',
        city: 'Puerto Escondido',
        country: 'Mexico',
        flag: '🇲🇽',
        dates: 'Aug 8-15',
        nights: 7,
        color: 'pink',
        type: 'retreat',
        retreatName: 'Sweet Retreat - Aerial Silks',
        accommodation: { status: 'Included', name: 'Sweet Retreat' },
        highlights: ['Aerial silks training', 'Intensive workshop', 'Beach town vibes', 'Oaxacan cuisine'],
        thingsToDo: [],
        restaurants: []
      },
      {
        id: 'la-fortuna',
        city: 'La Fortuna',
        country: 'Costa Rica',
        flag: '🇨🇷',
        dates: 'Aug 15-18',
        nights: 3,
        color: 'blue',
        accommodation: { status: 'TBD' },
        highlights: ['Arenal Volcano', 'Hot springs', 'La Fortuna Waterfall'],
        thingsToDo: [
          { name: 'Arenal Volcano National Park', category: 'nature' },
          { name: 'Tabacón Hot Springs', category: 'relaxation' },
          { name: 'La Fortuna Waterfall', category: 'nature' },
          { name: 'Hanging Bridges', category: 'nature' }
        ],
        restaurants: []
      },
      {
        id: 'manuel-antonio',
        city: 'Manuel Antonio',
        country: 'Costa Rica',
        flag: '🇨🇷',
        dates: 'Aug 18-22',
        nights: 4,
        color: 'orange',
        accommodation: { status: 'TBD' },
        highlights: ['Manuel Antonio National Park', 'Beautiful beaches', 'Wildlife spotting'],
        thingsToDo: [
          { name: 'Manuel Antonio National Park', category: 'nature' },
          { name: 'Beach time', category: 'relaxation' },
          { name: 'Wildlife spotting', category: 'nature' }
        ],
        restaurants: []
      }
    ],
    carRental: {
      dates: 'Aug 15-22',
      route: 'La Fortuna ↔ Manuel Antonio',
      vehicle: '4WD recommended'
    }
  },
  'europe-2026': {
    trip: {
      id: 'europe-2026',
      name: 'Europe 2026',
      subtitle: "Aubrey's Wedding",
      emoji: '🏰',
      startDate: '2026-04-21',
      endDate: '2026-05-04',
      duration: 14,
      travelers: ['Holly', 'Phil']
    },
    flights: [
      { id: 'outbound', date: '2026-04-21', from: 'Chicago', fromCode: 'ORD', to: 'Paris', toCode: 'CDG', airline: 'Delta DL8757 (Air France)', flightNumber: 'DL8757', aircraft: 'Airbus A350-900', class: 'Premium (A)', departTime: '5:10pm', arriveTime: '8:15am +1', arriveDate: '2026-04-22', duration: '8h 5m', terminal: 'Terminal 5', seats: '18A, 18B', confirmation: 'HPQVMQ', status: 'Booked' },
      { id: 'return', date: '2026-05-04', from: 'Rome', fromCode: 'FCO', to: 'Chicago', toCode: 'ORD', airline: 'American AA 267', flightNumber: 'AA267', class: 'Economy', departTime: '11:05am', arriveTime: '2:30pm', duration: '10h 25m', seats: '11A, 11B', confirmation: 'ADHASP', status: 'Booked' }
    ],
    trains: [
      { id: 'paris-milan', date: '2026-04-27', from: 'Paris Gare de Lyon', to: 'Milano Porta Garibaldi', departTime: '06:45', arriveTime: '13:50', duration: '7h 5m', operator: 'TGV INOUI', confirmation: 'DUUFUK', cost: '$269.48', status: 'Booked' },
      { id: 'milan-rome', date: '2026-04-27', from: 'Milano Centrale', to: 'Roma Termini', departTime: '15:00', arriveTime: '18:15', duration: '3h 15m', operator: 'Frecciarossa', confirmation: 'Y3MXSN', cost: '$620.31', status: 'Booked' },
      { id: 'rome-naples', date: '2026-04-29', from: 'Rome', to: 'Naples', via: null, departTime: '11:35', arriveTime: '12:48', duration: '1h 13m', operator: 'Trenitalia FR 9405', confirmation: 'AFLZ35', seats: 'Carriage 1, Seats 3D & 4D', status: 'Booked' },
      { id: 'sorrento-rome', date: '2026-05-03', from: 'Sorrento', to: 'Roma Termini', via: 'Naples', status: 'Not booked' }
    ],
    events: [
      { id: 'arpege', date: '2026-04-24', time: '19:30', name: 'Dinner @ Arpège', type: 'dining', status: 'Booked' },
      { id: 'satyagraha', date: '2026-04-25', time: '14:30', name: 'Satyagraha @ Palais Garnier', type: 'opera', tickets: ['Holly Kassel', 'Philip Kassel'], status: 'Booked' },
      { id: 'versailles', name: 'Palace of Versailles', type: 'day-trip', note: '30 min train ride outside Paris', status: 'Planned' }
    ],
    destinations: [
      {
        id: 'paris',
        city: 'Paris',
        country: 'France',
        flag: '🇫🇷',
        dates: 'Apr 22-27',
        nights: 5,
        neighborhood: 'Latin Quarter (5th arr)',
        color: 'blue',
        accommodation: { status: 'Researching', name: 'Hôtel des Grands Hommes', note: '5th arr Latin Quarter — not yet booked' },
        highlights: ['Latin Quarter', 'Opera at Palais Garnier', 'Dinner at Arpège', 'Museums & medieval history', 'Spring festivals', 'Palace of Versailles'],
        thingsToDo: [
          { name: 'The Panthéon', category: 'culture' },
          { name: 'Shakespeare and Company Bookstore', category: 'culture' },
          { name: 'Musée de Cluny (Medieval Museum)', category: 'culture' },
          { name: 'Arènes de Lutèce (Roman amphitheater)', category: 'culture' },
          { name: 'Jardin du Luxembourg', category: 'nature' },
          { name: 'Rue Mouffetard Market', category: 'food' },
          { name: 'Medieval Street Wandering (Rue de la Huchette)', category: 'culture' },
          { name: 'Palace of Versailles (day trip)', category: 'culture' },
          { name: 'Check concert/show schedules Apr 23-27', category: 'activity' },
          { name: 'Explore art exhibitions (Louvre, Orsay, Pompidou)', category: 'culture' },
          { name: 'Spring festivals (Tuileries, La Villette, Jazz)', category: 'activity' }
        ],
        restaurants: [
          { name: 'Arpège', category: 'Michelin — BOOKED (Day 3, 7:30pm)' },
          { name: 'La Petite Périgourdine', category: 'Classic French, €€' },
          { name: 'Le Petit Prince de Paris', category: 'French (1450 building), €€-€€€' },
          { name: 'Bistro des Augustins', category: 'French bistro, €€' },
          { name: "Tour d'Argent", category: 'Michelin, €€€€ — pressed duck, Notre-Dame views' },
          { name: 'Alliance', category: 'Contemporary French tasting, €€€' },
          { name: "L'Atelier Artisan Crêpier Mouffetard", category: 'Crêpes, €' },
          { name: 'Les Papilles', category: 'Market-to-table, €€' },
          { name: 'Le Méchoui du Prince', category: 'Moroccan, €€' },
          { name: 'Blueberry Maki Bar', category: 'Fusion sushi, €€' },
          { name: 'Figue et Olive', category: 'Tunisian-Italian fusion, €€' }
        ]
      },
      {
        id: 'rome-first',
        city: 'Rome',
        country: 'Italy',
        flag: '🇮🇹',
        dates: 'Apr 27-29',
        nights: 2,
        color: 'orange',
        stay: 'First Stay',
        neighborhood: 'Monti',
        accommodation: { status: 'Booked', name: 'The Fifteen Keys Hotel', address: 'Via Urbana 6-7, Roma 00184', confirmation: '149666136148642851​00', cost: '$936.20', bookedVia: 'Booking.com' },
        highlights: ['Monti neighborhood', 'Explore the city'],
        thingsToDo: [],
        restaurants: []
      },
      {
        id: 'sorrento',
        city: 'Sorrento',
        country: 'Italy',
        flag: '🇮🇹',
        dates: 'Apr 29-May 3',
        nights: 4,
        color: 'emerald',
        accommodation: { status: 'Booked', name: 'Accademia 39', address: '39 Via Accademia, 80067 Sorrento', phone: '+39 081 1837 3229', room: 'Superior Double Room', cost: '€1,506.78', note: 'Non-refundable', checkInTime: '2:00-8:00 PM', checkOutTime: '8:00-10:30 AM' },
        highlights: ["Aubrey's Wedding", 'Amalfi Coast', 'Limoncello'],
        thingsToDo: [],
        restaurants: []
      },
      {
        id: 'rome-second',
        city: 'Rome',
        country: 'Italy',
        flag: '🇮🇹',
        dates: 'May 3-4',
        nights: 1,
        color: 'orange',
        stay: 'Second Stay',
        accommodation: { status: 'TBD' },
        highlights: ['Final night before departure'],
        thingsToDo: [],
        restaurants: []
      }
    ],
    carRental: null
  }
};

const categoryIcons = {
  nature: '🌿',
  relaxation: '♨️',
  food: '🍽️',
  activity: '🎯',
  culture: '🏛️'
};

// App State
let state = {
  trips: {},
  currentTripId: null,
  expandedCards: {},
  showTripSelector: false,
  showAddModal: false,
  showNewTripModal: false,
  showSettingsModal: false,
  showAIResultModal: false,
  showDiscoverEventsModal: false,
  showEditTransportModal: false,
  editTransportItem: null,
  editTransportType: null,
  discoverEventsDestId: null,
  discoverEventsLoading: false,
  discoverEventsResults: null,
  showImageLightbox: false,
  lightboxImageUrl: null,
  lightboxIsPdf: false,
  lightboxPdfName: null,
  lightboxLoading: false,
  aiParsing: false,
  aiResult: null,
  aiImagePreview: null,
  aiPdfName: null,
  aiPdfDataUrl: null,
  aiError: null,
  quickAddExpanded: false,
  quickAddLoading: false,
  selectedDestination: null,
  pendingItem: { name: '', type: 'activity', category: 'activity' },
  dragOver: false
};

// Initialize app
async function init() {
  // Load saved trips from Electron store
  if (window.electronAPI) {
    const savedData = await window.electronAPI.loadTrips();
    if (savedData && savedData.trips && Object.keys(savedData.trips).length > 0) {
      state.trips = savedData.trips;
      state.currentTripId = savedData.settings?.lastOpenedTrip || Object.keys(savedData.trips)[0];
    } else {
      // Load default trips
      state.trips = defaultTrips;
      state.currentTripId = 'mexico-costa-rica-2026';
      await saveTrips();
    }
  } else {
    // Fallback for browser testing
    state.trips = defaultTrips;
    state.currentTripId = 'mexico-costa-rica-2026';
  }

  render();
  setupEventListeners();
}

// Save trips to file
async function saveTrips() {
  if (window.electronAPI) {
    await window.electronAPI.saveTrips({
      trips: state.trips,
      settings: {
        lastOpenedTrip: state.currentTripId
      }
    });
  }
}

// Format date
function formatDate(dateStr) {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// Parse natural language input
function parseNaturalLanguage(text) {
  const lowerText = text.toLowerCase();

  if (['restaurant', 'eat', 'food', 'dinner', 'lunch', 'cafe', 'coffee'].some(w => lowerText.includes(w))) {
    const name = text.replace(/add|to|restaurant|for|dinner|lunch|breakfast|in|at|want|try/gi, '').trim();
    return { name: name || text, type: 'restaurant', category: 'food' };
  } else if (['visit', 'see', 'go to', 'hike', 'tour', 'museum'].some(w => lowerText.includes(w))) {
    const name = text.replace(/add|visit|see|go to|want to|the/gi, '').trim();
    return { name: name || text, type: 'activity', category: lowerText.includes('museum') ? 'culture' : 'nature' };
  } else if (['spa', 'massage', 'relax', 'hot spring'].some(w => lowerText.includes(w))) {
    return { name: text, type: 'activity', category: 'relaxation' };
  }
  return { name: text, type: 'activity', category: 'activity' };
}

// Add item to destination
function addItemToDestination(item, destinationId) {
  const trip = state.trips[state.currentTripId];
  const dest = trip.destinations.find(d => d.id === destinationId);

  if (dest) {
    const entry = { name: item.name, category: item.category };
    if (item.note) entry.note = item.note;
    if (item.type === 'restaurant') {
      dest.restaurants.push(entry);
    } else {
      dest.thingsToDo.push(entry);
    }
    state.expandedCards[destinationId] = true;
    saveTrips();
    render();
  }
}

// Add event to trip
function addEventToTrip(item) {
  const trip = state.trips[state.currentTripId];
  if (!trip.events) trip.events = [];
  const eventId = 'evt-' + Date.now();
  const evt = {
    id: eventId,
    name: item.name,
    date: item.date || '',
    time: item.time || '',
    type: item.eventType || 'activity',
    status: 'Planned',
    note: item.note || ''
  };
  trip.events.push(evt);
  saveTrips();
  render();
}

// Create new trip
function createNewTrip(tripData) {
  const tripId = tripData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();
  state.trips[tripId] = {
    trip: {
      id: tripId,
      name: tripData.name,
      subtitle: tripData.subtitle || '',
      emoji: tripData.emoji || '✈️',
      startDate: tripData.startDate,
      endDate: tripData.endDate,
      duration: Math.ceil((new Date(tripData.endDate) - new Date(tripData.startDate)) / (1000 * 60 * 60 * 24)) + 1,
      travelers: [tripData.traveler || 'Me']
    },
    flights: [],
    trains: [],
    destinations: [],
    carRental: null
  };
  state.currentTripId = tripId;
  saveTrips();
  render();
}

// Delete item from destination
function deleteItem(destinationId, type, index) {
  const trip = state.trips[state.currentTripId];
  const dest = trip.destinations.find(d => d.id === destinationId);

  if (dest) {
    if (type === 'restaurant') {
      dest.restaurants.splice(index, 1);
    } else {
      dest.thingsToDo.splice(index, 1);
    }
    saveTrips();
    render();
  }
}

function deleteEvent(eventIndex) {
  const trip = state.trips[state.currentTripId];
  if (trip.events && eventIndex >= 0 && eventIndex < trip.events.length) {
    trip.events.splice(eventIndex, 1);
    saveTrips();
    render();
  }
}

// SVG Icons
const icons = {
  sparkles: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"/><path d="M5 19l.5 1.5L7 21l-1.5.5L5 23l-.5-1.5L3 21l1.5-.5L5 19z"/><path d="M19 11l.5 1.5L21 13l-1.5.5L19 15l-.5-1.5L17 13l1.5-.5L19 11z"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
  upload: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>',
  plane: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>',
  train: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="3" width="16" height="16" rx="2"/><path d="M4 11h16"/><path d="M12 3v8"/><path d="M8 19l-2 3"/><path d="M16 19l2 3"/><circle cx="8" cy="15" r="1"/><circle cx="16" cy="15" r="1"/></svg>',
  car: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2"/><circle cx="6.5" cy="16.5" r="2.5"/><circle cx="16.5" cy="16.5" r="2.5"/></svg>',
  mapPin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  chevronRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>',
  chevronDown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>',
  globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
  utensils: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/></svg>',
  settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>',
  ai: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a4 4 0 0 1 4 4v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2V6a4 4 0 0 1 4-4z"/><circle cx="9" cy="13" r="1"/><circle cx="15" cy="13" r="1"/><path d="M9 17h6"/></svg>',
  image: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>',
  camera: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>'
};

// Toast notification system
function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('toast-visible'));
  setTimeout(() => {
    toast.classList.remove('toast-visible');
    toast.addEventListener('transitionend', () => toast.remove());
  }, 3000);
}

// Render the app
function render() {
  const tripData = state.trips[state.currentTripId];

  if (!tripData) {
    document.getElementById('root').innerHTML = renderEmptyState();
    return;
  }

  const html = `
    <div class="app">
      ${window.electronAPI?.platform === 'darwin' ? '<div class="titlebar"><span class="titlebar-title">Trip Planner</span></div>' : ''}

      <header class="header">
        <div class="header-content">
          <button class="trip-selector-btn" onclick="openTripSelector()">
            ${tripData.trip.emoji}
          </button>
          <div class="header-info">
            <h1 class="header-title">
              ${tripData.trip.name}
              <button class="header-chevron-btn" onclick="openTripSelector()">
                ${icons.chevronDown}
              </button>
            </h1>
            <p class="header-subtitle">${tripData.trip.subtitle}</p>
          </div>
          <div class="header-dates">
            <div class="header-dates-main">${formatDate(tripData.trip.startDate)} - ${formatDate(tripData.trip.endDate)}</div>
            <div class="header-dates-sub">${tripData.trip.duration} days</div>
          </div>
          <button class="header-settings-btn" onclick="openSettingsModal()" title="Settings">
            ${icons.settings}
          </button>
        </div>
      </header>

      <main class="main-content">
        ${renderQuickAdd()}
        ${renderTimeline(tripData)}
        ${renderTransport(tripData)}
        ${renderDestinations(tripData)}
      </main>

      ${state.showTripSelector ? renderTripSelectorModal() : ''}
      ${state.showAddModal ? renderAddModal(tripData) : ''}
      ${state.showNewTripModal ? renderNewTripModal() : ''}
      ${state.showSettingsModal ? renderSettingsModal() : ''}
      ${state.showEditTransportModal ? renderEditTransportModal() : ''}
      ${state.showImageLightbox ? renderImageLightbox() : ''}
      ${state.showAIResultModal || state.aiParsing ? renderAIResultModal() : ''}
      ${state.showDiscoverEventsModal ? renderDiscoverEventsModal() : ''}
    </div>
  `;

  document.getElementById('root').innerHTML = html;

  // After DOM is painted, set lightbox image src directly (avoids huge data URL in innerHTML)
  if (state.showImageLightbox && state.lightboxImageUrl && !state.lightboxLoading && !state.lightboxIsPdf) {
    const img = document.getElementById('lightboxImg');
    if (img) img.src = state.lightboxImageUrl;
  }
}

function renderEmptyState() {
  return `
    <div class="app">
      <div class="empty-state">
        <div class="empty-state-icon">✈️</div>
        <h2 class="empty-state-title">No trips yet</h2>
        <p class="empty-state-desc">Create your first trip to get started!</p>
        <button class="empty-state-btn" onclick="openNewTripModal()">
          ${icons.plus} Create Trip
        </button>
      </div>
      ${state.showNewTripModal ? renderNewTripModal() : ''}
    </div>
  `;
}

function renderQuickAdd() {
  return `
    <div class="quick-add-bar"
         ondragover="handleDragOver(event)"
         ondragleave="handleDragLeave(event)"
         ondrop="handleDrop(event)">
      <div class="quick-add-row ${state.dragOver ? 'drag-over' : ''} ${state.quickAddLoading ? 'loading' : ''}">
        <input type="text" class="quick-add-input" id="quickAddInput"
               placeholder="${state.quickAddLoading ? 'Helen is asking Claude...' : 'Add anything — \"dinner near Montmartre\", \"visit the Louvre on Apr 24\"...'}"
               onkeydown="if(event.key==='Enter')handleQuickAdd()"
               ${state.quickAddLoading ? 'disabled' : ''}>
        <label class="quick-add-upload-btn" title="Upload screenshot or PDF">
          ${icons.image}
          <input type="file" accept="image/*,application/pdf" style="display:none" onchange="handleFileUpload(event)">
        </label>
        <button class="quick-add-btn" onclick="handleQuickAdd()" ${state.quickAddLoading ? 'disabled' : ''}>
          ${state.quickAddLoading ? '<div class="quick-add-spinner" title="Helen in action"></div>' : icons.plus}
        </button>
      </div>
    </div>
  `;
}

// ======== Day-by-Day Timeline ========

function getDaysBetween(startDate, endDate) {
  const days = [];
  const start = new Date(startDate + 'T00:00:00');
  const end = new Date(endDate + 'T00:00:00');
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    days.push(new Date(d));
  }
  return days;
}

function formatTimelineDate(date) {
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${dayNames[date.getDay()]}, ${monthNames[date.getMonth()]} ${date.getDate()}`;
}

function getDateString(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}



function buildTimelineItems(tripData, dateStr) {
  const items = [];

  // Flights on this date (departing or arriving)
  (tripData.flights || []).forEach(f => {
    if (f.date === dateStr) {
      items.push({
        time: f.departTime || '',
        icon: '✈️',
        label: `${f.airline || ''} ${f.flightNumber || ''} — ${f.fromCode || f.from} → ${f.toCode || f.to}`.trim(),
        detail: f.seats ? `Seats ${f.seats}` : '',
        status: f.status || 'TBD',
        type: 'flight',
        confirmation: f.confirmation,
        sourceImageId: f.sourceImageId
      });
    }
    // Also show arrival if different date
    if (f.arriveDate === dateStr && f.arriveDate !== f.date) {
      items.push({
        time: f.arriveTime || '',
        icon: '🛬',
        label: `Arrive ${f.toCode || f.to} — ${f.airline || ''} ${f.flightNumber || ''}`.trim(),
        status: f.status || 'TBD',
        type: 'flight'
      });
    }
  });

  // Trains on this date
  (tripData.trains || []).forEach(t => {
    if (t.date === dateStr) {
      items.push({
        time: t.departTime || '',
        icon: '🚆',
        label: `${t.operator || 'Train'} — ${t.from} → ${t.to}`,
        detail: t.seats || '',
        status: t.status || 'TBD',
        type: 'train',
        confirmation: t.confirmation,
        sourceImageId: t.sourceImageId
      });
    }
  });

  // Events on this date
  (tripData.events || []).forEach(evt => {
    if (evt.date === dateStr) {
      const eventIcons = { dining: '🍽️', opera: '🎭', 'day-trip': '🏰', show: '🎪', concert: '🎵', festival: '🎉', exhibition: '🖼️' };
      items.push({
        time: evt.time || '',
        icon: eventIcons[evt.type] || '📅',
        label: evt.name,
        detail: evt.note || '',
        status: evt.status || 'Planned',
        type: 'event',
        sourceImageId: evt.sourceImageId
      });
    }
  });

  // Check-in / check-out for destinations
  (tripData.destinations || []).forEach(dest => {
    // We need to parse dest.dates (e.g. "Apr 22-27", "Apr 29 - May 3")
    const destDates = parseDestDates(dest.dates, tripData.trip.startDate);
    if (destDates) {
      if (destDates.checkIn === dateStr) {
        items.push({
          time: dest.accommodation?.checkInTime || '',
          icon: '🏨',
          label: `Check in: ${dest.accommodation?.name || dest.city}`,
          detail: dest.neighborhood || '',
          status: dest.accommodation?.status || 'TBD',
          type: 'accommodation',
          sourceImageId: dest.accommodation?.sourceImageId
        });
      }
      if (destDates.checkOut === dateStr) {
        items.push({
          time: dest.accommodation?.checkOutTime || '',
          icon: '🧳',
          label: `Check out: ${dest.accommodation?.name || dest.city}`,
          status: dest.accommodation?.status || 'TBD',
          type: 'accommodation'
        });
      }
    }
  });

  // Sort by time
  items.sort((a, b) => {
    if (!a.time && !b.time) return 0;
    if (!a.time) return 1;
    if (!b.time) return -1;
    return a.time.localeCompare(b.time);
  });

  return items;
}

function parseDestDates(datesStr, tripStartDate) {
  if (!datesStr) return null;
  // Parse formats: "Apr 22-27", "Apr 27-29", "Apr 29 - May 3", "May 3-4"
  const tripYear = new Date(tripStartDate + 'T00:00:00').getFullYear();
  const months = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11 };

  // Try "Mon D-D" format
  let match = datesStr.match(/^(\w+)\s+(\d+)\s*-\s*(\d+)$/i);
  if (match) {
    const month = months[match[1].toLowerCase().substring(0, 3)];
    if (month !== undefined) {
      const checkIn = new Date(tripYear, month, parseInt(match[2]));
      const checkOut = new Date(tripYear, month, parseInt(match[3]));
      return { checkIn: getDateString(checkIn), checkOut: getDateString(checkOut) };
    }
  }

  // Try "Mon D - Mon D" format
  match = datesStr.match(/^(\w+)\s+(\d+)\s*-\s*(\w+)\s+(\d+)$/i);
  if (match) {
    const month1 = months[match[1].toLowerCase().substring(0, 3)];
    const month2 = months[match[3].toLowerCase().substring(0, 3)];
    if (month1 !== undefined && month2 !== undefined) {
      const checkIn = new Date(tripYear, month1, parseInt(match[2]));
      const checkOut = new Date(tripYear, month2, parseInt(match[4]));
      return { checkIn: getDateString(checkIn), checkOut: getDateString(checkOut) };
    }
  }

  return null;
}

function findDestForDate(dateStr, tripData) {
  for (const dest of tripData.destinations || []) {
    const destDates = parseDestDates(dest.dates, tripData.trip.startDate);
    if (destDates && dateStr >= destDates.checkIn && dateStr < destDates.checkOut) {
      return dest;
    }
  }
  return null;
}

function renderTimeline(tripData) {
  if (!tripData.trip.startDate || !tripData.trip.endDate) return '';

  const days = getDaysBetween(tripData.trip.startDate, tripData.trip.endDate);

  return `
    <section class="timeline-section">
      <div class="section-header">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        <span>Itinerary</span>
      </div>
      <div class="timeline">
        ${days.map((day, idx) => {
          const dateStr = getDateString(day);
          const items = buildTimelineItems(tripData, dateStr);
          const dest = findDestForDate(dateStr, tripData);
          const dayNum = idx + 1;

          return `
            <div class="timeline-day ${items.length === 0 ? 'empty' : ''}">
              <div class="timeline-day-marker">
                <div class="timeline-day-dot ${items.length > 0 ? 'has-items' : ''}"></div>
                ${idx < days.length - 1 ? '<div class="timeline-day-line"></div>' : ''}
              </div>
              <div class="timeline-day-content">
                <div class="timeline-day-header">
                  <span class="timeline-day-date">${formatTimelineDate(day)}</span>
                  <span class="timeline-day-num">Day ${dayNum}</span>
                  ${dest ? `<span class="timeline-day-dest">${dest.flag} ${dest.city}</span>` : ''}
                </div>
                ${items.length > 0 ? `
                  <div class="timeline-day-items">
                    ${items.map(item => `
                      <div class="timeline-item">
                        <span class="timeline-item-icon">${item.icon}</span>
                        <div class="timeline-item-info">
                          <span class="timeline-item-label">${item.label}</span>
                          ${item.detail ? `<span class="timeline-item-detail">${item.detail}</span>` : ''}
                          ${item.confirmation ? `<span class="timeline-item-conf">${item.confirmation}</span>` : ''}
                        </div>
                        ${item.time ? `<span class="timeline-item-time">${formatTime12h(item.time)}</span>` : ''}
                        ${item.sourceImageId ? `<button class="source-image-btn" onclick="showItemImage('${item.sourceImageId}')" title="View booking screenshot">${icons.camera}</button>` : ''}
                      </div>
                    `).join('')}
                  </div>
                ` : `<div class="timeline-day-empty">${dest ? 'Free day in ' + dest.city : 'Travel day'}</div>`}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </section>
  `;
}

function formatTime12h(time) {
  if (!time) return '';
  const match = time.match(/^(\d{1,2}):(\d{2})/);
  if (!match) return time;
  let h = parseInt(match[1]);
  const min = match[2];
  const ampm = h >= 12 ? 'pm' : 'am';
  if (h > 12) h -= 12;
  if (h === 0) h = 12;
  return `${h}:${min}${ampm}`;
}

// ======== Transport Section (combined flights + trains) ========

function renderTransport(tripData) {
  const hasFlights = tripData.flights && tripData.flights.length > 0;
  const hasTrains = tripData.trains && tripData.trains.length > 0;
  const hasCar = !!tripData.carRental;

  if (!hasFlights && !hasTrains && !hasCar) return '';

  return `
    <section class="transport-section">
      <div class="section-header">
        ${icons.plane}
        <span>Transport</span>
      </div>
      ${hasFlights ? `
        <div class="transport-subsection-label">Flights</div>
        <div class="transport-list">
          ${tripData.flights.map(flight => `
            <div class="transport-item">
              <div class="transport-date">${formatDate(flight.date)}</div>
              <div class="transport-route">
                <span>${flight.fromCode || flight.from}</span>
                <span class="arrow">→</span>
                <span>${flight.toCode || flight.to}</span>
              </div>
              <div class="transport-airline">${flight.airline || ''} ${flight.flightNumber || ''}</div>
              ${flight.departTime ? `<div class="transport-time">${flight.departTime} → ${flight.arriveTime}</div>` : ''}
              ${flight.seats ? `<div class="transport-seats">Seats: ${flight.seats}</div>` : ''}
              ${flight.confirmation ? `<div class="transport-confirmation">${flight.confirmation}</div>` : ''}
              <div class="transport-item-actions">
                ${flight.sourceImageId ? `<button class="source-image-btn" onclick="showItemImage('${flight.sourceImageId}')" title="View booking screenshot">${icons.camera}</button>` : ''}
                <button class="transport-edit-btn" onclick="openEditTransport('flight', '${flight.id}')" title="Edit">✏️</button>
              </div>
            </div>
          `).join('')}
        </div>
      ` : ''}
      ${hasTrains ? `
        <div class="transport-subsection-label">Trains</div>
        <div class="transport-list">
          ${tripData.trains.map(train => `
            <div class="transport-item">
              <div class="transport-date">${formatDate(train.date)}</div>
              <div class="transport-route">
                <span>${train.from}</span>
                <span class="arrow">→</span>
                ${train.via ? `<span style="color:var(--text-muted)">${train.via}</span><span class="arrow">→</span>` : ''}
                <span>${train.to}</span>
              </div>
              ${train.operator ? `<div class="transport-airline">${train.operator}</div>` : ''}
              ${train.departTime ? `<div class="transport-time">${train.departTime} → ${train.arriveTime}${train.duration ? ' (' + train.duration + ')' : ''}</div>` : ''}
              ${train.confirmation ? `<div class="transport-confirmation">${train.confirmation}</div>` : ''}
              ${train.seats ? `<div class="transport-seats">${train.seats}</div>` : ''}
              <div class="transport-item-actions">
                ${train.sourceImageId ? `<button class="source-image-btn" onclick="showItemImage('${train.sourceImageId}')" title="View booking screenshot">${icons.camera}</button>` : ''}
                <button class="transport-edit-btn" onclick="openEditTransport('train', '${train.id}')" title="Edit">✏️</button>
              </div>
            </div>
          `).join('')}
        </div>
      ` : ''}
      ${hasCar ? `
        <div class="transport-subsection-label">Car</div>
        <div class="car-rental-card">
          <div class="car-rental-icon">${icons.car}</div>
          <div class="car-rental-info">
            <div class="car-rental-title">Car Rental</div>
            <div class="car-rental-details">${tripData.carRental.dates} • ${tripData.carRental.route}</div>
          </div>
          <div class="car-rental-vehicle">${tripData.carRental.vehicle}</div>
        </div>
      ` : ''}
    </section>
  `;
}

// (Dead code removed: renderFlights, renderTrains, renderCarRental — replaced by renderTransport)

function renderDestinations(tripData) {
  return `
    <section class="destinations-section">
      <div class="section-header">
        ${icons.mapPin}
        <span>Destinations</span>
      </div>
      <div class="destinations-list">
        ${tripData.destinations.map(dest => renderDestinationCard(dest, tripData)).join('')}
      </div>
    </section>
  `;
}

function renderDestinationCard(dest, tripData) {
  const isExpanded = state.expandedCards[dest.id];
  const actCount = dest.thingsToDo.length;
  const restCount = dest.restaurants.length;
  const destEvents = getDestinationEvents(dest, tripData);
  const evtCount = destEvents.length;

  const countParts = [];
  if (actCount > 0) countParts.push(`${actCount} activit${actCount === 1 ? 'y' : 'ies'}`);
  if (restCount > 0) countParts.push(`${restCount} restaurant${restCount !== 1 ? 's' : ''}`);
  if (evtCount > 0) countParts.push(`${evtCount} event${evtCount !== 1 ? 's' : ''}`);

  return `
    <div class="destination-card ${dest.color}">
      <div class="destination-header" onclick="toggleCard('${dest.id}')">
        <div class="destination-icon">${dest.flag}</div>
        <div class="destination-info">
          <div class="destination-title">
            ${dest.city}
            ${dest.stay ? `<span class="destination-stay">(${dest.stay})</span>` : ''}
            ${dest.type === 'retreat' ? `<span class="retreat-badge">${dest.retreatName}</span>` : ''}
          </div>
          <div class="destination-dates">
            ${dest.dates} • ${dest.nights} night${dest.nights > 1 ? 's' : ''}
            ${dest.neighborhood ? ` • ${dest.neighborhood}` : ''}
          </div>
        </div>
        <div class="destination-meta">
          ${countParts.length > 0 ? `<span class="item-count-detail">${countParts.join(' · ')}</span>` : ''}
          <span class="chevron ${isExpanded ? 'expanded' : ''}">${icons.chevronRight}</span>
        </div>
      </div>
      ${isExpanded ? renderDestinationContent(dest, tripData) : ''}
    </div>
  `;
}

// (Dead code removed: renderEvents — events shown in timeline + destination cards)

function getDestinationEvents(dest, tripData) {
  if (!tripData.events || tripData.events.length === 0) return [];
  const destDates = parseDestDates(dest.dates, tripData.trip.startDate);
  if (!destDates) return [];
  return tripData.events.filter(evt => {
    return evt.date >= destDates.checkIn && evt.date < destDates.checkOut;
  }).sort((a, b) => {
    if (a.date !== b.date) return a.date.localeCompare(b.date);
    return (a.time || '').localeCompare(b.time || '');
  });
}

function renderDestinationContent(dest, tripData) {
  const eventIcons = { dining: '🍽️', opera: '🎭', 'day-trip': '🏰', show: '🎪', concert: '🎵', festival: '🎉', exhibition: '🖼️' };
  const destEvents = getDestinationEvents(dest, tripData);

  return `
    <div class="destination-content">
      ${dest.accommodation && dest.accommodation.name ? `
        <div class="accommodation-info">
          <strong>🏨 ${dest.accommodation.name}</strong>
          ${dest.accommodation.address ? `<div class="accommodation-detail">${dest.accommodation.address}</div>` : ''}
          ${dest.accommodation.confirmation ? `<div class="accommodation-detail">Conf: ${dest.accommodation.confirmation}</div>` : ''}
          ${dest.accommodation.cost ? `<div class="accommodation-detail">Cost: ${dest.accommodation.cost}</div>` : ''}
          ${dest.accommodation.room ? `<div class="accommodation-detail">${dest.accommodation.room}</div>` : ''}
          ${dest.accommodation.checkInTime ? `<div class="accommodation-detail">Check-in: ${dest.accommodation.checkInTime} | Check-out: ${dest.accommodation.checkOutTime || ''}</div>` : ''}
          ${dest.accommodation.note ? `<div class="accommodation-detail accommodation-note">${dest.accommodation.note}</div>` : ''}
          ${dest.accommodation.sourceImageId ? `<div class="accommodation-status-row"><button class="source-image-btn" onclick="showItemImage('${dest.accommodation.sourceImageId}')" title="View booking screenshot">${icons.camera}</button></div>` : ''}
        </div>
      ` : ''}

      ${destEvents.length > 0 ? `
        <div class="activity-section">
          <h4>📅 Scheduled Events</h4>
          <div class="activity-list">
            ${destEvents.map(evt => {
              const evtIndex = tripData.events.indexOf(evt);
              return `
              <div class="activity-item event-item">
                <span class="activity-icon">${eventIcons[evt.type] || '📅'}</span>
                <div class="event-item-info">
                  <span class="activity-name">${evt.name}</span>
                  <span class="event-item-meta">${formatDate(evt.date)}${evt.time ? ' • ' + formatTime12h(evt.time) : ''}</span>
                  ${evt.seat ? `<span class="event-item-detail">💺 ${evt.seat}</span>` : ''}
                  ${evt.price ? `<span class="event-item-detail">${evt.price}${evt.category ? ' — ' + evt.category : ''}</span>` : ''}
                  ${evt.confirmation ? `<span class="event-item-detail">${evt.confirmation.replace(/\n/g, '<br>')}</span>` : ''}
                  ${evt.orderNumber ? `<span class="event-item-detail">Order: ${evt.orderNumber}</span>` : ''}
                  ${evt.note ? `<span class="event-item-note">${evt.note}</span>` : ''}
                  ${evt.notes ? `<span class="event-item-note">${evt.notes}</span>` : ''}
                  ${evt.tickets && evt.tickets.length > 0 ? `<span class="event-item-tickets">🎫 ${evt.tickets.join(', ')}</span>` : ''}
                </div>
                ${(() => {
                  const ids = Array.isArray(evt.sourceImageId) ? evt.sourceImageId : (evt.sourceImageId ? [evt.sourceImageId] : []);
                  return ids.map(id => `<button class="source-image-btn" onclick="showItemImage('${id}')" title="${id}">${icons.camera}</button>`).join('');
                })()}
                <button class="delete-item-btn" onclick="deleteEvent(${evtIndex})">
                  ${icons.x}
                </button>
              </div>`;
            }).join('')}
          </div>
        </div>
      ` : ''}

      ${dest.highlights && dest.highlights.length > 0 ? `
        <div class="highlights">
          ${dest.highlights.map(h => `<span class="highlight-tag">${h}</span>`).join('')}
        </div>
      ` : ''}

      ${dest.thingsToDo.length > 0 ? `
        <div class="activity-section">
          <h4>Things to Do</h4>
          <div class="activity-list">
            ${dest.thingsToDo.map((item, i) => `
              <div class="activity-item">
                <span class="activity-icon">${categoryIcons[item.category] || '📍'}</span>
                <span class="activity-name">${item.name}</span>
                ${item.sourceImageId ? `<button class="source-image-btn" onclick="showItemImage('${item.sourceImageId}')" title="View booking screenshot">${icons.camera}</button>` : ''}
                <button class="delete-item-btn" onclick="deleteItem('${dest.id}', 'activity', ${i})">
                  ${icons.x}
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      ${dest.restaurants.length > 0 ? `
        <div class="activity-section">
          <h4>Restaurants</h4>
          <div class="activity-list">
            ${dest.restaurants.map((item, i) => `
              <div class="activity-item">
                ${icons.utensils}
                <span class="activity-name">${item.name}</span>
                ${item.category ? `<span class="activity-category">• ${item.category}</span>` : ''}
                ${item.sourceImageId ? `<button class="source-image-btn" onclick="showItemImage('${item.sourceImageId}')" title="View booking screenshot">${icons.camera}</button>` : ''}
                <button class="delete-item-btn" onclick="deleteItem('${dest.id}', 'restaurant', ${i})">
                  ${icons.x}
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <div class="destination-actions">
        <button class="add-to-destination" onclick="openAddModalForDestination('${dest.id}')">
          ${icons.plus} Add to ${dest.city}
        </button>
        <button class="discover-events-btn" onclick="discoverEvents('${dest.id}')">
          ${icons.sparkles} Discover Events
        </button>
      </div>
    </div>
  `;
}

function renderTripSelectorModal() {
  return `
    <div class="modal-overlay" onclick="closeTripSelector()">
      <div class="modal" onclick="event.stopPropagation()">
        <div class="modal-header">
          <h3 class="modal-title">${icons.globe} My Trips</h3>
          <button class="modal-close" onclick="closeTripSelector()">${icons.x}</button>
        </div>
        <div class="modal-body">
          <div class="trip-list">
            ${Object.values(state.trips).map(trip => `
              <button class="trip-option ${state.currentTripId === trip.trip.id ? 'selected' : ''}"
                      onclick="selectTrip('${trip.trip.id}')">
                <span class="trip-option-emoji">${trip.trip.emoji}</span>
                <div class="trip-option-info">
                  <div class="trip-option-name">${trip.trip.name}</div>
                  <div class="trip-option-subtitle">${trip.trip.subtitle}</div>
                  <div class="trip-option-dates">${formatDate(trip.trip.startDate)} - ${formatDate(trip.trip.endDate)} • ${trip.trip.duration} days</div>
                </div>
                ${state.currentTripId === trip.trip.id ? `<span class="destination-option-check">${icons.check}</span>` : ''}
              </button>
            `).join('')}
          </div>
          <button class="new-trip-btn" onclick="openNewTripModal()">
            ${icons.plus} Add New Trip
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderAddModal(tripData) {
  const isEvent = state.pendingItem.type === 'event';
  return `
    <div class="modal-overlay" onclick="closeAddModal()">
      <div class="modal" onclick="event.stopPropagation()">
        <div class="modal-header">
          <h3 class="modal-title">Add to Itinerary</h3>
          <button class="modal-close" onclick="closeAddModal()">${icons.x}</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">What are you adding?</label>
            <input type="text" class="form-input" id="addItemName"
                   value="${state.pendingItem.name}"
                   onchange="updatePendingItem('name', this.value)">
          </div>
          <div class="form-group">
            <label class="form-label">Type</label>
            <div class="type-selector">
              <button class="type-btn ${state.pendingItem.type === 'activity' ? 'active' : ''}"
                      onclick="updatePendingItem('type', 'activity')">🎯 Activity</button>
              <button class="type-btn ${state.pendingItem.type === 'restaurant' ? 'active' : ''}"
                      onclick="updatePendingItem('type', 'restaurant')">🍽️ Restaurant</button>
              <button class="type-btn ${state.pendingItem.type === 'event' ? 'active' : ''}"
                      onclick="updatePendingItem('type', 'event')">📅 Event</button>
            </div>
          </div>
          ${isEvent ? `
            <div class="form-group">
              <label class="form-label">Date</label>
              <input type="date" class="form-input" id="addItemDate"
                     value="${state.pendingItem.date || ''}"
                     onchange="updatePendingItem('date', this.value)">
            </div>
            <div class="form-group">
              <label class="form-label">Time (optional)</label>
              <input type="time" class="form-input" id="addItemTime"
                     value="${state.pendingItem.time || ''}"
                     onchange="updatePendingItem('time', this.value)">
            </div>
            <div class="form-group">
              <label class="form-label">Event Type</label>
              <div class="type-selector">
                <button class="type-btn mini ${state.pendingItem.eventType === 'dining' ? 'active' : ''}" onclick="updatePendingItem('eventType', 'dining')">🍽️</button>
                <button class="type-btn mini ${state.pendingItem.eventType === 'opera' ? 'active' : ''}" onclick="updatePendingItem('eventType', 'opera')">🎭</button>
                <button class="type-btn mini ${state.pendingItem.eventType === 'concert' ? 'active' : ''}" onclick="updatePendingItem('eventType', 'concert')">🎵</button>
                <button class="type-btn mini ${state.pendingItem.eventType === 'day-trip' ? 'active' : ''}" onclick="updatePendingItem('eventType', 'day-trip')">🏰</button>
                <button class="type-btn mini ${state.pendingItem.eventType === 'exhibition' ? 'active' : ''}" onclick="updatePendingItem('eventType', 'exhibition')">🖼️</button>
                <button class="type-btn mini ${state.pendingItem.eventType === 'festival' ? 'active' : ''}" onclick="updatePendingItem('eventType', 'festival')">🎉</button>
              </div>
            </div>
          ` : `
            <div class="form-group">
              <label class="form-label">Add to which destination?</label>
              <div class="destination-selector">
                ${tripData.destinations.map(dest => `
                  <button class="destination-option ${state.selectedDestination === dest.id ? 'selected' : ''}"
                          onclick="selectDestination('${dest.id}')">
                    <span class="destination-option-flag">${dest.flag}</span>
                    <div class="destination-option-info">
                      <div class="destination-option-city">${dest.city}</div>
                      <div class="destination-option-dates">${dest.dates}</div>
                    </div>
                    ${state.selectedDestination === dest.id ? `<span class="destination-option-check">${icons.check}</span>` : ''}
                  </button>
                `).join('')}
              </div>
            </div>
          `}
          <div class="form-group">
            <label class="form-label">Note (optional)</label>
            <input type="text" class="form-input" value="${state.pendingItem.note || ''}"
                   placeholder="Any extra details..."
                   onchange="updatePendingItem('note', this.value)">
          </div>
        </div>
        <div class="modal-footer">
          <button class="modal-submit" onclick="confirmAddItem()"
                  ${isEvent ? (!state.pendingItem.name ? 'disabled' : '') : (!state.selectedDestination || !state.pendingItem.name ? 'disabled' : '')}>
            Add to Itinerary
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderNewTripModal() {
  return `
    <div class="modal-overlay" onclick="closeNewTripModal()">
      <div class="modal" onclick="event.stopPropagation()">
        <div class="modal-header">
          <h3 class="modal-title">Create New Trip</h3>
          <button class="modal-close" onclick="closeNewTripModal()">${icons.x}</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">Trip Name</label>
            <input type="text" class="form-input" id="newTripName" placeholder="e.g., Japan 2027">
          </div>
          <div class="form-group">
            <label class="form-label">Subtitle (optional)</label>
            <input type="text" class="form-input" id="newTripSubtitle" placeholder="e.g., Cherry Blossom Season">
          </div>
          <div class="form-group">
            <label class="form-label">Emoji</label>
            <input type="text" class="form-input" id="newTripEmoji" placeholder="🗾" maxlength="2" style="width:60px">
          </div>
          <div class="form-group">
            <label class="form-label">Start Date</label>
            <input type="date" class="form-input" id="newTripStart">
          </div>
          <div class="form-group">
            <label class="form-label">End Date</label>
            <input type="date" class="form-input" id="newTripEnd">
          </div>
        </div>
        <div class="modal-footer">
          <button class="modal-submit" onclick="handleCreateTrip()">
            Create Trip
          </button>
        </div>
      </div>
    </div>
  `;
}

// Event handlers
// ======== AI Image Parsing ========

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      const base64 = dataUrl.split(',')[1];
      resolve({ base64, mediaType: file.type });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function processImageWithAI(file) {
  if (state.aiParsing) return; // Guard against race condition
  state.aiParsing = true;
  state.aiError = null;
  state.aiResult = null;

  // Create preview URL
  const previewReader = new FileReader();
  previewReader.onload = () => {
    state.aiImagePreview = previewReader.result;
    render();
  };
  previewReader.readAsDataURL(file);
  render();

  try {
    const { base64, mediaType } = await fileToBase64(file);
    const tripData = state.trips[state.currentTripId];
    const response = await window.electronAPI.parseImage(base64, mediaType, tripData);

    if (response.success) {
      // Normalize: AI may return a single object or an array
      const parsed = response.result;
      if (Array.isArray(parsed)) {
        // Multiple bookings — merge into a single result with combined data
        state.aiResult = {
          type: 'multiple',
          summary: parsed.map(p => p.summary).join('; '),
          data: {
            flights: parsed.flatMap(p => p.data?.flights ? [p.data] : (p.type === 'flight' ? [p.data] : [])),
            trains: parsed.flatMap(p => p.data?.trains ? [p.data] : (p.type === 'train' ? [p.data] : [])),
            hotels: parsed.flatMap(p => p.data?.hotels ? [p.data] : (p.type === 'hotel' ? [p.data] : [])),
            restaurants: parsed.flatMap(p => p.data?.restaurants ? [p.data] : (p.type === 'restaurant' ? [p.data] : [])),
            activities: parsed.flatMap(p => p.data?.activities ? [p.data] : (p.type === 'activity' ? [p.data] : [])),
            events: parsed.flatMap(p => p.data?.events ? [p.data] : (p.type === 'event' ? [p.data] : []))
          },
          suggestedDestination: parsed[0]?.suggestedDestination,
          suggestedAction: parsed[0]?.suggestedAction
        };
      } else {
        // Single object — normalize data into arrays
        const d = parsed.data || {};
        state.aiResult = {
          type: parsed.type || 'unknown',
          summary: parsed.summary || '',
          data: {
            flights: d.flights || (parsed.type === 'flight' ? [d] : []),
            trains: d.trains || (parsed.type === 'train' ? [d] : []),
            hotels: d.hotels || (parsed.type === 'hotel' ? [d] : []),
            restaurants: d.restaurants || (parsed.type === 'restaurant' ? [d] : []),
            activities: d.activities || (parsed.type === 'activity' ? [d] : []),
            events: d.events || (parsed.type === 'event' ? [d] : [])
          },
          suggestedDestination: parsed.suggestedDestination,
          suggestedAction: parsed.suggestedAction
        };
      }
    } else {
      state.aiError = response.error || 'Failed to parse image';
    }
    state.aiParsing = false;
    state.showAIResultModal = true;
    render();
  } catch (err) {
    state.aiParsing = false;
    state.aiError = err.message || 'Failed to parse image';
    state.showAIResultModal = true;
    render();
  }
}

async function processPdfWithAI(file) {
  if (state.aiParsing) return; // Guard against race condition
  state.aiParsing = true;
  state.aiError = null;
  state.aiResult = null;
  state.aiImagePreview = null;

  // Save PDF data URL for later disk storage
  const pdfReader = new FileReader();
  pdfReader.onload = () => { state.aiPdfDataUrl = pdfReader.result; };
  pdfReader.readAsDataURL(file);

  state.aiPdfName = file.name;
  render();

  try {
    const { base64 } = await fileToBase64(file);
    const tripData = state.trips[state.currentTripId];
    const response = await window.electronAPI.parsePdf(base64, tripData);

    if (response.success) {
      const parsed = response.result;
      if (Array.isArray(parsed)) {
        state.aiResult = {
          type: 'multiple',
          summary: parsed.map(p => p.summary).join('; '),
          data: {
            flights: parsed.flatMap(p => p.data?.flights ? [p.data] : (p.type === 'flight' ? [p.data] : [])),
            trains: parsed.flatMap(p => p.data?.trains ? [p.data] : (p.type === 'train' ? [p.data] : [])),
            hotels: parsed.flatMap(p => p.data?.hotels ? [p.data] : (p.type === 'hotel' ? [p.data] : [])),
            restaurants: parsed.flatMap(p => p.data?.restaurants ? [p.data] : (p.type === 'restaurant' ? [p.data] : [])),
            activities: parsed.flatMap(p => p.data?.activities ? [p.data] : (p.type === 'activity' ? [p.data] : [])),
            events: parsed.flatMap(p => p.data?.events ? [p.data] : (p.type === 'event' ? [p.data] : []))
          },
          suggestedDestination: parsed[0]?.suggestedDestination,
          suggestedAction: parsed[0]?.suggestedAction
        };
      } else {
        const d = parsed.data || {};
        state.aiResult = {
          type: parsed.type || 'unknown',
          summary: parsed.summary || '',
          data: {
            flights: d.flights || (parsed.type === 'flight' ? [d] : []),
            trains: d.trains || (parsed.type === 'train' ? [d] : []),
            hotels: d.hotels || (parsed.type === 'hotel' ? [d] : []),
            restaurants: d.restaurants || (parsed.type === 'restaurant' ? [d] : []),
            activities: d.activities || (parsed.type === 'activity' ? [d] : []),
            events: d.events || (parsed.type === 'event' ? [d] : [])
          },
          suggestedDestination: parsed.suggestedDestination,
          suggestedAction: parsed.suggestedAction
        };
      }
    } else {
      state.aiError = response.error || 'Failed to parse PDF';
    }
    state.aiParsing = false;
    state.showAIResultModal = true;
    render();
  } catch (err) {
    state.aiParsing = false;
    state.aiError = err.message || 'Failed to parse PDF';
    state.showAIResultModal = true;
    render();
  }
}

async function applyAIResult(result) {
  if (!result || !result.data) return;
  const trip = state.trips[state.currentTripId];

  // Save the source image/PDF to disk and get an imageId
  let imageId = null;
  const sourceData = state.aiImagePreview || state.aiPdfDataUrl;
  if (sourceData) {
    imageId = 'img-' + Date.now() + '-' + Math.random().toString(36).substr(2, 6);
    if (window.electronAPI) {
      try {
        const saveResult = await window.electronAPI.saveImage(imageId, sourceData);
        if (saveResult.success) {
          imageId = saveResult.imageId;
        }
      } catch (e) {
        console.error('Failed to save source file:', e);
        imageId = null;
      }
    }
  }

  // Apply flights
  if (result.data.flights && result.data.flights.length > 0) {
    if (!trip.flights) trip.flights = [];
    result.data.flights.forEach(f => {
      const exists = trip.flights.find(ef =>
        ef.confirmation && f.confirmation && ef.confirmation === f.confirmation
      );
      if (!exists) trip.flights.push({ ...f, id: 'flight-' + Date.now() + '-' + Math.random().toString(36).substr(2,4), sourceImageId: imageId });
    });
  }

  // Apply trains
  if (result.data.trains && result.data.trains.length > 0) {
    if (!trip.trains) trip.trains = [];
    result.data.trains.forEach(t => {
      const exists = trip.trains.find(et =>
        et.confirmation && t.confirmation && et.confirmation === t.confirmation
      );
      if (!exists) trip.trains.push({ ...t, id: 'train-' + Date.now() + '-' + Math.random().toString(36).substr(2,4), sourceImageId: imageId });
    });
  }

  // Apply hotels / accommodation
  if (result.data.hotels && result.data.hotels.length > 0) {
    result.data.hotels.forEach(hotel => {
      const destId = result.suggestedDestination || findBestDestination(hotel, trip);
      const dest = trip.destinations.find(d => d.id === destId);
      if (dest) {
        dest.accommodation = {
          name: hotel.name || dest.accommodation?.name,
          status: hotel.status || 'Booked',
          confirmation: hotel.confirmation || dest.accommodation?.confirmation,
          cost: hotel.cost || dest.accommodation?.cost,
          address: hotel.address || dest.accommodation?.address,
          checkIn: hotel.checkIn || dest.accommodation?.checkIn,
          checkOut: hotel.checkOut || dest.accommodation?.checkOut,
          note: hotel.notes || hotel.note || dest.accommodation?.note,
          sourceImageId: imageId || dest.accommodation?.sourceImageId
        };
      }
    });
  }

  // Apply restaurants
  if (result.data.restaurants && result.data.restaurants.length > 0) {
    const destId = result.suggestedDestination || (trip.destinations[0] && trip.destinations[0].id);
    const dest = trip.destinations.find(d => d.id === destId);
    if (dest) {
      if (!dest.restaurants) dest.restaurants = [];
      result.data.restaurants.forEach(r => {
        const exists = dest.restaurants.find(er => er.name.toLowerCase() === r.name.toLowerCase());
        if (!exists) dest.restaurants.push({ ...r, sourceImageId: imageId });
      });
    }
  }

  // Apply activities
  if (result.data.activities && result.data.activities.length > 0) {
    const destId = result.suggestedDestination || (trip.destinations[0] && trip.destinations[0].id);
    const dest = trip.destinations.find(d => d.id === destId);
    if (dest) {
      if (!dest.thingsToDo) dest.thingsToDo = [];
      result.data.activities.forEach(a => {
        const exists = dest.thingsToDo.find(ea => ea.name.toLowerCase() === a.name.toLowerCase());
        if (!exists) dest.thingsToDo.push({ ...a, sourceImageId: imageId });
      });
    }
  }

  // Apply events
  if (result.data.events && result.data.events.length > 0) {
    if (!trip.events) trip.events = [];
    result.data.events.forEach(ev => {
      const exists = trip.events.find(e => e.name && ev.name && e.name.toLowerCase() === ev.name.toLowerCase());
      if (!exists) trip.events.push({ ...ev, sourceImageId: imageId });
    });
  }

  saveTrips();
  closeAIResultModal();
  showToast('Applied to trip', 'success');
  render();
}

function findBestDestination(hotel, trip) {
  if (!trip.destinations || trip.destinations.length === 0) return null;
  // Try to match by city name in hotel name or address
  const hotelStr = ((hotel.name || '') + ' ' + (hotel.address || '')).toLowerCase();
  for (const dest of trip.destinations) {
    if (hotelStr.includes(dest.city.toLowerCase())) return dest.id;
  }
  return trip.destinations[0].id;
}

function renderAIResultModal() {
  const isPdf = !state.aiImagePreview && state.aiPdfName;
  const fileLabel = isPdf ? 'PDF' : 'Image';

  if (state.aiParsing) {
    return `
      <div class="modal-overlay" onclick="closeAIResultModal()">
        <div class="ai-modal" onclick="event.stopPropagation()">
          <div class="ai-modal-header">
            <h3>${icons.ai} Analyzing ${fileLabel}...</h3>
          </div>
          <div class="ai-modal-body">
            ${state.aiImagePreview ? `<img src="${state.aiImagePreview}" class="ai-image-preview" alt="Uploaded image">` : ''}
            ${isPdf ? `<div class="ai-pdf-preview"><span class="ai-pdf-icon">📄</span><span class="ai-pdf-name">${state.aiPdfName}</span></div>` : ''}
            <div class="ai-loading">
              <img src="helen.png" class="ai-loading-mascot" alt="Helen Skiing">
              <p>Helen is analyzing your ${fileLabel.toLowerCase()}...</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  if (state.aiError) {
    return `
      <div class="modal-overlay" onclick="closeAIResultModal()">
        <div class="ai-modal" onclick="event.stopPropagation()">
          <div class="ai-modal-header">
            <h3>${icons.ai} Error</h3>
            <button class="modal-close" onclick="closeAIResultModal()">${icons.x}</button>
          </div>
          <div class="ai-modal-body">
            ${state.aiImagePreview ? `<img src="${state.aiImagePreview}" class="ai-image-preview" alt="Uploaded image">` : ''}
            <div class="ai-error">
              <p>${state.aiError}</p>
              ${state.aiError.includes('API key') ? '<p><button class="ai-apply-btn" onclick="closeAIResultModal(); openSettingsModal();">Open Settings</button></p>' : ''}
            </div>
          </div>
          <div class="ai-modal-footer">
            <button class="ai-cancel-btn" onclick="closeAIResultModal()">Close</button>
          </div>
        </div>
      </div>
    `;
  }

  if (!state.aiResult) return '';

  const r = state.aiResult;
  const dataItems = [];
  if (r.data?.flights?.length) dataItems.push(`<div class="ai-result-group"><h4>✈️ Flights (${r.data.flights.length})</h4>${r.data.flights.map(f => `<div class="ai-result-item">${f.airline || ''} ${f.from || ''} → ${f.to || ''} on ${f.date || 'N/A'}${f.confirmation ? ' (Conf: ' + f.confirmation + ')' : ''}</div>`).join('')}</div>`);
  if (r.data?.trains?.length) dataItems.push(`<div class="ai-result-group"><h4>🚆 Trains (${r.data.trains.length})</h4>${r.data.trains.map(t => `<div class="ai-result-item">${t.operator || ''} ${t.from || ''} → ${t.to || ''} on ${t.date || 'N/A'}${t.confirmation ? ' (Conf: ' + t.confirmation + ')' : ''}</div>`).join('')}</div>`);
  if (r.data?.hotels?.length) dataItems.push(`<div class="ai-result-group"><h4>🏨 Hotels (${r.data.hotels.length})</h4>${r.data.hotels.map(h => `<div class="ai-result-item">${h.name || 'Hotel'}${h.checkIn ? ' ' + h.checkIn + ' → ' + (h.checkOut || '') : ''}${h.cost ? ' (' + h.cost + ')' : ''}</div>`).join('')}</div>`);
  if (r.data?.restaurants?.length) dataItems.push(`<div class="ai-result-group"><h4>🍽️ Restaurants (${r.data.restaurants.length})</h4>${r.data.restaurants.map(rest => `<div class="ai-result-item">${rest.name}${rest.category ? ' — ' + rest.category : ''}</div>`).join('')}</div>`);
  if (r.data?.activities?.length) dataItems.push(`<div class="ai-result-group"><h4>🎯 Activities (${r.data.activities.length})</h4>${r.data.activities.map(a => `<div class="ai-result-item">${a.name}${a.category ? ' — ' + a.category : ''}</div>`).join('')}</div>`);
  if (r.data?.events?.length) dataItems.push(`<div class="ai-result-group"><h4>📅 Events (${r.data.events.length})</h4>${r.data.events.map(e => `<div class="ai-result-item">${e.name || ''}${e.date ? ' on ' + e.date : ''}${e.time ? ' at ' + e.time : ''}</div>`).join('')}</div>`);

  return `
    <div class="modal-overlay" onclick="closeAIResultModal()">
      <div class="ai-modal ai-modal-results" onclick="event.stopPropagation()">
        <div class="ai-modal-header">
          <h3>${icons.ai} Extracted Data</h3>
          <button class="modal-close" onclick="closeAIResultModal()">${icons.x}</button>
        </div>
        <div class="ai-modal-body">
          ${state.aiImagePreview ? `<img src="${state.aiImagePreview}" class="ai-image-preview" alt="Uploaded image">` : ''}
          <div class="ai-result-summary">
            <div class="ai-result-type"><strong>Type:</strong> ${r.type || 'Unknown'}</div>
            <div class="ai-result-desc">${r.summary || ''}</div>
            ${r.suggestedDestination ? `<div class="ai-result-dest"><strong>Destination:</strong> ${r.suggestedDestination}</div>` : ''}
            ${r.suggestedAction ? `<div class="ai-result-action"><strong>Action:</strong> ${r.suggestedAction}</div>` : ''}
          </div>
          <div class="ai-result-data">
            ${dataItems.length > 0 ? dataItems.join('') : '<p class="ai-no-data">No structured data could be extracted from this image.</p>'}
          </div>
        </div>
        <div class="ai-modal-footer">
          <button class="ai-cancel-btn" onclick="closeAIResultModal()">Cancel</button>
          ${dataItems.length > 0 ? `<button class="ai-apply-btn" onclick="applyAIResultAction()">Apply to Trip</button>` : ''}
        </div>
      </div>
    </div>
  `;
}

function renderImageLightbox() {
  return `
    <div class="lightbox-overlay" onclick="closeLightbox()">
      <div class="lightbox-container" onclick="event.stopPropagation()">
        <button class="lightbox-close" onclick="closeLightbox()">${icons.x}</button>
        ${state.lightboxLoading ? `
          <div class="lightbox-loading">
            <div class="ai-spinner"></div>
            <p>Loading...</p>
          </div>
        ` : state.lightboxIsPdf ? `
          <div class="lightbox-pdf-preview">
            <div class="lightbox-pdf-icon">📄</div>
            <div class="lightbox-pdf-name">${state.lightboxPdfName || 'Document.pdf'}</div>
            <button class="lightbox-open-pdf-btn" onclick="openPdfExternally()">Open PDF</button>
          </div>
        ` : state.lightboxImageUrl ? `
          <img id="lightboxImg" class="lightbox-image" alt="Source booking image">
        ` : `
          <div class="lightbox-loading">
            <p>File not found</p>
          </div>
        `}
      </div>
    </div>
  `;
}

function renderDiscoverEventsModal() {
  const trip = state.trips[state.currentTripId];
  const dest = trip?.destinations?.find(d => d.id === state.discoverEventsDestId);
  const cityName = dest ? dest.city : 'this destination';
  const categoryIcons2 = { culture: '🏛️', food: '🍽️', nature: '🌿', nightlife: '🌙', activity: '🎯', festival: '🎉', exhibition: '🖼️' };

  return `
    <div class="modal-overlay" onclick="closeDiscoverEventsModal()">
      <div class="ai-modal ai-modal-results discover-modal" onclick="event.stopPropagation()">
        <div class="ai-modal-header">
          <h3>${icons.sparkles} Discover Events in ${cityName}</h3>
          <button class="modal-close" onclick="closeDiscoverEventsModal()">${icons.x}</button>
        </div>
        <div class="ai-modal-body">
          ${state.discoverEventsLoading ? `
            <div class="ai-loading">
              <img src="helen.png" class="ai-loading-mascot" alt="Helen">
              <p>Helen is finding events in ${cityName}...</p>
            </div>
          ` : state.discoverEventsResults && state.discoverEventsResults.length > 0 ? `
            <div class="discover-results">
              ${state.discoverEventsResults.map((item, i) => `
                <div class="discover-card ${item._added ? 'added' : ''}">
                  <div class="discover-card-header">
                    <span class="discover-card-icon">${categoryIcons2[item.category] || '📍'}</span>
                    <div class="discover-card-info">
                      <div class="discover-card-name">${item.name}</div>
                      ${item.date ? `<div class="discover-card-date">${formatDate(item.date)}${item.time ? ' at ' + formatTime12h(item.time) : ''}</div>` : ''}
                    </div>
                    <button class="discover-add-btn" onclick="addDiscoverEvent(${i})" ${item._added ? 'disabled' : ''}>
                      ${item._added ? icons.check : icons.plus}
                    </button>
                  </div>
                  <p class="discover-card-desc">${item.description || ''}</p>
                  ${item.tip ? `<p class="discover-card-tip">💡 ${item.tip}</p>` : ''}
                </div>
              `).join('')}
            </div>
          ` : `
            <div class="ai-loading">
              <p>No events found. Try again later.</p>
            </div>
          `}
        </div>
        <div class="ai-modal-footer">
          <button class="ai-cancel-btn" onclick="closeDiscoverEventsModal()">Done</button>
        </div>
      </div>
    </div>
  `;
}

function renderEditTransportModal() {
  const item = state.editTransportItem;
  const type = state.editTransportType;
  if (!item) return '';

  const isFlight = type === 'flight';
  const title = isFlight ? 'Edit Flight' : 'Edit Train';
  return `
    <div class="modal-overlay" onclick="closeEditTransportModal()">
      <div class="modal" onclick="event.stopPropagation()">
        <div class="modal-header">
          <h3 class="modal-title">${isFlight ? icons.plane : icons.train} ${title}</h3>
          <button class="modal-close" onclick="closeEditTransportModal()">${icons.x}</button>
        </div>
        <div class="modal-body edit-transport-form">
          ${isFlight ? `
            <div class="form-row">
              <div class="form-group half">
                <label class="form-label">Airline</label>
                <input type="text" class="form-input" id="etAirline" value="${item.airline || ''}">
              </div>
              <div class="form-group half">
                <label class="form-label">Flight #</label>
                <input type="text" class="form-input" id="etFlightNumber" value="${item.flightNumber || ''}">
              </div>
            </div>
          ` : `
            <div class="form-group">
              <label class="form-label">Operator</label>
              <input type="text" class="form-input" id="etOperator" value="${item.operator || ''}">
            </div>
          `}
          <div class="form-group">
            <label class="form-label">Date</label>
            <input type="date" class="form-input" id="etDate" value="${item.date || ''}">
          </div>
          <div class="form-row">
            <div class="form-group half">
              <label class="form-label">From</label>
              <input type="text" class="form-input" id="etFrom" value="${item.from || ''}">
            </div>
            <div class="form-group half">
              <label class="form-label">To</label>
              <input type="text" class="form-input" id="etTo" value="${item.to || ''}">
            </div>
          </div>
          ${isFlight ? `
            <div class="form-row">
              <div class="form-group half">
                <label class="form-label">From Code</label>
                <input type="text" class="form-input" id="etFromCode" value="${item.fromCode || ''}">
              </div>
              <div class="form-group half">
                <label class="form-label">To Code</label>
                <input type="text" class="form-input" id="etToCode" value="${item.toCode || ''}">
              </div>
            </div>
          ` : ''}
          <div class="form-row">
            <div class="form-group half">
              <label class="form-label">Depart</label>
              <input type="time" class="form-input" id="etDepartTime" value="${item.departTime || ''}">
            </div>
            <div class="form-group half">
              <label class="form-label">Arrive</label>
              <input type="time" class="form-input" id="etArriveTime" value="${item.arriveTime || ''}">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group half">
              <label class="form-label">Confirmation</label>
              <input type="text" class="form-input" id="etConfirmation" value="${item.confirmation || ''}">
            </div>
            <div class="form-group half">
              <label class="form-label">Seats</label>
              <input type="text" class="form-input" id="etSeats" value="${item.seats || ''}">
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="modal-delete-btn" onclick="deleteTransport('${type}', '${item.id}')">Delete</button>
          <button class="modal-submit" onclick="saveEditTransport()">Save Changes</button>
        </div>
      </div>
    </div>
  `;
}

function renderSettingsModal() {
  return `
    <div class="modal-overlay" onclick="closeSettingsModal()">
      <div class="ai-modal" onclick="event.stopPropagation()">
        <div class="ai-modal-header">
          <h3>${icons.settings} Settings</h3>
          <button class="modal-close" onclick="closeSettingsModal()">${icons.x}</button>
        </div>
        <div class="ai-modal-body">
          <div class="settings-group">
            <label class="settings-label">Anthropic API Key</label>
            <p class="settings-hint">Used for AI-powered image parsing with Claude. Your key is stored locally and never shared.</p>
            <div class="settings-input-row">
              <input type="password" id="apiKeyInput" class="settings-input" placeholder="sk-ant-..." />
              <button class="ai-apply-btn" onclick="toggleApiKeyVisibility()">👁</button>
            </div>
            <button class="ai-apply-btn settings-save-btn" onclick="saveApiKey()">Save Key</button>
          </div>
          <div class="settings-group">
            <label class="settings-label">AI Image Parsing</label>
            <p class="settings-hint">Paste or drop a booking screenshot anywhere in the app. Claude will extract flights, trains, hotels, restaurants, and more.</p>
          </div>
        </div>
        <div class="ai-modal-footer">
          <button class="ai-cancel-btn" onclick="closeSettingsModal()">Close</button>
        </div>
      </div>
    </div>
  `;
}

function setupEventListeners() {
  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      // Close modals in priority order (topmost first)
      if (state.showImageLightbox) {
        state.showImageLightbox = false;
        state.lightboxImageUrl = null;
        state.lightboxLoading = false;
        state.lightboxIsPdf = false;
        state.lightboxPdfName = null;
      } else if (state.showAIResultModal && !state.aiParsing) {
        state.showAIResultModal = false;
        state.aiResult = null;
        state.aiError = null;
        state.aiImagePreview = null;
        state.aiPdfDataUrl = null;
      } else if (state.showEditTransportModal) {
        state.showEditTransportModal = false;
        state.editTransportItem = null;
        state.editTransportType = null;
      } else if (state.showAddModal) {
        state.showAddModal = false;
        state.pendingItem = { name: '', type: 'activity', category: 'activity' };
        state.selectedDestination = null;
      } else if (state.showNewTripModal) {
        state.showNewTripModal = false;
      } else if (state.showSettingsModal) {
        state.showSettingsModal = false;
      } else if (state.showDiscoverEventsModal) {
        state.showDiscoverEventsModal = false;
        state.discoverEventsResults = null;
        state.discoverEventsLoading = false;
      } else if (state.showTripSelector) {
        state.showTripSelector = false;
      } else {
        return; // Nothing to close
      }
      render();
    }
  });

  // Global paste handler for images
  document.addEventListener('paste', (e) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.startsWith('image/')) {
        e.preventDefault();
        const file = items[i].getAsFile();
        if (file) processImageWithAI(file);
        return;
      }
    }
  });
}

// Global functions for onclick handlers
window.toggleCard = function(id) {
  state.expandedCards[id] = !state.expandedCards[id];
  render();
};

window.openTripSelector = function() {
  state.showTripSelector = true;
  render();
};

window.closeTripSelector = function() {
  state.showTripSelector = false;
  render();
};

window.selectTrip = function(tripId) {
  state.currentTripId = tripId;
  state.showTripSelector = false;
  state.expandedCards = {};
  saveTrips();
  render();
};

window.openAddModalForDestination = function(destId) {
  state.selectedDestination = destId;
  state.showAddModal = true;
  render();
};

window.closeAddModal = function() {
  state.showAddModal = false;
  state.pendingItem = { name: '', type: 'activity', category: 'activity' };
  state.selectedDestination = null;
  render();
};

window.updatePendingItem = function(key, value) {
  state.pendingItem[key] = value;
  if (key === 'type') {
    state.pendingItem.category = value === 'restaurant' ? 'food' : 'activity';
  }
  render();
};

window.selectDestination = function(destId) {
  state.selectedDestination = destId;
  render();
};

window.confirmAddItem = function() {
  if (state.pendingItem.type === 'event') {
    if (state.pendingItem.name) {
      addEventToTrip(state.pendingItem);
      showToast('Event added to itinerary', 'success');
      closeAddModal();
      // Clear the quick add input now that we've confirmed
      const input = document.getElementById('quickAddInput');
      if (input) input.value = '';
    }
  } else if (state.pendingItem.name && state.selectedDestination) {
    addItemToDestination(state.pendingItem, state.selectedDestination);
    showToast('Added to itinerary', 'success');
    closeAddModal();
    const input = document.getElementById('quickAddInput');
    if (input) input.value = '';
  }
};

window.deleteItem = function(destId, type, index) {
  if (!confirm(`Delete this ${type}?`)) return;
  deleteItem(destId, type, index);
};

window.deleteEvent = function(eventIndex) {
  if (!confirm('Delete this event?')) return;
  deleteEvent(eventIndex);
};



window.handleQuickAdd = async function() {
  const input = document.getElementById('quickAddInput');
  if (!input || !input.value.trim() || state.quickAddLoading) return;

  const userText = input.value.trim();
  const tripData = state.trips[state.currentTripId];

  // Try AI-powered parsing first
  if (window.electronAPI?.quickAdd) {
    state.quickAddLoading = true;
    render();

    try {
      const response = await window.electronAPI.quickAdd(userText, tripData);
      state.quickAddLoading = false;

      if (response.success && response.result) {
        const r = response.result;
        state.pendingItem = {
          name: r.name || userText,
          type: r.type || 'activity',
          category: r.category || 'activity',
          date: r.date || '',
          time: r.time || '',
          eventType: r.eventType || null,
          note: r.note || ''
        };
        if (r.suggestedDestination) {
          state.selectedDestination = r.suggestedDestination;
        }
        state.showAddModal = true;
        render();
        return;
      } else {
        showToast('AI unavailable — using basic parsing', 'info');
      }
    } catch (err) {
      console.error('AI quick add failed, falling back:', err);
      state.quickAddLoading = false;
      showToast('AI unavailable — using basic parsing', 'info');
    }
  }

  // Fallback to local parsing
  const parsed = parseNaturalLanguage(userText);
  state.pendingItem = parsed;
  state.showAddModal = true;
  render();
};

window.handleDragOver = function(e) {
  e.preventDefault();
  if (!state.dragOver) {
    state.dragOver = true;
    render();
  }
};

window.handleDragLeave = function(e) {
  if (state.dragOver) {
    state.dragOver = false;
    render();
  }
};

window.handleDrop = function(e) {
  e.preventDefault();
  state.dragOver = false;
  const file = e.dataTransfer.files[0];
  if (file) {
    if (file.type === 'application/pdf') {
      processPdfWithAI(file);
    } else if (file.type.startsWith('image/')) {
      processImageWithAI(file);
    } else {
      showToast('Only images and PDFs are supported', 'error');
      render();
    }
  } else {
    render();
  }
};

window.handleFileUpload = function(e) {
  const file = e.target.files[0];
  if (!file) return;
  if (file.type === 'application/pdf') {
    processPdfWithAI(file);
  } else if (file.type.startsWith('image/')) {
    processImageWithAI(file);
  } else {
    showToast('Only images and PDFs are supported', 'error');
  }
};

// Keep backward compat
window.handleImageUpload = window.handleFileUpload;

window.openNewTripModal = function() {
  state.showTripSelector = false;
  state.showNewTripModal = true;
  render();
};



window.closeNewTripModal = function() {
  state.showNewTripModal = false;
  render();
};

window.handleCreateTrip = function() {
  const name = document.getElementById('newTripName')?.value;
  const subtitle = document.getElementById('newTripSubtitle')?.value;
  const emoji = document.getElementById('newTripEmoji')?.value;
  const startDate = document.getElementById('newTripStart')?.value;
  const endDate = document.getElementById('newTripEnd')?.value;

  if (name && startDate && endDate) {
    createNewTrip({ name, subtitle, emoji, startDate, endDate });
    state.showNewTripModal = false;
    showToast(`${name} created!`, 'success');
    render();
  }
};

// ======== Settings & AI modal handlers ========

window.openSettingsModal = async function() {
  state.showSettingsModal = true;
  render();
  // Load existing API key
  if (window.electronAPI) {
    try {
      const key = await window.electronAPI.getApiKey();
      const input = document.getElementById('apiKeyInput');
      if (input && key) input.value = key;
    } catch(e) { /* ignore */ }
  }
};

window.closeSettingsModal = function() {
  state.showSettingsModal = false;
  render();
};

window.saveApiKey = async function() {
  const input = document.getElementById('apiKeyInput');
  if (input && window.electronAPI) {
    await window.electronAPI.setApiKey(input.value.trim());
    showToast('API key saved', 'success');
  }
};

window.toggleApiKeyVisibility = function() {
  const input = document.getElementById('apiKeyInput');
  if (input) {
    input.type = input.type === 'password' ? 'text' : 'password';
  }
};

window.closeAIResultModal = function() {
  if (state.aiParsing) return; // Don't close while parsing
  state.showAIResultModal = false;
  state.aiResult = null;
  state.aiError = null;
  state.aiImagePreview = null;
  state.aiPdfName = null;
  state.aiPdfDataUrl = null;
  render();
};

window.applyAIResultAction = function() {
  if (state.aiResult) {
    applyAIResult(state.aiResult);
  }
};

// ======== Transport edit handlers ========

window.showItemImage = async function(imageId) {
  if (!imageId) return;
  state.showImageLightbox = true;
  state.lightboxLoading = true;
  state.lightboxImageUrl = null;
  state.lightboxIsPdf = false;
  state.lightboxPdfName = null;
  render();

  try {
    const result = await window.electronAPI.loadImage(imageId);
    if (result.success && result.dataUrl) {
      if (result.isPdf) {
        state.lightboxIsPdf = true;
        state.lightboxPdfName = result.fileName || imageId;
        state.lightboxImageUrl = result.dataUrl;
      } else {
        state.lightboxImageUrl = result.dataUrl;
      }
    } else {
      console.error('Failed to load image:', result.error);
    }
  } catch (e) {
    console.error('Image load exception:', e);
  }
  state.lightboxLoading = false;
  render();
};

window.closeLightbox = function() {
  state.showImageLightbox = false;
  state.lightboxImageUrl = null;
  state.lightboxLoading = false;
  state.lightboxIsPdf = false;
  state.lightboxPdfName = null;
  render();
};

window.openPdfExternally = async function() {
  if (state.lightboxPdfName && window.electronAPI.openFile) {
    await window.electronAPI.openFile(state.lightboxPdfName);
  }
};

window.openEditTransport = function(type, id) {
  const trip = state.trips[state.currentTripId];
  const list = type === 'flight' ? trip.flights : trip.trains;
  const item = list.find(i => i.id === id);
  if (item) {
    state.editTransportItem = { ...item };
    state.editTransportType = type;
    state.showEditTransportModal = true;
    render();
  }
};

window.closeEditTransportModal = function() {
  state.showEditTransportModal = false;
  state.editTransportItem = null;
  state.editTransportType = null;
  render();
};

window.saveEditTransport = function() {
  const trip = state.trips[state.currentTripId];
  const type = state.editTransportType;
  const list = type === 'flight' ? trip.flights : trip.trains;
  const idx = list.findIndex(i => i.id === state.editTransportItem.id);
  if (idx === -1) return;

  const item = list[idx];

  // Read form values
  item.date = document.getElementById('etDate')?.value || item.date;
  item.from = document.getElementById('etFrom')?.value || item.from;
  item.to = document.getElementById('etTo')?.value || item.to;
  item.departTime = document.getElementById('etDepartTime')?.value || item.departTime;
  item.arriveTime = document.getElementById('etArriveTime')?.value || item.arriveTime;
  item.confirmation = document.getElementById('etConfirmation')?.value || '';
  item.seats = document.getElementById('etSeats')?.value || '';

  if (type === 'flight') {
    item.airline = document.getElementById('etAirline')?.value || '';
    item.flightNumber = document.getElementById('etFlightNumber')?.value || '';
    item.fromCode = document.getElementById('etFromCode')?.value || '';
    item.toCode = document.getElementById('etToCode')?.value || '';
  } else {
    item.operator = document.getElementById('etOperator')?.value || '';
  }

  saveTrips();
  state.showEditTransportModal = false;
  state.editTransportItem = null;
  state.editTransportType = null;
  render();
};

window.deleteTransport = function(type, id) {
  if (!confirm(`Delete this ${type}?`)) return;
  const trip = state.trips[state.currentTripId];
  const list = type === 'flight' ? trip.flights : trip.trains;
  const idx = list.findIndex(i => i.id === id);
  if (idx !== -1) {
    list.splice(idx, 1);
    saveTrips();
  }
  state.showEditTransportModal = false;
  state.editTransportItem = null;
  state.editTransportType = null;
  render();
};

// ======== Discover Events ========
window.discoverEvents = async function(destId) {
  const trip = state.trips[state.currentTripId];
  const dest = trip.destinations.find(d => d.id === destId);
  if (!dest) return;

  state.discoverEventsDestId = destId;
  state.showDiscoverEventsModal = true;
  state.discoverEventsLoading = true;
  state.discoverEventsResults = [];
  render();

  try {
    const response = await window.electronAPI.discoverEvents(
      dest.city, dest.country || '', dest.dates, trip
    );
    state.discoverEventsLoading = false;
    if (response.success && response.result) {
      state.discoverEventsResults = response.result;
    } else {
      state.discoverEventsResults = [];
      showToast(response.error || 'Could not discover events', 'error');
    }
  } catch (err) {
    state.discoverEventsLoading = false;
    state.discoverEventsResults = [];
    showToast('Failed to discover events', 'error');
  }
  render();
};

window.addDiscoverEvent = function(index) {
  const item = state.discoverEventsResults[index];
  if (!item) return;

  if (item.type === 'event') {
    addEventToTrip({
      name: item.name,
      date: item.date || '',
      time: item.time || '',
      eventType: item.eventType || 'activity',
      note: item.description || ''
    });
  } else {
    const destId = state.discoverEventsDestId;
    const parsed = {
      name: item.name,
      type: item.type || 'activity',
      category: item.category || 'activity',
      note: item.description || ''
    };
    if (item.type === 'restaurant') {
      addItemToDestination({ ...parsed, type: 'restaurant', category: item.category || 'food' }, destId);
    } else {
      addItemToDestination(parsed, destId);
    }
  }
  // Mark as added
  state.discoverEventsResults[index] = { ...item, _added: true };
  showToast(`Added "${item.name}"`, 'success');
  render();
};

window.closeDiscoverEventsModal = function() {
  state.showDiscoverEventsModal = false;
  state.discoverEventsResults = null;
  state.discoverEventsLoading = false;
  state.discoverEventsDestId = null;
  render();
};

// Initialize on load
document.addEventListener('DOMContentLoaded', init);
