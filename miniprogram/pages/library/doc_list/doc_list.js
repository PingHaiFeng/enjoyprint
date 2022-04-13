const {
  getDocList
} = require("../../../api/library.js")
const $ag = getApp().globalData
// pages/library/doc_list/doc_list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    folder_id: null,
    print_count: 0,
    docList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      // folder_id: options.folder_id
      folder_id: 1001
    })
    this._getDocList()
  },
  onShow() {
    this.setData({
      print_count: $ag.libSelectedDocList.length
    })
  },
  viewDoc(e) {
    let idx = e.currentTarget.dataset.idx
    let doc_item = this.data.docList[idx]

    wx.navigateTo({
      url: '/pages/library/reader/reader?file_name=' + doc_item.file_id + "." + doc_item.file_type,
    })
  },
  _getDocList() {
    let data = {
      folder_id: this.data.folder_id
    }
    getDocList(data).then(res => {
      this.setData({
        docList: res.list
      })
    }).catch(err => console.log(err))
  },
  addFile(e) {
    let idx = e.currentTarget.dataset.idx
    let print_count = this.data.print_count
    print_count += 1
    this.setData({
      print_count: print_count
    })
    $ag.libSelectedDocList.push(this.data.docList[idx])
    wx.showToast({
      icon: "none",
      title: '添加成功',
    })
  },
  viewPrintFileList() {
    wx.navigateTo({
      url: '/pages/library/list_viewer/list_viewer',
    })
  }
})