
const HOST_API =()=>{
     return "http://localhost:8080/api"}
const initialState =()=>{
    return {todo: { list: [], item: {} }} };

export default {HOST_API,initialState};