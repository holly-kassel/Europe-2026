# GitHub Spark Prompt: Europe 2026 Travel Planning App

## App Overview
Create a travel planning web application for Holly and Phil's Europe trip in April-May 2026. The app should help visualize, organize, and manage their 13-day European vacation itinerary visiting Paris, Rome, and Sorrento for Aubrey's wedding.

## Core Features

### 1. Interactive Itinerary Timeline
- Display a visual timeline of the entire trip from April 22 to May 4, 2026
- Show each destination with date ranges
- Include travel days with flight and train information
- Color-code different cities (e.g., Paris in blue, Rome in red, Sorrento in green)
- Make it responsive and mobile-friendly

### 2. Destination Cards
Create detailed cards for each location with:
- **Paris** (April 23-27, 2026)
  - Duration: 4 nights
  - Hotel status: TBD
  - Activities section (to be filled)
  
- **Rome - First Stay** (April 27-29, 2026)
  - Duration: 2 nights
  - Hotel status: TBD
  - Activities section (to be filled)
  
- **Sorrento** (April 29 - May 3, 2026)
  - Duration: 4 nights
  - Hotel status: TBD
  - Activities section (to be filled)
  - Note: Wedding event location
  
- **Rome - Second Stay** (May 3-4, 2026)
  - Duration: 1 night
  - Hotel status: TBD
  - Activities section (to be filled)

### 3. Travel Details Dashboard
Display all transportation information:

**Outbound Flight:**
- Route: Chicago (ORD) → Paris (CDG)
- Date: Wednesday, April 22, 2026
- Departure: 5:10 PM
- Arrival: 8:15 AM (next day)
- Airline: Delta
- Confirmation: HPQVMQ

**Return Flight:**
- Route: Rome (FCO) → Chicago (ORD)
- Date: Monday, May 4, 2026
- Departure: 11:05 AM
- Arrival: 2:30 PM (same day)
- Airline: American
- Confirmation: ADHASP

**Train Journeys (TBD):**
- Paris Gare de Lyon → Roma Termini (April 27)
- Roma Termini → Napoli Centrale → Sorrento (April 29)
- Sorrento → Napoli Centrale → Roma Termini (May 3)

### 4. Planning Features
- **Accommodation Tracker**: Section to add hotel details for each city (currently TBD)
- **Train Schedule Manager**: Form to add and update train times and booking details
- **Daily Activities Planner**: Add activities, restaurants, and sights for each day
- **Notes Section**: Free-form notes for each destination
- **Packing List**: Interactive checklist for trip preparation
- **Budget Tracker**: Track expenses by category (accommodation, food, activities, transport)

### 5. Countdown Timer
- Display days/hours remaining until departure (April 22, 2026, 5:10 PM from Chicago)
- Show a progress indicator for trip planning completion

### 6. Map View
- Interactive map showing the travel route
- Pins for each destination city
- Flight and train routes visualized

## Design Requirements

### Visual Style
- Clean, modern interface with a travel/vacation theme
- Use a pleasant color palette (blues, greens, warm earth tones)
- Include icons for flights ✈️, trains 🚆, hotels 🏨, activities 🎭
- Responsive design that works on mobile, tablet, and desktop

### User Experience
- Easy navigation between sections
- Quick access to important information (confirmation numbers, times)
- Ability to toggle between different views (timeline, list, map)
- Print-friendly format for taking on the trip

## Technical Specifications

### Data Storage
- Use local storage to persist user additions (hotels, activities, notes)
- Pre-populate with all existing information from the itinerary
- Export/import functionality for backup

### Sections to Implement
1. **Home Dashboard**: Overview with countdown and trip summary
2. **Full Itinerary**: Day-by-day detailed view
3. **Flights & Transport**: All travel bookings in one place
4. **Accommodations**: Hotel booking details
5. **Activities**: Things to do in each city
6. **Planning Tools**: Packing list, budget, notes
7. **Quick Reference**: Important info (confirmation codes, addresses, emergency contacts)

## Initial Data to Include

### Trip Dates
- **Start**: Wednesday, April 22, 2026
- **End**: Monday, May 4, 2026
- **Total Duration**: 13 days

### Confirmed Bookings
- Delta flight ORD-CDG (HPQVMQ)
- American flight FCO-ORD (ADHASP)

### Destinations
- Paris: 4 nights
- Rome (Split): 3 nights total (2 + 1)
- Sorrento: 4 nights

## Optional Enhancements
- Weather forecasts for each destination (closer to trip date)
- Currency converter for Euros
- Translation tools or common phrases
- Restaurant recommendations
- Photo gallery section for trip memories
- Sharing capability to share itinerary with friends/family
- Offline mode for accessing during travel

## Example Use Cases
1. User opens app and sees countdown to departure
2. User clicks on Paris and sees 4-day stay with option to add hotel and activities
3. User navigates to Flights section and sees both flight confirmations with times
4. User adds items to packing list and checks them off
5. User enters hotel booking information for Paris stay
6. User exports entire itinerary as PDF for offline reference

## Success Criteria
- All existing trip information is clearly displayed
- Users can easily add and edit planning details
- The app is intuitive and visually appealing
- Information is organized logically by date and location
- App works smoothly on mobile devices for use during travel

---

**Note**: This app is specifically for Holly and Phil's Europe 2026 trip. All dates, locations, and confirmation numbers should be pre-populated as shown above.