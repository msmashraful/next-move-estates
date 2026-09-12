const db = require("./db");

try {
  // ========================================
  // CHECK EXISTING COLUMNS
  // ========================================

  const columns = db
    .prepare(
      "PRAGMA table_info(property_enquiries)"
    )
    .all();

  const hasUserId =
    columns.some(
      (column) =>
        column.name === "user_id"
    );


  // ========================================
  // ADD USER ID
  // ========================================

  if (!hasUserId) {
    db.prepare(`
      ALTER TABLE property_enquiries
      ADD COLUMN user_id INTEGER
    `).run();

    console.log(
      "user_id column added to property_enquiries."
    );

  } else {

    console.log(
      "user_id column already exists."
    );
  }


  // ========================================
  // CREATE INDEX
  // ========================================

  db.prepare(`
    CREATE INDEX IF NOT EXISTS
    idx_property_enquiries_user_id
    ON property_enquiries(user_id)
  `).run();


  console.log(
    "property_enquiries migration completed successfully."
  );

} catch (error) {

  console.error(
    "Failed to update property_enquiries:",
    error
  );

} finally {

  db.close();
}