import request from '@/utils/request'

export function restartPC() {
    return request({
        url: '/web/pc-restart',
        method: 'get',
    })
}