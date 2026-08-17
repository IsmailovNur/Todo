import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../../shared/axios/AxiosApi';
import type { ITodo, TodoMutation } from './types';

export const fetchTodos = createAsyncThunk<ITodo[]>(
  'todos/fetchAll',
  async () => {
    const response = await BASE_URL.get<ITodo[]>('/todos');
    return response.data;
  }
);

export const createTodo = createAsyncThunk<ITodo, TodoMutation>(
  'todos/create',
  async (todoData) => {
    const response = await BASE_URL.post<ITodo>('/todos', todoData);
    return response.data;
  }
);

export const updateTodoStatus = createAsyncThunk<ITodo, { id: string; status: ITodo['status'] }>(
  'todos/updateStatus',
  async ({ id, status }) => {
    const response = await BASE_URL.put<ITodo>(`/todos/${id}`, { status });
    return response.data;
  }
);

export const deleteTodo = createAsyncThunk<string, string>(
  'todos/delete',
  async (id) => {
    await BASE_URL.delete(`/todos/${id}`);
    return id;
  }
);