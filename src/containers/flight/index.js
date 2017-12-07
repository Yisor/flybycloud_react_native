import { combineReducers } from 'redux';
import { fork } from 'redux-saga/effects';
import { list } from '../flight/list';
import { order } from '../flight/order';
import { detail } from '../flight/detail';
import { watchQueryFlight } from './list';
import { watchQueryFlightDetail } from './detail';
import { orderSaga } from './order';

export const flightStore = combineReducers({ list, detail, order });

export function* flightSaga() {
  yield [
    fork(watchQueryFlight),
    fork(watchQueryFlightDetail),
    fork(orderSaga)
  ];
}

