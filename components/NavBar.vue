<template>
  <div :style="{'background':background}" class="navbar">
    <img v-if="url.name!=='index'" :src="logo" class="logo" style="height:34px;float:left;margin:16px 55px 16px 30px;position:absolute;top:0;left:0;" alt="京师在线">
    <div :style="{'width':mainwidth+'px'}">
      <el-menu
        :default-active="activeNav"
        active-text-color="#000"
        mode="horizontal"
        text-color="#fff">
        <el-menu-item index="logo" style="min-width:110px;margin-right:50px;">
          <nuxt-link to="/"><img v-if="url.name==='index'" :src="logo" class="logo" alt="”京师在线" style="border:none;"></nuxt-link>
        </el-menu-item>
        <el-menu-item index="index"><nuxt-link to="/">首页</nuxt-link></el-menu-item>
        <el-menu-item index="lawyer"><nuxt-link to="/Lawyer">找律师</nuxt-link></el-menu-item>
        <el-menu-item index="auth"><nuxt-link to="/Auth">律师认证</nuxt-link></el-menu-item>
        <el-menu-item index="help"><nuxt-link to="/Help">帮助中心</nuxt-link></el-menu-item>
        <el-menu-item index="about"><nuxt-link to="/About">关于我们</nuxt-link></el-menu-item>
        <el-menu-item index="login"><span>注册</span><span>登录</span></el-menu-item>
      </el-menu>
    </div>
    <img v-if="url.name!=='index'" :src="telephone" class="telephone" style="height:32px;float:right;margin:17px 30px 17px 0;position:absolute;top:0;right:0;" alt="telephont">
  </div>
</template>

<script>
import logo from '@/assets/logo.png'
import telephone from '@/assets/telephone.png'
export default {
  name: 'NavBar',

  components: {
  },
  props: {
    mainwidth: {
      type: Number,
      default: 1380
    },
    background: {
      type: String,
      default: 'linear-gradient(#494949, #3d3d3d)'
    }
  },
  data() {
    return {
      logo: logo,
      telephone: telephone,
      url: this.$route,
      activeNav: 'index'
    }
  },

  watch: {
  },

  mounted() {
    this.selectActiveNav()
  },

  methods: {
    selectActiveNav() {
      this.activeNav = this.$route.name.toLocaleLowerCase()
    }
  }
}
</script>

<style lang='scss' scoped>
.navbar{
  height: 66px;
  line-height: 66px;
  display: flex;
  justify-content: center;
  align-items: center;
  .login{
      float: right;
      i{
        margin: 0 10px;
        border: 1px solid #fff;
      }
    }
}
.el-menu{
  width: 100%;
  background: none;
  border: none;
  .el-menu-item{
    padding: 0;
    height: 66px;
    line-height: 66px;
    border: none;
    font-size: 16px;
    a{
      padding: 0 30px;
      background: none;
    }
    &:hover{
      a{
        color: #000;
      }
    }
    &:first-child:hover,&:last-child:hover{
      background: none;
    }
    &:last-child.is-active{
      color: #fff !important;
      background: none;
    }
    &:last-child{
      float: right;
      span{
        padding: 0 20px;
        &:first-child{
          border-right: 1px solid rgba(255,255,255,.3);
        }
      }
    }
  }
}
</style>
