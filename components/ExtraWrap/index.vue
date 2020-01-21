<template>
  <div>
    <ul :style="`top:${top}px;bottom:${bottom}px;left:${left}px;right:${right}px`" class="extra-wrap">
      <li v-if="showPlugins.indexOf('catalog')>-1">
        <el-image :src="catalog"/>
        <div class="describe">
          目录
          <div class="catalog">
            <p>案件目录 </p>
            <el-timeline class="catalog-timeline">
              <el-timeline-item
                v-for="(item, index) in catalogData"
                :key="index" >
                <a :href="`#${item.id}`">{{ item.title }}</a>
              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
      </li>
      <li v-if="showPlugins.indexOf('share')>-1">
        <el-image :src="share"/>
        <div class="describe" @click="visible=true">分享</div>
      </li>
      <li v-if="showPlugins.indexOf('collection')>-1">
        <el-image :src="inColection ? collections : collection"/>
        <div class="describe" @click="doCollection">收藏</div>
      </li>
      <li v-if="showPlugins.indexOf('qrcode')>-1">
        <el-image :src="qrcodeicon"/>
        <div class="describe">
          二维码
          <div class="qrcode">
            <img :src="qrimg">
          </div>
        </div>
      </li>
      <li v-if="showPlugins.indexOf('error')>-1">
        <el-image :src="error"/>
        <div class="describe"><nuxt-link to="/help/error">纠错</nuxt-link></div>
      </li>
      <li v-if="showPlugins.indexOf('download')>-1">
        <el-image :src="download"/>
        <div class="describe" @click="doDownload">下载</div>
      </li>
      <li v-if="showPlugins.indexOf('totop')>-1">
        <el-image :src="totop"/>
        <div class="describe" @click="backTop">返回<br>顶部</div>
      </li>
    </ul>
    <el-dialog :visible.sync="visible" top="35vh" width="400px" title="分享">
      <div class="share">
        <el-input v-model="url" size="mini"/>
        <div>
          <el-button size="mini" icon="el-icon-share" @click="copy">分享</el-button>
        </div>
        <img :src="qrimg">
      </div>
    </el-dialog>
  </div>
</template>

<script>
import catalog from '@/assets/layout/catalog.png'
import collection from '@/assets/layout/collection.png'
import collections from '@/assets/layout/collections.png'
import download from '@/assets/layout/download.png'
import error from '@/assets/layout/error.png'
import qrcodeicon from '@/assets/layout/qrcode.png'
import totop from '@/assets/layout/totop.png'
import share from '@/assets/layout/share.png'
import QRCode from 'qrcode'
export default {
  name: 'ExtraWrap',
  components: {
  },
  props: {
    plugins: {
      type: [String, Array],
      default: 'catalog,collection,download,error,qrcode,totop,share'
    },
    inColection: {
      type: Boolean,
      default: false
    },
    top: {
      type: Number,
      default: 0
    },
    left: {
      type: Number,
      default: 0
    },
    right: {
      type: Number,
      default: 0
    },
    bottom: {
      type: Number,
      default: 0
    },
    catalogData: {
      type: Array,
      default: () => {}
    },
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
      catalog,
      collection,
      collections,
      download,
      error,
      qrcodeicon,
      totop,
      share,
      showPlugins: '',
      qrimg: '',
      url: '',
      visible: false
    }
  },
  watch: {
    plugins: {
      immediate: true,
      deep: true,
      handler(val) {
        this.showPlugins = val
      }
    },
    router: () => {
      this.getQrcode()
    }
  },
  created() {
  },
  mounted() {
    this.url = window.location.href
    this.getQrcode()
  },
  methods: {
    backTop() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      const timer = setTimeout(() => {
        const ispeed = Math.floor(-scrollTop / 5)
        document.documentElement.scrollTop = document.body.scrollTop = scrollTop + ispeed
        if (scrollTop === 0) {
          clearTimeout(timer)
        } else {
          this.backTop()
        }
      }, 16)
    },
    getQrcode() {
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
    },
    doCollection() {
      this.$emit('collection')
    },
    doDownload() {
      this.$emit('download')
    }
  }
}
</script>

<style lang='scss' scoped>
.extra-wrap{
  width:50px;
  position:fixed;
  >li{
    width:50px;
    height:50px;
    line-height:50px;
    font-size:16px;
    color:#fff;
    text-align:center;
    background-color:#626262;
    margin-bottom:2px;
    .describe{
      height:50px;
      display:none;
      position: relative;
      >a{
        color: #fff;
        display: block;
        height: 50px;
        line-height: 50px;
      }
    }
    &:last-child{
      line-height:25px;
    }
    &:hover{
      cursor:pointer;
      >.el-image{
        display:none;
      }
      .describe{
        display:block;
        background-color:#f68020;
      }
      .describe{
        /* 二维码 */
        .qrcode{
          width: 80px;
          height: 80px;
          position:absolute;
          top: -15px;
          left: 55px;
          background-color: #000;
          img{
            width: 80px;
            height: 80px;
          }
        }
        /* 目录 */
        .catalog{
          width: 220px;
          position:absolute;
          top:0;
          left:50px;
          background-color:#fff;
          padding: 20px;
          color: #666;
          text-align: left;
          line-height: normal;
          border:1px solid rgba(246,128,32,.25);
          box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.2);
          p{
            font-size: 16px;
            border-bottom: 1px dotted #e1e1e1;
            padding: 10px;
            margin-bottom: 10px;
          }
        }
      }
    }
  }
}

/* 分享 */
.share{
  div{
    margin-top: 5px;
    text-align: right;
  }
  img{
    width: 100px;
  }
}

</style>
<style lang="scss">
.catalog-timeline{
  &.el-timeline{
    margin-left: 10px;
    padding-top:15px;
    .el-timeline-item{
      padding-bottom: 5px;
    }
    .el-timeline-item__tail{
      border-width: 1px;
    }
    .el-timeline-item__node--normal{
      left: 2px;
      width:6px;
      height: 6px;
    }
    .el-timeline-item__wrapper{
      top: -7px;
    }
    .el-timeline-item__content{
      a{
        color: #666
      }
    }
  }
}
</style>
