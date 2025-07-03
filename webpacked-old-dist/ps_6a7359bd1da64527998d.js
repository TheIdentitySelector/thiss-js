/*! For license information please see ps_6a7359bd1da64527998d.js.LICENSE.txt */
!(function (t, e) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
      ? define("ps", [], e)
      : "object" == typeof exports
        ? (exports.ps = e())
        : (t.ps = e());
})(this, () =>
  (() => {
    var t,
      e,
      r,
      n,
      o,
      i = {
        31678: (t, e, r) => {
          (t.exports = r(47252)), (t.exports.default = t.exports);
        },
        53048: (t, e, r) => {
          "use strict";
          r.a(
            t,
            async (t, n) => {
              try {
                r.r(e), r.d(e, { get_global_institutions: () => I }), r(85990);
                var o = r(99614),
                  i = t([o]);
                function v(t, e) {
                  var r =
                    ("undefined" != typeof Symbol && t[Symbol.iterator]) ||
                    t["@@iterator"];
                  if (!r) {
                    if (
                      Array.isArray(t) ||
                      (r = m(t)) ||
                      (e && t && "number" == typeof t.length)
                    ) {
                      r && (t = r);
                      var n = 0,
                        o = function () {};
                      return {
                        s: o,
                        n: function () {
                          return n >= t.length
                            ? { done: !0 }
                            : { done: !1, value: t[n++] };
                        },
                        e: function (t) {
                          throw t;
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
                    c = !1;
                  return {
                    s: function () {
                      r = r.call(t);
                    },
                    n: function () {
                      var t = r.next();
                      return (a = t.done), t;
                    },
                    e: function (t) {
                      (c = !0), (i = t);
                    },
                    f: function () {
                      try {
                        a || null == r.return || r.return();
                      } finally {
                        if (c) throw i;
                      }
                    },
                  };
                }
                function m(t, e) {
                  if (t) {
                    if ("string" == typeof t) return g(t, e);
                    var r = {}.toString.call(t).slice(8, -1);
                    return (
                      "Object" === r &&
                        t.constructor &&
                        (r = t.constructor.name),
                      "Map" === r || "Set" === r
                        ? Array.from(t)
                        : "Arguments" === r ||
                            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                          ? g(t, e)
                          : void 0
                    );
                  }
                }
                function g(t, e) {
                  (null == e || e > t.length) && (e = t.length);
                  for (var r = 0, n = Array(e); r < e; r++) n[r] = t[r];
                  return n;
                }
                function w() {
                  w = function () {
                    return e;
                  };
                  var t,
                    e = {},
                    r = Object.prototype,
                    n = r.hasOwnProperty,
                    o =
                      Object.defineProperty ||
                      function (t, e, r) {
                        t[e] = r.value;
                      },
                    i = "function" == typeof Symbol ? Symbol : {},
                    a = i.iterator || "@@iterator",
                    c = i.asyncIterator || "@@asyncIterator",
                    s = i.toStringTag || "@@toStringTag";
                  function u(t, e, r) {
                    return (
                      Object.defineProperty(t, e, {
                        value: r,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                      }),
                      t[e]
                    );
                  }
                  try {
                    u({}, "");
                  } catch (t) {
                    u = function (t, e, r) {
                      return (t[e] = r);
                    };
                  }
                  function f(t, e, r, n) {
                    var i = e && e.prototype instanceof m ? e : m,
                      a = Object.create(i.prototype),
                      c = new P(n || []);
                    return o(a, "_invoke", { value: I(t, r, c) }), a;
                  }
                  function l(t, e, r) {
                    try {
                      return { type: "normal", arg: t.call(e, r) };
                    } catch (t) {
                      return { type: "throw", arg: t };
                    }
                  }
                  e.wrap = f;
                  var h = "suspendedStart",
                    p = "suspendedYield",
                    d = "executing",
                    y = "completed",
                    v = {};
                  function m() {}
                  function g() {}
                  function b() {}
                  var x = {};
                  u(x, a, function () {
                    return this;
                  });
                  var S = Object.getPrototypeOf,
                    k = S && S(S(C([])));
                  k && k !== r && n.call(k, a) && (x = k);
                  var E = (b.prototype = m.prototype = Object.create(x));
                  function A(t) {
                    ["next", "throw", "return"].forEach(function (e) {
                      u(t, e, function (t) {
                        return this._invoke(e, t);
                      });
                    });
                  }
                  function O(t, e) {
                    function r(o, i, a, c) {
                      var s = l(t[o], t, i);
                      if ("throw" !== s.type) {
                        var u = s.arg,
                          f = u.value;
                        return f && "object" == _(f) && n.call(f, "__await")
                          ? e.resolve(f.__await).then(
                              function (t) {
                                r("next", t, a, c);
                              },
                              function (t) {
                                r("throw", t, a, c);
                              },
                            )
                          : e.resolve(f).then(
                              function (t) {
                                (u.value = t), a(u);
                              },
                              function (t) {
                                return r("throw", t, a, c);
                              },
                            );
                      }
                      c(s.arg);
                    }
                    var i;
                    o(this, "_invoke", {
                      value: function (t, n) {
                        function o() {
                          return new e(function (e, o) {
                            r(t, n, e, o);
                          });
                        }
                        return (i = i ? i.then(o, o) : o());
                      },
                    });
                  }
                  function I(e, r, n) {
                    var o = h;
                    return function (i, a) {
                      if (o === d) throw Error("Generator is already running");
                      if (o === y) {
                        if ("throw" === i) throw a;
                        return { value: t, done: !0 };
                      }
                      for (n.method = i, n.arg = a; ; ) {
                        var c = n.delegate;
                        if (c) {
                          var s = L(c, n);
                          if (s) {
                            if (s === v) continue;
                            return s;
                          }
                        }
                        if ("next" === n.method) n.sent = n._sent = n.arg;
                        else if ("throw" === n.method) {
                          if (o === h) throw ((o = y), n.arg);
                          n.dispatchException(n.arg);
                        } else
                          "return" === n.method && n.abrupt("return", n.arg);
                        o = d;
                        var u = l(e, r, n);
                        if ("normal" === u.type) {
                          if (((o = n.done ? y : p), u.arg === v)) continue;
                          return { value: u.arg, done: n.done };
                        }
                        "throw" === u.type &&
                          ((o = y), (n.method = "throw"), (n.arg = u.arg));
                      }
                    };
                  }
                  function L(e, r) {
                    var n = r.method,
                      o = e.iterator[n];
                    if (o === t)
                      return (
                        (r.delegate = null),
                        ("throw" === n &&
                          e.iterator.return &&
                          ((r.method = "return"),
                          (r.arg = t),
                          L(e, r),
                          "throw" === r.method)) ||
                          ("return" !== n &&
                            ((r.method = "throw"),
                            (r.arg = new TypeError(
                              "The iterator does not provide a '" +
                                n +
                                "' method",
                            )))),
                        v
                      );
                    var i = l(o, e.iterator, r.arg);
                    if ("throw" === i.type)
                      return (
                        (r.method = "throw"),
                        (r.arg = i.arg),
                        (r.delegate = null),
                        v
                      );
                    var a = i.arg;
                    return a
                      ? a.done
                        ? ((r[e.resultName] = a.value),
                          (r.next = e.nextLoc),
                          "return" !== r.method &&
                            ((r.method = "next"), (r.arg = t)),
                          (r.delegate = null),
                          v)
                        : a
                      : ((r.method = "throw"),
                        (r.arg = new TypeError(
                          "iterator result is not an object",
                        )),
                        (r.delegate = null),
                        v);
                  }
                  function N(t) {
                    var e = { tryLoc: t[0] };
                    1 in t && (e.catchLoc = t[1]),
                      2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
                      this.tryEntries.push(e);
                  }
                  function j(t) {
                    var e = t.completion || {};
                    (e.type = "normal"), delete e.arg, (t.completion = e);
                  }
                  function P(t) {
                    (this.tryEntries = [{ tryLoc: "root" }]),
                      t.forEach(N, this),
                      this.reset(!0);
                  }
                  function C(e) {
                    if (e || "" === e) {
                      var r = e[a];
                      if (r) return r.call(e);
                      if ("function" == typeof e.next) return e;
                      if (!isNaN(e.length)) {
                        var o = -1,
                          i = function r() {
                            for (; ++o < e.length; )
                              if (n.call(e, o))
                                return (r.value = e[o]), (r.done = !1), r;
                            return (r.value = t), (r.done = !0), r;
                          };
                        return (i.next = i);
                      }
                    }
                    throw new TypeError(_(e) + " is not iterable");
                  }
                  return (
                    (g.prototype = b),
                    o(E, "constructor", { value: b, configurable: !0 }),
                    o(b, "constructor", { value: g, configurable: !0 }),
                    (g.displayName = u(b, s, "GeneratorFunction")),
                    (e.isGeneratorFunction = function (t) {
                      var e = "function" == typeof t && t.constructor;
                      return (
                        !!e &&
                        (e === g ||
                          "GeneratorFunction" === (e.displayName || e.name))
                      );
                    }),
                    (e.mark = function (t) {
                      return (
                        Object.setPrototypeOf
                          ? Object.setPrototypeOf(t, b)
                          : ((t.__proto__ = b), u(t, s, "GeneratorFunction")),
                        (t.prototype = Object.create(E)),
                        t
                      );
                    }),
                    (e.awrap = function (t) {
                      return { __await: t };
                    }),
                    A(O.prototype),
                    u(O.prototype, c, function () {
                      return this;
                    }),
                    (e.AsyncIterator = O),
                    (e.async = function (t, r, n, o, i) {
                      void 0 === i && (i = Promise);
                      var a = new O(f(t, r, n, o), i);
                      return e.isGeneratorFunction(r)
                        ? a
                        : a.next().then(function (t) {
                            return t.done ? t.value : a.next();
                          });
                    }),
                    A(E),
                    u(E, s, "Generator"),
                    u(E, a, function () {
                      return this;
                    }),
                    u(E, "toString", function () {
                      return "[object Generator]";
                    }),
                    (e.keys = function (t) {
                      var e = Object(t),
                        r = [];
                      for (var n in e) r.push(n);
                      return (
                        r.reverse(),
                        function t() {
                          for (; r.length; ) {
                            var n = r.pop();
                            if (n in e) return (t.value = n), (t.done = !1), t;
                          }
                          return (t.done = !0), t;
                        }
                      );
                    }),
                    (e.values = C),
                    (P.prototype = {
                      constructor: P,
                      reset: function (e) {
                        if (
                          ((this.prev = 0),
                          (this.next = 0),
                          (this.sent = this._sent = t),
                          (this.done = !1),
                          (this.delegate = null),
                          (this.method = "next"),
                          (this.arg = t),
                          this.tryEntries.forEach(j),
                          !e)
                        )
                          for (var r in this)
                            "t" === r.charAt(0) &&
                              n.call(this, r) &&
                              !isNaN(+r.slice(1)) &&
                              (this[r] = t);
                      },
                      stop: function () {
                        this.done = !0;
                        var t = this.tryEntries[0].completion;
                        if ("throw" === t.type) throw t.arg;
                        return this.rval;
                      },
                      dispatchException: function (e) {
                        if (this.done) throw e;
                        var r = this;
                        function o(n, o) {
                          return (
                            (c.type = "throw"),
                            (c.arg = e),
                            (r.next = n),
                            o && ((r.method = "next"), (r.arg = t)),
                            !!o
                          );
                        }
                        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                          var a = this.tryEntries[i],
                            c = a.completion;
                          if ("root" === a.tryLoc) return o("end");
                          if (a.tryLoc <= this.prev) {
                            var s = n.call(a, "catchLoc"),
                              u = n.call(a, "finallyLoc");
                            if (s && u) {
                              if (this.prev < a.catchLoc)
                                return o(a.catchLoc, !0);
                              if (this.prev < a.finallyLoc)
                                return o(a.finallyLoc);
                            } else if (s) {
                              if (this.prev < a.catchLoc)
                                return o(a.catchLoc, !0);
                            } else {
                              if (!u)
                                throw Error(
                                  "try statement without catch or finally",
                                );
                              if (this.prev < a.finallyLoc)
                                return o(a.finallyLoc);
                            }
                          }
                        }
                      },
                      abrupt: function (t, e) {
                        for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                          var o = this.tryEntries[r];
                          if (
                            o.tryLoc <= this.prev &&
                            n.call(o, "finallyLoc") &&
                            this.prev < o.finallyLoc
                          ) {
                            var i = o;
                            break;
                          }
                        }
                        i &&
                          ("break" === t || "continue" === t) &&
                          i.tryLoc <= e &&
                          e <= i.finallyLoc &&
                          (i = null);
                        var a = i ? i.completion : {};
                        return (
                          (a.type = t),
                          (a.arg = e),
                          i
                            ? ((this.method = "next"),
                              (this.next = i.finallyLoc),
                              v)
                            : this.complete(a)
                        );
                      },
                      complete: function (t, e) {
                        if ("throw" === t.type) throw t.arg;
                        return (
                          "break" === t.type || "continue" === t.type
                            ? (this.next = t.arg)
                            : "return" === t.type
                              ? ((this.rval = this.arg = t.arg),
                                (this.method = "return"),
                                (this.next = "end"))
                              : "normal" === t.type && e && (this.next = e),
                          v
                        );
                      },
                      finish: function (t) {
                        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                          var r = this.tryEntries[e];
                          if (r.finallyLoc === t)
                            return (
                              this.complete(r.completion, r.afterLoc), j(r), v
                            );
                        }
                      },
                      catch: function (t) {
                        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                          var r = this.tryEntries[e];
                          if (r.tryLoc === t) {
                            var n = r.completion;
                            if ("throw" === n.type) {
                              var o = n.arg;
                              j(r);
                            }
                            return o;
                          }
                        }
                        throw Error("illegal catch attempt");
                      },
                      delegateYield: function (e, r, n) {
                        return (
                          (this.delegate = {
                            iterator: C(e),
                            resultName: r,
                            nextLoc: n,
                          }),
                          "next" === this.method && (this.arg = t),
                          v
                        );
                      },
                    }),
                    e
                  );
                }
                function b(t, e, r, n, o, i, a) {
                  try {
                    var c = t[i](a),
                      s = c.value;
                  } catch (t) {
                    return void r(t);
                  }
                  c.done ? e(s) : Promise.resolve(s).then(n, o);
                }
                function x(t) {
                  return function () {
                    var e = this,
                      r = arguments;
                    return new Promise(function (n, o) {
                      var i = t.apply(e, r);
                      function a(t) {
                        b(i, n, o, a, c, "next", t);
                      }
                      function c(t) {
                        b(i, n, o, a, c, "throw", t);
                      }
                      a(void 0);
                    });
                  };
                }
                function _(t) {
                  return (
                    (_ =
                      "function" == typeof Symbol &&
                      "symbol" == typeof Symbol.iterator
                        ? function (t) {
                            return typeof t;
                          }
                        : function (t) {
                            return t &&
                              "function" == typeof Symbol &&
                              t.constructor === Symbol &&
                              t !== Symbol.prototype
                              ? "symbol"
                              : typeof t;
                          }),
                    _(t)
                  );
                }
                o = (i.then ? (await i)() : i)[0];
                var a = r(31678),
                  c = [],
                  s = !1;
                if (
                  ((c =
                    "$WHITELIST"
                      .split(",")
                      .map(function (t) {
                        return t.trim();
                      })),
                  "MISSING_ENV_VAR".EXPIRE_ENABLED)
                ) {
                  var u = "MISSING_ENV_VAR".EXPIRE_ENABLED.toLowerCase();
                  s = "true" === u || "on" === u || "1" === u;
                }
                await (0, o.Ay)(), await (0, o.Ay)(!0);
                var f = await (0, o.vZ)(),
                  l = !1,
                  h = !1,
                  p = !1,
                  d = 1e3 * parseInt("MISSING_ENV_VAR".ITEM_TTL || "3600");
                function S() {
                  return Date.now();
                }
                function k(t, e) {
                  return (
                    t.last_refresh,
                    void 0 !== t &&
                      void 0 !== t.last_refresh &&
                      t.last_refresh + 3e4 + d > e
                  );
                }
                function E(t) {
                  return A.apply(this, arguments);
                }
                function A() {
                  return (A = x(
                    w().mark(function t(e) {
                      var r, n, i, a, c, s, u, f, l, h, p;
                      return w().wrap(
                        function (t) {
                          for (;;)
                            switch ((t.prev = t.next)) {
                              case 0:
                                (r = e.keys().filter(function (t) {
                                  return void 0 !== t && "_name" !== t;
                                })),
                                  (n = []),
                                  (i = v(r)),
                                  (t.prev = 3),
                                  i.s();
                              case 5:
                                if ((a = i.n()).done) {
                                  t.next = 13;
                                  break;
                                }
                                return (
                                  (c = a.value), (t.next = 9), (0, o.H8)(e, c)
                                );
                              case 9:
                                (s = t.sent), n.push(s);
                              case 11:
                                t.next = 5;
                                break;
                              case 13:
                                t.next = 18;
                                break;
                              case 15:
                                (t.prev = 15), (t.t0 = t.catch(3)), i.e(t.t0);
                              case 18:
                                return (t.prev = 18), i.f(), t.finish(18);
                              case 21:
                                n
                                  .sort(function (t, e) {
                                    return e.last_use - t.last_use;
                                  })
                                  .slice(3)
                                  .forEach(function (t) {
                                    e.remove(t.entity.entity_id.hexEncode());
                                  }),
                                  (u = S()),
                                  (n = []),
                                  (f = v(r)),
                                  (t.prev = 25),
                                  f.s();
                              case 27:
                                if ((l = f.n()).done) {
                                  t.next = 35;
                                  break;
                                }
                                return (
                                  (h = l.value), (t.next = 31), (0, o.H8)(e, h)
                                );
                              case 31:
                                (p = t.sent), n.push(p);
                              case 33:
                                t.next = 27;
                                break;
                              case 35:
                                t.next = 40;
                                break;
                              case 37:
                                (t.prev = 37), (t.t1 = t.catch(25)), f.e(t.t1);
                              case 40:
                                return (t.prev = 40), f.f(), t.finish(40);
                              case 43:
                                n.forEach(function (t) {
                                  k(t, u) ||
                                    e.remove(t.entity.entity_id.hexEncode());
                                });
                              case 44:
                              case "end":
                                return t.stop();
                            }
                        },
                        t,
                        null,
                        [
                          [3, 15, 18, 21],
                          [25, 37, 40, 43],
                        ],
                      );
                    }),
                  )).apply(this, arguments);
                }
                function O(t) {
                  if (
                    c &&
                    c.length > 0 &&
                    !c.some(function (e) {
                      return t.origin.endsWith(e);
                    })
                  )
                    throw "Access denied from ".concat(t.origin);
                }
                function I(t) {
                  return L.apply(this, arguments);
                }
                function L() {
                  return (L = x(
                    w().mark(function t(e) {
                      var r, n, i, a, c, s, u;
                      return w().wrap(
                        function (t) {
                          for (;;)
                            switch ((t.prev = t.next)) {
                              case 0:
                                (e = e || "$DEFAULT_CONTEXT"),
                                  (r = (0, o.ej)(e)),
                                  (n = r.keys().filter(function (t) {
                                    return void 0 !== t && "_name" !== t;
                                  })),
                                  (i = []),
                                  (a = v(n)),
                                  (t.prev = 5),
                                  a.s();
                              case 7:
                                if ((c = a.n()).done) {
                                  t.next = 15;
                                  break;
                                }
                                return (
                                  (s = c.value), (t.next = 11), (0, o.H8)(r, s)
                                );
                              case 11:
                                (u = t.sent), i.push((0, o.on)(u));
                              case 13:
                                t.next = 7;
                                break;
                              case 15:
                                t.next = 20;
                                break;
                              case 17:
                                (t.prev = 17), (t.t0 = t.catch(5)), a.e(t.t0);
                              case 20:
                                return (t.prev = 20), a.f(), t.finish(20);
                              case 23:
                                return t.abrupt("return", i);
                              case 24:
                              case "end":
                                return t.stop();
                            }
                        },
                        t,
                        null,
                        [[5, 17, 20, 23]],
                      );
                    }),
                  )).apply(this, arguments);
                }
                function N(t) {
                  return j.apply(this, arguments);
                }
                function j() {
                  return (j = x(
                    w().mark(function t(e) {
                      var r, n, i;
                      return w().wrap(function (t) {
                        for (;;)
                          switch ((t.prev = t.next)) {
                            case 0:
                              return (t.next = 2), I(e);
                            case 2:
                              return (r = t.sent), (t.next = 5), (0, o.BJ)(e);
                            case 5:
                              return (
                                (n = t.sent),
                                (i = r.map(function (t) {
                                  return t.entity.entityID;
                                })),
                                n.forEach(function (t) {
                                  i.includes(t.entity.entityID) || r.push(t);
                                }),
                                (r = r.sort(function (t, e) {
                                  return t.last_use - e.last_use;
                                })),
                                t.abrupt("return", r)
                              );
                            case 10:
                            case "end":
                              return t.stop();
                          }
                      }, t);
                    }),
                  )).apply(this, arguments);
                }
                function P(t) {
                  return (
                    !!t &&
                    !(t.checkVisibility && !t.checkVisibility()) &&
                    0 !== window.outerHeight &&
                    0 !== window.outerWidth
                  );
                }
                function C() {
                  return M.apply(this, arguments);
                }
                function M() {
                  return (
                    (M = x(
                      w().mark(function t() {
                        var e;
                        return w().wrap(function (t) {
                          for (;;)
                            switch ((t.prev = t.next)) {
                              case 0:
                                (e =
                                  document.getElementById("ps-checkbox-adv")),
                                  (h = P(e)) &&
                                    !p &&
                                    ((p = !0),
                                    e.addEventListener(
                                      "click",
                                      (function () {
                                        var t = x(
                                          w().mark(function t(r) {
                                            var n, i, c, s, u, f, h;
                                            return w().wrap(
                                              function (t) {
                                                for (;;)
                                                  switch ((t.prev = t.next)) {
                                                    case 0:
                                                      (n = (0, o.y9)()),
                                                        (i = n
                                                          .keys()
                                                          .filter(function (t) {
                                                            return (
                                                              void 0 !== t &&
                                                              "_name" !== t
                                                            );
                                                          })),
                                                        (c = []),
                                                        (s = v(i)),
                                                        (t.prev = 4),
                                                        s.s();
                                                    case 6:
                                                      if ((u = s.n()).done) {
                                                        t.next = 14;
                                                        break;
                                                      }
                                                      return (
                                                        (f = u.value),
                                                        (t.next = 10),
                                                        (0, o.H8)(n, f)
                                                      );
                                                    case 10:
                                                      (h = t.sent),
                                                        c.push((0, o.on)(h));
                                                    case 12:
                                                      t.next = 6;
                                                      break;
                                                    case 14:
                                                      t.next = 19;
                                                      break;
                                                    case 16:
                                                      (t.prev = 16),
                                                        (t.t0 = t.catch(4)),
                                                        s.e(t.t0);
                                                    case 19:
                                                      return (
                                                        (t.prev = 19),
                                                        s.f(),
                                                        t.finish(19)
                                                      );
                                                    case 22:
                                                      (0, o.d4)(
                                                        x(
                                                          w().mark(
                                                            function t() {
                                                              var e;
                                                              return w().wrap(
                                                                function (t) {
                                                                  for (;;)
                                                                    switch (
                                                                      (t.prev =
                                                                        t.next)
                                                                    ) {
                                                                      case 0:
                                                                        return (
                                                                          (t.next = 2),
                                                                          (0,
                                                                          o.Ay)()
                                                                        );
                                                                      case 2:
                                                                        t.sent,
                                                                          (e =
                                                                            (0,
                                                                            o.ej)()),
                                                                          c.forEach(
                                                                            function (
                                                                              t,
                                                                            ) {
                                                                              (0,
                                                                              o.VD)(
                                                                                e,
                                                                                t,
                                                                              );
                                                                            },
                                                                          );
                                                                      case 5:
                                                                      case "end":
                                                                        return t.stop();
                                                                    }
                                                                },
                                                                t,
                                                              );
                                                            },
                                                          ),
                                                        ),
                                                      ),
                                                        (l = e.checked),
                                                        a
                                                          .send(
                                                            window.parent,
                                                            "sa-checkbox-clicked",
                                                            { checked: l },
                                                          )
                                                          .catch(function (t) {
                                                            console.log(
                                                              "sa-checkbox-clicked message not handled: ".concat(
                                                                t,
                                                              ),
                                                            );
                                                          });
                                                    case 25:
                                                    case "end":
                                                      return t.stop();
                                                  }
                                              },
                                              t,
                                              null,
                                              [[4, 16, 19, 22]],
                                            );
                                          }),
                                        );
                                        return function (e) {
                                          return t.apply(this, arguments);
                                        };
                                      })(),
                                    ),
                                    f
                                      ? ((e.checked = !0), (l = !0))
                                      : ((e.checked = !1), (l = !1)));
                              case 3:
                              case "end":
                                return t.stop();
                            }
                        }, t);
                      }),
                    )),
                    M.apply(this, arguments)
                  );
                }
                Date.now ||
                  (Date.now = function () {
                    return new Date().getTime();
                  }),
                  (String.prototype.hexEncode = function () {
                    var t,
                      e = "";
                    for (t = 0; t < this.length; t++)
                      e += ("000" + this.charCodeAt(t).toString(16)).slice(-4);
                    return e;
                  }),
                  (String.prototype.hexDecode = function () {
                    var t,
                      e = this.match(/.{1,4}/g) || [],
                      r = "";
                    for (t = 0; t < e.length; t++)
                      r += String.fromCharCode(parseInt(e[t], 16));
                    return r;
                  }),
                  a.on(
                    "init-checkbox",
                    { window: window.parent },
                    (function () {
                      var t = x(
                        w().mark(function t(e) {
                          return w().wrap(function (t) {
                            for (;;)
                              switch ((t.prev = t.next)) {
                                case 0:
                                  return (t.next = 2), C();
                                case 2:
                                case "end":
                                  return t.stop();
                              }
                          }, t);
                        }),
                      );
                      return function (e) {
                        return t.apply(this, arguments);
                      };
                    })(),
                  ),
                  a.on("persist", { window: window.parent }, function (t) {
                    if (!h || l) {
                      O(t);
                      var e = t.data.entities,
                        r = (0, o.ej)(t.data.context);
                      r.removeAll(),
                        r.set("_name", t.data.context),
                        e.forEach(function (t) {
                          (0, o.VD)(r, t);
                        });
                    }
                  }),
                  a.on(
                    "update",
                    { window: window.parent },
                    (function () {
                      var t = x(
                        w().mark(function t(e) {
                          var r, n, i;
                          return w().wrap(function (t) {
                            for (;;)
                              switch ((t.prev = t.next)) {
                                case 0:
                                  if (!h || l) {
                                    t.next = 2;
                                    break;
                                  }
                                  return t.abrupt("return");
                                case 2:
                                  return (
                                    O(e),
                                    (r = e.data.entity),
                                    (n = (0, o.ej)(e.data.context)),
                                    (i = (0, o.VD)(n, r)),
                                    t.abrupt("return", i)
                                  );
                                case 7:
                                case "end":
                                  return t.stop();
                              }
                          }, t);
                        }),
                      );
                      return function (e) {
                        return t.apply(this, arguments);
                      };
                    })(),
                  ),
                  a.on("expire", { window: window.parent }, function (t) {
                    s &&
                      (O(t),
                      E((0, o.ej)(t.data.context)),
                      E((0, o.y9)(t.data.context)));
                  }),
                  a.on(
                    "entities",
                    { window: window.parent },
                    (function () {
                      var t = x(
                        w().mark(function t(e) {
                          var r, n;
                          return w().wrap(function (t) {
                            for (;;)
                              switch ((t.prev = t.next)) {
                                case 0:
                                  return (
                                    O(e),
                                    void 0 === (r = e.data.count) && (r = 3),
                                    (t.next = 5),
                                    N(e.data.context)
                                  );
                                case 5:
                                  return (
                                    (n = (n = t.sent).slice(-r)),
                                    t.abrupt("return", n)
                                  );
                                case 8:
                                case "end":
                                  return t.stop();
                              }
                          }, t);
                        }),
                      );
                      return function (e) {
                        return t.apply(this, arguments);
                      };
                    })(),
                  ),
                  a.on(
                    "entity",
                    { window: window.parent },
                    (function () {
                      var t = x(
                        w().mark(function t(e) {
                          var r, n, i, a, c, s, u, f;
                          return w().wrap(function (t) {
                            for (;;)
                              switch ((t.prev = t.next)) {
                                case 0:
                                  if (
                                    (O(e),
                                    (r = (0, o.ej)(e.data.context)),
                                    (n = (0, o.y9)(e.data.context)),
                                    (i = e.data.entity_id))
                                  ) {
                                    t.next = 6;
                                    break;
                                  }
                                  throw new Error(
                                    "Unable to find entity_id in request",
                                  );
                                case 6:
                                  return (
                                    (a = i.hexEncode()),
                                    (t.next = 9),
                                    (0, o.H8)(r, a)
                                  );
                                case 9:
                                  return (
                                    (c = t.sent) &&
                                      ((s = S()),
                                      (c.last_use = s),
                                      r.set(a, (0, o.on)(c))),
                                    (t.next = 13),
                                    (0, o.H8)(n, a)
                                  );
                                case 13:
                                  return (
                                    (u = t.sent) &&
                                      ((f = S()),
                                      (u.last_use = f),
                                      n.set(a, (0, o.on)(u))),
                                    t.abrupt("return", c || u)
                                  );
                                case 16:
                                case "end":
                                  return t.stop();
                              }
                          }, t);
                        }),
                      );
                      return function (e) {
                        return t.apply(this, arguments);
                      };
                    })(),
                  ),
                  a.on("remove", { window: window.parent }, function (t) {
                    var e, r, n, i;
                    O(t),
                      (e = t.data.context),
                      (r = t.data.entity_id),
                      (n = (0, o.ej)(e)),
                      (i = (0, o.y9)(e)),
                      void 0 !== r &&
                        (n.remove(r.hexEncode()), i.remove(r.hexEncode()));
                  }),
                  a.on(
                    "has_storage_access",
                    { window: window.parent },
                    (function () {
                      var t = x(
                        w().mark(function t(e) {
                          var r;
                          return w().wrap(function (t) {
                            for (;;)
                              switch ((t.prev = t.next)) {
                                case 0:
                                  return O(e), (t.next = 3), (0, o.vZ)();
                                case 3:
                                  return (r = t.sent), t.abrupt("return", r);
                                case 5:
                                case "end":
                                  return t.stop();
                              }
                          }, t);
                        }),
                      );
                      return function (e) {
                        return t.apply(this, arguments);
                      };
                    })(),
                  );
                try {
                  await C(),
                    a.send(window.parent, "initialized").catch(function (t) {
                      console.log("No intialized handler");
                    });
                } catch (T) {
                  console.log("Problem initializing client: ".concat(T));
                }
                n();
              } catch (y) {
                n(y);
              }
              var y;
            },
            1,
          );
        },
        55559: (t, e, r) => {
          "use strict";
          function n(t) {
            for (var e = 1; e < arguments.length; e++) {
              var r = arguments[e];
              for (var n in r) t[n] = r[n];
            }
            return t;
          }
          r.d(e, { A: () => o });
          var o = (function t(e, r) {
            function o(t, o, i) {
              if ("undefined" != typeof document) {
                "number" == typeof (i = n({}, r, i)).expires &&
                  (i.expires = new Date(Date.now() + 864e5 * i.expires)),
                  i.expires && (i.expires = i.expires.toUTCString()),
                  (t = encodeURIComponent(t)
                    .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
                    .replace(/[()]/g, escape));
                var a = "";
                for (var c in i)
                  i[c] &&
                    ((a += "; " + c),
                    !0 !== i[c] && (a += "=" + i[c].split(";")[0]));
                return (document.cookie = t + "=" + e.write(o, t) + a);
              }
            }
            return Object.create(
              {
                set: o,
                get: function (t) {
                  if (
                    "undefined" != typeof document &&
                    (!arguments.length || t)
                  ) {
                    for (
                      var r = document.cookie
                          ? document.cookie.split("; ")
                          : [],
                        n = {},
                        o = 0;
                      o < r.length;
                      o++
                    ) {
                      var i = r[o].split("="),
                        a = i.slice(1).join("=");
                      try {
                        var c = decodeURIComponent(i[0]);
                        if (((n[c] = e.read(a, c)), t === c)) break;
                      } catch (t) {}
                    }
                    return t ? n[t] : n;
                  }
                },
                remove: function (t, e) {
                  o(t, "", n({}, e, { expires: -1 }));
                },
                withAttributes: function (e) {
                  return t(this.converter, n({}, this.attributes, e));
                },
                withConverter: function (e) {
                  return t(n({}, this.converter, e), this.attributes);
                },
              },
              {
                attributes: { value: Object.freeze(r) },
                converter: { value: Object.freeze(e) },
              },
            );
          })(
            {
              read: function (t) {
                return (
                  '"' === t[0] && (t = t.slice(1, -1)),
                  t.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent)
                );
              },
              write: function (t) {
                return encodeURIComponent(t).replace(
                  /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
                  decodeURIComponent,
                );
              },
            },
            { path: "/" },
          );
        },
        86556: (t, e, r) => {
          "use strict";
          r.d(e, { o0: () => p });
          var n = function (t, e, r) {
              if (r || 2 === arguments.length)
                for (var n, o = 0, i = e.length; o < i; o++)
                  (!n && o in e) ||
                    (n || (n = Array.prototype.slice.call(e, 0, o)),
                    (n[o] = e[o]));
              return t.concat(n || Array.prototype.slice.call(e));
            },
            o = function (t, e, r) {
              (this.name = t),
                (this.version = e),
                (this.os = r),
                (this.type = "browser");
            },
            i = function (t) {
              (this.version = t),
                (this.type = "node"),
                (this.name = "node"),
                (this.os = process.platform);
            },
            a = function (t, e, r, n) {
              (this.name = t),
                (this.version = e),
                (this.os = r),
                (this.bot = n),
                (this.type = "bot-device");
            },
            c = function () {
              (this.type = "bot"),
                (this.bot = !0),
                (this.name = "bot"),
                (this.version = null),
                (this.os = null);
            },
            s = function () {
              (this.type = "react-native"),
                (this.name = "react-native"),
                (this.version = null),
                (this.os = null);
            },
            u =
              /(nuhk|curl|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask\ Jeeves\/Teoma|ia_archiver)/,
            f = 3,
            l = [
              ["aol", /AOLShield\/([0-9\._]+)/],
              ["edge", /Edge\/([0-9\._]+)/],
              ["edge-ios", /EdgiOS\/([0-9\._]+)/],
              ["yandexbrowser", /YaBrowser\/([0-9\._]+)/],
              ["kakaotalk", /KAKAOTALK\s([0-9\.]+)/],
              ["samsung", /SamsungBrowser\/([0-9\.]+)/],
              ["silk", /\bSilk\/([0-9._-]+)\b/],
              ["miui", /MiuiBrowser\/([0-9\.]+)$/],
              ["beaker", /BeakerBrowser\/([0-9\.]+)/],
              ["edge-chromium", /EdgA?\/([0-9\.]+)/],
              [
                "chromium-webview",
                /(?!Chrom.*OPR)wv\).*Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/,
              ],
              ["chrome", /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],
              ["phantomjs", /PhantomJS\/([0-9\.]+)(:?\s|$)/],
              ["crios", /CriOS\/([0-9\.]+)(:?\s|$)/],
              ["firefox", /Firefox\/([0-9\.]+)(?:\s|$)/],
              ["fxios", /FxiOS\/([0-9\.]+)/],
              ["opera-mini", /Opera Mini.*Version\/([0-9\.]+)/],
              ["opera", /Opera\/([0-9\.]+)(?:\s|$)/],
              ["opera", /OPR\/([0-9\.]+)(:?\s|$)/],
              ["pie", /^Microsoft Pocket Internet Explorer\/(\d+\.\d+)$/],
              [
                "pie",
                /^Mozilla\/\d\.\d+\s\(compatible;\s(?:MSP?IE|MSInternet Explorer) (\d+\.\d+);.*Windows CE.*\)$/,
              ],
              ["netfront", /^Mozilla\/\d\.\d+.*NetFront\/(\d.\d)/],
              ["ie", /Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/],
              ["ie", /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],
              ["ie", /MSIE\s(7\.0)/],
              ["bb10", /BB10;\sTouch.*Version\/([0-9\.]+)/],
              ["android", /Android\s([0-9\.]+)/],
              ["ios", /Version\/([0-9\._]+).*Mobile.*Safari.*/],
              ["safari", /Version\/([0-9\._]+).*Safari/],
              ["facebook", /FB[AS]V\/([0-9\.]+)/],
              ["instagram", /Instagram\s([0-9\.]+)/],
              ["ios-webview", /AppleWebKit\/([0-9\.]+).*Mobile/],
              ["ios-webview", /AppleWebKit\/([0-9\.]+).*Gecko\)$/],
              ["curl", /^curl\/([0-9\.]+)$/],
              [
                "searchbot",
                /alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/,
              ],
            ],
            h = [
              ["iOS", /iP(hone|od|ad)/],
              ["Android OS", /Android/],
              ["BlackBerry OS", /BlackBerry|BB10/],
              ["Windows Mobile", /IEMobile/],
              ["Amazon OS", /Kindle/],
              ["Windows 3.11", /Win16/],
              ["Windows 95", /(Windows 95)|(Win95)|(Windows_95)/],
              ["Windows 98", /(Windows 98)|(Win98)/],
              ["Windows 2000", /(Windows NT 5.0)|(Windows 2000)/],
              ["Windows XP", /(Windows NT 5.1)|(Windows XP)/],
              ["Windows Server 2003", /(Windows NT 5.2)/],
              ["Windows Vista", /(Windows NT 6.0)/],
              ["Windows 7", /(Windows NT 6.1)/],
              ["Windows 8", /(Windows NT 6.2)/],
              ["Windows 8.1", /(Windows NT 6.3)/],
              ["Windows 10", /(Windows NT 10.0)/],
              ["Windows ME", /Windows ME/],
              [
                "Windows CE",
                /Windows CE|WinCE|Microsoft Pocket Internet Explorer/,
              ],
              ["Open BSD", /OpenBSD/],
              ["Sun OS", /SunOS/],
              ["Chrome OS", /CrOS/],
              ["Linux", /(Linux)|(X11)/],
              ["Mac OS", /(Mac_PowerPC)|(Macintosh)/],
              ["QNX", /QNX/],
              ["BeOS", /BeOS/],
              ["OS/2", /OS\/2/],
            ];
          function p(t) {
            return t
              ? d(t)
              : "undefined" == typeof document &&
                  "undefined" != typeof navigator &&
                  "ReactNative" === navigator.product
                ? new s()
                : "undefined" != typeof navigator
                  ? d(navigator.userAgent)
                  : "undefined" != typeof process && process.version
                    ? new i(process.version.slice(1))
                    : null;
          }
          function d(t) {
            var e = (function (t) {
              return (
                "" !== t &&
                l.reduce(function (e, r) {
                  var n = r[0],
                    o = r[1];
                  if (e) return e;
                  var i = o.exec(t);
                  return !!i && [n, i];
                }, !1)
              );
            })(t);
            if (!e) return null;
            var r = e[0],
              i = e[1];
            if ("searchbot" === r) return new c();
            var s = i[1] && i[1].split(".").join("_").split("_").slice(0, 3);
            s
              ? s.length < f &&
                (s = n(
                  n([], s, !0),
                  (function (t) {
                    for (var e = [], r = 0; r < t; r++) e.push("0");
                    return e;
                  })(f - s.length),
                  !0,
                ))
              : (s = []);
            var p = s.join("."),
              d = (function (t) {
                for (var e = 0, r = h.length; e < r; e++) {
                  var n = h[e],
                    o = n[0];
                  if (n[1].exec(t)) return o;
                }
                return null;
              })(t),
              y = u.exec(t);
            return y && y[1] ? new a(r, p, d, y[1]) : new o(r, p, d);
          }
        },
        99614: (t, e, r) => {
          "use strict";
          r.a(
            t,
            async (t, n) => {
              try {
                r.d(e, {
                  Ay: () => C,
                  BJ: () => O,
                  H8: () => b,
                  VD: () => _,
                  d4: () => u,
                  ej: () => S,
                  on: () => w,
                  vZ: () => j,
                  y9: () => k,
                });
                var o = r(55559),
                  i = r(86556);
                function f(t, e) {
                  var r =
                    ("undefined" != typeof Symbol && t[Symbol.iterator]) ||
                    t["@@iterator"];
                  if (!r) {
                    if (
                      Array.isArray(t) ||
                      (r = l(t)) ||
                      (e && t && "number" == typeof t.length)
                    ) {
                      r && (t = r);
                      var n = 0,
                        o = function () {};
                      return {
                        s: o,
                        n: function () {
                          return n >= t.length
                            ? { done: !0 }
                            : { done: !1, value: t[n++] };
                        },
                        e: function (t) {
                          throw t;
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
                    c = !1;
                  return {
                    s: function () {
                      r = r.call(t);
                    },
                    n: function () {
                      var t = r.next();
                      return (a = t.done), t;
                    },
                    e: function (t) {
                      (c = !0), (i = t);
                    },
                    f: function () {
                      try {
                        a || null == r.return || r.return();
                      } finally {
                        if (c) throw i;
                      }
                    },
                  };
                }
                function l(t, e) {
                  if (t) {
                    if ("string" == typeof t) return h(t, e);
                    var r = {}.toString.call(t).slice(8, -1);
                    return (
                      "Object" === r &&
                        t.constructor &&
                        (r = t.constructor.name),
                      "Map" === r || "Set" === r
                        ? Array.from(t)
                        : "Arguments" === r ||
                            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                          ? h(t, e)
                          : void 0
                    );
                  }
                }
                function h(t, e) {
                  (null == e || e > t.length) && (e = t.length);
                  for (var r = 0, n = Array(e); r < e; r++) n[r] = t[r];
                  return n;
                }
                function p() {
                  p = function () {
                    return e;
                  };
                  var t,
                    e = {},
                    r = Object.prototype,
                    n = r.hasOwnProperty,
                    o =
                      Object.defineProperty ||
                      function (t, e, r) {
                        t[e] = r.value;
                      },
                    i = "function" == typeof Symbol ? Symbol : {},
                    a = i.iterator || "@@iterator",
                    c = i.asyncIterator || "@@asyncIterator",
                    s = i.toStringTag || "@@toStringTag";
                  function u(t, e, r) {
                    return (
                      Object.defineProperty(t, e, {
                        value: r,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                      }),
                      t[e]
                    );
                  }
                  try {
                    u({}, "");
                  } catch (t) {
                    u = function (t, e, r) {
                      return (t[e] = r);
                    };
                  }
                  function f(t, e, r, n) {
                    var i = e && e.prototype instanceof w ? e : w,
                      a = Object.create(i.prototype),
                      c = new P(n || []);
                    return o(a, "_invoke", { value: I(t, r, c) }), a;
                  }
                  function l(t, e, r) {
                    try {
                      return { type: "normal", arg: t.call(e, r) };
                    } catch (t) {
                      return { type: "throw", arg: t };
                    }
                  }
                  e.wrap = f;
                  var h = "suspendedStart",
                    y = "suspendedYield",
                    v = "executing",
                    m = "completed",
                    g = {};
                  function w() {}
                  function b() {}
                  function x() {}
                  var _ = {};
                  u(_, a, function () {
                    return this;
                  });
                  var S = Object.getPrototypeOf,
                    k = S && S(S(C([])));
                  k && k !== r && n.call(k, a) && (_ = k);
                  var E = (x.prototype = w.prototype = Object.create(_));
                  function A(t) {
                    ["next", "throw", "return"].forEach(function (e) {
                      u(t, e, function (t) {
                        return this._invoke(e, t);
                      });
                    });
                  }
                  function O(t, e) {
                    function r(o, i, a, c) {
                      var s = l(t[o], t, i);
                      if ("throw" !== s.type) {
                        var u = s.arg,
                          f = u.value;
                        return f && "object" == d(f) && n.call(f, "__await")
                          ? e.resolve(f.__await).then(
                              function (t) {
                                r("next", t, a, c);
                              },
                              function (t) {
                                r("throw", t, a, c);
                              },
                            )
                          : e.resolve(f).then(
                              function (t) {
                                (u.value = t), a(u);
                              },
                              function (t) {
                                return r("throw", t, a, c);
                              },
                            );
                      }
                      c(s.arg);
                    }
                    var i;
                    o(this, "_invoke", {
                      value: function (t, n) {
                        function o() {
                          return new e(function (e, o) {
                            r(t, n, e, o);
                          });
                        }
                        return (i = i ? i.then(o, o) : o());
                      },
                    });
                  }
                  function I(e, r, n) {
                    var o = h;
                    return function (i, a) {
                      if (o === v) throw Error("Generator is already running");
                      if (o === m) {
                        if ("throw" === i) throw a;
                        return { value: t, done: !0 };
                      }
                      for (n.method = i, n.arg = a; ; ) {
                        var c = n.delegate;
                        if (c) {
                          var s = L(c, n);
                          if (s) {
                            if (s === g) continue;
                            return s;
                          }
                        }
                        if ("next" === n.method) n.sent = n._sent = n.arg;
                        else if ("throw" === n.method) {
                          if (o === h) throw ((o = m), n.arg);
                          n.dispatchException(n.arg);
                        } else
                          "return" === n.method && n.abrupt("return", n.arg);
                        o = v;
                        var u = l(e, r, n);
                        if ("normal" === u.type) {
                          if (((o = n.done ? m : y), u.arg === g)) continue;
                          return { value: u.arg, done: n.done };
                        }
                        "throw" === u.type &&
                          ((o = m), (n.method = "throw"), (n.arg = u.arg));
                      }
                    };
                  }
                  function L(e, r) {
                    var n = r.method,
                      o = e.iterator[n];
                    if (o === t)
                      return (
                        (r.delegate = null),
                        ("throw" === n &&
                          e.iterator.return &&
                          ((r.method = "return"),
                          (r.arg = t),
                          L(e, r),
                          "throw" === r.method)) ||
                          ("return" !== n &&
                            ((r.method = "throw"),
                            (r.arg = new TypeError(
                              "The iterator does not provide a '" +
                                n +
                                "' method",
                            )))),
                        g
                      );
                    var i = l(o, e.iterator, r.arg);
                    if ("throw" === i.type)
                      return (
                        (r.method = "throw"),
                        (r.arg = i.arg),
                        (r.delegate = null),
                        g
                      );
                    var a = i.arg;
                    return a
                      ? a.done
                        ? ((r[e.resultName] = a.value),
                          (r.next = e.nextLoc),
                          "return" !== r.method &&
                            ((r.method = "next"), (r.arg = t)),
                          (r.delegate = null),
                          g)
                        : a
                      : ((r.method = "throw"),
                        (r.arg = new TypeError(
                          "iterator result is not an object",
                        )),
                        (r.delegate = null),
                        g);
                  }
                  function N(t) {
                    var e = { tryLoc: t[0] };
                    1 in t && (e.catchLoc = t[1]),
                      2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
                      this.tryEntries.push(e);
                  }
                  function j(t) {
                    var e = t.completion || {};
                    (e.type = "normal"), delete e.arg, (t.completion = e);
                  }
                  function P(t) {
                    (this.tryEntries = [{ tryLoc: "root" }]),
                      t.forEach(N, this),
                      this.reset(!0);
                  }
                  function C(e) {
                    if (e || "" === e) {
                      var r = e[a];
                      if (r) return r.call(e);
                      if ("function" == typeof e.next) return e;
                      if (!isNaN(e.length)) {
                        var o = -1,
                          i = function r() {
                            for (; ++o < e.length; )
                              if (n.call(e, o))
                                return (r.value = e[o]), (r.done = !1), r;
                            return (r.value = t), (r.done = !0), r;
                          };
                        return (i.next = i);
                      }
                    }
                    throw new TypeError(d(e) + " is not iterable");
                  }
                  return (
                    (b.prototype = x),
                    o(E, "constructor", { value: x, configurable: !0 }),
                    o(x, "constructor", { value: b, configurable: !0 }),
                    (b.displayName = u(x, s, "GeneratorFunction")),
                    (e.isGeneratorFunction = function (t) {
                      var e = "function" == typeof t && t.constructor;
                      return (
                        !!e &&
                        (e === b ||
                          "GeneratorFunction" === (e.displayName || e.name))
                      );
                    }),
                    (e.mark = function (t) {
                      return (
                        Object.setPrototypeOf
                          ? Object.setPrototypeOf(t, x)
                          : ((t.__proto__ = x), u(t, s, "GeneratorFunction")),
                        (t.prototype = Object.create(E)),
                        t
                      );
                    }),
                    (e.awrap = function (t) {
                      return { __await: t };
                    }),
                    A(O.prototype),
                    u(O.prototype, c, function () {
                      return this;
                    }),
                    (e.AsyncIterator = O),
                    (e.async = function (t, r, n, o, i) {
                      void 0 === i && (i = Promise);
                      var a = new O(f(t, r, n, o), i);
                      return e.isGeneratorFunction(r)
                        ? a
                        : a.next().then(function (t) {
                            return t.done ? t.value : a.next();
                          });
                    }),
                    A(E),
                    u(E, s, "Generator"),
                    u(E, a, function () {
                      return this;
                    }),
                    u(E, "toString", function () {
                      return "[object Generator]";
                    }),
                    (e.keys = function (t) {
                      var e = Object(t),
                        r = [];
                      for (var n in e) r.push(n);
                      return (
                        r.reverse(),
                        function t() {
                          for (; r.length; ) {
                            var n = r.pop();
                            if (n in e) return (t.value = n), (t.done = !1), t;
                          }
                          return (t.done = !0), t;
                        }
                      );
                    }),
                    (e.values = C),
                    (P.prototype = {
                      constructor: P,
                      reset: function (e) {
                        if (
                          ((this.prev = 0),
                          (this.next = 0),
                          (this.sent = this._sent = t),
                          (this.done = !1),
                          (this.delegate = null),
                          (this.method = "next"),
                          (this.arg = t),
                          this.tryEntries.forEach(j),
                          !e)
                        )
                          for (var r in this)
                            "t" === r.charAt(0) &&
                              n.call(this, r) &&
                              !isNaN(+r.slice(1)) &&
                              (this[r] = t);
                      },
                      stop: function () {
                        this.done = !0;
                        var t = this.tryEntries[0].completion;
                        if ("throw" === t.type) throw t.arg;
                        return this.rval;
                      },
                      dispatchException: function (e) {
                        if (this.done) throw e;
                        var r = this;
                        function o(n, o) {
                          return (
                            (c.type = "throw"),
                            (c.arg = e),
                            (r.next = n),
                            o && ((r.method = "next"), (r.arg = t)),
                            !!o
                          );
                        }
                        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                          var a = this.tryEntries[i],
                            c = a.completion;
                          if ("root" === a.tryLoc) return o("end");
                          if (a.tryLoc <= this.prev) {
                            var s = n.call(a, "catchLoc"),
                              u = n.call(a, "finallyLoc");
                            if (s && u) {
                              if (this.prev < a.catchLoc)
                                return o(a.catchLoc, !0);
                              if (this.prev < a.finallyLoc)
                                return o(a.finallyLoc);
                            } else if (s) {
                              if (this.prev < a.catchLoc)
                                return o(a.catchLoc, !0);
                            } else {
                              if (!u)
                                throw Error(
                                  "try statement without catch or finally",
                                );
                              if (this.prev < a.finallyLoc)
                                return o(a.finallyLoc);
                            }
                          }
                        }
                      },
                      abrupt: function (t, e) {
                        for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                          var o = this.tryEntries[r];
                          if (
                            o.tryLoc <= this.prev &&
                            n.call(o, "finallyLoc") &&
                            this.prev < o.finallyLoc
                          ) {
                            var i = o;
                            break;
                          }
                        }
                        i &&
                          ("break" === t || "continue" === t) &&
                          i.tryLoc <= e &&
                          e <= i.finallyLoc &&
                          (i = null);
                        var a = i ? i.completion : {};
                        return (
                          (a.type = t),
                          (a.arg = e),
                          i
                            ? ((this.method = "next"),
                              (this.next = i.finallyLoc),
                              g)
                            : this.complete(a)
                        );
                      },
                      complete: function (t, e) {
                        if ("throw" === t.type) throw t.arg;
                        return (
                          "break" === t.type || "continue" === t.type
                            ? (this.next = t.arg)
                            : "return" === t.type
                              ? ((this.rval = this.arg = t.arg),
                                (this.method = "return"),
                                (this.next = "end"))
                              : "normal" === t.type && e && (this.next = e),
                          g
                        );
                      },
                      finish: function (t) {
                        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                          var r = this.tryEntries[e];
                          if (r.finallyLoc === t)
                            return (
                              this.complete(r.completion, r.afterLoc), j(r), g
                            );
                        }
                      },
                      catch: function (t) {
                        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                          var r = this.tryEntries[e];
                          if (r.tryLoc === t) {
                            var n = r.completion;
                            if ("throw" === n.type) {
                              var o = n.arg;
                              j(r);
                            }
                            return o;
                          }
                        }
                        throw Error("illegal catch attempt");
                      },
                      delegateYield: function (e, r, n) {
                        return (
                          (this.delegate = {
                            iterator: C(e),
                            resultName: r,
                            nextLoc: n,
                          }),
                          "next" === this.method && (this.arg = t),
                          g
                        );
                      },
                    }),
                    e
                  );
                }
                function d(t) {
                  return (
                    (d =
                      "function" == typeof Symbol &&
                      "symbol" == typeof Symbol.iterator
                        ? function (t) {
                            return typeof t;
                          }
                        : function (t) {
                            return t &&
                              "function" == typeof Symbol &&
                              t.constructor === Symbol &&
                              t !== Symbol.prototype
                              ? "symbol"
                              : typeof t;
                          }),
                    d(t)
                  );
                }
                function y(t, e, r, n, o, i, a) {
                  try {
                    var c = t[i](a),
                      s = c.value;
                  } catch (t) {
                    return void r(t);
                  }
                  c.done ? e(s) : Promise.resolve(s).then(n, o);
                }
                function v(t) {
                  return function () {
                    var e = this,
                      r = arguments;
                    return new Promise(function (n, o) {
                      var i = t.apply(e, r);
                      function a(t) {
                        y(i, n, o, a, c, "next", t);
                      }
                      function c(t) {
                        y(i, n, o, a, c, "throw", t);
                      }
                      a(void 0);
                    });
                  };
                }
                var a = ["chrome", "chromium"];
                if (void 0 !== "MISSING_ENV_VAR".SAA_COMPLIANT_BROWSERS)
                  try {
                    a = JSON.parse("MISSING_ENV_VAR".SAA_COMPLIANT_BROWSERS);
                  } catch (M) {
                    console.log(
                      "Problem with configured browsers: ".concat(
                        "MISSING_ENV_VAR".SAA_COMPLIANT_BROWSERS,
                      ),
                    );
                  }
                function m() {
                  return g.apply(this, arguments);
                }
                function g() {
                  return (
                    (g = v(
                      p().mark(function t() {
                        var e,
                          r,
                          n,
                          i,
                          a,
                          c,
                          s,
                          u,
                          f,
                          l,
                          h,
                          y,
                          v,
                          m,
                          g,
                          w,
                          b,
                          x,
                          _,
                          S,
                          k,
                          E,
                          A,
                          O,
                          I,
                          N = arguments;
                        return p().wrap(function (t) {
                          for (;;)
                            switch ((t.prev = t.next)) {
                              case 0:
                                if (
                                  ((S = function () {
                                    for (
                                      var t = 1, e = arguments[0];
                                      t < arguments.length;
                                      t++
                                    ) {
                                      var r = arguments[t];
                                      for (var n in r)
                                        r.hasOwnProperty(n) && (e[n] = r[n]);
                                    }
                                    return e;
                                  }),
                                  (_ = function (t) {
                                    var e;
                                    for (e in t) return !1;
                                    return !0;
                                  }),
                                  (x = function (t) {
                                    var e, r;
                                    return !(
                                      !t ||
                                      "[object Object]" !== i.call(t) ||
                                      ((e = u(t)) &&
                                        ("function" !=
                                          typeof (r =
                                            a.call(e, "constructor") &&
                                            e.constructor) ||
                                          c.call(r) !== s))
                                    );
                                  }),
                                  (b = function (t) {
                                    if (!t || "string" != typeof t)
                                      throw new Error(
                                        "First parameter must be a string",
                                      );
                                    if (t.includes("zoid__thiss_cta"))
                                      throw new Error(
                                        "CREATE NAMESPACE WITH NAME: ".concat(
                                          t,
                                        ),
                                      );
                                    k
                                      ? (e.localStorage.getItem(t) ||
                                          e.localStorage.setItem(t, "{}"),
                                        e.sessionStorage.getItem(t) ||
                                          e.sessionStorage.setItem(t, "{}"))
                                      : (e.localCookieStorage.getItem(t) ||
                                          e.localCookieStorage.setItem(t, "{}"),
                                        e.sessionCookieStorage.getItem(t) ||
                                          e.sessionCookieStorage.setItem(
                                            t,
                                            "{}",
                                          ));
                                    var r = {
                                      localStorage: S({}, f.localStorage, {
                                        _ns: t,
                                      }),
                                      sessionStorage: S({}, f.sessionStorage, {
                                        _ns: t,
                                      }),
                                    };
                                    return (
                                      E &&
                                        (e.cookieStorage.getItem(t) ||
                                          e.cookieStorage.setItem(t, "{}"),
                                        (r.cookieStorage = S(
                                          {},
                                          f.cookieStorage,
                                          { _ns: t },
                                        ))),
                                      (f.namespaceStorages[t] = r),
                                      r
                                    );
                                  }),
                                  (w = function () {
                                    var t = this._type,
                                      r = arguments.length,
                                      n = e[t],
                                      i = [],
                                      a = {};
                                    if (
                                      (a =
                                        r > 0 ? l.apply(this, arguments) : n) &&
                                      a._cookie
                                    ) {
                                      var c = o.A.get();
                                      for (var s in c)
                                        c.hasOwnProperty(s) &&
                                          "" != s &&
                                          i.push(s.replace(a._prefix, ""));
                                    } else
                                      for (var u in a)
                                        a.hasOwnProperty(u) && i.push(u);
                                    return i;
                                  }),
                                  (g = function () {
                                    var t,
                                      e = arguments.length,
                                      r = arguments,
                                      n = r[0];
                                    if (e < 1)
                                      throw new Error(
                                        "Minimum 1 argument must be given",
                                      );
                                    if (Array.isArray(n)) {
                                      for (t = 0; t < n.length; t++)
                                        if (!g.call(this, n[t])) return !1;
                                      return !0;
                                    }
                                    try {
                                      var o = l.apply(this, arguments);
                                      for (t in (Array.isArray(r[e - 1]) ||
                                        (o = { totest: o }),
                                      o))
                                        if (
                                          o.hasOwnProperty(t) &&
                                          (void 0 === o[t] || null === o[t])
                                        )
                                          return !1;
                                      return !0;
                                    } catch (t) {
                                      return !1;
                                    }
                                  }),
                                  (m = function () {
                                    var t,
                                      e = arguments.length,
                                      r = arguments,
                                      n = r[0];
                                    if (0 == e) return 0 == w.call(this).length;
                                    if (Array.isArray(n)) {
                                      for (t = 0; t < n.length; t++)
                                        if (!m.call(this, n[t])) return !1;
                                      return !0;
                                    }
                                    try {
                                      var o = l.apply(this, arguments);
                                      for (t in (Array.isArray(r[e - 1]) ||
                                        (o = { totest: o }),
                                      o))
                                        if (
                                          o.hasOwnProperty(t) &&
                                          !(
                                            (x(o[t]) && _(o[t])) ||
                                            (Array.isArray(o[t]) &&
                                              !o[t].length) ||
                                            ("boolean" != typeof o[t] && !o[t])
                                          )
                                        )
                                          return !1;
                                      return !0;
                                    } catch (t) {
                                      return !0;
                                    }
                                  }),
                                  (v = function (t) {
                                    var e,
                                      r = w.call(this);
                                    for (e in r)
                                      r.hasOwnProperty(e) && y.call(this, r[e]);
                                    if (t)
                                      for (e in f.namespaceStorages)
                                        f.namespaceStorages.hasOwnProperty(e) &&
                                          b(e);
                                  }),
                                  (y = function () {
                                    var t,
                                      r,
                                      n,
                                      o,
                                      i = this._type,
                                      a = arguments.length,
                                      c = e[i],
                                      s = arguments,
                                      u = s[0];
                                    if (a < 1)
                                      throw new Error(
                                        "Minimum 1 argument must be given",
                                      );
                                    if (Array.isArray(u)) {
                                      for (n in u)
                                        u.hasOwnProperty(n) &&
                                          c.removeItem(u[n]);
                                      return !0;
                                    }
                                    if (1 == a) return c.removeItem(u), !0;
                                    try {
                                      t = r = JSON.parse(c.getItem(u));
                                    } catch (t) {
                                      throw new ReferenceError(
                                        u + " is not defined in this storage",
                                      );
                                    }
                                    for (n = 1; n < a - 1; n++)
                                      if (void 0 === (r = r[s[n]]))
                                        throw new ReferenceError(
                                          [].slice.call(s, 1, n).join(".") +
                                            " is not defined in this storage",
                                        );
                                    if (Array.isArray(s[n]))
                                      for (o in s[n])
                                        s[n].hasOwnProperty(o) &&
                                          delete r[s[n][o]];
                                    else delete r[s[n]];
                                    return c.setItem(u, JSON.stringify(t)), !0;
                                  }),
                                  (h = function () {
                                    var t,
                                      r,
                                      n,
                                      o,
                                      i = this._type,
                                      a = arguments.length,
                                      c = e[i],
                                      s = arguments,
                                      u = s[0],
                                      f = s[1],
                                      l = isNaN(f) ? {} : [];
                                    if (a < 1 || (!x(u) && a < 2))
                                      throw new Error(
                                        "Minimum 2 arguments must be given or first parameter must be an object",
                                      );
                                    if (x(u)) {
                                      for (o in u)
                                        u.hasOwnProperty(o) &&
                                          ((t = u[o]),
                                          x(t) || this.alwaysUseJson
                                            ? c.setItem(o, JSON.stringify(t))
                                            : c.setItem(o, t));
                                      return u;
                                    }
                                    if (2 == a)
                                      return (
                                        "object" === d(f) || this.alwaysUseJson
                                          ? c.setItem(u, JSON.stringify(f))
                                          : c.setItem(u, f),
                                        f
                                      );
                                    try {
                                      null != (n = c.getItem(u)) &&
                                        (l = JSON.parse(n));
                                    } catch (t) {}
                                    for (n = l, o = 1; o < a - 2; o++)
                                      (t = s[o]),
                                        (r = isNaN(s[o + 1])
                                          ? "object"
                                          : "array"),
                                        (!n[t] ||
                                          ("object" == r && !x(n[t])) ||
                                          ("array" == r &&
                                            !Array.isArray(n[t]))) &&
                                          (n[t] = "array" == r ? [] : {}),
                                        (n = n[t]);
                                    return (
                                      (n[s[o]] = s[o + 1]),
                                      c.setItem(u, JSON.stringify(l)),
                                      l
                                    );
                                  }),
                                  (l = function () {
                                    var t,
                                      r,
                                      n,
                                      o,
                                      i,
                                      a = this._type,
                                      c = arguments.length,
                                      s = e[a],
                                      u = arguments,
                                      f = u[0];
                                    if (c < 1)
                                      throw new Error(
                                        "Minimum 1 argument must be given",
                                      );
                                    if (Array.isArray(f)) {
                                      for (o in ((r = {}), f))
                                        if (f.hasOwnProperty(o)) {
                                          t = f[o];
                                          try {
                                            r[t] = JSON.parse(s.getItem(t));
                                          } catch (e) {
                                            r[t] = s.getItem(t);
                                          }
                                        }
                                      return r;
                                    }
                                    if (1 != c) {
                                      try {
                                        r = JSON.parse(s.getItem(f));
                                      } catch (t) {
                                        throw new ReferenceError(
                                          f + " is not defined in this storage",
                                        );
                                      }
                                      for (o = 1; o < c - 1; o++)
                                        if (void 0 === (r = r[u[o]]))
                                          throw new ReferenceError(
                                            [].slice
                                              .call(u, 1, o + 1)
                                              .join(".") +
                                              " is not defined in this storage",
                                          );
                                      if (Array.isArray(u[o])) {
                                        for (i in ((n = r), (r = {}), u[o]))
                                          u[o].hasOwnProperty(i) &&
                                            (r[u[o][i]] = n[u[o][i]]);
                                        return r;
                                      }
                                      return r[u[o]];
                                    }
                                    try {
                                      return JSON.parse(s.getItem(f));
                                    } catch (t) {
                                      return s.getItem(f);
                                    }
                                  }),
                                  !(N.length > 0 && void 0 !== N[0] && N[0]))
                                ) {
                                  t.next = 17;
                                  break;
                                }
                                (e = window), (t.next = 20);
                                break;
                              case 17:
                                return (t.next = 19), L();
                              case 19:
                                e = t.sent;
                              case 20:
                                return (t.next = 22), j();
                              case 22:
                                return (
                                  (r = t.sent),
                                  (i = (n = {}).toString),
                                  (c = (a = n.hasOwnProperty).toString),
                                  (s = c.call(Object)),
                                  (u = Object.getPrototypeOf),
                                  (E = !1),
                                  ((f = {}).storage_available = k = !0),
                                  (f.cookies_available = E),
                                  (A = {
                                    _type: "",
                                    _ns: "",
                                    _callMethod: function (t, e) {
                                      var r = [],
                                        n = (e =
                                          Array.prototype.slice.call(e))[0];
                                      return (
                                        this._ns && r.push(this._ns),
                                        "string" == typeof n &&
                                          -1 !== n.indexOf(".") &&
                                          (e.shift(),
                                          [].unshift.apply(e, n.split("."))),
                                        [].push.apply(r, e),
                                        t.apply(this, r)
                                      );
                                    },
                                    alwaysUseJson: !1,
                                    get: function () {
                                      return k || E
                                        ? this._callMethod(l, arguments)
                                        : null;
                                    },
                                    set: function () {
                                      var t = arguments.length,
                                        e = arguments,
                                        r = e[0];
                                      if (t < 1 || (!x(r) && t < 2))
                                        throw new Error(
                                          "Minimum 2 arguments must be given or first parameter must be an object",
                                        );
                                      if (!k && !E) return null;
                                      if (x(r) && this._ns) {
                                        for (var n in r)
                                          r.hasOwnProperty(n) &&
                                            this._callMethod(h, [n, r[n]]);
                                        return r;
                                      }
                                      var o = this._callMethod(h, e);
                                      return this._ns ? o[r.split(".")[0]] : o;
                                    },
                                    remove: function () {
                                      if (arguments.length < 1)
                                        throw new Error(
                                          "Minimum 1 argument must be given",
                                        );
                                      return k || E
                                        ? this._callMethod(y, arguments)
                                        : null;
                                    },
                                    removeAll: function (t) {
                                      return k || E
                                        ? this._ns
                                          ? (this._callMethod(h, [{}]), !0)
                                          : this._callMethod(v, [t])
                                        : null;
                                    },
                                    isEmpty: function () {
                                      return k || E
                                        ? this._callMethod(m, arguments)
                                        : null;
                                    },
                                    isSet: function () {
                                      if (arguments.length < 1)
                                        throw new Error(
                                          "Minimum 1 argument must be given",
                                        );
                                      return k || E
                                        ? this._callMethod(g, arguments)
                                        : null;
                                    },
                                    keys: function () {
                                      return k || E
                                        ? this._callMethod(w, arguments)
                                        : null;
                                    },
                                  }),
                                  E &&
                                    ((O = Math.floor(1e8 * Math.random())),
                                    (I = {
                                      _cookie: !0,
                                      _prefix: "",
                                      _expires: null,
                                      _path: null,
                                      _domain: null,
                                      setItem: function (t, e) {
                                        o.A.set(this._prefix + t, e, {
                                          expires: this._expires,
                                          path: this._path,
                                          domain: this._domain,
                                          sameSite: "None",
                                          secure: !0,
                                          partitioned: !r,
                                        });
                                      },
                                      getItem: function (t) {
                                        return o.A.get(this._prefix + t);
                                      },
                                      removeItem: function (t) {
                                        return o.A.remove(this._prefix + t, {
                                          path: this._path,
                                        });
                                      },
                                      clear: function () {
                                        var t = o.A.get();
                                        for (var e in t)
                                          t.hasOwnProperty(e) &&
                                            "" != e &&
                                            ((!this._prefix &&
                                              -1 === e.indexOf("ls_") &&
                                              -1 === e.indexOf("ss_")) ||
                                              (this._prefix &&
                                                0 ===
                                                  e.indexOf(this._prefix))) &&
                                            o.A.remove(e);
                                      },
                                      setExpires: function (t) {
                                        return (this._expires = t), this;
                                      },
                                      setPath: function (t) {
                                        return (this._path = t), this;
                                      },
                                      setDomain: function (t) {
                                        return (this._domain = t), this;
                                      },
                                      setConf: function (t) {
                                        return (
                                          t.path && (this._path = t.path),
                                          t.domain && (this._domain = t.domain),
                                          t.expires &&
                                            (this._expires = t.expires),
                                          this
                                        );
                                      },
                                      setDefaultConf: function () {
                                        this._path =
                                          this._domain =
                                          this._expires =
                                            null;
                                      },
                                    }),
                                    k ||
                                      ((e.localCookieStorage = S({}, I, {
                                        _prefix: "ls_",
                                        _expires: 3650,
                                      })),
                                      (e.sessionCookieStorage = S({}, I, {
                                        _prefix: "ss_" + O + "_",
                                      }))),
                                    (e.cookieStorage = S({}, I)),
                                    (f.cookieStorage = S({}, A, {
                                      _type: "cookieStorage",
                                      setExpires: function (t) {
                                        return (
                                          e.cookieStorage.setExpires(t), this
                                        );
                                      },
                                      setPath: function (t) {
                                        return e.cookieStorage.setPath(t), this;
                                      },
                                      setDomain: function (t) {
                                        return (
                                          e.cookieStorage.setDomain(t), this
                                        );
                                      },
                                      setConf: function (t) {
                                        return e.cookieStorage.setConf(t), this;
                                      },
                                      setDefaultConf: function () {
                                        return (
                                          e.cookieStorage.setDefaultConf(), this
                                        );
                                      },
                                    }))),
                                  (f.initNamespaceStorage = function (t) {
                                    return b(t);
                                  }),
                                  k
                                    ? ((f.localStorage = S({}, A, {
                                        _type: "localStorage",
                                      })),
                                      (f.sessionStorage = S({}, A, {
                                        _type: "sessionStorage",
                                      })))
                                    : ((f.localStorage = S({}, A, {
                                        _type: "localCookieStorage",
                                      })),
                                      (f.sessionStorage = S({}, A, {
                                        _type: "sessionCookieStorage",
                                      }))),
                                  (f.namespaceStorages = {}),
                                  (f.removeAllStorages = function (t) {
                                    f.localStorage.removeAll(t),
                                      f.sessionStorage.removeAll(t),
                                      f.cookieStorage &&
                                        f.cookieStorage.removeAll(t),
                                      t || (f.namespaceStorages = {});
                                  }),
                                  (f.alwaysUseJsonInStorage = function (t) {
                                    (A.alwaysUseJson = t),
                                      (f.localStorage.alwaysUseJson = t),
                                      (f.sessionStorage.alwaysUseJson = t),
                                      f.cookieStorage &&
                                        (f.cookieStorage.alwaysUseJson = t);
                                  }),
                                  t.abrupt("return", f)
                                );
                              case 44:
                              case "end":
                                return t.stop();
                            }
                        }, t);
                      }),
                    )),
                    g.apply(this, arguments)
                  );
                }
                function w(t) {
                  if (t.entity) {
                    var e = t.entity;
                    if (
                      (e.entityID && !e.entity_id && (e.entity_id = e.entityID),
                      e.icon && !e.entity_icon && (e.entity_icon = e.icon),
                      e.domains)
                    ) {
                      var r = e.domains.split(";") || [];
                      e.domain = r[0];
                    }
                    e.last_refresh &&
                      !e.last_use &&
                      (e.last_use = e.last_refresh),
                      e.title || (e.title = e.entity_id);
                  }
                  return t;
                }
                function b(t, e) {
                  return x.apply(this, arguments);
                }
                function x() {
                  return (x = v(
                    p().mark(function t(e, r) {
                      var n;
                      return p().wrap(function (t) {
                        for (;;)
                          switch ((t.prev = t.next)) {
                            case 0:
                              if (!e.isSet(r)) {
                                t.next = 4;
                                break;
                              }
                              if (!(n = e.get(r))) {
                                t.next = 4;
                                break;
                              }
                              return t.abrupt("return", n);
                            case 4:
                              return t.abrupt("return", void 0);
                            case 5:
                            case "end":
                              return t.stop();
                          }
                      }, t);
                    }),
                  )).apply(this, arguments);
                }
                function _(t, e) {
                  var r,
                    n = Date.now();
                  null != e.entity
                    ? (e = (r = e).entity)
                    : (r = { last_refresh: n, last_use: n, entity: e }),
                    e.entityID && !e.entity_id && (e.entity_id = e.entityID);
                  var o = e.entity_id.hexEncode();
                  return (r = w(r)), t.set(o, r);
                }
                String.prototype.hexEncode = function () {
                  var t,
                    e = "";
                  for (t = 0; t < this.length; t++)
                    e += ("000" + this.charCodeAt(t).toString(16)).slice(-4);
                  return e;
                };
                var c = await m(),
                  s = await m(!0);
                function S(t) {
                  t || (t = "$DEFAULT_CONTEXT");
                  var e = c.initNamespaceStorage(t).localStorage;
                  return e.set("_name", t), e;
                }
                function k(t) {
                  t || (t = "$DEFAULT_CONTEXT");
                  var e = s.initNamespaceStorage(t).localStorage;
                  return e.set("_name", t), e;
                }
                function E(t, e) {
                  return A.apply(this, arguments);
                }
                function A() {
                  return (A = v(
                    p().mark(function t(e, r) {
                      var n;
                      return p().wrap(function (t) {
                        for (;;)
                          switch ((t.prev = t.next)) {
                            case 0:
                              return (t.next = 2), m();
                            case 2:
                              (c = t.sent),
                                (r = r || "$DEFAULT_CONTEXT"),
                                e &&
                                  ((n = S(r)),
                                  e.forEach(function (t) {
                                    _(n, t);
                                  }));
                            case 5:
                            case "end":
                              return t.stop();
                          }
                      }, t);
                    }),
                  )).apply(this, arguments);
                }
                function O(t) {
                  return I.apply(this, arguments);
                }
                function I() {
                  return (I = v(
                    p().mark(function t(e) {
                      var r, n, o, i, a, c, s;
                      return p().wrap(
                        function (t) {
                          for (;;)
                            switch ((t.prev = t.next)) {
                              case 0:
                                (r = k((e = e || "$DEFAULT_CONTEXT"))),
                                  (n = r.keys().filter(function (t) {
                                    return void 0 !== t && "_name" !== t;
                                  })),
                                  (o = []),
                                  (i = f(n)),
                                  (t.prev = 5),
                                  i.s();
                              case 7:
                                if ((a = i.n()).done) {
                                  t.next = 15;
                                  break;
                                }
                                return (c = a.value), (t.next = 11), b(r, c);
                              case 11:
                                (s = t.sent), o.push(w(s));
                              case 13:
                                t.next = 7;
                                break;
                              case 15:
                                t.next = 20;
                                break;
                              case 17:
                                (t.prev = 17), (t.t0 = t.catch(5)), i.e(t.t0);
                              case 20:
                                return (t.prev = 20), i.f(), t.finish(20);
                              case 23:
                                return t.abrupt("return", o);
                              case 24:
                              case "end":
                                return t.stop();
                            }
                        },
                        t,
                        null,
                        [[5, 17, 20, 23]],
                      );
                    }),
                  )).apply(this, arguments);
                }
                var u = function (t) {
                  var e = (0, i.o0)();
                  e && a.includes(e.name) && document.hasStorageAccess
                    ? document
                        .hasStorageAccess()
                        .then(function (e) {
                          e
                            ? navigator.permissions
                                .query({ name: "storage-access" })
                                .then(function (e) {
                                  e
                                    ? "granted" === e.state
                                      ? document
                                          .requestStorageAccess()
                                          .then(function (e) {
                                            t();
                                          })
                                          .catch(function (e) {
                                            t();
                                          })
                                      : "prompt" === e.state
                                        ? O()
                                            .then(function (e) {
                                              document
                                                .requestStorageAccess()
                                                .then(function (r) {
                                                  E(e)
                                                    .then(function () {
                                                      t();
                                                    })
                                                    .catch(function (e) {
                                                      t();
                                                    });
                                                })
                                                .catch(function (e) {
                                                  t();
                                                });
                                            })
                                            .catch(function (e) {
                                              document
                                                .requestStorageAccess()
                                                .then(function (e) {
                                                  t();
                                                })
                                                .catch(function (e) {
                                                  t();
                                                });
                                            })
                                        : "denied" === e.state && t()
                                    : t();
                                })
                                .catch(function (e) {
                                  document
                                    .requestStorageAccess()
                                    .then(function (e) {
                                      t();
                                    })
                                    .catch(function (e) {
                                      t();
                                    });
                                })
                            : O()
                                .then(function (e) {
                                  document
                                    .requestStorageAccess()
                                    .then(function (r) {
                                      E(e)
                                        .then(function () {
                                          t();
                                        })
                                        .catch(function (e) {
                                          t();
                                        });
                                    })
                                    .catch(function (e) {
                                      t();
                                    });
                                })
                                .catch(function (e) {
                                  document
                                    .requestStorageAccess()
                                    .then(function (e) {
                                      t();
                                    })
                                    .catch(function (e) {
                                      t();
                                    });
                                });
                        })
                        .catch(function (e) {
                          t();
                        })
                    : t();
                };
                function L() {
                  return N.apply(this, arguments);
                }
                function N() {
                  return (N = v(
                    p().mark(function t() {
                      var e, r, n, o;
                      return p().wrap(
                        function (t) {
                          for (;;)
                            switch ((t.prev = t.next)) {
                              case 0:
                                if ((e = (0, i.o0)()) && a.includes(e.name)) {
                                  t.next = 3;
                                  break;
                                }
                                return t.abrupt("return", window);
                              case 3:
                                if (document.requestStorageAccess) {
                                  t.next = 5;
                                  break;
                                }
                                return t.abrupt("return", window);
                              case 5:
                                return (
                                  (t.next = 7), document.hasStorageAccess()
                                );
                              case 7:
                                if (!t.sent) {
                                  t.next = 16;
                                  break;
                                }
                                return (
                                  (t.next = 10),
                                  document.requestStorageAccess({ all: !0 })
                                );
                              case 10:
                                if (!(r = t.sent)) {
                                  t.next = 15;
                                  break;
                                }
                                return t.abrupt("return", r);
                              case 15:
                              case 35:
                              case 49:
                                return t.abrupt("return", window);
                              case 16:
                                return (
                                  (t.prev = 16),
                                  (t.next = 19),
                                  navigator.permissions.query({
                                    name: "storage-access",
                                  })
                                );
                              case 19:
                                (n = t.sent), (t.next = 25);
                                break;
                              case 22:
                                return (
                                  (t.prev = 22),
                                  (t.t0 = t.catch(16)),
                                  t.abrupt("return", window)
                                );
                              case 25:
                                if (!n) {
                                  t.next = 49;
                                  break;
                                }
                                if ("granted" !== n.state) {
                                  t.next = 43;
                                  break;
                                }
                                return (
                                  (t.prev = 27),
                                  (t.next = 30),
                                  document.requestStorageAccess({ all: !0 })
                                );
                              case 30:
                                if (!(o = t.sent)) {
                                  t.next = 35;
                                  break;
                                }
                                return t.abrupt("return", o);
                              case 36:
                                t.next = 41;
                                break;
                              case 38:
                                return (
                                  (t.prev = 38),
                                  (t.t1 = t.catch(27)),
                                  t.abrupt("return", window)
                                );
                              case 41:
                                t.next = 49;
                                break;
                              case 43:
                                if ("prompt" !== n.state) {
                                  t.next = 47;
                                  break;
                                }
                                return t.abrupt("return", window);
                              case 47:
                                if ("denied" !== n.state) {
                                  t.next = 49;
                                  break;
                                }
                                return t.abrupt("return", window);
                              case 50:
                              case "end":
                                return t.stop();
                            }
                        },
                        t,
                        null,
                        [
                          [16, 22],
                          [27, 38],
                        ],
                      );
                    }),
                  )).apply(this, arguments);
                }
                function j() {
                  return P.apply(this, arguments);
                }
                function P() {
                  return (P = v(
                    p().mark(function t() {
                      var e;
                      return p().wrap(
                        function (t) {
                          for (;;)
                            switch ((t.prev = t.next)) {
                              case 0:
                                if (document.hasStorageAccess) {
                                  t.next = 2;
                                  break;
                                }
                                return t.abrupt("return", !0);
                              case 2:
                                return (
                                  (t.next = 4), document.hasStorageAccess()
                                );
                              case 4:
                                if (!t.sent) {
                                  t.next = 6;
                                  break;
                                }
                                return t.abrupt("return", !0);
                              case 6:
                                return (
                                  (t.prev = 6),
                                  (t.next = 9),
                                  navigator.permissions.query({
                                    name: "storage-access",
                                  })
                                );
                              case 9:
                                (e = t.sent), (t.next = 15);
                                break;
                              case 12:
                                return (
                                  (t.prev = 12),
                                  (t.t0 = t.catch(6)),
                                  t.abrupt("return", !1)
                                );
                              case 15:
                                if (!e) {
                                  t.next = 26;
                                  break;
                                }
                                if ("granted" !== e.state) {
                                  t.next = 20;
                                  break;
                                }
                                return t.abrupt("return", !0);
                              case 20:
                                if ("prompt" !== e.state) {
                                  t.next = 24;
                                  break;
                                }
                                return t.abrupt("return", !1);
                              case 24:
                                if ("denied" !== e.state) {
                                  t.next = 26;
                                  break;
                                }
                                return t.abrupt("return", !1);
                              case 26:
                                return t.abrupt("return", !1);
                              case 27:
                              case "end":
                                return t.stop();
                            }
                        },
                        t,
                        null,
                        [[6, 12]],
                      );
                    }),
                  )).apply(this, arguments);
                }
                const C = m;
                n();
              } catch (T) {
                n(T);
              }
            },
            1,
          );
        },
      },
      a = {};
    function c(t) {
      var e = a[t];
      if (void 0 !== e) return e.exports;
      var r = (a[t] = { id: t, loaded: !1, exports: {} });
      return i[t].call(r.exports, r, r.exports, c), (r.loaded = !0), r.exports;
    }
    (c.m = i),
      (t =
        "function" == typeof Symbol
          ? Symbol("webpack queues")
          : "__webpack_queues__"),
      (e =
        "function" == typeof Symbol
          ? Symbol("webpack exports")
          : "__webpack_exports__"),
      (r =
        "function" == typeof Symbol
          ? Symbol("webpack error")
          : "__webpack_error__"),
      (n = (t) => {
        t &&
          t.d < 1 &&
          ((t.d = 1),
          t.forEach((t) => t.r--),
          t.forEach((t) => (t.r-- ? t.r++ : t())));
      }),
      (c.a = (o, i, a) => {
        var c;
        a && ((c = []).d = -1);
        var s,
          u,
          f,
          l = new Set(),
          h = o.exports,
          p = new Promise((t, e) => {
            (f = e), (u = t);
          });
        (p[e] = h),
          (p[t] = (t) => (c && t(c), l.forEach(t), p.catch((t) => {}))),
          (o.exports = p),
          i(
            (o) => {
              var i;
              s = ((o) =>
                o.map((o) => {
                  if (null !== o && "object" == typeof o) {
                    if (o[t]) return o;
                    if (o.then) {
                      var i = [];
                      (i.d = 0),
                        o.then(
                          (t) => {
                            (a[e] = t), n(i);
                          },
                          (t) => {
                            (a[r] = t), n(i);
                          },
                        );
                      var a = {};
                      return (a[t] = (t) => t(i)), a;
                    }
                  }
                  var c = {};
                  return (c[t] = (t) => {}), (c[e] = o), c;
                }))(o);
              var a = () =>
                  s.map((t) => {
                    if (t[r]) throw t[r];
                    return t[e];
                  }),
                u = new Promise((e) => {
                  (i = () => e(a)).r = 0;
                  var r = (t) =>
                    t !== c &&
                    !l.has(t) &&
                    (l.add(t), t && !t.d && (i.r++, t.push(i)));
                  s.map((e) => e[t](r));
                });
              return i.r ? u : a();
            },
            (t) => (t ? f((p[r] = t)) : u(h), n(c)),
          ),
          c && c.d < 0 && (c.d = 0);
      }),
      (o = []),
      (c.O = (t, e, r, n) => {
        if (!e) {
          var i = 1 / 0;
          for (f = 0; f < o.length; f++) {
            for (var [e, r, n] = o[f], a = !0, s = 0; s < e.length; s++)
              (!1 & n || i >= n) && Object.keys(c.O).every((t) => c.O[t](e[s]))
                ? e.splice(s--, 1)
                : ((a = !1), n < i && (i = n));
            if (a) {
              o.splice(f--, 1);
              var u = r();
              void 0 !== u && (t = u);
            }
          }
          return t;
        }
        n = n || 0;
        for (var f = o.length; f > 0 && o[f - 1][2] > n; f--) o[f] = o[f - 1];
        o[f] = [e, r, n];
      }),
      (c.n = (t) => {
        var e = t && t.__esModule ? () => t.default : () => t;
        return c.d(e, { a: e }), e;
      }),
      (c.d = (t, e) => {
        for (var r in e)
          c.o(e, r) &&
            !c.o(t, r) &&
            Object.defineProperty(t, r, { enumerable: !0, get: e[r] });
      }),
      (c.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e)),
      (c.r = (t) => {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(t, "__esModule", { value: !0 });
      }),
      (c.nmd = (t) => ((t.paths = []), t.children || (t.children = []), t)),
      (() => {
        var t = { 28: 0 };
        c.O.j = (e) => 0 === t[e];
        var e = (e, r) => {
            var n,
              o,
              [i, a, s] = r,
              u = 0;
            if (i.some((e) => 0 !== t[e])) {
              for (n in a) c.o(a, n) && (c.m[n] = a[n]);
              if (s) var f = s(c);
            }
            for (e && e(r); u < i.length; u++)
              (o = i[u]), c.o(t, o) && t[o] && t[o][0](), (t[o] = 0);
            return c.O(f);
          },
          r = (this.webpackChunk_theidentityselector_thiss =
            this.webpackChunk_theidentityselector_thiss || []);
        r.forEach(e.bind(null, 0)), (r.push = e.bind(null, r.push.bind(r)));
      })();
    var s = c.O(void 0, [990, 252], () => c(53048));
    return c.O(s);
  })(),
);
