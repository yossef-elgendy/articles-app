import { useState, useEffect } from 'react';
import axios from 'axios';
import Catalog from '../../components/Catalog/Catalog';
import './CatalogPage.css';
import { useSelector } from 'react-redux';

const CatalogPage = () => {
  const [apiOptions] = useState([
    { label: 'NewsApi', value: 'NewsApi' },
    { label: 'New york times Api', value: 'NytApi' }
    // Add more API options as needed
  ]);
  const { loading } = useSelector(state => state.user);
  const [selectedAPI, setSelectedAPI] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState([]);

  const handleSelectAPI = (event) => {
    setSelectedAPI(event.target.value);
  };

  const handleSearchArticles = () => {

  };

  const handleSearchQuery = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        if (selectedAPI && searchQuery) {
          const response = await axios.get(
            `https://api.example.com/${selectedAPI}/articles?q=${searchQuery}`
          );
          setArticles(response.data.articles);
        } else {
          setArticles([]);
        }
      } catch (error) {
        console.log('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, [selectedAPI, searchQuery]);

  return (
    <div className="catalog-page">
      <div className="select-api">
        <select
          id="api-select"
          className="api-select"
          value={selectedAPI}
          onChange={handleSelectAPI}
        >
          <option value="">Select an API</option>
          {apiOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="search-bar">
        <input
          id="search-input"
          className="search-input"
          type="text"
          value={searchQuery}
          onChange={handleSearchQuery}
          placeholder="Search..."
        />
        <button onClick={ handleSearchArticles } disabled={ loading }>
            Search
        </button>
      </div>
      <Catalog articles={articles} />
    </div>
  );
};

export default CatalogPage;
