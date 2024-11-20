import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../utils/api"

export interface Comment {
    author: string;
    text: string;
}

export interface Post {
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
    bookTitle: string;
    bookAuthor: string;
}
interface PostsState {
    posts: Post[];
    myPosts:Post[];
    myLiked:Post[];
    loading: boolean;
    error: string | null;
}

// 초기 상태
const initialState: PostsState = {
    posts: [],
    myPosts:[],
    myLiked:[],
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
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM5ZmMxNzRhOTg1OWRjMDM0YzFmOTgiLCJpYXQiOjE3MzE5MTM5NzEsImV4cCI6MTczMTkzNTU3MX0.O3J6z9ArMYSE28C4uAld0SpxmzJJoKdLoOH07_SaWPU"
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

export const getMyPost = createAsyncThunk<Post[], void>(
    "posts/getMyPost",
    async (_, {rejectWithValue}) =>{
    try {
        const response = await api.get("/post/me")

        return response.data.data
    } catch (error:any) {
        return rejectWithValue(error.response.data.error);
    }
}
)

export const getLikedPost = createAsyncThunk<Post[], void>(
    "posts/getLikedPost",
    async (_, {rejectWithValue}) =>{
    try {
        const response = await api.get("/post/liked")

        return response.data.data
    } catch (error:any) {
        return rejectWithValue(error.response.data.error);
    }
}
)



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
            .addCase(getMyPost.pending, (state)=>{
                state.loading = true;
            })
            .addCase(getMyPost.fulfilled, (state,action)=>{
                state.loading = false;
                state.myPosts = action.payload;
            })
            .addCase(getMyPost.rejected, (state,action)=>{
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getLikedPost.pending, (state)=>{
                state.loading = true;
            })
            .addCase(getLikedPost.fulfilled, (state,action)=>{
                state.loading = false;
                state.myLiked = action.payload;
            })
            .addCase(getLikedPost.rejected, (state,action)=>{
                state.loading = false;
                state.error = action.payload as string;
            })
            ;
    },
});

export const { startLoading, stopLoading } = postsSlice.actions;
export default postsSlice.reducer;
