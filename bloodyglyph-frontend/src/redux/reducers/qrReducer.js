import {
  GET_QR_ERROR,
  GET_QR_LOADING,
  GET_QR_SUCCESS,
  CREATE_QR_LOADING,
  CREATE_QR_SUCCESS,
  CREATE_QR_ERROR,
  GET_QR_BY_ID_LOADING,
  GET_QR_BY_ID_SUCCESS,
  GET_QR_BY_ID_ERROR,
  UPDATE_QR_LOADING,
  UPDATE_QR_SUCCESS,
  UPDATE_QR_ERROR,
} from "../actions/qrActions";

const initialState = {
  qrCodes: [],
  selectedQrCode: null,
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

    case CREATE_QR_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case CREATE_QR_SUCCESS:
      return {
        ...state,
        qrCodes: [...state.qrCodes, action.payload],
        loading: false,
        error: null,
      };

    case CREATE_QR_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case GET_QR_BY_ID_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_QR_BY_ID_SUCCESS:
      return {
        ...state,
        selectedQrCode: action.payload,
        loading: false,
        error: null,
      };

    case GET_QR_BY_ID_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_QR_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case UPDATE_QR_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedQrCode: action.payload,
      };

    case UPDATE_QR_ERROR:
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
