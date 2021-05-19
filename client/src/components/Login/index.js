import React, { useState } from "react";
import "./style.css";
import { useStoreContext } from "../../utils/GlobalState";
import CardList from "../Cards/CardList";
// import { data } from "../../data";
import _ from "lodash";
import { useHistory } from "react-router-dom";
import API from "../../utils/API";

function LoginForm() {
  const [formInput, setFormInput] = useState({
    email: "",
    password: "",
  });

  const history = useHistory();
  const [state, dispatch] = useStoreContext();

  const hanldeFormInput = (event) => {
    const { name, value } = event.target;
    setFormInput({ ...formInput, [name]: value });
    console.log(formInput);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (formInput.email && formInput.password) {
      API.loginUser({
        formInput,
      });
      // const response = await fetch("/api/users/login", {
      //   method: "POST",
      //   body: JSON.stringify({ email, password }),
      //   headers: { "Content-Type": "application/json" },
      // });
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
      // error password or email does not match
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
          <input
            className="form-input"
            type="text"
            id="email-login"
            name="email"
            onChange={hanldeFormInput}
          />
        </div>
        <div className="form-group">
          <label>password:</label>
          <input
            className="form-input"
            type="password"
            id="password-login"
            name="password"
            onChange={hanldeFormInput}
          />
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
