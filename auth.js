const withAuth = (req, res, next) => {
  if (!req.session.user_id) {
    location.redirect("/login");
  } else {
    next();
  }
};

module.exports = withAuth;
