import {
  getFolderList
} from "../../api/library.js";
Page({
  data: {
    folderList: []
  },
  onLoad() {
    this._getFolderList()
  },
  //获取文件夹
  _getFolderList() {
    getFolderList().then(res => {
      this.setData({
        folderList : res.list
      })
    }).catch(err => console.log(err))
  },
  //跳转传参
  goViewDocList(e) {
    var idx = e.currentTarget.dataset.idx
    wx.navigateTo({
      url: '/pages/library/doc_list/doc_list?folder_id=' + this.data.folderList[idx].folder_id,
    })
  },
  
  onShareAppMessage(options) {
    var that = this;
    // 设置菜单中的转发按钮触发转发事件时的转发内容
    var shareObj = {
      title:"我在用云即印文库", // 默认是小程序的名称(可以写slogan等)
      path: `/pages/library/library`, // 默认是当前页面，必须是以‘/’开头的完整路径
      imageUrl: '', //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
      success: function (res) {
        // 转发成功之后的回调
        if (res.errMsg == 'shareAppMessage:ok') {}
      },
      fail: function () {
        // 转发失败之后的回调
        if (res.errMsg == 'shareAppMessage:fail cancel') {
          // 用户取消转发
        } else if (res.errMsg == 'shareAppMessage:fail') {
          // 转发失败，其中 detail message 为详细失败信息
        }
      },

    };
    // 来自页面内的按钮的转发
    if (options.from == 'button') {
      var eData = options.target.dataset;
      console.log(eData.id); // shareBtn
      // 此处可以修改 shareObj 中的内容
      shareObj.path = `/pages/details/poster_webview/poster_webview?company_id=${this.data.company_id}`;
    }
    // 返回shareObj
    return shareObj;
  }
})