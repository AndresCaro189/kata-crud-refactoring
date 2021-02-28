import React, { useContext, useReducer, useEffect, useRef, useState, createContext } from 'react';
import reducer from "../reducers";
import index from "../localhost/index"
import ErrorBundary from '../components/ErrorBundary'

const Store = createContext(index.initialState())

/**===============================Body Form===================================== */
const Form = () => {
  const formRef = useRef(null);
  const { dispatch, state: { todo } } = useContext(Store);
  const item = todo.item;
  const [state, setState] = useState(item);
  const [error, setError] = useState(null)

  const validForm = () =>{
    let isValid =true;
    setError(null)
    if(state.name.length<3 || state.name.length>100 ) {
      setError("Debes ingresar una tarea de mas de dos letras")
      isValid = false
    }
    return isValid
  }
  /**state.name.charAt(i)=='#'|| state.name.charAt(i)=='*'
      || state.name.charAt(i)=='$' || state.name.charAt(i)=='% */
      /*
  const validadChar = () =>{
    let isValidChar = true;
    setError()
    for(var)
  }*/
  const onAdd = (event) => {
    event.preventDefault();
    
    if (!validForm()){
      return
    }

    const request = {
      name: state.name,
      id: null,
      completed: false
    };
    fetch(index.HOST_API() + "/todo", {
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
      });
  }

  const onEdit = (event) => {
    event.preventDefault();

    if (!validForm()){
      return
    }

    const request = {
      name: state.name,
      id: item.id,
      isCompleted: item.isCompleted
    };
    fetch(index.HOST_API() + "/todo", {
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
      <div className="errorForm">
            {
              error && <span>{error}</span>
            }
      </div>
      <div className="formRefStyle">
      <ErrorBundary>
        <input
          className ="boxDecoration"
          type="text"
          name="name"
          placeholder="¿Qué piensas hacer hoy?"
          defaultValue={item.name}
          onChange={(event) => {
            setState({ ...state, name: event.target.value })
          }}  >
        </input>
            {item.id &&<button onClick={onEdit} className="buttonActuar">Actualizar</button>}
            {!item.id && <button onClick={onAdd} className="buttonCrear">Crear</button>}
      </ErrorBundary>
    </div>
  </div>
  </form>
}

/**===============================Body List===================================== */

const List = () => {
  const { dispatch, state: { todo } } = useContext(Store);
  const currentList = todo.list;

  useEffect(() => {
    fetch(index.HOST_API() + "/todos")
      .then(response => response.json())
      .then((list) => {
        dispatch({ type: "update-list", list })
      })
  }, [dispatch]);


  const onDelete = (id) => {
    fetch(index.HOST_API() + "/" + id + "/todo", {
      method: "DELETE"
    }).then((list) => {
      dispatch({ type: "delete-item", id })
    })
  };

  const onEdit = (todo) => {
    dispatch({ type: "edit-item", item: todo })
  };

  const onChange = (event, todo) => {
    const request = {
      name: todo.name,
      id: todo.id,
      completed: event.target.checked
    };
    fetch(index.HOST_API() + "/todo", {
      method: "PUT",
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then((todo) => {
        dispatch({ type: "update-item", item: todo });
      });
  };

  const decorationDone = {
    textDecoration: 'line-through',

  };
  return <div className="bodyTodoList">
    <table >
      <thead className="center ">
        <tr>
          <td>ID</td>
          <td>Tarea</td>
          <td>¿Completado?</td>
        </tr>
      </thead>
      <tbody className="center">
        {currentList.map((todo) => {
          return <tr key={todo.id} style={todo.completed ? decorationDone : {}}>
            <td>{todo.id}</td>
            <td className="bodyTodoListMapName">{todo.name}</td>
            <td><input type="checkbox" defaultChecked={todo.completed} onChange={(event) => onChange(event, todo)}></input></td>
            <div>
            <td><button onClick={() => onDelete(todo.id)} className="buttonEliminar">Eliminar</button></td>
            </div>
            <div>
            <td><button onClick={() => onEdit(todo)} className="buttonEditar">Editar</button></td>
            </div>
          </tr>
        })}
      </tbody>
    </table>
  </div>
}


/**===============================StoreProvider===================================== */

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, index.initialState());

  return <Store.Provider value={{ state, dispatch }}>
    <header>
      <h1 className="center">Dashboard</h1>
    </header>
    {children}
  </Store.Provider>
}


/**==================================App======================================== */

function App() {
  return <StoreProvider>
      <div className="todoList">
        <Form />
        <List />
      </div>
  </StoreProvider>
}

export default App;
