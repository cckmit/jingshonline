<template>
  <el-row :gutter="20">
    <el-col :span="24">
      <el-breadcrumb separator-class="el-icon-minus" class="breadcrumb title">
        <el-breadcrumb-item :to="{path:'/'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>查找律师</el-breadcrumb-item>
      </el-breadcrumb>
      <el-row class="bgf tabselect">
        <el-col :span="24">
          <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="诉讼领域" name="first">
              <ul>
                <li v-for="(items,index) in suitsData" :key="index">
                  <span v-if="items.children.length===0" @click="practice(items.id,items.name)">
                    {{ items.name }}
                  </span>
                  <el-popover v-else placement="top-start" trigger="hover">
                    <ul class="tabinfo">
                      <li v-for="(item,index) in items.children" :key="index" @click="practice(item.id,item.name)">{{ item.name }}</li>
                    </ul>
                    <el-button slot="reference" @click="practice(items.id,items.name)">{{ items.name }}</el-button>
                  </el-popover>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="非诉领域" name="second">
              <ul>
                <li v-for="(items,index) in NosuitsData" :key="index">
                  <span v-if="items.children.length===0" @click="practice(items.id,items.name)">
                    {{ items.name }}
                  </span>
                  <el-popover v-else placement="top-start" trigger="hover">
                    <ul class="tabinfo">
                      <li v-for="(item,index) in items.children" :key="index" @click="practice(item.id,item.name)">{{ item.name }}</li>
                    </ul>
                    <el-button slot="reference" @click="practice(items.id,items.name)">{{ items.name }}</el-button>
                  </el-popover>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="擅长行业" name="third">
              <ul>
                <li v-for="(items,index) in industryData" :key="index">
                  <span v-if="items.children.length===0" @click="industry(items.id,items.name)">
                    {{ items.name }}
                  </span>
                  <el-popover v-else placement="top-start" trigger="hover">
                    <ul class="tabinfo">
                      <li v-for="(item,index) in items.children" :key="index" @click="industry(item.id,item.name)">{{ item.name }}</li>
                    </ul>
                    <el-button slot="reference" @click="industry(items.id,items.name)">{{ items.name }}</el-button>
                  </el-popover>
                </li>
              </ul>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="6">
      <div class="select-input">
        <p>检索律师</p>
        <div>
          <el-input v-model="lawyerSearch.lawyerName" size="small" clearable placeholder="请输入所要查询的律师姓名" />
          <img src="../../assets/lawyer/search.png" alt="" @click="selectname">
        </div>
      </div>
      <div class="bgf tree_left">
        <p>城市</p>
        <el-tree ref="tree2" :data="regionData" :props="defaultProps" :indent="24" :highlight-current="true" :filter-node-method="filterNode" node-key="id" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" @node-click="region">
          <div slot-scope="{ node }" class="tree_tools">
            <span>{{ node.data.name }}</span>
          </div>
        </el-tree>
      </div>
      <div class="bgf tree_left">
        <p>律所</p>
        <ul>
          <li v-for="(items,index) in lawfirmData" :key="index" @click="lawfirm(items)">{{ items.name }}</li>
        </ul>
      </div>
    </el-col>
    <el-col :span="18">
      <div class="bgf selectend">
        <div class="selecttab">
          <span>筛选条件：</span>
          <ul class="alreadyselect">
            <!-- <li v-for="(items,index) in selectData" :key="index"><span>{{ items.name }}</span><small @click="selectdelete(items)"><i class="fa fa-times"/></small></li> -->
            <li v-for="(items,index) in selectData.industry" v-show="selectData.industry!==[]" :key="index"><span>{{ items.name }}</span><small @click="selectdelete('industry',items)"><i class="fa fa-times" /></small></li>
            <li v-for="(items,index) in selectData.practice" v-show="selectData.practice!==[]" :key="index"><span>{{ items.name }}</span><small @click="selectdelete('practice',items)"><i class="fa fa-times" /></small></li>
            <li v-for="(items,index) in selectData.region" v-show="selectData.region!==[]" :key="index"><span>{{ items.name }}</span><small @click="selectdelete('region',items)"><i class="fa fa-times" /></small></li>
            <li v-for="(items,index) in selectData.lawfirm" v-show="selectData.lawfirm!==[]" :key="index"><span>{{ items.name }}</span><small @click="selectdelete('lawfirm',items)"><i class="fa fa-times" /></small></li>
            <li v-for="(items,index) in selectData.lawyerName" v-show="selectData.lawyerName!==[]" :key="index"><span>{{ items.name }}</span><small @click="selectdelete('lawyerName',items)"><i class="fa fa-times" /></small></li>
          </ul>
          <p @click="selectempty">
            <img src="../../assets/lawyer/empty.png" alt="">
            <span>清空筛选条件</span>
          </p>
        </div>
        <div class="selectsort">
          <ul class="alreadyselect">
            <li :class="sortactive" @click="sortselect"><span>默认排序</span></li>
            <li :class="caseactive" @click="caseselect"><span>案例总数</span></li>
            <li>
              <b>年限</b>
              <el-input v-model="yearstart" size="small" clearable />&nbsp;&nbsp;--&nbsp;
              <el-input v-model="yearend" size="small" clearable />&nbsp;&nbsp;年
            </li>
          </ul>
          <p>
            当前条件共找到<b>355</b>个结果
          </p>
        </div>
      </div>
      <ul class="lawyerlist">
        <li>
          <nuxt-link :to="`/lawyer/5/info`">
            <img src="../../assets/lawyer/lawyer_auth.png" alt="">
            <div class="lawyerlist_lf">
              <img src="../../assets/lawyer/avatar.png" alt="">
              <span>部门主任</span>
            </div>
            <div class="lawyerlist_rt">
              <b><span>刘志明</span>律师</b>
              <div>
                <div>
                  <p>
                    <img src="../../assets/lawyer/arrow.png" alt="">
                    <b>基础信息&nbsp;●&nbsp;</b>
                    <span>INFORMATION</span>
                  </p>
                  <ul>
                    <li>
                      <span>执业年限</span>
                      <b>8年</b>
                    </li>
                    <li>
                      <span>案例总数</span>
                      <b>325例</b>
                    </li>
                    <li>
                      <span>所在律所</span>
                      <b>北京市京师律师事务所</b>
                    </li>
                    <li>
                      <span>所在地址</span>
                      <b>北京市-朝阳区</b>
                    </li>
                  </ul>
                </div>
                <div class="lawyerlist_mid">
                  <p>
                    <img src="../../assets/lawyer/arrow.png" alt="">
                    <b>专业领域&nbsp;●&nbsp;</b>
                    <span>EXPERTISE</span>
                  </p>
                  <ul>
                    <li>诉讼仲裁</li>
                    <li>公司法律服务</li>
                    <li>诉讼仲裁</li>
                    <li>公司法律服务</li>
                  </ul>
                </div>
                <div class="lawyerlist_action">
                  <span>更新时间：</span>
                  <b>2019-07-15</b>
                  <p>浏览：<span>222</span></p>
                  <p>关注：<span>333</span></p>
                  <div>
                    <div><img src="../../assets/lawyer/collection.png" alt="" @click="collection()">收藏</div>
                    <div><img src="../../assets/lawyer/share.png" alt="" @click="share()">分享</div>
                  </div>
                </div>
              </div>
            </div>
          </nuxt-link>
        </li>
      </ul>
      <Pagination v-show="totalCount>0" :total="totalCount" :page="lawyerSearch.pageIndex" :limit="lawyerSearch.pageCount" @pagination="handlePageChange" />
    </el-col>
  </el-row>
</template>

<script>
import Pagination from '../../components/Pagination/index'
import { mapActions } from 'vuex'
import setting from '@/plugins/setting'
import axios from 'axios'
export default {
  layout: 'lawyer',
  name: 'Lawyer',
  components: {
    Pagination
  },
  async asyncData({ params }) {
    const [lawyerData, suitsData, NosuitsData, industryData, regionData] = await Promise.all([
      axios.get(`http://gateway.dev.jingshonline.net/${setting.apiPrefix}/customer/lawyer/query`, { 'Content-Type': 'application/json' }),
      axios.get(`http://gateway.dev.jingshonline.net/${setting.apiPrefix}/practicearea/tree/1`, { 'Content-Type': 'application/json' }),
      axios.get(`http://gateway.dev.jingshonline.net/${setting.apiPrefix}/practicearea/tree/2`, { 'Content-Type': 'application/json' }),
      axios.get(`http://gateway.dev.jingshonline.net/${setting.apiPrefix}/industry/tree`, { 'Content-Type': 'application/json' }),
      axios.get(`http://gateway.dev.jingshonline.net/${setting.apiPrefix}/region/tree`, { 'Content-Type': 'application/json' })
    ])
    return {
      lawyerData: lawyerData.data.items,
      suitsData: suitsData.data.data[0].children, // .data[0].children,
      NosuitsData: NosuitsData.data.data[0].children, // .data[0].children,
      industryData: industryData.data.data,
      regionData: regionData.data.data
    }
  },

  data() {
    return {
      loading: false,
      activeName: 'first',
      tabsearchData: [],
      lawyerSearch: {
        pageCount: 10,
        pageIndex: 1,
        lawyerName: '', // 律师姓名
        lawfirmId: '', // 所属律所
        practiceAreaId: '', // 擅长领域
        industryId: '', // 擅长行业
        sorting: 0, // 排序
        regionId: '' // 律师所属地区
      },
      yearstart: '', // 年限开始时间
      yearend: '', // 年限结束时间
      sortactive: 'active', // 默认排序class
      caseactive: '', // 案例总数排序class
      selectData: {
        industry: [],
        practice: [],
        region: [],
        lawfirm: [],
        lawyerName: []
      }, // 筛选条件数据
      addData: false, // 是否已筛选
      suitsData: [], // 诉讼领域数据
      NosuitsData: [], // 非诉领域数据
      industryData: [], // 行业数据
      lawfirmData: [], // 律所数据
      regionData: [], // 地区数据
      lawyerData: [],
      totalCount: 1,
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  computed: {

  },

  watch: {
  },
  mounted() {
    // this.getLawyer()
    // this.getLawfirm()
  },

  methods: {
    ...mapActions('lawyer', ['GetLawyerList']),
    ...mapActions('practice', ['getPracticeTreeData', 'getPracticesuitsData', 'getPracticeNosuitsData']),
    ...mapActions('industry', ['getIndustryTreeData']),
    ...mapActions('lawfirm', ['getLawfirmList']),
    ...mapActions('region', ['getRegionTreeData']),
    getPractice() { // 获取领域
      // this.getPracticeTreeData().then(res => {
      //   this.suitsData = res[0].children
      //   this.NosuitsData = res[1].children
      // })
      this.getPracticesuitsData().then(res => {
        this.suitsData = res[0].children
      })
      this.getPracticeNosuitsData().then(res => {
        this.NosuitsData = res[0].children
      })
    },
    getIndustry() { // 获取行业
      this.getIndustryTreeData().then(res => {
        this.industryData = res
        console.log(this.industryData)
      })
    },
    getLawfirm() { // 获取律所
      this.getLawfirmList().then(res => {
        this.lawfirmData = res
      })
    },
    getRegion() { // 获取地区
      this.getRegionTreeData().then(res => {
        this.regionData = res

        this.loading = false
      })
    },
    // 获取数据
    getLawyer() {
      this.loading = true
      setTimeout(this.request)
    },
    request() {
      this.GetLawyerList({ ...this.lawyerSearch, ...this.$refs.lawyerSearch }).then(res => {
        this.lawyerData = res.data.items
        this.totalCount = res.data.totalCount
        this.loading = false
      })
    },
    // 分页切换
    handlePageChange(val) {
      this.lawyerSearch.pageIndex = val.page
      this.lawyerSearch.pageCount = val.limit
      this.loading = true
      this.getLawyer(150)
    },
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    industry(id, name) {
      this.lawyerSearch.industryId = id
      this.multiple('industry', { id: id, name: '擅长行业：' + name })
    },
    practice(id, name) {
      this.lawyerSearch.practiceAreaId = id
      this.multiple('practice', { id: id, name: '专业领域：' + name })
    },
    region(data) {
      this.lawyerSearch.regionId = data.id
      this.multiple('region', { id: data.id, name: '专业领域：' + data.name })
    },
    lawfirm(id, name) {
      this.lawyerSearch.lawfirmId = id
      this.multiple('lawfirm', { id: id, name: '所属律所：' + name })
    },
    selectname() {
      this.multiple('lawyerName', { id: 0, name: '姓名：' + this.lawyerSearch.lawyerName })
    },
    multiple(type, data) { // 添加筛选方法
      // 多选
      // const hasthis = this.selectData[type].indexOf(data.id) > -1 && this.selectData.indexOf(data.name) > -1
      // hasthis ? '' : this.selectData[type].push(data)
      // 单选
      this.selectData[type] = [data]
    },
    selectdelete(type, data) { // 删除筛选方法
      // 多选
      // for (var i = 0; i < this.selectData[type].length; i++) {
      //   if (this.selectData[type][i].id === data.id && this.selectData[type][i].name === data.name) {
      //     this.selectData[type].splice([i], 1)
      //   }
      // }
      // 单选
      this.selectData[type] = []
    },
    selectempty() { // 清空筛选条件
      this.selectData = []
      this.lawyerSearch.practiceAreaId = ''
      this.lawyerSearch.lawfirmId = ''
      this.lawyerSearch.regionId = ''
      this.lawyerSearch.industryId = ''
    },
    sortselect() { // 默认排序
      if (this.sortactive === '') {
        this.sortactive = 'active'
        this.lawyerSearch.sorting = 1
        // 删除按照案例数排序class
        this.caseactive = ''
      } else {
        this.sortactive = ''
        this.lawyerSearch.sorting = ''// 待完善
      }
    },
    caseselect() { // 按照案例数排序
      if (this.caseactive === '') {
        this.caseactive = 'active'
        this.lawyerSearch.sorting = 2
        // 删除默认排序class
        this.sortactive = ''
      } else {
        this.caseactive = ''
        this.lawyerSearch.sorting = ''// 待完善
      }
    },
    collection() { // 收藏

    },
    share() { // 分享

    }
  }
}
</script>

<style lang='scss' scoped>
.title {
  height: 60px;
  font-size: 14px;
  padding: 35px;
  color: #999;
  b {
    color: #666;
  }
}

.tabinfo {
  padding: 10px 20px;
  li {
    display: inline-block;
    padding: 10px 15px;
    cursor: pointer;
  }
}
ul {
  padding: 0px;
  li {
    list-style: none;
  }
}
.bgf {
  background: #fff;
}
.select-input {
  padding: 10px 20px;
  margin: 18px 0px;
  background: #fff;
  p {
    font-size: 18px;
    padding: 20px 10px 15px 10px;
    border-bottom: 1px dotted #ddd;
  }
  div {
    overflow: hidden;
    .el-input {
      float: left;
      width: 215px;
      margin: 20px 0px;
    }
    img {
      float: left;
      margin: 20px 0px;
    }
  }
}
.tree_left {
  padding: 20px;
  margin-bottom: 20px;
  p {
    border-bottom: 1px dotted #ddd;
    font-size: 18px;
    padding: 10px;
  }
  ul {
    padding: 10px;
    li {
      line-height: 50px;
      height: 50px;
      border-bottom: 1px solid #ddd;
      font-size: 14px;
    }
  }
}
.selectend {
  margin: 20px 0px;
  padding: 0px 25px;
  .selecttab {
    padding: 20px 0px 15px 0px;
    overflow: hidden;
    border-bottom: 1px dotted #ddd;
    > span {
      color: #999;
      float: left;
    }
    .alreadyselect {
      float: left;
      li {
        display: inline-block;
        margin: 0px 10px;
        > span {
          color: #333;
          margin-right: 5px;
        }
        small {
          display: inline-block;
          width: 17px;
          height: 17px;
          text-align: center;
          background: #d0d0d0;
          color: #fff;
          cursor: pointer;
        }
      }
      .active {
        color: #f68020;
      }
    }
    > p {
      float: right;
      cursor: pointer;
      span {
        color: #666;
      }
    }
  }
}
.selectsort {
  padding: 20px 0px 15px 0px;
  overflow: hidden;
  .alreadyselect {
    float: left;
    li {
      display: inline-block;
      margin: 0px 10px;
      > span {
        display: inline-block;
        width: 90px;
        height: 40px;
        color: #333;
        margin-right: 8px;
        cursor: pointer;
        background: url('../../assets/lawyer/sortdefault.png') no-repeat 70px
          6px;
      }
      b {
        display: inline-block;
        margin-right: 8px;
        font-weight: 400;
      }
      text {
        display: inline-block;
      }
    }
    .active {
      > span {
        color: #f68020;
        background: url('../../assets/lawyer/sort.png') no-repeat 70px 6px;
      }
    }
  }
  > p {
    float: right;
    b {
      color: #de2121;
    }
  }
}
.lawyerlist {
  margin: 20px 0px;
  li {
    margin-bottom: 20px;
    background: #fff;
    a {
      display: block;
      overflow: hidden;
      text-decoration: none;
      position: relative;
      > img {
        position: absolute;
        right: 0px;
        top: 0px;
      }
      > .lawyerlist_lf {
        width: 25%;
        float: left;
        position: relative;
        > img {
          width: 100%;
        }
        > span {
          background: #000;
          opacity: 0.7;
          position: absolute;
          bottom: 4px;
          right: 0px;
          display: inline-block;
          padding: 5px 15px;
          color: #fff;
        }
      }
      .lawyerlist_rt {
        float: left;
        width: 74%;
        padding: 30px 0px;
        color: #333;
        > b {
          font-size: 15px;
          font-weight: 400;
          padding-left: 20px;
          > span {
            font-size: 24px;
            display: inline-block;
            padding-right: 10px;
          }
        }
        > div {
          width: 100%;
          overflow: hidden;
          > div {
            width: 40%;
            float: left;
            padding: 0px 10px;
            p {
              padding-top: 30px;
              font-size: 16px;
              margin-bottom: 10px;
              img {
                margin-right: 5px;
              }
              b {
                color: #f68020;
                font-weight: 400;
              }
              span {
                color: #999;
              }
            }
            ul {
              padding: 0px 15px;
              li {
                margin: 10px 0px;
                font-size: 16px;
                span {
                  color: #999;
                }
                b {
                  margin-left: 15px;
                  font-weight: 400;
                }
              }
            }
          }
          .lawyerlist_mid {
            width: 30%;
            border-left: 1px dotted #ddd;
            border-right: 1px dotted #ddd;
            ul {
              padding: 0px 20px;
            }
          }
          .lawyerlist_action {
            padding: 0px 30px;
            width: 30%;
            min-height: 185px;
            float: left;
            > span {
              display: block;
              padding-top: 30px;
              color: #999;
            }
            > b {
              display: block;
              color: #f68020;
              font-size: 16px;
              padding: 5px 0px;
              font-weight: 400;
            }
            p {
              margin: 0px;
              padding: 5px 0px;
              color: #999;
              font-size: 14px;
            }
            > div {
              display: block;
              padding: 5px 0px;
              div {
                display: inline-block;
                border: 1px solid #ddd;
                border-radius: 3px;
                padding: 0px 8px;
                font-size: 14px;
                color: #999;
                img {
                  margin-right: 5px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
<style lang='scss'>
.tabselect {
  .el-tabs__item {
    padding: 10px 35px;
    height: 50px;
    font-size: 16px;
  }
  .el-tabs__item.is-active {
    color: #f68020;
    background: #fff;
    margin-bottom: -2px;
  }
  .el-tabs__nav-scroll {
    background: #fffdfb;
    border-bottom: 1px solid #feecde;
  }
  .el-tab-pane {
    ul {
      padding: 10px 20px 20px 20px;
      li {
        display: inline-block;
        padding: 10px 15px;
        cursor: pointer;
        button {
          border: none;
          font-size: 16px;
          color: #333;
          font-weight: 400;
          padding: 10px 15px;
        }
      }
    }
  }
}

.select-input {
  div {
    .el-input--small .el-input__inner {
      height: 40px;
    }
  }
}
.tree_left {
  .el-tree-node__content {
    height: 40px;
    border-bottom: 1px dotted #ddd;
  }
}
.selectsort {
  .alreadyselect {
    li {
      .el-input {
        display: inline-block;
        width: 50px;
      }
      .el-input--small .el-input__inner {
        height: 20px;
      }
      .el-input__inner {
        padding: 0px;
      }
    }
  }
}
.pagination-container {
  text-align: center;
}
</style>
