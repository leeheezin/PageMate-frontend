import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { RootState } from "../store";

export interface Comment {
    author: string;
    text: string;
}

interface QueryParams {
    bookTitle?: string;
  }

export interface Post {
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

// export const fetchPosts = createAsyncThunk<Post[], QueryParams | undefined>(
// export const fetchPosts = createAsyncThunk<Post[], void, { state: RootState }>(
export const fetchPosts = createAsyncThunk<Post[], QueryParams | undefined, { state: RootState }>(
    "posts/fetchPosts",
    async (queryParams = {}, { getState, rejectWithValue }) => {
        try {
            const state = getState(); 
            const currentUserId = state.user.user?._id || "";
            const response = await api.get("/post", { params: queryParams });
            if (!response.data || !response.data.data) {
                throw new Error("Invalid response structure");
            }
            console.log("API response data:", response.data); 

            const posts = response.data.data;

            return posts.map((post: Post) => ({
                ...post,
                liked: post.likes.includes(currentUserId), 
                // 로그인된 사용자가 좋아요를 눌렀는지 확인
            }));

            // return response.data.data; 
        } catch (error: any) {
            return rejectWithValue(error?.message || "post data get error");
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
            return res.data.data;
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.error) {
                return rejectWithValue(error.response.data.error);
            }
            return rejectWithValue(error.message);
        }
    }
);
export const toggleLike = createAsyncThunk<Post, { postId: string; userId: string }, { state: RootState }>(
    "posts/toggleLike",
    async ({ postId, userId }, { getState, rejectWithValue }) => {
        try {
            const state = getState(); 
            const currentUserId = state.user.user?._id || ""; 
            const response = await api.post(`/post/${postId}/like`, { userId: currentUserId });

            if (!response.data || !response.data.data) {
                throw new Error("Invalid response structure");
            }
            const updatedPost = response.data.data;
            return {
                ...updatedPost,
                liked: updatedPost.likes.includes(currentUserId), 
                // 현재 로그인된 사용자가 좋아요를 눌렀는지 확인
            };
        } catch (error: any) {
            console.error("Error in toggleLike:", error.message);
            return rejectWithValue(error.response?.data?.error || "An error occurred while toggling like.");
        }
    }
);






const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        startLoading(state: PostsState) {
            state.loading = true;
        },
        stopLoading(state: PostsState) {
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPosts.fulfilled, (state: PostsState, action: PayloadAction<Post[]>) => {
                state.posts = action.payload;
                state.loading = false;
            })
            .addCase(fetchPosts.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
            // .addCase(fetchPosts.rejected, (state, action) => {
            //     state.loading = false;
            //     state.error = action.payload as string;
            // })
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
            .addCase(toggleLike.fulfilled, (state: PostsState, action: PayloadAction<Post>) => {
                const updatedPost = action.payload;
                const index = state.posts.findIndex((post) => post._id === updatedPost._id);
            
                if (index !== -1) {
                    state.posts[index] = updatedPost; 
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