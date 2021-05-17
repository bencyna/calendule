const router = require("express").Router();
const facebookRoutes = require("./facebook");

router.use("/facebook", facebookRoutes);

router.use("/logout", (req, res) => {
  console.log("loggin out!"), (user = {}), res.redirect("/login");
});

module.exports = router;
