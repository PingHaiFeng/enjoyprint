// pages/pay/outpaper/outpaper.js
const $ag= getApp().globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    outPaperType:0,
    optList:[
      {id:1,title:"立即出纸",intro:"下单后立即打印"},
      {id:2,title:"预约出纸",intro:"预约某个时间段打印出纸"},
      {id:3,title:"到店扫码出纸",intro:"下单后不会立即出纸，需到该店扫打印机上的确认码后才会出纸"}
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      outPaperType: $ag.userPrintSettingParams.outPaperType
     })
  },
  changePayType(e) {
    var id = e.currentTarget.dataset.index
    this.setData({
     outPaperType: id
    })
  },
  onConfirm(){
    $ag.userPrintSettingParams.outPaperType=this.data.outPaperType
    $ag.userPrintSettingParams.outPaperTypeStr=this.data.optList[this.data.outPaperType].title
    wx.navigateBack({
      delta: 1,
    })
  }
})