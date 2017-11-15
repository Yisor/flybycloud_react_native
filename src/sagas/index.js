import { fork } from 'redux-saga/effects';
import { watchLoginRequests } from '../containers/login';

export default function* rootSaga() {
  yield [
    fork(watchLoginRequests)
  ];
}