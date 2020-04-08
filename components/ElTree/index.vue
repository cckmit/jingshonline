<template>
  <el-select
    :value="TreeSelectData.valueTitle"
    :clearable="TreeSelectOptions.clearable"
    :filterable="TreeSelectOptions.filterable"
    :filter-method="filterQuery"
    @clear="clearHandle"
    @visible-change="selectBlur"
  >
    <el-option :value="TreeSelectData.valueTitle" :label="TreeSelectData.valueTitle" class="options">
      <el-tree
        id="tree-option"
        ref="selectTree"
        :accordion="TreeSelectOptions.accordion"
        :data="TreeSelectData.TreeData"
        :props="TreeSelectOptions.props"
        :node-key="TreeSelectOptions.props.value"
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
          // 提示文本
          placeholder: {
            type: String,
            default: () => { return '检索关键字' }
          },
          // 是否可搜索
          filterable: {
            type: Boolean,
            default: () => { return false }
          }
        }
      }
    }
  },
  data() {
    return {
      TreeSelectData: {
        valueId: null, // 初始值
        valueTitle: '',
        TreeData: this.TreeSelectOptions.options
      },
      TreeSelectfilterText: ''
    }
  },
  watch: {
    'TreeSelectOptions.value': {
      handler(val) {
        this.TreeSelectData.valueId = val
      },
      immediate: true
    },
    TreeSelectfilterText(val) {
      this.$refs.selectTree.filter(val)
    }

  },
  mounted() {
  },
  methods: {
    // 切换选项
    handleNodeClick(node) {
      this.TreeSelectData.valueTitle = node[this.TreeSelectOptions.props.label]
      this.TreeSelectData.valueId = node[this.TreeSelectOptions.props.value]
      this.$emit('getValue', this.TreeSelectData.valueId)
    },
    // 清除选中
    clearHandle() {
      this.TreeSelectfilterText = ''
      this.TreeSelectData.valueTitle = ''
      this.TreeSelectData.valueId = null
      this.clearSelected()
      this.$emit('getValue', null)
    },
    // 未选择任何条件
    selectBlur() {
      if (!this.TreeSelectData.valueId) {
        this.TreeSelectfilterText = ''
      }
    },
    /* 清空选中样式 */
    clearSelected() {
      const allNode = document.querySelectorAll('#tree-option .el-tree-node')
      allNode.forEach((element) => element.classList.remove('is-current'))
    },
    filterQuery(val) {
      this.TreeSelectfilterText = val
    },
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    }
  }
}
</script>

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
    color: #F68020;
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

