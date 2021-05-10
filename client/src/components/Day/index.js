import React, { useContext } from "react";

function Day(props) {
  return <div>{props.date}hello</div>;
  // okay so, you will set the date in the onclick funtion before this page renders to the state, then when someone adds an event to the day, we set the date of the event to the state date, we
  // onlci to the page, we use a get axios to get all events with the date_id of the date (if there are none none will appear and render a day)
  // when adding an event, we set the event date_id to the day which is already a parameter in that function. Boom we have the component fucl uah
}

export default Day;
