import { fork } from 'redux-saga/effects';
import { watchLoginRequests } from '../containers/login';
import { watchQueryFlight } from '../containers/flight/main';

export default function* rootSaga() {
  yield [
    fork(watchLoginRequests),
    fork(watchQueryFlight)
  ];
}