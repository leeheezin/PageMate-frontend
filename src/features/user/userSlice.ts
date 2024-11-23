import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
  PayloadAction,
} from "@reduxjs/toolkit";
import api from "../../utils/api";
import { NavigateFunction } from "react-router-dom";
import axios from "axios";

interface UserState {
  user: UserData | null;
  loading: boolean;
  error: string | null;
  loginError: string | null;
  registrationError: string | null;
  success: boolean;
  profileUpdateError: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  loginError: null,
  registrationError: null,
  success: false,
  profileUpdateError: null,
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
  data: UserData;
}

interface LoginPayload {
  email: string;
  password: string;
}
interface KakaLoginPayload {
  code: string;
}
interface RegisterPayload {
  email: string;
  name: string;
  password: string;
  navigate: NavigateFunction;
}

interface UpdateProfilePayload {
  profilePhoto: string;
}
interface UpdateNamePayload {
  name: string;
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

    return response.data.user;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const loginWithGoogle = createAsyncThunk<
  UserData,
  LoginPayload,
  { rejectValue: string }
>("user/loginWithGoogle", async (token, { rejectWithValue }) => {
  try {

    const response = await api.post("/auth/login/google", { token });

    sessionStorage.setItem("token", response.data.sessionToken);

    return response.data.user;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const loginWithKakao = createAsyncThunk<
  UserData,
  KakaLoginPayload,
  { rejectValue: string }
>("user/loginWithKakao", async (token, { rejectWithValue }) => {
  try {
    const response = await api.post("/auth/login/kakao", token);
    sessionStorage.setItem("token", response.data.sessionToken);

    return response.data.user;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const loginWithToken = createAsyncThunk<
  UserData,
  void,
  { rejectValue: string }
>("user/loginWithToken", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/user/me");
    console.log("🚀 ~ > ~ response:", response.data.data);
    console.log("토큰 로그인!");

    return response.data.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const logout = createAsyncThunk("user/logout", async () => {
  sessionStorage.removeItem("token");
  window.location.reload();
});

export const deleteUser = createAsyncThunk<
  UserData,
  void,
  { rejectValue: string }
>("user/deleteUser", async (_, { rejectWithValue }) => {
  try {
    const response = await api.delete("/user");

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// 프로필 사진 업데이트
export const uploadProfile = createAsyncThunk<
  UserData,
  UpdateProfilePayload,
  { rejectValue: string }
>("user/uploadProfile", async ({ profilePhoto }, { rejectWithValue }) => {
  try {
    const response = await api.put("/user/profile", { profilePhoto });
    console.log("🚀 ~ > ~ response.data.data:", response.data.data);

    return response.data.data; // 업데이트된 유저 정보 반환
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.error || "Profile update failed"
    );
  }
});

export const updateName = createAsyncThunk<
  UserData,
  UpdateNamePayload,
  { rejectValue: string }
>("user/updateName", async (name, { rejectWithValue }) => {
  try {
    const response = await api.put("/user/name", { updateName: name });
    return response.data.data; // 업데이트된 유저 정보 반환
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.error || "Profile update failed"
    );
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
      state.loginError = null;
      state.registrationError = null;
      state.profileUpdateError = null;
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
      })
      .addCase(uploadProfile.pending, (state) => {
        state.loading = true;
        state.profileUpdateError = null;
      })
      .addCase(uploadProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { ...state.user, ...action.payload };
      })
      .addCase(uploadProfile.rejected, (state, action) => {
        state.loading = false;
        state.profileUpdateError = action.payload || "Profile update failed";
      })
      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true;
        state.loginError = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.loginError = action.payload || "login failed";
      })
      .addCase(loginWithKakao.pending, (state) => {
        state.loading = true;
        state.loginError = null;
      })
      .addCase(loginWithKakao.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginWithKakao.rejected, (state, action) => {
        state.loading = false;
        state.loginError = action.payload || "login failed";
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateName.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateName.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearErrors } = userSlice.actions;
export default userSlice.reducer;
