import request from "@/utils/request";


  export function getBizNo(params) {
    return request({
      url: '/admin/material/outStore/getBizNo',
      method: 'get',
      params
    })
  }
  export function list(params) {
    return request({
      url: '/admin/material/outStore/list',
      method: 'get',
      params
    })
  }
  export function infoById(params) {
    return request({
      url: '/admin/material/outStore/infoById',
      method: 'get',
      params
    })
  }
  export function add(data) {
    return request({
      url: '/admin/material/outStore/add',
      method: 'post',
      data
    })
  }
  export function update(data) {
    return request({
      url: '/admin/material/outStore/update',
      method: 'post',
      data
    })
  }
  export function deleteOne(data) {
    return request({
      url: '/admin/material/outStore/deleteOne',
      method: 'post',
      data
    })
  }
  export function startTrans(data) {
    return request({
      url: '/admin/material/outStore/startTrans',
      method: 'post',
      data
    })
  }
  export function doTrans(data) {
    return request({
      url: '/admin/material/outStore/doTrans',
      method: 'post',
      data
    })
  }
  export function doDrawback(data) {
    return request({
      url: '/admin/material/outStore/doDrawback',
      method: 'post',
      data
    })
  }