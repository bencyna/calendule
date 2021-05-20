import React, { useState } from "react";
import API from "../../utils/API";
import { useStoreContext } from "../../utils/GlobalState";
import { useParams, Link } from "react-router-dom";

function UpdateEvent(props) {
  const { id } = useParams();

  const [state, dispatch] = useStoreContext();

  const [eventInput, setUpdateEvent] = useState({
    duration: "",
    startTime: "",
    endTime: "",
    date: "",
  });

  const [error, setError] = useState(false);

  const handleExitClick = (e) => {
    e.preventDefault();
    setError(false);
    dispatch({
      type: "modalClick",
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdateEvent({ ...eventInput, [name]: value });
  };

  const handleEventSubmit = (e) => {
    e.preventDefault();
    setError(false);
    console.log(eventInput.title);
    if (
      (eventInput.title && eventInput.description,
      eventInput.time,
      eventInput.location)
    ) {
      dispatch({
        type: "modalClick",
      });
      // api call then setEventinpiut to ()
      API.updatePost({
        title: eventInput.title,
        description: eventInput.description,
        time: eventInput.time,
        location: eventInput.location,
        id: state.currentBooking.id,
      })
        .then((res) => {
          alert("Event updated succesfully!");
          props.setNoEvents(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setError(true);
    }
    console.log(eventInput);
  };
  return (
    <div
      className="modal fade show"
      id="source-modal"
      style={{ display: "block" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              Update the event {state.currentBooking.title} {state.date}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleExitClick}
            >
              {/* <span aria-hidden="true"></span> */}
            </button>
          </div>
          <div className="modal-body">
            <label className="col-form-label mt-4">Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Title your event"
              id="inputTitle"
              name="title"
              onChange={handleInputChange}
            ></input>
            <label className="col-form-label mt-4">Description</label>
            <input
              type="text"
              className="form-control"
              placeholder="Provide a description"
              id="inputDescription"
              name="description"
              onChange={handleInputChange}
            ></input>
            <label className="col-form-label mt-4">Time</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. 2pm-3pm"
              id="inputTime"
              name="time"
              onChange={handleInputChange}
            />

            <label className="col-form-label mt-4">Location</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Adelaide"
              id="inputLocation"
              name="location"
              onChange={handleInputChange}
            ></input>
            <br />
            {error ? (
              <div className="alert alert-dismissible alert-danger">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="alert"
                ></button>
                <strong>Oh snap!</strong>{" "}
                <Link to="#" className="alert-link">
                  Input fields cannot be left empty, add some information
                </Link>{" "}
                and try submitting again.
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleEventSubmit}
            >
              Save Event
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={handleExitClick}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateEvent;
