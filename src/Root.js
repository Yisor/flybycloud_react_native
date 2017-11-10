'use strict';

import React, { Component } from 'react';
import { Provider } from 'react-redux';

import FeibaRouter from './FeibaRouter';
import configureStore from './store';

let store = configureStore();

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <FeibaRouter />
      </Provider>
    )
  }
}