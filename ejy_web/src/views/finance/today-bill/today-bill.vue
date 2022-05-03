<template>
  <div class="dashboard-container">
    <el-row :gutter="5">
      <el-col :span="18">
        <!-- 经营数据 -->
        <el-card class="jy-card">
          <div slot="header" class="header" style="display: flex">
            <span style="font-weight: bold">经营数据</span>
          </div>
          <div class="card1-wrp">
            <div class="card1-item">
              <p class="item-data">
                {{todaySales.order_money }}
              </p>
              <p class="item-title">线上收款（元）</p>
            </div>
            <div class="card1-item flex-center">
              <p class="item-data">
                {{todaySales.order_num  }}
              </p>
              <p class="item-title">今日订单数（单）</p>
            </div>
            <div class="card1-item flex-center">
              <p class="item-data">{{orders_waited}}</p>
              <p class="item-title">预约打印待处理（单）</p>
            </div>
          </div>
        </el-card>
      </el-col>

    
    </el-row>


  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getRecentSales } from "@/api/order";
import { getTodayDate } from "@/utils/date";
import { calDate } from "@/utils/date";
var date_now = getTodayDate();
export default {
  data() {
    return {
      todaySales:null,
      todayOrdersNum: null,
      todayOrdersMoney: null,
      orders_waited: 0, //待处理订单
    };
  },

  mounted() {
    this._getRecentSales(); //获取最近销售
  },
  methods: {

    //获取最近销量数据
    _getRecentSales() {
      var data = {
        s_date: date_now,
        e_date: date_now,
      };
      getRecentSales(data).then((response) => {
        this.todaySales = response.data.recent_sales;
        this.listLoading = false;
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
