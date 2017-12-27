import { takeEvery, delay } from 'redux-saga';
import { put, call, take, fork } from 'redux-saga/effects';
import { Alert } from 'react-native';
import * as TYPES from './actionTypes';
import apiUrl from '../../../constants/api';
import { get, post } from '../../../service/request';

export function* fetchChangeFee(params) {
  try {
    let url = apiUrl.changeFee;
    const result = yield call(post, url, params);
    console.log("详情返回：" + JSON.stringify(result));
    yield put({ type: TYPES.QUERY_CHANGE_FEE_SUCCESS, data: result });
  } catch (error) {
    Alert.alert('网络故障' + error);
  }
}

export function* watchChangeFee() {
  while (true) {
    const action = yield take(TYPES.QUERY_CHANGE_FEE);
    yield fork(fetchChangeFee, action.data);
  }
}

export default function* flightResignSaga() {
  yield [
    fork(watchChangeFee),
  ];
}