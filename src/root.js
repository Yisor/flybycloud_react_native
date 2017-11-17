'use strict';

import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';

import App from './router';
import configureStore from './store';
import rootSaga from './sagas';

let store = configureStore();
store.runSaga(rootSaga);

if (!__DEV__) {
  global.console = {
    info: () => {},
    log: () => {},
    warn: () => {},
    error: () => {},
  }
}

export default class Root extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}