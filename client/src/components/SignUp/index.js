import React from "react";
import "./style.css";
import { useStoreContext } from "../../utils/GlobalState";

function SignUpForm() {
  const [state, dispatch] = useStoreContext();

  const HandleSignUpBtn = async (e) => {
    e.preventDefault();
    const email = document.querySelector("#email-signup").value.trim();
    const password = document.querySelector("#password-signup").value.trim();
    const firstName = document.querySelector("#firstname-signup").value.trim();
    const lastName = document.querySelector("#lastname-signup").value.trim();

    if (email && password && firstName && lastName) {
      const response = await fetch("/api/users/signup", {
        method: "POST",
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        alert(
          "you have successfully signed up! Login to use all the cool features!"
        );
        hanldeSignUpFinish();
      } else {
        alert(response.statusText);
      }
    }
  };
  // This is not returning the state back to true
  const hanldeSignUpFinish = () => {
    // e.preventDefault();
    console.log("hey");
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
          <input className="form-input" type="name" id="firstname-signup" />
        </div>
        <div className="form-group">
          <label> Last Name:</label>
          <input className="form-input" type="name" id="lastname-signup" />
        </div>
        <div className="form-group">
          <label>email:</label>
          <input className="form-input" type="text" id="email-signup" />
        </div>
        <div className="form-group">
          <label>password:</label>
          <input className="form-input" type="password" id="password-signup" />
        </div>
        <div className="form-group">
          <button
            id="signup"
            className="btn btn-primary"
            onClick={HandleSignUpBtn}
          >
            signup
          </button>
          <button onClick={hanldeSignUpFinish}>Back to Login</button>
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;
