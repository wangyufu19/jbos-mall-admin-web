import request from "@/utils/request";

export function getEmpList(params) {
  return request({
    url: '/admin/emp/getEmpList',
    method: 'get',
    params
  })
}
export function addEmp(data) {
  return request({
    url: '/admin/emp/addEmp',
    method: 'post',
    data
  })
}
export function updateEmp(data) {
  return request({
    url: '/admin/emp/updateEmp',
    method: 'post',
    data
  })
}
export function deleteEmp(data) {
  return request({
    url: '/admin/emp/deleteEmp',
    method: 'post',
    data
  })
}
export function synchToCamunda(data) {
  return request({
    url: '/admin/emp/synchToCamunda',
    method: 'post',
    data
  })
}
export function exportEmp(data) {
  return request({
    url: '/admin/emp/export',
    method: 'post',
    data,
    responseType: "blob"
  })
}
