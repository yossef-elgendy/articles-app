import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import './Cta.css'

const Cta = () => {
  const token = useSelector(state => state.user.profileToken);

  return (
    <div className="cta-container">
      <div className="cta-overlay"></div>
      <div className="cta-content">
        <h2 className="cta-title">Join Our Community</h2>
        <p className="cta-description">Sign up today to receive exclusive offers and updates.</p>
        <Link className="cta-btn" to={ token ? '/articles' : '/register' } >
          Get Started <FontAwesomeIcon icon={faPaperPlane} className="btn-icon" />
        </Link>
      </div>
    </div>
  );
};

export default Cta;
