import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles } from '../store/articles/actions';

/**
 * Custom hook for fetching articles.
 * @param {Object} params - Parameters required for fetching articles.
 * @param {string} params.selectedAPI - The selected API value.
 * @param {string} params.searchQuery - The search query.
 * @param {number} params.currentPage - The current page number.
 * @param {Object} params.savedCustomer - The saved customer data.
 * @returns {Object} Object containing the loading state, fetched data, and total pages.
 */
const useFetchArticles = ({ selectedAPI, searchQuery, currentPage, savedCustomer }) => {
  const [loading, setLoading] = useState(false);
  const { articles: { data, totalPages } } = useSelector((state) => state.articles);
  const dispatch = useDispatch();

  useEffect(() => {
    let queryParams = {
      q: searchQuery,
      page: currentPage
    };

    if (savedCustomer) {
      queryParams.sources = savedCustomer.sources;
      queryParams.categories = savedCustomer.categories;
      queryParams.authors = savedCustomer.authors;
    }

    setLoading(true);

    dispatch(fetchArticles(selectedAPI, queryParams))
      .finally(() => setLoading(false));
  }, [selectedAPI, searchQuery, currentPage, savedCustomer, dispatch]);

  return { loading, data, totalPages };
};

export default useFetchArticles;
