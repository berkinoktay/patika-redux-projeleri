import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodoAsync } from './redux/todos/todoSlice';
function Header() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    await dispatch(addTodoAsync({ text }));
    setText('');
  };
  return (
    <header className="header">
      <h1>todos</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
      </form>
    </header>
  );
}

export default Header;
