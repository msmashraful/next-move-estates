const express = require("express");

const db = require("../database/db");
const requireCustomer = require("../middleware/customerAuth");

const router = express.Router();


// ========================================
// ALL ROUTES REQUIRE CUSTOMER LOGIN
// ========================================

router.use(requireCustomer);


// ========================================
// GET ALL SAVED PROPERTIES
// GET /api/saved-properties
// ========================================

router.get("/", (req, res) => {
  try {
    const savedProperties = db
      .prepare(`
        SELECT
          sp.id AS saved_id,
          sp.created_at AS saved_at,

          p.id,
          p.title,
          p.slug,
          p.listing_type,
          p.property_type,
          p.price,
          p.price_period,
          p.address,
          p.postcode,
          p.bedrooms,
          p.bathrooms,
          p.furnished_status,
          p.available_date,
          p.deposit,
          p.description,
          p.epc_rating,
          p.council_tax_band,
          p.status,
          p.featured,
          p.image,
          p.created_at

        FROM saved_properties sp

        INNER JOIN properties p
          ON p.id = sp.property_id

        WHERE sp.user_id = ?

        ORDER BY sp.created_at DESC
      `)
      .all(req.user.id);


    return res.json({
      success: true,
      count: savedProperties.length,
      properties: savedProperties,
    });

  } catch (error) {
    console.error(
      "Get saved properties error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to load saved properties.",
    });
  }
});


// ========================================
// CHECK IF PROPERTY IS SAVED
// GET /api/saved-properties/check/:propertyId
// ========================================

router.get(
  "/check/:propertyId",
  (req, res) => {
    try {
      const propertyId =
        Number(req.params.propertyId);


      if (
        !Number.isInteger(propertyId) ||
        propertyId <= 0
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid property ID.",
        });
      }


      const saved = db
        .prepare(`
          SELECT id
          FROM saved_properties
          WHERE user_id = ?
          AND property_id = ?
        `)
        .get(
          req.user.id,
          propertyId
        );


      return res.json({
        success: true,
        saved: Boolean(saved),
      });

    } catch (error) {
      console.error(
        "Check saved property error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to check saved property.",
      });
    }
  }
);


// ========================================
// SAVE PROPERTY
// POST /api/saved-properties/:propertyId
// ========================================

router.post(
  "/:propertyId",
  (req, res) => {
    try {
      const propertyId =
        Number(req.params.propertyId);


      if (
        !Number.isInteger(propertyId) ||
        propertyId <= 0
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid property ID.",
        });
      }


      // ========================================
      // CHECK PROPERTY EXISTS
      // ========================================

      const property = db
        .prepare(`
          SELECT
            id,
            title,
            status
          FROM properties
          WHERE id = ?
        `)
        .get(propertyId);


      if (!property) {
        return res.status(404).json({
          success: false,
          message:
            "Property not found.",
        });
      }


      // ========================================
      // CHECK ALREADY SAVED
      // ========================================

      const existingSaved = db
        .prepare(`
          SELECT id
          FROM saved_properties
          WHERE user_id = ?
          AND property_id = ?
        `)
        .get(
          req.user.id,
          propertyId
        );


      if (existingSaved) {
        return res.json({
          success: true,
          saved: true,
          message:
            "Property is already saved.",
        });
      }


      // ========================================
      // SAVE
      // ========================================

      const result = db
        .prepare(`
          INSERT INTO saved_properties (
            user_id,
            property_id
          )
          VALUES (?, ?)
        `)
        .run(
          req.user.id,
          propertyId
        );


      return res.status(201).json({
        success: true,
        saved: true,
        saved_id:
          Number(
            result.lastInsertRowid
          ),
        message:
          "Property saved successfully.",
      });

    } catch (error) {
      console.error(
        "Save property error:",
        error
      );


      // SQLite UNIQUE safeguard
      if (
        error.code ===
        "SQLITE_CONSTRAINT_UNIQUE"
      ) {
        return res.json({
          success: true,
          saved: true,
          message:
            "Property is already saved.",
        });
      }


      return res.status(500).json({
        success: false,
        message:
          "Unable to save property.",
      });
    }
  }
);


// ========================================
// UNSAVE PROPERTY
// DELETE /api/saved-properties/:propertyId
// ========================================

router.delete(
  "/:propertyId",
  (req, res) => {
    try {
      const propertyId =
        Number(req.params.propertyId);


      if (
        !Number.isInteger(propertyId) ||
        propertyId <= 0
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid property ID.",
        });
      }


      const result = db
        .prepare(`
          DELETE FROM saved_properties
          WHERE user_id = ?
          AND property_id = ?
        `)
        .run(
          req.user.id,
          propertyId
        );


      if (
        result.changes === 0
      ) {
        return res.json({
          success: true,
          saved: false,
          message:
            "Property was not saved.",
        });
      }


      return res.json({
        success: true,
        saved: false,
        message:
          "Property removed from saved properties.",
      });

    } catch (error) {
      console.error(
        "Unsave property error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to remove saved property.",
      });
    }
  }
);


module.exports = router;