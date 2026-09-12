const db = require("./db");

try {
  console.log("Updating users table for Google authentication...");

  // Turn off FK checks during migration
  db.pragma("foreign_keys = OFF");

  const transaction = db.transaction(() => {
    // Rename old table
    db.exec(`
      ALTER TABLE users
      RENAME TO users_old;
    `);

    // Create updated users table
    db.exec(`
      CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,

        name TEXT NOT NULL,

        email TEXT NOT NULL UNIQUE,

        phone TEXT,

        password_hash TEXT,

        auth_provider TEXT NOT NULL DEFAULT 'local',

        google_id TEXT UNIQUE,

        profile_image TEXT,

        status TEXT NOT NULL DEFAULT 'active',

        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Move existing customers into new table
    db.exec(`
      INSERT INTO users (
        id,
        name,
        email,
        phone,
        password_hash,
        auth_provider,
        google_id,
        profile_image,
        status,
        created_at,
        updated_at
      )
      SELECT
        id,
        name,
        email,
        phone,
        password_hash,
        'local',
        NULL,
        NULL,
        status,
        created_at,
        updated_at
      FROM users_old;
    `);

    // Remove old table
    db.exec(`
      DROP TABLE users_old;
    `);
  });

  transaction();

  db.pragma("foreign_keys = ON");

  console.log(
    "Users table updated successfully for Google authentication."
  );
} catch (error) {
  db.pragma("foreign_keys = ON");

  console.error(
    "Failed to update users table:",
    error
  );

  process.exit(1);
}