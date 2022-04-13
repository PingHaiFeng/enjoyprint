import request from '@/utils/request'


export function getPrinters(data) {
    console.log(data)
    return request({
        url: '/web/get_printers_info',
        method: 'post',
        data
    })
}
export function setPrinters(data) {
    console.log(data)
    return request({
        url: '/web/set_printers_info',
        method: 'post',
        data
    })
}