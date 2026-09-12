const dns = require("dns");
const net = require("net");

dns.setDefaultResultOrder("ipv4first");
net.setDefaultAutoSelectFamily(false);

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const propertyRoutes =
  require("./routes/properties");

const enquiryRoutes =
  require("./routes/enquiries");

const adminRoutes =
  require("./routes/admin");

const authRoutes =
  require("./routes/auth");

const valuationRoutes =
  require("./routes/valuations");

const contactRoutes =
  require("./routes/contact");

const customerAuthRoutes =
  require("./routes/customerAuth");

const savedPropertyRoutes =
  require("./routes/savedProperties");


const app = express();


// ========================================
// MIDDLEWARE
// ========================================

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://nextmoveestateslondon.co.uk",
    ],
    credentials: true,
  })
);

app.use(express.json());


// ========================================
// ROOT
// ========================================

app.get("/", (req, res) => {
  return res.json({
    success: true,
    message:
      "UK Real Estate API is running",
  });
});


// ========================================
// ROUTES
// ========================================

app.use(
  "/api/properties",
  propertyRoutes
);

app.use(
  "/api/enquiries",
  enquiryRoutes
);

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/admin",
  adminRoutes
);

app.use(
  "/api/valuations",
  valuationRoutes
);

app.use(
  "/api/contact",
  contactRoutes
);


// CUSTOMER SIGN UP / SIGN IN
app.use(
  "/api/customer-auth",
  customerAuthRoutes
);


app.use(
  "/api/saved-properties",
  savedPropertyRoutes
);
// ========================================
// 404
// ========================================

app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});


// ========================================
// ERROR HANDLER
// ========================================

app.use((error, req, res, next) => {
  console.error(
    "Server error:",
    error
  );

  return res.status(500).json({
    success: false,
    message:
      "Internal server error.",
  });
});


// ========================================
// START SERVER
// ========================================

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );

  console.log(
    "Customer auth route: /api/customer-auth"
  );
});