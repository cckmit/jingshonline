<template>
  <div>
    <div :style="{'background':background}" class="navbar">
      <img v-if="url.name!=='index'" :src="logo" class="logo" style="height:34px;float:left;margin:16px 55px 16px 30px;position:absolute;top:0;left:0;" alt="京师在线">
      <div :style="{'width':mainwidth+'px'}">
        <el-menu
          :default-active="activeNav"
          class="usercenternav"
          active-text-color="#000"
          mode="horizontal"
          text-color="#fff">
          <el-menu-item v-if="url.name==='index'" index="logo" style="min-width:110px;margin-right:50px;">
            <nuxt-link to="/"><img :src="logo" class="logo" alt="”京师在线" style="border:none;"></nuxt-link>
          </el-menu-item>
          <el-menu-item index="index"><nuxt-link to="/">网站首页</nuxt-link></el-menu-item>
          <el-menu-item index="usercenter"><nuxt-link to="/usercenter">工作台</nuxt-link></el-menu-item>
          <el-menu-item index="usercentercase"><nuxt-link to="/usercenter/case">我的案例</nuxt-link></el-menu-item>
          <el-menu-item index="usercenterresume"><nuxt-link to="/usercenter/resume">我的简历</nuxt-link></el-menu-item>
          <el-submenu index="usercenterfollow" popper-class="usercentersummenu">
            <template slot="title">我的关注</template>
            <el-menu-item index="usercenterfollowlaweyr"><nuxt-link to="/usercenter/follow/lawyer">关注律师</nuxt-link></el-menu-item>
            <el-menu-item index="usercenterfollowcase"><nuxt-link to="/usercenter/follow/case">收藏案例</nuxt-link></el-menu-item>
          </el-submenu>
          <el-menu-item index="usercentercasestatistical"><nuxt-link to="/usercenter/case/statistical">案件统计</nuxt-link></el-menu-item>
          <el-menu-item index="usercentersetting"><nuxt-link to="/usercenter/setting">个人设置</nuxt-link></el-menu-item>
          <el-menu-item index="usercenterexplain"><nuxt-link to="/usercenter/explain">帮助中心</nuxt-link></el-menu-item>
          <el-menu-item v-if="hasLogin" index="user" class="user">
            <nuxt-link to="/usercenter">
              <el-dropdown class="user_info" trigger="hover">
                <span class="el-dropdown-link">
                  <el-image :src="account.avatar"/><span>{{ account.name }}</span>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item icon="el-icon-user"><nuxt-link to="/userCenter/auth" style="color:#606266;">律师认证</nuxt-link></el-dropdown-item>
                  <el-dropdown-item icon="el-icon-user"><nuxt-link to="/userCenter/case/create" style="color:#606266;">添加案例</nuxt-link></el-dropdown-item>
                  <el-dropdown-item icon="el-icon-delete" @click.native="handleLogout">登出</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </nuxt-link>
          </el-menu-item>
          <el-menu-item v-else index="login" class="login_btn" @click="loginVisible=true"><span>注册 <b /> 登录</span></el-menu-item>
        </el-menu>
      </div>
      <img v-if="url.name!=='index'" :src="telephone" class="telephone" style="height:32px;float:right;margin:17px 30px 17px 0;position:absolute;top:0;right:0;" alt="telephont">
    </div>
    <login :visible="loginVisible" @close="close" @login="login" />
  </div>
</template>

<script>
import logo from '@/assets/layout/logo.png'
import telephone from '@/assets/layout/telephone.png'
import login from './login'
import { mapActions } from 'vuex'
export default {
  name: 'NavBar',

  components: {
    login
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
      activeNav: 'index',
      hasLogin: this.$cookie.get('token'),
      loginVisible: false
    }
  },
  computed: {
    account() {
      return this.$store.state.account
    }
  },
  watch: {

  },

  mounted() {
    this.selectActiveNav()
    this.hasLogin ? this.getUserInfo() : ''
  },

  methods: {
    ...mapActions('account', ['Logout', 'GetLoginUserInfo']),
    selectActiveNav() {
      const pathName = this.$route.name.toLocaleLowerCase()
      this.activeNav = pathName.indexOf('case') > -1 ? 'usercentercase' : pathName.indexOf('resume') > -1 ? 'usercenterresume' : pathName.indexOf('follow') > -1 ? 'usercenterfollow' : pathName.indexOf('statistical') > -1 ? 'usercentercasestatistical' : pathName.indexOf('setting') > -1 ? 'usercentersetting' : pathName.indexOf('explain') > -1 ? 'usercenterexplain' : 'usercenter'
    },
    login() {
      this.hasLogin = this.$cookie.get('token')
    },
    close() {
      this.loginVisible = false
    },
    handleLogout() {
      this.Logout().then(res => {
        this.$router.push(`/`)
      })
    },
    getUserInfo() {
      this.hasLogin ? this.GetLoginUserInfo() : ''
    }
  }
}
</script>

<style lang='scss' scoped>
.navbar{
  min-width: 1380px;
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
        padding: 0 10px;
        &:first-child{
          border-right: 1px solid rgba(255,255,255,.3);
        }
      }
      .el-image{
        width:50px;
        height: 50px;
      }
    }
    &:last-child:hover{
      a{
        color: #fff;
      }
    }
    .user_info{
      >span{
        border-right: none !important;
        color: #fff;
        a{
          padding: 0;
          span{
            color: #fff;
            font-size: 16px;
          }
        }
      }
    }
  }

}

@media (max-width: 1760px) {
  .telephone{
    display: none;
  }
}
.usercentersummenu{
  .el-menu-item{
    float: none !important;
    height: 40px;
    line-height: 40px;
    a{
      color: #000;
      &:hover{
        color: #000;
      }
    }
    &:last-child:hover{
      background: none;
      color: #000 !important;
      a{
        color: #000 !important;
      }
    }
  }
}

</style>

<style lang="scss">
.usercenternav{
  .el-submenu{
    height: 66px;
    line-height: 66px;
    .el-submenu__title{
      height: 66px !important;
      line-height: 66px !important;
      font-size: 16px;
      &:hover{
        color: #000 !important;
      }
    }
  }
}

</style>
