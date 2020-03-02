<template>
  <div>
    <NavBar/>
    <header v-if="url.name.toLocaleLowerCase()==='case'" :style="{background:`url(${banner}) center no-repeat`}" class="content" >
      <div class="case_layou_search">
        <div class="prefix">综合搜索</div>
        <el-select
          v-model="searchText"
          :remote-method="search"
          :loading="loading"
          filterable
          remote
          reserve-keyword
          placeholder="请输入案由、关键词、法院、当事人、律师"
        >
          <el-option-group
            v-for="(group, index) in options"
            :key="index"
            :label="group.describe">
            <el-option
              v-for="(item,indexs) in group.conditions"
              :key="indexs"
              :label="item.name"
              :value="item.id" />
          </el-option-group>
        </el-select>
        <div class="icon" @click="search">
          <img :src="icon" alt="">
        </div>
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
import { mapActions } from 'vuex'
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
      url: this.$route,
      loading: false,
      options: []
    }
  },
  watch: {
    '$route'(to) {
      console.log(to)
      this.url = to
    }
  },
  methods: {
    ...mapActions('case', ['CaseSearch']),
    search() {
      this.CaseSearch(this.searchText).then(res => {
        this.options = res
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.content{
  .case_layou_search{
    margin:98px 0 60px 0;
    width: 760px;
    height: 42px;
    line-height: 42px;
    .prefix{
      width: 100px;
      font-size: 14px;
      text-align: center;
      color: #666;
      float: left;
      margin-right: 2px;
      background: rgba($color: #fff, $alpha: 0.8);
    }
    .icon{
      width: 43px;
      height: 42px;
      float: right;
      background: rgba($color: #fff, $alpha: 0.8);
      padding-top: 1px;
    }
    .el-select{
      width: 615px;
      float: left;
    }
  }
}
</style>
<style lang="scss">
    .el-select{
      .el-input{
        .el-input__inner{
          width: 615px;
          border-radius: 0px;
          border:none;
          background: rgba($color: #fff, $alpha: 0.8);
          height: 42px;
          line-height: 42px;
        }
      }
    }
</style>
