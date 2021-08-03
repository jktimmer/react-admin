const { default: ApiMap } = require('@api/index');
const { _Actions } = require('@store/actions/index');

module.exports = function(params) {
  const { dispatch } = params;
  return ApiMap.getUserInfo()
    .then((res) => {
      let { data } = res;
      dispatch(_Actions.userInfo({ ...data }));
      return data;
    })
    .catch(err => err);
};