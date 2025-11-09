# Scripts

This directory contains automation scripts for the Europe-2026 trip planning repository.

## sync-issues-to-json.js

**Purpose**: Automatically sync GitHub Issues to the `trip-data.json` file.

### What It Does

This script fetches all open issues from the repository and categorizes them into structured data that gets added to `trip-data.json`. The Spark app can then consume this data to display itinerary details from issues.

### Issue Categories

The script automatically categorizes issues based on their titles:

- **Days**: Issues with "Day X" in the title (e.g., "- Day 1", "Day 2")
- **Things to Do**: Issues with "things to do" or 🎉 emoji
- **Restaurants**: Issues with "restaurant", 🍴 emoji, "dinner", or "€€"
- **Hotels**: Issues with "hotel", 🏨 emoji, or "accommodation"
- **Transportation**: Issues with ✈️, 🚆 emojis, "train", or "flight"
- **Other**: All other issues

### Output Structure

The script adds an `issues` section to `trip-data.json`:

```json
{
  "issues": {
    "lastSynced": "2025-11-09T15:00:00.000Z",
    "totalIssues": 79,
    "categories": {
      "days": {
        "count": 15,
        "issues": [
          {
            "issueNumber": 34,
            "title": "- Day 1 (in city by 10am)",
            "body": "",
            "labels": ["core itinerary"],
            "url": "https://github.com/holly-kassel/Europe-2026/issues/34",
            "createdAt": "2025-10-26T20:33:41Z",
            "updatedAt": "2025-11-09T14:55:29Z"
          }
        ]
      },
      "restaurants": {
        "count": 10,
        "issues": [ /* ... */ ]
      }
      /* ... other categories ... */
    }
  }
}
```

### Usage

#### Automatic (via GitHub Actions)

The script runs automatically when:
- Any issue is opened, edited, deleted, closed, or reopened
- Markdown files are pushed to the main branch
- Manually triggered via workflow_dispatch

#### Manual Execution

To run the script manually:

```bash
# Set the GitHub token (optional but recommended for higher rate limits)
export GITHUB_TOKEN=your_token_here

# Run the script
node scripts/sync-issues-to-json.js
```

### Requirements

- Node.js 20 or higher
- Internet connection to access GitHub API
- Optional: `GITHUB_TOKEN` environment variable for authentication

### How It Works

1. **Fetch Issues**: Retrieves all open issues from the repository using the GitHub API
2. **Parse & Categorize**: Analyzes each issue's title, body, and labels to determine its category
3. **Update JSON**: Adds or updates the `issues` section in `trip-data.json`
4. **Update Timestamp**: Updates the `trip.lastUpdated` field

### Rate Limits

- **Without Token**: 60 requests per hour
- **With Token**: 5,000 requests per hour

The script uses pagination and fetches up to 100 issues per request, so it typically uses 1-2 API requests for this repository.

### Error Handling

If the script encounters an error:
- It logs the error message to console
- Exits with code 1 (which will fail the GitHub Actions workflow)
- Does not modify `trip-data.json`

### Contributing

When adding new issue categories or modifying the parsing logic, update:
1. The `categorizeIssues()` function in the script
2. This README documentation
3. The API-INTEGRATION.md file with examples of the new structure
