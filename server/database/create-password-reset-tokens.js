const db = require("./db");

try {
  db.exec(`
    CREATE TABLE IF NOT EXISTS password_reset_tokens (
      id INTEGER PRIMARY KEY AUTOINCREMENT,

      user_id INTEGER NOT NULL,

      token_hash TEXT NOT NULL UNIQUE,

      expires_at TEXT NOT NULL,

      used_at TEXT DEFAULT NULL,

      created_at TEXT DEFAULT CURRENT_TIMESTAMP,

      FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS
      idx_password_reset_user_id
    ON password_reset_tokens(user_id);

    CREATE INDEX IF NOT EXISTS
      idx_password_reset_token_hash
    ON password_reset_tokens(token_hash);
  `);

  console.log(
    "Password reset tokens table created successfully."
  );

} catch (error) {
  console.error(
    "Password reset migration failed:",
    error
  );
}