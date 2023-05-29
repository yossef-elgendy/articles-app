import axios from 'axios';

// Action Types
export const FETCH_ARTICLES_REQUEST = 'FETCH_ARTICLES_REQUEST';
export const FETCH_ARTICLES_SUCCESS = 'FETCH_ARTICLES_SUCCESS';
export const FETCH_ARTICLES_FAILURE = 'FETCH_ARTICLES_FAILURE';

export const fetchArticles = (apiType, searchQuery) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_ARTICLES_REQUEST }); // Dispatch the loading action

    try {
      const response = await axios.get(
        `https://api.example.com/${apiType}/articles?q=${searchQuery}`
      );

      dispatch({
        type: FETCH_ARTICLES_SUCCESS,
        payload: response.data.articles,
      });
    } catch (error) {
      dispatch({
        type: FETCH_ARTICLES_FAILURE,
        payload: error.message,
      });
    }
  };
};
