import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../utils/api";
interface Book {
    id: number;
    title: string;
    author: string;
    description: string;
    price: number;
    cover: string;
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
export const fetchBooks = createAsyncThunk<Book[], void, { rejectValue: string }>(
    "books/fetchBooks",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/book/bestsellers");
            console.log("response", response.data);
            return response.data.data.item; // API 응답 구조에 맞게 수정
        } catch (error: any) {
            console.error("Error fetching books:", error);
            return rejectWithValue(
                error.response?.data?.message || "책 데이터를 가져오는 중 오류가 발생했습니다."
            );
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
                state.error = action.payload || "알 수 없는 오류가 발생했습니다.";
            });
    },
});

export const { startLoading, stopLoading } = booksSlice.actions;
export default booksSlice.reducer;
