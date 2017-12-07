import { fork } from 'redux-saga/effects';
import { watchLoginRequests } from '../containers/login';
import { watchQueryFlight } from '../containers/flight/list';
import { watchQueryFlightDetail } from '../containers/flight/detail';
import { watchCheckInsurance, watchFetchFillOrderData } from '../containers/flight/order';
import { watchQueryAddress } from '../containers/user/address';

export default function* rootSaga() {
  yield [
    fork(watchLoginRequests),
    fork(watchQueryFlight),
    fork(watchQueryAddress),
    fork(watchFetchFillOrderData),
    fork(watchCheckInsurance),
    fork(watchQueryFlightDetail)
  ];
}