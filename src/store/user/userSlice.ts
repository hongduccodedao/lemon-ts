import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncActions";

interface IUserState {
  isLogged: boolean;
  token: string;
  isLoading: boolean;
  current: any;
}

const initialState: IUserState = {
  isLogged: false,
  token: "",
  isLoading: false,
  current: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    handleLoginRedux: (state, action) => {
      state.isLogged = action.payload.isLogged;
      state.token = action.payload.token;
    },
    handleLogoutRedux: (state) => {
      state.isLogged = false;
      state.token = "";
      state.current = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(actions.getCurrent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(actions.getCurrent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.current = action.payload;
        state.isLogged = true;
      })
      .addCase(actions.getCurrent.rejected, (state) => {
        state.isLoading = false;
        state.current = null;
        state.isLogged = false;
      });
  },
});

export const { handleLoginRedux, handleLogoutRedux } = userSlice.actions;
export default userSlice.reducer;
