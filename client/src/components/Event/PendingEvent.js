import React from "react";
import { Link } from "react-router-dom";
import { useStoreContext } from "../../utils/GlobalState";
import TimePicker from "react-bootstrap-time-picker";
import API from "../../utils/API";

function PendingEvent(props) {
  const [state, dispatch] = useStoreContext();

  const acceptedEvent = () => {
    API.updatePost({
      accepted: true,
      id: state.currentBooking.id,
    })
      .then((res) => {
        alert("Booking made, check your calendar to see");
        // re-render page
        dispatch({
          type: "CLICKEDEVENT",
          clickedEvent: false,
        });
      })
      .catch((err) => console.log(err));
  };

  const rejectedEvent = () => {
    API.deletePost(state.currentBooking.id)
      .then((res) => {
        console.log("Ben changhe this to re mount the other component maybe");
        console.log(window.prompt("Rejection Reason: "));
        dispatch({
          type: "CLICKEDEVENT",
          clickedEvent: false,
        });
      })
      .catch((err) => console.log(err));
  };

  const editedEvent = () => {
    API.updatePost({
      bookerPending: !state.currentBooking.bookerPending,
      id: state.currentBooking.id,
    })
      .then((res) => {
        alert("Reshedule requested");
        dispatch({
          type: "CLICKEDEVENT",
          clickedEvent: false,
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="clickedEvent col-md-6">
      <div className="listCOntainer">
        <h2 className="h2">
          {state.currentBooking.title} ~ {props.bookingWith}
        </h2>
        <ul className="ul">
          <li className="li">
            <Link to="#"> {state.currentBooking.description} </Link>
          </li>
          <li className="li">
            <Link to="#"> {state.currentBooking.location}</Link>
          </li>
          <li className="li">
            <Link to="#"> {state.currentBooking.date}</Link>
          </li>
          <li className="li">
            <TimePicker
              start="10:00"
              end="21:00"
              step={30}
              value={state.currentBooking.time}
            />
          </li>
        </ul>
        {state.actionRequired ? (
          <div className="pendingOptions">
            <button
              type="button"
              className="btn btn-outline-success optBtn"
              style={{ borderColor: "#62c462" }}
              onClick={acceptedEvent}
            >
              Accept
            </button>
            <button
              type="button"
              className="btn btn-outline-warning optBtn"
              style={{ borderColor: "#f89406" }}
              onClick={editedEvent}
            >
              Suggest Reschedule
            </button>
            <button
              type="button"
              className="btn btn-outline-danger optBtn"
              style={{ borderColor: "#ee5f5b" }}
              onClick={rejectedEvent}
            >
              Reject
            </button>
          </div>
        ) : (
          <div className="pendingOptions">
            <h3>Waiting for their response</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default PendingEvent;
