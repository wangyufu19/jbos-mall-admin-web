import Cookies from 'js-cookie'

const TokenKey = 'mall_admin_web_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(accessToken) {
  return Cookies.set(TokenKey, accessToken)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
