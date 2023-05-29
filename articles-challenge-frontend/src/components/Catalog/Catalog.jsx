import './Catalog.css';
import PropTypes from 'prop-types';

const Catalog = ({ articles }) => {
  return (
    <div className="catalog">
      {articles.map((article) => (
        <div className="catalog-item" key={article.id}>
          <h2>{article.title}</h2>
          <p>{article.description}</p>
          <img src={article.image} alt={article.title} />
        </div>
      ))}
    </div>
  );
};

Catalog.propTypes = {
    articles: PropTypes.array,
};

export default Catalog;
