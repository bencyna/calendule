const sequelize = require("../config/connection");
const { User, Booking, Date } = require("../models");
const userData = require("./userData.json");
const bookingData = require("./bookingData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  let bookings = [];
  let i = 0;
  for (const booking of bookingData) {
    bookings[i] = await Booking.create(
      {
        ...booking,
        booker_id: users[Math.floor(Math.random() * users.length)].id,
        bookee_id: users[Math.floor(Math.random() * users.length)].id,
      },
      {
        returning: true,
      }
    );
    i++;
  }
  console.log(bookings);

  process.exit(0);
};
seedDatabase();
