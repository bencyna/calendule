import React, { useState } from "react";
import FeatherIcon from "feather-icons-react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import { useStoreContext } from "../../utils/GlobalState";
import UpdateEvent from "../UpdateEvent";

function Event(props) {
  const [deleteAnEvent, setDeleteAnEvent] = useState(false);
  const [state, dispatch] = useStoreContext();

  const deleteEvent = () => {
    if (window.confirm("Delete this Event?")) {
      console.log(state.currentBooking + " Delete event");
      API.deletePost(state.currentBooking.id)
        .then((res) => {
          console.log("Ben changhe this to re mount the other component maybe");
          props.setNoEvents(false);
          dispatch({
            type: "CLICKEDEVENT",
            clickedEvent: false,
          });
        })
        .catch((err) => console.log(err));
    }
  };

  const updateEvent = () => {
    console.log("update clicked");
    dispatch({
      type: "modalClick",
      date: state.currentBooking.date,
    });
  };

  return (
    <div className="clickedEvent col-md-6">
      {deleteAnEvent ? (
        <div class="alert alert-dismissible alert-warning">
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
          ></button>
          <h4 class="alert-heading">Warning!</h4>
          <p class="mb-0">
            Best check yo self, you're not looking too good. Nulla vitae elit
            libero, a pharetra augue. Praesent commodo cursus magna,{" "}
            <a href="#" class="alert-link">
              vel scelerisque nisl consectetur et
            </a>
            .
          </p>
        </div>
      ) : (
        <div className="hide"></div>
      )}
      <div className="listCOntainer">
        <div className="updatePosts">
          <FeatherIcon
            icon="edit"
            className="updatePost"
            onClick={updateEvent}
          />
          <FeatherIcon
            icon="trash-2"
            className="updatePost"
            onClick={deleteEvent}
          />
        </div>
        <h2 className="h2">
          {" "}
          {state.currentBooking.title} ~ {props.bookingWith}
        </h2>
        <ul className="ul">
          <li className="li">
            <Link to="#"> {state.currentBooking.description}</Link>
          </li>
          <li className="li">
            <Link to="#"> {state.currentBooking.location}</Link>
          </li>
          <li className="li">
            <Link to="#"> {state.currentBooking.time}</Link>
          </li>
          <li className="li">
            <Link to="#"> {state.currentBooking.date}</Link>
          </li>
          <li className="li"></li>
        </ul>
      </div>
      {state.modal ? <UpdateEvent /> : <div className="hide"></div>}
    </div>
  );
}

export default Event;
