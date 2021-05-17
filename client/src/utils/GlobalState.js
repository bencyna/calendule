import React, { createContext, useReducer, useContext } from "react";

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
    default:
      return state;
  }
};

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    events: [],
    users: [],
    login: true,
    dateClicked: false,
    date: "",
    modal: false,
    eventAdded: false,
    search: "",
    logged_in: false,
    user_id: "",
  });
  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
