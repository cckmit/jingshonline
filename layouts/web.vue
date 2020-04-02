<template>
  <div>
    <NavBar/>
    <div v-if="url.name.toLocaleLowerCase()==='lawyer'" >
      <div :style="{background:`url(${banner}) center no-repeat`}" style="height:200px;"/>
    </div>
    <div v-if="url.name.toLocaleLowerCase()==='case'"/>
    <div class="content">
      <nuxt/>
    </div>
    <Footer/>
  </div>
</template>
<script>
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import banner from '@/assets/lawyer/lawyer_banner.png'
export default {
  name: 'WebLayout',
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
  created() {
    this.$store.dispatch('court/getCourtLevel')
  }
}
</script>
<style lang="scss">

</style>

