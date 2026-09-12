const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("../database/db");
const requireAdmin = require("../middleware/auth");

const router = express.Router();


// ========================================
// OPTIONAL CUSTOMER AUTH
// ========================================
// Token থাকলে customer detect করবে.
// Token না থাকলে guest হিসেবে continue করবে.

function optionalCustomer(req, res, next) {
  try {
    const authHeader =
      req.headers.authorization;

    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {
      req.customer = null;
      return next();
    }

    const token =
      authHeader.split(" ")[1];

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    if (
      decoded.role !== "customer"
    ) {
      req.customer = null;
      return next();
    }

    const user = db
      .prepare(`
        SELECT
          id,
          name,
          email,
          phone,
          status
        FROM users
        WHERE id = ?
      `)
      .get(decoded.userId);

    if (
      !user ||
      user.status !== "active"
    ) {
      req.customer = null;
      return next();
    }

    req.customer = user;

    next();

  } catch (error) {

    // Invalid token হলেও
    // guest enquiry block করব না

    req.customer = null;
    next();
  }
}


// ========================================
// CREATE PROPERTY ENQUIRY
// PUBLIC + OPTIONAL CUSTOMER LOGIN
// ========================================

router.post(
  "/",
  optionalCustomer,
  (req, res) => {
    try {
      const {
        property_id,
        name,
        email,
        phone,
        preferred_date,
        message,
      } = req.body;


      // ========================================
      // VALIDATION
      // ========================================

      if (!property_id) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "Property is required.",
          });
      }


      if (
        !name ||
        !name.trim()
      ) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "Name is required.",
          });
      }


      if (
        !email ||
        !email.trim()
      ) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "Email is required.",
          });
      }


      // ========================================
      // CHECK PROPERTY
      // ========================================

      const property = db
        .prepare(`
          SELECT
            id,
            title,
            slug
          FROM properties
          WHERE id = ?
        `)
        .get(property_id);


      if (!property) {
        return res
          .status(404)
          .json({
            success: false,
            message:
              "Property not found.",
          });
      }


      // ========================================
      // LOGGED-IN CUSTOMER USER ID
      // ========================================

      const userId =
        req.customer
          ? req.customer.id
          : null;


      // ========================================
      // INSERT ENQUIRY
      // ========================================

      const result = db
        .prepare(`
          INSERT INTO property_enquiries (
            property_id,
            user_id,
            name,
            email,
            phone,
            preferred_date,
            message
          )
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `)
        .run(
          property_id,
          userId,
          name.trim(),
          email.trim(),
          phone?.trim() || null,
          preferred_date || null,
          message?.trim() || null
        );


      // ========================================
      // GET CREATED ENQUIRY
      // ========================================

      const enquiry = db
        .prepare(`
          SELECT
            pe.id,
            pe.property_id,
            pe.user_id,
            pe.name,
            pe.email,
            pe.phone,
            pe.preferred_date,
            pe.message,
            pe.status,
            pe.created_at,

            p.title AS property_title,
            p.slug AS property_slug

          FROM property_enquiries pe

          LEFT JOIN properties p
            ON p.id = pe.property_id

          WHERE pe.id = ?
        `)
        .get(
          result.lastInsertRowid
        );


      return res
        .status(201)
        .json({
          success: true,
          message:
            "Your enquiry has been submitted successfully.",
          enquiry,
        });

    } catch (error) {

      console.error(
        "Create enquiry error:",
        error
      );

      return res
        .status(500)
        .json({
          success: false,
          message:
            "Failed to submit enquiry.",
        });
    }
  }
);


// ========================================
// CUSTOMER - GET MY ENQUIRIES
// ========================================
// IMPORTANT:
// এই route অবশ্যই "/:id" ধরনের dynamic
// route-এর আগে থাকবে.

router.get(
  "/my",
  (req, res) => {
    try {

      // ========================================
      // GET TOKEN
      // ========================================

      const authHeader =
        req.headers.authorization;


      if (
        !authHeader ||
        !authHeader.startsWith("Bearer ")
      ) {
        return res
          .status(401)
          .json({
            success: false,
            message:
              "Authentication required.",
          });
      }


      const token =
        authHeader.split(" ")[1];


      // ========================================
      // VERIFY CUSTOMER TOKEN
      // ========================================

      let decoded;

      try {
        decoded =
          jwt.verify(
            token,
            process.env.JWT_SECRET
          );

      } catch (error) {

        return res
          .status(401)
          .json({
            success: false,
            message:
              "Invalid or expired session.",
          });
      }


      if (
        decoded.role !== "customer"
      ) {
        return res
          .status(403)
          .json({
            success: false,
            message:
              "Customer access required.",
          });
      }


      // ========================================
      // CHECK CUSTOMER
      // ========================================

      const user = db
        .prepare(`
          SELECT
            id,
            name,
            email,
            status
          FROM users
          WHERE id = ?
        `)
        .get(
          decoded.userId
        );


      if (!user) {
        return res
          .status(401)
          .json({
            success: false,
            message:
              "Customer account not found.",
          });
      }


      if (
        user.status !== "active"
      ) {
        return res
          .status(403)
          .json({
            success: false,
            message:
              "Customer account is not active.",
          });
      }


      // ========================================
      // GET THIS CUSTOMER'S ENQUIRIES
      // ========================================

      const enquiries = db
        .prepare(`
          SELECT
            pe.id,
            pe.property_id,
            pe.user_id,
            pe.name,
            pe.email,
            pe.phone,
            pe.preferred_date,
            pe.message,
            pe.status,
            pe.created_at,

            p.title AS property_title,
            p.slug AS property_slug,
            p.image AS property_image,
            p.address AS property_address,
            p.postcode AS property_postcode,
            p.price AS property_price,
            p.price_period AS property_price_period,
            p.listing_type AS property_listing_type,
            p.property_type AS property_type,
            p.bedrooms AS property_bedrooms,
            p.bathrooms AS property_bathrooms

          FROM property_enquiries pe

          LEFT JOIN properties p
            ON p.id = pe.property_id

          WHERE pe.user_id = ?

          ORDER BY pe.created_at DESC
        `)
        .all(
          user.id
        );


      // ========================================
      // RESPONSE
      // ========================================

      return res.json({
        success: true,
        count:
          enquiries.length,
        enquiries,
      });

    } catch (error) {

      console.error(
        "Get customer enquiries error:",
        error
      );

      return res
        .status(500)
        .json({
          success: false,
          message:
            "Failed to load your enquiries.",
        });
    }
  }
);


// ========================================
// CUSTOMER - GET MY VIEWING REQUESTS
// ========================================
// যেসব enquiry-তে preferred_date আছে,
// সেগুলো viewing request হিসেবে দেখানো হবে.
//
// IMPORTANT:
// এই route অবশ্যই dynamic "/:id" route-এর আগে থাকবে.

router.get(
  "/my-viewings",
  (req, res) => {
    try {

      // ========================================
      // GET TOKEN
      // ========================================

      const authHeader =
        req.headers.authorization;


      if (
        !authHeader ||
        !authHeader.startsWith("Bearer ")
      ) {
        return res
          .status(401)
          .json({
            success: false,
            message:
              "Authentication required.",
          });
      }


      const token =
        authHeader.split(" ")[1];


      // ========================================
      // VERIFY CUSTOMER TOKEN
      // ========================================

      let decoded;

      try {
        decoded =
          jwt.verify(
            token,
            process.env.JWT_SECRET
          );

      } catch (error) {

        return res
          .status(401)
          .json({
            success: false,
            message:
              "Invalid or expired session.",
          });
      }


      if (
        decoded.role !== "customer"
      ) {
        return res
          .status(403)
          .json({
            success: false,
            message:
              "Customer access required.",
          });
      }


      // ========================================
      // CHECK CUSTOMER
      // ========================================

      const user = db
        .prepare(`
          SELECT
            id,
            name,
            email,
            status
          FROM users
          WHERE id = ?
        `)
        .get(
          decoded.userId
        );


      if (!user) {
        return res
          .status(401)
          .json({
            success: false,
            message:
              "Customer account not found.",
          });
      }


      if (
        user.status !== "active"
      ) {
        return res
          .status(403)
          .json({
            success: false,
            message:
              "Customer account is not active.",
          });
      }


      // ========================================
      // GET CUSTOMER VIEWING REQUESTS
      // ========================================

      const viewings = db
        .prepare(`
          SELECT
            pe.id,
            pe.property_id,
            pe.user_id,
            pe.name,
            pe.email,
            pe.phone,
            pe.preferred_date,
            pe.message,
            pe.status,
            pe.created_at,

            p.title AS property_title,
            p.slug AS property_slug,
            p.image AS property_image,
            p.address AS property_address,
            p.postcode AS property_postcode,
            p.price AS property_price,
            p.price_period AS property_price_period,
            p.listing_type AS property_listing_type,
            p.property_type AS property_type,
            p.bedrooms AS property_bedrooms,
            p.bathrooms AS property_bathrooms

          FROM property_enquiries pe

          LEFT JOIN properties p
            ON p.id = pe.property_id

          WHERE pe.user_id = ?
            AND pe.preferred_date IS NOT NULL
            AND TRIM(pe.preferred_date) != ''
            AND pe.status != 'archived'

          ORDER BY
            pe.preferred_date ASC,
            pe.created_at DESC
        `)
        .all(
          user.id
        );


      // ========================================
      // RESPONSE
      // ========================================

      return res.json({
        success: true,
        count:
          viewings.length,
        viewings,
      });

    } catch (error) {

      console.error(
        "Get customer viewing requests error:",
        error
      );

      return res
        .status(500)
        .json({
          success: false,
          message:
            "Failed to load your viewing requests.",
        });
    }
  }
);


// ========================================
// ADMIN - GET ALL ENQUIRIES
// ========================================

router.get(
  "/",
  requireAdmin,
  (req, res) => {
    try {

      const enquiries = db
        .prepare(`
          SELECT
            pe.id,
            pe.property_id,
            pe.user_id,
            pe.name,
            pe.email,
            pe.phone,
            pe.preferred_date,
            pe.message,
            pe.status,
            pe.created_at,

            p.title AS property_title,
            p.slug AS property_slug,

            u.name AS customer_name,
            u.email AS customer_email

          FROM property_enquiries pe

          LEFT JOIN properties p
            ON p.id = pe.property_id

          LEFT JOIN users u
            ON u.id = pe.user_id

          ORDER BY pe.created_at DESC
        `)
        .all();


      return res.json({
        success: true,
        enquiries,
      });

    } catch (error) {

      console.error(
        "Get enquiries error:",
        error
      );

      return res
        .status(500)
        .json({
          success: false,
          message:
            "Failed to load enquiries.",
        });
    }
  }
);


// ========================================
// ADMIN - UPDATE STATUS
// ========================================

router.patch(
  "/:id/status",
  requireAdmin,
  (req, res) => {
    try {

      const {
        status,
      } = req.body;


      const allowedStatuses = [
        "new",
        "contacted",
        "closed",
        "archived",
      ];


      // ========================================
      // VALIDATE STATUS
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
              "Invalid enquiry status.",
          });
      }


      // ========================================
      // CHECK ENQUIRY
      // ========================================

      const enquiry = db
        .prepare(`
          SELECT
            id
          FROM property_enquiries
          WHERE id = ?
        `)
        .get(
          req.params.id
        );


      if (!enquiry) {
        return res
          .status(404)
          .json({
            success: false,
            message:
              "Enquiry not found.",
          });
      }


      // ========================================
      // UPDATE STATUS
      // ========================================

      db.prepare(`
        UPDATE property_enquiries
        SET status = ?
        WHERE id = ?
      `).run(
        status,
        req.params.id
      );


      // ========================================
      // GET UPDATED ENQUIRY
      // ========================================

      const updatedEnquiry = db
        .prepare(`
          SELECT
            pe.*,
            p.title AS property_title,
            p.slug AS property_slug

          FROM property_enquiries pe

          LEFT JOIN properties p
            ON p.id = pe.property_id

          WHERE pe.id = ?
        `)
        .get(
          req.params.id
        );


      return res.json({
        success: true,
        message:
          "Enquiry status updated.",
        enquiry:
          updatedEnquiry,
      });

    } catch (error) {

      console.error(
        "Update enquiry status error:",
        error
      );

      return res
        .status(500)
        .json({
          success: false,
          message:
            "Failed to update enquiry.",
        });
    }
  }
);


// ========================================
// ADMIN - DELETE ARCHIVED ENQUIRY
// ========================================

router.delete(
  "/:id",
  requireAdmin,
  (req, res) => {
    try {

      // ========================================
      // CHECK ENQUIRY
      // ========================================

      const enquiry = db
        .prepare(`
          SELECT
            id,
            status
          FROM property_enquiries
          WHERE id = ?
        `)
        .get(
          req.params.id
        );


      if (!enquiry) {
        return res
          .status(404)
          .json({
            success: false,
            message:
              "Enquiry not found.",
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
              "Only archived enquiries can be deleted.",
          });
      }


      // ========================================
      // DELETE
      // ========================================

      db.prepare(`
        DELETE FROM property_enquiries
        WHERE id = ?
      `).run(
        req.params.id
      );


      return res.json({
        success: true,
        message:
          "Enquiry deleted successfully.",
      });

    } catch (error) {

      console.error(
        "Delete enquiry error:",
        error
      );

      return res
        .status(500)
        .json({
          success: false,
          message:
            "Failed to delete enquiry.",
        });
    }
  }
);


module.exports = router;