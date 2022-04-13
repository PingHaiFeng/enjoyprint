import {
  listFileOrder
} from "../../../../api/user.js";
Page({
  data: {
    order_id: '',
    fileOrderList:[]
  },

  onLoad: function (options) {
    this.setData({
      order_id: options.order_id
    })
    this.getFileOrder()
  },
  getFileOrder() {
    listFileOrder(this.data.order_id).then(res => {
      this.setData({
        fileOrderList : res.list
      })
    })
  }
})
