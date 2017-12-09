import {
  FETCH_COUNTIES_LOADING,
  FETCH_COUNTIES_FULFILLED,
  FETCH_COUNTIES_REJECTED,
  FETCH_COUNTY_DATA_LOADING,
  FETCH_COUNTY_DATA_FULFILLED,
  FETCH_COUNTY_DATA_REJECTED,
  ADD_COUNTY_TO_FAVORITES,
  REMOVE_COUNTY_FROM_FAVORITES,
  FETCH_AVAILABLE_DATA_FULFILLED,
  FETCH_AVAILABLE_DATA_REJECTED,
} from '../constants';

const FAVORITES_KEY = 'favorites';

const initialState = {
  selectedCounty: null,
  countyData: null,
  counties: [],
  error: null,
  loadingCounties: false,
  loadingCounty: false,
  selectedInfo: null,
  // Favorites are saved in localStorage
  favorites: localStorage.getItem(FAVORITES_KEY) ? JSON.parse(localStorage.getItem(FAVORITES_KEY)) : [],
  availableData: [],
};

export default function update(state = initialState, action) {
  switch (action.type) {
    case FETCH_COUNTIES_LOADING: {
      return { ...state, loadingCounties: true };
    }
    case FETCH_COUNTIES_FULFILLED: {
      return { ...state, counties: action.payload, loadingCounties: false };
    }
    case FETCH_COUNTIES_REJECTED: {
      return { ...state, error: action.payload.message, loadingCounties: false };
    }
    case FETCH_COUNTY_DATA_LOADING: {
      return {
        ...state,
        selectedCounty: action.payload.county,
        selectedInfo: action.payload.source,
        loadingCounty: true,
      };
    }
    case FETCH_COUNTY_DATA_FULFILLED: {
      const [data] = action.payload.data;
      const selectedCounty = { county: data.county, state: data.state, fips: data.fips };
      return {
        ...state,
        selectedCounty,
        countyData: action.payload,
        loadingCounty: false,
      };
    }
    case FETCH_COUNTY_DATA_REJECTED: {
      return {
        ...state,
        countyData: null,
        error: action.payload.message,
        loadingCounty: false,
      };
    }
    case ADD_COUNTY_TO_FAVORITES: {
      const { favorites } = state;
      const { county } = action.payload;
      const updatedFavorites = county.fips && !favorites.find(f => f.fips === county.fips) ?
        [...favorites, county] :
        [...favorites];
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
      return {
        ...state,
        favorites: updatedFavorites,
      };
    }
    case REMOVE_COUNTY_FROM_FAVORITES: {
      const { favorites } = state;
      const { county } = action.payload;
      const updatedFavorites = county.fips ?
        [...favorites.filter(f => f.fips !== county.fips)] :
        [...favorites];
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
      return {
        ...state,
        favorites: updatedFavorites,
      };
    }
    case FETCH_AVAILABLE_DATA_FULFILLED: {
      return {
        ...state,
        availableData: action.payload,
      };
    }
    case FETCH_AVAILABLE_DATA_REJECTED: {
      return {
        ...state,
        error: action.payload,
      };
    }
    default:
      return { ...state };
  }
}
