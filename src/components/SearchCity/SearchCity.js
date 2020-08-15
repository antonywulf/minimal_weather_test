import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import styles from './SearchCity.module.css';

import { getCityWeather, addFoundCity, addCityIdToList } from '../../store/actions/cityActions';
import City from './City/City';
import Loader from '../Loader/Loader';

const SearchCity = ({
  foundCity,
  isLoading,
  error,
  getCityWeather,
  addFoundCity,
  addCityIdToList,
}) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    addFoundCity({});
  }, [value, addFoundCity]);

  const changeHandler = e => {
    setValue(e.target.value);
  };

  const submitHandler = e => {
    e.preventDefault();
    value && getCityWeather(value);
  };

  return (
    <div className={`${styles.SearchCity}`}>
      <h2>Location</h2>
      <form onSubmit={submitHandler} className={`${styles.SearchCityInputBox}`}>
        <input onChange={changeHandler} value={value} placeholder="City" type="text" />
        <button type="submit" />
      </form>
      {isLoading ? (
        <div className={`${styles.LoaderBox}`}>
          <Loader />
        </div>
      ) : (
        <div className={`${styles.SearchList}`}>
          {error ? (
            <p className={`${styles.NoResults}`}>No results</p>
          ) : (
            <React.Fragment>
              {Object.keys(foundCity).length !== 0 && (
                <City
                  name={foundCity.name}
                  country={foundCity.sys.country}
                  deg={foundCity.main.temp}
                  addCityIdToList={addCityIdToList}
                />
              )}
            </React.Fragment>
          )}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  foundCity: state.city.foundCity,
  isLoading: state.city.isLoading,
  error: state.city.error,
});

const mapDispatchToProps = dispatch => ({
  getCityWeather: city => dispatch(getCityWeather(city)),
  addFoundCity: city => dispatch(addFoundCity(city)),
  addCityIdToList: () => dispatch(addCityIdToList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchCity);
