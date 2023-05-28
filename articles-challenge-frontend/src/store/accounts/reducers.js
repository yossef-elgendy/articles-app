import {
    SET_PROFILE_TOKEN,
    SAVE_CUSTOMER_SUCCESS,
    SAVE_CUSTOMER_FAILURE ,
    LOGOUT_CUSTOMER_SUCCESS,
    LOGOUT_CUSTOMER_FAILURE,
    FETCH_DATA_REQUEST
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
      return {
        ...state,
        savedCustomer: action.payload,
        customerErrors: [],
        loading: false
      };
    case SAVE_CUSTOMER_FAILURE:
      return {
        ...state,
        savedCustomer: null,
        customerErrors: [action.payload],
        loading: false
      };
    case LOGOUT_CUSTOMER_SUCCESS:
      return {
        ...state,
        savedCustomer: null,
        profileToken: null,
        loading: false
      };
    case LOGOUT_CUSTOMER_FAILURE:
      return {
        ...state,
        savedCustomer: null,
        profileToken: null,
        customerErrors: [action.payload],
        loading: false
      }
    default:
      return state;
  }
};

export default accountsReducer;
