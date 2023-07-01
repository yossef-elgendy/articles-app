import {
  FETCH_ARTICLES_REQUEST,
  FETCH_ARTICLES_FAILURE,
  FETCH_ARTICLES_SUCCESS
} from "./actions";

/**
 * Initial state for the article reducer.
 */
const initialState = {
  articles: {
    data: [],
    totalPages: 0
  },
  loading: false,
  error: null
};

/**
 * Reducer for handling article-related actions.
 * @param {object} state - The current state.
 * @param {object} action - The dispatched action.
 * @returns {object} The new state.
 */
const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ARTICLES_REQUEST:
      // Update state to indicate that articles are being fetched
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_ARTICLES_SUCCESS:
      // Update state with fetched articles
      return {
        ...state,
        articles: action.payload,
        loading: false,
        error: null
      };
    case FETCH_ARTICLES_FAILURE:
      // Update state to indicate failure in fetching articles
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default articleReducer;
