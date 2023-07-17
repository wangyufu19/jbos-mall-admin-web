import request from "@/utils/request";

export function list(params) {
    return request({
        url: '/admin/material/store/list',
        method: 'get',
        params
    })
}