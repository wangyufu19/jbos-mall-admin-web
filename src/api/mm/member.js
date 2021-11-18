import request from "@/utils/request";

export function get(params) {
  return request({
    url: '/member/info/get',
    method: 'get',
    params
  })
}
export function update(data) {
  return request({
    url: '/member/info/update',
    method: 'post',
    data
  })
}
