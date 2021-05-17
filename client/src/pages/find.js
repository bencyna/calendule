// import "./style.css";
import { useHistory } from "react-router-dom";
import React, { useEffect } from "react";
import { useStoreContext } from "../utils/GlobalState";

import API from "../utils/API";

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

  const searchingFor = state.users.filter(
    (user) => user.first_name.toUpperCase().includes(state.search.toUpperCase())
    // make a full name in the data so we can search by full name
    // make an if this is empty, show no one by that name
  );

  return (
    <div>
      <h1 onClick={onClik}> Search for someone to make an event!</h1>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Column heading</th>
            <th scope="col">Column heading</th>
            <th scope="col">Column heading</th>
          </tr>
        </thead>
        <tbody>
          {searchingFor.map((user) => {
            return (
              <tr
                className="table-dark"
                key={user.id}
                id={user.id}
                onClick={goToUser}
              >
                <td id={user.id}>{user.first_name}</td>
                <td id={user.id}>{user.last_name}</td>
                <td id={user.id}>{user.id}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Find;
