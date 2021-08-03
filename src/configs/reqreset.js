import service from './axios.config';

const request = (options) => {
  const { method, url, params } = options;
  const configs = { method, url };
  method.toLowerCase() === 'get' ? configs['params'] = params : configs['data'] = params;
  return service(configs);
};
export default request;