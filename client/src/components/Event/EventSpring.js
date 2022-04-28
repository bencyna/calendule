import React, { useState } from 'react';
import "./style.css"
import FeatherIcon from "feather-icons-react";
import {Minimize2, 
    Edit, 
    Trash2,
    Info,
    Map,
    Calendar,
    Clock,
}  from 'react-feather';

import { Link } from "react-router-dom";
import API from "../../utils/API";
import { useStoreContext } from "../../utils/GlobalState";
import UpdateEvent from "../UpdateEvent";
import TimePicker from "react-bootstrap-time-picker";

export default function EventSpring(props) {
  const [state, dispatch] = useStoreContext();
  const [showUpdateBtn, toggleUpdateBtn] = useState("");

  // when items change, update the state
  const editTask = (e) => {
    const { name, value } = e.target;
    dispatch({
          type: "CURRENTBOOKING",
          currentBooking: {
              ...state.currentBooking, [name]: value
          }
      })
      toggleUpdateBtn("show")
      // show the save edits button and also the reset btn
  }

  const deleteEvent = () => {
      console.log(state.currentBooking.id)
    if (window.confirm("Cancel this Event?")) {
      API.deletePost(state.currentBooking.id)
        .then((res) => {
          props.updateBookings()
          hideOverlay()
          props.setNoEvents(false);
          dispatch({
            type: "CLICKEDEVENT",
            clickedEvent: false,
          });
        })
        .catch((err) => console.log(err));
    }
  };

 const hideOverlay = () => {
    props.toggleOverlay("");
 }

  const updateEvent = () => {
    dispatch({
      type: "modalClick",
      date: state.currentBooking.date,
    });
  };

  return (
    <div className={`overlay ${props.show}`}>
    <div className="eventTitle">
        <textarea className="inline-block eventHead" draggable="false" contenteditable="true" value ={state.currentBooking.title}></textarea>
        <Minimize2 className="inline-block minimise" onClick={hideOverlay}/>

    </div>
    <div className="listCOntainer">
        <div className="updatePosts">
            {/* <Edit className="updatePost"onClick={updateEvent}/> */}

          <Trash2
            className="updatePost"
            onClick={deleteEvent}
          />
        </div>
        <ul className="ul">
          <li className="li">
            <Info className="detailsIcon" />
            <input className="eventDetailItem" name="description" onChange={editTask} value={state.currentBooking.description} placeholder="Add your description here..."></input>
          </li>
          <li className="li">
            <Map className="detailsIcon" />{" "}
            <input className="eventDetailItem" name="location" onChange={editTask} value={state.currentBooking.location} placeholder="remind yourself of where this is..."></input>
          </li>
          <li className="li">
            <Calendar className="detailsIcon" />{" "}
            <input type="date" className="eventDetailItem" name="date" onChange={editTask} value={state.currentBooking.date}></input>
          </li>
          <li className="li">
            <Clock className="detailsIcon" />{" "}
            <input type="time" className="eventDetailItem" name="time" onChange={editTask} value={state.currentBooking.time}></input>
          </li>
        </ul>
      </div>
      <div className="editBtns">
      <button type="button" onClick={updateEvent} className={`${showUpdateBtn} resetBtn`}>
        reset changes
      </button>
      <button type="button" onClick={updateEvent} className={`${showUpdateBtn} updateBtn`}>
        Edit
      </button>
      </div>
    </div>
  )
}
