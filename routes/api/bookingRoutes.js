const { Booking } = require("../../models");
const router = require("express").Router();

router.post("booking", async (req, res) => {
  try {
    const bookingData = await Booking.create({
      title: req.body.title,
      date: req.body.date,
      decription: req.body.description,
      location: req.body.location,
    });

    res.status(200).json(bookingData);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

module.exports = router;
