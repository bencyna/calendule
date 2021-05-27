const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
// const authRoutes = require("./api/auth");

// API Routes
router.use("/api", apiRoutes);
// router.use("/auth", authRoutes);

// If no API routes are hit, send the React app

module.exports = router;
