# WorldShield Deployment Guide

This guide deploys the frontend to Vercel and the FastAPI backend to Render, with a managed PostgreSQL database. The source stays together in one GitHub repository; the frontend and backend run as separate services.

> **Public deployment warning:** The current API does not enforce authentication. Several routes allow creating, editing, and deleting records without a login. `REQUIRE_AUTHORIZATION=true` is currently only a setting; it is not wired into route authorization. Do not expose this deployment to the public internet until authentication and authorization are implemented and tested. CORS is not authentication. For a private demo, protect access to both the frontend and API with an access-control layer.

## 1. Before Deploying

### Check the repository

- Push the project to a GitHub repository. Keeping the frontend and backend in the same repository is fine.
- Keep the repository private if it contains work that should not be public.
- Check `git status` before committing. The root `.gitignore` excludes `.env` files, the local SQLite database, Python virtual environments, `node_modules`, and build output. Do not commit credentials, production database URLs, or API keys.
- The frontend lockfile (`frontend/package-lock.json`) should be committed; Vercel will use it with `npm ci`.

### Add a PostgreSQL driver

The backend currently has SQLAlchemy but no PostgreSQL driver. Before setting `DATABASE_URL` to PostgreSQL, add this dependency to `backend/requirements.txt` and commit the change:

```text
psycopg[binary]
```

The backend and Alembic both read `DATABASE_URL` from settings, so the same hosted database URL is used by the app and migrations. Use a SQLAlchemy-compatible URL such as `postgresql+psycopg://...`. If your database provider gives a URL beginning with `postgres://` or `postgresql://`, change the scheme to `postgresql+psycopg://` when setting the environment variable.

## 2. Deploy the Backend and Database

These instructions use Render as an example. Other Python hosts work if they provide a persistent PostgreSQL database, environment variables, and a command to run migrations.

1. Create a managed PostgreSQL database with your backend host. Use the provider's private/internal connection URL when the database and API are in the same provider.
2. Create a Python web service from the GitHub repository.
3. Set the service's **Root Directory** to `backend`.
4. Configure the service commands:

   - Build: `pip install -r requirements.txt`
   - Pre-deploy/migration: `alembic upgrade head`
   - Start: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

   If the provider has no pre-deploy command, use this start command so migrations run before the server starts:

   ```sh
   alembic upgrade head && uvicorn app.main:app --host 0.0.0.0 --port $PORT
   ```

5. Add these environment variables to the backend service. Replace example values with the real values from your hosts:

   | Variable | Value |
   | --- | --- |
   | `WORLDSHIELD_ENV` | `production` |
   | `DATABASE_URL` | `postgresql+psycopg://...` from the managed database |
   | `BACKEND_CORS_ORIGINS` | JSON array of allowed frontend origins, e.g. `["https://worldshield.vercel.app"]` |
   | `AI_PROVIDER` | `mock` unless a real provider is configured |
   | `ENABLE_REAL_GIT_INGESTION` | `false` |
   | `ENABLE_REMOTE_TARGETS` | `false` |
   | `ALLOW_REMOTE_TARGETS` | `false` |
   | `ALLOW_REMOTE_VALIDATION` | `false` |
   | `SAFE_VALIDATION_ONLY` | `true` |

   Set the CORS value as a JSON array string in the provider dashboard. Add the exact Vercel production domain and any specific preview/staging domain that needs access. Do not use `*` as a shortcut.

6. Deploy the service and record its HTTPS URL, for example `https://worldshield-api.onrender.com`.
7. Check `https://<backend-host>/health`. It should return a JSON response with `"status":"ok"`. Check `/docs` during setup if needed; the current app exposes Swagger docs in production too, so restrict or disable them before a public production launch.

### Database and file persistence

- Use managed PostgreSQL for hosted data. The default SQLite database is intended for local development and should not be used on an ephemeral application filesystem.
- Run `alembic upgrade head` against the production database before serving traffic. Migrations are repeatable; do not run `seed_demo.py` against a real production database.
- `seed_demo.py` is only for a fresh demo database. Run it once from the `backend` directory if you want the sample project, target, assessment, and finding.
- If a deployed feature writes files under `STORAGE_ROOT`, use a persistent volume or object storage. The default `./storage` path may be erased when an instance is replaced. Do not store uploaded or generated user files on an ephemeral disk.
- Configure database backups and verify a restore procedure before storing important data.

## 3. Deploy the Frontend to Vercel

1. Import the same GitHub repository into Vercel.
2. Set **Root Directory** to `frontend`.
3. Use these build settings:

   - Framework preset: `Vite`
   - Install command: `npm ci`
   - Build command: `npm run build`
   - Output directory: `dist`

4. Add the following Vercel environment variable for the Production environment (and Preview if needed):

   | Variable | Value |
   | --- | --- |
   | `VITE_API_BASE_URL` | `https://<backend-host>/api/v1` |

   For example: `https://worldshield-api.onrender.com/api/v1`. This value is embedded at frontend build time; redeploy after changing it. Do not put secrets in `VITE_*` variables because they are public in the built JavaScript.

5. Deploy and open the Vercel URL. Confirm `/overview` loads and data-driven pages can reach the backend. Also open a nested route directly and refresh it. If Vercel returns a 404 for refreshed React Router routes, add `frontend/vercel.json` with an SPA rewrite:

   ```json
   {
     "rewrites": [
       { "source": "/(.*)", "destination": "/" }
     ]
   }
   ```

## 4. Verify the Deployment

Run these checks after both services are deployed:

1. `https://<backend-host>/health` returns `status: ok`.
2. `https://<backend-host>/api/v1/assessments/` returns JSON. It may be an empty list if the database has not been seeded.
3. `https://<vercel-host>/` serves the frontend.
4. In the browser developer tools, frontend API requests go to the configured backend URL and succeed without CORS errors.
5. Test a nested route directly, refresh it, and check the browser console and backend logs.
6. Verify that unauthorized users cannot access or modify data before enabling public access. This check will fail with the current API until authentication is implemented.

## 5. Important Current Limitations

- **No API authentication/authorization:** treat public access as blocked until implemented. Protecting only the frontend does not secure direct API requests.
- **CORS defaults are for local development:** set `BACKEND_CORS_ORIGINS` to the exact hosted frontend origins.
- **AI is not a hosted AI integration by default:** `AI_PROVIDER` defaults to `mock`. Configure a supported provider and keep its key only in backend environment variables if/when implemented.
- **Optional scanners and remote validation are disabled:** do not enable them just to make deployment appear complete. Configure and test their safety boundaries independently.
- **Health readiness is shallow:** `/ready` currently returns `ok` without checking database or file storage connectivity. Use database/API checks as part of deployment verification.

## Local Production-Build Checks

From the repository root:

```powershell
Push-Location .\frontend
npm ci
npm run build
Pop-Location

Push-Location .\backend
python -m pip install -r requirements.txt
python -m alembic upgrade head
Pop-Location
```

Use the repository's backend virtual environment instead of the global Python installation when running these commands locally. Do not point a local migration command at production unless you intentionally mean to migrate the hosted database.
