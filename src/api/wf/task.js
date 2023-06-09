import request from '@/utils/request'

export function getMyWorkList(params) {
  return request({
    url: '/admin/workflow/task/getMyWorkList',
    method: 'get',
    params
  })
}
export function getProcessTaskDetailList(params) {
  return request({
    url: '/admin/workflow/task/getProcessTaskDetailList',
    method: 'get',
    params
  })
}
export function getUserTaskStepList(params) {
    return request({
      url: '/admin/workflow/task/getUserTaskStepList',
      method: 'get',
      params
    })
}


