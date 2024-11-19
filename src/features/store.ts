import { configureStore } from '@reduxjs/toolkit';
import postsSlice from './post/postsSlice';
import userSlice from "./user/userSlice";
import bookSearchReducer from "./bookSearch/bookSearchSlice";
import bookReducer from "./book/bookSlice";
import gptSlice from "./gpt/gptSlice";
<<<<<<< HEAD
import commentReducer from './comment/commentSlice';

=======
>>>>>>> 0672d91 (create gpt api func)
const store = configureStore({
    reducer: {
        posts: postsSlice,
        book: bookReducer,
        bookSearch: bookSearchReducer,
        user: userSlice,
        gpt: gptSlice,
<<<<<<< HEAD
        comments: commentReducer,
=======
>>>>>>> 0672d91 (create gpt api func)
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
