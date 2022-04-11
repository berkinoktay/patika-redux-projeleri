import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  toggleTodo,
  removeTodo,
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

  return (
    <ul className="todo-list">
      {filteredTodos.map((todo) => (
        <li key={todo.id} className={todo.completed ? 'completed' : ''}>
          <div className="view">
            <input
              className="toggle"
              type="checkbox"
              onChange={() => dispatch(toggleTodo({ id: todo.id }))}
              checked={todo.completed}
            />
            <label>{todo.text}</label>
            <button
              className="destroy"
              onClick={() => dispatch(removeTodo({ id: todo.id }))}
            ></button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
