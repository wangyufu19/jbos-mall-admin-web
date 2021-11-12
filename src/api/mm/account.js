import request from "@/utils/request";

export function registry(data) {
  return request({
    url: '/member/account/registry',
    method: 'post',
    data
  })
}
