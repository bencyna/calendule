import React from "react";
import LoginForm from "../Login";
import "./style.css";
import { useStoreContext } from "../../utils/GlobalState";
import SignUpForm from "../SignUp";
import Calendula from "../../assets/calendula-plant.jpg";

function Welcome() {
  const [state] = useStoreContext();

  return (
    <div className="Container">
      <div className="row">
        <div className="col-md-8">
          <div id="welcomeTag">
            <h1 className="title">Welcome to Calendule</h1>
            <div className="image">
              <img src={Calendula} alt="calendula plant" />
            </div>
            <h5 className="title" style={{ marginTop: "20px" }}>
              Login or Sign Up to use all the cool features!
            </h5>
            <small
              style={{
                display: "inline-block",
                maxWidth: "500px",
                textAlign: "center",
              }}
            >
              {" "}
              Calendule is the perfect scheduling app. Making appointments,
              meetings or even booking in a slot to meet up with friends can
              easily be done without the back and fourth we've gotten so custom
              to. Simply find your friends, collegues or organisation and
              request an event. Once accepted it will be available to see in
              both you and your recepients calendar, Enjoy!
            </small>
          </div>
        </div>
        {state.login ? <LoginForm /> : <SignUpForm />}
      </div>
    </div>
  );
}

export default Welcome;
