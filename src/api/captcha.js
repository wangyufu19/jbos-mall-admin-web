import request from '@/utils/request'

export function captcha(data) {
  return request({
    url: '/admin/captcha',
    method: 'post',
    data
  })
}
