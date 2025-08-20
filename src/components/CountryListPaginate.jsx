import React, { useEffect, useState, useMemo } from 'react';
import CountryListItem from './CountryListItem';
import { useSelector } from 'react-redux';

const CountryListPaginate = ({ pageSize = 10 }) => {
	const [visibleCount, setVisibleCount] = useState(pageSize);
	const allCountries = useSelector((state) => state.dashboard.countryList);

	const visibleCountries = useMemo(
		() => allCountries.slice(0, visibleCount),
		[allCountries, visibleCount]
	);

	const handleLoadMore = () => {
		setVisibleCount((prev) => prev + pageSize);
	};

	return (
		<>
			<div className='countries-grid'>
				{visibleCountries.map((country, index) => (
					<CountryListItem key={index} country={country} />
				))}
			</div>

			{visibleCount < allCountries.length && (
				<div className='load-more-section'>
					<button
						className='load-more-btn'
						type='button'
						onClick={handleLoadMore}
					>
						Load more
					</button>
				</div>
			)}
		</>
	);
};

export default CountryListPaginate;
