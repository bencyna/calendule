import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import { useParams, Link } from "react-router-dom";

function Day() {
  const [currentBooking, setCurrentBooking] = useState([""]);
  const [noEvents, setNoEvents] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    API.getBookings(id).then((res) => {
      if (res.data.length > 0) {
        setNoEvents(true);
      }
      setCurrentBooking(res.data);
      console.log(res.data);
    });
  }, [noEvents]);

  // const clickTitle = () => {
  //   dispatch({
  //     type: "DATECLICKED",
  //     // type: "",
  //   });
  // };

  return (
    <div>
      {noEvents ? (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Title (click me to see details)</th>
              <th scope="col">description</th>
              <th scope="col">date</th>
              <th scope="col">time</th>
            </tr>
          </thead>
          <tbody>
            {currentBooking.map((booked) => {
              return (
                <tr className="table-info" key={booked.id}>
                  <td>
                    {" "}
                    <Link to={`./date/booking/${booked.id}`}>
                      <th scope="row">{booked.title}</th>
                    </Link>
                  </td>
                  <td>{booked.description}</td>
                  <td>{booked.date}</td>
                  <td>Time</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <h1>You have nothing but time today!</h1>
      )}
    </div>
  );
}

export default Day;
