<template>
  <div style="width:1380px;margin:auto;min-height:1000px">
    <el-row class="case">
      <el-breadcrumb separator-class="el-icon-minus" class="breadcrumb title">
        <el-breadcrumb-item :to="{path:'/'}" >首页</el-breadcrumb-item>
        <el-breadcrumb-item >查找案例</el-breadcrumb-item>
      </el-breadcrumb>
      <el-col :span="6" class="case-aside">
        <!-- 具体案由 -->
        <div class="case-cause case-border">
          <div class="case-cause-title case-title"> <i class="el-icon-remove"/> 具体案由</div>
          <div class="case-cause-main case-main">
            <el-tree
              :data="caseData"
              :default-expanded-keys="[2]"
              :props="defaultProps"
              node-key="id"/>
          </div>
        </div>
        <!-- 法院等级 -->
        <div class="case-court case-border">
          <div class="case-court-title case-title"><i class="el-icon-circle-plus"/>法院等级</div>
          <div class="case-court-main case-main">
            <el-tree
              :data="caseData"
              :default-expanded-keys="[1]"
              :props="defaultProps"
              node-key="id"/>
          </div>
        </div>
      </el-col>
      <el-col :span="17" :offset="1" class="case-content">
        <div class="case-content-title case-border">
          <div class="case-title case-content-titleTop">
            筛选条件: <span>婚姻继承<i class="el-icon-error"/></span><span>交通/物流<i class="el-icon-error"/></span><span>北京市最高人民法院<i class="el-icon-error"/></span>
            <p style="float:right;text-decoration:underline"> <i class="el-icon-delete"/>清空筛选条件</p>
          </div>

          <div class="case-content-titleBot">
            <span class="case-font-hover"> 默认排序<i class="el-icon-sort"/></span><span style="display: inline-block;width: 1px;height: 12px;background-color: #cccccc;"/><span>裁判日期<i class="el-icon-sort"/></span>
            <p style="float:right">当前条件共找到 <i class="case-font-hover">78437343</i>个结果</p>
          </div>
        </div>
        <div class="case-content-main">
          <ul>
            <li class="case-border case-content-hover" style="position:relative">
              <nuxt-link :to="{path:'/Case/5/info'}">
                <div class="case-content-top">
                  <p>邓维超与重庆市奉节县朱衣镇人民政府关于请求确认行政行为违法案人民政府关于请求确认行人民政府关于请求确认行人民政府关于请求确认行</p>
                  <p>
                    <el-col :span="12" class="case-font-hover"><i class="el-icon-caret-right"/>管辖法院：重庆市第二中级人民法院</el-col>
                    <el-col :span="12"><i class="el-icon-caret-right"/>所属案由：行政征收</el-col>
                    <el-col :span="12"><i class="el-icon-caret-right"/>所属行业：无所属行业</el-col>
                    <el-col :span="12"><i class="el-icon-caret-right"/>所属领域：政府</el-col>
                  </p>
                  <p><span>【法院观点】</span> 本院认为，邓维超起诉称，因飞洋世纪城小区项目建设需占用其房屋和耕地，奉节县朱衣镇人民政府（简称朱衣镇政府）在未办理农用地转用和土地征收手续情况下，强行占用其房屋及耕地，严重侵犯其合法权益，请求确认该府强占土地行为违法.......</p>
                  <p><span>【结果命中】</span>本院认为，邓维超起诉称，因飞洋世纪城小区项目建设需占用其房屋和耕地，奉节县朱衣镇人民政府（简称朱衣镇政府）在未办理农用地转用和土地征收手续情况下，强行占用其房屋及耕地，严重侵犯其合法权益，请求确认该府强占土地行为违法.......</p>
                </div>
              </nuxt-link>
              <div class="case-content-bottom">
                <span><i class="el-icon-star-off case-font-hover"/>收藏</span>
                <span><i class="el-icon-time"/>2016-8-9</span>
                <span>（2015）渝二中法行终字第00085号</span>
              </div>

              <img src="@/assets/case/case-classic.png" alt="" style="border:none;width:100%;max-width:fit-content;position:absolute;top:0;right:0;">
            </li>
            <li class="case-border case-content-hover" style="position:relative">
              <nuxt-link :to="{path:'/Case/:id/info',query:{id:123}}">
                <div class="case-content-top">
                  <p>邓维超与重庆市奉节县朱衣镇人民政府关于请求确认行政行为违法案人民政府关于请求确认行人民政府关于请求确认行人民政府关于请求确认行</p>
                  <p>
                    <el-col :span="12" class="case-font-hover"><i class="el-icon-caret-right"/>管辖法院：重庆市第二中级人民法院</el-col>
                    <el-col :span="12"><i class="el-icon-caret-right"/>所属案由：行政征收</el-col>
                    <el-col :span="12"><i class="el-icon-caret-right"/>所属行业：无所属行业</el-col>
                    <el-col :span="12"><i class="el-icon-caret-right"/>所属领域：政府</el-col>
                  </p>
                  <p><span>【法院观点】</span> 本院认为，邓维超起诉称，因飞洋世纪城小区项目建设需占用其房屋和耕地，奉节县朱衣镇人民政府（简称朱衣镇政府）在未办理农用地转用和土地征收手续情况下，强行占用其房屋及耕地，严重侵犯其合法权益，请求确认该府强占土地行为违法.......</p>
                  <p><span>【结果命中】</span>本院认为，邓维超起诉称，因飞洋世纪城小区项目建设需占用其房屋和耕地，奉节县朱衣镇人民政府（简称朱衣镇政府）在未办理农用地转用和土地征收手续情况下，强行占用其房屋及耕地，严重侵犯其合法权益，请求确认该府强占土地行为违法.......</p>
                </div>
              </nuxt-link>
              <div class="case-content-bottom">
                <span><i class="el-icon-star-off case-font-hover"/>收藏</span>
                <span><i class="el-icon-time"/>2016-8-9</span>
                <span>（2015）渝二中法行终字第00085号</span>
              </div>

              <img src="@/assets/case/case-classic.png" alt="" style="border:none;width:100%;max-width:fit-content;position:absolute;top:0;right:0;">
            </li>
            <li class="case-border case-content-hover">
              <nuxt-link :to="{path:'/Case/:id/info',query:{id:123}}">
                <div class="case-content-top">
                  <p>邓维超与重庆市奉节县朱衣镇人民政府关于请求确认行政行为违法案人民政府关于请求确认行人民政府关于请求确认行人民政府关于请求确认行</p>
                  <p>
                    <el-col :span="12" class="case-font-hover"><i class="el-icon-caret-right"/>管辖法院：重庆市第二中级人民法院</el-col>
                    <el-col :span="12"><i class="el-icon-caret-right"/>所属案由：行政征收</el-col>
                    <el-col :span="12"><i class="el-icon-caret-right"/>所属行业：无所属行业</el-col>
                    <el-col :span="12"><i class="el-icon-caret-right"/>所属领域：政府</el-col>
                  </p>
                  <p><span>【法院观点】</span> 本院认为，邓维超起诉称，因飞洋世纪城小区项目建设需占用其房屋和耕地，奉节县朱衣镇人民政府（简称朱衣镇政府）在未办理农用地转用和土地征收手续情况下，强行占用其房屋及耕地，严重侵犯其合法权益，请求确认该府强占土地行为违法.......</p>
                  <p><span>【结果命中】</span>本院认为，邓维超起诉称，因飞洋世纪城小区项目建设需占用其房屋和耕地，奉节县朱衣镇人民政府（简称朱衣镇政府）在未办理农用地转用和土地征收手续情况下，强行占用其房屋及耕地，严重侵犯其合法权益，请求确认该府强占土地行为违法.......</p>
                </div>
              </nuxt-link>
              <div class="case-content-bottom">
                <span><i class="el-icon-star-off case-font-hover"/>收藏</span>
                <span><i class="el-icon-time"/>2016-8-9</span>
                <span>（2015）渝二中法行终字第00085号</span>
              </div>

            </li>
          </ul>
          <div style="margin 0 auto; margin-top:30px">
            <Pagination v-show="totalCount>0" :total="totalCount" :page="caseSearch.pageIndex" :limit="caseSearch.pageCount" @pagination="handlePageChange" />
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Pagination from '../../components/Pagination/index'
import { mapActions } from 'vuex'
// import setting from '@/plugins/setting'
// import axios from 'axios'
export default {
  layout: 'case',
  head() {
    return {
      title: '案例列表',
      meta: [
        { hid: 'description', name: 'description', content: '京师在线案例列表；jingshonline' }
      ]
    }
  },
  components: {
    Pagination
  },
  data() {
    return {
      totalCount: 0,
      caseData: [
        {
          id: 1,
          label: '民事案由',
          children: [{
            id: 4,
            label: '民事案由',
            children: [{
              id: 13,
              label: '民事案由'
            }, {
              id: 14,
              label: '民事案由'
            }]
          }]
        },
        {
          id: 2,
          label: '刑事案由',
          children: [{
            id: 5,
            label: '公安行政管理',
            children: [{
              id: 13,
              label: '民事案由'
            }, {
              id: 14,
              label: '民事案由'
            }]
          },
          {
            id: 6,
            label: '计划生育行政管理（计划生育）'
          },
          {
            id: 7,
            label: '质量监督检验检疫行政管理'
          },
          {
            id: 8,
            label: '农业行政管理（农业）'
          },
          {
            id: 9,
            label: '交通运输行政管理（交通）'
          },
          {
            id: 10,
            label: '专利行政管理（专利）'
          },
          {
            id: 11,
            label: '财政行政管理（财政）'
          },
          {
            id: 12,
            label: '城市综合执法'
          }]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      caseSearch: {
        pageCount: 10,
        pageIndex: 1
      }
    }
  },
  // async asyncData({ params }) {
  //   const [caseData] = await Promise.all([
  //     axios.get(`http://gateway.dev.jingshonline.net/${setting.apiPrefix}/customer/lawyer/query`, { 'Content-Type': 'application/json' })
  //   ])
  //   return {
  //     lawyerData: caseData.data.items
  //   }
  // },
  mounted() {
    // this.getCase()
  },
  methods: {
    ...mapActions('case', ['getCaseTreeData']),
    getCase() {
      this.getCaseTreeData().then(res => {
        this.caseData = res
        this.$refs.industrySelect.treeDataUpdateFun(res)
      })
    },
    // 分页切换
    handlePageChange(val) {
      this.caseSearch.pageIndex = val.page
      this.caseSearch.pageCount = val.limit
    }
  }
}
</script>

<style lang='scss'>
//本页面公共样式
.case{
  padding:60px 0;
  font-family: MicrosoftYaHei;
i{
  font-style:normal
}
// 左边标题
.case-title{
   height: 65px;
   line-height: 65px;
   border-bottom:1px dotted rgba(217, 217, 217, 0.3);
   font-size: 20px;
   color: #333333;
  }
 //左边树形文字
.case-main{
  .el-tree-node{
    margin-bottom: 10px;
  }
}

   //边框
.case-border{
    border: solid 1px rgba(229, 229, 229, 0.3);
}
  //  已选择
.case-font-hover{
  color: #f68020;
}
.case-content-hover{
border-bottom: 4px solid #f68020
}
.el-icon-circle-plus,.el-icon-remove,.el-icon-delete{
  color: #f68020;
  margin-right: 5px;
}
.el-icon-error,.el-icon-sort{
  margin-left: 5px;
}
.el-icon-star-off,.el-icon-time,.el-icon-caret-right{
  margin-right: 5px;
}
// 树
.case-aside{
.el-tree-node__label{
  font-size: 18px;
}
.el-tree-node__content{
margin-top: 10px;
}
.el-tree-node__children{
  .el-tree-node__label{
  font-size: 16px;

}
.el-tree-node__children{
  .el-tree-node__content{

  .el-tree-node__label{
  font-size: 14px ;
}
}
}

}
  // 具体案由
  .case-cause{
    background-color: #fff;
  padding:0 20px;
	min-height: 200px;
  .case-cause-main{
    padding: 20px 0;
  }
  }
  // 法院等级
  .case-court{
    background-color: #fff;
  padding:0 20px;
  margin-top:20px;
  .case-court-main{
    padding: 20px 0;
  }
  }
}
.case-content{
  .case-content-title{
    background-color: #fff;
    height: 104px;
    padding:0 20px;
    .case-content-titleTop{
      color: #999999;
      letter-spacing: 1px;
      height: 50px;
      line-height: 50px;
      font-size: 14px;
  span{
    color: #666666;
    letter-spacing: 1px;
    margin-left: 30px;
    font-size: 14px;
  }
    }
  .case-content-titleBot{
      color: #666666;
      line-height: 50px;
      font-size: 14px;
  span{
    margin-right: 45px;
  }
    }
  }
.case-content-main{
  margin-top: 16px;
  ul {
    li{
      display: block;
      list-style-type:none;
      width:auto;
      margin:0 auto;
      margin-top: 16px;
	border-bottom: 4px solid rgba(217, 217, 217, 0.3);
  background-color: #fff;
    .case-content-top{
      padding: 30px;
    }
    p{
     color: #333333;
     font-size: 14px;
     line-height: 28px;
     margin-bottom: 20px;
     span{
       display: block
     }
    }
    p:nth-child(1){
      letter-spacing: 1px;
      font-size: 18px;
    }
      p:nth-child(2){
        color: #999999;
        font-size: 14px;
        padding: 0 20px;
    }
      }
    }
    /*鼠标移入样式改变*/
			li:hover {
				border-bottom: 4px solid #f68020
			}
  }
.case-content-bottom{
	height: 29px;
  line-height: 29px;
	background-color: #fbfbfb;
	box-shadow: 0px -1px 0px 0px
		rgba(0, 0, 0, 0.05);
	font-size: 12px;
	color: #666666;
 span{
   float:right;
   margin-right: 20px;
 }
}
}
 }
</style>
