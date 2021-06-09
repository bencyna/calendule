import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./style.css";
import Day from "../../components/Day";
import { useHistory } from "react-router-dom";

function Calendar() {
  const history = useHistory();

  const handleDateClick = (arg) => {
    history.push(`/date/${arg.dateStr}`);
  };
  return (
    <div>
      <h1 className="title">
        Welcome to your personalised calendar, click a day to see your events
      </h1>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
      />
    </div>
  );
}

export default Calendar;
