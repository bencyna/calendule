import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import { useParams, Link } from "react-router-dom";
import "./style.css";

function Day() {
  const [getBookings, setBookings] = useState([""]);
  const [noEvents, setNoEvents] = useState(false);
  const [clickedEvent, setClickedEvent] = useState(false);
  const [currentBooking, setCurrentBooking] = useState({});

  const { id } = useParams();

  useEffect(() => {
    API.getBookings(id).then((res) => {
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
                          <a
                            href="#"
                            scope="row"
                            onClick={clickEvent}
                            id={booked.id}
                          >
                            {booked.title}
                          </a>
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
                      <a href="#"> {currentBooking[0].description}</a>
                    </li>
                    <li className="li">
                      <a href="#"> {currentBooking[0].location}</a>
                    </li>
                    <li className="li">
                      <a href="#"> {currentBooking[0].start_time}</a>
                    </li>
                    <li className="li">
                      <a href="#"> {currentBooking[0].date}</a>
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

{
  /* <table className="table table-hover">
<thead>
  <tr>
    <th scope="col">Title (click me to see details)</th>
    <th scope="col">description</th>
    <th scope="col">location</th>
    <th scope="col">date</th>
    <th scope="col">time</th>
  </tr>
</thead>
<tbody>
  {getBookings.map((booked) => {
    return (
      <tr className="table-info" key={booked.id}>
        <td>
          {" "}
          <Link to={`/date/booking/${booked.id}`}>
            <th scope="row">{booked.title}</th>
          </Link>
        </td>
        <td>{booked.description}</td>
        <td>{booked.location}</td>
        <td>{booked.date}</td>
        <td>Time</td>
      </tr>
    );
  })}
</tbody>
</table> */
}
