const express = require("express");
const router = express.Router();

const db = require("../database/db");
const requireAdmin = require("../middleware/auth");

const sendValuationThankYou =
  require("../utils/sendValuationThankYou");

const sendValuationAdminNotification =
  require("../utils/sendValuationAdminNotification");


// ========================================
// CREATE VALUATION REQUEST
// PUBLIC
// POST /api/valuations
// ========================================

router.post("/", async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      property_address,
      postcode,
      property_type,
      valuation_type,
      bedrooms,
      message,
    } = req.body;


    // ========================================
    // REQUIRED FIELD VALIDATION
    // ========================================

    if (
      !name?.trim() ||
      !email?.trim() ||
      !property_address?.trim() ||
      !valuation_type?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Name, email, property address and valuation type are required.",
      });
    }


    // ========================================
    // VALUATION TYPE VALIDATION
    // ========================================

    if (
      !["sell", "let"].includes(
        valuation_type
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid valuation type.",
      });
    }


    // ========================================
    // PREPARE DATA
    // ========================================

    const cleanData = {
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim() || null,

      property_address:
        property_address.trim(),

      postcode:
        postcode?.trim() || null,

      property_type:
        property_type?.trim() || null,

      valuation_type,

      bedrooms:
        bedrooms === "" ||
        bedrooms === null ||
        bedrooms === undefined
          ? null
          : Number(bedrooms),

      message:
        message?.trim() || null,
    };


    // ========================================
    // INSERT INTO DATABASE
    // ========================================

    const statement = db.prepare(`
      INSERT INTO valuation_requests (
        name,
        email,
        phone,
        property_address,
        postcode,
        property_type,
        valuation_type,
        bedrooms,
        message
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);


    const result = statement.run(
      cleanData.name,
      cleanData.email,
      cleanData.phone,
      cleanData.property_address,
      cleanData.postcode,
      cleanData.property_type,
      cleanData.valuation_type,
      cleanData.bedrooms,
      cleanData.message
    );


    // ========================================
    // CUSTOMER THANK-YOU EMAIL
    // ========================================

    const customerEmailResult =
      await sendValuationThankYou(
        cleanData
      );


    // ========================================
    // ADMIN NOTIFICATION EMAIL
    // ========================================

    const adminEmailResult =
      await sendValuationAdminNotification(
        cleanData
      );


    // ========================================
    // RESPONSE
    // ========================================

    return res.status(201).json({
      success: true,

      message:
        "Valuation request submitted successfully.",

      valuation_id:
        result.lastInsertRowid,

      confirmation_email_sent:
        customerEmailResult.success,

      admin_notification_sent:
        adminEmailResult.success,
    });

  } catch (error) {
    console.error(
      "Create valuation error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to submit valuation request.",
    });
  }
});


// ========================================
// GET ALL VALUATION REQUESTS
// ADMIN ONLY
// GET /api/valuations
// ========================================

router.get(
  "/",
  requireAdmin,
  (req, res) => {
    try {
      const valuations =
        db.prepare(`
          SELECT *
          FROM valuation_requests
          ORDER BY created_at DESC, id DESC
        `).all();


      return res.json({
        success: true,
        valuations,
      });

    } catch (error) {
      console.error(
        "Get valuations error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to load valuation requests.",
      });
    }
  }
);


// ========================================
// UPDATE VALUATION STATUS
// ADMIN ONLY
// PATCH /api/valuations/:id/status
// ========================================

router.patch(
  "/:id/status",
  requireAdmin,
  (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;


      // ========================================
      // STATUS VALIDATION
      // ========================================

      const allowedStatuses = [
        "new",
        "contacted",
        "completed",
        "archived",
      ];


      if (
        !allowedStatuses.includes(
          status
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid valuation status.",
        });
      }


      // ========================================
      // CHECK REQUEST EXISTS
      // ========================================

      const valuation =
        db.prepare(`
          SELECT id
          FROM valuation_requests
          WHERE id = ?
        `).get(id);


      if (!valuation) {
        return res.status(404).json({
          success: false,
          message:
            "Valuation request not found.",
        });
      }


      // ========================================
      // UPDATE STATUS
      // ========================================

      db.prepare(`
        UPDATE valuation_requests
        SET status = ?
        WHERE id = ?
      `).run(
        status,
        id
      );


      return res.json({
        success: true,
        message:
          "Valuation status updated successfully.",
      });

    } catch (error) {
      console.error(
        "Update valuation status error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to update valuation status.",
      });
    }
  }
);

// ========================================
// DELETE ARCHIVED VALUATION REQUEST
// ADMIN ONLY
// DELETE /api/valuations/:id
// ========================================

router.delete(
  "/:id",
  requireAdmin,
  (req, res) => {
    try {
      const { id } = req.params;

      // ========================================
      // CHECK VALUATION EXISTS
      // ========================================

      const valuation =
        db.prepare(`
          SELECT
            id,
            status
          FROM valuation_requests
          WHERE id = ?
        `).get(id);

      if (!valuation) {
        return res.status(404).json({
          success: false,
          message:
            "Valuation request not found.",
        });
      }

      // ========================================
      // ONLY ARCHIVED CAN BE DELETED
      // ========================================

      if (
        valuation.status !==
        "archived"
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Only archived valuation requests can be deleted.",
        });
      }

      // ========================================
      // DELETE
      // ========================================

      db.prepare(`
        DELETE FROM valuation_requests
        WHERE id = ?
      `).run(id);

      return res.json({
        success: true,
        message:
          "Valuation request deleted successfully.",
      });

    } catch (error) {
      console.error(
        "Delete valuation error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to delete valuation request.",
      });
    }
  }
);

module.exports = router;