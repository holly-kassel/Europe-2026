# How to Use These Prompts with GitHub Spark

## What is GitHub Spark?
GitHub Spark is an AI-powered tool that can generate web applications from natural language descriptions. It's perfect for quickly building custom apps without writing code.

## Quick Start Guide

### Option 1: Quick Prompt (Recommended for Fast Results)
1. Open [GitHub Spark](https://githubnext.com/projects/spark/)
2. Copy the entire content of **`SPARK_PROMPT.md`**
3. Paste it into GitHub Spark
4. Click "Generate" or "Create"
5. Your travel planning app will be built automatically!

### Option 2: Detailed Prompt (For More Customization)
1. Open [GitHub Spark](https://githubnext.com/projects/spark/)
2. Copy the entire content of **`GITHUB_SPARK_PROMPT.md`**
3. Paste it into GitHub Spark
4. Review the detailed specifications
5. Modify any features you want to change
6. Click "Generate" or "Create"

## What You'll Get

Your generated app will include:

✅ **Visual Timeline** - See your entire trip at a glance  
✅ **Pre-loaded Data** - All flights, dates, and destinations already filled in  
✅ **Planning Tools** - Packing lists, budget tracking, activity planning  
✅ **Hotel Tracker** - Add accommodation details as you book  
✅ **Train Schedule** - Fill in train times when available  
✅ **Mobile-Friendly** - Use it on your phone during the trip  
✅ **Offline Capable** - Access your plans without internet  

## Tips for Best Results

- **Use the Quick Prompt first** - It's optimized for GitHub Spark and will give you a working app faster
- **Test the app** - After generation, click through all features to make sure they work
- **Customize further** - You can ask GitHub Spark to modify specific features after the initial generation
- **Save your work** - GitHub Spark will host your app, and you can access it anytime

## Need Changes?

After generating the app, you can ask GitHub Spark to make changes like:
- "Add a section for travel insurance details"
- "Make the colors more blue and gold"
- "Add a currency converter"
- "Include a section for emergency contacts"

## Example Modifications You Might Want

Simply tell GitHub Spark:
- "Add a weather forecast widget for each city"
- "Include a photo gallery section"
- "Add restaurant recommendations for Paris"
- "Create a daily checklist for each day of the trip"

---

## Connecting Your Spark App to Live Data

After creating your Spark app, you can connect it to this repository for automatic data updates!

### 🔗 API Integration

Your Spark app can fetch real-time trip data from this repository:

**Data Endpoint:** `https://raw.githubusercontent.com/holly-kassel/Europe-2026/main/trip-data.json`

**Quick Start Guide:** [SPARK-INTEGRATION-QUICKSTART.md](SPARK-INTEGRATION-QUICKSTART.md)  
**Full Documentation:** [API-INTEGRATION.md](API-INTEGRATION.md)

### How It Works

1. **You update trip info** in this repository (flights, hotels, activities, etc.)
2. **GitHub Actions automatically updates** the JSON data file
3. **Your Spark app fetches** the latest data on page load or refresh
4. **Everything stays in sync** automatically!

### Benefits

✅ Update once in this repo, see changes everywhere  
✅ No need to manually update your Spark app  
✅ All travelers see the same information  
✅ Easy to keep track of bookings and confirmations  
✅ Structured data ready for your app to use  

**Integration takes just 5 minutes!** Check out [SPARK-INTEGRATION-QUICKSTART.md](SPARK-INTEGRATION-QUICKSTART.md) to get started.

---

**Ready to start?** Open `SPARK_PROMPT.md`, copy the content, and paste it into GitHub Spark!
