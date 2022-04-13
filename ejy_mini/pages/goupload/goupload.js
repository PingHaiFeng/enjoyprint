const app = getApp() // 引入app
const $ag = app.globalData
const util = require("../../utils/util.js")
import {
    baseUrl
} from "../../config"
Page({
    data: {
        showUploadWindow: false, //展示文件列表窗口
        tempFile_list: [], //打印文件详细信息，文件核心
        temFilePrintParam: [],
        seleTempFileLength: 0, //一次性选择的文件个数
        currentTapFileId: null, //当前操作的文件id号
        totalPrice: "", //总价
        isHaveFile: false,
        showUploadProgress: false, //展示上传进度条
        card: false, //展示上传卡片窗口
        windowMask: true, //遮罩层
        isSettingFileInfo: false, //文件打印参数设置窗口显示
        currenFileIndex: 0, //当前上传的文件序号
        printers_params: null, //打印机参数,
        haveSetPrinter: false, //是否设置至少一台打印机
        currentPrinterIndex: 0,
        printerList: [],
        printable: true
    },
    //获取登录态，未登录无法操作
    onLoad() {
        this.loadFiles()
        this.handleOnline()
    },
    onShow() {
      
        this.calTotalPrice() //计算总价
        this.checkPrintable()
    },
    handleOnline() {
        if ($ag.printers_params.length > 0) {
            var printerList = []
            for (let i = 0; i < $ag.printers_params.length; i++) {
                printerList.push($ag.printers_params[i].printer_name)
            }
            this.setData({
                printerList: printerList,
                printers_params: $ag.printers_params,
                currentPrinterIndex: $ag.currentPrinterIndex,
                haveSetPrinter: true
            })
      
        } else {
            this.setData({
                haveSetPrinter: false
            })
        }
        if ($ag.pcOnline == false) {
            this.showConfirmModal("当前店铺已下线，无法下单，请联系该店管理员")
        }
    },
    //当用户之前有上传文件时加载本地文件列表
    loadFiles() {
        var tempFile_list = $ag.tempFile_list
        if (tempFile_list.length > 0) {
            this.setData({
                card: false,
                windowMask:false,
                showUploadWindow: true,
                isHaveFile: true
            })
            for (let i = 0; i < tempFile_list.length; i++) {
                tempFile_list[i].print_price = this.calcFilePrice(tempFile_list[i].print_info)
            }
            this.setData({
                tempFile_list: tempFile_list,
                totalPrice: $ag.totalPrice,
            })
        } else {
          
            this.setData({
                card: true,
                windowMask:true,
                showUploadWindow: false
            })
        }
    },
    //改变打印机
    bindPrinterChange(e) {
        $ag.currentPrinterIndex = e.detail.value
        this.setData({
            currentPrinterIndex: e.detail.value
        })
        $ag.currentPrinterIndex = e.detail.value
    },

    //上传进度条
    handleUploadProgress(act) {
        this.setData({
            windowMask: act,
            showUploadProgress: act

        })
    },
    //选择微信聊天文件
    chooseMessageFile(e) {
        var that = this
        var seleTempFileLength = 0 //一次性选择的文件数量
        var upload_file_type = ""
        var choose_extension = []
        var optype = e.currentTarget.dataset.optype;
        var icoSrc = ""
        if (optype == 1) { //1为聊天文件
            upload_file_type = 'file'
            var temp = "extension"
            choose_extension = ["docx", "doc", "pdf", "ppt", "pptx"]
            icoSrc = "../../images/file-word.png"
        } else if (optype == 2) { //2为图片文件
            upload_file_type = 'image'
            icoSrc = "../../images/file-image.png"
        }

        wx.chooseMessageFile({
            count: 5,
            type: upload_file_type,
            [temp]: choose_extension,
            success: (res) => {
                this.handleUploadProgress(true)
                this.setData({
                    card: !this.data.card,

                })
                seleTempFileLength = res.tempFiles.length //获取待传输文件总数量
                if (seleTempFileLength == 0) {
                    that.showConfirmModal("文件已过期，无法解析")
                    return
                }
                that.setData({
                    seleTempFileLength: seleTempFileLength
                })
                // 上传文件到翔云服务器
                that.upload(0, res, seleTempFileLength)

            },

        })

    },
    //本地文件上传
    chooseLocalFile(e) {
        wx.redirectTo({
            url: '/pages/goupload/local_upload/local_upload',
        })
    },
    //上传文件
    upload(i, res, seleTempFileLength) {
        var that = this
        wx.uploadFile({
            url: baseUrl + '/upload',
            filePath: res.tempFiles[i].path,
            name: "file",
            formData: {
                'upload_platform': 'MiniProgram', //上传平台为小程序
                "file_id": util.unque_id(),
                'file_name': res.tempFiles[i].name,
                "file_size": res.tempFiles[i].size,
                "file_path": res.tempFiles[i].path
            },
            success: (e) => {
                if (e.statusCode == 200) {
                    let tempFile_list = this.data.tempFile_list
                    var jsonData = JSON.parse(e.data)
                    //判断服务端响应是否出错，成功返回1，失败返回0
                    if (jsonData["state"] == 1) {
                        var print_price = this.calcFilePrice(jsonData.data.print_info)
                        jsonData.data["print_price"] = print_price
                        tempFile_list.push(jsonData.data)
                        this.calTotalPrice() //计算总价

                        this.setData({
                            tempFile_list: tempFile_list,
                            isHaveFile: true
                        })
                        i = i + 1
                        this.setData({
                            currenFileIndex: i,
                        })
                        if (i == seleTempFileLength) {
                            that.handleUploadProgress(false)
                            this.setData({
                                showUploadWindow: true,
                                currenFileIndex: 0 //临时文件序号清零
                            })
                            if (seleTempFileLength == 1) {
                                var e = {
                                    'currentTarget': {
                                        'dataset': {
                                            'id': that.data.tempFile_list.length - 1
                                        }
                                    }
                                }
                      
                                that.setFile(e)
                            }
                        }
                        if (i < seleTempFileLength) {
                            that.upload(i, res, seleTempFileLength)
                        }


                    } else {

                        wx.showModal({
                            showCancel: false,
                            title: "提示",
                            content: "有文件被损坏，该文件无法上传"
                        })
                        this.setData({
                            card: !this.data.card,
                            showUploadProgress: false,
                        })
                        this.onLoad()
                    }
                }

            },
            fail: (e) => {
                console.log(e)
                wx.showToast({
                    icon: "none",
                    title: "无效文件",
                })
                this.setData({

                    card: !this.data.card,
                    showUploadProgress: false
                })

            }
        })







    },
    //根据页数和设置的参数计算价格
    calcFilePrice(print_info) {
        var unit_price = app.createUnitPrice(print_info)
        var print_price = (print_info["print_page_num"] * unit_price).toFixed(2)
        return print_price
    },



    //设置文件打印参数操作
    setFile(e) {
        this.setData({
            currentTapFileId: e.currentTarget.dataset.id,
            isSettingFileInfo: true,
            windowMask:true,
            tempFile_list: $ag.tempFile_list
        })
    },
    //删除文件操作
    deleteFile(e) {
        var that = this
        var fileIndex = e.currentTarget.dataset.id
        wx.showModal({
            title: '提示',
            content: '确定要删除吗？',
            confirmColor: "#5f98fd",
            success: function (sm) {

                if (sm.confirm) {
                    // 用户点击了确定
                    let tempFile_list = that.data.tempFile_list
                    let temFilePrintParam = that.data.temFilePrintParam
                    tempFile_list.splice(fileIndex, 1)
                    temFilePrintParam.splice(fileIndex, 1)
                    that.setData({
                        tempFile_list: tempFile_list,
                        temFilePrintParam: temFilePrintParam
                    })
                    that.calTotalPrice()
                    if (that.data.tempFile_list.length == 0) {
                        that.setData({
                            windowMask: !that.data.windowMask,
                            card: !that.data.card
                        })
                    }
                } else if (sm.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
    //关闭窗口操作并执行指定方法
    closeWindows(e) {
        //关闭文件上传选项卡
        if (this.data.card == true && this.data.tempFile_list.length > 0) {
            this.setData({
                windowMask: false,
                card: false
            })

        }

        //关闭设置打印参数选项卡并修改参数
        if (e.detail.showSetWindow == false) {
            this.setData({
                windowMask: false,
                isSettingFileInfo: !this.data.isSettingFileInfo,
                tempFile_list: $ag.tempFile_list,
                totalPrice: $ag.totalPrice
            })
        }
    },
    //继续上传按钮事件
    continueUpload() {
        this.setData({
            card: true,
            windowMask: true
        })
    },
    //预览文件
    previewFile(e) {
        var fileindex = e.currentTarget.dataset.fileindex
        var file_path = this.data.tempFile_list[fileindex].file_path;
        console.log(file_path)
        var file_type_id = this.data.tempFile_list[fileindex].file_type_id;
        wx.showLoading({
            title: '打开中',
        })
        if (file_type_id >= 4) {
            wx.previewImage({

                urls: [file_path], //图片数组
                success: function (res) {
                    console.log('打开图片成功')
                    wx.hideLoading({})
                }
            })
        } else {
            wx.openDocument({
                filePath: file_path,
                success: function (res) {
                    wx.hideLoading()
                }
            })
        }
    },
    // 总价计算
    calTotalPrice() {
        var totalPrice = 0;

        for (let j = 0; j < this.data.tempFile_list.length; j++) {

            totalPrice = totalPrice + parseFloat(this.data.tempFile_list[j].print_price)
        }
        totalPrice = totalPrice.toFixed(2)
        //更新全局变量
        $ag.tempFile_list = this.data.tempFile_list
        $ag.totalPrice = totalPrice;
        this.setData({
            totalPrice: totalPrice
        })

    },
    //取消上传进度条
    cancelTask(e) {
        console.log(e)
        this.handleUploadProgress(false)
    },
    checkPrintable() {

    },
    //支付
    goPay() {
        if ($ag.account_info == null) {
            wx.showModal({
                title: "提示",
                showCancel: false,
                confirmText: "去选择",
                content: "请先选择店铺",
                confirmColor: '#5f98fd',
                success(res) {
                    if (res.confirm) {
                        wx.navigateTo({
                            url: '/pages/index/choose-store/choose-store',
                        })
                    }
                }
            })
            return
        }
        if (!$ag.pcOnline) {
            this.showConfirmModal("当前店铺已下线，无法下单，请联系该店管理员")
            return
        }
        if (this.data.totalPrice == 'NaN') {
            this.showConfirmModal("文件列表中有未支持打印的类型，请先处理")
            return
        }
        if (this.data.printers_params == null || this.data.printers_params == '') {
            this.showConfirmModal("该打印店暂未设置打印机，请联系店铺")
            return
        }
        if (!this.data.printers_params[this.data.currentPrinterIndex].printer_name) {
            this.showConfirmModal("请先选择打印机哦~")
            return
        }
        if (parseFloat(this.data.totalPrice) <= 0) {
            this.showConfirmModal("价格参数有误")
            return
        }
        this.canUseSubscribeMsg()
    },
    //  发送订阅消息申请
    canUseSubscribeMsg() {
        return new Promise((resolve, reject) => {
            wx.requestSubscribeMessage({
                tmplIds: ["NCR12WyRP_L-EDARplMsqIoIx-Y1CHWGFBxkkrX9vjs"],
                success: (res) => {
                    if (res['NCR12WyRP_L-EDARplMsqIoIx-Y1CHWGFBxkkrX9vjs'] === 'accept') {
                        wx.navigateTo({
                            url: '/pages/pay/pay',
                        })
                    }
                },
                fail(err) {
                    console.error(err);
                    reject()
                }
            })
        })
    },
    showConfirmModal(content) {
        wx.showModal({
            title: "提示",
            showCancel: false,
            confirmText: "确定",
            content: content,
            confirmColor: '#5f98fd',

        })
    }








})