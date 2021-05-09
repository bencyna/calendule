import React from "react";
import LoginForm from "../Login";
import "./style.css";
import { useStoreContext } from "../../utils/GlobalState";
import SignUpForm from "../SignUp";

function Welcome() {
  const [state, dispatch] = useStoreContext();

  return (
    <div className="row">
      <div className="col-md-8">
        <div id="welcomeTag">
          <h1>Welcome to Calendule</h1>
          <h5>The best Scheduling app</h5>
        </div>
      </div>
      {state.login ? <LoginForm /> : <SignUpForm />}
    </div>
  );
}

export default Welcome;
