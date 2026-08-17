import axios from 'axios';

export const API_URL = 'http://localhost:8000';

export const BASE_URL = axios.create({
  baseURL: API_URL,
});