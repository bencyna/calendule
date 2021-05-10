import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { useStoreContext } from "../../utils/GlobalState";
import API from "../../utils/API";

function LoginForm() {
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
        document.location.replace("/");
      } else {
        console.log("Failed to log in");
      }
    }
  };

  const hanldeSignUpBtn = (e) => {
    e.preventDefault();
    dispatch({
      type: "SIGNUP",
      login: false,
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
    </div>
  );
}

export default LoginForm;
