import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./style.css";
import Day from "../Day";
import { useStoreContext } from "../../utils/GlobalState";
import { useHistory } from "react-router-dom";

function Calendar() {
  const [state, dispatch] = useStoreContext();
  const history = useHistory();

  const handleDateClick = (arg) => {
    dispatch({
      type: "DATECLICKED",
      // type: "",
    });
    history.push(`/date/${arg.dateStr}`);
  };
  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
      />
    </div>
  );
}

export default Calendar;
