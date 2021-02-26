import React,{useReducer, createContext} from "react";
import reducer from "../components/StoreProvider";
import index from "../localhost/index"

const Store = createContext(index.initialState())

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, index.initialState());

  return <Store.Provider value={{ state, dispatch }}>
    <header>
      <h1 className="center">Dashboard</h1>
    </header>
    {children}
  </Store.Provider>
}


export default StoreProvider;