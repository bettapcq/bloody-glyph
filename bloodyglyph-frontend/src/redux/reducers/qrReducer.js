import {
  GET_QR_ERROR,
  GET_QR_LOADING,
  GET_QR_SUCCESS,
} from "../actions/qrActions";

const initialState = {
  qrCodes: [],
  loading: false,
  error: null,
};

const qrReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_QR_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_QR_SUCCESS:
      return {
        ...state,
        qrCodes: action.payload,
        loading: false,
        error: null,
      };

    case GET_QR_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default qrReducer;
