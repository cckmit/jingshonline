<template>
  <div class="userCenter-resume">
    <el-row>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
        <el-breadcrumb-item :to="{path:'/'}" >京师在线</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/userCenter'}" >工作台</el-breadcrumb-item>
        <el-breadcrumb-item >我的简历</el-breadcrumb-item>
      </el-breadcrumb>
      <el-col :span="5">
        <UserInfo/>
      </el-col>
      <el-col :span="19" style="margin-bottom:75px">
        <el-row>
          <!-- 个人信息 -->
          <el-col :span="24" class="resume-introduce resume-mould">
            <el-row class="resume-title">
              <el-col :span="1"> <p class="resume-title-img"><img src="../../../assets/usercenter/label.png" alt="个人简介"></p> </el-col>
              <el-col :span="19"> <span>个人简介</span> </el-col>
              <el-col :span="4"> <el-button class="resume-title-edit" size="mini" @click="editOrSubmitClick">{{ disabledInfo?'编辑':'保存' }}</el-button></el-col>
            </el-row>
            <div class="resume-desc">
              <el-input
                v-model="resumeData.info"
                :disabled="disabledInfo"
                type="textarea"
                autosize
                placeholder="请输入内容"/>
            </div>
          </el-col>
          <!-- 工作经历 -->
          <el-col :span="24" class="resume-work resume-mould">
            <el-row class="resume-title">
              <el-col :span="1"> <p class="resume-title-img"><img :src="workpng" alt="工作经历"></p> </el-col>
              <el-col :span="19"> <span>工作经历</span> </el-col>
            </el-row>
            <div class="resume-desc">
              <el-row>
                <el-col :span="7">
                  <div class="resume-desc-model" @click="createOrUpdateWorkVisible=true,work={},ifCreate='1'">
                    <i class="el-icon-circle-plus-outline resume-desc-model-add"/>
                    <h2 class="resume-desc-model-title">添加工作经历</h2>
                  </div>
                </el-col>
                <el-col :span="17">
                  <el-row>
                    <el-col v-for="(item, index) in workData" :span="8" :key="index">
                      <div class="resume-desc-model" @mouseenter="item.isShowBtn=false" @mouseleave="item.isShowBtn=true">
                        <p>{{ item.organization }}</p>
                        <p>{{ item.position }}</p>
                        <p>{{ item.startDate }}-{{ item.endDate }}</p>
                        <div :class="{ hover:item.isShowBtn}" class="resume-desc-button">
                          <el-row >
                            <el-col :span="11" @click.native="createOrUpdateWorkVisible=true,work=item,ifCreate='2'">编辑</el-col>
                            <el-col :span="2" class="resume-desc-button-line"/>
                            <el-col :span="11" @click.native="resumeDelete(item.id,'1')">删除</el-col>
                          </el-row>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <!-- 教育经历 -->
          <el-col :span="24" class="resume-education resume-mould">
            <el-row class="resume-title">
              <el-col :span="1"> <p class="resume-title-img"><img :src="learnpng" alt="教育经历"></p> </el-col>
              <el-col :span="19"> <span>教育经历</span> </el-col>
            </el-row>
            <div class="resume-desc">
              <el-row>
                <el-col :span="7">
                  <div class="resume-desc-model" @click="createOrUpdateEducationVisible=true,education={},ifCreate='1'">
                    <i class="el-icon-circle-plus-outline resume-desc-model-add"/>
                    <h2 class="resume-desc-model-title">添加教育经历</h2>
                  </div>
                </el-col>
                <el-col :span="17">
                  <el-row>
                    <el-col v-for="(item, index) in educationData" :span="8" :key="index">
                      <div class="resume-desc-model" @mouseenter="item.isShowBtn=false" @mouseleave="item.isShowBtn=true">
                        <p>{{ item.school }}</p>
                        <p v-for="items in educations" v-show="items.id===item.educationBackground" :key="items.id">{{ items.displayName }}</p>
                        <p>{{ item.startDate }}-{{ item.endDate }}</p>
                        <div :class="{ hover:item.isShowBtn}" class="resume-desc-button">
                          <el-row >
                            <el-col :span="11" @click.native="createOrUpdateEducationVisible=true,education=item,ifCreate='2'">编辑</el-col>
                            <el-col :span="2" class="resume-desc-button-line"/>
                            <el-col :span="11" @click.native="resumeDelete(item.id,'2')">删除</el-col>
                          </el-row>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                </el-col>
            </el-row> </div>
          </el-col>
          <!-- 学术成果 -->
          <el-col :span="24" class="resume-academic resume-mould">
            <el-row class="resume-title">
              <el-col :span="1"> <p class="resume-title-img"><img :src="studypng" alt="学术成果"></p> </el-col>
              <el-col :span="19"> <span>学术成果</span> </el-col>
              <el-col :span="4"> <el-button v-show="academicData.length!==0" class="resume-title-edit" size="mini" @click="academicIsBtn=!academicIsBtn">{{ academicIsBtn?'取消编辑':'编辑' }}</el-button></el-col>
            </el-row>
            <div class="resume-desc">
              <el-row>
                <el-col :span="7">
                  <div class="resume-desc-model" @click="createOrUpdateAcademicVisible=true,academic={},ifCreate='1'">
                    <i class="el-icon-circle-plus-outline resume-desc-model-add"/>
                    <h2 class="resume-desc-model-title">添加学术成果</h2>
                  </div>
                </el-col>
                <el-col :span="17">
                  <div class="resume-desc-list">
                    <el-row>
                      <el-col v-for="(item, index) in academicData" :span="24" :key="index" class="desc-li">
                        <el-row>
                          <el-col :span="1"> <p class="listSpot"/></el-col>
                          <el-col :span="17"> <p>{{ item.name }}</p></el-col>
                          <el-col v-show="academicIsBtn" :span="2" style="text-align:right">
                            <el-button type="text" size="mini" @click.native="createOrUpdateAcademicVisible=true,academic=item,ifCreate='2'">编辑</el-button>
                          </el-col>
                          <el-col v-show="academicIsBtn" :span="2" style="text-align:right">
                            <el-button type="text" size="mini" @click="resumeDelete(item.id,'3')">删除</el-button>
                          </el-col>
                        </el-row>
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <!-- 行业资质 -->
          <el-col :span="24" class="resume-industry resume-mould">
            <el-row class="resume-title">
              <el-col :span="1"> <p class="resume-title-img"><img :src="industrypng" alt="行业资质"></p> </el-col>
              <el-col :span="19"> <span>行业资质</span> </el-col>
              <el-col :span="4"> <el-button v-show="certificateData.length!==0" style="color:#999999" class="resume-title-edit" size="mini" @click="industryIsBtn=!industryIsBtn">{{ industryIsBtn?'取消编辑':'编辑' }}</el-button></el-col>
            </el-row>
            <div class="resume-desc">
              <el-row>
                <el-col :span="7">
                  <div class="resume-desc-model" @click="createOrUpdateIndustryVisible=true,industry={},ifCreate='1'">
                    <i class="el-icon-circle-plus-outline resume-desc-model-add"/>
                    <h2 class="resume-desc-model-title">添加行业资质</h2>
                  </div>
                </el-col>
                <el-col :span="17">
                  <div class="resume-desc-list">
                    <el-row>
                      <el-col v-for="(item, index) in certificateData" :span="24" :key="index" class="desc-li">
                        <el-row>
                          <el-col :span="1"> <p class="listSpot"/></el-col>
                          <el-col :span="17"> <p>{{ item.name }}</p></el-col>
                          <el-col v-show="industryIsBtn" :span="2" style="text-align:right">
                            <el-button type="text" size="mini" @click.native="createOrUpdateIndustryVisible=true,industry=item,ifCreate='2'">编辑</el-button>
                          </el-col>
                          <el-col v-show="industryIsBtn" :span="2" style="text-align:right">
                            <el-button type="text" size="mini" @click="resumeDelete(item.id,'4')">删除</el-button>
                          </el-col>
                        </el-row>
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
            </el-row></div>
          </el-col>
          <!-- 社会职务 -->
          <el-col :span="24" class="resume-social resume-mould">
            <el-row class="resume-title">
              <el-col :span="1"> <p class="resume-title-img"><img :src="societypng" alt="社会职务"></p> </el-col>
              <el-col :span="19"> <span>社会职务</span> </el-col>
              <el-col :span="4"> <el-button v-show="socialData.length!==0" class="resume-title-edit" size="mini" @click="socialIsBtn=!socialIsBtn">{{ socialIsBtn?'取消编辑':'编辑' }}</el-button></el-col>
            </el-row>
            <div class="resume-desc">
              <el-row>
                <el-col :span="7">
                  <div class="resume-desc-model" @click="createOrUpdateSocialVisible=true,social={},ifCreate='1'">
                    <i class="el-icon-circle-plus-outline resume-desc-model-add"/>
                    <h2 class="resume-desc-model-title">添加社会职务</h2>
                  </div>
                </el-col>
                <el-col :span="17">
                  <div class="resume-desc-list">
                    <el-row>
                      <el-col v-for="(item, index) in socialData" :span="24" :key="index" class="desc-li">
                        <el-row>
                          <el-col :span="1"> <p class="listSpot"/></el-col>
                          <el-col :span="17"> <p>{{ item.name }}</p></el-col>
                          <el-col v-show="socialIsBtn" :span="2" style="text-align:right">
                            <el-button type="text" size="mini" @click.native="createOrUpdateSocialVisible=true,social=item,ifCreate='2'">编辑</el-button>
                          </el-col>
                          <el-col v-show="socialIsBtn" :span="2" style="text-align:right">
                            <el-button type="text" size="mini" @click="resumeDelete(item.id,'5')">删除</el-button>
                          </el-col>
                        </el-row>
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <WorkCreateOrUpdate :source-visible="createOrUpdateWorkVisible" :source-data="work" :create-data="ifCreate" @operate="createOrUpdateWork"/>
    <EducationCreateOrUpdate :source-visible="createOrUpdateEducationVisible" :create-data="ifCreate" :source-data="education" @operate="createOrUpdateEducation"/>
    <AcademicCreateOrUpdate :source-visible="createOrUpdateAcademicVisible" :source-data="academic" :create-data="ifCreate" @operate="createOrUpdateAcademic"/>
    <IndustryCreateOrUpdate :source-visible="createOrUpdateIndustryVisible" :source-data="industry" :create-data="ifCreate" @operate="createOrUpdateIndustry"/>
    <SocialCreateOrUpdate :source-visible="createOrUpdateSocialVisible" :source-data="social" :create-data="ifCreate" @operate="createOrUpdateSocial"/>
  </div>
</template>
<script>
import WorkCreateOrUpdate from './components/WorkCreateOrUpdate.vue'
import EducationCreateOrUpdate from './components/EducationCreateOrUpdate.vue'
import AcademicCreateOrUpdate from './components/AcademicCreateOrUpdate.vue'
import IndustryCreateOrUpdate from './components/IndustryCreateOrUpdate.vue'
import SocialCreateOrUpdate from './components/SocialCreateOrUpdate.vue'
import UserInfo from '../components/UserInfo'
import societypng from '../../../assets/lawyerinfo/society.png'
import industrypng from '../../../assets/lawyerinfo/industry.png'
import studypng from '../../../assets/lawyerinfo/study.png'
import learnpng from '../../../assets/lawyerinfo/learning.png'
import workpng from '../../../assets/lawyerinfo/work.png'
import { mapState, mapActions } from 'vuex'

export default {
  layout: 'userCenter',
  name: 'UserCenterIndex',
  middleware: 'auth',
  head() {
    return {
      title: '用户中心-律师简介',
      meta: [
        { hid: 'description', name: 'description', content: '京师在线用户中心；jingshonline-usercenter' }
      ]
    }
  },
  components: {
    UserInfo,
    WorkCreateOrUpdate,
    EducationCreateOrUpdate,
    AcademicCreateOrUpdate,
    IndustryCreateOrUpdate,
    SocialCreateOrUpdate
  },
  data() {
    return {
      societypng, // 社会职务icon
      industrypng, // 行业资质icon
      studypng, // 教育经历icon
      learnpng, // 学术成果icon
      workpng, // 工作经历icon
      disabledInfo: true, // 个人信息是否可编辑
      socialIsBtn: false, // 社会可编辑
      academicIsBtn: false, // 学术成果可编辑
      industryIsBtn: false, // 行业资质可编辑
      createOrUpdateWorkVisible: false, // 工作经历新增编辑弹框
      createOrUpdateEducationVisible: false, // 教育经历新增编辑弹框
      createOrUpdateAcademicVisible: false, // 学术成果新增编辑弹框
      createOrUpdateIndustryVisible: false, // 行业资质新增编辑弹框
      createOrUpdateSocialVisible: false, // 社会职务新增编辑弹框
      work: {}, // 单个工作
      education: {}, // 教育经历
      academic: {}, // 学术成果
      industry: {}, // 行业资质
      social: {}, // 社会职务
      ifCreate: '', // 是否新增
      resumeData: {
        info: 'wohfsjfoi'
      },
      workData: [], // 工作
      educationData: [], // 教育经历
      academicData: [], // 学术成果
      certificateData: [], // 行业资质
      socialData: []// 社会职务
    }
  },
  computed: {
    ...mapState({
      educations: state => state.education.education
    })
  },
  watch: {
  },
  mounted() {
    this.getWorkexperienceData()
    this.getEducationData()
    this.getAcademicData()
    this.getCertificateData()
    this.getSocialpositionData()
  },
  methods: {
    ...mapActions('workexperience', ['getWorkexperienceList', 'deleteWorkexperience']),
    ...mapActions('education', ['getEducationList', 'deletetEducation']),
    ...mapActions('academic', ['getAcademicList', 'deletetAcademic']),
    ...mapActions('certificate', ['getCertificateList', 'deletetCertificate']),
    ...mapActions('socialposition', ['getSocialpositionList', 'deleteSocialposition']),

    // 获取工作经历
    getWorkexperienceData(delayTime = 150) {
      this.loading = true
      setTimeout(this.requestWork, delayTime)
    },
    requestWork() {
      this.getWorkexperienceList().then(res => {
        res.forEach(item => {
          this.$set(item, 'isShowBtn', true)
          item.startDate = this.$moment(item.startDate).format('YYYY.MM')
          item.endDate = this.$moment(item.endDate).format('YYYY.MM')
        })
        this.workData = res
        this.loading = false
      })
    },
    // 获取教育经历
    getEducationData(delayTime = 150) {
      this.loading = true
      setTimeout(this.requestEdu, delayTime)
    },
    requestEdu() {
      this.getEducationList().then(res => {
        res.forEach(item => {
          this.$set(item, 'isShowBtn', true)
          item.startDate = this.$moment(item.startDate).format('YYYY.MM')
          item.endDate = this.$moment(item.endDate).format('YYYY.MM')
        })
        this.educationData = res
        this.loading = false
      })
    },
    // 获取学术成果
    getAcademicData(delayTime = 150) {
      this.loading = true
      setTimeout(this.requestAca, delayTime)
    },
    requestAca() {
      this.getAcademicList().then(res => {
        this.academicData = res
        this.loading = false
      })
    },
    // 获取行业资质
    getCertificateData(delayTime = 150) {
      this.loading = true
      setTimeout(this.requestCer, delayTime)
    },
    requestCer() {
      this.getCertificateList().then(res => {
        this.certificateData = res
        this.loading = false
      })
    },
    // 获取社会职务
    getSocialpositionData(delayTime = 150) {
      this.loading = true
      setTimeout(this.requestSocial, delayTime)
    },
    requestSocial() {
      this.getSocialpositionList().then(res => {
        this.socialData = res
        this.loading = false
      })
    },
    // 个人信息编辑或提交点击事件
    editOrSubmitClick() {
      if (!this.disabledInfo) {
        alert('已提交')
      }
      this.disabledInfo = !this.disabledInfo
    },
    resumeDelete(id, resumeId) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(() => {
          if (resumeId === '1') {
            this.deleteWorkexperience(id).then(res => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.getWorkexperienceData()
            })
          } else if (resumeId === '2') {
            this.deletetEducation(id).then(res => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.getEducationData()
            })
          } else if (resumeId === '3') {
            this.deletetAcademic(id).then(res => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.getAcademicData()
            })
          } else if (resumeId === '4') {
            this.deletetCertificate(id).then(res => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.getCertificateData()
            })
          } else if (resumeId === '5') {
            this.deleteSocialposition(id).then(res => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.getSocialpositionData()
            })
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    createOrUpdateWork(val) {
      this.createOrUpdateWorkVisible = false
      this.getWorkexperienceData()
    },
    createOrUpdateEducation(val) {
      this.createOrUpdateEducationVisible = false
      this.getEducationData()
    },
    createOrUpdateAcademic(val) {
      this.createOrUpdateAcademicVisible = false
      this.getAcademicData()
    },
    createOrUpdateIndustry(val) {
      this.createOrUpdateIndustryVisible = false
      this.getCertificateData()
    },
    createOrUpdateSocial(val) {
      this.createOrUpdateSocialVisible = false
      this.getSocialpositionData()
    }
  }
}
</script>
<style lang='scss' scoped>
.userCenter-resume{
  .hover{display: none}
  letter-spacing:1px;
  img{width: 100%;height: 100%;}
  .resume-mould{background:#fff;margin-bottom:20px;padding: 30px 45px 15px 30px;
  .resume-title{height: 30px;line-height:30px;font-size:16px;color:rgba(51,51,51,1);margin-bottom:19px;overflow: hidden;
  .resume-title-img{height: 30px;line-height:30px;width: 30px;}
  .resume-title-edit{float:right;height: 26px;line-height:6px;}}}
  .resume-desc{font-size:14px;color:rgba(102,102,102,1);line-height:26px;
  .resume-desc-model{width:214px;height:110px;background:rgba(255,255,255,1);box-shadow:0px 0px 5px 0px rgba(0, 0, 0, 0.12);margin:0 auto;text-align: center;padding:20px;margin-bottom:20px; cursor: pointer;position: relative;
  >p{text-align: left}
  .resume-desc-model-add{height:24px;width:24px;color:rgba(51,51,51,1);font-size:30px;}
  .resume-desc-model-title{font-size:14px;color:rgba(51,51,51,1);}
  .resume-desc-button{position: absolute;bottom:0;left:0;width: 214px;height: 34px;background-color: rgba(0,0,0,.8);line-height: 34px;padding: 10 37px;color: rgba(255,255,255,.8);
  .resume-desc-button-line{margin-top:10px;height:15px;width:10px;border-right:1px solid #ddd;}}
  }
  .resume-desc-list{border-left: 1px dashed #ccc;padding-left: 50px;margin-left: 10px;
  .listSpot{height:4px;width:4px;background:red;display:block;margin-top:10px !important;}
  .desc-li{height:30px}
  }
  }
}
</style>
