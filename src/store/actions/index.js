import actionsListJson from './actions.json';
const _Actions = {};
const _ActionTypes = [];
const _InitState = {};
const _MiddlewareActions = {};
// build action

const _toString = (omj) => {
  return Object.prototype.toString.call(omj).slice(8, -1).toLowerCase();
};

actionsListJson.forEach(element => {
  let { 
    type, payload, 
    isMiddleware, 
    middlewarePath 
  } = element;
  const stateType = _toString(payload);
  if (type) {
    _Actions[type] = (state) => {
      return {
        type: type,
        payload: differBoth(payload, state, type)
      };
    };
    const actionName = type;
    const initStateValue = payload;
    _ActionTypes.push({ actionName, stateType, initStateValue });
    _InitState[type] = payload;
    // when isMiddleware == true, will append it to middleware
    if ( isMiddleware === true && middlewarePath) {
      _MiddlewareActions[type] = {
        path: middlewarePath,
        payload: payload
      };
    }
  }
});

function differBoth(oldOne, newOne, type){
  const value = diffBack(oldOne, newOne);
  type && (_InitState[type] = value);
  return value;
}
function diffBack(oldOne, newOne) {
  const _type = _toString(oldOne);
  const _newType = _toString(newOne);
  if (_type === 'undefined' && _newType !== 'undefined') {
    console.warn('old state was undefined, will return new state');
    return newOne;
  }
  if (_newType === 'undefined' && _type !== 'undefined') {
    console.warn('new state was undefined, will return default state');
    return oldOne;
  }
  if (_type === 'undefined' && _newType === 'undefined') {
    console.warn('default state and new state was undefined, will return new Object');
    return {};
  }
  if (_type !== _newType) {
    console.warn('your old state type different from  new state type, will return new state');
    return newOne;
  }
  if (_type === 'string' || _type === 'boolean' || _type === 'number') {
    return newOne;
  }
  // 合并对象属性
  if (_type === 'object') {
    return { ...oldOne, ...newOne };
  }
  // 数组状态，直接返回新数组，故每次要取状态的数组手动增删，在dispatch新数组
  if (_type === 'array') {
    return newOne.slice();
  }
}
export { 
  _Actions, _ActionTypes, 
  differBoth, 
  _InitState, _MiddlewareActions
};