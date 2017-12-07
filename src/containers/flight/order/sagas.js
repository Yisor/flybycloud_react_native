import { takeEvery, delay } from 'redux-saga';
import { put, call, take, fork } from 'redux-saga/effects';
import { Alert } from 'react-native';
import * as TYPES from './actionTypes';
import { get } from '../../../service/request';
import apiUrl from '../../../constants/api';
import { Actions } from 'react-native-router-flux';


export function* queryAuditPerson() {
  try {
    let url = apiUrl.auditing;
    const result = yield call(get, url);
    yield put({ type: TYPES.AUDITING_QUERY_SUCESS, data: result });
  } catch (error) {
    Alert.alert('网络故障' + error);
  }
}

export function* queryCostCenter() {
  try {
    let url = apiUrl.costCenter;
    const result = yield call(get, url);
    yield put({ type: TYPES.COST_CENTER_QUERY_SUCESS, data: result });
  } catch (error) {
    Alert.alert('网络故障' + error);
  }
}

export function* queryInsurance() {
  try {
    let url = apiUrl.insurances + "1";
    const result = yield call(get, url);
    let tempList = [];
    result.map((item) => {
      if (!item['isChecked']) {
        item['isChecked'] = true;
      }
      tempList.push(item);
    });
    yield put({ type: TYPES.INSURANCE_QUERY_SUCESS, data: tempList });
  } catch (error) {
    Alert.alert('网络故障' + error);
  }
}

export function* checkInsurance(params) {
  try {
    let filters = params.filter((item) => {
      return item['isChecked'] == true;
    });
    // console.log("保险返回" + JSON.stringify(result));
    yield put({ type: TYPES.INSURANCE_CHECKED_SUCESS, data: params, filters: filters });
  } catch (error) {
    Alert.alert('网络故障' + error);
  }
}

export function* watchCheckInsurance() {
  while (true) {
    const action = yield take(TYPES.INSURANCE_CHECKED);
    // console.log('watchCheckInsurance' + JSON.stringify(action));
    yield fork(checkInsurance, action.data);
  }
}

export function* watchFetchFillOrderData() {
  while (true) {
    const action = yield take(TYPES.FETCH_FILL_ORDER_DATA);
    yield fork(queryInsurance);
    yield fork(queryCostCenter);
    yield fork(queryAuditPerson);
  }
}