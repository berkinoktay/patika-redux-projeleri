import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter, clearCompleted } from './redux/todos/todoSlice';
function FooterBar() {
  const activeFilter = useSelector((state) => state.todos.activeFilter);
  const itemsLeft = useSelector(
    (state) => state.todos.items.filter((todo) => !todo.completed).length
  );
  const dispatch = useDispatch();
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{itemsLeft} </strong>
        items left
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={activeFilter === 'all' ? 'selected' : ''}
            onClick={() => dispatch(setFilter('all'))}
          >
            All
          </a>
        </li>
        <li>
          <a
            href="#/"
            className={activeFilter === 'active' ? 'selected' : ''}
            onClick={() => dispatch(setFilter('active'))}
          >
            Active
          </a>
        </li>
        <li>
          <a
            href="#/"
            className={activeFilter === 'completed' ? 'selected' : ''}
            onClick={() => dispatch(setFilter('completed'))}
          >
            Completed
          </a>
        </li>
      </ul>

      <button
        className="clear-completed"
        onClick={() => dispatch(clearCompleted())}
      >
        Clear completed
      </button>
    </footer>
  );
}

export default FooterBar;
