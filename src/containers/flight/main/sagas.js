import { takeEvery, delay } from 'redux-saga';
import { put, call, take, fork } from 'redux-saga/effects';
import { Alert } from 'react-native';
import { FLIGHT_QUERY, FLIGHT_QUERY_SUCESS } from './actionTypes';
import { post } from '../../../service/request';
import apiUrl from '../../../constants/apiUrl';
import { Actions } from 'react-native-router-flux';

export function* queryFlight(params) {
  try {
    // const result = yield call(post, apiUrl.login, params);
    const result = { code: "1001", message: "失败" };
    console.log("返回结果" + JSON.stringify(result));
    yield put({ type: FLIGHT_QUERY_SUCESS, data: result });  // 中间件发起一个 action 到 Store
  } catch (error) {
    Alert('网络故障' + error);
  }
}

// watch actions and coordinate worker tasks
export function* watchQueryFlight() {
  while (true) {
    const action = yield take(FLIGHT_QUERY);  // 等待 Store 上指定的 action，即监听 action
    console.log('watchQueryFlight' + JSON.stringify(action));
    yield fork(queryFlight, action.data);  // 以无阻塞调用方式执行
  }
}