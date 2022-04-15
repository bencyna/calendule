import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import "./style.css";
import { useStoreContext } from "../../utils/GlobalState";

function ScheduleList() {
  const [state, dispatch] = useStoreContext();
  const [bookings, setBookings] = useState([]);
  const [noEvents, setNoEvents] = useState(false);

  useEffect(() => {
    API.getAllBookings(state.user_id).then((res) => {
      if (res.data.length > 0) {
        setNoEvents(true);
      }
      console.log(res.data);
      setBookings(res.data);
    });
  }, [noEvents]);

  return (
    <div className="scheduleList">
      <ul className="listNoDots">
        {bookings.map((booking) => {
          return <li className="taskListItem">{booking.title}</li>;
        })}
      </ul>
    </div>
  );
}

export default ScheduleList;
