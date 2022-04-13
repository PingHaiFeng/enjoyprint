import request from '@/utils/request'


export function getStoreDetail() {
    return request({
        url: '/web/store-detail',
        method: 'get',
        
    })
}
export function setStoreDetail(data) {
    console.log(data)
    return request({
        url: '/web/set_store_detail',
        method: 'post',
        data
    })
}