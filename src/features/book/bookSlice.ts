import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Book {
    id: number;
    title: string;
    author: string;
    description: string;
    price: number;
    coverImage: string;
    publicationDate: string;
}

interface BooksState {
    books: Book[];
    loading: boolean;
    error: string | null;
}

// 초기 상태
const initialState: BooksState = {
    books: [],
    loading: false,
    error: null,
};

// 책 목록을 가져오는 비동기 함수
export const fetchBooks = createAsyncThunk<Book[]>(
    "books/fetchBooks",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get("http://localhost:5500/api/book/bestsellers");
            console.log('response',response);
            return response.data.data;  // API 응답 데이터 구조에 맞게 수정
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

const booksSlice = createSlice({
    name: "books",
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
            .addCase(fetchBooks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBooks.fulfilled, (state, action: PayloadAction<Book[]>) => {
                state.books = action.payload;
                state.loading = false;
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    },
});

export const { startLoading, stopLoading } = booksSlice.actions;
export default booksSlice.reducer;