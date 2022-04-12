import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setFilter,
  clearCompletedAsync,
  selectActiveFilter,
} from './redux/todos/todoSlice';
function FooterBar() {
  const activeFilter = useSelector(selectActiveFilter);
  const itemsLeft = useSelector(
    (state) => state.todos.items.filter((todo) => !todo.completed).length
  );
  const completedTodos = useSelector(
    (state) => state.todos.items.filter((todo) => todo.completed).length
  );
  useEffect(() => {
    localStorage.setItem('activeFilter', activeFilter);
  }, [activeFilter]);
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
      {completedTodos > 0 && (
        <button
          className="clear-completed"
          onClick={() => dispatch(clearCompletedAsync())}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
}

export default FooterBar;
