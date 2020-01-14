<template>
  <footer>
    <div>
      <ul>
        <li><nuxt-link tag="a" to="/">版权所有</nuxt-link></li>
        <li><nuxt-link tag="a" to="/">联系我们</nuxt-link></li>
        <li><nuxt-link tag="a" to="/">在线办公</nuxt-link></li>
        <li><nuxt-link tag="a" to="/">企业邮箱</nuxt-link></li>
        <li><nuxt-link tag="a" to="/">站长统计</nuxt-link></li>
      </ul>
      <div>北京京师在线科技有限公司 京ICP备16001218号-2</div>
    </div>

  </footer>
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
footer{
  display: flex;
  justify-content: center;
  background-color: #4d4d4d;
  min-height: 70px;
  line-height: 35px;
  color: #fff;
  font-size: 14px;
  >div{
    width: 1380px;
    text-align: center;
    ul{
    clear: both;
    li{
      display: inline-block;
      a{
        color: #fff;
        padding:0 10px;
        border-right:1px solid #fff;
        text-decoration: none;

      }
      &:last-child{
        a{
          border-right: none;
        }
      }
    }
  }
  }
}

</style>
