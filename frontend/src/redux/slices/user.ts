import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { login } from "../../api/userApi";
import type { loginBodyData, returnedLoginData } from "../../api/userApi";

export const loginUser = createAsyncThunk<returnedLoginData, loginBodyData>(
  "user/loginUser",
  login,
);

type userInitState = {
  username: string | null;
  token: string | null;
  isLoginSuccessful: boolean | null;
};

const initialState: userInitState = {
  username: null,
  token: null,
  isLoginSuccessful: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<returnedLoginData>) => {
          const { username, token } = action.payload;
          state.username = username;
          state.token = token;
          state.isLoginSuccessful = true;
        },
      )
      .addCase(loginUser.pending, (state) => {
        state.username = null;
        state.token = null;
        state.isLoginSuccessful = null;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoginSuccessful = false;
      });
  },
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
