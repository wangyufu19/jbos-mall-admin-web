import request from "@/utils/request";

export function getRoleChildrenNode(params) {
  return request({
    url: '/admin/role/getRoleChildrenNode',
    method: 'get',
    params
  })
}
export function getRoleList(params) {
  return request({
    url: '/admin/role/getRoleList',
    method: 'get',
    params
  })
}
export function getRoleFuncs(params) {
  return request({
    url: '/admin/role/getRoleFuncs',
    method: 'get',
    params
  })
}
export function saveRoleFuncs(data) {
  return request({
    url: '/admin/role/saveRoleFuncs',
    method: 'post',
    data
  })
}
export function addRole(data) {
  return request({
    url: '/admin/role/addRole',
    method: 'post',
    data
  })
}
export function updateRole(data) {
  return request({
    url: '/admin/role/updateRole',
    method: 'post',
    data
  })
}
export function deleteRole(data) {
  return request({
    url: '/admin/role/deleteRole',
    method: 'post',
    data
  })
}

export function getRoleEmpList(params) {
  return request({
    url: '/admin/role/getRoleEmpList',
    method: 'get',
    params
  })
}

export function getSelectRoleEmpList(params) {
  return request({
    url: '/admin/role/getSelectRoleEmpList',
    method: 'get',
    params
  })
}
export function addRoleUser(data) {
  return request({
    url: '/admin/role/addRoleUser',
    method: 'post',
    data
  })
}

