import React, { useContext } from "react";
import "./style.css";
import { useStoreContext } from "../../utils/GlobalState";
import CardList from "../Cards/CardList";
// import { data } from "../../data";
import _ from "lodash";
import { useHistory } from "react-router-dom";

function LoginForm() {
  // const [userData] = useContext(UserProvider.context);
  // const loginType = !_.isEmpty(userData)
  // ? _.find(data, (d) => d.name === userData.provider)
  // : {};

  const history = useHistory();
  const [state, dispatch] = useStoreContext();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = document.querySelector("#email-login").value.trim();
    const password = document.querySelector("#password-login").value.trim();

    if (email && password) {
      const response = await fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        console.log(response);
        fetch("/api/users/user")
          .then((res) => res.json())
          .then((res) => {
            dispatch({
              type: "LOGGINGIN",
              logged_in: res.logged_in,
              id: res.user_id,
            });
            console.log(res);
            history.push("/");
          })
          .catch((err) => console.log(err));
      }
    } else {
      console.log("Failed to log in");
    }
  };

  const hanldeSignUpBtn = (e) => {
    e.preventDefault();
    dispatch({
      type: "SIGNUP",
    });
  };

  return (
    <div className="col-md-4 loginContainer">
      <form className="form login-form login">
        <div className="form-group">
          <label>email:</label>
          <input className="form-input" type="text" id="email-login" />
        </div>
        <div className="form-group">
          <label>password:</label>
          <input className="form-input" type="password" id="password-login" />
        </div>
        <div className="form-group">
          <button id="signup" className="btn btn-primary" onClick={handleLogin}>
            Login
          </button>
          <button onClick={hanldeSignUpBtn}>Sign up here</button>
        </div>
      </form>
      <CardList />
    </div>
  );
}

export default LoginForm;
