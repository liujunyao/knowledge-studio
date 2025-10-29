# Repository Guidelines

## Project Structure & Module Organization
 - `frontend/` hosts the React + Electron client. Core UI sits in `frontend/src/` (`components/`, `services/`, `types/`), while Electron entry points live in `frontend/electron/`.
 - `backend/` holds the FastAPI service under `backend/app/` with `api/`, `models/`, `db/`, and `services/`. Stage Alembic migrations beside database modules.
 - `docs/` stores product and design notes, and `prototype/` keeps HTML spikes. Keep build output in `frontend/dist/` or `release/`, not in Git.

## Build, Test, and Development Commands
 - Frontend quick start: `cd frontend && pnpm dev` runs Vite; `pnpm electron:dev` opens the Electron shell once Vite is hot.
 - Production build: `cd frontend && pnpm build` emits `dist/`; `pnpm electron:build` packages desktop binaries into `release/`.
 - Backend API: `cd backend && uv run uvicorn app.main:app --reload --port 8000` for local development.
 - Dependencies: `uv pip install -r backend/requirements.txt` and `pnpm install --filter frontend...` keep Python and JS stacks aligned.

## Coding Style & Naming Conventions
 - TypeScript uses ESLint defaults (`pnpm lint`), 2-space indentation, PascalCase components, camelCase hooks/services, and kebab-case files.
 - Python modules use 4-space indentation, snake_case functions, and type hints; prefer FastAPI `Depends` for wiring.
 - Keep shared DTOs in `frontend/src/types` and mirror backend Pydantic field names to avoid remapping.

## Testing Guidelines
 - Frontend tests should adopt Vitest + React Testing Library; colocate specs as `ComponentName.test.tsx` beside the component and add a `pnpm test` script.
 - Backend tests should target Pytest; mirror `app/` structure under `backend/tests/` and run with `uv run pytest`.
 - Cover API contracts, store adapters, and knowledge graph transforms before merging significant features.

## Commit & Pull Request Guidelines
 - Use Conventional Commits (e.g., `feat: add knowledge graph renderer`); add bodies for schema or API changes.
 - PRs need scope summaries, testing evidence (`pnpm lint`, `pnpm build`, `pytest`), and linked issues. Add UI screenshots when relevant.
 - Keep scopes tight by separating backend schema, frontend UI, and documentation updates where possible.

## Security & Configuration Tips
 - Store API keys in Git-ignored `.env` files and load them through Pydantic `Settings`.
 - Never commit SQLite databases or Electron release artifacts. Scrub logs that could expose LLM payloads.

## 回复语言

**请总是用中文回复我的问题**