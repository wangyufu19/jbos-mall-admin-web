import request from "@/utils/request";

export function deletePic(data) {
  return request({
    url: '/business/io/delete',
    method: 'post',
    data
  })
}
