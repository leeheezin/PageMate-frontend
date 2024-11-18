import { configureStore } from '@reduxjs/toolkit';
import postsSlice from './post/postsSlice';
import userSlice from "./user/userSlice";
import bookSearchReducer from "./bookSearch/bookSearchSlice";

const store = configureStore({
    reducer: {
        posts: postsSlice,
        bookSearch: bookSearchReducer,
        user: userSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
