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
    db.User.findByPk(req.params.id)
      .then((dbModel) => dbModel.destroy())
      .then((dbModel) => res.json(dbModel))
      .catch((err) => console.log(err)); // res.status(422).json(err));
  },
  findOrCreate: async function (req, res) {
    try {
      console.log("~~~~~~~~~~~~~~~~~~~~~~~ " + req);
      const [response, created] = await db.User.findOrCreate({
        where: { id: req.body.id },
        defaults: {
          first_name: "req.body.userPass",
        },
      });
      console.log(response);
      return res.status(200).send({ status: 0, data: response });
    } catch (err) {
      console.log(`ERROR! => ${err.name}: ${err.message}`);
      res.status(500).send(err.message);
    }
  },
};
