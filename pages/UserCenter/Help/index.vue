<template>
  <el-row :gutter="20">
    <el-col :span="24">
      <el-breadcrumb separator-class="el-icon-minus" class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }">京师在线</el-breadcrumb-item>
        <el-breadcrumb-item>帮助中心</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <el-col :span="6">
      <div class="bgf tree_left">
        <ul>
          <li>积分、排名说明</li>
        </ul>
      </div>
    </el-col>
    <el-col :span="18">
      <div class="bgf selectend">
        <div class="title">积分、排名说明</div>
        <div class="selecttab">
          <p>一、律师个人积分计算方式</p>
          <div>
            <b>1.执业年限</b>（例：执业年限为5*积分系数10=本项得分50）<br>
            <b>2.是否为部门主任</b>（例：若为部门主任*积分系数20=本项得分20；若非部门主任，则本项不得分）<br>
            <b>3.社会影响力</b>（例：工作经历/社会职务/学术成果/行业资质/教育经历已认证总和10*积分系数10=本项得分100）<br>
            <b>4.已认证案例数</b>（例：已认证案例数为5*积分系数20=本项得分100）<br>
            <b>5.我的关注度</b>（例：关注我的律师数为5*积分系数10=本项得分50）<br>
            <b>6.典型案例数</b>（例：典型案例数为5*积分系数20=本项得分100）<br>
            <b>7.是否为推荐律师</b>（例：若为推荐律师*积分系数20=本项得分20；若非推荐律师，则本项不得分）<br>
            <b>8.律师信息浏览量</b>（例：我的个人详细页浏览量为100*积分系数1=本项得分100）<br>
            <b>9.以上8项积分总和=您的个人信息总积分</b><br>
          </div>
          <p>二、每条案例积分计算方式</p>
          <div>
            <b>1.是否为典型案例</b>（例：若为典型案例*积分系数2000=本项得分2000；若非典型案例，则本项不得分）<br>
            <b>2.案例关注度</b>（例：关注该条案例的律师数为5*积分系数10=本项得分50）<br>
            <b>3.是否为推荐案例</b>（例：若为推荐案例*积分系数10=本项得分10；若非推荐案例，则本项不得分）<br>
            <b>4.判决日期年限</b>（例：若判决日期为2017年，则判决年限为37，即：37*积分系数1000=本项得分37000）<br>
            <b>5.案例信息浏览量</b>（例：该条案例详细页浏览量为100*积分系数1=本项得分100）<br>
            <b>6.以上5项积分总和=该条案例总积分</b><br>
          </div>
          <p>三、律师、案例的排名方法</p>
          <div>
            <b>1.律师/案例排名</b>是按照积分降序排列，即：积分越高，排名越靠前；积分越低，排名越靠后。<br>
            <b>2.该说明为积分、排名试用版</b>。若您认为不合理或增加计算排名项，请联系我们。
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  layout: 'userCenter',
  name: 'UserCenterIndex',
  middleware: 'auth',
  head() {
    return {
      title: '用户中心-帮助中心',
      meta: [
        { hid: 'description', name: 'description', content: '京师在线用户中心；jingshonline-usercenter' }
      ]
    }
  },
  components: {
  },

  data() {
    return {

    }
  },

  watch: {
  },

  mounted() {
  },

  methods: {

  }
}
</script>

<style lang="scss" scoped>
.tree_left{
  background: #fff;
  padding: 20px;
  ul{
    margin-bottom: 0px;
    margin-left: 10px;
    li{
      font-size: 16px;
      list-style:inside;
    }
  }
}
.selectend{
  background: #fff;
  padding: 30px 50px;
  margin-bottom: 40px;
  .title{
      font-size: 18px;
      border-bottom: 1px solid #e9e9e9;
      padding-bottom: 15px;
      color:#333;
      display: block;
    }
  .selecttab{
    padding: 35px 20px 0px 20px;
    p{
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 0px;
    }
    div{
      padding: 20px;
      line-height: 50px;
      font-size: 14px;
      color:#999;
      b{
        color:#666;
      }
    }
  }
}

</style>
