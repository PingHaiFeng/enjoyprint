 <template>
  <div class="app-container">
    <el-row>
      <el-col :span="8">
        <el-form >
          <p>封面图预览</p>

          <div class="preview-box">
            <div class="pre-head">
              <div class="head-left">
                <p>取件码</p>
                <p class="code-data">13-5</p>
                <p>2022年03月13日</p>
                <p>文件：2份</p>
                <p>总纸张数量：1张</p>
              </div>
              <div class="head-right">
                <!-- <img src="" alt=""> -->
              </div>
            </div>
            <div class="pre-img-wrp">
              <img class="ad-pic" src="" alt="" />
            </div>
          </div>
        </el-form>
      </el-col>
      <el-col :span="8">
        <el-form ref="form" :model="form" >
          <p>参数设置</p>
           <el-form-item label="取件码开关">
            <el-switch
              v-model="form.takeIdEnabled"
              active-color="#409eff"
              inactive-color="#bfbfbf"
            >
            </el-switch>
          </el-form-item>
          <el-form-item label="功能开关">
            <el-switch
              v-model="form.adEnabled"
              active-color="#409eff"
              inactive-color="#bfbfbf"
            >
            </el-switch>
          </el-form-item>
          <el-form-item label="份数">
            <el-input placeholder="请输入份数"></el-input>
          </el-form-item>
          <el-form-item label="广告图片">
            <el-input placeholder="请输入份数"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

  <script>
export default {
  data() {
    return {
      form: {
        takeIdEnabled:false,
        adEnabled: false,
        range: "",
        paper_type: "",
        print_color: "",
      },
    };
  },
  mounted() {},
  methods: {},
};
</script>
<style >
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.preview-box {
  width: calc(595px / 1.5);
  height: calc(842px / 1.5);
  border: 1px solid #bfbfbf;
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pre-head {
  width: 100%;
  font-size: 10px;
  display: flex;
  align-items: center;
}
.head-left {
  width: 50%;
  color: #333333;
}
.head-left p {
  margin: 4px;
}
.code-data {
  font-weight: bold;
  font-size: 28px;
}
.head-right {
  border: 1px solid #bfbfbf;
  width: 50%;
  height: 120px;
}
.pre-img-wrp {
  width: 100%;
  height: 377px;
  margin-top: 30px;
  border: 1px solid #bfbfbf;
}
</style>