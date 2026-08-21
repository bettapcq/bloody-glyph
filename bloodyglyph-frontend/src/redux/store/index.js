import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../reducers/AuthReducer";
import UserReducer from "../reducers/userReducer";

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    users: UserReducer,
  },
});

export default store;
