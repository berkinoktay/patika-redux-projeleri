import TodoList from './TodoList';
import { useDispatch } from 'react-redux';
import { activeAllTodos } from './redux/todos/todoSlice';
function Main() {
  const dispatch = useDispatch();
  return (
    <section className="main">
      <input className="toggle-all" type="checkbox" />
      <label htmlFor="toggle-all" onClick={() => dispatch(activeAllTodos())}>
        Mark all as complete
      </label>
      <TodoList />
    </section>
  );
}

export default Main;
