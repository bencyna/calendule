import axios from "axios";

export default {
  loginUser: function () {
    return axios.post("/api/users/login");
  },
};
