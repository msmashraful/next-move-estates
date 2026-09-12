const express = require("express");

const db = require("../database/db");

const requireAdmin =
  require("../middleware/auth");

const sendContactThankYou =
  require("../utils/sendContactThankYou");

const sendContactAdminNotification =
  require("../utils/sendContactAdminNotification");


const router = express.Router();


// ========================================
// CREATE CONTACT ENQUIRY
// PUBLIC
// POST /api/contact
// ========================================

router.post(
  "/",
  async (req, res) => {
    try {

      const {
        name,
        email,
        phone,
        subject,
        message,
      } = req.body;


      // ========================================
      // VALIDATION
      // ========================================

      if (
        !name?.trim() ||
        !email?.trim() ||
        !message?.trim()
      ) {
        return res
          .status(400)
          .json({
            success: false,

            message:
              "Name, email and message are required.",
          });
      }


      const cleanEmail =
        email
          .trim()
          .toLowerCase();


      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


      if (
        !emailRegex.test(
          cleanEmail
        )
      ) {
        return res
          .status(400)
          .json({
            success: false,

            message:
              "Please enter a valid email address.",
          });
      }


      // ========================================
      // CLEAN DATA
      // ========================================

      const cleanData = {

        name:
          name.trim(),

        email:
          cleanEmail,

        phone:
          phone?.trim() ||
          null,

        subject:
          subject?.trim() ||
          "General Enquiry",

        message:
          message.trim(),
      };


      // ========================================
      // INSERT INTO DATABASE
      // ========================================

      const result =
        db.prepare(`
          INSERT INTO contact_enquiries (
            name,
            email,
            phone,
            subject,
            message
          )
          VALUES (?, ?, ?, ?, ?)
        `)
        .run(
          cleanData.name,
          cleanData.email,
          cleanData.phone,
          cleanData.subject,
          cleanData.message
        );


      // ========================================
      // SEND EMAILS
      // ========================================

      const [
        customerEmailResult,
        adminEmailResult,
      ] = await Promise.all([

        sendContactThankYou(
          cleanData
        ),

        sendContactAdminNotification(
          cleanData
        ),

      ]);


      // ========================================
      // RESPONSE
      // ========================================

      return res
        .status(201)
        .json({
          success: true,

          message:
            "Your enquiry has been submitted successfully.",

          enquiry_id:
            result.lastInsertRowid,

          confirmation_email_sent:
            customerEmailResult.success,

          admin_notification_sent:
            adminEmailResult.success,
        });


    } catch (error) {

      console.error(
        "Create contact enquiry error:",
        error
      );


      return res
        .status(500)
        .json({
          success: false,

          message:
            "Failed to submit contact enquiry.",
        });
    }
  }
);


// ========================================
// GET ALL CONTACT ENQUIRIES
// ADMIN ONLY
// GET /api/contact
// ========================================

router.get(
  "/",
  requireAdmin,
  (req, res) => {
    try {

      const enquiries =
        db.prepare(`
          SELECT *
          FROM contact_enquiries
          ORDER BY created_at DESC, id DESC
        `)
        .all();


      return res.json({
        success: true,

        enquiries,
      });


    } catch (error) {

      console.error(
        "Get contact enquiries error:",
        error
      );


      return res
        .status(500)
        .json({
          success: false,

          message:
            "Failed to load contact enquiries.",
        });
    }
  }
);


// ========================================
// UPDATE CONTACT STATUS
// ADMIN ONLY
// PATCH /api/contact/:id/status
// ========================================

router.patch(
  "/:id/status",
  requireAdmin,
  (req, res) => {
    try {

      const { id } =
        req.params;

      const { status } =
        req.body;


      const allowedStatuses = [
        "new",
        "contacted",
        "closed",
        "archived",
      ];


      // ========================================
      // STATUS VALIDATION
      // ========================================

      if (
        !allowedStatuses.includes(
          status
        )
      ) {
        return res
          .status(400)
          .json({
            success: false,

            message:
              "Invalid contact enquiry status.",
          });
      }


      // ========================================
      // CHECK ENQUIRY EXISTS
      // ========================================

      const enquiry =
        db.prepare(`
          SELECT
            id,
            status
          FROM contact_enquiries
          WHERE id = ?
        `)
        .get(id);


      if (!enquiry) {
        return res
          .status(404)
          .json({
            success: false,

            message:
              "Contact enquiry not found.",
          });
      }


      // ========================================
      // UPDATE STATUS
      // ========================================

      db.prepare(`
        UPDATE contact_enquiries
        SET status = ?
        WHERE id = ?
      `)
        .run(
          status,
          id
        );


      return res.json({
        success: true,

        message:
          "Contact enquiry status updated successfully.",
      });


    } catch (error) {

      console.error(
        "Update contact enquiry status error:",
        error
      );


      return res
        .status(500)
        .json({
          success: false,

          message:
            "Failed to update contact enquiry status.",
        });
    }
  }
);


// ========================================
// DELETE ARCHIVED CONTACT ENQUIRY
// ADMIN ONLY
// DELETE /api/contact/:id
// ========================================

router.delete(
  "/:id",
  requireAdmin,
  (req, res) => {
    try {

      const { id } =
        req.params;


      // ========================================
      // CHECK ENQUIRY EXISTS
      // ========================================

      const enquiry =
        db.prepare(`
          SELECT
            id,
            status
          FROM contact_enquiries
          WHERE id = ?
        `)
        .get(id);


      if (!enquiry) {
        return res
          .status(404)
          .json({
            success: false,

            message:
              "Contact enquiry not found.",
          });
      }


      // ========================================
      // ONLY ARCHIVED CAN BE DELETED
      // ========================================

      if (
        enquiry.status !==
        "archived"
      ) {
        return res
          .status(400)
          .json({
            success: false,

            message:
              "Only archived contact enquiries can be deleted.",
          });
      }


      // ========================================
      // DELETE
      // ========================================

      db.prepare(`
        DELETE FROM contact_enquiries
        WHERE id = ?
      `)
        .run(id);


      return res.json({
        success: true,

        message:
          "Contact enquiry deleted successfully.",
      });


    } catch (error) {

      console.error(
        "Delete contact enquiry error:",
        error
      );


      return res
        .status(500)
        .json({
          success: false,

          message:
            "Failed to delete contact enquiry.",
        });
    }
  }
);


module.exports = router;