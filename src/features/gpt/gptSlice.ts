import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../utils/api";

interface GptResult {
    gptResultText: string;
}

interface GptState {
    gptResultText: string;
    loading: boolean;
    error: string | null;
}

const initialState: GptState = {
    gptResultText: "",
    loading: false,
    error: null,
};

export const styleChange = createAsyncThunk<string, {style:string, review_object:object}, { rejectValue: string }>(
    "gpt/stylechange",
    async ({style,review_object}, { rejectWithValue }) => {
        try {
            let token;
            if (sessionStorage.getItem("token")){
                token = sessionStorage.getItem("token");
            }else{
                token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM5ZmMxNzRhOTg1OWRjMDM0YzFmOTgiLCJpYXQiOjE3MzE5MTM5NzEsImV4cCI6MTczMTkzNTU3MX0.O3J6z9ArMYSE28C4uAld0SpxmzJJoKdLoOH07_SaWPU"
            }
            if (!token) throw new Error("토큰이 없습니다.");
            
            const response = await api.post("/gpt/stylechange", {style,review_object}, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });
            return response.data.data; 
        } catch (error: any) {
            return rejectWithValue(error.response.data.error);
        }
    }
);

export const contentCorrection = createAsyncThunk<string, {review_object:object}, { rejectValue: string }>(
    "gpt/contentcorrection",
    async ({review_object}, { rejectWithValue }) => {
        try {
            let token;
            if (sessionStorage.getItem("token")){
                token = sessionStorage.getItem("token");
            }else{
                token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM5ZmMxNzRhOTg1OWRjMDM0YzFmOTgiLCJpYXQiOjE3MzE5MTM5NzEsImV4cCI6MTczMTkzNTU3MX0.O3J6z9ArMYSE28C4uAld0SpxmzJJoKdLoOH07_SaWPU"
            }
            if (!token) throw new Error("토큰이 없습니다.");
            
            const response = await api.post("/gpt/contentcorrection", {review_object}, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });
            return response.data.data;             

        } catch (error: any) {
            return rejectWithValue(error.response.data.error);
        }
    }
);

export const spellingCorrection = createAsyncThunk<string, {review_object:object}, { rejectValue: string }>(
    "gpt/spellingcorrection",
    async ({review_object}, { rejectWithValue }) => {
        try {
            let token;
            if (sessionStorage.getItem("token")){
                token = sessionStorage.getItem("token");
            }else{
                token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM5ZmMxNzRhOTg1OWRjMDM0YzFmOTgiLCJpYXQiOjE3MzE5MTM5NzEsImV4cCI6MTczMTkzNTU3MX0.O3J6z9ArMYSE28C4uAld0SpxmzJJoKdLoOH07_SaWPU"
            }
            if (!token) throw new Error("토큰이 없습니다.");
            
            const response = await api.post("/gpt/spellingcorrection", {review_object}, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });
            return response.data.data;             

        } catch (error: any) {
            return rejectWithValue(error.response.data.error);
        }   
    }
);

export const aiRequest = createAsyncThunk<string, {aiRequestText:string, review_object:object}, { rejectValue: string }>(
    "gpt/aiRequest",
    async ({aiRequestText, review_object}, { rejectWithValue }) => {   
        try {
            let token;
            if (sessionStorage.getItem("token")){
                token = sessionStorage.getItem("token");
            }else{
                token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM5ZmMxNzRhOTg1OWRjMDM0YzFmOTgiLCJpYXQiOjE3MzE5MTM5NzEsImV4cCI6MTczMTkzNTU3MX0.O3J6z9ArMYSE28C4uAld0SpxmzJJoKdLoOH07_SaWPU"
            }   
            if (!token) throw new Error("토큰이 없습니다.");
            const response = await api.post("/gpt/aiRequest", {aiRequestText, review_object}, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data.error);
        }
    }
);

const gptSlice = createSlice({
    name: "gpt",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(styleChange.pending, (state) => {
            state.loading = true;
        })
        .addCase(styleChange.fulfilled, (state, action) => {
            state.loading = false;
            state.gptResultText = action.payload;
        })
        .addCase(styleChange.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload ?? null;
        })
        .addCase(contentCorrection.pending, (state) => {
            state.loading = true;
        })
        .addCase(contentCorrection.fulfilled, (state, action) => {
            state.loading = false;
            state.gptResultText = action.payload;
        })
        .addCase(contentCorrection.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload ?? null;
        })
        .addCase(spellingCorrection.pending, (state) => {
            state.loading = true;
        })
        .addCase(spellingCorrection.fulfilled, (state, action) => {
            state.loading = false;
            state.gptResultText = action.payload;
            console.log("success payload :",action.payload)
        })
        .addCase(spellingCorrection.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload ?? null;
            console.log("spellingCorrection error",action.payload)
        })
        .addCase(aiRequest.pending, (state) => {
            state.loading = true;
        })
        .addCase(aiRequest.fulfilled, (state, action) => {
            state.loading = false;
            state.gptResultText = action.payload;
        })
        .addCase(aiRequest.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload ?? null;
        })
    },
});

export default gptSlice.reducer;
