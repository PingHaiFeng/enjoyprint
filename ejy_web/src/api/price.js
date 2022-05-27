import request from '@/utils/request'


export function listPrice() {
    return request({
        url: '/web/list-price',
        method: 'get',
    })
}
export function getPrice(id) {
    return request({
        url: `/web/price?id=${id}`,
        method: 'get',
       
    })
}
export function addPrice(data) {
    return request({
        url: '/web/price',
        method: 'post',
        data
    })
}
export function updatePrice(data) {
    return request({
        url: '/web/price',
        method: 'put',
        data
    })
}
export function delPrice(id) {
    return request({
        url: `/web/price?id=${id}`,
        method: 'delete',
       
    })
}