# Scores Service

The **Scores Service** records completed Sudoku game results and provides a per‑difficulty top‑10 leaderboard.

## Overview

- **POST `/scores`** – Store a player's result.
- **GET `/leaderboard?difficulty=easy|medium|hard`** – Retrieve the best 10 times for a difficulty.
- Persistence is handled with SQLite via **better‑sqlite3**.
- The service is built with **Express** and **TypeScript**.

## Getting Started

```bash
# Install dependencies (run from the repository root)
npm install --include=dev

# Build the package
npm run --workspace=@init-sudoku-post2/scores-service build

# Run the service (defaults to port 3000)
npm run --workspace=@init-sudoku-post2/scores-service start
```

The server will listen on `http://localhost:3000`.

## API Specification

### POST `/scores`

**Request** (`ScoreRequest` from `@init-sudoku-post2/contracts`):
```json
{
  "playerName": "string",
  "difficulty": "easy" | "medium" | "hard",
  "timeToSolve": number
}
```

**Response** (`ScoreResponse`):
```json
{ "success": true }
```

### GET `/leaderboard`

**Query Parameters**:
- `difficulty` – one of `easy`, `medium`, `hard` (required).

**Response** (`LeaderboardResponse`):
```json
{
  "leaderboard": [
    { "playerName": "string", "timeToSolve": number },
    ... up to 10 entries ...
  ]
}
```

## Development

### Running Tests

```bash
npm test --workspace=@init-sudoku-post2/scores-service
```

Tests use **Jest** and **supertest** to exercise the HTTP endpoints and the underlying service logic.

### Database

- The SQLite file defaults to `scores.db` at the repository root.
- For tests the `SCORES_DB_PATH` environment variable is set to an in‑memory database (`:memory:`) by the test runner.
- Schema migrations are defined in `src/db/schema.ts` and run automatically on first connection.

## Project Structure

```
packages/scores-service/
├─ src/
│  ├─ index.ts               # Express app entry point
│  ├─ routes/
│  │  ├─ scores.ts           # POST /scores handler
│  │  └─ leaderboard.ts      # GET /leaderboard handler
│  ├─ db/
│  │  ├─ database.ts         # DB connection & reset helper
│  │  └─ schema.ts           # Table creation migration
│  ├─ services/
│  │  └─ scoresService.ts    # Business logic (insert & query)
│  ├─ types.ts                # Local TypeScript types
│  └─ __tests__/             # Jest test suite
├─ package.json
├─ tsconfig.json
└─ README.md
```

---

For further integration with the **Puzzle Service** and the web client, see the shared contracts in `packages/contracts`.
