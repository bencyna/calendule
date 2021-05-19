import React, { useState } from "react";
import "./style.css";
import { useStoreContext } from "../../utils/GlobalState";
// import CardList from "../Cards/CardList";
// import { data } from "../../data";
import _ from "lodash";
import { useHistory } from "react-router-dom";
import API from "../../utils/API";
import Error from "../Error";

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
    console.log(formInput.password.length);
    if (formInput.email.length > 1 && formInput.password.length > 8) {
      API.loginUser({
        email: formInput.email,
        password: formInput.password,
      })
        .then((res) => {
          console.log(res);
          dispatch({
            type: "LOGGINGIN",
            logged_in: res.data.logged_in,
            id: res.data.user_id,
          });
          console.log(res);
          history.push("/");
        })
        .catch((err) => {
          console.log(err);
          setError(true);
        });
      setErrorMessage("Incorrect Email or Password"); // password / email doesnt match error
    } else {
      console.log("Failed to log in");
      // error password email and password cannot be blank
      setErrorMessage("Password must be atleast 8 characters");
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
      {error ? <Error message={errorMessage} /> : <div className="hide"></div>}
      {/* <CardList /> */}
    </div>
  );
}

export default LoginForm;
