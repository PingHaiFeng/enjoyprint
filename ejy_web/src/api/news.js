import request from '@/utils/request'


export function getNotice() {
    return request({
        url: '/web/notice',
        method: 'get',
    })
}