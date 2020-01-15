<template>
  <el-row :gutter="20" style="background:#eee;">
    <el-col :span="24">
      <el-breadcrumb separator-class="el-icon-minus" class="breadcrumb title">
        <el-breadcrumb-item :to="{path:'/'}" >首页</el-breadcrumb-item>
        <el-breadcrumb-item >查找律师</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- <div class="title">首页<b>&nbsp;●&nbsp;查找律师</b></div> -->
      <el-row class="bgf tabselect">
        <el-col :span="24">
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="诉讼领域" name="first">
              <ul>
                <li>合同纠纷</li>
                <li>合同纠纷</li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="非诉领域" name="second">
              <ul>
                <li>公司事务</li>
                <li>公司事务</li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="擅长行业" name="third">
              <ul>
                <li>刑事案件</li>
                <li>刑事案件</li>
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
          <el-input size="small" clearable placeholder="请输入所要查询的律师姓名"/>
          <img src="../../assets/lawyer/search.png" alt="">
        </div>
      </div>
      <div class="bgf tree_left">
        <p>城市</p>
        <el-tree
          v-loading="loading"
          ref="tree2"
          :data="regionData"
          :props="defaultProps"
          :indent="24"
          :highlight-current="true"
          :filter-node-method="filterNode"
          node-key="id"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
        />
      </div>
      <div class="bgf tree_left">
        <p>律所</p>
        <el-tree
          v-loading="loading"
          ref="tree3"
          :data="lawfirmData"
          :props="defaultProps"
          :indent="24"
          :highlight-current="true"
          :filter-node-method="filterNode"
          node-key="id"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
        />
      </div>
    </el-col>
    <el-col :span="18">
      <div class="bgf selectend">
        <div class="selecttab">
          <span>筛选条件：</span>
          <ul class="alreadyselect">
            <li><span>婚姻继承</span><small><i class="fa fa-times"/></small></li>
            <li><span>交通物流</span><small><i class="fa fa-times"/></small></li>
          </ul>
          <p>
            <img src="../../assets/lawyer/empty.png" alt="">
            <span>清空筛选条件</span>
          </p>
        </div>
        <div class="selectsort">
          <ul class="alreadyselect">
            <li class="active"><span>默认排序</span><img src="../../assets/lawyer/sort.png" alt=""></li>
            <li><span>案例总数</span><img src="../../assets/lawyer/sort.png" alt=""></li>
            <li>
              <span>年限</span>
              <el-input size="small" clearable />&nbsp;&nbsp;--&nbsp;
              <!-- <text>&nbsp;--&nbsp;</text> -->
              <el-input size="small" clearable />&nbsp;&nbsp;年
              <!-- <text>&nbsp;&nbsp;年</text> -->
            </li>
          </ul>
          <p>
            当前条件共找到<b>355</b>个结果
          </p>
        </div>
      </div>
      <ul class="lawyerlist">
        <li>
          <a href="">
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
                    <div><img src="../../assets/lawyer/collection.png" alt="">收藏</div>
                    <div><img src="../../assets/lawyer/share.png" alt="">分享</div>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </li>
        <li>
          <a href="">
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
                    <div><img src="../../assets/lawyer/collection.png" alt="">收藏</div>
                    <div><img src="../../assets/lawyer/share.png" alt="">分享</div>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </li>
      </ul>
      <Pagination v-show="totalCount>0" :total="totalCount" :page="lawyerSearch.pageIndex" :limit="lawyerSearch.pageCount" @pagination="handlePageChange" />
    </el-col>
  </el-row>
</template>

<script>
import Pagination from '../../components/Pagination/index'
export default {
  layout: 'lawyer',
  name: 'Lawyer',
  components: {
    Pagination
  },

  data() {
    return {
      loading: false,
      activeName: 'first',
      tabsearchData: [],
      regionData: [],
      lawfirmData: [],
      lawyerSearch: {
        pageCount: 10,
        pageIndex: 1
      },
      totalCount: 10,
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },

  watch: {
  },

  mounted() {

  },

  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    // 分页切换
    handlePageChange(val) {
      this.lawyerSearch.pageIndex = val.page
      this.lawyerSearch.pageCount = val.limit
      this.getLawyer()
    },
    getLawyer() {

    }
  }
}
</script>

<style lang='scss'>
.title{
  height:60px;
  font-size: 14px;
  padding:35px;
  color:#999;
  b{
    color: #666;
  }
}
.tabselect{
  .el-tabs__item{
    padding: 10px 35px;
    height: 50px;
    font-size: 16px;
  }
  .el-tabs__item.is-active{
    color:#f68020;
    background:#fff;
    margin-bottom: -2px;
  }
  .el-tabs__nav-scroll{
    background: #fffdfb;
    border-bottom: 1px solid #feecde;
  }
  .el-tab-pane{
    ul{
      padding: 10px 20px 20px 20px;
      li{
        display: inline-block;
        padding: 10px 15px;
        cursor: pointer;
      }
    }
  }
}
ul{
  padding: 0px;
  li{
    list-style: none;
  }
}
.bgf{
  background: #fff;
}
.select-input{
  padding: 10px 20px;
  margin: 18px 0px;
  background: #fff;
  p{
    font-size: 18px;
    padding:20px 10px 15px 10px;
    border-bottom: 1px dotted #ddd;
  }
  div{
    overflow: hidden;
    .el-input{
      float: left;
      width:215px;
      margin: 20px 0px;
    }
    .el-input--small .el-input__inner{
      height:40px;
    }
    img{
      float: left;
      margin: 20px 0px;
    }
  }
}
.tree_left{
  padding: 20px;
  margin-bottom:20px;
  p{
    border-bottom: 1px dotted #ddd;
    font-size: 18px;
    padding: 10px;
  }
}
.selectend{
  margin: 20px 0px;
  padding: 0px 25px;
  .selecttab{
    padding: 20px 0px 15px 0px;
    overflow: hidden;
    border-bottom: 1px dotted #ddd;
    >span{
      color:#999;
      float: left;
    }
    .alreadyselect{
      float: left;
      li{
        display: inline-block;
        margin: 0px 10px;
        >span{
          color:#333;
          margin-right: 5px;
        }
        small{
          display: inline-block;
          width:17px;
          height:17px;
          text-align: center;
          background: #d0d0d0;
          color:#fff;
          cursor: pointer;
        }
      }
      .active{
        color:#f68020;
      }
    }
    >p{
      float: right;
      cursor: pointer;
      span{
        color:#666;
      }
    }
  }

}
.selectsort{
    padding: 20px 0px 15px 0px;
    overflow: hidden;
  .alreadyselect{
    float: left;
    li{
        display: inline-block;
        margin: 0px 10px;
        >span{
          color:#333;
          margin-right: 8px;
          cursor: pointer;
        }
        .el-input{
          display: inline-block;
          width:50px;
        }
        .el-input--small .el-input__inner{
          height:20px;
        }
        text{
          display: inline-block;
        }
      }
      .active{
        >span{
          color:#f68020;
        }
      }
  }
  >p{
    float: right;
    font-size: 15px;
    b{
      color:#de2121;
    }
  }
}
.lawyerlist{
  margin: 20px 0px;
  li{
    margin-bottom: 20px;
    background: #fff;
    a{
      display: block;
      overflow: hidden;
      text-decoration: none;
      position: relative;
      >img{
        position: absolute;
        right:0px;
        top:0px;
      }
      >.lawyerlist_lf{
        width:25%;
        float: left;
        position: relative;
        >img{
          width:100%;
        }
        >span{
          background:#000;
          opacity: 0.7;
          position: absolute;
          bottom:0px;
          right:0px;
          display: inline-block;
          padding: 5px 15px;
          color:#fff;
        }
      }
      .lawyerlist_rt{
        float: left;
        width:74%;
        padding: 30px 0px;
        color:#333;
        >b{
          font-size: 15px;
          font-weight: 400;
          padding-left: 20px;
          >span{
            font-size: 24px;
            display: inline-block;
            padding-right:10px;
          }
        }
        >div{
          width:100%;
          overflow: hidden;
          >div{
            width:40%;
            float: left;
            padding: 0px 10px;
            p{
              padding-top: 30px;
              font-size: 16px;
              img{
                margin-right: 5px;
              }
              b{
                color: #f68020;
                font-weight: 400;
              }
              span{
                color: #999;
              }
            }
            ul{
              padding: 0px 15px;
              li{
                margin: 10px 0px;
                font-size: 14px;
                span{
                  color:#999;
                }
                b{
                  margin-left: 15px;
                  font-weight: 400;
                }
              }
            }
          }
          .lawyerlist_mid{
            width:30%;
            border-left: 1px dotted #ddd;
            border-right: 1px dotted #ddd;
            ul{
              padding: 0px 20px;
            }
          }
          .lawyerlist_action{
            padding: 0px 30px;
            width:30%;
            min-height: 185px;
            float: left;
            >span{
              display: block;
              padding-top: 30px;
              color:#999;
            }
            >b{
              display: block;
              color: #f68020;
              font-size: 16px;
              padding: 5px 0px;
              font-weight: 400;
            }
            p{
              margin: 0px;
              padding: 5px 0px;
              color:#999;
              font-size: 14px;
            }
            >div{
              display: block;
              padding: 5px 0px;
              div{
                display: inline-block;
                border:1px solid #ddd;
                border-radius: 3px;
                padding: 0px 8px;
                font-size: 14px;
                color:#999;
                img{
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
.pagination-container{
  text-align: center;
}
</style>
