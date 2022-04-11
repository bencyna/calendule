import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./style.css";
import { useHistory } from "react-router-dom";
import { useStoreContext } from "../../utils/GlobalState";
import API from "../../utils/API";
import {Link } from 'react-router-dom'

function Calendar() {
  const [state, dispatch] = useStoreContext();
  const history = useHistory();
  const [all_events, setAllEvents] = useState({});
  const [detailedEvents, setDetailedEvents] = useState([])
  const [show_popup, setShowPopup] = useState("")


  useEffect(() => {
      API.getAllBookings(state.user_id).then((res) => {
        setDetailedEvents(res.data);
        const events =  res.data.map((event) => {
          // event
          return {title: event.title, date: event.date, id: event.id}
        })
        setAllEvents(events);
        
    });
  }, []);

  const handleDateClick = (arg) => {
    // Take you to events on this dat 
    history.push(`/date/${arg.dateStr}`);
  };

  const handleDeleteAcc = () => {
    if (window.confirm("Delete your account? This acction cannot be undone")) {
      API.deleteAcc(state.user_id).then((res) => {
        history.push("/login");
      });
    }
  };

  const eventHover = (info) => {

    // add the hover css to the title, on click of event, go straight to specific event
    // console.log(info);
  }

  const eventClick = (info) => {
    const getEvent = detailedEvents.filter((event) => event.id === info.event.id)
    dispatch({
      type: "CURRENTBOOKING",
      currentBooking: getEvent[0],
    });


    // if (state.user_id === getEvent[0].receivedByUser.id) {
    //   setBookingWith(
    //     getEvent[0].createdByUser.first_name +
    //       " " +
    //       getEvent[0].createdByUser.last_name
    //   );
    // }
    // if (state.user_id === getEvent[0].createdByUser.id) {
    //   setBookingWith(
    //     getEvent[0].receivedByUser.first_name +
    //       " " +
    //       getEvent[0].receivedByUser.last_name
    //   );
    // }
    dispatch({
      type: "CLICKEDEVENT",
      clickedEvent: true,
    });
    dispatch({
      type: "PREVENTCLOSE",
    });
    console.log(state.eventClick)
    history.push(`/date/${info.event.startStr}`);
    }


  return (
    <div>
      <h1 className="title">
        Your Calendar
      </h1>

      <div class={`dropdown-menu ${show_popup}`} data-popper-placement="bottom-start">
          <h3 class="dropdown-header">Actions</h3>
          <div class="dropdown-divider"></div>
          <Link class="dropdown-item" to="#">Create an event</Link>
          <Link class="dropdown-item" to="#">View today</Link>
      </div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        eventMouseEnter = {eventHover}
        eventClick = {eventClick}
        events={
          all_events
        }
      />
      <button className="deleteBtn btn btn-primary" onClick={handleDeleteAcc}>
        Delete account
      </button>
    </div>
  );
}

export default Calendar;
