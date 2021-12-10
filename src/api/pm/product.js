import request from "@/utils/request";

export function list(params) {
  return request({
    url: '/product/list',
    method: 'get',
    params
  })
}
export function getNo(params) {
  return request({
    url: '/product/getNo',
    method: 'get',
    params
  })
}
export function get(params) {
  return request({
    url: '/product/get',
    method: 'get',
    params
  })
}
export function add(data) {
  return request({
    url: '/product/add',
    method: 'post',
    data
  })
}
export function saveDraft(data) {
  return request({
    url: '/product/saveDraft',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/product/update',
    method: 'post',
    data
  })
}
export function offShelfOne(data) {
  return request({
    url: '/product/offShelfOne',
    method: 'post',
    data
  })
}
export function shelfOne(data) {
  return request({
    url: '/product/shelfOne',
    method: 'post',
    data
  })
}

