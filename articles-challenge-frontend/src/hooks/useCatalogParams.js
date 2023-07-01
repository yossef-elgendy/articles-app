import { useState } from 'react';
import { useSelector } from 'react-redux';

const useCatalogParams = () => {
  const { savedCustomer } = useSelector((state) => state.user);
  const [selectedAPI, setSelectedAPI] = useState('TG');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  const handleSelectAPI = (event) => {
    setSelectedAPI(event.target.value);
    setCurrentPage(0);
  };

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

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
