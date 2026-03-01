# zacharialentz-home

Homepage gateway for multiple projects under `zacharialentz.com`.

## Local
```bash
npm ci
npm run build
open public/index.html
```

## Deploy (Vercel)
1. Import this repo as a new Vercel project.
2. Keep `vercel.json` in repo.
3. Set custom domain `zacharialentz.com` on this project.
4. Keep `Candlestick_Cryptologist` project deployed separately.

## Private sign-in (single-owner)
Set these Environment Variables in Vercel for this project:
- `AUTH_USERNAME` (your username)
- `AUTH_PASSWORD` (your strong password)
- `AUTH_SESSION_TOKEN` (long random string, 40+ chars)

Middleware enforces auth for all project pages and API paths, except `/login` and auth endpoints.

## Add a project
Edit `projects.json`:
- add card metadata (`name`, `description`, `path`, `repo`)
- add matching rewrite in `vercel.json` if path proxies to another project

Then redeploy.
