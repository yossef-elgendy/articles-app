import { addNotification } from '../notifications/actions';

/**
 * Action Types
 */
export const SET_PROFILE_TOKEN = 'SET_PROFILE_TOKEN';
export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';

/**
 * API URLs
 */
const API_URL = import.meta.env.VITE_API_URL;
const API_UPDATE = import.meta.env.VITE_UPDATE_API;

/**
 * Action: Update User
 * Updates the user profile data.
 *
 * @param {string} token - User's authentication token.
 * @param {object} userData - Updated user data.
 * @returns {Function} Thunk function that dispatches the action.
 */
export const updateUser = (token, userData) => {
  return async (dispatch) => {
    dispatch(updateUserRequest());

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const config = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(userData)
      };

      const response = await fetch(`${API_URL}${API_UPDATE}`, config);

      if (!response.ok) {
        throw new Error('Failed to update user profile');
      }

      const { user } = await response.json();

      dispatch(updateUserSuccess(user));
      dispatch(addNotification({
        id: Math.floor(Math.random() * 100),
        message: 'User profile updated successfully.',
        type: 'success'
      }));
    } catch (error) {
      dispatch(updateUserFailure(error.message));
      dispatch(addNotification({
        id: Math.floor(Math.random() * 100),
        message: 'Failed to update user profile.',
        type: 'danger'
      }));
    }
  };
};

/**
 * Action: Set Profile Token
 * Sets the user's profile token.
 *
 * @param {string} token - User's authentication token.
 * @returns {object} Action object.
 */
export const setProfileToken = (token) => ({
  type: SET_PROFILE_TOKEN,
  payload: token
});

/**
 * Action: Update User Request
 * Signals that a user update request is in progress.
 *
 * @returns {object} Action object.
 */
export const updateUserRequest = () => ({
  type: UPDATE_USER_REQUEST,
});

/**
 * Action: Update User Success
 * Signals that the user update request was successful.
 *
 * @param {object} user - Updated user data.
 * @returns {object} Action object.
 */
export const updateUserSuccess = (user) => ({
  type: UPDATE_USER_SUCCESS,
  payload: user,
});

/**
 * Action: Update User Failure
 * Signals that the user update request failed.
 *
 * @param {string} error - Error message.
 * @returns {object} Action object.
 */
export const updateUserFailure = (error) => ({
  type: UPDATE_USER_FAILURE,
  payload: error,
});
