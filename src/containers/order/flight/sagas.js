import { takeEvery, delay } from 'redux-saga';
import { put, call, take, fork } from 'redux-saga/effects';
import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';

import * as TYPES from './actionTypes';
import apiUrl from '../../../constants/api';
import { get, post } from '../../../service/request';

export function* fetchFlightOrders(params) {
  try {
    let url = apiUrl.flightOrder + 'list/' + params.status + '/' + params.orderTime;
    const result = yield call(get, url);
    console.log("订单返回" + JSON.stringify(result));
    yield put({ type: TYPES.QUERY_FLIGHT_ORDER_SUCCESS, data: result });
  } catch (error) {
    Alert.alert('网络故障' + error);
  }
}

export function* loadMoreFlightOrder(params) {
  try {
    let url = apiUrl.flightOrder + 'list/' + params.status + '/' + params.orderTime;
    const result = yield call(get, url);
    console.log("订单返回" + JSON.stringify(result));
    yield put({ type: TYPES.LOAD_MORE_ORDER_SUCCESS, data: result });
  } catch (error) {
    Alert.alert('网络故障' + error);
  }
}

export function* watchFlightOrders() {
  while (true) {
    const action = yield take(TYPES.QUERY_FLIGHT_ORDER);
    yield fork(fetchFlightOrders, action.data);
  }
}

export function* watchLoadMoreFlightOrder() {
  while (true) {
    const action = yield take(TYPES.LOAD_MORE_ORDER);
    yield fork(loadMoreFlightOrder, action.data);
  }
}

export default function* flightOrderSaga() {
  yield [
    fork(watchFlightOrders),
    fork(watchLoadMoreFlightOrder)
  ];
}



