import request from "@/utils/request";


export function sumList(params) {
    return request({
        url: '/admin/material/store/sumList',
        method: 'get',
        params
    })
}

export function list(params) {
    return request({
        url: '/admin/material/store/list',
        method: 'get',
        params
    })
}