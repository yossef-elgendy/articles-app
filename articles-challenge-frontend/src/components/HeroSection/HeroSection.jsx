import './HeroSection.css'; // Import the CSS file for styling

const HeroSection = () => {
  return (
    <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Our Website</h1>
          <p className="hero-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <button className="hero-cta-btn">Learn More</button>
        </div>
    </section>
  );
};

export default HeroSection;
