const express = require("express");
const path = require("path");
const session = require("express-session");
const routes = require("./routes");
const compression = require("compression");

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
