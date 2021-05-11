import axios from "axios";

export default {
  loginUser: function () {
    return axios.post("/api/users/login");
  },
  getBookings: function (date) {
    return axios.get("/api/date/" + date);
  },
};
