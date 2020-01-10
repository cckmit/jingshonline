<template>
  <el-row>
    <count-to :start-val="0" :end-val="2017" :duration="1000"/>
    <el-col :span="5">
      123
    </el-col>
    <el-col :span="5" :offset="5">
      456
      <nuxt-link to="/UserCenter">userCenter</nuxt-link>
      <nuxt-link to="/About">about</nuxt-link>

    </el-col>
    <el-col>
      {{ regionDatasss }}
    </el-col>
    <el-col>
      <!-- {{ users }} -->
    </el-col>
    <el-col>
      <!-- {{ msg }} -->
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
import AppLogo from '~/components/AppLogo.vue'
import { mapState, mapActions } from 'vuex'
// import setting from '@/plugins/setting'
// import axios from 'axios'

export default {
  layout: 'index',
  head() {
    return {
      title: '首页',
      meta: [
        { hid: 'description', name: 'description', content: '京师在线首页；jingshonline' }
      ]
    }
  },
  components: {
    AppLogo,
    CountTo
  },
  data() {
    return {
      regionData: []
    }
  },
  // async asyncData({ params }) {
  //   const [pageRes, countRes] = await Promise.all([
  //     axios.get(`http://gateway.dev.jingshonline.net/${setting.apiPrefix}/region/tree`, { 'Content-Type': 'application/json' }),
  //     axios.get(`http://gateway.dev.jingshonline.net/${setting.apiPrefix}/region/tree`, { 'Content-Type': 'application/json' })
  //   ])
  //   return {
  //     users: pageRes.data,
  //     msg: countRes.data
  //   }
  // },
  computed: {
    ...mapState({
      regionDatasss: state => state.region.regionTreeData
    })
  },
  created() {

  },
  mounted() {
    this.get()
  },
  methods: {
    ...mapActions('region', ['getRegionTreeData']),
    get() {
      this.getRegionTreeData().then(res => {
        this.regionData = res
      })
    }
  }
}
</script>

<style>
</style>

