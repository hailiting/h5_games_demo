/**
 * Hilo 0.1.1
 * Copyright 2014 hilojs.com
 * Licensed under the MIT License
 */

(function (window) {

    /**
     * @namespace Hilo鐨勫熀纭€鏍稿績鏂规硶闆嗗悎銆�
     * @static
     * @module hilo/core/Hilo
     */
    var Hilo = (function () {

        var win = window, doc = document, docElem = doc.documentElement,
            uid = 0;

        return {
            /**
             * 鑾峰彇涓€涓叏灞€鍞竴鐨刬d銆傚Stage1锛孊itmap2绛夈€�
             * @param {String} prefix 鐢熸垚id鐨勫墠缂€銆�
             */
            getUid: function (prefix) {
                var id = ++uid;
                if (prefix) {
                    var charCode = prefix.charCodeAt(prefix.length - 1);
                    if (charCode >= 48 && charCode <= 57) prefix += "_"; // 0鑷�9涔嬮棿娣诲姞涓嬪垝绾�
                    return prefix + id;
                }
                return id;
            },

            /**
             * 涓烘寚瀹氱殑鍙瀵硅薄鐢熸垚涓€涓寘鍚矾寰勭殑瀛楃涓茶〃绀哄舰寮忋€傚Stage1.Container2.Bitmap3銆�
             * @param {View} view 鎸囧畾鐨勫彲瑙嗗璞°€�
             */
            viewToString: function (view) {
                var result, obj = view;
                while (obj) {
                    result = result ? (obj.id + '.' + result) : obj.id;
                    obj = obj.parent;
                }
                return result;
            },

            /**
             * 绠€鍗曠殑娴呭鍒跺璞°€�
             * @param {Object} target 瑕佸鍒剁殑鐩爣瀵硅薄銆�
             * @param {Object} source 瑕佸鍒剁殑婧愬璞°€�
             * @param {Boolean} strict 鎸囧畾鏄惁瑕嗙洊宸叉湁灞炴€э紝榛樿涓篺alse锛屽嵆涓嶈鐩栥€�
             */
            copy: function (target, source, strict) {
                for (var key in source) {
                    if (!strict || target.hasOwnProperty(key) || target[key] !== undefined) {
                        target[key] = source[key];
                    }
                }
                return target;
            },

            /**
             * 娴忚鍣ㄧ壒鎬с€�
             */
            browser: (function () {
                var ua = navigator.userAgent;
                var data = {
                    iphone: /iphone/i.test(ua),
                    ipad: /ipad/i.test(ua),
                    ipod: /ipod/i.test(ua),
                    android: /android/i.test(ua),
                    webkit: /webkit/i.test(ua),
                    chrome: /chrome/i.test(ua),
                    safari: /safari/i.test(ua),
                    firefox: /firefox/i.test(ua),
                    ie: /msie/i.test(ua),
                    opera: /opera/i.test(ua),
                    supportTouch: 'ontouchstart' in win,
                    supportCanvas: doc.createElement('canvas').getContext != null,
                    supportStorage: false,
                    supportOrientation: 'orientation' in win,
                    supportDeviceMotion: 'ondevicemotion' in win
                };

                //`localStorage` is null or `localStorage.setItem` throws error in some cases (e.g. localStorage is disabled)
                try {
                    var value = 'hilo';
                    localStorage.setItem(value, value);
                    localStorage.removeItem(value);
                    data.supportStorage = true;
                } catch (e) { };

                //vendro prefix
                var jsVendor = data.jsVendor = data.webkit ? 'webkit' : data.firefox ? 'Moz' : data.opera ? 'O' : data.ie ? 'ms' : '';
                var cssVendor = data.cssVendor = '-' + jsVendor + '-';

                //css transform/3d feature dectection
                var testElem = doc.createElement('div'), style = testElem.style;
                var supportTransform = style[jsVendor + 'Transform'] != undefined;
                var supportTransform3D = style[jsVendor + 'Perspective'] != undefined;
                if (supportTransform3D) {
                    testElem.id = 'test3d';
                    style = doc.createElement('style');
                    style.textContent = '@media (' + cssVendor + 'transform-3d){#test3d{height:3px}}';
                    doc.head.appendChild(style);

                    docElem.appendChild(testElem);
                    supportTransform3D = testElem.offsetHeight == 3;
                    doc.head.removeChild(style);
                    docElem.removeChild(testElem);
                };
                data.supportTransform = supportTransform;
                data.supportTransform3D = supportTransform3D;

                return data;
            })(),

            /**
             * 浜嬩欢绫诲瀷鏋氫妇瀵硅薄銆�
             */
            event: (function () {
                var supportTouch = 'ontouchstart' in win;
                return {
                    POINTER_START: supportTouch ? 'touchstart' : 'mousedown',
                    POINTER_MOVE: supportTouch ? 'touchmove' : 'mousemove',
                    POINTER_END: supportTouch ? 'touchend' : 'mouseup'
                };
            })(),

            /**
             * 鑾峰彇DOM鍏冪礌鍦ㄩ〉闈腑鐨勫唴瀹规樉绀哄尯鍩熴€�
             * @param {HTMLElement} elem DOM鍏冪礌銆�
             * @returns {Object} DOM鍏冪礌鐨勭幇瀹炲尯鍩熴€傛牸寮忎负锛歿left:0, top:0, width:100, height:100}銆�
             */
            getElementRect: function (elem) {
                try {
                    //this fails if it's a disconnected DOM node
                    var bounds = elem.getBoundingClientRect();
                } catch (e) {
                    bounds = { top: elem.offsetTop, left: elem.offsetLeft, width: elem.offsetWidth, height: elem.offsetHeight };
                }

                var offsetX = (win.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0);
                var offsetY = (win.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0);
                var styles = win.getComputedStyle ? getComputedStyle(elem) : elem.currentStyle;
                var parseIntFn = parseInt;
                var padLeft = parseIntFn(styles.paddingLeft) + parseIntFn(styles.borderLeftWidth);
                var padTop = parseIntFn(styles.paddingTop) + parseIntFn(styles.borderTopWidth);
                var padRight = parseIntFn(styles.paddingRight) + parseIntFn(styles.borderRightWidth);
                var padBottom = parseIntFn(styles.paddingBottom) + parseIntFn(styles.borderBottomWidth);

                return {
                    left: bounds.left + offsetX + padLeft,
                    top: bounds.top + offsetY + padTop,
                    width: bounds.right - padRight - bounds.left - padLeft,
                    height: bounds.bottom - padBottom - bounds.top - padTop
                };
            },

            /**
             * 鍒涘缓涓€涓狣OM鍏冪礌銆傚彲鎸囧畾灞炴€у拰鏍峰紡銆�
             * @param {String} type 瑕佸垱寤虹殑DOM鍏冪礌鐨勭被鍨嬨€傛瘮濡傦細'div'銆�
             * @param {Object} properties 鎸囧畾DOM鍏冪礌鐨勫睘鎬у拰鏍峰紡銆�
             * @returns {HTMLElement} 涓€涓狣OM鍏冪礌銆�
             */
            createElement: function (type, properties) {
                var elem = doc.createElement(type), p, val, s;
                for (p in properties) {
                    val = properties[p];
                    if (p === 'style') {
                        for (s in val) elem.style[s] = val[s];
                    } else {
                        elem[p] = val;
                    }
                }
                return elem;
            },

            /**
             * 鏍规嵁鍙傛暟id鑾峰彇涓€涓狣OM鍏冪礌銆傛鏂规硶绛変环浜巇ocument.getElementById(id)銆�
             * @param {String} 瑕佽幏鍙栫殑DOM鍏冪礌鐨刬d銆�
             * @returns {HTMLElement} 涓€涓狣OM鍏冪礌銆�
             */
            getElement: function (id) {
                return doc.getElementById(id);
            },

            /**
             * 璁剧疆鍙瀵硅薄DOM鍏冪礌鐨凜SS鏍峰紡銆�
             * @param {View} obj 鎸囧畾瑕佽缃瓹SS鏍峰紡鐨勫彲瑙嗗璞°€�
             */
            setElementStyleByView: function (obj) {
                var drawable = obj.drawable,
                    image = drawable.image,
                    rect = drawable.rect,
                    style = drawable.domElement.style,
                    prefix = Hilo.browser.jsVendor, px = 'px';

                style.pointerEvents = 'none';
                style.display = (!obj.visible || obj.alpha <= 0) ? 'none' : '';
                style.width = obj.width + px;
                style.height = obj.height + px;
                style.opacity = obj.alpha;
                style.zIndex = obj.depth;
                style[prefix + 'TransformOrigin'] = obj.pivotX + px + ' ' + obj.pivotY + px;
                style[prefix + 'Transform'] = this.getTransformCSS(obj);
                if (obj.bgFill) style.backgroundColor = obj.bgFill.style;

                if (image) {
                    if (style.backgroundImage.indexOf(image.src) != 4) {
                        style.backgroundImage = 'url(' + image.src + ')';
                    }
                    if (rect) {
                        style.backgroundPosition = -rect[0] + px + ' ' + -rect[1] + px;
                    }
                }

                if (obj.mask) {
                    style[prefix + 'MaskImage'] = obj.mask.drawable.domElement.style.backgroundImage;
                    style[prefix + 'MaskRepeat'] = 'no-repeat';
                    style[prefix + 'MaskPosition'] = obj.mask.x + px + ' ' + obj.mask.y + px;
                }
            },

            /**
             * 鐢熸垚鍙瀵硅薄鐨凜SS鍙樻崲鏍峰紡銆�
             * @param {View} obj 鎸囧畾鐢熸垚CSS鍙樻崲鏍峰紡鐨勫彲瑙嗗璞°€�
             * @returns {String} 鐢熸垚鐨凜SS鏍峰紡瀛楃涓层€�
             */
            getTransformCSS: function (obj) {
                var use3d = this.browser.supportTransform3D,
                    str3d = use3d ? '3d' : '';

                return 'translate' + str3d + '(' + (obj.x - obj.pivotX) + 'px, ' + (obj.y - obj.pivotY) + (use3d ? 'px, 0px)' : 'px)')
                     + 'rotate' + str3d + (use3d ? '(0, 0, 1, ' : '(') + obj.rotation + 'deg)'
                     + 'scale' + str3d + '(' + obj.scaleX + ', ' + obj.scaleY + (use3d ? ', 1)' : ')');
            }
        };

    })();

    /**
     * @namespace Class鏄彁渚涚被鐨勫垱寤虹殑杈呭姪宸ュ叿銆�
     * @static
     * @module hilo/core/Class
     */
    var Class = (function () {

        /**
         * 姝ゆ柟娉曟槸鍦℉ilo涓垱寤虹被鐨勪富瑕佹柟娉曘€�
         * @param {Object} properties 瑕佸垱寤虹殑绫荤殑鐩稿叧灞炴€у拰鏂规硶銆備富瑕佹湁锛�
         * <ul>
         * <li><b>Extends</b> - 鎸囧畾瑕佺户鎵跨殑鐖剁被銆�</li>
         * <li><b>Mixes</b> - 鎸囧畾瑕佹贩鍏ョ殑鎴愬憳闆嗗悎瀵硅薄銆�</li>
         * <li><b>Statics</b> - 鎸囧畾绫荤殑闈欐€佸睘鎬ф垨鏂规硶銆�</li>
         * </ul>
         * @returns {Object} 鍒涘缓濂界殑绫汇€�
         */
        var create = function (properties) {
            properties = properties || {};
            var clazz = properties.hasOwnProperty('constructor') ? properties.constructor : function () { };
            implement.call(clazz, properties);
            return clazz;
        }

        /**
         * @private
         */
        var implement = function (properties) {
            var proto = {}, key, value;
            for (key in properties) {
                value = properties[key];
                if (classMutators.hasOwnProperty(key)) {
                    classMutators[key].call(this, value);
                } else {
                    proto[key] = value;
                }
            }

            mix(this.prototype, proto);
        };

        var classMutators = /** @ignore */{
            Extends: function (parent) {
                var existed = this.prototype, proto = createProto(parent.prototype);
                //inherit static properites
                mix(this, parent);
                //keep existed properties
                mix(proto, existed);
                //correct constructor
                proto.constructor = this;
                //prototype chaining
                this.prototype = proto;
                //shortcut to parent's prototype
                this.superclass = parent.prototype;
            },

            Mixes: function (items) {
                items instanceof Array || (items = [items]);
                var proto = this.prototype, item;

                while (item = items.shift()) {
                    mix(proto, item.prototype || item);
                }
            },

            Statics: function (properties) {
                mix(this, properties);
            }
        };

        /**
         * @private
         */
        var createProto = (function () {
            if (Object.__proto__) {
                return function (proto) {
                    return { __proto__: proto };
                }
            } else {
                var Ctor = function () { };
                return function (proto) {
                    Ctor.prototype = proto;
                    return new Ctor();
                }
            }
        })();

        /**
         * 娣峰叆灞炴€ф垨鏂规硶銆�
         * @param {Object} target 娣峰叆鐩爣瀵硅薄銆�
         * @returns {Object} 娣峰叆鐩爣瀵硅薄銆�
         */
        var mix = function (target) {
            for (var i = 1, len = arguments.length; i < len; i++) {
                var source = arguments[i], defineProps;
                for (var key in source) {
                    var prop = source[key];
                    if (prop && typeof prop === 'object') {
                        if (prop.value !== undefined || typeof prop.get === 'function' || typeof prop.set === 'function') {
                            defineProps = defineProps || {};
                            defineProps[key] = prop;
                            continue;
                        }
                    }
                    target[key] = prop;
                }
                if (defineProps) defineProperties(target, defineProps);
            }

            return target;
        };

        try {
            var defineProperty = Object.defineProperty,
                defineProperties = Object.defineProperties;
            defineProperty({}, '$', { value: 0 });
        } catch (e) {
            if ('__defineGetter__' in Object) {
                defineProperty = function (obj, prop, desc) {
                    if ('value' in desc) obj[prop] = desc.value;
                    if ('get' in desc) obj.__defineGetter__(prop, desc.get);
                    if ('set' in desc) obj.__defineSetter__(prop, desc.set);
                    return obj;
                };
                defineProperties = function (obj, props) {
                    for (var prop in props) {
                        if (props.hasOwnProperty(prop)) {
                            defineProperty(obj, prop, props[prop]);
                        }
                    }
                    return obj;
                };
            }
        }

        return { create: create, mix: mix };

    })();

    /**
     * @class EventMixin鏄竴涓寘鍚簨浠剁浉鍏冲姛鑳界殑mixin銆傚彲浠ラ€氳繃 Class.mix(target, EventMixin) 鏉ヤ负target澧炲姞浜嬩欢鍔熻兘銆�
     * @mixin
     * @static
     * @module hilo/event/EventMixin
     * @requires hilo/core/Class
     */
    var EventMixin = {
        _listeners: null,

        /**
         * 澧炲姞涓€涓簨浠剁洃鍚€�
         * @param {String} type 瑕佺洃鍚殑浜嬩欢绫诲瀷銆�
         * @param {Function} listener 浜嬩欢鐩戝惉鍥炶皟鍑芥暟銆�
         * @param {Boolean} once 鏄惁鏄竴娆℃€х洃鍚紝鍗冲洖璋冨嚱鏁板搷搴斾竴娆″悗鍗冲垹闄わ紝涓嶅啀鍝嶅簲銆�
         */
        on: function (type, listener, once) {
            var listeners = (this._listeners = this._listeners || {});
            var eventListeners = (listeners[type] = listeners[type] || []);
            for (var i = 0, len = eventListeners.length; i < len; i++) {
                var el = eventListeners[i];
                if (el.listener === listener) return;
            }
            eventListeners.push({ listener: listener, once: once });
            return this;
        },

        /**
         * 鍒犻櫎涓€涓簨浠剁洃鍚€傚鏋滀笉浼犲叆浠讳綍鍙傛暟锛屽垯鍒犻櫎鎵€鏈夌殑浜嬩欢鐩戝惉锛涘鏋滀笉浼犲叆绗簩涓弬鏁帮紝鍒欏垹闄ゆ寚瀹氱被鍨嬬殑鎵€鏈変簨浠剁洃鍚€�
         * @param {String} type 瑕佸垹闄ょ洃鍚殑浜嬩欢绫诲瀷銆�
         * @param {Function} listener 瑕佸垹闄ょ洃鍚殑鍥炶皟鍑芥暟銆�
         */
        off: function (type, listener) {
            //remove all event listeners
            if (arguments.length == 0) {
                this._listeners = null;
                return this;
            }

            var eventListeners = this._listeners && this._listeners[type];
            if (eventListeners) {
                //remove event listeners by specified type
                if (arguments.length == 1) {
                    delete this._listeners[type];
                    return this;
                }

                for (var i = 0, len = eventListeners.length; i < len; i++) {
                    var el = eventListeners[i];
                    if (el.listener === listener) {
                        eventListeners.splice(i, 1);
                        if (eventListeners.length === 0) delete this._listeners[type];
                        break;
                    }
                }
            }
            return this;
        },

        /**
         * 鍙戦€佷簨浠躲€傚綋绗竴涓弬鏁扮被鍨嬩负Object鏃讹紝鍒欐妸瀹冧綔涓轰竴涓暣浣撲簨浠跺璞°€�
         * @param {String} type 瑕佸彂閫佺殑浜嬩欢绫诲瀷銆�
         * @param {Object} detail 瑕佸彂閫佺殑浜嬩欢鐨勫叿浣撲俊鎭紝鍗充簨浠堕殢甯﹀弬鏁般€�
         */
        fire: function (type, detail) {
            var event, eventType;
            if (typeof type === 'string') {
                eventType = type;
            } else {
                event = type;
                eventType = type.type;
            }

            var listeners = this._listeners;
            if (!listeners) return false;

            var eventListeners = listeners[eventType];
            if (eventListeners) {
                eventListeners = eventListeners.slice(0);
                event = event || new EventObject(eventType, this, detail);

                for (var i = 0; i < eventListeners.length && !event._stopped; i++) {
                    var el = eventListeners[i];
                    el.listener.call(this, event);
                    if (el.once) eventListeners.splice(i--, 1);
                }

                if (eventListeners.length == 0) delete listeners[eventType];
                return true;
            }
            return false;
        }
    };

    /**
     * 浜嬩欢瀵硅薄绫汇€傚綋鍓嶄粎涓哄唴閮ㄧ被锛屼互鍚庢湁闇€姹傜殑璇濆彲鑳戒細鑰冭檻鐙珛涓哄叕寮€绫汇€�
     */
    var EventObject = Class.create({
        constructor: function EventObject(type, target, detail) {
            this.type = type;
            this.target = target;
            this.detail = detail;
            this.timeStamp = +new Date();
        },

        type: null,
        target: null,
        detail: null,
        timeStamp: 0,

        stopImmediatePropagation: function () {
            this._stopped = true;
        }
    });

    /**
     * @class 娓叉煋鍣ㄦ娊璞″熀绫汇€�
     * @param {Object} properties 鍒涘缓瀵硅薄鐨勫睘鎬у弬鏁般€傚彲鍖呭惈姝ょ被鎵€鏈夊彲鍐欏睘鎬с€�
     * @module hilo/renderer/Renderer
     * @requires hilo/core/Hilo
     * @requires hilo/core/Class
     * @property {Object} canvas 娓叉煋鍣ㄥ搴旂殑鐢诲竷銆傚畠鍙兘鏄竴涓櫘閫氱殑DOM鍏冪礌锛屾瘮濡俤iv锛屼篃鍙互鏄竴涓猚anvas鐢诲竷鍏冪礌銆傚彧璇诲睘鎬с€�
     * @property {Object} stage 娓叉煋鍣ㄥ搴旂殑鑸炲彴銆傚彧璇诲睘鎬с€�
     */
    var Renderer = Class.create(/** @lends Renderer.prototype */{
        constructor: function Renderer(properties) {
            properties = properties || {};
            Hilo.copy(this, properties, true);
        },

        canvas: null,
        stage: null,

        /**
         * 涓哄紑濮嬬粯鍒跺彲瑙嗗璞″仛鍑嗗銆傞渶瑕佸瓙绫绘潵瀹炵幇銆�
         * @param {View} target 瑕佺粯鍒剁殑鍙瀵硅薄銆�
         */
        startDraw: function (target) { },

        /**
         * 缁樺埗鍙瀵硅薄銆傞渶瑕佸瓙绫绘潵瀹炵幇銆�
         * @param {View} target 瑕佺粯鍒剁殑鍙瀵硅薄銆�
         */
        draw: function (target) { },

        /**
         * 缁撴潫缁樺埗鍙瀵硅薄鍚庣殑鍚庣画澶勭悊鏂规硶銆傞渶瑕佸瓙绫绘潵瀹炵幇銆�
         * @param {View} target 瑕佺粯鍒剁殑鍙瀵硅薄銆�
         */
        endDraw: function (target) { },

        /**
         * 瀵瑰彲瑙嗗璞¤繘琛屽彉鎹€傞渶瑕佸瓙绫绘潵瀹炵幇銆�
         */
        transform: function () { },

        /**
         * 闅愯棌鍙瀵硅薄銆傞渶瑕佸瓙绫绘潵瀹炵幇銆�
         */
        hide: function () { },

        /**
         * 浠庣敾甯冧腑鍒犻櫎鍙瀵硅薄銆傛敞鎰忥細涓嶆槸浠巗tage涓垹闄ゅ璞°€傞渶瑕佸瓙绫绘潵瀹炵幇銆�
         * @param {View} target 瑕佸垹闄ょ殑鍙瀵硅薄銆�
         */
        remove: function (target) { },

        /**
         * 娓呴櫎鐢诲竷鎸囧畾鍖哄煙銆傞渶瑕佸瓙绫绘潵瀹炵幇銆�
         * @param {Number} x 鎸囧畾鍖哄煙鐨剎杞村潗鏍囥€�
         * @param {Number} y 鎸囧畾鍖哄煙鐨剏杞村潗鏍囥€�
         * @param {Number} width 鎸囧畾鍖哄煙鐨勫搴︺€�
         * @param {Number} height 鎸囧畾鍖哄煙鐨勯珮搴︺€�
         */
        clear: function (x, y, width, height) { }

    });

    /**
     * @class canvas鐢诲竷娓叉煋鍣ㄣ€傛墍鏈夊彲瑙嗗璞″皢娓叉煋鍦╟anvas鐢诲竷涓娿€�
     * @augments Renderer
     * @param {Object} properties 鍒涘缓瀵硅薄鐨勫睘鎬у弬鏁般€傚彲鍖呭惈姝ょ被鎵€鏈夊彲鍐欏睘鎬с€�
     * @module hilo/renderer/CanvasRenderer
     * @requires hilo/core/Class
     * @requires hilo/renderer/Renderer
     * @property {CanvasRenderingContext2D} context canvas鐢诲竷鐨勪笂涓嬫枃銆傚彧璇诲睘鎬с€�
     */
    var CanvasRenderer = Class.create(/** @lends CanvasRenderer.prototype */{
        Extends: Renderer,
        constructor: function CanvasRenderer(properties) {
            CanvasRenderer.superclass.constructor.call(this, properties);

            this.context = this.canvas.getContext("2d");
        },

        context: null,

        /**
         * @private
         * @see Renderer#startDraw
         */
        startDraw: function (target) {
            if (target.visible && target.alpha > 0) {
                if (target === this.stage) {
                    this.context.clearRect(0, 0, target.width, target.height);
                }
                this.context.save();
                return true;
            }
            return false;
        },

        /**
         * @private
         * @see Renderer#draw
         */
        draw: function (target) {
            var ctx = this.context, w = target.width, h = target.height;

            //draw background fill
            var bgFill = target.bgFill;
            if (bgFill) {
                ctx.fillStyle = bgFill.style;
                ctx.fillRect(bgFill.x, bgFill.y, bgFill.width || w, bgFill.height || h);
            }

            //draw image
            var drawable = target.drawable;
            if (drawable && drawable.image) {
                var rect = drawable.rect, sw = rect[2], sh = rect[3];
                if (!w && !h) {
                    //fix width/height TODO: how to get rid of this?
                    target.width = rect[2];
                    target.height = rect[3];
                }
                ctx.drawImage(drawable.image, rect[0], rect[1], sw, sh, 0, 0, w, h);
            }
        },

        /**
         * @private
         * @see Renderer#endDraw
         */
        endDraw: function (target) {
            this.context.restore();
        },

        /**
         * @private
         * @see Renderer#transform
         */
        transform: function (target) {
            var ctx = this.context,
                scaleX = target.scaleX,
                scaleY = target.scaleY;

            if (target === this.stage) {
                var style = this.canvas.style,
                    oldScaleX = target._scaleX,
                    oldScaleY = target._scaleY;

                if ((!oldScaleX && scaleX != 1) || (oldScaleX && oldScaleX != scaleX)) {
                    target._scaleX = scaleX;
                    style.width = scaleX * target.width + "px";
                }
                if ((!oldScaleY && scaleY != 1) || (oldScaleY && oldScaleY != scaleY)) {
                    target._scaleY = scaleY;
                    style.height = scaleY * target.height + "px";
                }
            } else {
                var x = target.x,
                    y = target.y,
                    pivotX = target.pivotX,
                    pivotY = target.pivotY,
                    rotation = target.rotation % 360;

                if (x != 0 || y != 0) ctx.translate(x, y);
                if (rotation != 0) ctx.rotate(rotation * Math.PI / 180);
                if (scaleX != 1 || scaleY != 1) ctx.scale(scaleX, scaleY);
                if (pivotX != 0 || pivotY != 0) ctx.translate(-pivotX, -pivotY);
            }

            if (target.alpha > 0) ctx.globalAlpha *= target.alpha;
        },

        /**
         * @private
         * @see Renderer#remove
         */
        remove: function (target) {
            if (target instanceof DOMElement) {
                var elem = target.drawable.domElement,
                    parentElem = elem && elem.parentNode;
                if (parentElem) {
                    parentElem.removeChild(elem);
                }
            }
        },

        /**
         * @private
         * @see Renderer#clear
         */
        clear: function (x, y, width, height) {
            this.context.clearRect(x, y, width, height);
        }
    });

    /**
     * @class DOM+CSS3娓叉煋鍣ㄣ€傚皢鍙瀵硅薄浠OM鍏冪礌鏂瑰紡娓叉煋鍑烘潵銆�
     * @augments Renderer
     * @param {Object} properties 鍒涘缓瀵硅薄鐨勫睘鎬у弬鏁般€傚彲鍖呭惈姝ょ被鎵€鏈夊彲鍐欏睘鎬с€�
     * @module hilo/renderer/DOMRenderer
     * @requires hilo/core/Class
     * @requires hilo/core/Hilo
     * @requires hilo/renderer/Renderer
     */
    var DOMRenderer = (function () {

        return Class.create({
            Extends: Renderer,
            constructor: function DOMRenderer(properties) {
                DOMRenderer.superclass.constructor.call(this, properties);
            },

            /**
             * @private
             * @see Renderer#startDraw
             */
            startDraw: function (target) {
                if (target.visible && target.alpha > 0) {
                    //prepare drawable
                    var drawable = (target.drawable = target.drawable || new Drawable());
                    drawable.domElement = drawable.domElement || createDOMDrawable(target, drawable);
                    return true;
                }
                return false;
            },

            /**
             * @private
             * @see Renderer#draw
             */
            draw: function (target) {
                var parent = target.parent,
                    targetElem = target.drawable.domElement,
                    currentParent = targetElem.parentNode;

                if (parent) {
                    var parentElem = parent.drawable.domElement;
                    if (parentElem != currentParent) {
                        parentElem.appendChild(targetElem);
                    }
                } else if (target === stage && !currentParent) {
                    this.canvas.appendChild(targetElem);
                }
            },

            /**
             * @private
             * @see Renderer#transform
             */
            transform: function (target) {
                Hilo.setElementStyleByView(target);
            },

            /**
             * @private
             * @see Renderer#remove
             */
            remove: function (target) {
                var targetElem = target.drawable.domElement,
                    parentElem = targetElem.parentNode;

                if (parentElem) parentElem.removeChild(targetElem);
            },

            /**
             * @private
             * @see Renderer#hide
             */
            hide: function (target) {
                var elem = target.drawable && target.drawable.domElement;
                if (elem) elem.style.display = "none";
            }
        });

        /**
         * 鍒涘缓涓€涓彲娓叉煋鐨凞OM锛屽彲鎸囧畾tagName锛屽canvas鎴杁iv銆�
         * @param {Object} view 涓€涓彲瑙嗗璞℃垨绫讳技鐨勫璞°€�
         * @param {Object} imageObj 鎸囧畾娓叉煋鐨刬mage鍙婄浉鍏宠缃紝濡傜粯鍒跺尯鍩焤ect銆�
         * @return {HTMLElement} 鏂板垱寤虹殑DOM瀵硅薄銆�
         * @private
         */
        function createDOMDrawable(view, imageObj) {
            var tag = view.tagName || "div",
                img = imageObj.image,
                w = view.width || (img && img.width),
                h = view.height || (img && img.height),
                elem = Hilo.createElement(tag), style = elem.style;

            if (view.id) elem.id = view.id;
            style.position = "absolute";
            style.left = (view.left || 0) + "px";
            style.top = (view.top || 0) + "px";
            style.width = w + "px";
            style.height = h + "px";

            if (tag == "canvas") {
                elem.width = w;
                elem.height = h;
                if (img) {
                    var ctx = elem.getContext("2d");
                    var rect = imageObj.rect || [0, 0, w, h];
                    ctx.drawImage(img, rect[0], rect[1], rect[2], rect[3],
                                 (view.x || 0), (view.y || 0),
                                 (view.width || rect[2]),
                                 (view.height || rect[3]));
                }
            } else {
                style.opacity = view.alpha != undefined ? view.alpha : 1;
                if (view === stage || view.clipChildren) style.overflow = "hidden";
                if (img && img.src) {
                    style.backgroundImage = "url(" + img.src + ")";
                    var bgX = view.rectX || 0, bgY = view.rectY || 0;
                    style.backgroundPosition = (-bgX) + "px " + (-bgY) + "px";
                }
            }
            return elem;
        }

    })();

    /**
     * @class Matrix绫昏〃绀轰竴涓浆鎹㈢煩闃碉紝瀹冪‘瀹氬浣曞皢鐐逛粠涓€涓潗鏍囩┖闂存槧灏勫埌鍙︿竴涓潗鏍囩┖闂淬€�
     * @param {Number} a 缂╂斁鎴栨棆杞浘鍍忔椂褰卞搷鍍忕礌娌� x 杞村畾浣嶇殑鍊笺€�
     * @param {Number} b 鏃嬭浆鎴栧€炬枩鍥惧儚鏃跺奖鍝嶅儚绱犳部 y 杞村畾浣嶇殑鍊笺€�
     * @param {Number} c 鏃嬭浆鎴栧€炬枩鍥惧儚鏃跺奖鍝嶅儚绱犳部 x 杞村畾浣嶇殑鍊笺€�
     * @param {Number} d 缂╂斁鎴栨棆杞浘鍍忔椂褰卞搷鍍忕礌娌� y 杞村畾浣嶇殑鍊笺€�
     * @param {Number} tx 娌� x 杞村钩绉绘瘡涓偣鐨勮窛绂汇€�
     * @param {Number} ty 娌� y 杞村钩绉绘瘡涓偣鐨勮窛绂汇€�
     * @module hilo/geom/Matrix
     * @requires hilo/core/Class
     */
    var Matrix = Class.create(/** @lends Matrix.prototype */{
        constructor: function Matrix(a, b, c, d, tx, ty) {
            this.a = a;
            this.b = b;
            this.c = c;
            this.d = d;
            this.tx = tx;
            this.ty = ty;
        },

        /**
         * 灏嗘煇涓煩闃典笌褰撳墠鐭╅樀杩炴帴锛屼粠鑰屽皢杩欎袱涓煩闃电殑鍑犱綍鏁堟灉鏈夋晥鍦扮粨鍚堝湪涓€璧枫€�
         * @param {Matrix} mtx 瑕佽繛鎺ュ埌婧愮煩闃电殑鐭╅樀銆�
         * @returns {Matrix} 涓€涓狹atrix瀵硅薄銆�
         */
        concat: function (mtx) {
            var args = arguments,
                a = this.a, b = this.b, c = this.c, d = this.d,
                tx = this.tx, ty = this.ty;

            if (args.length >= 6) {
                var ma = args[0], mb = args[1], mc = args[2],
                    md = args[3], mx = args[4], my = args[5];
            } else {
                ma = mtx.a;
                mb = mtx.b;
                mc = mtx.c;
                md = mtx.d;
                mx = mtx.tx;
                my = mtx.ty;
            }

            this.a = a * ma + b * mc;
            this.b = a * mb + b * md;
            this.c = c * ma + d * mc;
            this.d = c * mb + d * md;
            this.tx = tx * ma + ty * mc + mx;
            this.ty = tx * mb + ty * md + my;
            return this;
        },

        /**
         * 瀵� Matrix 瀵硅薄搴旂敤鏃嬭浆杞崲銆�
         * @param {Number} angle 鏃嬭浆鐨勮搴︺€�
         * @returns {Matrix} 涓€涓狹atrix瀵硅薄銆�
         */
        rotate: function (angle) {
            var sin = Math.sin(angle), cos = Math.cos(angle),
                a = this.a, b = this.b, c = this.c, d = this.d,
                tx = this.tx, ty = this.ty;

            this.a = a * cos - b * sin;
            this.b = a * sin + b * cos;
            this.c = c * cos - d * sin;
            this.d = c * sin + d * cos;
            this.tx = tx * cos - ty * sin;
            this.ty = tx * sin + ty * cos;
            return this;
        },

        /**
         * 瀵圭煩闃靛簲鐢ㄧ缉鏀捐浆鎹€�
         * @param {Number} sx 鐢ㄤ簬娌� x 杞寸缉鏀惧璞＄殑涔樻暟銆�
         * @param {Number} sy 鐢ㄤ簬娌� y 杞寸缉鏀惧璞＄殑涔樻暟銆�
         * @returns {Matrix} 涓€涓狹atrix瀵硅薄銆�
         */
        scale: function (sx, sy) {
            this.a *= sx;
            this.d *= sy;
            this.tx *= sx;
            this.ty *= sy;
            return this;
        },

        /**
         * 娌� x 鍜� y 杞村钩绉荤煩闃碉紝鐢� dx 鍜� dy 鍙傛暟鎸囧畾銆�
         * @param {Number} dx 娌� x 杞村悜鍙崇Щ鍔ㄧ殑閲忥紙浠ュ儚绱犱负鍗曚綅锛夈€�
         * @param {Number} dy 娌� y 杞村悜鍙崇Щ鍔ㄧ殑閲忥紙浠ュ儚绱犱负鍗曚綅锛夈€�
         * @returns {Matrix} 涓€涓狹atrix瀵硅薄銆�
         */
        translate: function (dx, dy) {
            this.tx += dx;
            this.ty += dy;
            return this;
        },

        /**
         * 涓烘瘡涓煩闃靛睘鎬ц缃竴涓€硷紝璇ュ€煎皢瀵艰嚧 null 杞崲銆傞€氳繃搴旂敤鎭掔瓑鐭╅樀杞崲鐨勫璞″皢涓庡師濮嬪璞″畬鍏ㄧ浉鍚屻€�
         * @returns {Matrix} 涓€涓狹atrix瀵硅薄銆�
         */
        identity: function () {
            this.a = this.d = 1;
            this.b = this.c = this.tx = this.ty = 0;
            return this;
        },

        /**
         * 鎵ц鍘熷鐭╅樀鐨勯€嗚浆鎹€傛偍鍙互灏嗕竴涓€嗙煩闃靛簲鐢ㄤ簬瀵硅薄鏉ユ挙娑堝湪搴旂敤鍘熷鐭╅樀鏃舵墽琛岀殑杞崲銆�
         * @returns {Matrix} 涓€涓狹atrix瀵硅薄銆�
         */
        invert: function () {
            var a = this.a;
            var b = this.b;
            var c = this.c;
            var d = this.d;
            var tx = this.tx;
            var i = a * d - b * c;

            this.a = d / i;
            this.b = -b / i;
            this.c = -c / i;
            this.d = a / i;
            this.tx = (c * this.ty - d * tx) / i;
            this.ty = -(a * this.ty - b * tx) / i;
            return this;
        },

        /**
         * 杩斿洖灏� Matrix 瀵硅薄琛ㄧず鐨勫嚑浣曡浆鎹㈠簲鐢ㄤ簬鎸囧畾鐐规墍浜х敓鐨勭粨鏋溿€�
         * @param {Object} point 鎯宠鑾峰緱鍏剁煩闃佃浆鎹㈢粨鏋滅殑鐐广€�
         * @param {Boolean} round 鏄惁瀵圭偣鐨勫潗鏍囪繘琛屽悜涓婂彇鏁淬€�
         * @param {Boolean} returnNew 鏄惁杩斿洖涓€涓柊鐨勭偣銆�
         * @returns {Object} 鐢卞簲鐢ㄧ煩闃佃浆鎹㈡墍浜х敓鐨勭偣銆�
         */
        transformPoint: function (point, round, returnNew) {
            var x = point.x * this.a + point.y * this.c + this.tx,
                y = point.x * this.b + point.y * this.d + this.ty;

            if (round) {
                x = x + 0.5 >> 0;
                y = y + 0.5 >> 0;
            }
            if (returnNew) return { x: x, y: y };
            point.x = x;
            point.y = y;
            return point;
        }

    });

    /**
     * @class Drawable鏄彲缁樺埗鍥惧儚鐨勫寘瑁呫€�
     * @param {Object} properties 鍒涘缓瀵硅薄鐨勫睘鎬у弬鏁般€傚彲鍖呭惈姝ょ被鎵€鏈夊彲鍐欏睘鎬с€�
     * @module hilo/view/Drawable
     * @requires hilo/core/Hilo
     * @requires hilo/core/Class
     * @property {Object} image 瑕佺粯鍒剁殑鍥惧儚銆傚嵆鍙CanvasRenderingContext2D.drawImage浣跨敤鐨勫璞＄被鍨嬶紝鍙互鏄疕TMLImageElement銆丠TMLCanvasElement銆丠TMLVideoElement绛夊璞°€�
     * @property {array} rect 瑕佺粯鍒剁殑鍥惧儚鐨勭煩褰㈠尯鍩熴€�
     */
    var Drawable = Class.create(/** @lends Drawable.prototype */{
        constructor: function Drawable(properties) {
            this.init(properties);
        },

        image: null,
        rect: null,

        /**
         * 鍒濆鍖栧彲缁樺埗瀵硅薄銆�
         * @param {Object} properties 瑕佸垵濮嬪寲鐨勫睘鎬с€�
         */
        init: function (properties) {
            var me = this, oldImage = me.image;
            if (Drawable.isDrawable(properties)) {
                me.image = properties;
            } else {
                Hilo.copy(me, properties, true);
            }

            var image = me.image;
            if (typeof image === 'string') {
                if (oldImage && image === oldImage.getAttribute('src')) {
                    image = me.image = oldImage;
                } else {
                    me.image = null;
                    //load image dynamically
                    var img = new Image();
                    img.onload = function () {
                        img.onload = null;
                        me.init(img);
                    };
                    img.src = image;
                    return;
                }
            }

            if (image && !me.rect) me.rect = [0, 0, image.width, image.height];
        },

        Statics: /** @lends Drawable */{
            /**
             * 鍒ゆ柇鍙傛暟elem鎸囧畾鐨勫厓绱犳槸鍚﹀彲鍖呰鎴怐rawable瀵硅薄銆�
             * @param {Object} elem 瑕佹祴璇曠殑瀵硅薄銆�
             * @return {Boolean} 濡傛灉鏄彲鍖呰鎴怐rawable瀵硅薄鍒欒繑鍥瀟rue锛屽惁鍒欎负false銆�
             */
            isDrawable: function (elem) {
                return (elem instanceof HTMLImageElement) ||
                       (elem instanceof HTMLCanvasElement) ||
                       (elem instanceof HTMLVideoElement);
            }
        }
    });

    /**
     * @class View绫绘槸鎵€鏈夊彲瑙嗗璞℃垨缁勪欢鐨勫熀绫汇€�
     * @param {Object} properties 鍒涘缓瀵硅薄鐨勫睘鎬у弬鏁般€傚彲鍖呭惈姝ょ被鎵€鏈夊彲鍐欏睘鎬с€�
     * @module hilo/view/View
     * @requires hilo/core/Hilo
     * @requires hilo/core/Class
     * @requires hilo/event/EventMixin
     * @property {String} id 鍙瀵硅薄鐨勫敮涓€鏍囪瘑绗︺€�
     * @property {Number} x 鍙瀵硅薄鐨剎杞村潗鏍囥€傞粯璁ゅ€间负0銆�
     * @property {Number} y 鍙瀵硅薄鐨剏杞村潗鏍囥€傞粯璁ゅ€间负0銆�
     * @property {Number} width 鍙瀵硅薄鐨勫搴︺€傞粯璁ゅ€间负0銆�
     * @property {Number} height 鍙瀵硅薄鐨勯珮搴︺€傞粯璁ゅ€间负0銆�
     * @property {Number} alpha 鍙瀵硅薄鐨勯€忔槑搴︺€傞粯璁ゅ€间负1銆�
     * @property {Number} rotation 鍙瀵硅薄鐨勬棆杞搴︺€傞粯璁ゅ€间负0銆�
     * @property {Boolean} visible 鍙瀵硅薄鏄惁鍙銆傞粯璁や负鍙锛屽嵆true銆�
     * @property {Number} pivotX 鍙瀵硅薄鐨勪腑蹇冪偣鐨剎杞村潗鏍囥€傞粯璁ゅ€间负0銆�
     * @property {Number} pivotY 鍙瀵硅薄鐨勪腑蹇冪偣鐨剏杞村潗鏍囥€傞粯璁ゅ€间负0銆�
     * @property {Number} scaleX 鍙瀵硅薄鍦▁杞翠笂鐨勭缉鏀炬瘮渚嬨€傞粯璁や负涓嶇缉鏀撅紝鍗�1銆�
     * @property {Number} scaleY 鍙瀵硅薄鍦▂杞翠笂鐨勭缉鏀炬瘮渚嬨€傞粯璁や负涓嶇缉鏀撅紝鍗�1銆�
     * @property {Boolean} pointerEnabled 鍙瀵硅薄鏄惁鎺ュ彈浜や簰浜嬩欢銆傞粯璁や负鎺ュ彈浜や簰浜嬩欢锛屽嵆true銆�
     * @property {Container} parent 鍙瀵硅薄鐨勭埗瀹瑰櫒銆傚彧璇诲睘鎬с€�
     * @property {Stage} stage 鍙瀵硅薄鐨勮垶鍙板疄渚嬨€傚彧璇诲睘鎬с€�
     * @property {Number} depth 鍙瀵硅薄鐨勬繁搴︼紝涔熷嵆z杞寸殑搴忓彿銆傚彧璇诲睘鎬с€�
     * @property {Number} measuredWidth 鍙瀵硅薄鐨勬祴閲忓搴︺€傚彧璇诲睘鎬с€�
     * @property {Number} measuredHeight 鍙瀵硅薄鐨勬祴閲忛珮搴︺€傚彧璇诲睘鎬с€�
     * @property {Drawable} drawable 鍙瀵硅薄鐨勫彲缁樺埗瀵硅薄銆�
     * @property {Array} boundsArea 鍙瀵硅薄鐨勫尯鍩熼《鐐规暟缁勩€傛牸寮忎负锛歔{x:10, y:10}, {x:20, y:20}]銆�
     */
    var View = (function () {

        return Class.create(/** @lends View.prototype */{
            Mixes: EventMixin,
            constructor: function View(properties) {
                properties = properties || {};
                this.id = this.id || properties.id || Hilo.getUid("View");
                Hilo.copy(this, properties, true);
            },

            id: null,
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            alpha: 1,
            rotation: 0,
            visible: true,
            pivotX: 0,
            pivotY: 0,
            scaleX: 1,
            scaleY: 1,
            pointerEnabled: true,
            drawable: null,
            boundsArea: null,
            parent: null,
            depth: -1,

            stage: {
                get: function () {
                    var obj = this, parent;
                    while (parent = obj.parent) obj = parent;
                    //NOTE: don't use `instanceof` to prevent circular module requirement.
                    //But it's not a very reliable way to check it's a stage instance.
                    if (obj.canvas) return obj;
                    return null;
                }
            },

            measuredWidth: {
                get: function () {
                    return this.width * this.scaleX;
                }
            },
            measuredHeight: {
                get: function () {
                    return this.height * this.scaleY;
                }
            },

            /**
             * 娣诲姞姝ゅ璞″埌鐖跺鍣ㄣ€�
             * @param {Container} container 涓€涓鍣ㄣ€�
             * @param {Uint} index 瑕佹坊鍔犲埌绱㈠紩浣嶇疆銆�
             * @returns 鍙瀵硅薄鏈韩銆�
             */
            addTo: function (container, index) {
                if (typeof index === 'number') container.addChildAt(this, index);
                else container.addChild(this);
                return this;
            },

            /**
             * 浠庣埗瀹瑰櫒閲屽垹闄ゆ瀵硅薄銆�
             * @returns 鍙瀵硅薄鏈韩銆�
             */
            removeFromParent: function () {
                var parent = this.parent;
                if (parent) parent.removeChild(this);
                return this;
            },

            /**
             * 璁剧疆鑳屾櫙濉厖鏍峰紡銆傞檺鍒讹細DOMRenderer浠呮敮鎸丆SS棰滆壊濉厖鏍峰紡銆�
             * @param {Object} fillStyle 濉厖鏍峰紡銆傚彲浠ユ槸CSS棰滆壊鍊笺€乧anvas鐨刧radient鎴杙attern濉厖銆�
             * @param {Number} x 鑳屾櫙濉厖鐨勮捣濮嬬偣鐨剎杞村潗鏍囥€�
             * @param {Number} y 鑳屾櫙濉厖鐨勮捣濮嬬偣鐨剏杞村潗鏍囥€�
             * @param {Number} width 鑳屾櫙濉厖鐨勫尯鍩熷搴︺€�
             * @param {Number} height 鑳屾櫙濉厖鐨勫尯鍩熼珮搴︺€�
             * @returns 鍙瀵硅薄鏈韩銆�
             */
            setBgFill: function (fillStyle, x, y, width, height) {
                if (fillStyle) {
                    var bgFill = this.bgFill || (this.bgFill = {});
                    bgFill.style = fillStyle;
                    bgFill.x = x || 0;
                    bgFill.y = y || 0;
                    if (width) bgFill.width = width;
                    if (height) bgFill.height = height;
                } else {
                    this.bgFill = null;
                }
                return this;
            },

            /**
             * 鑾峰彇鍙瀵硅薄鍦ㄨ垶鍙板叏灞€鍧愭爣绯诲唴鐨勫鎺ョ煩褰互鍙婃墍鏈夐《鐐瑰潗鏍囥€�
             * @returns {Array} 鍙瀵硅薄鐨勯《鐐瑰潗鏍囨暟缁剉ertexs銆傚彟vertexs杩樺寘鍚睘鎬э細
             * <ul>
             * <li><b>x</b> - 鍙瀵硅薄鐨勫鎺ョ煩褰杞村潗鏍囥€�</li>
             * <li><b>y</b> - 鍙瀵硅薄鐨勫鎺ョ煩褰杞村潗鏍囥€�</li>
             * <li><b>width</b> - 鍙瀵硅薄鐨勫鎺ョ煩褰㈢殑瀹藉害銆�</li>
             * <li><b>height</b> - 鍙瀵硅薄鐨勫鎺ョ煩褰㈢殑楂樺害銆�</li>
             * </ul>
             */
            getBounds: function () {
                var w = this.width, h = this.height,
                    mtx = this.getConcatenatedMatrix(),
                    poly = this.boundsArea || [{ x: 0, y: 0 }, { x: w, y: 0 }, { x: w, y: h }, { x: 0, y: h }],
                    vertexs = [], point, x, y, minX, maxX, minY, maxY;

                for (var i = 0, len = poly.length; i < len; i++) {
                    point = mtx.transformPoint(poly[i], true, true);
                    x = point.x;
                    y = point.y;

                    if (i == 0) {
                        minX = maxX = x;
                        minY = maxY = y;
                    } else {
                        if (minX > x) minX = x;
                        else if (maxX < x) maxX = x;
                        if (minY > y) minY = y;
                        else if (maxY < y) maxY = y;
                    }
                    vertexs[i] = point;
                }

                vertexs.x = minX;
                vertexs.y = minY;
                vertexs.width = maxX - minX;
                vertexs.height = maxY - minY;
                return vertexs;
            },

            /**
             * 鑾峰彇鍙瀵硅薄鐩稿浜庡叾鏌愪釜绁栧厛锛堥粯璁や负鑸炲彴Stage锛夌殑杩炴帴鐭╅樀銆�
             * @param {View} ancestor 鍙瀵硅薄鐨勭浉瀵圭殑绁栧厛瀹瑰櫒銆�
             * @private
             */
            getConcatenatedMatrix: function (ancestor) {
                var mtx = new Matrix(1, 0, 0, 1, 0, 0);

                if (ancestor !== this) {
                    for (var o = this; o.parent && o.parent != ancestor; o = o.parent) {
                        var cos = 1, sin = 0,
                            rotation = o.rotation % 360,
                            pivotX = o.pivotX, pivotY = o.pivotY,
                            scaleX = o.scaleX, scaleY = o.scaleY;

                        if (rotation) {
                            var r = rotation * Math.PI / 180;
                            cos = Math.cos(r);
                            sin = Math.sin(r);
                        }

                        if (pivotX != 0) mtx.tx -= pivotX;
                        if (pivotY != 0) mtx.ty -= pivotY;
                        mtx.concat(cos * scaleX, sin * scaleX, -sin * scaleY, cos * scaleY, o.x, o.y);
                    }
                }
                return mtx;
            },

            /**
             * 妫€娴嬬敱x鍜寉鍙傛暟鎸囧畾鐨勭偣鏄惁鍦ㄥ叾澶栨帴鐭╁舰涔嬪唴銆�
             * @param {Number} x 瑕佹娴嬬殑鐐圭殑x杞村潗鏍囥€�
             * @param {Number} y 瑕佹娴嬬殑鐐圭殑y杞村潗鏍囥€�
             * @param {Boolean} usePolyCollision 鏄惁浣跨敤澶氳竟褰㈢鎾炴娴嬨€傞粯璁や负false銆�
             * @returns {Boolean} 鐐规槸鍚﹀湪鍙瀵硅薄涔嬪唴銆�
             */
            hitTestPoint: function (x, y, usePolyCollision) {
                var bound = this.getBounds(),
                    hit = x >= bound.x && x <= bound.x + bound.width &&
                          y >= bound.y && y <= bound.y + bound.height;

                if (hit && usePolyCollision) {
                    hit = pointInPolygon(x, y, bound);
                }
                return hit;
            },

            /**
             * 妫€娴媜bject鍙傛暟鎸囧畾鐨勫璞℃槸鍚︿笌鍏剁浉浜ゃ€�
             * @param {View} object 瑕佹娴嬬殑鍙瀵硅薄銆�
             * @param {Boolean} usePolyCollision 鏄惁浣跨敤澶氳竟褰㈢鎾炴娴嬨€傞粯璁や负false銆�
             */
            hitTestObject: function (object, usePolyCollision) {
                var b1 = this.getBounds(),
                    b2 = object.getBounds(),
                    hit = b1.x <= b2.x + b2.width && b2.x <= b1.x + b1.width &&
                          b1.y <= b2.y + b2.height && b2.y <= b1.y + b1.height;

                if (hit && usePolyCollision) {
                    hit = polygonCollision(b1, b2);
                }
                return !!hit;
            },

            /**
             * 鍙瀵硅薄鐨勫熀鏈覆鏌撳疄鐜帮紝鐢ㄤ簬妗嗘灦鍐呴儴鎴栭珮绾у紑鍙戜娇鐢ㄣ€傞€氬父搴旇閲嶅啓render鏂规硶銆�
             * @param {Renderer} renderer 娓叉煋鍣ㄣ€�
             * @param {Number} delta 娓叉煋鏃舵椂闂村亸绉婚噺銆�
             * @protected
             */
            _render: function (renderer, delta) {
                if ((!this.onUpdate || this.onUpdate(delta) !== false) && renderer.startDraw(this)) {
                    renderer.transform(this);
                    this.render(renderer, delta);
                    renderer.endDraw(this);
                }
            },

            /**
             * 鏇存柊鍙瀵硅薄锛屾鏂规硶浼氬湪鍙瀵硅薄娓叉煋涔嬪墠璋冪敤銆傛鍑芥暟鍙互杩斿洖涓€涓狟oolean鍊笺€傝嫢杩斿洖false锛屽垯姝ゅ璞′笉浼氭覆鏌撱€傞粯璁ゅ€间负null銆�
             * 闄愬埗锛氬鏋滃湪姝ゅ嚱鏁颁腑鏀瑰彉浜嗗彲瑙嗗璞″湪鍏剁埗瀹瑰櫒涓殑灞傜骇锛屽綋鍓嶆覆鏌撳抚骞朵笉浼氭纭覆鏌擄紝鑰屾槸鍦ㄤ笅涓€娓叉煋甯с€傚彲鍦ㄥ叾鐖跺鍣ㄧ殑onUpdate鏂规硶涓潵瀹炵幇銆�
             * @type Function
             * @default null
             */
            onUpdate: null,

            /**
             * 鍙瀵硅薄鐨勫叿浣撴覆鏌撻€昏緫銆傚瓙绫诲彲閫氳繃瑕嗙洊姝ゆ柟娉曞疄鐜拌嚜宸辩殑娓叉煋銆�
             * @param {Renderer} renderer 娓叉煋鍣ㄣ€�
             * @param {Number} delta 娓叉煋鏃舵椂闂村亸绉婚噺銆�
             */
            render: function (renderer, delta) {
                renderer.draw(this);
            },

            /**
             * 杩斿洖鍙瀵硅薄鐨勫瓧绗︿覆琛ㄧず銆�
             * @returns {String} 鍙瀵硅薄鐨勫瓧绗︿覆琛ㄧず銆�
             */
            toString: function () {
                return Hilo.viewToString(this);
            }
        });

        /**
         * @private
         */
        function pointInPolygon(x, y, poly) {
            var cross = 0, onBorder = false, minX, maxX, minY, maxY;

            for (var i = 0, len = poly.length; i < len; i++) {
                var p1 = poly[i], p2 = poly[(i + 1) % len];

                if (p1.y == p2.y && y == p1.y) {
                    p1.x > p2.x ? (minX = p2.x, maxX = p1.x) : (minX = p1.x, maxX = p2.x);
                    if (x >= minX && x <= maxX) {
                        onBorder = true;
                        continue;
                    }
                }

                p1.y > p2.y ? (minY = p2.y, maxY = p1.y) : (minY = p1.y, maxY = p2.y);
                if (y < minY || y > maxY) continue;

                var nx = (y - p1.y) * (p2.x - p1.x) / (p2.y - p1.y) + p1.x;
                if (nx > x) cross++;
                else if (nx == x) onBorder = true;
            }

            return onBorder || (cross % 2 == 1);
        }

        /**
         * @private
         */
        function polygonCollision(poly1, poly2) {
            var result = doSATCheck(poly1, poly2, { overlap: -Infinity, normal: { x: 0, y: 0 } });
            if (result) return doSATCheck(poly2, poly1, result);
            return false;
        }

        /**
         * @private
         */
        function doSATCheck(poly1, poly2, result) {
            var len1 = poly1.length, len2 = poly2.length,
                currentPoint, nextPoint, distance,
                min1, max1, min2, max2, dot, overlap, normal = { x: 0, y: 0 };

            for (var i = 0; i < len1; i++) {
                currentPoint = poly1[i];
                nextPoint = poly1[(i < len1 - 1 ? i + 1 : 0)];

                normal.x = currentPoint.y - nextPoint.y;
                normal.y = nextPoint.x - currentPoint.x;

                distance = Math.sqrt(normal.x * normal.x + normal.y * normal.y);
                normal.x /= distance;
                normal.y /= distance;

                min1 = max1 = poly1[0].x * normal.x + poly1[0].y * normal.y;
                for (var j = 1; j < len1; j++) {
                    dot = poly1[j].x * normal.x + poly1[j].y * normal.y;
                    if (dot > max1) max1 = dot;
                    else if (dot < min1) min1 = dot;
                }

                min2 = max2 = poly2[0].x * normal.x + poly2[0].y * normal.y;
                for (j = 1; j < len2; j++) {
                    dot = poly2[j].x * normal.x + poly2[j].y * normal.y;
                    if (dot > max2) max2 = dot;
                    else if (dot < min2) min2 = dot;
                }

                if (min1 < min2) {
                    overlap = min2 - max1;
                    normal.x = -normal.x;
                    normal.y = -normal.y;
                } else {
                    overlap = min1 - max2;
                }

                if (overlap >= 0) {
                    return false;
                } else if (overlap > result.overlap) {
                    result.overlap = overlap;
                    result.normal.x = normal.x;
                    result.normal.y = normal.y;
                }
            }

            return result;
        }

    })();

    /**
     * @class Container鏄墍鏈夊鍣ㄧ被鐨勫熀绫汇€傛瘡涓狢ontainer閮藉彲浠ユ坊鍔犲叾浠栧彲瑙嗗璞′负瀛愮骇銆�
     * @augments View
     * @param {Object} properties 鍒涘缓瀵硅薄鐨勫睘鎬у弬鏁般€傚彲鍖呭惈姝ょ被鎵€鏈夊彲鍐欏睘鎬с€�
     * @module hilo/view/Container
     * @requires hilo/core/Hilo
     * @requires hilo/core/Class
     * @requires hilo/view/View
     * @property {Array} children 瀹瑰櫒鐨勫瓙鍏冪礌鍒楄〃銆傚彧璇汇€�
     * @property {Number} numChildren 瀹瑰櫒鐨勫瓙鍏冪礌鏁伴噺銆傚彧璇汇€�
     * @property {Boolean} pointerChildren 鎸囩ず瀹瑰櫒鐨勫瓙鍏冪礌鏄惁鑳藉搷搴旂敤鎴蜂氦浜掍簨浠躲€傞粯璁や负true銆�
     * @property {Boolean} clipChildren 鎸囩ず鏄惁瑁佸壀瓒呭嚭瀹瑰櫒鑼冨洿鐨勫瓙鍏冪礌銆傞粯璁や负false銆�
     */
    var Container = Class.create(/** @lends Container.prototype */{
        Extends: View,
        constructor: function Container(properties) {
            properties = properties || {};
            this.id = this.id || properties.id || Hilo.getUid("Container");
            Container.superclass.constructor.call(this, properties);

            if (this.children) this._updateChildren();
            else this.children = [];
        },

        children: null,
        pointerChildren: true,
        clipChildren: false,
        numChildren: {
            get: function () {
                return this.children.length;
            }
        },

        /**
         * 鍦ㄦ寚瀹氱储寮曚綅缃坊鍔犲瓙鍏冪礌銆�
         * @param {View} child 瑕佹坊鍔犵殑瀛愬厓绱犮€�
         * @param {Number} index 鎸囧畾鐨勭储寮曚綅缃紝浠�0寮€濮嬨€�
         */
        addChildAt: function (child, index) {
            var children = this.children,
                len = children.length,
                parent = child.parent;

            index = index < 0 ? 0 : index > len ? len : index;
            var childIndex = this.getChildIndex(child);
            if (childIndex == index) {
                return this;
            } else if (childIndex >= 0) {
                children.splice(childIndex, 1);
            } else if (parent) {
                parent.removeChild(child);
            }

            children.splice(index, 0, child);
            this._updateChildren(index);

            return this;
        },

        /**
         * 鍦ㄦ渶涓婇潰娣诲姞瀛愬厓绱犮€�
         * @param {View} child 瑕佹坊鍔犵殑瀛愬厓绱犮€�
         */
        addChild: function (child) {
            var total = this.children.length,
                args = arguments;

            for (var i = 0, len = args.length; i < len; i++) {
                this.addChildAt(args[i], total + i);
            }
            return this;
        },

        /**
         * 鍦ㄦ寚瀹氱储寮曚綅缃垹闄ゅ瓙鍏冪礌銆�
         * @param {Int} index 鎸囧畾鍒犻櫎鍏冪礌鐨勭储寮曚綅缃紝浠�0寮€濮嬨€�
         * @returns 琚垹闄ょ殑瀵硅薄銆�
         */
        removeChildAt: function (index) {
            var children = this.children;
            if (index < 0 || index >= children.length) return null;

            var child = children[index];
            if (child) {
                var stage = this.stage;
                if (stage) stage.renderer.remove(child);
                child.parent = null;
                child.depth = -1;
            }

            children.splice(index, 1);
            this._updateChildren(index);

            return child;
        },

        /**
         * 鍒犻櫎鎸囧畾鐨勫瓙鍏冪礌銆�
         * @param {View} child 鎸囧畾瑕佸垹闄ょ殑瀛愬厓绱犮€�
         * @returns 琚垹闄ょ殑瀵硅薄銆�
         */
        removeChild: function (child) {
            return this.removeChildAt(this.getChildIndex(child));
        },

        /**
         * 鍒犻櫎鎸囧畾id鐨勫瓙鍏冪礌銆�
         * @param {String} id 鎸囧畾瑕佸垹闄ょ殑瀛愬厓绱犵殑id銆�
         * @returns 琚垹闄ょ殑瀵硅薄銆�
         */
        removeChildById: function (id) {
            var children = this.children, child;
            for (var i = 0, len = children.length; i < len; i++) {
                child = children[i];
                if (child.id === id) {
                    this.removeChildAt(i);
                    return child;
                }
            }
            return null;
        },

        /**
         * 鍒犻櫎鎵€鏈夌殑瀛愬厓绱犮€�
         */
        removeAllChildren: function () {
            while (this.children.length) this.removeChildAt(0);
            return this;
        },

        /**
         * 杩斿洖鎸囧畾绱㈠紩浣嶇疆鐨勫瓙鍏冪礌銆�
         * @param {Number} index 鎸囧畾瑕佽繑鍥炵殑瀛愬厓绱犵殑绱㈠紩鍊硷紝浠�0寮€濮嬨€�
         */
        getChildAt: function (index) {
            var children = this.children;
            if (index < 0 || index >= children.length) return null;
            return children[index];
        },

        /**
         * 杩斿洖鎸囧畾id鐨勫瓙鍏冪礌銆�
         * @param {String} id 鎸囧畾瑕佽繑鍥炵殑瀛愬厓绱犵殑id銆�
         */
        getChildById: function (id) {
            var children = this.children, child;
            for (var i = 0, len = children.length; i < len; i++) {
                child = children[i];
                if (child.id === id) return child;
            }
            return null;
        },

        /**
         * 杩斿洖鎸囧畾瀛愬厓绱犵殑绱㈠紩鍊笺€�
         * @param {View} child 鎸囧畾瑕佽繑鍥炵储寮曞€肩殑瀛愬厓绱犮€�
         */
        getChildIndex: function (child) {
            return this.children.indexOf(child);
        },

        /**
         * 璁剧疆瀛愬厓绱犵殑绱㈠紩浣嶇疆銆�
         * @param {View} child 鎸囧畾瑕佽缃殑瀛愬厓绱犮€�
         * @param {Number} index 鎸囧畾瑕佽缃殑绱㈠紩鍊笺€�
         */
        setChildIndex: function (child, index) {
            var children = this.children,
                oldIndex = children.indexOf(child);

            if (oldIndex >= 0 && oldIndex != index) {
                var len = children.length;
                index = index < 0 ? 0 : index >= len ? len - 1 : index;
                children.splice(oldIndex, 1);
                children.splice(index, 0, child);
                this._updateChildren();
            }
            return this;
        },

        /**
         * 浜ゆ崲涓や釜瀛愬厓绱犵殑绱㈠紩浣嶇疆銆�
         * @param {View} child1 鎸囧畾瑕佷氦鎹㈢殑瀛愬厓绱燗銆�
         * @param {View} child2 鎸囧畾瑕佷氦鎹㈢殑瀛愬厓绱燘銆�
         */
        swapChildren: function (child1, child2) {
            var children = this.children,
                index1 = this.getChildIndex(child1),
                index2 = this.getChildIndex(child2);

            child1.depth = index2;
            children[index2] = child1;
            child2.depth = index1;
            children[index1] = child2;
        },

        /**
         * 浜ゆ崲涓や釜鎸囧畾绱㈠紩浣嶇疆鐨勫瓙鍏冪礌銆�
         * @param {Number} index1 鎸囧畾瑕佷氦鎹㈢殑绱㈠紩浣嶇疆A銆�
         * @param {Number} index2 鎸囧畾瑕佷氦鎹㈢殑绱㈠紩浣嶇疆B銆�
         */
        swapChildrenAt: function (index1, index2) {
            var children = this.children,
                child1 = this.getChildAt(index1),
                child2 = this.getChildAt(index2);

            child1.depth = index2;
            children[index2] = child1;
            child2.depth = index1;
            children[index1] = child2;
        },

        /**
         * 鏍规嵁鎸囧畾閿€兼垨鍑芥暟瀵瑰瓙鍏冪礌杩涜鎺掑簭銆�
         * @param {Object} keyOrFunction 濡傛灉姝ゅ弬鏁颁负String鏃讹紝鍒欐牴鎹瓙鍏冪礌鐨勬煇涓睘鎬у€艰繘琛屾帓搴忥紱濡傛灉姝ゅ弬鏁颁负Function鏃讹紝鍒欐牴鎹鍑芥暟杩涜鎺掑簭銆�
         */
        sortChildren: function (keyOrFunction) {
            var fn = keyOrFunction,
                children = this.children;
            if (typeof fn == "string") {
                var key = fn;
                fn = function (a, b) {
                    return b[key] - a[key];
                };
            }
            children.sort(fn);
            this._updateChildren();
        },

        /**
         * 鏇存柊瀛愬厓绱犮€�
         * @private
         */
        _updateChildren: function (start, end) {
            var children = this.children, child,
                start = start || 0,
                end = end || children.length;
            for (var i = start; i < end; i++) {
                child = children[i];
                child.depth = i + 1;
                child.parent = this;
            }
        },

        /**
         * 杩斿洖鏄惁鍖呭惈鍙傛暟鎸囧畾鐨勫瓙鍏冪礌銆�
         * @param {View} child 鎸囧畾瑕佹祴璇曠殑瀛愬厓绱犮€�
         */
        contains: function (child) {
            return this.getChildIndex(child) >= 0;
        },

        /**
         * 杩斿洖鐢眡鍜寉鎸囧畾鐨勭偣涓嬬殑瀵硅薄銆�
         * @param {Number} x 鎸囧畾鐐圭殑x杞村潗鏍囥€�
         * @param {Number} y 鎸囧畾鐐圭殑y杞村潗鏍囥€�
         * @param {Boolean} usePolyCollision 鎸囧畾鏄惁浣跨敤澶氳竟褰㈢鎾炴娴嬨€傞粯璁や负false銆�
         * @param {Boolean} global 浣跨敤姝ゆ爣蹇楄〃鏄庡皢鏌ユ壘鎵€鏈夌鍚堢殑瀵硅薄锛岃€屼笉浠呬粎鏄涓€涓紝鍗冲叏灞€鍖归厤銆傞粯璁や负false銆�
         * @param {Boolean} eventMode 浣跨敤姝ゆ爣蹇楄〃鏄庡皢鍦ㄤ簨浠舵ā寮忎笅鏌ユ壘瀵硅薄銆傞粯璁や负false銆�
         */
        getViewAtPoint: function (x, y, usePolyCollision, global, eventMode) {
            var result = global ? [] : null,
                children = this.children, child, obj;

            for (var i = children.length - 1; i >= 0; i--) {
                child = children[i];
                //skip child which is not shown or pointer enabled
                if (!child || !child.visible || child.alpha <= 0 || (eventMode && !child.pointerEnabled)) continue;
                //find child recursively
                if (child.children && child.numChildren && !(eventMode && !child.pointerChildren)) {
                    obj = child.getViewAtPoint(x, y, usePolyCollision, global, eventMode);
                }

                if (obj) {
                    if (!global) return obj;
                    else if (obj.length) result = result.concat(obj);
                } else if (child.hitTestPoint(x, y, usePolyCollision)) {
                    if (!global) return child;
                    else result.push(child);
                }
            }

            return global && result.length ? result : null;
        },

        /**
         * 瑕嗙洊娓叉煋鏂规硶銆�
         * @private
         */
        render: function (renderer, delta) {
            Container.superclass.render.call(this, renderer, delta);

            var children = this.children.slice(0), i, len, child;
            for (i = 0, len = children.length; i < len; i++) {
                child = children[i];
                //NOTE: the child could remove or change it's parent
                if (child.parent === this) child._render(renderer, delta);
            }
        }

    });

    /**
     * @class 鑸炲彴鏄彲瑙嗗璞℃爲鐨勬牴锛屽彲瑙嗗璞″彧鏈夋坊鍔犲埌鑸炲彴鎴栧叾瀛愬璞″悗鎵嶄細琚覆鏌撳嚭鏉ャ€�
     * @augments Container
     * @param {Object} properties 鍒涘缓瀵硅薄鐨勫睘鎬у弬鏁般€傚彲鍖呭惈姝ょ被鎵€鏈夊彲鍐欏睘鎬с€�
     * @module hilo/view/Stage
     * @requires hilo/core/Hilo
     * @requires hilo/core/Class
     * @requires hilo/view/Container
     * @requires hilo/renderer/CanvasRenderer
     * @property {HTMLElement} canvas 鑸炲彴鎵€瀵瑰簲鐨勭敾甯冦€傚畠鍙互鏄竴涓猚anvas鎴栦竴涓櫘閫氱殑div銆傚彧璇诲睘鎬с€�
     * @property {Renderer} renderer 鑸炲彴娓叉煋鍣ㄣ€傚彧璇诲睘鎬с€�
     * @property {Boolean} paused 鎸囩ず鑸炲彴鏄惁鏆傚仠鍒锋柊娓叉煋銆�
     * @property {Object} viewport 鑸炲彴鍐呭鍦ㄩ〉闈腑鐨勬覆鏌撳尯鍩熴€傚寘鍚殑灞炴€ф湁锛歭eft銆乼op銆亀idth銆乭eight銆傚彧璇诲睘鎬с€�
     */
    var Stage = Class.create(/** @lends Stage.prototype */{
        Extends: Container,
        constructor: function Stage(properties) {
            properties = properties || {};
            this.id = this.id || properties.id || Hilo.getUid('Stage');
            Stage.superclass.constructor.call(this, properties);

            //init canvas
            var canvas = this.canvas;
            if (typeof canvas === 'string') canvas = Hilo.getElement(canvas);
            if (!canvas) {
                canvas = Hilo.createElement('canvas', {
                    style: {
                        position: 'absolute'
                    }
                });
            }
            this.canvas = canvas;

            if (canvas.parentNode) this.updateViewport();

            if (!properties.width) this.width = this.viewport.width || 320;
            if (!properties.height) this.height = this.viewport.height || 480;

            var isCanvas = canvas.getContext;
            if (isCanvas) {
                canvas.width = this.width;
                canvas.height = this.height;
            }

            //init renderer
            var props = { canvas: canvas, stage: this };
            this.renderer = isCanvas ? new CanvasRenderer(props) : new DOMRenderer(props);
        },

        canvas: null,
        renderer: null,
        paused: false,
        viewport: null,

        /**
         * 璋冪敤tick浼氳Е鍙戣垶鍙扮殑鏇存柊鍜屾覆鏌撱€�
         */
        tick: function (delta) {
            if (!this.paused) {
                this._render(this.renderer, delta);
            }
        },

        /**
         * 寮€鍚�/鍏抽棴DOM浜嬩欢鍔熻兘銆�
         */
        enableDOMEvent: function (type, enable) {
            var me = this,
                canvas = me.canvas,
                types = typeof type === 'string' ? [type] : type,
                handler = me._domListener || (me._domListener = function (e) { me._onDOMEvent(e) });

            for (var i = 0; i < types.length; i++) {
                var type = types[i];
                if (enable === false) {
                    canvas.removeEventListener(type, handler);
                } else {
                    canvas.addEventListener(type, handler, false);
                }
            }
        },

        /**
         * DOM浜嬩欢澶勭悊鍑芥暟銆傛鏂规硶浼氭妸浜嬩欢璋冨害鍒颁簨浠剁殑鍧愭爣鐐规墍瀵瑰簲鐨勫彲瑙嗗璞°€�
         * @private
         */
        _onDOMEvent: function (e) {
            var type = e.type, event = e, isTouch = type.indexOf('touch') == 0;

            //calculate stageX/stageY
            var posObj = e;
            if (isTouch) {
                var touches = e.touches, changedTouches = e.changedTouches;
                posObj = (touches && touches.length) ? touches[0] :
                         (changedTouches && changedTouches.length) ? changedTouches[0] : null;
            }

            var x = posObj.pageX || posObj.clientX, y = posObj.pageY || posObj.clientY,
                viewport = this.viewport || this.updateViewport();

            event.stageX = x = (x - viewport.left) / this.scaleX;
            event.stageY = y = (y - viewport.top) / this.scaleY;

            var obj = this.getViewAtPoint(x, y, true, false, true),
                canvas = this.canvas, target = this._eventTarget;

            //fire mouseout/touchout event for last event target
            var leave = type === 'mouseout' && !canvas.contains(e.relatedTarget);
            if (target && (target != obj || leave)) {
                var out = (type === 'touchmove') ? 'touchout' :
                          (type === 'mousemove' || leave || !obj) ? 'mouseout' : null;
                if (out) target.fire(out);
                event.lastEventTarget = target;
                this._eventTarget = null;
            }

            //fire event for current view
            if (obj && obj.pointerEnabled && type !== 'mouseout') {
                event.eventTarget = this._eventTarget = obj;
                obj.fire(event);
            }

            //set cursor for current view
            if (!isTouch) {
                var cursor = (obj && obj.pointerEnabled && obj.useHandCursor) ? 'pointer' : '';
                canvas.style.cursor = cursor;
            }

            //fire event for stage
            if (leave || type !== "mouseout") this.fire(event);

            //fix android: `touchmove` fires only once
            if (Hilo.browser.android && type === 'touchmove') {
                e.preventDefault();
            }
        },

        /**
         * 鏇存柊鑸炲彴鍦ㄩ〉闈腑鐨勬覆鏌撳尯鍩熴€傚綋鑸炲彴canvas鐨勬牱寮廱order銆乵argin銆乸adding绛夊睘鎬ф洿鏀瑰悗锛岄渶瑕佽皟鐢ㄦ鏂规硶鏇存柊鑸炲彴娓叉煋鍖哄煙銆�
         */
        updateViewport: function () {
            return this.viewport = Hilo.getElementRect(this.canvas);
        }

    });

    /**
     * 绀轰緥:
     * <pre>
     * var bmp = new Hilo.Bitmap({image:imgElem, rect:[0, 0, 100, 100]});
     * stage.addChild(bmp);
     * </pre>
     * @class Bitmap绫昏〃绀轰綅鍥惧浘鍍忕被銆�
     * @augments View
     * @param {Object} properties 鍒涘缓瀵硅薄鐨勫睘鎬у弬鏁般€傚彲鍖呭惈姝ょ被鎵€鏈夊彲鍐欏睘鎬с€傛澶栬繕鍖呮嫭锛�
     * <ul>
     * <li><b>image</b> - 浣嶅浘鎵€鍦ㄧ殑鍥惧儚image銆傚繀闇€銆�</li>
     * <li><b>rect</b> - 浣嶅浘鍦ㄥ浘鍍廼mage涓煩褰㈠尯鍩熴€�</li>
     * </ul>
     * @module hilo/view/Bitmap
     * @requires hilo/core/Hilo
     * @requires hilo/core/Class
     * @requires hilo/view/View
     * @requires hilo/view/Drawable
     */
    var Bitmap = Class.create(/** @lends Bitmap.prototype */{
        Extends: View,
        constructor: function Bitmap(properties) {
            properties = properties || {};
            this.id = this.id || properties.id || Hilo.getUid("Bitmap");
            Bitmap.superclass.constructor.call(this, properties);

            this.drawable = new Drawable(properties);

            //init width and height
            if (!this.width || !this.height) {
                var rect = this.drawable.rect;
                if (rect) {
                    this.width = rect[2];
                    this.height = rect[3];
                }
            }
        }
    });

    /**
     * @class 鍔ㄧ敾绮剧伒绫汇€�
     * @augments View
     * @module hilo/view/Sprite
     * @requires hilo/core/Hilo
     * @requires hilo/core/Class
     * @requires hilo/view/View
     * @requires hilo/view/Drawable
     * @param properties 鍒涘缓瀵硅薄鐨勫睘鎬у弬鏁般€傚彲鍖呭惈姝ょ被鎵€鏈夊彲鍐欏睘鎬с€傛澶栬繕鍖呮嫭锛�
     * <ul>
     * <li><b>frames</b> - 绮剧伒鍔ㄧ敾鐨勫抚鏁版嵁瀵硅薄銆�</li>
     * </ul>
     * @property {number} currentFrame 褰撳墠鎾斁甯х殑绱㈠紩銆備粠0寮€濮嬨€�
     * @property {number} numFrames 绮剧伒鍔ㄧ敾鐨勬€诲抚鏁般€�
     * @property {boolean} paused 鍒ゆ柇绮剧伒鏄惁鏆傚仠銆傞粯璁や负false銆�
     * @property {boolean} loop 鍒ゆ柇绮剧伒鏄惁鍙互寰幆鎾斁銆傞粯璁や负true銆�
     * @property {boolean} timeBased 鎸囧畾绮剧伒鍔ㄧ敾鏄惁鏄互鏃堕棿涓哄熀鍑嗐€傞粯璁や负false锛屽嵆浠ュ抚涓哄熀鍑嗐€�
     * @property {number} interval 绮剧伒鍔ㄧ敾鐨勫抚闂撮殧銆傚鏋渢imeBased涓簍rue锛屽垯鍗曚綅涓烘绉掞紝鍚﹀垯涓哄抚鏁般€�
     */
    var Sprite = Class.create(/** @lends Sprite.prototype */{
        Extends: View,
        constructor: function Sprite(properties) {
            properties = properties || {};
            this.id = this.id || properties.id || Hilo.getUid("Sprite");
            Sprite.superclass.constructor.call(this, properties);

            this._frames = [];
            this._frameNames = {};
            this.drawable = new Drawable();
            if (properties.frames) this.addFrame(properties.frames);
        },

        _frames: null, //鎵€鏈夊抚鐨勯泦鍚�
        _frameNames: null, //甯﹀悕瀛梟ame鐨勫抚鐨勯泦鍚�
        _frameElapsed: 0, //褰撳墠甯ф寔缁殑鏃堕棿鎴栧抚鏁�
        _currentFrame: 0, //褰撳墠甯х殑绱㈠紩

        paused: false,
        loop: true,
        timeBased: false,
        interval: 1,
        currentFrame: {
            get: function () {
                return this._currentFrame;
            }
        },
        numFrames: {
            get: function () {
                return this._frames ? this._frames.length : 0;
            }
        },

        /**
         * 寰€绮剧伒鍔ㄧ敾搴忓垪涓鍔犲抚銆�
         * @param {Object} frame 瑕佸鍔犵殑绮剧伒鍔ㄧ敾甯ф暟鎹€�
         * @returns {Sprite} Sprite瀵硅薄鏈韩銆�
         */
        addFrame: function (frame) {
            var total = this._frames.length;
            if (frame instanceof Array) {
                for (var i = 0, len = frame.length; i < len; i++) {
                    this.setFrame(frame[i], total + i);
                }
            } else {
                this.setFrame(frame, total);
            }
            return this;
        },

        /**
         * 璁剧疆绮剧伒鍔ㄧ敾搴忓垪鎸囧畾绱㈠紩浣嶇疆鐨勫抚銆�
         * @param {Object} frame 瑕佽缃殑绮剧伒鍔ㄧ敾甯ф暟鎹€�
         * @param {Int} index 瑕佽缃殑绱㈠紩浣嶇疆銆�
         * @returns {Sprite} Sprite瀵硅薄鏈韩銆�
         */
        setFrame: function (frame, index) {
            var frames = this._frames,
                total = frames.length;
            index = index < 0 ? 0 : index > total ? total : index;
            frames[index] = frame;
            if (frame.name) this._frameNames[frame.name] = frame;
            if (index == 0 && !this.width || !this.height) {
                this.width = frame.rect[2];
                this.height = frame.rect[3];
            }
            return this;
        },

        /**
         * 鑾峰彇绮剧伒鍔ㄧ敾搴忓垪涓寚瀹氱殑甯с€�
         * @param {Object} indexOrName 瑕佽幏鍙栫殑甯х殑绱㈠紩浣嶇疆鎴栧埆鍚嶃€�
         * @returns {Object} 绮剧伒甯у璞°€�
         */
        getFrame: function (indexOrName) {
            if (typeof indexOrName === 'number') {
                var frames = this._frames;
                if (indexOrName < 0 || indexOrName >= frames.length) return null;
                return frames[indexOrName];
            }
            return this._frameNames[indexOrName];
        },

        /**
         * 鑾峰彇绮剧伒鍔ㄧ敾搴忓垪涓寚瀹氬抚鐨勭储寮曚綅缃€�
         * @param {Object} frameValue 瑕佽幏鍙栫殑甯х殑绱㈠紩浣嶇疆鎴栧埆鍚嶃€�
         * @returns {Object} 绮剧伒甯у璞°€�
         */
        getFrameIndex: function (frameValue) {
            var frames = this._frames,
                total = frames.length,
                index = -1;
            if (typeof frameValue === 'number') {
                index = frameValue;
            } else {
                var frame = typeof frameValue === 'string' ? this._frameNames[frameValue] : frameValue;
                if (frame) {
                    for (var i = 0; i < total; i++) {
                        if (frame === frames[i]) {
                            index = i;
                            break;
                        }
                    }
                }
            }
            return index;
        },

        /**
         * 鎾斁绮剧伒鍔ㄧ敾銆�
         * @returns {Sprite} Sprite瀵硅薄鏈韩銆�
         */
        play: function () {
            this.paused = false;
            return this;
        },

        /**
         * 鏆傚仠鎾斁绮剧伒鍔ㄧ敾銆�
         * @returns {Sprite} Sprite瀵硅薄鏈韩銆�
         */
        stop: function () {
            this.paused = true;
            return this;
        },

        /**
         * 璺宠浆绮剧伒鍔ㄧ敾鍒版寚瀹氱殑甯с€�
         * @param {Object} indexOrName 瑕佽烦杞殑甯х殑绱㈠紩浣嶇疆鎴栧埆鍚嶃€�
         * @param {Boolean} pause 鎸囩ず璺宠浆鍚庢槸鍚︽殏鍋滄挱鏀俱€�
         * @returns {Sprite} Sprite瀵硅薄鏈韩銆�
         */
        goto: function (indexOrName, pause) {
            var total = this._frames.length,
                index = this.getFrameIndex(indexOrName);

            this._currentFrame = index < 0 ? 0 : index >= total ? total - 1 : index;
            this.paused = pause;
            return this;
        },

        /**
         * 娓叉煋鏂规硶銆�
         * @private
         */
        _render: function (renderer, delta) {
            var frameIndex = this._nextFrame(delta),
                frame = this._frames[frameIndex];

            this.drawable.init(frame);
            Sprite.superclass._render.call(this, renderer, delta);
        },

        /**
         * @private
         */
        _nextFrame: function (delta) {
            var frames = this._frames,
                total = frames.length,
                frameIndex = this._currentFrame,
                frame = frames[frameIndex],
                duration = frame.duration || this.interval,
                elapsed = this._frameElapsed;

            //calculate the current frame elapsed frames/time
            var value = (frameIndex == 0 && !this.drawable) ? 0 : elapsed + (this.timeBased ? delta : 1);
            elapsed = this._frameElapsed = value < duration ? value : 0;

            if (frame.stop || !this.loop && frameIndex >= total - 1) {
                this.stop();
            }

            if (!this.paused && elapsed == 0) {
                if (frame.next != null) {
                    //jump to the specified frame
                    frameIndex = this.getFrameIndex(frame.next);
                } else if (frameIndex >= total - 1) {
                    //at the end of the frames, go back to first frame
                    frameIndex = 0;
                } else if (this.drawable) {
                    //normal go forward to next frame
                    frameIndex++;
                }

                this._currentFrame = frameIndex;
            }

            if (this.onEnterFrame) this.onEnterFrame(frameIndex);

            return frameIndex;
        },

        /**
         * 绮剧伒鍔ㄧ敾鐨勬挱鏀惧ご杩涘叆鏂板抚鏃剁殑鍥炶皟鏂规硶銆傞粯璁ゅ€间负null銆�
         * @type Function
         */
        onEnterFrame: null

    });

    /**
     * @name DOMElement
     * @class DOMElement鏄痙om鍏冪礌鐨勫寘瑁呫€�
     * @augments View
     * @param {Object} properties 鍒涘缓瀵硅薄鐨勫睘鎬у弬鏁般€傚彲鍖呭惈姝ょ被鎵€鏈夊彲鍐欏睘鎬с€傜壒娈婂睘鎬ф湁锛�
     * <ul>
     * <li><b>element</b> - 瑕佸寘瑁呯殑dom鍏冪礌銆傚繀闇€銆�</li>
     * </ul>
     * @module hilo/view/DOMElement
     * @requires hilo/core/Hilo
     * @requires hilo/core/Class
     * @requires hilo/view/View
     * @requires hilo/view/Drawable
     */
    var DOMElement = Class.create(/** @lends DOMElement.prototype */{
        Extends: View,
        constructor: function DOMElement(properties) {
            properties = properties || {};
            this.id = this.id || properties.id || Hilo.getUid("DOMElement");
            DOMElement.superclass.constructor.call(this, properties);

            this.drawable = new Drawable();
            var elem = this.drawable.domElement = properties.element || Hilo.createElement('div');
            elem.id = this.id;
        },

        /**
         * 瑕嗙洊娓叉煋鏂规硶銆�
         * @private
         */
        _render: function (renderer, delta) {
            if (!this.onRender || this.onRender(delta) !== false) {
                var elem = this.drawable.domElement, style = elem.style;
                if (!this.visible || this.alpha <= 0) {
                    style.display = 'none';
                    return;
                }

                style.display = '';
                Hilo.setElementStyleByView(this);
                this.render(renderer, delta);
            }
        },

        /**
         * 瑕嗙洊娓叉煋鏂规硶銆�
         * @private
         */
        render: function (renderer, delta) {
            var canvas = renderer.canvas;
            if (canvas.getContext) {
                var elem = this.drawable.domElement, depth = this.depth,
                    nextElement = canvas.nextSibling, nextDepth;
                if (elem.parentNode) return;

                //draw dom element just after stage canvas
                while (nextElement && nextElement.nodeType != 3) {
                    nextDepth = parseInt(nextElement.style.zIndex) || 0;
                    if (nextDepth <= 0 || nextDepth > depth) {
                        break;
                    }
                    nextElement = nextElement.nextSibling;
                }
                canvas.parentNode.insertBefore(this.drawable.domElement, nextElement);
            } else {
                renderer.draw(this);
            }
        }
    });

    /**
     * @class Graphics绫诲寘鍚竴缁勫垱寤虹煝閲忓浘褰㈢殑鏂规硶銆�
     * @augments View
     * @param {Object} properties 鍒涘缓瀵硅薄鐨勫睘鎬у弬鏁般€傚彲鍖呭惈姝ょ被鎵€鏈夊彲鍐欏睘鎬с€�
     * @module hilo/view/Graphics
     * @requires hilo/core/Hilo
     * @requires hilo/core/Class
     * @property {Number} lineWidth 绗旂敾鐨勭嚎鏉″搴︺€傞粯璁や负1銆傚彧璇诲睘鎬с€�
     * @property {Number} lineAlpha 绗旂敾鐨勭嚎鏉￠€忔槑搴︺€傞粯璁や负1銆傚彧璇诲睘鎬с€�
     * @property {String} lineCap 绗旂敾鐨勭嚎鏉＄閮ㄦ牱寮忋€傚彲閫夊€兼湁锛歜utt銆乺ound銆乻quare绛夛紝榛樿涓簄ull銆傚彧璇诲睘鎬с€�
     * @property {String} lineJoin 绗旂敾鐨勭嚎鏉¤繛鎺ユ牱寮忋€傚彲閫夊€兼湁锛歮iter銆乺ound銆乥evel绛夛紝榛樿涓簄ull銆傚彧璇诲睘鎬с€�
     * @property {Number} miterLimit 鏂滆繛绾块暱搴﹀拰绾挎潯瀹藉害鐨勬渶澶ф瘮鐜囥€傛灞炴€т粎褰搇ineJoin涓簃iter鏃舵湁鏁堛€傞粯璁ゅ€间负10銆傚彧璇诲睘鎬с€�
     * @property {String} strokeStyle 绗旂敾杈规鐨勬牱寮忋€傞粯璁ゅ€间负'0'锛屽嵆榛戣壊銆傚彧璇诲睘鎬с€�
     * @property {String} fillStyle 鍐呭濉厖鐨勬牱寮忋€傞粯璁ゅ€间负'0'锛屽嵆榛戣壊銆傚彧璇诲睘鎬с€�
     * @property {Number} fillAlpha 鍐呭濉厖鐨勯€忔槑搴︺€傞粯璁ゅ€间负0銆傚彧璇诲睘鎬с€�
     */
    var Graphics = (function () {

        var helpContext = document.createElement('canvas').getContext('2d');

        return Class.create(/** @lends Graphics.prototype */{
            Extends: View,
            constructor: function Graphics(properties) {
                properties = properties || {};
                this.id = this.id || properties.id || Hilo.getUid('Graphics');
                Graphics.superclass.constructor.call(this, properties);

                this._actions = [];
                this._cache = null;
            },

            lineWidth: 1,
            lineAlpha: 1,
            lineCap: null, //'butt', 'round', 'square'
            lineJoin: null, //'miter', 'round', 'bevel'
            miterLimit: 10,
            hasStroke: false,
            strokeStyle: '0',
            hasFill: false,
            fillStyle: '0',
            fillAlpha: 0,

            /**
             * 鎸囧畾缁樺埗鍥惧舰鐨勭嚎鏉℃牱寮忋€�
             * @param {Number} thickness 绾挎潯鐨勭矖缁嗗€笺€傞粯璁や负1銆�
             * @param {String} lineColor 绾挎潯鐨凜SS棰滆壊鍊笺€傞粯璁や负榛戣壊锛屽嵆'0'銆�
             * @param {Number} lineAlpha 绾挎潯鐨勯€忔槑搴﹀€笺€傞粯璁や负涓嶉€忔槑锛屽嵆1銆�
             * @param {String} lineCap 绾挎潯鐨勭閮ㄦ牱寮忋€傚彲閫夊€兼湁锛歜utt銆乺ound銆乻quare绛夛紝榛樿鍊间负null銆�
             * @param {String} lineJoin 绾挎潯鐨勮繛鎺ユ牱寮忋€傚彲閫夊€兼湁锛歮iter銆乺ound銆乥evel绛夛紝榛樿鍊间负null銆�
             * @param {Number} miterLimit 鏂滆繛绾块暱搴﹀拰绾挎潯瀹藉害鐨勬渶澶ф瘮鐜囥€傛灞炴€т粎褰搇ineJoin涓簃iter鏃舵湁鏁堛€傞粯璁ゅ€间负10銆�
             */
            lineStyle: function (thickness, lineColor, lineAlpha, lineCap, lineJoin, miterLimit) {
                var me = this, addAction = me._addAction;
                addAction.call(me, ['lineWidth', (me.lineWidth = thickness || 1)]);
                addAction.call(me, ['strokeStyle', (me.strokeStyle = lineColor || '0')]);
                addAction.call(me, ['lineAlpha', (me.lineAlpha = lineAlpha || 1)]);
                if (lineCap != undefined) addAction.call(me, ['lineCap', (me.lineCap = lineCap)]);
                if (lineJoin != undefined) addAction.call(me, ['lineJoin', (me.lineJoin = lineJoin)]);
                if (miterLimit != undefined) addAction.call(me, ['miterLimit', (me.miterLimit = miterLimit)]);
                me.hasStroke = true;
                return me;
            },

            /**
             * 鎸囧畾缁樺埗鍥惧舰鐨勫～鍏呮牱寮忓拰閫忔槑搴︺€�
             * @param {String} fill 濉厖鏍峰紡銆傚彲浠ユ槸color銆乬radient鎴杙attern銆�
             * @param {Number} alpha 閫忔槑搴︺€�
             */
            beginFill: function (fill, alpha) {
                var me = this, addAction = me._addAction;

                addAction.call(me, ['fillStyle', (me.fillStyle = fill)]);
                addAction.call(me, ['fillAlpha', (me.fillAlpha = alpha || 1)]);
                me.hasFill = true;
                return me;
            },

            /**
             * 搴旂敤骞剁粨鏉熺瑪鐢荤殑缁樺埗鍜屽浘褰㈡牱寮忕殑濉厖銆�
             */
            endFill: function () {
                var me = this, addAction = me._addAction;

                if (me.hasStroke) addAction.call(me, ['stroke']);
                if (me.hasFill) addAction.call(me, ['fill']);
                return me;
            },

            /**
             * 鎸囧畾缁樺埗鍥惧舰鐨勭嚎鎬ф笎鍙樺～鍏呮牱寮忋€�
             * @param {Number} x0 娓愬彉鐨勮捣濮嬬偣鐨剎杞村潗鏍囥€�
             * @param {Number} y0 娓愬彉鐨勮捣濮嬬偣鐨剏杞村潗鏍囥€�
             * @param {Number} x1 娓愬彉鐨勭粨鏉熺偣鐨剎杞村潗鏍囥€�
             * @param {Number} y1 娓愬彉鐨勭粨鏉熺偣鐨剏杞村潗鏍囥€�
             * @param {Array} colors 娓愬彉涓娇鐢ㄧ殑CSS棰滆壊鍊兼暟缁勩€�
             * @param {Array} ratois 娓愬彉涓紑濮嬩笌缁撴潫涔嬮棿鐨勪綅缃暟缁勩€傞渶涓巆olors鏁扮粍閲岀殑棰滆壊鍊间竴涓€瀵瑰簲锛屼粙浜�0.0涓�1.0涔嬮棿鐨勫€笺€�
             */
            beginLinearGradientFill: function (x0, y0, x1, y1, colors, ratios) {
                var me = this, gradient = helpContext.createLinearGradient(x0, y0, x1, y1);

                for (var i = 0, len = colors.length; i < len; i++) {
                    gradient.addColorStop(ratios[i], colors[i]);
                }
                me.hasFill = true;
                return me._addAction(['fillStyle', (me.fillStyle = gradient)]);
            },

            /**
             * 鎸囧畾缁樺埗鍥惧舰鐨勬斁灏勬€ф笎鍙樺～鍏呮牱寮忋€�
             * @param {Number} x0 娓愬彉鐨勮捣濮嬪渾鐨剎杞村潗鏍囥€�
             * @param {Number} y0 娓愬彉鐨勮捣濮嬪渾鐨剏杞村潗鏍囥€�
             * @param {Number} r0 娓愬彉鐨勮捣濮嬪渾鐨勫崐寰勩€�
             * @param {Number} x1 娓愬彉鐨勭粨鏉熷渾鐨剎杞村潗鏍囥€�
             * @param {Number} y1 娓愬彉鐨勭粨鏉熷渾鐨剏杞村潗鏍囥€�
             * @param {Number} r1 娓愬彉鐨勭粨鏉熷渾鐨勫崐寰勩€�
             * @param {Array} colors 娓愬彉涓娇鐢ㄧ殑CSS棰滆壊鍊兼暟缁勩€�
             * @param {Array} ratois 娓愬彉涓紑濮嬩笌缁撴潫涔嬮棿鐨勪綅缃暟缁勩€傞渶涓巆olors鏁扮粍閲岀殑棰滆壊鍊间竴涓€瀵瑰簲锛屼粙浜�0.0涓�1.0涔嬮棿鐨勫€笺€�
             */
            beginRadialGradientFill: function (x0, y0, r0, x1, y1, r1, colors, ratios) {
                var me = this, gradient = helpContext.createRadialGradient(x0, y0, r0, x1, y1, r1);
                for (var i = 0, len = colors.length; i < len; i++) {
                    gradient.addColorStop(ratios[i], colors[i]);
                }
                me.hasFill = true;
                return me._addAction(['fillStyle', (me.fillStyle = gradient)]);
            },

            /**
             * 寮€濮嬩竴涓綅鍥惧～鍏呮牱寮忋€�
             * @param {HTMLImageElement} image 鎸囧畾濉厖鐨処mage瀵硅薄銆�
             * @param {String} repetition 鎸囧畾濉厖鐨勯噸澶嶈缃弬鏁般€傚畠鍙互鏄互涓嬩换鎰忎竴涓€硷細repeat, repeat-x, repeat-y, no-repeat銆傞粯璁や负''銆�
             */
            beginBitmapFill: function (image, repetition) {
                var me = this, pattern = helpContext.createPattern(image, repetition || '');
                me.hasFill = true;
                return me._addAction(['fillStyle', (me.fillStyle = pattern)]);
            },

            /**
             * 寮€濮嬩竴涓柊鐨勮矾寰勩€�
             */
            beginPath: function () {
                return this._addAction(['beginPath']);
            },

            /**
             * 鍏抽棴褰撳墠鐨勮矾寰勩€�
             */
            closePath: function () {
                return this._addAction(['closePath']);
            },

            /**
             * 缁樺埗涓€涓煩褰€�
             * @param {Number} x x杞村潗鏍囥€�
             * @param {Number} y y杞村潗鏍囥€�
             * @param {Number} width 鐭╁舰鐨勫搴︺€�
             * @param {Number} height 鐭╁舰鐨勯珮搴︺€�
             */
            drawRect: function (x, y, width, height) {
                return this._addAction(['rect', x, y, width, height]);
            },

            /**
             * 缁樺埗涓€涓鏉傜殑鍦嗚鐭╁舰銆�
             * @param {Number} x x杞村潗鏍囥€�
             * @param {Number} y y杞村潗鏍囥€�
             * @param {Number} width 鍦嗚鐭╁舰鐨勫搴︺€�
             * @param {Number} height 鍦嗚鐭╁舰鐨勯珮搴︺€�
             * @param {Number} cornerTL 鍦嗚鐭╁舰鐨勫乏涓婂渾瑙掑ぇ灏忋€�
             * @param {Number} cornerTR 鍦嗚鐭╁舰鐨勫彸涓婂渾瑙掑ぇ灏忋€�
             * @param {Number} cornerBR 鍦嗚鐭╁舰鐨勫彸涓嬪渾瑙掑ぇ灏忋€�
             * @param {Number} cornerBL 鍦嗚鐭╁舰鐨勫乏涓嬪渾瑙掑ぇ灏忋€�
             */
            drawRoundRectComplex: function (x, y, width, height, cornerTL, cornerTR, cornerBR, cornerBL) {
                var me = this, addAction = me._addAction;
                addAction.call(me, ['moveTo', x + cornerTL, y]);
                addAction.call(me, ['lineTo', x + width - cornerTR, y]);
                addAction.call(me, ['arc', x + width - cornerTR, y + cornerTR, cornerTR, -Math.PI / 2, 0, false]);
                addAction.call(me, ['lineTo', x + width, y + height - cornerBR]);
                addAction.call(me, ['arc', x + width - cornerBR, y + height - cornerBR, cornerBR, 0, Math.PI / 2, false]);
                addAction.call(me, ['lineTo', x + cornerBL, y + height]);
                addAction.call(me, ['arc', x + cornerBL, y + height - cornerBL, cornerBL, Math.PI / 2, Math.PI, false]);
                addAction.call(me, ['lineTo', x, y + cornerTL]);
                addAction.call(me, ['arc', x + cornerTL, y + cornerTL, cornerTL, Math.PI, Math.PI * 3 / 2, false]);
                return me;
            },

            /**
             * 缁樺埗涓€涓渾瑙掔煩褰€�
             * @param {Number} x x杞村潗鏍囥€�
             * @param {Number} y y杞村潗鏍囥€�
             * @param {Number} width 鍦嗚鐭╁舰鐨勫搴︺€�
             * @param {Number} height 鍦嗚鐭╁舰鐨勯珮搴︺€�
             * @param {Number} cornerSize 鍦嗚鐭╁舰鐨勫渾瑙掑ぇ灏忋€�
             */
            drawRoundRect: function (x, y, width, height, cornerSize) {
                return this.drawRoundRectComplex(x, y, width, height, cornerSize, cornerSize, cornerSize, cornerSize);
            },

            /**
             * 缁樺埗涓€涓渾銆�
             * @param {Number} x x杞村潗鏍囥€�
             * @param {Number} y y杞村潗鏍囥€�
             * @param {Number} radius 鍦嗙殑鍗婂緞銆�
             */
            drawCircle: function (x, y, radius) {
                return this._addAction(['arc', x + radius, y + radius, radius, 0, Math.PI * 2, 0]);
            },

            /**
             * 缁樺埗涓€涓き鍦嗐€�
             * @param {Number} x x杞村潗鏍囥€�
             * @param {Number} y y杞村潗鏍囥€�
             * @param {Number} width 妞渾鐨勫搴︺€�
             * @param {Number} height 妞渾鐨勯珮搴︺€�
             */
            drawEllipse: function (x, y, width, height) {
                var me = this;
                if (width == height) return me.drawCircle(x, y, width);

                var addAction = me._addAction;
                var w = width / 2, h = height / 2, C = 0.5522847498307933, cx = C * w, cy = C * h;
                x = x + w;
                y = y + h;

                addAction.call(me, ['moveTo', x + w, y]);
                addAction.call(me, ['bezierCurveTo', x + w, y - cy, x + cx, y - h, x, y - h]);
                addAction.call(me, ['bezierCurveTo', x - cx, y - h, x - w, y - cy, x - w, y]);
                addAction.call(me, ['bezierCurveTo', x - w, y + cy, x - cx, y + h, x, y + h]);
                addAction.call(me, ['bezierCurveTo', x + cx, y + h, x + w, y + cy, x + w, y]);
                return me;
            },

            /**
             * 鏍规嵁鍙傛暟鎸囧畾鐨凷VG鏁版嵁缁樺埗涓€鏉¤矾寰勩€�
             * 浠ｇ爜绀轰緥:
             * <p>var path = 'M250 150 L150 350 L350 350 Z';</p>
             * <p>var shape = new Hilo.Graphics({width:500, height:500});</p>
             * <p>shape.drawSVGPath(path).beginFill('#0ff').endFill();</p>
             * @param {String} pathData 瑕佺粯鍒剁殑SVG璺緞鏁版嵁銆�
             */
            drawSVGPath: function (pathData) {
                var me = this, addAction = me._addAction,
                    path = pathData.split(/,| (?=[a-zA-Z])/);

                addAction.call(me, ['beginPath']);
                for (var i = 0, len = path.length; i < len; i++) {
                    var str = path[i], cmd = str[0].toUpperCase(), p = str.substring(1).split(/,| /);
                    if (p[0].length == 0) p.shift();

                    switch (cmd) {
                        case 'M':
                            addAction.call(me, ['moveTo', p[0], p[1]]);
                            break;
                        case 'L':
                            addAction.call(me, ['lineTo', p[0], p[1]]);
                            break;
                        case 'C':
                            addAction.call(me, ['bezierCurveTo', p[0], p[1], p[2], p[3], p[4], p[5]]);
                            break;
                        case 'Z':
                            addAction.call(me, ['closePath']);
                            break;
                    }
                }
                return me;
            },

            /**
             * 鎵ц鍏ㄩ儴缁樺埗鍔ㄤ綔銆傚唴閮ㄧ鏈夋柟娉曘€�
             * @private
             */
            _draw: function (context) {
                var me = this, actions = me._actions, len = actions.length, i;

                context.beginPath();
                for (i = 0; i < len; i++) {
                    var action = actions[i],
                        f = action[0],
                        args = action.length > 1 ? action.slice(1) : null;

                    if (typeof (context[f]) == 'function') context[f].apply(context, args);
                    else context[f] = action[1];
                }
            },

            /**
             * 閲嶅啓娓叉煋瀹炵幇銆�
             * @private
             */
            render: function (renderer, delta) {
                var me = this, canvas = renderer.canvas;
                if (canvas.getContext) {
                    me._draw(renderer.context);
                } else {
                    var drawable = me.drawable;
                    if (!drawable.image) {
                        drawable.image = me.toImage();
                    }
                    renderer.draw(me);
                }
            },

            /**
             * 缂撳瓨graphics鍒颁竴涓猚anvas鎴杋mage銆傚彲鐢ㄦ潵鎻愰珮娓叉煋鏁堢巼銆�
             * @param {Boolean} toImage 鏄惁缂撳瓨涓篒mage銆�
             */
            cache: function (toImage) {
                var me = this, cached = me._cache;
                if (!cached) {
                    cached = me._cache = Hilo.createElement('canvas', { width: me.width, height: me.height });
                    me._draw(cached.getContext('2d'));
                }
                if (toImage) cached = me._cache = me.toImage();

                return cached;
            },

            /**
             * 娓呴櫎缂撳瓨銆�
             */
            uncache: function () {
                this._cache = null;
            },

            /**
             * 鎶奊raphics瀵硅薄杞崲鎴恉ataURL鏍煎紡鐨勪綅鍥俱€�
             * @param {String} type 鎸囧畾杞崲涓篋ataURL鏍煎紡鐨勫浘鐗噈ime绫诲瀷銆傞粯璁や负'image/png'銆�
             */
            toImage: function (type) {
                var me = this, obj = me._cache, w = me.width, h = me.height;

                if (!obj) {
                    obj = Hilo.createElement('canvas', { width: w, height: h });
                    me._draw(obj.getContext('2d'));
                }

                if (!(obj instanceof HTMLImageElement)) {
                    var src = obj.toDataURL(type || 'image/png');
                    obj = new Image();
                    obj.src = src;
                    obj.width = w;
                    obj.height = h;
                }

                return obj;
            },

            /**
             * 娓呴櫎鎵€鏈夌粯鍒跺姩浣滃苟澶嶅師鎵€鏈夊垵濮嬬姸鎬併€�
             */
            clear: function () {
                var me = this;

                me._actions.length = 0;
                me._cache = null;

                me.lineWidth = 1;
                me.lineAlpha = 1;
                me.lineCap = null;
                me.lineJoin = null;
                me.miterLimit = 10;
                me.hasStroke = false;
                me.strokeStyle = '0';
                me.hasFill = false;
                me.fillStyle = '0';
                me.fillAlpha = 1;
            },

            /**
             * 娣诲姞涓€涓粯鍒跺姩浣溿€傚唴閮ㄧ鏈夋柟娉曘€�
             * @private
             */
            _addAction: function (action) {
                var me = this;
                me._actions.push(action);
                return me;
            }

        });

    })();

    /**
     * @class Text绫绘彁渚涚畝鍗曠殑鏂囧瓧鏄剧ず鍔熻兘銆傚鏉傜殑鏂囨湰鍔熻兘鍙互浣跨敤DOMElement銆�
     * @augments View
     * @param {Object} properties 鍒涘缓瀵硅薄鐨勫睘鎬у弬鏁般€傚彲鍖呭惈姝ょ被鎵€鏈夊彲鍐欏睘鎬с€�
     * @module hilo/view/Text
     * @requires hilo/core/Class
     * @requires hilo/core/Hilo
     * @requires hilo/view/View
     * @property {String} text 鎸囧畾瑕佹樉绀虹殑鏂囨湰鍐呭銆�
     * @property {String} color 鎸囧畾浣跨敤鐨勫瓧浣撻鑹层€�
     * @property {String} textAlign 鎸囧畾鏂囨湰鐨勫榻愭柟寮忋€傚彲浠ユ槸浠ヤ笅浠绘剰涓€涓€硷細'start', 'end', 'left', 'right', and 'center'銆�
     * @property {Boolean} outline 鎸囧畾鏂囨湰鏄粯鍒惰竟妗嗚繕鏄～鍏呫€�
     * @property {Number} lineSpacing 鎸囧畾鏂囨湰鐨勮璺濄€傚崟浣嶄负鍍忕礌銆傞粯璁ゅ€间负0銆�
     * @property {Number} textWidth 鎸囩ず鏂囨湰鍐呭鐨勫搴︼紝鍙灞炴€с€備粎鍦╟anvas妯″紡涓嬫湁鏁堛€�
     * @property {Number} textHeight 鎸囩ず鏂囨湰鍐呭鐨勯珮搴︼紝鍙灞炴€с€備粎鍦╟anvas妯″紡涓嬫湁鏁堛€�
     * @property {String} font 鎸囧畾浣跨敤鐨勫瓧浣撴牱寮忋€�
     */
    var Text = Class.create(/** @lends Text.prototype */{
        Extends: View,
        constructor: function Text(properties) {
            properties = properties || {};
            this.id = this.id || properties.id || Hilo.getUid('Text');
            Text.superclass.constructor.call(this, properties);

            if (!this.width) this.width = 200; //default width
            if (!this.font) this.font = '12px arial'; //default font style
        },

        text: null,
        color: null,
        textAlign: null,
        outline: false,
        lineSpacing: 0,
        textWidth: 0, //read-only
        textHeight: 0, //read-only
        font: {
            get: function () {
                return this._font || null;
            },
            set: function (value) {
                if (this._font === value) return;
                this._font = value;
                this._fontHeight = Text.measureFontHeight(value);
            }
        },

        /**
         * 瑕嗙洊娓叉煋鏂规硶銆�
         */
        render: function (renderer, delta) {
            var me = this, canvas = renderer.canvas;

            if (canvas.getContext) {
                me._draw(renderer.context);
            } else {
                var drawable = me.drawable;
                var domElement = drawable.domElement;
                var style = domElement.style;

                style.font = me.font;
                style.textAlign = me.textAlign;
                style.color = me.color;
                style.width = me.width + 'px';
                style.height = me.height + 'px';
                style.lineHeight = (me._fontHeight + me.lineSpacing) + 'px';

                domElement.innerHTML = me.text;
                renderer.draw(this);
            }
        },

        /**
         * 鍦ㄦ寚瀹氱殑娓叉煋涓婁笅鏂囦笂缁樺埗鏂囨湰銆�
         * @private
         */
        _draw: function (context) {
            var me = this, text = me.text.toString();
            if (!text) return;

            //set drawing style
            context.font = me.font;
            context.textAlign = me.textAlign;
            context.textBaseline = 'top';
            if (me.outline) context.strokeStyle = me.color;
            else context.fillStyle = me.color;

            //find and draw all explicit lines
            var lines = text.split(/\r\n|\r|\n|<br(?:[ \/])*>/);
            var width = 0, height = 0;
            var lineHeight = me._fontHeight + me.lineSpacing;
            var i, line, w;

            for (i = 0, len = lines.length; i < len; i++) {
                line = lines[i];
                w = context.measureText(line).width;

                //check if the line need to split
                if (w <= me.width) {
                    me._drawTextLine(context, line, height);
                    if (width < w) width = w;
                    height += lineHeight;
                    continue;
                }

                var str = '', oldWidth = 0, newWidth, j, word;

                for (j = 0, wlen = line.length; j < wlen; j++) {
                    word = line[j];
                    newWidth = context.measureText(str + word).width;

                    if (newWidth > me.width) {
                        me._drawTextLine(context, str, height);
                        if (width < oldWidth) width = oldWidth;
                        height += lineHeight;
                        str = word;
                    } else {
                        oldWidth = newWidth;
                        str += word;
                    }

                    if (j == wlen - 1) {
                        me._drawTextLine(context, str, height);
                        if (str !== word && width < newWidth) width = newWidth;
                        height += lineHeight;
                    }
                }
            }

            me.textWidth = width;
            me.textHeight = height;
            if (!me.height) me.height = height;
        },

        /**
         * 鍦ㄦ寚瀹氱殑娓叉煋涓婁笅鏂囦笂缁樺埗涓€琛屾枃鏈€�
         * @private
         */
        _drawTextLine: function (context, text, y) {
            var me = this, x = 0, width = me.width;

            switch (me.textAlign) {
                case 'center':
                    x = width * 0.5 >> 0;
                    break;
                case 'right':
                case 'end':
                    x = width;
                    break;
            };

            if (me.outline) context.strokeText(text, x, y);
            else context.fillText(text, x, y);
        },

        Statics: /** @lends Text */{
            /**
             * 娴嬬畻鎸囧畾瀛椾綋鏍峰紡鐨勮楂樸€�
             * @param {String} font 鎸囧畾瑕佹祴绠楃殑瀛椾綋鏍峰紡銆�
             * @return {Number} 杩斿洖鎸囧畾瀛椾綋鐨勮楂樸€�
             */
            measureFontHeight: function (font) {
                var docElement = document.documentElement, fontHeight;
                var elem = Hilo.createElement('div', { style: { font: font, position: 'absolute' }, innerHTML: 'M' });

                docElement.appendChild(elem);
                fontHeight = elem.offsetHeight;
                docElement.removeChild(elem);
                return fontHeight;
            }
        }

    });

    /**
     * @class BitmapText绫绘彁渚涗娇鐢ㄤ綅鍥炬枃鏈殑鍔熻兘銆傚綋鍓嶄粎鏀寔鍗曡鏂囨湰銆�
     * @augments Container
     * @param {Object} properties 鍒涘缓瀵硅薄鐨勫睘鎬у弬鏁般€傚彲鍖呭惈姝ょ被鎵€鏈夊彲鍐欏睘鎬с€�
     * @module hilo/view/BitmapText
     * @requires hilo/core/Class
     * @requires hilo/core/Hilo
     * @requires hilo/view/Container
     * @property {Object} glyphs 浣嶅浘瀛椾綋鐨勫瓧褰㈤泦鍚堛€傛牸寮忎负锛歿letter:{image:img, rect:[0,0,100,100]}}銆�
     * @property {Number} letterSpacing 瀛楄窛锛屽嵆瀛楃闂寸殑闂撮殧銆傞粯璁ゅ€间负0銆�
     */
    var BitmapText = Class.create(/** @lends BitmapText.prototype */{
        Extends: Container,
        constructor: function BitmapText(properties) {
            properties = properties || {};
            this.id = this.id || properties.id || Hilo.getUid('BitmapText');
            BitmapText.superclass.constructor.call(this, properties);

            this.pointerChildren = false; //disable user events for single letters
        },

        glyphs: null,
        letterSpacing: 0,
        text: {
            get: function () {
                return this._text || '';
            },
            set: function (str) {
                var me = this, str = str.toString(), len = str.length;
                if (me._text == str) return;
                me._text = str;

                if (!me.children) me.children = [];
                me.removeAllChildren();

                var i, charStr, charGlyph, charObj, width = 0, height = 0, left = 0;

                for (i = 0; i < len; i++) {
                    charStr = str.charAt(i);
                    charGlyph = me.glyphs[charStr];
                    if (charGlyph) {
                        left = width + (width > 0 ? me.letterSpacing : 0);
                        charObj = new Bitmap({
                            image: charGlyph.image,
                            rect: charGlyph.rect,
                            x: left
                        });
                        width = left + charGlyph.rect[2];
                        height = Math.max(height, charGlyph.rect[3]);
                        me.addChild(charObj);
                    }
                }

                me.width = width;
                me.height = height;
            }
        },

        /**
         * 杩斿洖鑳藉惁浣跨敤褰撳墠鎸囧畾鐨勫瓧浣撴樉绀烘彁渚涚殑瀛楃涓层€�
         * @param {String} str 瑕佹娴嬬殑瀛楃涓层€�
         * @returns {Boolean} 鏄惁鑳戒娇鐢ㄦ寚瀹氬瓧浣撱€�
         */
        hasGlyphs: function (str) {
            var glyphs = this.glyphs;
            if (!glyphs) return false;

            var str = str.toString(), len = str.length, i;
            for (i = 0; i < len; i++) {
                if (!glyphs[str.charAt(i)]) return false;
            }
            return true;
        }

    });

    /**
     * @class TextureAtlas绾圭悊闆嗘槸灏嗚澶氬皬鐨勭汗鐞嗗浘鐗囨暣鍚堝埌涓€璧风殑涓€寮犲ぇ鍥俱€傝繖涓被鍙牴鎹竴涓汗鐞嗛泦鏁版嵁璇诲彇绾圭悊灏忓浘銆佺簿鐏靛姩鐢荤瓑銆�
     * @param {Image} image 绾圭悊闆嗗浘鐗囥€�
     * @param {Array} frameData 绾圭悊闆嗗抚鏁版嵁銆傛瘡甯х殑鏁版嵁鏍煎紡涓猴細[x, y, width, height]銆�
     * @param {Object} spriteData 绾圭悊闆嗙簿鐏垫暟鎹€�
     * @module hilo/util/TextureAtlas
     * @require hilo/core/Class
     */
    var TextureAtlas = (function () {

        return Class.create(/** @lends TextureAtlas.prototype */{
            constructor: function TextureAtlas(image, frameData, spriteData) {
                var result = parseAtlasData(image, frameData, spriteData);
                this._frames = result.frames;
                this._sprites = result.sprites;
            },

            _frames: null,
            _sprites: null,

            /**
             * 鑾峰彇鎸囧畾绱㈠紩浣嶇疆index鐨勫抚鏁版嵁銆�
             * @param {Int} index 瑕佽幏鍙栧抚鐨勭储寮曚綅缃€�
             * @returns {Object} 甯ф暟鎹€�
             */
            getFrame: function (index) {
                var frames = this._frames;
                return frames && frames[index];
            },

            /**
             * 鑾峰彇鎸囧畾id鐨勭簿鐏垫暟鎹€�
             * @param {String} id 瑕佽幏鍙栫簿鐏电殑id銆�
             * @returns {Object} 绮剧伒鏁版嵁銆�
             */
            getSprite: function (id) {
                var sprites = this._sprites;
                return sprites && sprites[id];
            }
        });

        /**
         * 瑙ｆ瀽绾圭悊闆嗗抚鍜岀簿鐏垫暟鎹€�
         * @private
         */
        function parseAtlasData(image, frameData, spriteData) {
            if (frameData === undefined) {
                var data = image;
                image = data.image;
                frameData = data.frames;
                spriteData = data.sprites;
            }

            //frames
            if (frameData) {
                var frames = [], frame, obj;

                for (var i = 0, len = frameData.length; i < len; i++) {
                    obj = frameData[i];
                    frame = {
                        image: image,
                        rect: [obj[0], obj[1], obj[2], obj[3]],
                        pivotX: obj[4] || 0,
                        pivotY: obj[5] || 0
                    };
                    frames[i] = frame;
                }
            }

            //sprite frames
            if (spriteData) {
                var sprites = {}, sprite, spriteFrames, spriteFrame;

                for (var s in spriteData) {
                    sprite = spriteData[s];
                    if (isNumber(sprite)) {
                        spriteFrames = translateSpriteFrame(frames[sprite]);
                    } else if (sprite instanceof Array) {
                        spriteFrames = [];
                        for (var i = 0, len = sprite.length; i < len; i++) {
                            var spriteObj = sprite[i], frameObj;
                            if (isNumber(spriteObj)) {
                                spriteFrame = translateSpriteFrame(frames[spriteObj]);
                            } else {
                                frameObj = spriteObj.rect;
                                if (isNumber(frameObj)) frameObj = frames[spriteObj.rect];
                                spriteFrame = translateSpriteFrame(frameObj, spriteObj);
                            }
                            spriteFrames[i] = spriteFrame;
                        }
                    }
                    sprites[s] = spriteFrames;
                }
            }

            return { frames: frames, sprites: sprites };
        }

        function isNumber(value) {
            return typeof value === 'number';
        }

        function translateSpriteFrame(frameObj, spriteObj) {
            var spriteFrame = {
                image: frameObj.image,
                rect: frameObj.rect,
                pivotX: frameObj.pivotX || 0,
                pivotY: frameObj.pivotY || 0
            };

            if (spriteObj) {
                spriteFrame.name = spriteObj.name || null;
                spriteFrame.duration = spriteObj.duration || 0;
                spriteFrame.stop = !!spriteObj.stop;
                spriteFrame.next = spriteObj.next || null;
            }

            return spriteFrame;
        }

    })();

    /**
     * @class Ticker鏄竴涓畾鏃跺櫒绫汇€傚畠鍙互鎸夋寚瀹氬抚鐜囬噸澶嶈繍琛岋紝浠庤€屾寜璁″垝鎵ц浠ｇ爜銆�
     * @param {Number} fps 鎸囧畾瀹氭椂鍣ㄧ殑杩愯甯х巼銆�
     * @module hilo/util/Ticker
     * @requires hilo/core/Class
     * @requires hilo/core/Hilo
     */
    var Ticker = Class.create(/** @lends Ticker.prototype */{
        constructor: function Ticker(fps) {
            this._targetFPS = fps || 30;
            this._interval = 1000 / this._targetFPS;
            this._tickers = [];
        },

        _paused: false,
        _targetFPS: 0,
        _interval: 0,
        _intervalId: null,
        _tickers: null,
        _lastTime: 0,
        _tickCount: 0,
        _tickTime: 0,
        _measuredFPS: 0,

        /**
         * 鍚姩瀹氭椂鍣ㄣ€�
         * @param {Boolean} userRAF 鏄惁浣跨敤requestAnimationFrame锛岄粯璁や负false銆�
         */
        start: function (useRAF) {
            if (this._intervalId) return;
            this._lastTime = +new Date();

            var self = this, interval = this._interval,
                raf = window.requestAnimationFrame ||
                      window[Hilo.browser.jsVendor + 'RequestAnimationFrame'];

            if (useRAF && raf) {
                var tick = function () {
                    self._tick();
                }
                var runLoop = function () {
                    self._intervalId = setTimeout(runLoop, interval);
                    raf(tick);
                };
            } else {
                runLoop = function () {
                    self._intervalId = setTimeout(runLoop, interval);
                    self._tick();
                };
            }

            runLoop();
        },

        /**
         * 鍋滄瀹氭椂鍣ㄣ€�
         */
        stop: function () {
            clearTimeout(this._intervalId);
            this._intervalId = null;
            this._lastTime = 0;
        },

        /**
         * 鏆傚仠瀹氭椂鍣ㄣ€�
         */
        pause: function () {
            this._paused = true;
        },

        /**
         * 鎭㈠瀹氭椂鍣ㄣ€�
         */
        resume: function () {
            this._paused = false;
        },

        /**
         * @private
         */
        _tick: function () {
            if (this._paused) return;
            var startTime = +new Date(),
                deltaTime = startTime - this._lastTime,
                tickers = this._tickers;

            for (var i = 0, len = tickers.length; i < len; i++) {
                tickers[i].tick(deltaTime);
            }

            //calculates the real fps
            var endTime = +new Date();
            if (++this._tickCount >= this._targetFPS) {
                this._measuredFPS = 1000 / (this._tickTime / this._tickCount) + 0.5 >> 0;
                this._tickCount = 0;
                this._tickTime = 0;
            } else {
                this._tickTime += endTime - this._lastTime;
            }
            this._lastTime = endTime;
        },

        /**
         * 鑾峰緱娴嬪畾鐨勮繍琛屾椂甯х巼銆�
         */
        getMeasuredFPS: function () {
            return this._measuredFPS;
        },

        /**
         * 娣诲姞瀹氭椂鍣ㄥ璞°€傚畾鏃跺櫒瀵硅薄蹇呴』瀹炵幇 tick 鏂规硶銆�
         * @param {Object} tickObject 瑕佹坊鍔犵殑瀹氭椂鍣ㄥ璞°€傛瀵硅薄蹇呴』鍖呭惈 tick 鏂规硶銆�
         */
        addTick: function (tickObject) {
            if (!tickObject || typeof (tickObject.tick) != 'function') {
                throw new Error('Ticker: The tick object must implement the tick method.');
            }
            this._tickers.push(tickObject);
        },

        /**
         * 鍒犻櫎瀹氭椂鍣ㄥ璞°€�
         * @param {Object} tickObject 瑕佸垹闄ょ殑瀹氭椂鍣ㄥ璞°€�
         */
        removeTick: function (tickObject) {
            var tickers = this._tickers,
                index = tickers.indexOf(tickObject);
            if (index >= 0) {
                tickers.splice(index, 1);
            }
        }

    });

    var arrayProto = Array.prototype,
        slice = arrayProto.slice;

    //polyfiil for Array.prototype.indexOf
    arrayProto.indexOf = arrayProto.indexOf || function (elem, fromIndex) {
        fromIndex = fromIndex || 0;
        var len = this.length, i;
        if (len == 0 || fromIndex >= len) return -1;
        if (fromIndex < 0) fromIndex = len + fromIndex;
        for (i = fromIndex; i < len; i++) {
            if (this[i] === elem) return i;
        }
        return -1;
    };

    var fnProto = Function.prototype;

    //polyfill for Function.prototype.bind
    fnProto.bind = fnProto.bind || function (thisArg) {
        var target = this,
            boundArgs = slice.call(arguments, 1),
            F = function () { };

        function bound() {
            var args = boundArgs.concat(slice.call(arguments));
            return target.apply(this instanceof bound ? this : thisArg, args);
        }

        F.prototype = target.prototype;
        bound.prototype = new F();

        return bound;
    };

    /**
     * @class Tween绫绘彁渚涚紦鍔ㄥ姛鑳姐€�
     * @param {Object} target 缂撳姩瀵硅薄銆�
     * @param {Object} newProps 瀵硅薄缂撳姩鐨勭洰鏍囧睘鎬ч泦鍚堛€�
     * @param {Object} params 缂撳姩鍙傛暟銆傚彲鍖呭惈Tween绫绘墍鏈夊彲鍐欏睘鎬с€�
     * @module hilo/util/Tween
     * @requires hilo/core/Class
     * @property {Object} target 缂撳姩鐩爣銆傚彧璇诲睘鎬с€�
     * @property {Number} time 缂撳姩鎬绘椂闀裤€傚崟浣嶆绉掋€�
     * @property {Number} delay 缂撳姩寤惰繜鏃堕棿銆傚崟浣嶆绉掋€�
     * @property {Boolean} paused 缂撳姩鏄惁鏆傚仠銆傞粯璁や负false銆�
     * @property {Boolean} loop 缂撳姩鏄惁寰幆銆傞粯璁や负false銆�
     * @property {Boolean} reverse 缂撳姩鏄惁鍙嶈浆鎾斁銆傞粯璁や负false銆�
     * @property {Number} interval 缂撳姩闂撮殧銆傞粯璁や负0銆�
     * @property {Function} ease 缂撳姩鍙樺寲鍑芥暟銆傞粯璁や负null銆�
     * @property {Tween} next 涓嬩竴涓紦鍔ㄥ彉鍖栧璞°€傞粯璁や负null銆�
     * @property {Function} onUpdate 缂撳姩鏇存柊鍥炶皟鍑芥暟銆傞粯璁や负null銆�
     * @property {Function} onComplete 缂撳姩缁撴潫鍥炶皟鍑芥暟銆傞粯璁や负null銆�
     */
    var Tween = (function () {

        return Class.create(/** @lends Tween.prototype */{
            constructor: function Tween(target, newProps, params) {
                var me = this;
                me.target = target;

                me._oldProps = {};
                me._newProps = {};
                me._deltaProps = {};
                me._startTime = 0;
                me._lastTime = 0;
                me._pausedTime = 0;
                me._pausedStartTime = 0;
                me._reverseFlag = 1;
                me._frameTotal = 0;
                me._frameCount = 0;

                for (var p in newProps) {
                    var oldVal = target[p], newVal = newProps[p];
                    if (oldVal !== undefined) {
                        if (typeof oldVal == 'number' && typeof newVal == 'number') {
                            me._oldProps[p] = oldVal;
                            me._newProps[p] = newVal;
                            me._deltaProps[p] = newVal - oldVal;
                        }
                    }
                }

                for (var p in params) {
                    me[p] = params[p];
                }
            },

            target: null,
            time: 0,
            delay: 0,
            paused: false,
            loop: false,
            reverse: false,
            interval: 0,
            ease: null,
            next: null,

            onUpdate: null,
            onComplete: null,

            /**
             * 璁剧疆缂撳姩瀵硅薄鐨勫垵濮嬪拰鐩爣灞炴€с€�
             * @param oldProps 缂撳姩瀵硅薄鐨勫垵濮嬪睘鎬с€�
             * @param newProps 缂撳姩瀵硅薄鐨勭洰鏍囧睘鎬с€�
             */
            setProps: function (oldProps, newProps) {
                for (var p in oldProps) {
                    this.target[p] = this._oldProps[p] = oldProps[p];
                }
                for (var p in newProps) {
                    this._newProps[p] = newProps[p];
                    this._deltaProps[p] = newProps[p] - this.target[p];
                }
            },

            /**
             * 鍒濆鍖朤ween绫汇€�
             * @private
             */
            _init: function () {
                this._startTime = Date.now() + this.delay;
                this._pausedTime = 0;
                if (this.interval > 0) this._frameTotal = Math.round(this.time / this.interval);
                Tween.add(this);
            },

            /**
             * 鍚姩缂撳姩鍔ㄧ敾鐨勬挱鏀俱€�
             */
            start: function () {
                this._init();
                this.paused = false;
            },

            /**
             * 鍋滄缂撳姩鍔ㄧ敾鐨勬挱鏀俱€�
             */
            stop: function () {
                Tween.remove(this);
            },

            /**
             * 鏆傚仠缂撳姩鍔ㄧ敾鐨勬挱鏀俱€�
             */
            pause: function () {
                this.paused = true;
                this._pausedStartTime = Date.now();
            },

            /**
             * 鎭㈠缂撳姩鍔ㄧ敾鐨勬挱鏀俱€�
             */
            resume: function () {
                this.paused = false;
                this._pausedTime += Date.now() - this._pausedStartTime;
            },

            /**
             * Tween绫荤殑鍐呴儴鏇存柊鏂规硶銆�
             * @private
             */
            _update: function () {
                if (this.paused) return;
                var now = Date.now();
                var elapsed = now - this._startTime - this._pausedTime;
                if (elapsed < 0) return;

                this._lastTime = now;

                var ratio = this._frameTotal > 0 ? (++this._frameCount / this._frameTotal) : (elapsed / this.time);
                if (ratio > 1) ratio = 1;
                var value = this.ease ? this.ease(ratio) : ratio;

                for (var p in this._oldProps) {
                    this.target[p] = this._oldProps[p] + this._deltaProps[p] * this._reverseFlag * value;
                }

                if (this.onUpdate) this.onUpdate(value);

                if (ratio >= 1) {
                    if (this.reverse) {
                        var tmp = this._oldProps;
                        this._oldProps = this._newProps;
                        this._newProps = tmp;
                        this._startTime = Date.now();
                        this._frameCount = 0;
                        this._reverseFlag *= -1;
                    } else if (this.loop) {
                        for (var p in this._oldProps) this.target[p] = this._oldProps[p];
                        this._startTime = Date.now();
                        this._frameCount = 0;
                    } else {
                        Tween.remove(this);
                        var next = this.next, nextTween;
                        if (next) {
                            if (next instanceof Tween) {
                                nextTween = next;
                                next = null;
                            } else {
                                nextTween = next.shift();
                            }
                            if (nextTween) {
                                nextTween.next = next;
                                nextTween.start();
                            }
                        }
                    }

                    if (this.onComplete) this.onComplete(this);
                    if (this.reverse && !this.loop) this.reverse = false;
                }
            },

            Statics: /** @lends Tween */ {
                /**
                 * @private
                 */
                _tweens: [],

                /**
                 * 鏇存柊鎵€鏈塗ween瀹炰緥銆�
                 * @returns {Object} Tween銆�
                 */
                tick: function () {
                    var tweens = this._tweens, i = tweens.length;
                    while (--i >= 0) tweens[i]._update();
                    return this;
                },

                /**
                 * 娣诲姞Tween瀹炰緥銆�
                 * @param {Tween} tween 瑕佹坊鍔犵殑Tween瀵硅薄銆�
                 * @returns {Object} Tween銆�
                 */
                add: function (tween) {
                    if (this._tweens.indexOf(tween) == -1) this._tweens.push(tween);
                    return this;
                },

                /**
                 * 鍒犻櫎Tween瀹炰緥銆�
                 * @param {Tween} tween 瑕佸垹闄ょ殑Tween瀵硅薄銆�
                 * @returns {Object} Tween銆�
                 */
                remove: function (tween) {
                    if (tween) {
                        var tweens = this._tweens;
                        var index = tweens.indexOf(tween);
                        if (index > -1) tweens.splice(index, 1);
                    }
                    return this;
                },

                /**
                 * 鍒犻櫎鎵€鏈塗ween瀹炰緥銆�
                 * @returns {Object} Tween銆�
                 */
                removeAll: function () {
                    this._tweens.length = 0;
                    return this;
                },

                /**
                 * 鍒涘缓涓€涓紦鍔ㄥ姩鐢伙紝璁╃洰鏍囧璞′粠褰撳墠灞炴€у彉鎹㈠埌鐩爣灞炴€с€�
                 * @param target 缂撳姩鐩爣瀵硅薄銆�
                 * @param toProps 缂撳姩鐩爣瀵硅薄鐨勭洰鏍囧睘鎬с€�
                 * @param params 缂撳姩鍔ㄧ敾鐨勫弬鏁般€�
                 * @returns {Tween} 涓€涓猅ween瀹炰緥瀵硅薄銆�
                 */
                to: function (target, toProps, params) {
                    var tween = new Tween(target, toProps, params);
                    tween._init();
                    return tween;
                },

                /**
                 * 鍒涘缓涓€涓紦鍔ㄥ姩鐢伙紝璁╃洰鏍囧璞′粠鎸囧畾鐨勮捣濮嬪睘鎬у彉鎹㈠埌褰撳墠灞炴€с€�
                 * @param target 缂撳姩鐩爣瀵硅薄銆�
                 * @param toProps 缂撳姩鐩爣瀵硅薄鐨勮捣濮嬪睘鎬с€�
                 * @param params 缂撳姩鍔ㄧ敾鐨勫弬鏁般€�
                 * @returns {Tween} 涓€涓猅ween瀹炰緥瀵硅薄銆�
                 */
                from: function (target, fromProps, params) {
                    var tween = new Tween(target, fromProps, params);
                    var tmp = tween._oldProps;
                    tween._oldProps = tween._newProps;
                    tween._newProps = tmp;
                    tween._reverseFlag = -1;

                    for (var p in tween._oldProps) target[p] = tween._oldProps[p];

                    tween._init();
                    return tween;
                }
            }

        });

    })();

    //TODO: 瓒呮椂timeout锛屽け璐ラ噸杩炴鏁癿axTries锛屾洿澶氱殑涓嬭浇鍣↙oader锛岄槦鍒楁殏鍋滄仮澶嶇瓑銆�

    /**
     * @class LoadQueue鏄竴涓槦鍒椾笅杞藉伐鍏枫€�
     * @param {Object} source 瑕佷笅杞界殑璧勬簮銆傚彲浠ユ槸鍗曚釜璧勬簮瀵硅薄鎴栧涓祫婧愮殑鏁扮粍銆�
     * @module hilo/loader/LoadQueue
     * @requires hilo/core/Class
     * @requires hilo/event/EventMixin
     * @property {Int} maxConnections 鍚屾椂涓嬭浇鐨勬渶澶ц繛鎺ユ暟銆傞粯璁や负2銆�
     */
    var LoadQueue = Class.create(/** @lends LoadQueue.prototype */{
        Mixes: EventMixin,
        constructor: function LoadQueue(source) {
            this._source = [];
            this.add(source);
        },

        maxConnections: 2, //TODO: 搴旇鏄瘡涓猦ost鐨勬渶澶ц繛鎺ユ暟銆�

        _source: null,
        _loaded: 0,
        _connections: 0,
        _currentIndex: -1,

        /**
         * 澧炲姞瑕佷笅杞界殑璧勬簮銆傚彲浠ユ槸鍗曚釜璧勬簮瀵硅薄鎴栧涓祫婧愮殑鏁扮粍銆�
         * @returns {LoadQueue} 涓嬭浇闃熷垪瀹炰緥鏈韩銆�
         */
        add: function (source) {
            var me = this;
            if (source) {
                source = source instanceof Array ? source : [source];
                me._source = me._source.concat(source);
            }
            return me;
        },

        /**
         * 鏍规嵁id鎴杝rc鍦板潃鑾峰彇璧勬簮瀵硅薄銆�
         * @returns {Object} 璧勬簮瀵硅薄銆�
         */
        get: function (id) {
            if (id) {
                var source = this._source;
                for (var i = 0; i < source.length; i++) {
                    var item = source[i];
                    if (item.id === id || item.src === id) {
                        return item;
                    }
                }
            }
            return null;
        },

        /**
         * 寮€濮嬩笅杞介槦鍒椼€�
         * @returns {LoadQueue} 涓嬭浇闃熷垪瀹炰緥鏈韩銆�
         */
        start: function () {
            var me = this;
            me._loadNext();
            return me;
        },

        /**
         * @private
         */
        _loadNext: function () {
            var me = this, source = me._source, len = source.length;

            //all items loaded
            if (me._loaded >= len) {
                me.fire('complete');
                return;
            }

            if (me._currentIndex < len - 1 && me._connections < me.maxConnections) {
                var index = ++me._currentIndex;
                var item = source[index];
                var loader = me._getLoader(item);

                if (loader) {
                    var onLoad = loader.onLoad, onError = loader.onError;

                    loader.onLoad = function (e) {
                        loader.onLoad = onLoad;
                        loader.onError = onError;
                        var content = onLoad && onLoad.call(loader, e) || e.target;
                        me._onItemLoad(index, content);
                    };
                    loader.onError = function (e) {
                        loader.onLoad = onLoad;
                        loader.onError = onError;
                        onError && onError.call(loader, e);
                        me._onItemError(index, e);
                    };
                    loader.load(item);
                    me._connections++;
                }

                me._loadNext();
            }
        },

        /**
         * @private
         */
        _getLoader: function (item) {
            var me = this, loader = item.loader;
            if (loader) return loader;

            var type = item.type || getExtension(item.src);

            switch (type) {
                case 'png':
                case 'jpg':
                case 'jpeg':
                case 'gif':
                    loader = new ImageLoader();
                    break;
                case 'js':
                case 'jsonp':
                    loader = new ScriptLoader();
                    break;
            }

            return loader;
        },

        /**
         * @private
         */
        _onItemLoad: function (index, content) {
            var me = this, item = me._source[index];
            item.loaded = true;
            item.content = content;
            me._connections--;
            me._loaded++;
            me.fire('load', item);
            me._loadNext();
        },

        /**
         * @private
         */
        _onItemError: function (index, e) {
            var me = this, item = me._source[index];
            item.error = e;
            me._connections--;
            me._loaded++;
            me.fire('error', item);
            me._loadNext();
        },

        /**
         * 鑾峰彇鍏ㄩ儴鎴栧凡涓嬭浇鐨勮祫婧愮殑瀛楄妭澶у皬銆�
         * @param {Boolean} loaded 鎸囩ず鏄凡涓嬭浇鐨勮祫婧愯繕鏄叏閮ㄨ祫婧愩€傞粯璁や负鍏ㄩ儴銆�
         * @returns {Number} 鎸囧畾璧勬簮鐨勫瓧鑺傚ぇ灏忋€�
         */
        getSize: function (loaded) {
            var size = 0, source = this._source;
            for (var i = 0; i < source.length; i++) {
                var item = source[i];
                size += (loaded ? item.loaded && item.size : item.size) || 0;
            }
            return size;
        },

        /**
         * 鑾峰彇宸蹭笅杞界殑璧勬簮鏁伴噺銆�
         * @returns {Uint} 宸蹭笅杞界殑璧勬簮鏁伴噺銆�
         */
        getLoaded: function () {
            return this._loaded;
        },

        /**
         * 鑾峰彇鎵€鏈夎祫婧愮殑鏁伴噺銆�
         * @returns {Uint} 鎵€鏈夎祫婧愮殑鏁伴噺銆�
         */
        getTotal: function () {
            return this._source.length;
        }

    });

    /**
     * @private
     */
    function getExtension(src) {
        var extRegExp = /\/?[^/]+\.(\w+)/i, match, extension;
        if (match = src.match(extRegExp)) {
            extension = match[1].toLowerCase();
        }
        return extension || null;
    }

    /**
     * @private
     * @class 鍥剧墖璧勬簮鍔犺浇鍣ㄣ€�
     * @module hilo/loader/ImageLoader
     * @requires hilo/core/Class
     */
    var ImageLoader = Class.create({
        load: function (data) {
            var me = this;

            var image = new Image();
            image.onload = me.onLoad.bind(me);
            image.onerror = image.onabort = me.onError.bind(me);
            image.src = data.src + (data.noCache ? (data.src.indexOf('?') == -1 ? '?' : '&') + 't=' + (+new Date) : '');
        },

        onLoad: function (e) {
            var image = e.target;
            image.onload = image.onerror = image.onabort = null;
            return image;
        },

        onError: function (e) {
            var image = e.target;
            image.onload = image.onerror = image.onabort = null;
            return e;
        }

    });

    /**
     * @private
     * @class javascript鎴朖SONP鍔犺浇鍣ㄣ€�
     * @module hilo/loader/ScriptLoader
     * @requires hilo/core/Class
     */
    var ScriptLoader = Class.create({
        load: function (data) {
            var me = this, src = data.src, isJSONP = data.type == 'jsonp';

            if (isJSONP) {
                var callbackName = data.callbackName || 'callback';
                var callback = data.callback || 'jsonp' + (++ScriptLoader._count);
                var win = window;

                if (!win[callback]) {
                    win[callback] = function (result) {
                        delete win[callback];
                    }
                }
            }

            if (isJSONP) src += (src.indexOf('?') == -1 ? '?' : '&') + callbackName + '=' + callback;
            if (data.noCache) src += (src.indexOf('?') == -1 ? '?' : '&') + 't=' + (+new Date());

            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.async = true;
            script.onload = me.onLoad.bind(me);
            script.onerror = me.onError.bind(me);
            script.src = src;
            if (data.id) script.id = data.id;
            document.getElementsByTagName('head')[0].appendChild(script);
        },

        onLoad: function (e) {
            var script = e.target;
            script.onload = script.onerror = null;
            return script;
        },

        onError: function (e) {
            var script = e.target;
            script.onload = script.onerror = null;
            return e;
        },

        Statics: {
            _count: 0
        }

    });

    Hilo.Class = Class;
    Hilo.EventMixin = EventMixin;
    Hilo.Renderer = Renderer;
    Hilo.CanvasRenderer = CanvasRenderer;
    Hilo.DOMRenderer = DOMRenderer;
    Hilo.Matrix = Matrix;
    Hilo.Drawable = Drawable;
    Hilo.View = View;
    Hilo.Container = Container;
    Hilo.Stage = Stage;
    Hilo.Bitmap = Bitmap;
    Hilo.Sprite = Sprite;
    Hilo.DOMElement = DOMElement;
    Hilo.Graphics = Graphics;
    Hilo.Text = Text;
    Hilo.BitmapText = BitmapText;
    Hilo.TextureAtlas = TextureAtlas;
    Hilo.Ticker = Ticker;
    Hilo.Tween = Tween;
    Hilo.LoadQueue = LoadQueue;
    Hilo.ImageLoader = ImageLoader;
    Hilo.ScriptLoader = ScriptLoader;

    window.Hilo = Hilo;
    if (!window.H) window.H = Hilo;

})(window);