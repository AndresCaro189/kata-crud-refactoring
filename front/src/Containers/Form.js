import React, { useContext, useRef, useState } from 'react';
import ErrorBundary from '../components/ErrorBundary';
import index from "../localhost/index";
import { Store } from "../components/Store";

/**===============================Body Form===================================== */
export const Form = () => {
  const formRef = useRef(null);
  const { dispatch, state: { todo } } = useContext(Store);
  const item = todo.item;
  const [state, setState] = useState(item);
  const [error, setError] = useState(null);

  const validForm = () => {
    let isValid = true;
    setError(null);
    if (state.name.length < 3 || state.name.length > 100 || state.name === null) {
      setError("Debes ingresar una tarea de mas de dos letras");
      isValid = false;
    }
    return isValid;
  };
  const validadChar = () => {
    let isValidChar = true;
    setError(null);
    for (var i = 0; i < state.name.length; i++) {
      if (state.name.charAt(i) == '#') {
        setError("Debes ingresar una tarea que no tenga #, *, $, %");
        isValidChar = false;
      }
    }
    return isValidChar;
  };

  const onAdd = (event) => {
    event.preventDefault();

    if (!validForm()) {
      return;
    }
    if (!validadChar()) {
      return;
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
  };

  const onEdit = (event) => {
    event.preventDefault();

    if (!validForm()) {
      return;
    }
    if (!validadChar()) {
      return;
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
  };

  return <form ref={formRef}>
    <div>
      <h2 className="center">To-Do List</h2>
      <div className="errorForm">
        {error && <span>{error}</span>}
      </div>
      <div className="formRefStyle">
        <ErrorBundary>
          <input
            className="boxDecoration"
            type="text"
            name="name"
            placeholder="¿Qué piensas hacer hoy?"
            defaultValue={item.name}
            onChange={(event) => {
              setState({ ...state, name: event.target.value });
            }}>
          </input>
          {item.id && <button onClick={onEdit} className="buttonActuar">Actualizar</button>}
          {!item.id && <button onClick={onAdd} className="buttonCrear">Crear</button>}
        </ErrorBundary>
      </div>
    </div>
  </form>;
};
