import axios from "axios";

export default {
  loginUser: function (body) {
    return axios.post("/api/users/login", body);
  },
  logoutUser: function () {
    return axios.post("/api/users/logout");
  },
  isLoggedIn: function () {
    return axios.get("/api/users/user");
  },
  signUp: function (body) {
    return axios.post("/api/users/signup", body);
  },
  getBookings: function (date, user_id) {
    return axios.get("/api/date/" + date, user_id);
  },
  getAllBookings: function (user_id) {
    return axios.get("/api/date/", user_id);
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
  updatePost: function (body) {
    return axios.put("/api/date/", body);
  },
  getPending: function () {
    return axios.get("/api/date/pending/");
  },
  getAllPending: function () {
    return axios.get("/api/date/allpending/");
  },
  getWaiting: function () {
    return axios.get("/api/date/waiting/");
  },
  facebook: function (body) {
    return axios.post("api/users/facebook/", body);
  },
  saveSession: function (id) {
    return axios.get("api/users/save/" + id);
  },
  deleteAcc: function (id) {
    return axios.delete("api/users/delete/" + id);
  },
};
