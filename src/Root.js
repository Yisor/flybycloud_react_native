'use strict';

import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';

import FeibaRouter from './router';
import configureStore from './store';

let store = configureStore();

export default class Root extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <FeibaRouter />
      </Provider>
    )
  }
}