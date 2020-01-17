<template>
  <div>
    <header :style="{background:`url(${banner}) center no-repeat`}">
      <NavBar :background="'rgba(22,22,34,.4)'" :mainwidth="1140" />
      <div class="banner">
        <div>
          <img :src="logo" alt="京师在线">
          <div class="search">
            <ul>
              <li :class="activeSearchTabs===''?'active':''" @click="activeSearchTabs=''">综合检索</li>
              <li :class="activeSearchTabs==='lawyer'?'active':''" @click="activeSearchTabs='lawyer'">按照业务领域找律师</li>
              <li :class="activeSearchTabs==='case'?'active':''" @click="activeSearchTabs='case'">按照审判机关找律师</li>
            </ul>
            <div>
              <el-input v-model="searchText" class="index" placeholder="您可以通过输入律师姓名或者法院来进行快速检索。">
                <span slot="suffix" class="icon" @click="search">
                  <img :src="icon" alt="">
                </span>
              </el-input>
            </div>
            <p>共有 1523 位律师入驻本平台，今日新录入 85427 篇案例。</p>
          </div>
        </div>
      </div>
    </header>
    <nuxt/>
    <Footer/>
  </div>
</template>
<script>
import NavBar from '@/components/NavBar'
import Footer from '@/components/IndexFooter'
import banner from '@/assets/index/index_banner.png'
import logo from '@/assets/index/index_banner_logo.png'
import icon from '@/assets/index/index_search.png'
export default {
  name: 'IndexLayout',

  components: {
    NavBar,
    Footer
  },
  data() {
    return {
      banner: banner,
      logo: logo,
      icon: icon,
      searchText: '',
      activeSearchTabs: ''
    }
  },
  methods: {
    search() {
      console.log(this.activeSearchTabs, this.searchText)
    }
  }
}
</script>

<style lang="scss" scoped>
header{
  height: 600px;
  .banner{
    display:flex;
    justify-content: center;
    >div{
      width: $width_main;
      text-align: center;
      padding: 120px 0;
      >img{
        margin-bottom: 50px;
      }
    }
  }
  .search{
    width: 775px;
    margin: 0 auto;
    color: #fff;
    .icon{
      width: 50px;
      height: 50px;
      margin-right: -5px;
      background: #fff !important;
      display: inline-block;
      &:hover{
        cursor: pointer;
      }
      img{
        border:none;
      }
    }
    ul{
      overflow: hidden;
      li{
        float: left;
        margin-right: 25px;
        font-size: 16px;
        border-bottom: 2px solid transparent;
        padding: 6.5px;
        position: relative;
        margin-bottom: 5px;
        &:hover{
          cursor: pointer;
        }
        &::after{
          content: "";
          width: 0;
          height: 0;
          border: 6px solid transparent;
          border-top: 6px solid transparent;
          position:absolute;
          bottom:-13px;
          left:43%;
        }
        &.active{
          padding: 5px;
          font-weight: bold;
          font-size: 18px;
          border-color: #fff;
          &::after{
            border-top-color: #fff;
          }
        }
      }
    }
    >div{
      margin-top: 10px;
      border: 6px solid rgba(255,255,255,.3);
    }
    p{
      margin-top: 10px;
      font-size: 14px;
      text-align: left;
    }
  }
}
</style>
<style lang="scss">
.index{
  .el-input__inner{
    height: 50px;
    line-height: 50px;
    text-indent:30px;
    border-radius: 2px;
    padding: 0;
    font-size: 18px;
    background-color: rgba(255,255,255,.8);
  }
}
</style>

