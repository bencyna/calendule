import axios from "axios";

export default {
  loginUser: function () {
    return axios.post("/api/users/login");
  },
  getBookings: function (date) {
    return axios.get("/api/date/" + date);
  },
  getEvent: function (id) {
    return axios.get("/api/date/event" + id);
  },
  getUsers: function () {
    return axios.get("/api/users/find");
  },
  getUser: function (id) {
    return axios.get("/api/users/" + id);
  },
  createEvent: function (eventData) {
    return axios.post("/api/date/", eventData);
  },
};
