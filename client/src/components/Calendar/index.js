import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./style.css";
import Day from "../Day";

function Calendar() {
  const [date, setDate] = useState();
  const [dateClicked, setDateClicked] = useState(false);

  const handleDateClick = (arg) => {
    setDate(arg.dateStr);
    setDateClicked(true);
  };
  return (
    <div>
      {!dateClicked ? (
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          dateClick={handleDateClick}
        />
      ) : (
        <Day props={(date, dateClicked, "Hi")} />
      )}
    </div>
  );
}

export default Calendar;
