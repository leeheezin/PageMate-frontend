import { configureStore } from '@reduxjs/toolkit';
import postsSlice from './post/postsSlice';
import booksReducer from "./book/bookSlice";

const store = configureStore({
    reducer: {
        posts: postsSlice,
        books: booksReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
