 <template>
  <div class="vip-container">
    <p class="title">会员卡</p>
    <p>线上支付的历史订单累计满200单时，可开通该功能。</p>
    <p>
      开通会员卡功能后可发放电子会员卡，学生领卡后可预充值后消费，达到<span style="color:#c72020"> 绑定客户，回笼资金</span>效果
    </p>
    <p style="color:#1cae5b">了解会员卡功能</p>
    <img
      class="img-card-banner"
      src="https://static.inmeng.net/admin-plus/img/card-banner.png"
    />
  </div>
</template>

  <script>
export default {
  data() {
    return {
      loading: true,
    };
  },
  created() {},
  methods: {},
};
</script>
<style scope>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.vip-container{
    width: 100%;
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
}

.title{
    font-size: 34px;
    margin-top: 80px;
    font-weight: bold;
    color: #000;

}
p{
    margin: 6px;
    color: #7c7d83;
}
.img-card-banner {
  width: 638px;
  height: 360px;
  border-radius: 10px;
}
</style>