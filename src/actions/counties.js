import axios from 'axios';
import { 
  FETCH_COUNTIES_LOADING,
  FETCH_COUNTIES_FULFILLED,
  FETCH_COUNTIES_REJECTED,
  FETCH_COUNTY_DATA_FULFILLED,
  FETCH_COUNTY_DATA_REJECTED,
} from '../constants';

const BASE_URL = 'http://127.0.0.1:8080';

export function fetchCounties(pagination = {}) {
  return (dispatch) => {
    dispatch({ type: FETCH_COUNTIES_LOADING });
    axios.get(`${BASE_URL}/counties`)
      .then(response => dispatch({ type: FETCH_COUNTIES_FULFILLED, payload: response.data }))
      .catch(error => dispatch({ type: FETCH_COUNTIES_REJECTED, payload: error }));
  };
}

export function fetchCountyData(query = {}, pagination = {}) {
  // Do request and return FETCH_COUNTY_DATA_FULFILLED or FETCH_COUNTY_DATA_REJECTED
}
