import React from 'react';

const CountryListItem = ({ country }) => {
  return (
    <div className='country-card'>
      <div className='country-content'>
        <div className='country-icon'>
          <img
            src={country.flag}
            alt={`${country.name} flag`}
            className='icon-placeholder'
          />
        </div>
        <div className='country-info'>
          <h3 className='country-name'>{country.name}</h3>
          <p className='country-region'>{country.region}</p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CountryListItem);
