import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { usersReducer } from "../entities/User/usersSlice";
import { todosReducer } from "../entities/Todo/todosSlice";

const loadUserFromLocalStorage = () => {
  try {
    const savedUser = localStorage.getItem('user');
    if (!savedUser) return undefined;
    return {
      users: {user: JSON.parse(savedUser), loading: false, error: null},
    };
  } catch {
    return undefined;
  }
};

const rootReducer = combineReducers({
  users: usersReducer,
  todos: todosReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadUserFromLocalStorage(),
});

store.subscribe(() => {
  const user = store.getState().users.user;
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
  } else {
    localStorage.removeItem('user');
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;