<template>
  <div class="lawyer-resume">
    <div class="lawyer-present">
      <p>曾在政府部门、政协、工商联、司法局法律电大、律师事务所、公证处注册执业、国企集团董事会民企高管以及中国政法大学成人教育学院法律研究生班内蒙教学部，民主与法制社内蒙古事业发展中心、北京师范大学博士后工作站等单位，跨地域跨领域多行业多层次从事过工作，得到很多历炼积累了丰富的实践经验。</p>
    </div>
    <div class="lawyer-work lawyer-wrapper">
      <p class="lawyer-header"><i/>工作经历</p>
      <div class="card-container">
        <ul class="work-card type-cards">
          <li>
            <p>北京京师律师事务所</p>
            <p>合伙人律师</p>
            <p>2014.04 - 至今</p>
          </li>
          <li>
            <p>北京京师律师事务所</p>
            <p>合伙人律师</p>
            <p>2014.04 - 至今</p>
          </li>
          <li>
            <p>北京京师律师事务所</p>
            <p>合伙人律师</p>
            <p>2014.04 - 至今</p>
          </li>
          <li>
            <p>北京京师律师事务所</p>
            <p>合伙人律师</p>
            <p>2014.04 - 至今</p>
          </li>
          <li>
            <p>北京京师律师事务所</p>
            <p>合伙人律师</p>
            <p>2014.04 - 至今</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="lawyer-study lawyer-wrapper">
      <p class="lawyer-header"><i/>教育经历</p>
      <div class="card-container">
        <ul class="work-card type-cards">
          <li>
            <p>北京京师律师事务所</p>
            <p>合伙人律师</p>
            <p>2014.04 - 至今</p>
          </li>
          <li>
            <p>北京京师律师事务所</p>
            <p>合伙人律师</p>
            <p>2014.04 - 至今</p>
          </li>
          <li>
            <p>北京京师律师事务所</p>
            <p>合伙人律师</p>
            <p>2014.04 - 至今</p>
          </li>
          <li>
            <p>北京京师律师事务所</p>
            <p>合伙人律师</p>
            <p>2014.04 - 至今</p>
          </li>
          <li>
            <p>北京京师律师事务所</p>
            <p>合伙人律师</p>
            <p>2014.04 - 至今</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="lawyer-learn lawyer-wrapper">
      <p class="lawyer-header"><i/>学术成果</p>
      <div class="card-container">
        <ul class="work-card type-text">
          <li>
            中央电视台《热线12》节目特约嘉宾“刘谈判”
          </li>
          <li>
            中央电视台《热线12》节目特约嘉宾“刘谈判”
          </li>
          <li>
            中央电视台《热线12》节目特约嘉宾“刘谈判”
          </li>
          <li>
            中央电视台《热线12》节目特约嘉宾“刘谈判”
          </li>
        </ul>
      </div>
    </div>
    <div class="lawyer-industry lawyer-wrapper">
      <p class="lawyer-header"><i/>行业资质</p>
      <div class="card-container">
        <ul class="work-card type-text">
          <li>
            中央电视台《热线12》节目特约嘉宾“刘谈判”
          </li>
          <li>
            中央电视台《热线12》节目特约嘉宾“刘谈判”
          </li>
          <li>
            中央电视台《热线12》节目特约嘉宾“刘谈判”
          </li>
          <li>
            中央电视台《热线12》节目特约嘉宾“刘谈判”
          </li>
        </ul>
      </div>
    </div>
    <div class="lawyer-society lawyer-wrapper">
      <p class="lawyer-header"><i/>社会职务</p>
      <div class="card-container">
        <ul class="work-card type-text">
          <li>
            中央电视台《热线12》节目特约嘉宾“刘谈判”
          </li>
          <li>
            中央电视台《热线12》节目特约嘉宾“刘谈判”
          </li>
          <li>
            中央电视台《热线12》节目特约嘉宾“刘谈判”
          </li>
          <li>
            中央电视台《热线12》节目特约嘉宾“刘谈判”
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LawyerResume'
}
</script>

<style lang="scss" scoped>
.lawyer-resume {
  color: #666;
  box-sizing: border-box;
  .lawyer-present {
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
  .lawyer-wrapper {
    margin-top: 16px;
    border: 1px solid #eee;
    padding-top: 29px;
    padding-left: 29px;
  }
    .card-container {
    padding-left: 36px;
    .type-cards {
      justify-content: flex-start;
      flex-wrap: wrap;
      padding-bottom: 20px;
      li {
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
        background-image: url("../assets/work.png");
      }
  }
  .lawyer-study {
    i {
      background-image: url("../assets/study.png");
    }
  }
  .lawyer-learn {
    .lawyer-header {
      margin-bottom: 17px;
    }
    i {
      background-image: url("../assets/learning.png");
    }
  }
  .lawyer-industry {
    .lawyer-header {
      margin-bottom: 17px;
    }
    i {
      background-image: url("../assets/industry.png");
    }
  }
  .lawyer-society {
    .lawyer-header {
      margin-bottom: 17px;
    }
    i {
      background-image: url("../assets/society.png");
    }
  }

}
</style>
