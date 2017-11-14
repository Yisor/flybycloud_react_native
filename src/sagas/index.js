import { fork } from 'redux-saga/effects';
import { watchFetchRequests } from '../containers/login';

export default function* rootSaga() {
  yield [
    fork(watchFetchRequests)
  ];
}