import React from "react";
import { Link } from "react-router-dom";
import { useStoreContext } from "../../utils/GlobalState";
import SearchForm from "../SearchForm";
import API from "../../utils/API";

function NavBar() {
  const [state, dispatch] = useStoreContext();

  const setCalendarFalse = (e) => {
    e.preventDefault();
    dispatch({
      type: "userClicked",
    });
  };

  const logout = () => {
    API.logoutUser()
      .then((res) => {
        // set user to loggout
        window.location.replace("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Calendule
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor03"
          aria-controls="navbarColor03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarColor03">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={setCalendarFalse}>
                User
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/find">
                Book
              </Link>
            </li>
            {!state.logged_in ? (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <div className="nav-link" to="#" onClick={logout}>
                  Logout
                </div>
              </li>
            )}
          </ul>
          <SearchForm />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
