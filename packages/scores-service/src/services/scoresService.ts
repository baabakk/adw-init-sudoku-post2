import { getDatabase } from '../db/database';
import { ScoreRecord, LeaderboardEntry } from '../types';
import { Difficulty } from '@init-sudoku-post2/contracts';

/**
 * Inserts a new score record into the database.
 * Returns true on success, false on error.
 */
export function insertScore(record: ScoreRecord): boolean {
  try {
    const db = getDatabase();
    const stmt = db.prepare(
      `INSERT INTO scores (playerName, difficulty, timeToSolve) VALUES (?, ?, ?)`
    );
    stmt.run(record.playerName, record.difficulty, record.timeToSolve);
    return true;
  } catch (err) {
    console.error('Failed to insert score:', err);
    return false;
  }
}

/**
 * Retrieves the top `limit` scores for a given difficulty, ordered by the
 * smallest `timeToSolve` first.
 */
export function getLeaderboard(
  difficulty: Difficulty,
  limit = 10
): LeaderboardEntry[] {
  const db = getDatabase();
  const stmt = db.prepare(
    `SELECT playerName, timeToSolve FROM scores WHERE difficulty = ? ORDER BY timeToSolve ASC LIMIT ?`
  );
  const rows = stmt.all(difficulty, limit) as Array<{
    playerName: string;
    timeToSolve: number;
  }>;
  return rows.map((r) => ({ playerName: r.playerName, timeToSolve: r.timeToSolve }));
}
