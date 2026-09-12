const express = require("express");
const db = require("../database/db");
const requireAdmin = require("../middleware/auth");

const router = express.Router();


// ========================================
// PROTECT ALL ADMIN ROUTES
// ========================================

router.use(requireAdmin);


// ========================================
// ADMIN DASHBOARD STATS
// GET /api/admin/stats
// ========================================

router.get("/stats", (req, res) => {
  try {

    // ========================================
    // PROPERTIES
    // ========================================

    const totalProperties = db
      .prepare(`
        SELECT COUNT(*) AS count
        FROM properties
      `)
      .get();

    const saleProperties = db
      .prepare(`
        SELECT COUNT(*) AS count
        FROM properties
        WHERE listing_type = 'sale'
      `)
      .get();

    const lettingProperties = db
      .prepare(`
        SELECT COUNT(*) AS count
        FROM properties
        WHERE listing_type = 'letting'
      `)
      .get();

    const roomProperties = db
      .prepare(`
        SELECT COUNT(*) AS count
        FROM properties
        WHERE listing_type = 'room'
      `)
      .get();


    // ========================================
    // PROPERTY ENQUIRIES
    // ========================================

    const totalEnquiries = db
      .prepare(`
        SELECT COUNT(*) AS count
        FROM property_enquiries
      `)
      .get();

    const newEnquiries = db
      .prepare(`
        SELECT COUNT(*) AS count
        FROM property_enquiries
        WHERE status = 'new'
      `)
      .get();


    // ========================================
    // VALUATIONS
    // ========================================

    const totalValuations = db
      .prepare(`
        SELECT COUNT(*) AS count
        FROM valuation_requests
      `)
      .get();

    const newValuations = db
      .prepare(`
        SELECT COUNT(*) AS count
        FROM valuation_requests
        WHERE status = 'new'
      `)
      .get();


    // ========================================
    // CONTACT ENQUIRIES
    // ========================================

    const totalContactEnquiries = db
      .prepare(`
        SELECT COUNT(*) AS count
        FROM contact_enquiries
      `)
      .get();

    const newContactEnquiries = db
      .prepare(`
        SELECT COUNT(*) AS count
        FROM contact_enquiries
        WHERE status = 'new'
      `)
      .get();


    // ========================================
    // RESPONSE
    // ========================================

    return res.json({
      success: true,

      stats: {
        total_properties:
          totalProperties.count,

        sale_properties:
          saleProperties.count,

        letting_properties:
          lettingProperties.count,

        room_properties:
          roomProperties.count,

        total_enquiries:
          totalEnquiries.count,

        new_enquiries:
          newEnquiries.count,

        total_valuations:
          totalValuations.count,

        new_valuations:
          newValuations.count,

        total_contact_enquiries:
          totalContactEnquiries.count,

        new_contact_enquiries:
          newContactEnquiries.count,
      },
    });

  } catch (error) {

    console.error(
      "Admin stats error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to load admin dashboard stats",
    });
  }
});


module.exports = router;