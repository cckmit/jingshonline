<template>
  <div class="lawyer-detail">
    <el-tabs>
      <el-tab-pane>
        <span slot="label">律师简历<i>|</i></span>
        <lawyer-resume :resume-data="resumeData" :lawyer-remark="lawyerRemark"/>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">认证案例<i>|</i></span>
        <lawyer-case/>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">专业领域<i>|</i></span>
        <lawyer-professional/>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">常去法院</span>
        <often-court/>
      </el-tab-pane>
    </el-tabs>
    <div class="follow" @click="followHandle">
      <i :class="!isFollow ? 'follow-icon' : ''"/>
      <a href="#">{{ !isFollow ? '关注' : '取消关注' }}</a>
    </div>
  </div>
</template>
<script>
import LawyerResume from './components/LawyerResume'
import LawyerCase from './components/LawyerCase'
import LawyerProfessional from './components/LawyerProfessional'
import OftenCourt from './components/OftenCourt'
import { mapActions } from 'vuex'
export default {
  name: 'LawyerDetail',
  components: {
    LawyerResume,
    LawyerCase,
    LawyerProfessional,
    OftenCourt
  },
  props: {
    resumeData: {
      type: Object,
      default: function() {
        return {
          workExperiences: [],
          socialPositions: [],
          educations: [],
          certificates: [],
          academics: []
        }
      }
    },
    lawyerRemark: {
      type: String,
      default: function() {
        return ''
      }
    }
  },
  data() {
    return {
      isFollow: false
    }
  },
  computed: {

  },
  watch: {

  },
  mounted() {
  },
  methods: {
    // 用户关注律师 取消关注
    ...mapActions('lawyerinfo', ['UserCancleFollow', 'UserFollow']),
    // 关注按钮操作
    followHandle() {
      if (!this.isFollow) {
        this.UserFollow(this.$route.params.id).then(res => {
          console.log('成功关注')
          this.isFollow = !this.isFollow
        })
      } else {
        this.UserCancleFollow(this.$route.params.id).then(res => {
          console.log('成功取消关注')
          this.isFollow = !this.isFollow
        })
      }
    }
  }
}
</script>

<style lang="scss">
.lawyer-detail {
  width: 1045px;
  float: left;
  box-sizing: border-box;
  position: relative;
  .el-tabs .is-active {
    color: #f68020;
  }
  .el-tabs__header {
    background: #fff;
    padding: 0 28px;
    border-top:1px solid #eee;
    border-left: 1px solid #eee;
    border-right: 1px solid #eee;
    margin: 0;
  }
  .el-tabs__nav-wrap::after {
    height: 0;
    border-bottom: 1px dashed #eaeaea;
    background-color:#fff;
  }
  .el-tabs__nav {
    font-size: 16px;
    line-height: 50px;
    .el-tabs__active-bar {
      width: 100px;
      background-color:#f68020;
    }
  }
  .el-tabs__item {
    padding: 0 36px;
    position: relative;
    i {
      position: absolute;
      right: 0px;
      font-style: normal;
      font-size: 14px;
      color: #e5e5e5;
    }
  }
  .follow {
    text-align: center;
    overflow: hidden;
    position: absolute;
    display: flex;
    top: 13px;
    right: 33px;
    width: 80px;
    height: 30px;
    border: 1px solid #d5dce1;
    line-height: 30px;
    font-size: 14px;
    border-radius: 6%;
    cursor: pointer;
    .follow-icon {
      display: inline-block;
      width: 14px;
      height: 15px;
      background-image: url("../../../assets/lawyerinfo/lawyerfollow.png");
      background-size: 100% 100%;
      margin-left: 16px;
      margin-top:6px;
    }
    a {
      margin: 0 auto;
      text-align: center;
      line-height: 30px;
      color: #737373;
    }
  }

}
</style>
