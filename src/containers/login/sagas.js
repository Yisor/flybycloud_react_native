import { takeEvery, delay } from 'redux-saga';
import { put, call, take, fork, cancel, cancelled } from 'redux-saga/effects';
import { Alert } from 'react-native';
import { LOGGED_IN, LOGGED_DOING } from './actionTypes';
import { login, request, post } from '../../service/request';
import apiUrl from '../../constants/Urls';

export function* fetchUrl(params) {
  try {
    const result = yield call(post, apiUrl.userLogin, params);
    console.log("返回结果" + JSON.stringify(result));
    yield put({ type: LOGGED_DOING, result });  // 中间件发起一个 action 到 Store
  } catch (error) {
    Alert('网络故障' + error);
  }
}

// The watcher: watch actions and coordinate worker tasks
export function* watchFetchRequests() {
  while (true) {
    const action = yield take(LOGGED_IN);  // 等待 Store 上指定的 action，即监听 action
    console.log('watchFetchRequests' + JSON.stringify(action));
    yield fork(fetchUrl, action.user);  // 以无阻塞调用方式执行 fetchUrl
  }
}



