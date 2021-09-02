import request from "@/utils/request";

export function getDepList(params) {
  return request({
    url: '/admin/dep/getDepList',
    method: 'get',
    params
  })
}
export function addDep(data) {
  return request({
    url: '/admin/dep/addDep',
    method: 'post',
    data
  })
}

export function updateDep(data) {
  return request({
    url: '/admin/dep/updateDep',
    method: 'post',
    data
  })
}

export function deleteDep(data) {
  return request({
    url: '/admin/dep/deleteDep',
    method: 'post',
    data
  })
}
