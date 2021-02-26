const StoreProviders = ()=>{
    const StoreProvider = ({ children }) => {
        const [state, dispatch] = useReducer(reducer, initialState);
      
        return <Store.Provider value={{ state, dispatch }}>
          <header>
            <h1 className="center">Dashboard</h1>
          </header>
          {children}
        </Store.Provider>
      }
}

export default StoreProviders;