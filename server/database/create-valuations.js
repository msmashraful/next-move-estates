const db = require("./db");

db.exec(`
  CREATE TABLE IF NOT EXISTS valuation_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,

    property_address TEXT NOT NULL,
    postcode TEXT,

    property_type TEXT,

    valuation_type TEXT NOT NULL,

    bedrooms INTEGER,

    message TEXT,

    status TEXT DEFAULT 'new',

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

console.log(
  "Valuation requests table created successfully"
);