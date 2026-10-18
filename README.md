# Portfolio (SQLite + GitHub Pages)

Data lives in `data/portfolio.db` (SQLite, read in the browser with sql.js).

## Deploy
1. Create a GitHub repo, push this folder to `main`.
2. Settings > Pages > Deploy from branch `main` / root.
3. Edit `assets/js/config.js`: GH_OWNER, GH_REPO, GH_BRANCH, GOOGLE_CLIENT_ID (optional).
4. In `data/portfolio.db` > `users` table, set your real GitHub username (or edit it from /admin after first login with Google).

## Admin (hidden, not linked anywhere): `/admin/`
- Sign in with Google (needs a Google OAuth Web client ID, add your site URL as an authorized JavaScript origin) or with a GitHub fine-grained token (Contents: read/write on this repo only).
- Roles: admin (all tables + users), editor (only tables listed in `pages`), viewer (read-only).
- "Publish to GitHub" commits the updated `data/portfolio.db`; Pages updates within about a minute.

## Pages
index (home brief) · about · skills · experience · education · services · portfolio · contact.
Rows with `home=1` appear on the home page; `brief` is the short text shown there.

## Local preview
`python3 -m http.server` in this folder, open http://localhost:8000
