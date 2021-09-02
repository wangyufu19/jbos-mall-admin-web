import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}
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

