const { User } = require("../../models");
const router = require("express").Router();
const userController = require("../../controllers/userControllers");

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(401)
        .json({ message: "Incorrect email or password, please try again :)" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(401)
        .json({ message: "Incorrect email or password, please try again :)" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json(req.session);
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
    res.json(error);
  }
});

router.post("/signup", async (req, res) => {
  try {
    const userData = await User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json(req.session);
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.route("/find").get(userController.findAll);

router.get("/user", (req, res) => {
  try {
    res.json(req.session);
  } catch (error) {
    console.log(error);
  }
});

router.route("/:id").get(userController.findByPk);

module.exports = router;
