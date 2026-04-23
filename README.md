# gt-tax-credit-widget

Small **Vite + React + TypeScript** embed that calls **gt-api** `POST /calculator/calculate/` with `context.resource = tax-credit` and `country = CA`, matching the contract used by Giftabulator (`context` + `data` JSON body).

## Setup

```bash
npm install
cp .env.example .env
```

Set `VITE_API_BASE_URL` to your API root **including** the version path, for example:

`http://your-api-host/v2.1`

(no trailing slash required)

## Fonts

UI typography matches **gt-app**: headings use **Google Sans**, body uses **Roboto**, self-hosted under `public/font/` (same `.ttf` files as `gt-app/asset/font/`). If those files are missing, copy `GoogleSans-*.ttf` and `Roboto-*.ttf` from gt-app into `public/font/` so `src/fonts.css` can load them.

## Develop

```bash
npm run dev
```

Ensure **gt-api** allows your dev origin in `v2.1/config/cors.php` (e.g. `localhost` for Vite).

## Build

```bash
npm run build
```

Static output is in `dist/`.

## Docker

Build-time API URL (baked into the bundle):

```bash
docker build --build-arg VITE_API_BASE_URL=https://example.com/v2.1 -t gt-tax-credit-widget .
docker run -p 8080:80 gt-tax-credit-widget
```

## Optional dev proxy (CORS)

If `VITE_API_BASE_URL` points at another host, the browser may block requests
until **gt-api** CORS allows your dev origin. Alternatively:

1. Set `VITE_DEV_PROXY_TARGET` to your PHP origin (no path), e.g.
   `http://giftabulatornow.test`.
2. Set `VITE_API_BASE_URL=/__gt_api` so requests stay on the Vite origin; Vite
   forwards `/__gt_api/*` to `/v2.1/*` on that host (`vite.config.ts`).

## Publish to GitHub

If `gh` is not logged in yet: `gh auth login`, then from this folder:

```bash
gh repo create gt-tax-credit-widget --source=. --public --remote=origin --push
```

Use `--private` if you prefer. Or create an empty repo in the browser, then
`git remote add origin <url>` and `git push -u origin main`.

## Repo hygiene

Avoid workspace-wide globs like `**/*` at the project root: they traverse `node_modules` and can appear stuck. Prefer `src/**/*` or specific paths.
