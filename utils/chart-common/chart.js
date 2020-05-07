/**
 * @file chart.js
 * 绘制金融图表，只绘制，不处理数据逻辑
 * 数据处理通过chart-data.js来完成
 *
 */

/* eslint-disable */
define(function (require) {
    // 高清屏canvas适配
    var hidpiCanvas = require('./lib/hdpiCanvasElement');
    var _ = require('lodash');

    // 兼容性  obj浅拷贝 arr判断是否是数组
    Object.assign = Object.assign || _.assign;
    Array.isArray = Array.isArray || _.isArray;
    // canvas 绘制倍率 高清解析
    var RATIO = hidpiCanvas.ratio;
    // canvas 绘制图形初始值
    var TYPE = {
        line: 'line',
        candlestick: 'candlestick'
    };

    // 坐标轴 X Y 轴默认配置
    var AXIS_DEFAULT = {
        data: [],
        // 最大点数
        maxPoints: 0,
        // 绘制初始样式
        style: {
            align: 'left',
            lineWidth: 1,
            lineColor: '#F5F5F5',
            padding: 8,
            fontSize: 10,
            lineHeight: 27,
            fontColor: '#999',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontFamily: 'Arial,Helvetica,sans-serif'
        }
    };

    // 网格线/绘图区域 默认配置
    var GRID_DEFAULT = {
        width: 0,
        height: 0,
        top: 10,
        left: 0,
        right: 0,
        bottom: 10,
        backgroundColor: '#FFF'
    };

    var SERIES_DEFAULT = {
        type: TYPE.line,
        data: [],
        smooth: false,
        gradient: false,
        itemStyle: {
            upColor: '#F23E3E',
            downColor: '#14C914',
            lineColor: '#3388FF',
            lineWidth: 1,
            gradientStart: 'rgba(51, 136, 255, .18)',
            gradientEnd: 'rgba(51, 136, 255, 0)'
        }
    };
    // canvas 绘图默认配置
    var DEFAULT_OPTION = {
        grid: GRID_DEFAULT,
        xAxis: AXIS_DEFAULT,
        yAxis: AXIS_DEFAULT,
        series: []
    };


    // 最大点数量
    var maxPointsOfContext = 0;
    // 保留小数点
    function toFixed(val, len) {
        var newV = Number(val);
        len = len || 2;
        if (!isNaN(newV)) {
            return newV.toFixed(len);
        }
        return val;
    }

    /**
     * Chart
     * @class
     * @param {Object} options 配置项
     */
    // canvas dom默认配置
    var Chart = function (options) {
        options = options || {};
        this.opt = {};
        this.ctx = null;
        this.canvas = null;
        this.width = 0;
        this.height = 0;
        this.hasK = false;
        this.chartRect = {};
        this.el = options.el;
    };

    var fn = Chart.prototype;
    // 检索配置项是否存在 存在则使用 不存在则默认选项
    fn.checkOptions = function (options) {
        var opt = Object.assign({}, DEFAULT_OPTION, options);
        var grid = Object.assign({}, GRID_DEFAULT, opt.grid);
        var series = opt.series;
        var height = grid.height;

        // check series
        if (Array.isArray(series)) {
            series.map(function (obj) {
                return Object.assign({}, SERIES_DEFAULT, obj);
            });
            opt.series = series;
        }
        else {
            console.error('series must be a Array [options.series].');
            return false;
        }

        // check width and height
        if (height <= 0) {
            console.error('invalid height in [options.grid].');
            return false;
        }

        opt.grid = grid;
        this.opt = opt;
        this.height = height;
        return true;
    };

    fn.getValidWidth = function () {
        if (this.el) {
            var rect = this.el.getBoundingClientRect();
            return rect.width;
        }
        return 0;
    };

    fn.setOption = function (options) {
        if (this.checkOptions(options)) {
            this.createCanvas();
            this.draw();
            this.render();
            this.bindEvent();
        }
    };

    fn.createCanvas = function () {
        var width = this.getValidWidth();
        var canvas = hidpiCanvas.getHdpiCanvas(width, this.height);
        var ctx = hidpiCanvas.getHdpiContext2D(canvas.getContext('2d'));
        var userCanvas = hidpiCanvas.getHdpiCanvas(width, this.height);
        var userCtx = hidpiCanvas.getHdpiContext2D(userCanvas.getContext('2d'));
        ctx.canvas = canvas;
        this.canvas = canvas;
        this.width = width;
        this.ctx = ctx;
        this.userCtx = userCtx;
        this.userCanvas = userCanvas;
    };

    fn.draw = function () {
        var that = this;
        var ctx = this.ctx;
        var opt = this.opt;
        var xAxis = opt.xAxis;
        var yAxis = opt.yAxis;
        var series = opt.series;

        if (!ctx) {
            return;
        }

        if (!Array.isArray(series)) {
            series = [series];
        }

        // 坐标轴
        this.drawAxis(xAxis, yAxis);

        // 重置上下文最大点数量
        maxPointsOfContext = xAxis.maxPoints;

        // 是否有K线，如果有K线，均线起始点将对准K线中线
        series.forEach(function (pieceData) {
            if (pieceData.type === TYPE.candlestick) {
                that.hasK = true;
            }
        });

        // 根据不同类型做图
        series.forEach(function (pieceData) {
            if (pieceData.type === TYPE.line) {
                that.drawLine(pieceData);
            }
            else if (pieceData.type === TYPE.candlestick) {
                that.drawCandlestick(pieceData);
            }
        });

        // 清除图表上下多出内容
        var rect = this.chartRect;
        ctx.clearRect(rect.xS, 0, rect.wid, rect.yS);
        ctx.clearRect(rect.xS, rect.yE, rect.wid, rect.hei);

        // 绘制x坐标
        this.drawXLabel(xAxis.data);
    };

    fn.render = function () {
        if (this.el) {
            var that = this;
            var old = this.el.querySelectorAll('canvas');
            if (old && old.length) {
                // NodeList to Array
                old = Array.prototype.slice.call(old);
                old.forEach(function (oldCanvas) {
                    that.el.removeChild(oldCanvas);
                });
            }
            this.el.appendChild(this.canvas);
            this.el.appendChild(this.userCanvas);
        }
    };
    // 设置canvas字体样式
    fn._setFontStyle = function (ctx, curStyle) {
        var va = 'normal';
        var st = curStyle.fontStyle;
        var we = curStyle.fontWeight;
        var fa = curStyle.fontFamily;
        var si = curStyle.fontSize * RATIO + 'px';
        var lh = curStyle.lineHeight * RATIO + 'px';
        ctx.font = st + ' ' + we + ' ' + va + ' ' + si + '/' + lh + ' ' + fa;
        ctx.fillStyle = curStyle.fontColor;
        ctx.textAlign = curStyle.align;
        ctx.textBaseline = 'middle';
    };
    
    fn.drawAxis = function (xAxis, yAxis) {
        var ctx = this.ctx;
        var xData = xAxis.data;
        var yData = yAxis.data;
        var curYStyle = Object.assign(AXIS_DEFAULT.style, yAxis.style);
        var curXStyle = Object.assign(AXIS_DEFAULT.style, xAxis.style);
        var gridOpt = this.opt.grid;
        var top = gridOpt.top;
        var left = gridOpt.left;
        var right = gridOpt.right;

        var pad = curYStyle.padding;
        var lh = curYStyle.lineHeight;

        var ld = [];
        var rd = [];
        var lw = 0;
        var rw = 0;

        if (yData.left || yData.right) {
            ld = yData.left ? yData.left : [];
            rd = yData.right ? yData.right : [];
        }
        else {
            ld = yData;
        }

        if (ld.length) {
            lw = ctx.measureText(ld[0]).width;
        }
        if (rd.length) {
            rw = ctx.measureText(rd[rd.length - 1]).width;
        }

        var padL = ld.length ? pad : 0;
        var padR = rd.length ? pad : 0;
        var lTextStart = left;
        var chartXStart = lTextStart + lw + padL;
        var rTextStart = this.width - rw - right;
        var chartWidth = rTextStart - padR - chartXStart;
        var chartXEnd = chartXStart + chartWidth;
        var chartHight = (ld.length - 1) * lh;
        var chartRect = {
            xS: chartXStart,
            xE: chartXEnd,
            wid: chartWidth,
            yS: top,
            yE: top + chartHight,
            hei: chartHight
        };

        // 绘图区域坐标
        this.chartRect = chartRect;
        this.xStyle = curXStyle;
        this.yStyle = curYStyle;
        this.drawYLabel(ld, rd, lTextStart - left, rTextStart - left);

        // 绘制参考线
        var py;
        for (var i = 0; i < ld.length; i++) {
            py = this.getY(ld[i]) + top;
            ctx.beginPath();
            ctx.moveTo(chartXStart - left, py);
            ctx.lineTo(chartXEnd, py);
            ctx.strokeStyle = curYStyle.lineColor;
            ctx.lineWidth = curYStyle.lineWidth;
            ctx.stroke();
            ctx.closePath();
        }
    };

    fn.drawXLabel = function (data) {
        if (!data) {
            return;
        }
        var ctx = this.ctx;
        var rect = this.chartRect;
        var style = this.xStyle;
        var len = data.length;
        var pad = style.padding;
        var end = rect.yS + rect.yE + pad;
        this._setFontStyle(ctx, style);
        if (len >= 2) {
            ctx.fillText(data[0], rect.xS, end);
            ctx.save();
            ctx.textAlign = 'end';
            ctx.fillText(data[len - 1], rect.xE, end);
            ctx.restore();
            if (len % 2) {
                var center = data[Math.floor(len / 2)];
                ctx.save();
                ctx.textAlign = 'center';
                ctx.fillText(center, rect.xS + rect.wid / 2, end);
                ctx.restore();
            }
        }
    };

    fn.drawYLabel = function (ld, rd, lTextStart, rTextStart, lh) {
        var ctx = this.ctx;
        var rect = this.chartRect;
        var style = this.yStyle;
        this._setFontStyle(ctx, style);
        if (ld.length) {
            ld.forEach(function (y, i) {
                return ctx.fillText(y, lTextStart, i * style.lineHeight + rect.yS);
            });
        }
        if (rd.length) {
            rd.forEach(function (y, i) {
                return ctx.fillText(y, rTextStart, i * style.lineHeight + rect.yS);
            });
        }
    };

    // 折线
    fn.drawLine = function (pieceData) {
        var data = pieceData.data;
        var style = pieceData.itemStyle;
        var length = data.length;
        var rect = this.chartRect;
        var ctx = this.ctx;

        var gap;
        var px;
        var py;
        var lg;
        var isInPath = false;
        var bottom = this.getY(0);

        if (this.hasK) {
            gap = rect.wid / maxPointsOfContext;
        }
        else {
            gap = rect.wid / (maxPointsOfContext - 1);
        }

        ctx.save();
        ctx.translate(rect.xS, rect.yS);
        ctx.strokeStyle = style.lineColor;
        ctx.lineWidth = style.lineWidth;

        // draw line
        for (var i = 0; i < length; i++) {
            if (this.hasK) {
                px = i * gap + gap / 2 - 1;
            }
            else {
                px = i * gap;
            }
            py = this.getY(data[i]);

            if (isInPath) {
                if (py === bottom) {
                    isInPath = false;
                    ctx.stroke();
                }
                else {
                    ctx.lineTo(px, py);
                }
            }
            else {
                if (py === bottom) {
                    isInPath = false;
                }
                else {
                    isInPath = true;
                    ctx.beginPath();
                    ctx.moveTo(px, py);
                }
            }
        }

        // smooth
        if (pieceData.smooth) {
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
        }

        if (isInPath) {
            ctx.stroke();
        }

        // gradient
        if (pieceData.gradient) {
            ctx.strokeStyle = 'rgba(0, 0, 0, 0)';
            ctx.lineWidth = 0;
            ctx.lineTo(px, rect.hei);
            ctx.lineTo(0, rect.hei);
            ctx.lineTo(0, py);
            ctx.stroke();
            lg = ctx.createLinearGradient(0, 0, 0, rect.hei);
            lg.addColorStop(0, style.gradientStart);
            lg.addColorStop(1, style.gradientEnd);
            ctx.fillStyle = lg;
            ctx.fill();
        }

        ctx.closePath();
        ctx.restore();
    };

    // 烛台效果
    fn.drawCandlestick = function (pieceData) {
        var dataK = pieceData.data;
        var style = pieceData.itemStyle;
        var length = dataK.length;
        var rect = this.chartRect;
        var gap = rect.wid / maxPointsOfContext;
        var ctx = this.ctx;

        ctx.save();
        ctx.translate(rect.xS, rect.yS);

        for (var i = 0; i < length; i++) {
            var data = dataK[i];
            var startY = this.getY(data.start);
            var endY = this.getY(data.end);
            var maxY = this.getY(data.max);
            var minY = this.getY(data.min);
            var startX = i * gap;
            var status = data.status;

            /* 柱状 */
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(startX + gap - 2, startY);
            if (startY !== endY) {
                ctx.lineTo(startX + gap - 2, endY);
                ctx.lineTo(startX, endY);
            }
            else {
                ctx.strokeStyle = style[status + 'Color'];
                ctx.stroke();
            }
            ctx.fillStyle = style[status + 'Color'];
            ctx.fill();
            ctx.closePath();

            /* K线上影线、下影线 */
            ctx.beginPath();
            ctx.moveTo(startX + gap / 2 - 1, maxY);
            ctx.lineTo(startX + gap / 2 - 1, minY);
            ctx.strokeStyle = style[status + 'Color'];
            ctx.stroke();
            ctx.closePath();
        }
        ctx.restore();
        this.kGap = gap;
    };

    // 计算y值坐标
    fn.getY = function (y) {
        var yArr = this.opt.yAxis.data;
        if (yArr.left) {
            yArr = yArr.left;
        }
        var max = yArr[0];
        var min = yArr[yArr.length - 1];
        var pos = this.chartRect.hei / (max - min) * (max - y);
        return Math.round(pos);
    };

    fn.clearCanvas = function () {
        this.ctx.clearRect(0, 0, this.width, this.height);
    };

    fn.resetCanvas = function () {
        var width = this.getValidWidth();
        var transiton = 'width 1s cubic-bezier(0.4, 0, 0.2, 1) 0s';
        this.clearCanvas();
        this.canvas.style.transition = transiton;
        this.canvas.style.webkitTransition = transiton;
        this.canvas.style.width = width + 'px';
        this.canvas.width = width * RATIO;
        this.width = width;
    };

    fn._getUserObj = function (point, canvasRect) {
        var chartRect = this.chartRect;
        var maxp = this.opt.xAxis.maxPoints;
        var realX = point.pageX - chartRect.xS - canvasRect.left;
        var realY = point.pageY - chartRect.yS - canvasRect.top - window.pageYOffset;

        if (realX >= 0
            && realX <= chartRect.wid
            && realY >= 0
            && realY && realY <= chartRect.hei
        ) {
            var index = Math.round(maxp / chartRect.wid * realX);
            var x = realX;

            if (this.hasK) {
                x = index * this.kGap + 2;
            }
            return {
                index: index,
                x: x + chartRect.xS,
                y: realY + chartRect.yS,
                canvasW: canvasRect.width,
                canvasH: canvasRect.height
            };
        }

        return null;
    };

    fn._drawUserFeedback = function (obj) {
        var ctx = this.userCtx;
        var chartRect = this.chartRect;
        var series = this.opt.series;
        var style = this.xStyle;
        var data = series[0].data;
        var cur = data[obj.index];
        var y = obj.y;
        var pad = style ? style.padding ? style.padding : 0 : 0;
        var radius = 3;

        var ldata;
        var rdata;
        var lCur;
        var rCur;
        var hasL = false;
        var hasR = false;

        var fontP = 2;

        if (!cur) {
            return;
        }

        if (this.opt.yAxis && this.opt.yAxis.data) {
            if (Array.isArray(this.opt.yAxis.data)) {
                ldata = this.opt.yAxis.data;
                rdata = null;
            }
            if ('left' in this.opt.yAxis.data) {
                ldata = this.opt.yAxis.data.left;
                rdata = this.opt.yAxis.data.right;
            }
            if (ldata && ldata.length) {
                hasL = true;
            }
            if (rdata && rdata.length) {
                hasR = true;
            }
        }

        if (hasL) {
            lCur = (chartRect.hei - (y - chartRect.yS)) / chartRect.hei * (ldata[0] - ldata[4]) + Number(ldata[4]);
            if (lCur) {
                lCur = lCur.toFixed(2);
            }
            if (hasR) {
                var temp = ((lCur - ldata[2]) / ldata[2]) * 100;
                rCur = temp ? temp.toFixed(2) + '%' : '';
            }
        }

        // 绘制虚线与焦点
        ctx.save();
        ctx.clearRect(0, 0, obj.canvasW, obj.canvasH);
        ctx.beginPath();
        ctx.moveTo(chartRect.xS, y);
        ctx.lineTo(chartRect.xE, y);
        ctx.moveTo(obj.x, chartRect.yS);
        ctx.lineTo(obj.x, chartRect.yE);
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#cecece';
        ctx.setLineDash([8, 6]);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(obj.x, y, radius, 0, Math.PI * 2, false);
        ctx.fillStyle = '#cecece';
        ctx.fill();
        ctx.closePath();

        // 绘制两侧文本
        if (hasL) {
            if (style) {
                this._setFontStyle(ctx, style);
            }
            ctx.fillStyle = '#f1f1f1';
            ctx.fillRect(
                0,
                y - style.fontSize * .5 - fontP,
                chartRect.xS,
                style.fontSize + fontP * 2
            );
            ctx.fillStyle = '#000';
            ctx.fillText(lCur, pad / 2, y);
            if (hasR) {
                ctx.fillStyle = '#f1f1f1';
                ctx.fillRect(
                    chartRect.xE,
                    y - style.fontSize / 2 - fontP,
                    obj.canvasW - chartRect.xE,
                    style.fontSize + fontP * 2
                );
                ctx.fillStyle = '#000';
                ctx.fillText(rCur, chartRect.xE + pad, y);
            }
        }

        ctx.restore();
    };

    fn.bindEvent = function () {
        var that = this;
        var canvas = this.userCanvas;
        var canvasRect = null;
        var originX = 0;
        var originY = 0;
        var timer = null;
        var tapLimit = 300;
        var longTap = false;

        if (!canvas) {
            return;
        }

        function onTouchMove (e) {
            clearTimeout(timer);
            if (!canvasRect) {
                canvasRect = canvas.getBoundingClientRect();
            }
            if (longTap && e.touches && e.touches[0]) {
                preventDefault(e);
                var x = e.touches[0].pageX;
                var y = e.touches[0].pageY;
                var obj = that._getUserObj(e.touches[0], canvasRect);
                if (obj) {
                    that._drawUserFeedback(obj);
                    if (that.opt && that.opt.onTouch && typeof that.opt.onTouch === 'function') {
                        that.opt.onTouch.call(that, 'move', obj.index);
                    }
                }
            }
        }

        function onTouchEnd (e) {
            longTap = false;
            clearTimeout(timer);
            if (canvasRect) {
                that.userCtx.clearRect(0, 0, canvasRect.width, canvasRect.height);
                if (that.opt && that.opt.onTouch && typeof that.opt.onTouch === 'function') {
                    that.opt.onTouch.call(that, 'end', -1);
                }
            }
            that.el.removeEventListener('touchmove', onTouchMove, false);
            that.el.removeEventListener('touchend', onTouchEnd, false);
            that.el.removeEventListener('touchcancel', onTouchEnd, false);
        }

        function preventDefault(e) {
            e.preventDefault();
        }

        function onTouchStart(obj) {
            longTap = true;
            that._drawUserFeedback(obj);
            if (
                that.opt
                && that.opt.onTouch
                && typeof that.opt.onTouch === 'function'
            ) {
                that.opt.onTouch.call(that, 'start', obj.index);
            }
        }

        window.addEventListener('orientationchange', function (e) {
            setTimeout(function () {
                that.resetCanvas();
                that.draw();
            }, 200);
        });

        that.el.addEventListener('touchstart', function (e) {
            if (e.touches && e.touches[0]) {
                originX = e.touches[0].pageX;
                originY = e.touches[0].pageY;
                canvasRect = canvas.getBoundingClientRect();
                var obj = that._getUserObj(e.touches[0], canvasRect);
                if (!obj) {
                    return;
                }
            }
            // Android端有浏览器自己的弹窗，会阻碍正常交互
            // 所以这里暂时在android端做prevent限制
            if (navigator.userAgent.indexOf('Android') >= 0) {
                e.preventDefault();
                onTouchStart(obj);
            }
            // ios端正常交互生效
            else {
                timer = setInterval(function () {
                    clearInterval(timer);
                    longTap = true;
                    onTouchStart(obj);
                }, tapLimit);
            }
            that.el.addEventListener('touchmove', onTouchMove, false);
            that.el.addEventListener('touchend', onTouchEnd, false);
            that.el.addEventListener('touchcancel', onTouchEnd, false);
        });
    };

    return Chart;
});
/* eslint-disable */
