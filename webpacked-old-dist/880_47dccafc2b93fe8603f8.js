(this.webpackChunk_theidentityselector_thiss =
  this.webpackChunk_theidentityselector_thiss || []).push([
  [880],
  {
    49880: (e, n, t) => {
      "use strict";
      function r(e) {
        try {
          if (!e) return !1;
          if ("undefined" != typeof Promise && e instanceof Promise) return !0;
          if (
            "undefined" != typeof window &&
            "function" == typeof window.Window &&
            e instanceof window.Window
          )
            return !1;
          if (
            "undefined" != typeof window &&
            "function" == typeof window.constructor &&
            e instanceof window.constructor
          )
            return !1;
          var n = {}.toString;
          if (n) {
            var t = n.call(e);
            if (
              "[object Window]" === t ||
              "[object global]" === t ||
              "[object DOMWindow]" === t
            )
              return !1;
          }
          if ("function" == typeof e.then) return !0;
        } catch (e) {
          return !1;
        }
        return !1;
      }
      t.d(n, { fq6: () => Z });
      var o,
        i = [],
        a = [],
        u = 0;
      function c() {
        if (!u && o) {
          var e = o;
          (o = null), e.resolve();
        }
      }
      function s() {
        u += 1;
      }
      function f() {
        (u -= 1), c();
      }
      function d(e) {
        return (
          (d =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    "function" == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? "symbol"
                    : typeof e;
                }),
          d(e)
        );
      }
      function h(e, n) {
        for (var t = 0; t < n.length; t++) {
          var r = n[t];
          (r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            "value" in r && (r.writable = !0),
            Object.defineProperty(e, l(r.key), r);
        }
      }
      function l(e) {
        var n = (function (e) {
          if ("object" != d(e) || !e) return e;
          var n = e[Symbol.toPrimitive];
          if (void 0 !== n) {
            var t = n.call(e, "string");
            if ("object" != d(t)) return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(e);
        })(e);
        return "symbol" == d(n) ? n : n + "";
      }
      var p = (function () {
          function e(n) {
            var t = this;
            if (
              ((function (e, n) {
                if (!(e instanceof n))
                  throw new TypeError("Cannot call a class as a function");
              })(this, e),
              (this.resolved = !1),
              (this.rejected = !1),
              (this.errorHandled = !1),
              (this.handlers = []),
              n)
            ) {
              var r,
                o,
                i = !1,
                a = !1,
                u = !1;
              s();
              try {
                n(
                  function (e) {
                    u ? t.resolve(e) : ((i = !0), (r = e));
                  },
                  function (e) {
                    u ? t.reject(e) : ((a = !0), (o = e));
                  },
                );
              } catch (e) {
                return f(), void this.reject(e);
              }
              f(), (u = !0), i ? this.resolve(r) : a && this.reject(o);
            }
            if (__DEBUG__)
              try {
                throw new Error("ZalgoPromise");
              } catch (e) {
                this.stack = e.stack;
              }
          }
          return (
            (n = e),
            (u = [
              {
                key: "resolve",
                value: function (n) {
                  return n instanceof e
                    ? n
                    : r(n)
                      ? new e(function (e, t) {
                          return n.then(e, t);
                        })
                      : new e().resolve(n);
                },
              },
              {
                key: "reject",
                value: function (n) {
                  return new e().reject(n);
                },
              },
              {
                key: "asyncReject",
                value: function (n) {
                  return new e().asyncReject(n);
                },
              },
              {
                key: "all",
                value: function (n) {
                  var t = new e(),
                    o = n.length,
                    i = [].slice();
                  if (!o) return t.resolve(i), t;
                  for (
                    var a = function (e, n, r) {
                        return n.then(
                          function (n) {
                            (i[e] = n), 0 == (o -= 1) && t.resolve(i);
                          },
                          function (e) {
                            r.reject(e);
                          },
                        );
                      },
                      u = 0;
                    u < n.length;
                    u++
                  ) {
                    var c = n[u];
                    if (c instanceof e) {
                      if (c.resolved) {
                        (i[u] = c.value), (o -= 1);
                        continue;
                      }
                    } else if (!r(c)) {
                      (i[u] = c), (o -= 1);
                      continue;
                    }
                    a(u, e.resolve(c), t);
                  }
                  return 0 === o && t.resolve(i), t;
                },
              },
              {
                key: "hash",
                value: function (n) {
                  var t = {},
                    o = [],
                    i = function (e) {
                      if (n.hasOwnProperty(e)) {
                        var i = n[e];
                        r(i)
                          ? o.push(
                              i.then(function (n) {
                                t[e] = n;
                              }),
                            )
                          : (t[e] = i);
                      }
                    };
                  for (var a in n) i(a);
                  return e.all(o).then(function () {
                    return t;
                  });
                },
              },
              {
                key: "map",
                value: function (n, t) {
                  return e.all(n.map(t));
                },
              },
              {
                key: "onPossiblyUnhandledException",
                value: function (e) {
                  return (function (e) {
                    return (
                      a.push(e),
                      {
                        cancel: function () {
                          a.splice(a.indexOf(e), 1);
                        },
                      }
                    );
                  })(e);
                },
              },
              {
                key: "try",
                value: function (n, t, r) {
                  if (n && "function" != typeof n && !n.call)
                    throw new Error("Promise.try expected a function");
                  var o;
                  s();
                  try {
                    o = n.apply(t, r || []);
                  } catch (n) {
                    return f(), e.reject(n);
                  }
                  return f(), e.resolve(o);
                },
              },
              {
                key: "delay",
                value: function (n) {
                  return new e(function (e) {
                    setTimeout(e, n);
                  });
                },
              },
              {
                key: "isPromise",
                value: function (n) {
                  return !!(n && n instanceof e) || r(n);
                },
              },
              {
                key: "flush",
                value: function () {
                  return (n = e), (t = o = o || new n()), c(), t;
                  var n, t;
                },
              },
            ]),
            (t = [
              {
                key: "resolve",
                value: function (e) {
                  if (this.resolved || this.rejected) return this;
                  if (r(e))
                    throw new Error(
                      "Can not resolve promise with another promise",
                    );
                  return (
                    (this.resolved = !0),
                    (this.value = e),
                    this.dispatch(),
                    this
                  );
                },
              },
              {
                key: "reject",
                value: function (e) {
                  var n = this;
                  if (this.resolved || this.rejected) return this;
                  if (r(e))
                    throw new Error(
                      "Can not reject promise with another promise",
                    );
                  if (!e) {
                    var t =
                      e && "function" == typeof e.toString
                        ? e.toString()
                        : Object.prototype.toString.call(e);
                    e = new Error(
                      "Expected reject to be called with Error, got ".concat(t),
                    );
                  }
                  return (
                    (this.rejected = !0),
                    (this.error = e),
                    this.errorHandled ||
                      setTimeout(function () {
                        n.errorHandled ||
                          (function (e, n) {
                            if (-1 === i.indexOf(e)) {
                              i.push(e),
                                setTimeout(function () {
                                  if (__DEBUG__)
                                    throw new Error(
                                      ""
                                        .concat(
                                          e.stack || e.toString(),
                                          "\n\nFrom promise:\n\n",
                                        )
                                        .concat(n.stack),
                                    );
                                  throw e;
                                }, 1);
                              for (var t = 0; t < a.length; t++) a[t](e, n);
                            }
                          })(e, n);
                      }, 1),
                    this.dispatch(),
                    this
                  );
                },
              },
              {
                key: "asyncReject",
                value: function (e) {
                  return (this.errorHandled = !0), this.reject(e), this;
                },
              },
              {
                key: "dispatch",
                value: function () {
                  var n = this.dispatching,
                    t = this.resolved,
                    o = this.rejected,
                    i = this.handlers;
                  if (!n && (t || o)) {
                    (this.dispatching = !0), s();
                    for (
                      var a = function (e, n) {
                          return e.then(
                            function (e) {
                              n.resolve(e);
                            },
                            function (e) {
                              n.reject(e);
                            },
                          );
                        },
                        u = 0;
                      u < i.length;
                      u++
                    ) {
                      var c = i[u],
                        d = c.onSuccess,
                        h = c.onError,
                        l = c.promise,
                        p = void 0;
                      if (t)
                        try {
                          p = d ? d(this.value) : this.value;
                        } catch (e) {
                          l.reject(e);
                          continue;
                        }
                      else if (o) {
                        if (!h) {
                          l.reject(this.error);
                          continue;
                        }
                        try {
                          p = h(this.error);
                        } catch (e) {
                          l.reject(e);
                          continue;
                        }
                      }
                      if (p instanceof e && (p.resolved || p.rejected)) {
                        var w = p;
                        w.resolved ? l.resolve(w.value) : l.reject(w.error),
                          (w.errorHandled = !0);
                      } else
                        r(p)
                          ? p instanceof e && (p.resolved || p.rejected)
                            ? p.resolved
                              ? l.resolve(p.value)
                              : l.reject(p.error)
                            : a(p, l)
                          : l.resolve(p);
                    }
                    (i.length = 0), (this.dispatching = !1), f();
                  }
                },
              },
              {
                key: "then",
                value: function (n, t) {
                  if (n && "function" != typeof n && !n.call)
                    throw new Error(
                      "Promise.then expected a function for success handler",
                    );
                  if (t && "function" != typeof t && !t.call)
                    throw new Error(
                      "Promise.then expected a function for error handler",
                    );
                  var r = new e();
                  return (
                    this.handlers.push({
                      promise: r,
                      onSuccess: n,
                      onError: t,
                    }),
                    (this.errorHandled = !0),
                    this.dispatch(),
                    r
                  );
                },
              },
              {
                key: "catch",
                value: function (e) {
                  return this.then(void 0, e);
                },
              },
              {
                key: "finally",
                value: function (n) {
                  if (n && "function" != typeof n && !n.call)
                    throw new Error("Promise.finally expected a function");
                  return this.then(
                    function (t) {
                      return e.try(n).then(function () {
                        return t;
                      });
                    },
                    function (t) {
                      return e.try(n).then(function () {
                        throw t;
                      });
                    },
                  );
                },
              },
              {
                key: "timeout",
                value: function (e, n) {
                  var t = this;
                  if (this.resolved || this.rejected) return this;
                  var r = setTimeout(function () {
                    t.resolved ||
                      t.rejected ||
                      t.reject(
                        n ||
                          new Error("Promise timed out after ".concat(e, "ms")),
                      );
                  }, e);
                  return this.then(function (e) {
                    return clearTimeout(r), e;
                  });
                },
              },
              {
                key: "toPromise",
                value: function () {
                  if ("undefined" == typeof Promise)
                    throw new TypeError("Could not find Promise");
                  return Promise.resolve(this);
                },
              },
              {
                key: "lazy",
                value: function () {
                  return (this.errorHandled = !0), this;
                },
              },
            ]) && h(n.prototype, t),
            u && h(n, u),
            Object.defineProperty(n, "prototype", { writable: !1 }),
            n
          );
          var n, t, u;
        })(),
        w = "mock:",
        v = "file:",
        m = "about:",
        y = "Call was rejected by callee.\r\n";
      function g() {
        return (
          arguments.length > 0 && void 0 !== arguments[0]
            ? arguments[0]
            : window
        ).location.protocol;
      }
      function b() {
        var e =
          arguments.length > 0 && void 0 !== arguments[0]
            ? arguments[0]
            : window;
        if (e.mockDomain) {
          var n = e.mockDomain.split("//")[0];
          if (n) return n;
        }
        return g(e);
      }
      function E() {
        return (
          b(
            arguments.length > 0 && void 0 !== arguments[0]
              ? arguments[0]
              : window,
          ) === m
        );
      }
      function _(e) {
        try {
          return e && e.location && e.location.href, !0;
        } catch (e) {}
        return !1;
      }
      function x() {
        var e =
            arguments.length > 0 && void 0 !== arguments[0]
              ? arguments[0]
              : window,
          n = e.location;
        if (!n) throw new Error("Can not read window location");
        var t = g(e);
        if (!t) throw new Error("Can not read window protocol");
        if (t === v) return "".concat(v, "//");
        if (t === m) {
          var r = (function () {
            var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : window;
            if (e)
              try {
                if (e.parent && e.parent !== e) return e.parent;
              } catch (e) {}
          })(e);
          return r && _(r) ? x(r) : "".concat(m, "//");
        }
        var o = n.host;
        if (!o) throw new Error("Can not read window host");
        return "".concat(t, "//").concat(o);
      }
      function P() {
        var e =
            arguments.length > 0 && void 0 !== arguments[0]
              ? arguments[0]
              : window,
          n = x(e);
        return n && e.mockDomain && 0 === e.mockDomain.indexOf(w)
          ? e.mockDomain
          : n;
      }
      function C(e) {
        if (
          !(function (e) {
            try {
              if (e === window) return !0;
            } catch (e) {}
            try {
              var n = Object.getOwnPropertyDescriptor(e, "location");
              if (n && !1 === n.enumerable) return !1;
            } catch (e) {}
            try {
              if (E(e) && _(e)) return !0;
            } catch (e) {}
            try {
              if (
                (function () {
                  return (
                    b(
                      arguments.length > 0 && void 0 !== arguments[0]
                        ? arguments[0]
                        : window,
                    ) === w
                  );
                })(e) &&
                _(e)
              )
                return !0;
            } catch (e) {}
            try {
              if (x(e) === x(window)) return !0;
            } catch (e) {}
            return !1;
          })(e)
        )
          return !1;
        try {
          if (e === window) return !0;
          if (E(e) && _(e)) return !0;
          if (P(window) === P(e)) return !0;
        } catch (e) {}
        return !1;
      }
      var k = [],
        W = [];
      function j(e) {
        var n =
          !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
        try {
          if (e === window) return !1;
        } catch (e) {
          return !0;
        }
        try {
          if (!e) return !0;
        } catch (e) {
          return !0;
        }
        try {
          if (e.closed) return !0;
        } catch (e) {
          return !e || e.message !== y;
        }
        if (n && C(e))
          try {
            if (e.mockclosed) return !0;
          } catch (e) {}
        try {
          if (!e.parent || !e.top) return !0;
        } catch (e) {}
        var t = (function (e, n) {
          for (var t = 0; t < e.length; t++)
            try {
              if (e[t] === n) return t;
            } catch (e) {}
          return -1;
        })(k, e);
        if (-1 !== t) {
          var r = W[t];
          if (
            r &&
            (function (e) {
              if (!e.contentWindow) return !0;
              if (!e.parentNode) return !0;
              var n = e.ownerDocument;
              if (n && n.documentElement && !n.documentElement.contains(e)) {
                for (var t = e; t.parentNode && t.parentNode !== t; )
                  t = t.parentNode;
                if (!t.host || !n.documentElement.contains(t.host)) return !0;
              }
              return !1;
            })(r)
          )
            return !0;
        }
        return !1;
      }
      function S(e) {
        try {
          if (e === window) return !0;
        } catch (e) {
          if (e && e.message === y) return !0;
        }
        try {
          if ("[object Window]" === Object.prototype.toString.call(e))
            return !0;
        } catch (e) {
          if (e && e.message === y) return !0;
        }
        try {
          if (window.Window && e instanceof window.Window) return !0;
        } catch (e) {
          if (e && e.message === y) return !0;
        }
        try {
          if (e && e.self === e) return !0;
        } catch (e) {
          if (e && e.message === y) return !0;
        }
        try {
          if (e && e.parent === e) return !0;
        } catch (e) {
          if (e && e.message === y) return !0;
        }
        try {
          if (e && e.top === e) return !0;
        } catch (e) {
          if (e && e.message === y) return !0;
        }
        try {
          if (
            e &&
            "__unlikely_value__" === e.__cross_domain_utils_window_check__
          )
            return !1;
        } catch (e) {
          return !0;
        }
        try {
          if ("postMessage" in e && "self" in e && "location" in e) return !0;
        } catch (e) {}
        return !1;
      }
      function O(e, n) {
        for (var t = 0; t < e.length; t++)
          try {
            if (e[t] === n) return t;
          } catch (e) {}
        return -1;
      }
      function D(e) {
        return (
          (D =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    "function" == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? "symbol"
                    : typeof e;
                }),
          D(e)
        );
      }
      function T(e, n) {
        for (var t = 0; t < n.length; t++) {
          var r = n[t];
          (r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            "value" in r && (r.writable = !0),
            Object.defineProperty(e, R(r.key), r);
        }
      }
      function R(e) {
        var n = (function (e) {
          if ("object" != D(e) || !e) return e;
          var n = e[Symbol.toPrimitive];
          if (void 0 !== n) {
            var t = n.call(e, "string");
            if ("object" != D(t)) return t;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(e);
        })(e);
        return "symbol" == D(n) ? n : n + "";
      }
      var z,
        A = (function () {
          return (
            (e = function e() {
              if (
                ((function (e, n) {
                  if (!(e instanceof n))
                    throw new TypeError("Cannot call a class as a function");
                })(this, e),
                (this.name = "__weakmap_".concat(
                  (1e9 * Math.random()) >>> 0,
                  "__",
                )),
                (function () {
                  if ("undefined" == typeof WeakMap) return !1;
                  if (void 0 === Object.freeze) return !1;
                  try {
                    var e = new WeakMap(),
                      n = {},
                      t = "__testvalue__";
                    return Object.freeze(n), e.set(n, t), e.get(n) === t;
                  } catch (e) {
                    return !1;
                  }
                })())
              )
                try {
                  this.weakmap = new WeakMap();
                } catch (e) {}
              (this.keys = []), (this.values = []);
            }),
            (n = [
              {
                key: "_cleanupClosedWindows",
                value: function () {
                  for (
                    var e = this.weakmap, n = this.keys, t = 0;
                    t < n.length;
                    t++
                  ) {
                    var r = n[t];
                    if (S(r) && j(r)) {
                      if (e)
                        try {
                          e.delete(r);
                        } catch (e) {}
                      n.splice(t, 1), this.values.splice(t, 1), (t -= 1);
                    }
                  }
                },
              },
              {
                key: "isSafeToReadWrite",
                value: function (e) {
                  if (S(e)) return !1;
                  try {
                    e && e.self, e && e[this.name];
                  } catch (e) {
                    return !1;
                  }
                  return !0;
                },
              },
              {
                key: "set",
                value: function (e, n) {
                  if (!e) throw new Error("WeakMap expected key");
                  var t = this.weakmap;
                  if (t)
                    try {
                      t.set(e, n);
                    } catch (e) {
                      delete this.weakmap;
                    }
                  if (this.isSafeToReadWrite(e))
                    try {
                      var r = this.name,
                        o = e[r];
                      return void (o && o[0] === e
                        ? (o[1] = n)
                        : Object.defineProperty(e, r, {
                            value: [e, n],
                            writable: !0,
                          }));
                    } catch (e) {}
                  this._cleanupClosedWindows();
                  var i = this.keys,
                    a = this.values,
                    u = O(i, e);
                  -1 === u ? (i.push(e), a.push(n)) : (a[u] = n);
                },
              },
              {
                key: "get",
                value: function (e) {
                  if (!e) throw new Error("WeakMap expected key");
                  var n = this.weakmap;
                  if (n)
                    try {
                      if (n.has(e)) return n.get(e);
                    } catch (e) {
                      delete this.weakmap;
                    }
                  if (this.isSafeToReadWrite(e))
                    try {
                      var t = e[this.name];
                      return t && t[0] === e ? t[1] : void 0;
                    } catch (e) {}
                  this._cleanupClosedWindows();
                  var r = O(this.keys, e);
                  if (-1 !== r) return this.values[r];
                },
              },
              {
                key: "delete",
                value: function (e) {
                  if (!e) throw new Error("WeakMap expected key");
                  var n = this.weakmap;
                  if (n)
                    try {
                      n.delete(e);
                    } catch (e) {
                      delete this.weakmap;
                    }
                  if (this.isSafeToReadWrite(e))
                    try {
                      var t = e[this.name];
                      t && t[0] === e && (t[0] = t[1] = void 0);
                    } catch (e) {}
                  this._cleanupClosedWindows();
                  var r = this.keys,
                    o = O(r, e);
                  -1 !== o && (r.splice(o, 1), this.values.splice(o, 1));
                },
              },
              {
                key: "has",
                value: function (e) {
                  if (!e) throw new Error("WeakMap expected key");
                  var n = this.weakmap;
                  if (n)
                    try {
                      if (n.has(e)) return !0;
                    } catch (e) {
                      delete this.weakmap;
                    }
                  if (this.isSafeToReadWrite(e))
                    try {
                      var t = e[this.name];
                      return !(!t || t[0] !== e);
                    } catch (e) {}
                  return this._cleanupClosedWindows(), -1 !== O(this.keys, e);
                },
              },
              {
                key: "getOrSet",
                value: function (e, n) {
                  if (this.has(e)) return this.get(e);
                  var t = n();
                  return this.set(e, t), t;
                },
              },
            ]) && T(e.prototype, n),
            Object.defineProperty(e, "prototype", { writable: !1 }),
            e
          );
          var e, n;
        })();
      function N(e) {
        return (
          (N =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    "function" == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? "symbol"
                    : typeof e;
                }),
          N(e)
        );
      }
      function I() {
        var e = "xxxxxxxxxx".replace(/./g, function () {
            return "0123456789abcdef".charAt(Math.floor(16 * Math.random()));
          }),
          n = (function (e) {
            if ("function" == typeof btoa)
              return btoa(
                encodeURIComponent(e).replace(
                  /%([0-9A-F]{2})/g,
                  function (e, n) {
                    return String.fromCharCode(parseInt(n, 16));
                  },
                ),
              ).replace(/[=]/g, "");
            if ("undefined" != typeof Buffer)
              return Buffer.from(e, "utf8")
                .toString("base64")
                .replace(/[=]/g, "");
            throw new Error("Can not find window.btoa or Buffer");
          })(new Date().toISOString().slice(11, 19).replace("T", "."))
            .replace(/[^a-zA-Z0-9]/g, "")
            .toLowerCase();
        return "uid_".concat(e, "_").concat(n);
      }
      function F() {
        return {};
      }
      var M = 0,
        q = 0;
      function L(e) {
        var n,
          t,
          r =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          o = r.thisNamespace,
          i = void 0 !== o && o,
          a = r.time,
          u = M;
        M += 1;
        var c,
          s = function () {
            for (var r = arguments.length, o = new Array(r), c = 0; c < r; c++)
              o[c] = arguments[c];
            var s, f;
            u < q && ((n = null), (t = null), (u = M), (M += 1)),
              (s = i ? (t = t || new A()).getOrSet(this, F) : (n = n || {}));
            try {
              f = (function (e) {
                try {
                  return JSON.stringify(
                    Array.prototype.slice.call(e),
                    function (e, n) {
                      return "function" == typeof n
                        ? "memoize[".concat(
                            (function (e) {
                              if (
                                ((z = z || new A()),
                                null == e ||
                                  ("object" !== N(e) && "function" != typeof e))
                              )
                                throw new Error("Invalid object");
                              var n = z.get(e);
                              return (
                                n ||
                                  ((n = "".concat(N(e), ":").concat(I())),
                                  z.set(e, n)),
                                n
                              );
                            })(n),
                            "]",
                          )
                        : (function (e) {
                              var n = !1;
                              try {
                                (e instanceof window.Element ||
                                  (null !== e &&
                                    "object" === N(e) &&
                                    1 === e.nodeType &&
                                    "object" === N(e.style) &&
                                    "object" === N(e.ownerDocument))) &&
                                  (n = !0);
                              } catch (e) {}
                              return n;
                            })(n)
                          ? {}
                          : n;
                    },
                  );
                } catch (e) {
                  throw new Error(
                    "Arguments not serializable -- can not be used to memoize",
                  );
                }
              })(o);
            } catch (n) {
              return e.apply(this, arguments);
            }
            var d = s[f];
            if (
              (d && a && Date.now() - d.time < a && (delete s[f], (d = null)),
              d)
            )
              return d.value;
            var h = Date.now(),
              l = e.apply(this, arguments);
            return (s[f] = { time: h, value: l }), l;
          };
        return (
          (s.reset = function () {
            (n = null), (t = null);
          }),
          (function (e, n) {
            try {
              delete e.name, (e.name = n);
            } catch (e) {}
            return (e.__name__ = e.displayName = n), e;
          })(
            s,
            "".concat(
              r.name ||
                (c = e).name ||
                c.__name__ ||
                c.displayName ||
                "anonymous",
              "::memoized",
            ),
          )
        );
      }
      (L.clear = function () {
        q = M;
      }),
        L(function (e) {
          if (Object.values) return Object.values(e);
          var n = [];
          for (var t in e) e.hasOwnProperty(t) && n.push(e[t]);
          return n;
        });
      var U = "data-uid";
      function B(e, n) {
        var t =
          ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
          e["@@iterator"];
        if (!t) {
          if (
            Array.isArray(e) ||
            (t = (function (e, n) {
              if (e) {
                if ("string" == typeof e) return H(e, n);
                var t = {}.toString.call(e).slice(8, -1);
                return (
                  "Object" === t && e.constructor && (t = e.constructor.name),
                  "Map" === t || "Set" === t
                    ? Array.from(e)
                    : "Arguments" === t ||
                        /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
                      ? H(e, n)
                      : void 0
                );
              }
            })(e)) ||
            (n && e && "number" == typeof e.length)
          ) {
            t && (e = t);
            var r = 0,
              o = function () {};
            return {
              s: o,
              n: function () {
                return r >= e.length
                  ? { done: !0 }
                  : { done: !1, value: e[r++] };
              },
              e: function (e) {
                throw e;
              },
              f: o,
            };
          }
          throw new TypeError(
            "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
          );
        }
        var i,
          a = !0,
          u = !1;
        return {
          s: function () {
            t = t.call(e);
          },
          n: function () {
            var e = t.next();
            return (a = e.done), e;
          },
          e: function (e) {
            (u = !0), (i = e);
          },
          f: function () {
            try {
              a || null == t.return || t.return();
            } finally {
              if (u) throw i;
            }
          },
        };
      }
      function H(e, n) {
        (null == n || n > e.length) && (n = e.length);
        for (var t = 0, r = Array(n); t < n; t++) r[t] = e[t];
        return r;
      }
      function J() {
        return Boolean(document.body) && "complete" === document.readyState;
      }
      function Y() {
        return Boolean(document.body) && "interactive" === document.readyState;
      }
      function Z(e) {
        e && e.parentNode && e.parentNode.removeChild(e);
      }
      L(function () {
        return new p(function (e) {
          if (J() || Y()) return e();
          var n = setInterval(function () {
            if (J() || Y()) return clearInterval(n), e();
          }, 10);
        });
      });
      var $ = "undefined" != typeof document ? document.currentScript : null,
        G = L(function () {
          if ($) return $;
          if (
            ($ = (function () {
              try {
                var e = (function () {
                    try {
                      throw new Error("_");
                    } catch (e) {
                      return e.stack || "";
                    }
                  })(),
                  n = /.*at [^(]*\((.*):(.+):(.+)\)$/gi.exec(e),
                  t = n && n[1];
                if (!t) return;
                var r,
                  o = B(
                    Array.prototype.slice
                      .call(document.getElementsByTagName("script"))
                      .reverse(),
                  );
                try {
                  for (o.s(); !(r = o.n()).done; ) {
                    var i = r.value;
                    if (i.src && i.src === t) return i;
                  }
                } catch (e) {
                  o.e(e);
                } finally {
                  o.f();
                }
              } catch (e) {}
            })())
          )
            return $;
          throw new Error("Can not determine current script");
        }),
        V = I();
      L(function () {
        var e;
        try {
          e = G();
        } catch (e) {
          return V;
        }
        var n = e.getAttribute(U);
        if (n && "string" == typeof n) return n;
        if ((n = e.getAttribute("".concat(U, "-auto"))) && "string" == typeof n)
          return n;
        if (e.src) {
          var t = e,
            r = t.src,
            o = t.dataset,
            i = (function (e) {
              for (var n = "", t = 0; t < e.length; t++) {
                var r = e[t].charCodeAt(0) * t;
                e[t + 1] && (r += e[t + 1].charCodeAt(0) * (t - 1)),
                  (n += String.fromCharCode(97 + (Math.abs(r) % 26)));
              }
              return n;
            })(JSON.stringify({ src: r, dataset: o })),
            a = i.slice(i.length - 30);
          n = "uid_".concat(a);
        } else n = I();
        return e.setAttribute("".concat(U, "-auto"), n), n;
      });
    },
    74119: function (e, n, t) {
      var r, o, i, a;
      function u(e) {
        return (
          (u =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    "function" == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? "symbol"
                    : typeof e;
                }),
          u(e)
        );
      }
      (e = t.nmd(e)),
        "undefined" != typeof self && self,
        (a = function () {
          return (function (e) {
            var n = {};
            function t(r) {
              if (n[r]) return n[r].exports;
              var o = (n[r] = { i: r, l: !1, exports: {} });
              return (
                e[r].call(o.exports, o, o.exports, t), (o.l = !0), o.exports
              );
            }
            return (
              (t.m = e),
              (t.c = n),
              (t.d = function (e, n, r) {
                t.o(e, n) ||
                  Object.defineProperty(e, n, { enumerable: !0, get: r });
              }),
              (t.r = function (e) {
                "undefined" != typeof Symbol &&
                  Symbol.toStringTag &&
                  Object.defineProperty(e, Symbol.toStringTag, {
                    value: "Module",
                  }),
                  Object.defineProperty(e, "__esModule", { value: !0 });
              }),
              (t.t = function (e, n) {
                if ((1 & n && (e = t(e)), 8 & n)) return e;
                if (4 & n && "object" == u(e) && e && e.__esModule) return e;
                var r = Object.create(null);
                if (
                  (t.r(r),
                  Object.defineProperty(r, "default", {
                    enumerable: !0,
                    value: e,
                  }),
                  2 & n && "string" != typeof e)
                )
                  for (var o in e)
                    t.d(
                      r,
                      o,
                      function (n) {
                        return e[n];
                      }.bind(null, o),
                    );
                return r;
              }),
              (t.n = function (e) {
                var n =
                  e && e.__esModule
                    ? function () {
                        return e.default;
                      }
                    : function () {
                        return e;
                      };
                return t.d(n, "a", n), n;
              }),
              (t.o = function (e, n) {
                return {}.hasOwnProperty.call(e, n);
              }),
              (t.p = ""),
              t((t.s = 0))
            );
          })([
            function (e, n, t) {
              "use strict";
              function r() {
                return (r =
                  Object.assign ||
                  function (e) {
                    for (var n = 1; n < arguments.length; n++) {
                      var t = arguments[n];
                      for (var r in t)
                        ({}).hasOwnProperty.call(t, r) && (e[r] = t[r]);
                    }
                    return e;
                  }).apply(this, arguments);
              }
              function o(e) {
                try {
                  if (!e) return !1;
                  if ("undefined" != typeof Promise && e instanceof Promise)
                    return !0;
                  if (
                    "undefined" != typeof window &&
                    "function" == typeof window.Window &&
                    e instanceof window.Window
                  )
                    return !1;
                  if (
                    "undefined" != typeof window &&
                    "function" == typeof window.constructor &&
                    e instanceof window.constructor
                  )
                    return !1;
                  var n = {}.toString;
                  if (n) {
                    var t = n.call(e);
                    if (
                      "[object Window]" === t ||
                      "[object global]" === t ||
                      "[object DOMWindow]" === t
                    )
                      return !1;
                  }
                  if ("function" == typeof e.then) return !0;
                } catch (e) {
                  return !1;
                }
                return !1;
              }
              t.r(n);
              var i,
                a = [],
                c = [],
                s = 0;
              function f() {
                if (!s && i) {
                  var e = i;
                  (i = null), e.resolve();
                }
              }
              function d() {
                s += 1;
              }
              function h() {
                (s -= 1), f();
              }
              var l = (function () {
                function e(e) {
                  var n = this;
                  if (
                    ((this.resolved = void 0),
                    (this.rejected = void 0),
                    (this.errorHandled = void 0),
                    (this.value = void 0),
                    (this.error = void 0),
                    (this.handlers = void 0),
                    (this.dispatching = void 0),
                    (this.stack = void 0),
                    (this.resolved = !1),
                    (this.rejected = !1),
                    (this.errorHandled = !1),
                    (this.handlers = []),
                    e)
                  ) {
                    var t,
                      r,
                      o = !1,
                      i = !1,
                      a = !1;
                    d();
                    try {
                      e(
                        function (e) {
                          a ? n.resolve(e) : ((o = !0), (t = e));
                        },
                        function (e) {
                          a ? n.reject(e) : ((i = !0), (r = e));
                        },
                      );
                    } catch (e) {
                      return h(), void this.reject(e);
                    }
                    h(), (a = !0), o ? this.resolve(t) : i && this.reject(r);
                  }
                }
                var n = e.prototype;
                return (
                  (n.resolve = function (e) {
                    if (this.resolved || this.rejected) return this;
                    if (o(e))
                      throw new Error(
                        "Can not resolve promise with another promise",
                      );
                    return (
                      (this.resolved = !0),
                      (this.value = e),
                      this.dispatch(),
                      this
                    );
                  }),
                  (n.reject = function (e) {
                    var n = this;
                    if (this.resolved || this.rejected) return this;
                    if (o(e))
                      throw new Error(
                        "Can not reject promise with another promise",
                      );
                    if (!e) {
                      var t =
                        e && "function" == typeof e.toString
                          ? e.toString()
                          : {}.toString.call(e);
                      e = new Error(
                        "Expected reject to be called with Error, got " + t,
                      );
                    }
                    return (
                      (this.rejected = !0),
                      (this.error = e),
                      this.errorHandled ||
                        setTimeout(function () {
                          n.errorHandled ||
                            (function (e, n) {
                              if (-1 === a.indexOf(e)) {
                                a.push(e),
                                  setTimeout(function () {
                                    throw e;
                                  }, 1);
                                for (var t = 0; t < c.length; t++) c[t](e, n);
                              }
                            })(e, n);
                        }, 1),
                      this.dispatch(),
                      this
                    );
                  }),
                  (n.asyncReject = function (e) {
                    return (this.errorHandled = !0), this.reject(e), this;
                  }),
                  (n.dispatch = function () {
                    var n = this.resolved,
                      t = this.rejected,
                      r = this.handlers;
                    if (!this.dispatching && (n || t)) {
                      (this.dispatching = !0), d();
                      for (
                        var i = function (e, n) {
                            return e.then(
                              function (e) {
                                n.resolve(e);
                              },
                              function (e) {
                                n.reject(e);
                              },
                            );
                          },
                          a = 0;
                        a < r.length;
                        a++
                      ) {
                        var u = r[a],
                          c = u.onSuccess,
                          s = u.onError,
                          f = u.promise,
                          l = void 0;
                        if (n)
                          try {
                            l = c ? c(this.value) : this.value;
                          } catch (e) {
                            f.reject(e);
                            continue;
                          }
                        else if (t) {
                          if (!s) {
                            f.reject(this.error);
                            continue;
                          }
                          try {
                            l = s(this.error);
                          } catch (e) {
                            f.reject(e);
                            continue;
                          }
                        }
                        l instanceof e && (l.resolved || l.rejected)
                          ? (l.resolved
                              ? f.resolve(l.value)
                              : f.reject(l.error),
                            (l.errorHandled = !0))
                          : o(l)
                            ? l instanceof e && (l.resolved || l.rejected)
                              ? l.resolved
                                ? f.resolve(l.value)
                                : f.reject(l.error)
                              : i(l, f)
                            : f.resolve(l);
                      }
                      (r.length = 0), (this.dispatching = !1), h();
                    }
                  }),
                  (n.then = function (n, t) {
                    if (n && "function" != typeof n && !n.call)
                      throw new Error(
                        "Promise.then expected a function for success handler",
                      );
                    if (t && "function" != typeof t && !t.call)
                      throw new Error(
                        "Promise.then expected a function for error handler",
                      );
                    var r = new e();
                    return (
                      this.handlers.push({
                        promise: r,
                        onSuccess: n,
                        onError: t,
                      }),
                      (this.errorHandled = !0),
                      this.dispatch(),
                      r
                    );
                  }),
                  (n.catch = function (e) {
                    return this.then(void 0, e);
                  }),
                  (n.finally = function (n) {
                    if (n && "function" != typeof n && !n.call)
                      throw new Error("Promise.finally expected a function");
                    return this.then(
                      function (t) {
                        return e.try(n).then(function () {
                          return t;
                        });
                      },
                      function (t) {
                        return e.try(n).then(function () {
                          throw t;
                        });
                      },
                    );
                  }),
                  (n.timeout = function (e, n) {
                    var t = this;
                    if (this.resolved || this.rejected) return this;
                    var r = setTimeout(function () {
                      t.resolved ||
                        t.rejected ||
                        t.reject(
                          n || new Error("Promise timed out after " + e + "ms"),
                        );
                    }, e);
                    return this.then(function (e) {
                      return clearTimeout(r), e;
                    });
                  }),
                  (n.toPromise = function () {
                    if ("undefined" == typeof Promise)
                      throw new TypeError("Could not find Promise");
                    return Promise.resolve(this);
                  }),
                  (e.resolve = function (n) {
                    return n instanceof e
                      ? n
                      : o(n)
                        ? new e(function (e, t) {
                            return n.then(e, t);
                          })
                        : new e().resolve(n);
                  }),
                  (e.reject = function (n) {
                    return new e().reject(n);
                  }),
                  (e.asyncReject = function (n) {
                    return new e().asyncReject(n);
                  }),
                  (e.all = function (n) {
                    var t = new e(),
                      r = n.length,
                      i = [];
                    if (!r) return t.resolve(i), t;
                    for (
                      var a = function (e, n, o) {
                          return n.then(
                            function (n) {
                              (i[e] = n), 0 == (r -= 1) && t.resolve(i);
                            },
                            function (e) {
                              o.reject(e);
                            },
                          );
                        },
                        u = 0;
                      u < n.length;
                      u++
                    ) {
                      var c = n[u];
                      if (c instanceof e) {
                        if (c.resolved) {
                          (i[u] = c.value), (r -= 1);
                          continue;
                        }
                      } else if (!o(c)) {
                        (i[u] = c), (r -= 1);
                        continue;
                      }
                      a(u, e.resolve(c), t);
                    }
                    return 0 === r && t.resolve(i), t;
                  }),
                  (e.hash = function (n) {
                    var t = {};
                    return e
                      .all(
                        Object.keys(n).map(function (r) {
                          return e.resolve(n[r]).then(function (e) {
                            t[r] = e;
                          });
                        }),
                      )
                      .then(function () {
                        return t;
                      });
                  }),
                  (e.map = function (n, t) {
                    return e.all(n.map(t));
                  }),
                  (e.onPossiblyUnhandledException = function (e) {
                    return (function (e) {
                      return (
                        c.push(e),
                        {
                          cancel: function () {
                            c.splice(c.indexOf(e), 1);
                          },
                        }
                      );
                    })(e);
                  }),
                  (e.try = function (n, t, r) {
                    if (n && "function" != typeof n && !n.call)
                      throw new Error("Promise.try expected a function");
                    var o;
                    d();
                    try {
                      o = n.apply(t, r || []);
                    } catch (n) {
                      return h(), e.reject(n);
                    }
                    return h(), e.resolve(o);
                  }),
                  (e.delay = function (n) {
                    return new e(function (e) {
                      setTimeout(e, n);
                    });
                  }),
                  (e.isPromise = function (n) {
                    return !!(n && n instanceof e) || o(n);
                  }),
                  (e.flush = function () {
                    return (n = i = i || new e()), f(), n;
                    var n;
                  }),
                  e
                );
              })();
              function p(e) {
                return "[object RegExp]" === {}.toString.call(e);
              }
              var w = "mock:",
                v = "file:",
                m = "about:",
                y = { IFRAME: "iframe", POPUP: "popup" },
                g = "Call was rejected by callee.\r\n";
              function b(e) {
                return void 0 === e && (e = window), e.location.protocol === m;
              }
              function E(e) {
                if ((void 0 === e && (e = window), e))
                  try {
                    if (e.parent && e.parent !== e) return e.parent;
                  } catch (e) {}
              }
              function _(e) {
                if ((void 0 === e && (e = window), e && !E(e)))
                  try {
                    return e.opener;
                  } catch (e) {}
              }
              function x(e) {
                try {
                  return !0;
                } catch (e) {}
                return !1;
              }
              function P(e) {
                void 0 === e && (e = window);
                var n = e.location;
                if (!n) throw new Error("Can not read window location");
                var t = n.protocol;
                if (!t) throw new Error("Can not read window protocol");
                if (t === v) return v + "//";
                if (t === m) {
                  var r = E(e);
                  return r && x() ? P(r) : m + "//";
                }
                var o = n.host;
                if (!o) throw new Error("Can not read window host");
                return t + "//" + o;
              }
              function C(e) {
                void 0 === e && (e = window);
                var n = P(e);
                return n && e.mockDomain && 0 === e.mockDomain.indexOf(w)
                  ? e.mockDomain
                  : n;
              }
              function k(e) {
                if (
                  !(function (e) {
                    try {
                      if (e === window) return !0;
                    } catch (e) {}
                    try {
                      var n = Object.getOwnPropertyDescriptor(e, "location");
                      if (n && !1 === n.enumerable) return !1;
                    } catch (e) {}
                    try {
                      if (b(e) && x()) return !0;
                    } catch (e) {}
                    try {
                      if (P(e) === P(window)) return !0;
                    } catch (e) {}
                    return !1;
                  })(e)
                )
                  return !1;
                try {
                  if (e === window) return !0;
                  if (b(e) && x()) return !0;
                  if (C(window) === C(e)) return !0;
                } catch (e) {}
                return !1;
              }
              function W(e) {
                if (!k(e)) throw new Error("Expected window to be same domain");
                return e;
              }
              function j(e, n) {
                if (!e || !n) return !1;
                var t = E(n);
                return t
                  ? t === e
                  : -1 !==
                      (function (e) {
                        var n = [];
                        try {
                          for (; e.parent !== e; )
                            n.push(e.parent), (e = e.parent);
                        } catch (e) {}
                        return n;
                      })(n).indexOf(e);
              }
              function S(e) {
                var n,
                  t,
                  r = [];
                try {
                  n = e.frames;
                } catch (t) {
                  n = e;
                }
                try {
                  t = n.length;
                } catch (e) {}
                if (0 === t) return r;
                if (t) {
                  for (var o = 0; o < t; o++) {
                    var i = void 0;
                    try {
                      i = n[o];
                    } catch (e) {
                      continue;
                    }
                    r.push(i);
                  }
                  return r;
                }
                for (var a = 0; a < 100; a++) {
                  var u = void 0;
                  try {
                    u = n[a];
                  } catch (e) {
                    return r;
                  }
                  if (!u) return r;
                  r.push(u);
                }
                return r;
              }
              function O(e) {
                for (var n = [], t = 0, r = S(e); t < r.length; t++) {
                  var o = r[t];
                  n.push(o);
                  for (var i = 0, a = O(o); i < a.length; i++) n.push(a[i]);
                }
                return n;
              }
              function D(e) {
                void 0 === e && (e = window);
                try {
                  if (e.top) return e.top;
                } catch (e) {}
                if (E(e) === e) return e;
                try {
                  if (j(window, e) && window.top) return window.top;
                } catch (e) {}
                try {
                  if (j(e, window) && window.top) return window.top;
                } catch (e) {}
                for (var n = 0, t = O(e); n < t.length; n++) {
                  var r = t[n];
                  try {
                    if (r.top) return r.top;
                  } catch (e) {}
                  if (E(r) === r) return r;
                }
              }
              function T(e) {
                var n = D(e);
                if (!n) throw new Error("Can not determine top window");
                return [].concat(O(n), [n]);
              }
              var R = [],
                z = [];
              function A(e, n) {
                void 0 === n && (n = !0);
                try {
                  if (e === window) return !1;
                } catch (e) {
                  return !0;
                }
                try {
                  if (!e) return !0;
                } catch (e) {
                  return !0;
                }
                try {
                  if (e.closed) return !0;
                } catch (e) {
                  return !e || e.message !== g;
                }
                if (n && k(e))
                  try {
                    if (e.mockclosed) return !0;
                  } catch (e) {}
                try {
                  if (!e.parent || !e.top) return !0;
                } catch (e) {}
                var t = (function (e, n) {
                  for (var t = 0; t < e.length; t++)
                    try {
                      if (e[t] === n) return t;
                    } catch (e) {}
                  return -1;
                })(R, e);
                if (-1 !== t) {
                  var r = z[t];
                  if (
                    r &&
                    (function (e) {
                      if (!e.contentWindow) return !0;
                      if (!e.parentNode) return !0;
                      var n = e.ownerDocument;
                      return !(
                        !n ||
                        !n.documentElement ||
                        n.documentElement.contains(e)
                      );
                    })(r)
                  )
                    return !0;
                }
                return !1;
              }
              function N(e) {
                return (
                  void 0 === e && (e = window),
                  _((e = e || window)) || E(e) || void 0
                );
              }
              function I(e, n) {
                for (var t = 0; t < e.length; t++)
                  for (var r = e[t], o = 0; o < n.length; o++)
                    if (r === n[o]) return !0;
                return !1;
              }
              function F(e) {
                void 0 === e && (e = window);
                for (var n = 0, t = e; t; ) (t = E(t)) && (n += 1);
                return n;
              }
              function M(e, n) {
                var t = D(e) || e,
                  r = D(n) || n;
                try {
                  if (t && r) return t === r;
                } catch (e) {}
                var o = T(e),
                  i = T(n);
                if (I(o, i)) return !0;
                var a = _(t),
                  u = _(r);
                return !((a && I(T(a), i)) || (u && I(T(u), o), 1));
              }
              function q(e, n) {
                if ("string" == typeof e) {
                  if ("string" == typeof n) return "*" === e || n === e;
                  if (p(n)) return !1;
                  if (Array.isArray(n)) return !1;
                }
                return p(e)
                  ? p(n)
                    ? e.toString() === n.toString()
                    : !Array.isArray(n) && Boolean(n.match(e))
                  : !!Array.isArray(e) &&
                      (Array.isArray(n)
                        ? JSON.stringify(e) === JSON.stringify(n)
                        : !p(n) &&
                          e.some(function (e) {
                            return q(e, n);
                          }));
              }
              function L(e) {
                return e.match(/^(https?|mock|file):\/\//)
                  ? e.split("/").slice(0, 3).join("/")
                  : C();
              }
              function U(e, n, t, r) {
                var o;
                return (
                  void 0 === t && (t = 1e3),
                  void 0 === r && (r = 1 / 0),
                  (function i() {
                    if (A(e)) return o && clearTimeout(o), n();
                    r <= 0
                      ? clearTimeout(o)
                      : ((r -= t), (o = setTimeout(i, t)));
                  })(),
                  {
                    cancel: function () {
                      o && clearTimeout(o);
                    },
                  }
                );
              }
              function B(e) {
                try {
                  if (e === window) return !0;
                } catch (e) {
                  if (e && e.message === g) return !0;
                }
                try {
                  if ("[object Window]" === {}.toString.call(e)) return !0;
                } catch (e) {
                  if (e && e.message === g) return !0;
                }
                try {
                  if (window.Window && e instanceof window.Window) return !0;
                } catch (e) {
                  if (e && e.message === g) return !0;
                }
                try {
                  if (e && e.self === e) return !0;
                } catch (e) {
                  if (e && e.message === g) return !0;
                }
                try {
                  if (e && e.parent === e) return !0;
                } catch (e) {
                  if (e && e.message === g) return !0;
                }
                try {
                  if (e && e.top === e) return !0;
                } catch (e) {
                  if (e && e.message === g) return !0;
                }
                try {
                  if (
                    e &&
                    "__unlikely_value__" ===
                      e.__cross_domain_utils_window_check__
                  )
                    return !1;
                } catch (e) {
                  return !0;
                }
                return !1;
              }
              function H(e) {
                try {
                  e.close();
                } catch (e) {}
              }
              function J(e, n) {
                for (var t = 0; t < e.length; t++)
                  try {
                    if (e[t] === n) return t;
                  } catch (e) {}
                return -1;
              }
              var Y,
                Z,
                $ = (function () {
                  function e() {
                    if (
                      ((this.name = void 0),
                      (this.weakmap = void 0),
                      (this.keys = void 0),
                      (this.values = void 0),
                      (this.name =
                        "__weakmap_" + ((1e9 * Math.random()) >>> 0) + "__"),
                      (function () {
                        if ("undefined" == typeof WeakMap) return !1;
                        if (void 0 === Object.freeze) return !1;
                        try {
                          var e = new WeakMap(),
                            n = {};
                          return (
                            Object.freeze(n),
                            e.set(n, "__testvalue__"),
                            "__testvalue__" === e.get(n)
                          );
                        } catch (e) {
                          return !1;
                        }
                      })())
                    )
                      try {
                        this.weakmap = new WeakMap();
                      } catch (e) {}
                    (this.keys = []), (this.values = []);
                  }
                  var n = e.prototype;
                  return (
                    (n._cleanupClosedWindows = function () {
                      for (
                        var e = this.weakmap, n = this.keys, t = 0;
                        t < n.length;
                        t++
                      ) {
                        var r = n[t];
                        if (B(r) && A(r)) {
                          if (e)
                            try {
                              e.delete(r);
                            } catch (e) {}
                          n.splice(t, 1), this.values.splice(t, 1), (t -= 1);
                        }
                      }
                    }),
                    (n.isSafeToReadWrite = function (e) {
                      return !B(e);
                    }),
                    (n.set = function (e, n) {
                      if (!e) throw new Error("WeakMap expected key");
                      var t = this.weakmap;
                      if (t)
                        try {
                          t.set(e, n);
                        } catch (e) {
                          delete this.weakmap;
                        }
                      if (this.isSafeToReadWrite(e))
                        try {
                          var r = this.name,
                            o = e[r];
                          return void (o && o[0] === e
                            ? (o[1] = n)
                            : Object.defineProperty(e, r, {
                                value: [e, n],
                                writable: !0,
                              }));
                        } catch (e) {}
                      this._cleanupClosedWindows();
                      var i = this.keys,
                        a = this.values,
                        u = J(i, e);
                      -1 === u ? (i.push(e), a.push(n)) : (a[u] = n);
                    }),
                    (n.get = function (e) {
                      if (!e) throw new Error("WeakMap expected key");
                      var n = this.weakmap;
                      if (n)
                        try {
                          if (n.has(e)) return n.get(e);
                        } catch (e) {
                          delete this.weakmap;
                        }
                      if (this.isSafeToReadWrite(e))
                        try {
                          var t = e[this.name];
                          return t && t[0] === e ? t[1] : void 0;
                        } catch (e) {}
                      this._cleanupClosedWindows();
                      var r = J(this.keys, e);
                      if (-1 !== r) return this.values[r];
                    }),
                    (n.delete = function (e) {
                      if (!e) throw new Error("WeakMap expected key");
                      var n = this.weakmap;
                      if (n)
                        try {
                          n.delete(e);
                        } catch (e) {
                          delete this.weakmap;
                        }
                      if (this.isSafeToReadWrite(e))
                        try {
                          var t = e[this.name];
                          t && t[0] === e && (t[0] = t[1] = void 0);
                        } catch (e) {}
                      this._cleanupClosedWindows();
                      var r = this.keys,
                        o = J(r, e);
                      -1 !== o && (r.splice(o, 1), this.values.splice(o, 1));
                    }),
                    (n.has = function (e) {
                      if (!e) throw new Error("WeakMap expected key");
                      var n = this.weakmap;
                      if (n)
                        try {
                          if (n.has(e)) return !0;
                        } catch (e) {
                          delete this.weakmap;
                        }
                      if (this.isSafeToReadWrite(e))
                        try {
                          var t = e[this.name];
                          return !(!t || t[0] !== e);
                        } catch (e) {}
                      return (
                        this._cleanupClosedWindows(), -1 !== J(this.keys, e)
                      );
                    }),
                    (n.getOrSet = function (e, n) {
                      if (this.has(e)) return this.get(e);
                      var t = n();
                      return this.set(e, t), t;
                    }),
                    e
                  );
                })();
              function G(e) {
                return e.name || e.__name__ || e.displayName || "anonymous";
              }
              function V(e, n) {
                try {
                  delete e.name, (e.name = n);
                } catch (e) {}
                return (e.__name__ = e.displayName = n), e;
              }
              function X(e) {
                if ("function" == typeof btoa)
                  return btoa(
                    encodeURIComponent(e).replace(
                      /%([0-9A-F]{2})/g,
                      function (e, n) {
                        return String.fromCharCode(parseInt(n, 16));
                      },
                    ),
                  );
                if ("undefined" != typeof Buffer)
                  return Buffer.from(e, "utf8").toString("base64");
                throw new Error("Can not find window.btoa or Buffer");
              }
              function K() {
                return (
                  "xxxxxxxxxx".replace(/./g, function () {
                    return "0123456789abcdef".charAt(
                      Math.floor(16 * Math.random()),
                    );
                  }) +
                  "_" +
                  X(new Date().toISOString().slice(11, 19).replace("T", "."))
                    .replace(/[^a-zA-Z0-9]/g, "")
                    .toLowerCase()
                );
              }
              function Q(e) {
                try {
                  return JSON.stringify([].slice.call(e), function (e, n) {
                    return "function" == typeof n
                      ? "memoize[" +
                          (function (e) {
                            if (
                              ((Y = Y || new $()),
                              null == e ||
                                ("object" != u(e) && "function" != typeof e))
                            )
                              throw new Error("Invalid object");
                            var n = Y.get(e);
                            return (
                              n || ((n = u(e) + ":" + K()), Y.set(e, n)), n
                            );
                          })(n) +
                          "]"
                      : n;
                  });
                } catch (e) {
                  throw new Error(
                    "Arguments not serializable -- can not be used to memoize",
                  );
                }
              }
              function ee(e) {
                var n = {};
                function t() {
                  for (
                    var t = this,
                      r = arguments,
                      o = arguments.length,
                      i = new Array(o),
                      a = 0;
                    a < o;
                    a++
                  )
                    i[a] = arguments[a];
                  var u = Q(i);
                  return (
                    n.hasOwnProperty(u) ||
                      (n[u] = l
                        .try(function () {
                          return e.apply(t, r);
                        })
                        .finally(function () {
                          delete n[u];
                        })),
                    n[u]
                  );
                }
                return (
                  (t.reset = function () {
                    n = {};
                  }),
                  V(t, G(e) + "::promiseMemoized")
                );
              }
              function ne(e, n, t) {
                void 0 === t && (t = []);
                var r = (e.__inline_memoize_cache__ =
                    e.__inline_memoize_cache__ || {}),
                  o = Q(t);
                return r.hasOwnProperty(o) ? r[o] : (r[o] = n.apply(void 0, t));
              }
              function te() {}
              function re(e) {
                var n = !1;
                return V(
                  function () {
                    if (!n) return (n = !0), e.apply(this, arguments);
                  },
                  G(e) + "::once",
                );
              }
              function oe(e, n) {
                if ((void 0 === n && (n = 1), n >= 3))
                  return "stringifyError stack overflow";
                try {
                  if (!e) return "<unknown error: " + {}.toString.call(e) + ">";
                  if ("string" == typeof e) return e;
                  if (e instanceof Error) {
                    var t = e && e.stack,
                      r = e && e.message;
                    if (t && r) return -1 !== t.indexOf(r) ? t : r + "\n" + t;
                    if (t) return t;
                    if (r) return r;
                  }
                  return e && e.toString && "function" == typeof e.toString
                    ? e.toString()
                    : {}.toString.call(e);
                } catch (e) {
                  return "Error while stringifying error: " + oe(e, n + 1);
                }
              }
              function ie(e) {
                return "string" == typeof e
                  ? e
                  : e && e.toString && "function" == typeof e.toString
                    ? e.toString()
                    : {}.toString.call(e);
              }
              function ae(e, n) {
                if (!n) return e;
                if (Object.assign) return Object.assign(e, n);
                for (var t in n) n.hasOwnProperty(t) && (e[t] = n[t]);
                return e;
              }
              function ue(e, n) {
                var t;
                return (
                  (function r() {
                    t = setTimeout(function () {
                      e(), r();
                    }, n);
                  })(),
                  {
                    cancel: function () {
                      clearTimeout(t);
                    },
                  }
                );
              }
              function ce(e) {
                return [].slice.call(e);
              }
              function se(e) {
                return null != e;
              }
              function fe(e) {
                return "[object RegExp]" === {}.toString.call(e);
              }
              function de(e, n, t) {
                if (e.hasOwnProperty(n)) return e[n];
                var r = t();
                return (e[n] = r), r;
              }
              function he(e) {
                var n = [],
                  t = !1;
                return {
                  set: function (n, r) {
                    return (
                      t ||
                        ((e[n] = r),
                        this.register(function () {
                          delete e[n];
                        })),
                      r
                    );
                  },
                  register: function (e) {
                    t ? e() : n.push(re(e));
                  },
                  all: function () {
                    var e = [];
                    for (t = !0; n.length; ) {
                      var r = n.pop();
                      e.push(r());
                    }
                    return l.all(e).then(te);
                  },
                };
              }
              function le(e, n) {
                if (null == n)
                  throw new Error("Expected " + e + " to be present");
                return n;
              }
              function pe() {
                return (
                  Boolean(document.body) && "complete" === document.readyState
                );
              }
              function we(e) {
                return e
                  .replace(/\?/g, "%3F")
                  .replace(/&/g, "%26")
                  .replace(/#/g, "%23")
                  .replace(/\+/g, "%2B");
              }
              function ve() {
                return ne(ve, function () {
                  return new l(function (e) {
                    if (pe()) return e();
                    var n = setInterval(function () {
                      if (pe()) return clearInterval(n), e();
                    }, 10);
                  });
                });
              }
              function me(e) {
                return ne(
                  me,
                  function () {
                    var n = {};
                    if (!e) return n;
                    if (-1 === e.indexOf("=")) return n;
                    for (var t = 0, r = e.split("&"); t < r.length; t++) {
                      var o = r[t];
                      (o = o.split("="))[0] &&
                        o[1] &&
                        (n[decodeURIComponent(o[0])] = decodeURIComponent(
                          o[1],
                        ));
                    }
                    return n;
                  },
                  [e],
                );
              }
              function ye(e, n) {
                return (
                  void 0 === n && (n = {}),
                  n && Object.keys(n).length
                    ? (void 0 === (t = r({}, me(e), {}, n)) && (t = {}),
                      Object.keys(t)
                        .filter(function (e) {
                          return "string" == typeof t[e];
                        })
                        .map(function (e) {
                          return we(e) + "=" + we(t[e]);
                        })
                        .join("&"))
                    : e
                );
                var t;
              }
              function ge(e) {
                return (
                  e instanceof window.Element ||
                  (null !== e &&
                    "object" == u(e) &&
                    1 === e.nodeType &&
                    "object" == u(e.style) &&
                    "object" == u(e.ownerDocument))
                );
              }
              function be(e, n) {
                return (
                  void 0 === n && (n = document),
                  ge(e) ? e : "string" == typeof e ? n.querySelector(e) : void 0
                );
              }
              function Ee(e) {
                return new l(function (n, t) {
                  var r = ie(e),
                    o = be(e);
                  if (o) return n(o);
                  if (pe())
                    return t(
                      new Error(
                        "Document is ready and element " +
                          r +
                          " does not exist",
                      ),
                    );
                  var i = setInterval(function () {
                    return (o = be(e))
                      ? (clearInterval(i), n(o))
                      : pe()
                        ? (clearInterval(i),
                          t(
                            new Error(
                              "Document is ready and element " +
                                r +
                                " does not exist",
                            ),
                          ))
                        : void 0;
                  }, 10);
                });
              }
              function _e(e) {
                this.message = e;
              }
              function xe(e) {
                if ((Z = Z || new $()).has(e)) {
                  var n = Z.get(e);
                  if (n) return n;
                }
                var t = new l(function (n, t) {
                  e.addEventListener("load", function () {
                    (function (e) {
                      if (
                        ((function () {
                          for (var e = 0; e < R.length; e++) {
                            var n = !1;
                            try {
                              n = R[e].closed;
                            } catch (e) {}
                            n && (z.splice(e, 1), R.splice(e, 1));
                          }
                        })(),
                        e && e.contentWindow)
                      )
                        try {
                          R.push(e.contentWindow), z.push(e);
                        } catch (e) {}
                    })(e),
                      n(e);
                  }),
                    e.addEventListener("error", function (r) {
                      e.contentWindow ? n(e) : t(r);
                    });
                });
                return Z.set(e, t), t;
              }
              function Pe(e) {
                return xe(e).then(function (e) {
                  if (!e.contentWindow)
                    throw new Error("Could not find window in iframe");
                  return e.contentWindow;
                });
              }
              function Ce(e, n) {
                void 0 === e && (e = {});
                var t = e.style || {},
                  o = (function (e, n) {
                    void 0 === e && (e = "div"),
                      void 0 === n && (n = {}),
                      (e = e.toLowerCase());
                    var t,
                      r,
                      o,
                      i = document.createElement(e);
                    if (
                      (n.style && ae(i.style, n.style),
                      n.class && (i.className = n.class.join(" ")),
                      n.id && i.setAttribute("id", n.id),
                      n.attributes)
                    )
                      for (
                        var a = 0, u = Object.keys(n.attributes);
                        a < u.length;
                        a++
                      ) {
                        var c = u[a];
                        i.setAttribute(c, n.attributes[c]);
                      }
                    if (
                      (n.styleSheet &&
                        ((t = i),
                        (r = n.styleSheet),
                        void 0 === o && (o = window.document),
                        t.styleSheet
                          ? (t.styleSheet.cssText = r)
                          : t.appendChild(o.createTextNode(r))),
                      n.html)
                    ) {
                      if ("iframe" === e)
                        throw new Error(
                          "Iframe html can not be written unless container provided and iframe in DOM",
                        );
                      i.innerHTML = n.html;
                    }
                    return i;
                  })("iframe", {
                    attributes: r(
                      { allowTransparency: "true" },
                      e.attributes || {},
                    ),
                    style: r(
                      { backgroundColor: "transparent", border: "none" },
                      t,
                    ),
                    html: e.html,
                    class: e.class,
                  }),
                  i = window.navigator.userAgent.match(/MSIE|Edge/i);
                return (
                  o.hasAttribute("id") || o.setAttribute("id", K()),
                  xe(o),
                  n &&
                    (function (e, n) {
                      void 0 === n && (n = document);
                      var t = be(e, n);
                      if (t) return t;
                      throw new Error("Can not find element: " + ie(e));
                    })(n).appendChild(o),
                  (e.url || i) && o.setAttribute("src", e.url || "about:blank"),
                  o
                );
              }
              function ke(e, n, t) {
                return (
                  e.addEventListener(n, t),
                  {
                    cancel: function () {
                      e.removeEventListener(n, t);
                    },
                  }
                );
              }
              _e.prototype = Object.create(Error.prototype);
              var We = "none";
              function je(e) {
                e.style.setProperty("display", "");
              }
              function Se(e) {
                e.style.setProperty("display", We, "important");
              }
              function Oe(e) {
                e && e.parentNode && e.parentNode.removeChild(e);
              }
              function De(e) {
                return !e || !e.parentNode;
              }
              function Te(e, n, t) {
                var r = void 0 === t ? {} : t,
                  o = r.width,
                  i = void 0 === o || o,
                  a = r.height,
                  u = void 0 === a || a,
                  c = r.interval,
                  s = void 0 === c ? 100 : c,
                  f = r.win,
                  d = void 0 === f ? window : f,
                  h = e.offsetWidth,
                  l = e.offsetHeight;
                n({ width: h, height: l });
                var p,
                  w,
                  v = function () {
                    var t = e.offsetWidth,
                      r = e.offsetHeight;
                    ((i && t !== h) || (u && r !== l)) &&
                      n({ width: t, height: r }),
                      (h = t),
                      (l = r);
                  };
                return (
                  void 0 !== d.ResizeObserver
                    ? (p = new d.ResizeObserver(v)).observe(e)
                    : void 0 !== d.MutationObserver
                      ? ((p = new d.MutationObserver(v)).observe(e, {
                          attributes: !0,
                          childList: !0,
                          subtree: !0,
                          characterData: !1,
                        }),
                        d.addEventListener("resize", v))
                      : (function e() {
                          v(), (w = setTimeout(e, s));
                        })(),
                  {
                    cancel: function () {
                      p.disconnect(),
                        window.removeEventListener("resize", v),
                        clearTimeout(w);
                    },
                  }
                );
              }
              function Re(e) {
                return "string" == typeof e && /^[0-9]+%$/.test(e);
              }
              function ze(e) {
                return "string" == typeof e && /^[0-9]+px$/.test(e);
              }
              function Ae(e) {
                return (
                  (function (e) {
                    if ("number" == typeof e) return e;
                    var n = e.match(/^([0-9]+)(px|%)$/);
                    if (!n)
                      throw new Error("Could not match css value from " + e);
                    return parseInt(n[1], 10);
                  })(e) + "px"
                );
              }
              function Ne(e) {
                return "number" == typeof e ? Ae(e) : Re(e) ? e : Ae(e);
              }
              var Ie = "postrobot_method",
                Fe = "postrobot_hello",
                Me = "*",
                qe = "cross_domain_zalgo_promise",
                Le = "cross_domain_function",
                Ue = "cross_domain_window";
              function Be(e) {
                return (
                  void 0 === e && (e = window),
                  e !== window
                    ? e.__post_robot_10_0_22__
                    : (e.__post_robot_10_0_22__ =
                        e.__post_robot_10_0_22__ || {})
                );
              }
              var He = function () {
                return {};
              };
              function Je(e, n) {
                return (
                  void 0 === e && (e = "store"),
                  void 0 === n && (n = He),
                  de(Be(), e, function () {
                    var e = n();
                    return {
                      has: function (n) {
                        return e.hasOwnProperty(n);
                      },
                      get: function (n, t) {
                        return e.hasOwnProperty(n) ? e[n] : t;
                      },
                      set: function (n, t) {
                        return (e[n] = t), t;
                      },
                      del: function (n) {
                        delete e[n];
                      },
                      getOrSet: function (n, t) {
                        return de(e, n, t);
                      },
                      reset: function () {
                        e = n();
                      },
                      keys: function () {
                        return Object.keys(e);
                      },
                    };
                  })
                );
              }
              var Ye = function () {};
              function Ze() {
                var e = Be();
                return (
                  (e.WINDOW_WILDCARD = e.WINDOW_WILDCARD || new Ye()),
                  e.WINDOW_WILDCARD
                );
              }
              function $e(e, n) {
                return (
                  void 0 === e && (e = "store"),
                  void 0 === n && (n = He),
                  Je("windowStore").getOrSet(e, function () {
                    var t = new $(),
                      r = function (e) {
                        return t.getOrSet(e, n);
                      };
                    return {
                      has: function (n) {
                        return r(n).hasOwnProperty(e);
                      },
                      get: function (n, t) {
                        var o = r(n);
                        return o.hasOwnProperty(e) ? o[e] : t;
                      },
                      set: function (n, t) {
                        return (r(n)[e] = t), t;
                      },
                      del: function (n) {
                        delete r(n)[e];
                      },
                      getOrSet: function (n, t) {
                        return de(r(n), e, t);
                      },
                    };
                  })
                );
              }
              function Ge() {
                return Je("instance").getOrSet("instanceID", K);
              }
              function Ve(e, n) {
                var t = n.domain,
                  r = $e("helloPromises"),
                  o = r.get(e);
                o && o.resolve({ domain: t });
                var i = l.resolve({ domain: t });
                return r.set(e, i), i;
              }
              function Xe(e, n) {
                return (0, n.send)(
                  e,
                  Fe,
                  { instanceID: Ge() },
                  { domain: Me, timeout: -1 },
                ).then(function (n) {
                  var t = n.origin,
                    r = n.data.instanceID;
                  return (
                    Ve(e, { domain: t }), { win: e, domain: t, instanceID: r }
                  );
                });
              }
              function Ke(e, n) {
                var t = n.send;
                return $e("windowInstanceIDPromises").getOrSet(e, function () {
                  return Xe(e, { send: t }).then(function (e) {
                    return e.instanceID;
                  });
                });
              }
              function Qe(e) {
                $e("knownWindows").set(e, !0);
              }
              var en,
                nn = "function",
                tn = "error",
                rn = "promise",
                on = "regex",
                an = "date",
                un = "array",
                cn = "object",
                sn = "string",
                fn = "number",
                dn = "boolean",
                hn = "null",
                ln = "undefined";
              function pn(e) {
                return (
                  "object" == u(e) &&
                  null !== e &&
                  "string" == typeof e.__type__
                );
              }
              function wn(e) {
                return void 0 === e
                  ? ln
                  : null === e
                    ? hn
                    : Array.isArray(e)
                      ? un
                      : "function" == typeof e
                        ? nn
                        : "object" == u(e)
                          ? e instanceof Error
                            ? tn
                            : "function" == typeof e.then
                              ? rn
                              : "[object RegExp]" === {}.toString.call(e)
                                ? on
                                : "[object Date]" === {}.toString.call(e)
                                  ? an
                                  : cn
                          : "string" == typeof e
                            ? sn
                            : "number" == typeof e
                              ? fn
                              : "boolean" == typeof e
                                ? dn
                                : void 0;
              }
              function vn(e, n) {
                return { __type__: e, __val__: n };
              }
              var mn,
                yn =
                  (((en = {})[nn] = function () {}),
                  (en[tn] = function (e) {
                    return vn(tn, {
                      message: e.message,
                      stack: e.stack,
                      code: e.code,
                    });
                  }),
                  (en[rn] = function () {}),
                  (en[on] = function (e) {
                    return vn(on, e.source);
                  }),
                  (en[an] = function (e) {
                    return vn(an, e.toJSON());
                  }),
                  (en[un] = function (e) {
                    return e;
                  }),
                  (en[cn] = function (e) {
                    return e;
                  }),
                  (en[sn] = function (e) {
                    return e;
                  }),
                  (en[fn] = function (e) {
                    return e;
                  }),
                  (en[dn] = function (e) {
                    return e;
                  }),
                  (en[hn] = function (e) {
                    return e;
                  }),
                  en),
                gn = {},
                bn =
                  (((mn = {})[nn] = function () {
                    throw new Error(
                      "Function serialization is not implemented; nothing to deserialize",
                    );
                  }),
                  (mn[tn] = function (e) {
                    var n = e.stack,
                      t = e.code,
                      r = new Error(e.message);
                    return (r.code = t), (r.stack = n + "\n\n" + r.stack), r;
                  }),
                  (mn[rn] = function () {
                    throw new Error(
                      "Promise serialization is not implemented; nothing to deserialize",
                    );
                  }),
                  (mn[on] = function (e) {
                    return new RegExp(e);
                  }),
                  (mn[an] = function (e) {
                    return new Date(e);
                  }),
                  (mn[un] = function (e) {
                    return e;
                  }),
                  (mn[cn] = function (e) {
                    return e;
                  }),
                  (mn[sn] = function (e) {
                    return e;
                  }),
                  (mn[fn] = function (e) {
                    return e;
                  }),
                  (mn[dn] = function (e) {
                    return e;
                  }),
                  (mn[hn] = function (e) {
                    return e;
                  }),
                  mn),
                En = {};
              function _n() {
                for (
                  var e = Je("idToProxyWindow"), n = 0, t = e.keys();
                  n < t.length;
                  n++
                ) {
                  var r = t[n];
                  e.get(r).shouldClean() && e.del(r);
                }
              }
              function xn(e, n) {
                var t,
                  r = n.send,
                  o = n.id;
                return {
                  id: void 0 === o ? K() : o,
                  getType: function () {
                    return e.then(function (e) {
                      return _(e) ? y.POPUP : y.IFRAME;
                    });
                  },
                  getInstanceID: ee(function () {
                    return e.then(function (e) {
                      return Ke(e, { send: r });
                    });
                  }),
                  close: function () {
                    return e.then(H);
                  },
                  getName: function () {
                    return e.then(function (e) {
                      if (!A(e)) return t;
                    });
                  },
                  focus: function () {
                    return e.then(function (e) {
                      e.focus();
                    });
                  },
                  isClosed: function () {
                    return e.then(function (e) {
                      return A(e);
                    });
                  },
                  setLocation: function (n) {
                    return e.then(function (e) {
                      if (k(e))
                        try {
                          if (
                            e.location &&
                            "function" == typeof e.location.replace
                          )
                            return void e.location.replace(n);
                        } catch (e) {}
                      e.location = n;
                    });
                  },
                  setName: function (n) {
                    return e.then(function (e) {
                      var r = W(e);
                      (r.name = n),
                        r.frameElement &&
                          r.frameElement.setAttribute("name", n),
                        (t = n);
                    });
                  },
                };
              }
              new l(function (e) {
                if (window.document && window.document.body)
                  return e(window.document.body);
                var n = setInterval(function () {
                  if (window.document && window.document.body)
                    return clearInterval(n), e(window.document.body);
                }, 10);
              });
              var Pn = (function () {
                function e(e) {
                  var n = e.send,
                    t = e.win,
                    r = e.serializedWindow;
                  (this.id = void 0),
                    (this.isProxyWindow = !0),
                    (this.serializedWindow = void 0),
                    (this.actualWindow = void 0),
                    (this.actualWindowPromise = void 0),
                    (this.send = void 0),
                    (this.name = void 0),
                    (this.actualWindowPromise = new l()),
                    (this.serializedWindow =
                      r || xn(this.actualWindowPromise, { send: n })),
                    Je("idToProxyWindow").set(this.getID(), this),
                    t && this.setWindow(t, { send: n });
                }
                var n = e.prototype;
                return (
                  (n.getID = function () {
                    return this.serializedWindow.id;
                  }),
                  (n.getType = function () {
                    return this.serializedWindow.getType();
                  }),
                  (n.isPopup = function () {
                    return this.getType() === y.POPUP;
                  }),
                  (n.setLocation = function (e) {
                    var n = this;
                    return this.serializedWindow
                      .setLocation(e)
                      .then(function () {
                        return n;
                      });
                  }),
                  (n.getName = function () {
                    return this.serializedWindow.getName();
                  }),
                  (n.setName = function (e) {
                    var n = this;
                    return this.serializedWindow.setName(e).then(function () {
                      return n;
                    });
                  }),
                  (n.close = function () {
                    var e = this;
                    return this.serializedWindow.close().then(function () {
                      return e;
                    });
                  }),
                  (n.focus = function () {
                    var e = this;
                    return l
                      .all([
                        this.isPopup() &&
                          this.getName().then(function (e) {
                            e && window.open("", e);
                          }),
                        this.serializedWindow.focus(),
                      ])
                      .then(function () {
                        return e;
                      });
                  }),
                  (n.isClosed = function () {
                    return this.serializedWindow.isClosed();
                  }),
                  (n.getWindow = function () {
                    return this.actualWindow;
                  }),
                  (n.setWindow = function (e, n) {
                    var t = n.send;
                    (this.actualWindow = e),
                      this.actualWindowPromise.resolve(this.actualWindow),
                      (this.serializedWindow = xn(this.actualWindowPromise, {
                        send: t,
                        id: this.getID(),
                      })),
                      $e("winToProxyWindow").set(e, this);
                  }),
                  (n.awaitWindow = function () {
                    return this.actualWindowPromise;
                  }),
                  (n.matchWindow = function (e, n) {
                    var t = this,
                      r = n.send;
                    return l.try(function () {
                      return t.actualWindow
                        ? e === t.actualWindow
                        : l
                            .hash({
                              proxyInstanceID: t.getInstanceID(),
                              knownWindowInstanceID: Ke(e, { send: r }),
                            })
                            .then(function (n) {
                              var o =
                                n.proxyInstanceID === n.knownWindowInstanceID;
                              return o && t.setWindow(e, { send: r }), o;
                            });
                    });
                  }),
                  (n.unwrap = function () {
                    return this.actualWindow || this;
                  }),
                  (n.getInstanceID = function () {
                    return this.serializedWindow.getInstanceID();
                  }),
                  (n.shouldClean = function () {
                    return Boolean(this.actualWindow && A(this.actualWindow));
                  }),
                  (n.serialize = function () {
                    return this.serializedWindow;
                  }),
                  (e.unwrap = function (n) {
                    return e.isProxyWindow(n) ? n.unwrap() : n;
                  }),
                  (e.serialize = function (n, t) {
                    var r = t.send;
                    return _n(), e.toProxyWindow(n, { send: r }).serialize();
                  }),
                  (e.deserialize = function (n, t) {
                    var r = t.send;
                    return (
                      _n(),
                      Je("idToProxyWindow").get(n.id) ||
                        new e({ serializedWindow: n, send: r })
                    );
                  }),
                  (e.isProxyWindow = function (e) {
                    return Boolean(e && !B(e) && e.isProxyWindow);
                  }),
                  (e.toProxyWindow = function (n, t) {
                    var r = t.send;
                    if ((_n(), e.isProxyWindow(n))) return n;
                    var o = n;
                    return (
                      $e("winToProxyWindow").get(o) ||
                      new e({ win: o, send: r })
                    );
                  }),
                  e
                );
              })();
              function Cn(e, n, t, r, o) {
                var i = $e("methodStore"),
                  a = Je("proxyWindowMethods");
                Pn.isProxyWindow(r)
                  ? a.set(e, { val: n, name: t, domain: o, source: r })
                  : (a.del(e),
                    (i.getOrSet(r, function () {
                      return {};
                    })[e] = { domain: o, name: t, val: n, source: r }));
              }
              function kn(e, n) {
                var t = $e("methodStore"),
                  r = Je("proxyWindowMethods");
                return (
                  t.getOrSet(e, function () {
                    return {};
                  })[n] || r.get(n)
                );
              }
              function Wn(e, n, t, r, o) {
                var i, a, u;
                (i = { on: o.on, send: o.send }),
                  (a = i.on),
                  (u = i.send),
                  Je("builtinListeners").getOrSet("functionCalls", function () {
                    return a(Ie, { domain: Me }, function (e) {
                      var n = e.source,
                        t = e.origin,
                        r = e.data,
                        o = r.id,
                        i = r.name,
                        a = kn(n, o);
                      if (!a)
                        throw new Error(
                          "Could not find method '" +
                            i +
                            "' with id: " +
                            r.id +
                            " in " +
                            C(window),
                        );
                      var c = a.source,
                        s = a.domain,
                        f = a.val;
                      return l
                        .try(function () {
                          if (!q(s, t))
                            throw new Error(
                              "Method '" +
                                r.name +
                                "' domain " +
                                JSON.stringify(
                                  fe(a.domain) ? a.domain.source : a.domain,
                                ) +
                                " does not match origin " +
                                t +
                                " in " +
                                C(window),
                            );
                          if (Pn.isProxyWindow(c))
                            return c
                              .matchWindow(n, { send: u })
                              .then(function (e) {
                                if (!e)
                                  throw new Error(
                                    "Method call '" +
                                      r.name +
                                      "' failed - proxy window does not match source in " +
                                      C(window),
                                  );
                              });
                        })
                        .then(
                          function () {
                            return f.apply({ source: n, origin: t }, r.args);
                          },
                          function (e) {
                            return l
                              .try(function () {
                                if (f.onError) return f.onError(e);
                              })
                              .then(function () {
                                throw (
                                  (e.stack &&
                                    (e.stack =
                                      "Remote call to " +
                                      i +
                                      "()\n\n" +
                                      e.stack),
                                  e)
                                );
                              });
                          },
                        )
                        .then(function (e) {
                          return { result: e, id: o, name: i };
                        });
                    });
                  });
                var c = t.__id__ || K();
                e = Pn.unwrap(e);
                var s = t.__name__ || t.name || r;
                return (
                  0 === s.indexOf("anonymous::") &&
                    (s = s.replace("anonymous::", r + "::")),
                  Pn.isProxyWindow(e)
                    ? (Cn(c, t, s, e, n),
                      e.awaitWindow().then(function (e) {
                        Cn(c, t, s, e, n);
                      }))
                    : Cn(c, t, s, e, n),
                  vn(Le, { id: c, name: s })
                );
              }
              function jn(e, n, t, r) {
                var o,
                  i = r.on,
                  a = r.send;
                return (function (e, n) {
                  void 0 === n && (n = gn);
                  var t = JSON.stringify(e, function (e) {
                    var t = this[e];
                    if (pn(this)) return t;
                    var r = wn(t);
                    if (!r) return t;
                    var o = n[r] || yn[r];
                    return o ? o(t, e) : t;
                  });
                  return void 0 === t ? ln : t;
                })(
                  t,
                  (((o = {})[rn] = function (t, r) {
                    return (function (e, n, t, r, o) {
                      return vn(qe, {
                        then: Wn(
                          e,
                          n,
                          function (e, n) {
                            return t.then(e, n);
                          },
                          r,
                          { on: o.on, send: o.send },
                        ),
                      });
                    })(e, n, t, r, { on: i, send: a });
                  }),
                  (o[nn] = function (t, r) {
                    return Wn(e, n, t, r, { on: i, send: a });
                  }),
                  (o[cn] = function (e) {
                    return B(e) || Pn.isProxyWindow(e)
                      ? vn(Ue, Pn.serialize(e, { send: a }))
                      : e;
                  }),
                  o),
                );
              }
              function Sn(e, n, t, r) {
                var o,
                  i = r.on,
                  a = r.send;
                return (function (e, n) {
                  if ((void 0 === n && (n = En), e !== ln))
                    return JSON.parse(e, function (e, t) {
                      if (pn(this)) return t;
                      var r, o;
                      if (
                        (pn(t)
                          ? ((r = t.__type__), (o = t.__val__))
                          : ((r = wn(t)), (o = t)),
                        !r)
                      )
                        return o;
                      var i = n[r] || bn[r];
                      return i ? i(o, e) : o;
                    });
                })(
                  t,
                  (((o = {})[qe] = function (e) {
                    return (function (e, n, t) {
                      return new l(t.then);
                    })(0, 0, e);
                  }),
                  (o[Le] = function (t) {
                    return (function (e, n, t, r) {
                      var o = t.id,
                        i = t.name,
                        a = r.send,
                        u = function (t) {
                          function r() {
                            var u = arguments;
                            return Pn.toProxyWindow(e, { send: a })
                              .awaitWindow()
                              .then(function (e) {
                                var c = kn(e, o);
                                if (c && c.val !== r)
                                  return c.val.apply(
                                    { source: window, origin: C() },
                                    u,
                                  );
                                var s = {
                                    domain: n,
                                    fireAndForget: t.fireAndForget,
                                  },
                                  f = [].slice.call(u);
                                return a(
                                  e,
                                  Ie,
                                  { id: o, name: i, args: f },
                                  s,
                                ).then(function (e) {
                                  if (!t.fireAndForget) return e.data.result;
                                });
                              })
                              .catch(function (e) {
                                throw e;
                              });
                          }
                          return (
                            void 0 === t && (t = {}),
                            (r.__name__ = i),
                            (r.__origin__ = n),
                            (r.__source__ = e),
                            (r.__id__ = o),
                            (r.origin = n),
                            r
                          );
                        },
                        c = u();
                      return (c.fireAndForget = u({ fireAndForget: !0 })), c;
                    })(e, n, t, { on: i, send: a });
                  }),
                  (o[Ue] = function (e) {
                    return Pn.deserialize(e, { send: a });
                  }),
                  o),
                );
              }
              var On = {};
              function Dn(e, n, t, o) {
                var i,
                  a = o.on,
                  u = o.send;
                if (A(e)) throw new Error("Window is closed");
                for (
                  var c = jn(
                      e,
                      n,
                      (((i = {}).__post_robot_10_0_22__ = r(
                        { id: K(), origin: C(window) },
                        t,
                      )),
                      i),
                      { on: a, send: u },
                    ),
                    s = Object.keys(On),
                    f = [],
                    d = 0;
                  d < s.length;
                  d++
                ) {
                  var h = s[d];
                  try {
                    On[h](e, c, n);
                  } catch (e) {
                    f.push(e);
                  }
                }
                if (f.length === s.length)
                  throw new Error(
                    "All post-robot messaging strategies failed:\n\n" +
                      f
                        .map(function (e, n) {
                          return n + ". " + oe(e);
                        })
                        .join("\n\n"),
                  );
              }
              (On.postrobot_post_message = function (e, n, t) {
                (Array.isArray(t) ? t : "string" == typeof t ? [t] : [Me])
                  .map(function (e) {
                    return 0 === e.indexOf(v) ? Me : e;
                  })
                  .forEach(function (t) {
                    e.postMessage(n, t);
                  });
              }),
                (On.postrobot_global = function (e, n) {
                  if (
                    !(function (e) {
                      return (
                        (e = e || window).navigator.mockUserAgent ||
                        e.navigator.userAgent
                      );
                    })(window).match(/MSIE|rv:11|trident|edge\/12|edge\/13/i)
                  )
                    throw new Error("Global messaging not needed for browser");
                  if (!k(e))
                    throw new Error(
                      "Post message through global disabled between different domain windows",
                    );
                  if (!1 !== M(window, e))
                    throw new Error(
                      "Can only use global to communicate between two different windows, not between frames",
                    );
                  var t = Be(e);
                  if (!t)
                    throw new Error(
                      "Can not find postRobot global on foreign window",
                    );
                  t.receiveMessage({ source: window, origin: C(), data: n });
                });
              var Tn,
                Rn = "__domain_regex__";
              function zn(e) {
                return Je("responseListeners").get(e);
              }
              function An(e) {
                Je("responseListeners").del(e);
              }
              function Nn(e) {
                return Je("erroredResponseListeners").has(e);
              }
              function In(e) {
                var n = e.name,
                  t = e.win,
                  r = e.domain,
                  o = $e("requestListeners");
                if ((t === Me && (t = null), r === Me && (r = null), !n))
                  throw new Error("Name required to get request listener");
                for (var i = 0, a = [t, Ze()]; i < a.length; i++) {
                  var u = a[i];
                  if (u) {
                    var c = o.get(u);
                    if (c) {
                      var s = c[n];
                      if (s) {
                        if (r && "string" == typeof r) {
                          if (s[r]) return s[r];
                          if (s[Rn])
                            for (var f = 0, d = s[Rn]; f < d.length; f++) {
                              var h = d[f],
                                l = h.listener;
                              if (q(h.regex, r)) return l;
                            }
                        }
                        if (s[Me]) return s[Me];
                      }
                    }
                  }
                }
              }
              var Fn =
                (((Tn = {}).postrobot_message_request = function (e, n, t, o) {
                  var i = o.on,
                    a = o.send,
                    u = In({ name: t.name, win: e, domain: n }),
                    c =
                      t.name === Ie && t.data && "string" == typeof t.data.name
                        ? t.data.name + "()"
                        : t.name;
                  function s(o, u, s) {
                    if ((void 0 === s && (s = {}), !t.fireAndForget && !A(e)))
                      try {
                        Dn(
                          e,
                          n,
                          r({ type: o, ack: u, hash: t.hash, name: t.name }, s),
                          { on: i, send: a },
                        );
                      } catch (e) {
                        throw new Error(
                          "Send response message failed for " +
                            c +
                            " in " +
                            C() +
                            "\n\n" +
                            oe(e),
                        );
                      }
                  }
                  return l
                    .all([
                      s("postrobot_message_ack"),
                      l
                        .try(function () {
                          if (!u)
                            throw new Error(
                              "No handler found for post message: " +
                                t.name +
                                " from " +
                                n +
                                " in " +
                                window.location.protocol +
                                "//" +
                                window.location.host +
                                window.location.pathname,
                            );
                          if (!q(u.domain, n))
                            throw new Error(
                              "Request origin " +
                                n +
                                " does not match domain " +
                                u.domain.toString(),
                            );
                          return u.handler({
                            source: e,
                            origin: n,
                            data: t.data,
                          });
                        })
                        .then(
                          function (e) {
                            return s("postrobot_message_response", "success", {
                              data: e,
                            });
                          },
                          function (e) {
                            return s("postrobot_message_response", "error", {
                              error: e,
                            });
                          },
                        ),
                    ])
                    .then(te)
                    .catch(function (e) {
                      if (u && u.handleError) return u.handleError(e);
                      throw e;
                    });
                }),
                (Tn.postrobot_message_ack = function (e, n, t) {
                  if (!Nn(t.hash)) {
                    var r = zn(t.hash);
                    if (!r)
                      throw new Error(
                        "No handler found for post message ack for message: " +
                          t.name +
                          " from " +
                          n +
                          " in " +
                          window.location.protocol +
                          "//" +
                          window.location.host +
                          window.location.pathname,
                      );
                    try {
                      if (!q(r.domain, n))
                        throw new Error(
                          "Ack origin " +
                            n +
                            " does not match domain " +
                            r.domain.toString(),
                        );
                      if (e !== r.win)
                        throw new Error(
                          "Ack source does not match registered window",
                        );
                    } catch (e) {
                      r.promise.reject(e);
                    }
                    r.ack = !0;
                  }
                }),
                (Tn.postrobot_message_response = function (e, n, t) {
                  if (!Nn(t.hash)) {
                    var r,
                      o = zn(t.hash);
                    if (!o)
                      throw new Error(
                        "No handler found for post message response for message: " +
                          t.name +
                          " from " +
                          n +
                          " in " +
                          window.location.protocol +
                          "//" +
                          window.location.host +
                          window.location.pathname,
                      );
                    if (!q(o.domain, n))
                      throw new Error(
                        "Response origin " +
                          n +
                          " does not match domain " +
                          ((r = o.domain),
                          Array.isArray(r)
                            ? "(" + r.join(" | ") + ")"
                            : p(r)
                              ? "RegExp(" + r.toString()
                              : r.toString()),
                      );
                    if (e !== o.win)
                      throw new Error(
                        "Response source does not match registered window",
                      );
                    An(t.hash),
                      "error" === t.ack
                        ? o.promise.reject(t.error)
                        : "success" === t.ack &&
                          o.promise.resolve({
                            source: e,
                            origin: n,
                            data: t.data,
                          });
                  }
                }),
                Tn);
              function Mn(e, n) {
                var t = n.on,
                  r = n.send,
                  o = Je("receivedMessages");
                if (!window || window.closed)
                  throw new Error("Message recieved in closed window");
                try {
                  if (!e.source) return;
                } catch (e) {
                  return;
                }
                var i = e.source,
                  a = e.origin,
                  c = (function (e, n, t, r) {
                    var o,
                      i = r.on,
                      a = r.send;
                    try {
                      o = Sn(n, t, e, { on: i, send: a });
                    } catch (e) {
                      return;
                    }
                    if (
                      o &&
                      "object" == u(o) &&
                      null !== o &&
                      (o = o.__post_robot_10_0_22__) &&
                      "object" == u(o) &&
                      null !== o &&
                      o.type &&
                      "string" == typeof o.type &&
                      Fn[o.type]
                    )
                      return o;
                  })(e.data, i, a, { on: t, send: r });
                c &&
                  (Qe(i),
                  o.has(c.id) ||
                    (o.set(c.id, !0),
                    (A(i) && !c.fireAndForget) ||
                      (0 === c.origin.indexOf(v) && (a = v + "//"),
                      Fn[c.type](i, a, c, { on: t, send: r }))));
              }
              function qn(e, n, t) {
                if (!e) throw new Error("Expected name");
                if (("function" == typeof n && ((t = n), (n = {})), !t))
                  throw new Error("Expected handler");
                ((n = n || {}).name = e), (n.handler = t || n.handler);
                var r = n.window,
                  o = n.domain,
                  i = (function e(n, t) {
                    var r = n.name,
                      o = n.win,
                      i = n.domain,
                      a = $e("requestListeners");
                    if (!r || "string" != typeof r)
                      throw new Error("Name required to add request listener");
                    if (Array.isArray(o)) {
                      for (var u = [], c = 0, s = o; c < s.length; c++)
                        u.push(e({ name: r, domain: i, win: s[c] }, t));
                      return {
                        cancel: function () {
                          for (var e = 0; e < u.length; e++) u[e].cancel();
                        },
                      };
                    }
                    if (Array.isArray(i)) {
                      for (var f = [], d = 0, h = i; d < h.length; d++)
                        f.push(e({ name: r, win: o, domain: h[d] }, t));
                      return {
                        cancel: function () {
                          for (var e = 0; e < f.length; e++) f[e].cancel();
                        },
                      };
                    }
                    var l = In({ name: r, win: o, domain: i });
                    if (((o && o !== Me) || (o = Ze()), (i = i || Me), l))
                      throw o && i
                        ? new Error(
                            "Request listener already exists for " +
                              r +
                              " on domain " +
                              i.toString() +
                              " for " +
                              (o === Ze() ? "wildcard" : "specified") +
                              " window",
                          )
                        : o
                          ? new Error(
                              "Request listener already exists for " +
                                r +
                                " for " +
                                (o === Ze() ? "wildcard" : "specified") +
                                " window",
                            )
                          : i
                            ? new Error(
                                "Request listener already exists for " +
                                  r +
                                  " on domain " +
                                  i.toString(),
                              )
                            : new Error(
                                "Request listener already exists for " + r,
                              );
                    var p,
                      w,
                      v = a.getOrSet(o, function () {
                        return {};
                      }),
                      m = de(v, r, function () {
                        return {};
                      }),
                      y = i.toString();
                    return (
                      fe(i)
                        ? (p = de(m, Rn, function () {
                            return [];
                          })).push((w = { regex: i, listener: t }))
                        : (m[y] = t),
                      {
                        cancel: function () {
                          delete m[y],
                            w &&
                              (p.splice(p.indexOf(w, 1)),
                              p.length || delete m[Rn]),
                            Object.keys(m).length || delete v[r],
                            o && !Object.keys(v).length && a.del(o);
                        },
                      }
                    );
                  })(
                    { name: e, win: r, domain: o },
                    {
                      handler: n.handler,
                      handleError:
                        n.errorHandler ||
                        function (e) {
                          throw e;
                        },
                      window: r,
                      domain: o || Me,
                      name: e,
                    },
                  );
                return {
                  cancel: function () {
                    i.cancel();
                  },
                };
              }
              var Ln = function e(n, t, r, o) {
                var i = (o = o || {}).domain || Me,
                  a = o.timeout || -1,
                  u = o.timeout || 5e3,
                  c = o.fireAndForget || !1;
                return l
                  .try(function () {
                    if (
                      ((function (e, n, t) {
                        if (!e) throw new Error("Expected name");
                        if (
                          t &&
                          "string" != typeof t &&
                          !Array.isArray(t) &&
                          !fe(t)
                        )
                          throw new TypeError(
                            "Expected domain to be a string, array, or regex",
                          );
                        if (A(n)) throw new Error("Target window is closed");
                      })(t, n, i),
                      (function (e, n) {
                        var t = N(n);
                        if (t) return t === e;
                        if (n === e) return !1;
                        if (D(n) === n) return !1;
                        for (var r = 0, o = S(e); r < o.length; r++)
                          if (o[r] === n) return !0;
                        return !1;
                      })(window, n))
                    )
                      return (function (e, n, t) {
                        void 0 === n && (n = 5e3),
                          void 0 === t && (t = "Window");
                        var r = (function (e) {
                          return $e("helloPromises").getOrSet(e, function () {
                            return new l();
                          });
                        })(e);
                        return (
                          -1 !== n &&
                            (r = r.timeout(
                              n,
                              new Error(t + " did not load after " + n + "ms"),
                            )),
                          r
                        );
                      })(n, u);
                  })
                  .then(function (t) {
                    return (function (e, n, t, r) {
                      var o = r.send;
                      return "string" == typeof n
                        ? l.resolve(n)
                        : l
                            .try(function () {
                              return (
                                t ||
                                Xe(e, { send: o }).then(function (e) {
                                  return e.domain;
                                })
                              );
                            })
                            .then(function (e) {
                              if (!q(n, n))
                                throw new Error(
                                  "Domain " +
                                    ie(n) +
                                    " does not match " +
                                    ie(n),
                                );
                              return e;
                            });
                    })(n, i, (void 0 === t ? {} : t).domain, { send: e });
                  })
                  .then(function (o) {
                    i = o;
                    var u =
                        t === Ie && r && "string" == typeof r.name
                          ? r.name + "()"
                          : t,
                      s = new l(),
                      f = t + "_" + K();
                    if (!c) {
                      var d = { name: t, win: n, domain: i, promise: s };
                      !(function (e, n) {
                        Je("responseListeners").set(e, n);
                      })(f, d);
                      var h = $e("requestPromises").getOrSet(n, function () {
                        return [];
                      });
                      h.push(s),
                        s.catch(function () {
                          !(function (e) {
                            Je("erroredResponseListeners").set(e, !0);
                          })(f),
                            An(f);
                        });
                      var p = (function (e) {
                          return $e("knownWindows").get(e, !1);
                        })(n)
                          ? 1e4
                          : 2e3,
                        w = a,
                        v = p,
                        m = w,
                        y = ue(function () {
                          return A(n)
                            ? s.reject(
                                new Error(
                                  "Window closed for " +
                                    t +
                                    " before " +
                                    (d.ack ? "response" : "ack"),
                                ),
                              )
                            : d.cancelled
                              ? s.reject(
                                  new Error(
                                    "Response listener was cancelled for " + t,
                                  ),
                                )
                              : ((v = Math.max(v - 500, 0)),
                                -1 !== m && (m = Math.max(m - 500, 0)),
                                d.ack || 0 !== v
                                  ? 0 === m
                                    ? s.reject(
                                        new Error(
                                          "No response for postMessage " +
                                            u +
                                            " in " +
                                            C() +
                                            " in " +
                                            w +
                                            "ms",
                                        ),
                                      )
                                    : void 0
                                  : s.reject(
                                      new Error(
                                        "No ack for postMessage " +
                                          u +
                                          " in " +
                                          C() +
                                          " in " +
                                          p +
                                          "ms",
                                      ),
                                    ));
                        }, 500);
                      s.finally(function () {
                        y.cancel(), h.splice(h.indexOf(s, 1));
                      }).catch(te);
                    }
                    try {
                      Dn(
                        n,
                        i,
                        {
                          type: "postrobot_message_request",
                          hash: f,
                          name: t,
                          data: r,
                          fireAndForget: c,
                        },
                        { on: qn, send: e },
                      );
                    } catch (e) {
                      throw new Error(
                        "Send request message failed for " +
                          u +
                          " in " +
                          C() +
                          "\n\n" +
                          oe(e),
                      );
                    }
                    return c ? s.resolve() : s;
                  });
              };
              function Un(e, n, t) {
                return jn(e, n, t, { on: qn, send: Ln });
              }
              function Bn(e, n, t) {
                return Sn(e, n, t, { on: qn, send: Ln });
              }
              function Hn(e) {
                return Pn.toProxyWindow(e, { send: Ln });
              }
              function Jn(e) {
                if ((void 0 === e && (e = window), !k(e)))
                  throw new Error(
                    "Can not get global for window on different domain",
                  );
                return (
                  e.__zoid_9_0_34__ || (e.__zoid_9_0_34__ = {}),
                  e.__zoid_9_0_34__
                );
              }
              function Yn(e) {
                return {
                  get: function () {
                    var n = this;
                    return l.try(function () {
                      if (n.source && n.source !== window)
                        throw new Error(
                          "Can not call get on proxy object from a remote window",
                        );
                      return e;
                    });
                  },
                };
              }
              var Zn = "zoid",
                $n = Zn + "_delegate",
                Gn = Zn + "_allow_delegate",
                Vn = {
                  STRING: "string",
                  OBJECT: "object",
                  FUNCTION: "function",
                  BOOLEAN: "boolean",
                  NUMBER: "number",
                  ARRAY: "array",
                },
                Xn = { JSON: "json", DOTIFY: "dotify", BASE64: "base64" },
                Kn = y,
                Qn = {
                  RENDER: "zoid-render",
                  RENDERED: "zoid-rendered",
                  DISPLAY: "zoid-display",
                  ERROR: "zoid-error",
                  CLOSE: "zoid-close",
                  PROPS: "zoid-props",
                  RESIZE: "zoid-resize",
                  FOCUS: "zoid-focus",
                };
              function et(e, n, t, r, o) {
                var i = e.getPropDefinition(t);
                return i && "function" == typeof i.childDecorate
                  ? i.childDecorate({
                      value: r,
                      close: o.close,
                      focus: o.focus,
                      onError: o.onError,
                      onProps: o.onProps,
                      resize: o.resize,
                      getParent: o.getParent,
                      getParentDomain: o.getParentDomain,
                      show: o.show,
                      hide: o.hide,
                    })
                  : r;
              }
              function nt(e) {
                return ne(
                  nt,
                  function () {
                    if (!e) throw new Error("No window name");
                    var n = e.split("__"),
                      t = n[1],
                      r = n[2],
                      o = n[3];
                    if (t !== Zn)
                      throw new Error("Window not rendered by zoid - got " + t);
                    if (!r) throw new Error("Expected component name");
                    if (!o) throw new Error("Expected encoded payload");
                    try {
                      return JSON.parse(
                        (function (e) {
                          if ("function" == typeof atob)
                            return decodeURIComponent(
                              [].map
                                .call(atob(e), function (e) {
                                  return (
                                    "%" +
                                    ("00" + e.charCodeAt(0).toString(16)).slice(
                                      -2,
                                    )
                                  );
                                })
                                .join(""),
                            );
                          if ("undefined" != typeof Buffer)
                            return Buffer.from(e, "base64").toString("utf8");
                          throw new Error("Can not find window.atob or Buffer");
                        })(o),
                      );
                    } catch (e) {
                      throw new Error(
                        "Can not decode window name payload: " +
                          o +
                          ": " +
                          oe(e),
                      );
                    }
                  },
                  [e],
                );
              }
              function tt() {
                try {
                  return nt(window.name);
                } catch (e) {}
              }
              var rt = (function () {
                  function e(e) {
                    var n = this;
                    (this.component = void 0),
                      (this.props = void 0),
                      (this.context = void 0),
                      (this.parent = void 0),
                      (this.parentDomain = void 0),
                      (this.parentComponentWindow = void 0),
                      (this.onPropHandlers = void 0),
                      (this.autoResize = void 0),
                      l
                        .try(function () {
                          (n.component = e), (n.onPropHandlers = []);
                          var t = tt();
                          if (!t) throw new Error("No child payload found");
                          if ("9_0_33" !== t.version)
                            throw new Error(
                              "Parent window has zoid version " +
                                t.version +
                                ", child window has version 9_0_33",
                            );
                          var r = t.parent,
                            o = t.parentDomain,
                            i = t.exports,
                            a = t.props;
                          (n.context = t.context),
                            (n.parentComponentWindow =
                              n.getParentComponentWindow(r)),
                            (n.parentDomain = o),
                            (n.parent = Bn(n.parentComponentWindow, o, i)),
                            n.checkParentDomain(o);
                          var u = n.getPropsByRef(
                            n.parentComponentWindow,
                            o,
                            a,
                          );
                          return (
                            n.setProps(u, o),
                            Qe(n.parentComponentWindow),
                            n.watchForClose(),
                            n.parent.init(n.buildExports())
                          );
                        })
                        .then(function () {
                          return n.watchForResize();
                        })
                        .catch(function (e) {
                          n.onError(e);
                        });
                  }
                  var n = e.prototype;
                  return (
                    (n.getHelpers = function () {
                      var e = this;
                      return {
                        focus: function () {
                          return e.focus();
                        },
                        close: function () {
                          return e.close();
                        },
                        resize: function (n) {
                          return e.resize({ width: n.width, height: n.height });
                        },
                        onError: function (n) {
                          return e.onError(n);
                        },
                        onProps: function (n) {
                          return e.onProps(n);
                        },
                        getParent: function () {
                          return e.parentComponentWindow;
                        },
                        getParentDomain: function () {
                          return e.parentDomain;
                        },
                        show: function () {
                          return e.show();
                        },
                        hide: function () {
                          return e.hide();
                        },
                      };
                    }),
                    (n.show = function () {
                      return this.parent.show();
                    }),
                    (n.hide = function () {
                      return this.parent.hide();
                    }),
                    (n.checkParentDomain = function (e) {
                      if (!q(this.component.allowedParentDomains, e))
                        throw new Error("Can not be rendered by domain: " + e);
                    }),
                    (n.onProps = function (e) {
                      this.onPropHandlers.push(e);
                    }),
                    (n.getPropsByRef = function (e, n, t) {
                      var r,
                        o = t.type,
                        i = t.uid;
                      if ("raw" === o) r = t.value;
                      else if ("uid" === o) {
                        if (!k(e))
                          throw new Error(
                            "Parent component window is on a different domain - expected " +
                              C() +
                              " - can not retrieve props",
                          );
                        var a = Jn(e);
                        r = le("props", a && a.props[i]);
                      }
                      if (!r) throw new Error("Could not find props");
                      return Bn(e, n, r);
                    }),
                    (n.getParentComponentWindow = function (e) {
                      var n,
                        t,
                        r = e.type;
                      if ("opener" === r) return le("opener", _(window));
                      if ("parent" === r && "number" == typeof e.distance)
                        return le(
                          "parent",
                          ((n = window),
                          void 0 === (t = e.distance) && (t = 1),
                          (function (e, n) {
                            void 0 === n && (n = 1);
                            for (var t = e, r = 0; r < n; r++) {
                              if (!t) return;
                              t = E(t);
                            }
                            return t;
                          })(n, F(n) - t)),
                        );
                      if ("global" === r && e.uid && "string" == typeof e.uid) {
                        var o = e.uid,
                          i = N(window);
                        if (!i) throw new Error("Can not find ancestor window");
                        for (var a = 0, u = T(i); a < u.length; a++) {
                          var c = u[a];
                          if (k(c)) {
                            var s = Jn(c);
                            if (s && s.windows && s.windows[o])
                              return s.windows[o];
                          }
                        }
                      }
                      throw new Error(
                        "Unable to find " + r + " parent component window",
                      );
                    }),
                    (n.getProps = function () {
                      return (this.props = this.props || {}), this.props;
                    }),
                    (n.setProps = function (e, n, t) {
                      void 0 === t && (t = !1);
                      var r = this.getHelpers(),
                        o = this.getProps();
                      ae(
                        o,
                        (function (e, n, t, r, o, i) {
                          void 0 === i && (i = !1);
                          for (
                            var a = {}, u = 0, c = Object.keys(t);
                            u < c.length;
                            u++
                          ) {
                            var s = c[u],
                              f = n.getPropDefinition(s);
                            if (
                              !f ||
                              !f.sameDomain ||
                              (r === C(window) && k(e))
                            ) {
                              var d = et(n, 0, s, t[s], o);
                              (a[s] = d),
                                f && f.alias && !a[f.alias] && (a[f.alias] = d);
                            }
                          }
                          if (!i)
                            for (
                              var h = 0, l = n.getPropNames();
                              h < l.length;
                              h++
                            ) {
                              var p = l[h];
                              t.hasOwnProperty(p) ||
                                (a[p] = et(n, 0, p, t[p], o));
                            }
                          return a;
                        })(
                          this.parentComponentWindow,
                          this.component,
                          e,
                          n,
                          r,
                          t,
                        ),
                      );
                      for (
                        var i = 0, a = this.onPropHandlers;
                        i < a.length;
                        i++
                      )
                        a[i].call(this, o);
                    }),
                    (n.watchForClose = function () {
                      var e = this;
                      window.addEventListener("beforeunload", function () {
                        e.parent.checkClose.fireAndForget();
                      }),
                        window.addEventListener("unload", function () {
                          e.parent.checkClose.fireAndForget();
                        }),
                        U(this.parentComponentWindow, function () {
                          e.destroy();
                        });
                    }),
                    (n.getAutoResize = function () {
                      var e =
                          this.autoResize || this.component.autoResize || {},
                        n = e.width,
                        t = e.height,
                        r = e.element,
                        o = void 0 === r ? "body" : r;
                      return {
                        width: void 0 !== n && n,
                        height: void 0 !== t && t,
                        element: (o = be(o)),
                      };
                    }),
                    (n.watchForResize = function () {
                      var e = this;
                      return ve()
                        .then(function () {
                          if (document.body) return document.body;
                          throw new Error(
                            "Document ready but document.body not present",
                          );
                        })
                        .then(function () {
                          var n = e.getAutoResize(),
                            t = n.width,
                            r = n.height,
                            o = n.element;
                          o &&
                            (t || r) &&
                            e.context !== Kn.POPUP &&
                            Te(
                              o,
                              function (n) {
                                e.resize({
                                  width: t ? n.width : void 0,
                                  height: r ? n.height : void 0,
                                });
                              },
                              { width: t, height: r },
                            );
                        });
                    }),
                    (n.buildExports = function () {
                      var e = this;
                      return {
                        updateProps: function (n) {
                          var t = this;
                          return l.try(function () {
                            return e.setProps(n, t.__origin__, !0);
                          });
                        },
                        close: function () {
                          return l.try(function () {
                            return e.destroy();
                          });
                        },
                      };
                    }),
                    (n.resize = function (e) {
                      return this.parent.resize.fireAndForget({
                        width: e.width,
                        height: e.height,
                      });
                    }),
                    (n.close = function () {
                      return this.parent.close();
                    }),
                    (n.destroy = function () {
                      return l.try(function () {
                        window.close();
                      });
                    }),
                    (n.focus = function () {
                      return l.try(function () {
                        window.focus();
                      });
                    }),
                    (n.onError = function (e) {
                      var n = this;
                      return l.try(function () {
                        if (n.parent && n.parent.onError)
                          return n.parent.onError(e);
                        throw e;
                      });
                    }),
                    e
                  );
                })(),
                ot = {};
              function it(e, n, t) {
                return l.try(function () {
                  return "function" == typeof e.queryParam
                    ? e.queryParam({ value: t })
                    : "string" == typeof e.queryParam
                      ? e.queryParam
                      : n;
                });
              }
              function at(e, n, t) {
                return l.try(function () {
                  return "function" == typeof e.queryValue && se(t)
                    ? e.queryValue({ value: t })
                    : t;
                });
              }
              ot[Kn.IFRAME] = {
                openOnClick: !1,
                openFrame: function () {
                  return Yn(
                    Ce({
                      attributes: r(
                        { title: this.component.name },
                        this.component.attributes.iframe,
                      ),
                    }),
                  );
                },
                open: function (e) {
                  var n = this;
                  if (!e) throw new Error("Expected proxy frame to be passed");
                  return e.get().then(function (e) {
                    return Pe(e).then(function (t) {
                      var r,
                        o,
                        i,
                        a =
                          ((r = e),
                          (o = re(
                            (o = function () {
                              return n.close();
                            }),
                          )),
                          De(r)
                            ? o()
                            : (i = ue(function () {
                                De(r) && (i.cancel(), o());
                              }, 50)),
                          {
                            cancel: function () {
                              i && i.cancel();
                            },
                          });
                      return (
                        n.clean.register(function () {
                          return a.cancel();
                        }),
                        n.clean.register(function () {
                          return Oe(e);
                        }),
                        n.clean.register(function () {
                          return (function (e) {
                            for (
                              var n = 0, t = $e("requestPromises").get(e, []);
                              n < t.length;
                              n++
                            )
                              t[n]
                                .reject(
                                  new Error(
                                    "Window cleaned up before response",
                                  ),
                                )
                                .catch(te);
                          })(t);
                        }),
                        Hn(t)
                      );
                    });
                  });
                },
                openPrerenderFrame: function () {
                  return Yn(
                    Ce({
                      attributes: r(
                        {
                          name:
                            "__zoid_prerender_frame__" +
                            this.component.name +
                            "_" +
                            K() +
                            "__",
                          title: "prerender__" + this.component.name,
                        },
                        this.component.attributes.iframe,
                      ),
                    }),
                  );
                },
                openPrerender: function (e, n) {
                  var t = this;
                  if (!n) throw new Error("Expected proxy frame to be passed");
                  return n.get().then(function (e) {
                    return (
                      t.clean.register(function () {
                        return Oe(e);
                      }),
                      Pe(e)
                        .then(function (e) {
                          return W(e);
                        })
                        .then(function (e) {
                          return Hn(e);
                        })
                    );
                  });
                },
                delegate: [
                  "getProxyContainer",
                  "renderContainer",
                  "openFrame",
                  "openPrerenderFrame",
                  "prerender",
                  "open",
                  "openPrerender",
                  "show",
                  "hide",
                ],
              };
              var ut = (function () {
                  function e(e, n) {
                    var t = this;
                    (this.component = void 0),
                      (this.driver = void 0),
                      (this.clean = void 0),
                      (this.event = void 0),
                      (this.initPromise = void 0),
                      (this.handledErrors = void 0),
                      (this.props = void 0),
                      (this.state = void 0),
                      (this.child = void 0),
                      (this.proxyContainer = void 0),
                      (this.proxyWin = void 0),
                      (this.visible = !0),
                      (this.initPromise = new l()),
                      (this.handledErrors = []),
                      (this.props = {}),
                      (this.clean = he(this)),
                      (this.state = {}),
                      (this.component = e),
                      this.setupEvents(n.onError),
                      this.setProps(n),
                      this.component.registerActiveComponent(this),
                      this.clean.register(function () {
                        return t.component.destroyActiveComponent(t);
                      }),
                      this.watchForUnload();
                  }
                  var n = e.prototype;
                  return (
                    (n.setupEvents = function (e) {
                      var n,
                        t,
                        r = this;
                      (this.event =
                        ((n = {}),
                        (t = {}),
                        {
                          on: function (e, n) {
                            var r = (t[e] = t[e] || []);
                            r.push(n);
                            var o = !1;
                            return {
                              cancel: function () {
                                o || ((o = !0), r.splice(r.indexOf(n), 1));
                              },
                            };
                          },
                          once: function (e, n) {
                            var t = this.on(e, function () {
                              t.cancel(), n();
                            });
                            return t;
                          },
                          trigger: function (e) {
                            for (
                              var n = arguments.length,
                                r = new Array(n > 1 ? n - 1 : 0),
                                o = 1;
                              o < n;
                              o++
                            )
                              r[o - 1] = arguments[o];
                            var i = t[e],
                              a = [];
                            if (i)
                              for (
                                var u = function (e) {
                                    var n = i[e];
                                    a.push(
                                      l.try(function () {
                                        return n.apply(void 0, r);
                                      }),
                                    );
                                  },
                                  c = 0;
                                c < i.length;
                                c++
                              )
                                u(c);
                            return l.all(a).then(te);
                          },
                          triggerOnce: function (e) {
                            if (n[e]) return l.resolve();
                            n[e] = !0;
                            for (
                              var t = arguments.length,
                                r = new Array(t > 1 ? t - 1 : 0),
                                o = 1;
                              o < t;
                              o++
                            )
                              r[o - 1] = arguments[o];
                            return this.trigger.apply(this, [e].concat(r));
                          },
                        })),
                        this.event.on(Qn.RENDER, function () {
                          return r.props.onRender();
                        }),
                        this.event.on(Qn.DISPLAY, function () {
                          return r.props.onDisplay();
                        }),
                        this.event.on(Qn.RENDERED, function () {
                          return r.props.onRendered();
                        }),
                        this.event.on(Qn.CLOSE, function () {
                          return r.props.onClose();
                        }),
                        this.event.on(Qn.RESIZE, function () {
                          return r.props.onResize();
                        }),
                        this.event.on(Qn.FOCUS, function () {
                          return r.props.onFocus();
                        }),
                        this.event.on(Qn.PROPS, function (e) {
                          return r.props.onProps(e);
                        }),
                        this.event.on(Qn.ERROR, function (n) {
                          return r.props && r.props.onError
                            ? r.props.onError(n)
                            : e
                              ? e(n)
                              : r.initPromise.reject(n).then(function () {
                                  setTimeout(function () {
                                    throw n;
                                  }, 1);
                                });
                        });
                    }),
                    (n.render = function (e, n, t) {
                      var r = this;
                      return l
                        .try(function () {
                          r.component.log("render"), (r.driver = ot[t]);
                          var o = Zn + "-" + r.component.tag + "-" + K(),
                            i = r.getDomain(),
                            a = r.getChildDomain();
                          r.component.checkAllowRender(e, i, n),
                            e !== window && r.delegate(t, e);
                          var u = r.initPromise,
                            c = r.buildUrl(),
                            s = r.event.trigger(Qn.RENDER),
                            f = r.getProxyContainer(n),
                            d = r.openFrame(),
                            h = r.openPrerenderFrame(),
                            p = l
                              .hash({
                                proxyContainer: f,
                                proxyFrame: d,
                                proxyPrerenderFrame: h,
                              })
                              .then(function (e) {
                                return r.renderContainer(e.proxyContainer, {
                                  context: t,
                                  uid: o,
                                  proxyFrame: e.proxyFrame,
                                  proxyPrerenderFrame: e.proxyPrerenderFrame,
                                  visible: r.visible,
                                });
                              })
                              .then(function (e) {
                                return (r.proxyContainer = e), e;
                              }),
                            w = r.driver.openOnClick
                              ? r.open()
                              : d.then(function (e) {
                                  return r.open(e);
                                }),
                            v = l
                              .hash({ proxyWin: w, proxyPrerenderFrame: h })
                              .then(function (e) {
                                return r.openPrerender(
                                  e.proxyWin,
                                  e.proxyPrerenderFrame,
                                );
                              }),
                            m = w.then(function (e) {
                              return (r.proxyWin = e), r.setProxyWin(e);
                            }),
                            y = l
                              .hash({ proxyPrerenderWin: v, state: m })
                              .then(function (e) {
                                return r.prerender(e.proxyPrerenderWin, {
                                  context: t,
                                  uid: o,
                                });
                              }),
                            g = w.then(function (n) {
                              return r.buildWindowName({
                                proxyWin: n,
                                childDomain: a,
                                domain: i,
                                target: e,
                                context: t,
                                uid: o,
                              });
                            }),
                            b = l
                              .hash({ proxyWin: w, windowName: g })
                              .then(function (e) {
                                return e.proxyWin.setName(e.windowName);
                              }),
                            E = l
                              .hash({
                                proxyWin: w,
                                url: c,
                                windowName: b,
                                prerender: y,
                              })
                              .then(function (e) {
                                return e.proxyWin.setLocation(e.url);
                              }),
                            _ = w.then(function (e) {
                              r.watchForClose(e);
                            }),
                            x = l
                              .hash({ container: p, prerender: y })
                              .then(function () {
                                return r.event.trigger(Qn.DISPLAY);
                              }),
                            P = w.then(function (e) {
                              return r.openBridge(e, a, t);
                            }),
                            C = E.then(function () {
                              return r.runTimeout();
                            }),
                            k = u.then(function () {
                              return r.event.trigger(Qn.RENDERED);
                            });
                          return l.hash({
                            init: u,
                            buildUrl: c,
                            onRender: s,
                            getProxyContainer: f,
                            openFrame: d,
                            openPrerenderFrame: h,
                            renderContainer: p,
                            open: w,
                            openPrerender: v,
                            setState: m,
                            prerender: y,
                            loadUrl: E,
                            buildWindowName: g,
                            setWindowName: b,
                            watchForClose: _,
                            onDisplay: x,
                            openBridge: P,
                            runTimeout: C,
                            onRendered: k,
                          });
                        })
                        .catch(function (e) {
                          return l.all([r.onError(e), r.destroy(e)]).then(
                            function () {
                              throw e;
                            },
                            function () {
                              throw e;
                            },
                          );
                        })
                        .then(te);
                    }),
                    (n.getProxyContainer = function (e) {
                      return l
                        .try(function () {
                          return Ee(e);
                        })
                        .then(function (e) {
                          return Yn(e);
                        });
                    }),
                    (n.buildWindowName = function (e) {
                      var n = this.buildChildPayload({
                        proxyWin: e.proxyWin,
                        childDomain: e.childDomain,
                        domain: e.domain,
                        target: e.target,
                        context: e.context,
                        uid: e.uid,
                      });
                      return (
                        "__zoid__" +
                        this.component.name +
                        "__" +
                        X(JSON.stringify(n)) +
                        "__"
                      );
                    }),
                    (n.getPropsRef = function (e, n, t, r) {
                      var o = Un(e, t, this.getPropsForChild(t)),
                        i =
                          n === C()
                            ? { type: "uid", uid: r }
                            : { type: "raw", value: o };
                      if ("uid" === i.type) {
                        var a = Jn(window);
                        (a.props = a.props || {}),
                          (a.props[r] = o),
                          this.clean.register(function () {
                            delete a.props[r];
                          });
                      }
                      return i;
                    }),
                    (n.buildChildPayload = function (e) {
                      var n = void 0 === e ? {} : e,
                        t = n.proxyWin,
                        r = n.childDomain,
                        o = n.domain,
                        i = n.target,
                        a = void 0 === i ? window : i,
                        u = n.context,
                        c = n.uid;
                      return {
                        uid: c,
                        context: u,
                        version: "9_0_33",
                        childDomain: r,
                        parentDomain: C(window),
                        tag: this.component.tag,
                        parent: this.getWindowRef(a, r, c, u),
                        props: this.getPropsRef(t, r, o, c),
                        exports: Un(t, o, this.buildParentExports(t)),
                      };
                    }),
                    (n.setProxyWin = function (e) {
                      var n = this;
                      return l.try(function () {
                        n.proxyWin = e;
                      });
                    }),
                    (n.getHelpers = function () {
                      var e = this;
                      return {
                        state: this.state,
                        event: this.event,
                        close: function () {
                          return e.close();
                        },
                        focus: function () {
                          return e.focus();
                        },
                        resize: function (n) {
                          return e.resize({ width: n.width, height: n.height });
                        },
                        onError: function (n) {
                          return e.onError(n);
                        },
                        updateProps: function (n) {
                          return e.updateProps(n);
                        },
                        show: function () {
                          return e.show();
                        },
                        hide: function () {
                          return e.hide();
                        },
                      };
                    }),
                    (n.show = function () {
                      var e = this;
                      return l.try(function () {
                        if (((e.visible = !0), e.proxyContainer))
                          return e.proxyContainer.get().then(je);
                      });
                    }),
                    (n.hide = function () {
                      var e = this;
                      return l.try(function () {
                        if (((e.visible = !1), e.proxyContainer))
                          return e.proxyContainer.get().then(Se);
                      });
                    }),
                    (n.setProps = function (e, n) {
                      void 0 === n && (n = !1),
                        this.component.validate &&
                          this.component.validate({ props: e });
                      var t = this.getHelpers();
                      !(function (e, n, t, r, o) {
                        void 0 === o && (o = !1), ae(n, (t = t || {}));
                        for (
                          var i = o ? [] : [].concat(e.getPropNames()),
                            a = 0,
                            c = Object.keys(t);
                          a < c.length;
                          a++
                        ) {
                          var s = c[a];
                          -1 === i.indexOf(s) && i.push(s);
                        }
                        for (
                          var f = [],
                            d = r.state,
                            h = r.close,
                            l = r.focus,
                            p = r.event,
                            w = r.onError,
                            v = 0;
                          v < i.length;
                          v++
                        ) {
                          var m = i[v],
                            y = e.getPropDefinition(m),
                            g = t[m];
                          if (y) {
                            var b = y.alias;
                            if (
                              (b &&
                                (!se(g) && se(t[b]) && (g = t[b]), f.push(b)),
                              y.value &&
                                (g = y.value({
                                  props: n,
                                  state: d,
                                  close: h,
                                  focus: l,
                                  event: p,
                                  onError: w,
                                })),
                              !se(g) &&
                                y.default &&
                                (g = y.default({
                                  props: n,
                                  state: d,
                                  close: h,
                                  focus: l,
                                  event: p,
                                  onError: w,
                                })),
                              se(g) &&
                                ("array" === y.type
                                  ? !Array.isArray(g)
                                  : u(g) !== y.type))
                            )
                              throw new TypeError(
                                "Prop is not of type " + y.type + ": " + m,
                              );
                            n[m] = g;
                          }
                        }
                        for (var E = 0; E < f.length; E++) delete n[f[E]];
                        for (var _ = 0, x = Object.keys(n); _ < x.length; _++) {
                          var P = x[_],
                            C = e.getPropDefinition(P),
                            k = n[P];
                          C &&
                            (se(k) &&
                              C.validate &&
                              C.validate({ value: k, props: n }),
                            se(k) &&
                              C.decorate &&
                              (n[P] = C.decorate({
                                value: k,
                                props: n,
                                state: d,
                                close: h,
                                focus: l,
                                event: p,
                                onError: w,
                              })));
                        }
                        for (
                          var W = 0, j = e.getPropNames();
                          W < j.length;
                          W++
                        ) {
                          var S = j[W];
                          if (
                            !1 !== e.getPropDefinition(S).required &&
                            !se(n[S])
                          )
                            throw new Error(
                              'Expected prop "' + S + '" to be defined',
                            );
                        }
                      })(this.component, this.props, e, t, n);
                    }),
                    (n.buildUrl = function () {
                      var e,
                        n,
                        t,
                        o,
                        i = this;
                      return ((e = r(
                        {},
                        this.component.props,
                        {},
                        this.component.builtinProps,
                      )),
                      (n = this.props),
                      (t = {}),
                      (o = Object.keys(n)),
                      l
                        .all(
                          o.map(function (r) {
                            var o = e[r];
                            if (o)
                              return l
                                .resolve()
                                .then(function () {
                                  var e = n[r];
                                  if (e && o.queryParam) return e;
                                })
                                .then(function (e) {
                                  if (null != e)
                                    return l
                                      .all([it(o, r, e), at(o, 0, e)])
                                      .then(function (e) {
                                        var n,
                                          i = e[0],
                                          a = e[1];
                                        if ("boolean" == typeof a)
                                          n = a.toString();
                                        else if ("string" == typeof a)
                                          n = a.toString();
                                        else if (
                                          "object" == u(a) &&
                                          null !== a
                                        ) {
                                          if (o.serialization === Xn.JSON)
                                            n = JSON.stringify(a);
                                          else if (
                                            o.serialization === Xn.BASE64
                                          )
                                            n = btoa(JSON.stringify(a));
                                          else if (
                                            o.serialization === Xn.DOTIFY ||
                                            !o.serialization
                                          ) {
                                            n = (function e(n, t, r) {
                                              for (var o in (void 0 === t &&
                                                (t = ""),
                                              void 0 === r && (r = {}),
                                              (t = t ? t + "." : t),
                                              n))
                                                n.hasOwnProperty(o) &&
                                                  null != n[o] &&
                                                  "function" != typeof n[o] &&
                                                  (n[o] &&
                                                  Array.isArray(n[o]) &&
                                                  n[o].length &&
                                                  n[o].every(function (e) {
                                                    return "object" != u(e);
                                                  })
                                                    ? (r["" + t + o + "[]"] =
                                                        n[o].join(","))
                                                    : n[o] &&
                                                        "object" == u(n[o])
                                                      ? (r = e(
                                                          n[o],
                                                          "" + t + o,
                                                          r,
                                                        ))
                                                      : (r["" + t + o] =
                                                          n[o].toString()));
                                              return r;
                                            })(a, r);
                                            for (
                                              var c = 0, s = Object.keys(n);
                                              c < s.length;
                                              c++
                                            ) {
                                              var f = s[c];
                                              t[f] = n[f];
                                            }
                                            return;
                                          }
                                        } else
                                          "number" == typeof a &&
                                            (n = a.toString());
                                        t[i] = n;
                                      });
                                });
                          }),
                        )
                        .then(function () {
                          return t;
                        })).then(function (e) {
                        return (function (e, n) {
                          void 0 === n && (n = {});
                          var t,
                            r,
                            o = n.query || {},
                            i = n.hash || {},
                            a = e.split("#");
                          r = a[1];
                          var u = (t = a[0]).split("?");
                          t = u[0];
                          var c = ye(u[1], o),
                            s = ye(r, i);
                          return (
                            c && (t = t + "?" + c), s && (t = t + "#" + s), t
                          );
                        })(
                          (function (e) {
                            if (0 !== L(e).indexOf(w)) return e;
                            throw new Error(
                              "Mock urls not supported out of test mode",
                            );
                          })(i.component.getUrl(i.props)),
                          { query: e },
                        );
                      });
                    }),
                    (n.getDomain = function () {
                      return this.component.getDomain(this.props);
                    }),
                    (n.getChildDomain = function () {
                      return this.component.getChildDomain(this.props);
                    }),
                    (n.getPropsForChild = function (e) {
                      for (
                        var n = {}, t = 0, r = Object.keys(this.props);
                        t < r.length;
                        t++
                      ) {
                        var o = r[t],
                          i = this.component.getPropDefinition(o);
                        (i && !1 === i.sendToChild) ||
                          (i && i.sameDomain && !q(e, C(window))) ||
                          (n[o] = this.props[o]);
                      }
                      return n;
                    }),
                    (n.updateProps = function (e) {
                      var n = this;
                      return (
                        this.setProps(e, !0),
                        this.initPromise.then(function () {
                          if (n.child)
                            return n.child
                              .updateProps(n.getPropsForChild(n.getDomain()))
                              .catch(function (e) {
                                if (n.child && n.proxyWin)
                                  return n
                                    .checkClose(n.proxyWin)
                                    .then(function () {
                                      if (n.child) throw e;
                                    });
                              });
                        })
                      );
                    }),
                    (n.openFrame = function () {
                      var e = this;
                      return l.try(function () {
                        if (e.driver.openFrame)
                          return e.driver.openFrame.call(e);
                      });
                    }),
                    (n.openPrerenderFrame = function () {
                      var e = this;
                      return l.try(function () {
                        if (e.driver.openPrerenderFrame)
                          return e.driver.openPrerenderFrame.call(e);
                      });
                    }),
                    (n.open = function (e) {
                      var n = this;
                      return l
                        .try(function () {
                          n.component.log("open");
                          var t = n.props.window;
                          return t
                            ? (n.clean.register(function () {
                                return t.close();
                              }),
                              Hn(t))
                            : n.driver.open.call(n, e);
                        })
                        .then(function (e) {
                          return (n.proxyWin = e), e;
                        });
                    }),
                    (n.openPrerender = function (e, n) {
                      var t = this;
                      return l.try(function () {
                        return t.driver.openPrerender.call(t, e, n);
                      });
                    }),
                    (n.focus = function () {
                      var e = this;
                      return l.try(function () {
                        var n = e.proxyWin;
                        if (n)
                          return e.event.trigger(Qn.FOCUS), n.focus().then(te);
                      });
                    }),
                    (n.delegate = function (e, n) {
                      var t = this;
                      this.component.log("delegate");
                      for (
                        var r = {}, o = 0, i = this.component.getPropNames();
                        o < i.length;
                        o++
                      ) {
                        var a = i[o];
                        this.component.getPropDefinition(a).allowDelegate &&
                          (r[a] = this.props[a]);
                      }
                      for (
                        var u = Ln(n, $n + "_" + this.component.name, {
                            context: e,
                            props: r,
                            overrides: {
                              event: this.event,
                              close: function () {
                                return t.close();
                              },
                              onError: function (e) {
                                return t.onError(e);
                              },
                            },
                          })
                            .then(function (e) {
                              var n = e.data;
                              return t.clean.register(n.destroy), n.overrides;
                            })
                            .catch(function (e) {
                              throw new Error(
                                "Unable to delegate rendering. Possibly the component is not loaded in the target window.\n\n" +
                                  oe(e),
                              );
                            }),
                          c = function (e, n) {
                            var r = n[e];
                            t[r] = function () {
                              var e = this,
                                n = arguments;
                              return u.then(function (t) {
                                return t[r].apply(e, n);
                              });
                            };
                          },
                          s = 0,
                          f = this.driver.delegate;
                        s < f.length;
                        s++
                      )
                        c(s, f);
                    }),
                    (n.getWindowRef = function (e, n, t, r) {
                      if (n === C(window)) {
                        var o = Jn(window);
                        return (
                          (o.windows = o.windows || {}),
                          (o.windows[t] = window),
                          this.clean.register(function () {
                            delete o.windows[t];
                          }),
                          { type: "global", uid: t }
                        );
                      }
                      return r === Kn.POPUP
                        ? { type: "opener" }
                        : { type: "parent", distance: F(window) };
                    }),
                    (n.watchForClose = function (e) {
                      var n = this,
                        t = !1;
                      return (
                        this.clean.register(function () {
                          t = !0;
                        }),
                        l
                          .delay(2e3)
                          .then(function () {
                            return e.isClosed();
                          })
                          .then(function (r) {
                            return r
                              ? (n.component.log("detect_close_child"),
                                n.close())
                              : t
                                ? void 0
                                : n.watchForClose(e);
                          })
                      );
                    }),
                    (n.watchForUnload = function () {
                      var e = this,
                        n = ke(
                          window,
                          "unload",
                          re(function () {
                            e.component.log("navigate_away"),
                              e.destroy(new Error("Window navigated away"));
                          }),
                        );
                      this.clean.register(n.cancel);
                    }),
                    (n.runTimeout = function () {
                      var e = this;
                      return l.try(function () {
                        var n = e.props.timeout;
                        if (n)
                          return e.initPromise.timeout(
                            n,
                            new Error(
                              "Loading component timed out after " +
                                n +
                                " milliseconds",
                            ),
                          );
                      });
                    }),
                    (n.initChild = function (e) {
                      var n = this;
                      return l.try(function () {
                        n.clean.set("child", e), n.initPromise.resolve();
                      });
                    }),
                    (n.buildParentExports = function (e) {
                      var n = this,
                        t = function (e) {
                          return n.onError(e);
                        },
                        r = function (e) {
                          return n.initChild(e);
                        };
                      return (
                        (r.onError = t),
                        {
                          init: r,
                          close: function () {
                            return n.close();
                          },
                          checkClose: function () {
                            return n.checkClose(e);
                          },
                          resize: function (e) {
                            return n.resize({
                              width: e.width,
                              height: e.height,
                            });
                          },
                          onError: t,
                          show: function () {
                            return n.show();
                          },
                          hide: function () {
                            return n.hide();
                          },
                        }
                      );
                    }),
                    (n.resize = function (e) {
                      var n = this,
                        t = e.width,
                        r = e.height;
                      return l.try(function () {
                        n.event.trigger(Qn.RESIZE, { width: t, height: r });
                      });
                    }),
                    (n.checkClose = function (e) {
                      var n = this;
                      return e.isClosed().then(function (t) {
                        return t
                          ? n.close()
                          : l
                              .delay(200)
                              .then(function () {
                                return e.isClosed();
                              })
                              .then(function (e) {
                                if (e) return n.close();
                              });
                      });
                    }),
                    (n.close = function () {
                      var e = this;
                      return l
                        .try(function () {
                          return (
                            e.component.log("close"), e.event.trigger(Qn.CLOSE)
                          );
                        })
                        .then(function () {
                          return (
                            e.child && e.child.close.fireAndForget().catch(te),
                            e.destroy(new Error("Window closed"), !1)
                          );
                        });
                    }),
                    (n.prerender = function (e, n) {
                      var t = this,
                        r = n.context,
                        o = n.uid;
                      return l.try(function () {
                        var n = t.component.prerenderTemplate;
                        if (n) {
                          var i = e.getWindow();
                          if (
                            i &&
                            k(i) &&
                            (function (e) {
                              try {
                                if (!e.location.href) return !0;
                                if ("about:blank" === e.location.href)
                                  return !0;
                              } catch (e) {}
                              return !1;
                            })(i)
                          ) {
                            var a = (i = W(i)).document,
                              u = t.renderTemplate(n, {
                                context: r,
                                uid: o,
                                doc: a,
                              });
                            if (u) {
                              if (u.ownerDocument !== a)
                                throw new Error(
                                  "Expected prerender template to have been created with document from child window",
                                );
                              !(function (e, n) {
                                var t = n.tagName.toLowerCase();
                                if ("html" !== t)
                                  throw new Error(
                                    "Expected element to be html, got " + t,
                                  );
                                for (
                                  var r = e.document.documentElement,
                                    o = 0,
                                    i = ce(r.children);
                                  o < i.length;
                                  o++
                                )
                                  r.removeChild(i[o]);
                                for (
                                  var a = 0, u = ce(n.children);
                                  a < u.length;
                                  a++
                                )
                                  r.appendChild(u[a]);
                              })(i, u);
                              var c = t.component.autoResize || {},
                                s = c.width,
                                f = void 0 !== s && s,
                                d = c.height,
                                h = void 0 !== d && d,
                                l = c.element,
                                p = void 0 === l ? "body" : l;
                              (p = be(p, a)) &&
                                (f || h) &&
                                Te(
                                  p,
                                  function (e) {
                                    t.resize({
                                      width: f ? e.width : void 0,
                                      height: h ? e.height : void 0,
                                    });
                                  },
                                  { width: f, height: h, win: i },
                                );
                            }
                          }
                        }
                      });
                    }),
                    (n.renderTemplate = function (e, n) {
                      var t = this;
                      return e.call(this, {
                        container: n.container,
                        context: n.context,
                        uid: n.uid,
                        doc: n.doc,
                        frame: n.frame,
                        prerenderFrame: n.prerenderFrame,
                        focus: function () {
                          return t.focus();
                        },
                        close: function () {
                          return t.close();
                        },
                        state: this.state,
                        props: this.props,
                        tag: this.component.tag,
                        dimensions: this.component.dimensions,
                        event: this.event,
                      });
                    }),
                    (n.renderContainer = function (e, n) {
                      var t = this,
                        r = n.proxyFrame,
                        o = n.proxyPrerenderFrame,
                        i = n.context,
                        a = n.uid,
                        u = n.visible;
                      return l
                        .hash({
                          container: e.get().then(Ee),
                          frame: r ? r.get() : null,
                          prerenderFrame: o ? o.get() : null,
                        })
                        .then(function (e) {
                          var n = e.container,
                            r = t.renderTemplate(
                              t.component.containerTemplate,
                              {
                                context: i,
                                uid: a,
                                container: n,
                                frame: e.frame,
                                prerenderFrame: e.prerenderFrame,
                                doc: document,
                              },
                            );
                          if (r)
                            return (
                              u || Se(r),
                              (function (e, n) {
                                e.appendChild(n);
                              })(n, r),
                              t.clean.register(function () {
                                return Oe(r);
                              }),
                              (t.proxyContainer = Yn(r)),
                              Yn(r)
                            );
                        });
                    }),
                    (n.destroy = function (e, n) {
                      var t = this;
                      return (
                        void 0 === n && (n = !0),
                        l
                          .try(function () {
                            return (
                              e ||
                                ((n = !1),
                                (e = new Error("Component destroyed"))),
                              t.component.log("destroy"),
                              t.onError(e, n)
                            );
                          })
                          .then(function () {
                            return t.clean.all();
                          })
                      );
                    }),
                    (n.onError = function (e, n) {
                      var t = this;
                      return (
                        void 0 === n && (n = !0),
                        l.try(function () {
                          if (-1 === t.handledErrors.indexOf(e))
                            return (
                              t.handledErrors.push(e),
                              t.initPromise.asyncReject(e),
                              n ? t.event.trigger(Qn.ERROR, e) : void 0
                            );
                        })
                      );
                    }),
                    (n.openBridge = function (e, n, t) {}),
                    e
                  );
                })(),
                ct = (function () {
                  function e(e, n, t) {
                    var r = this;
                    (this.component = void 0),
                      (this.source = void 0),
                      (this.context = void 0),
                      (this.driver = void 0),
                      (this.props = void 0),
                      (this.clean = void 0),
                      (this.focus = void 0),
                      (this.resize = void 0),
                      (this.renderTemplate = void 0),
                      (this.close = void 0),
                      (this.onError = void 0),
                      (this.event = void 0),
                      (this.component = e),
                      (this.context = t.context),
                      (this.driver = ot[t.context]),
                      (this.clean = he(this)),
                      (this.focus = ut.prototype.focus),
                      (this.resize = ut.prototype.resize),
                      (this.renderTemplate = ut.prototype.renderTemplate),
                      (this.props = {});
                    for (
                      var o = 0, i = Object.keys(t.props);
                      o < i.length;
                      o++
                    ) {
                      var a = i[o],
                        u = this.component.getPropDefinition(a);
                      u &&
                        u.allowDelegate &&
                        t.props[a] &&
                        (this.props[a] = t.props[a]);
                    }
                    (this.close = t.overrides.close),
                      (this.onError = t.overrides.onError),
                      (this.event = t.overrides.event),
                      this.component.registerActiveComponent(this),
                      this.clean.register(function () {
                        return r.component.destroyActiveComponent(r);
                      }),
                      this.watchForSourceClose(n);
                  }
                  var n = e.prototype;
                  return (
                    (n.getDelegate = function () {
                      var e = this;
                      return {
                        overrides: this.getOverrides(),
                        destroy: function () {
                          return e.destroy();
                        },
                      };
                    }),
                    (n.watchForSourceClose = function (e) {
                      var n = this,
                        t = U(
                          e,
                          function () {
                            return n.destroy();
                          },
                          3e3,
                        );
                      this.clean.register(t.cancel);
                    }),
                    (n.getOverrides = function () {
                      for (
                        var e = {},
                          n = this,
                          t = function (t, r) {
                            var o = r[t];
                            (e[o] = function () {
                              return ut.prototype[o].apply(n, arguments);
                            }),
                              (e[o].__name__ = o);
                          },
                          r = 0,
                          o = this.driver.delegate;
                        r < o.length;
                        r++
                      )
                        t(r, o);
                      return e;
                    }),
                    (n.destroy = function () {
                      return this.clean.all();
                    }),
                    e
                  );
                })(),
                st = "visible",
                ft = "invisible";
              function dt(e) {
                var n = e.uid,
                  t = e.frame,
                  r = e.prerenderFrame,
                  o = e.doc,
                  i = e.props,
                  a = e.event,
                  u = e.dimensions,
                  c = u.width,
                  s = u.height;
                if (t && r) {
                  var f = o.createElement("div");
                  f.setAttribute("id", n);
                  var d = o.createElement("style");
                  return (
                    i.cspNonce && d.setAttribute("nonce", i.cspNonce),
                    d.appendChild(
                      o.createTextNode(
                        "\n            #" +
                          n +
                          " {\n                display: inline-block;\n                position: relative;\n                width: " +
                          c +
                          ";\n                height: " +
                          s +
                          ";\n            }\n\n            #" +
                          n +
                          " > iframe {\n                display: inline-block;\n                position: absolute;\n                width: 100%;\n                height: 100%;\n                top: 0;\n                left: 0;\n                transition: opacity .2s ease-in-out;\n            }\n\n            #" +
                          n +
                          " > iframe." +
                          ft +
                          " {\n                opacity: 0;\n            }\n\n            #" +
                          n +
                          " > iframe." +
                          st +
                          " {\n                opacity: 1;\n        }\n        ",
                      ),
                    ),
                    f.appendChild(t),
                    f.appendChild(r),
                    f.appendChild(d),
                    r.classList.add(st),
                    t.classList.add(ft),
                    a.on(Qn.RENDERED, function () {
                      r.classList.remove(st),
                        r.classList.add(ft),
                        t.classList.remove(ft),
                        t.classList.add(st),
                        setTimeout(function () {
                          Oe(r);
                        }, 1);
                    }),
                    a.on(Qn.RESIZE, function (e) {
                      var n = e.width,
                        t = e.height;
                      "number" == typeof n && (f.style.width = Ne(n)),
                        "number" == typeof t && (f.style.height = Ne(t));
                    }),
                    f
                  );
                }
              }
              function ht(e) {
                var n = e.doc,
                  t = e.props,
                  r = n.createElement("html"),
                  o = n.createElement("body"),
                  i = n.createElement("style"),
                  a = n.createElement("div");
                return (
                  a.classList.add("spinner"),
                  t.cspNonce && i.setAttribute("nonce", t.cspNonce),
                  r.appendChild(o),
                  o.appendChild(a),
                  o.appendChild(i),
                  i.appendChild(
                    n.createTextNode(
                      "\n            html, body {\n                width: 100%;\n                height: 100%;\n            }\n\n            .spinner {\n                position: fixed;\n                max-height: 60vmin;\n                max-width: 60vmin;\n                height: 40px;\n                width: 40px;\n                top: 50%;\n                left: 50%;\n                box-sizing: border-box;\n                border: 3px solid rgba(0, 0, 0, .2);\n                border-top-color: rgba(33, 128, 192, 0.8);\n                border-radius: 100%;\n                animation: rotation .7s infinite linear;\n            }\n\n            @keyframes rotation {\n                from {\n                    transform: translateX(-50%) translateY(-50%) rotate(0deg);\n                }\n                to {\n                    transform: translateX(-50%) translateY(-50%) rotate(359deg);\n                }\n            }\n        ",
                    ),
                  ),
                  r
                );
              }
              var lt = function () {
                  return te;
                },
                pt = function (e) {
                  return re(e.value);
                },
                wt = (function () {
                  function e(e) {
                    (this.tag = void 0),
                      (this.name = void 0),
                      (this.url = void 0),
                      (this.domain = void 0),
                      (this.bridgeUrl = void 0),
                      (this.props = void 0),
                      (this.builtinProps = void 0),
                      (this.dimensions = void 0),
                      (this.autoResize = void 0),
                      (this.allowedParentDomains = void 0),
                      (this.defaultContext = void 0),
                      (this.attributes = void 0),
                      (this.containerTemplate = void 0),
                      (this.prerenderTemplate = void 0),
                      (this.validate = void 0),
                      (this.driverCache = void 0),
                      (this.xprops = void 0),
                      (this.logger = void 0),
                      (this.propNames = void 0),
                      (function (e) {
                        if (!e)
                          throw new Error("Expected options to be passed");
                        if (
                          !e.tag ||
                          !e.tag.match(/^([a-z0-9][a-z0-9-]*)+[a-z0-9]+$/)
                        )
                          throw new Error("Invalid options.tag: " + e.tag);
                        if (
                          ((function (e) {
                            if (e.props && "object" != u(e.props))
                              throw new Error(
                                "Expected options.props to be an object",
                              );
                            var n = (function (e) {
                              var n = [];
                              for (var t in e)
                                e.hasOwnProperty(t) && n.push(e[t]);
                              return n;
                            })(Vn);
                            if (e.props)
                              for (
                                var t = 0, r = Object.keys(e.props);
                                t < r.length;
                                t++
                              ) {
                                var o = r[t],
                                  i = e.props[o];
                                if (!i || "object" != u(i))
                                  throw new Error(
                                    "Expected options.props." +
                                      o +
                                      " to be an object",
                                  );
                                if (!i.type)
                                  throw new Error("Expected prop.type");
                                if (-1 === n.indexOf(i.type))
                                  throw new Error(
                                    "Expected prop.type to be one of " +
                                      n.join(", "),
                                  );
                                if (i.required && i.default)
                                  throw new Error(
                                    "Required prop can not have a default value",
                                  );
                                if (
                                  i.type === Vn.FUNCTION &&
                                  i.queryParam &&
                                  !i.queryValue
                                )
                                  throw new Error(
                                    "Do not pass queryParam for function prop",
                                  );
                              }
                          })(e),
                          e.dimensions)
                        ) {
                          if (
                            e.dimensions &&
                            !ze(e.dimensions.width) &&
                            !Re(e.dimensions.width)
                          )
                            throw new Error(
                              "Expected options.dimensions.width to be a px or % string value",
                            );
                          if (
                            e.dimensions &&
                            !ze(e.dimensions.height) &&
                            !Re(e.dimensions.height)
                          )
                            throw new Error(
                              "Expected options.dimensions.height to be a px or % string value",
                            );
                        }
                        if (
                          e.defaultContext &&
                          e.defaultContext !== Kn.IFRAME &&
                          e.defaultContext !== Kn.POPUP
                        )
                          throw new Error(
                            "Unsupported context type: " +
                              (e.defaultContext || "unknown"),
                          );
                        if (!e.url) throw new Error("Must pass url");
                        if (
                          "string" != typeof e.url &&
                          "function" != typeof e.url
                        )
                          throw new TypeError(
                            "Expected url to be string or function",
                          );
                        if (
                          e.prerenderTemplate &&
                          "function" != typeof e.prerenderTemplate
                        )
                          throw new Error(
                            "Expected options.prerenderTemplate to be a function",
                          );
                        if (
                          e.containerTemplate &&
                          "function" != typeof e.containerTemplate
                        )
                          throw new Error(
                            "Expected options.containerTemplate to be a function",
                          );
                      })(e),
                      (this.tag = e.tag),
                      (this.name = this.tag.replace(/-/g, "_")),
                      (this.allowedParentDomains =
                        e.allowedParentDomains || "*");
                    var n = Jn();
                    if (
                      ((n.components = n.components || {}),
                      n.components[this.tag])
                    )
                      throw new Error(
                        "Can not register multiple components with the same tag: " +
                          this.tag,
                      );
                    (this.builtinProps = {
                      window: {
                        type: "object",
                        sendToChild: !1,
                        required: !1,
                        allowDelegate: !0,
                        validate: function (e) {
                          var n = e.value;
                          if (!B(n) && !Pn.isProxyWindow(n))
                            throw new Error("Expected Window or ProxyWindow");
                          if (B(n)) {
                            if (A(n)) throw new Error("Window is closed");
                            if (!k(n))
                              throw new Error("Window is not same domain");
                          }
                        },
                        decorate: function (e) {
                          return Hn(e.value);
                        },
                      },
                      timeout: {
                        type: "number",
                        required: !1,
                        sendToChild: !1,
                      },
                      close: {
                        type: "function",
                        required: !1,
                        sendToChild: !1,
                        childDecorate: function (e) {
                          return e.close;
                        },
                      },
                      focus: {
                        type: "function",
                        required: !1,
                        sendToChild: !1,
                        childDecorate: function (e) {
                          return e.focus;
                        },
                      },
                      resize: {
                        type: "function",
                        required: !1,
                        sendToChild: !1,
                        childDecorate: function (e) {
                          return e.resize;
                        },
                      },
                      cspNonce: { type: "string", required: !1 },
                      getParent: {
                        type: "function",
                        required: !1,
                        sendToChild: !1,
                        childDecorate: function (e) {
                          return e.getParent;
                        },
                      },
                      getParentDomain: {
                        type: "function",
                        required: !1,
                        sendToChild: !1,
                        childDecorate: function (e) {
                          return e.getParentDomain;
                        },
                      },
                      show: {
                        type: "function",
                        required: !1,
                        sendToChild: !1,
                        childDecorate: function (e) {
                          return e.show;
                        },
                      },
                      hide: {
                        type: "function",
                        required: !1,
                        sendToChild: !1,
                        childDecorate: function (e) {
                          return e.hide;
                        },
                      },
                      onDisplay: {
                        type: "function",
                        required: !1,
                        sendToChild: !1,
                        allowDelegate: !0,
                        default: lt,
                        decorate: pt,
                      },
                      onRendered: {
                        type: "function",
                        required: !1,
                        sendToChild: !1,
                        default: lt,
                        decorate: pt,
                      },
                      onRender: {
                        type: "function",
                        required: !1,
                        sendToChild: !1,
                        default: lt,
                        decorate: pt,
                      },
                      onClose: {
                        type: "function",
                        required: !1,
                        sendToChild: !1,
                        allowDelegate: !0,
                        default: lt,
                        decorate: pt,
                      },
                      onResize: {
                        type: "function",
                        required: !1,
                        sendToChild: !1,
                        allowDelegate: !0,
                        default: lt,
                      },
                      onFocus: {
                        type: "function",
                        required: !1,
                        sendToChild: !1,
                        allowDelegate: !0,
                        default: lt,
                      },
                      onError: {
                        type: "function",
                        required: !1,
                        sendToChild: !1,
                        childDecorate: function (e) {
                          return e.onError;
                        },
                      },
                      onProps: {
                        type: "function",
                        required: !1,
                        sendToChild: !1,
                        default: lt,
                        childDecorate: function (e) {
                          return e.onProps;
                        },
                      },
                    }),
                      (this.props = e.props || {});
                    var t = e.dimensions || {},
                      r = t.width,
                      o = t.height;
                    (this.dimensions = {
                      width: void 0 === r ? "300px" : r,
                      height: void 0 === o ? "150px" : o,
                    }),
                      (this.url = e.url),
                      (this.domain = e.domain),
                      (this.bridgeUrl = e.bridgeUrl),
                      (this.attributes = e.attributes || {}),
                      (this.attributes.iframe = this.attributes.iframe || {}),
                      (this.attributes.popup = this.attributes.popup || {}),
                      (this.defaultContext = e.defaultContext || Kn.IFRAME),
                      (this.autoResize = e.autoResize),
                      (this.containerTemplate = e.containerTemplate
                        ? e.containerTemplate
                        : dt),
                      (this.prerenderTemplate = e.prerenderTemplate
                        ? e.prerenderTemplate
                        : ht),
                      (this.validate = e.validate),
                      (this.logger = e.logger || {
                        debug: te,
                        info: te,
                        warn: te,
                        error: te,
                      }),
                      this.registerChild(),
                      this.listenDelegate(),
                      (n.components[this.tag] = this);
                  }
                  var n = e.prototype;
                  return (
                    (n.getPropNames = function () {
                      if (this.propNames) return this.propNames;
                      for (
                        var e = Object.keys(this.props),
                          n = 0,
                          t = Object.keys(this.builtinProps);
                        n < t.length;
                        n++
                      ) {
                        var r = t[n];
                        -1 === e.indexOf(r) && e.push(r);
                      }
                      return (this.propNames = e), e;
                    }),
                    (n.getPropDefinition = function (e) {
                      return this.props[e] || this.builtinProps[e];
                    }),
                    (n.driver = function (e, n) {
                      throw new Error("Driver support not enabled");
                    }),
                    (n.registerChild = function () {
                      if (this.isChild()) {
                        if (window.xprops)
                          throw new Error(
                            "Can not register " +
                              this.name +
                              " as child - can not attach multiple components to the same window",
                          );
                        var e = new rt(this);
                        window.xprops = this.xprops = e.getProps();
                      }
                    }),
                    (n.listenDelegate = function () {
                      var e = this;
                      qn(Gn + "_" + this.name, function () {
                        return !0;
                      }),
                        qn($n + "_" + this.name, function (n) {
                          var t = n.data;
                          return new ct(e, n.source, {
                            context: t.context,
                            props: t.props,
                            overrides: t.overrides,
                          }).getDelegate();
                        });
                    }),
                    (n.canRenderTo = function (e) {
                      return Ln(e, Gn + "_" + this.name)
                        .then(function (e) {
                          return e.data;
                        })
                        .catch(function () {
                          return !1;
                        });
                    }),
                    (n.getUrl = function (e) {
                      return "function" == typeof this.url
                        ? this.url({ props: e })
                        : this.url;
                    }),
                    (n.getChildDomain = function (e) {
                      return this.domain && "string" == typeof this.domain
                        ? this.domain
                        : L(this.getUrl(e));
                    }),
                    (n.getDomain = function (e) {
                      return this.domain && fe(this.domain)
                        ? this.domain
                        : this.getChildDomain(e);
                    }),
                    (n.getBridgeUrl = function () {
                      if (this.bridgeUrl) return this.bridgeUrl;
                    }),
                    (n.isChild = function () {
                      var e = tt();
                      return Boolean(
                        e && e.tag === this.tag && e.childDomain === C(),
                      );
                    }),
                    (n.getDefaultContainer = function (e, n) {
                      if (n) {
                        if ("string" != typeof n && !ge(n))
                          throw new TypeError(
                            "Expected string or element selector to be passed",
                          );
                        return n;
                      }
                      if (e === Kn.POPUP) return "body";
                      throw new Error(
                        "Expected element to be passed to render iframe",
                      );
                    }),
                    (n.getDefaultContext = function (e, n) {
                      var t = this;
                      return l.try(function () {
                        if (n.window) return Hn(n.window).getType();
                        if (e) {
                          if (e !== Kn.IFRAME && e !== Kn.POPUP)
                            throw new Error("Unrecognized context: " + e);
                          return e;
                        }
                        return t.defaultContext;
                      });
                    }),
                    (n.init = function (e) {
                      var n = this,
                        t = new ut(this, (e = e || {})),
                        o = function (r, o, i) {
                          return l
                            .try(function () {
                              if (!B(r))
                                throw new Error("Must pass window to renderTo");
                              return n.getDefaultContext(i, e);
                            })
                            .then(function (e) {
                              return (
                                (o = n.getDefaultContainer(e, o)),
                                t.render(r, o, e)
                              );
                            });
                        };
                      return r({}, t.getHelpers(), {
                        render: function (e, n) {
                          return o(window, e, n);
                        },
                        renderTo: function (e, n, t) {
                          return o(e, n, t);
                        },
                      });
                    }),
                    (n.checkAllowRender = function (e, n, t) {
                      if (e !== window) {
                        if (!M(window, e))
                          throw new Error(
                            "Can only renderTo an adjacent frame",
                          );
                        var r = C();
                        if (!q(n, r) && !k(e))
                          throw new Error(
                            "Can not render remotely to " +
                              n.toString() +
                              " - can only render to " +
                              r,
                          );
                        if (t && "string" != typeof t)
                          throw new Error(
                            "Container passed to renderTo must be a string selector, got " +
                              u(t) +
                              " }",
                          );
                      }
                    }),
                    (n.log = function (e, n) {
                      this.logger.info(this.name + "_" + e, n);
                    }),
                    (n.registerActiveComponent = function (e) {
                      var n = Jn();
                      (n.activeComponents = n.activeComponents || []),
                        n.activeComponents.push(e);
                    }),
                    (n.destroyActiveComponent = function (e) {
                      var n = Jn();
                      (n.activeComponents = n.activeComponents || []),
                        n.activeComponents.splice(
                          n.activeComponents.indexOf(e),
                          1,
                        );
                    }),
                    e
                  );
                })();
              function vt(e) {
                var n, t, r;
                Be().initialized ||
                  ((Be().initialized = !0),
                  (function (e) {
                    var n = e.on,
                      t = e.send,
                      r = Be();
                    r.receiveMessage =
                      r.receiveMessage ||
                      function (e) {
                        return Mn(e, { on: n, send: t });
                      };
                  })({ on: qn, send: Ln }),
                  (t = (n = { on: qn, send: Ln }).on),
                  (r = n.send),
                  Je().getOrSet("postMessageListener", function () {
                    return ke(window, "message", function (e) {
                      !(function (e, n) {
                        var t = n.on,
                          r = n.send,
                          o = e.source || e.sourceElement,
                          i =
                            e.origin ||
                            (e.originalEvent && e.originalEvent.origin),
                          a = e.data;
                        if (("null" === i && (i = v + "//"), o)) {
                          if (!i)
                            throw new Error(
                              "Post message did not have origin domain",
                            );
                          Mn(
                            { source: o, origin: i, data: a },
                            { on: t, send: r },
                          );
                        }
                      })(e, { on: t, send: r });
                    });
                  }),
                  (function (e) {
                    var n = e.on,
                      t = e.send;
                    Je("builtinListeners").getOrSet(
                      "helloListener",
                      function () {
                        var e = n(Fe, { domain: Me }, function (e) {
                            return (
                              Ve(e.source, { domain: e.origin }),
                              { instanceID: Ge() }
                            );
                          }),
                          r = N();
                        return r && Xe(r, { send: t }).catch(te), e;
                      },
                    );
                  })({ on: qn, send: Ln }));
                var o = new wt(e),
                  i = function (e) {
                    return o.init(e);
                  };
                return (
                  (i.driver = function (e, n) {
                    return o.driver(e, n);
                  }),
                  (i.isChild = function () {
                    return o.isChild();
                  }),
                  (i.canRenderTo = function (e) {
                    return o.canRenderTo(e);
                  }),
                  (i.xprops = o.xprops),
                  i
                );
              }
              function mt() {
                var e = [],
                  n = Jn();
                for (
                  n.activeComponents = n.activeComponents || [];
                  n.activeComponents.length;

                )
                  e.push(
                    n.activeComponents[0].destroy(
                      new Error("zoid destroyed all"),
                      !1,
                    ),
                  );
                return l.all(e).then(te);
              }
              var yt = mt;
              function gt() {
                var e;
                mt(),
                  delete window.__zoid_9_0_34__,
                  (function () {
                    for (
                      var e = Je("responseListeners"), n = 0, t = e.keys();
                      n < t.length;
                      n++
                    ) {
                      var r = t[n],
                        o = e.get(r);
                      o && (o.cancelled = !0), e.del(r);
                    }
                  })(),
                  (e = Je().get("postMessageListener")) && e.cancel(),
                  delete window.__post_robot_10_0_22__;
              }
              t.d(n, "PopupOpenError", function () {
                return _e;
              }),
                t.d(n, "create", function () {
                  return vt;
                }),
                t.d(n, "destroy", function () {
                  return gt;
                }),
                t.d(n, "destroyComponents", function () {
                  return yt;
                }),
                t.d(n, "destroyAll", function () {
                  return mt;
                }),
                t.d(n, "Component", function () {
                  return wt;
                }),
                t.d(n, "PROP_TYPE", function () {
                  return Vn;
                }),
                t.d(n, "PROP_SERIALIZATION", function () {
                  return Xn;
                }),
                t.d(n, "CONTEXT", function () {
                  return Kn;
                }),
                t.d(n, "EVENT", function () {
                  return Qn;
                });
            },
          ]);
        }),
        "object" == u(n) && "object" == u(e)
          ? (e.exports = a())
          : ((o = []),
            void 0 === (i = "function" == typeof (r = a) ? r.apply(n, o) : r) ||
              (e.exports = i));
    },
  },
]);
