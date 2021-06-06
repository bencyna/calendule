import React from "react";
import FacebookLogin from "react-facebook-login";
import "./style.css";
import API from "../../utils/API";
import { useStoreContext } from "../../utils/GlobalState";
import { useHistory } from "react-router-dom";

function Facebook() {
  const [state, dispatch] = useStoreContext();
  const history = useHistory();

  const responseFacebook = (response) => {
    API.facebook({
      first_name: response.first_name,
      last_name: response.last_name,
      id: response.id,
      email: response.email,
    })
      .then((res) => {
        API.saveSession(response.id).then((res) => {
          console.log(response.id);
          console.log("res: " + res);
          dispatch({
            type: "LOGGINGIN",
            logged_in: true, // res.data.logged_in,
            id: response.id, //res.data.user_id,
          });
          history.push("/");
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <FacebookLogin
      appId="312864710465609"
      autoLoad={true}
      fields="first_name, last_name,email,id"
      callback={responseFacebook}
      className="my-facebook-button-class"
      icon="fa-facebook"
      version="v2.8"
    />
  );
}

export default Facebook;
