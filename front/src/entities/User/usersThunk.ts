import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../../shared/axios/AxiosApi';
import type { IUser, RegisterOrLoginMutation } from './types';

export const registerUser = createAsyncThunk<IUser, RegisterOrLoginMutation>(
  'users/register',
  async (userData) => {
    const response = await BASE_URL.post<IUser>('/users', userData);
    return response.data;
  }
);

export const loginUser = createAsyncThunk<IUser, RegisterOrLoginMutation>(
  'users/login',
  async (userData) => {
    const response = await BASE_URL.post<{ message: string; user: IUser }>('/users/sessions', userData);
    return response.data.user;
  }
);