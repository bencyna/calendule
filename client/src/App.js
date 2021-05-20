import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/login";
import NavBar from "./components/NavBar";
import PrivateRoute from "./components/PrivateRoute";
import { StoreProvider } from "./utils/GlobalState";
import Calendar from "./pages/Calendar";
import Day from "./components/Day";
import Find from "./pages/find";
import altUserCalendar from "./components/AltUserCal";

function App() {
  return (
    <Router>
      <div>
        <StoreProvider>
          <NavBar />
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Calendar} />
            <Route exact path="/date/:id" component={Day} />
            <Route exact path="/find" component={Find} />
            <Route exact path="/user/:id" component={altUserCalendar} />
          </Switch>
        </StoreProvider>
      </div>
    </Router>
  );
}

export default App;
