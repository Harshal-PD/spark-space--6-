# Supabase Integration Setup Guide

This guide walks you through setting up Supabase for the NASA missions and planets data storage.

## Step 1: Connect Supabase MCP

Click [Connect to Supabase](#open-mcp-popover) to manually connect your Supabase account to Builder.io.

## Step 2: Environment Variables

After connecting Supabase, you'll need to set the following environment variables in your project:

- **SUPABASE_URL**: Your Supabase project URL (found in Supabase dashboard > Settings > API)
- **SUPABASE_ANON_KEY**: Your Supabase anonymous public key (found in same location)

You can set these using the DevServerControl tool:

```
set_env_variable: ["SUPABASE_URL", "your-supabase-url"]
set_env_variable: ["SUPABASE_ANON_KEY", "your-supabase-anon-key"]
```

## Step 3: Create Database Tables

In your Supabase dashboard, go to SQL Editor and run the following SQL to create the required tables:

### Missions Table

```sql
CREATE TABLE IF NOT EXISTS missions (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  agency TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('Active', 'Completed', 'Planned')),
  planet TEXT NOT NULL,
  launch_date TEXT NOT NULL,
  completion_date TEXT,
  description TEXT NOT NULL,
  objectives TEXT[] NOT NULL,
  dataset_url TEXT NOT NULL,
  image_url TEXT,
  color TEXT NOT NULL,
  icon TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_missions_status ON missions(status);
CREATE INDEX IF NOT EXISTS idx_missions_planet ON missions(planet);
```

### Planets Table

```sql
CREATE TABLE IF NOT EXISTS planets (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  color TEXT NOT NULL,
  glow TEXT NOT NULL,
  short TEXT NOT NULL,
  description TEXT NOT NULL,
  facts JSONB NOT NULL,
  has_rings BOOLEAN DEFAULT FALSE,
  size NUMERIC,
  texture TEXT,
  ring_texture TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_planets_slug ON planets(slug);
CREATE INDEX IF NOT EXISTS idx_planets_name ON planets(name);
```

## Step 4: Enable Supabase Row Level Security (Optional)

For production, it's recommended to enable RLS on both tables. Add policies to allow public read access:

```sql
ALTER TABLE missions ENABLE ROW LEVEL SECURITY;
ALTER TABLE planets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "missions_select_public" ON missions FOR SELECT USING (true);
CREATE POLICY "planets_select_public" ON planets FOR SELECT USING (true);
```

## Step 5: Sync Data from NASA API

Once your tables are created and your environment variables are set, sync the data by making a POST request to:

```
POST /api/missions/sync
POST /api/planets/sync
```

Or in your browser/API client, visit:
- `http://localhost:5173/api/missions/sync` (for missions)
- `http://localhost:5173/api/planets/sync` (for planets)

## Step 6: Verify Data

Visit the following endpoints to verify the data has been synced:

- `http://localhost:5173/api/missions` - Get all missions
- `http://localhost:5173/api/planets` - Get all planets

## API Endpoints

### Get Missions
```
GET /api/missions
```

Response:
```json
[
  {
    "id": "curiosity",
    "name": "Curiosity Rover",
    "agency": "NASA",
    "status": "Active",
    "planet": "Mars",
    "launch_date": "November 26, 2011",
    "completion_date": null,
    "description": "...",
    "objectives": [...],
    "dataset_url": "...",
    "image_url": null,
    "color": "#ef4444",
    "icon": "🤖"
  }
]
```

### Sync Missions from NASA API
```
POST /api/missions/sync
```

Response:
```json
{
  "success": true,
  "count": 8
}
```

### Get Planets
```
GET /api/planets
```

Response:
```json
[
  {
    "id": "mercury",
    "slug": "mercury",
    "name": "Mercury",
    "color": "#9ca3af",
    "glow": "#60a5fa",
    "short": "...",
    "description": "...",
    "facts": [...],
    "has_rings": false,
    "size": 0.7,
    "texture": "...",
    "ring_texture": null
  }
]
```

### Sync Planets from NASA API
```
POST /api/planets/sync
```

Response:
```json
{
  "success": true,
  "count": 10
}
```

## Architecture Overview

### Backend Components

1. **server/lib/supabase.ts** - Supabase client initialization and type definitions
2. **server/lib/nasa-api.ts** - NASA API data fetching and transformation logic
3. **server/routes/missions.ts** - Missions API endpoints
4. **server/routes/planets.ts** - Planets API endpoints

### Frontend Components

1. **client/pages/Missions.tsx** - Missions page with API data fetching
2. **client/data/missions.ts** - Mission type definitions
3. **client/data/planets.ts** - Planet type definitions
4. **client/components/missions/MissionCard.tsx** - Mission card component

## Features

- ✅ Fetch missions from NASA API
- ✅ Fetch planets from NASA API
- ✅ Store data in Supabase for offline access
- ✅ REST API endpoints for frontend consumption
- ✅ Automatic data transformation from NASA format to app format
- ✅ Error handling and logging
- ✅ Row Level Security support

## Troubleshooting

### "Supabase credentials not configured"

Make sure you've set the `SUPABASE_URL` and `SUPABASE_ANON_KEY` environment variables. Use the DevServerControl tool to set them securely.

### Tables don't exist

Run the SQL scripts provided in Step 3 in your Supabase dashboard's SQL Editor.

### Data not syncing

1. Check that your environment variables are correct
2. Verify that your Supabase project is accessible
3. Check the server logs for any error messages
4. Ensure the tables have the correct schema

### API endpoints return empty data

Call the sync endpoints first to populate the database:
- POST `/api/missions/sync`
- POST `/api/planets/sync`

## Next Steps

- Monitor the sync endpoints and consider automating periodic syncs
- Add authentication if needed
- Implement caching strategies for better performance
- Add more NASA APIs for additional data sources
