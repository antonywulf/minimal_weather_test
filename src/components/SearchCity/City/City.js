import React from 'react';

import styles from './City.module.css';

const City = ({ name, country, deg, addCityIdToList }) => {
  const onClickHandler = () => {
    addCityIdToList();
  };

  return (
    <div onClick={onClickHandler} className={`${styles.City}`}>
      <p className={`${styles.CityName}`}>
        {name}, {country}
      </p>
      <p className={`${styles.CityTemp}`}>{deg.toFixed()} &deg;C</p>
    </div>
  );
};

export default City;
