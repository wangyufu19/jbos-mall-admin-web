import request from '@/utils/request'

export function getOgrTree(params) {
  return request({
    url: '/admin/org/getOgrTree',
    method: 'get',
    params
  })
}
