import React from "react";
import { useStoreContext } from "../../utils/GlobalState";
import { Link } from "react-router-dom";

function Success(props) {
  const [state, dispatch] = useStoreContext();

  return (
    <div className="successMessage">
      <div className="alert alert-dismissible alert-success">
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          onClick={dispatch({ type: "eventSubmitDone" })}
        ></button>
        <strong>Nice!</strong> You successfully added an event
        <Link to="/myevents" className="alert-link">
          Click me to see your events!
        </Link>{" "}
      </div>
    </div>
  );
}

export default Success;
