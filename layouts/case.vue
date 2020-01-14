<template>
  <div>
    <NavBar/>
    <img v-if="url.name==='Case'" :src="banner" alt="" style="border:none;width:100%;max-width:fit-content">
    <div class="content">
      <nuxt />
    </div>
    <Footer/>
  </div>
</template>
<script>
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import banner from '@/assets/banner_case.png'
export default {
  name: 'IndexLayout',

  components: {
    NavBar,
    Footer
  },
  data() {
    return {
      banner: banner,
      url: this.$route
    }
  }
}
</script>
<style lang="scss">

</style>

