import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutCustomer } from '../../store/accounts/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faHome, faFileAlt, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

const Header = () => {
  const token = useSelector(state => state.user.profileToken);
  const username = useSelector(state => state.user.savedCustomer?.username); // Access the username from the savedCustomer object
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutCustomer(token));
  }

  useEffect(() => {
    // Initialize Bootstrap navbar collapse functionality
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    navbarToggler.addEventListener('click', () => {
      navbarCollapse.classList.toggle('show');
    });
  }, []);

  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg navbar-light">
        <Link className="navbar-brand" to="/">
          <i className="fas fa-newspaper"></i>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <FontAwesomeIcon icon={faHome} color="#fff" className="logout-icon" />
                { ' ' }
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/articles">
                <FontAwesomeIcon icon={faFileAlt} color="#fff" className="my-icon" />
                { ' ' }
                Articles
              </Link>
            </li>
            {!token ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    <FontAwesomeIcon icon={faSignInAlt} color="#fff" className="logout-icon" />
                    { ' ' }
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    <FontAwesomeIcon icon={faUser} color="#fff" className="my-icon" />
                    { ' ' }
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    <FontAwesomeIcon icon={faUser} color="#fff" className="my-icon" />
                    { ' ' }
                    My Profile
                  </Link>
                </li>
                <li className="nav-item" onClick={ handleLogout }>
                  <Link className="nav-link">
                    <FontAwesomeIcon icon={faSignOutAlt} color="#fff" className="logout-icon" />
                    { ' ' }
                    Logout
                  </Link>
                </li>
              </>
            )}
          </ul>
          {token && (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <span className="nav-link">Welcome, { username }</span>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
