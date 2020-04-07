<template>
  <el-select :value="TreeSelectData.valueTitle" :clearable="TreeSelectOptions.clearable" @clear="TreeSelectOptions.clearHandle">
    <el-option :value="TreeSelectData.valueTitle" :label="TreeSelectData.valueTitle" class="options">
      <el-tree
        id="tree-option"
        ref="selectTree"
        :accordion="TreeSelectOptions.accordion"
        :data="TreeSelectOptions.options"
        :props="TreeSelectOptions.props"
        :node-key="props.value"
        :default-expanded-keys="TreeSelectData.defaultExpandedKey"
        :filter-node-method="filterNode"
        @node-click="handleNodeClick"/>
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'ElTreeSelect',
  props: {
    /* 配置项 */
    TreeSelectOptions: {
      type: Object,
      default: () => {
        return {
          props: {
            type: Object,
            default: () => {
              return {
                value: 'id', // ID字段名
                label: 'title', // 显示名称
                children: 'children' // 子级字段名
              }
            }
          },
          /* 选项列表数据(树形结构的对象数组) */
          options: {
            type: Array,
            default: () => { return [] }
          },
          /* 初始值 */
          value: {
            type: Number,
            default: () => { return null }
          },
          /* 可清空选项 */
          clearable: {
            type: Boolean,
            default: () => { return true }
          },
          /* 自动收起 */
          accordion: {
            type: Boolean,
            default: () => { return false }
          },
          placeholder: {
            type: String,
            default: () => { return '检索关键字' }
          }
        }
      }
    }
  },
  data() {
    return {
      TreeSelectData: {
        filterText: '',
        valueId: this.value, // 初始值
        valueTitle: '',
        defaultExpandedKey: []
      }
    }
  },
  watch: {
    'TreeSelectOptions.value': {
      handler(val) {
        this.TreeSelectData.valueId = val
      },
      immediate: true
    },
    'TreeSelectData.filterText': {
      handler(val) {
        this.$refs.selectTree.filter(val)
      },
      immediate: true
    }
  },
  mounted() {
    this.initHandle()
  },
  methods: {
    // 初始化值
    initHandle() {
      if (this.valueId) {
        this.TreeSelectData.valueTitle = this.$refs.selectTree.getNode(this.TreeSelectData.valueId).data[this.props.label] // 初始化显示
        this.$refs.selectTree.setCurrentKey(this.TreeSelectData.valueId) // 设置默认选中
        this.TreeSelectData.defaultExpandedKey = [this.TreeSelectData.valueId] // 设置默认展开
      }
      this.initScroll()
    },
    // 初始化滚动条
    initScroll() {
      this.$nextTick(() => {
        const scrollWrap = document.querySelectorAll('.el-scrollbar .el-select-dropdown__wrap')[0]
        const scrollBar = document.querySelectorAll('.el-scrollbar .el-scrollbar__bar')
        scrollWrap.style.cssText = 'margin: 0px; max-height: none; overflow: hidden;'
        // eslint-disable-next-line no-return-assign
        scrollBar.forEach(ele => ele.style.width = 0)
      })
    },
    // 切换选项
    handleNodeClick(node) {
      this.TreeSelectData.valueTitle = node[this.props.label]
      this.TreeSelectData.valueId = node[this.props.value]
      this.$emit('getValue', this.TreeSelectData.valueId)
      this.TreeSelectData.defaultExpandedKey = []
    },
    // 清除选中
    clearHandle() {
      this.TreeSelectData.valueTitle = ''
      this.TreeSelectData.valueId = null
      this.TreeSelectData.defaultExpandedKey = []
      this.clearSelected()
      this.$emit('getValue', null)
    },
    /* 清空选中样式 */
    clearSelected() {
      const allNode = document.querySelectorAll('#tree-option .el-tree-node')
      allNode.forEach((element) => element.classList.remove('is-current'))
    },
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-scrollbar .el-scrollbar__view .el-select-dropdown__item{
    height: auto;
    max-height: 274px;
    padding: 0;
    overflow: hidden;
    overflow-y: auto;
  }
  .el-select-dropdown__item.selected{
    font-weight: normal;
  }
  ul li >>>.el-tree .el-tree-node__content{
    height:auto;
    padding: 0 20px;
  }
  .el-tree-node__label{
    font-weight: normal;
  }
  .el-tree >>>.is-current .el-tree-node__label{
    color: #409EFF;
    font-weight: 700;
  }
  .el-tree >>>.is-current .el-tree-node__children .el-tree-node__label{
    color:#606266;
    font-weight: normal;
  }
  .selectInput{
    padding: 0 5px;
    box-sizing: border-box;
  }
</style>

