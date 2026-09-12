const db = require("./db");

db.exec(`
  CREATE TABLE IF NOT EXISTS property_enquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    property_id INTEGER NOT NULL,

    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,

    preferred_date TEXT,
    message TEXT,

    status TEXT DEFAULT 'new',

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (property_id)
      REFERENCES properties(id)
      ON DELETE CASCADE
  )
`);

console.log("Property enquiries table created successfully");