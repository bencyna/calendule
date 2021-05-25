// import "./style.css";
import { useHistory } from "react-router-dom";
import React, { useEffect } from "react";
import { useStoreContext } from "../../utils/GlobalState";
import "./style.css";

import API from "../../utils/API";

function Find() {
  const [state, dispatch] = useStoreContext();

  const history = useHistory();

  useEffect(() => {
    API.getUsers().then((res) => {
      dispatch({
        type: "addUsers",
        users: res.data,
      });
    });
  }, []);

  const goToUser = (event) => {
    const userId = event.target.id;
    console.log(userId);
    history.push(`/user/${userId}`);
  };

  const onClik = () => {
    const searchingFor = state.users.filter(
      (user) => user.first_name === state.search //.toLowerCase() === state.search.toLowerCase()
    );
    console.log(state.users);
    console.log(state.search);
    console.log(searchingFor);
  };

  const handleInputChange = (event) => {
    dispatch({
      type: "searchInvoked",
      search: event.target.value,
    });
  };

  const searchingFor = state.users.filter(
    (user) => user.first_name.toUpperCase().includes(state.search.toUpperCase())
    // make a full name in the data so we can search by full name
    // make an if this is empty, show no one by that name
  );

  return (
    <div className="Container">
      <div className="row people">
        <h1 onClick={onClik} className="title">
          {" "}
          Search for someone to make an event!
        </h1>
        <form className="search">
          <div className="form-group searchBar">
            <label htmlFor="employee">People:</label>
            <input
              value={state.search}
              onChange={handleInputChange}
              employee="employee"
              list="employees"
              type="text"
              className="form-control"
              placeholder="Look for someone"
              id="employee"
            />
          </div>
        </form>

        {searchingFor.map((user) => {
          return (
            <div
              className="col-md-2 box"
              style={{ maxWidth: "20rem" }}
              key={user.id}
              id={user.id}
              onClick={goToUser}
            >
              <div className="card-body" id={user.id} onClick={goToUser}>
                <h4 className="card-title text" id={user.id} onClick={goToUser}>
                  {" "}
                  {user.first_name} {user.last_name}
                </h4>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Find;
