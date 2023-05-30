import './Features.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper, faCheckCircle, faStar } from '@fortawesome/free-solid-svg-icons';

const Features = () => {
  return (
    <section className="features">
      <div className="feature">
        <div className="icon">
          <FontAwesomeIcon icon={faNewspaper} />
        </div>
        <h2 className="feature-title">Latest Articles</h2>
        <p className="feature-description">Stay updated with the latest news and articles from various sources.</p>
      </div>
      <div className="feature">
        <div className="icon">
          <FontAwesomeIcon icon={faCheckCircle} />
        </div>
        <h2 className="feature-title">Personalized Feed</h2>
        <p className="feature-description">Receive a personalized feed based on your interests and preferences.</p>
      </div>
      <div className="feature">
        <div className="icon">
          <FontAwesomeIcon icon={faStar} />
        </div>
        <h2 className="feature-title">Curated Recommendations</h2>
        <p className="feature-description">(Future Work) Discover trending and recommended articles tailored just for you.</p>
      </div>
    </section>
  );
};

export default Features;
