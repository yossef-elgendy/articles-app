import axios from 'axios';
import { addNotification } from '../notifications/actions';

// Action Types
export const FETCH_ARTICLES_REQUEST = 'FETCH_ARTICLES_REQUEST';
export const FETCH_ARTICLES_SUCCESS = 'FETCH_ARTICLES_SUCCESS';
export const FETCH_ARTICLES_FAILURE = 'FETCH_ARTICLES_FAILURE';

const API_URL = import.meta.env.VITE_API_URL;
const API_ARTICLES = import.meta.env.VITE_ARTICLES_API;

export const fetchArticles = (apiType, queyParams) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_ARTICLES_REQUEST }); // Dispatch the loading action

    try {
      const response = await axios.get(
        `${API_URL}/api/${apiType}${API_ARTICLES}`,
        {
          params: queyParams
        }
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
