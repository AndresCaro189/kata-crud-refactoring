import React, { useReducer,  createContext } from 'react';
import reducer from "../components/StoreProvider";

const initialState ={
  todo: { list: [], item: {} }
};

const Store = createContext(initialState)

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <Store.Provider value={{ state, dispatch }}>
    <header>
      <h1 className="center">Dashboard</h1>
    </header>
    {children}
  </Store.Provider>
}


export default Store;

