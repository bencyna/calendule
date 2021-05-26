import React from "react";
import FeatherIcon from "feather-icons-react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import { useStoreContext } from "../../utils/GlobalState";
import UpdateEvent from "../UpdateEvent";
import TimePicker from "react-bootstrap-time-picker";

function Event(props) {
  const [state, dispatch] = useStoreContext();

  const deleteEvent = () => {
    if (window.confirm("Cancel this Event?")) {
      console.log(state.currentBooking + " Delete event");
      API.deletePost(state.currentBooking.id)
        .then((res) => {
          console.log("Ben changhe this to re mount the other component maybe");
          props.setNoEvents(false);
          dispatch({
            type: "CLICKEDEVENT",
            clickedEvent: false,
          });
        })
        .catch((err) => console.log(err));
    }
  };

  const updateEvent = () => {
    dispatch({
      type: "modalClick",
      date: state.currentBooking.date,
    });
  };

  return (
    <div className="clickedEvent col-md-6">
      <div className="listCOntainer">
        <div className="updatePosts">
          <FeatherIcon
            icon="edit"
            className="updatePost"
            onClick={updateEvent}
          />
          <FeatherIcon
            icon="trash-2"
            className="updatePost"
            onClick={deleteEvent}
          />
        </div>
        <h2 className="h2 title">
          {" "}
          {state.currentBooking.title} ~ {props.bookingWith}
        </h2>
        <ul className="ul">
          <li className="li">
            <FeatherIcon icon="info" className="detailsIcon" />
            <Link to="#"> {state.currentBooking.description}</Link>
          </li>
          <li className="li">
            <FeatherIcon icon="map-pin" className="detailsIcon" />{" "}
            <Link to="#"> {state.currentBooking.location}</Link>
          </li>
          <li className="li">
            <FeatherIcon icon="calendar" className="detailsIcon" />{" "}
            <Link to="#"> {state.currentBooking.date}</Link>
          </li>
          <li className="li">
            <FeatherIcon icon="clock" className="detailsIcon" />{" "}
            <TimePicker
              start="10:00"
              end="21:00"
              step={30}
              value={state.currentBooking.time}
              className="time"
            />
          </li>
        </ul>
      </div>
      {state.modal ? (
        <UpdateEvent setNoEvents={props.setNoEvents} />
      ) : (
        <div className="hide"></div>
      )}
    </div>
  );
}

export default Event;
