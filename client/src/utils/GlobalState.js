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
    case "DATECLICKED":
      return {
        ...state,
        dateClicked: !state.dateClicked,
      };
    case "userClicked":
      return {
        ...state,
        dateClicked: false,
      };

    default:
      return state;
  }
};

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    events: [],
    currentBooking: {
      title: "",
      description: "",
      location: "",
      date: "",
    },
    login: true,
    dateClicked: false,
    date: "",
  });
  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
