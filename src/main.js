import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import 'moment/locale/zh-cn';

import App from '@pages/index';
import reportWebVitals from './reportWebVitals';

import zhCN from 'antd/lib/locale/zh_CN';
import { ConfigProvider } from 'antd';

import './api/index';
import '@assets/index';
import '@assets/font/iconfont.css';
import '@style/main.css';
moment.locale('zh-cn');
ReactDOM.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  <ConfigProvider locale={zhCN}>
    <App />
  </ConfigProvider>,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
