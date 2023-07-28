
import request from "@/utils/request";

export function getProjectPacketList(params) {
  return request({
    url: '/admin/abs/getProjectPacketList',
    method: 'get',
    params
  })
}
export function packet(data) {
  return request({
    url: '/admin/abs/packet',
    method: 'post',
    data
  })
}
export function unPacket(data) {
    return request({
      url: '/admin/abs/packet',
      method: 'post',
      data
    })
  }