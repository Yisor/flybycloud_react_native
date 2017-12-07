import { fork } from 'redux-saga/effects';
import { watchLoginRequests } from '../containers/login';
import { watchQueryAddress } from '../containers/user/address';
import { flightSaga } from '../containers/flight';

export default function* rootSaga() {
  yield [
    fork(watchLoginRequests),
    fork(watchQueryAddress),
    fork(flightSaga)
  ];
}