import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export const getTodosAsync = createAsyncThunk(
  'todos/getTodosAsync',
  async () => {
    const response = await axios(`${process.env.REACT_APP_API_BASE_URL}/todos`);
    return response.data;
  }
);
export const clearCompletedAsync = createAsyncThunk(
  'todos/clearCompletedAsync',
  async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/todos/clear`
    );
    return response.data;
  }
);
export const addTodoAsync = createAsyncThunk(
  'todos/addTodoAsync',
  async (data) => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/todos`,
      data
    );
    return response.data;
  }
);
export const removeTodoAsync = createAsyncThunk(
  'todos/removeTodoAsync',
  async (id) => {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_BASE_URL}/todos/${id}`
    );
    return response.data;
  }
);
export const updateTodoAsync = createAsyncThunk(
  'todos/updateTodoAsync',
  async ({ id, data }) => {
    const response = await axios.patch(
      `${process.env.REACT_APP_API_BASE_URL}/todos/${id}`,
      data
    );
    return response.data;
  }
);

export const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    activeFilter: localStorage.getItem('activeFilter') || 'all',
    toggleCompleted: false,
    isLoading: false,
    error: null,
  },
  reducers: {
    /*
    ? addTodo Kısmını artık backend tarafında hallettiğimiz için buradan kaldırdık
    addTodo: {
      reducer: (state, action) => {
        state.items.push(action.payload);
      },
      ? payload reducer tarafına düşüp eklenmeden önce prepare tarafına düşer ve burada yapılandırılabilir
      prepare: ({ text }) => {
        return {
          payload: {
            id: nanoid(),
            completed: false,
            text:text,
          },
        };
      },
    },
    */
    // toggleTodo: (state, action) => {
    //   const { id } = action.payload;
    //   const todo = state.items.find((todo) => todo.id === id);
    //   todo.completed = !todo.completed;
    // },
    // removeTodo: (state, action) => {
    //   const { id } = action.payload;
    //   const newTodos = state.items.filter((todo) => todo.id !== id);
    //   state.items = newTodos;
    // },
    setFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
    // clearCompleted: (state) => {
    //   const newTodos = state.items.filter((todo) => todo.completed === false);
    //   state.items = newTodos;
    // },
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
    // Get Todos
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
    // Add Todo
    [addTodoAsync.fulfilled]: (state, action) => {
      state.items.push(action.payload);
    },
    // Remove Todo
    [removeTodoAsync.fulfilled]: (state, action) => {
      state.items = action.payload;
    },
    // Update Todo
    [updateTodoAsync.fulfilled]: (state, action) => {
      const { id, completed } = action.payload;
      const index = state.items.findIndex((todo) => todo.id == id);
      state.items[index].completed = completed;
    },
    // Clear Completed
    [clearCompletedAsync.fulfilled]: (state, action) => {
      state.items = action.payload;
    },
  },
});
//? Birden fazla componentte aynı selectorleri çağırmak yerine burada global selectorler tutulur.
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
export const { setFilter, clearCompleted, activeAllTodos } = todoSlice.actions;
export default todoSlice.reducer;
