const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods to the renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  // Trip operations
  loadTrips: () => ipcRenderer.invoke('trips:load'),
  saveTrips: (data) => ipcRenderer.invoke('trips:save', data),
  upsertTrip: (tripId, tripData) => ipcRenderer.invoke('trips:upsert', tripId, tripData),
  deleteTrip: (tripId) => ipcRenderer.invoke('trips:delete', tripId),
  exportTrip: (tripId) => ipcRenderer.invoke('trips:export', tripId),
  importTrip: () => ipcRenderer.invoke('trips:import'),

  // App info
  getVersion: () => ipcRenderer.invoke('app:version'),
  getDataPath: () => ipcRenderer.invoke('app:dataPath'),

  // AI Image & PDF Parsing
  parseImage: (imageBase64, mediaType, tripData) => ipcRenderer.invoke('ai:parseImage', imageBase64, mediaType, tripData),
  parsePdf: (pdfBase64, tripData) => ipcRenderer.invoke('ai:parsePdf', pdfBase64, tripData),
  quickAdd: (text, tripData) => ipcRenderer.invoke('ai:quickAdd', text, tripData),
  discoverEvents: (city, country, dates, tripData) => ipcRenderer.invoke('ai:discoverEvents', city, country, dates, tripData),

  // Image storage
  saveImage: (imageId, dataUrl) => ipcRenderer.invoke('images:save', imageId, dataUrl),
  loadImage: (imageId) => ipcRenderer.invoke('images:load', imageId),
  openFile: (fileName) => ipcRenderer.invoke('files:open', fileName),

  // Settings
  getApiKey: () => ipcRenderer.invoke('settings:getApiKey'),
  setApiKey: (key) => ipcRenderer.invoke('settings:setApiKey', key),

  // Platform info
  platform: process.platform
});
