import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateTodoAsync,
  removeTodoAsync,
  selectFilteredTodos,
  getTodosAsync,
} from './redux/todos/todoSlice';
function TodoList() {
  const dispatch = useDispatch();
  const filteredTodos = useSelector(selectFilteredTodos);
  const isLoading = useSelector((state) => state.todos.isLoading);
  const error = useSelector((state) => state.todos.error);
  useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch]);
  if (isLoading) {
    return <div style={{ padding: 15, fontSize: 16 }}>Loading...</div>;
  }
  if (error) {
    return (
      <div style={{ padding: 15, fontSize: 16 }}>Error: {error.message}</div>
    );
  }

  const handleToggle = (id, completed) => {
    dispatch(updateTodoAsync({ id, data: { completed } }));
  };
  const handleRemove = (id) => {
    dispatch(removeTodoAsync(id));
  };
  return (
    <ul className="todo-list">
      {filteredTodos.map((todo) => (
        <li key={todo.id} className={todo.completed ? 'completed' : ''}>
          <div className="view">
            <input
              className="toggle"
              type="checkbox"
              onChange={() => handleToggle(todo.id, !todo.completed)}
              checked={todo.completed}
            />
            <label>{todo.text}</label>
            <button
              className="destroy"
              onClick={() => handleRemove(todo.id)}
            ></button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
