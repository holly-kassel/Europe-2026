# API Integration for GitHub Spark App

This document explains how to integrate the Europe-2026 trip planning data with your GitHub Spark-generated web application.

## Overview

This repository serves as the **source of truth** for all trip planning data. The data is exposed in a structured JSON format that your Spark app can fetch and display. When you update the data in this repository (by editing markdown files), the JSON data file will be automatically updated via GitHub Actions.

## Data Source

**JSON Data File:** `trip-data.json`  
**Raw URL:** `https://raw.githubusercontent.com/holly-kassel/Europe-2026/main/trip-data.json`

## Integration Methods

### Method 1: Direct Fetch in Spark App (Recommended)

Add this JavaScript code to your GitHub Spark application to fetch and use the trip data:

```javascript
// Fetch trip data from the Europe-2026 repository
async function fetchTripData() {
  const dataUrl = 'https://raw.githubusercontent.com/holly-kassel/Europe-2026/main/trip-data.json';
  
  try {
    const response = await fetch(dataUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const tripData = await response.json();
    return tripData;
  } catch (error) {
    console.error('Error fetching trip data:', error);
    return null;
  }
}

// Use the data in your app
async function loadTripInformation() {
  const data = await fetchTripData();
  
  if (data) {
    // Access trip information
    console.log('Trip:', data.trip.name);
    console.log('Dates:', data.trip.startDate, 'to', data.trip.endDate);
    
    // Display flights
    data.flights.forEach(flight => {
      console.log(`${flight.airline} ${flight.confirmationNumber}`);
      console.log(`${flight.departure.city} → ${flight.arrival.city}`);
    });
    
    // Display destinations
    data.destinations.forEach(destination => {
      console.log(`${destination.city} (${destination.nights} nights)`);
      console.log(`Check-in: ${destination.checkIn}, Check-out: ${destination.checkOut}`);
    });
    
    // Access Paris recommendations
    const paris = data.destinations.find(d => d.id === 'paris');
    if (paris) {
      console.log('Things to do in Paris:', paris.thingsToDo.length);
      console.log('Restaurants in Paris:', paris.restaurants.length);
    }
  }
}

// Call when your app loads
loadTripInformation();
```

### Method 2: Periodic Auto-Refresh

To keep your Spark app always up-to-date with the latest data, implement periodic refresh:

```javascript
// Cache the data and refresh periodically
let cachedTripData = null;
let lastFetch = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

async function getTripData(forceRefresh = false) {
  const now = Date.now();
  
  // Return cached data if still fresh
  if (!forceRefresh && cachedTripData && lastFetch && (now - lastFetch < CACHE_DURATION)) {
    return cachedTripData;
  }
  
  // Fetch fresh data
  const data = await fetchTripData();
  if (data) {
    cachedTripData = data;
    lastFetch = now;
  }
  
  return cachedTripData;
}

// Refresh data every 5 minutes
setInterval(async () => {
  await getTripData(true);
  console.log('Trip data refreshed');
  // Update your UI here
}, 5 * 60 * 1000);
```

### Method 3: Manual Refresh Button

Add a refresh button to your Spark app:

```javascript
// HTML button
// <button id="refreshDataBtn">Refresh Trip Data</button>

document.getElementById('refreshDataBtn').addEventListener('click', async () => {
  const button = event.target;
  button.disabled = true;
  button.textContent = 'Refreshing...';
  
  const data = await getTripData(true);
  
  if (data) {
    // Update your UI with fresh data
    updateUI(data);
    button.textContent = 'Data Updated!';
    setTimeout(() => {
      button.textContent = 'Refresh Trip Data';
      button.disabled = false;
    }, 2000);
  } else {
    button.textContent = 'Error - Try Again';
    button.disabled = false;
  }
});
```

## Data Structure Reference

The JSON data file contains the following main sections:

### Trip Information
```json
{
  "trip": {
    "name": "Europe 2026 - Holly and Phil's Trip",
    "startDate": "2026-04-22",
    "endDate": "2026-05-04",
    "duration": 13,
    "travelers": ["Holly", "Phil"]
  }
}
```

### Flights
```json
{
  "flights": [
    {
      "id": "outbound",
      "airline": "Delta",
      "confirmationNumber": "HPQVMQ",
      "departure": {
        "airport": "ORD",
        "city": "Chicago",
        "date": "2026-04-22",
        "time": "17:10"
      },
      "arrival": {
        "airport": "CDG",
        "city": "Paris",
        "date": "2026-04-23",
        "time": "08:15"
      }
    }
  ]
}
```

### Trains
```json
{
  "trains": [
    {
      "id": "paris-rome",
      "route": "Paris to Rome",
      "departure": {
        "station": "Paris Gare de Lyon",
        "city": "Paris",
        "date": "2026-04-27",
        "time": "TBD"
      },
      "status": "TBD"
    }
  ]
}
```

### Destinations
```json
{
  "destinations": [
    {
      "id": "paris",
      "city": "Paris",
      "country": "France",
      "neighborhood": "Latin Quarter",
      "checkIn": "2026-04-23",
      "checkOut": "2026-04-27",
      "nights": 4,
      "accommodation": {
        "status": "TBD"
      },
      "thingsToDo": [...],
      "restaurants": [...],
      "events": [...]
    }
  ]
}
```

## Example UI Components

### Display Countdown Timer
```javascript
function updateCountdown(tripData) {
  const departureDate = new Date(tripData.trip.startDate + 'T17:10:00-05:00'); // Chicago time
  const now = new Date();
  const diff = departureDate - now;
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
  document.getElementById('countdown').textContent = 
    `${days} days, ${hours} hours until departure!`;
}
```

### Display Flight Cards
```javascript
function displayFlights(flights) {
  const container = document.getElementById('flights-container');
  container.innerHTML = '';
  
  flights.forEach(flight => {
    const card = document.createElement('div');
    card.className = 'flight-card';
    card.innerHTML = `
      <h3>${flight.type === 'outbound' ? '✈️ Outbound' : '✈️ Return'} Flight</h3>
      <p><strong>${flight.airline}</strong> - Confirmation: ${flight.confirmationNumber}</p>
      <div class="flight-route">
        <div class="departure">
          <strong>${flight.departure.city} (${flight.departure.airport})</strong><br>
          ${flight.departure.date} at ${flight.departure.time}
        </div>
        <div class="arrow">→</div>
        <div class="arrival">
          <strong>${flight.arrival.city} (${flight.arrival.airport})</strong><br>
          ${flight.arrival.date} at ${flight.arrival.time}
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}
```

### Display Destination Timeline
```javascript
function displayTimeline(destinations) {
  const timeline = document.getElementById('timeline');
  timeline.innerHTML = '';
  
  destinations.forEach((dest, index) => {
    const item = document.createElement('div');
    item.className = 'timeline-item';
    item.innerHTML = `
      <div class="timeline-marker">${index + 1}</div>
      <div class="timeline-content">
        <h3>${dest.city}, ${dest.country}</h3>
        <p>${dest.nights} night${dest.nights > 1 ? 's' : ''}</p>
        <p>${dest.checkIn} to ${dest.checkOut}</p>
        ${dest.accommodation.status === 'TBD' ? 
          '<span class="badge tbd">Hotel TBD</span>' : 
          `<span class="badge confirmed">${dest.accommodation.name}</span>`
        }
      </div>
    `;
    timeline.appendChild(item);
  });
}
```

### Display Paris Recommendations
```javascript
function displayParisRecommendations(paris) {
  // Things to Do
  const thingsContainer = document.getElementById('paris-things-to-do');
  paris.thingsToDo.forEach(activity => {
    const card = document.createElement('div');
    card.className = 'activity-card';
    card.innerHTML = `
      <h4>${activity.name}</h4>
      <p class="category">${activity.category}</p>
      <p>${activity.description}</p>
      <p class="location">📍 ${activity.location}</p>
      <p class="access">🚇 ${activity.access}</p>
      ${activity.notes ? `<p class="notes"><em>${activity.notes}</em></p>` : ''}
    `;
    thingsContainer.appendChild(card);
  });
  
  // Restaurants
  const restaurantContainer = document.getElementById('paris-restaurants');
  paris.restaurants.forEach(restaurant => {
    const card = document.createElement('div');
    card.className = 'restaurant-card';
    card.innerHTML = `
      <h4>${restaurant.name}</h4>
      <p class="category">${restaurant.category}</p>
      <p class="price">${restaurant.priceRange}</p>
      <p>${restaurant.atmosphere}</p>
      <p class="specialties"><strong>Specialties:</strong> ${restaurant.specialties.join(', ')}</p>
      <p class="location">📍 ${restaurant.location}</p>
      ${restaurant.notes ? `<p class="notes"><em>${restaurant.notes}</em></p>` : ''}
    `;
    restaurantContainer.appendChild(card);
  });
  
  // Events
  const eventsContainer = document.getElementById('paris-events');
  paris.events.forEach(event => {
    const card = document.createElement('div');
    card.className = 'event-card';
    card.innerHTML = `
      <h4>${event.name}</h4>
      ${event.dates ? `<p class="dates">📅 ${event.dates}</p>` : ''}
      ${event.venues ? `<p class="venues">📍 ${event.venues.join(', ')}</p>` : ''}
      <p>${event.description}</p>
      ${event.notes ? `<p class="notes"><em>${event.notes}</em></p>` : ''}
    `;
    eventsContainer.appendChild(card);
  });
}
```

## Automatic Updates

When you make changes to the markdown files in this repository (like `README.md` or `paris-recommendations.md`) or when you create, edit, or update GitHub issues, a GitHub Actions workflow automatically:

1. Extracts the updated information
2. Regenerates the `trip-data.json` file
3. Commits and pushes the changes
4. Makes the updated data available at the raw GitHub URL

Your Spark app will automatically receive the latest data on its next fetch (either on page load, periodic refresh, or manual refresh).

## CORS and Security

The raw GitHub content URL (`raw.githubusercontent.com`) includes proper CORS headers, so you can fetch the data directly from your Spark app without any proxy or backend service.

## Error Handling

Always implement proper error handling in your Spark app:

```javascript
async function loadTripData() {
  try {
    const data = await getTripData();
    
    if (!data) {
      showErrorMessage('Unable to load trip data. Using cached version if available.');
      return;
    }
    
    // Validate data structure
    if (!data.trip || !data.flights || !data.destinations) {
      throw new Error('Invalid data structure');
    }
    
    updateUI(data);
    
  } catch (error) {
    console.error('Error loading trip data:', error);
    showErrorMessage('Error loading trip information. Please try again later.');
  }
}
```

## Testing

You can test the API endpoint directly:

1. Open your browser's developer console
2. Run:
```javascript
fetch('https://raw.githubusercontent.com/holly-kassel/Europe-2026/main/trip-data.json')
  .then(r => r.json())
  .then(data => console.log(data));
```

## Support and Updates

- **Data Source Repository:** https://github.com/holly-kassel/Europe-2026
- **Spark App Repository:** https://github.com/holly-kassel/europe-2026-trip-pla
- **Last Updated:** Check the `metadata.lastUpdated` field in the JSON data

## Next Steps

1. Copy the fetch code examples into your Spark app
2. Test the data retrieval
3. Build UI components to display the data
4. Implement auto-refresh or manual refresh functionality
5. Add offline caching using localStorage or Service Workers for use during travel

---

**Note:** This integration allows your Spark app to stay synchronized with the planning repository. As you add hotels, train times, activities, and other details to this repository, your Spark app will automatically receive and display the updates!
