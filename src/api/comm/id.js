import request from '@/utils/request'

export function getBizNo(params) {
    return request({
      url: '/admin/id/getBizNo',
      method: 'get',
      params
    })
}