// miniprogram/pages/feedback/feedback.js
const app = getApp()
import {
    sendSuggestion
} from "../../../api/user.js";
const qiniuUploader = require("../../../utils/qiniuUploader")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        suggestion: "",
        isUploadPic: false,
        tempFilePaths: [],
        qiniuImgUrlPaths: [],

    },
    onLoad() {
        if (!app.globalData.userInfo) {
            wx.showModal({
                showCancel: false,
                confirmColor: "#5f98fd",
                content: "亲，请先登录",
                success: res => {
                    wx.switchTab({
                        url: '/pages/mine/mine',
                    })
                }
            })
        }

    },
    sendSuggestionData: function () {
        var that = this
        if (this.data.suggestion.length == 0) {
            wx.showToast({
                title: '请输入文字',
                icon: "none"
            })
            return;
        }

        let data = {
            'suggestion': this.data.suggestion,
            'nick_name': app.globalData.userInfo.nickName,
            'avatar_url': app.globalData.userInfo.avatarUrl,
            "picture": this.data.qiniuImgUrlPaths.toString(),
            "store_id": app.globalData.account_info.store_id,
            'plat': '小程序'
        }
        sendSuggestion(data).then(res => {
            wx.showModal({
                showCancel: false,
                title: "感谢反馈",
                content: "小主您的问题我们收到啦~",
                confirm: "好的",
                confirmColor: "#5f98fd"
            })
            that.setData({
                suggestion: "",

                tempFilePaths: [],
                qiniuImgUrlPaths: []
            })
        })



    },
    getSuggestion(e) {
        // 获取到建议
        let value = e.detail.value
        this.setData({
            suggestion: value
        })
    },
    goUploadPic() {

        var that = this
        var qiniuImgUrlPaths = this.data.qiniuImgUrlPaths
        if (this.data.tempFilePaths.length <= 9) {
            wx.chooseImage({
                count: 1,
                sizeType: ['compressed'],
                sourceType: ['album', 'camera'],
                success: res => {

                    var path = res.tempFilePaths[0]
                    var name = path.split('/')[-1]
                    console.log(path)
                    qiniuUploader.upload(path, res => {
                        console.log("七牛云上传成功", res.imageURL)
                        qiniuImgUrlPaths.push(res.imageURL)
                        this.setData({
                            qiniuImgUrlPaths: qiniuImgUrlPaths
                        })
                    })
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
                var qiniuImgUrlPaths = _this.data.qiniuImgUrlPaths
                tempFilePaths.splice(index, 1)
                qiniuImgUrlPaths.splice(index, 1)
                _this.setData({
                    tempFilePaths: tempFilePaths,
                    qiniuImgUrlPaths: qiniuImgUrlPaths
                })
            }
          }
        })
    
      }

})