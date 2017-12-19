import { fork } from 'redux-saga/effects';
import { watchLoginRequests } from '../containers/login';
import { addressSaga } from '../containers/user/address';
import { flightSaga } from '../containers/flight';
import { flightOrderSaga } from '../containers/order/flight';

export default function* rootSaga() {
  yield [
    fork(flightOrderSaga),
    fork(watchLoginRequests),
    fork(addressSaga),
    fork(flightSaga)
  ];
}