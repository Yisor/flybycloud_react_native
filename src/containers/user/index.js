import { combineReducers } from 'redux';
import { fork } from 'redux-saga/effects';

import { address, addressSaga } from './address';

export const userStore = combineReducers({ address });

export function* userSaga() {
  yield [
    fork(addressSaga),
  ];
}

