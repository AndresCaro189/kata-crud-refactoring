import React, { useContext,  useRef, useState} from 'react';
import HOST_API from "../localhost";
import Store from "../components/StoreProvider";


const Form = () => {
    const formRef = useRef(null);
    const { dispatch, state: { todo } } = useContext(Store);
    const item = todo.item;
    const [state, setState] = useState(item);
  
    const onAdd = (event) => {
      event.preventDefault();
  
      const request = {
        name: state.name,
        id: null,
        completed: false
      };
      
  
      fetch(HOST_API() + "/todo", {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then((todo) => {
          dispatch({ type: "add-item", item: todo });
          setState({ name: "" });
          formRef.current.reset();
        });
    }
  
    const onEdit = (event) => {
      event.preventDefault();
  
      const request = {
        name: state.name,
        id: item.id,
        isCompleted: item.isCompleted
      };
  
  
      fetch(HOST_API() + "/todo", {
        method: "PUT",
        body: JSON.stringify(request),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then((todo) => {
          dispatch({ type: "update-item", item: todo });
          setState({ name: "" });
          formRef.current.reset();
        });
    }
  
    return <form ref={formRef}>
      <div>
        <h2 className="center">To-Do List</h2>
        <div className="formRefStyle">
          <input
            className ="boxDecoration"
            type="text"
            name="name"
            placeholder="¿Qué piensas hacer hoy?"
            defaultValue={item.name}
            onChange={(event) => {
              setState({ ...state, name: event.target.value })
            }}  ></input>
          {item.id && <button onClick={onEdit}>Actualizar</button>}
          {!item.id && <button onClick={onAdd}>Crear</button>}
      </div>
    </div>
    </form>
  }

  export default Form;