import React from "react";
import LoginForm from "../Login";
import "./style.css";
import { useStoreContext } from "../../utils/GlobalState";
import SignUpForm from "../SignUp";

function Welcome() {
  const [state, dispatch] = useStoreContext();

  return (
    <div className="Container">
      <div className="row">
        <div className="col-md-8">
          <div id="welcomeTag">
            <h1 className="title">Welcome to Calendule</h1>
            <h5 className="title">
              Login or Sign Up to use all the cool features!
            </h5>
          </div>
        </div>
        {state.login ? <LoginForm /> : <SignUpForm />}
      </div>
    </div>
  );
}

export default Welcome;
