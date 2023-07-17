import request from "@/utils/request";


  export function getBizNo(params) {
    return request({
      url: '/admin/material/inStore/getBizNo',
      method: 'get',
      params
    })
  }
  export function list(params) {
    return request({
      url: '/admin/material/inStore/list',
      method: 'get',
      params
    })
  }
  export function infoById(params) {
    return request({
      url: '/admin/material/inStore/infoById',
      method: 'get',
      params
    })
  }
  export function add(data) {
    return request({
      url: '/admin/material/inStore/add',
      method: 'post',
      data
    })
  }
  export function update(data) {
    return request({
      url: '/admin/material/inStore/update',
      method: 'post',
      data
    })
  }
  export function deleteOne(data) {
    return request({
      url: '/admin/material/inStore/deleteOne',
      method: 'post',
      data
    })
  }
  export function startTrans(data) {
    return request({
      url: '/admin/material/inStore/startTrans',
      method: 'post',
      data
    })
  }
  export function doTrans(data) {
    return request({
      url: '/admin/material/inStore/doTrans',
      method: 'post',
      data
    })
  }
  export function doDrawback(data) {
    return request({
      url: '/admin/material/inStore/doDrawback',
      method: 'post',
      data
    })
  }