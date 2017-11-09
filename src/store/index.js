import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import { createLogger } from 'redux-logger';

const createDevStoreWithMiddleware = compose(
  applyMiddleware(thunk),
  applyMiddleware(createLogger()),
)(createStore);

export default function configureStore() {
  return createDevStoreWithMiddleware(reducers);
}