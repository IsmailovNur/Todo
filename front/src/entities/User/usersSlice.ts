import { createSlice } from '@reduxjs/toolkit';
import type { IUser } from './types';
import { loginUser, registerUser } from './usersThunk';

interface UsersState {
  user: IUser | null;
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  user: null,
  loading: false,
  error: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Registration failed';
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
        state.error = 'Incorrect username or password';
      });
  },
});

export const {logout} = usersSlice.actions;
export const usersReducer = usersSlice.reducer;