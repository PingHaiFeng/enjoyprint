<template>
  <div class="dashboard-container">
    <el-row  >
        <el-col :span="24">
    <el-table :data="notice" style="width: 100%"  :header-cell-style="{ background: '#F7F7FA', color: '#555' }">
  
        <el-table-column prop="title" label="文章标题" width="480">
        </el-table-column>
              <el-table-column prop="create_time" label="发布日期" width="180">
        </el-table-column>
      
              <el-table-column prop="read_num" label="阅读人数" width="180">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="viewDetails(scope.row)" type="text" size="medium"
              >查看</el-button
            >
          </template>
        </el-table-column>
      </el-table>

        </el-col>
  
      <el-dialog
        :title="currentNotice.title"
        :visible.sync="detailDialogVisible"
        width="30%"
        center
      >
        <span>{{currentNotice.content}}</span>
        <span slot="footer" class="dialog-footer">
       
        </span>
      </el-dialog>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getNotice } from "@/api/news";

export default {
  name: "dashboard",
  data() {
    return {
      detailDialogVisible: false,
        currentNotice:{
            title:"",
            content:""
        },
      notice: [{ content: null }],
    };
  },
  computed: {
    ...mapGetters(["name"]),
  },
  watch: {},
  mounted() {
    this._getNotice();
  },
  methods: {
    //获取公告信息
    _getNotice() {
      getNotice().then((response) => {
        console.log(response.data);
        this.notice = response.data.notice;
        this.listLoading = false;
      });
    },
    viewDetails(row) {
        this.detailDialogVisible=true
      this.currentNotice=row
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 10px 20px !important;
  }
}

.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.notice {
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  box-sizing: border-box;

  &-item {
    display: flex;

    font-size: 12px;
    height: 30px;
    line-height: 30px;

    cursor: pointer;
    .time {
      color: #409eff;
      margin-right: 15px;
    }
    .content {
      color: #7c7d83;
      width: 150px;
    }
  }
}
</style>
