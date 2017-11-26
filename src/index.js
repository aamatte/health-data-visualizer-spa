import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import reducer from './reducers';
import App from './containers/App';

/* eslint-disable */
const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q"> 
    <LogMonitor theme="tomorrow" preserveScrollTop={false} />
  </DockMonitor>
);
/* eslint-enable */

const store = createStore(
  reducer,
  DevTools.instrument(),
);

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router history={history}>
        <Route path="/" component={App} />
      </Router>
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('mount'),
);
