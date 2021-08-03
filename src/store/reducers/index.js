import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import reducerCenter from './reducerCenter';
const routerReducer = combineReducers({
  routing,
  ...reducerCenter
});
export default routerReducer;