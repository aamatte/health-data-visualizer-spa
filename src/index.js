import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import reducer from './reducers';
import App from './containers/App';
import MainDashboard from './components/MainDashboard';
import CountyData from './components/CountyData';

/* eslint-disable */
const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q"> 
    <LogMonitor theme="tomorrow" preserveScrollTop={false} />
  </DockMonitor>
);
/* eslint-enable */

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    DevTools.instrument(),
  ),
);

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRedirect to="/main" />
          <Route path="/main" component={MainDashboard} />
          <Route path="/states/:state/counties/:county" component={CountyData} />
        </Route>
      </Router>
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('mount'),
);
