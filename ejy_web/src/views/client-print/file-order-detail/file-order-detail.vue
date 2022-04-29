 <template>
  <div class="app-container">
    <el-table
      id="t-file-order"
      :data="fileOrderList"
      style="width: 100%"
      v-loading="loading"
      border
      :header-cell-style="{ background: '#F7F7FA', color: '#555' }"
    >
      <el-table-column   label="文件名" align="center" >
        <template scope="scope">
       {{scope.row.file_name}}.{{scope.row.file_type}}
        </template>
      </el-table-column>
   
      <el-table-column prop="print_count" label="打印份数" align="center" />

      <el-table-column prop="duplex" label="单双" align="center">
        <template scope="scope">
          <span v-if="scope.row.duplex === 1"> 单面</span>
          <span v-if="scope.row.duplex === 2"> 双面</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="print_color"
        label="颜色"
        align="center"
        width="120"
      >
        <template scope="scope">
          <span v-if="scope.row.print_color === 1"> 黑白</span>
          <span v-if="scope.row.print_color === 2"> 彩色</span>
        </template>
      </el-table-column>
      <el-table-column prop="print_price" label="金额（元）" align="center">
      </el-table-column>

      <el-table-column
        label="打印时间"
        sortable
        align="center"
        prop="create_time"
      >
      </el-table-column>
    </el-table>
    <el-row style="margin-top: 20px" type="flex" justify="center">
      <el-button type="primary" @click="onBack"> 返回</el-button>
    </el-row>
    <!-- 分页对话框 -->
    <!-- <el-pagination
      @current-change="handleCurrentChange"
      :current-page="this.queryParams.page_num"
      :page-size="this.queryParams.page_size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      v-show="total > 0"
    >
    </el-pagination> -->
  </div>
</template>

  <script>
import { listFileOrder } from "@/api/order";
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
      fileOrderList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 日期范围
      // date_range: ["", ""],
      // 查询参数
      queryParams: {},
      // 表单参数
      form: {},
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询订单列表 */
    getList() {
      this.loading = true;
      console.log(this.$route.query.order_id);
      listFileOrder(this.$route.query.order_id).then((response) => {
        this.fileOrderList = response.data.list;
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
    handleCurrentChange(val) {
      this.queryParams.page_num = val;
      this.getList();
    },
    handleExport() {
      this.xlxsMaker("#t-file-order", "手机订单详情");
    },
    onBack(){
        this.$router.go(-1)
    }
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