
import React, { useState } from "react";

const PopUp = ({id, message}) => {
  // create state `open` with default as false
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* click of button toggles `open` value therefore visibility */}
      <button
        onClick={() => setOpen(!open)}
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target={`#${id}`}
      >
        {message}
      </button>
      {/* If open is true show your <div /> */}
      {open && (
        <div> hello</div>
      )}
    </>
  );
};

export default PopUp;