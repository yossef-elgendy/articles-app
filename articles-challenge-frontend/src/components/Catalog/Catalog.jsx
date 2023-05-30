import PropTypes from 'prop-types';
import './Catalog.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Catalog = ({ articles, currentPage, totalPages = 0, onPageChange }) => {
  return (
    <div className='catalog-container'>
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
      <div className="pagination-container">
        {totalPages > 1 && (
            <>
              <div className="pagination">
                <button
                  className="pagination-button"
                  disabled={currentPage === 0}
                  onClick={() => onPageChange(currentPage - 1)}
                >
                  <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <button
                  className="pagination-button"
                  disabled={currentPage + 1 === totalPages}
                  onClick={() => onPageChange(currentPage + 1)}
                >
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
              </div>
              <div className='page-count'>
                { `${currentPage + 1} / ${totalPages}` }
              </div>
            </>
          )}
      </div>
    </div>
  );
};

Catalog.propTypes = {
  articles: PropTypes.array,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  onPageChange: PropTypes.func,
};

export default Catalog;
