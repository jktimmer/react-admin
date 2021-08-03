import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import routerReducer from './reducers/index';
import { reduxRouterMiddleware, logger, common } from './middleware/index';
function initStore(initialState) {
  const create = window.devToolsExtension 
    ? window.devToolsExtension()(createStore) 
    : createStore;
  const createStoreMiddleware = applyMiddleware(
    reduxRouterMiddleware,
    thunkMiddleware,
    logger,
    common
  )(create);
  const store = createStoreMiddleware(routerReducer, initialState);
  return store;
}
const store = initStore({});
export default store;