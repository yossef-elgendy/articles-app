import axios from 'axios';
import { addNotification } from '../notifications/actions';

/**
 * Action Types
 */
export const FETCH_ARTICLES_REQUEST = 'FETCH_ARTICLES_REQUEST';
export const FETCH_ARTICLES_SUCCESS = 'FETCH_ARTICLES_SUCCESS';
export const FETCH_ARTICLES_FAILURE = 'FETCH_ARTICLES_FAILURE';

const API_URL = import.meta.env.VITE_API_URL;
const API_ARTICLES = import.meta.env.VITE_ARTICLES_API;

/**
 * Fetch articles from the API.
 * @param {string} apiType - The type of API to fetch articles from.
 * @param {object} queryParams - The query parameters for the API request.
 * @returns {function} A Redux thunk function.
 */
export const fetchArticles = (apiType, queryParams) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_ARTICLES_REQUEST }); // Dispatch the loading action

    try {
      // Send a GET request to fetch articles
      const response = await axios.get(
        `${API_URL}/api/${apiType}${API_ARTICLES}`,
        {
          params: queryParams
        }
      );

      // Dispatch the success action with the fetched articles
      dispatch({
        type: FETCH_ARTICLES_SUCCESS,
        payload: response.data.articles,
      });
    } catch (error) {
      // Dispatch the failure action with the error message
      dispatch({
        type: FETCH_ARTICLES_FAILURE,
        payload: error.message,
      });

      // Show a notification for the failure
      dispatch(addNotification({
        id: Math.floor(Math.random() * 100),
        message: 'Failed to fetch articles.',
        type: 'danger'
      }));
    }
  };
};
