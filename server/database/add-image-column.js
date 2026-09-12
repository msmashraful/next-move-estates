const db = require("./db");

try {
  db.exec(`
    ALTER TABLE properties
    ADD COLUMN image TEXT
  `);

  console.log("Image column added successfully");
} catch (error) {
  if (error.message.includes("duplicate column name")) {
    console.log("Image column already exists");
  } else {
    console.error(error);
  }
}