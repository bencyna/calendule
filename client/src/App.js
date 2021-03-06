import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Welcome from "./components/Welcome";
import NavBar from "./components/NavBar";
import { StoreProvider } from "./utils/GlobalState";
import Calendar from "./pages/Calendar";
import Day from "./components/Day";
import Find from "./pages/Find";
import altUserCalendar from "./components/AltUserCal";
import Pending from "./components/Day/Pending";
import PendingEvent from "./components/Event/PendingEvent";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <div>
        <StoreProvider>
          <Switch>
            <Route exact path="/login" component={Welcome}/>
            <>
              <NavBar />
              <Route component={Calendar} path="/" exact />
              <Route exact path="/date/:id" component={Day}/>
              <Route exact path="/find" component={Find}/>
              <Route exact path="/user/:id" component={altUserCalendar}/>
              <Route exact path="/pending" component={Pending}/>
              <Route exact path="/pending/event/" component={PendingEvent}/>
            </>
          </Switch>
        </StoreProvider>
      </div>
    </Router>
  );
}

export default App;
