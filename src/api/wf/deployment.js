import request from '@/utils/request'

export function getProcessDeploymentList(params) {
  return request({
    url: '/admin/workflow/deployment/getProcessDeploymentList',
    method: 'get',
    params
  })
}

export function deploy(data) {
  return request({
    url: '/admin/workflow/deployment/deploy',
    method: 'post',
    data
  })
}
export function unDeploy(data) {
  return request({
    url: '/admin/workflow/deployment/unDeploy',
    method: 'post',
    data
  })
}

export function getProcessDefinitionList(params) {
  return request({
    url: '/admin/workflow/deployment/getProcessDefinitionList',
    method: 'get',
    params
  })
}