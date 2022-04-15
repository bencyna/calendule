import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import "./style.css";
import { useStoreContext } from "../../utils/GlobalState";
import EventSpring from "../Event/EventSpring";

function ScheduleList() {
  const [state, dispatch] = useStoreContext();
  const [bookings, setBookings] = useState([]);
  const [bookingWith, setBookingWith] = useState();
  const [noEvents, setNoEvents] = useState(false);
  const [show, toggleOverlay] = useState("show");

  useEffect(() => {
    API.getAllBookings(state.user_id).then((res) => {
      if (res.data.length > 0) {
        setNoEvents(true);
      }
      console.log(res.data);
      setBookings(res.data);
    });
  }, [noEvents]);

  
  const clickEvent = (event) => {
    const eventId = event.target.id;
    const getEvent = bookings.filter((event) => event.id == eventId);
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
        {bookings.map((booking) => {
          return <li className="taskListItem" id={booking.id} onClick={clickEvent}>{booking.title}</li>;
        })}
      </ul>
      <EventSpring show={show} toggleOverlay={toggleOverlay}/>
    </div>
  );
}

export default ScheduleList;
