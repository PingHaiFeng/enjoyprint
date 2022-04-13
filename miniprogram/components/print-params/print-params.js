// components/print-params/print-params.js
const app = getApp()
const $ag = app.globalData
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    visable:{
      type: Boolean,
      value: false 
    },
    file_index: {
      type: Number,
      value: 0
    },
    file_type_id: {
      type: Number,
      value: 1
    },
    filePageNum: {
      type: Number,
      value: 1
    },
    file_name: {
      type: String,
      value: ""
    },
    paper_type: {
      type: String,
      value: ""
    },
    size: {
      type: String,
      value: ""
    },
    print_color: {
      type: String,
      value: ""
    },
    duplex: {
      type: Number,
      value: 1
    },
    print_count: {
      type: Number,
      value: "1"
    },
    print_range: {
      type: String,
      value: ""
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    isChooseCustomize: false, //是否选择了自定义打印范围
    multiArray: [],
    print_range: [],
    multiIndex: [],

  },
  // 生命周期函数
  lifetimes: {
    attached: function () {
      let $tempf= $ag.tempFile_list[this.data.file_index]
      this.setData({
        printers_params:$ag.printers_params,
        currentPrinterIndex:$ag.currentPrinterIndex,
        file_type_id: $tempf.file_type_id,
        file_name: $tempf.file_name,
        file_page_num: $tempf.file_page_num,
        file_type: $tempf.file_type,
        paper_type: $tempf.print_info.paper_type,
        size: $tempf.print_info.size,
        print_color: $tempf.print_info.print_color,
        duplex: $tempf.print_info.duplex,
        print_count: $tempf.print_info.print_count,
        is_print_all: $tempf.print_info.is_print_all,
        print_from_page: $tempf.print_info.print_from_page,
        print_to_page: $tempf.print_info.print_to_page,
        print_page_num: $tempf.print_info.print_page_num
      })

      //遍历页数数组获得可自定义页数范围
      var multiArrayItem = []
      var multiArray = []
      var multiIndex = []
      for (let i = 1; i <= this.data.file_page_num; i++) {
        multiArrayItem.push(i)
      }
      multiArray.push(multiArrayItem)
      multiArray.push(multiArrayItem)
      multiIndex[0] = this.data.print_from_page - 1
      multiIndex[1] = this.data.print_to_page - 1
      this.setData({
        multiArray: multiArray,
        multiIndex: multiIndex
      })
    }
  },
  methods: {
    //确认修改
    handleConfirm() {
  
      var _ag_t_p= $ag.tempFile_list[this.data.file_index].print_info
      _ag_t_p.print_count = parseInt(this.data.print_count) //保存打印数量
      _ag_t_p.duplex = this.data.duplex //保存单双
      _ag_t_p.print_color = this.data.print_color //保存灰度打印
      if (this.data.is_print_all == 1) {
        console.log("全部打印")
        _ag_t_p.print_from_page = 1
        _ag_t_p.print_to_page = $ag.tempFile_list[this.data.file_index].file_page_num

        _ag_t_p.is_print_all = 1
        _ag_t_p.print_page_num = $ag.tempFile_list[this.data.file_index].file_page_num
        
      } else {
        _ag_t_p.is_print_all = 0
        _ag_t_p.print_from_page = this.data.print_from_page
        _ag_t_p.print_to_page = this.data.print_to_page
        _ag_t_p.print_page_num = this.data.print_to_page - this.data.print_from_page + 1
     
      }
     
      //双面打印页数减半
      if(_ag_t_p.duplex==2){
        _ag_t_p.print_page_num=parseInt((_ag_t_p.print_to_page - _ag_t_p.print_from_page+1)/2) + _ag_t_p.print_page_num%2
      }
  
      //保存页数范围
      var unit_price = app.createUnitPrice(_ag_t_p)
      $ag.tempFile_list[this.data.file_index].print_price = (parseInt(_ag_t_p.print_count) * parseFloat(_ag_t_p.print_page_num) * unit_price).toFixed(2)
      var totalPrice = 0
      for (let i = 0; i < $ag.tempFile_list.length; i++) {
        totalPrice += parseFloat($ag.tempFile_list[i].print_price)
      }
      totalPrice = totalPrice.toFixed(2)
      $ag.totalPrice = totalPrice
      
      this.triggerEvent("showSetWindow", {
        "showSetWindow": false
      })
    },
    // 关闭窗口
    closeSetWindow() {


      this.triggerEvent("showSetWindow", {
        "showSetWindow": false
      })
    },
    changeCount(e) {
      var cal = e.currentTarget.dataset.cal
      var print_count = parseInt(this.data.print_count)
      print_count = parseInt(print_count) + parseInt(cal)
      if (print_count < 1) {
        print_count = 1
      }
      this.setData({
        print_count: print_count
      })



    },
    handleDuplex(e) {
      var id = e.currentTarget.dataset.id
      this.setData({
        duplex: id
      })

    },
    handlePrintColor(e) {
      var id = e.currentTarget.dataset.id
      this.setData({
        print_color: id
      })

    },
    //设置打印范围
    choose_print_range(e) {
      var id = e.currentTarget.dataset.id
      var _ag_t_p= $ag.tempFile_list[this.data.file_index].print_info
      if (id == 1) {

        this.setData({
          isChooseCustomize: false,
          is_print_all: 1,
        })
      }



    },
    bindMultiPickerChange: function (e) {
      if (e.detail.value[1] < e.detail.value[0]) {
        wx.showToast({
          icon: 'none',
          title: '页数范围无效',
        })
      } else {
        var print_from_page = this.data.print_from_page
        var print_to_page = this.data.print_to_page
        print_from_page = e.detail.value[0] + 1
        print_to_page = e.detail.value[1] + 1

        this.setData({
          isChooseCustomize: true,
          is_print_all: 0,
          multiIndex: e.detail.value,
          print_from_page: print_from_page,
          print_to_page: print_to_page
        })

      }
    },
  }
})