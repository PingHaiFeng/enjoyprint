// pages/library/doc_view/doc_view.js
import {docViewUrl} from "../../../config.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var web_src = `${docViewUrl}${options.file_name}?plat=mini`
console.log(web_src)
    this.setData({
      web_src: web_src,
    })
  },

})