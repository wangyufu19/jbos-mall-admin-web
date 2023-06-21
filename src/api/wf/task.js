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

export function completeUserTask(data) {
  return request({
    url: '/admin/workflow/task/completeUserTask',
    method: 'post',
    data
  })
}

export function assignee(data) {
  return request({
    url: '/admin/workflow/task/assignee',
    method: 'post',
    data
  })
}

export function addAssignee(data) {
  return request({
    url: '/admin/workflow/task/addAssignee',
    method: 'post',
    data
  })
}

export function reduceAssignee(data) {
  return request({
    url: '/admin/workflow/task/reduceAssignee',
    method: 'post',
    data
  })
}




