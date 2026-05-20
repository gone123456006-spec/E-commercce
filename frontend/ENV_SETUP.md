# Frontend Environment Configuration

## Environment Files Created

### `.env`
Contains development environment variables:
- `VITE_API_BASE_URL` - Backend API URL (example: https://ecommerce-api-6y9p.onrender.com)
- `VITE_APP_NAME` - Application name
- `VITE_APP_VERSION` - Application version
- `VITE_NODE_ENV` - Environment mode

### `.env.example`
Template file for environment setup (same as `.env` for reference)

### `.gitignore`
Configured to exclude:
- `node_modules/`
- `.env` and `.env.local`
- Build output (`dist/`, `build/`)
- Logs and OS files

## Using Environment Variables in Frontend

In Vite, environment variables must be prefixed with `VITE_` to be exposed to the client.

### Access in Code
```typescript
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const appName = import.meta.env.VITE_APP_NAME;
```

### Example Usage
If you want to use the API base URL instead of the proxy:

```typescript
// In AuthContext.tsx or LoginModal.tsx
const API_URL = import.meta.env.VITE_API_BASE_URL || '';

const response = await fetch(`${API_URL}/api/auth/send-otp`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ mobile })
});
```

## Current Setup

**Vite dev proxy (`/api` → backend):**

- By default, `/api` is proxied to your **deployed Render API** so the app works even when `localhost:5000` is not running (no more `ECONNREFUSED` in the terminal).
- To use your **local** backend instead, add to `.env` or `.env.local`:
  - `VITE_DEV_PROXY_TARGET=http://127.0.0.1:5000`
  - Then run `cd backend && npm run dev`.

If `VITE_API_BASE_URL` is set to a non-local URL, that URL is also used as the proxy target when `VITE_DEV_PROXY_TARGET` is unset.

**Without Proxy (Production):**

- `VITE_API_BASE_URL` is used directly in the built app.

