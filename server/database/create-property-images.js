const db = require("./db");

db.exec(`
  CREATE TABLE IF NOT EXISTS property_images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    property_id INTEGER NOT NULL,

    image_url TEXT NOT NULL,

    is_primary INTEGER DEFAULT 0,

    sort_order INTEGER DEFAULT 0,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (property_id)
      REFERENCES properties(id)
      ON DELETE CASCADE
  )
`);

console.log("Property images table created successfully");