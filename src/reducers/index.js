import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import countiesReducer from './countiesReducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  counties: countiesReducer,
});

export default rootReducer;
