<template>
  <div class="often-court">
    <div v-for="(item,index) in courtData" :key="index" class="often-container">
      <h4 class="often-header"><i/>{{ item.name }}</h4>
      <div class="often-main">
        <div v-for="(item,index) in item.courts" :key="index" class="often-card">
          <p class="often-card-header">{{ item.name }}</p>
          <ul>
            <li>地址: {{ item.address }}</li>
            <li>联系方式: {{ item.tel }}</li>
            <li>网址: {{ item.webSite }} </li>
            <li>案例总数: <span class="high-light">{{ item.caseCount }}</span> </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OftenCourt',
  components: {
  },
  props: {
    courtData: {
      type: Array,
      default: function() {
        return []
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
.often-court {
  border-top: 1px dashed #eaeaea;
  margin-bottom: 188px;
  .often-container {
    background: #fff;
    .often-header {
      background: #f2f2f2;
      padding-left: 10px;
      padding-top: 18px;
      padding-bottom: 10px;
      font-size: 16px;
      color: #999999;
      line-height: 16px;
      i {
        display: inline-block;
        width: 4px;
        height: 15px;
        background-image: url("../../../../assets/lawyerinfo/XYZ.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin-right: 15px;
        vertical-align: top;
      }
    }
    .often-main {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      border: 1px solid #eeeeee;
      padding: 37px 0 4px 40px;
      box-sizing: border-box;
      .often-card {
        width: 300px;
        height: 190px;
        margin-bottom: 28px;
        margin-right: 28px;
        border: 1px solid #f1f1f1;
        padding-left: 29px;
        .often-card-header {
          padding-top: 21px;
          font-size: 16px;
          line-height: 26px;
          color: #333333;
        }
        ul {
          margin-left: 20px;
          li {
          list-style-image: url("../../../../assets/lawyerinfo/dot.png");
          font-size: 12px;
          line-height: 30px;
          color: #333333;
          .high-light {
            color: #dd1e32;
          }
        }
        }
      }
    }
  }
}
</style>
