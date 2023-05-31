/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import Catalog from '../../components/Catalog/Catalog';
import './CatalogPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles } from '../../store/articles/actions';
import Loader from '../../components/Loader/Loader'

const CatalogPage = () => {
  const [apiOptions] = useState([
    { label: 'The Guardians Api', value: 'TG' },
    { label: 'NewsApi', value: 'NewsApi' },
    { label: 'New york times Api', value: 'NytApi' }
  ]);

  const { loading, articles: { data, totalPages } } = useSelector((state) => state.articles);
  const {
    savedCustomer
  } = useSelector((state) => state.user);
  const [selectedAPI, setSelectedAPI] = useState('TG');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrPage] = useState(0);
  const dispatch = useDispatch();

  const handleSelectAPI = (event) => {
    setSelectedAPI(event.target.value);
    setCurrPage(0);
  };

  const handleSearchArticles = () => {
    if (selectedAPI) {
      let queryParams = {
        q: searchQuery,
        page: currentPage
      };

      if (savedCustomer) {
        queryParams['sources'] = savedCustomer.sources;
        queryParams['categories'] = savedCustomer.categories;
        queryParams['authors'] = savedCustomer.authors;
      }

      dispatch(fetchArticles(selectedAPI, queryParams));
    }
  };

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    let queryParams = {
      q: searchQuery,
      page: currentPage
    };

    if (savedCustomer) {
      queryParams['sources'] = savedCustomer.sources;
      queryParams['categories'] = savedCustomer.categories;
      queryParams['authors'] = savedCustomer.authors;
    }


    dispatch(fetchArticles(selectedAPI, queryParams));
  }, [selectedAPI, currentPage, dispatch]);

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
      { (loading)
        ? <Loader />
        : <Catalog
            articles={ data }
            totalPages={ totalPages }
            currentPage={ currentPage }
            onPageChange={ setCurrPage }
          />
      }
    </div>
  );
};

export default CatalogPage;
