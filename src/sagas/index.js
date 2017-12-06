import { fork } from 'redux-saga/effects';
import { watchLoginRequests } from '../containers/login';
import { watchQueryFlight } from '../containers/flight/list';
import { watchQueryFlightDetail } from '../containers/flight/detail';
import { watchQueryAuditPerson, watchQueryCostCenter, watchQueryInsurance, watchCheckInsurance } from '../containers/flight/order';
import { watchQueryAddress } from '../containers/user/address';

export default function* rootSaga() {
  yield [
    fork(watchLoginRequests),
    fork(watchQueryFlight),
    fork(watchQueryAuditPerson),
    fork(watchQueryCostCenter),
    fork(watchQueryAddress),
    fork(watchQueryInsurance),
    fork(watchCheckInsurance),
    fork(watchQueryFlightDetail)
  ];
}