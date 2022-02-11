
import React, { useState } from "react";
import {Link } from 'react-router-dom'

const PopUp = ({id, message}) => {
  // create state `open` with default as false
  const [open, setOpen] = useState(false);
  return (
    <>
        <div class="dropdown-menu show" data-popper-placement="bottom-start">
          <h3 class="dropdown-header">Actions</h3>
          <div class="dropdown-divider"></div>

          <Link class="dropdown-item" to="#">Action</Link>
          <Link class="dropdown-item" to="#">Another action</Link>
          <Link class="dropdown-item" to="#">Something else here</Link>
          <div class="dropdown-divider"></div>
          <Link class="dropdown-item" to="#">Separated link</Link>
        </div>
    </>
  );
};

export default PopUp;