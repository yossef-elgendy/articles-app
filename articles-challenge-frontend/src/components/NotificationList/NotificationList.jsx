import { useDispatch, useSelector } from 'react-redux';
import Notification from '../Notification/Notification';
import { removeNotification } from '../../store/notifications/actions';
import './NotificationList.css';

const NotificationList = () => {
  const notifications = useSelector(state => state.notifications);
  const dispatch = useDispatch();

  const handleRemoveNotification = (id) => {
    dispatch(removeNotification(id));
  }

  return (
    <div className="notification-list">
      {notifications.map(notification => (
        <Notification
          key={ notification.id }
          type={ notification.type }
          message={ notification.message }
          removeNotification={ handleRemoveNotification }
          id={ notification.id }
        />
      ))}
    </div>
  );
};

export default NotificationList;
