<template>
  <div class="lawyer-resume">
    <div class="lawyer-present">
      <p>{{ lawyerRemark }}</p>
    </div>
    <div class="lawyer-main">
      <div class="lawyer-work lawyer-wrapper">
        <p class="lawyer-header"><i/>工作经历</p>
        <div class="card-container">
          <ul v-if="resumeData.workExperiences.length > 0" class="work-card type-cards" >
            <li v-for="(item,index) in resumeData.workExperiences" :key="index">
              <p>{{ item.organization }}</p>
              <p>{{ item.position }}</p>
              <p><span>{{ item.startDate | dateFormat("YYYY.mm") }}</span> - <span>{{ item.endDate | dateFormat("YYYY.mm") }}</span></p>
            </li>
          </ul>
          <p v-else class="lawyer-info-none">暂无该律师工作经历相关数据...</p>
        </div>
      </div>
      <div class="lawyer-study lawyer-wrapper">
        <p class="lawyer-header"><i/>教育经历</p>
        <div class="card-container">
          <ul v-if="resumeData.educations.length" class="work-card type-cards">
            <li v-for="(item,index) in resumeData.educations" :key="index">
              <p>{{ item.school }}</p>
              <p>{{ item.degree }}</p>
              <p><span>{{ item.startDate | dateFormat("YYYY.mm") }}</span> - <span>{{ item.endDate | dateFormat("YYYY.mm") }}</span></p>
            </li>
          </ul>
          <p v-else class="lawyer-info-none">暂无该律师教育经历相关数据...</p>
        </div>
      </div>
      <div class="lawyer-learn lawyer-wrapper">
        <p class="lawyer-header"><i/>学术成果</p>
        <div class="card-container">
          <ul v-if="resumeData.academics.length > 0" class="work-card type-text">
            <li v-for="(item,index) in resumeData.academics" :key="index">
              {{ item.name }}
            </li>
          </ul>
          <p v-else class="lawyer-info-none">暂无该律师学术成果相关数据...</p>
        </div>
      </div>
      <div class="lawyer-industry lawyer-wrapper">
        <p class="lawyer-header"><i/>行业资质</p>
        <div class="card-container">
          <ul v-if="resumeData.certificates.length > 0" class="work-card type-text">
            <li v-for="(item,index) in resumeData.certificates" :key="index" >
              {{ item.name }}
            </li>
          </ul>
          <p v-else class="lawyer-info-none">暂无该律师行业资质相关数据...</p>
        </div>
      </div>
      <div class="lawyer-society lawyer-wrapper">
        <p class="lawyer-header"><i/>社会职务</p>
        <div class="card-container">
          <ul v-if="resumeData.socialPositions.length > 0" class="work-card type-text">
            <li v-for="(item,index) in resumeData.socialPositions" :key="index">
              {{ item.name }}
            </li>
          </ul>
          <p v-else class="lawyer-info-none">暂无该律师社会职务相关数据...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LawyerResume',
  components: {
  },
  props: {
    resumeData: {
      type: Object,
      default: function() {
        return {
          // 工作经历
          workExperiences: [],
          // 社会职务
          socialPositions: [],
          // 教育经历
          educations: [],
          // 行业资质
          certificates: [],
          // 学术成果
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
    }
  },

  watch: {},
  mounted() {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.lawyer-resume {
  color: #666;
  box-sizing: border-box;
  .lawyer-present {
    background: #fff;
    padding: 12px 28px 12px 28px;
    border-left: 1px solid #eee;
    border-bottom: 1px solid #eee;
    border-right: 1px solid #eee;
    font-size: 14px;
    line-height: 24px;
  }
  .lawyer-header {
    margin-bottom: 26px;
    font-size: 16px;
    line-height: 30px;
    color: #333333;
    i {
      display: inline-block;
      width: 30px;
      height: 30px;
      background-size: 100% 100%;
      margin-right: 18px;
      background-repeat: no-repeat;
      vertical-align: top;
    }
  }
  .lawyer-main {
    margin-bottom: 324px;
  }
  .lawyer-wrapper {
    background: #fff;
    margin-top: 16px;
    border: 1px solid #eee;
    padding-top: 29px;
    padding-left: 29px;
  }
    .card-container {
    .lawyer-info-none {
      font-size: 16px;
      line-height: 28px;
      margin-bottom: 20px;
    }
    padding-left: 36px;
    .type-cards {
      justify-content: flex-start;
      flex-wrap: wrap;
      padding-bottom: 20px;
      li {
        cursor: pointer;
        width: 295px;
        height: 116px;
        border: 1px solid #f1f1f1;
        border-radius: 5px;
        line-height: 28px;
        padding-left: 28px;
        padding-top: 17px;
        box-sizing: border-box;
        margin: 0 18px 18px 0
      }
    }
    .type-text {
      display: block;
      padding-bottom: 40px;
      li {
        cursor: pointer;
        line-height: 36px;
      }
    }
    ul {
      font-size: 16px;
      list-style: none;
      display: flex;
    }
  }
  .lawyer-work {
       i {
        background-image: url("../../../../assets/lawyerinfo/work.png");
      }
  }
  .lawyer-study {
    i {
      background-image: url("../../../../assets/lawyerinfo/study.png");
    }
  }
  .lawyer-learn {
    .lawyer-header {
      margin-bottom: 17px;
    }
    i {
      background-image: url("../../../../assets/lawyerinfo/learning.png");
    }
  }
  .lawyer-industry {
    .lawyer-header {
      margin-bottom: 17px;
    }
    i {
      background-image: url("../../../../assets/lawyerinfo/industry.png");
    }
  }
  .lawyer-society {
    .lawyer-header {
      margin-bottom: 17px;
    }
    i {
      background-image: url("../../../../assets/lawyerinfo/society.png");
    }
  }

}
</style>
