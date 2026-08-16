import { createSlice } from '@reduxjs/toolkit';
import type { FullNewsItem, NewsItem } from "./types.ts";
import {
  createNews,
  deleteNews,
  fetchAllNews,
  fetchNewsById
} from "./newsThunk.ts";

interface NewsState {
  items: NewsItem[];
  singleNews: FullNewsItem | null;
  fetchLoading: boolean;
  singleLoading: boolean;
  createLoading: boolean;
  deleteLoading: boolean | number;
}

const initialState: NewsState = {
  items: [],
  singleNews: null,
  fetchLoading: false,
  singleLoading: false,
  createLoading: false,
  deleteLoading: false,
};

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllNews.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchAllNews.fulfilled, (state, {payload}) => {
        state.fetchLoading = false;
        state.items = payload;
      })
      .addCase(fetchAllNews.rejected, (state) => {
        state.fetchLoading = false;
      });

    builder
      .addCase(fetchNewsById.pending, (state) => {
        state.singleLoading = true;
      })
      .addCase(fetchNewsById.fulfilled, (state, {payload}) => {
        state.singleLoading = false;
        state.singleNews = payload;
      })
      .addCase(fetchNewsById.rejected, (state) => {
        state.singleLoading = false;
      });

    builder
      .addCase(createNews.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createNews.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createNews.rejected, (state) => {
        state.createLoading = false;
      });

    builder
      .addCase(deleteNews.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteNews.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(deleteNews.rejected, (state) => {
        state.deleteLoading = false;
      });
  },
});

export const newsReducer = newsSlice.reducer;