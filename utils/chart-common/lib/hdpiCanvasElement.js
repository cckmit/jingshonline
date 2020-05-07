/**
 * @file HdpiCanvasElement.js 用于高清屏canvas适配
 * @author haoyan@baidu.com
 */
/* eslint-disable */
define(function () {
    var ratio = getPixelRatio();

    /**
     * 获取高清屏下canvas对象
     *
     * @param {number} w 画布宽
     * @param {number} h 画布高
     * @return {Object} canvas element
     */
    function getHdpiCanvas(w, h, opt) {
        var options = opt || {};
        var canvas
        if(options.canvas) {
            canvas = options.canvas
        }else {
            return
        }
        canvas.setAttribute('width', w);
        canvas.setAttribute('height', h);
        canvas.classList.add('chart-container');
        canvas.textContent = '您的浏览器不支持canvas';
        canvas.style.width = canvas.width + 'px';
        canvas.style.height = canvas.height + 'px';
        canvas.width = canvas.width * ratio;
        canvas.height = canvas.height * ratio;
        return canvas;
    }


    /**
     * 获取高清屏下context对象
     *
     * @param {Object} ctx context2d对象
     * @return {Object} 包装后的绘图对象
     */
    function getHdpiContext2D(ctx) {
        var ratioArgs = {
            'fillRect': 'all',
            'clearRect': 'all',
            'strokeRect': 'all',
            'moveTo': 'all',
            'lineTo': 'all',
            'arc': [0, 1, 2],
            'arcTo': 'all',
            'bezierCurveTo': 'all',
            'isPointinPath': 'all',
            'isPointinStroke': 'all',
            'quadraticCurveTo': 'all',
            'rect': 'all',
            'translate': 'all',
            'createRadialGradient': 'all',
            'createLinearGradient': 'all',
            'beginPath': null,
            'fill': null,
            'closePath': null,
            'rotate': null,
            'save': null,
            'restore': null,
            'scale': null,
            'fillText': [1,2],
            'setLineDash': null,
            'measureText': null,
            'drawImage': [1, 2, 3, 4, 5, 6, 7, 8]
        };


        var fn = {
            stroke: function () {
                ctx.lineWidth *= ratio;
                ctx.stroke.apply(ctx, arguments);
                ctx.lineWidth /= ratio;
            }
        };

        var propertyObj = {};
        [
            'font',
            'textAlign',
            'textBaseline',
            'strokeStyle',
            'fillStyle',
            'shadowColor',
            'lineWidth',
            'shadowOffsetX',
            'shadowOffsetY',
            'shadowBlur',
            'globalAlpha'
        ].map(function (name) {
            propertyObj[name] = {
                set: function (val) {
                    ctx[name] = val;
                }
            };
        });
        fn = Object.defineProperties(fn, propertyObj);


        Object.getOwnPropertyNames(ratioArgs).map(function (key) {
            fn[key] = function () {
                var value = ratioArgs[key];
                var args = Array.prototype.slice.call(arguments);
                if (value === 'all') {
                    args = args.map(function (a) {
                        return Number(a) * ratio;
                    });
                } else if (Array.isArray(value)) {
                    for (var i = 0; i < value.length; i++) {
                        args[value[i]] *= ratio;
                    }
                }
                if (ctx && ctx[key]) {
                    return ctx[key].apply(ctx, args);
                }
            };
        });
        return fn;
    }

    /**
     * 获取绘制倍率
     *
     * @param {Object} ctx context2d对象
     * @return {number} 绘制倍率
     */
    function getPixelRatio(ctx) {
        if(!ctx) {
            return
        }
        var backingStore = ctx.backingStorePixelRatio
            || ctx.webkitBackingStorePixelRatio
            || ctx.mozBackingStorePixelRatio
            || ctx.msBackingStorePixelRatio
            || ctx.oBackingStorePixelRatio
            || ctx.backingStorePixelRatio
            || 1;
        return (window.devicePixelRatio || 1) / backingStore;
    }

    return {
        getHdpiCanvas: getHdpiCanvas,
        getHdpiContext2D: getHdpiContext2D,
        ratio: ratio
    };
});
/* eslint-disable */
