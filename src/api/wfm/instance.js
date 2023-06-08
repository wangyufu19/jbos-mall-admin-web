import request from '@/utils/request'

export function getProcessInstanceList(params) {
  return request({
    url: '/admin/workflow/instance/getProcessInstanceList',
    method: 'get',
    params
  })
}

export function suspendProcessInstance(data) {
  return request({
    url: '/admin/workflow/instance/suspendProcessInstance',
    method: 'post',
    data
  })
}
export function activateProcessInstance(data) {
  return request({
    url: '/admin/workflow/instance/activateProcessInstance',
    method: 'post',
    data
  })
}