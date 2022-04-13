// pages/library/list_viewer/list_viewer.js
const $ag = getApp().globalData
import {
  onLibPrint
} from "../../../api/library"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    libSelectedDocList: [],
    hasTask: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      libSelectedDocList: $ag.libSelectedDocList
    })
  },
  viewDoc(e) {
    let idx = e.currentTarget.dataset.idx
    let doc_item = this.data.libSelectedDocList[idx]

    wx.navigateTo({
      url: `/pages/library/reader/reader?file_name=${doc_item.file_id}.${doc_item.file_type}`,
    })
  },
  onConfirm(e) {
    let idList = this.data.libSelectedDocList.map(item => {
      return item.id
    })


    for (let i = 0; i < idList.length; i++) {
      onLibPrint(idList[i]).then(res=>{
        console.log(res)
      })
    }
  },
  onDelete(e) {
    var _this = this
    wx.showModal({
      confirmColor: '#5f98fd',
      content: "确认删除吗？",
      success: res => {
        if (res.confirm) {
          let idx = e.currentTarget.dataset.idx
          let libSelectedDocList = _this.data.libSelectedDocList
          libSelectedDocList.splice(idx, 1)
          _this.setData({
            libSelectedDocList: libSelectedDocList

          })
          $ag.libSelectedDocList = libSelectedDocList
        }
      }
    })

  }
})