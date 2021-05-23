const router = require("express").Router();

router.use("/logout", (req, res) => {
  console.log("loggin out!"), (user = {}), res.redirect("/login");
});

module.exports = router;
