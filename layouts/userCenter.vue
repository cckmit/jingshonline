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
import cookie from '@/plugins/cookie'
import { mapMutations } from 'vuex'
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
  mounted() {
    this.$store.commit('SET_TOKEN', cookie.get('token'))
  },
  methods: {
    ...mapMutations([
      'SET_TOKEN'
    ])
  }
}
</script>
<style lang="scss" scoped>
.content{
  >div{
    margin: 60px 0;;
  }
}
</style>

