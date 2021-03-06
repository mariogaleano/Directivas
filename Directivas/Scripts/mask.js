﻿/*!
 * angular-ui-mask
 * https://github.com/angular-ui/ui-mask
 * Version: 1.0.0 - 2015-07-02T01:05:07.443Z
 * License: MIT
 */
!function () {
    "use strict"; angular.module("ui.mask", []).value("uiMaskConfig", {
        maskDefinitions: { 9: /\d/, A: /[a-zA-Z]/, "*": /[a-zA-Z0-9]/ },
        clearOnBlur: !0
    }).directive("uiMask", ["uiMaskConfig", "$parse", function (e, n) {
        return {
            priority: 100, require: "ngModel", restrict: "A", compile: function () {
                var t = e; return function (e, i, r, u) {
                    function a(e) {
                        return angular.isDefined(e) ? ($(e),
                        H ? (f(),
                        h(),
                        !0) : c()) : c()
                    }
                    function o(e) { angular.isDefined(e) && (D = e, H && w()) }
                    function l(e) {
                        return H ? (q = p(e || ""),
                         z = g(q),
                         u.$setValidity("mask", z),
                         z && q.length ? v(q) : void 0) : e
                    }
                    function s(e) {
                        return H ? (q = p(e || ""),
                         z = g(q),
                         u.$viewValue = q.length ? v(q) : "", u.$setValidity("mask", z),
                         "" === q && r.required && u.$setValidity("required", !u.$error.required),
                         z ? q : void 0) : e
                    }
                    function c() {
                        return H = !1, d(),
                         angular.isDefined(N) ? i.attr("placeholder", N) : i.removeAttr("placeholder"),
                         angular.isDefined(P) ? i.attr("maxlength", P) : i.removeAttr("maxlength"),
                         i.val(u.$modelValue),
                         u.$viewValue = u.$modelValue, !1
                    }
                    function f() {
                        q = Z = p(u.$modelValue || ""),
                         j = T = v(q),
                         z = g(q);
                        var e = z && q.length ? j : ""; r.maxlength && i.attr("maxlength", 2 * S[S.length - 1]),
                        i.attr("placeholder", D),
                        i.val(e),
                        u.$viewValue = e, u.$setValidity("mask", z)
                    }
                    function h() {
                        K || (i.bind("blur", y),
                         i.bind("mousedown mouseup", k),
                         i.bind("input keyup click focus", w),
                         K = !0)
                    }
                    function d() {
                        K && (i.unbind("blur", y),
                         i.unbind("mousedown", k),
                         i.unbind("mouseup", k),
                         i.unbind("input", w),
                         i.unbind("keyup", w),
                         i.unbind("click", w),
                         i.unbind("focus", w),
                         K = !1)
                    }
                    function g(e) { return e.length ? e.length >= R : !0 }
                    function p(e) {
                        var n = "", t = _.slice();
                        return e = e.toString(),
                        angular.forEach(E, function (n) { e = e.replace(n, "") }),
                        angular.forEach(e.split(""),
                        function (e) { t.length && t[0].test(e) && (n += e, t.shift()) }),
                        n
                    }
                    function v(e) {
                        var n = "", t = S.slice();
                        return angular.forEach(D.split(""),
                        function (i, r) {
                            e.length && r === t[0] ? (n += e.charAt(0) || "_", e = e.substr(1),
                            t.shift()) : n += i
                        }),
                        n
                    }
                    function m(e) { var n = r.placeholder; return "undefined" != typeof n && n[e] ? n[e] : "_" }
                    function b() { return D.replace(/[_]+/g, "_").replace(/([^_]+)([a-zA-Z0-9])([^_])/g, "$1$2_$3").split("_") }
                    function $(e) {
                        var n = 0; if (S = [], _ = [], D = "", "string" == typeof e) {
                            R = 0; var t = !1, i = 0, r = e.split("");
                            angular.forEach(r, function (e, r) {
                                W.maskDefinitions[e] ? (S.push(n),
                                D += m(r - i),
                                _.push(W.maskDefinitions[e]),
                                n++, t || R++) : "?" === e ? (t = !0, i++) : (D += e, n++)
                            })
                        }
                        S.push(S.slice().pop() + 1),
                         E = b(),
                         H = S.length > 1 ? !0 : !1
                    }
                    function y() {
                        W.clearOnBlur && (B = 0, C = 0, z && 0 !== q.length || (j = "", i.val(""),
                         e.$apply(function () { u.$setViewValue("") })))
                    }
                    function k(e) { "mousedown" === e.type ? i.bind("mouseout", V) : i.unbind("mouseout", V) }
                    function V() {
                        C = A(this),
                         i.unbind("mouseout", V)
                    }
                    function w(n) {
                        n = n || {};
                        var t = n.which, r = n.type; if (16 !== t && 91 !== t) {
                            var a, o = i.val(),
                            l = T, s = p(o),
                            c = Z, f = !1, h = O(this) || 0, d = B || 0, g = h - d, m = S[0], b = S[s.length] || S.slice().shift(),
                            $ = C || 0, y = A(this) > 0, k = $ > 0, V = o.length > l.length || $ && o.length > l.length - $, w = o.length < l.length || $ && o.length === l.length - $, _ = t >= 37 && 40 >= t && n.shiftKey, D = 37 === t, E = 8 === t || "keyup" !== r && w && -1 === g, R = 46 === t || "keyup" !== r && w && 0 === g && !k, q = (D || E || "click" === r) && h > m; if (C = A(this),
                            !_ && (!y || "click" !== r && "keyup" !== r)) {
                                if ("input" === r && w && !k && s === c) {
                                    for (; E && h > m && !x(h) ;) h--; for (; R && b > h && -1 === S.indexOf(h) ;) h++; var j = S.indexOf(h);
                                    s = s.substring(0, j) + s.substring(j + 1),
                                    f = !0
                                }
                                for (a = v(s),
                                 T = a, Z = s, i.val(a),
                                 f && e.$apply(function () { u.$setViewValue(s) }),
                                 V && m >= h && (h = m + 1),
                                 q && h--, h = h > b ? b : m > h ? m : h; !x(h) && h > m && b > h;) h += q ? -1 : 1; (q && b > h || V && !x(d)) && h++, B = h, M(this, h)
                            }
                        }
                    }
                    function x(e) { return S.indexOf(e) > -1 }
                    function O(e) {
                        if (!e) return 0; if (void 0 !== e.selectionStart) return e.selectionStart; if (document.selection && i.is(":focus")) {
                            e.focus();
                            var n = document.selection.createRange();
                            return n.moveStart("character", e.value ? -e.value.length : 0),
                            n.text.length
                        }
                        return 0
                    }
                    function M(e, n) {
                        if (!e) return 0; if (0 !== e.offsetWidth && 0 !== e.offsetHeight) if (e.setSelectionRange) i.is(":focus") && (e.focus(),
                         e.setSelectionRange(n, n));
                        else if (e.createTextRange) {
                            var t = e.createTextRange();
                            t.collapse(!0),
                            t.moveEnd("character", n),
                            t.moveStart("character", n),
                            t.select()
                        }
                    }
                    function A(e) { return e ? void 0 !== e.selectionStart ? e.selectionEnd - e.selectionStart : document.selection ? document.selection.createRange().text.length : 0 : 0 }
                    var S, _, D, E, R, q, j, z, T, Z, B, C, H = !1, K = !1, N = r.placeholder, P = r.maxlength, W = {};
                    r.uiOptions ? (W = e.$eval("[" + r.uiOptions + "]"),
                    angular.isObject(W[0]) && (W = function (e, n) {
                        for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && (void 0 === n[t] ? n[t] = angular.copy(e[t]) : angular.extend(n[t], e[t]));
                        return n
                    }(t, W[0]))) : W = t, r.$observe("uiMask", a),
                    r.$observe("placeholder", o);
                    var F = !1; r.$observe("modelViewValue", function (e) { "true" === e && (F = !0) }),
                    e.$watch(r.ngModel, function (t) {
                        if (F && t) {
                            var i = n(r.ngModel);
                            i.assign(e, u.$viewValue)
                        }
                    }),
                    u.$formatters.push(l),
                    u.$parsers.push(s),
                    i.bind("mousedown mouseup", k),
                    Array.prototype.indexOf || (Array.prototype.indexOf = function (e) {
                        if (null === this) throw new TypeError; var n = Object(this),
                        t = n.length >>> 0; if (0 === t) return -1; var i = 0; if (arguments.length > 1 && (i = Number(arguments[1]),
                        i !== i ? i = 0 : 0 !== i && 1 / 0 !== i && i !== -1 / 0 && (i = (i > 0 || -1) * Math.floor(Math.abs(i)))),
                        i >= t) return -1; for (var r = i >= 0 ? i : Math.max(t - Math.abs(i),
                        0) ; t > r; r++) if (r in n && n[r] === e) return r; return -1
                    })
                }
            }
        }
    }])
}();
