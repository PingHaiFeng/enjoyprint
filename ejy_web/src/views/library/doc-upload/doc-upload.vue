<template>
  <div class="container">
    <el-button
      type="primary"
      icon="el-icon-upload"
      size="mini"
      @click="diaOpen = true"
      >上传文档</el-button
    >

    <el-table
      :data="docList"
      style="width: 100%"
      v-loading="loading"
      :header-cell-style="{ background: '#F7F7FA', color: '#555' }"
    >
      <el-table-column label="文件名">
        <template scope="scope">
          <svg-icon
            class="icon-doc"
            :icon-class="scope.row.file_type"
          ></svg-icon>
          <span>{{ scope.row.file_name }}.{{ scope.row.file_type }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="create_date" label="发布日期" />
      <el-table-column prop="read_num" label="阅读人数" />
      <el-table-column prop="print_num" label="打印次数" />
      <el-table-column prop="file_page_num" label="文件页数" />
      <el-table-column label="操作" fixed="right" align="center" width="150">
        <template slot-scope="scope">
          <el-button @click="onPreview(scope.row)" type="text" size="medium"
            >预览</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 上传对话框 -->
    <el-dialog title="文档上传" :visible.sync="diaOpen" append-to-body>
      <el-upload
        class="upload-doc"
        ref="upload"
        :action="uploadUrl"
        multiple
        :before-upload="onBeforeUpload"
        :data="docUploadParams"
        :auto-upload="false"
      >
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
          <div class="el-upload__tip" slot="tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>

      <!-- <el-form :model="form" ref="form" :rules="rules">
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
      </el-form> -->
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listDoc, getUploadUrl } from "@/api/library";

export default {
  name: "book-upload",
  data() {
    return {
      diaOpen: false,
      docList: [],
      loading: false,
      uploadUrl: null,
      docUploadParams: null,
      uploadDocList:[]
    };
  },
  mounted() {
    this._getUploadUrl();
    this.getDoc();
  },
  methods: {
    _getUploadUrl() {
      this.uploadUrl = getUploadUrl();
    },
    //获取文件信息
    getDoc() {
      this.loading = true;
      listDoc().then((response) => {
        this.loading = false;
        this.docList = response.data.list;
      });
    },
    onBeforeUpload(file) {
     
    },
    onPreview(row) {
      window.open(
        `https://cloudprint.pinghaifeng.cn/pdf_view/web/viewer.html?file=library/${row.file_id}.${row.file_type}?plat=web`,
        "_blank"
      );
    },
    submitUpload(file) {
      console.log(file)
       this.docUploadParams = {
        store_id:this.$store.getters.store_id,
        file_name: this.uploadDocList[0].name,
        folder_id:"1001"
      };
       this.$refs.upload.submit();
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
