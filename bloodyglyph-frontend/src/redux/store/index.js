import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../reducers/authReducer";
import UserReducer from "../reducers/userReducer";
import qrReducer from "../reducers/qrReducer";
import cateroryReducer from "../reducers/categoryReducer";

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    users: UserReducer,
    qrCodes: qrReducer,
    categories: cateroryReducer,
  },
});

export default store;
