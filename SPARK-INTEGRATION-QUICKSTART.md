# Quick Start: Connecting Your Spark App

This guide shows you how to quickly connect your GitHub Spark travel planning app to this repository's data feed.

## The 5-Minute Integration

### Step 1: Add the Fetch Function

Copy this code into your Spark app's JavaScript:

```javascript
// Fetch trip data from Europe-2026 repository
async function fetchTripData() {
  const response = await fetch('https://raw.githubusercontent.com/holly-kassel/Europe-2026/main/trip-data.json');
  return await response.json();
}
```

### Step 2: Load Data When App Starts

Add this to your app initialization:

```javascript
// When your app loads
async function initializeApp() {
  const tripData = await fetchTripData();
  
  // Now you have access to everything!
  console.log('Trip Info:', tripData.trip);
  console.log('Flights:', tripData.flights);
  console.log('Destinations:', tripData.destinations);
  
  // Display the data in your UI
  displayFlights(tripData.flights);
  displayDestinations(tripData.destinations);
  displayCountdown(tripData.trip.startDate);
}

// Call it
initializeApp();
```

### Step 3: Display the Data

Example: Show flights

```javascript
function displayFlights(flights) {
  const flightHTML = flights.map(flight => `
    <div class="flight-card">
      <h3>${flight.airline} Flight - ${flight.confirmationNumber}</h3>
      <p>${flight.departure.city} (${flight.departure.airport}) → 
         ${flight.arrival.city} (${flight.arrival.airport})</p>
      <p>Departs: ${flight.departure.date} at ${flight.departure.time}</p>
      <p>Arrives: ${flight.arrival.date} at ${flight.arrival.time}</p>
    </div>
  `).join('');
  
  document.getElementById('flights-container').innerHTML = flightHTML;
}
```

Example: Show destinations with Paris details

```javascript
function displayDestinations(destinations) {
  destinations.forEach(dest => {
    const destCard = `
      <div class="destination-card">
        <h2>${dest.city}, ${dest.country}</h2>
        <p>${dest.nights} nights: ${dest.checkIn} to ${dest.checkOut}</p>
        
        ${dest.id === 'paris' ? `
          <h3>Things to Do (${dest.thingsToDo.length})</h3>
          ${dest.thingsToDo.slice(0, 3).map(activity => `
            <div class="activity">
              <strong>${activity.name}</strong>
              <p>${activity.description}</p>
            </div>
          `).join('')}
          
          <h3>Restaurants (${dest.restaurants.length})</h3>
          ${dest.restaurants.slice(0, 3).map(restaurant => `
            <div class="restaurant">
              <strong>${restaurant.name}</strong> - ${restaurant.priceRange}
              <p>${restaurant.category}</p>
            </div>
          `).join('')}
        ` : ''}
      </div>
    `;
    
    document.getElementById('destinations-container').innerHTML += destCard;
  });
}
```

Example: Countdown timer

```javascript
function displayCountdown(startDate) {
  const start = new Date(startDate + 'T17:10:00-05:00');
  const now = new Date();
  const diff = start - now;
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
  document.getElementById('countdown').innerHTML = `
    <h2>Countdown to Europe!</h2>
    <p class="countdown-big">${days} days ${hours} hours</p>
    <p>Until departure: ${startDate}</p>
  `;
}
```

## What Data is Available?

### Trip Overview
- Trip name, dates, duration
- Travelers
- Last updated timestamp

### Flights (2 flights)
- Airline, confirmation numbers
- Departure/arrival cities, airports, dates, times
- Flight images (URLs)

### Trains (3 train journeys)
- Routes and stations
- Dates (times TBD)

### Destinations (4 stays)
- **Paris** - 4 nights with:
  - 7 things to do (attractions, markets, walking tours)
  - 10 restaurants (French, Michelin, casual, international)
  - 8+ events (concerts, festivals, exhibitions)
  - Transportation info
  
- **Rome (First Stay)** - 2 nights
- **Sorrento** - 4 nights (wedding location)
- **Rome (Second Stay)** - 1 night

Each destination includes:
- Check-in/check-out dates
- Number of nights
- Accommodation status
- Highlights

## Auto-Update Feature

The best part: **You don't need to update your Spark app manually!**

1. Edit trip info in this repository (markdown files or GitHub issues)
2. GitHub Actions automatically updates `trip-data.json`
3. Your Spark app fetches the latest data on next load
4. Everything stays in sync!

You can add a "Refresh" button to manually fetch updates:

```javascript
document.getElementById('refresh-btn').addEventListener('click', async () => {
  const newData = await fetchTripData();
  // Re-display everything with new data
  initializeApp();
});
```

Or auto-refresh every few minutes:

```javascript
// Refresh every 5 minutes
setInterval(async () => {
  const newData = await fetchTripData();
  initializeApp();
}, 5 * 60 * 1000);
```

## Need More Help?

Check out the full documentation:
- **[API-INTEGRATION.md](API-INTEGRATION.md)** - Complete integration guide with all examples
- **[trip-data.json](trip-data.json)** - View the actual data structure

## Testing Your Integration

Open your browser console in your Spark app and run:

```javascript
fetch('https://raw.githubusercontent.com/holly-kassel/Europe-2026/main/trip-data.json')
  .then(r => r.json())
  .then(data => console.log(data));
```

You should see the full trip data object!

---

**That's it!** Your Spark app is now connected to this repository and will always show the latest trip information. 🎉
