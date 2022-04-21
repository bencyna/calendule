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

//   const deleteEvent = () => {
//     if (window.confirm("Cancel this Event?")) {
//       API.deletePost(state.currentBooking.id)
//         .then((res) => {
//           console.log("Ben changhe this to re mount the other component maybe");
//           props.setNoEvents(false);
//           dispatch({
//             type: "CLICKEDEVENT",
//             clickedEvent: false,
//           });
//         })
//         .catch((err) => console.log(err));
//     }
//   };

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
        <h6 className="inline-block eventHead">{state.currentBooking.title}</h6>
        <Minimize2 className="inline-block minimise" onClick={hideOverlay}/>

    </div>
    <div className="listCOntainer">
        <div className="updatePosts">
            <Edit className="updatePost"onClick={updateEvent}/>

          <Trash2
            className="updatePost"
            // onClick={deleteEvent}
          />
        </div>
        <ul className="ul">
          <li className="li">
            <Info className="detailsIcon" />
            <input className="eventDetailItem" value={state.currentBooking.description} placeholder="Add your description here..."></input>
          </li>
          <li className="li">
            <Map className="detailsIcon" />{" "}
            <input className="eventDetailItem" value={state.currentBooking.location} placeholder="remind yourself of where this is..."></input>
          </li>
          <li className="li">
            <Calendar className="detailsIcon" />{" "}
            <input type="date" className="eventDetailItem" value = {state.currentBooking.date}></input>
          </li>
          <li className="li">
            <Clock className="detailsIcon" />{" "}
            <input type="time" className="eventDetailItem" value={state.currentBooking.time}></input>
          </li>
        </ul>
      </div>
    </div>
  )
}
