import React, { useContext, useEffect } from 'react';
import index from "../localhost/index";
import { Store } from "../components/Store";

/**===============================Body List===================================== */
export const List = () => {
  const { dispatch, state: { todo } } = useContext(Store);
  const currentList = todo.list;

  useEffect(() => {
    fetch(index.HOST_API() + "/todos")
      .then(response => response.json())
      .then((list) => {
        dispatch({ type: "update-list", list });
      });
  }, [dispatch]);


  const onDelete = (id) => {
    fetch(index.HOST_API() + "/" + id + "/todo", {
      method: "DELETE"
    }).then((list) => {
      dispatch({ type: "delete-item", id });
    });
  };

  const onEdit = (todo) => {
    dispatch({ type: "edit-item", item: todo });
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
    <table>
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
          </tr>;
        })}
      </tbody>
    </table>
  </div>;
};
