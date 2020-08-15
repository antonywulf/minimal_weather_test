import { weatherAPI } from '../../api/api';

const load = () => ({ type: 'LOAD' });

export const addFoundCity = city => ({ type: 'CITY_FOUND', city });

const addFoundCityError = err => ({ type: 'CITY_FOUND_ERROR', err });

export const addCitiesToList = cities => ({ type: 'ADD_CITIES_TO_CITY_WEATHER_LIST', cities });

export const addCitiesToListError = err => ({ type: 'ADD_CITIES_TO_CITY_WEATHER_LIST_ERROR', err });

export const addCurrentCityWeather = cityId => ({ type: 'ADD_CURRENT_CITY_WEATHER', cityId });

export const addCityIdToList = () => ({ type: 'ADD_CITY_ID_TO_LIST' });

export const deleteCityIdFromList = id => ({ type: 'DELETE_CITY_ID_FROM_LIST', id: id });

export const getCityWeather = city => {
  return dispatch => {
    dispatch(load());
    weatherAPI
      .getWeather(city)
      .then(data => dispatch(addFoundCity(data)))
      .catch(err => dispatch(addFoundCityError(err)));
  };
};

export const getCitiesWeatherByIDs = IDs => {
  return dispatch => {
    weatherAPI
      .getWeatherByIDs(IDs)
      .then(data => dispatch(addCitiesToList(data.list)))
      .catch(err => dispatch(addCitiesToListError(err)));
  };
};
