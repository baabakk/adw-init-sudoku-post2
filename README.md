# init-sudoku-post2 — shared foundation

Generated deterministically by DevOps from the approved project-decomposition.

**Stack:** TypeScript (npm workspaces)
- install: `npm install`
- build: `npm run build`
- test: `npm test`

## Subsystems (one feature team each)
- **web-client** — Web Client: Interactive Sudoku SPA that renders a 9x9 board, allows difficulty selection, fetches puzzles from Puzzle Service, validates moves locally, submits results to Scores Service, and displays leaderboard.
  - owns: packages/web
  - dependsOn: puzzle-service, scores-service
- **puzzle-service** — Puzzle Service: Stateless service that generates uniquely-solvable Sudoku puzzles at three difficulty levels and validates submitted boards. Exposes GET /puzzle and POST /validate endpoints.
  - owns: packages/puzzle-service
  - dependsOn: none
- **scores-service** — Scores Service: Service with SQLite persistence that records completed-game results and serves a per-difficulty top-10 leaderboard. Exposes POST /scores and GET /leaderboard endpoints.
  - owns: packages/scores-service
  - dependsOn: none

## Shared contracts
- packages/contracts
