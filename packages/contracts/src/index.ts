/**
 * Shared contract types for the Sudoku platform.
 * All services and the web client import these types to ensure type‑safe HTTP communication.
 * The project is compiled with "strict": true, so the definitions avoid any implicit any.
 */

/** Difficulty levels supported by the puzzle and scores APIs. */
export type Difficulty = 'easy' | 'medium' | 'hard';

/** A Sudoku board is a 9×9 grid of numbers. Empty cells are represented by 0. */
export type Board = number[][];

/** Request payload for fetching a new puzzle. Used as query parameters in GET /puzzle. */
export interface PuzzleRequest {
  /** Desired difficulty of the generated puzzle. */
  difficulty: Difficulty;
}

/** Response payload containing a generated puzzle board. */
export interface PuzzleResponse {
  /** 9×9 Sudoku board where each cell is a number 0‑9 (0 means empty). */
  board: Board;
}

/** Request payload for validating a completed Sudoku board. */
export interface ValidateRequest {
  /** The board to validate. Must be a 9×9 grid. */
  board: Board;
}

/** Response payload indicating whether the submitted board is a valid solution. */
export interface ValidateResponse {
  /** True when the board satisfies Sudoku rules; otherwise false. */
  valid: boolean;
}

/** Request payload for recording a completed game score. */
export interface ScoreRequest {
  /** Player's display name. */
  playerName: string;
  /** Difficulty of the puzzle that was solved. */
  difficulty: Difficulty;
  /** Time taken to solve the puzzle, in seconds. */
  timeToSolve: number;
}

/** Response payload confirming that the score was stored successfully. */
export interface ScoreResponse {
  /** True when the score was persisted; false otherwise. */
  success: boolean;
}

/** Single entry in the leaderboard. */
export interface LeaderboardEntry {
  /** Player's display name. */
  playerName: string;
  /** Time taken to solve the puzzle, in seconds. */
  timeToSolve: number;
}

/** Response payload for the leaderboard request. */
export interface LeaderboardResponse {
  /** Top 10 scores for the requested difficulty, ordered by ascending timeToSolve. */
  leaderboard: LeaderboardEntry[];
}
