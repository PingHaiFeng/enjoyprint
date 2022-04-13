 <template>
  <div class="app-container">
    <el-button
      size="small"
      type="primary"
          style="margin-bottom:20px"
      @click="openPriceDialog((index = -1))"
      >新建折扣</el-button
    >
    <el-row></el-row>
    <el-table
      :data="price_list"
      style="width: 100%"
      :header-cell-style="{ background: '#F7F7FA', color: '#555' }"
    >
      <el-table-column prop="system_type" label="系统"
        >手机自助
      </el-table-column>
      <el-table-column prop="doc_type" label="类型"> 文档</el-table-column>
      <el-table-column prop="color" label="颜色"> </el-table-column>
      <el-table-column prop="duplex" label="页面"> </el-table-column>
      <el-table-column prop="num" label="数量"> </el-table-column>
      <el-table-column prop="discount" label="折扣"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            @click="openPriceDialog(scope.row, scope.$index, 'update')"
            type="text"
            size="medium"
            >修改</el-button
          >
          <el-button type="text" size="medium" @click="deletePrice(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 新建单价对话框 -->

    <el-dialog width="33%" title="新建折扣" :visible.sync="dialogFormVisible">
      <el-form :model="discount_form" ref="discount_form">
        <el-form-item label="系统" :label-width="formLabelWidth" required>
          <el-input placeholder="手机自助"></el-input>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth" required>
          <el-select v-model="discount_form.doc_type">
            <el-option label="文档" value="文档"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="颜色" :label-width="formLabelWidth" required>
          <el-select v-model="discount_form.color">
            <el-option label="黑白" value="黑白"></el-option>
            <el-option label="彩色" value="彩色"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="页面" :label-width="formLabelWidth" required>
          <el-select v-model="discount_form.duplex">
            <el-option label="单面" value="单面"></el-option>
            <el-option label="双面" value="双面"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数量" :label-width="formLabelWidth" required>
          <el-input
            type="number"
            oninput="value=value.replace(/[^\.\d]/g,'')"
            v-model="discount_form.num"
            autocomplete="off"
            style="width: 200px"
          ></el-input>
        </el-form-item>
        <el-form-item label="折扣" :label-width="formLabelWidth" required>
          <el-input
            type="number"
            oninput="value=value.replace(/[^\.\d]/g,'')"
            v-model="discount_form.discount"
            autocomplete="off"
            style="width: 200px"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="resetPrice">确 定</el-button>
      </div>
    </el-dialog>
    <el-empty description="暂无折扣" wx:if=""></el-empty>
  </div>
</template>

  <script>
import { getPrice } from "@/api/price";
import { setPrice } from "@/api/price";
import { getToken } from "@/utils/auth"; // get token from cookie
import store from "@/store"; // get token from cookie
const store_id = store.getters.store_id;
export default {
  data() {
    return {
      price_list: [],
      // rules: {
      //   price: [{ required: true, message: "请输入价格", trigger: "change" }],
      // },
      action: null,
      currentIndex: null,
      dialogTableVisible: false,
      dialogFormVisible: false,
      discount_form: {
        system_type: "普通",
        doc_type: "文档",
        color: "",
        duplex: "",
        num: "",
        discount: "",
      },
      formLabelWidth: "180px",
    };
  },
  created() {
    // this.getPriceData();
  },
  methods: {
    //打开新建修改价格表单
    openPriceDialog(row, index) {
    //   if (index >= 0) {
    //     console.log(row);
    //     this.action = 3;
    //     this.currentIndex = index;
    //     var pl = row.type_param.split("-");
    //     this.discount_form.system_type = "手机自助";
    //     this.discount_form.size = pl[0];
    //     this.discount_form.color = pl[1];
    //     this.discount_form.duplex = pl[2];
    //     this.discount_form.price = row.price;
    //   } else {
    //     this.action = 1;
    //     this.currentIndex = -1;
        
    //   }
      this.dialogFormVisible = true;
    },

    //重置价格
    resetPrice(formName) {
      var that = this;
      var type_param =
        this.discount_form.size +
        "-" +
        this.discount_form.color +
        "-" +
        this.discount_form.duplex;
      var price = this.discount_form.price;
      if (price < 0.01) {
        this.$message({
          message: "价格必须大于0.01",
          type: "error",
        });
        return;
      }
      for (let i = 0; i < this.price_list.length; i++) {
        if (this.action == 1) {
          if (type_param == this.price_list[i].type_param) {
            this.$message({
              message: "类型已存在",
              type: "error",
            });
            return;
          }
        } else if (this.action == 3) {
          if (
            type_param == this.price_list[i].type_param &&
            i != this.currentIndex
          ) {
            this.$message({
              message: "类型已存在，请勿重复设置",
              type: "error",
            });
            return;
          }
        }
      }
      var data = {
        action: this.action,
        store_id: store_id,
        type_param: type_param,
        price: price,
      };

      setPrice(data).then((res) => {
        console.log(res);
        if (res.state == 1) {
          this.$message({
            message: res.msg,
            type: "success",
          });
          that.getPriceData();
        }
      });
      this.dialogFormVisible = false;
    },
    // 删除价格
    deletePrice(row) {
      var that = this;
      this.$confirm("确认删除此价格?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          var data = {
            action: 2,
            // store_id: row.store_id,
            type_param: row.type_param,
          };

          setPrice(data).then((res) => {
            if (res.state == 1) {
              this.$message({
                message: "删除成功",
                type: "success",
              });
              that.getPriceData();
            }
          });
        })
        .catch(() => {});
    },
    //服务端获取价格数据
    getPriceData() {
      getPrice().then((response) => {
        console.log(response.data);
        if (response.data.price_list) {
          this.price_list = response.data.price_list;
        }

        this.listLoading = false;
        console.log(this.price_list);
      });
    },
  },
};
</script>
<style >
label.el-form-item__label {
  font-weight: 500 !important;
}
/* el-form-item{
    width: 300px !important;
} */
</style>