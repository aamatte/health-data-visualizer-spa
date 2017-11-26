import {
  FETCH_COUNTIES_LOADING,
  FETCH_COUNTIES_FULFILLED,
  FETCH_COUNTIES_REJECTED,
  FETCH_COUNTY_DATA_LOADING,
  FETCH_COUNTY_DATA_FULFILLED,
  FETCH_COUNTY_DATA_REJECTED,
} from '../constants';

const initialState = {
  selectedCounty: null,
  countyData: {},
  counties: [],
  favorites: [],
  error: null,
  loadingCounties: false,
  loadingCounty: false,
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
      return { ...state, selectedCounty: action.payload, loadingCounty: true };
    }
    case FETCH_COUNTY_DATA_FULFILLED: {
      return { ...state, countyData: action.payload, loadingCounty: false };
    }
    case FETCH_COUNTY_DATA_REJECTED: {
      return { ...state, error: action.payload.message, loadingCounty: false };
    }
    default:
      return { ...state };
  }
}
