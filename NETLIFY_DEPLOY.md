# Netlify Deployment Guide

## Environment Variables

Make sure to set the following environment variables in your Netlify dashboard (Site settings > Environment variables):

1. **GEMINI_API_KEY** - Your Google Gemini API key for the chatbot feature
   - Get your key from: https://makersuite.google.com/app/apikey
   - This is required for the chatbot to work

## Build Configuration

The project is configured to build for Netlify with:

- **Build command**: `pnpm run build`
- **Publish directory**: `dist/spa`
- **Functions directory**: `netlify/functions`

## API Endpoints

All API endpoints are handled by the Netlify serverless function at `netlify/functions/api.ts`:

- `GET /api/missions` - Fetch all missions
- `GET /api/planets` - Fetch all planets  
- `POST /api/chat/gemini` - Chatbot endpoint (requires GEMINI_API_KEY)
- `POST /api/missions/sync` - Sync missions (no-op in Netlify)
- `POST /api/planets/sync` - Sync planets (no-op in Netlify)
- `GET /api/ping` - Health check

## Troubleshooting

### Missions page shows "Failed to fetch missions"

1. Check Netlify function logs in the Netlify dashboard
2. Verify the build completed successfully
3. Check that `server/lib/nasa-api.ts` is accessible
4. Ensure the function has proper permissions

### Chatbot not working

1. Verify `GEMINI_API_KEY` is set in Netlify environment variables
2. Check function logs for API errors
3. Ensure the key has proper permissions for Gemini API

### Build errors

1. Make sure you're using `pnpm` (as specified in package.json)
2. Check that all dependencies are installed
3. Verify Node.js version compatibility (check `package.json`)

## Testing Locally

To test Netlify functions locally:

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Run local dev server
netlify dev
```

This will start a local server that mimics Netlify's environment.

