export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';

/**
 * Action creator for adding a notification.
 * @param {object} notification - The notification to add.
 * @returns {object} The action object.
 */
export const addNotification = notification => ({
  type: ADD_NOTIFICATION,
  payload: notification
});

/**
 * Action creator for removing a notification.
 * @param {number} id - The ID of the notification to remove.
 * @returns {object} The action object.
 */
export const removeNotification = id => ({
  type: REMOVE_NOTIFICATION,
  payload: id
});
