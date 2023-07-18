import request from "@/utils/request";

export function getMaterialChildrenNode(params) {
  return request({
    url: '/admin/material/getMaterialChildrenNode',
    method: 'get',
    params
  })
}
