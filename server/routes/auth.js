const express = require("express");
const jwt = require("jsonwebtoken");
const requireAdmin = require("../middleware/auth");

const router = express.Router();


// ========================================
// ADMIN LOGIN
// POST /api/auth/login
// ========================================

router.post("/login", (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (
      email !== adminEmail ||
      password !== adminPassword
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        role: "admin",
        email: adminEmail,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "8h",
      }
    );

    return res.json({
      success: true,
      message: "Login successful",

      token,

      admin: {
        email: adminEmail,
        role: "admin",
      },
    });

  } catch (error) {
    console.error("Admin login error:", error);

    return res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
});


// ========================================
// VERIFY ADMIN TOKEN
// GET /api/auth/verify
// ========================================

router.get(
  "/verify",
  requireAdmin,
  (req, res) => {
    return res.json({
      success: true,

      admin: {
        email: req.admin.email,
        role: req.admin.role,
      },
    });
  }
);


module.exports = router;