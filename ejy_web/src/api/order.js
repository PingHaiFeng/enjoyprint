import request from '@/utils/request'

// 获取订单列表
export function listOrder(data) {
    return request({
        url: '/web/list-order',
        method: 'post',
        data
    })
}
// 获取文件详情
export function listFileOrder(order_id) {
    return request({
        url: '/web/list-file-order?order_id='+order_id,
        method: 'get',
      
    })
}
// 获取最近营业数据
export function getRecentSales(data) {
    return request({
        url: '/web/recent-sales',
        method: 'post',
        data
    })
}

// 获取历史总营业数据
export function getAllSales(data) {
    return request({
        url: '/web/all-sales',
        method: 'post',
        data
    })
}
