import React, { createContext, useState } from "react";

export const HistoryContext = createContext();

export const HistoryProvider = ({ children }) => {
  const [orderHistory, setOrderHistory] = useState([]);

  const addOrderHistory = (order) => {
    setOrderHistory((prevState) => [...prevState, order]);
  };

  return (
    <HistoryContext.Provider value={{ orderHistory, addOrderHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};
