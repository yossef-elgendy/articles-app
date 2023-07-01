import { useState } from 'react';
import { useSelector } from 'react-redux';

/**
 * Custom hook for handling catalog parameters.
 * @returns {Object} Object containing the catalog parameters and event handlers.
 */
const useCatalogParams = () => {
  const { savedCustomer } = useSelector((state) => state.user);

  const [selectedAPI, setSelectedAPI] = useState('TG');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  /**
   * Event handler for selecting the API.
   * @param {Object} event - The event object.
   */
  const handleSelectAPI = (event) => {
    setSelectedAPI(event.target.value);
    setCurrentPage(0);
  };

  /**
   * Event handler for updating the search query.
   * @param {Object} event - The event object.
   */
  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  /**
   * Event handler for changing the current page.
   * @param {number} newPage - The new page number.
   */
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return {
    selectedAPI,
    searchQuery,
    currentPage,
    handleSelectAPI,
    handleSearchQueryChange,
    handlePageChange,
    savedCustomer,
  };
};

export default useCatalogParams;
