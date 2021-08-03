import { _ActionTypes, differBoth, _InitState } from '@store/actions';
const reducerCenter = {};

_ActionTypes.forEach(element => {
  const { actionName, stateType } = element;
  reducerCenter[actionName] = (state, action) => {
    const { type, payload } = action;
    if (actionName === type) {
      return differBoth(state, payload);
    };
    var _jsonDefValue = _InitState[actionName];
    switch (stateType) {
    case 'string':
      _jsonDefValue = _InitState[actionName] || '';
      break;
    case 'array':
      _jsonDefValue = _InitState[actionName] || [];
      break;
    case 'number':
      _jsonDefValue = _InitState[actionName] || 0;
      break;
    case 'boolean':
      _jsonDefValue = _InitState[actionName] || false;
      break;
    default :
      _jsonDefValue = _InitState[actionName] || {};
      break;
    }
    return differBoth(_jsonDefValue, state);
  };
});
export default reducerCenter;