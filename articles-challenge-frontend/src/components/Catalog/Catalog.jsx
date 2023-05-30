import PropTypes from 'prop-types';
import './Catalog.css';

const Catalog = ({ articles }) => {
  return (
    <div className="catalog">
      {articles.map((article) => (
        <a href={article.url} target="_blank" rel="noopener noreferrer" key={article.id}>
          <div className="catalog-item">
            <h2>{article.title}</h2>
            <p>{article.description}</p>
          </div>
        </a>
      ))}
    </div>
  );
};

Catalog.propTypes = {
  articles: PropTypes.array,
};

export default Catalog;
