const { default: ApiMap } = require('@/api/index');
const { _Actions } = require('@/store/actions/index');
const { setToken } = require('@/utils/auth');
module.exports = function (params) {
  const { payload, dispatch } = params;
  return ApiMap.login(payload)
    .then(res => {
      const { data } = res;
      dispatch(_Actions.token(data));
      setToken(data);
      return res;
    })
    .catch(err => err);
};