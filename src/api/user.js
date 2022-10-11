import request from '@/utils/request'
/**
 * 用户登录
 * @param {*} data 
 * @returns 
 */
export function login(data) {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}
/**
 * 用户登出
 * @param {*} accessToken 
 * @returns 
 */
export function logout(accessToken) {
  return request({
    url: '/auth/logout',
    method: 'post'
  })
}
export function getInfo(accessToken) {
  return request({
    url: '/admin/user/getUserInfo',
    method: 'get',
    params: { accessToken }
  })
}
export function getUserFunc(accessToken) {
  return request({
    url: '/admin/user/getUserFunc',
    method: 'get',
    params: { accessToken }
  })
}

