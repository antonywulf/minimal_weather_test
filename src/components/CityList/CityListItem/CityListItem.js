import React from 'react';

import deleteIcon from './delete.svg';
import styles from './CityListItem.module.css';

const CityListItem = ({ name, country, deg, id, addCurrentCityWeather, deleteCityIdFromList }) => {
  const onItemClickHandler = e => {
    addCurrentCityWeather(e.currentTarget.id);
  };

  const onDeleteClickHandler = e => {
    deleteCityIdFromList(e.currentTarget.id);
  };

  return (
    <div id={id} onClick={onItemClickHandler} className={`${styles.CityListItem}`}>
      <img id={id} onClick={onDeleteClickHandler} src={deleteIcon} alt="delete" />
      <p className={`${styles.CityListItemName}`}>
        {name}, {country}
      </p>
      <p className={`${styles.CityListItemTemp}`}>{deg.toFixed()} &deg;C</p>
    </div>
  );
};

export default CityListItem;
