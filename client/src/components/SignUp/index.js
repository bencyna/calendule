import React, { useState } from "react";
import "./style.css";
import { useStoreContext } from "../../utils/GlobalState";
import API from "../../utils/API";
import { useHistory } from "react-router-dom";
import Error from "../Error";

function SignUpForm() {
  const [state, dispatch] = useStoreContext();
  const [formInput, setFormInput] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });

  const history = useHistory();

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const hanldeFormInput = (event) => {
    const { name, value } = event.target;
    setFormInput({ ...formInput, [name]: value });
  };

  const HandleSignUpBtn = (e) => {
    e.preventDefault();
    if (
      formInput.email.length > 1 &&
      formInput.password.length >= 8 &&
      formInput.first_name.length > 1 &&
      formInput.last_name.length > 1
    ) {
      API.signUp({
        first_name: formInput.first_name,
        last_name: formInput.last_name,
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
          console.log(err);
          setErrorMessage("That didn't work, that email may already be in use");
          setError(true);
        });
    } else {
      setErrorMessage(
        "You must include: Your first name, last name, a valid email address and a password more than 8 characters long"
      );
      setError(true);
    }
  };
  // This is not returning the state back to true
  const hanldeSignUpFinish = () => {
    // e.preventDefault();
    dispatch({
      type: "LOGIN",
      login: true,
    });
  };

  return (
    <div className="col-md-4 signupContainer">
      <form className="form signup-form signup">
        <div className="form-group">
          <label>First Name:</label>
          <input
            className="form-input"
            type="name"
            id="firstname-signup"
            name="first_name"
            onChange={hanldeFormInput}
          />
        </div>
        <div className="form-group">
          <label> Last Name:</label>
          <input
            className="form-input"
            type="name"
            id="lastname-signup"
            name="last_name"
            onChange={hanldeFormInput}
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            className="form-input"
            type="text"
            id="email-signup"
            name="email"
            onChange={hanldeFormInput}
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            className="form-input"
            type="password"
            id="password-signup"
            name="password"
            onChange={hanldeFormInput}
          />
        </div>
        <div className="form-group">
          <button
            id="signup"
            className="btn btn-primary initBtns"
            onClick={HandleSignUpBtn}
          >
            signup
          </button>
          <button
            className="btn btn-primary initBtns"
            onClick={hanldeSignUpFinish}
          >
            Back to Login
          </button>
        </div>
      </form>
      {error ? <Error message={errorMessage} /> : <div className="hide"></div>}
    </div>
  );
}

export default SignUpForm;
