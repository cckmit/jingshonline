<template>
  <div>
    <div class="user_info_card">
      <div>
        <div class="avatar">
          <el-image :src="lawyerInfo.avatar" />
          <p @click="changeAvatar=true;">修改头像</p>
        </div>
        <p>上次登录时间：{{ this.$moment(lawyerInfo.lastLoginTime).format('YYYY-MM-DD') }}</p>
        <p>个人积分：<span>{{ lawyerInfo.id }}</span><i class="iconfont iconHelp" title="12s3af456s4fs3f4sa34f65sf13"/></p>
        <div class="bind clear">
          <div :style="{color:lawyerStatus[lawyerInfo.status]!==undefined ? lawyerStatus[lawyerInfo.status].color:'' }" @click="()=>{this.$router.push({path:'/usercenter/auth'})}">
            <i class="iconfont iconuser"/>
            <span>{{ lawyerStatus[lawyerInfo.status]!==undefined? lawyerStatus[lawyerInfo.status].displayName:'' }}</span>
          </div>
          <div :style="{color:lawyerInfo.phone?'#71c956':''}" @click="()=>{this.$router.push({path:'/usercenter/setting'})}">
            <i class="iconfont iconphone1"/>
            <span>绑定手机</span>
          </div>
          <div :style="{color:lawyerInfo.email?'#3997f9':''}" @click="()=>{this.$router.push({path:'/usercenter/setting'})}">
            <i class="iconfont iconemail1"/>
            <span>绑定邮箱</span>
          </div>
        </div>
      </div>
      <div :style="{display:lawyerInfo.status!==0?'none':'none'}" class="tip">
        <p>律师认证</p>
        <div>您尚未进行律师身份认证其他人无法检索到您，请您尽快前往律师认证，我们会对您提供的认证信息进行人工审核，请正确填写。</div>
        <router-link to="/usercenter/auth/update">前往认证</router-link>
      </div>
    </div>
    <el-dialog
      :visible.sync="changeAvatar"
      title="修改头像"
      width="500px">
      <Oss :option="avatarOssOption" @change="avatarOssChange"/>
      <span slot="footer" class="dialog-footer">
        <el-button @click="changeAvatar = false">取 消</el-button>
        <el-button type="primary" @click="changeAvatar = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Oss from '@/components/Oss'
export default {
  name: 'UserCenterUserInfoCard',
  middleware: 'auth',
  head() {
    return {
      title: '用户中心',
      meta: [
        { hid: 'description', name: 'description', content: '京师在线用户中心；jingshonline-usercenter' }
      ]
    }
  },
  components: {
    Oss
  },
  data() {
    return {
      changeAvatar: false,
      avatarOssOption: {
        fileCategory: 3,
        accept: 'image/jpg,image/jpeg,image/png,',
        fileList: [],
        tip: '本图片将作为您的头像进行展示，仅支持jpg/png格式。'
      },
      avatarPathId: null,
      avatar: ''
    }
  },
  computed: {
    ...mapState({
      lawyerInfo: state => state.account.lawyerInfo,
      lawyerStatus: state => state.lawyer.status
    })
  },
  watch: {
    lawyerInfo: {
      handler: function(val) {
        val.avatar ? this.avatarOssOption.fileList = [{ name: 'avatar', url: val.avatar, fileId: val.avatarPathId, uid: Math.random() * 200, status: 'success' }] : ''
      },
      deep: true
    }
  },
  mounted() {
  },
  methods: {
    avatarOssChange(fileList) {
      this.authForm.avatarPathId = fileList.length >= 1 ? fileList[0].fileId : ''
      this.authForm.avatar = fileList.length >= 1 ? fileList[0].url : ''
      this.$commit('SET_LAWYER_INFO', { avatar: fileList.length >= 1 ? fileList[0].url : '', avatarPathId: fileList.length >= 1 ? fileList[0].fileId : '', lawyerInfo: { avatar: fileList.length >= 1 ? fileList[0].url : '', avatarPathId: fileList.length >= 1 ? fileList[0].fileId : '' }})
    }
  }
}
</script>
<style lang='scss' scoped>
.user_info_card{
  width: 240px;
  height: 340px;
  background-color: #ffffff;
  border:1px solid rgba(229, 229, 229, 0.3);
  padding: 35px 30px 0px 30px;
  margin-bottom: 20px;
  position: relative;
  >div{
    text-align: center;
    .avatar{
      width: 140px;
      height: 140px;
      margin: 0 auto;
      margin-bottom: 26px;
      position: relative;
      cursor: pointer;
      border:1px solid rgba(215, 215, 215, 1);
      p{
        color: #fff;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 26px;
        line-height: 26px;
        font-size: 14px;
        margin-bottom: 0;
        background: rgba($color: #000000, $alpha: 0.5);
        display: none;
      }
      &:hover{
        p{
          display: block;
        }
      }
      .el-image{
        .el-image__inner{
          vertical-align:auto;
          width: 136px;
          height: 136px;
        }
      }
    }

    >p{
      text-align: left;
      font-size: 12px;
      height: 12px;
      line-height: 12px;
      color: #000;
      margin-bottom: 16px;
      span{
        font-weight: bold;
        color: #ED0F0F;
        font-size: 14px;
      }
      i{
        margin-left: 5px;
      }
    }
    .bind{
      div{
        float: left;
        margin: 0 10px;
        text-align: center;
        cursor: pointer;
        &:first-child{
          margin-left: 0;
        }
        &:last-child{
          margin-right: 0;
        }
        i{
          font-size: 30px;
        }
        span{
          height: 12px;
          line-height: 12px;
          font-size: 12px;
          margin-bottom: 0;
          display: block;
        }
      }
    }
  }
  .tip{
    position: absolute;
    top: 0;
    left: 0;
    width: 240px;
    height: 340px;
    background: #000;
    padding: 0 30px;
    p{
      height: 22px;
      line-height: 22px;
      font-size: 24px;
      color: #fff !important;
      text-align: center;
      margin-top: 52px;
      margin-bottom: 20px;
    }
    div{
      font-size: 14px;
      color: #fff;
      text-align: left;
      line-height: 30px;
      margin-bottom: 30px;
    }
    a{
      display: inline-block;
      width: 150px;
      height: 36px;
      line-height: 36px;
      color: #fff;
      background: #F68020;
      border-radius: 3px;
      cursor: pointer;
    }
  }
}
</style>
<style lang="scss">
.user_info_card{
  .el-image__inner{
    vertical-align:text-top;
    width: 136px;
    height: 136px;
  }
}
</style>
