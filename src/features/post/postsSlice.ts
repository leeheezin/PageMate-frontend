import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Comment {
    author: string;
    text: string;
}

interface Post {
    id: number;
    bookTitle: string;
    bookAuthor: string;
    title: string;
    text: string;
    date: string;
    author: string;
    profilePhoto: string;
    likes: number;
    comments: Comment[];
}
interface NewPost {
    title: string;
    text: string;
    // bookTitle: string;
    // bookAuthor: string;
}
interface PostsState {
    posts: Post[];
    loading: boolean;
    error: string | null;
}

// 초기 상태
const initialState: PostsState = {
    posts: [],
    loading: false,
    error: null,
};

export const fetchPosts = createAsyncThunk<Post[]>(
    "posts/fetchPosts",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get("http://localhost:5001/api/post");
            return response.data.data; 
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const createPost = createAsyncThunk<Post, NewPost>(
    "posts/createPost",
    async (newPost, { rejectWithValue }) => {
        try {
            // const token = sessionStorage.getItem("token");
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM5ZmMxNzRhOTg1OWRjMDM0YzFmOTgiLCJpYXQiOjE3MzE4NTY3MDgsImV4cCI6MTczMTg3ODMwOH0.PSXR7CDGylbzkGCd9GQQvYKiBEB3rL4HQj7XoJ3xVak"
            if (!token) throw new Error("토큰이 없습니다.");

            const response = await axios.post("http://localhost:5001/api/post/write", newPost, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });
            return response.data.data; 
        } catch (error: any) {
            console.log(error.response.data.error)
            return rejectWithValue(error.response.data.error);
        }
    }
);



const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        startLoading(state) {
            state.loading = true;
        },
        stopLoading(state) {
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
                state.posts = action.payload;
                state.loading = false;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(createPost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createPost.fulfilled, (state, action: PayloadAction<Post>) => {
                state.posts.push(action.payload);
                state.loading = false;
            })
            .addCase(createPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { startLoading, stopLoading } = postsSlice.actions;
export default postsSlice.reducer;
