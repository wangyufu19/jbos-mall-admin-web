import request from "@/utils/request";

export function getFeeChildrenNode(params) {
  return request({
    url: '/admin/fee/getFeeChildrenNode',
    method: 'get',
    params
  })
}
