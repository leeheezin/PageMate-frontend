import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../utils/api";

interface Comment {
    author: string;
    text: string;
}

interface Post {
    _id: string;
    id: string;
    userId: string;
    bookTitle: string;
    bookAuthor: string;
    title: string;
    text: string;
    date: string;
    createdAt?: string;
    author: string;
    profilePhoto: string;
    likes: string[];
    comments: Comment[];
    likeCount: number;  
    liked: boolean;   
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
            const response = await api.get("/post");
            console.log("API response data:", response.data); 
            return response.data.data; 
        } catch (error: any) {
            return rejectWithValue(error.response.data.error);
        }
    }
);

export const createPost = createAsyncThunk<Post, NewPost>(
    "posts/createPost",
    async (newPost, { rejectWithValue }) => {
        try {
            const response = await api.post("/post/write", newPost);
            return response.data.data; 
        } catch (error: any) {
            console.log(error.response.data.error)
            return rejectWithValue(error.response.data.error);
        }
    }
);
export const updatePost = createAsyncThunk<Post, { id: string; title: string; text: string; bookTitle: string; bookAuthor: string }>(
    "posts/updatePost",
    async ({ id, title, text, bookTitle, bookAuthor }, { rejectWithValue }) => {
        try {
            const response = await api.put(
                `/post/${id}`,
                { title, text, bookTitle, bookAuthor }
            );
            return response.data.data; 
        } catch (error: any) {
            return rejectWithValue(error.response.data.error);
        }
    }
);
export const deletePost = createAsyncThunk<Post, { id: string }>(
    "posts/deletePost",
    async ({ id }, { dispatch, rejectWithValue }) => {
        try {

            const res = await api.delete(`/post/${id}`);
            dispatch(fetchPosts())
            return res.data.data;
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.error) {
                return rejectWithValue(error.response.data.error);
            }
            return rejectWithValue(error.message);
        }
    }
);
export const toggleLike = createAsyncThunk<Post, { postId: string; userId: string }>(
    "posts/toggleLike",
    async ({ postId, userId }, { rejectWithValue }) => {
        try {
            const response = await api.post(
            `/post/${postId}/like`, 
            { userId }
            );
            return response.data.data; 
        } catch (error: any) {
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
                state.posts = action.payload.map(post => ({
                    ...post,
                    liked: post.likes.includes(post.userId), // liked 상태를 계산하여 추가
                }));
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
                state.error = null;
            })
            .addCase(updatePost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(deletePost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deletePost.fulfilled, (state, action: PayloadAction<Post>) => {
                state.posts = state.posts.filter((post) => post.id !== action.payload.id);
                state.loading = false;
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(toggleLike.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(toggleLike.fulfilled, (state, action: PayloadAction<Post>) => {
                const updatedPost = action.payload;
                const index = state.posts.findIndex((post) => post._id === updatedPost._id);
                if (index !== -1) {
                    const liked = updatedPost.likes.includes(updatedPost.userId);
                    state.posts[index] = { ...updatedPost, liked };
                }
                state.loading = false;
            })
            .addCase(toggleLike.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    },
});

export const { startLoading, stopLoading } = postsSlice.actions;
export default postsSlice.reducer;
