import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./style.css";
import { useHistory } from "react-router-dom";
import { useStoreContext } from "../../utils/GlobalState";
import API from "../../utils/API";

function Calendar() {
  const [state, dispatch] = useStoreContext();
  const history = useHistory();
  const [all_events, setAllEvents] = useState({});


  useEffect(() => {
      API.getAllBookings(state.user_id).then((res) => {
        const events =  res.data.map((event) => {
          // event
          return {title: event.title, date: event.date}
        })
        setAllEvents(events);

    });
  }, []);

  const handleDateClick = (arg) => {
    history.push(`/date/${arg.dateStr}`);
  };

  const handleDeleteAcc = () => {
    if (window.confirm("Delete your account? This acction cannot be undone")) {
      API.deleteAcc(state.user_id).then((res) => {
        history.push("/login");
      });
    }
  };



  return (
    <div>
      <h1 className="title" onClick={console.log(all_events)}>
        Welcome to your personalised calendar, click a day to see your events
      </h1>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
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
