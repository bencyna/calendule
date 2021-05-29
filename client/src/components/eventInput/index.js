import React, { useState } from "react";
import API from "../../utils/API";
import { useStoreContext } from "../../utils/GlobalState";
import { useParams, Link } from "react-router-dom";
import TimePicker from "react-bootstrap-time-picker";

function EventInput(props) {
  const { id } = useParams();

  const [state, dispatch] = useStoreContext();

  const [eventInput, setEventInput] = useState({
    duration: "",
    startTime: "",
    endTime: "",
    date: "",
    time: 0,
  });

  const [error, setError] = useState(false);

  const handleExitClick = (e) => {
    e.preventDefault();
    setError(false);
    dispatch({
      type: "modalClick",
    });
  };

  const handleTimeChange = (time) => {
    setEventInput({ ...eventInput, time: time });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEventInput({ ...eventInput, [name]: value });
  };

  const handleEventSubmit = (e) => {
    e.preventDefault();
    setError(false);
    if (
      (eventInput.title && eventInput.description,
      eventInput.time,
      eventInput.location)
    ) {
      dispatch({
        type: "modalClick",
      });
      // api call then setEventinpiut to ()
      API.createEvent({
        title: eventInput.title,
        description: eventInput.description,
        time: eventInput.time,
        date: state.date,
        location: eventInput.location,
        booker_id: state.user_id,
        bookee_id: id,
        accepted: false,
        bookerPending: false,
      })
        .then((res) => {
          alert("Event request succesful!");
        })
        .catch((err) => {
          alert("Uh oh! Something went wrong");
          setError(true);
        });
    } else {
      setError(true);
    }
  };

  const handleOwnEvent = (e) => {
    e.preventDefault();
    setError(false);
    if (
      (eventInput.title && eventInput.description,
      eventInput.time,
      eventInput.location)
    ) {
      dispatch({
        type: "modalClick",
      });
      // api call then setEventinpiut to ()
      API.createEvent({
        title: eventInput.title,
        description: eventInput.description,
        time: eventInput.time,
        date: state.date,
        location: eventInput.location,
        booker_id: state.user_id,
        bookee_id: state.user_id,
        accepted: true,
        bookerPending: true,
      })
        .then((res) => {
          alert("Event added succesfully!");
        })
        .catch((err) => {
          alert("Uh oh! Something went wrong");
          setError(true);
        });
    } else {
      setError(true);
    }
    props.setNoEvents(true);
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
            <h5 className="modal-title">Add an event for {state.date}</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleExitClick}
            ></button>
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
            <div className="form-group">
              <label className="form-label mt-4">Description</label>
              <textarea
                className="form-control"
                placeholder="Provide a description"
                id="inputDescription"
                name="description"
                rows="3"
                spellCheck="true"
                onChange={handleInputChange}
              ></textarea>
            </div>
            <label className="col-form-label mt-4">Time</label>
            <TimePicker
              start="10:00"
              end="21:00"
              step={30}
              onChange={handleTimeChange}
              value={eventInput.time}
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
              <div className="hide"></div>
            )}
          </div>
          <div className="modal-footer">
            {props.ownPost ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleOwnEvent}
              >
                Save Event
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleEventSubmit}
              >
                Save Event
              </button>
            )}

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

export default EventInput;
