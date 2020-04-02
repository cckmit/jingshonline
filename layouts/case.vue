<template>
  <div>
    <NavBar/>
    <!-- <header v-if="url.name.toLocaleLowerCase()==='case'" :style="{background:`url(${banner}) center no-repeat`}" class="content" >
      <div class="case_layou_search">
        <div class="prefix">综合搜索</div>
        <el-select
          ref="case_layout_search"
          v-model="searchText"
          :remote-method="search"
          :loading="loading"
          filterable
          allow-create
          clearable
          remote
          reserve-keyword
          placeholder="请输入案由、关键词、法院、当事人、律师"
          @change="searchChange"
          @keydown.13.native="search()"
        >
          <el-option-group
            v-for="(group, index) in options"
            :key="index"
            :label="group.describe">
            <el-option
              v-for="(item,indexs) in group.conditions"
              :key="indexs"
              :label="item.name"
              :value="JSON.stringify(item)"
            />
          </el-option-group>
        </el-select>
        <div v-loading="searchLoading" class="icon" @click="searchChange(searchText)" >
          <img :src="icon" alt="">
        </div>
      </div>
    </header> -->
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
import Bus from '@/utils/bus.js'
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
      searchKey: {},
      url: this.$route,
      loading: false,
      options: [],
      searchLoading: false
    }
  },
  watch: {
    '$route'(to) {
      this.url = to
    }
  },
  mounted() {
    Bus.$on('searchLoading', (data) => {
      this.searchLoading = data
    })
    this.$store.dispatch('court/getCourtLevel')
  },
  methods: {
    ...mapActions('case', ['CaseSearch']),
    search(query) {
      this.loading = true
      this.CaseSearch(query).then(res => {
        this.options = res
        this.loading = false
      })
    },
    searchChange(key) {
      this.searchLoading = true
      key = key.indexOf('{') !== -1 && key.indexOf('}') !== -1 ? key : JSON.stringify(key)
      Bus.$emit('searchKey', key)
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
      cursor: pointer;
    }
    .el-select  {
      float: left;
    }
  }
}
</style>
<style lang="scss">
  .case_layou_search{
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
  }
</style>
