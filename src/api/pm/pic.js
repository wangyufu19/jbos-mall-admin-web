import request from "@/utils/request";

export function deletePic(data) {
  return request({
    url: '/product/io/delete',
    method: 'post',
    data
  })
}
