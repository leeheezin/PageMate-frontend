import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from "../../utils/api";

interface Comment {
    _id: string;
    userId:string;
    author: string;
    commentText: string;
    isDeleted: boolean;
    commentDate: string;
    profilePhoto: string;
  }
  
  interface CommentState {
    comments: {
        commentDate: string; id: string; author: string; text: string; userId: string; profilePhoto: string; 
}[];
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
            const response = await api.post('/comment/write', { postId, text });
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
        const response = await api.get(`/comment/${postId}`); // API 엔드포인트
        return response.data.data; // 댓글 데이터 반환
      } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch comments');
      }
    }
  );

  // 비동기 작업: 댓글 삭제
export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async ({ postId, commentId }: { postId: string; commentId: string }, { rejectWithValue }) => {
      try {
          const response = await api.delete(`/comment/${commentId}`);
          return response;
      } catch (error: any) {
          return rejectWithValue(error.response?.data?.message || '댓글 삭제에 실패했습니다.');
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
                    userId: comment.userId,
                    commentDate: new Date(comment.commentDate).toLocaleString("ko-KR") , // 한국표준시 적용한 문자열로 변환,
                    profilePhoto: comment.profilePhoto,
                }));
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
              state.loading = false;
              state.error = null;
            })
            .addCase(deleteComment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default commentSlice.reducer;