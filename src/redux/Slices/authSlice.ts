import { verifyToken } from "@/hooks/auth";
import { getUserData as fetchUserData } from "@/hooks/userData";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";

export const initializeAuth = createAsyncThunk(
  "auth/initializeAuth",
  async (_, { rejectWithValue }) => {
    try {
      const token = await SecureStore.getItemAsync("token");
      if (!token) {
        return rejectWithValue("No token found");
      }

      const isValidToken = await verifyToken();
      if (!isValidToken) {
        await SecureStore.deleteItemAsync("token");
        return rejectWithValue("Invalid token");
      }

      const userData = await fetchUserData();
      return { isConnected: true, userData };
    } catch (error) {
      return rejectWithValue("Failed to initialize authentication");
    }
  }
);

export const setToken = createAsyncThunk(
  "auth/setToken",
  async (
    {
      token: token,
      streamToken: streamToken,
    }: { token: string; streamToken: string },
    { dispatch }
  ) => {
    await SecureStore.setItemAsync("token", token);

    await SecureStore.setItemAsync("streamToken", streamToken);
    await dispatch(initializeAuth());
  }
);

export const deleteToken = createAsyncThunk(
  "auth/deleteToken",
  async (_, { dispatch }) => {
    await SecureStore.deleteItemAsync("token");
    await SecureStore.deleteItemAsync("streamToken");
    dispatch(setUserIsConnected(false));
  }
);

interface AuthState {
  isConnected: boolean;
  loading: boolean;
  error: string | null;
  userData: any | null;
}

const initialState: AuthState = {
  isConnected: false,
  loading: false,
  error: null,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setUserIsConnected(state, action: PayloadAction<boolean>) {
      state.isConnected = action.payload;
    },
    setUserData(state, action: PayloadAction<any>) {
      state.userData = { ...state.userData, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.isConnected = action.payload.isConnected;
        state.userData = action.payload.userData;
      })
      .addCase(initializeAuth.rejected, (state, action) => {
        state.isConnected = false;
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setIsLoading, setUserIsConnected, setUserData } =
  authSlice.actions;
export default authSlice.reducer;
