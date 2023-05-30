import request from "@/utils/request";


export function getBizno(params) {
  return request({
    url: '/admin/material/buy/bizno',
    method: 'get',
    params
  })
}
export function list(params) {
  return request({
    url: '/admin/material/buy/list',
    method: 'get',
    params
  })
}
export function infoById(params) {
  return request({
    url: '/admin/material/buy/infoById',
    method: 'get',
    params
  })
}
export function add(data) {
  return request({
    url: '/admin/material/buy/add',
    method: 'post',
    data
  })
}
export function update(data) {
  return request({
    url: '/admin/material/buy/update',
    method: 'post',
    data
  })
}
export function startTrans(data) {
  return request({
    url: '/admin/material/buy/startTrans',
    method: 'post',
    data
  })
}
export function deleteOne(data) {
  return request({
    url: '/admin/material/buy/deleteOne',
    method: 'post',
    data
  })
}
export function doTrans(data) {
  return request({
    url: '/admin/material/buy/doTrans',
    method: 'post',
    data
  })
}
export function doDrawback(data) {
  return request({
    url: '/admin/material/buy/doDrawback',
    method: 'post',
    data
  })
}
