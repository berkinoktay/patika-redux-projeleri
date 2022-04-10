import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from './redux/todos/todoSlice';
import { nanoid } from '@reduxjs/toolkit';
function Header() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTodo({ id: nanoid(), text: text, completed: false }));
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
