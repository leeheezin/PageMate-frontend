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
    likes: string[];
    comments: Comment[];
    likeCount: number;  // 좋아요 수
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
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzNiMzJlYzkxMjNmNTNlMzc3ZGIzOWYiLCJpYXQiOjE3MzIwMjM0NjQsImV4cCI6MTczMjA0NTA2NH0.E-moI1HqYAiD7Wh7dI7JeBtBf2sNf6L9OxRlFLGcQtI";

export const fetchPosts = createAsyncThunk<Post[]>(
    "posts/fetchPosts",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get("http://localhost:5001/api/post");
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
            // const token = sessionStorage.getItem("token");
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
export const updatePost = createAsyncThunk<Post, { id: string; title: string; text: string; bookTitle: string; bookAuthor: string }>(
    "posts/updatePost",
    async ({ id, title, text, bookTitle, bookAuthor }, { rejectWithValue }) => {
        try {
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
            return rejectWithValue(error.response.data.error);
        }
    }
);
export const deletePost = createAsyncThunk<Post, { id: string }>(
    "posts/deletePost",
    async ({ id }, { dispatch, rejectWithValue }) => {
        try {
            if (!token) throw new Error("토큰이 없습니다.");

            const res = await axios.delete(`http://localhost:5001/api/post/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });
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
        const response = await axios.post(
          `http://localhost:5001/api/post/${postId}/like`, 
          { userId },  
          {
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          }
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
                const index = state.posts.findIndex(post => post._id === updatedPost._id);
                if (index !== -1) {
                  state.posts[index] = updatedPost;  // 서버에서 받은 새로운 포스트 정보로 업데이트
                }            
                console.log(updatedPost.likes)
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
