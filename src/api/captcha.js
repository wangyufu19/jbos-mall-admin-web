import request from '@/utils/request'

export function captcha(data) {
  return request({
    url: '/auth/captcha',
    method: 'post',
    data
  })
}
