import {
  FETCH_COUNTIES_FULFILLED,
  FETCH_COUNTIES_REJECTED,
  FETCH_COUNTY_DATA_FULFILLED,
  FETCH_COUNTY_DATA_REJECTED,
} from '../constants';

const initialState = {
  selectedCounty: null,
  countyData: null,
  counties: [],
  favorites: [],
};

export default function update(state = initialState, action) {
  switch (action.type) {
    case FETCH_COUNTIES_FULFILLED: {
      return { ...state };
    }
    case FETCH_COUNTIES_REJECTED: {
      return { ...state };
    }
    case FETCH_COUNTY_DATA_FULFILLED: {
      return { ...state };
    }
    case FETCH_COUNTY_DATA_REJECTED: {
      return { ...state };
    }
    default:
      return { ...state };
  }
}
