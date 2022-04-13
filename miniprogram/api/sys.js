import request from '../utils/request.js'

// 获取轮播图
export function getSwiper(data) {
    return request({
        url: '/get_swiper',
        method: 'POST',
        data
    })
}


// 获取字典数据
export function getDict(data) {
    return request({
        url: '/dict',
        method: 'POST',
        data
    })
}