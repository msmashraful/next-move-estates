const jwt = require("jsonwebtoken");
const db = require("../database/db");


// ========================================
// CUSTOMER AUTH MIDDLEWARE
// ========================================

function requireCustomer(req, res, next) {
  try {
    const authHeader =
      req.headers.authorization;


    // ========================================
    // CHECK AUTH HEADER
    // ========================================

    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {
      return res.status(401).json({
        success: false,
        message:
          "Authentication required.",
      });
    }


    const token =
      authHeader.split(" ")[1];


    if (!token) {
      return res.status(401).json({
        success: false,
        message:
          "Authentication required.",
      });
    }


    // ========================================
    // VERIFY JWT
    // ========================================

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );


    // ========================================
    // CHECK CUSTOMER ROLE
    // ========================================

    if (
      decoded.role !== "customer"
    ) {
      return res.status(403).json({
        success: false,
        message:
          "Customer access required.",
      });
    }


    // ========================================
    // CHECK USER EXISTS
    // ========================================

    const user = db
      .prepare(`
        SELECT
          id,
          name,
          email,
          phone,
          auth_provider,
          google_id,
          profile_image,
          status,
          created_at,
          updated_at
        FROM users
        WHERE id = ?
      `)
      .get(decoded.userId);


    if (!user) {
      return res.status(401).json({
        success: false,
        message:
          "Account not found.",
      });
    }


    // ========================================
    // CHECK ACCOUNT STATUS
    // ========================================

    if (
      user.status !== "active"
    ) {
      return res.status(403).json({
        success: false,
        message:
          "This account is not active.",
      });
    }


    // ========================================
    // ATTACH CUSTOMER TO REQUEST
    // ========================================

    req.user = user;


    next();

  } catch (error) {

    // ========================================
    // TOKEN EXPIRED
    // ========================================

    if (
      error.name ===
      "TokenExpiredError"
    ) {
      return res.status(401).json({
        success: false,
        message:
          "Your session has expired. Please sign in again.",
      });
    }


    // ========================================
    // INVALID JWT
    // ========================================

    if (
      error.name ===
      "JsonWebTokenError"
    ) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid authentication token.",
      });
    }


    // ========================================
    // OTHER ERROR
    // ========================================

    console.error(
      "Customer auth middleware error:",
      error
    );


    return res.status(500).json({
      success: false,
      message:
        "Authentication error.",
    });
  }
}


module.exports =
  requireCustomer;