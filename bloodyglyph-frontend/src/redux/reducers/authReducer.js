import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGIN_LOADING,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  REGISTER_LOADING,
  CLEAR_AUTH_ERROR,
  LOGOUT,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
} from "../actions/authActions";

const initialState = {
  token: localStorage.getItem("token"),
  userLogged: null,
  isLogged: !!localStorage.getItem("token"),
  error: null,
  message: null,
  loading: false,
};

function AuthReducer(state = initialState, action) {
  switch (action.type) {
    // LOGIN
    case LOGIN_LOADING:
      return {
        ...state,
        error: null,
        loading: true,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        userLogged: action.payload.user,
        isLogged: true,
        error: null,
        loading: false,
      };

    case LOGIN_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    // REGISTER

    case REGISTER_LOADING:
      return {
        ...state,
        error: null,
        loading: true,
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        userLogged: action.payload,
        error: null,
        loading: false,
      };

    case REGISTER_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    // CLEAR

    case CLEAR_AUTH_ERROR:
      return {
        ...state,
        error: null,
      };

    // LOGOUT

    case LOGOUT:
      return {
        ...state,
        token: null,
        isLogged: false,
        userLogged: null,
        error: null,
        message: null,
      };

    // RESET PASSWORD

    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        error: null,
      };

    case RESET_PASSWORD_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
}
export default AuthReducer;
