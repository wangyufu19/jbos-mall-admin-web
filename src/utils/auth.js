import Cookies from 'js-cookie'

const TokenKey = 'mall_admin_web_token'
const UserIdKey = 'mall_admin_web_userid'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(accessToken) {
  return Cookies.set(TokenKey, accessToken)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUserId() {
  return Cookies.get(UserIdKey)
}

export function setUserId(userid) {
  return Cookies.set(UserIdKey, userid)
}

export function removeUserId() {
  return Cookies.remove(UserIdKey)
}
