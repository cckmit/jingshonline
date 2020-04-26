<template>
  <div>
    <!-- ↓↓↓↓↓↓↓↓↓↓↓ 勿删！勿删！勿删！勿删！勿删！  没有任何作用且页面不显示。防止  antdv tree-select option 定位跑偏    勿删！勿删！勿删！勿删！勿删！ ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ -->
    <a-tree-select
      :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
      show-search
      allow-clear
      style="width: 100%;display:none;"
      tree-node-filter-prop="title"
      placeholder="请选择"
    />
    <!-- ↑↑↑↑↑↑↑↑↑↑↑ 勿删！勿删！勿删！勿删！勿删！  没有任何作用且页面不显示。防止  antdv tree-select option 定位跑偏    勿删！勿删！勿删！勿删！勿删！ ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ -->
    <el-row :gutter="20">
      <el-col :span="24">
        <el-breadcrumb separator-class="el-icon-minus" class="breadcrumb">
          <el-breadcrumb-item :to="{ path: '/' }">京师在线</el-breadcrumb-item>
          <el-breadcrumb-item>我的关注</el-breadcrumb-item>
          <el-breadcrumb-item>律师列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="6">
        <div class="bgf tree_left">
          <b><img src="../../../assets/usercenter/screen.png" alt="" >条件筛选</b>
          <div class="lawyer-item">
            <p>所在城市</p>
            <img class="lawyer-icon" src="../../../assets/usercenter/industry.png">
            <a-tree-select
              :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
              :tree-data="regionData"
              v-model="lawyerSearch.regionId"
              show-search
              style="width: 100%"
              tree-node-filter-prop="title"
              placeholder="请选择"
            />
          </div>
          <div class="lawyer-item">
            <p>所在律所</p>
            <img class="lawyer-icon" src="../../../assets/usercenter/practice.png">
            <el-select
              v-model="lawyerSearch.lawfirmId"
              size="mini"
              placeholder="请选择"
              filterable
              clearable
              @clear="lawyerSearch.lawfirmId=null"
              @change="getUserLawyerList">
              <el-option v-for="item in lawfirmData" :key="item.id" :label="item.name" :value="item.id"/>
            </el-select>
          </div>
          <div class="lawyer-item">
            <p>擅长行业</p>
            <img class="lawyer-icon" src="../../../assets/usercenter/industry.png">
            <el-select
              v-model="lawyerSearch.industryId"
              size="mini"
              placeholder="请选择"
              filterable
              clearable
              @clear="lawyerSearch.industryId=null"
              @change="getUserLawyerList">
              <el-option v-for="item in industryData" :key="item.id" :label="item.name" :value="item.id"/>
            </el-select>
          </div>
          <div class="lawyer-item">
            <p>专业领域</p>
            <img class="lawyer-icon" src="../../../assets/usercenter/practice.png">
            <a-tree-select
              :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
              :tree-data="lawsuitPracticeTreeData"
              v-model="lawyerSearch.practiceId"
              show-search
              style="width: 100%"
              tree-node-filter-prop="title"
              placeholder="请选择"
            />
          </div>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="bgf selectend">
          <div class="selecttab">
            <p><img src="../../../assets/usercenter/sort.png" alt="" >排序</p>
            <el-select v-model="valueselect" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
            <el-input
              v-model="lawyerSearch.lawyerName"
              clearable
              placeholder="请输入想要查询的律师名称"/>
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
                      <span v-show="items.isDirector">部门主任</span>
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
                        <el-form-item label="更新时间:">{{ items.updateTime }}</el-form-item>
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
        <Pagination
          v-show="totalCount > 0"
          :total="totalCount"
          :page="lawyerSearch.pageIndex"
          :limit="lawyerSearch.pageCount"
          @pagination="handlePageChange"
        />
      </el-col>
      <ExtraWrap :plugins="'error,totop'" :share-url="shareUrl" :top="'350px'" :right="'40px'" :share-visible="sharevisible" @share="shareClose" />
    </el-row>
  </div>
</template>

<script>
import authIcon from '@/assets/lawyer/lawyer_auth.png'
import shareIcon from '@/assets/lawyer/share.png'
import collectionIcon from '@/assets/lawyer/collection.png'
import Pagination from '../../../components/Pagination/index'
import { mapState, mapActions } from 'vuex'
import setting from '@/plugins/setting'
import axios from 'axios'
import ExtraWrap from '@/components/ExtraWrap'
export default {
  layout: 'userCenter',
  name: 'Lawyer',
  transition: {
    name: 'test',
    mode: 'out-in'
  },
  components: {
    Pagination,
    ExtraWrap
  },
  async asyncData({ params }) {
    const [lawyerData] = await Promise.all([
      axios.post(
        `${process.env.baseUrl}/${setting.apiPrefix}/customer/lawyer/query`,
        { query: { pageCount: 10, pageIndex: 1, lawyerName: '', lawfirmId: '', practiceId: '', industryId: '', sorting: 'points', sortType: 0, regionId: '' }},
        { 'Content-Type': 'application/json' }
      )
    ])
    return {
      lawyerData: lawyerData.data.data.items,
      totalCount: lawyerData.data.data.totalCount
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
      options: [
        {
          value: '0',
          label: '按收藏时间排序'
        },
        {
          value: '1',
          label: '按案例总数排序'
        },
        {
          value: '2',
          label: '按关注度排序'
        }
      ],
      valueselect: '0',
      authIcon,
      shareIcon,
      collectionIcon,
      loading: false,
      tabsearchData: [],
      lawyerSearch: {
        pageCount: 10,
        pageIndex: 1,
        lawyerName: '', // 律师姓名
        lawfirmId: '', // 所属律所
        practiceId: '', // 擅长领域
        industryId: '', // 擅长行业
        sorting: 'points', // 排序
        sortType: 0,
        regionId: '' // 律师所属地区
      },
      selectData: {
        industry: [],
        practice: [],
        region: [],
        lawfirm: [],
        lawyerName: []
      }, // 筛选条件数据
      totalCount: 1,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      sharevisible: false, // 分享弹框
      shareUrl: '', // 分享链接
      pointsnum: 1, // 排序计次
      filterText: '', // 城市数据过滤
      lawyerfilterText: ''// 律所数据过滤
    }
  },
  computed: {
    ...mapState({
      lawsuitPracticeTreeData: state => state.practice.PracticeTreeDataForAntd,
      industryData: state => state.industry.industryData,
      regionData: state => state.region.regionTreeDataForAntd,
      lawfirmData: state => state.lawfirm.lawfirmData
    })
  },

  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },
  mounted() {
  },

  methods: {
    ...mapActions('lawyer', ['GetLawyerList', 'LawyerCollecte', 'LawyerUnCollecte']),
    // 获取数据
    getUserLawyerList() {
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
    collection(data) { // 收藏
      // 判断是否登录
      event.preventDefault()
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
      this.getUserLawyerList()
    },
    share(id) {
      // 分享
      event.preventDefault()
      this.sharevisible = true
      this.shareUrl = `${location.origin}/lawyer/${id}/info`
    },
    shareClose() {
      // 分享弹窗关闭事件
      this.sharevisible = false
    }
  }
}
</script>

<style lang="scss">

.title {
  height: 60px;
  font-size: 14px;
  padding: 35px;
  color: #999;
  b {
    color: #666;
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
.tree_left {
  padding: 30px;
  b {
    display: block;
    border-bottom: 1px dotted #ddd;
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 10px;
    padding-bottom: 10px;
    img{
      margin-right: 5px;
      margin-bottom: 5px;
    }
  }
  .lawyer-item{
    p{
      font-size: 12px;
      margin-top: 18px !important;
      margin-bottom: 12px !important;
    }
    img{
      position: absolute;
      z-index: 10;
      margin: 6px;
    }
    .case-icon{
      height: 20px;
      width: 20px;
      margin-right: 6px;
    }
    .el-select{
      width: 100%;
      .el-input__inner{
        padding-left: 30px!important;
      }
    }
    .ant-select{
      width: 100%;
    }
  }
}
.selectend {
  padding: 0px 25px;
  margin-bottom: 20px;
  .selecttab {
    padding: 20px;
    overflow: hidden;
    p{
      float: left;
      font-size: 14px;
      margin-right: 35px!important;
      margin-bottom: 0px;
    }
    .el-select{
      float: left;
      .el-input__inner{
        height:30px;
        line-height: 30px;
      }
    }
    >.el-input{
      float: right;
      width:390px;
      .el-input__inner{
        height:30px;
        line-height: 30px;
      }
    }

  }
}
.selectsort {
  padding: 20px 0px 15px 0px;
  overflow: hidden;
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
.el-popover{
  max-width:400px;
}
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
.pagination-container {
  text-align: center;
  margin: 40px 0px;
}
</style>
