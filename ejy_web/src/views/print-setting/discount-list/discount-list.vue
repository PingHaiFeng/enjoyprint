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