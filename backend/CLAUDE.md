# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this directory.

## Commands

Install dependencies:

```bash
uv sync
```

Run dev server (http://127.0.0.1:8000):

```bash
uv run uvicorn app.main:app --reload
```

## Architecture

- FastAPI app in `app/main.py` registers routers under `/api` prefix
- Lifespan handler creates DB tables on startup
- Async SQLAlchemy + aiosqlite
- `app/main.py` — App setup and lifespan
- `app/database.py` — Async engine, session, `Base` class, `get_db()` dependency
- `app/models.py` — SQLAlchemy ORM models (Todo)
- `app/schemas.py` — Pydantic request/response schemas
- `app/routers/todos.py` — CRUD endpoints (GET/POST/PATCH/DELETE)

### API endpoints

- `GET /api/todos/` — List all (ordered by id DESC)
- `GET /api/todos/{todo_id}` — Get single todo
- `POST /api/todos/` — Create (201)
- `PATCH /api/todos/{todo_id}` — Update completion
- `DELETE /api/todos/{todo_id}` — Delete (204)

## Code Style

- Flake8 with max-line-length 120
- Python 3.12 (uv package manager)
