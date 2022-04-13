 <template>
  <div class="app-container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="订单号">
        <el-input
          v-model="formInline.order_id"
          placeholder="请输入订单号"
        ></el-input>
      </el-form-item>
      <!-- <el-form-item label="订单类型">
        <el-select v-model="formInline.order_type" placeholder="请选择订单类型">
          <el-option label="全部" value="shanghai"></el-option>
          <el-option label="普通订单" value="beijing"></el-option>
          <el-option label="照片打印" value="beijing"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="订单状态">
        <el-select
          v-model="formInline.print_situation"
          placeholder="请选择订单类型"
        >
          <el-option label="全部" value=""></el-option>
          <el-option label="已打印" value="已打印"></el-option>
          <el-option label="待打印" value="待打印"></el-option>
          <el-option label="打印失败" value="打印失败"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单时间">
        <el-date-picker
          v-model="formInline.date_range"
          format="yyyy-MM-dd "
          value-format="yyyy-MM-dd"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onQuery" icon="el-icon-search">查询</el-button>
      </el-form-item>
    </el-form>

 
      <el-empty description="暂无订单"></el-empty>
  </div>
</template>

  <script>
import { getOrder } from "@/api/order";
import { getToken } from "@/utils/auth"; // get token from cookie
export default {
  data() {
    return {
      current_page: 1,
      page_size: 20,
      total_orders_count: 0,
      listLoading: true,
      all_orders: [],
      formInline: {
        order_id: "",

        print_situation: "",
        date_range: null,
      },
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
  mounted() {
    this.getList();
    console.log(this.formInline);
  },
  methods: {
    getList() {
      this.listLoading = true;
      const token = getToken();
      var data = {
        token: token,
        file_id: this.formInline.order_id,
        print_situation: this.formInline.print_situation,
        start_date: this.formInline.date_range
          ? this.formInline.date_range[0]
          : "",
        end_date: this.formInline.date_range
          ? this.formInline.date_range[1]
          : "",
        current_page: this.current_page,
        page_size: this.page_size,
      };
      getOrder(data).then((response) => {
        console.log(response.data);
        this.all_orders = response.data.all_orders;
        this.total_orders_count = response.data.total_orders_count;
        this.listLoading = false;
      });
    },
    onQuery() {
      console.log(this.formInline);
      this.getList();
    },
    handleClick(row) {
      console.log(row);
    },
    handleDelete(row) {
      console.log(row);
    },
    // handleSizeChange(val) {
    //       this.size=val
    //         this.getList()
    //   },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.current_page = val;
      this.getList();
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
.el-pagination{
  margin:30px;
  margin-left:300px;

}
/* el-form-item{
    width: 300px !important;
} */
</style>