# Ecommerce Monorepo

This project has two apps:

- `frontend/` - Vite React client
- `backend/` - Node/Express API (source code inside `backend/src`)

## Backend Quick Find

- Backend entry file: `backend/src/server.js`
- Backend routes: `backend/src/routes/`
- Backend controllers: `backend/src/controllers/`
- Render blueprint uses backend root: `render.yaml` with `rootDir: backend`

## Vercel Deployment

### If you get 404 NOT_FOUND:

1. **Vercel Dashboard** → Project → **Settings** → **General**
2. Set **Root Directory** to `frontend` (click Edit, enter `frontend`, save)
3. **Build & Development Settings**:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. **Redeploy** (Deployments → ⋮ → Redeploy)

The `frontend/vercel.json` contains rewrites so client-side routes (e.g. `/category/clothes`) work correctly.
