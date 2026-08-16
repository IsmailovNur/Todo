import { createSlice } from '@reduxjs/toolkit';
import type { CommentItem } from "./types.ts";
import {
  createComment,
  deleteComment,
  fetchCommentsByNewsId
} from "./commentThunk.ts";

interface CommentsState {
  items: CommentItem[];
  fetchLoading: boolean;
  createLoading: boolean;
  deleteLoading: boolean | number;
}

const initialState: CommentsState = {
  items: [],
  fetchLoading: false,
  createLoading: false,
  deleteLoading: false,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsByNewsId.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchCommentsByNewsId.fulfilled, (state, {payload}) => {
        state.fetchLoading = false;
        state.items = payload;
      })
      .addCase(fetchCommentsByNewsId.rejected, (state) => {
        state.fetchLoading = false;
      });

    builder
      .addCase(createComment.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createComment.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createComment.rejected, (state) => {
        state.createLoading = false;
      });

    builder
      .addCase(deleteComment.pending, (state, {meta}) => {
        state.deleteLoading = meta.arg.commentId;
      })
      .addCase(deleteComment.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(deleteComment.rejected, (state) => {
        state.deleteLoading = false;
      });
  },
});

export const commentsReducer = commentsSlice.reducer;