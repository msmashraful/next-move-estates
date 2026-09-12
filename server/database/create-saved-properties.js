const db = require("./db");

try {
  db.prepare(`
    CREATE TABLE IF NOT EXISTS saved_properties (
      id INTEGER PRIMARY KEY AUTOINCREMENT,

      user_id INTEGER NOT NULL,

      property_id INTEGER NOT NULL,

      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

      UNIQUE(user_id, property_id),

      FOREIGN KEY(user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

      FOREIGN KEY(property_id)
        REFERENCES properties(id)
        ON DELETE CASCADE
    )
  `).run();

  console.log(
    "saved_properties table created successfully."
  );

} catch (error) {

  console.error(
    "Failed to create saved_properties table:",
    error
  );

} finally {

  db.close();
}