import request from '@/utils/request'


export function listPrinter() {
    return request({
        url: '/web/printer',
        method: 'get',
        
    })
}
export function updatePrinter(data) {
    console.log(data)
    return request({
        url: '/web/printer',
        method: 'put',
        data
    })
}