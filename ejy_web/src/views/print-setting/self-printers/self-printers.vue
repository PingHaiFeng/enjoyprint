 <template>
  <div class="app-container">
    <div class="header">
      <span style="margin: 30px 10px; font-weight: bold">手机自助打印</span>
      <el-switch
        class="switchStyle"
        v-model="openSelfPrint"
        active-color="#409eff"
        active-text="开"
        inactive-color="#A7A8AD"
        inactive-text="关"
      >
      </el-switch>
    </div>

    <el-row>
      <el-col :span="6">
        <!-- <div class="bind-pc">
          <el-form :model="computersList">
            <el-form-item label="绑定计算机" :label-width="300" required>
              <el-select
                v-model="computersList.computer_id"
                placeholder="计算机名称"
              >
                <el-option label="普通" value="common"></el-option>
                <el-option label="图片" value="pic"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div> -->
      </el-col>
      <el-col :span="12">
        <div class="bind-default">
          <el-form inline>
            <el-form-item label="线上默认打印机" label-width="300" size="small">
              <el-select v-model="user_set_defalut_printer">
                <el-option
                  v-for="item in printerList"
                  :key="item.id"
                  :label="item.printer_name"
                  :value="item.printer_name"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="当前电脑" label-width="500" size="small">
              <el-select v-model="curComputerId" :change="filterPrinter">
                <el-option
                  v-for="(item, index) in computerIdList"
                  :key="index"
                  :label="item + (item == onlineComId ? '（在线）' : '（离线）')"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>

    <el-table
      :header-cell-style="{ background: '#F7F7FA', color: '#555' }"
      :data="curPrintersList"
      style="width: 100%"
      v-loading="listLoading"
    >
      <!-- :default-sort="{ prop: 'is_defalut', order: 'descending' }" -->
      <el-table-column prop="printer_name" label="打印机名称" width="300">
      </el-table-column>
      <el-table-column label="支持纸型" width="150"> A4 </el-table-column>

      <el-table-column prop="can_duplex" label="支持双面" width="150">
        <template scope="scope">
          <el-tag size="small" v-if="scope.row.can_duplex === 1" type="success"
            >是</el-tag
          >
          <el-tag size="small" v-else type="info">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="supports_color" label="支持颜色" width="150">
        <template scope="scope">
          <span v-if="scope.row.supports_color === 1">黑白/彩色</span>
          <span v-else-if="scope.row.supports_color === 0">黑白</span>
        </template>
      </el-table-column>

      <el-table-column prop="is_defalut" label="系统默认打印机" width="150">
        <template scope="scope">
          <span v-if="scope.row.is_defalut === 1">是</span>

          <span v-else-if="scope.row.is_defalut === 0">否</span>
        </template>
      </el-table-column>
      <el-table-column label="开启手机自助打印" prop="can_self_print">
        <template slot-scope="scope">
          <el-switch
            class="switchStyle"
            v-model="scope.row.can_self_print"
            active-color="#409eff"
            active-text="开"
            inactive-color="#A7A8AD"
            inactive-text="关"
            :active-value="1"
            :inactive-value="0"
            @change="handleUpdate(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="text" size="medium"
            >编辑</el-button
          >
          <el-button
            @click="handleCreateQrCode(scope.row)"
            type="text"
            size="medium"
            >专属二维码</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div>
      <!-- 海报html元素 -->
      <div
        id="posterHtml"
        :style="{ backgroundImage: 'url(' + posterHtmlBg + ')' }"
        style="
          background-repeat: no-repeat;
          background-size: 1373px 1582px;
          width: 1373px;
          height: 1582px;
        "
        v-show="false"
      >
        <div>{{ posterContent }}</div>
        <!-- 二维码 -->
        <div id="qrcodeImg"></div>
      </div>
    </div>
  </div>
</template>

  <script>
import { listPrinter, updatePrinter } from "@/api/printer";
import html2canvas from "html2canvas";
import QRCode from "qrcodejs2";
export default {
  data() {
    return {
      openSelfPrint: true,
      listLoading: true,
      dataVisable: true,
      canSelfPrint: true,
      printerList: null,
      onlineComId: null,
      computerIdList: [],
      printersList: [],
      curPrintersList: [],
      computersList: [],
      curComputerId: "",
      user_set_defalut_printer: null,
      posterContent: "", // 文案内容
      posterImg: "", // 最终生成的海报图片
      posterImgName: "专属二维码", // 最终生成的海报图片名称
      posterHtmlBg: require("../../../assets/ewm_poster/model.jpg"), // 背景图
    };
  },
  created() {
    this.getList();
  },
  watch: {
    curComputerId() {
      this.filterPrinter();
    },
  },
  methods: {
    //获取打印机
    getList() {
      listPrinter().then((response) => {
        this.listLoading = false;
        this.printerList = response.data.list;
        this.onlineComId = response.data.cur_computer_id;
        if (this.printerList.length === 0) {
          this.$modal.alert("暂未获取到打印机数据，您需要先登录pc端以获取信息");
          return;
        }
        this.computerIdList = Array.from(
          new Set(this.printerList.map((item) => item.computer_id))
        );

        this.curComputerId = this.onlineComId ? this.onlineComId : this.computerIdList[0];
        this.filterPrinter();
      });
    },
    // 修改打印配置
    handleUpdate(row) {
      updatePrinter(row).then((response) => {
        this.$modal.msgSuccess("配置成功");
      });
    },
    filterPrinter() {
      this.curPrintersList = this.printerList.filter((item) => {
        if (item.computer_id == this.curComputerId) {
          return item;
        }
      });
      this.curPrintersList.filter((item) => {
        if (item.is_user_set_defalut === 1) {
          this.user_set_defalut_printer = item.printer_name;
        }
      });
    },
    filterComputer() {},
    //编辑
    handleEdit() {
      this.$modal.msg("此版本未开通");
    },
    // 保存专属二维码图片到本地
    handleCreateQrCode(row) {
      var url = `https://cloudprint.pinghaifeng.cn/web/printer_ewm?store_id=${row.store_id}&printer_id=${row.printer_id}`;
      var domObj = document.getElementById("posterHtml");
      var qrcodeImgEl = document.getElementById("qrcodeImg");

      let qrcode = new QRCode(qrcodeImgEl, {
        width: 500,
        height: 500,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
      });
      qrcode.makeCode(url);
      html2canvas(domObj, {
        useCORS: true,
        allowTaint: false,
        logging: false,
        letterRendering: true,
        onclone(doc) {
          let e = doc.querySelector("#posterHtml");
          e.style.display = "block";
        },
      })
        .then((canvas) => {
          var alink = document.createElement("a" + Date.now());
          alink.href = canvas.toDataURL("image/png");
          alink.download = `${row.printer_name}的专属二维码`; // 图片名
          alink.click();
          this.$modal.msgSuccess(`${row.printer_name}的二维码生成成功`);
        })
        .catch((err) => {
          this.$modal.msgError(err);
        });
    },
  },
};
</script>
<style lang="scss" >
.line {
  text-align: center;
}
.switchStyle .el-switch__label {
  position: absolute;
  display: none;
  color: #fff;
}
.switchStyle .el-switch__label--left {
  z-index: 9;
  left: 25px;
}
.switchStyle .el-switch__label--right {
  z-index: 9;
  left: 5px;
}
.switchStyle .el-switch__label.is-active {
  display: block;
}
.switchStyle.el-switch .el-switch__core,
.el-switch .el-switch__label {
  width: 55px !important;
}
.el-switch__label span {
  font-size: 13px;
}
.el-row {
  margin: 20px 0;
  &:last-child {
    margin: 20px 0;
  }
}

// .bind-pc {
//   margin: 20px 10px;
// }
#qrcodeImg {
  //控制二维码位置  自己调整
  transform: translate(219px, 375px) !important;
}
</style>