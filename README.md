# fastapi-react-todo
FastAPI React Todo

## Setup

### Backend

```bash
cd backend
```

```bash
uv sync
```

```bash
uv run uvicorn app.main:app --reload
```

Backend runs on http://localhost:8000

### Frontend

```bash
cd frontend
```

```bash
npm install
```

```bash
npm run dev
```

Frontend runs on http://localhost:5173

The Vite dev server proxies `/api` requests to the backend.

## Type-Safe API

API calls are fully type-safe through the following flow:

**Pydantic models → OpenAPI schema → TypeScript types**

To regenerate TypeScript types from the OpenAPI schema (backend must be running):

```bash
cd frontend
```

```bash
npm run generate:api
```

The generated types are used by the `openapi-fetch` client.
