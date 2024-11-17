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
    content: string;
    date: string;
    author: string;
    profilePhoto: string;
    likes: number;
    comments: Comment[];
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
            const response = await axios.get("/api/post");
            return response.data.data; 
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const createPost = createAsyncThunk<Post, Omit<Post, "id">>(
    "posts/createPost",
    async (newPost, { rejectWithValue }) => {
        try {
            const response = await axios.post("/api/post/write", newPost, {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
                },
            });
            return response.data.data; 
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);


const postsSlice = createSlice({
    name: "post",
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
