import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Comment {
    _id: string;
    author: string;
    commentText: string;
    isDeleted: boolean;
  }
  
  interface CommentState {
    comments: { id: string; author: string; text: string }[];
    loading: boolean;
    error: string | null;
  }
  
  const initialState: CommentState = {
    comments: [],
    loading: false,
    error: null,
  };

// Async thunk for adding a new comment
export const addComment = createAsyncThunk(
    'comments/addComment',
    async ({ postId, text }: { postId: string; text: string }, thunkAPI) => {
        try {
            console.log("text",text);
            const response = await axios.post('http://localhost:5001/api/comment/write', { postId, text });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to add comment');
        }
    }
);

// Thunk to fetch comments for a specific post
export const fetchComments = createAsyncThunk(
    'comments/fetchComments',
    async (postId: string, { rejectWithValue }) => {
      try {
        const response = await axios.get(`http://localhost:5001/api/comment/${postId}`); // API 엔드포인트
        return response.data.data; // 댓글 데이터 반환
      } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch comments');
      }
    }
  );

const commentSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addComment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addComment.fulfilled, (state, action) => {
                state.loading = false;
                state.comments.push(action.payload); // Add the new comment to the state
            })
            .addCase(addComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchComments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.loading = false;
                state.comments = action.payload.map((comment: Comment) => ({
                    id: comment._id,
                    author: comment.author, // userId를 author로 변환
                    text: comment.commentText, // commentText를 text로 변환
                }));
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default commentSlice.reducer;