import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import API from "../../utils/API";
import { useParams, Link } from "react-router-dom";
import EventInput from "../eventInput";
import { useStoreContext } from "../../utils/GlobalState";

function AltUserCalendar() {
  const { id } = useParams();

  const [state, dispatch] = useStoreContext();
  const [user, setUser] = useState({});

  const [dateClicked, setDateClicked] = useState("");

  useEffect(() => {
    API.getUser(id).then((res) => {
      console.log(res.data);
      setUser(res.data);
    });
    console.log(state.logged_in + state.user_id);
  }, []);

  const handleDateClick = async (arg) => {
    console.log(arg.dateStr);
    await setDateClicked(arg.dateStr);
    dispatch({
      type: "modalClick",
      date: arg.dateStr,
    });
  };

  return (
    <div>
      <h1>
        Welcome to {user.first_name}'s Calendar! Cick a day to add en event!
      </h1>
      {state.eventAdded ? (
        <div className="successMessage">
          <div className="alert alert-dismissible alert-success">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              onClick={dispatch({ type: "eventSubmitDone" })}
            ></button>
            <strong>Nice!</strong> You successfully added an event to{" "}
            {user.first_name}'s Calendar,{" "}
            <Link to="/myevents" className="alert-link">
              Click me to see your events!
            </Link>{" "}
          </div>
        </div>
      ) : (
        <div></div>
      )}

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
