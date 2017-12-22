import { takeEvery, delay } from 'redux-saga';
import { put, call, take, fork } from 'redux-saga/effects';
import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';
import * as TYPES from './actionTypes';
import apiUrl from '../../../constants/api';
import { get, post } from '../../../service/request';

export function* fetchRefundDetail(params) {
  try {
    let url = apiUrl.refundDetail;
    const result = yield call(post, url, params);
    console.log("详情返回：" + JSON.stringify(result));
    yield put({ type: TYPES.QUERY_REFUND_DETAIL_SUCCESS, data: result });
  } catch (error) {
    Alert.alert('网络故障' + error);
  }
}

export function* watchRefundDetail() {
  while (true) {
    const action = yield take(TYPES.QUERY_REFUND_DETAIL);
    yield fork(fetchRefundDetail, action.data);
  }
}

export default function* flightRefundSaga() {
  yield [
    fork(watchRefundDetail),
  ];
}



