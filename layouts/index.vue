<template>
  <div>
    <NavBar :background="'rgba(22,22,34,.4)'" :mainwidth="1140" />
    <div class="content">
      <nuxt/>
    </div>
    <Footer/>
  </div>
</template>
<script>
import NavBar from '@/components/NavBar'
import Footer from '@/components/IndexFooter'
export default {
  name: 'IndexLayout',

  components: {
    NavBar,
    Footer
  }
}
</script>

<style>

</style>

