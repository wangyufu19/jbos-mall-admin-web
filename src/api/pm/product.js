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

export function update(data) {
  return request({
    url: '/product/update',
    method: 'post',
    data
  })
}
export function deleteOne(data) {
  return request({
    url: '/product/deleteOne',
    method: 'post',
    data
  })
}