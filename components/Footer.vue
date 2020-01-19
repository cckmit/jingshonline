<template>
  <footer class="footer">
    <div>
      <div class="top">
        <el-row>
          <el-col :span="20" :offset="2">
            <el-row :gutter="60">
              <el-col :span="4">
                <img :src="logo" alt="京师在线">
              </el-col>
              <el-col :span="4">
                <p>在线办公</p>
                <ul>
                  <li>企业邮箱</li>
                  <li>版权所有</li>
                  <li>站长统计</li>
                </ul>
              </el-col>
              <el-col :span="8">
                <p>联系我们</p>
                <el-form label-position="right">
                  <el-form-item label="客服：">4001 - 666 - 001 <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	 周一至周日 9:00-24:00（春节除外）</el-form-item>
                  <el-form-item label="邮箱：">youdao_kecheng@163.com</el-form-item>
                </el-form>
              </el-col>
              <el-col :span="8">
                <dl>
                  <dt>
                    <el-image/>
                  </dt>
                  <dd>APP Store</dd>
                </dl>
                <dl>
                  <dt>
                    <el-image/>
                  </dt>
                  <dd>Android</dd>
                </dl>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
      <div class="bottom">北京京师在线科技有限公司 京ICP备16001218号-2</div>
    </div>
  </footer>
</template>

<script>
import logo from '@/assets/layout/logo.png'
export default {
  name: 'Footer',

  components: {
  },

  data() {
    return {
      logo: logo
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

<style lang='scss'>
.footer{
  min-height: 296px;
  background-color: #666;
  color: #fff;
  display: flex;
  justify-content: center;
  >div{
    width: 1380px;
    .top{
      padding: 40px 0 23px 0;
      p{
        font-size: 18px;
        font-weight: bold;
      }
      ul{
        margin-top: 15px;
        li{
          line-height: 40px;
        }
      }
      .el-form-item__label{
        color: #fff;
      }
      dl{
        width: 140px;
        float: left;
        dt{
          .el-image{
            width: 140px;
            height: 140px;
          }
        }
        dd{
          text-align: center;
          font-size: 18px;
          font-weight: bold;
        }
        &:last-child{
          float: right;
        }
      }
    }
    .bottom{
      height: 44px;
      line-height: 44px;
      font-size: 12px;
      color: #999;
      text-align: center;
      border-top:1px solid #636363;
    }
  }

}

</style>
