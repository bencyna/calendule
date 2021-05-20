const { User } = require("../models/");
const db = require("../models/");
const { Op } = require("sequelize");

module.exports = {
  findAll: function (req, res) {
    db.Booking.find(req.query)
      .sort({ date: -1 })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findAllWhere: function (req, res) {
    console.log(req.session.user_id);
    db.Booking.findAll({
      // order by time here Ben!
      include: [
        {
          model: User,
          attributes: ["first_name", "last_name", "id"],
          as: "createdByUser",
        },
        {
          model: User,
          attributes: ["first_name", "last_name", "id"],
          as: "receivedByUser",
        },
      ],
      where: {
        [Op.or]: {
          bookee_id: req.session.user_id,
          booker_id: req.session.user_id,
        },
        date: req.params.id,
      },
    })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => console.log(err)); //res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Booking.findById(req.params.id)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  create: function (req, res) {
    console.log(req.body);
    db.Booking.create(req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => console.log(err)); //res.status(422).json(err));
  },
  update: function (req, res) {
    console.log(req.body);
    db.Booking.update(req.body, {
      where: { id: req.body.id },
    })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Booking.findByPk(req.params.id)
      .then((dbModel) => dbModel.destroy())
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
};
