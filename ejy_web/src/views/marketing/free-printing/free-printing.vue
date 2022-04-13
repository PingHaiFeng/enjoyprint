 <template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="开启免费打印">
        <el-switch
          v-model="form.enabled"
          active-color="#13ce66"
          inactive-color="#ff4949"
        >
        </el-switch>
      </el-form-item>

      <el-form-item label="开放范围">
        <el-radio-group v-model="form.range">
          <el-radio label="全部用户"></el-radio>
          <el-radio label="新用户"></el-radio>
          <el-radio label="老用户"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="纸张类型">
        <el-radio-group v-model="form.paper_type">
          <el-radio label="仅A4单面"></el-radio>
          <el-radio label="仅A4单双面"></el-radio>
          <el-radio label="全部纸张"></el-radio>
        </el-radio-group>
      </el-form-item>
            <el-form-item label="打印颜色">
        <el-radio-group v-model="form.print_color">
          <el-radio label="仅黑白"></el-radio>
          <el-radio label="仅彩色"></el-radio>
          <el-radio label="全部颜色"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

  <script>
import { getToken } from "@/utils/auth"; // get token from cookie
import store from "@/store"; // get token from cookie

export default {
  data() {
    return {
      form: {
        enabled: false,
        range:'',
        paper_type:'',
        print_color:''
      },
    };
  },
  mounted() {},
  methods: {},
};
</script>
<style >
/* label.el-form-item__label {
  font-weight: 500 !important;
} */
/* el-form-item{
    width: 300px !important;
} */
</style>