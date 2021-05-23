const router = require("express").Router();
const bookingController = require("../../controllers/bookingsController");
const withAuth = require("../../auth");

// Matches with "/api/date"
router
  .route("/")
  .get(bookingController.findAll)
  .post(bookingController.create)
  .put(bookingController.update);

router.route("/pending").get(bookingController.findPending);
router.route("/allpending").get(bookingController.findAllPending);

// Matches with "/api/date/:id"
router
  .route("/:id")
  .get(bookingController.findAllWhere)
  .delete(bookingController.remove);

module.exports = router;

module.exports = router;
