import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles } from '../store/articles/actions';

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
        queryParams['sources'] = savedCustomer.sources;
        queryParams['categories'] = savedCustomer.categories;
        queryParams['authors'] = savedCustomer.authors;
      }

      setLoading(true);

      dispatch(fetchArticles(selectedAPI, queryParams))
        .finally(() => setLoading(false));
    }, [selectedAPI, searchQuery, currentPage, savedCustomer, dispatch]);

    return { loading, data, totalPages };
};

export default useFetchArticles