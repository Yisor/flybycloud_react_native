import { takeEvery, delay } from 'redux-saga';
import { put, call, take, fork } from 'redux-saga/effects';
import { Alert } from 'react-native';
import * as TYPES from './actionTypes';
import { get } from '../../../service/request';
import apiUrl from '../../../constants/api';

export function* queryAddress() {
  try {
    let url = apiUrl.addressList;
    const result = yield call(get, url);
    console.log("地址返回" + JSON.stringify(result));
    yield put({ type: TYPES.ADDRESS_QUERY_SUCCESS, data: result });
  } catch (error) {
    Alert.alert('网络故障' + error);
  }
}

export function* watchQueryAddress() {
  while (true) {
    const action = yield take(TYPES.ADDRESS_QUERY);
    yield fork(queryAddress);
  }
}