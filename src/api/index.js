import ApiConfigList from './base_api.json';
import request from '@/configs/reqreset';
const ApiMap = {};
ApiConfigList.forEach(element => {
  const { name, method, path } = element;
  if (name && method && path) {
    ApiMap[name] = (params) => request({
      method,
      url: path,
      params
    });
  }
});
export default ApiMap;