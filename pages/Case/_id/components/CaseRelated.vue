<template>
  <div>
    <ul :source-data="sourceData">
      <li v-for="(item, index) in sourceData.lawyers" :key="index">
        <!-- <nuxt-link :to="`/case/${item.lawyerId}/info`"> -->
        <p> {{ index+1 }}.{{ item.lawfirmName }}</p>
        <!-- </nuxt-link> -->
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'CaseRelated',
  props: {
    sourceData: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
    }
  },
  watch: {
  },
  methods: {}
}
</script>
<style lang='scss' scoped>
    p{
    padding:5px 15px;
	letter-spacing: 0px;
	color: #666666;
  }
  p:hover{ color:#f68020;}
</style>

