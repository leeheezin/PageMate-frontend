import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Book {
    title: string;
    authors: string[];
    thumbnail: string | null;
    publisher: string;
}

interface BookSearchState {
    books: Book[];
    loading: boolean;
    error: string | null;
}

const initialState: BookSearchState = {
    books: [],
    loading: false,
    error: null,
};

// 책 검색 비동기 액션
export const fetchBooks = createAsyncThunk(
    "bookSearch/fetchBooks",
    async (searchTerm: string, thunkAPI) => {
        try {
            const response = await fetch(`http://localhost:5000/api/book/search?query=${searchTerm}`);
            if (!response.ok) {
                const errorData = await response.json();
                return thunkAPI.rejectWithValue(errorData.error || "API 요청 중 오류가 발생했습니다.");
            }

            const data = await response.json();
            return data.results;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || "네트워크 오류가 발생했습니다.");
        }
    }
);

const bookSearchSlice = createSlice({
    name: "bookSearch",
    initialState,
    reducers: {
        clearBooks(state) {
            state.books = [];
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.loading = false;
                state.books = action.payload;
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearBooks } = bookSearchSlice.actions;
export default bookSearchSlice.reducer;