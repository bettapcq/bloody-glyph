import {
  GET_ME_SUCCESS,
  GET_ME_ERROR,
  UPDATE_PRIVACY_SETTINGS_LOADING,
  UPDATE_PRIVACY_SETTINGS_SUCCESS,
  UPDATE_PRIVACY_SETTINGS_ERROR,
  CLEAR_USER_ERROR,
  DELETE_USER_LOADING,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR,
} from "../actions/userActions";
import { LOGOUT } from "../actions/authActions";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

function UserReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ME_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null,
      };

    case GET_ME_ERROR:
      return {
        ...state,
        currentUser: null,
        error: action.payload,
      };

    case LOGOUT:
      return {
        ...state,
        currentUser: null,
        loading: false,
        error: null,
      };

    case UPDATE_PRIVACY_SETTINGS_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case UPDATE_PRIVACY_SETTINGS_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        loading: false,
        error: null,
      };

    case UPDATE_PRIVACY_SETTINGS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_USER_ERROR:
      return {
        ...state,
        error: null,
      };

    case DELETE_USER_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        currentUser: null,
        loading: false,
        error: null,
      };

    case DELETE_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

export default UserReducer;
