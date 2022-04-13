import request from '../utils/request.js'

// 获取文件夹
export function getFolderList(data) {
    return request({
        url: '/list-folder',
        method: 'POST',
        data
    })
}

// 获取文件
export function getDocList(data) {
  return request({
      url: '/list-doc',
      method: 'POST',
      data
  })
}
// 列表文件确认打印
export function onLibPrint(id) {
    return request({
        url: '/lib-print?id='+id,
        method: 'GET',
 
    })
  }
