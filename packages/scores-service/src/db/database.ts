import Database from 'better-sqlite3';
import path from 'path';
import { runMigrations } from './schema';

/**
 * Returns a singleton SQLite database connection.
 * The database file path can be overridden via the `SCORES_DB_PATH`
 * environment variable (useful for tests). By default it stores the
 * file `scores.db` in the package root.
 */
let dbInstance: Database.Database | null = null;

export function getDatabase(): Database.Database {
  if (dbInstance) {
    return dbInstance;
  }
  const dbPath = process.env.SCORES_DB_PATH
    ? process.env.SCORES_DB_PATH
    : path.resolve(__dirname, '../../..', 'scores.db');
  const db = new Database(dbPath);
  // Enable foreign keys (not needed now but good practice)
  db.pragma('foreign_keys = ON');
  runMigrations(db);
  dbInstance = db;
  return db;
}

/**
 * Close and reset the singleton database instance.
 * Primarily used in test suites to ensure a clean in‑memory database.
 */
export function resetDatabase(): void {
  if (dbInstance) {
    dbInstance.close();
    dbInstance = null;
  }
}
