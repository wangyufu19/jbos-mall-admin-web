  import request from "@/utils/request";


  export function getBizNo(params) {
    return request({
      url: '/admin/reimburse/fee/getBizNo',
      method: 'get',
      params
    })
  }
  export function list(params) {
    return request({
      url: '/admin/reimburse/fee/list',
      method: 'get',
      params
    })
  }
  export function infoById(params) {
    return request({
      url: '/admin/reimburse/fee/infoById',
      method: 'get',
      params
    })
  }
  export function add(data) {
    return request({
      url: '/admin/reimburse/fee/add',
      method: 'post',
      data
    })
  }
  export function update(data) {
    return request({
      url: '/admin/reimburse/fee/update',
      method: 'post',
      data
    })
  }
  export function deleteOne(data) {
    return request({
      url: '/admin/reimburse/fee/deleteOne',
      method: 'post',
      data
    })
  }
  export function startTrans(data) {
    return request({
      url: '/admin/reimburse/fee/startTrans',
      method: 'post',
      data
    })
  }
  export function doTrans(data) {
    return request({
      url: '/admin/reimburse/fee/doTrans',
      method: 'post',
      data
    })
  }
  export function doDrawback(data) {
    return request({
      url: '/admin/reimburse/fee/doDrawback',
      method: 'post',
      data
    })
  }