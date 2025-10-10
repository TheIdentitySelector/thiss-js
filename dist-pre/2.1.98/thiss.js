!(function (e, n) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = n())
    : "function" == typeof define && define.amd
      ? define("thiss", [], n)
      : "object" == typeof exports
        ? (exports.thiss = n())
        : (e.thiss = n());
})(this, () =>
  (() => {
    var e = {
        24365: (e) => {
          "use strict";
          e.exports =
            "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMjUzLjg4IDI1My45OSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjUzLjg4IDI1My45OTsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiNGRkZGRkY7fQo8L3N0eWxlPgo8Zz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0zNy41OCw5Ny43NmgxNzguNzNjNS43LDAsMTAuNjgtMy41NiwxMi40Ni04LjljMS40Mi01LjM0LTAuMzYtMTEuMDQtNC45OS0xNC4yNGwtODkuMzctNjQuMDkKCQljLTQuNjMtMy4yLTEwLjY4LTMuMi0xNC45NSwwTDMwLjExLDc0LjYxYy0zLjIsMi40OS01LjM0LDYuMDUtNS4zNCwxMC4zM0MyNC43Nyw5Mi4wNiwzMC40Niw5Ny43NiwzNy41OCw5Ny43NnogTTEyNi45NSwzNi44NwoJCWw0OS40OSwzNS4yNUg3Ny40NkwxMjYuOTUsMzYuODd6Ii8+Cgk8cG9seWdvbiBjbGFzcz0ic3QwIiBwb2ludHM9IjEwOS40NSwxODUuNCAxMDkuODUsMTI3LjgyIDgwLjI1LDExMy41NSA4MC4yNSwxOTkuNjcgCSIvPgoJPHBvbHlnb24gY2xhc3M9InN0MCIgcG9pbnRzPSIxNzQuMTksMTk5LjI2IDE3NC4xOSwxMTQuMzcgMTQ0Ljk5LDEyOC42NCAxNDQuOTksMTg2LjIxIAkiLz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0yNDIuMDcsMjI2LjQyYy0wLjAxLDAtMC4wMywwLTAuMDQsMGgtMTAuNzV2LTEwLjc0YzAtMy43MS0zLjAxLTYuNzItNi43Mi02LjcybC0xMC4xLDB2LTg2LjIxCgkJYzAtOC4yLTYuNzEtMTQuOS0xNC45LTE0LjljLTguMiwwLTE0LjksNi43MS0xNC45LDE0Ljl2ODYuMjFsLTExNS40Mi0wLjAydi04Ni4xOWMwLTguMi02LjcxLTE0LjktMTQuOS0xNC45CgkJYy04LjIsMC0xNC45LDYuNzEtMTQuOSwxNC45djg2LjE4bC0xMC4wOCwwYy0zLjcxLDAtNi43MiwzLjAxLTYuNzIsNi43MnYxMC43NEgxMS44NmMtMy43MSwwLTYuNzIsMy4wMS02LjcyLDYuNzJ2MTEuNjhoMjQzLjYyCgkJdi0xMS42M0MyNDguNzcsMjI5LjQ1LDI0NS43OCwyMjYuNDMsMjQyLjA3LDIyNi40MnoiLz4KPC9nPgo8L3N2Zz4K";
        },
        49880: (e, n, t) => {
          "use strict";
          function r(e) {
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
          t.d(n, { fq6: () => G });
          var o,
            i = [],
            a = [],
            u = 0;
          function c() {
            if (!u && o) {
              var e = o;
              ((o = null), e.resolve());
            }
          }
          function s() {
            u += 1;
          }
          function f() {
            ((u -= 1), c());
          }
          function d(e) {
            return (
              (d =
                "function" == typeof Symbol &&
                "symbol" == typeof Symbol.iterator
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
          function l(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              ((r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                "value" in r && (r.writable = !0),
                Object.defineProperty(e, h(r.key), r));
            }
          }
          function h(e) {
            var n = (function (e) {
              if ("object" != d(e) || !e) return e;
              var n = e[Symbol.toPrimitive];
              if (void 0 !== n) {
                var t = n.call(e, "string");
                if ("object" != d(t)) return t;
                throw new TypeError(
                  "@@toPrimitive must return a primitive value.",
                );
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
                    return (f(), void this.reject(e));
                  }
                  (f(), (u = !0), i ? this.resolve(r) : a && this.reject(o));
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
                      if (!o) return (t.resolve(i), t);
                      for (
                        var a = function (e, n, r) {
                            return n.then(
                              function (n) {
                                ((i[e] = n), 0 == (o -= 1) && t.resolve(i));
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
                            ((i[u] = c.value), (o -= 1));
                            continue;
                          }
                        } else if (!r(c)) {
                          ((i[u] = c), (o -= 1));
                          continue;
                        }
                        a(u, e.resolve(c), t);
                      }
                      return (0 === o && t.resolve(i), t);
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
                        return (f(), e.reject(n));
                      }
                      return (f(), e.resolve(o));
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
                      return ((n = e), (t = o = o || new n()), c(), t);
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
                          "Expected reject to be called with Error, got ".concat(
                            t,
                          ),
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
                                  (i.push(e),
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
                                    }, 1));
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
                      return ((this.errorHandled = !0), this.reject(e), this);
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
                        ((this.dispatching = !0), s());
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
                            l = c.onError,
                            h = c.promise,
                            p = void 0;
                          if (t)
                            try {
                              p = d ? d(this.value) : this.value;
                            } catch (e) {
                              h.reject(e);
                              continue;
                            }
                          else if (o) {
                            if (!l) {
                              h.reject(this.error);
                              continue;
                            }
                            try {
                              p = l(this.error);
                            } catch (e) {
                              h.reject(e);
                              continue;
                            }
                          }
                          if (p instanceof e && (p.resolved || p.rejected)) {
                            var w = p;
                            (w.resolved
                              ? h.resolve(w.value)
                              : h.reject(w.error),
                              (w.errorHandled = !0));
                          } else
                            r(p)
                              ? p instanceof e && (p.resolved || p.rejected)
                                ? p.resolved
                                  ? h.resolve(p.value)
                                  : h.reject(p.error)
                                : a(p, h)
                              : h.resolve(p);
                        }
                        ((i.length = 0), (this.dispatching = !1), f());
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
                              new Error(
                                "Promise timed out after ".concat(e, "ms"),
                              ),
                          );
                      }, e);
                      return this.then(function (e) {
                        return (clearTimeout(r), e);
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
                      return ((this.errorHandled = !0), this);
                    },
                  },
                ]) && l(n.prototype, t),
                u && l(n, u),
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
          function x(e) {
            try {
              return (e && e.location && e.location.href, !0);
            } catch (e) {}
            return !1;
          }
          function _() {
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
              return r && x(r) ? _(r) : "".concat(m, "//");
            }
            var o = n.host;
            if (!o) throw new Error("Can not read window host");
            return "".concat(t, "//").concat(o);
          }
          function C() {
            var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : window,
              n = _(e);
            return n && e.mockDomain && 0 === e.mockDomain.indexOf(w)
              ? e.mockDomain
              : n;
          }
          function P(e) {
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
                  if (E(e) && x(e)) return !0;
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
                    x(e)
                  )
                    return !0;
                } catch (e) {}
                try {
                  if (_(e) === _(window)) return !0;
                } catch (e) {}
                return !1;
              })(e)
            )
              return !1;
            try {
              if (e === window) return !0;
              if (E(e) && x(e)) return !0;
              if (C(window) === C(e)) return !0;
            } catch (e) {}
            return !1;
          }
          var j = [],
            k = [];
          function S(e) {
            var n =
              !(arguments.length > 1 && void 0 !== arguments[1]) ||
              arguments[1];
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
            if (n && P(e))
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
            })(j, e);
            if (-1 !== t) {
              var r = k[t];
              if (
                r &&
                (function (e) {
                  if (!e.contentWindow) return !0;
                  if (!e.parentNode) return !0;
                  var n = e.ownerDocument;
                  if (
                    n &&
                    n.documentElement &&
                    !n.documentElement.contains(e)
                  ) {
                    for (var t = e; t.parentNode && t.parentNode !== t; )
                      t = t.parentNode;
                    if (!t.host || !n.documentElement.contains(t.host))
                      return !0;
                  }
                  return !1;
                })(r)
              )
                return !0;
            }
            return !1;
          }
          function O(e) {
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
              if ("postMessage" in e && "self" in e && "location" in e)
                return !0;
            } catch (e) {}
            return !1;
          }
          function D(e, n) {
            for (var t = 0; t < e.length; t++)
              try {
                if (e[t] === n) return t;
              } catch (e) {}
            return -1;
          }
          function W(e) {
            return (
              (W =
                "function" == typeof Symbol &&
                "symbol" == typeof Symbol.iterator
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
              W(e)
            );
          }
          function T(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              ((r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                "value" in r && (r.writable = !0),
                Object.defineProperty(e, N(r.key), r));
            }
          }
          function N(e) {
            var n = (function (e) {
              if ("object" != W(e) || !e) return e;
              var n = e[Symbol.toPrimitive];
              if (void 0 !== n) {
                var t = n.call(e, "string");
                if ("object" != W(t)) return t;
                throw new TypeError(
                  "@@toPrimitive must return a primitive value.",
                );
              }
              return String(e);
            })(e);
            return "symbol" == W(n) ? n : n + "";
          }
          var z,
            M = (function () {
              return (
                (e = function e() {
                  if (
                    ((function (e, n) {
                      if (!(e instanceof n))
                        throw new TypeError(
                          "Cannot call a class as a function",
                        );
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
                        return (Object.freeze(n), e.set(n, t), e.get(n) === t);
                      } catch (e) {
                        return !1;
                      }
                    })())
                  )
                    try {
                      this.weakmap = new WeakMap();
                    } catch (e) {}
                  ((this.keys = []), (this.values = []));
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
                        if (O(r) && S(r)) {
                          if (e)
                            try {
                              e.delete(r);
                            } catch (e) {}
                          (n.splice(t, 1), this.values.splice(t, 1), (t -= 1));
                        }
                      }
                    },
                  },
                  {
                    key: "isSafeToReadWrite",
                    value: function (e) {
                      if (O(e)) return !1;
                      try {
                        (e && e.self, e && e[this.name]);
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
                        u = D(i, e);
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
                      var r = D(this.keys, e);
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
                        o = D(r, e);
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
                      return (
                        this._cleanupClosedWindows(),
                        -1 !== D(this.keys, e)
                      );
                    },
                  },
                  {
                    key: "getOrSet",
                    value: function (e, n) {
                      if (this.has(e)) return this.get(e);
                      var t = n();
                      return (this.set(e, t), t);
                    },
                  },
                ]) && T(e.prototype, n),
                Object.defineProperty(e, "prototype", { writable: !1 }),
                e
              );
              var e, n;
            })();
          function A(e) {
            return (
              (A =
                "function" == typeof Symbol &&
                "symbol" == typeof Symbol.iterator
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
              A(e)
            );
          }
          function L() {
            var e = "xxxxxxxxxx".replace(/./g, function () {
                return "0123456789abcdef".charAt(
                  Math.floor(16 * Math.random()),
                );
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
          function I() {
            return {};
          }
          var R = 0,
            F = 0;
          function U(e) {
            var n,
              t,
              r =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : {},
              o = r.thisNamespace,
              i = void 0 !== o && o,
              a = r.time,
              u = R;
            R += 1;
            var c,
              s = function () {
                for (
                  var r = arguments.length, o = new Array(r), c = 0;
                  c < r;
                  c++
                )
                  o[c] = arguments[c];
                var s, f;
                (u < F && ((n = null), (t = null), (u = R), (R += 1)),
                  (s = i
                    ? (t = t || new M()).getOrSet(this, I)
                    : (n = n || {})));
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
                                    ((z = z || new M()),
                                    null == e ||
                                      ("object" !== A(e) &&
                                        "function" != typeof e))
                                  )
                                    throw new Error("Invalid object");
                                  var n = z.get(e);
                                  return (
                                    n ||
                                      ((n = "".concat(A(e), ":").concat(L())),
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
                                        "object" === A(e) &&
                                        1 === e.nodeType &&
                                        "object" === A(e.style) &&
                                        "object" === A(e.ownerDocument))) &&
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
                  (d &&
                    a &&
                    Date.now() - d.time < a &&
                    (delete s[f], (d = null)),
                  d)
                )
                  return d.value;
                var l = Date.now(),
                  h = e.apply(this, arguments);
                return ((s[f] = { time: l, value: h }), h);
              };
            return (
              (s.reset = function () {
                ((n = null), (t = null));
              }),
              (function (e, n) {
                try {
                  (delete e.name, (e.name = n));
                } catch (e) {}
                return ((e.__name__ = e.displayName = n), e);
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
          ((U.clear = function () {
            F = R;
          }),
            U(function (e) {
              if (Object.values) return Object.values(e);
              var n = [];
              for (var t in e) e.hasOwnProperty(t) && n.push(e[t]);
              return n;
            }));
          var q = "data-uid";
          function H(e, n) {
            var t =
              ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
              e["@@iterator"];
            if (!t) {
              if (
                Array.isArray(e) ||
                (t = (function (e, n) {
                  if (e) {
                    if ("string" == typeof e) return B(e, n);
                    var t = {}.toString.call(e).slice(8, -1);
                    return (
                      "Object" === t &&
                        e.constructor &&
                        (t = e.constructor.name),
                      "Map" === t || "Set" === t
                        ? Array.from(e)
                        : "Arguments" === t ||
                            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
                          ? B(e, n)
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
                return ((a = e.done), e);
              },
              e: function (e) {
                ((u = !0), (i = e));
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
          function B(e, n) {
            (null == n || n > e.length) && (n = e.length);
            for (var t = 0, r = Array(n); t < n; t++) r[t] = e[t];
            return r;
          }
          function Y() {
            return Boolean(document.body) && "complete" === document.readyState;
          }
          function J() {
            return (
              Boolean(document.body) && "interactive" === document.readyState
            );
          }
          function G(e) {
            e && e.parentNode && e.parentNode.removeChild(e);
          }
          U(function () {
            return new p(function (e) {
              if (Y() || J()) return e();
              var n = setInterval(function () {
                if (Y() || J()) return (clearInterval(n), e());
              }, 10);
            });
          });
          var Z =
              "undefined" != typeof document ? document.currentScript : null,
            Q = U(function () {
              if (Z) return Z;
              if (
                (Z = (function () {
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
                      o = H(
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
                return Z;
              throw new Error("Can not determine current script");
            }),
            V = L();
          U(function () {
            var e;
            try {
              e = Q();
            } catch (e) {
              return V;
            }
            var n = e.getAttribute(q);
            if (n && "string" == typeof n) return n;
            if (
              (n = e.getAttribute("".concat(q, "-auto"))) &&
              "string" == typeof n
            )
              return n;
            if (e.src) {
              var t = e,
                r = t.src,
                o = t.dataset,
                i = (function (e) {
                  for (var n = "", t = 0; t < e.length; t++) {
                    var r = e[t].charCodeAt(0) * t;
                    (e[t + 1] && (r += e[t + 1].charCodeAt(0) * (t - 1)),
                      (n += String.fromCharCode(97 + (Math.abs(r) % 26))));
                  }
                  return n;
                })(JSON.stringify({ src: r, dataset: o })),
                a = i.slice(i.length - 30);
              n = "uid_".concat(a);
            } else n = L();
            return (e.setAttribute("".concat(q, "-auto"), n), n);
          });
        },
        74119: function (e, n, t) {
          var r, o, i, a;
          function u(e) {
            return (
              (u =
                "function" == typeof Symbol &&
                "symbol" == typeof Symbol.iterator
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
          ((e = t.nmd(e)),
            "undefined" != typeof self && self,
            (a = function () {
              return (function (e) {
                var n = {};
                function t(r) {
                  if (n[r]) return n[r].exports;
                  var o = (n[r] = { i: r, l: !1, exports: {} });
                  return (
                    e[r].call(o.exports, o, o.exports, t),
                    (o.l = !0),
                    o.exports
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
                    ("undefined" != typeof Symbol &&
                      Symbol.toStringTag &&
                      Object.defineProperty(e, Symbol.toStringTag, {
                        value: "Module",
                      }),
                      Object.defineProperty(e, "__esModule", { value: !0 }));
                  }),
                  (t.t = function (e, n) {
                    if ((1 & n && (e = t(e)), 8 & n)) return e;
                    if (4 & n && "object" == u(e) && e && e.__esModule)
                      return e;
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
                    return (t.d(n, "a", n), n);
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
                      ((i = null), e.resolve());
                    }
                  }
                  function d() {
                    s += 1;
                  }
                  function l() {
                    ((s -= 1), f());
                  }
                  var h = (function () {
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
                          return (l(), void this.reject(e));
                        }
                        (l(),
                          (a = !0),
                          o ? this.resolve(t) : i && this.reject(r));
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
                                    (a.push(e),
                                      setTimeout(function () {
                                        throw e;
                                      }, 1));
                                    for (var t = 0; t < c.length; t++)
                                      c[t](e, n);
                                  }
                                })(e, n);
                            }, 1),
                          this.dispatch(),
                          this
                        );
                      }),
                      (n.asyncReject = function (e) {
                        return ((this.errorHandled = !0), this.reject(e), this);
                      }),
                      (n.dispatch = function () {
                        var n = this.resolved,
                          t = this.rejected,
                          r = this.handlers;
                        if (!this.dispatching && (n || t)) {
                          ((this.dispatching = !0), d());
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
                              h = void 0;
                            if (n)
                              try {
                                h = c ? c(this.value) : this.value;
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
                                h = s(this.error);
                              } catch (e) {
                                f.reject(e);
                                continue;
                              }
                            }
                            h instanceof e && (h.resolved || h.rejected)
                              ? (h.resolved
                                  ? f.resolve(h.value)
                                  : f.reject(h.error),
                                (h.errorHandled = !0))
                              : o(h)
                                ? h instanceof e && (h.resolved || h.rejected)
                                  ? h.resolved
                                    ? f.resolve(h.value)
                                    : f.reject(h.error)
                                  : i(h, f)
                                : f.resolve(h);
                          }
                          ((r.length = 0), (this.dispatching = !1), l());
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
                          throw new Error(
                            "Promise.finally expected a function",
                          );
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
                              n ||
                                new Error(
                                  "Promise timed out after " + e + "ms",
                                ),
                            );
                        }, e);
                        return this.then(function (e) {
                          return (clearTimeout(r), e);
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
                        if (!r) return (t.resolve(i), t);
                        for (
                          var a = function (e, n, o) {
                              return n.then(
                                function (n) {
                                  ((i[e] = n), 0 == (r -= 1) && t.resolve(i));
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
                              ((i[u] = c.value), (r -= 1));
                              continue;
                            }
                          } else if (!o(c)) {
                            ((i[u] = c), (r -= 1));
                            continue;
                          }
                          a(u, e.resolve(c), t);
                        }
                        return (0 === r && t.resolve(i), t);
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
                          return (l(), e.reject(n));
                        }
                        return (l(), e.resolve(o));
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
                        return ((n = i = i || new e()), f(), n);
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
                    return (
                      void 0 === e && (e = window),
                      e.location.protocol === m
                    );
                  }
                  function E(e) {
                    if ((void 0 === e && (e = window), e))
                      try {
                        if (e.parent && e.parent !== e) return e.parent;
                      } catch (e) {}
                  }
                  function x(e) {
                    if ((void 0 === e && (e = window), e && !E(e)))
                      try {
                        return e.opener;
                      } catch (e) {}
                  }
                  function _(e) {
                    try {
                      return !0;
                    } catch (e) {}
                    return !1;
                  }
                  function C(e) {
                    void 0 === e && (e = window);
                    var n = e.location;
                    if (!n) throw new Error("Can not read window location");
                    var t = n.protocol;
                    if (!t) throw new Error("Can not read window protocol");
                    if (t === v) return v + "//";
                    if (t === m) {
                      var r = E(e);
                      return r && _() ? C(r) : m + "//";
                    }
                    var o = n.host;
                    if (!o) throw new Error("Can not read window host");
                    return t + "//" + o;
                  }
                  function P(e) {
                    void 0 === e && (e = window);
                    var n = C(e);
                    return n && e.mockDomain && 0 === e.mockDomain.indexOf(w)
                      ? e.mockDomain
                      : n;
                  }
                  function j(e) {
                    if (
                      !(function (e) {
                        try {
                          if (e === window) return !0;
                        } catch (e) {}
                        try {
                          var n = Object.getOwnPropertyDescriptor(
                            e,
                            "location",
                          );
                          if (n && !1 === n.enumerable) return !1;
                        } catch (e) {}
                        try {
                          if (b(e) && _()) return !0;
                        } catch (e) {}
                        try {
                          if (C(e) === C(window)) return !0;
                        } catch (e) {}
                        return !1;
                      })(e)
                    )
                      return !1;
                    try {
                      if (e === window) return !0;
                      if (b(e) && _()) return !0;
                      if (P(window) === P(e)) return !0;
                    } catch (e) {}
                    return !1;
                  }
                  function k(e) {
                    if (!j(e))
                      throw new Error("Expected window to be same domain");
                    return e;
                  }
                  function S(e, n) {
                    if (!e || !n) return !1;
                    var t = E(n);
                    return t
                      ? t === e
                      : -1 !==
                          (function (e) {
                            var n = [];
                            try {
                              for (; e.parent !== e; )
                                (n.push(e.parent), (e = e.parent));
                            } catch (e) {}
                            return n;
                          })(n).indexOf(e);
                  }
                  function O(e) {
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
                  function D(e) {
                    for (var n = [], t = 0, r = O(e); t < r.length; t++) {
                      var o = r[t];
                      n.push(o);
                      for (var i = 0, a = D(o); i < a.length; i++) n.push(a[i]);
                    }
                    return n;
                  }
                  function W(e) {
                    void 0 === e && (e = window);
                    try {
                      if (e.top) return e.top;
                    } catch (e) {}
                    if (E(e) === e) return e;
                    try {
                      if (S(window, e) && window.top) return window.top;
                    } catch (e) {}
                    try {
                      if (S(e, window) && window.top) return window.top;
                    } catch (e) {}
                    for (var n = 0, t = D(e); n < t.length; n++) {
                      var r = t[n];
                      try {
                        if (r.top) return r.top;
                      } catch (e) {}
                      if (E(r) === r) return r;
                    }
                  }
                  function T(e) {
                    var n = W(e);
                    if (!n) throw new Error("Can not determine top window");
                    return [].concat(D(n), [n]);
                  }
                  var N = [],
                    z = [];
                  function M(e, n) {
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
                    if (n && j(e))
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
                    })(N, e);
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
                  function A(e) {
                    return (
                      void 0 === e && (e = window),
                      x((e = e || window)) || E(e) || void 0
                    );
                  }
                  function L(e, n) {
                    for (var t = 0; t < e.length; t++)
                      for (var r = e[t], o = 0; o < n.length; o++)
                        if (r === n[o]) return !0;
                    return !1;
                  }
                  function I(e) {
                    void 0 === e && (e = window);
                    for (var n = 0, t = e; t; ) (t = E(t)) && (n += 1);
                    return n;
                  }
                  function R(e, n) {
                    var t = W(e) || e,
                      r = W(n) || n;
                    try {
                      if (t && r) return t === r;
                    } catch (e) {}
                    var o = T(e),
                      i = T(n);
                    if (L(o, i)) return !0;
                    var a = x(t),
                      u = x(r);
                    return !((a && L(T(a), i)) || (u && L(T(u), o), 1));
                  }
                  function F(e, n) {
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
                                return F(e, n);
                              }));
                  }
                  function U(e) {
                    return e.match(/^(https?|mock|file):\/\//)
                      ? e.split("/").slice(0, 3).join("/")
                      : P();
                  }
                  function q(e, n, t, r) {
                    var o;
                    return (
                      void 0 === t && (t = 1e3),
                      void 0 === r && (r = 1 / 0),
                      (function i() {
                        if (M(e)) return (o && clearTimeout(o), n());
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
                  function H(e) {
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
                      if (window.Window && e instanceof window.Window)
                        return !0;
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
                  function B(e) {
                    try {
                      e.close();
                    } catch (e) {}
                  }
                  function Y(e, n) {
                    for (var t = 0; t < e.length; t++)
                      try {
                        if (e[t] === n) return t;
                      } catch (e) {}
                    return -1;
                  }
                  var J,
                    G,
                    Z = (function () {
                      function e() {
                        if (
                          ((this.name = void 0),
                          (this.weakmap = void 0),
                          (this.keys = void 0),
                          (this.values = void 0),
                          (this.name =
                            "__weakmap_" +
                            ((1e9 * Math.random()) >>> 0) +
                            "__"),
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
                        ((this.keys = []), (this.values = []));
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
                            if (H(r) && M(r)) {
                              if (e)
                                try {
                                  e.delete(r);
                                } catch (e) {}
                              (n.splice(t, 1),
                                this.values.splice(t, 1),
                                (t -= 1));
                            }
                          }
                        }),
                        (n.isSafeToReadWrite = function (e) {
                          return !H(e);
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
                            u = Y(i, e);
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
                          var r = Y(this.keys, e);
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
                            o = Y(r, e);
                          -1 !== o &&
                            (r.splice(o, 1), this.values.splice(o, 1));
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
                            this._cleanupClosedWindows(),
                            -1 !== Y(this.keys, e)
                          );
                        }),
                        (n.getOrSet = function (e, n) {
                          if (this.has(e)) return this.get(e);
                          var t = n();
                          return (this.set(e, t), t);
                        }),
                        e
                      );
                    })();
                  function Q(e) {
                    return e.name || e.__name__ || e.displayName || "anonymous";
                  }
                  function V(e, n) {
                    try {
                      (delete e.name, (e.name = n));
                    } catch (e) {}
                    return ((e.__name__ = e.displayName = n), e);
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
                  function $() {
                    return (
                      "xxxxxxxxxx".replace(/./g, function () {
                        return "0123456789abcdef".charAt(
                          Math.floor(16 * Math.random()),
                        );
                      }) +
                      "_" +
                      X(
                        new Date()
                          .toISOString()
                          .slice(11, 19)
                          .replace("T", "."),
                      )
                        .replace(/[^a-zA-Z0-9]/g, "")
                        .toLowerCase()
                    );
                  }
                  function K(e) {
                    try {
                      return JSON.stringify([].slice.call(e), function (e, n) {
                        return "function" == typeof n
                          ? "memoize[" +
                              (function (e) {
                                if (
                                  ((J = J || new Z()),
                                  null == e ||
                                    ("object" != u(e) &&
                                      "function" != typeof e))
                                )
                                  throw new Error("Invalid object");
                                var n = J.get(e);
                                return (
                                  n || ((n = u(e) + ":" + $()), J.set(e, n)),
                                  n
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
                      var u = K(i);
                      return (
                        n.hasOwnProperty(u) ||
                          (n[u] = h
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
                      V(t, Q(e) + "::promiseMemoized")
                    );
                  }
                  function ne(e, n, t) {
                    void 0 === t && (t = []);
                    var r = (e.__inline_memoize_cache__ =
                        e.__inline_memoize_cache__ || {}),
                      o = K(t);
                    return r.hasOwnProperty(o)
                      ? r[o]
                      : (r[o] = n.apply(void 0, t));
                  }
                  function te() {}
                  function re(e) {
                    var n = !1;
                    return V(
                      function () {
                        if (!n) return ((n = !0), e.apply(this, arguments));
                      },
                      Q(e) + "::once",
                    );
                  }
                  function oe(e, n) {
                    if ((void 0 === n && (n = 1), n >= 3))
                      return "stringifyError stack overflow";
                    try {
                      if (!e)
                        return "<unknown error: " + {}.toString.call(e) + ">";
                      if ("string" == typeof e) return e;
                      if (e instanceof Error) {
                        var t = e && e.stack,
                          r = e && e.message;
                        if (t && r)
                          return -1 !== t.indexOf(r) ? t : r + "\n" + t;
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
                          (e(), r());
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
                    return ((e[n] = r), r);
                  }
                  function le(e) {
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
                        return h.all(e).then(te);
                      },
                    };
                  }
                  function he(e, n) {
                    if (null == n)
                      throw new Error("Expected " + e + " to be present");
                    return n;
                  }
                  function pe() {
                    return (
                      Boolean(document.body) &&
                      "complete" === document.readyState
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
                      return new h(function (e) {
                        if (pe()) return e();
                        var n = setInterval(function () {
                          if (pe()) return (clearInterval(n), e());
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
                      ge(e)
                        ? e
                        : "string" == typeof e
                          ? n.querySelector(e)
                          : void 0
                    );
                  }
                  function Ee(e) {
                    return new h(function (n, t) {
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
                  function xe(e) {
                    this.message = e;
                  }
                  function _e(e) {
                    if ((G = G || new Z()).has(e)) {
                      var n = G.get(e);
                      if (n) return n;
                    }
                    var t = new h(function (n, t) {
                      (e.addEventListener("load", function () {
                        ((function (e) {
                          if (
                            ((function () {
                              for (var e = 0; e < N.length; e++) {
                                var n = !1;
                                try {
                                  n = N[e].closed;
                                } catch (e) {}
                                n && (z.splice(e, 1), N.splice(e, 1));
                              }
                            })(),
                            e && e.contentWindow)
                          )
                            try {
                              (N.push(e.contentWindow), z.push(e));
                            } catch (e) {}
                        })(e),
                          n(e));
                      }),
                        e.addEventListener("error", function (r) {
                          e.contentWindow ? n(e) : t(r);
                        }));
                    });
                    return (G.set(e, t), t);
                  }
                  function Ce(e) {
                    return _e(e).then(function (e) {
                      if (!e.contentWindow)
                        throw new Error("Could not find window in iframe");
                      return e.contentWindow;
                    });
                  }
                  function Pe(e, n) {
                    void 0 === e && (e = {});
                    var t = e.style || {},
                      o = (function (e, n) {
                        (void 0 === e && (e = "div"),
                          void 0 === n && (n = {}),
                          (e = e.toLowerCase()));
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
                      o.hasAttribute("id") || o.setAttribute("id", $()),
                      _e(o),
                      n &&
                        (function (e, n) {
                          void 0 === n && (n = document);
                          var t = be(e, n);
                          if (t) return t;
                          throw new Error("Can not find element: " + ie(e));
                        })(n).appendChild(o),
                      (e.url || i) &&
                        o.setAttribute("src", e.url || "about:blank"),
                      o
                    );
                  }
                  function je(e, n, t) {
                    return (
                      e.addEventListener(n, t),
                      {
                        cancel: function () {
                          e.removeEventListener(n, t);
                        },
                      }
                    );
                  }
                  xe.prototype = Object.create(Error.prototype);
                  var ke = "none";
                  function Se(e) {
                    e.style.setProperty("display", "");
                  }
                  function Oe(e) {
                    e.style.setProperty("display", ke, "important");
                  }
                  function De(e) {
                    e && e.parentNode && e.parentNode.removeChild(e);
                  }
                  function We(e) {
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
                      l = e.offsetWidth,
                      h = e.offsetHeight;
                    n({ width: l, height: h });
                    var p,
                      w,
                      v = function () {
                        var t = e.offsetWidth,
                          r = e.offsetHeight;
                        (((i && t !== l) || (u && r !== h)) &&
                          n({ width: t, height: r }),
                          (l = t),
                          (h = r));
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
                              (v(), (w = setTimeout(e, s)));
                            })(),
                      {
                        cancel: function () {
                          (p.disconnect(),
                            window.removeEventListener("resize", v),
                            clearTimeout(w));
                        },
                      }
                    );
                  }
                  function Ne(e) {
                    return "string" == typeof e && /^[0-9]+%$/.test(e);
                  }
                  function ze(e) {
                    return "string" == typeof e && /^[0-9]+px$/.test(e);
                  }
                  function Me(e) {
                    return (
                      (function (e) {
                        if ("number" == typeof e) return e;
                        var n = e.match(/^([0-9]+)(px|%)$/);
                        if (!n)
                          throw new Error(
                            "Could not match css value from " + e,
                          );
                        return parseInt(n[1], 10);
                      })(e) + "px"
                    );
                  }
                  function Ae(e) {
                    return "number" == typeof e ? Me(e) : Ne(e) ? e : Me(e);
                  }
                  var Le = "postrobot_method",
                    Ie = "postrobot_hello",
                    Re = "*",
                    Fe = "cross_domain_zalgo_promise",
                    Ue = "cross_domain_function",
                    qe = "cross_domain_window";
                  function He(e) {
                    return (
                      void 0 === e && (e = window),
                      e !== window
                        ? e.__post_robot_10_0_22__
                        : (e.__post_robot_10_0_22__ =
                            e.__post_robot_10_0_22__ || {})
                    );
                  }
                  var Be = function () {
                    return {};
                  };
                  function Ye(e, n) {
                    return (
                      void 0 === e && (e = "store"),
                      void 0 === n && (n = Be),
                      de(He(), e, function () {
                        var e = n();
                        return {
                          has: function (n) {
                            return e.hasOwnProperty(n);
                          },
                          get: function (n, t) {
                            return e.hasOwnProperty(n) ? e[n] : t;
                          },
                          set: function (n, t) {
                            return ((e[n] = t), t);
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
                  var Je = function () {};
                  function Ge() {
                    var e = He();
                    return (
                      (e.WINDOW_WILDCARD = e.WINDOW_WILDCARD || new Je()),
                      e.WINDOW_WILDCARD
                    );
                  }
                  function Ze(e, n) {
                    return (
                      void 0 === e && (e = "store"),
                      void 0 === n && (n = Be),
                      Ye("windowStore").getOrSet(e, function () {
                        var t = new Z(),
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
                            return ((r(n)[e] = t), t);
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
                  function Qe() {
                    return Ye("instance").getOrSet("instanceID", $);
                  }
                  function Ve(e, n) {
                    var t = n.domain,
                      r = Ze("helloPromises"),
                      o = r.get(e);
                    o && o.resolve({ domain: t });
                    var i = h.resolve({ domain: t });
                    return (r.set(e, i), i);
                  }
                  function Xe(e, n) {
                    return (0, n.send)(
                      e,
                      Ie,
                      { instanceID: Qe() },
                      { domain: Re, timeout: -1 },
                    ).then(function (n) {
                      var t = n.origin,
                        r = n.data.instanceID;
                      return (
                        Ve(e, { domain: t }),
                        { win: e, domain: t, instanceID: r }
                      );
                    });
                  }
                  function $e(e, n) {
                    var t = n.send;
                    return Ze("windowInstanceIDPromises").getOrSet(
                      e,
                      function () {
                        return Xe(e, { send: t }).then(function (e) {
                          return e.instanceID;
                        });
                      },
                    );
                  }
                  function Ke(e) {
                    Ze("knownWindows").set(e, !0);
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
                    ln = "null",
                    hn = "undefined";
                  function pn(e) {
                    return (
                      "object" == u(e) &&
                      null !== e &&
                      "string" == typeof e.__type__
                    );
                  }
                  function wn(e) {
                    return void 0 === e
                      ? hn
                      : null === e
                        ? ln
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
                      (en[ln] = function (e) {
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
                        return (
                          (r.code = t),
                          (r.stack = n + "\n\n" + r.stack),
                          r
                        );
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
                      (mn[ln] = function (e) {
                        return e;
                      }),
                      mn),
                    En = {};
                  function xn() {
                    for (
                      var e = Ye("idToProxyWindow"), n = 0, t = e.keys();
                      n < t.length;
                      n++
                    ) {
                      var r = t[n];
                      e.get(r).shouldClean() && e.del(r);
                    }
                  }
                  function _n(e, n) {
                    var t,
                      r = n.send,
                      o = n.id;
                    return {
                      id: void 0 === o ? $() : o,
                      getType: function () {
                        return e.then(function (e) {
                          return x(e) ? y.POPUP : y.IFRAME;
                        });
                      },
                      getInstanceID: ee(function () {
                        return e.then(function (e) {
                          return $e(e, { send: r });
                        });
                      }),
                      close: function () {
                        return e.then(B);
                      },
                      getName: function () {
                        return e.then(function (e) {
                          if (!M(e)) return t;
                        });
                      },
                      focus: function () {
                        return e.then(function (e) {
                          e.focus();
                        });
                      },
                      isClosed: function () {
                        return e.then(function (e) {
                          return M(e);
                        });
                      },
                      setLocation: function (n) {
                        return e.then(function (e) {
                          if (j(e))
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
                          var r = k(e);
                          ((r.name = n),
                            r.frameElement &&
                              r.frameElement.setAttribute("name", n),
                            (t = n));
                        });
                      },
                    };
                  }
                  new h(function (e) {
                    if (window.document && window.document.body)
                      return e(window.document.body);
                    var n = setInterval(function () {
                      if (window.document && window.document.body)
                        return (clearInterval(n), e(window.document.body));
                    }, 10);
                  });
                  var Cn = (function () {
                    function e(e) {
                      var n = e.send,
                        t = e.win,
                        r = e.serializedWindow;
                      ((this.id = void 0),
                        (this.isProxyWindow = !0),
                        (this.serializedWindow = void 0),
                        (this.actualWindow = void 0),
                        (this.actualWindowPromise = void 0),
                        (this.send = void 0),
                        (this.name = void 0),
                        (this.actualWindowPromise = new h()),
                        (this.serializedWindow =
                          r || _n(this.actualWindowPromise, { send: n })),
                        Ye("idToProxyWindow").set(this.getID(), this),
                        t && this.setWindow(t, { send: n }));
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
                        return this.serializedWindow
                          .setName(e)
                          .then(function () {
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
                        return h
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
                        ((this.actualWindow = e),
                          this.actualWindowPromise.resolve(this.actualWindow),
                          (this.serializedWindow = _n(
                            this.actualWindowPromise,
                            { send: t, id: this.getID() },
                          )),
                          Ze("winToProxyWindow").set(e, this));
                      }),
                      (n.awaitWindow = function () {
                        return this.actualWindowPromise;
                      }),
                      (n.matchWindow = function (e, n) {
                        var t = this,
                          r = n.send;
                        return h.try(function () {
                          return t.actualWindow
                            ? e === t.actualWindow
                            : h
                                .hash({
                                  proxyInstanceID: t.getInstanceID(),
                                  knownWindowInstanceID: $e(e, { send: r }),
                                })
                                .then(function (n) {
                                  var o =
                                    n.proxyInstanceID ===
                                    n.knownWindowInstanceID;
                                  return (o && t.setWindow(e, { send: r }), o);
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
                        return Boolean(
                          this.actualWindow && M(this.actualWindow),
                        );
                      }),
                      (n.serialize = function () {
                        return this.serializedWindow;
                      }),
                      (e.unwrap = function (n) {
                        return e.isProxyWindow(n) ? n.unwrap() : n;
                      }),
                      (e.serialize = function (n, t) {
                        var r = t.send;
                        return (
                          xn(),
                          e.toProxyWindow(n, { send: r }).serialize()
                        );
                      }),
                      (e.deserialize = function (n, t) {
                        var r = t.send;
                        return (
                          xn(),
                          Ye("idToProxyWindow").get(n.id) ||
                            new e({ serializedWindow: n, send: r })
                        );
                      }),
                      (e.isProxyWindow = function (e) {
                        return Boolean(e && !H(e) && e.isProxyWindow);
                      }),
                      (e.toProxyWindow = function (n, t) {
                        var r = t.send;
                        if ((xn(), e.isProxyWindow(n))) return n;
                        var o = n;
                        return (
                          Ze("winToProxyWindow").get(o) ||
                          new e({ win: o, send: r })
                        );
                      }),
                      e
                    );
                  })();
                  function Pn(e, n, t, r, o) {
                    var i = Ze("methodStore"),
                      a = Ye("proxyWindowMethods");
                    Cn.isProxyWindow(r)
                      ? a.set(e, { val: n, name: t, domain: o, source: r })
                      : (a.del(e),
                        (i.getOrSet(r, function () {
                          return {};
                        })[e] = { domain: o, name: t, val: n, source: r }));
                  }
                  function jn(e, n) {
                    var t = Ze("methodStore"),
                      r = Ye("proxyWindowMethods");
                    return (
                      t.getOrSet(e, function () {
                        return {};
                      })[n] || r.get(n)
                    );
                  }
                  function kn(e, n, t, r, o) {
                    var i, a, u;
                    ((i = { on: o.on, send: o.send }),
                      (a = i.on),
                      (u = i.send),
                      Ye("builtinListeners").getOrSet(
                        "functionCalls",
                        function () {
                          return a(Le, { domain: Re }, function (e) {
                            var n = e.source,
                              t = e.origin,
                              r = e.data,
                              o = r.id,
                              i = r.name,
                              a = jn(n, o);
                            if (!a)
                              throw new Error(
                                "Could not find method '" +
                                  i +
                                  "' with id: " +
                                  r.id +
                                  " in " +
                                  P(window),
                              );
                            var c = a.source,
                              s = a.domain,
                              f = a.val;
                            return h
                              .try(function () {
                                if (!F(s, t))
                                  throw new Error(
                                    "Method '" +
                                      r.name +
                                      "' domain " +
                                      JSON.stringify(
                                        fe(a.domain)
                                          ? a.domain.source
                                          : a.domain,
                                      ) +
                                      " does not match origin " +
                                      t +
                                      " in " +
                                      P(window),
                                  );
                                if (Cn.isProxyWindow(c))
                                  return c
                                    .matchWindow(n, { send: u })
                                    .then(function (e) {
                                      if (!e)
                                        throw new Error(
                                          "Method call '" +
                                            r.name +
                                            "' failed - proxy window does not match source in " +
                                            P(window),
                                        );
                                    });
                              })
                              .then(
                                function () {
                                  return f.apply(
                                    { source: n, origin: t },
                                    r.args,
                                  );
                                },
                                function (e) {
                                  return h
                                    .try(function () {
                                      if (f.onError) return f.onError(e);
                                    })
                                    .then(function () {
                                      throw (
                                        e.stack &&
                                          (e.stack =
                                            "Remote call to " +
                                            i +
                                            "()\n\n" +
                                            e.stack),
                                        e
                                      );
                                    });
                                },
                              )
                              .then(function (e) {
                                return { result: e, id: o, name: i };
                              });
                          });
                        },
                      ));
                    var c = t.__id__ || $();
                    e = Cn.unwrap(e);
                    var s = t.__name__ || t.name || r;
                    return (
                      0 === s.indexOf("anonymous::") &&
                        (s = s.replace("anonymous::", r + "::")),
                      Cn.isProxyWindow(e)
                        ? (Pn(c, t, s, e, n),
                          e.awaitWindow().then(function (e) {
                            Pn(c, t, s, e, n);
                          }))
                        : Pn(c, t, s, e, n),
                      vn(Ue, { id: c, name: s })
                    );
                  }
                  function Sn(e, n, t, r) {
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
                      return void 0 === t ? hn : t;
                    })(
                      t,
                      (((o = {})[rn] = function (t, r) {
                        return (function (e, n, t, r, o) {
                          return vn(Fe, {
                            then: kn(
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
                        return kn(e, n, t, r, { on: i, send: a });
                      }),
                      (o[cn] = function (e) {
                        return H(e) || Cn.isProxyWindow(e)
                          ? vn(qe, Cn.serialize(e, { send: a }))
                          : e;
                      }),
                      o),
                    );
                  }
                  function On(e, n, t, r) {
                    var o,
                      i = r.on,
                      a = r.send;
                    return (function (e, n) {
                      if ((void 0 === n && (n = En), e !== hn))
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
                      (((o = {})[Fe] = function (e) {
                        return (function (e, n, t) {
                          return new h(t.then);
                        })(0, 0, e);
                      }),
                      (o[Ue] = function (t) {
                        return (function (e, n, t, r) {
                          var o = t.id,
                            i = t.name,
                            a = r.send,
                            u = function (t) {
                              function r() {
                                var u = arguments;
                                return Cn.toProxyWindow(e, { send: a })
                                  .awaitWindow()
                                  .then(function (e) {
                                    var c = jn(e, o);
                                    if (c && c.val !== r)
                                      return c.val.apply(
                                        { source: window, origin: P() },
                                        u,
                                      );
                                    var s = {
                                        domain: n,
                                        fireAndForget: t.fireAndForget,
                                      },
                                      f = [].slice.call(u);
                                    return a(
                                      e,
                                      Le,
                                      { id: o, name: i, args: f },
                                      s,
                                    ).then(function (e) {
                                      if (!t.fireAndForget)
                                        return e.data.result;
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
                          return (
                            (c.fireAndForget = u({ fireAndForget: !0 })),
                            c
                          );
                        })(e, n, t, { on: i, send: a });
                      }),
                      (o[qe] = function (e) {
                        return Cn.deserialize(e, { send: a });
                      }),
                      o),
                    );
                  }
                  var Dn = {};
                  function Wn(e, n, t, o) {
                    var i,
                      a = o.on,
                      u = o.send;
                    if (M(e)) throw new Error("Window is closed");
                    for (
                      var c = Sn(
                          e,
                          n,
                          (((i = {}).__post_robot_10_0_22__ = r(
                            { id: $(), origin: P(window) },
                            t,
                          )),
                          i),
                          { on: a, send: u },
                        ),
                        s = Object.keys(Dn),
                        f = [],
                        d = 0;
                      d < s.length;
                      d++
                    ) {
                      var l = s[d];
                      try {
                        Dn[l](e, c, n);
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
                  ((Dn.postrobot_post_message = function (e, n, t) {
                    (Array.isArray(t) ? t : "string" == typeof t ? [t] : [Re])
                      .map(function (e) {
                        return 0 === e.indexOf(v) ? Re : e;
                      })
                      .forEach(function (t) {
                        e.postMessage(n, t);
                      });
                  }),
                    (Dn.postrobot_global = function (e, n) {
                      if (
                        !(function (e) {
                          return (
                            (e = e || window).navigator.mockUserAgent ||
                            e.navigator.userAgent
                          );
                        })(window).match(
                          /MSIE|rv:11|trident|edge\/12|edge\/13/i,
                        )
                      )
                        throw new Error(
                          "Global messaging not needed for browser",
                        );
                      if (!j(e))
                        throw new Error(
                          "Post message through global disabled between different domain windows",
                        );
                      if (!1 !== R(window, e))
                        throw new Error(
                          "Can only use global to communicate between two different windows, not between frames",
                        );
                      var t = He(e);
                      if (!t)
                        throw new Error(
                          "Can not find postRobot global on foreign window",
                        );
                      t.receiveMessage({
                        source: window,
                        origin: P(),
                        data: n,
                      });
                    }));
                  var Tn,
                    Nn = "__domain_regex__";
                  function zn(e) {
                    return Ye("responseListeners").get(e);
                  }
                  function Mn(e) {
                    Ye("responseListeners").del(e);
                  }
                  function An(e) {
                    return Ye("erroredResponseListeners").has(e);
                  }
                  function Ln(e) {
                    var n = e.name,
                      t = e.win,
                      r = e.domain,
                      o = Ze("requestListeners");
                    if ((t === Re && (t = null), r === Re && (r = null), !n))
                      throw new Error("Name required to get request listener");
                    for (var i = 0, a = [t, Ge()]; i < a.length; i++) {
                      var u = a[i];
                      if (u) {
                        var c = o.get(u);
                        if (c) {
                          var s = c[n];
                          if (s) {
                            if (r && "string" == typeof r) {
                              if (s[r]) return s[r];
                              if (s[Nn])
                                for (var f = 0, d = s[Nn]; f < d.length; f++) {
                                  var l = d[f],
                                    h = l.listener;
                                  if (F(l.regex, r)) return h;
                                }
                            }
                            if (s[Re]) return s[Re];
                          }
                        }
                      }
                    }
                  }
                  var In =
                    (((Tn = {}).postrobot_message_request = function (
                      e,
                      n,
                      t,
                      o,
                    ) {
                      var i = o.on,
                        a = o.send,
                        u = Ln({ name: t.name, win: e, domain: n }),
                        c =
                          t.name === Le &&
                          t.data &&
                          "string" == typeof t.data.name
                            ? t.data.name + "()"
                            : t.name;
                      function s(o, u, s) {
                        if (
                          (void 0 === s && (s = {}), !t.fireAndForget && !M(e))
                        )
                          try {
                            Wn(
                              e,
                              n,
                              r(
                                { type: o, ack: u, hash: t.hash, name: t.name },
                                s,
                              ),
                              { on: i, send: a },
                            );
                          } catch (e) {
                            throw new Error(
                              "Send response message failed for " +
                                c +
                                " in " +
                                P() +
                                "\n\n" +
                                oe(e),
                            );
                          }
                      }
                      return h
                        .all([
                          s("postrobot_message_ack"),
                          h
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
                              if (!F(u.domain, n))
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
                                return s(
                                  "postrobot_message_response",
                                  "success",
                                  { data: e },
                                );
                              },
                              function (e) {
                                return s(
                                  "postrobot_message_response",
                                  "error",
                                  { error: e },
                                );
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
                      if (!An(t.hash)) {
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
                          if (!F(r.domain, n))
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
                      if (!An(t.hash)) {
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
                        if (!F(o.domain, n))
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
                        (Mn(t.hash),
                          "error" === t.ack
                            ? o.promise.reject(t.error)
                            : "success" === t.ack &&
                              o.promise.resolve({
                                source: e,
                                origin: n,
                                data: t.data,
                              }));
                      }
                    }),
                    Tn);
                  function Rn(e, n) {
                    var t = n.on,
                      r = n.send,
                      o = Ye("receivedMessages");
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
                          o = On(n, t, e, { on: i, send: a });
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
                          In[o.type]
                        )
                          return o;
                      })(e.data, i, a, { on: t, send: r });
                    c &&
                      (Ke(i),
                      o.has(c.id) ||
                        (o.set(c.id, !0),
                        (M(i) && !c.fireAndForget) ||
                          (0 === c.origin.indexOf(v) && (a = v + "//"),
                          In[c.type](i, a, c, { on: t, send: r }))));
                  }
                  function Fn(e, n, t) {
                    if (!e) throw new Error("Expected name");
                    if (("function" == typeof n && ((t = n), (n = {})), !t))
                      throw new Error("Expected handler");
                    (((n = n || {}).name = e), (n.handler = t || n.handler));
                    var r = n.window,
                      o = n.domain,
                      i = (function e(n, t) {
                        var r = n.name,
                          o = n.win,
                          i = n.domain,
                          a = Ze("requestListeners");
                        if (!r || "string" != typeof r)
                          throw new Error(
                            "Name required to add request listener",
                          );
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
                          for (var f = [], d = 0, l = i; d < l.length; d++)
                            f.push(e({ name: r, win: o, domain: l[d] }, t));
                          return {
                            cancel: function () {
                              for (var e = 0; e < f.length; e++) f[e].cancel();
                            },
                          };
                        }
                        var h = Ln({ name: r, win: o, domain: i });
                        if (((o && o !== Re) || (o = Ge()), (i = i || Re), h))
                          throw o && i
                            ? new Error(
                                "Request listener already exists for " +
                                  r +
                                  " on domain " +
                                  i.toString() +
                                  " for " +
                                  (o === Ge() ? "wildcard" : "specified") +
                                  " window",
                              )
                            : o
                              ? new Error(
                                  "Request listener already exists for " +
                                    r +
                                    " for " +
                                    (o === Ge() ? "wildcard" : "specified") +
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
                            ? (p = de(m, Nn, function () {
                                return [];
                              })).push((w = { regex: i, listener: t }))
                            : (m[y] = t),
                          {
                            cancel: function () {
                              (delete m[y],
                                w &&
                                  (p.splice(p.indexOf(w, 1)),
                                  p.length || delete m[Nn]),
                                Object.keys(m).length || delete v[r],
                                o && !Object.keys(v).length && a.del(o));
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
                          domain: o || Re,
                          name: e,
                        },
                      );
                    return {
                      cancel: function () {
                        i.cancel();
                      },
                    };
                  }
                  var Un = function e(n, t, r, o) {
                    var i = (o = o || {}).domain || Re,
                      a = o.timeout || -1,
                      u = o.timeout || 5e3,
                      c = o.fireAndForget || !1;
                    return h
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
                            if (M(n))
                              throw new Error("Target window is closed");
                          })(t, n, i),
                          (function (e, n) {
                            var t = A(n);
                            if (t) return t === e;
                            if (n === e) return !1;
                            if (W(n) === n) return !1;
                            for (var r = 0, o = O(e); r < o.length; r++)
                              if (o[r] === n) return !0;
                            return !1;
                          })(window, n))
                        )
                          return (function (e, n, t) {
                            (void 0 === n && (n = 5e3),
                              void 0 === t && (t = "Window"));
                            var r = (function (e) {
                              return Ze("helloPromises").getOrSet(
                                e,
                                function () {
                                  return new h();
                                },
                              );
                            })(e);
                            return (
                              -1 !== n &&
                                (r = r.timeout(
                                  n,
                                  new Error(
                                    t + " did not load after " + n + "ms",
                                  ),
                                )),
                              r
                            );
                          })(n, u);
                      })
                      .then(function (t) {
                        return (function (e, n, t, r) {
                          var o = r.send;
                          return "string" == typeof n
                            ? h.resolve(n)
                            : h
                                .try(function () {
                                  return (
                                    t ||
                                    Xe(e, { send: o }).then(function (e) {
                                      return e.domain;
                                    })
                                  );
                                })
                                .then(function (e) {
                                  if (!F(n, n))
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
                            t === Le && r && "string" == typeof r.name
                              ? r.name + "()"
                              : t,
                          s = new h(),
                          f = t + "_" + $();
                        if (!c) {
                          var d = { name: t, win: n, domain: i, promise: s };
                          !(function (e, n) {
                            Ye("responseListeners").set(e, n);
                          })(f, d);
                          var l = Ze("requestPromises").getOrSet(
                            n,
                            function () {
                              return [];
                            },
                          );
                          (l.push(s),
                            s.catch(function () {
                              (!(function (e) {
                                Ye("erroredResponseListeners").set(e, !0);
                              })(f),
                                Mn(f));
                            }));
                          var p = (function (e) {
                              return Ze("knownWindows").get(e, !1);
                            })(n)
                              ? 1e4
                              : 2e3,
                            w = a,
                            v = p,
                            m = w,
                            y = ue(function () {
                              return M(n)
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
                                        "Response listener was cancelled for " +
                                          t,
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
                                                P() +
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
                                              P() +
                                              " in " +
                                              p +
                                              "ms",
                                          ),
                                        ));
                            }, 500);
                          s.finally(function () {
                            (y.cancel(), l.splice(l.indexOf(s, 1)));
                          }).catch(te);
                        }
                        try {
                          Wn(
                            n,
                            i,
                            {
                              type: "postrobot_message_request",
                              hash: f,
                              name: t,
                              data: r,
                              fireAndForget: c,
                            },
                            { on: Fn, send: e },
                          );
                        } catch (e) {
                          throw new Error(
                            "Send request message failed for " +
                              u +
                              " in " +
                              P() +
                              "\n\n" +
                              oe(e),
                          );
                        }
                        return c ? s.resolve() : s;
                      });
                  };
                  function qn(e, n, t) {
                    return Sn(e, n, t, { on: Fn, send: Un });
                  }
                  function Hn(e, n, t) {
                    return On(e, n, t, { on: Fn, send: Un });
                  }
                  function Bn(e) {
                    return Cn.toProxyWindow(e, { send: Un });
                  }
                  function Yn(e) {
                    if ((void 0 === e && (e = window), !j(e)))
                      throw new Error(
                        "Can not get global for window on different domain",
                      );
                    return (
                      e.__zoid_9_0_34__ || (e.__zoid_9_0_34__ = {}),
                      e.__zoid_9_0_34__
                    );
                  }
                  function Jn(e) {
                    return {
                      get: function () {
                        var n = this;
                        return h.try(function () {
                          if (n.source && n.source !== window)
                            throw new Error(
                              "Can not call get on proxy object from a remote window",
                            );
                          return e;
                        });
                      },
                    };
                  }
                  var Gn = "zoid",
                    Zn = Gn + "_delegate",
                    Qn = Gn + "_allow_delegate",
                    Vn = {
                      STRING: "string",
                      OBJECT: "object",
                      FUNCTION: "function",
                      BOOLEAN: "boolean",
                      NUMBER: "number",
                      ARRAY: "array",
                    },
                    Xn = { JSON: "json", DOTIFY: "dotify", BASE64: "base64" },
                    $n = y,
                    Kn = {
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
                        if (t !== Gn)
                          throw new Error(
                            "Window not rendered by zoid - got " + t,
                          );
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
                                        (
                                          "00" + e.charCodeAt(0).toString(16)
                                        ).slice(-2)
                                      );
                                    })
                                    .join(""),
                                );
                              if ("undefined" != typeof Buffer)
                                return Buffer.from(e, "base64").toString(
                                  "utf8",
                                );
                              throw new Error(
                                "Can not find window.atob or Buffer",
                              );
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
                        ((this.component = void 0),
                          (this.props = void 0),
                          (this.context = void 0),
                          (this.parent = void 0),
                          (this.parentDomain = void 0),
                          (this.parentComponentWindow = void 0),
                          (this.onPropHandlers = void 0),
                          (this.autoResize = void 0),
                          h
                            .try(function () {
                              ((n.component = e), (n.onPropHandlers = []));
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
                              ((n.context = t.context),
                                (n.parentComponentWindow =
                                  n.getParentComponentWindow(r)),
                                (n.parentDomain = o),
                                (n.parent = Hn(n.parentComponentWindow, o, i)),
                                n.checkParentDomain(o));
                              var u = n.getPropsByRef(
                                n.parentComponentWindow,
                                o,
                                a,
                              );
                              return (
                                n.setProps(u, o),
                                Ke(n.parentComponentWindow),
                                n.watchForClose(),
                                n.parent.init(n.buildExports())
                              );
                            })
                            .then(function () {
                              return n.watchForResize();
                            })
                            .catch(function (e) {
                              n.onError(e);
                            }));
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
                              return e.resize({
                                width: n.width,
                                height: n.height,
                              });
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
                          if (!F(this.component.allowedParentDomains, e))
                            throw new Error(
                              "Can not be rendered by domain: " + e,
                            );
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
                            if (!j(e))
                              throw new Error(
                                "Parent component window is on a different domain - expected " +
                                  P() +
                                  " - can not retrieve props",
                              );
                            var a = Yn(e);
                            r = he("props", a && a.props[i]);
                          }
                          if (!r) throw new Error("Could not find props");
                          return Hn(e, n, r);
                        }),
                        (n.getParentComponentWindow = function (e) {
                          var n,
                            t,
                            r = e.type;
                          if ("opener" === r) return he("opener", x(window));
                          if ("parent" === r && "number" == typeof e.distance)
                            return he(
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
                              })(n, I(n) - t)),
                            );
                          if (
                            "global" === r &&
                            e.uid &&
                            "string" == typeof e.uid
                          ) {
                            var o = e.uid,
                              i = A(window);
                            if (!i)
                              throw new Error("Can not find ancestor window");
                            for (var a = 0, u = T(i); a < u.length; a++) {
                              var c = u[a];
                              if (j(c)) {
                                var s = Yn(c);
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
                          return ((this.props = this.props || {}), this.props);
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
                                  (r === P(window) && j(e))
                                ) {
                                  var d = et(n, 0, s, t[s], o);
                                  ((a[s] = d),
                                    f &&
                                      f.alias &&
                                      !a[f.alias] &&
                                      (a[f.alias] = d));
                                }
                              }
                              if (!i)
                                for (
                                  var l = 0, h = n.getPropNames();
                                  l < h.length;
                                  l++
                                ) {
                                  var p = h[l];
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
                          (window.addEventListener("beforeunload", function () {
                            e.parent.checkClose.fireAndForget();
                          }),
                            window.addEventListener("unload", function () {
                              e.parent.checkClose.fireAndForget();
                            }),
                            q(this.parentComponentWindow, function () {
                              e.destroy();
                            }));
                        }),
                        (n.getAutoResize = function () {
                          var e =
                              this.autoResize ||
                              this.component.autoResize ||
                              {},
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
                                e.context !== $n.POPUP &&
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
                              return h.try(function () {
                                return e.setProps(n, t.__origin__, !0);
                              });
                            },
                            close: function () {
                              return h.try(function () {
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
                          return h.try(function () {
                            window.close();
                          });
                        }),
                        (n.focus = function () {
                          return h.try(function () {
                            window.focus();
                          });
                        }),
                        (n.onError = function (e) {
                          var n = this;
                          return h.try(function () {
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
                    return h.try(function () {
                      return "function" == typeof e.queryParam
                        ? e.queryParam({ value: t })
                        : "string" == typeof e.queryParam
                          ? e.queryParam
                          : n;
                    });
                  }
                  function at(e, n, t) {
                    return h.try(function () {
                      return "function" == typeof e.queryValue && se(t)
                        ? e.queryValue({ value: t })
                        : t;
                    });
                  }
                  ot[$n.IFRAME] = {
                    openOnClick: !1,
                    openFrame: function () {
                      return Jn(
                        Pe({
                          attributes: r(
                            { title: this.component.name },
                            this.component.attributes.iframe,
                          ),
                        }),
                      );
                    },
                    open: function (e) {
                      var n = this;
                      if (!e)
                        throw new Error("Expected proxy frame to be passed");
                      return e.get().then(function (e) {
                        return Ce(e).then(function (t) {
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
                              We(r)
                                ? o()
                                : (i = ue(function () {
                                    We(r) && (i.cancel(), o());
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
                              return De(e);
                            }),
                            n.clean.register(function () {
                              return (function (e) {
                                for (
                                  var n = 0,
                                    t = Ze("requestPromises").get(e, []);
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
                            Bn(t)
                          );
                        });
                      });
                    },
                    openPrerenderFrame: function () {
                      return Jn(
                        Pe({
                          attributes: r(
                            {
                              name:
                                "__zoid_prerender_frame__" +
                                this.component.name +
                                "_" +
                                $() +
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
                      if (!n)
                        throw new Error("Expected proxy frame to be passed");
                      return n.get().then(function (e) {
                        return (
                          t.clean.register(function () {
                            return De(e);
                          }),
                          Ce(e)
                            .then(function (e) {
                              return k(e);
                            })
                            .then(function (e) {
                              return Bn(e);
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
                        ((this.component = void 0),
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
                          (this.initPromise = new h()),
                          (this.handledErrors = []),
                          (this.props = {}),
                          (this.clean = le(this)),
                          (this.state = {}),
                          (this.component = e),
                          this.setupEvents(n.onError),
                          this.setProps(n),
                          this.component.registerActiveComponent(this),
                          this.clean.register(function () {
                            return t.component.destroyActiveComponent(t);
                          }),
                          this.watchForUnload());
                      }
                      var n = e.prototype;
                      return (
                        (n.setupEvents = function (e) {
                          var n,
                            t,
                            r = this;
                          ((this.event =
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
                                  (t.cancel(), n());
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
                                          h.try(function () {
                                            return n.apply(void 0, r);
                                          }),
                                        );
                                      },
                                      c = 0;
                                    c < i.length;
                                    c++
                                  )
                                    u(c);
                                return h.all(a).then(te);
                              },
                              triggerOnce: function (e) {
                                if (n[e]) return h.resolve();
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
                            this.event.on(Kn.RENDER, function () {
                              return r.props.onRender();
                            }),
                            this.event.on(Kn.DISPLAY, function () {
                              return r.props.onDisplay();
                            }),
                            this.event.on(Kn.RENDERED, function () {
                              return r.props.onRendered();
                            }),
                            this.event.on(Kn.CLOSE, function () {
                              return r.props.onClose();
                            }),
                            this.event.on(Kn.RESIZE, function () {
                              return r.props.onResize();
                            }),
                            this.event.on(Kn.FOCUS, function () {
                              return r.props.onFocus();
                            }),
                            this.event.on(Kn.PROPS, function (e) {
                              return r.props.onProps(e);
                            }),
                            this.event.on(Kn.ERROR, function (n) {
                              return r.props && r.props.onError
                                ? r.props.onError(n)
                                : e
                                  ? e(n)
                                  : r.initPromise.reject(n).then(function () {
                                      setTimeout(function () {
                                        throw n;
                                      }, 1);
                                    });
                            }));
                        }),
                        (n.render = function (e, n, t) {
                          var r = this;
                          return h
                            .try(function () {
                              (r.component.log("render"), (r.driver = ot[t]));
                              var o = Gn + "-" + r.component.tag + "-" + $(),
                                i = r.getDomain(),
                                a = r.getChildDomain();
                              (r.component.checkAllowRender(e, i, n),
                                e !== window && r.delegate(t, e));
                              var u = r.initPromise,
                                c = r.buildUrl(),
                                s = r.event.trigger(Kn.RENDER),
                                f = r.getProxyContainer(n),
                                d = r.openFrame(),
                                l = r.openPrerenderFrame(),
                                p = h
                                  .hash({
                                    proxyContainer: f,
                                    proxyFrame: d,
                                    proxyPrerenderFrame: l,
                                  })
                                  .then(function (e) {
                                    return r.renderContainer(e.proxyContainer, {
                                      context: t,
                                      uid: o,
                                      proxyFrame: e.proxyFrame,
                                      proxyPrerenderFrame:
                                        e.proxyPrerenderFrame,
                                      visible: r.visible,
                                    });
                                  })
                                  .then(function (e) {
                                    return ((r.proxyContainer = e), e);
                                  }),
                                w = r.driver.openOnClick
                                  ? r.open()
                                  : d.then(function (e) {
                                      return r.open(e);
                                    }),
                                v = h
                                  .hash({ proxyWin: w, proxyPrerenderFrame: l })
                                  .then(function (e) {
                                    return r.openPrerender(
                                      e.proxyWin,
                                      e.proxyPrerenderFrame,
                                    );
                                  }),
                                m = w.then(function (e) {
                                  return ((r.proxyWin = e), r.setProxyWin(e));
                                }),
                                y = h
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
                                b = h
                                  .hash({ proxyWin: w, windowName: g })
                                  .then(function (e) {
                                    return e.proxyWin.setName(e.windowName);
                                  }),
                                E = h
                                  .hash({
                                    proxyWin: w,
                                    url: c,
                                    windowName: b,
                                    prerender: y,
                                  })
                                  .then(function (e) {
                                    return e.proxyWin.setLocation(e.url);
                                  }),
                                x = w.then(function (e) {
                                  r.watchForClose(e);
                                }),
                                _ = h
                                  .hash({ container: p, prerender: y })
                                  .then(function () {
                                    return r.event.trigger(Kn.DISPLAY);
                                  }),
                                C = w.then(function (e) {
                                  return r.openBridge(e, a, t);
                                }),
                                P = E.then(function () {
                                  return r.runTimeout();
                                }),
                                j = u.then(function () {
                                  return r.event.trigger(Kn.RENDERED);
                                });
                              return h.hash({
                                init: u,
                                buildUrl: c,
                                onRender: s,
                                getProxyContainer: f,
                                openFrame: d,
                                openPrerenderFrame: l,
                                renderContainer: p,
                                open: w,
                                openPrerender: v,
                                setState: m,
                                prerender: y,
                                loadUrl: E,
                                buildWindowName: g,
                                setWindowName: b,
                                watchForClose: x,
                                onDisplay: _,
                                openBridge: C,
                                runTimeout: P,
                                onRendered: j,
                              });
                            })
                            .catch(function (e) {
                              return h.all([r.onError(e), r.destroy(e)]).then(
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
                          return h
                            .try(function () {
                              return Ee(e);
                            })
                            .then(function (e) {
                              return Jn(e);
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
                          var o = qn(e, t, this.getPropsForChild(t)),
                            i =
                              n === P()
                                ? { type: "uid", uid: r }
                                : { type: "raw", value: o };
                          if ("uid" === i.type) {
                            var a = Yn(window);
                            ((a.props = a.props || {}),
                              (a.props[r] = o),
                              this.clean.register(function () {
                                delete a.props[r];
                              }));
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
                            parentDomain: P(window),
                            tag: this.component.tag,
                            parent: this.getWindowRef(a, r, c, u),
                            props: this.getPropsRef(t, r, o, c),
                            exports: qn(t, o, this.buildParentExports(t)),
                          };
                        }),
                        (n.setProxyWin = function (e) {
                          var n = this;
                          return h.try(function () {
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
                              return e.resize({
                                width: n.width,
                                height: n.height,
                              });
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
                          return h.try(function () {
                            if (((e.visible = !0), e.proxyContainer))
                              return e.proxyContainer.get().then(Se);
                          });
                        }),
                        (n.hide = function () {
                          var e = this;
                          return h.try(function () {
                            if (((e.visible = !1), e.proxyContainer))
                              return e.proxyContainer.get().then(Oe);
                          });
                        }),
                        (n.setProps = function (e, n) {
                          (void 0 === n && (n = !1),
                            this.component.validate &&
                              this.component.validate({ props: e }));
                          var t = this.getHelpers();
                          !(function (e, n, t, r, o) {
                            (void 0 === o && (o = !1), ae(n, (t = t || {})));
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
                                l = r.close,
                                h = r.focus,
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
                                    (!se(g) && se(t[b]) && (g = t[b]),
                                    f.push(b)),
                                  y.value &&
                                    (g = y.value({
                                      props: n,
                                      state: d,
                                      close: l,
                                      focus: h,
                                      event: p,
                                      onError: w,
                                    })),
                                  !se(g) &&
                                    y.default &&
                                    (g = y.default({
                                      props: n,
                                      state: d,
                                      close: l,
                                      focus: h,
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
                            for (
                              var x = 0, _ = Object.keys(n);
                              x < _.length;
                              x++
                            ) {
                              var C = _[x],
                                P = e.getPropDefinition(C),
                                j = n[C];
                              P &&
                                (se(j) &&
                                  P.validate &&
                                  P.validate({ value: j, props: n }),
                                se(j) &&
                                  P.decorate &&
                                  (n[C] = P.decorate({
                                    value: j,
                                    props: n,
                                    state: d,
                                    close: l,
                                    focus: h,
                                    event: p,
                                    onError: w,
                                  })));
                            }
                            for (
                              var k = 0, S = e.getPropNames();
                              k < S.length;
                              k++
                            ) {
                              var O = S[k];
                              if (
                                !1 !== e.getPropDefinition(O).required &&
                                !se(n[O])
                              )
                                throw new Error(
                                  'Expected prop "' + O + '" to be defined',
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
                          h
                            .all(
                              o.map(function (r) {
                                var o = e[r];
                                if (o)
                                  return h
                                    .resolve()
                                    .then(function () {
                                      var e = n[r];
                                      if (e && o.queryParam) return e;
                                    })
                                    .then(function (e) {
                                      if (null != e)
                                        return h
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
                                                      "function" !=
                                                        typeof n[o] &&
                                                      (n[o] &&
                                                      Array.isArray(n[o]) &&
                                                      n[o].length &&
                                                      n[o].every(function (e) {
                                                        return "object" != u(e);
                                                      })
                                                        ? (r[
                                                            "" + t + o + "[]"
                                                          ] = n[o].join(","))
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
                                c && (t = t + "?" + c),
                                s && (t = t + "#" + s),
                                t
                              );
                            })(
                              (function (e) {
                                if (0 !== U(e).indexOf(w)) return e;
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
                              (i && i.sameDomain && !F(e, P(window))) ||
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
                                  .updateProps(
                                    n.getPropsForChild(n.getDomain()),
                                  )
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
                          return h.try(function () {
                            if (e.driver.openFrame)
                              return e.driver.openFrame.call(e);
                          });
                        }),
                        (n.openPrerenderFrame = function () {
                          var e = this;
                          return h.try(function () {
                            if (e.driver.openPrerenderFrame)
                              return e.driver.openPrerenderFrame.call(e);
                          });
                        }),
                        (n.open = function (e) {
                          var n = this;
                          return h
                            .try(function () {
                              n.component.log("open");
                              var t = n.props.window;
                              return t
                                ? (n.clean.register(function () {
                                    return t.close();
                                  }),
                                  Bn(t))
                                : n.driver.open.call(n, e);
                            })
                            .then(function (e) {
                              return ((n.proxyWin = e), e);
                            });
                        }),
                        (n.openPrerender = function (e, n) {
                          var t = this;
                          return h.try(function () {
                            return t.driver.openPrerender.call(t, e, n);
                          });
                        }),
                        (n.focus = function () {
                          var e = this;
                          return h.try(function () {
                            var n = e.proxyWin;
                            if (n)
                              return (
                                e.event.trigger(Kn.FOCUS),
                                n.focus().then(te)
                              );
                          });
                        }),
                        (n.delegate = function (e, n) {
                          var t = this;
                          this.component.log("delegate");
                          for (
                            var r = {},
                              o = 0,
                              i = this.component.getPropNames();
                            o < i.length;
                            o++
                          ) {
                            var a = i[o];
                            this.component.getPropDefinition(a).allowDelegate &&
                              (r[a] = this.props[a]);
                          }
                          for (
                            var u = Un(n, Zn + "_" + this.component.name, {
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
                                  return (
                                    t.clean.register(n.destroy),
                                    n.overrides
                                  );
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
                          if (n === P(window)) {
                            var o = Yn(window);
                            return (
                              (o.windows = o.windows || {}),
                              (o.windows[t] = window),
                              this.clean.register(function () {
                                delete o.windows[t];
                              }),
                              { type: "global", uid: t }
                            );
                          }
                          return r === $n.POPUP
                            ? { type: "opener" }
                            : { type: "parent", distance: I(window) };
                        }),
                        (n.watchForClose = function (e) {
                          var n = this,
                            t = !1;
                          return (
                            this.clean.register(function () {
                              t = !0;
                            }),
                            h
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
                            n = je(
                              window,
                              "unload",
                              re(function () {
                                (e.component.log("navigate_away"),
                                  e.destroy(
                                    new Error("Window navigated away"),
                                  ));
                              }),
                            );
                          this.clean.register(n.cancel);
                        }),
                        (n.runTimeout = function () {
                          var e = this;
                          return h.try(function () {
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
                          return h.try(function () {
                            (n.clean.set("child", e), n.initPromise.resolve());
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
                          return h.try(function () {
                            n.event.trigger(Kn.RESIZE, { width: t, height: r });
                          });
                        }),
                        (n.checkClose = function (e) {
                          var n = this;
                          return e.isClosed().then(function (t) {
                            return t
                              ? n.close()
                              : h
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
                          return h
                            .try(function () {
                              return (
                                e.component.log("close"),
                                e.event.trigger(Kn.CLOSE)
                              );
                            })
                            .then(function () {
                              return (
                                e.child &&
                                  e.child.close.fireAndForget().catch(te),
                                e.destroy(new Error("Window closed"), !1)
                              );
                            });
                        }),
                        (n.prerender = function (e, n) {
                          var t = this,
                            r = n.context,
                            o = n.uid;
                          return h.try(function () {
                            var n = t.component.prerenderTemplate;
                            if (n) {
                              var i = e.getWindow();
                              if (
                                i &&
                                j(i) &&
                                (function (e) {
                                  try {
                                    if (!e.location.href) return !0;
                                    if ("about:blank" === e.location.href)
                                      return !0;
                                  } catch (e) {}
                                  return !1;
                                })(i)
                              ) {
                                var a = (i = k(i)).document,
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
                                    l = void 0 !== d && d,
                                    h = c.element,
                                    p = void 0 === h ? "body" : h;
                                  (p = be(p, a)) &&
                                    (f || l) &&
                                    Te(
                                      p,
                                      function (e) {
                                        t.resize({
                                          width: f ? e.width : void 0,
                                          height: l ? e.height : void 0,
                                        });
                                      },
                                      { width: f, height: l, win: i },
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
                          return h
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
                                  u || Oe(r),
                                  (function (e, n) {
                                    e.appendChild(n);
                                  })(n, r),
                                  t.clean.register(function () {
                                    return De(r);
                                  }),
                                  (t.proxyContainer = Jn(r)),
                                  Jn(r)
                                );
                            });
                        }),
                        (n.destroy = function (e, n) {
                          var t = this;
                          return (
                            void 0 === n && (n = !0),
                            h
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
                            h.try(function () {
                              if (-1 === t.handledErrors.indexOf(e))
                                return (
                                  t.handledErrors.push(e),
                                  t.initPromise.asyncReject(e),
                                  n ? t.event.trigger(Kn.ERROR, e) : void 0
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
                        ((this.component = void 0),
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
                          (this.clean = le(this)),
                          (this.focus = ut.prototype.focus),
                          (this.resize = ut.prototype.resize),
                          (this.renderTemplate = ut.prototype.renderTemplate),
                          (this.props = {}));
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
                        ((this.close = t.overrides.close),
                          (this.onError = t.overrides.onError),
                          (this.event = t.overrides.event),
                          this.component.registerActiveComponent(this),
                          this.clean.register(function () {
                            return r.component.destroyActiveComponent(r);
                          }),
                          this.watchForSourceClose(n));
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
                            t = q(
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
                                ((e[o] = function () {
                                  return ut.prototype[o].apply(n, arguments);
                                }),
                                  (e[o].__name__ = o));
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
                        a.on(Kn.RENDERED, function () {
                          (r.classList.remove(st),
                            r.classList.add(ft),
                            t.classList.remove(ft),
                            t.classList.add(st),
                            setTimeout(function () {
                              De(r);
                            }, 1));
                        }),
                        a.on(Kn.RESIZE, function (e) {
                          var n = e.width,
                            t = e.height;
                          ("number" == typeof n && (f.style.width = Ae(n)),
                            "number" == typeof t && (f.style.height = Ae(t)));
                        }),
                        f
                      );
                    }
                  }
                  function lt(e) {
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
                  var ht = function () {
                      return te;
                    },
                    pt = function (e) {
                      return re(e.value);
                    },
                    wt = (function () {
                      function e(e) {
                        ((this.tag = void 0),
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
                                !Ne(e.dimensions.width)
                              )
                                throw new Error(
                                  "Expected options.dimensions.width to be a px or % string value",
                                );
                              if (
                                e.dimensions &&
                                !ze(e.dimensions.height) &&
                                !Ne(e.dimensions.height)
                              )
                                throw new Error(
                                  "Expected options.dimensions.height to be a px or % string value",
                                );
                            }
                            if (
                              e.defaultContext &&
                              e.defaultContext !== $n.IFRAME &&
                              e.defaultContext !== $n.POPUP
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
                            e.allowedParentDomains || "*"));
                        var n = Yn();
                        if (
                          ((n.components = n.components || {}),
                          n.components[this.tag])
                        )
                          throw new Error(
                            "Can not register multiple components with the same tag: " +
                              this.tag,
                          );
                        ((this.builtinProps = {
                          window: {
                            type: "object",
                            sendToChild: !1,
                            required: !1,
                            allowDelegate: !0,
                            validate: function (e) {
                              var n = e.value;
                              if (!H(n) && !Cn.isProxyWindow(n))
                                throw new Error(
                                  "Expected Window or ProxyWindow",
                                );
                              if (H(n)) {
                                if (M(n)) throw new Error("Window is closed");
                                if (!j(n))
                                  throw new Error("Window is not same domain");
                              }
                            },
                            decorate: function (e) {
                              return Bn(e.value);
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
                            default: ht,
                            decorate: pt,
                          },
                          onRendered: {
                            type: "function",
                            required: !1,
                            sendToChild: !1,
                            default: ht,
                            decorate: pt,
                          },
                          onRender: {
                            type: "function",
                            required: !1,
                            sendToChild: !1,
                            default: ht,
                            decorate: pt,
                          },
                          onClose: {
                            type: "function",
                            required: !1,
                            sendToChild: !1,
                            allowDelegate: !0,
                            default: ht,
                            decorate: pt,
                          },
                          onResize: {
                            type: "function",
                            required: !1,
                            sendToChild: !1,
                            allowDelegate: !0,
                            default: ht,
                          },
                          onFocus: {
                            type: "function",
                            required: !1,
                            sendToChild: !1,
                            allowDelegate: !0,
                            default: ht,
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
                            default: ht,
                            childDecorate: function (e) {
                              return e.onProps;
                            },
                          },
                        }),
                          (this.props = e.props || {}));
                        var t = e.dimensions || {},
                          r = t.width,
                          o = t.height;
                        ((this.dimensions = {
                          width: void 0 === r ? "300px" : r,
                          height: void 0 === o ? "150px" : o,
                        }),
                          (this.url = e.url),
                          (this.domain = e.domain),
                          (this.bridgeUrl = e.bridgeUrl),
                          (this.attributes = e.attributes || {}),
                          (this.attributes.iframe =
                            this.attributes.iframe || {}),
                          (this.attributes.popup = this.attributes.popup || {}),
                          (this.defaultContext = e.defaultContext || $n.IFRAME),
                          (this.autoResize = e.autoResize),
                          (this.containerTemplate = e.containerTemplate
                            ? e.containerTemplate
                            : dt),
                          (this.prerenderTemplate = e.prerenderTemplate
                            ? e.prerenderTemplate
                            : lt),
                          (this.validate = e.validate),
                          (this.logger = e.logger || {
                            debug: te,
                            info: te,
                            warn: te,
                            error: te,
                          }),
                          this.registerChild(),
                          this.listenDelegate(),
                          (n.components[this.tag] = this));
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
                          return ((this.propNames = e), e);
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
                          (Fn(Qn + "_" + this.name, function () {
                            return !0;
                          }),
                            Fn(Zn + "_" + this.name, function (n) {
                              var t = n.data;
                              return new ct(e, n.source, {
                                context: t.context,
                                props: t.props,
                                overrides: t.overrides,
                              }).getDelegate();
                            }));
                        }),
                        (n.canRenderTo = function (e) {
                          return Un(e, Qn + "_" + this.name)
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
                            : U(this.getUrl(e));
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
                            e && e.tag === this.tag && e.childDomain === P(),
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
                          if (e === $n.POPUP) return "body";
                          throw new Error(
                            "Expected element to be passed to render iframe",
                          );
                        }),
                        (n.getDefaultContext = function (e, n) {
                          var t = this;
                          return h.try(function () {
                            if (n.window) return Bn(n.window).getType();
                            if (e) {
                              if (e !== $n.IFRAME && e !== $n.POPUP)
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
                              return h
                                .try(function () {
                                  if (!H(r))
                                    throw new Error(
                                      "Must pass window to renderTo",
                                    );
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
                            if (!R(window, e))
                              throw new Error(
                                "Can only renderTo an adjacent frame",
                              );
                            var r = P();
                            if (!F(n, r) && !j(e))
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
                          var n = Yn();
                          ((n.activeComponents = n.activeComponents || []),
                            n.activeComponents.push(e));
                        }),
                        (n.destroyActiveComponent = function (e) {
                          var n = Yn();
                          ((n.activeComponents = n.activeComponents || []),
                            n.activeComponents.splice(
                              n.activeComponents.indexOf(e),
                              1,
                            ));
                        }),
                        e
                      );
                    })();
                  function vt(e) {
                    var n, t, r;
                    He().initialized ||
                      ((He().initialized = !0),
                      (function (e) {
                        var n = e.on,
                          t = e.send,
                          r = He();
                        r.receiveMessage =
                          r.receiveMessage ||
                          function (e) {
                            return Rn(e, { on: n, send: t });
                          };
                      })({ on: Fn, send: Un }),
                      (t = (n = { on: Fn, send: Un }).on),
                      (r = n.send),
                      Ye().getOrSet("postMessageListener", function () {
                        return je(window, "message", function (e) {
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
                              Rn(
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
                        Ye("builtinListeners").getOrSet(
                          "helloListener",
                          function () {
                            var e = n(Ie, { domain: Re }, function (e) {
                                return (
                                  Ve(e.source, { domain: e.origin }),
                                  { instanceID: Qe() }
                                );
                              }),
                              r = A();
                            return (r && Xe(r, { send: t }).catch(te), e);
                          },
                        );
                      })({ on: Fn, send: Un }));
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
                      n = Yn();
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
                    return h.all(e).then(te);
                  }
                  var yt = mt;
                  function gt() {
                    var e;
                    (mt(),
                      delete window.__zoid_9_0_34__,
                      (function () {
                        for (
                          var e = Ye("responseListeners"), n = 0, t = e.keys();
                          n < t.length;
                          n++
                        ) {
                          var r = t[n],
                            o = e.get(r);
                          (o && (o.cancelled = !0), e.del(r));
                        }
                      })(),
                      (e = Ye().get("postMessageListener")) && e.cancel(),
                      delete window.__post_robot_10_0_22__);
                  }
                  (t.d(n, "PopupOpenError", function () {
                    return xe;
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
                      return $n;
                    }),
                    t.d(n, "EVENT", function () {
                      return Kn;
                    }));
                },
              ]);
            }),
            "object" == u(n) && "object" == u(e)
              ? (e.exports = a())
              : ((o = []),
                void 0 ===
                  (i = "function" == typeof (r = a) ? r.apply(n, o) : r) ||
                  (e.exports = i)));
        },
      },
      n = {};
    function t(r) {
      var o = n[r];
      if (void 0 !== o) return o.exports;
      var i = (n[r] = { id: r, loaded: !1, exports: {} });
      return (
        e[r].call(i.exports, i, i.exports, t),
        (i.loaded = !0),
        i.exports
      );
    }
    ((t.d = (e, n) => {
      for (var r in n)
        t.o(n, r) &&
          !t.o(e, r) &&
          Object.defineProperty(e, r, { enumerable: !0, get: n[r] });
    }),
      (t.o = (e, n) => Object.prototype.hasOwnProperty.call(e, n)),
      (t.r = (e) => {
        ("undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(e, "__esModule", { value: !0 }));
      }),
      (t.nmd = (e) => ((e.paths = []), e.children || (e.children = []), e)));
    var r = {};
    return (
      (() => {
        "use strict";
        (t.r(r), t.d(r, { DiscoveryComponent: () => i }));
        var e = t(74119),
          n = t(49880);
        function o(e) {
          (void 0 === e.props.color && (e.props.color = "#216e93"),
            void 0 === e.props.backgroundColor &&
              (e.props.backgroundColor = "#FFFFFF"),
            void 0 === e.dimensions.width && (e.dimensions.width = "350px"),
            void 0 === e.dimensions.height && (e.dimensions.height = "85px"),
            (e.props.dimensions = e.dimensions));
        }
        var i = e.create({
          tag: "thiss-cta",
          url: "${BASE_URL}cta/",
          defaultEnv: "thiss",
          dimensions: { width: "350px", height: "85px" },
          defaultLogLevel: "${LOGLEVEL}",
          autoResize: { width: !1, height: !1 },
          contexts: { iframe: !0, popup: !1 },
          backgroundColor: "#FFFFFF",
          color: "#0079ff",
          locale: null,
          containerTemplate: function (e) {
            (o(e),
              e.frame.setAttribute("title", "SeamlessAccess Button"),
              e.frame.setAttribute("aria-label", "SeamlessAccess Button"),
              e.frame.setAttribute("role", "presentation"));
            var t = e.uid,
              r = e.doc,
              i = e.props,
              a = e.dimensions.height,
              u = e.dimensions.width,
              c = e.frame,
              s = e.prerenderFrame,
              f = e.event,
              d = r.createElement("div");
            d.setAttribute("id", t);
            var l = r.createElement("style");
            return (
              i.cspNonce && l.setAttribute("nonce", i.cspNonce),
              l.appendChild(
                r.createTextNode(
                  "\n        #"
                    .concat(
                      t,
                      " {\n            display: inline-block;\n            position: relative;\n            width: ",
                    )
                    .concat(u, ";\n            height: ")
                    .concat(a, ";\n        }\n        #")
                    .concat(
                      t,
                      " > iframe {\n            display: inline-block;\n            position: absolute;\n            width: 100%;\n            height: 100%;\n            top: 0;\n            left: 0;\n            /* transition: opacity .2s ease-in-out; */\n        }\n        #",
                    )
                    .concat(
                      t,
                      " > iframe.invisible {\n            opacity: 0;\n        }\n        #",
                    )
                    .concat(
                      t,
                      " > iframe.visible {\n            opacity: 1;\n    }\n    ",
                    ),
                ),
              ),
              d.appendChild(c),
              d.appendChild(s),
              d.appendChild(l),
              s.classList.add("visible"),
              c.classList.add("invisible"),
              f.on("zoid-rendered", function () {
                (s.classList.remove("visible"),
                  s.classList.add("invisible"),
                  c.classList.remove("invisible"),
                  c.classList.add("visible"),
                  setTimeout(function () {
                    (0, n.fq6)(s);
                  }, 1));
              }),
              d
            );
          },
          prerenderTemplate: function (e) {
            var n = e.props.loginInitiatorURL || e.props.loginHandlerURL,
              r = e.props.discoveryRequest,
              i = e.props.discoveryResponse,
              a = e.props.entityID,
              u = e.props.trustProfile;
            if ((r || (r = n), i || (i = n), r !== i && "string" == typeof r)) {
              var c = "return=".concat(encodeURIComponent(i));
              (a &&
                (c = "".concat(c, "&entityID=").concat(encodeURIComponent(a))),
                a && u && (c = "".concat(c, "&trustProfile=").concat(u)),
                (r =
                  new URL(r).searchParams.size > 0
                    ? "".concat(r, "&").concat(c)
                    : "".concat(r, "?").concat(c)));
            }
            if ("function" != typeof r) {
              var s = r;
              r = function () {
                window.top.location.href = s;
              };
            }
            o(e);
            var f = e.doc.createElement("html"),
              d = e.props;
            f.innerHTML = (function (e) {
              var n;
              return (
                '<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <style>\n        :root {\n          --white: #ffffff;\n          --warm-grey: #767676;\n          --primary-blue: ' +
                (null == (n = e.color) ? "" : n) +
                ';\n        }\n        body {\n            box-sizing: border-box;\n            padding: 0;\n            margin: 0;\n            /* -webkit-transform:translate3d(0,0,0); */\n        }\n        .ra21CTALoadingContainer {\n            float: top;\n            z-index: -999;\n            position: relative;\n        }\n        .ra21CTAMain {\n            align: top;\n            float: bottom;\n            font-family: \'Helvetica\', sans-serif;\n            font-size: 12px;\n            font-weight: normal;\n            font-style: normal;\n            font-stretch: normal;\n            line-height: 1.67;\n            letter-spacing: normal;\n            text-align: center;\n            background-color: var(--primary-blue);\n            border-radius: 5px;\n        }\n\n        .ra21-button {\n          background-color: var(--primary-blue);\n          border-radius: 5px;\n          color: var(--warm-grey);\n          cursor: pointer;\n          display: flex;\n          margin-bottom: 5px;\n          margin-top: 10px\n          padding: 9px;\n          text-decoration: none;\n        }\n\n        .ra21-button-logo-wrap {\n            text-align: center;\n            max-width: 50px;\n            border-right: 1px solid #FFFFFF;\n            padding: 5px 12px 5px 7px;\n        }\n\n        .ra21-button-logo {\n          width: 30px;\n          vertical-align: middle;\n        }\n\n        .ra21-button-text {\n          padding-left: 10px;\n          text-align: center;\n          width: 85%;\n          color: var(--white);\n        }\n\n        .ra21-button-text-primary {\n          font-family: \'Helvetica\', sans-serif;\n          font-size: 14px;\n          font-weight: 700;\n          font-style: normal;\n          font-stretch: normal;\n          line-height: 1.4;\n          letter-spacing: normal;\n        }\n\n        .ra21-button-text-secondary {\n          /* Zep */\n          font-family: \'Helvetica\', sans-serif;\n          font-size: 13px;\n          font-weight: normal;\n          font-style: normal;\n          font-stretch: normal;\n          line-height: 1.4;\n          letter-spacing: normal;\n        }\n\n        .ra21-access-text {\n          cursor: pointer;\n          text-align: center;\n\n          /* Zep */\n          font-family: \'Helvetica\', sans-serif;\n          font-size: 13px;\n          font-weight: normal;\n          font-style: normal;\n          font-stretch: normal;\n          line-height: 1.46;\n          letter-spacing: normal;\n          color: var(--primary-blue);\n        }\n        .align-items-center {\n            -ms-flex-align: center!important;\n            align-items: center!important;\n        }\n        .justify-content-center {\n            -ms-flex-pack: center!important;\n            justify-content: center!important;\n        }\n        .d-flex { display: flex!important; }\n        .ra21-choose-another {\n            /* height: 20px;\n            min-height: 20px; */\n        }\n        a, a:hover { text-decoration: none; }\n\n    </style>\n</head>\n<body>\n    <a id="fallbacklink" href="#"><div class="ra21CTALoadingContainer">\n        <div class="ra21CTAMain ra21-button">\n            <div class="ra21-button-logo-wrap">\n                <img class="ra21-button-logo" src="' +
                (null == (n = t(24365)) ? "" : n) +
                '">\n            </div>\n            <div class="d-flex justify-content-center align-items-center ra21-button-text">\n                <div class="ra21-button-text-primary">Access through your institution</div>\n            </div>\n        </div>\n        <div class="ra21-choose-another"></div>\n    </div></a>\n</body>\n</html>\n'
              );
            })(d);
            var l = f.querySelector("#fallbacklink");
            return (
              null === l && (l = f),
              l.addEventListener("click", function (e) {
                (e.preventDefault(), r());
              }),
              f
            );
          },
        });
        i.render = function (e, n) {
          return i(e).render(n);
        };
      })(),
      r
    );
  })(),
);
