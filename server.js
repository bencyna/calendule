const express = require("express");
const path = require("path");
const session = require("express-session");
const routes = require("./routes");
const compression = require("compression");
const cors = require("cors");
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const keys = require("./config/passportConnections");
const chalk = require("chalk");
let user = {};

//Facebook strategy
passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((user, cb) => {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(
  new FacebookStrategy(
    {
      // client: keys.FACEBOOK.clientID,
      // clientSecret: keys.FACEBOOK.clientSecret, // use ENV
      clientID: "2503599789703821",
      clientSecret: "645088b310270cfbabbda58e01f65e96",
      callbackURL: "http://localhost:3000/auth/facebook/callback",
    },
    (accessToekn, refreshToken, profile, cb) => {
      // console.log(chalk.blue(JSON.stringify(profile)));
      // user = { ...profile };
      // return cb(null, profile);
      User.findOrCreate({ facebookId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  )
);

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Define middleware here
app.use(express.json());
app.use(compression());
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(req.url);
  next();
});

app.use(express.static(path.join(__dirname, "/public")));
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and Auth

app.use(routes);

// Start the API server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening on port " + PORT));
});
