import { FETCH_ARTICLES_REQUEST, FETCH_ARTICLES_FAILURE, FETCH_ARTICLES_SUCCESS } from "./actions";

// Initial State
const initialState = {
  articles: [],
  loading: false,
  error: null,
};

// Reducer
const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ARTICLES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_ARTICLES_SUCCESS:
      return {
        ...state,
        articles: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_ARTICLES_FAILURE:
      return {
        ...state,
        articles: [],
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default articleReducer;

