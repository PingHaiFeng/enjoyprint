 <template>
  <div class="app-container">
    <el-menu
      default-active="1"
      class="meau"
      mode="horizontal"
      text-color="#333"
      active-text-color="#409eff"
      @select="handleMeauSelect"
    >
      <el-menu-item index="1">文档价格</el-menu-item>
      <el-menu-item index="2">照片价格</el-menu-item>
      <el-menu-item index="3">智能证件照</el-menu-item>
    </el-menu>

    <!-- 文档价格 -->
    <el-main v-if="activeMeauIndex == 1">
      <el-button
        size="small"
        type="primary"
        icon="el-icon-plus"
        style="margin-bottom: 20px"
        @click="handleAdd"
        >新建单价</el-button
      >

      <el-table
        :data="priceList"
        style="width: 100%"
        v-loading="loading"
        :header-cell-style="{ background: '#F7F7FA', color: '#555' }"
      >
        <el-table-column prop="paper_type" label="纸张类型"> </el-table-column>
        <el-table-column prop="" label="参数设置">
          <template slot-scope="scope">
            <span
              >{{ scope.row.size }}-{{ scope.row.color }}-{{
                scope.row.duplex
              }}</span
            >
          </template>
        </el-table-column>
        <el-table-column prop="price" label="单价"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click="handleUpdate(scope.row)"
              type="text"
              size="medium"
              >编辑</el-button
            >
            <el-button
              type="text"
              size="medium"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 新建单价对话框 -->
      <el-dialog
        title="文档定价"
        :visible.sync="diaOpen"
        width="500px"
        append-to-body
      >
        <el-form :model="form" ref="form" :rules="rules">
          <el-form-item
            label="纸张/类型"
            label-width="180px"
            required
            clearable
            prop="paper_type"
          >
            <el-select v-model="form.paper_type" placeholder="纸张类型">
              <el-option label="普通" value="普通"></el-option>
              <el-option label="图片" value="图片"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="大小"
            prop="size"
            label-width="180px"
            required
            clearable
          >
            <el-select v-model="form.size">
              <el-option label="A3" value="A3"></el-option>
              <el-option label="A4" value="A4"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="颜色"
            prop="color"
            clearable
            label-width="180px"
            required
          >
            <el-select v-model="form.color">
              <el-option label="黑白" value="黑白"></el-option>
              <el-option label="彩色" value="彩色"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="页面"
            clearable
            prop="duplex"
            label-width="180px"
            required
          >
            <el-select v-model="form.duplex">
              <el-option label="单面" value="单面"></el-option>
              <el-option label="双面" value="双面"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="价格"
            prop="price"
            clearable
            label-width="180px"
            required
          >
            <el-input
              type="number"
              v-model="form.price"
              autocomplete="off"
              style="width: 200px"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </div>
      </el-dialog>
    </el-main>
  </div>
</template>

  <script>
import { listPrice, updatePrice, delPrice, addPrice } from "@/api/price";
export default {
  data() {
    return {
      priceList: [],
      loading: true,
      activeMeauIndex: 1, //当前菜单索引
      diaOpen: false,
      form: {
        id: null,
        store_id: null,
        paper_type: "普通",
        size: "A4",
        color: "黑白",
        duplex: "单面",
        price: null,
      },
      // 表单校验
      rules: {
        paper_type: [
          { required: true, message: "纸张类型不能为空", trigger: "blur" },
        ],
        size: [
          { required: true, message: "尺寸设置不能为空", trigger: "blur" },
        ],
        color: [
          { required: true, message: "黑白设置不能为空", trigger: "blur" },
        ],
        duplex: [
          { required: true, message: "单双设置不能为空", trigger: "blur" },
        ],
        price: [{ required: true, message: "价格不能为空", trigger: "blur" }],
      },
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    // 菜单栏切换
    handleMeauSelect(e) {
      this.activeMeauIndex = e;
    },
    //获取价格数据
    getList() {
      this.loading = true;
      listPrice().then((response) => {
        this.priceList = response.data.list;
        this.loading = false;
      });
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        store_id: null,
        paper_type: "普通",
        size: "A4",
        color: "黑白",
        duplex: "单面",
        price: null,
      };
      this.resetForm("form");
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.diaOpen = true;
      this.title = "添加岗位管理";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.diaOpen = true;
      this.form = row;
    },

    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal
        .confirm("是否确认删除此数据项？")
        .then(function () {
          return delPrice(ids);
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        })
        .catch(() => {});
    },
    // 校检是否重复配置
    isRepeat() {
      var self = this;
      var repeatList = this.priceList.filter(function(item) {
       if( item.paper_type == self.form.paper_type &&
          item.color == self.form.color &&
          item.size == self.form.size &&
          item.duplex == self.form.duplex){
            return item
          }
      });
      if (repeatList.length > 0) {
        this.$modal.msgError("已有相同配置，请勿重复添加");
        return true;
      }
      return false;
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            updatePrice(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.diaOpen = false;
              this.getList();
            });
          } else {
            if (this.isRepeat()) {
              return;
            }
            addPrice(this.form).then((response) => {
              this.$modal.msgSuccess("新增成功");
              this.diaOpen = false;
              this.getList();
            });
          }
        }
      });
    },
  },
};
</script>
<style >
label.el-form-item__label {
  font-weight: 500 !important;
}
</style>