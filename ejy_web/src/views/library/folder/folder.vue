<template>
  <div class="container">
    <!-- 按钮栏 -->
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          >新增</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          >修改</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          >删除</el-button
        >
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-row>
      <el-col :span="24">
        <el-table
          :data="docFolderList"
          style="width: 100%"
          v-loading="loading"
          @selection-change="handleSelectionChange"
          :header-cell-style="{ background: '#F7F7FA', color: '#555' }"
        >
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="文件夹名">
            <template scope="scope">
              <svg-icon class="icon-folder" icon-class="folder"></svg-icon>
              <span>{{ scope.row.folder_name }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="create_date" label="发布日期" />
          <el-table-column prop="read_num" label="阅读人数" />
          <el-table-column prop="on_sale" label="状态">
            <template scope="scope">
              <el-tag size="mini" v-if="scope.row.on_sale === 1" type="success"
                >上架</el-tag
              >
              <el-tag size="mini" v-else type="info">下架</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <!-- 菜单 -->

    <!-- 添加或修改工作管理对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="文件夹名" prop="folder_name">
          <el-input v-model="form.folder_name" placeholder="请输入文件夹名" />
        </el-form-item>
        <el-form-item label="状态">

          <el-radio-group v-model="form.on_sale">
            <el-radio :label="1">上架</el-radio>
            <el-radio :label="0">下架</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listDocFolder,
  updateFolder,
  addFolder,
  delFolder,
  getFolder,
} from "@/api/library";

export default {
  name: "book-upload",
  data() {
    return {
      docFolderList: [],
      // 遮罩层
      loading: true,
      // 选中数组
      folder_ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        page_num: 1,
        page_size: 10,
        folder_name: null,
        onsale: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        folder_name: [
          { required: true, message: "文件夹名字不能为空", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    //获取文件夹信息
    getList() {
      this.loading = true;
      listDocFolder().then((response) => {
        this.loading = false;
        this.docFolderList = response.data.list;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        folder_name: "",
        on_sale: 1,
        print_num: 0,
        read_num: 0,
      };
      this.resetForm("form");
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const folder_id = row.folder_id || this.folder_ids;
      getFolder(folder_id).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改文件夹";
      });
    },

    /** 删除按钮操作 */
    handleDelete(row) {
      console.log(this.folder_ids);
      const folder_ids = row.folder_id || this.folder_ids;
      this.$modal
        .confirm("是否确认删除此数据项？")
        .then(function () {
          return delFolder(folder_ids);
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        })
        .catch(() => {});
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.folder_ids = selection.map((item) => item.folder_id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.folder_id != null) {
            updateFolder(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addFolder(this.form).then((response) => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin: 10px 20px !important;
}

.el-row {
  cursor: default;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}
.icon-folder {
  width: 24px;
  height: 24px;
  vertical-align: -6px;
  margin-right: 10px;
}
</style>
