import {
  GET_CATEGORY_ERROR,
  GET_CATEGORY_LOADING,
  GET_CATEGORY_SUCCESS,
} from "../actions/categoryActions";

const initialState = {
  categories: [],
  loading: false,
  error: null,
};

function CategoryReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORY_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: action.payload,
        loading: false,
        error: null,
      };

    case GET_CATEGORY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

export default CategoryReducer;
