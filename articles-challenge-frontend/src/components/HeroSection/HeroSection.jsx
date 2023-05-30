import { useSelector } from 'react-redux';
import './HeroSection.css';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const token = useSelector(state => state.user.profileToken);
  
  return (
    <section className="hero">
      <div className="hero-image"></div>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="hero-title">Stay Informed with Personalized News</h1>
        <p className="hero-description">
          Get the latest articles, breaking news, and personalized updates tailored just for you.
        </p>
        <Link className="hero-cta-btn" to={ token ? '/articles' : '/register' }>Get Started</Link>
      </div>
    </section>
  );
};

export default HeroSection;
