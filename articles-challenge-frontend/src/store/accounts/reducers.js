import { SET_PROFILE_TOKEN, SAVE_CUSTOMER_SUCCESS, SAVE_CUSTOMER_FAILURE } from './actions';

const initialState = {
  profileToken: null,
  savedCustomer: null,
  saveCustomerErrors: [] // Corrected property name
};

const accountsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROFILE_TOKEN:
      return {
        ...state,
        profileToken: action.payload
      };
    case SAVE_CUSTOMER_SUCCESS:
      return {
        ...state,
        savedCustomer: action.payload,
        saveCustomerErrors: [] // Corrected property name
      };
    case SAVE_CUSTOMER_FAILURE:
      return {
        ...state,
        savedCustomer: null,
        saveCustomerErrors: action.payload // Corrected property name
      };
    default:
      return state;
  }
};

export default accountsReducer;
