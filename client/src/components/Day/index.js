import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import { useParams, Link } from "react-router-dom";
import "./style.css";
import { useStoreContext } from "../../utils/GlobalState";
import Event from "../Event";

function Day() {
  const [getBookings, setBookings] = useState([""]);
  const [noEvents, setNoEvents] = useState(false);
  const [bookingWith, setBookingWith] = useState();

  const { id } = useParams();
  const [state, dispatch] = useStoreContext();

  useEffect(() => {
    API.getBookings(id, state.user_id).then((res) => {
      if (res.data.length > 0) {
        setNoEvents(true);
      }
      setBookings(res.data);
    });
  }, [noEvents]);

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
      {noEvents ? (
        <div className="container">
          <div>
            <Link to="/" className="backBtnW">
              Click me to go back
            </Link>
          </div>
          <div className="row">
            <div className="col-md-5">
              <div className="eventList">
                <div className="listContainer">
                  <h2 className="h2 title"> Today's Events</h2>
                  <ul className="ul">
                    {" "}
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
                              key={booked.id + "link"}
                            >
                              {booked.title}
                            </Link>
                          ) : (
                            <Link
                              to="#"
                              scope="row"
                              onClick={clickEvent}
                              id={booked.id}
                              style={{ color: "blue" }}
                              key={booked.id + "link"}
                            >
                              {booked.title}
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
            You have nothing but time today!{" "}
            <div>
              <Link to="/" className="backBtn">
                Click me to go back
              </Link>
            </div>
          </h1>
        </div>
      )}
    </div>
  );
}

export default Day;
