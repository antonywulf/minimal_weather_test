import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ScrollToBottom from 'react-scroll-to-bottom';

import styles from './CityList.module.css';

import CityListItem from './CityListItem/CityListItem';
import {
  addCitiesToList,
  addCurrentCityWeather,
  deleteCityIdFromList,
  getCitiesWeatherByIDs,
} from '../../store/actions/cityActions';
import Loader from '../Loader/Loader';

const CityList = ({
  cityWeatherList,
  getCitiesWeatherByIDs,
  addCurrentCityWeather,
  cityIDsStr,
  isListLoading,
  deleteCityIdFromList,
  addCitiesToList,
  loadingListError,
}) => {
  useEffect(() => {
    if (cityIDsStr) {
      const cityIDsList = cityIDsStr.split(',');
      getCitiesWeatherByIDs(cityIDsList);
    } else {
      addCitiesToList([]);
    }
  }, [cityIDsStr, getCitiesWeatherByIDs, addCitiesToList]);

  const content = loadingListError ? (
    <p className={styles.WeatherError}>Something went wrong</p>
  ) : (
    <ScrollToBottom className={`${styles.CityListBox}`}>
      {cityWeatherList.map(city => (
        <CityListItem
          key={city.id}
          name={city.name}
          country={city.sys.country}
          deg={city.main.temp}
          id={city.id}
          addCurrentCityWeather={addCurrentCityWeather}
          deleteCityIdFromList={deleteCityIdFromList}
        />
      ))}
    </ScrollToBottom>
  );

  return (
    <div className={`${styles.CityList}`}>
      <h2 className={`${styles.CityListTitle}`}>City List</h2>
      {isListLoading ? (
        <div className={styles.LoaderList}>
          <Loader />
        </div>
      ) : (
        content
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  cityWeatherList: state.city.cityWeatherList,
  cityIDsStr: state.city.cityIDsStr,
  isListLoading: state.city.isListLoading,
  loadingListError: state.city.loadingListError,
});

const mapDispatchToProps = dispatch => ({
  getCitiesWeatherByIDs: cityIDs => dispatch(getCitiesWeatherByIDs(cityIDs)),
  addCurrentCityWeather: cityId => dispatch(addCurrentCityWeather(cityId)),
  deleteCityIdFromList: cityId => dispatch(deleteCityIdFromList(cityId)),
  addCitiesToList: cities => dispatch(addCitiesToList(cities)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CityList);
