const db = require("./db");

db.exec(`
  CREATE TABLE IF NOT EXISTS properties (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    title TEXT NOT NULL,

    slug TEXT UNIQUE NOT NULL,

    listing_type TEXT NOT NULL,

    property_type TEXT,

    price REAL NOT NULL,

    price_period TEXT,

    address TEXT,

    postcode TEXT,

    bedrooms INTEGER,

    bathrooms INTEGER,

    furnished_status TEXT,

    available_date TEXT,

    deposit REAL,

    description TEXT,

    epc_rating TEXT,

    council_tax_band TEXT,

    status TEXT DEFAULT 'available',

    featured INTEGER DEFAULT 0,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

console.log("Properties table created successfully");