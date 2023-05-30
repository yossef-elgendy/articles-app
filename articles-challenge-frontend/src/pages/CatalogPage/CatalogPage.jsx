/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import Catalog from '../../components/Catalog/Catalog';
import './CatalogPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles } from '../../store/articles/actions';

const CatalogPage = () => {
  const [apiOptions] = useState([
    { label: 'NewsApi', value: 'NewsApi' },
    { label: 'New york times Api', value: 'NytApi' }
  ]);

  const { loading, articles } = useSelector((state) => state.articles);
  const [selectedAPI, setSelectedAPI] = useState('NewsApi');
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();

  const handleSelectAPI = (event) => {
    setSelectedAPI(event.target.value);
  };

  const handleSearchArticles = () => {
    if (selectedAPI) {
      dispatch(fetchArticles(selectedAPI, searchQuery));
    }
  };

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    dispatch(fetchArticles(selectedAPI, searchQuery));
  }, [selectedAPI, dispatch]);

  return (
    <div className="catalog-page">
      <div className="select-api">
        <select
          id="api-select"
          className="api-select"
          value={ selectedAPI }
          onChange={ handleSelectAPI }
        >
          {apiOptions.map((option) => (
            <option key={ option.value } value={ option.value }>
              { option.label }
            </option>
          ))}
        </select>
      </div>
      <div className="search-bar">
        <input
          id="search-input"
          className="search-input"
          type="text"
          value={ searchQuery }
          onChange={ handleSearchQueryChange }
          placeholder="Search..."
        />
        <button onClick={ handleSearchArticles } disabled={ loading }>
          { loading ? '...Loading' : 'Search' }
        </button>
      </div>
      <Catalog articles={ articles } />
    </div>
  );
};

export default CatalogPage;
