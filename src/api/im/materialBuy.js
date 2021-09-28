import request from "@/utils/request";

export function list(params) {
  return request({
    url: '/admin//material/buy/list',
    method: 'get',
    params
  })
}
export function byId(params) {
  return request({
    url: '/admin//material/buy/id',
    method: 'get',
    params
  })
}
export function add(data) {
  return request({
    url: '/admin//material/buy/add',
    method: 'post',
    data
  })
}
export function update(data) {
  return request({
    url: '/admin//material/buy/update',
    method: 'post',
    data
  })
}
export function deleteOne(data) {
  return request({
    url: '/admin//material/buy/deleteOne',
    method: 'post',
    data
  })
}
