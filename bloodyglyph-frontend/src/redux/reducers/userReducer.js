import { GET_ME_SUCCESS, GET_ME_ERROR } from "../actions/UserActions";
import { LOGOUT } from "../actions/AuthActions";

const initialState = {
  currentUser: null,
  error: null,
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
        error: null,
      };

    default:
      return state;
  }
}

export default UserReducer;
