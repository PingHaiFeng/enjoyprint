const app = getApp() // 引入app
import {workUrl} from "../../../config"
Page({

  data: {
    web_src:null,
  },
  onLoad: function (options) {
    var timestamp = Date.parse(new Date());
    var web_src=`${workUrl}/local_upload?timestamp=${timestamp}`
    this.setData({
      web_src: web_src,
    })
  },
  // 接收 h5 页面传递过来的参数
  handlePostMessage: function (e) {
    let resObj = e.detail.data[e.detail.data.length - 1];
    let file_info = resObj.data
    let print_price = (file_info.print_info["print_page_num"] * app.globalData.defaultUnitPrice).toFixed(2)
    let file_path = file_info.file_path
    console.log(file_path)
    wx.downloadFile({
      url: file_path,
      success: res => {
        var rr = res.tempFilePath;
        file_info.file_path = rr
        console.log(file_info)
        file_info["print_price"] = print_price
        app.globalData.tempFile_list.push(file_info)
        if (file_info) {
          wx.showModal({
            title:"提示",
            content:"文件上传成功，是否返回列表？",
            confirmColor:"#5f98fd",
            confirmText:"返回列表",
            cancelText:"继续上传",
            success (res) {
              if (res.confirm) {
                wx.redirectTo({
                  url: '/pages/goupload/goupload',
                })
              } else if (res.cancel) {
               
              }
            }
          })
      
        }
      }
    })




  }
})