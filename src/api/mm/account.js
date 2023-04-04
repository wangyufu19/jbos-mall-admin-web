import request from "@/utils/request";

export function registry(data) {
  return request({
    url: '/admin/member/account/registry',
    method: 'post',
    data
  })
}

export function lock(data) {
  return request({
    url: '/admin/member/account/lock',
    method: 'post',
    data
  })
}

export function unlock(data) {
  return request({
    url: '/admin/member/account/unlock',
    method: 'post',
    data
  })
}


