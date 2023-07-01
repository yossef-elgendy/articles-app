import Catalog from '../../components/Catalog/Catalog';
import './CatalogPage.css';
import useFetchArticles from '../../hooks/useFetchArticles';
import useCatalogParams from '../../hooks/useCatalogParams';
import Loader from '../../components/Loader/Loader';

const CatalogPage = () => {
  const {
    selectedAPI,
    searchQuery,
    currentPage,
    handleSelectAPI,
    handleSearchQueryChange,
    handlePageChange,
    savedCustomer,
  } = useCatalogParams();

  const { loading, data, totalPages } = useFetchArticles({
    selectedAPI, searchQuery, currentPage, savedCustomer
  });

  return (
    <div className="catalog-page">
      <div className="select-api">
        <select
          id="api-select"
          className="api-select"
          value={selectedAPI}
          onChange={handleSelectAPI}
        >
          <option value="TG">The Guardians Api</option>
          <option value="NewsApi">NewsApi</option>
          <option value="NytApi">New York Times Api</option>
        </select>
      </div>
      <div className="search-bar">
        <input
          id="search-input"
          className="search-input"
          type="text"
          value={searchQuery}
          onChange={handleSearchQueryChange}
          placeholder="Search..."
        />
        <button onClick={() => handlePageChange(0)} disabled={loading}>
          {loading ? '...Loading' : 'Search'}
        </button>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <Catalog
          articles={data}
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default CatalogPage;
