const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { OAuth2Client } = require("google-auth-library");
const { Resend } = require("resend");

const db = require("../database/db");
const requireCustomer = require("../middleware/customerAuth");

const router = express.Router();

const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID
);

const resend = new Resend(
  process.env.RESEND_API_KEY
);


// ========================================
// CREATE CUSTOMER JWT
// ========================================

function createCustomerToken(user) {
  return jwt.sign(
    {
      userId: user.id,
      email: user.email,
      role: "customer",
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
}


// ========================================
// REGISTER CUSTOMER
// POST /api/customer-auth/register
// ========================================

router.post("/register", async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
    } = req.body;


    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message:
          "Name, email and password are required.",
      });
    }


    const cleanName =
      name.trim();

    const cleanEmail =
      email.trim().toLowerCase();

    const cleanPhone =
      phone?.trim() || null;


    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({
        success: false,
        message:
          "Please enter a valid email address.",
      });
    }


    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 8 characters.",
      });
    }


    const existingUser = db
      .prepare(`
        SELECT
          id,
          email,
          password_hash,
          auth_provider,
          google_id
        FROM users
        WHERE email = ?
      `)
      .get(cleanEmail);


    if (existingUser) {
      if (
        !existingUser.password_hash &&
        existingUser.google_id
      ) {
        return res.status(409).json({
          success: false,
          message:
            "An account already exists with this email using Google. Please sign in with Google instead.",
        });
      }


      return res.status(409).json({
        success: false,
        message:
          "An account already exists with this email. Please sign in instead.",
      });
    }


    const passwordHash =
      await bcrypt.hash(
        password,
        12
      );


    const result = db
      .prepare(`
        INSERT INTO users (
          name,
          email,
          phone,
          password_hash,
          auth_provider
        )
        VALUES (?, ?, ?, ?, ?)
      `)
      .run(
        cleanName,
        cleanEmail,
        cleanPhone,
        passwordHash,
        "local"
      );


    const user = {
      id: Number(
        result.lastInsertRowid
      ),

      name:
        cleanName,

      email:
        cleanEmail,

      phone:
        cleanPhone,

      auth_provider:
        "local",

      profile_image:
        null,
    };


    const token =
      createCustomerToken(user);


    return res.status(201).json({
      success: true,
      message:
        "Account created successfully.",
      token,
      user,
    });


  } catch (error) {
    console.error(
      "Customer register error:",
      error
    );


    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while creating your account.",
    });
  }
});


// ========================================
// CUSTOMER LOGIN
// POST /api/customer-auth/login
// ========================================

router.post("/login", async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;


    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message:
          "Email and password are required.",
      });
    }


    const cleanEmail =
      email
        .trim()
        .toLowerCase();


    const user = db
      .prepare(`
        SELECT
          id,
          name,
          email,
          phone,
          password_hash,
          auth_provider,
          google_id,
          profile_image,
          status,
          created_at
        FROM users
        WHERE email = ?
      `)
      .get(cleanEmail);


    if (!user) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid email or password.",
      });
    }


    if (user.status !== "active") {
      return res.status(403).json({
        success: false,
        message:
          "This account is not active.",
      });
    }


    if (!user.password_hash) {
      return res.status(400).json({
        success: false,
        message:
          "This account uses Google Sign-In. Use Google Sign-In or reset your password to create a password.",
      });
    }


    const passwordMatches =
      await bcrypt.compare(
        password,
        user.password_hash
      );


    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid email or password.",
      });
    }


    const token =
      createCustomerToken(user);


    return res.json({
      success: true,
      message:
        "Signed in successfully.",

      token,

      user: {
        id:
          user.id,

        name:
          user.name,

        email:
          user.email,

        phone:
          user.phone,

        auth_provider:
          user.auth_provider,

        profile_image:
          user.profile_image,

        created_at:
          user.created_at,
      },
    });


  } catch (error) {
    console.error(
      "Customer login error:",
      error
    );


    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while signing in.",
    });
  }
});


// ========================================
// FORGOT PASSWORD
// POST /api/customer-auth/forgot-password
// ========================================

router.post(
  "/forgot-password",
  async (req, res) => {
    try {

      console.log(
        "Forgot password request:",
        req.body
      );


      const {
        email,
      } = req.body;


      if (
        !email ||
        !email.trim()
      ) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "Email address is required.",
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


      const user = db
        .prepare(`
          SELECT
            id,
            name,
            email,
            password_hash,
            google_id,
            status
          FROM users
          WHERE email = ?
        `)
        .get(
          cleanEmail
        );


      const genericResponse = {
        success: true,
        message:
          "If an account exists with that email, we have sent password reset instructions.",
      };


      if (!user) {
        return res.json(
          genericResponse
        );
      }


      if (
        user.status !== "active"
      ) {
        return res.json(
          genericResponse
        );
      }


      db.prepare(`
        DELETE FROM password_reset_tokens
        WHERE user_id = ?
          AND used_at IS NULL
      `).run(
        user.id
      );


      const rawToken =
        crypto
          .randomBytes(32)
          .toString("hex");


      const tokenHash =
        crypto
          .createHash("sha256")
          .update(rawToken)
          .digest("hex");


      const expiresAt =
        new Date(
          Date.now() +
          30 * 60 * 1000
        ).toISOString();


      db.prepare(`
        INSERT INTO password_reset_tokens (
          user_id,
          token_hash,
          expires_at
        )
        VALUES (?, ?, ?)
      `).run(
        user.id,
        tokenHash,
        expiresAt
      );


      const frontendUrl =
        process.env.FRONTEND_URL ||
        "http://localhost:3000";


      const resetUrl =
        `${frontendUrl}/reset-password?token=${encodeURIComponent(rawToken)}`;


      try {

        const emailResult =
          await resend.emails.send({
            from:
              process.env.EMAIL_FROM,

            to:
              user.email,

            subject:
              "Reset your Next Move Estates password",

            html: `
              <div style="
                font-family: Arial, Helvetica, sans-serif;
                max-width: 600px;
                margin: 0 auto;
                color: #1f2937;
                line-height: 1.6;
              ">

                <div style="
                  background: #082D52;
                  padding: 24px;
                  text-align: center;
                ">
                  <h1 style="
                    color: #ffffff;
                    margin: 0;
                    font-size: 24px;
                  ">
                    Next Move Estates London
                  </h1>
                </div>


                <div style="
                  padding: 32px 24px;
                  background: #ffffff;
                ">

                  <h2 style="
                    color: #082D52;
                    margin-top: 0;
                  ">
                    Reset your password
                  </h2>


                  <p>
                    Hello ${user.name || "Customer"},
                  </p>


                  <p>
                    We received a request to reset or create the password for your Next Move Estates account.
                  </p>


                  <p>
                    Click the button below to create a new password.
                  </p>


                  <div style="
                    margin: 30px 0;
                    text-align: center;
                  ">

                    <a
                      href="${resetUrl}"
                      style="
                        display: inline-block;
                        background: #D3A72F;
                        color: #082D52;
                        text-decoration: none;
                        font-weight: bold;
                        padding: 14px 24px;
                        border-radius: 8px;
                      "
                    >
                      Reset Password
                    </a>

                  </div>


                  <p style="
                    font-size: 14px;
                    color: #64748b;
                  ">
                    This password reset link will expire in 30 minutes.
                  </p>


                  <p style="
                    font-size: 14px;
                    color: #64748b;
                  ">
                    If you did not request this, you can safely ignore this email.
                  </p>


                  <hr style="
                    border: 0;
                    border-top: 1px solid #e5e7eb;
                    margin: 28px 0;
                  ">


                  <p style="
                    font-size: 12px;
                    color: #94a3b8;
                  ">
                    Next Move Estates London Limited
                    <br />
                    83 Garron Lane, South Ockendon,
                    RM15 5JQ, United Kingdom
                  </p>

                </div>

              </div>
            `,
          });


        console.log(
          "Password reset email sent:",
          emailResult
        );


      } catch (emailError) {

        console.error(
          "Password reset email error:",
          emailError
        );


        db.prepare(`
          DELETE FROM password_reset_tokens
          WHERE token_hash = ?
        `).run(
          tokenHash
        );


        return res
          .status(500)
          .json({
            success: false,
            message:
              "We could not send the password reset email. Please try again.",
          });
      }


      return res.json(
        genericResponse
      );


    } catch (error) {

      console.error(
        "Forgot password error:",
        error
      );


      return res
        .status(500)
        .json({
          success: false,
          message:
            "Something went wrong. Please try again.",
        });
    }
  }
);


// ========================================
// RESET PASSWORD
// POST /api/customer-auth/reset-password
// ========================================

router.post(
  "/reset-password",
  async (req, res) => {
    try {

      const {
        token,
        password,
      } = req.body;


      if (
        !token ||
        !password
      ) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "Reset token and new password are required.",
          });
      }


      if (
        password.length < 8
      ) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "Password must be at least 8 characters.",
          });
      }


      const tokenHash =
        crypto
          .createHash("sha256")
          .update(token)
          .digest("hex");


      const resetRecord = db
        .prepare(`
          SELECT
            prt.id AS reset_id,
            prt.user_id,
            prt.token_hash,
            prt.expires_at,
            prt.used_at,

            u.id AS user_id,
            u.email,
            u.status

          FROM password_reset_tokens prt

          INNER JOIN users u
            ON u.id = prt.user_id

          WHERE prt.token_hash = ?
            AND prt.used_at IS NULL

          LIMIT 1
        `)
        .get(
          tokenHash
        );


      if (!resetRecord) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "This password reset link is invalid or has already been used.",
          });
      }


      const expiresAt =
        new Date(
          resetRecord.expires_at
        );


      if (
        Number.isNaN(
          expiresAt.getTime()
        ) ||
        expiresAt.getTime() <
          Date.now()
      ) {

        db.prepare(`
          UPDATE password_reset_tokens
          SET used_at = CURRENT_TIMESTAMP
          WHERE id = ?
        `).run(
          resetRecord.reset_id
        );


        return res
          .status(400)
          .json({
            success: false,
            message:
              "This password reset link has expired. Please request a new one.",
          });
      }


      if (
        resetRecord.status !==
        "active"
      ) {
        return res
          .status(403)
          .json({
            success: false,
            message:
              "This account is not active.",
          });
      }


      const passwordHash =
        await bcrypt.hash(
          password,
          12
        );


      const resetPasswordTransaction =
        db.transaction(() => {

          db.prepare(`
            UPDATE users
            SET
              password_hash = ?,
              updated_at =
                CURRENT_TIMESTAMP
            WHERE id = ?
          `).run(
            passwordHash,
            resetRecord.user_id
          );


          db.prepare(`
            UPDATE password_reset_tokens
            SET used_at =
              CURRENT_TIMESTAMP
            WHERE user_id = ?
              AND used_at IS NULL
          `).run(
            resetRecord.user_id
          );
        });


      resetPasswordTransaction();


      return res.json({
        success: true,

        message:
          "Your password has been reset successfully. You can now sign in with your new password.",
      });


    } catch (error) {

      console.error(
        "Reset password error:",
        error
      );


      return res
        .status(500)
        .json({
          success: false,
          message:
            "Something went wrong while resetting your password.",
        });
    }
  }
);


// ========================================
// GET CURRENT CUSTOMER
// GET /api/customer-auth/me
// ========================================

router.get(
  "/me",
  requireCustomer,
  (req, res) => {

    return res.json({
      success: true,

      user: {
        id:
          req.user.id,

        name:
          req.user.name,

        email:
          req.user.email,

        phone:
          req.user.phone,

        auth_provider:
          req.user.auth_provider,

        profile_image:
          req.user.profile_image,

        created_at:
          req.user.created_at,
      },
    });
  }
);


// ========================================
// GOOGLE SIGN IN / SIGN UP
// POST /api/customer-auth/google
// ========================================

router.post("/google", async (req, res) => {
  try {

    const {
      credential,
    } = req.body;


    if (!credential) {
      return res.status(400).json({
        success: false,
        message:
          "Google credential is required.",
      });
    }


    const ticket =
      await googleClient.verifyIdToken({
        idToken:
          credential,

        audience:
          process.env
            .GOOGLE_CLIENT_ID,
      });


    const payload =
      ticket.getPayload();


    if (!payload) {
      return res.status(401).json({
        success: false,
        message:
          "Unable to verify Google account.",
      });
    }


    const {
      sub: googleId,
      email,
      name,
      picture,
      email_verified:
        emailVerified,
    } = payload;


    if (
      !email ||
      !emailVerified
    ) {
      return res.status(401).json({
        success: false,
        message:
          "Google email could not be verified.",
      });
    }


    const cleanEmail =
      email
        .trim()
        .toLowerCase();


    let user = db
      .prepare(`
        SELECT
          id,
          name,
          email,
          phone,
          password_hash,
          auth_provider,
          google_id,
          profile_image,
          status,
          created_at
        FROM users
        WHERE email = ?
      `)
      .get(cleanEmail);


    if (user) {

      if (
        user.status !== "active"
      ) {
        return res.status(403).json({
          success: false,

          message:
            "This account is not active.",
        });
      }


      const googleOwner = db
        .prepare(`
          SELECT
            id
          FROM users
          WHERE google_id = ?
        `)
        .get(googleId);


      if (
        googleOwner &&
        googleOwner.id !== user.id
      ) {
        return res.status(409).json({
          success: false,

          message:
            "This Google account is already linked to another account.",
        });
      }


      if (!user.google_id) {

        db.prepare(`
          UPDATE users
          SET
            google_id = ?,
            profile_image =
              COALESCE(
                profile_image,
                ?
              ),
            updated_at =
              CURRENT_TIMESTAMP
          WHERE id = ?
        `).run(
          googleId,
          picture || null,
          user.id
        );
      }


      user = db
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
            created_at
          FROM users
          WHERE id = ?
        `)
        .get(user.id);
    }


    else {

      const result = db
        .prepare(`
          INSERT INTO users (
            name,
            email,
            phone,
            password_hash,
            auth_provider,
            google_id,
            profile_image,
            status
          )
          VALUES (
            ?, ?, ?, ?, ?, ?, ?, ?
          )
        `)
        .run(
          name ||
            "Google User",

          cleanEmail,

          null,

          null,

          "google",

          googleId,

          picture || null,

          "active"
        );


      user = db
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
            created_at
          FROM users
          WHERE id = ?
        `)
        .get(
          Number(
            result.lastInsertRowid
          )
        );
    }


    const token =
      createCustomerToken(user);


    return res.json({
      success: true,

      message:
        "Google sign in successful.",

      token,

      user: {
        id:
          user.id,

        name:
          user.name,

        email:
          user.email,

        phone:
          user.phone,

        profile_image:
          user.profile_image,

        auth_provider:
          user.auth_provider,

        created_at:
          user.created_at,
      },
    });


  } catch (error) {

    console.error(
      "Google authentication error:",
      error
    );


    return res.status(401).json({
      success: false,

      message:
        "Google authentication failed.",
    });
  }
});


module.exports = router;