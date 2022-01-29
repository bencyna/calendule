import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import { useParams, Link } from "react-router-dom";
import "./style.css";
import { useStoreContext } from "../../utils/GlobalState";
import Event from "../Event";
import EventInput from "../eventInput";
import Moment from 'moment';

function Day() {
  const [getBookings, setBookings] = useState([""]);
  const [noEvents, setNoEvents] = useState(false);
  const [bookingWith, setBookingWith] = useState();
  const [ownEvent, setOwnEvent] = useState();

  const { id } = useParams();
  const [state, dispatch] = useStoreContext();

  useEffect(() => {
    dispatch({
      type: "CLICKEDEVENT",
      clickedEvent: false,
    });
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
    }
    dispatch({
      type: "CLICKEDEVENT",
      clickedEvent: true,
    });
  };

  const addOwnPost = () => {
    dispatch({
      type: "CLICKEDEVENT",
      clickedEvent: false,
    });
    dispatch({
      type: "modalClick",
      date: id,
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
            <div className="col-md-5">
              <div>
                <button
                  type="button"
                  className="btn addBtn btn-light"
                  style={{ marginTop: "7%" }}
                  onClick={addOwnPost}
                >
                  + Add Event for Today
                </button>
              </div>
              <div className="eventList">
                <div className="listContainer">
                  <h2 className="h2 title"> Today's Events</h2>
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
                              {booked.title}
                            </Link>
                          ) : (
                            <Link
                              to="#"
                              scope="row"
                              onClick={clickEvent}
                              id={booked.id}
                              style={{ color: "blue" }}
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
            {Moment(id).format('dddd DD/MM/YY')}
            <div>
              <Link to="/" className="backBtn">
                Click me to go back
              </Link>
            </div>
          </h1>
          <div>
            <button
              type="button"
              className="btn btn-light"
              onClick={addOwnPost}
            >
              + Add Event for Today
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Day;
