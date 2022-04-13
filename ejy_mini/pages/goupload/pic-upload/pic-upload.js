// pages/goupload/pic_upload/pic_upload.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempFilePaths: [],
    isUploadPic: false
  },

  onLoad: function (options) {},
  goUploadPic() {
    var that = this
    wx.showActionSheet({
      itemList: ['手机相册', '微信聊天图片', '拍照'],
      success(res) {
        let idx = res.tapIndex
        switch (idx) {
          case 0:
            that.chooseImage('album')
            break
          case 1:
            that.chooseWxMessageImage()
            break
          case 2:
            that.chooseImage('camera')
            break

        }
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })

  },
  chooseWxMessageImage() {
    var that=this
    wx.chooseMessageFile({
      count: 1,
      type: "image",
      success: res => {
        console.log(res)
        var tempFilePaths = that.data.tempFilePaths
        tempFilePaths.push(res.tempFiles[0].path)
        that.setData({
          tempFilePaths: tempFilePaths,
          isUploadPic: true
        })
      }
    })
  },
  chooseImage(sourceType) {
    var that=this
    if (that.data.tempFilePaths.length <= 30) {
      wx.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: [sourceType],
        success: res => {
          var tempFilePaths = that.data.tempFilePaths
          tempFilePaths.push(res.tempFilePaths[0])
          that.setData({
            tempFilePaths: tempFilePaths,
            isUploadPic: true
          })
          console.log(that.data.tempFilePaths)
        }
      })
    } else {
      wx.showToast({
        icon: "none",
        title: '图片达到上限',
      })
    }
  },
  previewImage(e) {
    var index = parseInt(e.currentTarget.dataset.index)
    console.log(index)
    wx.previewImage({
      urls: this.data.tempFilePaths,
      current: this.data.tempFilePaths[index]
    })
  },
  deleteImage(e) {
    var _this=this
    wx.showModal({
      cancelColor: '#bfbfbf',
      confirmColor:"#5f98fd",
      content:"确认删除吗？",
      title:"提示",
      success:res=>{
        if(res.confirm){
          var index = parseInt(e.currentTarget.dataset.index)
          var tempFilePaths = _this.data.tempFilePaths
          tempFilePaths.splice(index, 1)
          _this.setData({
            tempFilePaths: tempFilePaths
      
          })
        }
      }
    })

  }
})