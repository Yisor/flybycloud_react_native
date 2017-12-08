import { takeEvery, delay } from 'redux-saga';
import { put, call, take, fork } from 'redux-saga/effects';
import { Alert } from 'react-native';
import * as TYPES from './actionTypes';
import { get } from '../../../service/request';
import apiUrl from '../../../constants/api';
import { Actions } from 'react-native-router-flux';

export function* queryEconomyClass(flightId) {
  try {
    let url = apiUrl.allSeat + flightId;
    const result = yield call(get, `${url}/1`);
    console.log("经济舱返回结果" + JSON.stringify(result));
    yield put({ type: TYPES.ECONOMY_QUERY_SUCESS, data: result });
  } catch (error) {
    Alert.alert('网络故障' + error);
  }
}

export function* queryBusinessClass(flightId) {
  try {
    let url = apiUrl.allSeat + flightId;
    const result = yield call(get, `${url}/2`);
    console.log("返回商务结果" + JSON.stringify(result));
    yield put({ type: TYPES.BUSINESS_QUERY_SUCESS, data: result });
  } catch (error) {
    Alert.alert('网络故障' + error);
  }
}

export function* queryFirstClass(flightId) {
  try {
    let url = apiUrl.allSeat + flightId;
    const result = yield call(get, `${url}/3`);
    console.log("返回头等结果" + JSON.stringify(result));
    yield put({ type: TYPES.FIRST_QUERY_SUCESS, data: result });
  } catch (error) {
    Alert.alert('网络故障' + error);
  }
}

export function* queryGpticket(flightId) {
  try {
    let url = apiUrl.gpticket + flightId;
    const result = yield call(get, `${url}`);
    console.log("政采票返回" + JSON.stringify(result));
    yield put({ type: TYPES.GPTICKET_QUERY_SUCESS, data: result });
  } catch (error) {
    Alert.alert('网络故障' + error);
  }
}

export function* watchQueryFlightDetail() {
  while (true) {
    const action = yield take(TYPES.FLIGHT_DETAIL_QUERY);
    console.log('watchQueryFlightDetail' + JSON.stringify(action));
    const { flightId, isGpTicket } = action.data;
    if (isGpTicket) {
      yield fork(queryGpticket, flightId);
    } else {
      yield fork(queryEconomyClass, flightId);
      yield fork(queryBusinessClass, flightId);
      yield fork(queryFirstClass, flightId);
    }
  }
}