import React, { useState, useEffect, useRef } from "react";
import API from "../../utils/API";
import "./style.css";
import { useStoreContext } from "../../utils/GlobalState";
import EventSpring from "../Event/EventSpring";

function ScheduleList(props) {
  const eventInputRef = useRef(null);
  const [state, dispatch] = useStoreContext();
  const [bookingWith, setBookingWith] = useState();
  const [show, toggleOverlay] = useState("");
  const [showAddBtn, toggleBtn] = useState("");
  const [error, setError] = useState(false);

  const [eventInput, setEventInput] = useState({
    duration: "",
    startTime: "",
    endTime: "",
    date: "",
    time: 0,
    title: "",
  });

  useEffect(()=>{
    eventInputRef.current.focus();
  }, []);
  
  const clickEvent = (event) => {
  const eventId = event.target.id;
    const getEvent = props.bookings.filter((event) => event.id == eventId);
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
    toggleOverlay("show")
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEventInput({ ...eventInput, [name]: value });
    console.log(eventInput.title.length);

      if (name == "title" && value.length > 0) {
        toggleBtn("show")
        }
        else {
          toggleBtn("")
      }
    };

  const handleEventSubmit = (e) => {
    e.preventDefault();
    setError(false);
    if (
      (eventInput.title && props.selectedDay)
    ) {
      dispatch({
        type: "modalClick",
      });
      // api call then setEventinpiut to ()
      API.createEvent({
        title: eventInput.title,
        description: eventInput.description,
        time: eventInput.time,
        date: props.selectedDay,
        location: eventInput.location,
        booker_id: state.user_id,
        bookee_id: state.user_id,
        accepted: true,
        bookerPending: false,
      })
        .then((res) => {
          props.updateBookings();
        })
        .catch((err) => {
          console.log(err)
          alert("Uh oh! Something went wrong");
          setError(true);
        });
    } else {
      setError(true);
    }
  };


  return (
    <div className="scheduleList"> 
      <div className="scheduleHeader"> 
        <input placeholder="Add to your calendar..." ref={eventInputRef} name="title" onChange={handleInputChange} className="addEventTitle"></input>
        <div className="headerExtras">
          <input type="date" onChange={(e) => props.setSelectedDay(e.target.value)} className="inline-block eventDateTitle" value={props.selectedDay}></input>
          <button type="button" onClick={handleEventSubmit} className={`${showAddBtn} inline-block addBtn`}>
            Add
          </button>
        </div>
      </div>
      <ul className="listNoDots">
        {/* title here that says all events or date */}
        {props.bookings.map((booking) => {
          return <li className="taskListItem" key={booking.id} id={booking.id} onClick={clickEvent}>{booking.title}</li>;
        })}
      </ul>
      <EventSpring show={show} toggleOverlay={toggleOverlay} bookingWith={bookingWith}/>
    </div>
  );
}

export default ScheduleList;
