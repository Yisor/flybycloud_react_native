import { takeEvery, delay } from 'redux-saga';
import { put, call, take, fork, cancel, cancelled } from 'redux-saga/effects';
import { Alert } from 'react-native';
import { LOGGED_IN, LOGGED_DOING } from './actionTypes';
import { post } from '../../service/request';
import apiUrl from '../../constants/api';
import { Actions } from 'react-native-router-flux';

export function* loginToServer(params) {
  try {
    // const result = yield call(post, apiUrl.login, params);
    const result = {code:"1001",message:"登录失败"};
    console.log("返回结果" + JSON.stringify(result));
    yield put({ type: LOGGED_DOING, data: result });  // 中间件发起一个 action 到 Store
  } catch (error) {
    Alert('网络故障' + error);
  }
}

// watch actions and coordinate worker tasks
export function* watchLoginRequests() {
  while (true) {
    const action = yield take(LOGGED_IN);  // 等待 Store 上指定的 action，即监听 action
    console.log('watchLoginRequests' + JSON.stringify(action));
    yield fork(loginToServer, action.user);  // 以无阻塞调用方式执行
  }
}



