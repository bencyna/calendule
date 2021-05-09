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
    default:
      return state;
  }
};

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    events: [],
    currentBooking: {
      id: 0,
      title: "",
      description: "",
      bookee: "",
      booker: "",
      location: "",
    },
    login: true,
  });
  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
