import { createAsyncThunk } from '@reduxjs/toolkit';
import type { CommentItem, CommentMutation } from './types.ts';
import { BASE_URL } from "../../shared/axios/AxiosApi.ts";

export const fetchCommentsByNewsId = createAsyncThunk<CommentItem[], number>(
  'comments/fetchByNewsId',
  async (newsId) => {
    const response = await BASE_URL.get<CommentItem[]>(`/comments?news_id=${newsId}`);
    return response.data;
  }
);

export const createComment = createAsyncThunk<void, CommentMutation>(
  'comments/create',
  async (commentData) => {
    await BASE_URL.post('/comments', commentData);
  }
);

export const deleteComment = createAsyncThunk<void, { commentId: number; newsId: number }>(
  'comments/delete',
  async ({ commentId }) => {
    await BASE_URL.delete(`/comments/${commentId}`);
  }
);