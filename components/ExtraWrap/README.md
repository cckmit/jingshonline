# 侧边栏-工具箱

此组件包含功能：分享、收藏、当前页面分享二维码、纠错、下载、返回顶部、案件目录

可在不调用任何组件时，直接通过传入 shareUrl\shareVisible 等调用分享弹窗

# Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ------ | ------ | ------ | ------ |
| plugins | 组件启用功能 | String\Array | catalog/collection/download/error/qrcode/totop/share | catalog/collection/download/error/qrcode/totop/share |
| inColection | 是否已收藏 | Boolean | - | false |
| top | 距离顶部位置 | String | - | - |
| left | 距离左侧位置 | String | - | - |
| boottom | 距离底部位置 | String | - | - |
| right | 距离右侧位置 | String | - | - |
| catalogData | 案件目录。 eg: [ { id : 'maodian' , title : '案件标题' } ]  | Array | - | - |
| copySuccessMessage | 分享按钮，连接复制成功提示文本 | String | - | 连接地址复制成功 |
| copyErrorMessage | 分享按钮，连接复制失败提示文本 | String | - | 连接地址复制失败 |
| shareUrl | 分享地址 | String | - | - |
| shareVisible | 分享弹窗 | Boolean | - | false |

# Events

| 方法明 | 说明 | - |
| ------ | ------ | ------ |
| doCollection | 收藏，回调父组件收藏方法 | - |
| doDownload | 下载，回调父组件下载方法 | - |
| shareClose | 分享弹窗关闭，回调父组件分享方法 | - |