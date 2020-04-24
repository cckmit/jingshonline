<template>
  <div class="three_content">
    <p> <i class="iconfont iconfolderplus"/> 上传证明材料</p>
    <div>
      <el-tabs style="margin-bottom:20px">
        <el-tab-pane :label="type?'裁判文书':'法律意见书'">
          <Tinymce ref="editor" v-model="judgmentDocument" :width="'98.5%'" :height="400" :menubar="false" />
        </el-tab-pane>
      </el-tabs>
      <el-tabs style="margin-bottom:20px">
        <el-tab-pane label="相关附件">
          <AliYunOss :option="ossOption" @change="ossUploadChange" />
          <el-table :data="files">
            <el-table-column label="文件地址" prop="path">
              <template slot-scope="{row}">
                <img :src="row.path" style="width:100px;height:100px;">
              </template>
            </el-table-column>
            <el-table-column label="文件名称" prop="name">
              <template slot-scope="{row}">
                <el-input v-model="row.name" />
              </template>
            </el-table-column>
            <el-table-column label="文件类型" prop="fileCategory">
              <template slot-scope="{row}">
                <el-select v-model="row.fileCategory" clearable placeholder="请文件类型" size="small" class="filter-item" style="width:100%">
                  <el-option :key="0" :value="0" label="裁判文书" />
                  <el-option :key="1" :value="1" label="代理词" />
                  <el-option :key="2" :value="2" label="其他材料" />
                </el-select>
              </template>
            </el-table-column>
            <!-- <el-table-column label="文件顺序" prop="name">
            <template />
          </el-table-column> -->
            <el-table-column label="对用户可见" prop="isVisible">
              <template slot-scope="{row}">
                <el-checkbox v-model="row.isVisible" />
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="{row}">
                <el-button size="mini" type="danger" icon="el-icon-delete" @click="removeFile(row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import AliYunOss from '@/components/Oss'
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
    Tinymce,
    AliYunOss
  },
  props: {
    type: {
      type: Number,
      default: null
    },
    sourceJudgmentDocument: {
      type: String,
      default: ''
    },
    sourceFiles: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      judgmentDocument: '',
      files: [],
      ossOption: {
        type: 'custom',
        listType: 'picture',
        limit: 50,
        fileList: [], // 已上传文件列表  格式 {name:sdf,url:src,fileId:123,uid:1345,status:'success'}
        fileCategory: 2, // 文件类型【0 :JudgmentDocument 裁判文书,1：AgentWord 代理词，2：OtherCaseFile 案件其他材料,3：Avatar 头像,4：LawyerLicence 律师执业证,】
        accept: 'image/jpg,image/jpeg,image/gif,image/png,image/bmp,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,application/x-zip-compressed,application/x-tar', // 文件允许类型格式
        tip: ''
        // autoUpload: false
      }
    }
  },
  watch: {
    sourceJudgmentDocument(val) {
      this.judgmentDocument = val
    },
    sourceFiles(val) {
      this.files = val
      val.forEach(item => {
        this.ossOption.fileList.push([{ name: item.uploadFileName, url: item.path, fileId: item.uploadFileId, uid: Math.random() * 200, status: 'success' }])
      })
    }
  },
  mounted() {
  },
  methods: {
    ossUploadChange(val) {
      this.files.push({ name: val[val.length - 1].name, path: val[val.length - 1].url, uploadFileId: val[val.length - 1].fileId, fileCategory: val[val.length - 1].fileCategory, isVisible: val[val.length - 1].isVisible })
    },
    removeFile(row) {
      this.files.forEach((item, index) => {
        item.uploadFileId === row.uploadFileId ? this.files.splice(index, 1) : ''
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.three_content{
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
