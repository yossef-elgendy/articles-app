import {
    SET_PROFILE_TOKEN,
    SAVE_CUSTOMER_SUCCESS,
    SAVE_CUSTOMER_FAILURE ,
    LOGOUT_CUSTOMER_SUCCESS,
    LOGOUT_CUSTOMER_FAILURE,
    FETCH_DATA_REQUEST,
    UPDATE_USER_FAILURE,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS
  } from './actions';

const initialState = {
  profileToken: null,
  savedCustomer: null,
  customerErrors: [],
  loading: false
};

const accountsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_REQUEST:
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        loading: true, // Set loading state to true when the request is made
      };
    case SET_PROFILE_TOKEN:
      return {
        ...state,
        profileToken: action.payload,
        loading: false
      };
    case SAVE_CUSTOMER_SUCCESS:
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        savedCustomer: action.payload,
        customerErrors: [],
        loading: false
      };
    case SAVE_CUSTOMER_FAILURE:
    case UPDATE_USER_FAILURE:
    case LOGOUT_CUSTOMER_FAILURE:
      return {
        ...state,
        customerErrors: [action.payload],
        savedCustomer: null,
        profileToken: null,
        loading: false
      };
    case LOGOUT_CUSTOMER_SUCCESS:
      return {
        ...state,
        savedCustomer: null,
        profileToken: null,
        loading: false
      };
    default:
      return state;
  }
};

export default accountsReducer;
