const app = getApp()
const $ag = app.globalData
import {
  swiperImgUrl
} from "../../config.js"

Page({
  data: {
    showPrintType: true,
    printType: [{
        id: 1,
        title: "文档图片打印",
        img: "../../images/print-colorful.png",
        tips: "pdf/doc/ppt/jpg/png格式"
      },
      {
        id: 2,
        title: "证件复印",
        img: "../../images/copy.png",
        tips: "户口本/驾驶证/银行卡/身份证"
      },
      {
        id: 3,
        title: "共享文档打印",
        img: "../../images/print-picture.png",
        tips: "大学四六级/思修/马原等"
      },
      {
        id: 4,
        title: "智能证件照",
        img: "../../images/print-idcard.png",
        tips: "AI证件照"
      }
    ],
    swiperImgList: ["http://shopapi.pinghaifeng.cn/image/1.png", "http://shopapi.pinghaifeng.cn/image/2.png"],
    account_info: null,
    timestamp: '',
    pcOnline: false, //店铺是否在线
    isFromScanOpen: false, //是否扫码打开
  },
  onLoad(options) {
    this.getSwiper()
    this.initData(decodeURIComponent(options.q))

  },
  onShow() {
    this.setData({
      account_info: $ag.account_info,
    })
  },
  //解析数据
  initData(q) {
    if (q != "undefined") {
      const store_id = this.getQueryVariable(q, "store_id")
      const printer_id = this.getQueryVariable(q, "printer_id")
      app.getStoreInfo(store_id).then(res=>{
        this.setData({
          isFromScanOpen: true,
          account_info: $ag.account_info
        })
      })
    } else {
      var store_id = wx.getStorageSync('store_id')
      if (store_id) {
        app.getStoreInfo(store_id).then(res=>{
          this.setData({
            isFromScanOpen: false,
            account_info: $ag.account_info
          })
        })
      }
    }
  },
  //显示公告窗口
  showAnnounce() {
    wx.showModal({
      title: "店铺公告",
      showCancel: false,
      confirmText: "确定",
      content: this.data.store_announce,
      confirmColor: '#5f98fd',
    })
  },
  //获取轮播图
  getSwiper() {
    let timestamp = Date.parse(new Date()) / 1000;
    // let swiperImgList = `${swiperImgUrl}/1.jpg?timestamp=${timestamp}`
    this.setData({
      // swiperImgList: swiperImgList,
      timestamp: timestamp
    })
  },
  //判断能否打印
  selectMeau(e) {
    var index = e.currentTarget.dataset.index
    switch (index) {
      case 0:
        if ($ag.account_info == null) {
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
          return
        }
        if ($ag.printers_params == null) {
          console.log("参数为空")
          wx.showLoading({
            title: '加载中',
          })

          app.getStoreInfo().then(res => {
            wx.hideLoading()
            wx.navigateTo({
              url: '/pages/goupload/goupload',
            })
          })
        } else {
          wx.navigateTo({
            url: '/pages/goupload/goupload',
          })
        }
        break;
      case 1:
        wx.showModal({
          title: "提示",
          content: "当前店铺暂未开放此功能",
          showCancel: false,
          confirmColor: '#5f98fd',

        })
        break;
      case 2:
        wx.switchTab({
          url: '/pages/library/library',
        })
        break;

      case 3:
        wx.navigateToMiniProgram({
          appId: 'wx19075d9fb62971a9',
        })
        break;
    }
  },
  //获取地址栏参数
  getQueryVariable(q, variable) {
    var query = q.split("?")[1];
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] == variable) {
        return pair[1];
      }
    }
    return (false);
  }
})