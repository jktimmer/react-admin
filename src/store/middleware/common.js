import { _MiddlewareActions, differBoth } from '../actions/index';

const common = store => {
  return next => {
    return action => {
      const { type, payload } =action;
      const isCatchedMiddleware = _MiddlewareActions[type];
      if (isCatchedMiddleware){
        try {
          const middlewareAc = require(`@store/middleware/middlewareActions/${isCatchedMiddleware['path']}`);
          const newState = differBoth(isCatchedMiddleware.payload, payload);
          if ( typeof middlewareAc === 'function' ) {
            return middlewareAc({ payload:newState, next, ...store });
          }
        } catch (error) {
          return Promise.reject(error);
        }
      }
      return next(action);
    };
  };
};
export default common;