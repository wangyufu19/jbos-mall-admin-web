import request from "@/utils/request";

export function getCacheDictCodeList(params) {
  return request({
    url: '/admin/dict/getCacheDictCodeList',
    method: 'get',
    params
  })
}

export function getDictTypeList(params) {
  return request({
    url: '/admin/dict/getDictTypeList',
    method: 'get',
    params
  })
}
export function addDictType(data) {
  return request({
    url: '/admin/dict/addDictType',
    method: 'post',
    data
  })
}
export function updateDictType(data) {
  return request({
    url: '/admin/dict/updateDictType',
    method: 'post',
    data
  })
}
export function deleteDictType(data) {
  return request({
    url: '/admin/dict/deleteDictType',
    method: 'post',
    data
  })
}
export function getDictCodeList(params) {
  return request({
    url: '/admin/dict/getDictCodeList',
    method: 'get',
    params
  })
}

export function saveDictCode(data) {
  return request({
    url: '/admin/dict/saveDictCode',
    method: 'post',
    data
  })
}

