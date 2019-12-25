<template>
  <div :style="{'background-color':background}" class="navbar">
    <div :style="{'width':mainwidth+'px'}">
      <img :src="logo" class="logo">
      <el-menu
        :default-active="activeNav"
        mode="horizontal"
        text-color="#fff">
        <el-menu-item index="index"><nuxt-link to="/">首页</nuxt-link></el-menu-item>
        <el-menu-item index="Lawyer"><nuxt-link to="/lawyer">找律师</nuxt-link></el-menu-item>
        <el-menu-item index="Auth"><nuxt-link to="/auth">律师认证</nuxt-link></el-menu-item>
        <el-menu-item index="Help"><nuxt-link to="/help">帮助中心</nuxt-link></el-menu-item>
        <el-menu-item index="About"><nuxt-link to="/about">关于我们</nuxt-link></el-menu-item>
        <!-- <el-submenu v-if="userInfo.nickName" index="" style="float:right;">
          <template slot="title">
            <img :src="userInfo.avatar" style="width:40px;height:40px;border-radius:50%;">
            {{ userInfo.nickName }}
          </template>
          <el-menu-item index="userCenter" style="color:#999;text-align:right;padding-right:25px;">
            <a href="/userCenter">
              个人中心
            </a>
          </el-menu-item>
          <el-menu-item index="signOut" style="color:#999;text-align:right;padding-right:25px;" @click="signOut">退出</el-menu-item>
        </el-submenu> -->
        <el-menu-item index="login" class="login">
          <nuxt-link to="/Account/login">注册</nuxt-link>
          <i/>
          <nuxt-link to="/Account/login">登录</nuxt-link>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
import logo from '@/assets/logo.png'
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
      default: '#2d2e30'
    }
  },
  data() {
    return {
      logo: logo,
      activeNav: '1'
    }
  },

  watch: {
  },

  mounted() {
    this.selectActiveNav()
  },

  methods: {
    selectActiveNav() {
      console.log(this.$route)
      this.activeNav = this.$route.name
    }
  }
}
</script>

<style lang='scss' scoped>
.navbar{
  height: 70px;
  line-height: 70px;
  text-align: center;
  div{
    display: inline-flex;
    vertical-align: middle;
    .logo{
      width: 108px;
      height: 32px;
      border: none;
      margin-right: 50px;
    }
    .login{
      float: right;
      i{
        margin: 0 10px;
        border: 1px solid #fff;
      }
    }
  }
}
.el-menu{
  width: 100%;
  background: none;
  border: none;
  .el-menu-item{
    padding: 0;
    height: 30px;
    line-height: 30px;
    border: none;
    font-size: 16px;
    a{
      // display: inline-block;
      padding: 0 30px;
    }
  }
}
</style>
<style lang="scss">

</style>
