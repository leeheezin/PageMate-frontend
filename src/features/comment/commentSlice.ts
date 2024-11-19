import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for adding a new comment
export const addComment = createAsyncThunk(
    'comments/addComment',
    async ({ postId, text }: { postId: string; text: string }, thunkAPI) => {
        try {
            const response = await axios.post('/api/comment/write', { postId, text });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || 'Failed to add comment');
        }
    }
);

const commentSlice = createSlice({
    name: 'comments',
    initialState: {
        comments: [] as { author: string; text: string }[],
        loading: false,
        error: null as string | null,
    },
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
            });
    },
});

export default commentSlice.reducer;