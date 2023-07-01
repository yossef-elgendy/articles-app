import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from "./actions";

const initialState = [];

/**
 * Reducer for managing notifications.
 * @param {array} state - The current state of notifications.
 * @param {object} action - The action object.
 * @returns {array} The new state of notifications.
 */
const notificationsReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_NOTIFICATION:
        return [...state, action.payload];
      case REMOVE_NOTIFICATION:
        return state.filter(notification => notification.id !== action.payload);
      default:
        return state;
    }
};

export default notificationsReducer;
