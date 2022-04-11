import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  toggleTodo,
  removeTodo,
  selectTodos,
  selectActiveFilter,
  selectFilteredTodos,
} from './redux/todos/todoSlice';
function TodoList() {
  const dispatch = useDispatch();
  const filteredTodos = useSelector(selectFilteredTodos);

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
