import { takeEvery, delay } from 'redux-saga';
import { put, call, take, fork } from 'redux-saga/effects';
import { Alert } from 'react-native';
import { LOGGED_IN, LOGGED_DOING } from './actionTypes';
import { post } from '../../service/request';
import apiUrl from '../../constants/api';
import { Actions } from 'react-native-router-flux';
import Store from '../../utils/store';
import { storeUserKey } from '../../constants/constDefines';

export function* loginToServer(params) {
  try {
    const result = yield call(post, apiUrl.login, params);
    console.log("返回结果" + JSON.stringify(result));
    if (result.message && result.code) {
      Alert.alert(result.message);
    } else {
      global.token = result.token;
      Store.set(storeUserKey, result);
      yield put({ type: LOGGED_DOING, data: result });  // 中间件发起一个 action 到 Store
    }

  } catch (error) {
    Alert.alert('网络故障' + error);
  }
}

// watch actions and coordinate worker tasks
export function* watchLoginRequests() {
  while (true) {
    const action = yield take(LOGGED_IN);  // 等待 Store 上指定的 action，即监听 action
    yield fork(loginToServer, action.user);  // 以无阻塞调用方式执行
  }
}



