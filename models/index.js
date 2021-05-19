const User = require("./user");
const Booking = require("./bookings");

Booking.belongsTo(User, {
  as: "createdByUser",
  foreignKey: "booker_id",
  onDelete: "CASCADE",
});

Booking.belongsTo(User, {
  as: "receivedByUser",
  foreignKey: "bookee_id",
  onDelete: "CASCADE",
});

User.hasMany(Booking, {
  as: "createdByUser",
  foreignKey: "booker_id",
  onDelete: "CASCADE",
});

User.hasMany(Booking, {
  as: "receivedByUser",
  foreignKey: "bookee_id",
  onDelete: "CASCADE",
});

module.exports = { User, Booking };
