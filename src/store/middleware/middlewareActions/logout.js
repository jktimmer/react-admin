const { _Actions } = require('@/store/actions/index');
const { removeToken } = require('@/utils/auth');
module.exports = function (params) {
  const { dispatch } = params;
  removeToken();
  dispatch(_Actions.token(''));
  dispatch(_Actions.userInfo({}));
  return Promise.resolve(true);
};