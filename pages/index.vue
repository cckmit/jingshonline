<template>
  <el-row>
    <el-col :span="5">
      123
    </el-col>
    <el-col :span="5" :offset="5">
      456
    </el-col>
    <el-col>
      {{ regionData }}
    </el-col>
    <el-col>
      {{ regionDatasss }}
    </el-col>
  </el-row>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'
import { mapState, mapActions } from 'vuex'
export default {
  components: {
    AppLogo
  },
  data() {
    return {
      regionData: []
    }
  },
  computed: {
    ...mapState({
      regionDatasss: state => state.region.regionTreeData
    })
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

