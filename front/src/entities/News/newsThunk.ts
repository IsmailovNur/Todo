import { createAsyncThunk } from '@reduxjs/toolkit';

import type { FullNewsItem, NewsItem, NewsMutation } from './types';
import { BASE_URL } from "../../shared/axios/AxiosApi.ts";

export const fetchAllNews = createAsyncThunk<NewsItem[]>(
  'news/fetchAll',
  async () => {
    const response = await BASE_URL.get<NewsItem[]>('/news');
    return response.data;
  }
);

export const fetchNewsById = createAsyncThunk<FullNewsItem, number>(
  'news/fetchById',
  async (id) => {
    const response = await BASE_URL.get<FullNewsItem>(`/news/${id}`);
    return response.data;
  }
);

export const createNews = createAsyncThunk<void, NewsMutation>(
  'news/create',
  async (newsData) => {
    const formData = new FormData();
    formData.append('title', newsData.title);
    formData.append('text_content', newsData.text_content);
    if (newsData.image) {
      formData.append('image', newsData.image);
    }

    await BASE_URL.post('/news', formData);
  }
);

export const deleteNews = createAsyncThunk<void, number>(
  'news/delete',
  async (id) => {
    await BASE_URL.delete(`/news/${id}`);
  }
);