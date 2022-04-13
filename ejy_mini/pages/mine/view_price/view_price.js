// pages/mine/view_price/view_peice.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    price_list: [],
    havePrice: true,
    store_name: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var price_list = app.globalData.price_list
    if (price_list) {
      if (price_list.length > 0) {
        this.setData({
          price_list: price_list,
          store_name: app.globalData.account_info.store_name,
          havePrice: true
        })
      } else {
        this.setData({
          havePrice: false
        })
      }
    } else {
      this.setData({
        havePrice: false
      })
      wx.showModal({
        title: "提示",
        content: "请先选择打印店铺",
        showCancel: false,
        confirmColor: '#5f98fd',
        success: res => {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/index/choose-store/choose-store',
            })

          }
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})