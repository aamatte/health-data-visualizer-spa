import { 
  FETCH_COUNTIES_FULFILLED,
  FETCH_COUNTIES_REJECTED,
  FETCH_COUNTY_DATA_FULFILLED,
  FETCH_COUNTY_DATA_REJECTED,
} from '../constants';

export function fetchCounties(pagination = {}) {
  // Do request and return FETCH_COUNTIES_FULFILLED or FETCH_COUNTIES_REJECTED
}

export function fetchCountyData(query = {}, pagination = {}) {
  // Do request and return FETCH_COUNTY_DATA_FULFILLED or FETCH_COUNTY_DATA_REJECTED
}
