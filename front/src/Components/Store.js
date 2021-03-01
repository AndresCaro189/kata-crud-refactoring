import React, { createContext, useReducer } from 'react';
import index from "../localhost/index";
import reducer from "../reducers";


export const Store = createContext(index.initialState());

/**===============================StoreProvider===================================== */
export const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, index.initialState());

    return <Store.Provider value={{ state, dispatch }}>
        <header>
        <h1 className="center">Dashboard</h1>
        </header>
        {children}
    </Store.Provider>;
};
