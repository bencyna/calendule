const router = require("express").Router();
const userRoutes = require("./userRoutes.js");
const bookingRoutes = require("./bookingRoutes");
const authRoutes = require("./auth");

router.use("/users", userRoutes);
router.use("/date", bookingRoutes);
router.use("/auth", authRoutes);

module.exports = router;
