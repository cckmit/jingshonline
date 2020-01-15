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
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}

</style>

