// components/ProgressBar/ProgressBar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    pro: {
      type: Number,
      value: 0
    },
    progressNum: {
      type: Number,
      value: 0
    },
    currentIndex: {
      type: Number,
      value: 0,
      observer: function (newVal, oldVal, change) {
        console.log(newVal, oldVal, change)
        var progressNum = this.data.pro
        progressNum = parseInt((newVal / this.data.allCount) * 100)
        this.setData({
          pro: progressNum
        })
      }

    },
    allCount: {
      type: Number,
      value: 0
    },
    oneFileOver:{
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  lifetimes: {
    attached: function () {
      var that = this
      
      var timerpro = setInterval(function () {
        if (that.data.allCount == 1&&that.data.oneFileOver==0) {
          var progressNum = that.data.pro+50
          that.setData({
oneFileOver:1
          })
        } 
        
        else{
          var progressNum = that.data.pro
        }
        progressNum++
        if (progressNum == 100) {
          return
        }

        that.setData({
          pro: progressNum
        })
      }, 500)
    }
  },
  methods: {
    cancelTask() {
      this.triggerEvent('cancelTask', {
        cancelTask: 1
      })
    }
  }
})