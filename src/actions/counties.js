import axios from 'axios';
import {
  FETCH_COUNTIES_LOADING,
  FETCH_COUNTIES_FULFILLED,
  FETCH_COUNTIES_REJECTED,
  FETCH_COUNTY_DATA_FULFILLED,
  FETCH_COUNTY_DATA_REJECTED,
  FETCH_COUNTY_DATA_LOADING,
} from '../constants';

const BASE_URL = 'http://127.0.0.1:8080';

export function fetchCounties(query = {}, pagination = {}) {
  const stateQuery = query.state ? `state=${query.state}` : '';
  const countyQuery = query.county ? `county=${query.county}` : '';
  const queryString = `?${stateQuery}&${countyQuery}`;
  return (dispatch) => {
    dispatch({ type: FETCH_COUNTIES_LOADING });
    axios.get(`${BASE_URL}/counties${queryString}`)
      .then(response => dispatch({ type: FETCH_COUNTIES_FULFILLED, payload: response.data }))
      .catch(error => dispatch({ type: FETCH_COUNTIES_REJECTED, payload: error }));
  };
}

export function fetchCountyData(query, source = 'diabetes-incidence', pagination = {}) {
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
