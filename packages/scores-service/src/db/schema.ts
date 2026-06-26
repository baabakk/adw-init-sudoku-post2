import Database from 'better-sqlite3';

/**
 * Runs any pending migrations against the provided database instance.
 * Currently creates the `scores` table if it does not exist.
 */
export function runMigrations(db: Database.Database): void {
  const tableExists = db
    .prepare(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='scores';"
    )
    .get();

  if (!tableExists) {
    db.exec(`
      CREATE TABLE scores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        playerName TEXT NOT NULL,
        difficulty TEXT NOT NULL,
        timeToSolve REAL NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);
  }
}
