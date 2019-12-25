<template>
  <div class="footer">
    <ul>
      <li><nuxt-link tag="a" to="/">版权所有</nuxt-link></li>
      <li><nuxt-link tag="a" to="/">联系我们</nuxt-link></li>
      <li><nuxt-link tag="a" to="/">在线办公</nuxt-link></li>
      <li><nuxt-link tag="a" to="/">企业邮箱</nuxt-link></li>
      <li><nuxt-link tag="a" to="/">站长统计</nuxt-link></li>
    </ul>
    <div>北京京师在线科技有限公司 京ICP备16001218号-2</div>
  </div>
</template>

<script>
export default {
  name: '',

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

<style lang='scss' scoped>
.footer{
  width: 100%;
  min-width: 388px;
  height: 70px;
  background-color: #4d4d4d;
  text-align: center;
  line-height: 35px;
  color: #fff;
  font-size: 14px;
  ul{
   overflow: auto;
   padding: 0;
   margin: 0;
   text-align: center;
   display: inline-flex;
    li{
      list-style: none;
      float: left;
      a{
        color: #fff;
        padding:0 10px;
        border-left:1px solid #fff;
        border-right:1px solid #fff;
      }
      &:first-child{
        a{
          border-left: none;
        }
      }
      &:last-child{
        a{
          border-right: none;
        }
      }
    }
  }
}

</style>
