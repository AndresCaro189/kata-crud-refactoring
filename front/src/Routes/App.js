import React from 'react';
import { Form } from '../Containers/Form';
import { List } from '../Containers/List';
import { StoreProvider } from '../components/Store';

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
