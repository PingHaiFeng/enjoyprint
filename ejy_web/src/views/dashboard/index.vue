<template>
  <div class="dashboard-container" v-loading="listLoading">
    <el-row :gutter="5">
      <el-col :span="18">
        <!-- 经营数据 -->
        <el-card class="jy-card">
          <div slot="header" class="header" style="display: flex">
            <span style="font-weight: bold">经营数据</span>
            <div class="header-right">
              <span style="margin-right: 10px">显示数据</span>
              <el-switch
                v-model="dataVisable"
                active-color="#409eff"
                inactive-color="#bfbfbf"
              >
              </el-switch>
            </div>
          </div>
          <div class="card1-wrp">
            <div class="card1-item">
              <p class="item-data">
                {{ dataVisable ? todayOrdersMoney : "**" }}
              </p>
              <p class="item-title">今日营业额（元）</p>
            </div>
            <div class="card1-item flex-center">
              <p class="item-data">
                {{ dataVisable ? todayOrdersNum : "**" }}
              </p>
              <p class="item-title">今日订单数（单）</p>
            </div>
            <div class="card1-item flex-center">
              <p class="item-data">{{ dataVisable ? orders_waited : "**" }}</p>
              <p class="item-title">预约打印待处理（单）</p>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <!-- 公告栏 -->
        <el-card class="announce-card" :body-style="{ padding: '0' }">
          <div slot="header" class="header">
            <span style="font-weight: bold">公告栏</span>
            <!-- <div class="header-right">
              <span style="margin-right: 10px">更多</span>
            </div> -->
          </div>
          <div class="notice">
            <div
              class="notice-item"
              v-for="(item, index) in notice"
              :key="item.id"
              v-show="item.show === 1"
              @click="handleNoticeDialog(index)"
            >
              <div class="time">{{ item.create_time }}</div>
              <div class="content">{{ item.title }}</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 营业额折线图 -->
    <el-row>
      <el-col :span="18">
        <el-card class="yye-card">
          <div slot="header" class="header">
            <el-row>
              <el-col :span="11"
                ><span style="font-weight: bold">营业额数据</span>
              </el-col>
              <el-col :span="12">
                <el-button autofocus @click="daySpace = 7">近7天</el-button>
                <el-button @click="daySpace = 15">近15天</el-button>
                <el-button @click="daySpace = 30">近30天</el-button>
              </el-col>
            </el-row>
            <div id="order-money-chart"></div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 订单数 -->
    <el-row>
      <el-col :span="18">
        <el-card class="yye-card">
          <div slot="header" class="header">
            <span style="font-weight: bold">订单数据</span>
            <div id="order-num-chart"></div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 点击打开查看详情 -->
    <el-dialog
      :title="notice[noticeCurIndex]['title']"
      :visible.sync="noticeDialogVisible"
      width="30%"
    >
      <span>{{ notice[noticeCurIndex]["content"] }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleNoticeDialog(-1)"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getNotice } from "@/api/news";
import { getRecentSales } from "@/api/order";
import { getTodayDate, calDate } from "@/utils/date";
let echarts = require("echarts");
var date_now = getTodayDate();
export default {
  name: "dashboard",
  data() {
    return {
      charts: "",
      listLoading: true,
      y_orderMoneyData: [],
      y_orderNumData: [],
      x_orderData: [],
      daySpace: 7, //间隔天数，7天，30天
      dataVisable: true, //数据是否可见
      notice: [{ content: null }],
      todayOrdersNum: null,
      todayOrdersMoney: null,
      orders_waited: 0, //待处理订单
      noticeDialogVisible: false, //公告对话框是否显示u
      noticeCurIndex: 0, //当前点击的公告索引
    };
  },
  computed: {
    ...mapGetters(["name"]),
  },
  watch: {
    daySpace(val) {
      this._getRecentSales();
    },
    dataVisable() {
      this.drawLine();
      this.drawColBar();
    },
  },
  created() {
    this._getNotice();
    this._getRecentSales(); //获取最近销售
  },
  methods: {
    //获取公告信息
    _getNotice() {
      let self = this;
      getNotice().then((response) => {
        this.notice = response.data.notice;
        var a = this.notice.filter(function (x) {
          if (x.auto_show === 1) {
            return x;
          }
        });
        console.log(a);
      });
    },

    //打开公告对话框
    handleNoticeDialog(index) {
      if (index >= 0) {
        this.noticeCurIndex = index;
      }
      this.noticeDialogVisible = !this.noticeDialogVisible;
    },
    //获取最近销量数据
    _getRecentSales() {
      this.listLoading = true;
      var data = {
        s_date: calDate(date_now, -this.daySpace),
        e_date: date_now,
      };
      getRecentSales(data).then((response) => {
        var recent_sales = response.data.recent_sales;
        var x_orderData = [];
        var y_orderMoneyData = [];
        var y_orderNumData = [];
        for (var i = 0; i < recent_sales.length; i++) {
          for (var key in recent_sales[i]) {
            x_orderData.push(key);
            y_orderMoneyData.push(parseFloat(recent_sales[i][key].order_money));
            y_orderNumData.push(parseFloat(recent_sales[i][key].order_num));
          }
        }
        this.x_orderData = x_orderData;
        this.y_orderMoneyData = y_orderMoneyData;
        this.y_orderNumData = y_orderNumData;
        this.todayOrdersNum =
          recent_sales[recent_sales.length - 1][date_now].order_num;
        this.todayOrdersMoney =
          recent_sales[recent_sales.length - 1][date_now].order_money;
        this.drawLine();
        this.drawColBar();
        this.listLoading = false;
      });
    },
    //画折线图
    drawLine() {
      this.charts = echarts.init(document.getElementById("order-money-chart"));
      this.charts.setOption({
        tooltip: {
          trigger: "axis",
        },
        legend: {
          //设置区分（哪条线属于什么）
          data: ["收益"],
        },
        color: ["#409EFF"], //设置区分（每条线是什么颜色，和 legend 一一对应）
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },

        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",

          boundaryGap: false,
          data: this.x_orderData,
        },
        yAxis: {
          type: "value",
          name: "营业额（元）",
        },

        series: [
          {
            name: "收益",
            type: "line",
            stack: "总量",
            data: this.dataVisable ? this.y_orderMoneyData : [],
          },
        ],
      });
    },
    //画柱状图
    drawColBar() {
      this.charts = echarts.init(document.getElementById("order-num-chart"));
      this.charts.setOption({
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["订单数"],
        },
        color: ["#409EFF"], //设置区分（每条线是什么颜色，和 legend 一一对应）
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },

        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,

          data: this.x_orderData,
        },
        yAxis: {
          type: "value",
          name: "订单量（个）",
        },

        series: [
          {
            name: "订单数",
            type: "bar",
            stack: "总量",
            barWidth: "22%",
            data: this.dataVisable ? this.y_orderNumData : [],
          },
        ],
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 10px 20px !important;
  }
}
// .top-wrp {
//   display: flex;
//   width: 100%;
// }
// .jy-card,
// .yye-card {

//   margin: 20px 30px;
// }
// .announce-card {
//   margin: 20px 0;
//   width: 320px;
// }
.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}
.header-right {
  margin-left: auto;
}
.card1-wrp {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.card1-item {
  width: 33.3%;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  align-items: center;
  justify-content: center;
}
.item-data {
  font-weight: bold;
  font-size: 38px;

  display: block;
  margin: 0 !important;
}
.item-title {
  font-size: 14px;
  margin-left: 20px;
  color: #7c7d83;
}
#order-money-chart,
#order-num-chart {
  height: 280px;
}
.notice {
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  box-sizing: border-box;

  &-item {
    display: flex;

    font-size: 12px;
    height: 30px;
    line-height: 30px;

    cursor: pointer;
    .time {
      color: #409eff;
      margin-right: 15px;
    }
    .content {
      color: #7c7d83;
      width: 150px;
    }
  }
}
</style>
