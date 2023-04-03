import request from "@/utils/request";

export function tree(params) {
  return request({
    url: '/business/product/category/tree',
    method: 'get',
    params
  })
}
export function list(params) {
  return request({
    url: '/business/product/category/list',
    method: 'get',
    params
  })
}
