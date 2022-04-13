

import {
  getStoreInfo
} from "./api/store.js";
App({
  onLaunch() {
    this.initCloud()
    this.getLocalInfo()
    // this.getSystemInfo()
    this.getUserOpenId()



  },
  //云开发初始化
  initCloud() {

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
  },

  //获取设备信息
  getSystemInfo() {
    var basicInfo = {};
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        basicInfo.hh = res.windowHeight, //可使用窗口宽度，单位px(设备相关的实际高度)
          basicInfo.ww = res.windowWidth, //可使用窗口宽度，单位px(设备相关的实际宽度)
          basicInfo.rpxR = 750 / res.windowWidth; //将rpx换算px作为基础换算比例（已宽为标准）
        basicInfo.useH = res.windowHeight * (750 / res.windowWidth); //将使用窗口的实际高度换成以750为基础的高度，方便使用
        basicInfo.userW = res.windowHeight * (750 / res.windowWidth);
        basicInfo.statusBarHeight = res.statusBarHeight; //状态栏的高度，单位px（可用来做页面左上方的自定义按钮）
        basicInfo.pixe = res.pixelRatio; //设备像素比（暂未用到）
        basicInfo.safeArea = res.safeArea; //在竖屏正方向下的安全区域
      }
    })
  },

  //获取OpenId
  async getUserOpenId() {
    await wx.cloud.callFunction({
      name: 'getOpenid',
    }).then(res => {
      this.globalData.openid = res.result.openid
      return this.globalData.openid
    })
  },


  //设置默认选中打印机
  selectPrinter() {
    for (let i = 0; i < this.globalData.printers_params.length; i++) {
      if (this.globalData.printers_params[i].is_user_set_defalut == 1) {
        this.globalData.currentPrinterIndex = i
        return
      }
    }

    this.globalData.currentPrinterIndex = 0
  },
  //获取店铺信息
  getStoreInfo(store_id) {
    return new Promise((resolve, reject) => {
      const global = this.globalData
      getStoreInfo(store_id).then(res => {
        global.price_list = res.store_info.price_list
        global.account_info = res.store_info.account_info
        global.printers_params = res.store_info.printers_params
        global.pcOnline = res.store_info.pc_online
        this.selectPrinter()
        resolve()
      }).catch(err => {
        global.printers_params = {}
        reject()
      })

    })
  },
  //生成单价
  createUnitPrice(print_info) {
    var size = print_info["size"]
    var color = print_info["print_color"] == 1 ? '黑白' : '彩色'
    var duplex = print_info["duplex"] == 1 ? '单面' : '双面'
    for (let i = 0; i < this.globalData.price_list.length; i++) {
      var _gp = this.globalData.price_list[i]
      if (size == _gp.size && duplex == _gp.duplex && color == _gp.color && color == _gp.color) {
        var unit_price = parseFloat(this.globalData.price_list[i].price)
        return unit_price
      }
    }
    wx.showModal({
      title: "提示",
      content: "该店铺未设置此打印类型价格",
      showCancel: false,
      confirmColor: "#5f98fd"
    })
    // if(this.globalData.pcOnline==true){

    // }

  },
  // 获取用户头像等基本资料
  getLocalInfo(e) {
    try {
      var userInfo = wx.getStorageSync('userInfo')
      var hasUserInfo = wx.getStorageSync('hasUserInfo')

      if (userInfo && hasUserInfo == true) {
        this.globalData.hasUserInfo = hasUserInfo,
          this.globalData.userInfo = userInfo

      }
    } catch (e) {
      console.log(e)
    }
  },

  //全局变量存放处
  globalData: {

    openid: null,
    userInfo: null,
    totalPrice: "",
    price_list: null, //价格参数
    account_info: null, //当前选择店铺
    printers_params: null, //所有可用打印机参数
    printerSelected: null, //当前选择打印机名称
    currentPrinterIndex: null, //当前选择打印机索引
    store_announce: null, //店铺公告
    pcOnline: false,
    libSelectedDocList: [], //共享文档待打印列表
    ordersList: [],
    userPrintSettingParams: {
      outPaperType: 0,
      outPaperTypeStr: "立即出纸"
    },
    tempFile_list: []

  },
})