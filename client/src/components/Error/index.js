import React from "react";
import { Link } from "react-router-dom";

function Error(props) {
  return (
    <div>
      <div className="alert alert-dismissible alert-danger">
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
        ></button>
        <strong>Oh snap!</strong>{" "}
        <Link to="#" className="alert-link">
          {props.message}
        </Link>{" "}
        {/* try submitting again. */}
      </div>
    </div>
  );
}

export default Error;
