<template>
  <div class="container">
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-upload"
          size="mini"
          @click="handleAdd"
          >上传</el-button
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

    <el-table
      :data="docList"
      style="width: 100%"
      v-loading="loading"
      @selection-change="handleSelectionChange"
      :header-cell-style="{
        background: '#F7F7FA',
        color: '#555',
        fontWeight: 'normal',
      }"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="文件名">
        <template scope="scope">
          <svg-icon
            class="icon-doc"
            :icon-class="scope.row.file_type"
          ></svg-icon>
          <span>{{ scope.row.file_name }}.{{ scope.row.file_type }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="folder_id" label="所属文件夹" />
      <el-table-column prop="create_date" label="发布日期" />
      <el-table-column prop="read_num" label="阅读人数" />
      <el-table-column prop="print_num" label="打印次数" />
      <el-table-column prop="file_page_num" label="文件页数" />
      <el-table-column prop="commission" label="佣金" />
      <el-table-column label="状态">
        <template scope="scope">
          <el-tag size="mini" v-if="scope.row.on_sale === 1" type="success"
            >上架</el-tag
          >
          <el-tag size="mini" v-else type="info">下架</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="150">
        <template slot-scope="scope">
          <el-button @click="onPreview(scope.row)" type="text" size="medium"
            >预览</el-button
          >
          <el-button @click="handleUpdate(scope.row)" type="text" size="medium"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 上传对话框 -->
    <el-dialog title="文档上传" :visible.sync="diaUploadOpen" append-to-body>
      <el-form ref="form">
        <el-form-item label="文件" required>
          <el-upload
            class="upload-doc"
            ref="upload"
            :action="uploadUrl"
            multiple
            :on-change="onChangeUpload"
            :data="docUploadParams"
            :auto-upload="false"
            drag
            :on-success="onUploadSuccess"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">
              仅支持上传doc、pdf、ppt、图片文件，且不超过30M
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitUpdate">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改对话框 -->
    <el-dialog
      title="文档修改"
      :visible.sync="diaUpdateOpen"
      append-to-body
      @close="cancel"
    >
      <el-form ref="form" label-width="180px">
        <el-form-item label="价格" clearable required>
          <el-input
            type="number"
            v-model="form.commission"
            style="width: 70%"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="所属类别" required clearable>
          <el-select
            v-model="form.folder_id"
            placeholder="请选择文件夹"
            style="width: 70%"
            filterable
          >
            <el-option
              v-for="item in docFolderList"
              :key="item.id"
              :label="item.folder_name"
              :value="item.folder_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" required>
          <el-radio-group v-model="form.on_sale" style="width: 70%">
            <el-radio :label="1">上架</el-radio>
            <el-radio :label="0">下架</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitUpdate">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listDoc,
  getUploadUrl,
  listDocFolder,
  delDoc,
  updateDoc,
  getDoc,
} from "@/api/library";

export default {
  name: "book-upload",
  data() {
    return {
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 上传框显示
      diaUploadOpen: false,
      diaUpdateOpen: false,
      // 文档列表
      docList: [],
      // 加载
      loading: false,
      // 上传地址
      uploadUrl: null,
      // 上传附带参数
      docUploadParams: {
        store_id: "",
        file_name: "",
        folder_id: "",
      },
      form: {},
      // 待上传列表
      uploadDocList: [],
      //文件夹列表
      docFolderList: [],
    };
  },
  mounted() {
    this._getUploadUrl();
    this.getDocList();
  },
  methods: {
    _getUploadUrl() {
      this.uploadUrl = getUploadUrl();
    },
    //获取文件信息
    getDocList() {
      this.loading = true;
      listDoc().then((response) => {
        this.loading = false;
        this.docList = response.data.list;
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
        file_name: "",
        on_sale: 1,
        commission: 0,
        print_num: 0,
        read_num: 0,
      };
      this.resetForm("form");
    },
    //上传文件
    handleAdd() {
      this.reset();

      this.diaUploadOpen = true;
    },
    onChangeUpload(file) {
      this.docUploadParams.store_id = this.$store.getters.store_id;
      this.docUploadParams.file_name = file.name;
    },
    onPreview(row) {
      window.open(
        `https://cloudprint.pinghaifeng.cn/pdf_view/web/viewer.html?file=library/${row.file_id}.${row.file_type}?plat=web`,
        "_blank"
      );
    },

    submitUpload() {
      this.docUploadParams.folder_id = this.form.folder_id;
      this.$refs.upload.submit();
    },
    submitUpdate() {
      updateDoc(this.form).then((response) => {
        this.$modal.msgSuccess("修改成功");
        this.diaUpdateOpen = false;
        this.getDocList();
      });
    },
    onUploadSuccess(response) {
      if (response.state === 1) {
        this.$refs.upload.clearFiles();
        this.form = {};
        this.getDocList();
        this.$modal.msgSuccess("添加文件成功，可继续添加文件");
      } else {
        this.$modal.msgError("添加文件失败，请检查文件格式");
      }
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal
        .confirm("是否确认删除此数据项？")
        .then(function () {
          return delDoc(ids);
        })
        .then(() => {
          this.getDocList();
          this.$modal.msgSuccess("删除成功");
        })
        .catch(() => {});
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      //获取文件夹信息
      const file_id = row.file_id || this.file_ids;
      getDoc(file_id).then((res) => {
        this.form = res.data;
        listDocFolder().then((response) => {
          this.docFolderList = response.data.list;
          this.diaUpdateOpen = true;
        });
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
.icon-doc {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
</style>
