const db = require("./db");

db.exec(`
  CREATE TABLE IF NOT EXISTS contact_enquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,

    subject TEXT,
    message TEXT NOT NULL,

    status TEXT DEFAULT 'new',

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

console.log(
  "Contact enquiries table created successfully"
);