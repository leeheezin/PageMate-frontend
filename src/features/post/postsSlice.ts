import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Comment {
    author: string;
    text: string;
}

interface Post {
    _id: string;
    id: string;
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
    bookTitle: string;
    bookAuthor: string;
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
            console.log("API response data:", response.data); 
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
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzNiMzJlYzkxMjNmNTNlMzc3ZGIzOWYiLCJpYXQiOjE3MzE5MzI5MjMsImV4cCI6MTczMTk1NDUyM30.a3Ds-YirsxFxo0Gw43gDFu2f7eFOOpwyAQW5ptKEUtU"
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
export const updatePost = createAsyncThunk<Post, { id: number; title: string; text: string; bookTitle: string; bookAuthor: string }>(
    "posts/updatePost",
    async ({ id, title, text, bookTitle, bookAuthor }, { rejectWithValue }) => {
        try {
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzNiMzJlYzkxMjNmNTNlMzc3ZGIzOWYiLCJpYXQiOjE3MzE5MzI5MjMsImV4cCI6MTczMTk1NDUyM30.a3Ds-YirsxFxo0Gw43gDFu2f7eFOOpwyAQW5ptKEUtU";
            if (!token) throw new Error("토큰이 없습니다.");

            const response = await axios.put(
                `http://localhost:5001/api/post/${id}`,
                { title, text, bookTitle, bookAuthor },
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                }
            );
            return response.data.data; 
        } catch (error: any) {
            return rejectWithValue(error.message);
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
                console.log("Posts fetched:", action.payload);
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
            })
            .addCase(updatePost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updatePost.fulfilled, (state, action: PayloadAction<Post>) => {
                const index = state.posts.findIndex((post) => post.id === action.payload.id);
                if (index !== -1) {
                    state.posts[index] = action.payload; 
                }
                console.log(action.payload)
                state.loading = false;
            })
            .addCase(updatePost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { startLoading, stopLoading } = postsSlice.actions;
export default postsSlice.reducer;
