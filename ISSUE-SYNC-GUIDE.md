# Issue Sync Guide

This guide explains how the automatic issue sync works and how to trigger it manually.

## What Gets Synced

All open issues in this repository are automatically synced to `trip-data.json`. Issues are categorized by their titles:

| Category | Examples | Emoji/Keywords |
|----------|----------|----------------|
| **Days** | "- Day 1", "Day 2" | Contains "day" |
| **Things to Do** | "🎉 Things to Do", "Visit The Panthéon" | 🎉 or "things to do" |
| **Restaurants** | "🍴 Restaurants", "La Petite Périgourdine" | 🍴, "restaurant", "€€", "dinner" |
| **Hotels** | "🏨 TBD", "Hôtel des Grands Hommes" | 🏨, "hotel", "accommodation" |
| **Transportation** | "✈️ ORD → CDG", "🚆 Paris → Rome" | ✈️, 🚆, "train", "flight" |
| **Other** | Everything else | N/A |

## Automatic Sync

The sync happens automatically when:

✅ **Any issue is created**  
✅ **Any issue is edited**  
✅ **Any issue is closed/reopened**  
✅ **Any issue is deleted**  
✅ **Markdown files are pushed to main branch**

## Manual Sync (Recommended for Initial Setup)

To capture all existing issues right now:

### Option 1: Via GitHub Actions (Easiest)

1. Go to the [Actions tab](https://github.com/holly-kassel/Europe-2026/actions)
2. Click "Update Trip Data JSON" in the left sidebar
3. Click "Run workflow" button (top right)
4. Click the green "Run workflow" button in the dropdown
5. Wait ~30 seconds for completion

### Option 2: Edit Any Issue

Simply edit any existing issue (even just adding a space) to trigger the workflow.

### Option 3: Local Testing

If you have Node.js installed locally:

```bash
# Clone the repo
git clone https://github.com/holly-kassel/Europe-2026.git
cd Europe-2026

# Optional: Set GitHub token for higher rate limits
export GITHUB_TOKEN=your_token_here

# Run the sync script
node scripts/sync-issues-to-json.js

# Check the updated file
cat trip-data.json | grep -A 10 '"issues"'
```

## Checking if Sync Worked

After triggering a sync, check:

1. **Actions Tab**: Workflow should show green checkmark ✅
2. **Commit History**: Look for "chore: sync issues to trip data [skip ci]"
3. **trip-data.json**: Should have an `issues` section with your data

You can view the JSON directly at:
```
https://raw.githubusercontent.com/holly-kassel/Europe-2026/main/trip-data.json
```

## Accessing Synced Data in Your Spark App

```javascript
// Fetch the trip data
const response = await fetch('https://raw.githubusercontent.com/holly-kassel/Europe-2026/main/trip-data.json');
const data = await response.json();

// Access issue data
console.log('Total issues:', data.issues.totalIssues);
console.log('Last synced:', data.issues.lastSynced);

// Get specific categories
const days = data.issues.categories.days.issues;
const restaurants = data.issues.categories.restaurants.issues;
const thingsToDo = data.issues.categories.thingsToDo.issues;

// Display day itineraries
days.forEach(day => {
  console.log(`${day.title}: ${day.body}`);
  console.log(`Issue #${day.issueNumber}: ${day.url}`);
});
```

## Issue Format Best Practices

For best categorization, format issue titles like:

✅ **Good Examples:**
- `- Day 1 (in city by 10am)`
- `🎉 Things to Do`
- `🍴 Restaurants`
- `Visit The Panthéon`
- `La Petite Périgourdine` (restaurant name)
- `🏨 Hôtel des Grands Hommes`
- `✈️ ORD (5:10pm) -> CDG (8:15am)`

❌ **Less Effective:**
- `TODO` (too generic, goes to "other")
- `test` (goes to "other")
- Generic titles without context

## Troubleshooting

### Workflow Failed

Check the [Actions tab](https://github.com/holly-kassel/Europe-2026/actions) for error details. Common issues:
- Network timeout (retry)
- GitHub API rate limit (wait an hour or add GITHUB_TOKEN)

### Issues Not Appearing

- Make sure the issue is **open** (closed issues are ignored)
- Check the issue title matches one of the patterns above
- Try manually triggering the workflow again

### Data Not Updating in Spark App

- Clear browser cache
- Check the raw URL is loading the latest version
- Add a cache-busting parameter: `?t=${Date.now()}`

## Questions?

For detailed technical documentation, see:
- [scripts/README.md](scripts/README.md) - How the sync script works
- [API-INTEGRATION.md](API-INTEGRATION.md) - Full API documentation
- [Issue #XX](https://github.com/holly-kassel/Europe-2026/pull/XX) - Original PR discussion

## Next Steps

1. ✅ **Trigger initial sync** to capture all existing issues
2. ✅ **Update your Spark app** to read from `data.issues.categories`
3. ✅ **Create new issues** as you plan - they'll sync automatically!
4. ✅ **Test the integration** by creating a test issue and verifying it appears in the JSON
