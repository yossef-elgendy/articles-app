import {
  SET_PROFILE_TOKEN,
  SAVE_CUSTOMER_SUCCESS,
  SAVE_CUSTOMER_FAILURE,
  LOGOUT_CUSTOMER_SUCCESS,
  LOGOUT_CUSTOMER_FAILURE,
  FETCH_DATA_REQUEST,
  UPDATE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS
} from './actions';

/**
 * Initial state for the accounts reducer.
 */
const initialState = {
  profileToken: null,
  savedCustomer: null,
  customerErrors: [],
  loading: false
};

/**
 * Reducer for handling accounts-related actions.
 * @param {object} state - The current state.
 * @param {object} action - The dispatched action.
 * @returns {object} The new state.
 */
const accountsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_REQUEST:
    case UPDATE_USER_REQUEST:
      // Update state to indicate that data or user update is being requested
      return {
        ...state,
        loading: true
      };
    case SET_PROFILE_TOKEN:
      // Update state with the profile token
      return {
        ...state,
        profileToken: action.payload,
        loading: false
      };
    case SAVE_CUSTOMER_SUCCESS:
    case UPDATE_USER_SUCCESS:
      // Update state with the saved customer data and reset errors
      return {
        ...state,
        savedCustomer: action.payload,
        customerErrors: [],
        loading: false
      };
    case SAVE_CUSTOMER_FAILURE:
    case UPDATE_USER_FAILURE:
    case LOGOUT_CUSTOMER_FAILURE:
      // Update state with customer errors and reset saved customer and profile token
      return {
        ...state,
        customerErrors: [action.payload],
        savedCustomer: null,
        profileToken: null,
        loading: false
      };
    case LOGOUT_CUSTOMER_SUCCESS:
      // Update state to indicate successful logout and reset saved customer and profile token
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
