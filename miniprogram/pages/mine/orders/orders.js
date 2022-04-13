// pages/order/order.js
const app = getApp()
import {
  listOrder
} from "../../../api/user.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    haveOrder: false,

    orderList: [],
    haveOrder: false,
    alreadyLoad: false,
    clientHeight: null,
    currentTab: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getScreenInfo()
    this.getOrdersData()
  },
  getScreenInfo() {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          clientHeight: res.windowHeight - 50
        });
      }
    });
  },
  async getOrdersData() {
    listOrder().then(res => {
      this.setData({
        orderList: res.list,
        haveOrder: true,
        alreadyLoad: true
      })
    }).catch(err => {
      this.setData({
        alreadyLoad: true,
        haveOrder: false
      })
    })

  },
  //菜单切换
  handleMeauChange(e) {
    this.setData({
      topBarCurrentIndex: e.currentTarget.dataset.id
    })
  },
  //轮播切换
  handleSwiperChange: function (e) {
    var that = this
    that.setData({
      'currentTab': e.detail.current
    })
  },
  //查看文件详情
  goFileOrderPage(e) {
    let idx = e.currentTarget.dataset.idx
    let order_id = this.data.orderList[idx].order_id
    wx.navigateTo({
      url: `/pages/mine/orders/file-order/file-order?order_id=${order_id}`,
    })
  }
})