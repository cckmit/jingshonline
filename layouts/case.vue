<template>
  <div>
    <NavBar/>
    <header v-if="url.name.toLocaleLowerCase()==='case'" :style="{background:`url(${banner}) center no-repeat`}" class="content" >
      <div>
        <el-input v-model="searchText" class="case-layout" placeholder="请输入案由、关键词、法院、当事人、律师">
          <div slot="prepend">综合搜索</div>
          <span slot="suffix" class="icon" @click="search">
            <img :src="icon" alt="">
          </span>
        </el-input>
      </div>
    </header>
    <div class="content">
      <nuxt />
    </div>
    <Footer/>
  </div>
</template>
<script>
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import banner from '@/assets/case/case_banner.png'
import icon from '@/assets/case/case_search.png'
export default {
  name: 'CaseLayout',

  components: {
    NavBar,
    Footer
  },
  data() {
    return {
      banner: banner,
      icon: icon,
      searchText: '',
      url: this.$route
    }
  },
  watch: {
    '$route'(to) {
      console.log(to)
      this.url = to
    }
  },
  methods: {
    search() {
      console.log(this.searchText)
    }
  }
}
</script>
<style lang="scss" scoped>
.content{
  >div{
    width: 765px;
  }
}
header{
  height: 200px;
  padding: 79px 0;
  .case-layout{
    width: 600px;
    .icon{
      width: 42px;
      height: 40px;
      margin-right: -5px;
      margin-top: 1px;
      background: #fff !important;
      display: inline-block;
      &:hover{
        cursor: pointer;
      }
      img{
        border:none;
      }
    }
  }

}
</style>
<style lang="scss">
.case-layout{
  .el-input-group__prepend{
    color: #666;
    border-radius: 2px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    background: rgba(255,255,255,.8);
  }
  .el-input__inner{
    height: 42px;
    line-height: 42px;
    text-indent:30px;
    border-radius: 2px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    padding: 0;
    margin-left: 1px;
    font-size: 18px;
    background-color: rgba(255,255,255,.8);
  }
}
</style>

