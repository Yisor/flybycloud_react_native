'use strict';

import React, { Component } from 'react';
import { Provider } from 'react-redux';

import FbRouter from './FbRouter';
import configureStore from './store';

let store = configureStore();

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <FbRouter />
      </Provider>
    )
  }
}