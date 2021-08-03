import axios from 'axios';
// import store from '@store/index';
import { message, notification, Button } from 'antd';
import store from '@/store/index';
import { _Actions } from '@/store/actions/index';
// console.log(store.getState());


function logout() {
  store.dispatch(_Actions.logout()).then(res => {
    try {
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  });
}
const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 15000
});
service.interceptors.request.use(
  config => {
    const { token } = store.getState();
    config.headers['ADMIN-ACCESSTOKEN'] = token;
    return config;
  },
  err => {
    setNoLoading();
    message.error(err.message);
    return Promise.reject(err);
  }
);

service.interceptors.response.use(
  response => {
    setNoLoading();
    const { data } = response;
    if (data['errno'] === 30000) {
      // let key = `error${Date.now()}`;
      // let btn = (
      //   <Button type="primary" size="small" onClick={() => {
      //     notification.close(key);
      //     logout();
      //   }}>
      //     确定
      //   </Button>
      // );
      // notification.error({
      //   message: '错误',
      //   description:
      //     '登录超时请重新登录',
      //   key,
      //   duration: 0,
      //   btn,
      //   onClose: () =>{
      //     logout();
      //   }
      // });
      logout();
      return Promise.reject('error');
    }
    if (data['errno'] !== 200) {
      notification.error({
        message: '失败',
        description: data['errmsg']
      });
      return Promise.reject(data);
    }
    return data;
  },
  err => {
    setNoLoading();
    message.error(err.message);
    return Promise.reject(err);
  }
);

function setNoLoading() {
  if ( typeof service.setLoading === 'function') {
    service.setLoading();
  }
}
export default service;
