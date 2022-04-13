// const baseUrl = "https://cloudprint.pinghaifeng.cn:5300/mini"
import {
  baseUrl
} from "../config.js"
const app = getApp()



export default async function request(config) {
  wx.showLoading({
    title: '加载中',
  })
  const openid = getApp().globalData.openid
  if (!openid) {
    await getApp().getUserOpenId()
  }
  return new Promise((resolve, reject) => {
    const header = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'OpenID': getApp().globalData.openid
    }
    wx.request({
      url: baseUrl + config.url,
      header: header,
      method: config.method,
      data: config.data,
      success: function (res) {
        if (res.data.state == 1) { // 请求成功
          var resData = res.data.data
          wx.hideLoading()
          resolve(resData)
        } else {
          wx.hideLoading()
          reject()
        }
      },
      fail: function (err) {
        wx.hideLoading()
        reject(err)
      }
    })
  })
}