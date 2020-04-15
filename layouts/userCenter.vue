<template>
  <div>
    <NavBar/>
    <div v-if="url.name.toLocaleLowerCase()==='lawyer'" :style="{background:`url(${banner}) center no-repeat`}" style="height:200px;"/>
    <div class="content">
      <nuxt/>
    </div>
    <Footer/>
  </div>
</template>
<script>
import NavBar from '@/components/UserCenterNavBar'
import Footer from '@/components/Footer'
import banner from '@/assets/lawyer/lawyer_banner.png'
export default {
  name: 'UserCenterLayout',

  components: {
    NavBar,
    Footer
  },
  data() {
    return {
      banner: banner,
      url: this.$route
    }
  },
  watch: {
    '$route'(to) {
      this.url = to
    }
  },
  beforeCreate() {
    this.$store.dispatch('caseReason/getCasereasonTreeData') // 案由
    this.$store.dispatch('court/getCourt')// 法院
    this.$store.dispatch('industry/getIndustryTreeData')// 行业
    this.$store.dispatch('lawfirm/getLawfirmAllData')// 律所
    this.$store.dispatch('practice/getPracticeTreeData')// 领域
    this.$store.dispatch('practice/getPracticeTreeDataOfType', 1)// 诉讼领域
    this.$store.dispatch('practice/getPracticeTreeDataOfType', 2)// 非诉领域
    this.$store.dispatch('region/getRegionTreeData')// 地区
  },
  mounted() {
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>

</style>

