/**
 * @file chart-data.js
 * 只进行图表的数据处理
 * @author yangyoucun
 *
 */

/* eslint-disable no-var,fecs-valid-var-jsdoc,fecs-prefer-destructure,fecs-prefer-class,fecs-prefer-assign-pattern,prefer-rest-params,fecs-use-property-shorthand */
// eslint-disable-next-line no-undef
define(function(require) {
  var _ = require('lodash')

  // 兼容性
  Array.isArray = Array.isArray || _.isArray

  var getSplitData = function getSplitData(str) {
    return str && typeof str === 'string' ? str.split(' ') : []
  }

  var toFixed = function toFixed(number, precision) {
    var power = Math.pow(10, precision)
    return (Math.round(number * power) / power).toFixed(precision)
  }

  var formatTradeNum = function formatTradeNum(num) {
    var unit = num.substr(num.length - 1, 1)
    if (unit === '亿') {
      num = num.slice(0, -1)
      num = +num
      num *= 100000000
    }
    if (unit === '万') {
      num = num.slice(0, -1)
      num = +num
      num *= 10000
    }
    return Math.round(num)
  }

  var formatPrice = function formatPrice(price, fixed) {
    var text = price
    var num = Number(price)
    if (!isNaN(num)) {
      if (num >= 1e4) {
        text = (num / 1e4).toFixed(2) + '万'
      } else {
        text = num.toFixed(fixed) + ''
      }
      if (num >= 1e8) {
        text = (num / 1e8).toFixed(2) + '亿'
      }
    }
    return text
  }

  var STOCK_STATUS = {
    up: 'up',
    down: 'down',
    same: 'same'
  }

  /**
     * StockInfo
     * @class
     * @param {Object} info 数据
     */
  var StockInfo = function(info) {
    this.date = null
    this.percent = null
    this.status = null
    this.num = null
    this.textPrice = ''
    this.source = Array.isArray(info) ? info : info.split(',')
  }

  /**
     * StockLineInfo
     * @class
     * @param {Object} info 数据
     */
  var StockLineInfo = function(info, isForeign) {
    StockInfo.call(this, info)
    this.isForeign = isForeign
    this.time = null
    this.price = null
    this.formatData()
  }

  StockLineInfo.prototype.formatData = function() {
    var arr = this.source
    var isForeign = this.isForeign
    var formatPriceFixed = 2
    if (isForeign) {
      formatPriceFixed = 4
    }
    var num = formatTradeNum(arr[5])
    var percent = getSplitData(arr[4])[0]
    var status = STOCK_STATUS.up
    if (percent.indexOf('-') >= 0) {
      status = STOCK_STATUS.down
    }
    this.time = arr[0]
    this.date = arr[2]
    this.percent = percent
    this.status = status
    this.price = +arr[1]
    this.textPrice = formatPrice(+arr[1], formatPriceFixed)
    this.num = num
    this.sourceNum = arr[5]
  }

  /**
     * StockKInfo
     * @class
     * @param {Object} info 数据
     */
  var StockKInfo = function(info) {
    StockInfo.call(this, info)
    this.start = null
    this.end = null
    this.max = null
    this.min = null
    this.ma5 = null
    this.ma10 = null
    this.ma20 = null
    this.turnOverRatio = ''
    this.formatData()
  }

  StockKInfo.prototype.formatData = function() {
    var arr = this.source
    var status = STOCK_STATUS.up
    var percent = arr[9]
    var turnOverRatio = arr[10]
    if (percent.indexOf('-') >= 0) {
      status = STOCK_STATUS.down
    }
    this.date = arr[0]
    this.start = +arr[1]
    this.end = +arr[4]
    this.max = +arr[2]
    this.min = +arr[3]
    this.sourceNum = arr[5]
    this.num = formatTradeNum(arr[5])
    this.percent = percent
    this.ma5 = arr[6] && !isNaN(arr[6]) ? +arr[6] : '--'
    this.ma10 = arr[7] && !isNaN(arr[7]) ? +arr[7] : '--'
    this.ma20 = arr[8] && !isNaN(arr[8]) ? +arr[8] : '--'
    this.status = status

    if (turnOverRatio && turnOverRatio.indexOf('%') === -1) {
      turnOverRatio = turnOverRatio + '%'
    }
    if (turnOverRatio && turnOverRatio === '%') {
      turnOverRatio = '--'
    }
    this.turnOverRatio = turnOverRatio || '--'
  }

  /**
     * ChartData
     * @class
     * @param {boolean} isK 是否是K线
     * @param {Object} data 数据
     * @param {Object} isForeign 是否外汇
     */
  var ChartData = function(isK, data, isForeign) {
    this.nodes = []
    this.max = 0
    this.min = 0
    this.isK = isK
    this.handleData(isK, data, isForeign)
  }

  var fn = ChartData.prototype

  fn.handleData = function(isK, data, isForeign) {
    if (!data || !data.p) {
      this.nodes = []
      return
    }
    var pArr = data.p.split(';')
    var pLen = pArr.length
    var pointsNode = []

    for (var i = 0; i < pLen; i++) {
      var point = pArr[i]
      var arr = point.split(',')
      if (!arr[0] || !arr[1]) {
        continue
      }
      if (isK) {
        pointsNode.push(new StockKInfo(arr))
      } else {
        // 外汇格式中arr[2] => 当前日期
        // 外汇分时数据存在第一个数据元后面的数据元日期缺失,使用第一个数据元日期补充策略
        if (isForeign && i > 0 && !arr[2]) {
          arr[2] = pArr[0].split(',')[2]
        }
        // 外汇格式中arr[5] => 当前价格
        // 外汇k线数据元当前价格带着颜色需要分离
        if (isForeign && arr[5]) {
          arr[5] = arr[5].split(' ')[0]
          if (Number(arr[5]) < 0 && arr[4].indexOf('-') < 0) {
            arr[4] = '-' + arr[4]
          }
        }
        pointsNode.push(new StockLineInfo(arr, isForeign))
      }
    }
    this.nodes = pointsNode
  }

  // const {ma5, ma10} = getDataListOf('ma5', 'ma10');
  fn.getDataListOf = function() {
    var argLen = arguments.length
    var params = Array(argLen)
    for (var key = 0; key < argLen; key++) {
      params[key] = arguments[key]
    }

    var output = {}
    params.forEach(function(param) {
      output[param] = []
    })
    this.nodes.forEach(function(node) {
      params.forEach(function(param) {
        if (param in node) {
          output[param].push(node[param])
        }
      })
    })
    return output
  }

  // 获取K线数据 包括：start、end、max、min
  fn.getKData = function() {
    return this.nodes.map(function(node) {
      return {
        start: node.start,
        end: node.end,
        max: node.max,
        min: node.min,
        status: node.status
      }
    })
  }

  fn.getXAxisData = function(xArr, opt) {
    var nodes = this.nodes
    opt = opt || { auto: false }
    var xIsArray = Array.isArray(xArr)
    if (xIsArray && !opt.auto) {
      if (xArr.length === 5) {
        return [xArr[0], xArr[2], xArr[4]]
      }
      if (xArr.length === 2) {
        return xArr
      }
    } else {
      return [nodes[0].time, nodes[nodes.length - 1].time]
    }
  }

  fn.createVirtualYAxis = function(avg, fixed) {
    var step = 0.01
    return [1, 1, 1, 1, 1].map(function(item, index) {
      var val = -(index - 2) * step
      return {
        num: (val + avg).toFixed(fixed),
        per: (val / avg * 100).toFixed(fixed) + '%'
      }
    })
  }

  fn.getYAxisData = function(yArr, opt) {
    var that = this
    var nodes = this.nodes
    var gap
    var maxY
    var minY
    var middle
    var yMaxData = []

    opt = opt || {
      middle: 0,
      yFixed: 2
    }
    var yFixed = opt.yFixed || 2
    nodes.forEach(function(node) {
      if (that.isK) {
        yMaxData.push(node.max, node.min)
      } else {
        yMaxData.push(node.price)
      }
    })

    maxY = Math.max.apply(null, yMaxData)
    minY = Math.min.apply(null, yMaxData)

    if (that.isK) {
      gap = (maxY - minY) / 4
      middle = (maxY + minY) / 2
    } else if (opt.average) {
      var average = +opt.average
      var gap1 = Math.abs(maxY - average)
      var gap2 = Math.abs(minY - average)
      gap = Math.max(gap1, gap2) / 2
      middle = average
    } else {
      gap = (maxY - minY) / 4
      middle = (maxY + minY) / 2
    }

    var yAxisData = []
    var num
    var per

    if ((maxY === minY && maxY === opt.average) || !nodes.length) {
      yAxisData = this.createVirtualYAxis(opt.average, yFixed)
    } else {
      for (var i = 0; i < 5; i++) {
        num = middle + (2 - i) * gap
        per = toFixed(100 * (num / middle - 1), yFixed) + '%'
        num = toFixed(num, yFixed)
        yAxisData[i] = { num: num, per: per }
      }
    }
    return yAxisData
  }

  return ChartData
})
