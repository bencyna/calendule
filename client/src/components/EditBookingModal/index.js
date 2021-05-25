import React, { useState } from "react";
import { useStoreContext } from "../../utils/GlobalState";
import TimePicker from "react-bootstrap-time-picker";
import API from "../../utils/API";
import Error from "../Error";

function EditBooking(props) {
  const [state, dispatch] = useStoreContext();

  const [eventInput, setEventInput] = useState({
    date: "",
    time: 0,
  });

  const [error, setError] = useState(false);

  const handleExitClick = (e) => {
    e.preventDefault();
    setError(false);
    props.setEditEvent(false);
  };

  const handleTimeChange = (time) => {
    setEventInput({ ...eventInput, time: time });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEventInput({ ...eventInput, [name]: value });
  };

  const editedEvent = () => {
    if (eventInput.date && eventInput.time) {
      API.updatePost({
        bookerPending: !state.currentBooking.bookerPending,
        id: state.currentBooking.id,
        date: eventInput.date,
        time: eventInput.time,
      })
        .then((res) => {
          alert("Reshedule requested");
          dispatch({
            type: "CLICKEDEVENT",
            clickedEvent: false,
          });
        })
        .catch((err) => console.log(err));
    } else {
      setError(true);
    }
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
              Rescedule event with {props.bookingWith}
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
            <label className="col-form-label mt-4">Time</label>
            <TimePicker
              start="10:00"
              end="21:00"
              step={30}
              onChange={handleTimeChange}
              value={eventInput.time}
            />

            <label className="col-form-label mt-4">Date</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. 2022/05/19"
              id="inputDate"
              name="date"
              onChange={handleInputChange}
            ></input>
            <br />
            {error ? (
              <Error message="Date and time must be selected" />
            ) : (
              <div className="hide"></div>
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={editedEvent}
            >
              Reschedule
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

export default EditBooking;
