import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTodo, removeTodo } from './redux/todos/todoSlice';
function TodoList() {
  const todos = useSelector((state) => state.todos.items);
  const dispatch = useDispatch();
  const activeFilter = useSelector((state) => state.todos.activeFilter);
  let filteredTodos = todos;
  if (activeFilter !== 'all') {
    filteredTodos = todos.filter((todo) =>
      activeFilter === 'active' ? !todo.completed : todo.completed
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
