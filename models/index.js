const User = require("./user");
const Booking = require("./bookings");

Booking.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

User.hasMany(Booking, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

module.exports = { User, Booking };
