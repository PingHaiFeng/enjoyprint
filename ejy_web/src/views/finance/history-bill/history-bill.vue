 <template>
  <div class="app-container">
    <el-form
      :inline="true"
      :model="queryParams"
      ref="queryForm"
      class="demo-form-inline"
    >
      <el-form-item label="订单时间" size="small" prop="date_range">
        <el-date-picker
          clearable
          v-model="queryParams.date_range"
          format="yyyy-MM-dd "
          value-format="yyyy-MM-dd"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          @keyup.enter.native="handleQuery"
        >
        </el-date-picker>
        <!-- <el-date-picker
          v-model="queryParams.s_date"
          type="date"
          placeholder="选择开始日期"
        >
        </el-date-picker> -->
      </el-form-item>
      <el-form-item size="small">
        <el-button
          type="primary"
          size="mini"
          @click="handleQuery"
          icon="el-icon-search"
          >查询</el-button
        >

        <el-button
          type="success"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          >导出</el-button
        >
      </el-form-item>
    </el-form>

    <el-table
      id="t-recent"
      :data="rencentSalesList"
      :default-sort="{ prop: 'create_time', order: 'descending' }"
      style="width: 100%"
      v-loading="loading"
      border
      :header-cell-style="{ background: '#F7F7FA', color: '#555' }"
    >
      <el-table-column prop="date" label="日期" align="center" width="150" />

      <el-table-column label="手机自助打印" align="center">
        <el-table-column
          prop="phone_order_num"
          label="订单数"
          align="center"
          width="100"
        />

        <el-table-column
          prop="phone_order_money"
          label="金额（元）"
          align="center"
          width="100"
        />
      </el-table-column>
      <el-table-column label="电脑自助打印" align="center">
        <el-table-column
          prop="computer_order_num"
          label="订单数"
          align="center"
          width="100"
        />

        <el-table-column
          prop="computer_order_money"
          label="金额（元）"
          align="center"
          width="100"
        />
      </el-table-column>
      <el-table-column label="预约打印" align="center">
        <el-table-column
          prop="booking_order_num"
          label="订单数"
          align="center"
          width="100"
        />

        <el-table-column
          prop="booking_order_money"
          label="金额（元）"
          align="center"
          width="100"
        />
      </el-table-column>
      <el-table-column label="总计"  align="center">
        <el-table-column
          prop="total_order_num"
          label="订单数"
          align="center"
          width="100" 
  
  
        />

        <el-table-column
          prop="total_order_money"
          label="金额（元）"
          align="center"
          width="100"
        />
      </el-table-column>
    </el-table>
  </div>
</template>

  <script>
import { getAllSales } from "@/api/order";
import { getTodayDate, calDate } from "@/utils/date";
export default {
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 表格数据
      rencentSalesList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 日期范围

      // 查询参数
      queryParams: {
        date_range: [],
      },
      // 表单参数
      form: {},
      detailDialogVisible: false, //是否显示详情对话框
      currentRowIndex: "",
      //日期选择器快捷选项
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
    };
  },
  created() {
    this.initDate();
    this.getList();
  },
  methods: {
    initDate() {
      this.queryParams.date_range = [
        calDate(getTodayDate(), -15),
        getTodayDate(),
      ];
    },
    /** 查询订单列表 */
    getList() {
      this.loading = true;
      getAllSales(this.queryParams).then((response) => {
        this.rencentSalesList = response.data.list;
        this.total = response.data.total;
        this.loading = false;
      });
    },

    /** 搜索按钮操作 */
    handleQuery() {
      this.getList();
    },
    handleExport() {
      this.xlxsMaker("#t-recent", "历史订单");
    },
  },
};
</script>
<style >
.line {
  text-align: center;
}
label.el-form-item__label {
  font-weight: 500 !important;
}
.el-pagination {
  margin: 30px;
  margin-left: 300px;
}
</style>