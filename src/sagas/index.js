import { fork } from 'redux-saga/effects';
import { watchLoginRequests } from '../containers/login';
import { addressSaga } from '../containers/user/address';
import { flightSaga } from '../containers/flight';
import { flightOrderSaga } from '../containers/order/flight';
import { flightRefundSaga } from '../containers/order/refund';
import { flightResignSaga } from '../containers/order/resign';

export default function* rootSaga() {
  yield [
    fork(flightOrderSaga),
    fork(watchLoginRequests),
    fork(addressSaga),
    fork(flightSaga),
    fork(flightRefundSaga),
    fork(flightResignSaga)
  ];
}