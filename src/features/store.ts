import { configureStore } from '@reduxjs/toolkit';
import postsSlice from './post/postsSlice';
import userSlice from "./user/userSlice";
import bookSearchReducer from "./bookSearch/bookSearchSlice";
import bookReducer from "./book/bookSlice";
import gptSlice from "./gpt/gptSlice";
import commentReducer from './comment/commentSlice';

const store = configureStore({
    reducer: {
        posts: postsSlice,
        book: bookReducer,
        bookSearch: bookSearchReducer,
        user: userSlice,
        gpt: gptSlice,
        comments: commentReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
