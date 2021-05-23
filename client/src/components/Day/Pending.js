import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import { useStoreContext } from "../../utils/GlobalState";
import { Link } from "react-router-dom";
import PendingEvent from "../Event/PendingEvent";
import "./style.css";

function Pending() {
  const [state, dispatch] = useStoreContext();
  const [bookingWith, setBookingWith] = useState();

  useEffect(() => {
    console.log(state.allPendingEvents);
    API.getAllPending()
      .then((res) => {
        console.log(res);
        if (res.data.length === 0) {
          return;
        }
        dispatch({
          type: "ALLPENDINGEVENTS",
          allPendingEvents: res.data,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const EventSelected = async (event) => {
    const eventId = event.target.id;
    const selectedEvent = state.allPendingEvents.filter(
      (event) => event.id === eventId
    );
    await dispatch({
      type: "CURRENTBOOKING",
      currentBooking: selectedEvent[0],
    });

    if (
      selectedEvent[0].bookee_id === state.user_id &&
      selectedEvent[0].bookerPending
    ) {
      // im owner but not my turn
      console.log("I am bookee but it is their turn");
      await dispatch({
        type: "ACTIONREQUIRED",
        actionRequired: false,
      });
      setBookingWith(
        selectedEvent[0].createdByUser.first_name +
          " " +
          selectedEvent[0].createdByUser.last_name
      );
    } else if (
      selectedEvent[0].bookee_id === state.user_id &&
      !selectedEvent[0].bookerPending
    ) {
      // im owner and my turn
      console.log("I am bookee and it is my turn");
      await dispatch({
        type: "ACTIONREQUIRED",
        actionRequired: true,
      });
      setBookingWith(
        selectedEvent[0].createdByUser.first_name +
          " " +
          selectedEvent[0].createdByUser.last_name
      );
    } else if (
      selectedEvent[0].booker_id === state.user_id &&
      selectedEvent[0].bookerPending
    ) {
      // i booked but it is my turn
      console.log("I am booker but it is my turn");
      await dispatch({
        type: "ACTIONREQUIRED",
        actionRequired: true,
      });
      setBookingWith(
        selectedEvent[0].receivedByUser.first_name +
          " " +
          selectedEvent[0].receivedByUser.last_name
      );
    } else if (
      selectedEvent[0].booker_id === state.user_id &&
      !selectedEvent[0].bookerPending
    ) {
      // I booked and it is not my turn
      console.log("I am booker but it is their turn");
      await dispatch({
        type: "ACTIONREQUIRED",
        actionRequired: false,
      });
      setBookingWith(
        selectedEvent[0].receivedByUser.first_name +
          " " +
          selectedEvent[0].receivedByUser.last_name
      );
    }

    dispatch({
      type: "CLICKEDEVENT",
      clickedEvent: true,
    });
  };

  const pendingNoAction = state.allPendingEvents.filter(
    (pendingEvnt) => !state.pendingEvents.includes(pendingEvnt.id)
  );

  const log = () => {
    console.log(state.pendingEvents);
    console.log(pendingNoAction);
  };

  return (
    <div onClick={log}>
      <div className="container">
        <div>
          <Link to="/" className="backBtnW">
            Click me to go home
          </Link>
        </div>
        <div className="row">
          <div className="col-md-5">
            <div className="eventList">
              <div className="listContainer">
                <h2 className="h2">Pending Events</h2>
                <ul className="ul">
                  {state.pendingEvents.map((event) => {
                    return (
                      <li className="li events eventTitle" key={event.id}>
                        <Link
                          to="#"
                          scope="row"
                          id={event.id}
                          onClick={EventSelected}
                          key={event.id + "link"}
                        >
                          {event.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                <h2 className="h2">Waiting Events</h2>
                <ul className="ul">
                  {state.allPendingEvents.map((event) => {
                    return (
                      <li className="li events eventTitle" key={event.id}>
                        <Link
                          to="#"
                          scope="row"
                          id={event.id}
                          onClick={EventSelected}
                          key={event.id + "link"}
                        >
                          {event.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
          {state.clickedEvent ? (
            <PendingEvent bookingWith={bookingWith} />
          ) : (
            <div className="noEventClicked col-md-7">
              Click an event to view it!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Pending;
