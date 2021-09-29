import request from "@/utils/request";

export function getMaterailList(params) {
  return request({
    url: '/admin//material/list/list',
    method: 'get',
    params
  })
}
