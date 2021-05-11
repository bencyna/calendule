const { Booking } = require("../../models");
const router = require("express").Router();
const bookingController = require("../../controllers/bookingsController");

// Matches with "/api/books"
router.route("/").get(bookingController.findAll).post(bookingController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(bookingController.findAllWhere)
  .put(bookingController.update)
  .delete(bookingController.remove);

module.exports = router;

module.exports = router;
