const initState = {
  foundCity: {},
  isLoading: false,
  error: '',
  cityWeatherList: [],
  currentCityWeather: {},
  cityIDsStr: localStorage.getItem('cityIDsList') || '',
  isListLoading: !!localStorage.getItem('cityIDsList') && true,
  loadingListError: '',
};

const cityReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOAD':
      return { ...state, isLoading: true };
    case 'CITY_FOUND':
      return { ...state, foundCity: action.city, isLoading: false, error: '' };
    case 'CITY_FOUND_ERROR':
      return { ...state, isLoading: false, error: action.err, foundCity: {} };
    case 'ADD_CITIES_TO_CITY_WEATHER_LIST':
      return {
        ...state,
        cityWeatherList: action.cities,
        isListLoading: false,
        loadingListError: '',
      };
    case 'ADD_CITIES_TO_CITY_WEATHER_LIST_ERROR':
      return {
        ...state,
        loadingListError: action.err,
        isListLoading: false,
      };
    case 'ADD_CURRENT_CITY_WEATHER':
      return {
        ...state,
        currentCityWeather: state.cityWeatherList.filter(
          city => city.id.toString() === action.cityId
        )[0],
      };
    case 'ADD_CITY_ID_TO_LIST':
      if (!state.cityIDsStr.split(',').filter(id => id === state.foundCity.id.toString()).length) {
        const newCityIDsStr = state.cityIDsStr + ',' + state.foundCity.id.toString();
        localStorage.setItem('cityIDsList', newCityIDsStr);
        return { ...state, cityIDsStr: newCityIDsStr, foundCity: {}, isListLoading: true };
      }
      return { ...state, foundCity: {} };
    case 'DELETE_CITY_ID_FROM_LIST':
      let cityIDsArray = state.cityIDsStr.split(',');
      cityIDsArray = cityIDsArray.filter(id => id !== action.id);
      localStorage.setItem('cityIDsList', cityIDsArray.join());
      return { ...state, cityIDsStr: cityIDsArray.join() };
    default:
      return state;
  }
};

export default cityReducer;
