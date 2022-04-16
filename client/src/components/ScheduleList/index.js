import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import "./style.css";
import { useStoreContext } from "../../utils/GlobalState";
import EventSpring from "../Event/EventSpring";

function ScheduleList(props) {
  const [state, dispatch] = useStoreContext();
  const [bookingWith, setBookingWith] = useState();
  const [noEvents, setNoEvents] = useState(false);
  const [show, toggleOverlay] = useState("");
  
  const clickEvent = (event) => {
    const eventId = event.target.id;
    const getEvent = props.bookings.filter((event) => event.id == eventId);
    dispatch({
      type: "CURRENTBOOKING",
      currentBooking: getEvent[0],
    });
    // setCurrentBooking(getEvent);

    if (state.user_id === getEvent[0].receivedByUser.id) {
      setBookingWith(
        getEvent[0].createdByUser.first_name +
          " " +
          getEvent[0].createdByUser.last_name
      );
    }
    if (state.user_id === getEvent[0].createdByUser.id) {
      setBookingWith(
        getEvent[0].receivedByUser.first_name +
          " " +
          getEvent[0].receivedByUser.last_name
      );
    }
    toggleOverlay("show")
  };

  return (
    <div className="scheduleList">
      <ul className="listNoDots">
        {props.bookings.map((booking) => {
          return <li className="taskListItem" key={booking.id} id={booking.id} onClick={clickEvent}>{booking.title}</li>;
        })}
      </ul>
      <EventSpring show={show} toggleOverlay={toggleOverlay}/>
    </div>
  );
}

export default ScheduleList;
