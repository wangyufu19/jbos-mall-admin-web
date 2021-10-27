import request from '@/utils/request'

export function getMyWorkList(params) {
  return request({
    url: '/admin/dashboard/getMyWorkList',
    method: 'get',
    params
  })
}
