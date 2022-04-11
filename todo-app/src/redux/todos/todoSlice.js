import { createSlice } from '@reduxjs/toolkit';
export const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [
      { id: 1, text: 'Learn React', completed: true },
      { id: 2, text: 'Learn Redux', completed: false },
      { id: 3, text: 'Have a life!', completed: false },
    ],
    activeFilter: 'all',
    toggleCompleted: false,
  },
  reducers: {
    addTodo: (state, action) => {
      state.items.push(action.payload);
    },
    toggleTodo: (state, action) => {
      const { id } = action.payload;
      const todo = state.items.find((todo) => todo.id === id);
      todo.completed = !todo.completed;
    },
    removeTodo: (state, action) => {
      const { id } = action.payload;
      const newTodos = state.items.filter((todo) => todo.id !== id);
      state.items = newTodos;
    },
    setFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
    clearCompleted: (state) => {
      const newTodos = state.items.filter((todo) => !todo.completed);
      state.items = newTodos;
    },
    activeAllTodos: (state) => {
      if (!state.toggleCompleted) {
        state.items.forEach((todo) => (todo.completed = true));
        state.toggleCompleted = true;
      } else {
        state.items.forEach((todo) => (todo.completed = false));
        state.toggleCompleted = false;
      }
    },
  },
});
export const selectTodos = (state) => state.todos.items;
export const selectActiveFilter = (state) => state.todos.activeFilter;
export const selectFilteredTodos = (state) => {
  if (state.todos.activeFilter === 'all') {
    return state.todos.items;
  }
  return state.todos.items.filter((todo) =>
    state.todos.activeFilter === 'active' ? !todo.completed : todo.completed
  );
};
export const {
  addTodo,
  toggleTodo,
  removeTodo,
  setFilter,
  clearCompleted,
  activeAllTodos,
} = todoSlice.actions;
export default todoSlice.reducer;
