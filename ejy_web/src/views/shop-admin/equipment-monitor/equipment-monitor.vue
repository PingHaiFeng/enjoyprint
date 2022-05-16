 <template>
  <div class="app-container" v-loading="loading">
    <!-- <div class="dot" v-if="store_detail.pc_online === 1" >在线</div>
<div class="dot" v-else>离线</div> -->
    <el-form inline>
      <el-form-item label="PC客户端状态">
        <svg-icon
          class="dot"
          :style="
            store_detail.pc_online === 1 ? 'fill:#67c23a' : 'fill:#cdcdcd'
          "
          icon-class="dot"
        />{{ store_detail.pc_online === 1 ? "在线" : "离线" }}
      </el-form-item>
      <el-form-item>
        <el-button
          :disabled="store_detail.pc_online !== 1"
          type="primary"
          :loading="pcRestartLoading"
          plain
          size="mini"
          @click="_restartPC"
          >重启</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

  <script>
import { restartPC } from "@/api/pcclient";
import { getStoreDetail } from "@/api/user";
export default {
  data() {
    return {
      loading: true,
      pcRestartLoading: false,
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

    _restartPC() {
      if (this.store_detail.pc_online !== 1) {
        this.$modal.msgError("客户端已离线，请先上线");
        return;
      }
      this.pcRestartLoading = true;
      restartPC()
        .then((res) => {
          this.$modal.msgSuccess("重启成功");
          this.pcRestartLoading = false;
        })
        .catch((err) => {
          this.pcRestartLoading = false;
        });
    },
  },
};
</script>
<style >
.dot {
  width: 10px;
  height: 10px;
}
</style>