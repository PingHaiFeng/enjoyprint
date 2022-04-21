<template>
  <div class="container">
    <el-row>
      <el-col :span="24">
        <el-table
          :data="docFolderList"
          style="width: 100%"
          v-loading="loading"
          :header-cell-style="{ background: '#F7F7FA', color: '#555' }"
        >
          <el-table-column  label="文件夹名" >
             <template scope="scope">
               <svg-icon class="icon-folder" icon-class="folder"></svg-icon>
         <span>{{scope.row.name}}</span>
        </template>
         </el-table-column>
          <el-table-column prop="create_date" label="发布日期" />
          <el-table-column prop="read_num" label="阅读人数" />
          <el-table-column prop="doc_num" label="文件数量" />
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { listDocFolder } from "@/api/library";

export default {
  name: "book-upload",
  data() {
    return {
      docFolderList: [],
      loading: false,
    };
  },
  mounted() {
    this.getDocFolder();
  },
  methods: {
    //获取文件夹信息
    getDocFolder() {
      this.loading = true;
      listDocFolder().then((response) => {
        this.loading = false;
        this.docFolderList = response.data.list;
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
.icon-folder{
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
</style>
