import { routerMiddleware } from 'react-router-redux';
import common from './common';
import history from './history';
import logger from './logger';
const reduxRouterMiddleware = routerMiddleware(history);
/**
 * routerMiddleware
 * use store.dispatch({
 *  type:"CALL_HISTOEY_METHOD",
 *  payload: {
 *    method: -, contain push, replace, back
 *    args: - 
 *  }
 * });
 */
export {
  reduxRouterMiddleware,
  logger,
  common
};