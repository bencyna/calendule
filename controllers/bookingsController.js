const { User } = require("../models/");
const db = require("../models/");
const { Op } = require("sequelize");
const withAuth = require("../auth");

module.exports = {
  findAll: function withAuth(req, res) {
    db.Booking.findAll({
      order: [["date", "ASC"]],
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
        accepted: true,
      },
    })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findAllWhere: function (req, res) {
    db.Booking.findAll({
      // order by time here Ben!
      order: [["time", "ASC"]],
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
        [Op.and]: {
          date: req.params.id,
          accepted: true,
        },
      },
    })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findPending: function (req, res) {
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
        [Op.or]: [
          {
            [Op.and]: [
              { bookee_id: req.session.user_id },
              { accepted: false },
              { bookerPending: false },
            ],
          },
          {
            [Op.and]: [
              { booker_id: req.session.user_id },
              { accepted: false },
              { bookerPending: true },
            ],
          },
        ],
      },
    })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findWaiting: function (req, res) {
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
        [Op.or]: [
          {
            [Op.and]: [
              { bookee_id: req.session.user_id },
              { accepted: false },
              { bookerPending: true },
            ],
          },
          {
            [Op.and]: [
              { booker_id: req.session.user_id },
              { accepted: false },
              { bookerPending: false },
            ],
          },
        ],
      },
    })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findAllPending: function (req, res) {
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
        accepted: false,
        [Op.or]: {
          booker_id: req.session.user_id,
          bookee_id: req.session.user_id,
        },
      },
    })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
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
      .catch((err) => res.status(422).json(err));
  },
  update: function (req, res) {
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
