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
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import banner from '@/assets/banner_lawyer.png'
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
      console.log(to)
      this.url = to
    }
  }
}
</script>
<style lang="scss">

</style>

