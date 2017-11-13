import { fork } from 'redux-saga/effects';
import { watchFetchRequests } from '../sagas/login';

export default function* rootSaga() {
  yield [
    fork(watchFetchRequests)
  ];
}