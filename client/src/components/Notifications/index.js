import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import { useStoreContext } from "../../utils/GlobalState";
import API from "../../utils/API";
import "./style.css";
import { useHistory } from "react-router-dom";

function Notifications() {
  const [state, dispatch] = useStoreContext();
  const history = useHistory();

  useEffect(() => {
    API.getPending()
      .then((res) => {
        if (res.data.length === 0) {
          return;
        }
        dispatch({
          type: "PENDINGEVENT",
          pendingEvents: res.data,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const notifcationClick = (e) => {
    history.push(`/pending`);
  };

  return (
    <div>
      <Link
        to="#"
        className="notification nav-link dropdown-toggle"
        data-bs-toggle="dropdown"
        role="button"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <span>
          <FeatherIcon icon="bell" />
        </span>
        <span className="badge">{state.pendingEvents.length}</span>
      </Link>
      <div className="dropdown-menu dropContainer">
        <Link className="dropdown-item" to="#">
          <h5> Your Pending Events: </h5>
        </Link>
        {state.pendingEvents.map((event) => {
          return (
            <Link
              className="dropdown-item left"
              to="/pending"
              key={event.id}
              id={event.id}
            >
              {event.title}
            </Link>
          );
        })}
        <div className="dropdown-divider"></div>
        <Link className="dropdown-item" to="/pending">
          See all pending events
        </Link>
      </div>
    </div>
  );
}

export default Notifications;
