<template>
  <div class="userCenter-resume">
    <el-row>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
        <el-breadcrumb-item :to="{path:'/'}" >京师在线</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/userCenter'}" >工作台</el-breadcrumb-item>
        <el-breadcrumb-item >我的简历</el-breadcrumb-item>
      </el-breadcrumb>
      <el-col :span="5">
        <div class="resume-info">
          <div class="resume-info-picture">
            <img src="../../../assets/usercenter/woman-sample.jpg" alt="律师头像">
            <span>修改头像</span>
          </div>
          <div class="resume-info-text">
            <p>上次登录时间：2020-02-11</p>
            <p>个人积分：<span class="high-light">62</span><i/><span class="tip">提示文本提示文本提示文本</span></p>
          </div>
          <div class="resume-info-icon">
            <ul>
              <li><a href="javascript:void(0);"><i class="iconfont iconpersonnone"/><span>审核中</span></a></li>
              <li><a href="javascript:void(0);"><i class="iconfont iconshoujihao"/><span>绑定手机</span></a></li>
              <li><a href="javascript:void(0);"><i class="iconfont iconyouxiangrenzheng"/><span>绑定邮箱</span></a></li>
            </ul>
          </div>
        </div>
      </el-col>
      <el-col :span="19" style="margin-bottom:75px">
        <el-row>
          <el-col :span="24" class="resume-introduce resume-mould" >
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
          <el-col :span="24" class="resume-work resume-mould">
            <el-row class="resume-title">
              <el-col :span="1"> <p class="resume-title-img"><img src="../../../assets/lawyerinfo/work.png" alt="工作经历"></p> </el-col>
              <el-col :span="19"> <span>工作经历</span> </el-col>
            </el-row>
            <div class="resume-desc">
              <el-row>
                <el-col :span="7">
                  <div class="resume-desc-model" @click="editWork">
                    <i class="el-icon-circle-plus-outline resume-desc-model-add"/>
                    <h2 class="resume-desc-model-title">添加工作经历</h2>
                  </div>
                </el-col>
                <el-col :span="17">
                  <el-row>
                    <el-col v-for="(item, index) in workData" :span="8" :key="index">
                      <div class="resume-desc-model" @mouseenter="item.isShowBtn=false" @mouseleave="item.isShowBtn=true">
                        <p>{{ item.name }}</p>
                        <p>{{ item.position }}</p>
                        <p>{{ item.time }}</p>
                        <div :class="{ hover:item.isShowBtn}" class="resume-desc-button">
                          <el-row >
                            <el-col :span="11" @click.native="editWork(item.id)">编辑</el-col>
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

          <el-col :span="24" class=" resume-educational resume-mould">
            <el-row class="resume-title">
              <el-col :span="1"> <p class="resume-title-img"><img src="../../../assets/lawyerinfo/learning.png" alt="教育经历"></p> </el-col>
              <el-col :span="19"> <span>教育经历</span> </el-col>
            </el-row>
            <div class="resume-desc">
              <el-row>
                <el-col :span="7">
                  <div class="resume-desc-model" @click="editWork">
                    <i class="el-icon-circle-plus-outline resume-desc-model-add"/>
                    <h2 class="resume-desc-model-title">添加教育经历</h2>
                  </div>
                </el-col>
                <el-col :span="17">
                  <el-row>
                    <el-col v-for="(item, index) in educationData" :span="8" :key="index">
                      <div class="resume-desc-model" @mouseenter="item.isShowBtn=false" @mouseleave="item.isShowBtn=true">
                        <p>{{ item.name }}</p>
                        <p>{{ item.position }}</p>
                        <p>{{ item.time }}</p>
                        <div :class="{ hover:item.isShowBtn}" class="resume-desc-button">
                          <el-row >
                            <el-col :span="11" @click.native="editWork(item.id)">编辑</el-col>
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
          <el-col :span="24" class="resume-academic resume-mould">
            <el-row class="resume-title">
              <el-col :span="1"> <p class="resume-title-img"><img src="../../../assets/lawyerinfo/study.png" alt="学术成果"></p> </el-col>
              <el-col :span="19"> <span>学术成果</span> </el-col>
              <el-col :span="4"> <el-button class="resume-title-edit" size="mini" @click="academicIsBtn=true">编辑</el-button></el-col>
            </el-row>
            <div class="resume-desc">
              <el-row>
                <el-col :span="7">
                  <div class="resume-desc-model">
                    <i class="el-icon-circle-plus-outline resume-desc-model-add"/>
                    <h2 class="resume-desc-model-title">添加学术成果</h2>
                  </div>
                </el-col>
                <el-col :span="17">
                  <div class="resume-desc-list">
                    <el-row>
                      <el-col v-for="(item, index) in listData" :span="24" :key="index">
                        <el-row>
                          <el-col :span="1"> <p class="listSpot"/></el-col>
                          <el-col :span="17"> <p>{{ item.name }}</p></el-col>
                          <el-col v-show="academicIsBtn" :span="2" style="text-align:right">
                            <el-button type="primary" icon="el-icon-edit" size="mini" circle @click="editWork(item.id)"/>
                          </el-col>
                          <el-col v-show="academicIsBtn" :span="2" style="text-align:right">
                            <el-button type="danger" size="mini" icon="el-icon-delete" circle @click="resumeDelete(item.id,'1')"/>
                          </el-col>
                        </el-row>
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="24" class="resume-industry resume-mould">
            <el-row class="resume-title">
              <el-col :span="1"> <p class="resume-title-img"><img src="../../../assets/lawyerinfo/industry.png" alt="行业资质"></p> </el-col>
              <el-col :span="19"> <span>行业资质</span> </el-col>
              <el-col :span="4"> <el-button class="resume-title-edit" size="mini" @click="industryIsBtn=true">编辑</el-button></el-col>
            </el-row>
            <div class="resume-desc">
              <el-row>
                <el-col :span="7">
                  <div class="resume-desc-model">
                    <i class="el-icon-circle-plus-outline resume-desc-model-add"/>
                    <h2 class="resume-desc-model-title">添加行业资质</h2>
                  </div>
                </el-col>
                <el-col :span="17">
                  <div class="resume-desc-list">
                    <el-row>
                      <el-col v-for="(item, index) in listData" :span="24" :key="index">
                        <el-row>
                          <el-col :span="1"> <p class="listSpot"/></el-col>
                          <el-col :span="17"> <p>{{ item.name }}</p></el-col>
                          <el-col v-show="industryIsBtn" :span="2" style="text-align:right">
                            <el-button type="primary" icon="el-icon-edit" size="mini" circle @click="editWork(item.id)"/>
                          </el-col>
                          <el-col v-show="industryIsBtn" :span="2" style="text-align:right">
                            <el-button type="danger" size="mini" icon="el-icon-delete" circle @click="resumeDelete(item.id,'1')"/>
                          </el-col>
                        </el-row>
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
            </el-row></div>
          </el-col>
          <el-col :span="24" class="resume-social resume-mould">
            <el-row class="resume-title">
              <el-col :span="1"> <p class="resume-title-img"><img src="../../../assets/lawyerinfo/society.png" alt="社会职务"></p> </el-col>
              <el-col :span="19"> <span>社会职务</span> </el-col>
              <el-col :span="4"> <el-button class="resume-title-edit" size="mini" @click="socialIsBtn=true">编辑</el-button></el-col>
            </el-row>
            <div class="resume-desc">
              <el-row>
                <el-col :span="7">
                  <div class="resume-desc-model">
                    <i class="el-icon-circle-plus-outline resume-desc-model-add"/>
                    <h2 class="resume-desc-model-title">添加社会职务</h2>
                  </div>
                </el-col>
                <el-col :span="17">
                  <div class="resume-desc-list">
                    <el-row>
                      <el-col v-for="(item, index) in listData" :span="24" :key="index">
                        <el-row>
                          <el-col :span="1"> <p class="listSpot"/></el-col>
                          <el-col :span="17"> <p>{{ item.name }}</p></el-col>
                          <el-col v-show="socialIsBtn" :span="2" style="text-align:right">
                            <el-button type="primary" icon="el-icon-edit" size="mini" circle @click="editWork(item.id)"/>
                          </el-col>
                          <el-col v-show="socialIsBtn" :span="2" style="text-align:right">
                            <el-button type="danger" size="mini" icon="el-icon-delete" circle @click="resumeDelete(item.id,'1')"/>
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
  </div>
</template>
<script>
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
  },
  data() {
    return {
      disabledInfo: true, // 个人信息是否可编辑
      socialIsBtn: false, // 社会可编辑
      academicIsBtn: false, // 学术成果可编辑
      industryIsBtn: false, // 行业资质可编辑
      resumeData: {
        info: 'wohfsjfoi'
      },
      workData: [
        { id: '1', name: '北京京师律师事务所', position: '合伙人律师', time: '2014.04 - 至今', isShowBtn: 'false' },
        { id: '2', name: '北京京师律师事务所', position: '合伙人律师', time: '2014.04 - 至今', isShowBtn: 'false' },
        { id: '3', name: '北京京师律师事务所', position: '合伙人律师', time: '2014.04 - 至今', isShowBtn: 'false' },
        { id: '4', name: '北京京师律师事务所', position: '合伙人律师', time: '2014.04 - 至今', isShowBtn: 'false' }
      ],
      educationData: [
        { id: '1', name: '吉林大学', position: '本科', time: '2014.04 - 至今', isShowBtn: 'false' },
        { id: '2', name: '吉林大学', position: '本科', time: '2014.04 - 至今', isShowBtn: 'false' },
        { id: '3', name: '吉林大学', position: '本科', time: '2014.04 - 至今', isShowBtn: 'false' },
        { id: '4', name: '吉林大学', position: '本科', time: '2014.04 - 至今', isShowBtn: 'false' }
      ],
      listData: [
        { id: '1', name: '中央电视台《法律讲堂》节目主讲律师', isShowBtn: 'false' },
        { id: '2', name: '中央电视台《法律讲堂》节目主讲律师', isShowBtn: 'false' },
        { id: '3', name: '中央电视台《法律讲堂》节目主讲律师', isShowBtn: 'false' },
        { id: '4', name: '中央电视台《法律讲堂》节目主讲律师', isShowBtn: 'false' }
      ]
    }
  },
  watch: {
  },
  mounted() {
  },
  methods: {
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
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    editWork() {
      alert('编辑')
    }
  }
}
</script>
<style lang='scss' scoped>
.userCenter-resume{
  .hover{display: none}
  letter-spacing:1px;
  img{width: 100%;height: 100%;}
  .resume-info{width:240px;height:340px;background:#fff;padding-top:42px;
   .resume-info-picture {margin: 0 auto;position: relative;display: block;width: 140px;height: 140px;box-sizing: border-box;border:1px solid rgba(215, 215, 215, 1);cursor: pointer;overflow: hidden;padding: 2px;margin-bottom: 18px;
        img {display: inline-block;width: 100%;height: 100%;}
        span{font-size: 14px;text-align: center;line-height: 26px;position: absolute;bottom: 0px;left: 0;transition: bottom .5s;color:rgba(255,255,255,1);background:rgba(0,0,0,1);opacity:0.5; width: 100%;}
      }
    .resume-info-text{padding-left: 30px;font-size: 12px; margin-bottom: 15px; position: relative;color:#000000;
       .high-light {font-size: 14px;font-weight: bold;color: #ED0F0F;}
        i { cursor: pointer;display: inline-block;width: 16px;height: 16px;background: url("../../../assets/usercenter/help.png") no-repeat center;vertical-align: -2px; margin-left: 6px;position: relative;}
        .tip { transition: opacity 2s;position: absolute; display: block;width: 160px;height: 60px;border: 1px solid #ccc;background: #fff;z-index: 99;border-radius: 5px;top: -33px;left: 94px;font-size: 12px;opacity: 0;}
        .tip:before { content: '';position: absolute;width: 10px;height: 10px;bottom: -5px;left: 20px;transform: rotate(-45deg); border-width: 1px; border-style: solid;border-color: transparent transparent #ccc #ccc;z-index: 100;background: #fff;}
        i:hover +.tip { opacity: 1; }
      }
       .resume-info-icon {margin-top:20px;
        ul {display: flex;list-style: none;padding: 0 36px 0 30px;justify-content: space-between;overflow: hidden;
          li{font-size: 12px; line-height: 12px;
            a{color: #999999;
              i{line-height: 33px;display: block;font-size: 30px;text-align: center;margin-bottom: 5px;
              }
            }
          }
        }
      }
  }
  .resume-mould{background:#fff;margin-bottom:20px;padding: 30px 45px 15px 30px;
  .resume-title{height: 30px;line-height:30px;font-size:16px;color:rgba(51,51,51,1);margin-bottom:19px;overflow: hidden;
  .resume-title-img{height: 30px;line-height:30px;width: 30px;}
  .resume-title-edit{float:right;height: 26px;line-height:6px;width: 72px;}}}
  .resume-desc{font-size:14px;color:rgba(102,102,102,1);line-height:26px;
  .resume-desc-model{width:214px;height:110px;background:rgba(255,255,255,1);box-shadow:0px 0px 5px 0px rgba(0, 0, 0, 0.12);margin:0 auto;text-align: center;padding:20px;margin-bottom:20px; cursor: pointer;position: relative;
  >p{line-height: 14px;text-align: left}
  .resume-desc-model-add{height:24px;width:24px;color:rgba(51,51,51,1);font-size:30px;}
  .resume-desc-model-title{font-size:14px;color:rgba(51,51,51,1);}
  .resume-desc-button{position: absolute;bottom:0;left:0;width: 214px;height: 34px;background-color: rgba(0,0,0,.8);line-height: 34px;padding: 10 37px;color: rgba(255,255,255,.8);
  .resume-desc-button-line{margin-top:10px;height:15px;width:10px;border-right:1px solid #ddd;}}
  }
  .resume-desc-list{border-left: 1px dashed #ccc;padding-left: 50px;margin-left: 10px;
  .listSpot{height:4px;width:4px;background:red;display:block;margin-top:10px;}
  }
  }
}
</style>
