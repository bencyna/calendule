import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useStoreContext } from "../../utils/GlobalState";
import API from "../../utils/API";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [state, dispatch] = useStoreContext();

  useEffect(() => {
    API.isLoggedIn()
      .then((res) => {
        dispatch({
          type: "LOGGINGIN",
          logged_in: res.data.logged_in,
          id: res.data.user_id,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) =>
        state.logged_in ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
