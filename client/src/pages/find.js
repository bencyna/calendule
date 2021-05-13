// import "./style.css";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import API from "../utils/API";

function Find() {
  const [users, setUsers] = useState([]);
  const history = useHistory();

  useEffect(() => {
    API.getUsers().then((res) => {
      console.log(res.data);
      setUsers(res.data);
    });
  }, []);

  const goToUser = (event) => {
    const userId = event.target.id;
    console.log(userId);
    history.push(`/user/${userId}`);
  };
  return (
    <div>
      <h1>Search for someone to make an event!</h1>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Column heading</th>
            <th scope="col">Column heading</th>
            <th scope="col">Column heading</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
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
