import axios from 'axios';
import { addNotification } from '../notifications/actions';
import { setProfileToken } from './userActions';

/**
 * Action Types
 */
export const SAVE_CUSTOMER_SUCCESS = 'SAVE_CUSTOMER_SUCCESS';
export const SAVE_CUSTOMER_FAILURE = 'SAVE_CUSTOMER_FAILURE';
export const LOGOUT_CUSTOMER_SUCCESS = 'LOGOUT_CUSTOMER_SUCCESS';
export const LOGOUT_CUSTOMER_FAILURE = 'LOGOUT_CUSTOMER_FAILURE';
export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';

/**
 * API URLs
 */
const API_URL = import.meta.env.VITE_API_URL;
const API_REGISTER = import.meta.env.VITE_REGISTER_API;
const API_LOGIN = import.meta.env.VITE_LOGIN_API;
const API_LOGOUT = import.meta.env.VITE_LOGOUT_API;

/**
 * Action: Logout Customer
 * Logs out the customer.
 *
 * @param {string} token - User's authentication token.
 * @returns {Function} Thunk function that dispatches the action.
 */
export const logoutCustomer = (token) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_DATA_REQUEST }); // Dispatch the loading action
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const { data: { message } } = await axios.post(`${API_URL}${API_LOGOUT}`, null, config);
      // Assuming the response contains logout success message or any other relevant data
      dispatch(logoutCustomerSuccess());
      dispatch(addNotification({
        id: Math.floor(Math.random() * 100),
        message,
        type: 'success'
      }));

      return {
        message
      };
    } catch (error) {
      dispatch(logoutCustomerFailure(error.message));
      dispatch(addNotification({
        id: Math.floor(Math.random() * 100),
        message: error.message,
        type: 'danger'
      }));

      throw error;
    }
  };
};

/**
 * Action: Save Customer
 * Saves customer data.
 *
 * @param {object} customerData - Customer data to be saved.
 * @returns {Function} Thunk function that dispatches the action.
 */
export const saveCustomer = (customerData) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_DATA_REQUEST }); // Dispatch the loading action
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const { data: { user, access_token } } = await axios.post(`${API_URL}${API_REGISTER}`, customerData);
      // Assuming the response contains the saved customer data + token

      dispatch(saveCustomerSuccess(user));
      dispatch(setProfileToken(access_token));
      dispatch(addNotification({
        id: Math.floor(Math.random() * 100),
        message: 'You have created an account successfully.',
        type: 'success'
      }));

      return { status: true, errors: {} };
    } catch (error) {
      const { response: { data: { errors = {} } = {} } = {} } = error;

      dispatch(saveCustomerFailure(errors));
      dispatch(addNotification({
        id: Math.floor(Math.random() * 100),
        message: 'Something went wrong please try again following the hints.',
        type: 'danger'
      }));

      return { status: false, errors };
    }
  };
};

/**
 * Action: Login Customer
 * Logs in the customer.
 *
 * @param {object} formData - Login form data.
 * @returns {Function} Thunk function that dispatches the action.
 */
export const loginCustomer = (formData) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_DATA_REQUEST }); // Dispatch the loading action
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await axios.post(`${API_URL}${API_LOGIN}`, formData);
      const { user, access_token } = response.data;

      dispatch(saveCustomerSuccess(user));
      dispatch(setProfileToken(access_token));
      dispatch(addNotification({
        id: Math.floor(Math.random() * 100),
        message: 'You have logged in successfully.',
        type: 'success'
      }));

      return { payload: { user, access_token } };
    } catch (error) {
      const { response: { data: { error: errorMessage = '' } = {} } = {} } = error;

      dispatch(saveCustomerFailure(errorMessage));
      dispatch(addNotification({
        id: Math.floor(Math.random() * 100),
        message: errorMessage,
        type: 'danger'
      }));

      return { error: errorMessage };
    }
  };
};

/**
 * Action: Logout Customer Success
 * Signals that the customer logout was successful.
 *
 * @returns {object} Action object.
 */
export const logoutCustomerSuccess = () => ({
  type: LOGOUT_CUSTOMER_SUCCESS,
});

/**
 * Action: Logout Customer Failure
 * Signals that the customer logout failed.
 *
 * @param {string} error - Error message.
 * @returns {object} Action object.
 */
export const logoutCustomerFailure = (error) => ({
  type: LOGOUT_CUSTOMER_FAILURE,
  payload: error,
});

/**
 * Action: Save Customer Success
 * Signals that saving the customer data was successful.
 *
 * @param {object} user - Saved user data.
 * @returns {object} Action object.
 */
export const saveCustomerSuccess = (user) => ({
  type: SAVE_CUSTOMER_SUCCESS,
  payload: user,
});

/**
 * Action: Save Customer Failure
 * Signals that saving the customer data failed.
 *
 * @param {object} errors - Error object containing field-specific errors.
 * @returns {object} Action object.
 */
export const saveCustomerFailure = (errors) => ({
  type: SAVE_CUSTOMER_FAILURE,
  payload: errors,
});
