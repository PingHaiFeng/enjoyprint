import request from '../utils/request.js'

// 获取订单
export function listOrder() {
  return request({
      url: '/order-list',
      method: 'get',
  })
}
// 获取文件订单
export function listFileOrder(order_id) {
  return request({
      url: '/file-order-list?order_id='+order_id,
      method: 'get',
  })
}
// 获取取件码
export function getTakeId(data) {
  return request({
      url: '/take-id',
      method: 'POST',
      data
  })
}
// 设置订单
export function setOrders(data) {
  return request({
      url: '/set_orders',
      method: 'POST',
      data
  })
}
// 发送反馈意见
export function sendSuggestion(data) {
    return request({
        url: '/user_advice',
        method: 'POST',
        data
    })
}
// 打印任务发送
export function execPrint(data) {
  return request({
      url: '/exe_print',
      method: 'POST',
      data
  })
}

