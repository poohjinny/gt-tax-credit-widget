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

## Repo hygiene

Avoid workspace-wide globs like `**/*` at the project root: they traverse `node_modules` and can appear stuck. Prefer `src/**/*` or specific paths.
