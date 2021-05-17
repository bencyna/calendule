const router = require("express").Router();
const passport = require("passport");

router.get("/", () => {
  console.log("FACEBOOK ROUTE");
  passport.authenticate("facebook");
});

router.get(
  "/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/");
  }
);

module.exports = router;
