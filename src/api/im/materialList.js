import request from "@/utils/request";

export function getMaterialList(params) {
  return request({
    url: '/admin/material/list/list',
    method: 'get',
    params
  })
}
