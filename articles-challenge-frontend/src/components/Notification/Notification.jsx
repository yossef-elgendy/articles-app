import PropTypes from 'prop-types';
import './Notification.css';

const Notification = ({ id, type, message, removeNotification }) => {
  let className = 'notification';

  switch (type) {
    case 'danger':
      className += ' notification-danger';
      break;
    case 'info':
      className += ' notification-info';
      break;
    case 'success':
      className += ' notification-success';
      break;
    default:
      break;
  }

  const handleRemove = () => {
    removeNotification(id);
  };

  return (
    <div className={className}>
      <span className='notification-content'>
        {message}
      </span>
      <button className={ `close-button ${type}` } onClick={ handleRemove }>
        &times;
      </button>
    </div>
  );
};

Notification.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  removeNotification: PropTypes.func.isRequired
};

export default Notification;
