# 分页

参数属性详情可查看 [element-ui upload](https://element.eleme.cn/#/zh-CN/component/upload)

# Props

| 参数 | 说明 | 类型 | 可选值 | 必填 | 默认值 |
| ------ | ------ | ------ | ------ | ------ | ------ |
| option | 接收配置参数 | Object | - | true | - |

<style lang="scss">
table th:first-child,table td:first-child{
  width:170px;
}
table th:nth-child(2),table td:nth-child(2){
  width:400px;
}
</style>

# Option

| 参数 | 说明 | 类型 | 可选值 | 必填 | 默认值 |
| ------ | ------ | ------ | ------ | ------ | ------ |
| type | 文件上传样式类型（非el-upload所需） | String | - | - | - |
| fileList | 已上传文件列表  <br> eg: { name : sdf , url : src , fileId : 123 , uid : 1345 , status : 'success' } | Array | - | true | [ ] |
| listType | 文件列表展示类型 | String | text/picture/picture-card | - | picture-card |
| multiple | 上传文件时是否允许多选 | Boolean | - | - | fasle |
| limit | 允许上传数量 | Number | - | - | 1 |
| messageErrorNumber | 超出最大允许上传数量提示 | String | - | - | '您已超出最大允许上传数量' |
| autoUpload | 是否自动上传 | Boolean | - | - | true |
| drag | 是否启用拖拽 <br> 注：启用拖拽后父层调用位置 最小预留高度200px | Boolean | - | - | false |
| accept | 文件允许类型格式 | String | 图片文件格式: 'image/jpeg,image/gif,image/png,image/bmp,image/tiff,application/x-shockwave-flash,image/svg+xml'<br>视频文件格式: 'video/mp4,video/x-flv,video/quicktime,video/x-ms-wmv,video/x-ms-asf,video/3gpp,video/avi,video/x-matroska'<br>音频文件格式: 'audio/mp3,audio/wav,audio/aiff,audio/basic,audio/mpeg,audio/mid,'<br>安卓安装包: 'application/vnd.android.package-archive'<br>压缩包格式： 'application/x-zip-compressed,application/x-tar'<br>文档格式： 'application/pdf,application/msword,application/<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;vnd.openxmlformats-officedocument.wordprocessingml.document,application<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel' | - | 'image/jpg,image/jpeg,image/gif,image/png,image/bmp,' |
| fileSize | 文件大小(MB) | String | - | - | 5 |
| messageErrorFormat | 文件格式错误提示 | String | - | - | '文件格式不正确，请选择正确格式文件' |
| uploadUrl | 文件上传地址 | String | - | - | - |
| name | 上传对应字段名称 | String | - | - | - |
| uploadHeader | 文件上传请求头 | Object | - | - | - |
| fileCategory | 文件类型(API所需) | Number | [<br>&nbsp;&nbsp;&nbsp;&nbsp; 0 :JudgmentDocument 裁判文书, <br>&nbsp;&nbsp;&nbsp;&nbsp; 1：AgentWord 代理词， <br>&nbsp;&nbsp;&nbsp;&nbsp; 2：OtherCaseFile 案件其他材料,<br>&nbsp;&nbsp;&nbsp;&nbsp;3：Avatar 头像,<br>&nbsp;&nbsp;&nbsp;&nbsp;4：LawyerLicence 律师执业证,<br>] | true | null |
| tip | 提示文本 | String | - | - | '只能上传jpg/png/bmp/gif文件' |
| messageSuccess | 文件上传成功提示 | String | - | - | '文件上传成功' |

# Events

| 方法明 | 说明 | 回调参数 |
| ------ | ------ | ------ |
| change | 文件列表发生改动时触发 | function ( fileList ) |