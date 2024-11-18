import { configureStore } from '@reduxjs/toolkit';
import postsSlice from './post/postsSlice';
import bookSearchReducer from "./bookSearch/bookSearchSlice";

const store = configureStore({
    reducer: {
        posts: postsSlice,
        bookSearch: bookSearchReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
