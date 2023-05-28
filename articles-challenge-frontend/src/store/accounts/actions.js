import axios from 'axios';
import { addNotification } from '../notifications/actions';

export const SET_PROFILE_TOKEN = 'SET_PROFILE_TOKEN';
export const SAVE_CUSTOMER_SUCCESS = 'SAVE_CUSTOMER_SUCCESS';
export const SAVE_CUSTOMER_FAILURE = 'SAVE_CUSTOMER_FAILURE';
export const LOGOUT_CUSTOMER_SUCCESS = 'LOGOUT_CUSTOMER_SUCCESS';
export const LOGOUT_CUSTOMER_FAILURE = 'LOGOUT_CUSTOMER_FAILURE';
export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';

const API_URL = import.meta.env.VITE_API_URL;
const API_REGISTER = import.meta.env.VITE_REGISTER_API;
const API_LOGIN = import.meta.env.VITE_LOGIN_API;
const API_LOGOUT = import.meta.env.VITE_LOGOUT_API

export const updateUser = (userId, userData) => {
  return async (dispatch) => {
    dispatch(updateUserRequest());

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await axios.put(`/api/users/${userId}`, userData);
      const updatedUser = response.data;

      dispatch(updateUserSuccess(updatedUser));
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

      throw error;
    }
  };
};

export const setProfileToken = (token) => ({
  type: SET_PROFILE_TOKEN,
  payload: token
});

export const saveCustomerSuccess = (customer) => ({
  type: SAVE_CUSTOMER_SUCCESS,
  payload: customer
});

export const saveCustomerFailure = (error) => ({
  type: SAVE_CUSTOMER_FAILURE,
  payload: error
});

export const logoutCustomerSuccess = () => ({
  type: LOGOUT_CUSTOMER_SUCCESS
});

export const logoutCustomerFailure = (error) => ({
  type: LOGOUT_CUSTOMER_FAILURE,
  payload: error
});

export const updateUserRequest = () => ({
  type: UPDATE_USER_REQUEST,
});

export const updateUserSuccess = (user) => ({
  type: UPDATE_USER_SUCCESS,
  payload: user,
});

export const updateUserFailure = (error) => ({
  type: UPDATE_USER_FAILURE,
  payload: error,
});
