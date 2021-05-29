import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { useStoreContext } from "../../utils/GlobalState";
import Event from "../Event";
import EventInput from "../eventInput";

function AllEvents() {
  const [getBookings, setBookings] = useState([""]);
  const [noEvents, setNoEvents] = useState(false);
  const [bookingWith, setBookingWith] = useState();

  const [state, dispatch] = useStoreContext();

  useEffect(() => {
    // This will be get all bookings
    API.getBookings(state.user_id).then((res) => {
      if (res.data.length > 0) {
        setNoEvents(true);
      }
      setBookings(res.data);
      console.log(res.data);
    });
  }, []);

  const clickEvent = (event) => {
    const eventId = event.target.id;
    const getEvent = getBookings.filter((event) => event.id == eventId);
    dispatch({
      type: "CURRENTBOOKING",
      currentBooking: getEvent[0],
    });
    // setCurrentBooking(getEvent);
    console.log("created by user id: " + getEvent[0].createdByUser.id);
    console.log("received by user id: " + getEvent[0].receivedByUser.id);

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
    } else console.log("Booking with: " + bookingWith);

    dispatch({
      type: "CLICKEDEVENT",
      clickedEvent: true,
    });
  };

  return (
    <div>
      {state.modal ? (
        <EventInput ownPost={true} setNoEvents={setNoEvents} />
      ) : (
        <div className="hide"></div>
      )}
      {noEvents ? (
        <div className="container">
          <div>
            <Link to="/" className="backBtnW">
              Click me to go back
            </Link>
          </div>
          <div className="row">
            <div className="col-md-5" style={{ marginTop: "6%" }}>
              <div className="eventList" style={{ height: "auto" }}>
                <div className="listContainer">
                  <h2 className="h2 title"> Your Events</h2>
                  <ul className="ul">
                    {getBookings.map((booked) => {
                      return (
                        <li className="li events eventTitle" key={booked.id}>
                          {booked.booker_id === state.user_id ? (
                            <Link
                              to="#"
                              scope="row"
                              onClick={clickEvent}
                              id={booked.id}
                              style={{ color: "red" }}
                            >
                              {booked.title} ~ {booked.date}
                            </Link>
                          ) : (
                            <Link
                              to="#"
                              scope="row"
                              onClick={clickEvent}
                              id={booked.id}
                              style={{ color: "blue" }}
                            >
                              {booked.title} ~ {booked.date}
                            </Link>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
            {state.clickedEvent ? (
              <Event bookingWith={bookingWith} setNoEvents={setNoEvents} />
            ) : (
              <div className="noEventClicked col-md-7">
                Click an event to view it!
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="centre">
          <h1>
            You have No Events booked, You can add events on your own or on
            other's calendar!{" "}
            <div>
              <Link to="/" className="backBtn">
                Click me to go home
              </Link>
            </div>
          </h1>
          <div></div>
        </div>
      )}
    </div>
  );
}

export default AllEvents;
