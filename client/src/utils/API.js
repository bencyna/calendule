import axios from "axios";

export default {
  loginUser: function () {
    return axios.post("/api/users/login");
  },
  logoutUser: function () {
    return axios.post("/api/users/logout");
  },
  getBookings: function (date, user_id) {
    return axios.get("/api/date/" + date, user_id);
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
  deletePost: function (id) {
    return axios.delete("/api/date/" + id);
  },
  updatePost: function (id) {
    return axios.put("/api/date/" + id);
  },
};
