import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/login";
import NavBar from "./components/NavBar";
import PrivateRoute from "./components/PrivateRoute";
import { StoreProvider } from "./utils/GlobalState";
import MyMonthlyCalendar from "./pages/calendar";

function App() {
  return (
    <Router>
      <div>
        <StoreProvider>
          <NavBar />
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={MyMonthlyCalendar} />
          </Switch>
        </StoreProvider>
      </div>
    </Router>
  );
}

export default App;
