import { takeEvery, delay } from 'redux-saga';
import { put, call, take, fork } from 'redux-saga/effects';
import { Alert } from 'react-native';
import * as TYPES from './actionTypes';
import { get, post } from '../../../service/request';
import apiUrl from '../../../constants/api';
import { Actions } from 'react-native-router-flux';

// 查询审批人
export function* queryAuditPerson() {
  try {
    let url = apiUrl.auditing;
    const result = yield call(get, url);
    yield put({ type: TYPES.AUDITING_QUERY_SUCESS, data: result });
  } catch (error) {
    Alert.alert('网络故障' + error);
  }
}

// 查询所在公司的成本中心
export function* queryCostCenter() {
  try {
    let url = apiUrl.costCenter;
    const result = yield call(get, url);
    yield put({ type: TYPES.COST_CENTER_QUERY_SUCESS, data: result });
  } catch (error) {
    Alert.alert('网络故障' + error);
  }
}

// 获取保险（飞机）
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

// 选择保险
export function* checkInsurance(params) {
  try {
    let filters = params.filter((item) => {
      return item['isChecked'] == true;
    });
    yield put({ type: TYPES.INSURANCE_CHECKED_SUCESS, data: params, filters: filters });
  } catch (error) {
    Alert.alert('网络故障' + error);
  }
}

// 校验乘客是否违反差旅政策
export function* checkPassenger(params) {
  try {
    const checkResult = yield call(post, apiUrl.check, params);
    let temp = checkResult.filter((item) => {
      return item.overData && item.overData.length > 0;
    });
    if (temp.length > 0) {
      // 违规原因查询
      const reasons = yield call(get, apiUrl.illegalReason);
      yield put({ type: TYPES.PASSENGER_CHECK_SUCESS, data: { checkResult, reasons } });
    } else {
      yield put({ type: TYPES.PASSENGER_CHECK_SUCESS });
    }
  } catch (error) {
    Alert.alert('网络故障' + error);
  }
}

export function* watchCheckInsurance() {
  while (true) {
    const action = yield take(TYPES.INSURANCE_CHECKED);
    yield fork(checkInsurance, action.data);
  }
}

export function* watchCheckPassenger() {
  while (true) {
    const action = yield take(TYPES.PASSENGER_CHECK);
    // 未考虑票和人有多个情况
    let { flightDetails, returnDetails, passengers } = action.data;
    let policyOverParams = [];

    let ticket = flightDetails.ticket;
    let ticketInfo = { flightId: ticket.flightId, ticketId: ticket.ticketId };
    policyOverParams.push(ticketInfo);

    if (returnDetails) {
      let returnTicket = returnDetails.ticket;
      let returnTicketInfo = { flightId: returnTicket.flightId, ticketId: returnTicket.ticketId };
      policyOverParams.push(returnTicketInfo);
    }

    let passengerUserId = [];
    for (let item of passengers) {
      if (item.userId) {
        passengerUserId.push(item.userId);
      }
    }
    const params = { policyOverParams, passengerUserId }
    yield fork(checkPassenger, params);
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

export default function* orderSaga() {
  yield [
    fork(watchFetchFillOrderData),
    fork(watchCheckInsurance),
    fork(watchCheckPassenger)
  ];
}