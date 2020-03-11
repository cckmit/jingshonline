<template>
  <el-row :gutter="20">
    <el-col :span="24">
      <el-breadcrumb separator-class="el-icon-minus" class="breadcrumb title">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>查找律师</el-breadcrumb-item>
      </el-breadcrumb>
      <el-row class="bgf tabselect">
        <el-col :span="24">
          <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="诉讼领域" name="first">
              <ul>
                <li v-for="items in suitsData" :key="items.id">
                  <span
                    v-if="items.children.length === 0"
                    @click="practice(items.id, items.name)"
                  >
                    {{ items.name }}
                  </span>
                  <el-popover v-else placement="top-start" trigger="hover">
                    <ul class="tabinfo">
                      <li
                        v-for="(item, index) in items.children"
                        :key="index"
                        @click="practice(item.id, item.name)"
                      >
                        {{ item.name }}
                      </li>
                    </ul>
                    <el-button
                      slot="reference"
                      @click="practice(items.id, items.name)"
                    >{{ items.name }}</el-button
                    >
                  </el-popover>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="非诉领域" name="second">
              <ul>
                <li v-for="items in NosuitsData" :key="items.id">
                  <span
                    v-if="items.children.length === 0"
                    @click="practice(items.id, items.name)"
                  >
                    {{ items.name }}
                  </span>
                  <el-popover v-else placement="top-start" trigger="hover">
                    <ul class="tabinfo">
                      <li
                        v-for="(item, index) in items.children"
                        :key="index"
                        @click="practice(item.id, item.name)"
                      >
                        {{ item.name }}
                      </li>
                    </ul>
                    <el-button
                      slot="reference"
                      @click="practice(items.id, items.name)"
                    >{{ items.name }}</el-button
                    >
                  </el-popover>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="擅长行业" name="third">
              <ul>
                <li v-for="items in industryData" :key="items.id">
                  <span
                    v-if="items.children.length === 0"
                    @click="industry(items.id, items.name)"
                  >
                    {{ items.name }}
                  </span>
                  <el-popover v-else placement="top-start" trigger="hover">
                    <ul class="tabinfo">
                      <li
                        v-for="(item, index) in items.children"
                        :key="index"
                        @click="industry(item.id, item.name)"
                      >
                        {{ item.name }}
                      </li>
                    </ul>
                    <el-button
                      slot="reference"
                      @click="industry(items.id, items.name)"
                    >{{ items.name }}</el-button
                    >
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
          <el-input
            v-model="lawyerSearch.lawyerName"
            size="small"
            clearable
            placeholder="请输入所要查询的律师姓名"
          />
          <img
            src="../../assets/lawyer/search.png"
            alt=""
            @click="selectname"
          >
        </div>
      </div>
      <div class="bgf tree_left">
        <p>城市</p>
        <el-tree
          v-if="regionData.length!==0"
          ref="tree2"
          :data="regionData"
          :props="defaultProps"
          :indent="24"
          :highlight-current="true"
          :filter-node-method="filterNode"
          node-key="id"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          @node-click="region"
        >
          <div slot-scope="{ node }" class="tree_tools">
            <span>{{ node.data.name }}</span>
          </div>
        </el-tree>
        <span v-else class="emptyData">暂无数据</span>
      </div>
      <div class="bgf tree_left">
        <p>律所</p>
        <ul v-if="lawfirmData.length!==0">
          <li
            v-for="(items, index) in lawfirmData"
            :key="index"
            @click="lawfirm(items)"
          >
            {{ items.name }}
          </li>
        </ul>
        <span v-else class="emptyData">暂无数据</span>
      </div>
    </el-col>
    <el-col :span="18">
      <div class="bgf selectend">
        <div class="selecttab">
          <span>筛选条件：</span>
          <ul class="alreadyselect">
            <!-- <li v-for="(items,index) in selectData" :key="index"><span>{{ items.name }}</span><small @click="selectdelete(items)"><i class="fa fa-times"/></small></li> -->
            <li
              v-for="items in selectData.industry"
              v-show="selectData.industry !== []"
              :key="items.id"
            >
              <span>{{ items.name }}</span>
              <small @click="selectdelete('industry', items)">
                <i class="fa fa-times" />
              </small>
            </li>
            <li
              v-for="items in selectData.practice"
              v-show="selectData.practice !== []"
              :key="items.id"
            >
              <span>{{ items.name }}</span>
              <small @click="selectdelete('practice', items)">
                <i class="fa fa-times" />
              </small>
            </li>
            <li
              v-for="items in selectData.region"
              v-show="selectData.region !== []"
              :key="items.id"
            >
              <span>{{ items.name }}</span>
              <small @click="selectdelete('region', items)">
                <i class="fa fa-times" />
              </small>
            </li>
            <li
              v-for="items in selectData.lawfirm"
              v-show="selectData.lawfirm !== []"
              :key="items.id"
            >
              <span>{{ items.name }}</span>
              <small @click="selectdelete('lawfirm', items)">
                <i class="fa fa-times" />
              </small>
            </li>
            <li
              v-for="items in selectData.lawyerName"
              v-show="selectData.lawyerName !== []"
              :key="items.id"
            >
              <span>{{ items.name }}</span>
              <small @click="selectdelete('lawyerName', items)">
                <i class="fa fa-times" />
              </small>
            </li>
          </ul>
          <p @click="selectempty">
            <img src="../../assets/lawyer/empty.png" alt="" >
            <span>清空筛选条件</span>
          </p>
        </div>
        <div class="selectsort">
          <ul class="alreadyselect">
            <li :class="sortactive" @click="sortselect">
              <span>默认排序</span>
            </li>
            <li :class="caseactive" @click="caseselect">
              <span>案例总数</span>
            </li>
            <li>
              <b>年限</b>
              <el-input
                v-model="lawyerSearch.littlePracticeYears"
                size="small"
                @input="selectlittleyears"
              />&nbsp;&nbsp;-&nbsp;
              <el-input
                v-model="lawyerSearch.largePracticeYears"
                size="small"
                @input="selectlargeyears"
              />&nbsp;&nbsp;年
            </li>
          </ul>
          <p>
            当前条件共找到
            <b>{{ totalCount }}</b
            >个结果
          </p>
        </div>
      </div>
      <ul class="lawyerlist">
        <li v-for="(items,index) in lawyerData" :key="index">
          <nuxt-link :to="'/lawyer/'+items.id+'/info'">
            <div :style="items.isRecommend ? `background:url(${authIcon}) top right no-repeat` : ''" class="lawyer">
              <div class="avatar">
                <div>
                  <div>
                    <img :src="items.avatar" alt="" >
                    <span>部门主任</span>
                  </div>
                </div>
              </div>
              <div class="info">
                <div class="name">
                  {{ items.name }}<small>律师</small>
                </div>
                <el-row>
                  <el-col :span="8" class="base">
                    <div><i class="iconfont icontriangle-arrow-r"/>基础信息&nbsp;<i class="iconfont icondian1" />&nbsp;<span>INFORMATION</span></div>
                    <el-form label-width="80px" label-position="right">
                      <el-form-item label="执业年限">{{ items.practiceYears }}年</el-form-item>
                      <el-form-item label="案例总数">{{ items.caseCount }}例</el-form-item>
                      <el-form-item label="所在律所">{{ items.lawfirmName }}</el-form-item>
                      <el-form-item label="所在地址">{{ items.regionName }}</el-form-item>
                    </el-form>
                  </el-col>
                  <el-col :span="8" class="practice">
                    <div><i class="iconfont icontriangle-arrow-r"/>专业领域&nbsp;<i class="iconfont icondian1" />&nbsp;<span>EXPERTISE</span></div>
                    <el-form>
                      <el-form-item v-for="item in items.skilfulPracticeAreas" :key="item.id">
                        {{ item.name }}
                      </el-form-item>
                    </el-form>
                  </el-col>
                  <el-col :span="8" class="other">
                    <el-form label-position="top" class="time">
                      <el-form-item label="更新时间:">{{ dayjs(items.updateTime).format('YYYY-MM-DD') }}</el-form-item>
                    </el-form>
                    <el-form>
                      <el-form-item :label="`浏览：${items.clickCount}`"/>
                      <el-form-item :label="`关注：${items.followerCount}`"/>
                    </el-form>
                    <div :style="items.isFollow ? 'background:#f68020;color:#fff;' : ''" @click="collection(items)">
                      <img v-if="!items.isFollow" :src="collectionIcon" alt="">
                      {{ !items.isFollow ? '收藏' : '已收藏' }}
                    </div>
                    <div @click="share(items.id)">
                      <img :src="shareIcon" alt=""> 分享
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </nuxt-link>
        </li>
      </ul>
      <el-dialog :visible.sync="visible" top="35vh" width="400px" title="分享">
        <div class="share">
          <div>
            <el-input v-model="url" size="mini"/>
            <el-button size="mini" icon="el-icon-share" @click="copy">复制链接</el-button>
          </div>
          <img :src="qrimg">
        </div>
      </el-dialog>
      <Pagination
        v-show="totalCount > 0"
        :total="totalCount"
        :page="lawyerSearch.pageIndex"
        :limit="lawyerSearch.pageCount"
        @pagination="handlePageChange"
      />
    </el-col>
  </el-row>
</template>

<script>
import authIcon from '@/assets/lawyer/lawyer_auth.png'
import shareIcon from '@/assets/lawyer/share.png'
import collectionIcon from '@/assets/lawyer/collection.png'
import Pagination from '../../components/Pagination/index'
import { mapActions } from 'vuex'
import setting from '@/plugins/setting'
import axios from 'axios'
import QRCode from 'qrcode'
export default {
  layout: 'lawyer',
  name: 'Lawyer',
  transition: {
    name: 'test',
    mode: 'out-in'
  },
  components: {
    Pagination
  },
  async asyncData({ params }) {
    const [lawyerData, suitsData, NosuitsData, industryData, regionData, lawfirmData] = await Promise.all([
      axios.post(
        `${process.env.baseUrl}/${setting.apiPrefix}/customer/lawyer/query`,
        { query: { pageCount: 10, pageIndex: 1, lawyerName: '', lawfirmId: '', practiceAreaId: '', industryId: '', sorting: 'points', sortType: 0, regionId: '', littlePracticeYears: 0, largePracticeYears: 0 }},
        { 'Content-Type': 'application/json' }
      ),
      axios.get(
        `${process.env.baseUrl}/${setting.apiPrefix}/practicearea/tree/1`,
        { 'Content-Type': 'application/json' }
      ),
      axios.get(
        `${process.env.baseUrl}/${setting.apiPrefix}/practicearea/tree/2`,
        { 'Content-Type': 'application/json' }
      ),
      axios.get(
        `${process.env.baseUrl}/${setting.apiPrefix}/industry/tree`,
        { 'Content-Type': 'application/json' }
      ),
      axios.get(
        `${process.env.baseUrl}/${setting.apiPrefix}/region/tree`,
        { 'Content-Type': 'application/json' }
      ),
      axios.post(
        `${process.env.baseUrl}/${setting.apiPrefix}/lawfirm/list`,
        { query: {}},
        { 'Content-Type': 'application/json' }
      )
    ])
    return {
      lawyerData: lawyerData.data.data.items,
      suitsData: suitsData.data.data[0].children, // .data[0].children,
      NosuitsData: NosuitsData.data.data[0].children, // .data[0].children,
      industryData: industryData.data.data,
      regionData: regionData.data.data,
      lawfirmData: lawfirmData.data.data
    }
  },
  props: {
    copySuccessMessage: {
      type: String,
      default: '连接地址复制成功'
    },
    copyErrorMessage: {
      type: String,
      default: '复制失败'
    }
  },
  data() {
    return {
      authIcon,
      shareIcon,
      collectionIcon,
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
        sorting: 'points', // 排序
        sortType: 0,
        regionId: '', // 律师所属地区
        littlePracticeYears: '', // 执业年限小值
        largePracticeYears: '' // 执业年限大值
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
      },
      lawfirmsearch: {
        // name: '',
        // regionId: 0,
        // creditCode: '',
        // lawfirmType: 0
      },
      searchtimelittle: '', // 输入框时间
      searchtimelarge: '',
      littlesettime: '', // 定时器
      largesettime: '',
      visible: false, // 分享弹框
      url: '', // 分享链接
      qrimg: '' // 二维码
    }
  },
  computed: {},

  watch: {},
  mounted() {
    // this.getLawyer()
    // this.getLawfirmData()
  },

  methods: {
    ...mapActions('lawyer', ['GetLawyerList', 'LawyerCollecte', 'LawyerUnCollecte']),
    ...mapActions('practice', [
      'getPracticeTreeData',
      'getPracticesuitsData',
      'getPracticeNosuitsData'
    ]),
    ...mapActions('industry', ['getIndustryTreeData']),
    ...mapActions('lawfirm', ['getLawfirm']),
    ...mapActions('region', ['getRegionTreeData']),
    getPractice() {
      // 获取领域
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
    getIndustry() {
      // 获取行业
      this.getIndustryTreeData().then(res => {
        this.industryData = res
        console.log(this.industryData)
      })
    },
    getLawfirmData() {
      // 获取律所
      this.getLawfirm({
        ...this.lawfirmsearch
      }).then(res => {
        this.lawfirmData = res
      })
    },
    getRegion() {
      // 获取地区
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
      this.GetLawyerList({
        ...this.lawyerSearch
      }).then(res => {
        this.lawyerData = res.items
        this.totalCount = res.totalCount
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
      this.multiple('region', { id: data.id, name: '所在城市：' + data.fullName })
    },
    lawfirm(data) {
      this.lawyerSearch.lawfirmId = data.id
      this.multiple('lawfirm', { id: data.id, name: '所属律所：' + data.name })
    },
    selectname() {
      this.multiple('lawyerName', {
        id: 0,
        name: '姓名：' + this.lawyerSearch.lawyerName
      })
    },
    multiple(type, data) {
      // 添加筛选方法
      // 多选
      // const hasthis = this.selectData[type].indexOf(data.id) > -1 && this.selectData.indexOf(data.name) > -1
      // hasthis ? '' : this.selectData[type].push(data)
      // 单选
      this.selectData[type] = [data]
      // 更新数据
      this.getLawyer()
    },
    selectdelete(type, data) {
      // 删除筛选方法
      // 多选
      // for (var i = 0; i < this.selectData[type].length; i++) {
      //   if (this.selectData[type][i].id === data.id && this.selectData[type][i].name === data.name) {
      //     this.selectData[type].splice([i], 1)
      //   }
      // }
      // 单选
      this.selectData[type] = []
      // 删除请求中筛选值
      this.deleteData(type)
      // 更新数据
      this.getLawyer()
    },
    deleteData(type) {
      if (type === 'industry') {
        this.lawyerSearch.industryId = ''
      }
      if (type === 'practice') {
        this.lawyerSearch.practiceAreaId = ''
      }
      if (type === 'region') {
        this.lawyerSearch.regionId = ''
      }
      if (type === 'lawfirm') {
        this.lawyerSearch.lawfirmId = ''
      }
      if (type === 'lawyerName') {
        this.lawyerSearch.lawyerName = ''
      }
    },
    selectempty() {
      // 清空筛选条件
      this.selectData = []
      this.lawyerSearch.practiceAreaId = ''
      this.lawyerSearch.lawfirmId = ''
      this.lawyerSearch.regionId = ''
      this.lawyerSearch.industryId = ''
      this.lawyerSearch.littlePracticeYears = 0
      this.lawyerSearch.largePracticeYears = 0
      this.lawyerSearch.lawyerName = ''
      // 重新请求数据
      this.getLawyer()
    },
    sortselect() {
      // 默认排序
      if (this.sortactive === '') {
        this.sortactive = 'active'
        this.caseactive = ''
        this.lawyerSearch.sorting = 'points'
      } else {
        this.sortactive = ''
        this.lawyerSearch.sorting = ''
      }
      // 重新请求数据
      this.getLawyer()
    },
    caseselect() {
      // 按照案例数排序
      if (this.caseactive === '') {
        this.caseactive = 'active'
        this.sortactive = ''
        this.lawyerSearch.sorting = 'conditioncasecount'
      } else {
        this.caseactive = ''
        this.lawyerSearch.sorting = ''
      }
      // 重新请求数据
      this.getLawyer()
    },
    selectlittleyears() {
      this.searchtimelittle = new Date().getTime()
      this.timelittle()
    },
    selectlargeyears() {
      this.searchtimelarge = new Date().getTime()
      this.timelarge()
    },
    timelittle() {
      const _this = this
      this.littlesettime = setTimeout(function() {
        var x = new Date().getTime() - this.searchtimelittle
        if (x < 490) {
          clearInterval(this.littlesettime)
        } else {
          _this.getLawyer()
        }
      }, 500)
    },
    timelarge() {
      const _this = this
      this.largesettime = setTimeout(function() {
        var x = new Date().getTime() - this.searchtimelarge
        if (x < 490) {
          clearInterval(this.largesettime)
        } else {
          _this.getLawyer()
        }
      }, 500)
    },
    collection(data) { // 收藏
      // 判断是否登录
      event.preventDefault()
      console.log(data.id)
      if (!data.isFollow) {
        this.LawyerCollecte(data.id).then(res => {
          this.$notify({
            message: `收藏律师 : ` + data.name,
            duration: 2000
          })
        })
      } else {
        this.LawyerUnCollecte(data.id).then(res => {
          this.$notify({
            message: `取消收藏 : ` + data.name,
            duration: 2000
          })
        })
      }
      this.getLawyer()
    },
    share(id) {
      // 分享
      event.preventDefault()
      this.visible = true
      this.url = window.location.href + '/' + id + '/list'
      // 生成二维码
      this.getQrcode()
    },
    getQrcode() {
      console.log(this.url)
      QRCode.toDataURL(this.url, { width: '200', errorCorrectionLevel: 'H' }).then(url => {
        this.qrimg = url
      })
    },
    copy() {
      this.$copyText(this.url).then(e => {
        this.$notify({
          message: this.copySuccessMessage,
          type: 'success'
        })
        console.log(e)
      }).catch(error => {
        this.$notify({
          message: this.copyErrorMessage,
          type: 'error'
        })
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
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
      cursor: pointer;
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
        background: url("../../assets/lawyer/sortdefault.png") no-repeat 70px
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
        background: url("../../assets/lawyer/sort.png") no-repeat 70px 6px;
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
    }
  }
  .lawyer{
    padding: 3px;
    position: relative;
    height: auto;
    .avatar{
      width: 240px;
      position: absolute;
      height: calc(100% - 6px);
      display: table;
      >div{
        display: table-cell;
        vertical-align: middle;
        div{
          position: relative;
          span{
            position: absolute;
            bottom: 0;
            right: 0;
            padding: 5px 15px;
            color: #fff;
            background: rgba(0,0,0,.7);
          }
        }
      }
      img{
        width: 240px;
        height: 240px;
        display: block;
      }
    }
    .info{
      margin-left: 270px;
      .name{
        height: 24px;
        line-height: 24px;
        font-size: 24px;
        margin: 25px 0 15px 0;
        color: #333;
        small{
          font-size: 14px;
          margin-left: 10px;
        }
      }
      .el-col-8{
        padding: 10px  25px 0 30px;
        border-right: 1px dashed rgba(0,0,0,0.1);
        min-height: 166px;
        margin-bottom: 10px;
        display: table-cell;
        &:first-child{
          padding-left: 0;
        }
        &:last-child{
          padding-right: 0;
          border-right: none;
        }
        >div{
          color: #f68020;
          margin-bottom: 15px;
          span{
            color: #999;
          }
        }
      }
      .el-form{
        .el-form-item{
          margin-bottom: 10px;
        }
      }
      .practice{
        .el-form-item{
          display: inline-block;
          margin-right: 20px;
        }
      }
      .other{
        >div{
          padding: 3px 9px;
          float: left;
          margin-right: 10px;
          color: #666;
          border: 1px solid #ddd;
          border-radius: 3px;
          font-size: 12px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.lawyerlist{
  .el-form{
    .el-form-item__label,.el-form-item__content{
      line-height: 20px;
    }
    .el-form-item__label{
      color: #999;
    }
    .el-form-item__content{
      color: #333;
    }
  }
  .time{
    .el-form-item__content{
      color: #f68020;
    }
  }
}
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
  .emptyData{
    padding: 10px 15px;
    display: inline-block;
    color: #999;
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
  margin: 40px 0px;
}
</style>
