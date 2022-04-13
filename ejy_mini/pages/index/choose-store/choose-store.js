// pages/index/choose-store/choose-store.js
const app = getApp()
const global = app.globalData
import {
  listStore
} from "../../../api/store.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentAreaIndex: -1,
    storeSelected: {},
    storeList: [],
    areaList: [],
    areaListNoRepeat: [],
    areaSelectedStores: []
  },

  onLoad: function (options) {
    this.getStoreListData()
    // this.getLocation()
  },
  async getStoreListData() {
    listStore().then(res => {
      var storeList = res.list
      var areaList = []
      var areaListNoRepeat = []
      for (let i = 0; i < storeList.length; i++) {
        areaList.push(storeList[i].area)
      }
      areaListNoRepeat = Array.from(new Set(areaList))
      this.setData({
        storeList: storeList,
        areaList: areaList,
        areaListNoRepeat: areaListNoRepeat
      })
    })
  },
  getLocation() {
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
        console.log(latitude, longitude)
      }
    })
  },
  unfoldStore(e) {
    var index = e.currentTarget.dataset.index
    if (this.data.currentAreaIndex != index) {
      this.setData({
        currentAreaIndex: index
      })
    } else {
      this.setData({
        currentAreaIndex: -1
      })
    }
    var areaListNoRepeat = this.data.areaListNoRepeat
    var areaSelectedStores = []

    for (let i = 0; i < this.data.storeList.length; i++) {
      if (this.data.storeList[i].area == areaListNoRepeat[index]) {
        areaSelectedStores.push(this.data.storeList[i])
      }
    }
    this.setData({
      areaSelectedStores: areaSelectedStores,

    })


  },

chooseStore(e) {

    var index2 = e.currentTarget.dataset.index2
    this.setData({
      account_info: this.data.areaSelectedStores[index2]
    })
    global.account_info = this.data.areaSelectedStores[index2]
    wx.setStorageSync('store_id', global.account_info.store_id)
    app.getStoreInfo( global.account_info.store_id).then(res => {
      wx.navigateBack({
        delta: 1,
      })
    })







  }
})