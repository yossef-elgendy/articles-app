import axios from 'axios';
import { addNotification } from '../notifications/actions';

// Action Types
export const FETCH_ARTICLES_REQUEST = 'FETCH_ARTICLES_REQUEST';
export const FETCH_ARTICLES_SUCCESS = 'FETCH_ARTICLES_SUCCESS';
export const FETCH_ARTICLES_FAILURE = 'FETCH_ARTICLES_FAILURE';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchArticles = (apiType, searchQuery) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_ARTICLES_REQUEST }); // Dispatch the loading action

    try {
      const response = await axios.get(
        `${API_URL}/${apiType}/articles?q=${searchQuery}`
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
      dispatch(addNotification({
        id: Math.floor(Math.random() * 100),
        message: 'Failed to fetch articles.',
        type: 'danger'
      }));
    }
  };
};
