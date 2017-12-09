import axios from 'axios';
import {
  FETCH_COUNTIES_LOADING,
  FETCH_COUNTIES_FULFILLED,
  FETCH_COUNTIES_REJECTED,
  FETCH_COUNTY_DATA_FULFILLED,
  FETCH_COUNTY_DATA_REJECTED,
  FETCH_COUNTY_DATA_LOADING,
  ADD_COUNTY_TO_FAVORITES,
  REMOVE_COUNTY_FROM_FAVORITES,
} from '../constants';

const BASE_URL = 'http://127.0.0.1:8080';

export function fetchCounties(query = {}, pagination = { page: 0, perPage: 20 }) {
  const stateQuery = query.state && query.state !== '' ? `state=${query.state}` : '';
  const countyQuery = query.county && query.county !== '' ? `county=${query.county}` : '';
  const searchQuery = `${stateQuery}&${countyQuery}`;
  const paginationQuery = stateQuery || !pagination.perPage ? '' : `page=${pagination.page}&perPage=${pagination.perPage}`;
  return (dispatch) => {
    dispatch({ type: FETCH_COUNTIES_LOADING });
    axios.get(`${BASE_URL}/counties?${searchQuery}&${paginationQuery}`)
      .then(response => dispatch({ type: FETCH_COUNTIES_FULFILLED, payload: response.data }))
      .catch(error => dispatch({ type: FETCH_COUNTIES_REJECTED, payload: error }));
  };
}

export function fetchCountyData(query, source = 'diabetes-incidence') {
  return (dispatch) => {
    dispatch({
      type: FETCH_COUNTY_DATA_LOADING,
      payload: { county: query.county, source },
    });
    axios.get(`${BASE_URL}/${source}?county=${query.county.county}&state=${query.county.state}`)
      .then(response => dispatch({ type: FETCH_COUNTY_DATA_FULFILLED, payload: response.data }))
      .catch(error => dispatch({ type: FETCH_COUNTY_DATA_REJECTED, payload: error }));
  };
}

export function addToFavorites(county) {
  return ((dispatch) => {
    dispatch({
      type: ADD_COUNTY_TO_FAVORITES,
      payload: { county },
    });
  });
}

export function removeFromFavorites(county) {
  return ((dispatch) => {
    dispatch({
      type: REMOVE_COUNTY_FROM_FAVORITES,
      payload: { county },
    });
  });
}
