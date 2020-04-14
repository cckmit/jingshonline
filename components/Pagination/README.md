# 分页


# Props

| 参数 | 说明 | 类型 | 可选值 | 必填 | 默认值 |
| ------ | ------ | ------ | ------ | ------ | ------ |
| total | 总条数 | Number | - | true | - |
| page | 当前页码 | Number | - | - | 1 |
| limt | 每页条数 | Number | - | - | 20 |
| pageSizes | 每页显示个数选择器的选项设置 | Array < Number > | - | - | [10, 20, 30, 50] |
| layout | 组件布局 | String | - | - | 'total, sizes, prev, pager, next, jumper' |
| background | 是否为分页按钮添加背景色 | Boolean | - | - | false |
| hidden | 是否显示分页 | Boolean | - | - | false |

# Events

| 方法明 | 说明 | 回调参数 |
| ------ | ------ | ------ |
| pagination | page、limt 改变时触发 | function ( { page , limt } ) |