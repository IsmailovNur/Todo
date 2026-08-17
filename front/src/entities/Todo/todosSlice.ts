import { createSlice } from '@reduxjs/toolkit';
import type { ITodo } from './types';
import { fetchTodos, createTodo, updateTodoStatus, deleteTodo } from './todosThunk';

interface TodosState {
  items: ITodo[];
  fetchLoading: boolean;
  createLoading: boolean;
}

const initialState: TodosState = {
  items: [],
  fetchLoading: false,
  createLoading: false,
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.fetchLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state) => {
        state.fetchLoading = false;
      })

      .addCase(createTodo.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.createLoading = false;
        state.items.push(action.payload);
      })
      .addCase(createTodo.rejected, (state) => {
        state.createLoading = false;
      })

      .addCase(updateTodoStatus.fulfilled, (state, action) => {
        const index = state.items.findIndex((t) => t._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t._id !== action.payload);
      });
  },
});

export const todosReducer = todosSlice.reducer;