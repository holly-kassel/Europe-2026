# Trip Planner Desktop App

A beautiful desktop application for managing all your travel plans. Built with Electron.

![Trip Planner](https://img.shields.io/badge/Platform-macOS%20%7C%20Windows%20%7C%20Linux-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## Features

- **Multi-Trip Support** - Manage multiple trips from one app
- **Natural Language Input** - Add items by typing "Visit the waterfall" or "Restaurant for dinner"
- **Screenshot Upload** - Drag & drop images to quickly add items
- **Offline Support** - All data stored locally, works without internet
- **Beautiful UI** - Clean, modern design with color-coded destinations
- **Cross-Platform** - Works on macOS, Windows, and Linux

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- npm (comes with Node.js)

### Installation

1. **Open Terminal and navigate to the app folder:**
   ```bash
   cd ~/TripPlannerApp
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the app:**
   ```bash
   npm start
   ```

That's it! The app will launch with your Europe and Mexico/Costa Rica trips pre-loaded.

## Building for Distribution

To create a standalone app you can share or install permanently:

### macOS
```bash
npm run build:mac
```
This creates a `.dmg` file in the `dist/` folder.

### Windows
```bash
npm run build:win
```
This creates an installer in the `dist/` folder.

### Linux
```bash
npm run build:linux
```
This creates an AppImage in the `dist/` folder.

## Usage

### Adding Items

**Quick Add Bar:**
- Type natural language like "Tacos for dinner" or "Visit the volcano"
- Press Enter or click Add
- Select which destination to add it to

**Drag & Drop:**
- Drag a screenshot onto the Quick Add area
- Edit the extracted text
- Add to your itinerary

### Managing Trips

- Click the trip emoji (top left) to switch between trips
- Click "Add New Trip" to create a new trip
- All changes are saved automatically

### Keyboard Shortcuts

- `Esc` - Close any open modal
- `Enter` - Submit quick add

## Data Storage

Your trip data is stored locally at:
- **macOS:** `~/Library/Application Support/trip-planner/trips-data.json`
- **Windows:** `%APPDATA%/trip-planner/trips-data.json`
- **Linux:** `~/.config/trip-planner/trips-data.json`

## Pre-loaded Trips

The app comes with two trips already set up:

1. **🌴 Mexico & Costa Rica 2026**
   - Mexico City (Aug 7-8)
   - Puerto Escondido - Sweet Retreat (Aug 8-15)
   - La Fortuna, Costa Rica (Aug 15-18)
   - Manuel Antonio, Costa Rica (Aug 18-22)

2. **🏰 Europe 2026**
   - Paris (Apr 23-27)
   - Rome (Apr 27-29, May 3-4)
   - Sorrento (Apr 29-May 3)

## Customization

### Adding App Icons

Create icons and place them in an `assets/` folder:
- `icon.icns` - macOS icon (512x512)
- `icon.ico` - Windows icon
- `icon.png` - Linux icon (512x512)

### Modifying Default Trips

Edit `src/app.js` and modify the `defaultTrips` object to change the pre-loaded trips.

## Troubleshooting

**App won't start:**
- Make sure Node.js is installed: `node --version`
- Delete `node_modules` and run `npm install` again

**Data not saving:**
- Check write permissions in the app data folder
- Try running as administrator (Windows) or with sudo (Linux)

**Build fails:**
- Make sure you have enough disk space
- On macOS, you may need Xcode Command Line Tools: `xcode-select --install`

## License

MIT License - feel free to modify and share!

---

Made with ❤️ for travelers everywhere
