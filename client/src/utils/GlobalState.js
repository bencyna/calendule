import React, { createContext, useReducer, useContext, useEffect } from "react";
import API from "../utils/API";

const StoreContext = createContext();

const { Provider } = StoreContext;

const reducer = (state, action) => {
  switch (action.type) {
    case "SIGNUP":
      return {
        ...state,
        login: false,
      };
    case "LOGIN":
      return {
        ...state,
        login: true,
      };
    case "userClicked":
      return {
        ...state,
        dateClicked: false,
      };

    case "modalClick":
      return {
        ...state,
        modal: !state.modal,
        date: action.date,
      };
    case "eventSubmit":
      return {
        ...state,
        eventAdded: true,
      };
    case "eventSubmitDone":
      return {
        ...state,
        eventAdded: false,
      };
    case "searchInvoked":
      return {
        ...state,
        search: action.search,
      };
    case "addUsers":
      return {
        ...state,
        users: action.users,
      };
    case "LOGGINGIN":
      return {
        ...state,
        logged_in: action.logged_in,
        user_id: action.id,
      };
    case "CURRENTBOOKING":
      return {
        ...state,
        currentBooking: action.currentBooking,
      };
    case "CLICKEDEVENT":
      return {
        ...state,
        clickedEvent: action.clickedEvent,
      };
    case "PENDINGEVENT":
      return {
        ...state,
        pendingEvents: action.pendingEvents,
      };
    case "ACTIONREQUIRED":
      return {
        ...state,
        actionRequired: action.actionRequired,
      };
    case "ALLPENDINGEVENTS":
      return {
        ...state,
        allPendingEvents: action.allPendingEvents,
      };
    case "BOOKINGWITH":
      return {
        ...state,
        bookingWith: action.bookingWith,
      };
    default:
      return state;
  }
};

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    pendingEvents: [],
    allPendingEvents: [],
    users: [],
    login: true,
    dateClicked: false,
    date: "",
    modal: false,
    eventAdded: false,
    search: "",
    logged_in: false,
    user_id: "",
    currentBooking: {},
    clickedEvent: false,
    actionRequired: false,
    bookingWith: "",
  });
  useEffect(() => {
    API.isLoggedIn()
      .then((res) => {
        console.log(res);
        dispatch({
          type: "LOGGINGIN",
          logged_in: res.data.logged_in,
          id: res.data.user_id,
        });
      })
      .catch((err) => console.log(err));
  }, []);
  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
