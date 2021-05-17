import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import { useParams, Link } from "react-router-dom";
import "./style.css";
import { useStoreContext } from "../../utils/GlobalState";

function Day() {
  const [getBookings, setBookings] = useState([""]);
  const [noEvents, setNoEvents] = useState(false);
  const [clickedEvent, setClickedEvent] = useState(false);
  const [currentBooking, setCurrentBooking] = useState({});

  const { id } = useParams();
  const [state, dispatch] = useStoreContext();

  useEffect(() => {
    API.getBookings(id, state.user_id).then((res) => {
      if (res.data.length > 0) {
        setNoEvents(true);
      }
      setBookings(res.data);
      console.log(res.data);
    });
  }, [noEvents]);

  // const clickTitle = () => {
  //   dispatch({
  //     type: "DATECLICKED",
  //     // type: "",
  //   });
  // };
  const clickEvent = (event) => {
    const eventId = event.target.id;
    const getEvent = getBookings.filter((event) => event.id == eventId);
    console.log(getEvent);
    setCurrentBooking(getEvent);
    console.log(currentBooking);
    setClickedEvent(true);
  };

  return (
    <div>
      {noEvents ? (
        <div className="container">
          <div className="row">
            <div className="col-md-5">
              <div className="eventList">
                <div className="listContainer">
                  <h2 className="h2"> Today's Events</h2>
                  <ul className="ul">
                    {" "}
                    {getBookings.map((booked) => {
                      return (
                        <li className="li events eventTitle" key={booked.id}>
                          <Link
                            to="#"
                            scope="row"
                            onClick={clickEvent}
                            id={booked.id}
                          >
                            {booked.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
            {clickedEvent ? (
              <div className="clickedEvent col-md-6">
                <div className="listCOntainer">
                  <h2 className="h2"> {currentBooking[0].title}</h2>
                  <ul className="ul">
                    <li className="li">
                      <Link to="#"> {currentBooking[0].description}</Link>
                    </li>
                    <li className="li">
                      <Link to="#"> {currentBooking[0].location}</Link>
                    </li>
                    <li className="li">
                      <Link to="#"> {currentBooking[0].start_time}</Link>
                    </li>
                    <li className="li">
                      <Link to="#"> {currentBooking[0].date}</Link>
                    </li>
                    <li className="li"></li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="noEventClicked col-md-7">
                Click an event to view it!
              </div>
            )}
          </div>
        </div>
      ) : (
        <h1>You have nothing but time today!</h1>
      )}
    </div>
  );
}

export default Day;
