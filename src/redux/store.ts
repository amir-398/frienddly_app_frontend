import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./Slices/authSlice";
import bottomBarIsVisible from "./Slices/bottomBarIsVisible";
import chatSlice from "./Slices/chatSlice";
import loadingScreenSlice from "./Slices/loadingScreenSlice";
import signUpUserInfoSlice from "./Slices/signUpUserInfoSlice";
import userInfoSlice from "./Slices/userInfoSlice";

const store = configureStore({
  reducer: {
    userInfoSlice: userInfoSlice,
    signUpUserInfoSlice: signUpUserInfoSlice,
    authSlice: authSlice,
    loadingScreenSlice: loadingScreenSlice,
    bottomBarIsVisible: bottomBarIsVisible,
    chatSlice: chatSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
