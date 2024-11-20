import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
  PayloadAction,
} from "@reduxjs/toolkit";
import api from "../../utils/api";
import { NavigateFunction } from "react-router-dom";

interface UserState {
  user: UserData | null;
  loading: boolean;
  loginError: string | null;
  registrationError: string | null;
  success: boolean;
}

const initialState: UserState = {
  user: null,
  loading: false,
  loginError: null,
  registrationError: null,
  success: false,
};

interface UserData {
  _id: string;
  name: string;
  email: string;
  profilePhoto: string;
  createdAt: string;
  updatedAt: string;
}
interface User {
    data: UserData
}
interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  email: string;
  name: string;
  password: string;
  navigate: NavigateFunction;
}

export const registerUser = createAsyncThunk<
UserData,
  RegisterPayload,
  { rejectValue: string }
>(
  "user/registerUser",
  async ({ email, name, password, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.post("/user", { email, name, password });
      navigate("/login");

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const loginWithEmail = createAsyncThunk<
UserData,
  LoginPayload,
  { rejectValue: string }
>("user/loginWithEmail", async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await api.post("/auth/login", { email, password });

    const token = response.data.token;
    sessionStorage.setItem("token", token);

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const loginWithToken = createAsyncThunk<
UserData,
  void,
  { rejectValue: string }
>("user/loginWithToken", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/user/me");
    console.log("토큰 로그인!");
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.loginError = null;
      state.registrationError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.registrationError = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.registrationError = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.registrationError = action.payload || "register failed";
      })
      .addCase(loginWithEmail.pending, (state) => {
        state.loading = true;
        state.loginError = null;
      })
      .addCase(loginWithEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginWithEmail.rejected, (state, action) => {
        state.loading = false;
        state.loginError = action.payload || "login failed";
      })
      .addCase(loginWithToken.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { clearErrors } = userSlice.actions;
export default userSlice.reducer;
