const service = () =>{
    const HOST_API = "http://localhost:8080/api";
    const initialState = {
        todo: { list: [], item: {} }
    };
    const Store = createContext(initialState)
}

export default service;