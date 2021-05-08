const router = require("express").Router();
const userRoutes = require("./userRoutes.js");
const bookingRoutes = require("./bookingRoutes");

router.use("/users", userRoutes);
router.use("/bookings", bookingRoutes);

module.exports = router;
