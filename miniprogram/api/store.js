import request from '../utils/request.js'

// 获取店铺列表
export function listStore(data) {
    return request({
        url: '/store-list',
        method: 'GET',
        data
    })
}

//获取店铺在线状态
export function getStoreState(data) {
    return request({
        url: '/online-state',
        method: 'POST',
        data
    })
}
//获取店铺详情
export function getStoreInfo(store_id) {
    return request({
        url: '/store-info?store_id='+store_id,
        method: 'GET',
    })
}
