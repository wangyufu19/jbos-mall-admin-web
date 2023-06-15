import request from '@/utils/request'

export function startProcessInstance(data) {
  return request({
    url: '/admin/workflow/instance/startProcessInstance',
    method: 'post',
    data
  })
}

export function getProcessInstanceList(params) {
  return request({
    url: '/admin/workflow/instance/getProcessInstanceList',
    method: 'get',
    params
  })
}
export function getProcessInstanceVariableList(params) {
  return request({
    url: '/admin/workflow/instance/getProcessInstanceVariableList',
    method: 'get',
    params
  })
}

export function getProcessInstanceCurrentActivityId(params) {
  return request({
    url: '/admin/workflow/instance/getProcessInstanceCurrentActivityId',
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
export function deleteProcessInstance(data) {
  return request({
    url: '/admin/workflow/instance/deleteProcessInstance',
    method: 'post',
    data
  })
}
