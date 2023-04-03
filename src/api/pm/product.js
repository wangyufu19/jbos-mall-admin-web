import request from "@/utils/request";

export function list(params) {
  return request({
    url: '/business/product/list',
    method: 'get',
    params
  })
}
export function getNo(params) {
  return request({
    url: '/business/product/getNo',
    method: 'get',
    params
  })
}
export function get(params) {
  return request({
    url: '/business/product/get',
    method: 'get',
    params
  })
}
export function add(data) {
  return request({
    url: '/business/product/add',
    method: 'post',
    data
  })
}
export function saveDraft(data) {
  return request({
    url: '/business/product/saveDraft',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/business/product/update',
    method: 'post',
    data
  })
}
export function offShelfOne(data) {
  return request({
    url: '/business/product/offShelfOne',
    method: 'post',
    data
  })
}
export function shelfOne(data) {
  return request({
    url: '/business/product/shelfOne',
    method: 'post',
    data
  })
}
export function deleteOne(data) {
  return request({
    url: '/business/product/deleteOne',
    method: 'post',
    data
  })
}


