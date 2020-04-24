<template>
  <div class="four_content">
    <p> <i class="iconfont iconfolderplus"/> 办案小结</p>
    <div>
      <el-tabs style="margin-bottom:20px">
        <el-tab-pane :label="type===1?'案情简介':'项目简介'">
          <Tinymce ref="editor" v-model="analyses[0].describe" :width="'98.5%'" :height="400" :toolbar="tinymceToolbar" :menubar="false" />
        </el-tab-pane>
      </el-tabs>
      <el-tabs style="margin-bottom:20px">
        <el-tab-pane :label="type===1?'案情经过':'项目经过'">
          <Tinymce ref="editor" v-model="analyses[1].describe" :width="'98.5%'" :height="400" :toolbar="tinymceToolbar" :menubar="false" />
        </el-tab-pane>
      </el-tabs>
      <el-tabs style="margin-bottom:20px">
        <el-tab-pane :label="type===1?'案情结果':'项目结果'">
          <Tinymce ref="editor" v-model="analyses[2].describe" :width="'98.5%'" :height="400" :toolbar="tinymceToolbar" :menubar="false" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import Tinymce from '@/components/Tinymce'
export default {
  layout: 'userCenter',
  name: 'UserCenterCaseStatistical',
  middleware: 'auth',
  head() {
    return {
      title: '添加案例-我的案例-用户中心-京师在线',
      meta: [
        { hid: 'description', name: 'description', content: '京师在线用户中心；jingshonline-usercenter' }
      ]
    }
  },
  components: {
    Tinymce
  },
  props: {
    type: {
      type: Number,
      default: 1
    },
    sourceAnalyses: {
      type: Array,
      default: function() {
        return [
          {
            describe: '',
            stage: 1
          },
          {
            describe: '',
            stage: 2
          },
          {
            describe: '',
            stage: 3
          }
        ]
      }
    }
  },
  data() {
    return {
      tinymceToolbar: ['searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote removeformat subscript superscript undo redo'],
      analyses: [
        {
          describe: '',
          stage: 1
        },
        {
          describe: '',
          stage: 2
        },
        {
          describe: '',
          stage: 3
        }
      ]
    }
  },
  watch: {
    sourceAnalyses(val) {
      this.analyses = val
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>
<style lang='scss' scoped>
.four_content{
  text-align: left;
  padding: 0 45px;
  p{
    font-size: 16px;
    margin-bottom: 36px !important;
    i{
      margin-right: 8px;
    }
  }
  >div{
    padding: 0 30px;
  }
}
</style>
