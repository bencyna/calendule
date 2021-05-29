import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import API from "../../utils/API";
import { useParams, Link } from "react-router-dom";
import EventInput from "../eventInput";
import { useStoreContext } from "../../utils/GlobalState";
import Success from "../SuccessMsg";
import "./style.css";

function AltUserCalendar() {
  const { id } = useParams();

  const [state, dispatch] = useStoreContext();
  const [user, setUser] = useState({});

  const [dateClicked, setDateClicked] = useState("");

  useEffect(() => {
    API.getUser(id).then((res) => {
      setUser(res.data);
    });
  }, []);

  const handleDateClick = async (arg) => {
    await setDateClicked(arg.dateStr);
    dispatch({
      type: "modalClick",
      date: arg.dateStr,
    });
  };

  return (
    <div>
      <h1 className="altTitle">
        Welcome to {user.first_name}'s Calendar! Cick a day to add an event!
      </h1>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
      />
      {state.modal ? <EventInput /> : <div className="hide"></div>}
    </div>
  );
}

export default AltUserCalendar;
