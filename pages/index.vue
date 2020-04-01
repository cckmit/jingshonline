<template>
  <div>
    <div class="content" style="height:36px;line-height:36px;color:#999;font-size:14px;background:linear-gradient(#ffffff, #e9e9e9);">
      <div>
        您好，欢迎您使用京师在线法律服务平台！
      </div>
    </div>
    <div class="content top">
      <div>
        <el-row>
          <el-col :span="6">
            <div>
              <count-to :start-val="0" :end-val="15975" :duration="2000"/><small>例</small>
            </div>
            <p>共统计15975例经典案例</p>
          </el-col>
          <el-col :span="6">
            <div>
              <count-to :start-val="0" :end-val="53" :duration="2000"/><small>家</small>
            </div>
            <p>共有53家律师团队入驻</p>
          </el-col>
          <el-col :span="6">
            <div>
              <count-to :start-val="0" :end-val="157" :duration="2000"/><small>家</small>
            </div>
            <p>全球共有157家联盟合作所</p>
          </el-col>
          <el-col :span="6">
            <div>
              <count-to :start-val="0" :end-val="125" :duration="2000"/><small>种</small>
            </div>
            <p>揽括125种专业领域</p>
          </el-col>
        </el-row>
      </div>
    </div>
    <div :style="{background:`url(${bjcenter}) center no-repeat`}" class="content center">
      <div>
        <div>
          <h2>案源合作APP</h2>
          <p>
            民事诉讼，债权债务......您所遇到的所有的法律烦恼，京师均能以业界领先的律师<br>
            团队为您提供最合理的解决方法
          </p>
          <dl>
            <dt>
              <el-image/>
            </dt>
            <dd>安卓版</dd>
          </dl>
          <dl>
            <dt>
              <el-image/>
            </dt>
            <dd>IOS版</dd>
          </dl>
        </div>
      </div>
    </div>
    <div class="content bottom">
      <div>
        <h1>更新公告</h1>
        <ul>
          <li><span><b>25</b>2019-11</span><div><h4>北京振农科技有限公司与曾祥武合同纠纷二审民事裁定书</h4><p>曾祥武在一审中起诉称：曾祥武于2014年3月22日与振农科技公司签订《竹柳购种育苗合同》，引种种植振农科技公司销售的竹柳种苗，振农科技公司收取曾祥武相应的购苗款。曾祥武为此起诉至一审法院，请求判令振农科技公司支付曾祥武拖欠的竹柳苗款等。</p></div></li>
          <li><span><b>25</b>2019-11</span><div><h4>北京振农科技有限公司与曾祥武合同纠纷二审民事裁定书</h4><p>曾祥武在一审中起诉称：曾祥武于2014年3月22日与振农科技公司签订《竹柳购种育苗合同》，引种种植振农科技公司销售的竹柳种苗，振农科技公司收取曾祥武相应的购苗款。曾祥武为此起诉至一审法院，请求判令振农科技公司支付曾祥武拖欠的竹柳苗款等。</p></div></li>
          <li><span><b>25</b>2019-11</span><div><h4>北京振农科技有限公司与曾祥武合同纠纷二审民事裁定书</h4><p>曾祥武在一审中起诉称：曾祥武于2014年3月22日与振农科技公司签订《竹柳购种育苗合同》，引种种植振农科技公司销售的竹柳种苗，振农科技公司收取曾祥武相应的购苗款。曾祥武为此起诉至一审法院，请求判令振农科技公司支付曾祥武拖欠的竹柳苗款等。</p></div></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import CountTo from 'vue-count-to'
import bj_center from '@/assets/index/index_center.png'
export default {
  layout: 'index',
  head() {
    return {
      title: '首页',
      meta: [
        { hid: 'description', name: 'description', content: '京师在线首页；jingshonline' }
      ]
    }
  },
  components: {
    CountTo
  },
  data() {
    return {
      bjcenter: bj_center
    }
  },

  computed: {

  },
  created() {

  },
  mounted() {
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.content{
  >div{
    width: 1140px;
  }
}
.top{
  background: #fff;
  padding: 70px 0;
  .el-col{
    border-right:1px solid #ebebeb;
    padding-left: 60px;
    div{
      font-size: 34px;
      color: #e23333;
      small{
        font-size: 18px;
      }
    }
    p{
      font-size: 14px;
      color: #999;
    }
    &:last-child{
      border-right: none;
    }
  }
}
.center{
  height: 420px;
  padding: 80px 0 65px;
  >div{
    div{
      width: 700px;
      float: right;
    }
  }
  h2{
    font-weight: 400;
    margin-bottom: 15px;
  }
  p{
    font-size: 18px;
    color: #666;
    margin-bottom: 35px;
  }
  dl{
    float: left;
    margin: 0 75px;
    text-align: center;
    dt{
      width: 130px;
      height: 130px;
      margin-bottom: 10px;
      .el-image{
        width: 100%;
        height: 100%;
        border: none;
      }
    }
    dd{
      font-size: 16px;
      color: #333;
    }
  }
}
.bottom{
  background: #fff;
  padding-bottom: 90px;
  h1{
    font-size: 30px;
    text-align: center;
    padding: 65px 0;
  }
  ul{
    li{
      float: left;
      padding: 0 50px 0 45px;
      border-right:1px dotted rgba(0,0,0,.1);
      &:first-child{
        padding-left: 0;
      }
      &:last-child{
        padding-right: 0;
        border-right: none;
      }
      span{
        display: inline-block;
        font-size: 12px;
        color: #666;
        margin-right: 30px;
        b{
          display: block;
          font-size: 36px;
          color: #333;
        }
      }
      div{
        width: 240px;
        float: right;
        padding-top: 25px;
        h4{
          color: #333;
          margin-bottom: 35px;
        }
        p{
          font-size: 14px;
          color: #666;
        }
      }
    }
  }
}
</style>

