 <template>
  <div class="app-container" v-loading="loading">
    <!-- <div class="dot" v-if="store_detail.pc_online === 1" >在线</div>
<div class="dot" v-else>离线</div> -->
    <el-form inline>
      <el-form-item label="PC客户端状态" >
        <svg-icon
          class="dot"
          :style="
            store_detail.pc_online === 1 ? 'fill:#67c23a' : 'fill:#cdcdcd'
          "
          icon-class="dot"
        />{{ store_detail.pc_online === 1 ? "在线" : "离线" }}
      </el-form-item>
      <el-form-item>
        <el-button :disabled="store_detail.pc_online !== 1" type="primary" :loading="pcRestartLoading" plain size="mini" @click="_restartPC">重启</el-button>
      </el-form-item>
    </el-form>

    <el-descriptions class="margin-top" title="" :column="3" border>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          店铺名称
        </template>
        <el-input v-model="store_detail.store_name"></el-input>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-monitor"></i>
          在线状态
        </template>
        <el-tag v-if="store_detail.pc_online === 1" type="success" 
          >在线</el-tag
        >
        <el-tag v-else type="info">离线</el-tag>
      </el-descriptions-item>
      <!-- <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          营业时间
        </template>
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
      </el-descriptions-item> -->
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-mobile-phone"></i>
          登陆账号
        </template>
        {{ store_detail.username }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-mobile-phone"></i>
          手机号
        </template>
        {{ store_detail.username }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          套餐版本
        </template>
        <el-tag  type="success">高校版</el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          使用期限
        </template>
        <el-tag type="success">终身免费</el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          详细地址
        </template>
        {{ store_detail.detail_addr }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          店铺公告
        </template>
        <el-input v-model="store_detail.store_announce"></el-input>
      </el-descriptions-item>
    </el-descriptions>
    <el-row type="flex" justify="center">
      <el-button type="primary" @click="setData" style="margin-top: 100px">
        确认修改
      </el-button>
    </el-row>
  
  </div>
</template>

  <script>
  import { restartPC } from "@/api/pcclient";
import { getStoreDetail, setStoreDetail } from "@/api/user";
import store from "@/store"; // get token from cookie
const store_id = store.getters.store_id;
export default {
  data() {
    return {
      loading: true,
      pcRestartLoading:false,
      store_detail: {
        store_name: "",
        store_announce: "",
        username: "",
      },
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.loading = true;
      getStoreDetail().then((res) => {
        this.store_detail = res.data;
        this.loading = false;
      });
    },
    setData() {
      var data = {
        store_name: this.store_detail.store_name,
        store_announce: this.store_detail.store_announce,
      };
      setStoreDetail(data).then((res) => {
        this.$message({
          message: res.msg,
          type: "success",
        });
      });
    },
    _restartPC(){
      
      if(this.store_detail.pc_online !== 1){
         this.$modal.msgError("客户端已离线，请先上线");
         return
      }
      this.pcRestartLoading=true
restartPC().then(res=>{
  this.$modal.msgSuccess("重启成功");
   this.pcRestartLoading=false
}).catch(err=>{
   this.pcRestartLoading=false
})
    }
  },
};
</script>
<style >

.dot {
  width: 10px;
  height: 10px;
}
</style>