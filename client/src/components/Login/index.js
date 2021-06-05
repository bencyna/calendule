import React, { useState } from "react";
import "./style.css";
import { useStoreContext } from "../../utils/GlobalState";
// import CardList from "../Cards/CardList";
// import { data } from "../../data";
import _ from "lodash";
import { useHistory } from "react-router-dom";
import API from "../../utils/API";
import Error from "../Error";
import Facebook from "../Facebook";

function LoginForm() {
  const [formInput, setFormInput] = useState({
    email: "",
    password: "",
  });

  const history = useHistory();
  const [state, dispatch] = useStoreContext();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const hanldeFormInput = (event) => {
    const { name, value } = event.target;
    setFormInput({ ...formInput, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (formInput.email.length > 1 && formInput.password.length > 8) {
      API.loginUser({
        email: formInput.email,
        password: formInput.password,
      })
        .then((res) => {
          dispatch({
            type: "LOGGINGIN",
            logged_in: res.data.logged_in,
            id: res.data.user_id,
          });
          history.push("/");
        })
        .catch((err) => {
          setError(true);
        });
      setErrorMessage("Incorrect Email or Password"); // password / email doesnt match error
    } else {
      // error password email and password cannot be blank
      setErrorMessage("Incorrect Email or Password");
      setError(true);
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
          <label>Email:</label>
          <input
            className="form-input"
            type="text"
            id="email-login"
            name="email"
            onChange={hanldeFormInput}
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            className="form-input"
            type="password"
            id="password-login"
            name="password"
            onChange={hanldeFormInput}
          />
        </div>
        <div className="form-group">
          <button
            id="signup"
            className="btn btn-primary initBtns"
            onClick={handleLogin}
          >
            Login
          </button>
          <button
            className="btn btn-primary initBtns"
            onClick={hanldeSignUpBtn}
          >
            Sign up here
          </button>
        </div>
      </form>
      {error ? <Error message={errorMessage} /> : <div className="hide"></div>}
      <Facebook />
    </div>
  );
}

export default LoginForm;
