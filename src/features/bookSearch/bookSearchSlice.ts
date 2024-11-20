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
    page: number;
    hasMore: boolean; // 추가 데이터 여부
}

const initialState: BookSearchState = {
    books: [],
    loading: false,
    error: null,
    page: 1, // 초기 페이지
    hasMore: true, // 추가 데이터 여부
};

// 책 검색 비동기 액션
export const fetchBookSearchResult = createAsyncThunk(
    "bookSearch/fetchBookSearchResult",
    async ({ query, page }: { query: string; page: number }, thunkAPI) => {
        try {
            const response = await fetch(`http://localhost:5001/api/book/search?query=${query}&page=${page}`);
            if (!response.ok) {
                const errorData = await response.json();
                return thunkAPI.rejectWithValue(errorData.error || "API 요청 중 오류가 발생했습니다.");
            }

            const data = await response.json();
            return data;
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
            state.page = 1;
            state.hasMore = true;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBookSearchResult.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBookSearchResult.fulfilled, (state, action) => {
                state.loading = false;
                 // results가 배열인지 확인하고 기본값 설정
                const results = Array.isArray(action.payload.results) ? action.payload.results : [];

                if (action.payload.page === 1) {
                    // 첫 페이지면 기존 데이터를 덮어쓰기
                    state.books = results;
                } else {
                    // 이후 페이지면 기존 데이터에 추가
                    state.books = [...state.books, ...results];
                }

                // 추가 데이터 여부 확인
                state.hasMore = results.length > 0;
                state.page = action.payload.meta.page; // 현재 페이지 업데이트
            })
            .addCase(fetchBookSearchResult.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearBooks } = bookSearchSlice.actions;
export default bookSearchSlice.reducer;