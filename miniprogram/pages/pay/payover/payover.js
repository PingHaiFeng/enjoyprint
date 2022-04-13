// pages/payover/payover.js
const app = getApp()
const $ag=app.globalData
const util = require("../../../utils/util.js")
import {
  formatTime
} from "../../../utils/util"
import {
  setOrders,execPrint
} from "../../../api/user.js";
Page({
  data: {
    tempFile_list: [],
    unque_id: null,
    take_id: "",
    hasTakeId:false
  },
  onLoad: function (options) {

    this.setData({
      printers_params: $ag.printers_params,
      currentPrinterIndex: $ag.currentPrinterIndex,
      tempFile_list: $ag.tempFile_list,
      unque_id: util.unque_id()
    })
    this.handlePrint()
  },
  sendSubscribeMsg() {
    wx.cloud.callFunction({
      name: 'subscribe',
      data: {
        openid: $ag.openid,
        store_name: $ag.account_info.store_name,
        take_id: this.data.take_id,
        order_id: this.data.unque_id,
        finish_time: formatTime(new Date()),
        price: $ag.totalPrice,
      },
      success: res => {
        console.log(res)
      },
      fail: err => {
        console.log(err)
      }
    })
  },
  handlePrint() {
    let orderData = {
      "store_id": $ag.account_info.store_id,
      'order_id': this.data.unque_id,
      'order_type': 1, //1表示来源于小程序支付
      'openid': $ag.openid,
      "price":$ag.totalPrice,
      "file_count":this.data.tempFile_list.length,
      'tempFile_list': JSON.stringify(this.data.tempFile_list),
      "printer_name": $ag.printers_params[$ag.currentPrinterIndex].printer_name,
    }
    //执行打印
    execPrint(orderData).then(res => {
      this.setData({
        take_id: res.take_id,
        hasTakeId:true
      })
      this.sendSubscribeMsg()
      //设置订单
      orderData["take_id"]=this.data.take_id
      setOrders(orderData).then(res => {
 $ag.tempFile_list=[]
      })
      wx.showToast({
        title: '打印成功',
      })
    }).catch(err => {
      console.log(err)
      wx.showToast({
        icon: 'none',
        title: '打印失败',
      })
    })

  }
})