import { useEffect } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutCustomer } from '../../store/accounts/actions';

const Header = () => {
  const token = useSelector(state => state.user.profileToken);
  const username = useSelector(state => state.user.savedCustomer?.username); // Access the username from the savedCustomer object
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const { message } = await dispatch(logoutCustomer(token));
    console.log(message);
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
          Your Logo
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
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/articles">
                Articles
              </Link>
            </li>
            {!token ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    My Profile
                  </Link>
                </li>
                <li className="nav-item" onClick={ handleLogout }>
                  <Link className="nav-link">Logout</Link>
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
