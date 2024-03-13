/*! Sea.js 2.1.0 | seajs.org/LICENSE.md
//# sourceMappingURL=sea.js.map
*/
(function (t, u) {
  function v(b) {
    return function (c) {
      return Object.prototype.toString.call(c) === "[object " + b + "]";
    };
  }
  function S() {
    return w++;
  }
  function J(b, c) {
    var a;
    a = b.charAt(0);
    if (T.test(b)) a = b;
    else if ("." === a) {
      a = (c ? c.match(F)[0] : h.cwd) + b;
      for (a = a.replace(U, "/"); a.match(K); ) a = a.replace(K, "/");
    } else
      a =
        "/" === a
          ? (a = h.cwd.match(V))
            ? a[0] + b.substring(1)
            : b
          : h.base + b;
    return a;
  }
  function L(b, c) {
    if (!b) return "";
    var a = b,
      d = h.alias,
      a = (b = d && G(d[a]) ? d[a] : a),
      d = h.paths,
      f;
    if (d && (f = a.match(W)) && G(d[f[1]])) a = d[f[1]] + f[2];
    f = a;
    var p = h.vars;
    p &&
      -1 < f.indexOf("{") &&
      (f = f.replace(X, function (a, b) {
        return G(p[b]) ? p[b] : a;
      }));
    a = f.length - 1;
    b =
      "#" === f.charAt(a)
        ? f.substring(0, a)
        : ".js" === f.substring(a - 2) ||
          0 < f.indexOf("?") ||
          ".css" === f.substring(a - 3)
        ? f
        : f + ".js";
    f = J(b, c);
    var a = h.map,
      e = f;
    if (a)
      for (
        var d = 0, g = a.length;
        d < g &&
        !((e = a[d]), (e = x(e) ? e(f) || f : f.replace(e[0], e[1])), e !== f);
        d++
      );
    return e;
  }
  function M(b, c) {
    var a = b.sheet,
      d;
    if (N) a && (d = !0);
    else if (a)
      try {
        a.cssRules && (d = !0);
      } catch (f) {
        "NS_ERROR_DOM_SECURITY_ERR" === f.name && (d = !0);
      }
    setTimeout(function () {
      d ? c() : M(b, c);
    }, 20);
  }
  function Y() {
    if (y) return y;
    if (z && "interactive" === z.readyState) return z;
    for (
      var b = s.getElementsByTagName("script"), c = b.length - 1;
      0 <= c;
      c--
    ) {
      var a = b[c];
      if ("interactive" === a.readyState) return (z = a);
    }
  }
  function e(b, c) {
    this.uri = b;
    this.dependencies = c || [];
    this.exports = null;
    this.status = 0;
    this._waitings = {};
    this._remain = 0;
  }
  function A(b, c) {
    var a = { id: b, refUri: c };
    l("resolve", a);
    return a.uri || L(a.id, c);
  }
  function O(b, c) {
    var a = e.get(b);
    a.status < j.SAVED &&
      ((a.id = c.id || b),
      (a.dependencies = c.deps || []),
      (a.factory = c.factory),
      (a.status = j.SAVED));
  }
  if (!t.seajs) {
    var g = (t.seajs = { version: "2.1.0" }),
      h = (g.data = {}),
      Z = v("Object"),
      G = v("String"),
      B = Array.isArray || v("Array"),
      x = v("Function"),
      w = 0,
      q = (h.events = {});
    g.on = function (b, c) {
      (q[b] || (q[b] = [])).push(c);
      return g;
    };
    g.off = function (b, c) {
      if (!b && !c) return (q = h.events = {}), g;
      var a = q[b];
      if (a)
        if (c)
          for (var d = a.length - 1; 0 <= d; d--) a[d] === c && a.splice(d, 1);
        else delete q[b];
      return g;
    };
    var l = (g.emit = function (b, c) {
        var a = q[b],
          d;
        if (a) for (a = a.slice(); (d = a.shift()); ) d(c);
        return g;
      }),
      F = /[^?#]*\//,
      U = /\/\.\//g,
      K = /\/[^/]+\/\.\.\//,
      W = /^([^/:]+)(\/.+)$/,
      X = /{([^{]+)}/g,
      T = /^\/\/.|:\//,
      V = /^.*?\/\/.*?\//,
      m = document,
      r = location,
      C = r.href.match(F)[0],
      k = m.getElementsByTagName("script"),
      k = m.getElementById("seajsnode") || k[k.length - 1],
      k = ((k.hasAttribute ? k.src : k.getAttribute("src", 4)) || C).match(
        F
      )[0],
      s = m.getElementsByTagName("head")[0] || m.documentElement,
      P = s.getElementsByTagName("base")[0],
      Q = /\.css(?:\?|$)/i,
      $ = /^(?:loaded|complete|undefined)$/,
      y,
      z,
      N =
        536 > 1 * navigator.userAgent.replace(/.*AppleWebKit\/(\d+)\..*/, "$1"),
      aa =
        /"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^\/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*require|(?:^|[^$])\brequire\s*\(\s*(["'])(.+?)\1\s*\)/g,
      ba = /\\\\/g,
      n = (g.cache = {}),
      D,
      H = {},
      I = {},
      E = {},
      j = (e.STATUS = {
        FETCHING: 1,
        SAVED: 2,
        LOADING: 3,
        LOADED: 4,
        EXECUTING: 5,
        EXECUTED: 6,
      });
    e.prototype.resolve = function () {
      for (var b = this.dependencies, c = [], a = 0, d = b.length; a < d; a++)
        c[a] = A(b[a], this.uri);
      return c;
    };
    e.prototype.load = function () {
      if (!(this.status >= j.LOADING)) {
        this.status = j.LOADING;
        var b = this.resolve();
        l("load", b);
        for (var c = (this._remain = b.length), a, d = 0; d < c; d++)
          (a = e.get(b[d])),
            a.status < j.LOADED
              ? (a._waitings[this.uri] = (a._waitings[this.uri] || 0) + 1)
              : this._remain--;
        if (0 === this._remain) this.onload();
        else {
          for (var f = {}, d = 0; d < c; d++)
            (a = n[b[d]]),
              a.status < j.FETCHING
                ? a.fetch(f)
                : a.status === j.SAVED && a.load();
          for (var p in f) if (f.hasOwnProperty(p)) f[p]();
        }
      }
    };
    e.prototype.onload = function () {
      this.status = j.LOADED;
      this.callback && this.callback();
      var b = this._waitings,
        c,
        a;
      for (c in b)
        if (
          b.hasOwnProperty(c) &&
          ((a = n[c]), (a._remain -= b[c]), 0 === a._remain)
        )
          a.onload();
      delete this._waitings;
      delete this._remain;
    };
    e.prototype.fetch = function (b) {
      function c() {
        var a = f.requestUri,
          b = f.onRequest,
          c = f.charset,
          d = Q.test(a),
          e = m.createElement(d ? "link" : "script");
        if (c && (c = x(c) ? c(a) : c)) e.charset = c;
        var g = e;
        d && (N || !("onload" in g))
          ? setTimeout(function () {
              M(g, b);
            }, 1)
          : (g.onload =
              g.onerror =
              g.onreadystatechange =
                function () {
                  $.test(g.readyState) &&
                    ((g.onload = g.onerror = g.onreadystatechange = null),
                    !d && !h.debug && s.removeChild(g),
                    (g = null),
                    b());
                });
        d
          ? ((e.rel = "stylesheet"), (e.href = a))
          : ((e.async = !0), (e.src = a));
        y = e;
        P ? s.insertBefore(e, P) : s.appendChild(e);
        y = null;
      }
      function a() {
        delete H[e];
        I[e] = !0;
        D && (O(d, D), (D = null));
        var a,
          b = E[e];
        for (delete E[e]; (a = b.shift()); ) a.load();
      }
      var d = this.uri;
      this.status = j.FETCHING;
      var f = { uri: d };
      l("fetch", f);
      var e = f.requestUri || d;
      !e || I[e]
        ? this.load()
        : H[e]
        ? E[e].push(this)
        : ((H[e] = !0),
          (E[e] = [this]),
          l(
            "request",
            (f = { uri: d, requestUri: e, onRequest: a, charset: h.charset })
          ),
          f.requested || (b ? (b[f.requestUri] = c) : c()));
    };
    e.prototype.exec = function () {
      function b(a) {
        return n[b.resolve(a)].exec();
      }
      if (this.status >= j.EXECUTING) return this.exports;
      this.status = j.EXECUTING;
      var c = this.uri;
      b.resolve = function (a) {
        return A(a, c);
      };
      b.async = function (a, f) {
        e.use(a, f, c + "_async_" + w++);
        return b;
      };
      var a = this.factory,
        a = x(a) ? a(b, (this.exports = {}), this) : a;
      a === u && (a = this.exports);
      null === a && !Q.test(c) && l("error", this);
      delete this.factory;
      this.exports = a;
      this.status = j.EXECUTED;
      l("exec", this);
      return a;
    };
    e.define = function (b, c, a) {
      var d = arguments.length;
      1 === d
        ? ((a = b), (b = u))
        : 2 === d && ((a = c), B(b) ? ((c = b), (b = u)) : (c = u));
      if (!B(c) && x(a)) {
        var e = [];
        a.toString()
          .replace(ba, "")
          .replace(aa, function (a, b, c) {
            c && e.push(c);
          });
        c = e;
      }
      d = { id: b, uri: A(b), deps: c, factory: a };
      if (!d.uri && m.attachEvent) {
        var g = Y();
        g && (d.uri = g.src);
      }
      l("define", d);
      d.uri ? O(d.uri, d) : (D = d);
    };
    e.get = function (b, c) {
      return n[b] || (n[b] = new e(b, c));
    };
    e.use = function (b, c, a) {
      var d = e.get(a, B(b) ? b : [b]);
      d.callback = function () {
        for (var a = [], b = d.resolve(), e = 0, g = b.length; e < g; e++)
          a[e] = n[b[e]].exec();
        c && c.apply(t, a);
        delete d.callback;
      };
      d.load();
    };
    e.preload = function (b) {
      var c = h.preload,
        a = c.length;
      a
        ? e.use(
            c,
            function () {
              c.splice(0, a);
              e.preload(b);
            },
            h.cwd + "_preload_" + w++
          )
        : b();
    };
    g.use = function (b, c) {
      e.preload(function () {
        e.use(b, c, h.cwd + "_use_" + w++);
      });
      return g;
    };
    e.define.cmd = {};
    t.define = e.define;
    g.Module = e;
    h.fetchedList = I;
    h.cid = S;
    g.resolve = L;
    g.require = function (b) {
      return (n[A(b)] || {}).exports;
    };
    h.base = (k.match(/^(.+?\/)(\?\?)?(seajs\/)+/) || ["", k])[1];
    h.dir = k;
    h.cwd = C;
    h.charset = "utf-8";
    var C = h,
      R = [],
      r = r.search.replace(/(seajs-\w+)(&|$)/g, "$1=1$2"),
      r = r + (" " + m.cookie);
    r.replace(/(seajs-\w+)=1/g, function (b, c) {
      R.push(c);
    });
    C.preload = R;
    g.config = function (b) {
      for (var c in b) {
        var a = b[c],
          d = h[c];
        if (d && Z(d)) for (var e in a) d[e] = a[e];
        else
          B(d)
            ? (a = d.concat(a))
            : "base" === c && ("/" === a.slice(-1) || (a += "/"), (a = J(a))),
            (h[c] = a);
      }
      l("config", b);
      return g;
    };
  }
})(this);
seajs.config({
  base: "/js/",
  charset: "utf-8",
  timeout: 5 * 60 * 1000,
  debug: false,
});
define("lib/zepto", function (require, exports, module) {
  (function (a) {
    String.prototype.trim === a &&
      (String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, "");
      }),
      Array.prototype.reduce === a &&
        (Array.prototype.reduce = function (b) {
          if (this === void 0 || this === null) throw new TypeError();
          var c = Object(this),
            d = c.length >>> 0,
            e = 0,
            f;
          if (typeof b != "function") throw new TypeError();
          if (d == 0 && arguments.length == 1) throw new TypeError();
          if (arguments.length >= 2) f = arguments[1];
          else
            do {
              if (e in c) {
                f = c[e++];
                break;
              }
              if (++e >= d) throw new TypeError();
            } while (!0);
          while (e < d) e in c && (f = b.call(a, f, c[e], e, c)), e++;
          return f;
        });
  })();
  var Zepto = (function () {
    function E(a) {
      return a == null ? String(a) : y[z.call(a)] || "object";
    }
    function F(a) {
      return E(a) == "function";
    }
    function G(a) {
      return a != null && a == a.window;
    }
    function H(a) {
      return a != null && a.nodeType == a.DOCUMENT_NODE;
    }
    function I(a) {
      return E(a) == "object";
    }
    function J(a) {
      return I(a) && !G(a) && a.__proto__ == Object.prototype;
    }
    function K(a) {
      return a instanceof Array;
    }
    function L(a) {
      return typeof a.length == "number";
    }
    function M(a) {
      return g.call(a, function (a) {
        return a != null;
      });
    }
    function N(a) {
      return a.length > 0 ? c.fn.concat.apply([], a) : a;
    }
    function O(a) {
      return a
        .replace(/::/g, "/")
        .replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2")
        .replace(/([a-z\d])([A-Z])/g, "$1_$2")
        .replace(/_/g, "-")
        .toLowerCase();
    }
    function P(a) {
      return a in j ? j[a] : (j[a] = new RegExp("(^|\\s)" + a + "(\\s|$)"));
    }
    function Q(a, b) {
      return typeof b == "number" && !l[O(a)] ? b + "px" : b;
    }
    function R(a) {
      var b, c;
      return (
        i[a] ||
          ((b = h.createElement(a)),
          h.body.appendChild(b),
          (c = k(b, "").getPropertyValue("display")),
          b.parentNode.removeChild(b),
          c == "none" && (c = "block"),
          (i[a] = c)),
        i[a]
      );
    }
    function S(a) {
      return "children" in a
        ? f.call(a.children)
        : c.map(a.childNodes, function (a) {
            if (a.nodeType == 1) return a;
          });
    }
    function T(c, d, e) {
      for (b in d)
        e && (J(d[b]) || K(d[b]))
          ? (J(d[b]) && !J(c[b]) && (c[b] = {}),
            K(d[b]) && !K(c[b]) && (c[b] = []),
            T(c[b], d[b], e))
          : d[b] !== a && (c[b] = d[b]);
    }
    function U(b, d) {
      return d === a ? c(b) : c(b).filter(d);
    }
    function V(a, b, c, d) {
      return F(b) ? b.call(a, c, d) : b;
    }
    function W(a, b, c) {
      c == null ? a.removeAttribute(b) : a.setAttribute(b, c);
    }
    function X(b, c) {
      var d = b.className,
        e = d && d.baseVal !== a;
      if (c === a) return e ? d.baseVal : d;
      e ? (d.baseVal = c) : (b.className = c);
    }
    function Y(a) {
      var b;
      try {
        return a
          ? a == "true" ||
              (a == "false"
                ? !1
                : a == "null"
                ? null
                : isNaN((b = Number(a)))
                ? /^[\[\{]/.test(a)
                  ? c.parseJSON(a)
                  : a
                : b)
          : a;
      } catch (d) {
        return a;
      }
    }
    function Z(a, b) {
      b(a);
      for (var c in a.childNodes) Z(a.childNodes[c], b);
    }
    var a,
      b,
      c,
      d,
      e = [],
      f = e.slice,
      g = e.filter,
      h = window.document,
      i = {},
      j = {},
      k = h.defaultView.getComputedStyle,
      l = {
        "column-count": 1,
        columns: 1,
        "font-weight": 1,
        "line-height": 1,
        opacity: 1,
        "z-index": 1,
        zoom: 1,
      },
      m = /^\s*<(\w+|!)[^>]*>/,
      n =
        /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
      o = /^(?:body|html)$/i,
      p = ["val", "css", "html", "text", "data", "width", "height", "offset"],
      q = ["after", "prepend", "before", "append"],
      r = h.createElement("table"),
      s = h.createElement("tr"),
      t = {
        tr: h.createElement("tbody"),
        tbody: r,
        thead: r,
        tfoot: r,
        td: s,
        th: s,
        "*": h.createElement("div"),
      },
      u = /complete|loaded|interactive/,
      v = /^\.([\w-]+)$/,
      w = /^#([\w-]*)$/,
      x = /^[\w-]+$/,
      y = {},
      z = y.toString,
      A = {},
      B,
      C,
      D = h.createElement("div");
    return (
      (A.matches = function (a, b) {
        if (!a || a.nodeType !== 1) return !1;
        var c =
          a.webkitMatchesSelector ||
          a.mozMatchesSelector ||
          a.oMatchesSelector ||
          a.matchesSelector;
        if (c) return c.call(a, b);
        var d,
          e = a.parentNode,
          f = !e;
        return (
          f && (e = D).appendChild(a),
          (d = ~A.qsa(e, b).indexOf(a)),
          f && D.removeChild(a),
          d
        );
      }),
      (B = function (a) {
        return a.replace(/-+(.)?/g, function (a, b) {
          return b ? b.toUpperCase() : "";
        });
      }),
      (C = function (a) {
        return g.call(a, function (b, c) {
          return a.indexOf(b) == c;
        });
      }),
      (A.fragment = function (b, d, e) {
        b.replace && (b = b.replace(n, "<$1></$2>")),
          d === a && (d = m.test(b) && RegExp.$1),
          d in t || (d = "*");
        var g,
          h,
          i = t[d];
        return (
          (i.innerHTML = "" + b),
          (h = c.each(f.call(i.childNodes), function () {
            i.removeChild(this);
          })),
          J(e) &&
            ((g = c(h)),
            c.each(e, function (a, b) {
              p.indexOf(a) > -1 ? g[a](b) : g.attr(a, b);
            })),
          h
        );
      }),
      (A.Z = function (a, b) {
        return (a = a || []), (a.__proto__ = c.fn), (a.selector = b || ""), a;
      }),
      (A.isZ = function (a) {
        return a instanceof A.Z;
      }),
      (A.init = function (b, d) {
        if (!b) return A.Z();
        if (F(b)) return c(h).ready(b);
        if (A.isZ(b)) return b;
        var e;
        if (K(b)) e = M(b);
        else if (I(b)) (e = [J(b) ? c.extend({}, b) : b]), (b = null);
        else if (m.test(b))
          (e = A.fragment(b.trim(), RegExp.$1, d)), (b = null);
        else {
          if (d !== a) return c(d).find(b);
          e = A.qsa(h, b);
        }
        return A.Z(e, b);
      }),
      (c = function (a, b) {
        return A.init(a, b);
      }),
      (c.extend = function (a) {
        var b,
          c = f.call(arguments, 1);
        return (
          typeof a == "boolean" && ((b = a), (a = c.shift())),
          c.forEach(function (c) {
            T(a, c, b);
          }),
          a
        );
      }),
      (A.qsa = function (a, b) {
        var c;
        return H(a) && w.test(b)
          ? (c = a.getElementById(RegExp.$1))
            ? [c]
            : []
          : a.nodeType !== 1 && a.nodeType !== 9
          ? []
          : f.call(
              v.test(b)
                ? a.getElementsByClassName(RegExp.$1)
                : x.test(b)
                ? a.getElementsByTagName(b)
                : a.querySelectorAll(b)
            );
      }),
      (c.contains = function (a, b) {
        return a !== b && a.contains(b);
      }),
      (c.type = E),
      (c.isFunction = F),
      (c.isWindow = G),
      (c.isArray = K),
      (c.isPlainObject = J),
      (c.isEmptyObject = function (a) {
        var b;
        for (b in a) return !1;
        return !0;
      }),
      (c.inArray = function (a, b, c) {
        return e.indexOf.call(b, a, c);
      }),
      (c.camelCase = B),
      (c.trim = function (a) {
        return a.trim();
      }),
      (c.uuid = 0),
      (c.support = {}),
      (c.expr = {}),
      (c.map = function (a, b) {
        var c,
          d = [],
          e,
          f;
        if (L(a))
          for (e = 0; e < a.length; e++)
            (c = b(a[e], e)), c != null && d.push(c);
        else for (f in a) (c = b(a[f], f)), c != null && d.push(c);
        return N(d);
      }),
      (c.each = function (a, b) {
        var c, d;
        if (L(a)) {
          for (c = 0; c < a.length; c++)
            if (b.call(a[c], c, a[c]) === !1) return a;
        } else for (d in a) if (b.call(a[d], d, a[d]) === !1) return a;
        return a;
      }),
      (c.grep = function (a, b) {
        return g.call(a, b);
      }),
      window.JSON && (c.parseJSON = JSON.parse),
      c.each(
        "Boolean Number String Function Array Date RegExp Object Error".split(
          " "
        ),
        function (a, b) {
          y["[object " + b + "]"] = b.toLowerCase();
        }
      ),
      (c.fn = {
        forEach: e.forEach,
        reduce: e.reduce,
        push: e.push,
        sort: e.sort,
        indexOf: e.indexOf,
        concat: e.concat,
        map: function (a) {
          return c(
            c.map(this, function (b, c) {
              return a.call(b, c, b);
            })
          );
        },
        slice: function () {
          return c(f.apply(this, arguments));
        },
        ready: function (a) {
          return (
            u.test(h.readyState)
              ? a(c)
              : h.addEventListener(
                  "DOMContentLoaded",
                  function () {
                    a(c);
                  },
                  !1
                ),
            this
          );
        },
        get: function (b) {
          return b === a ? f.call(this) : this[b >= 0 ? b : b + this.length];
        },
        toArray: function () {
          return this.get();
        },
        size: function () {
          return this.length;
        },
        remove: function () {
          return this.each(function () {
            this.parentNode != null && this.parentNode.removeChild(this);
          });
        },
        each: function (a) {
          return (
            e.every.call(this, function (b, c) {
              return a.call(b, c, b) !== !1;
            }),
            this
          );
        },
        filter: function (a) {
          return F(a)
            ? this.not(this.not(a))
            : c(
                g.call(this, function (b) {
                  return A.matches(b, a);
                })
              );
        },
        add: function (a, b) {
          return c(C(this.concat(c(a, b))));
        },
        is: function (a) {
          return this.length > 0 && A.matches(this[0], a);
        },
        not: function (b) {
          var d = [];
          if (F(b) && b.call !== a)
            this.each(function (a) {
              b.call(this, a) || d.push(this);
            });
          else {
            var e =
              typeof b == "string"
                ? this.filter(b)
                : L(b) && F(b.item)
                ? f.call(b)
                : c(b);
            this.forEach(function (a) {
              e.indexOf(a) < 0 && d.push(a);
            });
          }
          return c(d);
        },
        has: function (a) {
          return this.filter(function () {
            return I(a) ? c.contains(this, a) : c(this).find(a).size();
          });
        },
        eq: function (a) {
          return a === -1 ? this.slice(a) : this.slice(a, +a + 1);
        },
        first: function () {
          var a = this[0];
          return a && !I(a) ? a : c(a);
        },
        last: function () {
          var a = this[this.length - 1];
          return a && !I(a) ? a : c(a);
        },
        find: function (a) {
          var b,
            d = this;
          return (
            typeof a == "object"
              ? (b = c(a).filter(function () {
                  var a = this;
                  return e.some.call(d, function (b) {
                    return c.contains(b, a);
                  });
                }))
              : this.length == 1
              ? (b = c(A.qsa(this[0], a)))
              : (b = this.map(function () {
                  return A.qsa(this, a);
                })),
            b
          );
        },
        closest: function (a, b) {
          var d = this[0],
            e = !1;
          typeof a == "object" && (e = c(a));
          while (d && !(e ? e.indexOf(d) >= 0 : A.matches(d, a)))
            d = d !== b && !H(d) && d.parentNode;
          return c(d);
        },
        parents: function (a) {
          var b = [],
            d = this;
          while (d.length > 0)
            d = c.map(d, function (a) {
              if ((a = a.parentNode) && !H(a) && b.indexOf(a) < 0)
                return b.push(a), a;
            });
          return U(b, a);
        },
        parent: function (a) {
          return U(C(this.pluck("parentNode")), a);
        },
        children: function (a) {
          return U(
            this.map(function () {
              return S(this);
            }),
            a
          );
        },
        contents: function () {
          return this.map(function () {
            return f.call(this.childNodes);
          });
        },
        siblings: function (a) {
          return U(
            this.map(function (a, b) {
              return g.call(S(b.parentNode), function (a) {
                return a !== b;
              });
            }),
            a
          );
        },
        empty: function () {
          return this.each(function () {
            this.innerHTML = "";
          });
        },
        pluck: function (a) {
          return c.map(this, function (b) {
            return b[a];
          });
        },
        show: function () {
          return this.each(function () {
            this.style.display == "none" && (this.style.display = null),
              k(this, "").getPropertyValue("display") == "none" &&
                (this.style.display = R(this.nodeName));
          });
        },
        replaceWith: function (a) {
          return this.before(a).remove();
        },
        wrap: function (a) {
          var b = F(a);
          if (this[0] && !b)
            var d = c(a).get(0),
              e = d.parentNode || this.length > 1;
          return this.each(function (f) {
            c(this).wrapAll(b ? a.call(this, f) : e ? d.cloneNode(!0) : d);
          });
        },
        wrapAll: function (a) {
          if (this[0]) {
            c(this[0]).before((a = c(a)));
            var b;
            while ((b = a.children()).length) a = b.first();
            c(a).append(this);
          }
          return this;
        },
        wrapInner: function (a) {
          var b = F(a);
          return this.each(function (d) {
            var e = c(this),
              f = e.contents(),
              g = b ? a.call(this, d) : a;
            f.length ? f.wrapAll(g) : e.append(g);
          });
        },
        unwrap: function () {
          return (
            this.parent().each(function () {
              c(this).replaceWith(c(this).children());
            }),
            this
          );
        },
        clone: function () {
          return this.map(function () {
            return this.cloneNode(!0);
          });
        },
        hide: function () {
          return this.css("display", "none");
        },
        toggle: function (b) {
          return this.each(function () {
            var d = c(this);
            (b === a ? d.css("display") == "none" : b) ? d.show() : d.hide();
          });
        },
        prev: function (a) {
          return c(this.pluck("previousElementSibling")).filter(a || "*");
        },
        next: function (a) {
          return c(this.pluck("nextElementSibling")).filter(a || "*");
        },
        html: function (b) {
          return b === a
            ? this.length > 0
              ? this[0].innerHTML
              : null
            : this.each(function (a) {
                var d = this.innerHTML;
                c(this).empty().append(V(this, b, a, d));
              });
        },
        text: function (b) {
          return b === a
            ? this.length > 0
              ? this[0].textContent
              : null
            : this.each(function () {
                this.textContent = b;
              });
        },
        attr: function (c, d) {
          var e;
          return typeof c == "string" && d === a
            ? this.length == 0 || this[0].nodeType !== 1
              ? a
              : c == "value" && this[0].nodeName == "INPUT"
              ? this.val()
              : !(e = this[0].getAttribute(c)) && c in this[0]
              ? this[0][c]
              : e
            : this.each(function (a) {
                if (this.nodeType !== 1) return;
                if (I(c)) for (b in c) W(this, b, c[b]);
                else W(this, c, V(this, d, a, this.getAttribute(c)));
              });
        },
        removeAttr: function (a) {
          return this.each(function () {
            this.nodeType === 1 && W(this, a);
          });
        },
        prop: function (b, c) {
          return c === a
            ? this[0] && this[0][b]
            : this.each(function (a) {
                this[b] = V(this, c, a, this[b]);
              });
        },
        data: function (b, c) {
          var d = this.attr("data-" + O(b), c);
          return d !== null ? Y(d) : a;
        },
        val: function (b) {
          return b === a
            ? this[0] &&
                (this[0].multiple
                  ? c(this[0])
                      .find("option")
                      .filter(function (a) {
                        return this.selected;
                      })
                      .pluck("value")
                  : this[0].value)
            : this.each(function (a) {
                this.value = V(this, b, a, this.value);
              });
        },
        offset: function (a) {
          if (a)
            return this.each(function (b) {
              var d = c(this),
                e = V(this, a, b, d.offset()),
                f = d.offsetParent().offset(),
                g = { top: e.top - f.top, left: e.left - f.left };
              d.css("position") == "static" && (g.position = "relative"),
                d.css(g);
            });
          if (this.length == 0) return null;
          var b = this[0].getBoundingClientRect();
          return {
            left: b.left + window.pageXOffset,
            top: b.top + window.pageYOffset,
            width: Math.round(b.width),
            height: Math.round(b.height),
          };
        },
        css: function (a, c) {
          if (arguments.length < 2 && typeof a == "string")
            return (
              this[0] &&
              (this[0].style[B(a)] || k(this[0], "").getPropertyValue(a))
            );
          var d = "";
          if (E(a) == "string")
            !c && c !== 0
              ? this.each(function () {
                  this.style.removeProperty(O(a));
                })
              : (d = O(a) + ":" + Q(a, c));
          else
            for (b in a)
              !a[b] && a[b] !== 0
                ? this.each(function () {
                    this.style.removeProperty(O(b));
                  })
                : (d += O(b) + ":" + Q(b, a[b]) + ";");
          return this.each(function () {
            this.style.cssText += ";" + d;
          });
        },
        index: function (a) {
          return a
            ? this.indexOf(c(a)[0])
            : this.parent().children().indexOf(this[0]);
        },
        hasClass: function (a) {
          return e.some.call(
            this,
            function (a) {
              return this.test(X(a));
            },
            P(a)
          );
        },
        addClass: function (a) {
          return this.each(function (b) {
            d = [];
            var e = X(this),
              f = V(this, a, b, e);
            f.split(/\s+/g).forEach(function (a) {
              c(this).hasClass(a) || d.push(a);
            }, this),
              d.length && X(this, e + (e ? " " : "") + d.join(" "));
          });
        },
        removeClass: function (b) {
          return this.each(function (c) {
            if (b === a) return X(this, "");
            (d = X(this)),
              V(this, b, c, d)
                .split(/\s+/g)
                .forEach(function (a) {
                  d = d.replace(P(a), " ");
                }),
              X(this, d.trim());
          });
        },
        toggleClass: function (b, d) {
          return this.each(function (e) {
            var f = c(this),
              g = V(this, b, e, X(this));
            g.split(/\s+/g).forEach(function (b) {
              (d === a ? !f.hasClass(b) : d) ? f.addClass(b) : f.removeClass(b);
            });
          });
        },
        scrollTop: function () {
          if (!this.length) return;
          return "scrollTop" in this[0] ? this[0].scrollTop : this[0].scrollY;
        },
        position: function () {
          if (!this.length) return;
          var a = this[0],
            b = this.offsetParent(),
            d = this.offset(),
            e = o.test(b[0].nodeName) ? { top: 0, left: 0 } : b.offset();
          return (
            (d.top -= parseFloat(c(a).css("margin-top")) || 0),
            (d.left -= parseFloat(c(a).css("margin-left")) || 0),
            (e.top += parseFloat(c(b[0]).css("border-top-width")) || 0),
            (e.left += parseFloat(c(b[0]).css("border-left-width")) || 0),
            { top: d.top - e.top, left: d.left - e.left }
          );
        },
        offsetParent: function () {
          return this.map(function () {
            var a = this.offsetParent || h.body;
            while (a && !o.test(a.nodeName) && c(a).css("position") == "static")
              a = a.offsetParent;
            return a;
          });
        },
      }),
      (c.fn.detach = c.fn.remove),
      ["width", "height"].forEach(function (b) {
        c.fn[b] = function (d) {
          var e,
            f = this[0],
            g = b.replace(/./, function (a) {
              return a[0].toUpperCase();
            });
          return d === a
            ? G(f)
              ? f["inner" + g]
              : H(f)
              ? f.documentElement["offset" + g]
              : (e = this.offset()) && e[b]
            : this.each(function (a) {
                (f = c(this)), f.css(b, V(this, d, a, f[b]()));
              });
        };
      }),
      q.forEach(function (a, b) {
        var d = b % 2;
        (c.fn[a] = function () {
          var a,
            e = c.map(arguments, function (b) {
              return (
                (a = E(b)),
                a == "object" || a == "array" || b == null ? b : A.fragment(b)
              );
            }),
            f,
            g = this.length > 1;
          return e.length < 1
            ? this
            : this.each(function (a, h) {
                (f = d ? h : h.parentNode),
                  (h =
                    b == 0
                      ? h.nextSibling
                      : b == 1
                      ? h.firstChild
                      : b == 2
                      ? h
                      : null),
                  e.forEach(function (a) {
                    if (g) a = a.cloneNode(!0);
                    else if (!f) return c(a).remove();
                    Z(f.insertBefore(a, h), function (a) {
                      a.nodeName != null &&
                        a.nodeName.toUpperCase() === "SCRIPT" &&
                        (!a.type || a.type === "text/javascript") &&
                        !a.src &&
                        window.eval.call(window, a.innerHTML);
                    });
                  });
              });
        }),
          (c.fn[d ? a + "To" : "insert" + (b ? "Before" : "After")] = function (
            b
          ) {
            return c(b)[a](this), this;
          });
      }),
      (A.Z.prototype = c.fn),
      (A.uniq = C),
      (A.deserializeValue = Y),
      (c.zepto = A),
      c
    );
  })();
  (window.Zepto = Zepto),
    "$" in window || (window.$ = Zepto),
    (function (a) {
      function b(a) {
        var b = (this.os = {}),
          c = (this.browser = {}),
          d = a.match(/WebKit\/([\d.]+)/),
          e = a.match(/(Android)\s+([\d.]+)/),
          f = a.match(/(iPad).*OS\s([\d_]+)/),
          g = !f && a.match(/(iPhone\sOS)\s([\d_]+)/),
          h = a.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
          i = h && a.match(/TouchPad/),
          j = a.match(/Kindle\/([\d.]+)/),
          k = a.match(/Silk\/([\d._]+)/),
          l = a.match(/(BlackBerry).*Version\/([\d.]+)/),
          m = a.match(/(BB10).*Version\/([\d.]+)/),
          n = a.match(/(RIM\sTablet\sOS)\s([\d.]+)/),
          o = a.match(/PlayBook/),
          p = a.match(/Chrome\/([\d.]+)/) || a.match(/CriOS\/([\d.]+)/),
          q = a.match(/Firefox\/([\d.]+)/);
        if ((c.webkit = !!d)) c.version = d[1];
        e && ((b.android = !0), (b.version = e[2])),
          g && ((b.ios = b.iphone = !0), (b.version = g[2].replace(/_/g, "."))),
          f && ((b.ios = b.ipad = !0), (b.version = f[2].replace(/_/g, "."))),
          h && ((b.webos = !0), (b.version = h[2])),
          i && (b.touchpad = !0),
          l && ((b.blackberry = !0), (b.version = l[2])),
          m && ((b.bb10 = !0), (b.version = m[2])),
          n && ((b.rimtabletos = !0), (b.version = n[2])),
          o && (c.playbook = !0),
          j && ((b.kindle = !0), (b.version = j[1])),
          k && ((c.silk = !0), (c.version = k[1])),
          !k && b.android && a.match(/Kindle Fire/) && (c.silk = !0),
          p && ((c.chrome = !0), (c.version = p[1])),
          q && ((c.firefox = !0), (c.version = q[1])),
          (b.tablet = !!(
            f ||
            o ||
            (e && !a.match(/Mobile/)) ||
            (q && a.match(/Tablet/))
          )),
          (b.phone =
            !b.tablet &&
            !!(
              e ||
              g ||
              h ||
              l ||
              m ||
              (p && a.match(/Android/)) ||
              (p && a.match(/CriOS\/([\d.]+)/)) ||
              (q && a.match(/Mobile/))
            ));
      }
      b.call(a, navigator.userAgent), (a.__detect = b);
    })(Zepto),
    (function (a) {
      function g(a) {
        return a._zid || (a._zid = d++);
      }
      function h(a, b, d, e) {
        b = i(b);
        if (b.ns) var f = j(b.ns);
        return (c[g(a)] || []).filter(function (a) {
          return (
            a &&
            (!b.e || a.e == b.e) &&
            (!b.ns || f.test(a.ns)) &&
            (!d || g(a.fn) === g(d)) &&
            (!e || a.sel == e)
          );
        });
      }
      function i(a) {
        var b = ("" + a).split(".");
        return { e: b[0], ns: b.slice(1).sort().join(" ") };
      }
      function j(a) {
        return new RegExp("(?:^| )" + a.replace(" ", " .* ?") + "(?: |$)");
      }
      function k(b, c, d) {
        a.type(b) != "string"
          ? a.each(b, d)
          : b.split(/\s/).forEach(function (a) {
              d(a, c);
            });
      }
      function l(a, b) {
        return (a.del && (a.e == "focus" || a.e == "blur")) || !!b;
      }
      function m(a) {
        return f[a] || a;
      }
      function n(b, d, e, h, j, n) {
        var o = g(b),
          p = c[o] || (c[o] = []);
        k(d, e, function (c, d) {
          var e = i(c);
          (e.fn = d),
            (e.sel = h),
            e.e in f &&
              (d = function (b) {
                var c = b.relatedTarget;
                if (!c || (c !== this && !a.contains(this, c)))
                  return e.fn.apply(this, arguments);
              }),
            (e.del = j && j(d, c));
          var g = e.del || d;
          (e.proxy = function (a) {
            var c = g.apply(b, [a].concat(a.data));
            return c === !1 && (a.preventDefault(), a.stopPropagation()), c;
          }),
            (e.i = p.length),
            p.push(e),
            b.addEventListener(m(e.e), e.proxy, l(e, n));
        });
      }
      function o(a, b, d, e, f) {
        var i = g(a);
        k(b || "", d, function (b, d) {
          h(a, b, d, e).forEach(function (b) {
            delete c[i][b.i], a.removeEventListener(m(b.e), b.proxy, l(b, f));
          });
        });
      }
      function t(b) {
        var c,
          d = { originalEvent: b };
        for (c in b) !r.test(c) && b[c] !== undefined && (d[c] = b[c]);
        return (
          a.each(s, function (a, c) {
            (d[a] = function () {
              return (this[c] = p), b[a].apply(b, arguments);
            }),
              (d[c] = q);
          }),
          d
        );
      }
      function u(a) {
        if (!("defaultPrevented" in a)) {
          a.defaultPrevented = !1;
          var b = a.preventDefault;
          a.preventDefault = function () {
            (this.defaultPrevented = !0), b.call(this);
          };
        }
      }
      var b = a.zepto.qsa,
        c = {},
        d = 1,
        e = {},
        f = { mouseenter: "mouseover", mouseleave: "mouseout" };
      (e.click = e.mousedown = e.mouseup = e.mousemove = "MouseEvents"),
        (a.event = { add: n, remove: o }),
        (a.proxy = function (b, c) {
          if (a.isFunction(b)) {
            var d = function () {
              return b.apply(c, arguments);
            };
            return (d._zid = g(b)), d;
          }
          if (typeof c == "string") return a.proxy(b[c], b);
          throw new TypeError("expected function");
        }),
        (a.fn.bind = function (a, b) {
          return this.each(function () {
            n(this, a, b);
          });
        }),
        (a.fn.unbind = function (a, b) {
          return this.each(function () {
            o(this, a, b);
          });
        }),
        (a.fn.one = function (a, b) {
          return this.each(function (c, d) {
            n(this, a, b, null, function (a, b) {
              return function () {
                var c = a.apply(d, arguments);
                return o(d, b, a), c;
              };
            });
          });
        });
      var p = function () {
          return !0;
        },
        q = function () {
          return !1;
        },
        r = /^([A-Z]|layer[XY]$)/,
        s = {
          preventDefault: "isDefaultPrevented",
          stopImmediatePropagation: "isImmediatePropagationStopped",
          stopPropagation: "isPropagationStopped",
        };
      (a.fn.delegate = function (b, c, d) {
        return this.each(function (e, f) {
          n(f, c, d, b, function (c) {
            return function (d) {
              var e,
                g = a(d.target).closest(b, f).get(0);
              if (g)
                return (
                  (e = a.extend(t(d), { currentTarget: g, liveFired: f })),
                  c.apply(g, [e].concat([].slice.call(arguments, 1)))
                );
            };
          });
        });
      }),
        (a.fn.undelegate = function (a, b, c) {
          return this.each(function () {
            o(this, b, c, a);
          });
        }),
        (a.fn.live = function (b, c) {
          return a(document.body).delegate(this.selector, b, c), this;
        }),
        (a.fn.die = function (b, c) {
          return a(document.body).undelegate(this.selector, b, c), this;
        }),
        (a.fn.on = function (b, c, d) {
          return !c || a.isFunction(c)
            ? this.bind(b, c || d)
            : this.delegate(c, b, d);
        }),
        (a.fn.off = function (b, c, d) {
          return !c || a.isFunction(c)
            ? this.unbind(b, c || d)
            : this.undelegate(c, b, d);
        }),
        (a.fn.trigger = function (b, c) {
          if (typeof b == "string" || a.isPlainObject(b)) b = a.Event(b);
          return (
            u(b),
            (b.data = c),
            this.each(function () {
              "dispatchEvent" in this && this.dispatchEvent(b);
            })
          );
        }),
        (a.fn.triggerHandler = function (b, c) {
          var d, e;
          return (
            this.each(function (f, g) {
              (d = t(typeof b == "string" ? a.Event(b) : b)),
                (d.data = c),
                (d.target = g),
                a.each(h(g, b.type || b), function (a, b) {
                  e = b.proxy(d);
                  if (d.isImmediatePropagationStopped()) return !1;
                });
            }),
            e
          );
        }),
        "focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error"
          .split(" ")
          .forEach(function (b) {
            a.fn[b] = function (a) {
              return a ? this.bind(b, a) : this.trigger(b);
            };
          }),
        ["focus", "blur"].forEach(function (b) {
          a.fn[b] = function (a) {
            return (
              a
                ? this.bind(b, a)
                : this.each(function () {
                    try {
                      this[b]();
                    } catch (a) {}
                  }),
              this
            );
          };
        }),
        (a.Event = function (a, b) {
          typeof a != "string" && ((b = a), (a = b.type));
          var c = document.createEvent(e[a] || "Events"),
            d = !0;
          if (b) for (var f in b) f == "bubbles" ? (d = !!b[f]) : (c[f] = b[f]);
          return (
            c.initEvent(
              a,
              d,
              !0,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null
            ),
            (c.isDefaultPrevented = function () {
              return this.defaultPrevented;
            }),
            c
          );
        });
    })(Zepto),
    (function ($) {
      function triggerAndReturn(a, b, c) {
        var d = $.Event(b);
        return $(a).trigger(d, c), !d.defaultPrevented;
      }
      function triggerGlobal(a, b, c, d) {
        if (a.global) return triggerAndReturn(b || document, c, d);
      }
      function ajaxStart(a) {
        a.global && $.active++ === 0 && triggerGlobal(a, null, "ajaxStart");
      }
      function ajaxStop(a) {
        a.global && !--$.active && triggerGlobal(a, null, "ajaxStop");
      }
      function ajaxBeforeSend(a, b) {
        var c = b.context;
        if (
          b.beforeSend.call(c, a, b) === !1 ||
          triggerGlobal(b, c, "ajaxBeforeSend", [a, b]) === !1
        )
          return !1;
        triggerGlobal(b, c, "ajaxSend", [a, b]);
      }
      function ajaxSuccess(a, b, c) {
        var d = c.context,
          e = "success";
        c.success.call(d, a, e, b),
          triggerGlobal(c, d, "ajaxSuccess", [b, c, a]),
          ajaxComplete(e, b, c);
      }
      function ajaxError(a, b, c, d) {
        var e = d.context;
        d.error.call(e, c, b, a),
          triggerGlobal(d, e, "ajaxError", [c, d, a]),
          ajaxComplete(b, c, d);
      }
      function ajaxComplete(a, b, c) {
        var d = c.context;
        c.complete.call(d, b, a),
          triggerGlobal(c, d, "ajaxComplete", [b, c]),
          ajaxStop(c);
      }
      function empty() {}
      function mimeToDataType(a) {
        return (
          a && (a = a.split(";", 2)[0]),
          (a &&
            (a == htmlType
              ? "html"
              : a == jsonType
              ? "json"
              : scriptTypeRE.test(a)
              ? "script"
              : xmlTypeRE.test(a) && "xml")) ||
            "text"
        );
      }
      function appendQuery(a, b) {
        return (a + "&" + b).replace(/[&?]{1,2}/, "?");
      }
      function serializeData(a) {
        a.processData &&
          a.data &&
          $.type(a.data) != "string" &&
          (a.data = $.param(a.data, a.traditional)),
          a.data &&
            (!a.type || a.type.toUpperCase() == "GET") &&
            (a.url = appendQuery(a.url, a.data));
      }
      function parseArguments(a, b, c, d) {
        var e = !$.isFunction(b);
        return {
          url: a,
          data: e ? b : undefined,
          success: e ? ($.isFunction(c) ? c : undefined) : b,
          dataType: e ? d || c : c,
        };
      }
      function serialize(a, b, c, d) {
        var e,
          f = $.isArray(b);
        $.each(b, function (b, g) {
          (e = $.type(g)),
            d && (b = c ? d : d + "[" + (f ? "" : b) + "]"),
            !d && f
              ? a.add(g.name, g.value)
              : e == "array" || (!c && e == "object")
              ? serialize(a, g, c, b)
              : a.add(b, g);
        });
      }
      var jsonpID = 0,
        document = window.document,
        key,
        name,
        rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        scriptTypeRE = /^(?:text|application)\/javascript/i,
        xmlTypeRE = /^(?:text|application)\/xml/i,
        jsonType = "application/json",
        htmlType = "text/html",
        blankRE = /^\s*$/;
      ($.active = 0),
        ($.ajaxJSONP = function (a) {
          if ("type" in a) {
            var b = "jsonp" + ++jsonpID,
              c = document.createElement("script"),
              d = function () {
                clearTimeout(g), $(c).remove(), delete window[b];
              },
              e = function (c) {
                d();
                if (!c || c == "timeout") window[b] = empty;
                ajaxError(null, c || "abort", f, a);
              },
              f = { abort: e },
              g;
            return ajaxBeforeSend(f, a) === !1
              ? (e("abort"), !1)
              : ((window[b] = function (b) {
                  d(), ajaxSuccess(b, f, a);
                }),
                (c.onerror = function () {
                  e("error");
                }),
                (c.src = a.url.replace(/=\?/, "=" + b)),
                $("head").append(c),
                a.timeout > 0 &&
                  (g = setTimeout(function () {
                    e("timeout");
                  }, a.timeout)),
                f);
          }
          return $.ajax(a);
        }),
        ($.ajaxSettings = {
          type: "GET",
          beforeSend: empty,
          success: empty,
          error: empty,
          complete: empty,
          context: null,
          global: !0,
          xhr: function () {
            return new window.XMLHttpRequest();
          },
          accepts: {
            script: "text/javascript, application/javascript",
            json: jsonType,
            xml: "application/xml, text/xml",
            html: htmlType,
            text: "text/plain",
          },
          crossDomain: !1,
          timeout: 0,
          processData: !0,
          cache: !0,
        }),
        ($.ajax = function (options) {
          var settings = $.extend({}, options || {});
          for (key in $.ajaxSettings)
            settings[key] === undefined &&
              (settings[key] = $.ajaxSettings[key]);
          ajaxStart(settings),
            settings.crossDomain ||
              (settings.crossDomain =
                /^([\w-]+:)?\/\/([^\/]+)/.test(settings.url) &&
                RegExp.$2 != window.location.host),
            settings.url || (settings.url = window.location.toString()),
            serializeData(settings),
            settings.cache === !1 &&
              (settings.url = appendQuery(settings.url, "_=" + Date.now()));
          var dataType = settings.dataType,
            hasPlaceholder = /=\?/.test(settings.url);
          if (dataType == "jsonp" || hasPlaceholder)
            return (
              hasPlaceholder ||
                (settings.url = appendQuery(settings.url, "callback=?")),
              $.ajaxJSONP(settings)
            );
          var mime = settings.accepts[dataType],
            baseHeaders = {},
            protocol = /^([\w-]+:)\/\//.test(settings.url)
              ? RegExp.$1
              : window.location.protocol,
            xhr = settings.xhr(),
            abortTimeout;
          settings.crossDomain ||
            (baseHeaders["X-Requested-With"] = "XMLHttpRequest"),
            mime &&
              ((baseHeaders.Accept = mime),
              mime.indexOf(",") > -1 && (mime = mime.split(",", 2)[0]),
              xhr.overrideMimeType && xhr.overrideMimeType(mime));
          if (
            settings.contentType ||
            (settings.contentType !== !1 &&
              settings.data &&
              settings.type.toUpperCase() != "GET")
          )
            baseHeaders["Content-Type"] =
              settings.contentType || "application/x-www-form-urlencoded";
          (settings.headers = $.extend(baseHeaders, settings.headers || {})),
            (xhr.onreadystatechange = function () {
              if (xhr.readyState == 4) {
                (xhr.onreadystatechange = empty), clearTimeout(abortTimeout);
                var result,
                  error = !1;
                if (
                  (xhr.status >= 200 && xhr.status < 300) ||
                  xhr.status == 304 ||
                  (xhr.status == 0 && protocol == "file:")
                ) {
                  (dataType =
                    dataType ||
                    mimeToDataType(xhr.getResponseHeader("content-type"))),
                    (result = xhr.responseText);
                  try {
                    dataType == "script"
                      ? (1, eval)(result)
                      : dataType == "xml"
                      ? (result = xhr.responseXML)
                      : dataType == "json" &&
                        (result = blankRE.test(result)
                          ? null
                          : $.parseJSON(result));
                  } catch (e) {
                    error = e;
                  }
                  error
                    ? ajaxError(error, "parsererror", xhr, settings)
                    : ajaxSuccess(result, xhr, settings);
                } else
                  ajaxError(
                    null,
                    xhr.status ? "error" : "abort",
                    xhr,
                    settings
                  );
              }
            });
          var async = "async" in settings ? settings.async : !0;
          xhr.open(settings.type, settings.url, async);
          for (name in settings.headers)
            xhr.setRequestHeader(name, settings.headers[name]);
          return ajaxBeforeSend(xhr, settings) === !1
            ? (xhr.abort(), !1)
            : (settings.timeout > 0 &&
                (abortTimeout = setTimeout(function () {
                  (xhr.onreadystatechange = empty),
                    xhr.abort(),
                    ajaxError(null, "timeout", xhr, settings);
                }, settings.timeout)),
              xhr.send(settings.data ? settings.data : null),
              xhr);
        }),
        ($.get = function (a, b, c, d) {
          return $.ajax(parseArguments.apply(null, arguments));
        }),
        ($.post = function (a, b, c, d) {
          var e = parseArguments.apply(null, arguments);
          return (e.type = "POST"), $.ajax(e);
        }),
        ($.getJSON = function (a, b, c) {
          var d = parseArguments.apply(null, arguments);
          return (d.dataType = "json"), $.ajax(d);
        }),
        ($.fn.load = function (a, b, c) {
          if (!this.length) return this;
          var d = this,
            e = a.split(/\s/),
            f,
            g = parseArguments(a, b, c),
            h = g.success;
          return (
            e.length > 1 && ((g.url = e[0]), (f = e[1])),
            (g.success = function (a) {
              d.html(f ? $("<div>").html(a.replace(rscript, "")).find(f) : a),
                h && h.apply(d, arguments);
            }),
            $.ajax(g),
            this
          );
        });
      var escape = encodeURIComponent;
      $.param = function (a, b) {
        var c = [];
        return (
          (c.add = function (a, b) {
            this.push(escape(a) + "=" + escape(b));
          }),
          serialize(c, a, b),
          c.join("&").replace(/%20/g, "+")
        );
      };
    })(Zepto),
    (function (a) {
      (a.fn.serializeArray = function () {
        var b = [],
          c;
        return (
          a(Array.prototype.slice.call(this.get(0).elements)).each(function () {
            c = a(this);
            var d = c.attr("type");
            this.nodeName.toLowerCase() != "fieldset" &&
              !this.disabled &&
              d != "submit" &&
              d != "reset" &&
              d != "button" &&
              ((d != "radio" && d != "checkbox") || this.checked) &&
              b.push({ name: c.attr("name"), value: c.val() });
          }),
          b
        );
      }),
        (a.fn.serialize = function () {
          var a = [];
          return (
            this.serializeArray().forEach(function (b) {
              a.push(
                encodeURIComponent(b.name) + "=" + encodeURIComponent(b.value)
              );
            }),
            a.join("&")
          );
        }),
        (a.fn.submit = function (b) {
          if (b) this.bind("submit", b);
          else if (this.length) {
            var c = a.Event("submit");
            this.eq(0).trigger(c), c.defaultPrevented || this.get(0).submit();
          }
          return this;
        });
    })(Zepto),
    (function (a, b) {
      function s(a) {
        return t(a.replace(/([a-z])([A-Z])/, "$1-$2"));
      }
      function t(a) {
        return a.toLowerCase();
      }
      function u(a) {
        return d ? d + a : t(a);
      }
      var c = "",
        d,
        e,
        f,
        g = { Webkit: "webkit", Moz: "", O: "o", ms: "MS" },
        h = window.document,
        i = h.createElement("div"),
        j =
          /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,
        k,
        l,
        m,
        n,
        o,
        p,
        q,
        r = {};
      a.each(g, function (a, e) {
        if (i.style[a + "TransitionProperty"] !== b)
          return (c = "-" + t(a) + "-"), (d = e), !1;
      }),
        (k = c + "transform"),
        (r[(l = c + "transition-property")] =
          r[(m = c + "transition-duration")] =
          r[(n = c + "transition-timing-function")] =
          r[(o = c + "animation-name")] =
          r[(p = c + "animation-duration")] =
          r[(q = c + "animation-timing-function")] =
            ""),
        (a.fx = {
          off: d === b && i.style.transitionProperty === b,
          speeds: { _default: 400, fast: 200, slow: 600 },
          cssPrefix: c,
          transitionEnd: u("TransitionEnd"),
          animationEnd: u("AnimationEnd"),
        }),
        (a.fn.animate = function (b, c, d, e) {
          return (
            a.isPlainObject(c) &&
              ((d = c.easing), (e = c.complete), (c = c.duration)),
            c &&
              (c =
                (typeof c == "number"
                  ? c
                  : a.fx.speeds[c] || a.fx.speeds._default) / 1e3),
            this.anim(b, c, d, e)
          );
        }),
        (a.fn.anim = function (c, d, e, f) {
          var g,
            h = {},
            i,
            t = "",
            u = this,
            v,
            w = a.fx.transitionEnd;
          d === b && (d = 0.4), a.fx.off && (d = 0);
          if (typeof c == "string")
            (h[o] = c),
              (h[p] = d + "s"),
              (h[q] = e || "linear"),
              (w = a.fx.animationEnd);
          else {
            i = [];
            for (g in c)
              j.test(g)
                ? (t += g + "(" + c[g] + ") ")
                : ((h[g] = c[g]), i.push(s(g)));
            t && ((h[k] = t), i.push(k)),
              d > 0 &&
                typeof c == "object" &&
                ((h[l] = i.join(", ")),
                (h[m] = d + "s"),
                (h[n] = e || "linear"));
          }
          return (
            (v = function (b) {
              if (typeof b != "undefined") {
                if (b.target !== b.currentTarget) return;
                a(b.target).unbind(w, v);
              }
              a(this).css(r), f && f.call(this);
            }),
            d > 0 && this.bind(w, v),
            this.size() && this.get(0).clientLeft,
            this.css(h),
            d <= 0 &&
              setTimeout(function () {
                u.each(function () {
                  v.call(this);
                });
              }, 0),
            this
          );
        }),
        (i = null);
    })(Zepto);
  return Zepto;
});
define("lib/ai", function (require, exports, module) {
  var ai = {
    touchClick: function (obj, fun) {
      var start_x = 0,
        start_y = 0;
      obj.addEventListener("touchstart", function (e) {
        start_x = e.touches[0].clientX;
        start_y = e.touches[0].clientY;
        document.addEventListener("touchend", touEnd, false);
      });
      function touEnd(e) {
        var endX = e.changedTouches[0].clientX;
        var endY = e.changedTouches[0].clientY;
        if (Math.abs(endX - start_x) < 5 && Math.abs(endY - start_y) < 5) {
          fun.call(obj, e);
        }
        document.removeEventListener("touchend", touEnd, false);
      }
    },
    ovb: {
      _version_value: false,
      _bversion_value: false,
      _ua: navigator.userAgent,
      android: function () {
        var regular_result = this._ua.match(/(Android)\s+([\d.]+)/),
          os_boolean = !!regular_result;
        if (!this._version_value && os_boolean) {
          this._version_value = regular_result[2];
        }
        this.android = function () {
          return os_boolean;
        };
        return os_boolean;
      },
      ios: function () {
        var regular_result = this._ua.match(/.*OS\s([\d_]+)/),
          os_boolean = !!regular_result;
        if (!this._version_value && os_boolean) {
          this._version_value = regular_result[1].replace(/_/g, ".");
        }
        this.ios = function () {
          return os_boolean;
        };
        return os_boolean;
      },
      ipod: function () {
        var regular_result = this._ua.match(/(iPod).*OS\s([\d_]+)/),
          os_boolean = !!regular_result;
        if (!this._version_value && os_boolean) {
          this._version_value = regular_result[2].replace(/_/g, ".");
        }
        this.ipod = function () {
          return os_boolean;
        };
        return os_boolean;
      },
      ipad: function () {
        var regular_result = this._ua.match(/(iPad).*OS\s([\d_]+)/),
          os_boolean = !!regular_result;
        if (!this._version_value && os_boolean) {
          this._version_value = regular_result[2].replace(/_/g, ".");
        }
        this.ipad = function () {
          return os_boolean;
        };
        return os_boolean;
      },
      iphone: function () {
        var regular_result = this._ua.match(/(iPhone);.*OS\s([\d_]+)/),
          os_boolean = !!regular_result;
        if (!this._version_value && os_boolean) {
          this._version_value = regular_result[2].replace(/_/g, ".");
        }
        this.iphone = function () {
          return os_boolean;
        };
        return os_boolean;
      },
      weixn: function () {
        var regular_result = this._ua.match(/MicroMessenger/i),
          os_boolean = !!regular_result;
        if (!this._version_value && os_boolean) {
          this._bversion_value = regular_result[1];
        }
        this.weixn = function () {
          return os_boolean;
        };
        return os_boolean;
      },
      kindle: function () {
        var regular_result = this._ua.match(/Kindle\/([\d.]+)/),
          os_boolean = !!regular_result;
        if (!this._version_value && os_boolean) {
          this._version_value = regular_result[1];
        }
        this.kindle = function () {
          return os_boolean;
        };
        return os_boolean;
      },
      webkit: function () {
        var regular_result = this._ua.match(/WebKit\/([\d.]+)/),
          os_boolean = !!regular_result;
        if (!this._version_value && os_boolean) {
          this._bversion_value = regular_result[1];
        }
        this.webkit = function () {
          return os_boolean;
        };
        return os_boolean;
      },
      uc: function () {
        var regular_result = this._ua.match(/UC/),
          os_boolean = !!regular_result;
        this.uc = function () {
          return os_boolean;
        };
        return os_boolean;
      },
      opera: function () {
        var regular_result = this._ua.match(/Opera/),
          os_boolean = !!regular_result;
        this.opera = function () {
          return os_boolean;
        };
        return os_boolean;
      },
      safari: function () {
        var regular_result = this._ua.match(/Version.*Safari/),
          os_boolean = !!regular_result;
        this.safari = function () {
          return os_boolean;
        };
        return os_boolean;
      },
      silk: function () {
        var regular_result = this._ua.match(/Silk/),
          os_boolean = !!regular_result;
        this.silk = function () {
          return os_boolean;
        };
        return os_boolean;
      },
      version: function () {
        return this._version_value;
      },
      bVersion: function () {
        return this._bversion_value;
      },
    },
    a: function (s) {
      return document.querySelectorAll(s);
    },
    q: function (s) {
      return document.querySelector(s);
    },
    i: function (id) {
      return document.getElementById(id);
    },
    c: function (klass) {
      return document.getElementsByClassName(klass);
    },
    hideUrl: function () {
      setTimeout(function () {
        window.scrollTo(0, 1);
      }, 200);
    },
    wh: function () {
      return document.documentElement.clientHeight;
    },
    ww: function () {
      return document.documentElement.clientWidth;
    },
    hv: function () {
      if (this.wh() / this.ww() > 1) {
        return true;
      } else {
        return false;
      }
    },
    resize: function (fun) {
      this.resize_time = Date.now();
      window.addEventListener(
        "resize",
        function () {
          if (Date.now() - this.resize_time < 200) {
            this.resize_time = Date.now();
          } else {
            fun();
            this.resize_time = Date.now();
          }
        },
        false
      );
    },
    clone: function (object) {
      function f() {}
      f.prototype = object;
      return new f();
    },
    extend: function (subClass, superClass) {
      var f = function () {};
      f.prototype = superClass.prototype;
      subClass.prototype = new f();
      subClass.prototype.constructor = subClass;
      subClass.superclass = superClass.prototype;
      if (superClass.prototype.constructor == Object.prototype.constructor) {
        superClass.prototype.constructor = superClass;
      }
    },
    styleLoad: function (url, fun) {
      var A = document.createElement("style");
      A.type = "text/css";
      A.src = url;
      document.head.appendChild(A);
      A.onload = function () {
        fun();
      };
    },
    scriptLoad: function (url, fun) {
      var A = document.createElement("script");
      A.type = "text/javascript";
      A.src = url;
      document.head.appendChild(A);
      A.onload = function () {
        fun();
      };
    },
    touchMovePreventDefault: function (obj) {
      obj.addEventListener(
        "touchmove",
        function (e) {
          e.preventDefault();
        },
        false
      );
    },
  };

  return ai;
});
define("lib/slip", function (require, exports, module) {
  (function (f, c) {
    _fun = {
      ios: function () {
        var i = navigator.userAgent.match(/.*OS\s([\d_]+)/),
          h = !!i;
        if (!this._version_value && h) {
          this._version_value = i[1].replace(/_/g, ".");
        }
        this.ios = function () {
          return h;
        };
        return h;
      },
      version: function () {
        return this._version_value;
      },
      clone: function (h) {
        function i() {}
        i.prototype = h;
        return new i();
      },
    };
    var b = {
      _refreshCommon: function (h, j) {
        var i = this;
        i.wide_high = h || i.core[i.offset] - i.up_range;
        i.parent_wide_high = j || i.core.parentNode[i.offset];
        i._getCoreWidthSubtractShellWidth();
      },
      _initCommon: function (h, j) {
        var i = this;
        i.core = h;
        i.startFun = j.startFun;
        i.moveFun = j.moveFun;
        i.touchEndFun = j.touchEndFun;
        i.endFun = j.endFun;
        i.direction = j.direction;
        i.up_range = j.up_range || 0;
        i.down_range = j.down_range || 0;
        if (i.direction == "x") {
          i.offset = "offsetWidth";
          i._pos = i.__posX;
        } else {
          i.offset = "offsetHeight";
          i._pos = i.__posY;
        }
        i.wide_high = j.wide_high || i.core[i.offset] - i.up_range;
        i.parent_wide_high = j.parent_wide_high || i.core.parentNode[i.offset];
        i._getCoreWidthSubtractShellWidth();
        i._bind("touchstart");
        i._bind("touchmove");
        i._bind("touchend");
        i._bind("webkitTransitionEnd");
        i.xy = 0;
        i.y = 0;
        i._pos(-i.up_range);
      },
      _getCoreWidthSubtractShellWidth: function () {
        var h = this;
        h.width_cut_coreWidth = h.parent_wide_high - h.wide_high;
        h.coreWidth_cut_width = h.wide_high - h.parent_wide_high;
      },
      handleEvent: function (h) {
        switch (h.type) {
          case "touchstart":
            this._start(h);
            break;
          case "touchmove":
            this._move(h);
            break;
          case "touchend":
          case "touchcancel":
            this._end(h);
            break;
          case "webkitTransitionEnd":
            this._transitionEnd(h);
            break;
        }
      },
      _bind: function (i, h) {
        this.core.addEventListener(i, this, !!h);
      },
      _unBind: function (i, h) {
        this.core.removeEventListener(i, this, !!h);
      },
      __posX: function (h) {
        this.xy = h;
        this.core.style.webkitTransform = "translate3d(" + h + "px, 0px, 0px)";
      },
      __posY: function (h) {
        this.xy = h;
        this.core.style.webkitTransform = "translate3d(0px, " + h + "px, 0px)";
      },
      _posTime: function (h, i) {
        this.core.style.webkitTransitionDuration = "" + i + "ms";
        this._pos(h);
      },
    };
    var a = _fun.clone(b);
    a._init = function (h, j) {
      var i = this;
      i._initCommon(h, j);
      i.num = j.num;
      i.page = 0;
      i.change_time = j.change_time;
      i.lastPageFun = j.lastPageFun;
      i.firstPageFun = j.firstPageFun;
      j.change_time && i._autoChange();
      j.no_follow
        ? ((i._move = i._moveNoMove), (i.next_time = 500))
        : (i.next_time = 300);
    };
    a._start = function (i) {
      var h = this,
        i = i.touches[0];
      h._abrupt_x = 0;
      h._abrupt_x_abs = 0;
      h._start_x = h._start_x_clone = i.pageX;
      h._start_y = i.pageY;
      h._movestart = undefined;
      h.change_time && h._stop();
      h.startFun && h.startFun(i);
    };
    a._move = function (h) {
      var i = this;
      i._moveShare(h);
      if (!i._movestart) {
        var j = h.touches[0];
        h.preventDefault();
        i.offset_x =
          i.xy > 0 || i.xy < i.width_cut_coreWidth
            ? i._dis_x / 2 + i.xy
            : i._dis_x + i.xy;
        i._start_x = j.pageX;
        if (i._abrupt_x_abs < 6) {
          i._abrupt_x += i._dis_x;
          i._abrupt_x_abs = Math.abs(i._abrupt_x);
          return;
        }
        i._pos(i.offset_x);
        i.moveFun && i.moveFun(j);
      }
    };
    a._moveNoMove = function (h) {
      var i = this;
      i._moveShare(h);
      if (!i._movestart) {
        h.preventDefault();
        i.moveFun && i.moveFun(e);
      }
    };
    a._moveShare = function (h) {
      var i = this,
        j = h.touches[0];
      i._dis_x = j.pageX - i._start_x;
      i._dis_y = j.pageY - i._start_y;
      typeof i._movestart == "undefined" &&
        (i._movestart = !!(
          i._movestart || Math.abs(i._dis_x) < Math.abs(i._dis_y)
        ));
    };
    a._end = function (i) {
      if (!this._movestart) {
        var h = this;
        h._end_x = i.changedTouches[0].pageX;
        h._range = h._end_x - h._start_x_clone;
        if (h._range > 35) {
          h.page != 0 ? (h.page -= 1) : h.firstPageFun && h.firstPageFun(i);
        } else {
          if (Math.abs(h._range) > 35) {
            h.page != h.num - 1
              ? (h.page += 1)
              : h.lastPageFun && h.lastPageFun(i);
          }
        }
        h.toPage(h.page, h.next_time);
        h.touchEndFun && h.touchEndFun(i);
      }
    };
    a._transitionEnd = function (i) {
      var h = this;
      i.stopPropagation();
      h.core.style.webkitTransitionDuration = "0";
      h._stop_ing && h._autoChange(), (h._stop_ing = false);
      h.endFun && h.endFun();
    };
    a.toPage = function (h, i) {
      this._posTime(-this.parent_wide_high * h, i || 0);
      this.page = h;
    };
    a._stop = function () {
      clearInterval(this._autoChangeSet);
      this._stop_ing = true;
    };
    a._autoChange = function () {
      var h = this;
      h._autoChangeSet = setInterval(function () {
        h.page != h.num - 1 ? (h.page += 1) : (h.page = 0);
        h.toPage(h.page, h.next_time);
      }, h.change_time);
    };
    a.refresh = function (h, i) {
      this._refreshCommon(h, i);
    };
    var g = _fun.clone(b);
    g._init = function (h, j) {
      var i = this;
      i._initCommon(h, j);
      i.perfect = j.perfect;
      i.bar_no_hide = j.bar_no_hide;
      if (i.direction == "x") {
        i.page_x = "pageX";
        i.page_y = "pageY";
        i.width_or_height = "width";
        i._real = i._realX;
        i._posBar = i.__posBarX;
      } else {
        i.page_x = "pageY";
        i.page_y = "pageX";
        i.width_or_height = "height";
        i._real = i._realY;
        i._posBar = i.__posBarY;
      }
      if (i.perfect) {
        i._transitionEnd = function () {};
        i._stop = i._stopPerfect;
        i._slipBar = i._slipBarPerfect;
        i._posTime = i._posTimePerfect;
        i._bar_upRange = i.up_range;
        i.no_bar = false;
        i._slipBarTime = function () {};
      } else {
        i.no_bar = j.no_bar;
        i.core.style.webkitTransitionTimingFunction =
          "cubic-bezier(0.33, 0.66, 0.66, 1)";
      }
      if (i.bar_no_hide) {
        i._hideBar = function () {};
        i._showBar = function () {};
      }
      if (_fun.ios()) {
        i.radius = 11;
      } else {
        i.radius = 0;
      }
      if (!i.no_bar) {
        i._insertSlipBar(j);
        if (i.coreWidth_cut_width <= 0) {
          i._bar_shell_opacity = 0;
          i._showBarStorage = i._showBar;
          i._showBar = function () {};
        }
      } else {
        i._hideBar = function () {};
        i._showBar = function () {};
      }
    };
    g._start = function (i) {
      var h = this,
        i = i.touches[0];
      h._animating = false;
      h._steps = [];
      h._abrupt_x = 0;
      h._abrupt_x_abs = 0;
      h._start_x = h._start_x_clone = i[h.page_x];
      h._start_y = i[h.page_y];
      h._start_time = i.timeStamp || Date.now();
      h._movestart = undefined;
      !h.perfect && h._need_stop && h._stop();
      h.core.style.webkitTransitionDuration = "0";
      h.startFun && h.startFun(i);
    };
    g._move = function (i) {
      var j = this,
        k = i.touches[0],
        l = k[j.page_x],
        m = k[j.page_y],
        h = j.xy;
      j._dis_x = l - j._start_x;
      j._dis_y = m - j._start_y;
      j.direction == "x" &&
        typeof j._movestart == "undefined" &&
        (j._movestart = !!(
          j._movestart || Math.abs(j._dis_x) < Math.abs(j._dis_y)
        ));
      if (!j._movestart) {
        i.preventDefault();
        j._move_time = k.timeStamp || Date.now();
        j.offset_x =
          h > 0 || h < j.width_cut_coreWidth - j.up_range
            ? j._dis_x / 2 + h
            : j._dis_x + h;
        j._start_x = l;
        j._start_y = m;
        j._showBar();
        if (j._abrupt_x_abs < 6) {
          j._abrupt_x += j._dis_x;
          j._abrupt_x_abs = Math.abs(j._abrupt_x);
          return;
        }
        j._pos(j.offset_x);
        j.no_bar || j._slipBar();
        if (j._move_time - j._start_time > 300) {
          j._start_time = j._move_time;
          j._start_x_clone = l;
        }
        j.moveFun && j.moveFun(k);
      }
    };
    g._end = function (l) {
      if (!this._movestart) {
        var j = this,
          l = l.changedTouches[0],
          k = (l.timeStamp || Date.now()) - j._start_time,
          i = l[j.page_x] - j._start_x_clone;
        j._need_stop = true;
        if (k < 300 && Math.abs(i) > 10) {
          if (j.xy > -j.up_range || j.xy < j.width_cut_coreWidth) {
            j._rebound();
          } else {
            var h = j._momentum(
              i,
              k,
              -j.xy - j.up_range,
              j.coreWidth_cut_width + j.xy,
              j.parent_wide_high
            );
            j._posTime(j.xy + h.dist, h.time);
            j.no_bar || j._slipBarTime(h.time);
          }
        } else {
          j._rebound();
        }
        j.touchEndFun && j.touchEndFun(l);
      }
    };
    g._transitionEnd = function (i) {
      var h = this;
      if (i.target != h.core) {
        return;
      }
      h._rebound();
      h._need_stop = false;
    };
    g._rebound = function (j) {
      var i = this,
        h =
          i.coreWidth_cut_width <= 0
            ? 0
            : i.xy >= -i.up_range
            ? -i.up_range
            : i.xy <= i.width_cut_coreWidth - i.up_range
            ? i.width_cut_coreWidth - i.up_range
            : i.xy;
      if (h == i.xy) {
        i.endFun && i.endFun();
        i._hideBar();
        return;
      }
      i._posTime(h, j || 400);
      i.no_bar || i._slipBarTime(j);
    };
    g._insertSlipBar = function (l) {
      var i = this;
      i._bar = c.createElement("div");
      i._bar_shell = c.createElement("div");
      if (i.direction == "x") {
        var k =
          "height: 5px; position: absolute;z-index: 10; pointer-events: none;";
        var j =
          "opacity: " +
          i._bar_shell_opacity +
          "; left:2px; bottom: 2px; right: 2px; height: 5px; position: absolute; z-index: 10; pointer-events: none;";
      } else {
        var k =
          "width: 5px; position: absolute;z-index: 10; pointer-events: none;";
        var j =
          "opacity: " +
          i._bar_shell_opacity +
          "; top:2px; bottom: 2px; right: 2px; width: 5px; position: absolute; z-index: 10; pointer-events: none; ";
      }
      var h =
        " background-color: rgba(0, 0, 0, 0.5); border-radius: " +
        i.radius +
        "px; -webkit-transition: cubic-bezier(0.33, 0.66, 0.66, 1);";
      var k = k + h + l.bar_css;
      i._bar.style.cssText = k;
      i._bar_shell.style.cssText = j;
      i._countAboutBar();
      i._countBarSize();
      i._setBarSize();
      i._countWidthCutBarSize();
      i._bar_shell.appendChild(i._bar);
      i.core.parentNode.appendChild(i._bar_shell);
      setTimeout(function () {
        i._hideBar();
      }, 500);
    };
    g._posBar = function (h) {};
    g.__posBarX = function (i) {
      var h = this;
      h._bar.style.webkitTransform = "translate3d(" + i + "px, 0px, 0px)";
    };
    g.__posBarY = function (i) {
      var h = this;
      h._bar.style.webkitTransform = "translate3d(0px, " + i + "px, 0px)";
    };
    g._slipBar = function () {
      var h = this;
      var i = h._about_bar * (h.xy + h.up_range);
      if (i <= 0) {
        i = 0;
      } else {
        if (i >= h._width_cut_barSize) {
          i = Math.round(h._width_cut_barSize);
        }
      }
      h._posBar(i);
      h._showBar();
    };
    g._slipBarPerfect = function () {
      var i = this;
      var j = i._about_bar * (i.xy + i._bar_upRange);
      i._bar.style[i.width_or_height] = i._bar_size + "px";
      if (j < 0) {
        var h = i._bar_size + j * 3;
        i._bar.style[i.width_or_height] = Math.round(Math.max(h, 5)) + "px";
        j = 0;
      } else {
        if (j >= i._width_cut_barSize) {
          var h = i._bar_size - (j - i._width_cut_barSize) * 3;
          if (h < 5) {
            h = 5;
          }
          i._bar.style[i.width_or_height] = Math.round(h) + "px";
          j = Math.round(i._width_cut_barSize + i._bar_size - h);
        }
      }
      i._posBar(j);
    };
    g._slipBarTime = function (h) {
      this._bar.style.webkitTransitionDuration = "" + h + "ms";
      this._slipBar();
    };
    g._stop = function () {
      var h = this,
        i = h._real();
      h._pos(i);
      if (!h.no_bar) {
        h._bar.style.webkitTransitionDuration = "0";
        h._posBar(h._about_bar * i);
      }
    };
    g._stopPerfect = function () {
      clearTimeout(this._aniTime);
      this._animating = false;
    };
    g._realX = function () {
      var h = getComputedStyle(this.core, null)
        ["webkitTransform"].replace(/[^0-9-.,]/g, "")
        .split(",");
      return h[4] * 1;
    };
    g._realY = function () {
      var h = getComputedStyle(this.core, null)
        ["webkitTransform"].replace(/[^0-9-.,]/g, "")
        .split(",");
      return h[5] * 1;
    };
    g._countBarSize = function () {
      this._bar_size = Math.round(
        Math.max(
          (this.parent_wide_high * this.parent_wide_high) / this.wide_high,
          5
        )
      );
    };
    g._setBarSize = function () {
      this._bar.style[this.width_or_height] = this._bar_size + "px";
    };
    g._countAboutBar = function () {
      this._about_bar =
        (this.parent_wide_high -
          4 -
          ((this.parent_wide_high - 4) * this.parent_wide_high) /
            this.wide_high) /
        this.width_cut_coreWidth;
    };
    g._countWidthCutBarSize = function () {
      this._width_cut_barSize = this.parent_wide_high - 4 - this._bar_size;
    };
    g.refresh = function (h, j) {
      var i = this;
      i._refreshCommon(h, j);
      if (!i.no_bar) {
        if (i.coreWidth_cut_width <= 0) {
          i._bar_shell_opacity = 0;
          i._showBar = function () {};
        } else {
          i._showBar = i._showBarStorage || i._showBar;
          i._countAboutBar();
          i._countBarSize();
          i._setBarSize();
          i._countWidthCutBarSize();
        }
      }
      i._rebound(0);
    };
    g._posTimePerfect = function (h, o) {
      var n = this,
        m = h,
        k,
        j;
      n._steps.push({ x: h, time: o || 0 });
      n._startAni();
    };
    g._startAni = function () {
      var m = this,
        h = m.xy,
        k = Date.now(),
        l,
        j,
        i;
      if (m._animating) {
        return;
      }
      if (!m._steps.length) {
        m._rebound();
        return;
      }
      l = m._steps.shift();
      if (l.x == h) {
        l.time = 0;
      }
      m._animating = true;
      i = function () {
        var n = Date.now(),
          o;
        if (n >= k + l.time) {
          m._pos(l.x);
          m._animating = false;
          m._startAni();
          return;
        }
        n = (n - k) / l.time - 1;
        j = Math.sqrt(1 - n * n);
        o = (l.x - h) * j + h;
        m._pos(o);
        if (m._animating) {
          m._slipBar();
          m._aniTime = setTimeout(i, 1);
        }
      };
      i();
    };
    g._momentum = function (o, i, m, h, q) {
      var n = 0.001,
        j = Math.abs(o) / i,
        k = (j * j) / (2 * n),
        p = 0,
        l = 0;
      if (o > 0 && k > m) {
        l = q / (6 / ((k / j) * n));
        m = m + l;
        j = (j * m) / k;
        k = m;
      } else {
        if (o < 0 && k > h) {
          l = q / (6 / ((k / j) * n));
          h = h + l;
          j = (j * h) / k;
          k = h;
        }
      }
      k = k * (o < 0 ? -1 : 1);
      p = j / n;
      return { dist: k, time: p };
    };
    g._showBar = function () {
      var h = this;
      h._bar_shell.style.webkitTransitionDelay = "0ms";
      h._bar_shell.style.webkitTransitionDuration = "0ms";
      h._bar_shell.style.opacity = "1";
    };
    g._hideBar = function () {
      var h = this;
      h._bar_shell.style.opacity = "0";
      h._bar_shell.style.webkitTransitionDelay = "300ms";
      h._bar_shell.style.webkitTransitionDuration = "300ms";
    };
    function d(k, h, l) {
      l || (l = {});
      if (
        _fun.ios() &&
        parseInt(_fun.version()) >= 5 &&
        l.direction == "x" &&
        l.wit
      ) {
        h.parentNode.style.cssText +=
          "overflow:scroll; -webkit-overflow-scrolling:touch;";
      } else {
        switch (k) {
          case "page":
            l.direction = "x";
            if (!this.SlipPage) {
              this.SlipPage = true;
              a._init(h, l);
              return a;
            } else {
              var j = _fun.clone(a);
              j._init(h, l);
              return j;
            }
            break;
          case "px":
            if (!this.SlipPx) {
              this.SlipPx = true;
              g._init(h, l);
              return g;
            } else {
              var i = _fun.clone(g);
              i._init(h, l);
              return i;
            }
            break;
          default:
            break;
        }
      }
    }
    f.slip = d;
  })(window, document);
  return slip;
});
define("lib/tcss", function (require, exports, module) {
  (function () {
    var _d,
      _l,
      _b,
      _n = "-",
      _params,
      _curDomain,
      _curUrl,
      _domainToSet,
      _refDomain,
      _refUrl,
      _image,
      _ver = "3.0.3";
    if (typeof _rep == "undefined") {
      var _rep = 1;
    }
    function tcss(params) {
      this.url = [];
      this.init(params);
    }
    tcss.prototype = {
      init: function (params) {
        params ? (_params = params) : (_params = {});
        _d = document;
        if (!_params.statIframe) {
          if (window != top) {
            try {
              _d = top.document;
            } catch (e) {}
          }
        }
        _l = _d.location;
        _b = _d.body;
      },
      run: function () {
        var bt, et, ext;
        bt = new Date().getTime();
        _cookie.init();
        this.url.push(this.getDomainInfo());
        this.url.unshift("httpssssss://pingfore." + _domainToSet + "/pingd?");
        this.url.push(this.getRefInfo(_params));
        try {
          if (navigator.cookieEnabled) {
            this.url.push("&pvid=" + _cookie.setCookie("pgv_pvid", true));
          } else {
            this.url.push("&pvid=NoCookie");
          }
        } catch (e) {
          this.url.push("&pvid=NoCookie");
        }
        this.url.push(this.getMainEnvInfo());
        this.url.push(this.getExtendEnvInfo());
        this.url.push("&vs=" + _ver);
        if (_params.userDefineVariable) {
          this.url.push(_udv.setv(_params.userDefineVariable));
        } else {
          this.url.push(_udv.setv());
        }
        _cookie.setCookie("ssid");
        _cookie.save();
        if (_params.originalReferer) {
          this.url.push("&or=" + _params.originalReferer);
        }
        et = new Date().getTime();
        _params.extParam ? (ext = _params.extParam + "|") : (ext = "");
        this.url.push("&ext=" + escape(ext + (et - bt)));
        this.url.push("&rand=" + Math.round(Math.random() * 100000));
        typeof _speedMark == "undefined"
          ? this.url.push("&reserved1=-1")
          : this.url.push("&reserved1=" + (new Date() - _speedMark));
        this.sendInfo(this.url.join(""));
        if (_params.hot) {
          if (document.attachEvent) {
            document.attachEvent("onclick", function (event) {
              pgvWatchClick(event);
            });
          } else {
            document.addEventListener(
              "click",
              function (event) {
                pgvWatchClick(event);
              },
              false
            );
          }
        }
        if (_params.repeatApplay && _params.repeatApplay == "true") {
          if (typeof _rep != "undefined") {
            _rep = 1;
          }
        }
      },
      getDomainInfo: function (hot) {
        var dm, url;
        _curDomain = dm = _params.virtualDomain || _l.host;
        dm = _curDomain.toLowerCase();
        if (!_domainToSet) {
          _domainToSet = this.getCookieSetDomain();
        }
        if (hot) {
          var pl = dm.indexOf(":");
          if (pl > -1) {
            dm = dm.substr(0, pl) + ".hot" + dm.substr(pl);
          } else {
            dm += ".hot";
          }
        }
        url = this.getCurrentUrl();
        return "dm=" + dm + "&url=" + url;
      },
      getCurrentUrl: function () {
        var url = "";
        var arg = _n;
        if (_params.virtualURL) {
          url = _params.virtualURL;
        } else {
          url = _curUrl = escape(_l.pathname);
          if (_l.search != "") {
            arg = escape(_l.search.substr(1));
          }
          if (_params.senseParam) {
            var value = this.getParameter(_params.senseParam, _d.URL);
            if (value) {
              url += "_" + value;
            }
          }
        }
        return url + "&arg=" + arg;
      },
      getRefInfo: function (params) {
        var refdm = _n,
          refurl = _n,
          refarg = _n,
          refStr = _d.referrer,
          tagParamName,
          adtag,
          pos;
        var virtualDomain = params.virtualDomain ? params.virtualDomain : _n;
        var virtualURL = params.virtualURL ? params.virtualURL : _n;
        _refDomain = params.virtualRefDomain ? params.virtualRefDomain : "";
        _refUrl = params.virtualRefURL ? params.virtualRefURL : "";
        if (params.statIframe || params.useCookie == "true") {
          refStr = _cookie.get("pgvReferrer=");
          var newRef = _d.URL;
          var paraPos = newRef.indexOf("?");
          if (paraPos > -1) {
            newRef = newRef.substr(0, paraPos);
          }
          _cookie.set("pgvReferrer", newRef);
        } else {
          if (params.useCookie == "set" && _refDomain != "" && _refUrl != "") {
            var newRef =
              "httpssssss:" == _l.protocol ? "httpssssss://" : "httpssssss://";
            newRef += _refDomain + refUrl;
            _cookie.set("pgvReferrer", newRef);
          } else {
            if (
              params.useCookie == "set" &&
              (virtualDomain != _n || virtualURL != _n)
            ) {
              var newRef =
                "httpssssss:" == _l.protocol
                  ? "httpssssss://"
                  : "httpssssss://";
              newRef += virtualDomain == _n ? _curDomain : virtualDomain;
              newRef += virtualURL == _n ? _curUrl : virtualURL;
              _cookie.set("pgvReferrer", newRef);
            } else {
              if (params.useCookie == "get") {
                var oldRef = _cookie.get("pgvReferrer=");
                if (oldRef != "") {
                  refStr = oldRef;
                }
                _cookie.set("pgvReferrer", "");
              } else {
                _cookie.set("pgvReferrer", "");
              }
            }
          }
        }
        tagParamName = params.tagParamName || "ADTAG";
        adtag = this.getParameter(tagParamName, _d.URL);
        if (adtag) {
          refdm = "ADTAG";
          refurl = adtag;
        }
        pos = refStr.indexOf("://");
        if (pos > -1 && refdm == _n) {
          var re =
            /(\w+):\/\/([^\:|\/]+)(\:\d*)?(.*\/)([^#|\?|\n]+)?(#.*)?(\?.*)?/i;
          var arr = refStr.match(re);
          if (arr) {
            refdm = arr[2];
            refurl = arr[4] + arr[5];
          }
        }
        if (refStr.indexOf("?") != -1) {
          var pos = refStr.indexOf("?") + 1;
          refarg = refStr.substr(pos);
        }
        if (_refDomain != "" && params.useCookie == "false") {
          refdm = _refDomain;
        }
        if (_refUrl != "" && params.useCookie == "false") {
          refurl = _refUrl;
        }
        _refDomain = refdm;
        _refUrl = escape(refurl);
        return (
          "&rdm=" + _refDomain + "&rurl=" + _refUrl + "&rarg=" + escape(refarg)
        );
      },
      getMainEnvInfo: function () {
        var ret = "";
        try {
          var scr = _n,
            scl = _n,
            lang = _n,
            cpuc = _n,
            pf = _n,
            tz = _n,
            java = 0,
            n = navigator;
          if (self.screen) {
            scr = screen.width + "x" + screen.height;
            scl = screen.colorDepth + "-bit";
          }
          if (n.language) {
            lang = n.language.toLowerCase();
          } else {
            if (n.browserLanguage) {
              lang = n.browserLanguage.toLowerCase();
            }
          }
          java = n.javaEnabled() ? 1 : 0;
          cpuc = n.cpuClass;
          pf = n.platform;
          tz = new Date().getTimezoneOffset() / 60;
          ret =
            "&scr=" +
            scr +
            "&scl=" +
            scl +
            "&lang=" +
            lang +
            "&java=" +
            java +
            "&cc=" +
            cpuc +
            "&pf=" +
            pf +
            "&tz=" +
            tz;
        } catch (e) {
        } finally {
          return ret;
        }
      },
      getExtendEnvInfo: function () {
        var ret = "";
        try {
          var flash,
            currentUrl = _l.href,
            connectType = _n;
          ret += "&flash=" + this.getFlashInfo();
          if (_b.addBehavior) {
            _b.addBehavior("#default#homePage");
            if (_b.isHomePage(currentUrl)) {
              ret += "&hp=Y";
            }
          }
          if (_b.addBehavior) {
            _b.addBehavior("#default#clientCaps");
            connectType = _b.connectionType;
          }
          ret += "&ct=" + connectType;
        } catch (e) {
        } finally {
          return ret;
        }
      },
      getFlashInfo: function () {
        var f = _n,
          n = navigator;
        try {
          if (n.plugins && n.plugins.length) {
            for (var i = 0; i < n.plugins.length; i++) {
              if (n.plugins[i].name.indexOf("Shockwave Flash") > -1) {
                f = n.plugins[i].description.split("Shockwave Flash ")[1];
                break;
              }
            }
          } else {
            if (window.ActiveXObject) {
              for (var i = 12; i >= 5; i--) {
                try {
                  var fl = eval(
                    "new ActiveXObject('ShockwaveFlash.ShockwaveFlash." +
                      i +
                      "');"
                  );
                  if (fl) {
                    f = i + ".0";
                    break;
                  }
                } catch (e) {}
              }
            }
          }
        } catch (e) {}
        return f;
      },
      getParameter: function (name, src) {
        if (name && src) {
          var r = new RegExp("(\\?|#|&)" + name + "=([^&^#]*)(#|&|$)");
          var m = src.match(r);
          return m ? m[2] : "";
        }
        return "";
      },
      getCookieSetDomain: function () {
        var dotlen,
          pos,
          domainToSet,
          dot = [],
          j = 0;
        for (var i = 0; i < _curDomain.length; i++) {
          if (_curDomain.charAt(i) == ".") {
            dot[j] = i;
            j++;
          }
        }
        dotlen = dot.length;
        pos = _curDomain.indexOf(".cn");
        if (pos > -1) {
          dotlen--;
        }
        domainToSet = "qq.com";
        if (dotlen == 1) {
          domainToSet = _curDomain;
        } else {
          if (dotlen > 1) {
            domainToSet = _curDomain.substring(dot[dotlen - 2] + 1);
          }
        }
        return domainToSet;
      },
      watchClick: function (e) {
        try {
          var istag = true,
            hottag = "",
            srcElement;
          srcElement = window.event ? window.event.srcElement : e.target;
          switch (srcElement.tagName) {
            case "A":
              hottag =
                "<A href=" +
                srcElement.href +
                ">" +
                srcElement.innerHTML +
                "</a>";
              break;
            case "IMG":
              hottag = "<IMG src=" + srcElement.src + ">";
              break;
            case "INPUT":
              hottag =
                "<INPUT type=" +
                srcElement.type +
                " value=" +
                srcElement.value +
                ">";
              break;
            case "BUTTON":
              hottag = "<BUTTON>" + srcElement.innerText + "</BUTTON>";
              break;
            case "SELECT":
              hottag = "SELECT";
              break;
            default:
              istag = false;
              break;
          }
          if (istag) {
            var t = new tcss(_params);
            var pos = t.getElementPos(srcElement);
            if (_params.coordinateId) {
              var coordinatePos = t.getElementPos(
                document.getElementById(_params.coordinateId)
              );
              pos.x -= coordinatePos.x;
            }
            t.url.push(t.getDomainInfo(true));
            t.url.push("&hottag=" + escape(hottag));
            t.url.push("&hotx=" + pos.x);
            t.url.push("&hoty=" + pos.y);
            t.url.push("&rand=" + Math.round(Math.random() * 100000));
            t.url.unshift("httpssssss://pinghot." + _domainToSet + "/pingd?");
            t.sendInfo(t.url.join(""));
          }
        } catch (ex) {}
      },
      getElementPos: function (el) {
        if (el.parentNode === null || el.style.display == "none") {
          return false;
        }
        var ua = navigator.userAgent.toLowerCase(),
          parent = null,
          pos = [],
          box;
        if (el.getBoundingClientRect) {
          var scrollTop, scrollLeft, clientTop, clientLeft;
          box = el.getBoundingClientRect();
          scrollTop = Math.max(
            document.documentElement.scrollTop,
            document.body.scrollTop
          );
          scrollLeft = Math.max(
            document.documentElement.scrollLeft,
            document.body.scrollLeft
          );
          clientTop = document.body.clientTop;
          clientLeft = document.body.clientLeft;
          return {
            x: box.left + scrollLeft - clientLeft,
            y: box.top + scrollTop - clientTop,
          };
        } else {
          if (document.getBoxObjectFor) {
            box = document.getBoxObjectFor(el);
            var borderLeft = el.style.borderLeftWidth
              ? Math.floor(el.style.borderLeftWidth)
              : 0;
            var borderTop = el.style.borderTopWidth
              ? Math.floor(el.style.borderTopWidth)
              : 0;
            pos = [box.x - borderLeft, box.y - borderTop];
          } else {
            pos = [el.offsetLeft, el.offsetTop];
            parent = el.offsetParent;
            if (parent != el) {
              while (parent) {
                pos[0] += parent.offsetLeft;
                pos[1] += parent.offsetTop;
                parent = parent.offsetParent;
              }
            }
            if (
              ua.indexOf("opera") > -1 ||
              (ua.indexOf("safari") > -1 && el.style.position == "absolute")
            ) {
              pos[0] -= document.body.offsetLeft;
              pos[1] -= document.body.offsetTop;
            }
          }
        }
        if (el.parentNode) {
          parent = el.parentNode;
        } else {
          parent = null;
        }
        while (parent && parent.tagName != "BODY" && parent.tagName != "HTML") {
          pos[0] -= parent.scrollLeft;
          pos[1] -= parent.scrollTop;
          if (parent.parentNode) {
            parent = parent.parentNode;
          } else {
            parent = null;
          }
        }
        return { x: pos[0], y: pos[1] };
      },
      sendClick: function () {
        if (_params.hottag) {
          this.url.push(this.getDomainInfo(true));
          this.url.push("&hottag=" + escape(_params.hottag));
          this.url.push("&hotx=9999&hoty=9999");
          this.url.push("&rand=" + Math.round(Math.random() * 100000));
          this.url.unshift("httpssssss://pinghot." + _domainToSet + "/pingd?");
          this.sendInfo(this.url.join(""));
        }
      },
      sendInfo: function (url) {
        _image = new Image(1, 1);
        _image.src = url;
      },
    };
    var _udv = {
      vscope: { page: 3, session: 2, user: 1 },
      setv: function (tuple) {
        var params = "";
        var val = "";
        if (
          !tuple ||
          !tuple.name ||
          tuple.name == "" ||
          !tuple.value ||
          tuple.value == "" ||
          !tuple.scope ||
          tuple.scope < 1 ||
          tuple.scope > 3
        ) {
          val =
            _cookie.get("custvar=") == _n
              ? _cookie.get("custvar=", true)
              : _cookie.get("custvar=");
          params = "&custvar=" + val;
        } else {
          var val = tuple.name + ":" + tuple.value;
          switch (tuple.scope) {
            case this.vscope.page:
              break;
            case this.vscope.session:
              _cookie.setCookie("custvar", false, val);
              break;
            case this.vscope.user:
              _cookie.setCookie("custvar", true, val);
              break;
          }
          params = "&custvar=" + val;
        }
        return params;
      },
    };
    var _cookie = {
      sck: [],
      sco: {},
      init: function () {
        var value = this.get("pgv_info=", true);
        if (value != _n) {
          var arr = value.split("&");
          for (var i = 0; i < arr.length; i++) {
            var arr2 = arr[i].split("=");
            this.set(arr2[0], unescape(arr2[1]));
          }
        }
      },
      get: function (name, isend) {
        var cookies = isend ? _d.cookie : this.get("pgv_info=", true);
        var value = _n;
        var offset, end;
        offset = cookies.indexOf(name);
        if (offset > -1) {
          offset += name.length;
          end = cookies.indexOf(";", offset);
          if (end == -1) {
            end = cookies.length;
          }
          if (!isend) {
            var end2 = cookies.indexOf("&", offset);
            if (end2 > -1) {
              end = Math.min(end, end2);
            }
          }
          value = cookies.substring(offset, end);
        }
        return value;
      },
      set: function (key, value) {
        this.sco[key] = value;
        var isExist = false;
        var sckLen = this.sck.length;
        for (var i = 0; i < sckLen; i++) {
          if (key == this.sck[i]) {
            isExist = true;
            break;
          }
        }
        if (!isExist) {
          this.sck.push(key);
        }
      },
      setCookie: function (name, isend, value) {
        var id = _cookie.get(name + "=", isend);
        if (id == _n && !value) {
          isend ? (id = "") : (id = "s");
          var curDate = new Date();
          var curMs = curDate.getUTCMilliseconds();
          id +=
            (Math.round(Math.abs(Math.random() - 1) * 2147483647) * curMs) %
            10000000000;
        } else {
          id = value ? value : id;
        }
        if (isend) {
          this.saveCookie(
            name + "=" + id,
            "expires=Sun, 18 Jan 2038 00:00:00 GMT;"
          );
        } else {
          this.set(name, id);
        }
        return id;
      },
      save: function () {
        if (_params.sessionSpan) {
          var expires = new Date();
          expires.setTime(expires.getTime() + _params.sessionSpan * 60 * 1000);
        }
        var cookies = "";
        var sckLen = this.sck.length;
        for (var i = 0; i < sckLen; i++) {
          cookies += this.sck[i] + "=" + this.sco[this.sck[i]] + "&";
        }
        cookies = "pgv_info=" + cookies.substr(0, cookies.length - 1);
        var expire = "";
        if (expires) {
          expire = "expires=" + expires.toGMTString();
        }
        this.saveCookie(cookies, expire);
      },
      saveCookie: function (cookie, expires) {
        _d.cookie = cookie + ";path=/;domain=" + _domainToSet + ";" + expires;
      },
    };
    window.pgvMain = function (param1, param2) {
      var params = "";
      if (param2) {
        params = param2;
        _ver = "o3.0.2";
      } else {
        params = param1;
        _ver = "3.0.3";
      }
      try {
        if (_rep == 1) {
          _rep = 2;
        } else {
          return;
        }
        new tcss(params).run();
      } catch (e) {}
    };
    window.pgvSendClick = function (params) {
      new tcss(params).sendClick();
    };
    window.pgvWatchClick = function (params) {
      new tcss(params).watchClick(params);
    };
  })();
  return {
    pgvMain: pgvMain,
    pgvSendClick: pgvSendClick,
    pgvWatchClick: pgvWatchClick,
  };
});
define("ui/slideview", function (require, exports, module) {
  var $ = require("lib/zepto"),
    ai = require("lib/ai"),
    slip = require("lib/slip"),
    undefined;
  function Slider(_options) {
    var options = $.extend({ dom: null }, _options);
    var dom = options.dom,
      changImg = dom.find("ul")[0],
      changeImgLi = dom.find(".slider-ul li"),
      changImgLength = changeImgLi.size(),
      img_width = 320,
      undefined;
    if (ai.hv()) {
      // ?????????????????
      var img_width = ai.ww();
      var img_height = img_width / (3 / 1);
      img_height = Math.ceil(img_height, 10);
      for (var i = 0, l = changImgLength; i < l; i++) {
        var change_img_li_now = changeImgLi[i];
        change_img_li_now.style.width = img_width + "px";
        change_img_li_now.style.height = img_height + "px";
      }
      var ui_header_slideWrap = dom[0];
      ui_header_slideWrap.style.width = img_width + "px";
      ui_header_slideWrap.style.height = img_height + "px";
    }
    function changeScreenEndFun() {
      dom.find(".slider-dot li.active").removeClass("active");
      dom
        .find(".slider-dot li:nth-child(" + (this.page + 1) + ")")
        .addClass("active");
    }
    changImg.style.width = "" + changImgLength * img_width + "px";
    slip("page", changImg, {
      change_time: 5000,
      num: changImgLength,
      no_follow: true,
      endFun: changeScreenEndFun,
    });
    return;
  }
  return Slider;
});
