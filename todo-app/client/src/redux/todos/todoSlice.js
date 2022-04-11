import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';

export const getTodosAsync = createAsyncThunk(
  'todos/getTodosAsync',
  async () => {
    const response = await fetch('http://localhost:9000/todos');
    return await response.json();
  }
);
export const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    activeFilter: 'all',
    toggleCompleted: false,
    isLoading: false,
    error: null,
  },
  reducers: {
    addTodo: {
      reducer: (state, action) => {
        state.items.push(action.payload);
      },
      // State değişmeden önce çalışır, işlemler yapıldıktan sonra reducer çalılır
      prepare: ({ text }) => {
        return {
          payload: {
            id: nanoid(),
            text: text,
            completed: false,
          },
        };
      },
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
  extraReducers: {
    [getTodosAsync.pending]: (state) => {
      state.isLoading = true;
    },
    [getTodosAsync.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
    },
    [getTodosAsync.rejected]: (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    },
  },
});
// Birden fazla componentte aynı selectorleri çağırmak yerine burada global selectorler tutulur.
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
