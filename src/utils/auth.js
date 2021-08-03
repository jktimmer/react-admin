import Cookies from 'js-cookie';

const TokenKey = 'ADMIN-ACCESSTOKEN';
Cookies.defaults = {
  sameSite: 'strict' // 使用严格模式只能是同域名同端口才能访问cookie
};
export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}
