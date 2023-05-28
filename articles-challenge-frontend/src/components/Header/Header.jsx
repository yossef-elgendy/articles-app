import './Header.css'; // Import the CSS file for styling
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
        <nav className="nav">
            <div className="logo">Your Logo</div>
            <ul className="menu">
                <li><Link to="/">Home</Link></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Services</a></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
            <Link className="cta-btn" to="/register">Get Started</Link>
        </nav>
    </header>
  );
};

export default Header;
