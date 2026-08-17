import axios from 'axios';
import type { RootState } from "../../app/store";

export const API_URL = 'http://localhost:8000';

export const BASE_URL = axios.create({
  baseURL: API_URL,
});

export const addInterceptors = (getState: () => RootState) => {
  BASE_URL.interceptors.request.use((config) => {
    const token = getState().users.user?.token;
    if (token) {
      config.headers.set('Authorization', token);
    }
    return config;
  });
};