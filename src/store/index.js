import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducers from '../reducers';
import rootSaga from '../sagas';

// const createDevStoreWithMiddleware = compose(
//   applyMiddleware(thunk),
//   applyMiddleware(createLogger()),
// )(createStore);

// const configureStore = () => {
//   return createDevStoreWithMiddleware(reducers);
// }

const configureStore = initialState => {
  const sagaMiddleware = createSagaMiddleware(rootSaga);
  const store = createStore(
    reducers,
    initialState,
    compose(
      applyMiddleware(sagaMiddleware, createLogger())
    )
  )

  sagaMiddleware.run(rootSaga);
  return store;
}

export default configureStore;