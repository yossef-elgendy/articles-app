import axios from 'axios';

export const SET_PROFILE_TOKEN = 'SET_PROFILE_TOKEN';
export const SAVE_CUSTOMER_SUCCESS = 'SAVE_CUSTOMER_SUCCESS';
export const SAVE_CUSTOMER_FAILURE = 'SAVE_CUSTOMER_FAILURE';
const API_URL = import.meta.env.VITE_API_URL;
const API_REGISTER = import.meta.env.VITE_REGISTER_API;
const API_LOGIN = import.meta.env.VITE_LOGIN_API;

export const saveCustomer = (customerData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${API_URL}${API_REGISTER}`, customerData);
      // Assuming the response contains the saved customer data + token + and if there was any error in validation found
      const { data: { user, access_token, errors } } = response.data;

      console.log(response.data);
      if (errors) {
        dispatch(saveCustomerFailure(errors));
        return
      }

      dispatch(saveCustomerSuccess(user));
      dispatch(setProfileToken(access_token));
    } catch (error) {
      // Handle any error that occurred during the API call
      dispatch(saveCustomerFailure(error.message));
      return {
        error: error.message,
      }
    }
  };
};

export const loginCustomer = (formData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${API_URL}${API_LOGIN}`, formData);
      const { user, access_token } = response.data;

      dispatch(saveCustomerSuccess(user));
      dispatch(setProfileToken(access_token));
      return { payload: { user, access_token } };
    } catch (error) {
      dispatch(saveCustomerFailure(error.message));
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
