const app = getApp() // 引入app
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navList: [
      // {
      //   id: 0,
      //   title: "配送地址",
      //   ico: "../../images/distribution-address.png",
      //   navUrl: "/pages/distribution/distribution"
      // },
      {
        id: 1,
        title: "订单记录",
        ico: "../../images/print.png",
        navUrl: "/pages/mine/orders/orders"

      },
      {
        id: 2,
        title: "打印价格",
        ico: "../../images/topup.png",
        navUrl: "/pages/mine/view_price/view_price"
      },
      {
        id: 2,
        title: "我的挂账",
        ico: "../../images/credit.png",
        navUrl: "/pages/mine/view_price/view_price"

      },

      // {
      //   id: 3,
      //   title: "我的卡券",
      //   ico: "../../images/coupons.png",
      //   navUrl: "/pages/mine/order/order"

      // },
      {
        id: 4,
        title: "意见反馈",
        ico: "../../images/feedback.png",
        navUrl: "/pages/mine/feedback/feedback"

      },
      {
        id: 5,
        title: "入驻合作",
        ico: "../../images/settle-in.png",
        navUrl: "/pages/mine/settled/settled"

      },
    ],
    userInfo: "",
    hasUserInfo: "",
    balance: 0,
  },
  onLoad() {
  this.setData({
    hasUserInfo: app.globalData.hasUserInfo,
    userInfo: app.globalData.userInfo
  })

  },
  getUserProfile(e) {

    wx.getUserProfile({
      desc: '用于完善会员资料', 
      success: (res) => {
        console.log(res)
        this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
          }),
          app.globalData.userInfo = res.userInfo
        
        wx.setStorageSync('userInfo', res.userInfo)
        wx.setStorageSync('hasUserInfo', true)
      }
    })
  },
  handleContact(){
    
  }
})