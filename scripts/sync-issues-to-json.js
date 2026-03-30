#!/usr/bin/env node

/**
 * Sync GitHub Issues to trip-data.json
 * 
 * This script fetches all open issues from the repository and updates
 * the trip-data.json file with structured data from those issues.
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Configuration
const REPO_OWNER = 'holly-kassel';
const REPO_NAME = 'Europe-2026';
const TRIP_DATA_PATH = path.join(__dirname, '..', 'trip-data.json');

/**
 * Make an HTTPS GET request to GitHub API
 */
function githubRequest(url) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'Europe-2026-Sync-Script',
        'Accept': 'application/vnd.github.v3+json'
      }
    };
    
    // Add authentication token if available
    if (process.env.GITHUB_TOKEN) {
      options.headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    https.get(url, options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`GitHub API returned ${res.statusCode}: ${data}`));
        }
      });
    }).on('error', reject);
  });
}

/**
 * Fetch all open issues from the repository
 */
async function fetchAllIssues() {
  const issues = [];
  let page = 1;
  const perPage = 100;
  
  while (true) {
    const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/issues?state=open&per_page=${perPage}&page=${page}`;
    console.log(`Fetching issues page ${page}...`);
    
    const pageIssues = await githubRequest(url);
    
    if (pageIssues.length === 0) break;
    
    // Filter out pull requests (they show up in the issues API)
    const actualIssues = pageIssues.filter(issue => !issue.pull_request);
    issues.push(...actualIssues);
    
    if (pageIssues.length < perPage) break;
    page++;
  }
  
  console.log(`Fetched ${issues.length} open issues`);
  return issues;
}

/**
 * Parse issue title and body to extract structured data
 */
function parseIssue(issue) {
  const title = issue.title.trim();
  const body = (issue.body || '').trim();
  const labels = issue.labels.map(l => l.name);
  
  return {
    issueNumber: issue.number,
    title,
    body,
    labels,
    url: issue.html_url,
    createdAt: issue.created_at,
    updatedAt: issue.updated_at
  };
}

/**
 * Categorize issues based on their titles and labels
 */
function categorizeIssues(issues) {
  const categories = {
    days: [],
    thingsToDo: [],
    restaurants: [],
    hotels: [],
    transportation: [],
    other: []
  };
  
  issues.forEach(issue => {
    const parsed = parseIssue(issue);
    const title = parsed.title.toLowerCase();
    
    // Check for day-specific issues
    if (title.includes('day ') || title.match(/^-+\s*day\s+\d+/i)) {
      categories.days.push(parsed);
    }
    // Check for things to do
    else if (title.includes('things to do') || title.includes('🎉')) {
      categories.thingsToDo.push(parsed);
    }
    // Check for restaurants
    else if (title.includes('restaurant') || title.includes('🍴') || 
             title.includes('dinner') || title.includes('€€')) {
      categories.restaurants.push(parsed);
    }
    // Check for hotels
    else if (title.includes('hotel') || title.includes('🏨') || 
             title.includes('accommodation')) {
      categories.hotels.push(parsed);
    }
    // Check for transportation
    else if (title.includes('✈️') || title.includes('🚆') || 
             title.includes('train') || title.includes('flight')) {
      categories.transportation.push(parsed);
    }
    // Everything else
    else {
      categories.other.push(parsed);
    }
  });
  
  return categories;
}

/**
 * Update trip-data.json with issue data
 */
function updateTripData(categorizedIssues) {
  console.log('Reading trip-data.json...');
  const tripData = JSON.parse(fs.readFileSync(TRIP_DATA_PATH, 'utf8'));
  
  // Add or update the issues section
  tripData.issues = {
    lastSynced: new Date().toISOString(),
    totalIssues: Object.values(categorizedIssues).reduce((sum, arr) => sum + arr.length, 0),
    categories: {
      days: {
        count: categorizedIssues.days.length,
        issues: categorizedIssues.days
      },
      thingsToDo: {
        count: categorizedIssues.thingsToDo.length,
        issues: categorizedIssues.thingsToDo
      },
      restaurants: {
        count: categorizedIssues.restaurants.length,
        issues: categorizedIssues.restaurants
      },
      hotels: {
        count: categorizedIssues.hotels.length,
        issues: categorizedIssues.hotels
      },
      transportation: {
        count: categorizedIssues.transportation.length,
        issues: categorizedIssues.transportation
      },
      other: {
        count: categorizedIssues.other.length,
        issues: categorizedIssues.other
      }
    }
  };
  
  // Update the lastUpdated timestamp in the trip section
  tripData.trip.lastUpdated = new Date().toISOString();
  
  console.log('Writing updated trip-data.json...');
  fs.writeFileSync(TRIP_DATA_PATH, JSON.stringify(tripData, null, 2) + '\n', 'utf8');
  
  console.log('trip-data.json updated successfully!');
  console.log(`Summary:
  - Days: ${categorizedIssues.days.length}
  - Things to Do: ${categorizedIssues.thingsToDo.length}
  - Restaurants: ${categorizedIssues.restaurants.length}
  - Hotels: ${categorizedIssues.hotels.length}
  - Transportation: ${categorizedIssues.transportation.length}
  - Other: ${categorizedIssues.other.length}
  `);
}

/**
 * Main execution
 */
async function main() {
  try {
    console.log('Starting GitHub Issues sync...\n');
    
    const issues = await fetchAllIssues();
    const categorizedIssues = categorizeIssues(issues);
    updateTripData(categorizedIssues);
    
    console.log('\n✅ Sync completed successfully!');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Run the script
main();
