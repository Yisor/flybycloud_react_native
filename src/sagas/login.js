import { takeEvery, delay } from 'redux-saga';
import { put, call, take, fork, cancel, cancelled } from 'redux-saga/effects';
import { Alert } from 'react-native';
import { LOGGED_IN, LOGGED_DOING } from '../actions/types';
import { login, request } from '../service/request';

export function* fetchUrl(action) {
  try {
    const user = action.user;
    yield call(login, 'http://www.baidu.com');
    yield put({ type: LOGGED_DOING, user });  // 中间件发起一个 action 到 Store
  } catch (error) {
    Alert('网络故障' + error);
  }
}

// The watcher: watch actions and coordinate worker tasks
export function* watchFetchRequests() {
  while (true) {
    const action = yield take(LOGGED_IN);  // 等待 Store 上指定的 action，即监听 action
    console.log('watchFetchRequests' + JSON.stringify(action));
    yield fork(fetchUrl, action);  // 以无阻塞调用方式执行 fetchUrl
  }
}


