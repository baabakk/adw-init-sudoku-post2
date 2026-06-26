/**
 * Local types for the scores service. These mirror the shared contracts but are kept
 * separate to avoid circular dependencies and to provide a clear boundary for the
 * service implementation.
 */

import { Difficulty } from '@init-sudoku-post2/contracts';

/** Represents a score record stored in the database. */
export interface ScoreRecord {
  id?: number; // Auto‑generated primary key
  playerName: string;
  difficulty: Difficulty;
  timeToSolve: number; // seconds
  createdAt?: Date;
}

/** Entry returned in a leaderboard response. */
export interface LeaderboardEntry {
  playerName: string;
  timeToSolve: number;
}
