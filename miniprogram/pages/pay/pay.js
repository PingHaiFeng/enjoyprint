const app = getApp() // 引入app
const $ag = getApp().globalData
Page({
  data: {
    totalPrice: 0,
    tempFile_list: [],
    payType: 1,
    userPrintSettingParams: {
      outPaperType: 0
    }
  },
  onLoad() {

    this.setData({
      printers_params: app.globalData.printers_params,
      currentPrinterIndex: app.globalData.currentPrinterIndex,
      account_info: app.globalData.account_info,
      totalPrice: app.globalData.totalPrice,
      tempFile_list: app.globalData.tempFile_list
    })
  },
  onShow() {
    this.setData({
      outPaperTypeStr: $ag.userPrintSettingParams.outPaperTypeStr
    })
  },
  changePayType(e) {
    var id = e.currentTarget.dataset.index
    this.setData({
      payType: id
    })
  },


  goOutPaperPage() {
    wx.navigateTo({
      url: '/pages/pay/outpaper/outpaper',
    })
  },

  goPay() {
    if (this.data.payType == 2) {
      wx.redirectTo({
        url: '/pages/pay/payover/payover',
      })
      return
    }


    wx.showLoading({
      title: '支付中',
    })
    var that = this
    // 小程序代码
    console.log(app.globalData.openid)
    wx.cloud.callFunction({
      name: 'pay',
      data: {
        goodName: "云即印打印",
        totalFee: parseFloat(app.globalData.totalPrice) * 100
  
        // totalFee: 1
      },
      success: res => {
        wx.hideLoading({

        })
        console.log("获取支付参数成功", res)
        const payment = res.result.payment
        wx.requestPayment({
          ...payment,
          success(res) {
            that.setData({
              isPayed: true,
              paySuccess: true
            })
            wx.hideLoading({
              success: (res) => {},
            })
            wx.redirectTo({
              url: '/pages/pay/payover/payover',
            })


          },
          fail(err) {
            console.error('pay fail', err)
            wx.hideLoading()

          }
        })
      },
      fail: console.error,
    })
  },
})