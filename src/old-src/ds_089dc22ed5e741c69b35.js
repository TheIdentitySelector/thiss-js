/*! For license information please see ds_089dc22ed5e741c69b35.js.LICENSE.txt */
!(function (t, e) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
      ? define("ds", [], e)
      : "object" == typeof exports
        ? (exports.ds = e())
        : (t.ds = e());
})(this, () =>
  (() => {
    var t,
      e = {
        6776: (t, e, n) => {
          "use strict";
          n.r(e);
          var r = n(47584),
            i = (n(85990), new (n(33491).A)());
          jQuery(function (t) {
            t.widget("thiss.discovery_client", {
              options: {
                persistence: void 0,
                search: void 0,
                mdq: void 0,
                entityID: null,
                trustProfile: null,
                context: void 0,
                before: void 0,
                after: void 0,
                render: void 0,
                render_search_result: void 0,
                render_saved_choice: void 0,
                fallback_icon: void 0,
                input_field_selector: "input",
                search_result_selector: "#ds-search-list",
                saved_choices_selector: "#ds-saved-choices",
                entity_selector: ".identityprovider",
                too_many_results: void 0,
                no_results: void 0,
                persist: void 0,
              },
              _create: function () {
                var e = this;
                (e.ac = []),
                  t.isFunction(e.options.render) || (e.options.render = t.noop),
                  t.isFunction(e.options.search) ||
                    ((e.options.search_url = e.options.search),
                    (e.options.search = function (t, n) {
                      e.ac.forEach(function (t) {
                        return t.abort();
                      });
                      var i = new AbortController();
                      e.ac.push(i),
                        (0, r.pe)(
                          t,
                          e.options.search_url,
                          e.options.entityID,
                          e.options.trustProfile,
                          { signal: i.signal },
                        )
                          .then(function (t) {
                            return t.filter(function (t) {
                              return "true" !== t.hidden;
                            });
                          })
                          .then(function (t) {
                            e.ac.shift(), i.signal.aborted || n(t);
                          })
                          .catch(function (t) {
                            console.log("ERROR creating widget:", t);
                          });
                    })),
                  t.isFunction(e.options.render_search_result) ||
                    (e.options.render_search_result = e.options.render),
                  t.isFunction(e.options.render_saved_choice) ||
                    (e.options.render_saved_choice = e.options.render),
                  t.isFunction(e.options.fallback_icon) ||
                    (e.options.fallback_icon = t.noop),
                  t.isFunction(e.options.after) || (e.options.after = t.noop),
                  t.isFunction(e.options.before) ||
                    (e.options.before = function (t) {
                      return t;
                    }),
                  t.isFunction(e.options.persist) ||
                    (e.options.persist = function () {
                      return !0;
                    }),
                  e._update();
              },
              _setOption: function (t, e) {
                (this.options[t] = e), this._update();
              },
              sp: function () {
                var t = new URLSearchParams(window.location.search).get(
                  "entityID",
                );
                return t
                  ? this._ds.mdq_sp(t).then(function (e) {
                      return e
                        ? Promise.resolve(e)
                        : Promise.resolve({ entity_id: t, title: t });
                    })
                  : (console.log(
                      "Missing entityID parameter in discovery request",
                    ),
                    Promise.resolve({ title: "Unknown" }));
              },
              _after: function (e) {
                var n = t(this.options.saved_choices_selector);
                if (this.options.search) {
                  var r = this,
                    o = t(r.options.search_result_selector),
                    a = 0;
                  t(r.options.input_field_selector).focus(),
                    o.btsListFilter(r.options.input_field_selector, {
                      localization: i,
                      resetOnBlur: !1,
                      casesensitive: !1,
                      maxResults: 10,
                      minLength: "3",
                      itemEl: r.options.entity_selector,
                      getValue: function (t) {
                        var e = t.val(),
                          n = e.indexOf("@");
                        return n > -1 ? e.substring(n + 1, e.length) : e;
                      },
                      sourceNodes: function (e, n, i, o) {
                        if (i && 0 !== i.length)
                          if (e.maxResults > 0 && i.length > e.maxResults)
                            o(r.options.too_many_results(this, i.length));
                          else {
                            var s = 0,
                              l = function (t) {
                                var e = (function () {
                                    if (0 === s)
                                      return (
                                        (s = i.length < 25 ? i.length : 25),
                                        i.slice(0, 24)
                                      );
                                    if (i.length >= 25) {
                                      var t = i.slice(s, s + 25);
                                      return (s += t.length), t;
                                    }
                                  })(),
                                  n = [];
                                for (var l in (t && (a = 0), e)) {
                                  var c = e[l];
                                  (a += 1),
                                    (c.counter = a),
                                    (c.saved = !1),
                                    n.push(c);
                                }
                                o(r.options.render_search_result(e));
                              };
                            l(!0),
                              (window.onscroll = function (e) {
                                i.length >= 25 &&
                                  t(window).scrollTop() + t(window).height() >
                                    0.75 * t(document).height() &&
                                  l(!1);
                              });
                          }
                        else o(r.options.no_results(n));
                      },
                      sourceData: r.options.search,
                      cancelNode: function () {
                        console.log("cancel");
                      },
                    });
                }
                this.options.after(e, n);
              },
              _update: function () {
                var e = this;
                (e._ds = new r.KC(
                  e.options.mdq,
                  e.options.persistence,
                  e.options.context,
                  {
                    entityID: e.options.entityID,
                    trustProfile: e.options.trustProfile,
                  },
                )),
                  (e._count = 0),
                  e.element,
                  t("img.pyff-idp-icon").bind("error", function () {
                    t(this).unbind("error"), e.options.fallback_icon(this);
                  }),
                  t("body").on(
                    "mouseenter",
                    e.options.entity_selector,
                    function (e) {
                      t(this).addClass("active");
                    },
                  ),
                  t("body").on(
                    "mouseleave",
                    e.options.entity_selector,
                    function (e) {
                      t(this).removeClass("active");
                    },
                  ),
                  t("body").on(
                    "click",
                    e.options.entity_selector,
                    function (n) {
                      n.preventDefault();
                      var r = t(this)
                        .closest(e.options.entity_selector)
                        .attr("data-href");
                      return e._ds.saml_discovery_response(
                        r,
                        e.options.persist(),
                      );
                    },
                  ),
                  t("body").on(
                    "keyup",
                    e.options.entity_selector,
                    function (e) {
                      13 === e.keyCode && (e.preventDefault(), t(this).click());
                    },
                  ),
                  t(e.options.input_field_selector)
                    .closest("form")
                    .submit(function (t) {
                      t.preventDefault();
                    }),
                  t("body").on(
                    "click",
                    ".institution-remove-cross-wrapper",
                    function (n) {
                      n.preventDefault(), n.stopPropagation();
                      var r = t(this).closest(e.options.entity_selector),
                        i = t(this).closest("li.list-item");
                      e._count = r.siblings().length + 1;
                      var o = r.attr("data-href");
                      o &&
                        e._ds
                          .remove(o)
                          .then(function () {
                            r.remove();
                          })
                          .then(function () {
                            (e._count -= 1), i.remove();
                          });
                    },
                  ),
                  t("body").on("keypress", ".remove", function (e) {
                    13 == e.which && t(".remove").click();
                  }),
                  e._ds.with_items(function (t) {
                    return e.options
                      .before(t)
                      .then(function (t) {
                        var n = 0,
                          r = [];
                        return (
                          t &&
                            t.length > 0 &&
                            t.forEach(function (t) {
                              var e = t.entity;
                              (e.saved = !0), r.push(e), n++;
                            }),
                          e.options.render_saved_choice(r),
                          n
                        );
                      })
                      .then(function (n) {
                        return e._after(n), t;
                      });
                  });
              },
            });
          });
        },
        33491: (t, e, n) => {
          "use strict";
          function r(t) {
            return (
              (r =
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
              r(t)
            );
          }
          function i() {
            i = function () {
              return e;
            };
            var t,
              e = {},
              n = Object.prototype,
              o = n.hasOwnProperty,
              a =
                Object.defineProperty ||
                function (t, e, n) {
                  t[e] = n.value;
                },
              s = "function" == typeof Symbol ? Symbol : {},
              l = s.iterator || "@@iterator",
              c = s.asyncIterator || "@@asyncIterator",
              u = s.toStringTag || "@@toStringTag";
            function d(t, e, n) {
              return (
                Object.defineProperty(t, e, {
                  value: n,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                }),
                t[e]
              );
            }
            try {
              d({}, "");
            } catch (t) {
              d = function (t, e, n) {
                return (t[e] = n);
              };
            }
            function f(t, e, n, r) {
              var i = e && e.prototype instanceof _ ? e : _,
                o = Object.create(i.prototype),
                s = new D(r || []);
              return a(o, "_invoke", { value: T(t, n, s) }), o;
            }
            function h(t, e, n) {
              try {
                return { type: "normal", arg: t.call(e, n) };
              } catch (t) {
                return { type: "throw", arg: t };
              }
            }
            e.wrap = f;
            var p = "suspendedStart",
              v = "suspendedYield",
              g = "executing",
              m = "completed",
              y = {};
            function _() {}
            function b() {}
            function w() {}
            var x = {};
            d(x, l, function () {
              return this;
            });
            var C = Object.getPrototypeOf,
              k = C && C(C(N([])));
            k && k !== n && o.call(k, l) && (x = k);
            var L = (w.prototype = _.prototype = Object.create(x));
            function E(t) {
              ["next", "throw", "return"].forEach(function (e) {
                d(t, e, function (t) {
                  return this._invoke(e, t);
                });
              });
            }
            function S(t, e) {
              function n(i, a, s, l) {
                var c = h(t[i], t, a);
                if ("throw" !== c.type) {
                  var u = c.arg,
                    d = u.value;
                  return d && "object" == r(d) && o.call(d, "__await")
                    ? e.resolve(d.__await).then(
                        function (t) {
                          n("next", t, s, l);
                        },
                        function (t) {
                          n("throw", t, s, l);
                        },
                      )
                    : e.resolve(d).then(
                        function (t) {
                          (u.value = t), s(u);
                        },
                        function (t) {
                          return n("throw", t, s, l);
                        },
                      );
                }
                l(c.arg);
              }
              var i;
              a(this, "_invoke", {
                value: function (t, r) {
                  function o() {
                    return new e(function (e, i) {
                      n(t, r, e, i);
                    });
                  }
                  return (i = i ? i.then(o, o) : o());
                },
              });
            }
            function T(e, n, r) {
              var i = p;
              return function (o, a) {
                if (i === g) throw Error("Generator is already running");
                if (i === m) {
                  if ("throw" === o) throw a;
                  return { value: t, done: !0 };
                }
                for (r.method = o, r.arg = a; ; ) {
                  var s = r.delegate;
                  if (s) {
                    var l = O(s, r);
                    if (l) {
                      if (l === y) continue;
                      return l;
                    }
                  }
                  if ("next" === r.method) r.sent = r._sent = r.arg;
                  else if ("throw" === r.method) {
                    if (i === p) throw ((i = m), r.arg);
                    r.dispatchException(r.arg);
                  } else "return" === r.method && r.abrupt("return", r.arg);
                  i = g;
                  var c = h(e, n, r);
                  if ("normal" === c.type) {
                    if (((i = r.done ? m : v), c.arg === y)) continue;
                    return { value: c.arg, done: r.done };
                  }
                  "throw" === c.type &&
                    ((i = m), (r.method = "throw"), (r.arg = c.arg));
                }
              };
            }
            function O(e, n) {
              var r = n.method,
                i = e.iterator[r];
              if (i === t)
                return (
                  (n.delegate = null),
                  ("throw" === r &&
                    e.iterator.return &&
                    ((n.method = "return"),
                    (n.arg = t),
                    O(e, n),
                    "throw" === n.method)) ||
                    ("return" !== r &&
                      ((n.method = "throw"),
                      (n.arg = new TypeError(
                        "The iterator does not provide a '" + r + "' method",
                      )))),
                  y
                );
              var o = h(i, e.iterator, n.arg);
              if ("throw" === o.type)
                return (
                  (n.method = "throw"), (n.arg = o.arg), (n.delegate = null), y
                );
              var a = o.arg;
              return a
                ? a.done
                  ? ((n[e.resultName] = a.value),
                    (n.next = e.nextLoc),
                    "return" !== n.method && ((n.method = "next"), (n.arg = t)),
                    (n.delegate = null),
                    y)
                  : a
                : ((n.method = "throw"),
                  (n.arg = new TypeError("iterator result is not an object")),
                  (n.delegate = null),
                  y);
            }
            function j(t) {
              var e = { tryLoc: t[0] };
              1 in t && (e.catchLoc = t[1]),
                2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
                this.tryEntries.push(e);
            }
            function P(t) {
              var e = t.completion || {};
              (e.type = "normal"), delete e.arg, (t.completion = e);
            }
            function D(t) {
              (this.tryEntries = [{ tryLoc: "root" }]),
                t.forEach(j, this),
                this.reset(!0);
            }
            function N(e) {
              if (e || "" === e) {
                var n = e[l];
                if (n) return n.call(e);
                if ("function" == typeof e.next) return e;
                if (!isNaN(e.length)) {
                  var i = -1,
                    a = function n() {
                      for (; ++i < e.length; )
                        if (o.call(e, i))
                          return (n.value = e[i]), (n.done = !1), n;
                      return (n.value = t), (n.done = !0), n;
                    };
                  return (a.next = a);
                }
              }
              throw new TypeError(r(e) + " is not iterable");
            }
            return (
              (b.prototype = w),
              a(L, "constructor", { value: w, configurable: !0 }),
              a(w, "constructor", { value: b, configurable: !0 }),
              (b.displayName = d(w, u, "GeneratorFunction")),
              (e.isGeneratorFunction = function (t) {
                var e = "function" == typeof t && t.constructor;
                return (
                  !!e &&
                  (e === b || "GeneratorFunction" === (e.displayName || e.name))
                );
              }),
              (e.mark = function (t) {
                return (
                  Object.setPrototypeOf
                    ? Object.setPrototypeOf(t, w)
                    : ((t.__proto__ = w), d(t, u, "GeneratorFunction")),
                  (t.prototype = Object.create(L)),
                  t
                );
              }),
              (e.awrap = function (t) {
                return { __await: t };
              }),
              E(S.prototype),
              d(S.prototype, c, function () {
                return this;
              }),
              (e.AsyncIterator = S),
              (e.async = function (t, n, r, i, o) {
                void 0 === o && (o = Promise);
                var a = new S(f(t, n, r, i), o);
                return e.isGeneratorFunction(n)
                  ? a
                  : a.next().then(function (t) {
                      return t.done ? t.value : a.next();
                    });
              }),
              E(L),
              d(L, u, "Generator"),
              d(L, l, function () {
                return this;
              }),
              d(L, "toString", function () {
                return "[object Generator]";
              }),
              (e.keys = function (t) {
                var e = Object(t),
                  n = [];
                for (var r in e) n.push(r);
                return (
                  n.reverse(),
                  function t() {
                    for (; n.length; ) {
                      var r = n.pop();
                      if (r in e) return (t.value = r), (t.done = !1), t;
                    }
                    return (t.done = !0), t;
                  }
                );
              }),
              (e.values = N),
              (D.prototype = {
                constructor: D,
                reset: function (e) {
                  if (
                    ((this.prev = 0),
                    (this.next = 0),
                    (this.sent = this._sent = t),
                    (this.done = !1),
                    (this.delegate = null),
                    (this.method = "next"),
                    (this.arg = t),
                    this.tryEntries.forEach(P),
                    !e)
                  )
                    for (var n in this)
                      "t" === n.charAt(0) &&
                        o.call(this, n) &&
                        !isNaN(+n.slice(1)) &&
                        (this[n] = t);
                },
                stop: function () {
                  this.done = !0;
                  var t = this.tryEntries[0].completion;
                  if ("throw" === t.type) throw t.arg;
                  return this.rval;
                },
                dispatchException: function (e) {
                  if (this.done) throw e;
                  var n = this;
                  function r(r, i) {
                    return (
                      (s.type = "throw"),
                      (s.arg = e),
                      (n.next = r),
                      i && ((n.method = "next"), (n.arg = t)),
                      !!i
                    );
                  }
                  for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                    var a = this.tryEntries[i],
                      s = a.completion;
                    if ("root" === a.tryLoc) return r("end");
                    if (a.tryLoc <= this.prev) {
                      var l = o.call(a, "catchLoc"),
                        c = o.call(a, "finallyLoc");
                      if (l && c) {
                        if (this.prev < a.catchLoc) return r(a.catchLoc, !0);
                        if (this.prev < a.finallyLoc) return r(a.finallyLoc);
                      } else if (l) {
                        if (this.prev < a.catchLoc) return r(a.catchLoc, !0);
                      } else {
                        if (!c)
                          throw Error("try statement without catch or finally");
                        if (this.prev < a.finallyLoc) return r(a.finallyLoc);
                      }
                    }
                  }
                },
                abrupt: function (t, e) {
                  for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                    var r = this.tryEntries[n];
                    if (
                      r.tryLoc <= this.prev &&
                      o.call(r, "finallyLoc") &&
                      this.prev < r.finallyLoc
                    ) {
                      var i = r;
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
                      ? ((this.method = "next"), (this.next = i.finallyLoc), y)
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
                    y
                  );
                },
                finish: function (t) {
                  for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                    var n = this.tryEntries[e];
                    if (n.finallyLoc === t)
                      return this.complete(n.completion, n.afterLoc), P(n), y;
                  }
                },
                catch: function (t) {
                  for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                    var n = this.tryEntries[e];
                    if (n.tryLoc === t) {
                      var r = n.completion;
                      if ("throw" === r.type) {
                        var i = r.arg;
                        P(n);
                      }
                      return i;
                    }
                  }
                  throw Error("illegal catch attempt");
                },
                delegateYield: function (e, n, r) {
                  return (
                    (this.delegate = {
                      iterator: N(e),
                      resultName: n,
                      nextLoc: r,
                    }),
                    "next" === this.method && (this.arg = t),
                    y
                  );
                },
              }),
              e
            );
          }
          function o(t, e) {
            var n =
              ("undefined" != typeof Symbol && t[Symbol.iterator]) ||
              t["@@iterator"];
            if (!n) {
              if (
                Array.isArray(t) ||
                (n = (function (t, e) {
                  if (t) {
                    if ("string" == typeof t) return a(t, e);
                    var n = {}.toString.call(t).slice(8, -1);
                    return (
                      "Object" === n &&
                        t.constructor &&
                        (n = t.constructor.name),
                      "Map" === n || "Set" === n
                        ? Array.from(t)
                        : "Arguments" === n ||
                            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                          ? a(t, e)
                          : void 0
                    );
                  }
                })(t)) ||
                (e && t && "number" == typeof t.length)
              ) {
                n && (t = n);
                var r = 0,
                  i = function () {};
                return {
                  s: i,
                  n: function () {
                    return r >= t.length
                      ? { done: !0 }
                      : { done: !1, value: t[r++] };
                  },
                  e: function (t) {
                    throw t;
                  },
                  f: i,
                };
              }
              throw new TypeError(
                "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
              );
            }
            var o,
              s = !0,
              l = !1;
            return {
              s: function () {
                n = n.call(t);
              },
              n: function () {
                var t = n.next();
                return (s = t.done), t;
              },
              e: function (t) {
                (l = !0), (o = t);
              },
              f: function () {
                try {
                  s || null == n.return || n.return();
                } finally {
                  if (l) throw o;
                }
              },
            };
          }
          function a(t, e) {
            (null == e || e > t.length) && (e = t.length);
            for (var n = 0, r = Array(e); n < e; n++) r[n] = t[n];
            return r;
          }
          function s(t, e, n, r, i, o, a) {
            try {
              var s = t[o](a),
                l = s.value;
            } catch (t) {
              return void n(t);
            }
            s.done ? e(l) : Promise.resolve(l).then(r, i);
          }
          function l(t, e) {
            for (var n = 0; n < e.length; n++) {
              var r = e[n];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                "value" in r && (r.writable = !0),
                Object.defineProperty(t, c(r.key), r);
            }
          }
          function c(t) {
            var e = (function (t) {
              if ("object" != r(t) || !t) return t;
              var e = t[Symbol.toPrimitive];
              if (void 0 !== e) {
                var n = e.call(t, "string");
                if ("object" != r(n)) return n;
                throw new TypeError(
                  "@@toPrimitive must return a primitive value.",
                );
              }
              return String(t);
            })(t);
            return "symbol" == r(e) ? e : e + "";
          }
          function u() {
            try {
              var t = !Boolean.prototype.valueOf.call(
                Reflect.construct(Boolean, [], function () {}),
              );
            } catch (t) {}
            return (u = function () {
              return !!t;
            })();
          }
          function d(t) {
            return (
              (d = Object.setPrototypeOf
                ? Object.getPrototypeOf.bind()
                : function (t) {
                    return t.__proto__ || Object.getPrototypeOf(t);
                  }),
              d(t)
            );
          }
          function f(t, e) {
            return (
              (f = Object.setPrototypeOf
                ? Object.setPrototypeOf.bind()
                : function (t, e) {
                    return (t.__proto__ = e), t;
                  }),
              f(t, e)
            );
          }
          n.d(e, { A: () => g });
          var h = n(87860),
            p = "en",
            v = document.getElementById("locale-selector"),
            g = (function (t) {
              function e(t) {
                var n;
                return (
                  (function (t, e) {
                    if (!(t instanceof e))
                      throw new TypeError("Cannot call a class as a function");
                  })(this, e),
                  ((n = (function (t, e, n) {
                    return (
                      (e = d(e)),
                      (function (t, e) {
                        if (e && ("object" == r(e) || "function" == typeof e))
                          return e;
                        if (void 0 !== e)
                          throw new TypeError(
                            "Derived constructors may only return object or undefined",
                          );
                        return (function (t) {
                          if (void 0 === t)
                            throw new ReferenceError(
                              "this hasn't been initialised - super() hasn't been called",
                            );
                          return t;
                        })(t);
                      })(
                        t,
                        u()
                          ? Reflect.construct(e, n || [], d(t).constructor)
                          : e.apply(t, n),
                      )
                    );
                  })(this, e)).locale = t),
                  (n.file = null),
                  n.selectAvailableLocale(),
                  n.selectNewLocale(),
                  (n.dynamic = {}),
                  n
                );
              }
              return (
                (function (t, e) {
                  if ("function" != typeof e && null !== e)
                    throw new TypeError(
                      "Super expression must either be null or a function",
                    );
                  (t.prototype = Object.create(e && e.prototype, {
                    constructor: { value: t, writable: !0, configurable: !0 },
                  })),
                    Object.defineProperty(t, "prototype", { writable: !1 }),
                    e && f(t, e);
                })(e, t),
                (n = e),
                (a = [
                  {
                    key: "updateDynamic",
                    value: function (t) {
                      if (
                        "title_langs" in t &&
                        t.title_langs &&
                        t.title_langs.constructor === Object
                      )
                        for (
                          var e = 0, n = Object.keys(t.title_langs);
                          e < n.length;
                          e++
                        ) {
                          var r = n[e];
                          r in this.dynamic || (this.dynamic[r] = {}),
                            (this.dynamic[r][t.entityID] = t.title_langs[r]);
                        }
                    },
                  },
                  {
                    key: "selectAvailableLocale",
                    value: function (t) {
                      var e = this,
                        n = this.formatLocale(
                          window.navigator.userLanguage ||
                            window.navigator.language ||
                            p,
                        );
                      (n = t
                        ? this.formatLocale(t)
                        : this.locale
                          ? this.formatLocale(this.locale)
                          : this.formatLocale(n)),
                        this.fetchLocaleFile(n).catch(function () {
                          e.selectAvailableLocale(p);
                        });
                    },
                  },
                  {
                    key: "selectNewLocale",
                    value: function () {
                      var t = this;
                      v &&
                        v.addEventListener("change", function (e) {
                          (t.locale = e.target.value),
                            t.updateLocaleSelector(e.target.value),
                            t.selectAvailableLocale();
                        });
                    },
                  },
                  {
                    key: "formatLocale",
                    value: function (t) {
                      return t.split("-")[0] ? t.split("-")[0] : p;
                    },
                  },
                  {
                    key: "updateLocaleSelector",
                    value: function (t) {
                      v && t && (v.value = t);
                    },
                  },
                  {
                    key: "fetchLocaleFile",
                    value: function (t) {
                      var e = this;
                      return new Promise(function (n, r) {
                        fetch("/translations/".concat(t, ".json"))
                          .then(function (t) {
                            return t.json();
                          })
                          .then(function (r) {
                            if (t in e.dynamic)
                              for (
                                var i = 0, o = Object.keys(e.dynamic[t]);
                                i < o.length;
                                i++
                              ) {
                                var a = o[i];
                                r[a] = e.dynamic[t][a];
                              }
                            (e.file = r),
                              e.setLocale(t),
                              e.load(r, t),
                              e.updateLocaleSelector(t);
                            for (
                              var s = document.querySelectorAll("[data-i18n]"),
                                l = 0;
                              l < s.length;
                              l++
                            ) {
                              var c = s[l].dataset.i18n;
                              if (c) {
                                var u = e.i18n(c);
                                u && u !== c && (s[l].textContent = u);
                              }
                            }
                            n();
                          })
                          .catch(function (t) {
                            r(t);
                          });
                      });
                    },
                  },
                  {
                    key: "translateString",
                    value: function (t) {
                      var e = this.i18n(t);
                      return this.file.hasOwnProperty(e)
                        ? this.file[e]
                          ? this.file[e]
                          : ""
                        : e;
                    },
                  },
                  {
                    key: "translateStringP",
                    value:
                      ((c = i().mark(function t(e) {
                        var n,
                          r,
                          a,
                          s,
                          l,
                          c = this;
                        return i().wrap(
                          function (t) {
                            for (;;)
                              switch ((t.prev = t.next)) {
                                case 0:
                                  if (
                                    ((n = ""), null === this.file || !this.file)
                                  ) {
                                    t.next = 5;
                                    break;
                                  }
                                  (n = this.translateString(e)), (t.next = 24);
                                  break;
                                case 5:
                                  (r = !1),
                                    (a = o(new Array(60).keys())),
                                    (t.prev = 7),
                                    (l = i().mark(function t() {
                                      return i().wrap(function (t) {
                                        for (;;)
                                          switch ((t.prev = t.next)) {
                                            case 0:
                                              if ((s.value, r)) {
                                                t.next = 7;
                                                break;
                                              }
                                              return (
                                                (t.next = 5),
                                                new Promise(function (t) {
                                                  setTimeout(function () {
                                                    null !== c.file &&
                                                      c.file &&
                                                      ((n =
                                                        c.translateString(e)),
                                                      (r = !0)),
                                                      t();
                                                  }, 500);
                                                })
                                              );
                                            case 5:
                                              t.next = 8;
                                              break;
                                            case 7:
                                              return t.abrupt("return", 1);
                                            case 8:
                                            case "end":
                                              return t.stop();
                                          }
                                      }, t);
                                    })),
                                    a.s();
                                case 10:
                                  if ((s = a.n()).done) {
                                    t.next = 16;
                                    break;
                                  }
                                  return t.delegateYield(l(), "t0", 12);
                                case 12:
                                  if (!t.t0) {
                                    t.next = 14;
                                    break;
                                  }
                                  return t.abrupt("break", 16);
                                case 14:
                                  t.next = 10;
                                  break;
                                case 16:
                                  t.next = 21;
                                  break;
                                case 18:
                                  (t.prev = 18), (t.t1 = t.catch(7)), a.e(t.t1);
                                case 21:
                                  return (t.prev = 21), a.f(), t.finish(21);
                                case 24:
                                  return t.abrupt("return", n);
                                case 25:
                                case "end":
                                  return t.stop();
                              }
                          },
                          t,
                          this,
                          [[7, 18, 21, 24]],
                        );
                      })),
                      (h = function () {
                        var t = this,
                          e = arguments;
                        return new Promise(function (n, r) {
                          var i = c.apply(t, e);
                          function o(t) {
                            s(i, n, r, o, a, "next", t);
                          }
                          function a(t) {
                            s(i, n, r, o, a, "throw", t);
                          }
                          o(void 0);
                        });
                      }),
                      function (t) {
                        return h.apply(this, arguments);
                      }),
                  },
                ]),
                a && l(n.prototype, a),
                Object.defineProperty(n, "prototype", { writable: !1 }),
                n
              );
              var n, a, c, h;
            })(h);
        },
        52890: () => {
          var t;
          (t = jQuery).fn.btsListFilter = function (e, n) {
            "use strict";
            var r,
              i,
              o,
              a,
              s,
              l = this,
              c = t(this),
              u = t(e),
              d = c,
              f = n.localization;
            return (
              (n = t.extend(
                {
                  delay: 300,
                  minLength: 3,
                  initial: !0,
                  casesensitive: !1,
                  eventKey: "keyup",
                  resetOnBlur: !0,
                  sourceData: null,
                  sourceTmpl:
                    '<a class="list-group-item" href="#"><span>{title}</span></a>',
                  sourceNode: function (t) {
                    return (function (t, e) {
                      return t.replace(/\{ *([\w_]+) *\}/g, function (t, n) {
                        return e[n] || "";
                      });
                    })(n.sourceTmpl, t);
                  },
                  emptyNode: function (t) {
                    var e = f.translateString("list-filter-no-results");
                    return '<a class="list-group-item well" href="#"><span>'.concat(
                      e,
                      "</span></a>",
                    );
                  },
                  cancelNode: function () {
                    return '<span class="btn glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>';
                  },
                  maxResults: -1,
                  maxResultsNode: function (t) {
                    var e = f.translateString("list-filter-too-many-results");
                    return '<span class="list-group-item well">'.concat(
                      e,
                      "</span>",
                    );
                  },
                  sourceNodes: void 0,
                  loadingClass: "bts-loading-list",
                  itemClassTmp: "bts-dynamic-item",
                  itemEl: ".list-group-item",
                  itemChild: null,
                  itemFilter: function (e, r) {
                    r = r && r.replace(new RegExp("[({[^.$*+?\\]})]", "g"), "");
                    var i = t(e).text(),
                      o = n.initial ? "^" : "";
                    return new RegExp(o + r, n.casesensitive ? "" : "i").test(
                      i,
                    );
                  },
                  showEvent: "show.bs",
                  hideEvent: "hide.bs",
                },
                n,
              )),
              (l.reset = function () {
                u.val("").trigger(n.eventKey);
              }),
              (l.showall = function () {
                (n.maxResults = -1), u.val(u.val()).trigger(n.eventKey);
              }),
              t("body").on("click", "#reset", function () {
                l.reset();
              }),
              t("body").on("click", "#showall", function () {
                l.showall();
              }),
              t.isFunction(n.cancelNode) &&
                ((r = t(n.cancelNode.call(l)).hide()),
                u.after(r),
                u.parents(".form-group").addClass("has-feedback"),
                u.prev().is(".control-label") || r.css({ top: 0 }),
                r.css({ "pointer-events": "auto" }),
                r.on("click", l.reset)),
              u.on(
                n.eventKey,
                ((o = function (e) {
                  if (9 !== e.keyCode) {
                    var o = t(this).val();
                    n.itemEl && (d = c.find(n.itemEl)),
                      n.itemChild && (d = d.find(n.itemChild));
                    var a = d.filter(function () {
                        return n.itemFilter.call(l, this, o);
                      }),
                      s = d.not(a);
                    n.itemChild &&
                      ((a = a.parents(n.itemEl)),
                      (s = s.parents(n.itemEl).hide())),
                      "" !== o && o.length >= n.minLength
                        ? (c.html(""),
                          a.show(),
                          s.hide(),
                          r.show(),
                          l.trigger(n.showEvent),
                          "function" === t.type(n.sourceData)
                            ? (a.hide(),
                              s.hide(),
                              i &&
                                (t.isFunction(i.abort)
                                  ? i.abort()
                                  : t.isFunction(i.stop) && i.stop()),
                              c.addClass(n.loadingClass),
                              (i = n.sourceData.call(l, o, function (e) {
                                if (
                                  ((i = null),
                                  a.hide(),
                                  s.hide(),
                                  c.find("." + n.itemClassTmp).remove(),
                                  n.sourceNodes)
                                )
                                  n.sourceNodes.call(l, n, o, e, function (e) {
                                    t(e).addClass(n.itemClassTmp).appendTo(c);
                                  });
                                else if (e && 0 !== e.length)
                                  if (
                                    n.maxResults < 0 ||
                                    e.length <= n.maxResults
                                  )
                                    for (var r in e)
                                      t(n.sourceNode.call(l, e[r]))
                                        .addClass(n.itemClassTmp)
                                        .appendTo(c);
                                  else
                                    t(n.maxResultsNode(e))
                                      .addClass(n.itemClassTmp)
                                      .appendTo(c);
                                else
                                  t(n.emptyNode.call(l, o))
                                    .addClass(n.itemClassTmp)
                                    .appendTo(c);
                                c.removeClass(n.loadingClass);
                              })))
                            : (c.find("." + n.itemClassTmp).remove(),
                              0 === a.length &&
                                t(n.emptyNode.call(l, o))
                                  .addClass(n.itemClassTmp)
                                  .appendTo(c)))
                        : (a.show(),
                          s.show(),
                          r.hide(),
                          l.trigger(n.hideEvent),
                          c.find("." + n.itemClassTmp).remove(),
                          c.html(""));
                  }
                }),
                (a = (a = n.delay) || 300),
                function () {
                  var t = this,
                    e = arguments;
                  clearTimeout(s),
                    (s = setTimeout(function () {
                      o.apply(t, Array.prototype.slice.call(e));
                    }, a));
                }),
              ),
              n.resetOnBlur &&
                u.on("blur", function (t) {
                  l.reset();
                }),
              c
            );
          };
        },
        92891: (t, e, n) => {
          "use strict";
          n(85990);
          var r = n(33491),
            i = n(36423),
            o = n(33034),
            a = n(49370),
            s = n(61862),
            l = n(46198),
            c = n(78440),
            u = n(53185),
            d = n(9763),
            f = n(97769),
            h = (n(70123), n(59853), n(47584));
          i.$W.autoReplaceSvg = "nest";
          var p = new r.A();
          i.Yv.add(o.jk, a.hp, l.vm, d.GR, c.zp, u.SG, s.$U),
            i.tT.watch(),
            (window.jQuery = f),
            (window.$ = f),
            n(52890),
            n(6776),
            parseInt("MISSING_ENV_VAR".ITEM_TTL || "3600");
          var v = "$MDQ_URL";
          f(document).ready(function () {
            var t = null,
              e = window.location.search,
              n = new URLSearchParams(e),
              r = null,
              i = null;
            n.has("entityID") && (r = n.get("entityID")),
              n.has("trustProfile") && (i = n.get("trustProfile")),
              f("#learn-more-trigger, #learn-more-close").on(
                "click",
                function () {
                  f("#learn-more-banner").toggleClass("d-none");
                },
              ),
              f("#search")
                .on("hidden.bs.collapse", function (t) {
                  f("#choose").toggleClass("d-none"),
                    f("#search").toggleClass("d-none"),
                    f("#searchinput").val("");
                })
                .on("shown.bs.collapse", function (t) {
                  f("#choose").toggleClass("d-none"),
                    f("#search").toggleClass("d-none"),
                    f("#searchinput").focus();
                }),
              f("#ds-search-list")
                .on("show.bs", function (e) {
                  t = setTimeout(function () {
                    t &&
                      (console.log("searching"),
                      f("#searching").removeClass("d-none"));
                  }, 2500);
                })
                .on("hide.bs", function (e) {
                  f("#searching").addClass("d-none"), t && clearTimeout(t);
                }),
              f("#add_button").on("click", function (t) {
                t.preventDefault(),
                  f("#choose").toggleClass("d-none"),
                  f("#search").toggleClass("d-none");
              }),
              f("#edit_button").on("click", function (t) {
                f("#choosetools").toggleClass("d-none"),
                  f(".warning-banner").toggleClass("d-none"),
                  f("#done_button")
                    .toggleClass("d-none")
                    .toggleClass("display-block"),
                  f("#savedchoices").removeClass("choose").addClass("edit"),
                  f("#choose > span.choose").toggleClass("d-none"),
                  f("#choose > span.edit").toggleClass("d-none"),
                  f(".institution-text").addClass("item-fade"),
                  f(".institution-icon").addClass("item-fade"),
                  f(".institution-select").toggleClass("d-none"),
                  f(".institution-remove").toggleClass("d-none");
              }),
              f("#done_button").on("click", function (t) {
                t.preventDefault(),
                  f("#done_button")
                    .toggleClass("d-none")
                    .toggleClass("display-block"),
                  f("#choosetools").toggleClass("d-none"),
                  f(".warning-banner").toggleClass("d-none"),
                  f("#savedchoices").removeClass("edit").addClass("choose"),
                  f("#choose > span.edit").toggleClass("d-none"),
                  f("#choose > span.choose").toggleClass("d-none"),
                  f(".institution-text").removeClass("item-fade"),
                  f(".institution-icon").removeClass("item-fade"),
                  f(".institution-select").toggleClass("d-none"),
                  f(".institution-remove").toggleClass("d-none");
              }),
              f("#discovery-response-warning-header-link").on(
                "click",
                function (t) {
                  t.preventDefault(),
                    f("#dsclient").children().not(".d-none")[0],
                    f("#dsclient").addClass("d-none"),
                    f("#discovery-response-warning").removeClass("d-none");
                },
              ),
              f("#warning-done-button").on("click", function (t) {
                t.preventDefault(),
                  f("#dsclient").removeClass("d-none"),
                  f("#discovery-response-warning").addClass("d-none");
              }),
              f("#dsclient")
                .discovery_client({
                  mdq: v,
                  persistence: "$PERSISTENCE_URL",
                  search: "$MDQ_URL",
                  entityID: r,
                  trustProfile: i,
                  context: "$DEFAULT_CONTEXT",
                  inputfieldselector: "#searchinput",
                  _render_search_result: function (t, e, n) {
                    var r = p.locale;
                    r = r.split("-")[0];
                    var i = [],
                      o = ejs.compile(
                        '<li class="col list-item pb-0" aria-label="Select <%= title %>">\n    <a class="row institution identityprovider" data-href="<%= entity_id %>" href="#">\n        <div class="col-9 pl-0">\n          <div class="text-truncate label primary" data-i18n="<%= title_i18n %>"><%= title %></div>\n            <div class="text-truncate label-url secondary"><%= domain %></div>\n        </div>\n            <% if(!strictProfile && !hint){ %>\n            <div class="col-3 pr-0">\n                <i class="fa fa-exclamation-triangle mt-2 mr-2 list-item-warning"></i>\n            </div>\n            <% } %>\n        <i class="arrow fa fa-angle-right"></i>\n    </a>\n    <% if(!strictProfile && !hint){ %>\n    <div class="row list-item-legend">\n        <div class="col px-0 mt-3 institution-warning">\n          <p class="px-2 py-2 mt-0 mb-0"><i class="fa fa-exclamation-triangle mr-1"></i> <span data-i18n="ds-search-may-not-provide">This institution may not provide access.</span> \x3c!-- a href="https://seamlessaccess.org/" target="_blank" data-i18n="ds-search-learn-more">Learn more</a --\x3e</p>\n        </div>\n    </div>\n    <% } %>\n</li>\n',
                      );
                    t.forEach(function (t) {
                      p.updateDynamic(t);
                      var n = !1;
                      !e && "hint" in t && (n = !0);
                      var a = t.entityID,
                        s = t.title;
                      "title_langs" in t &&
                        r in t.title_langs &&
                        (s = t.title_langs[r]);
                      var l = {
                          title: s,
                          title_i18n: a,
                          domain: t.domain,
                          entity_id: t.entity_id,
                          strictProfile: e,
                          hint: n,
                        },
                        c = o(l);
                      i.push(c);
                    }),
                      t &&
                        t.length > 0 &&
                        (t[0].hasOwnProperty("counter") && t[0].counter > 1
                          ? f("#ds-search-list").append(i)
                          : f("#ds-search-list").html(i));
                  },
                  render_search_result: function (e) {
                    var n = this;
                    f("#searching").addClass("d-none"),
                      t && (clearTimeout(t), (t = null));
                    try {
                      (0, h.F1)(r, v)
                        .then(function (t) {
                          var r = !0;
                          i &&
                            "tinfo" in t &&
                            "profiles" in t.tinfo &&
                            i in t.tinfo.profiles &&
                            (r = t.tinfo.profiles[i].strict),
                            n._render_search_result(e, r, t);
                        })
                        .catch(function (t) {
                          n._render_search_result(e, !0, null);
                        });
                    } catch (t) {
                      n._render_search_result(e, !0, null);
                    }
                  },
                  _render_saved_choice: function (t, e, n) {
                    var r = p.locale;
                    r = r.split("-")[0];
                    var i = !1,
                      o = ejs.compile(
                        '<li class="col list-item pb-0" aria-label="Select <%= title %>">\n    <a class="row institution identityprovider" data-href="<%= entity_id %>" href="#">\n        <div class="col-9 pl-0">\n                    <span class="top-right institution-remove remove d-none">\n                      <div class="institution-remove-cross-wrapper" title="remove">\n            <svg class="svg-inline--fa fa-times fa-w-11" tabindex="0" aria-label="Remove Institute from remembered institutions" focusable="true" data-prefix="fa" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512" data-fa-i2svg=""><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>\n                      </div>\n        </span>\n            <% if (entity_icon) { %>\n            <div class="institution-mask">\n                <img class="institution-icon" alt="<%= name_tag %>" src="<%= entity_icon %>" />\n            </div>\n            <% } else if (entity_icon_url) { %>\n            <div class="institution-mask">\n                <img class="institution-icon" alt="<%= name_tag %>" src="<%= entity_icon_url.url %>" />\n            </div>\n            <% } else if (!entity_icon && !entity_icon_url) { %>\n            <svg class="institution-icon logo"\n                 width="40"\n                 height="40">\n                <circle cx="20" cy="20" r="20" fill="#aeaeae" />\n                <text x="50%"\n                      y="50%"\n                      text-anchor="middle"\n                      fill="white"\n                      font-size="12px"\n                      font-family="Arial"\n                      dy=".3em"><%= name_tag %></text>\n            </svg>\n            <% } %>\n\n            <div class="text-truncate label primary" data-i18n="<%= title_i18n %>"><%= title %></div>\n            <div class="text-truncate label-url secondary"><%= domain %></div>\n        </div>\n        <% if(!strictProfile){ %>\n            <% if(!hint){ %>\n            <div class="col-3 pr-0">\n                <i class="fa fa-exclamation-triangle mt-2 mr-2 list-item-warning"></i>\n            </div>\n            <% } %>\n        <% } %>\n        <i class="arrow fa fa-angle-right"></i>\n    </a>\n</li>\n',
                      );
                    if (
                      (t.forEach(function (t) {
                        p.updateDynamic(t);
                        var n = !1;
                        !1 === e && "hint" in t && (n = !0), n || (i = !0);
                        var a = t.entityID,
                          s = t.title;
                        "title_langs" in t &&
                          r in t.title_langs &&
                          (s = t.title_langs[r]);
                        var l = {
                            title: s,
                            title_i18n: a,
                            domain: t.domain,
                            entity_id: t.entity_id,
                            entity_icon: t.entity_icon,
                            name_tag: t.name_tag,
                            strictProfile: e,
                            hint: n,
                            entity_icon_url: t.entity_icon_url,
                          },
                          c = o(l);
                        f("#ds-saved-choices").append(c);
                      }),
                      !1 === e && i)
                    ) {
                      var a = n.title;
                      n.title_langs &&
                        n.title_langs[r] &&
                        (a = n.title_langs[r]);
                      var s = p.translateString("filter-warning-no-access"),
                        l = p.translateString(
                          "filter-warning-choose-alternative",
                        ),
                        c = p.translateString("filter-warning-other-options"),
                        u = ejs.render(
                          '<div class="col warning-banner pt-3 px-3 mb-4">\n    <div class="row">\n        <div class="col-1">\n            <i class="fa fa-exclamation-triangle mt-2 mr-2 list-item-warning"></i>\n        </div>\n        <div class="col-11">\n            <div class="row">\n                <div class="col">\n                  <p class="primary"><strong><%= organization %></strong> <%= filter_warning_no_access %></p>\n                </div>\n            </div>\n            \x3c!-- div class="row">\n                <div class="col">\n                  <p><%= choose_alternative %> <a href="#"><%= other_access %></a>.</p>\n                </div>\n            </div --\x3e\n        </div>\n    </div>\n</div>\n',
                          {
                            organization: a,
                            filter_warning_no_access: s,
                            choose_alternative: l,
                            other_access: c,
                          },
                        );
                      f("#filter-warning").append(u);
                    }
                  },
                  render_saved_choice: function (e) {
                    var n = this;
                    f("#searching").addClass("d-none"),
                      t && (clearTimeout(t), (t = null)),
                      r &&
                        (0, h.F1)(r, v)
                          .then(function (t) {
                            var r = !0;
                            i &&
                              "tinfo" in t &&
                              "profiles" in t.tinfo &&
                              i in t.tinfo.profiles &&
                              (r = t.tinfo.profiles[i].strict),
                              n._render_saved_choice(e, r, t);
                          })
                          .catch(function (t) {
                            n._render_saved_choice(e, !0, null);
                          });
                  },
                  too_many_results: function (e, n) {
                    f("#searching").addClass("d-none"),
                      (document.getElementById("ds-search-list").innerHTML =
                        ""),
                      t && (clearTimeout(t), (t = null));
                    var r = ejs.render(
                      '<li role="region" class="type-ahead-alert" aria-live="assertive">\n    <div role="alert">\n        <p><span class="bold"><%= count %> <span data-i18n="ds-too-many-result-matches"><%= matchesString %></span></span> <span data-i18n="ds-too-many-result-keep-typing"><%= keepTypingString %></span></p>\n        <p><a id="showall" href="#" data-i18n="ds-too-many-result-show"><%= showAnywayString %></a></p>\n    </div>\n</li>\n',
                      {
                        count: n,
                        matchesString: p.translateString(
                          "ds-too-many-result-matches",
                        ),
                        keepTypingString: p.translateString(
                          "ds-too-many-result-keep-typing",
                        ),
                        showAnywayString: p.translateString(
                          "ds-too-many-result-show",
                        ),
                      },
                    );
                    f("#ds-search-list").append(r);
                  },
                  no_results: function () {
                    f("#searching").addClass("d-none"),
                      (document.getElementById("ds-search-list").innerHTML =
                        ""),
                      t && (clearTimeout(t), (t = null));
                    var e = ejs.render(
                      '<li>\n    <div class="no-results-alert" role="alert">\n        <h3 class="bold" data-i18n="ds-no-results-no-matching">No matching institutions found</h3>\n        <ul>\n            <li data-i18n="ds-no-results-try-entering">Try entering an institution name, abbreviation or your institution email</li>\n            <li data-i18n="ds-no-results-try-accessing">Try accessing through your library website</li>\n            <li data-i18n="ds-no-results-contact-librarian">Contact your librarian</li>\n        </ul>\n    </div>\n</li>\n',
                    );
                    f("#ds-search-list").append(e);
                  },
                  persist: function () {
                    return f("#rememberThisChoice").is(":checked");
                  },
                  before: function (t) {
                    var e = Date.now(),
                      n = this;
                    return Promise.all(
                      t.map(function (t) {
                        return (0, h.RT)(
                          encodeURIComponent(t.entity.id),
                          i,
                          r,
                          n.mdq,
                        )
                          .then(function (n) {
                            return (
                              (t.entity = n),
                              (t.modified = !0),
                              (t.last_refresh = e),
                              (t.last_use = e),
                              t
                            );
                          })
                          .catch(function (t) {
                            console.log("Error refreshing entity: ".concat(t));
                          });
                      }),
                    )
                      .then(function (t) {
                        return t.filter(function (t) {
                          return t && void 0 !== t.entity;
                        });
                      })
                      .catch(function (t) {
                        console.log("Error filtering entities: ".concat(t));
                      });
                  },
                  after: function (t, e) {
                    f("#searching").addClass("d-none"),
                      0 == t
                        ? (f("#search").removeClass("d-none"),
                          f("#choose").addClass("d-none"),
                          f("#searchinput").focus())
                        : (f("#choose").removeClass("d-none"),
                          f("#search").addClass("d-none"));
                  },
                })
                .discovery_client("sp")
                .then(function (t) {
                  f(".sp_title").text(t.title),
                    f("#discovery-response-warning-site").text(t.title);
                  var e = !0;
                  if (t.discovery_responses) {
                    var n = window.location.search,
                      r = new URLSearchParams(n),
                      i = null;
                    r.has("return") && (i = r.get("return")),
                      t.discovery_responses.forEach(function (t) {
                        null !== i && i.startsWith(t) && (e = !0);
                      });
                  }
                  !1 === e &&
                    f("#warning-discovery-response").removeClass("d-none");
                });
          });
        },
      },
      n = {};
    function r(t) {
      var i = n[t];
      if (void 0 !== i) return i.exports;
      var o = (n[t] = { id: t, loaded: !1, exports: {} });
      return e[t].call(o.exports, o, o.exports, r), (o.loaded = !0), o.exports;
    }
    (r.m = e),
      (t = []),
      (r.O = (e, n, i, o) => {
        if (!n) {
          var a = 1 / 0;
          for (u = 0; u < t.length; u++) {
            for (var [n, i, o] = t[u], s = !0, l = 0; l < n.length; l++)
              (!1 & o || a >= o) && Object.keys(r.O).every((t) => r.O[t](n[l]))
                ? n.splice(l--, 1)
                : ((s = !1), o < a && (a = o));
            if (s) {
              t.splice(u--, 1);
              var c = i();
              void 0 !== c && (e = c);
            }
          }
          return e;
        }
        o = o || 0;
        for (var u = t.length; u > 0 && t[u - 1][2] > o; u--) t[u] = t[u - 1];
        t[u] = [n, i, o];
      }),
      (r.n = (t) => {
        var e = t && t.__esModule ? () => t.default : () => t;
        return r.d(e, { a: e }), e;
      }),
      (r.d = (t, e) => {
        for (var n in e)
          r.o(e, n) &&
            !r.o(t, n) &&
            Object.defineProperty(t, n, { enumerable: !0, get: e[n] });
      }),
      (r.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e)),
      (r.r = (t) => {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(t, "__esModule", { value: !0 });
      }),
      (r.nmd = (t) => ((t.paths = []), t.children || (t.children = []), t)),
      (() => {
        var t = { 984: 0 };
        r.O.j = (e) => 0 === t[e];
        var e = (e, n) => {
            var i,
              o,
              [a, s, l] = n,
              c = 0;
            if (a.some((e) => 0 !== t[e])) {
              for (i in s) r.o(s, i) && (r.m[i] = s[i]);
              if (l) var u = l(r);
            }
            for (e && e(n); c < a.length; c++)
              (o = a[c]), r.o(t, o) && t[o] && t[o][0](), (t[o] = 0);
            return r.O(u);
          },
          n = (this.webpackChunk_theidentityselector_thiss =
            this.webpackChunk_theidentityselector_thiss || []);
        n.forEach(e.bind(null, 0)), (n.push = e.bind(null, n.push.bind(n)));
      })();
    var i = r.O(void 0, [990, 769, 775, 918], () => r(92891));
    return r.O(i);
  })(),
);
