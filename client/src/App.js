import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/login";
import NavBar from "./components/NavBar";
import PrivateRoute from "./components/PrivateRoute";
import { StoreProvider } from "./utils/GlobalState";
import MyMonthlyCalendar from "./pages/calendar";
import Day from "./components/Day";

function App() {
  return (
    <Router>
      <div>
        <StoreProvider>
          <NavBar />
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={MyMonthlyCalendar} />
            <Route exact path="/date/:id" component={Day} />
          </Switch>
        </StoreProvider>
      </div>
    </Router>
  );
}

export default App;
