import React, { useEffect, useState, useMemo } from 'react';
import CountryListItem from './CountryListItem';
import { useSelector } from 'react-redux';

const CountryListPaginate = ({ pageSize = 10, isApiPending = false }) => {
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const allCountries = useSelector((state) => state.dashboard.countryList);

  const visibleCountries = useMemo(
    () => allCountries.slice(0, visibleCount),
    [allCountries, visibleCount]
  );

  // Reset visible count when new data is loaded (tab change)
  useEffect(() => {
    if (!isApiPending) {
      setVisibleCount(pageSize);
    }
  }, [allCountries, pageSize, isApiPending]);

  const handleLoadMore = () => {
    setIsLoadingMore(true);

    // Simulate some processing time for the load more action
    setTimeout(() => {
      setVisibleCount((prev) => prev + pageSize);
      setIsLoadingMore(false);
    }, 300);
  };

  return (
    <div
      style={{
        opacity: isApiPending || isLoadingMore ? 0.5 : 1,
        transition: 'opacity 0.3s ease-in-out',
        pointerEvents: isApiPending ? 'none' : 'auto'
      }}
    >
      <div className='countries-grid'>
        {visibleCountries.map((country, index) => (
          <CountryListItem key={`${country.name}-${index}`} country={country} />
        ))}
      </div>

      {visibleCount < allCountries.length && (
        <div className='load-more-section'>
          <button
            className='load-more-btn'
            type='button'
            onClick={handleLoadMore}
            disabled={isApiPending || isLoadingMore}
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
};

export default CountryListPaginate;
