const db = require("../models/");
const Bookings = require("../models/bookings");

module.exports = {
  findAll: function (req, res) {
    db.User.findAll(req.query)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => console.log(err));
    //   res.status(422).json(err));
  },
  findByPk: function (req, res) {
    db.User.findByPk(req.params.id)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => console.log(err)); //res.status(422).json(err));
  },
  create: function (req, res) {
    db.User.create(req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  update: function (req, res) {
    db.User.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.User.findById({ _id: req.params.id })
      .then((dbModel) => dbModel.remove())
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
};
