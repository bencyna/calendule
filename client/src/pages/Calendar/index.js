import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./style.css";
import { useHistory } from "react-router-dom";
import { useStoreContext } from "../../utils/GlobalState";
import API from "../../utils/API";
import {Link } from 'react-router-dom';
import ScheduleList from "../../components/ScheduleList";

function Calendar() {
  const [state, dispatch] = useStoreContext();
  const history = useHistory();
  const [all_events, setAllEvents] = useState({});
  const [detailedEvents, setDetailedEvents] = useState([])
  const [show_popup, setShowPopup] = useState("")
  const [slectedDay, setSelectedDay] = useState("")
  const [noEvents, setNoEvents] = useState(false);


  useEffect(() => {
      updateBookings();
  }, []);

  const updateBookings = () => {
    API.getAllBookings(state.user_id).then((res) => {
      // limit this to most upcoming 10 or something, then have see more option
      setDetailedEvents(res.data);
      const events =  res.data.map((event) => {
        // event
        return {title: event.title, date: event.date, id: event.id}
      })
      console.log(events)
      setAllEvents(events);
  });
  }

  const handleDateClick = (arg) => {
    // Take you to events on this dat 
    // history.push(`/date/${arg.dateStr}`);
    const formattedDay = arg.dateStr.replace("/", "-");
    console.log(formattedDay)
    setSelectedDay(formattedDay);
    API.getBookings(arg.dateStr, state.user_id).then((res) => {
      if (res.data.length > 0) {
        setNoEvents(true);
      }
      setDetailedEvents(res.data);
    });
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
    const arg = {"dateStr": info.event.startStr}
    handleDateClick(arg);
    }


  return (
    <div>
      <h1 className="title">
        Your Calendar
      </h1>
      <div className="mainContainer">
        <div className="calendarWidthController">
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
          {/* <button className="deleteBtn btn btn-primary" onClick={handleDeleteAcc}>
            Delete account
          </button> */}
          </div>
          <ScheduleList bookings = {detailedEvents} noEvents={noEvents} selectedDay={slectedDay} setSelectedDay={setSelectedDay} updateBookings={updateBookings} handleDateClick={handleDateClick} events={all_events} setAllEvents={setAllEvents}/>
        </div>
    </div>
  );
}

export default Calendar;
