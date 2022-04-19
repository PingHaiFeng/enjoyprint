 <template>
  <div class="app-container">
    <el-form
      :inline="true"
      :model="queryParams"
      ref="queryForm"
      class="demo-form-inline"
    >
      <el-form-item label="订单号" size="small" prop="order_id">
        <el-input
          v-model="queryParams.order_id"
          placeholder="请输入订单号"
          clearable
          @keyup.enter.native="handleQuery"
        ></el-input>
      </el-form-item>
      <el-form-item label="取件号" size="small" prop="take_id">
        <el-input
          v-model="queryParams.take_id"
          placeholder="请输入取件号 如11-1"
          clearable
          @keyup.enter.native="handleQuery"
        ></el-input>
      </el-form-item>
      <el-form-item label="订单状态" size="small" prop="print_situation">
        <el-select
          v-model="queryParams.print_situation"
          placeholder="请选择订单类型"
          clearable
          @keyup.enter.native="handleQuery"
        >
          <el-option label="全部" value=""></el-option>
          <el-option label="已打印" value="已打印"></el-option>
          <el-option label="待打印" value="待打印"></el-option>
          <el-option label="打印失败" value="打印失败"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="支付单号" size="small" prop="pay_id">
        <el-input
          v-model="queryParams.take_id"
          placeholder="请输入支付单号"
          clearable
          @keyup.enter.native="handleQuery"
        ></el-input>
      </el-form-item>
      <el-form-item label="付款方式" size="small" prop="pay_type">
        <el-input
          v-model="queryParams.pay_type"
          placeholder="请输入付款方式"
          clearable
          @keyup.enter.native="handleQuery"
        ></el-input>
      </el-form-item>
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
      </el-form-item>
      <el-form-item size="small">
        <el-button
          type="primary"
          size="mini"
          @click="handleQuery"
          icon="el-icon-search"
          >查询</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
          >重置</el-button
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
      id="t-phone-order"
      :data="orderList"
      :default-sort="{ prop: 'create_time', order: 'descending' }"
      style="width: 100%"
      v-loading="loading"
      border
      :header-cell-style="{ background: '#F7F7FA', color: '#555' }"
    >
      <el-table-column
        prop="order_id"
        label="订单ID"
        align="center"
        width="150"
      />

      <el-table-column
        prop="take_id"
        label="取件号"
        align="center"
        width="100"
      />
      <el-table-column
        prop="file_count"
        label="文件数（份）"
        align="center"
        width="120"
      />
      <el-table-column
        prop="price"
        label="金额（元）"
        align="center"
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="printer_name"
        label="打印机"
        align="center"
        width="200"
      >
      </el-table-column>
      <el-table-column
        label="打印时间"
        sortable
        align="center"
        prop="create_time"
        width="180"
      >
    
      </el-table-column>

      <el-table-column
        prop="print_situation"
        align="center"
        label="打印状态"
        width="80"
      >
        <template scope="scope">
          <el-tag
            v-if="scope.row.print_situation === '已打印'"
            type="success"
            size="mini"
            >已打印</el-tag
          >
          <el-tag
            v-if="scope.row.print_situation === '待打印'"
            type="info"
            size="mini"
          >
            待打印</el-tag
          >
          <el-tag
            v-if="scope.row.print_situation === '打印失败'"
            type="danger"
            size="mini"
            >打印失败</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="print_situation"
        align="center"
        label="原因"
        width="150"
      >
      </el-table-column>
      <el-table-column label="操作"     fixed="right" align="center"      width="150"  >
        <template slot-scope="scope">
          <el-button @click="viewDetails(scope.row)" type="text" size="medium"
            >详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页对话框 -->
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="this.queryParams.page_num"
      :page-size="this.queryParams.page_size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      v-show="total > 0"
    >
    </el-pagination>
  </div>
</template>

  <script>
import { listOrder } from "@/api/order";
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
      orderList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      // open: false,
      // 日期范围
      // date_range: ["", ""],
      // 查询参数
      queryParams: {
        page_num: 1,
        page_size: 10,
        order_id: "",
        take_id: "",
        print_situation: "",
        pay_id: "",
        pay_type: "",
        date_range:""
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
    this.getList();
  },
  methods: {
    /** 查询订单列表 */
    getList() {
      this.loading = true;
      // console.log(this.queryParams.date_range);
      listOrder(this.queryParams).then((response) => {
        this.orderList = response.data.list;
        this.total = response.data.total;
        this.loading = false;
      });
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.page_num = 1;
      this.getList();
    },
    viewDetails(row) {
      this.$router.push({path:'file-order-detail',query: {order_id:row.order_id}})
    
    },
    handleCurrentChange(val) {
      this.queryParams.page_num = val;
      this.getList();
    },
    handleExport() {
      this.xlxsMaker("#t-phone-order", "手机订单");
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
/* el-form-item{
    width: 300px !important;
} */
</style>