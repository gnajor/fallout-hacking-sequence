CREATE TABLE if not EXISTS users(
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    best_run INTEGER NOT NULL DEFAULT 0,
    daily_streak INTEGER NOT NULL DEFAULT 0,
    last_daily_date TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
);