# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this directory.

## Commands

Install dependencies:

```bash
npm install
```

Run Vite dev server (proxies /api to backend):

```bash
npm run dev
```

Type-check + production build:

```bash
npm run build
```

ESLint:

```bash
npm run lint
```

Regenerate OpenAPI types (backend must be running):

```bash
npm run generate:api
```

## Architecture

- Single-page React 19 app
- `src/App.tsx` — todo CRUD logic
- `src/api/client.ts` — openapi-fetch client
- `src/api/schema.d.ts` — OpenAPI generated types
- Vite proxies `/api` to `http://127.0.0.1:8000`

## Code Style

- Single quotes, no semicolons
- Use label wrapping for checkbox + text (not separate onClick handlers)
