//#region \0rolldown/runtime.js
var e = Object.create, t = Object.defineProperty, n = Object.getOwnPropertyDescriptor, r = Object.getOwnPropertyNames, i = Object.getPrototypeOf, a = Object.prototype.hasOwnProperty, o = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), s = (e, n) => {
	let r = {};
	for (var i in e) t(r, i, {
		get: e[i],
		enumerable: !0
	});
	return n || t(r, Symbol.toStringTag, { value: "Module" }), r;
}, c = (e, i, o, s) => {
	if (i && typeof i == "object" || typeof i == "function") for (var c = r(i), l = 0, u = c.length, d; l < u; l++) d = c[l], !a.call(e, d) && d !== o && t(e, d, {
		get: ((e) => i[e]).bind(null, d),
		enumerable: !(s = n(i, d)) || s.enumerable
	});
	return e;
}, l = (n, r, a) => (a = n == null ? {} : e(i(n)), c(r || !n || !n.__esModule ? t(a, "default", {
	value: n,
	enumerable: !0
}) : a, n)), u = /* @__PURE__ */ ((e) => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(e, { get: (e, t) => (typeof require < "u" ? require : e)[t] }) : e)(function(e) {
	if (typeof require < "u") return require.apply(this, arguments);
	throw Error("Calling `require` for \"" + e + "\" in an environment that doesn't expose the `require` function. See https://rolldown.rs/in-depth/bundling-cjs#require-external-modules for more details.");
}), d = /* @__PURE__ */ o(((e, t) => {
	var n = void 0;
	t.exports = function(e) {
		return e !== n && e !== null;
	};
})), f = /* @__PURE__ */ o(((e, t) => {
	var n = d(), r = {
		object: !0,
		function: !0,
		undefined: !0
	};
	t.exports = function(e) {
		return n(e) ? hasOwnProperty.call(r, typeof e) : !1;
	};
})), p = /* @__PURE__ */ o(((e, t) => {
	var n = f();
	t.exports = function(e) {
		if (!n(e)) return !1;
		try {
			return e.constructor ? e.constructor.prototype === e : !1;
		} catch {
			return !1;
		}
	};
})), m = /* @__PURE__ */ o(((e, t) => {
	var n = p();
	t.exports = function(e) {
		if (typeof e != "function" || !hasOwnProperty.call(e, "length")) return !1;
		try {
			if (typeof e.length != "number" || typeof e.call != "function" || typeof e.apply != "function") return !1;
		} catch {
			return !1;
		}
		return !n(e);
	};
})), h = /* @__PURE__ */ o(((e, t) => {
	var n = m(), r = /^\s*class[\s{/}]/, i = Function.prototype.toString;
	t.exports = function(e) {
		return !(!n(e) || r.test(i.call(e)));
	};
})), g = /* @__PURE__ */ o(((e, t) => {
	t.exports = function() {
		var e = Object.assign, t;
		return typeof e == "function" ? (t = { foo: "raz" }, e(t, { bar: "dwa" }, { trzy: "trzy" }), t.foo + t.bar + t.trzy === "razdwatrzy") : !1;
	};
})), _ = /* @__PURE__ */ o(((e, t) => {
	t.exports = function() {
		try {
			return !0;
		} catch {
			return !1;
		}
	};
})), v = /* @__PURE__ */ o(((e, t) => {
	t.exports = function() {};
})), y = /* @__PURE__ */ o(((e, t) => {
	var n = v()();
	t.exports = function(e) {
		return e !== n && e !== null;
	};
})), b = /* @__PURE__ */ o(((e, t) => {
	var n = y(), r = Object.keys;
	t.exports = function(e) {
		return r(n(e) ? Object(e) : e);
	};
})), x = /* @__PURE__ */ o(((e, t) => {
	t.exports = _()() ? Object.keys : b();
})), S = /* @__PURE__ */ o(((e, t) => {
	var n = y();
	t.exports = function(e) {
		if (!n(e)) throw TypeError("Cannot use null or undefined");
		return e;
	};
})), C = /* @__PURE__ */ o(((e, t) => {
	var n = x(), r = S(), i = Math.max;
	t.exports = function(e, t) {
		var a, o, s = i(arguments.length, 2), c;
		for (e = Object(r(e)), c = function(n) {
			try {
				e[n] = t[n];
			} catch (e) {
				a ||= e;
			}
		}, o = 1; o < s; ++o) t = arguments[o], n(t).forEach(c);
		if (a !== void 0) throw a;
		return e;
	};
})), w = /* @__PURE__ */ o(((e, t) => {
	t.exports = g()() ? Object.assign : C();
})), T = /* @__PURE__ */ o(((e, t) => {
	var n = y(), r = Array.prototype.forEach, i = Object.create, a = function(e, t) {
		for (var n in e) t[n] = e[n];
	};
	t.exports = function(e) {
		var t = i(null);
		return r.call(arguments, function(e) {
			n(e) && a(Object(e), t);
		}), t;
	};
})), E = /* @__PURE__ */ o(((e, t) => {
	var n = "razdwatrzy";
	t.exports = function() {
		return typeof n.contains == "function" ? n.contains("dwa") === !0 && n.contains("foo") === !1 : !1;
	};
})), D = /* @__PURE__ */ o(((e, t) => {
	var n = String.prototype.indexOf;
	t.exports = function(e) {
		return n.call(this, e, arguments[1]) > -1;
	};
})), O = /* @__PURE__ */ o(((e, t) => {
	t.exports = E()() ? String.prototype.contains : D();
})), k = /* @__PURE__ */ o(((e, t) => {
	var n = d(), r = h(), i = w(), a = T(), o = O(), s = t.exports = function(e, t) {
		var r, s, c, l, u;
		return arguments.length < 2 || typeof e != "string" ? (l = t, t = e, e = null) : l = arguments[2], n(e) ? (r = o.call(e, "c"), s = o.call(e, "e"), c = o.call(e, "w")) : (r = c = !0, s = !1), u = {
			value: t,
			configurable: r,
			enumerable: s,
			writable: c
		}, l ? i(a(l), u) : u;
	};
	s.gs = function(e, t, s) {
		var c, l, u, d;
		return typeof e == "string" ? u = arguments[3] : (u = s, s = t, t = e, e = null), n(t) ? r(t) ? n(s) ? r(s) || (u = s, s = void 0) : s = void 0 : (u = t, t = s = void 0) : t = void 0, n(e) ? (c = o.call(e, "c"), l = o.call(e, "e")) : (c = !0, l = !1), d = {
			get: t,
			set: s,
			configurable: c,
			enumerable: l
		}, u ? i(a(u), d) : d;
	};
})), A = /* @__PURE__ */ o(((e, t) => {
	t.exports = function(e) {
		if (typeof e != "function") throw TypeError(e + " is not a function");
		return e;
	};
})), j = /* @__PURE__ */ l((/* @__PURE__ */ o(((e, t) => {
	var n = k(), r = A(), i = Function.prototype.apply, a = Function.prototype.call, o = Object.create, s = Object.defineProperty, c = Object.defineProperties, l = Object.prototype.hasOwnProperty, u = {
		configurable: !0,
		enumerable: !1,
		writable: !0
	}, d = function(e, t) {
		var n;
		return r(t), l.call(this, "__ee__") ? n = this.__ee__ : (n = u.value = o(null), s(this, "__ee__", u), u.value = null), n[e] ? typeof n[e] == "object" ? n[e].push(t) : n[e] = [n[e], t] : n[e] = t, this;
	}, f = function(e, t) {
		var n, a;
		return r(t), a = this, d.call(this, e, n = function() {
			p.call(a, e, n), i.call(t, this, arguments);
		}), n.__eeOnceListener__ = t, this;
	}, p = function(e, t) {
		var n, i, a, o;
		if (r(t), !l.call(this, "__ee__") || (n = this.__ee__, !n[e])) return this;
		if (i = n[e], typeof i == "object") for (o = 0; a = i[o]; ++o) (a === t || a.__eeOnceListener__ === t) && (i.length === 2 ? n[e] = i[+!o] : i.splice(o, 1));
		else (i === t || i.__eeOnceListener__ === t) && delete n[e];
		return this;
	}, m = function(e) {
		var t, n, r, o, s;
		if (l.call(this, "__ee__") && (o = this.__ee__[e], o)) if (typeof o == "object") {
			for (n = arguments.length, s = Array(n - 1), t = 1; t < n; ++t) s[t - 1] = arguments[t];
			for (o = o.slice(), t = 0; r = o[t]; ++t) i.call(r, this, s);
		} else switch (arguments.length) {
			case 1:
				a.call(o, this);
				break;
			case 2:
				a.call(o, this, arguments[1]);
				break;
			case 3:
				a.call(o, this, arguments[1], arguments[2]);
				break;
			default:
				for (n = arguments.length, s = Array(n - 1), t = 1; t < n; ++t) s[t - 1] = arguments[t];
				i.call(o, this, s);
		}
	}, h = {
		on: d,
		once: f,
		off: p,
		emit: m
	}, g = {
		on: n(d),
		once: n(f),
		off: n(p),
		emit: n(m)
	}, _ = c({}, g);
	t.exports = e = function(e) {
		return e == null ? o(_) : c(Object(e), g);
	}, e.methods = h;
})))());
function M() {
	var e = (/* @__PURE__ */ new Date()).getTime();
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(t) {
		var n = (e + Math.random() * 16) % 16 | 0;
		return e = Math.floor(e / 16), (t == "x" ? n : n & 7 | 8).toString(16);
	});
}
function N() {
	this.resolve = null, this.reject = null, this.id = M(), this.promise = new Promise((e, t) => {
		this.resolve = e, this.reject = t;
	}), Object.freeze(this);
}
//#endregion
//#region src/core/collections.ts
function P(e, t) {
	if (e > t) return 1;
	if (e < t) return -1;
	if (e == t) return 0;
}
function F(e) {
	for (var t = e, n = 1, r = arguments.length; n < r; n++) {
		var i = arguments[n];
		for (var a in i) t[a] === void 0 && (t[a] = i[a]);
	}
	return e;
}
function I(e, ...t) {
	return Array.prototype.slice.call(arguments, 1).forEach(function(t) {
		t && Object.getOwnPropertyNames(t).forEach(function(n) {
			Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(t, n));
		});
	}), e;
}
function ee(e, t, n) {
	var r = te(e, t, n);
	return t.splice(r, 0, e), r;
}
function te(e, t, n, r, i) {
	var a = r || 0, o = i || t.length, s = parseInt(String(a + (o - a) / 2)), c;
	return n ||= P, o - a <= 0 ? s : (c = n(t[s], e), o - a === 1 ? c >= 0 ? s : s + 1 : c === 0 ? s : c === -1 ? te(e, t, n, s, o) : te(e, t, n, a, s));
}
function ne(e, t, n, r, i) {
	var a = r || 0, o = i || t.length, s = parseInt(String(a + (o - a) / 2)), c;
	return n ||= P, o - a <= 0 ? -1 : (c = n(t[s], e), o - a === 1 ? c === 0 ? s : -1 : c === 0 ? s : c === -1 ? ne(e, t, n, s, o) : ne(e, t, n, a, s));
}
//#endregion
//#region src/utils/path.ts
var L = /* @__PURE__ */ l((/* @__PURE__ */ o(((e, t) => {
	if (!n) var n = { cwd: function() {
		return "/";
	} };
	function r(e) {
		if (typeof e != "string") throw TypeError("Path must be a string. Received " + e);
	}
	function i(e, t) {
		for (var n = "", r = -1, i = 0, a, o = 0; o <= e.length; ++o) {
			if (o < e.length) a = e.charCodeAt(o);
			else if (a === 47) break;
			else a = 47;
			if (a === 47) {
				if (!(r === o - 1 || i === 1)) if (r !== o - 1 && i === 2) {
					if (n.length < 2 || n.charCodeAt(n.length - 1) !== 46 || n.charCodeAt(n.length - 2) !== 46) {
						if (n.length > 2) {
							for (var s = n.length - 1, c = s; c >= 0 && n.charCodeAt(c) !== 47; --c);
							if (c !== s) {
								n = c === -1 ? "" : n.slice(0, c), r = o, i = 0;
								continue;
							}
						} else if (n.length === 2 || n.length === 1) {
							n = "", r = o, i = 0;
							continue;
						}
					}
					t && (n.length > 0 ? n += "/.." : n = "..");
				} else n.length > 0 ? n += "/" + e.slice(r + 1, o) : n = e.slice(r + 1, o);
				r = o, i = 0;
			} else a === 46 && i !== -1 ? ++i : i = -1;
		}
		return n;
	}
	function a(e, t) {
		var n = t.dir || t.root, r = t.base || (t.name || "") + (t.ext || "");
		return n ? n === t.root ? n + r : n + e + r : r;
	}
	var o = {
		resolve: function() {
			for (var e = "", t = !1, a, o = arguments.length - 1; o >= -1 && !t; o--) {
				var s;
				o >= 0 ? s = arguments[o] : (a === void 0 && (a = n.cwd()), s = a), r(s), s.length !== 0 && (e = s + "/" + e, t = s.charCodeAt(0) === 47);
			}
			return e = i(e, !t), t ? e.length > 0 ? "/" + e : "/" : e.length > 0 ? e : ".";
		},
		normalize: function(e) {
			if (r(e), e.length === 0) return ".";
			var t = e.charCodeAt(0) === 47, n = e.charCodeAt(e.length - 1) === 47;
			return e = i(e, !t), e.length === 0 && !t && (e = "."), e.length > 0 && n && (e += "/"), t ? "/" + e : e;
		},
		isAbsolute: function(e) {
			return r(e), e.length > 0 && e.charCodeAt(0) === 47;
		},
		join: function() {
			if (arguments.length === 0) return ".";
			for (var e, t = 0; t < arguments.length; ++t) {
				var n = arguments[t];
				r(n), n.length > 0 && (e === void 0 ? e = n : e += "/" + n);
			}
			return e === void 0 ? "." : o.normalize(e);
		},
		relative: function(e, t) {
			if (r(e), r(t), e === t || (e = o.resolve(e), t = o.resolve(t), e === t)) return "";
			for (var n = 1; n < e.length && e.charCodeAt(n) === 47; ++n);
			for (var i = e.length, a = i - n, s = 1; s < t.length && t.charCodeAt(s) === 47; ++s);
			for (var c = t.length - s, l = a < c ? a : c, u = -1, d = 0; d <= l; ++d) {
				if (d === l) {
					if (c > l) {
						if (t.charCodeAt(s + d) === 47) return t.slice(s + d + 1);
						if (d === 0) return t.slice(s + d);
					} else a > l && (e.charCodeAt(n + d) === 47 ? u = d : d === 0 && (u = 0));
					break;
				}
				var f = e.charCodeAt(n + d);
				if (f !== t.charCodeAt(s + d)) break;
				f === 47 && (u = d);
			}
			var p = "";
			for (d = n + u + 1; d <= i; ++d) (d === i || e.charCodeAt(d) === 47) && (p.length === 0 ? p += ".." : p += "/..");
			return p.length > 0 ? p + t.slice(s + u) : (s += u, t.charCodeAt(s) === 47 && ++s, t.slice(s));
		},
		_makeLong: function(e) {
			return e;
		},
		dirname: function(e) {
			if (r(e), e.length === 0) return ".";
			for (var t = e.charCodeAt(0), n = t === 47, i = -1, a = !0, o = e.length - 1; o >= 1; --o) if (t = e.charCodeAt(o), t === 47) {
				if (!a) {
					i = o;
					break;
				}
			} else a = !1;
			return i === -1 ? n ? "/" : "." : n && i === 1 ? "//" : e.slice(0, i);
		},
		basename: function(e, t) {
			if (t !== void 0 && typeof t != "string") throw TypeError("\"ext\" argument must be a string");
			r(e);
			var n = 0, i = -1, a = !0, o;
			if (t !== void 0 && t.length > 0 && t.length <= e.length) {
				if (t.length === e.length && t === e) return "";
				var s = t.length - 1, c = -1;
				for (o = e.length - 1; o >= 0; --o) {
					var l = e.charCodeAt(o);
					if (l === 47) {
						if (!a) {
							n = o + 1;
							break;
						}
					} else c === -1 && (a = !1, c = o + 1), s >= 0 && (l === t.charCodeAt(s) ? --s === -1 && (i = o) : (s = -1, i = c));
				}
				return n === i ? i = c : i === -1 && (i = e.length), e.slice(n, i);
			} else {
				for (o = e.length - 1; o >= 0; --o) if (e.charCodeAt(o) === 47) {
					if (!a) {
						n = o + 1;
						break;
					}
				} else i === -1 && (a = !1, i = o + 1);
				return i === -1 ? "" : e.slice(n, i);
			}
		},
		extname: function(e) {
			r(e);
			for (var t = -1, n = 0, i = -1, a = !0, o = 0, s = e.length - 1; s >= 0; --s) {
				var c = e.charCodeAt(s);
				if (c === 47) {
					if (!a) {
						n = s + 1;
						break;
					}
					continue;
				}
				i === -1 && (a = !1, i = s + 1), c === 46 ? t === -1 ? t = s : o !== 1 && (o = 1) : t !== -1 && (o = -1);
			}
			return t === -1 || i === -1 || o === 0 || o === 1 && t === i - 1 && t === n + 1 ? "" : e.slice(t, i);
		},
		format: function(e) {
			if (typeof e != "object" || !e) throw TypeError("Parameter \"pathObject\" must be an object, not " + typeof e);
			return a("/", e);
		},
		parse: function(e) {
			r(e);
			var t = {
				root: "",
				dir: "",
				base: "",
				ext: "",
				name: ""
			};
			if (e.length === 0) return t;
			var n = e.charCodeAt(0), i = n === 47, a;
			i ? (t.root = "/", a = 1) : a = 0;
			for (var o = -1, s = 0, c = -1, l = !0, u = e.length - 1, d = 0; u >= a; --u) {
				if (n = e.charCodeAt(u), n === 47) {
					if (!l) {
						s = u + 1;
						break;
					}
					continue;
				}
				c === -1 && (l = !1, c = u + 1), n === 46 ? o === -1 ? o = u : d !== 1 && (d = 1) : o !== -1 && (d = -1);
			}
			return o === -1 || c === -1 || d === 0 || d === 1 && o === c - 1 && o === s + 1 ? c !== -1 && (s === 0 && i ? t.base = t.name = e.slice(1, c) : t.base = t.name = e.slice(s, c)) : (s === 0 && i ? (t.name = e.slice(1, o), t.base = e.slice(1, c)) : (t.name = e.slice(s, o), t.base = e.slice(s, c)), t.ext = e.slice(o, c)), s > 0 ? t.dir = e.slice(0, s - 1) : i && (t.dir = "/"), t;
		},
		sep: "/",
		delimiter: ":",
		posix: null
	};
	t.exports = o;
})))()), re = class {
	path;
	directory;
	filename;
	extension;
	splitPathRe;
	constructor(e) {
		var t = e.indexOf("://"), n;
		t > -1 && (e = new URL(e).pathname), n = this.parse(e), this.path = e, this.isDirectory(e) ? this.directory = e : this.directory = n.dir + "/", this.filename = n.base, this.extension = n.ext.slice(1);
	}
	parse(e) {
		return L.default.parse(e);
	}
	isAbsolute(e) {
		return L.default.isAbsolute(e || this.path);
	}
	isDirectory(e) {
		return e.charAt(e.length - 1) === "/";
	}
	resolve(e) {
		return L.default.resolve(this.directory, e);
	}
	relative(e) {
		return e && e.indexOf("://") > -1 ? e : L.default.relative(this.directory, e);
	}
	splitPath(e) {
		return this.splitPathRe.exec(e).slice(1);
	}
	toString() {
		return this.path;
	}
}, ie = class {
	Path;
	Url;
	base;
	directory;
	extension;
	filename;
	hash;
	href;
	origin;
	protocol;
	search;
	constructor(e, t) {
		var n = e.indexOf("://") > -1, r = e, i;
		if (this.Url = void 0, this.href = e, this.protocol = "", this.origin = "", this.hash = "", this.hash = "", this.search = "", this.base = t, !n && t !== !1 && typeof t != "string" && window && window.location && (this.base = window.location.href), n || this.base) try {
			this.base ? this.Url = new URL(e, this.base) : this.Url = new URL(e), this.href = this.Url.href, this.protocol = this.Url.protocol, this.origin = this.Url.origin, this.hash = this.Url.hash, this.search = this.Url.search, r = this.Url.pathname + (this.Url.search ? this.Url.search : "");
		} catch {
			this.Url = void 0, this.base && (i = new re(this.base), r = i.resolve(r));
		}
		this.Path = new re(r), this.directory = this.Path.directory, this.filename = this.Path.filename, this.extension = this.Path.extension;
	}
	path() {
		return this.Path;
	}
	resolve(e) {
		var t = e.indexOf("://") > -1, n;
		return t ? e : (n = L.default.resolve(this.directory, e), this.origin + n);
	}
	relative(e) {
		return L.default.relative(e, this.directory);
	}
	toString() {
		return this.href;
	}
}, R = 1, ae = 3;
function z(e, t) {
	(e.ownerDocument || e).createTreeWalker === void 0 ? le(e, function(e) {
		e && e.nodeType === 3 && t(e);
	}, !0) : oe(e, t, NodeFilter.SHOW_TEXT);
}
function oe(e, t, n) {
	for (var r = document.createTreeWalker(e, n, null), i; i = r.nextNode();) t(i);
}
function se(e, t, n) {
	return !e || !t || !n || typeof e.createTreeWalker != "function" ? null : e.createTreeWalker(n, NodeFilter.SHOW_TEXT, { acceptNode(e) {
		if (String(e.nodeValue || "").replace(/\s+/g, "").length < 2) return NodeFilter.FILTER_REJECT;
		let n = e.parentElement;
		if (!n) return NodeFilter.FILTER_REJECT;
		let r = t.getComputedStyle(n);
		return r.display === "none" || r.visibility === "hidden" ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
	} });
}
function ce(e, t, n, r = {}) {
	let i = se(e, t, n);
	if (!i) return null;
	let a = Math.max(0, Number(r.limit) || 1e3), o = !!r.countInvalidRects, s = [], c = 0, l;
	for (; (l = i.nextNode()) && c < a;) {
		let t = e.createRange();
		t.selectNodeContents(l);
		for (let e of Array.from(t.getClientRects())) {
			let t = e.width > 0 && e.height > 0;
			if ((o || t) && (c += 1), t && s.push({
				left: e.left,
				right: e.right,
				top: e.top,
				bottom: e.bottom,
				width: e.width,
				height: e.height
			}), c >= a) break;
		}
		t.detach && t.detach();
	}
	return s;
}
function le(e, t, n) {
	var r;
	if (t(e)) return !0;
	if (e = e.firstChild, e) do {
		if (r = le(e, t), r) return !0;
		e = e.nextSibling;
	} while (e);
}
function ue(e) {
	for (var t = [], n = e.childNodes, r = 0; r < n.length; r++) {
		let e = n[r];
		e.nodeType === 1 && t.push(e);
	}
	return t;
}
function B(e) {
	for (var t = [e]; e; e = e.parentNode) t.unshift(e);
	return t;
}
function V(e, t, n) {
	for (var r = [], i = e.childNodes, a = 0; a < i.length; a++) {
		let e = i[a];
		if (e.nodeType === 1 && e.nodeName.toLowerCase() === t) {
			if (n) return e;
			r.push(e);
		}
	}
	if (!n) return r;
}
function de(e, t) {
	var n;
	if (!(e === null || t === "")) for (n = e.parentNode; n.nodeType === 1;) {
		if (n.tagName.toLowerCase() === t) return n;
		n = n.parentNode;
	}
}
function H(e, t) {
	for (var n = e.parentNode.childNodes, r, i = -1, a = 0; a < n.length && (r = n[a], r.nodeType === t && i++, r != e); a++);
	return i;
}
function U(e) {
	return H(e, ae);
}
function W(e) {
	return H(e, R);
}
//#endregion
//#region src/compat/range.ts
var fe = class {
	collapsed;
	commonAncestorContainer;
	endContainer;
	endOffset;
	startContainer;
	startOffset;
	constructor() {
		this.collapsed = !1, this.commonAncestorContainer = void 0, this.endContainer = void 0, this.endOffset = void 0, this.startContainer = void 0, this.startOffset = void 0;
	}
	setStart(e, t) {
		this.startContainer = e, this.startOffset = t, this.endContainer ? this.commonAncestorContainer = this._commonAncestorContainer() : this.collapse(!0), this._checkCollapsed();
	}
	setEnd(e, t) {
		this.endContainer = e, this.endOffset = t, this.startContainer ? (this.collapsed = !1, this.commonAncestorContainer = this._commonAncestorContainer()) : this.collapse(!1), this._checkCollapsed();
	}
	collapse(e) {
		this.collapsed = !0, e ? (this.endContainer = this.startContainer, this.endOffset = this.startOffset, this.commonAncestorContainer = this.startContainer.parentNode) : (this.startContainer = this.endContainer, this.startOffset = this.endOffset, this.commonAncestorContainer = this.endContainer ? this.endContainer.parentNode : void 0);
	}
	selectNode(e) {
		let t = e.parentNode, n = Array.prototype.indexOf.call(t.childNodes, e);
		this.setStart(t, n), this.setEnd(t, n + 1);
	}
	selectNodeContents(e) {
		let t = e.nodeType === 3 ? e.textContent.length : e.childNodes.length;
		this.setStart(e, 0), this.setEnd(e, t);
	}
	_commonAncestorContainer(e, t) {
		var n = B(e || this.startContainer), r = B(t || this.endContainer);
		if (n[0] == r[0]) {
			for (var i = 0; i < n.length; i++) if (n[i] != r[i]) return n[i - 1];
		}
	}
	_checkCollapsed() {
		this.startContainer === this.endContainer && this.startOffset === this.endOffset ? this.collapsed = !0 : this.collapsed = !1;
	}
	toString() {}
};
//#endregion
//#region src/core/types.ts
function pe(e) {
	return !!(e && typeof e == "object" && "nodeType" in e && e.nodeType === 1);
}
function G(e) {
	return !isNaN(parseFloat(String(e))) && isFinite(Number(e));
}
function me(e) {
	var t = parseFloat(String(e));
	return G(e) === !1 ? !1 : typeof e == "string" && e.indexOf(".") > -1 ? !0 : Math.floor(t) !== t;
}
function K(e) {
	return Object.prototype.toString.call(e).slice(8, -1);
}
//#endregion
//#region src/epubcfi.ts
var q = 1, he = 3, J = 8, Y = 9, X = class e {
	str;
	base;
	spinePos;
	range;
	path;
	start;
	end;
	constructor(t, n, r) {
		var i;
		if (this.str = "", this.base = {}, this.spinePos = 0, this.range = !1, this.path = {}, this.start = null, this.end = null, !(this instanceof e)) return new e(t, n, r);
		if (typeof n == "string" ? this.base = this.parseComponent(n) : typeof n == "object" && n.steps && (this.base = n), i = this.checkType(t), i === "string") return this.str = t, I(this, this.parse(t));
		if (i === "range") return I(this, this.fromRange(t, this.base, r));
		if (i === "node") return I(this, this.fromNode(t, this.base, r));
		if (i === "EpubCFI" && t.path) return t;
		if (t) throw TypeError("not a valid argument for EpubCFI");
		return this;
	}
	checkType(t) {
		return this.isCfiString(t) ? "string" : t && typeof t == "object" && (K(t) === "Range" || t.startContainer !== void 0) ? "range" : t && typeof t == "object" && t.nodeType !== void 0 ? "node" : t && typeof t == "object" && t instanceof e ? "EpubCFI" : !1;
	}
	parse(e) {
		var t = {
			spinePos: -1,
			range: !1,
			base: {},
			path: {},
			start: null,
			end: null
		}, n, r, i;
		return typeof e != "string" || (e.indexOf("epubcfi(") === 0 && e[e.length - 1] === ")" && (e = e.slice(8, e.length - 1)), n = this.getChapterComponent(e), !n) ? { spinePos: -1 } : (t.base = this.parseComponent(n), r = this.getPathComponent(e), t.path = this.parseComponent(r), i = this.getRange(e), i && (t.range = !0, t.start = this.parseComponent(i[0]), t.end = this.parseComponent(i[1])), t.spinePos = t.base.steps[1].index, t);
	}
	parseComponent(e) {
		var t = {
			steps: [],
			terminal: {
				offset: null,
				assertion: null
			}
		}, n = e.split(":"), r = n[0].split("/"), i;
		return n.length > 1 && (i = n[1], t.terminal = this.parseTerminal(i)), r[0] === "" && r.shift(), t.steps = r.map(function(e) {
			return this.parseStep(e);
		}.bind(this)).filter(Boolean), t;
	}
	parseStep(e) {
		var t, n, r, i = e.match(/\[(.*)\]/), a;
		if (i && i[1] && (a = i[1]), n = parseInt(e), !isNaN(n)) return n % 2 == 0 ? (t = "element", r = n / 2 - 1) : (t = "text", r = (n - 1) / 2), {
			type: t,
			index: r,
			id: a || null
		};
	}
	parseTerminal(e) {
		var t, n, r = e.match(/\[(.*)\]/);
		return r && r[1] ? (t = parseInt(e.split("[")[0]), n = r[1]) : t = parseInt(e), G(t) || (t = null), {
			offset: t,
			assertion: n
		};
	}
	getChapterComponent(e) {
		return e.split("!")[0];
	}
	getPathComponent(e) {
		var t = e.split("!");
		if (t[1]) return t[1].split(",")[0];
	}
	getRange(e) {
		var t = e.split(",");
		return t.length === 3 ? [t[1], t[2]] : !1;
	}
	getCharecterOffsetComponent(e) {
		return e.split(":")[1] || "";
	}
	joinSteps(e) {
		return e ? e.map(function(e) {
			var t = "";
			return e.type === "element" && (t += (e.index + 1) * 2), e.type === "text" && (t += 1 + 2 * e.index), e.id && (t += "[" + e.id + "]"), t;
		}).join("/") : "";
	}
	segmentString(e) {
		var t = "/";
		return t += this.joinSteps(e.steps), e.terminal && e.terminal.offset != null && (t += ":" + e.terminal.offset), e.terminal && e.terminal.assertion != null && (t += "[" + e.terminal.assertion + "]"), t;
	}
	toString() {
		var e = "epubcfi(";
		return e += this.segmentString(this.base), e += "!", e += this.segmentString(this.path), this.range && this.start && (e += ",", e += this.segmentString(this.start)), this.range && this.end && (e += ",", e += this.segmentString(this.end)), e += ")", e;
	}
	compare(t, n) {
		var r, i, a, o;
		if (typeof t == "string" && (t = new e(t)), typeof n == "string" && (n = new e(n)), t.spinePos > n.spinePos) return 1;
		if (t.spinePos < n.spinePos) return -1;
		t.range ? (r = t.path.steps.concat(t.start.steps), a = t.start.terminal) : (r = t.path.steps, a = t.path.terminal), n.range ? (i = n.path.steps.concat(n.start.steps), o = n.start.terminal) : (i = n.path.steps, o = n.path.terminal);
		for (var s = 0; s < r.length; s++) {
			if (!r[s]) return -1;
			if (!i[s] || r[s].index > i[s].index) return 1;
			if (r[s].index < i[s].index) return -1;
		}
		return r.length < i.length ? -1 : a.offset > o.offset ? 1 : a.offset < o.offset ? -1 : 0;
	}
	step(e) {
		var t = e.nodeType === he ? "text" : "element", n = e;
		return {
			id: n.id,
			tagName: n.tagName,
			type: t,
			index: this.position(e)
		};
	}
	filteredStep(e, t) {
		var n = this.filter(e, t), r;
		if (n) return r = n.nodeType === he ? "text" : "element", {
			id: n.id,
			tagName: n.tagName,
			type: r,
			index: this.filteredPosition(n, t)
		};
	}
	pathTo(e, t, n) {
		for (var r = {
			steps: [],
			terminal: {
				offset: null,
				assertion: null
			}
		}, i = e, a; i && i.parentNode && i.parentNode.nodeType != Y;) a = n ? this.filteredStep(i, n) : this.step(i), a && r.steps.unshift(a), i = i.parentNode;
		return t != null && t >= 0 && (r.terminal.offset = t, r.steps[r.steps.length - 1].type != "text" && r.steps.push({
			type: "text",
			index: 0
		})), r;
	}
	equalStep(e, t) {
		return !e || !t ? !1 : e.index === t.index && e.id === t.id && e.type === t.type;
	}
	fromRange(e, t, n) {
		var r = {
			range: !1,
			base: {},
			path: {},
			start: null,
			end: null
		}, i = e.startContainer, a = e.endContainer, o = e.startOffset, s = e.endOffset, c = !1;
		if (n && (c = i.ownerDocument.querySelector("." + n) != null), typeof t == "string" ? (r.base = this.parseComponent(t), r.spinePos = r.base.steps[1].index) : typeof t == "object" && (r.base = t), e.collapsed) c && (o = this.patchOffset(i, o, n)), r.path = this.pathTo(i, o, n);
		else {
			r.range = !0, c && (o = this.patchOffset(i, o, n)), r.start = this.pathTo(i, o, n), c && (s = this.patchOffset(a, s, n)), r.end = this.pathTo(a, s, n), r.path = {
				steps: [],
				terminal: null
			};
			var l = r.start.steps.length, u;
			for (u = 0; u < l && this.equalStep(r.start.steps[u], r.end.steps[u]); u++) u === l - 1 ? r.start.terminal === r.end.terminal && (r.path.steps.push(r.start.steps[u]), r.range = !1) : r.path.steps.push(r.start.steps[u]);
			r.start.steps = r.start.steps.slice(r.path.steps.length), r.end.steps = r.end.steps.slice(r.path.steps.length);
		}
		return r;
	}
	fromNode(e, t, n) {
		var r = {
			range: !1,
			base: {},
			path: {},
			start: null,
			end: null
		};
		return typeof t == "string" ? (r.base = this.parseComponent(t), r.spinePos = r.base.steps[1].index) : typeof t == "object" && (r.base = t), r.path = this.pathTo(e, null, n), r;
	}
	filter(e, t) {
		var n, r, i, a, o, s = !1;
		return e.nodeType === he ? (s = !0, i = e.parentNode, n = e.parentNode.classList.contains(t || "")) : (s = !1, n = e.classList.contains(t || "")), n && s ? (a = i.previousSibling, o = i.nextSibling, a && a.nodeType === he ? r = a : o && o.nodeType === he && (r = o), r || e) : n && !s ? !1 : e;
	}
	patchOffset(e, t, n) {
		if (e.nodeType != he) throw Error("Anchor must be a text node");
		var r = e, i = t;
		for (e.parentNode.classList.contains(n || "") && (r = e.parentNode); r.previousSibling;) {
			if (r.previousSibling.nodeType === q) if (r.previousSibling.classList.contains(n || "")) i += r.previousSibling.textContent.length;
			else break;
			else i += r.previousSibling.textContent.length;
			r = r.previousSibling;
		}
		return i;
	}
	normalizedMap(e, t, n) {
		var r = {}, i = -1, a, o = e.length, s, c;
		for (a = 0; a < o; a++) s = e[a].nodeType, s === q && e[a].classList.contains(n || "") && (s = he), a > 0 && s === he && c === he ? r[a] = i : t === s && (i += 1, r[a] = i), c = s;
		return r;
	}
	position(e) {
		var t, n;
		return e.nodeType === q ? (t = e.parentNode.children, t ||= ue(e.parentNode), n = Array.prototype.indexOf.call(t, e)) : (t = this.textNodes(e.parentNode), n = t.indexOf(e)), n;
	}
	filteredPosition(e, t) {
		var n, r, i;
		return e.nodeType === q ? (n = e.parentNode.children, i = this.normalizedMap(n, q, t)) : (n = e.parentNode.childNodes, e.parentNode.classList.contains(t || "") && (e = e.parentNode, n = e.parentNode.childNodes), i = this.normalizedMap(n, he, t)), r = Array.prototype.indexOf.call(n, e), i[r];
	}
	stepsToXpath(e) {
		var t = [".", "*"];
		return e.forEach(function(e) {
			var n = e.index + 1;
			e.id ? t.push("*[position()=" + n + " and @id='" + e.id + "']") : e.type === "text" ? t.push("text()[" + n + "]") : t.push("*[" + n + "]");
		}), t.join("/");
	}
	stepsToQuerySelector(e) {
		var t = ["html"];
		return e.forEach(function(e) {
			var n = e.index + 1;
			e.id ? t.push("#" + e.id) : e.type === "text" || t.push("*:nth-child(" + n + ")");
		}), t.join(">");
	}
	textNodes(e, t) {
		return Array.prototype.slice.call(e.childNodes).filter(function(e) {
			return e.nodeType === he ? !0 : !!(t && e.classList.contains(t));
		});
	}
	walkToNode(e, t, n) {
		var r = t || document, i = r.documentElement, a, o, s = e.length, c;
		for (c = 0; c < s && (o = e[c], o.type === "element" ? o.id ? i = r.getElementById(o.id) : (a = i.children || ue(i), i = a[o.index]) : o.type === "text" && (i = this.textNodes(i, n)[o.index]), i); c++);
		return i;
	}
	findNode(e, t, n) {
		var r = t || document, i, a;
		return !n && r.evaluate !== void 0 ? (a = this.stepsToXpath(e), i = r.evaluate(a, r, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue) : i = n ? this.walkToNode(e, r, n) : this.walkToNode(e, r), i;
	}
	normalizeOffset(e, t) {
		var n = G(t) ? t : 0;
		return e ? (n < 0 && (n = 0), e.nodeType === he || e.nodeType === J ? Math.min(n, e.textContent.length) : e.childNodes ? Math.min(n, e.childNodes.length) : n) : 0;
	}
	fixMiss(e, t, n, r) {
		var i = this.findNode(e.slice(0, -1), n, r);
		if (!i || !i.childNodes) return {
			container: i || null,
			offset: this.normalizeOffset(i, t)
		};
		var a = i.childNodes, o = this.normalizedMap(a, he, r || void 0), s, c, l = e[e.length - 1].index;
		for (let e in o) if (Object.prototype.hasOwnProperty.call(o, e) && o[e] === l) if (s = a[Number(e)], c = s.textContent.length, (t || 0) > c) t = (t || 0) - c;
		else {
			i = s.nodeType === q ? s.childNodes[0] : s;
			break;
		}
		return {
			container: i,
			offset: this.normalizeOffset(i, t)
		};
	}
	setRangeBoundary(e, t, n, r, i, a, o) {
		var s = n, c = G(r) ? r : 0, l;
		if (!s) return !1;
		try {
			return e[t](s, c), !0;
		} catch {
			if (l = this.fixMiss(i, r, a, o), l && l.container && (s = l.container, c = l.offset), !s) return !1;
			c = this.normalizeOffset(s, c);
			try {
				return e[t](s, c), !0;
			} catch {
				return !1;
			}
		}
	}
	toRange(e, t) {
		var n = e || document, r, i, a, o, s, c = this, l, u, d = t ? n.querySelector("." + t) != null : !1;
		if (r = n.createRange === void 0 ? new fe() : n.createRange(), c.range ? (i = c.start, l = c.path.steps.concat(i.steps), o = this.findNode(l, n, d ? t : null), a = c.end, u = c.path.steps.concat(a.steps), s = this.findNode(u, n, d ? t : null)) : (i = c.path, l = c.path.steps, o = this.findNode(c.path.steps, n, d ? t : null)), o) {
			if (!this.setRangeBoundary(r, "setStart", o, i.terminal.offset == null ? 0 : i.terminal.offset, l, n, d ? t : null)) return console.log("No valid range start found for", this.toString()), null;
		} else return console.log("No startContainer found for", this.toString()), null;
		return s && this.setRangeBoundary(r, "setEnd", s, a.terminal.offset == null ? 0 : a.terminal.offset, u, n, d ? t : null), r;
	}
	isCfiString(e) {
		return typeof e == "string" && e.indexOf("epubcfi(") === 0 && e[e.length - 1] === ")";
	}
	generateChapterComponent(e, t, n) {
		var r = parseInt(String(t)), i = "/" + (e + 1) * 2 + "/";
		return i += (r + 1) * 2, n && (i += "[" + n + "]"), i;
	}
	collapse(e) {
		this.range && (this.range = !1, e ? (this.path.steps = this.path.steps.concat(this.start.steps), this.path.terminal = this.start.terminal) : (this.path.steps = this.path.steps.concat(this.end.steps), this.path.terminal = this.end.terminal));
	}
}, ge = class {
	context;
	hooks;
	constructor(e) {
		this.context = e || this, this.hooks = [];
	}
	register(...e) {
		for (var t = 0; t < arguments.length; ++t) if (typeof arguments[t] == "function") this.hooks.push(arguments[t]);
		else for (var n = 0; n < arguments[t].length; ++n) this.hooks.push(arguments[t][n]);
	}
	deregister(e) {
		let t;
		for (let n = 0; n < this.hooks.length; n++) if (t = this.hooks[n], t === e) {
			this.hooks.splice(n, 1);
			break;
		}
	}
	trigger(...e) {
		var t = arguments, n = this.context, r = [];
		return this.hooks.forEach(function(e) {
			var i;
			try {
				i = e.apply(n, t);
			} catch (e) {
				console.log(e);
			}
			i && typeof i.then == "function" && r.push(i);
		}), Promise.all(r);
	}
	list() {
		return this.hooks;
	}
	clear() {
		return this.hooks = [];
	}
};
//#endregion
//#region src/platform/dom.ts
function Z(e, t) {
	var n;
	if (!e) throw Error("No Element Provided");
	if (e.querySelector !== void 0) return e.querySelector(t);
	if (n = e.getElementsByTagName(t), n.length) return n[0];
}
function _e(e, t) {
	return e.querySelector === void 0 ? e.getElementsByTagName(t) : e.querySelectorAll(t);
}
function ve(e, t, n) {
	var r, i;
	if (e.querySelector !== void 0) {
		for (var a in t += "[", n) t += a + "~='" + n[a] + "'";
		return t += "]", e.querySelector(t);
	}
	if (r = e.getElementsByTagName(t), i = Array.prototype.slice.call(r, 0).filter(function(e) {
		for (var t in n) if (e.getAttribute(t) === n[t]) return !0;
		return !1;
	}), i) return i[0];
}
function Q(e, t, n) {
	var r, i;
	if (e.querySelector !== void 0 && (r = e.querySelector(`${t}[*|type="${n}"]`)), r) return r;
	i = _e(e, t);
	for (var a = 0; a < i.length; a++) if (i[a].getAttributeNS("http://www.idpf.org/2007/ops", "type") === n || i[a].getAttribute("epub:type") === n) return i[a];
}
//#endregion
//#region src/utils/replacements.ts
function ye(e, t) {
	var n, r, i = t.url, a = i.indexOf("://") > -1;
	e && (r = Z(e, "head"), n = Z(r, "base"), n || (n = e.createElement("base"), r.insertBefore(n, r.firstChild)), !a && window && window.location && (i = window.location.origin + i), n.setAttribute("href", i));
}
function be(e, t) {
	var n, r, i = t.canonical;
	e && (n = Z(e, "head"), r = Z(n, "link[rel='canonical']"), r ? r.setAttribute("href", i) : (r = e.createElement("link"), r.setAttribute("rel", "canonical"), r.setAttribute("href", i), n.appendChild(r)));
}
function xe(e, t) {
	var n, r, i = t.idref;
	e && (n = Z(e, "head"), r = Z(n, "meta[name='dc.identifier']"), r ? r.setAttribute("content", i) : (r = e.createElement("meta"), r.setAttribute("name", "dc.identifier"), r.setAttribute("content", i), n.appendChild(r)));
}
function Se(e, t, n) {
	var r = e.querySelectorAll("a[href]");
	if (r.length) for (var i = Z(e.ownerDocument, "base"), a = i ? i.getAttribute("href") : void 0, o = function(e) {
		var r = e.getAttribute("href");
		if (r.indexOf("mailto:") !== 0) if (r.indexOf("://") > -1) e.setAttribute("target", "_blank");
		else {
			var i;
			try {
				i = new ie(r, a);
			} catch {}
			e.onclick = function() {
				return n && r && r.indexOf("#") === 0 ? t(n + r) : i && i.hash ? t(i.Path.path + i.hash) : t(i ? i.Path.path : r), !1;
			};
		}
	}.bind(this), s = 0; s < r.length; s++) o(r[s]);
}
function Ce(e, t, n) {
	return t.forEach(function(t, r) {
		t && n[r] && (t = t.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), e = e.replace(new RegExp(t, "g"), n[r]));
	}), e;
}
//#endregion
//#region node_modules/@xmldom/xmldom/lib/conventions.js
var we = /* @__PURE__ */ o(((e) => {
	function t(e, t, n) {
		if (n === void 0 && (n = Array.prototype), e && typeof n.find == "function") return n.find.call(e, t);
		for (var r = 0; r < e.length; r++) if (Object.prototype.hasOwnProperty.call(e, r)) {
			var i = e[r];
			if (t.call(void 0, i, r, e)) return i;
		}
	}
	function n(e, t) {
		return t === void 0 && (t = Object), t && typeof t.freeze == "function" ? t.freeze(e) : e;
	}
	function r(e, t) {
		if (typeof e != "object" || !e) throw TypeError("target is not an object");
		for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
		return e;
	}
	var i = n({
		HTML: "text/html",
		isHTML: function(e) {
			return e === i.HTML;
		},
		XML_APPLICATION: "application/xml",
		XML_TEXT: "text/xml",
		XML_XHTML_APPLICATION: "application/xhtml+xml",
		XML_SVG_IMAGE: "image/svg+xml"
	}), a = n({
		HTML: "http://www.w3.org/1999/xhtml",
		isHTML: function(e) {
			return e === a.HTML;
		},
		SVG: "http://www.w3.org/2000/svg",
		XML: "http://www.w3.org/XML/1998/namespace",
		XMLNS: "http://www.w3.org/2000/xmlns/"
	});
	e.assign = r, e.find = t, e.freeze = n, e.MIME_TYPE = i, e.NAMESPACE = a;
})), Te = /* @__PURE__ */ o(((e) => {
	var t = we(), n = t.find, r = t.NAMESPACE;
	function i(e) {
		return e !== "";
	}
	function a(e) {
		return e ? e.split(/[\t\n\f\r ]+/).filter(i) : [];
	}
	function o(e, t) {
		return e.hasOwnProperty(t) || (e[t] = !0), e;
	}
	function s(e) {
		if (!e) return [];
		var t = a(e);
		return Object.keys(t.reduce(o, {}));
	}
	function c(e) {
		return function(t) {
			return e && e.indexOf(t) !== -1;
		};
	}
	function l(e, t) {
		for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
	}
	function u(e, t) {
		var n = e.prototype;
		if (!(n instanceof t)) {
			function r() {}
			r.prototype = t.prototype, r = new r(), l(n, r), e.prototype = n = r;
		}
		n.constructor != e && (typeof e != "function" && console.error("unknown Class:" + e), n.constructor = e);
	}
	var d = {}, f = d.ELEMENT_NODE = 1, p = d.ATTRIBUTE_NODE = 2, m = d.TEXT_NODE = 3, h = d.CDATA_SECTION_NODE = 4, g = d.ENTITY_REFERENCE_NODE = 5, _ = d.ENTITY_NODE = 6, v = d.PROCESSING_INSTRUCTION_NODE = 7, y = d.COMMENT_NODE = 8, b = d.DOCUMENT_NODE = 9, x = d.DOCUMENT_TYPE_NODE = 10, S = d.DOCUMENT_FRAGMENT_NODE = 11, C = d.NOTATION_NODE = 12, w = {}, T = {};
	w.INDEX_SIZE_ERR = (T[1] = "Index size error", 1), w.DOMSTRING_SIZE_ERR = (T[2] = "DOMString size error", 2);
	var E = w.HIERARCHY_REQUEST_ERR = (T[3] = "Hierarchy request error", 3);
	w.WRONG_DOCUMENT_ERR = (T[4] = "Wrong document", 4);
	var D = w.INVALID_CHARACTER_ERR = (T[5] = "Invalid character", 5);
	w.NO_DATA_ALLOWED_ERR = (T[6] = "No data allowed", 6), w.NO_MODIFICATION_ALLOWED_ERR = (T[7] = "No modification allowed", 7);
	var O = w.NOT_FOUND_ERR = (T[8] = "Not found", 8);
	w.NOT_SUPPORTED_ERR = (T[9] = "Not supported", 9);
	var k = w.INUSE_ATTRIBUTE_ERR = (T[10] = "Attribute in use", 10), A = w.INVALID_STATE_ERR = (T[11] = "Invalid state", 11);
	w.SYNTAX_ERR = (T[12] = "Syntax error", 12), w.INVALID_MODIFICATION_ERR = (T[13] = "Invalid modification", 13), w.NAMESPACE_ERR = (T[14] = "Invalid namespace", 14), w.INVALID_ACCESS_ERR = (T[15] = "Invalid access", 15);
	function j(e, t) {
		if (t instanceof Error) var n = t;
		else n = this, Error.call(this, T[e]), this.message = T[e], Error.captureStackTrace && Error.captureStackTrace(this, j);
		return n.code = e, t && (this.message = this.message + ": " + t), n;
	}
	j.prototype = Error.prototype, l(w, j);
	function M() {}
	M.prototype = {
		length: 0,
		item: function(e) {
			return e >= 0 && e < this.length ? this[e] : null;
		},
		toString: function(e, t, n) {
			for (var r = !!n && !!n.requireWellFormed, i = [], a = 0; a < this.length; a++) Ee(this[a], i, e, t, null, r);
			return i.join("");
		},
		filter: function(e) {
			return Array.prototype.filter.call(this, e);
		},
		indexOf: function(e) {
			return Array.prototype.indexOf.call(this, e);
		}
	};
	function N(e, t) {
		this._node = e, this._refresh = t, P(this);
	}
	function P(e) {
		var t = e._node._inc || e._node.ownerDocument._inc;
		if (e._inc !== t) {
			var n = e._refresh(e._node);
			if (ke(e, "length", n.length), !e.$$length || n.length < e.$$length) for (var r = n.length; r in e; r++) Object.prototype.hasOwnProperty.call(e, r) && delete e[r];
			l(n, e), e._inc = t;
		}
	}
	N.prototype.item = function(e) {
		return P(this), this[e] || null;
	}, u(N, M);
	function F() {}
	function I(e, t) {
		for (var n = e.length; n--;) if (e[n] === t) return n;
	}
	function ee(e, t, n, r) {
		if (r ? t[I(t, r)] = n : t[t.length++] = n, e) {
			n.ownerElement = e;
			var i = e.ownerDocument;
			i && (r && oe(i, e, r), z(i, e, n));
		}
	}
	function te(e, t, n) {
		var r = I(t, n);
		if (r >= 0) {
			for (var i = t.length - 1; r < i;) t[r] = t[++r];
			if (t.length = i, e) {
				var a = e.ownerDocument;
				a && (oe(a, e, n), n.ownerElement = null);
			}
		} else throw new j(O, /* @__PURE__ */ Error(e.tagName + "@" + n));
	}
	F.prototype = {
		length: 0,
		item: M.prototype.item,
		getNamedItem: function(e) {
			for (var t = this.length; t--;) {
				var n = this[t];
				if (n.nodeName == e) return n;
			}
		},
		setNamedItem: function(e) {
			var t = e.ownerElement;
			if (t && t != this._ownerElement) throw new j(k);
			var n = this.getNamedItem(e.nodeName);
			return ee(this._ownerElement, this, e, n), n;
		},
		setNamedItemNS: function(e) {
			var t = e.ownerElement, n;
			if (t && t != this._ownerElement) throw new j(k);
			return n = this.getNamedItemNS(e.namespaceURI, e.localName), ee(this._ownerElement, this, e, n), n;
		},
		removeNamedItem: function(e) {
			var t = this.getNamedItem(e);
			return te(this._ownerElement, this, t), t;
		},
		removeNamedItemNS: function(e, t) {
			var n = this.getNamedItemNS(e, t);
			return te(this._ownerElement, this, n), n;
		},
		getNamedItemNS: function(e, t) {
			for (var n = this.length; n--;) {
				var r = this[n];
				if (r.localName == t && r.namespaceURI == e) return r;
			}
			return null;
		}
	};
	function ne() {}
	ne.prototype = {
		hasFeature: function(e, t) {
			return !0;
		},
		createDocument: function(e, t, n) {
			var r = new ae();
			if (r.implementation = this, r.childNodes = new M(), r.doctype = n || null, n && r.appendChild(n), t) {
				var i = r.createElementNS(e, t);
				r.appendChild(i);
			}
			return r;
		},
		createDocumentType: function(e, t, n) {
			var r = new Z();
			return r.name = e, r.nodeName = e, r.publicId = t || "", r.systemId = n || "", r;
		}
	};
	function L() {}
	L.prototype = {
		firstChild: null,
		lastChild: null,
		previousSibling: null,
		nextSibling: null,
		attributes: null,
		parentNode: null,
		childNodes: null,
		ownerDocument: null,
		nodeValue: null,
		namespaceURI: null,
		prefix: null,
		localName: null,
		insertBefore: function(e, t) {
			return G(this, e, t);
		},
		replaceChild: function(e, t) {
			G(this, e, t, pe), t && this.removeChild(t);
		},
		removeChild: function(e) {
			return ce(this, e);
		},
		appendChild: function(e) {
			return this.insertBefore(e, null);
		},
		hasChildNodes: function() {
			return this.firstChild != null;
		},
		cloneNode: function(e) {
			return Oe(this.ownerDocument || this, this, e);
		},
		normalize: function() {
			R(this, null, { enter: function(e) {
				for (var t = e.firstChild; t;) {
					var n = t.nextSibling;
					n !== null && n.nodeType === m && t.nodeType === m ? (e.removeChild(n), t.appendData(n.data)) : t = n;
				}
				return !0;
			} });
		},
		isSupported: function(e, t) {
			return this.ownerDocument.implementation.hasFeature(e, t);
		},
		hasAttributes: function() {
			return this.attributes.length > 0;
		},
		lookupPrefix: function(e) {
			for (var t = this; t;) {
				var n = t._nsMap;
				if (n) {
					for (var r in n) if (Object.prototype.hasOwnProperty.call(n, r) && n[r] === e) return r;
				}
				t = t.nodeType == p ? t.ownerDocument : t.parentNode;
			}
			return null;
		},
		lookupNamespaceURI: function(e) {
			for (var t = this; t;) {
				var n = t._nsMap;
				if (n && Object.prototype.hasOwnProperty.call(n, e)) return n[e];
				t = t.nodeType == p ? t.ownerDocument : t.parentNode;
			}
			return null;
		},
		isDefaultNamespace: function(e) {
			return this.lookupPrefix(e) == null;
		}
	};
	function re(e) {
		return e == "<" && "&lt;" || e == ">" && "&gt;" || e == "&" && "&amp;" || e == "\"" && "&quot;" || "&#" + e.charCodeAt() + ";";
	}
	l(d, L), l(d, L.prototype);
	function ie(e, t) {
		return R(e, null, { enter: function(e) {
			return t(e) ? R.STOP : !0;
		} }) === R.STOP;
	}
	function R(e, t, n) {
		for (var r = [{
			node: e,
			context: t,
			phase: R.ENTER
		}]; r.length > 0;) {
			var i = r.pop();
			if (i.phase === R.ENTER) {
				var a = n.enter(i.node, i.context);
				if (a === R.STOP) return R.STOP;
				if (r.push({
					node: i.node,
					context: a,
					phase: R.EXIT
				}), a == null) continue;
				for (var o = i.node.lastChild; o;) r.push({
					node: o,
					context: a,
					phase: R.ENTER
				}), o = o.previousSibling;
			} else n.exit && n.exit(i.node, i.context);
		}
	}
	R.STOP = Symbol("walkDOM.STOP"), R.ENTER = 0, R.EXIT = 1;
	function ae() {
		this.ownerDocument = this;
	}
	function z(e, t, n) {
		e && e._inc++, n.namespaceURI === r.XMLNS && (t._nsMap[n.prefix ? n.localName : ""] = n.value);
	}
	function oe(e, t, n, i) {
		e && e._inc++, n.namespaceURI === r.XMLNS && delete t._nsMap[n.prefix ? n.localName : ""];
	}
	function se(e, t, n) {
		if (e && e._inc) {
			e._inc++;
			var r = t.childNodes;
			if (n) r[r.length++] = n;
			else {
				for (var i = t.firstChild, a = 0; i;) r[a++] = i, i = i.nextSibling;
				r.length = a, delete r[r.length];
			}
		}
	}
	function ce(e, t) {
		var n = t.previousSibling, r = t.nextSibling;
		return n ? n.nextSibling = r : e.firstChild = r, r ? r.previousSibling = n : e.lastChild = n, t.parentNode = null, t.previousSibling = null, t.nextSibling = null, se(e.ownerDocument, e), t;
	}
	function le(e) {
		return e && (e.nodeType === L.DOCUMENT_NODE || e.nodeType === L.DOCUMENT_FRAGMENT_NODE || e.nodeType === L.ELEMENT_NODE);
	}
	function ue(e) {
		return e && (V(e) || de(e) || B(e) || e.nodeType === L.DOCUMENT_FRAGMENT_NODE || e.nodeType === L.COMMENT_NODE || e.nodeType === L.PROCESSING_INSTRUCTION_NODE);
	}
	function B(e) {
		return e && e.nodeType === L.DOCUMENT_TYPE_NODE;
	}
	function V(e) {
		return e && e.nodeType === L.ELEMENT_NODE;
	}
	function de(e) {
		return e && e.nodeType === L.TEXT_NODE;
	}
	function H(e, t) {
		var r = e.childNodes || [];
		if (n(r, V) || B(t)) return !1;
		var i = n(r, B);
		return !(t && i && r.indexOf(i) > r.indexOf(t));
	}
	function U(e, t) {
		var r = e.childNodes || [];
		function i(e) {
			return V(e) && e !== t;
		}
		if (n(r, i)) return !1;
		var a = n(r, B);
		return !(t && a && r.indexOf(a) > r.indexOf(t));
	}
	function W(e, t, n) {
		if (!le(e)) throw new j(E, "Unexpected parent node type " + e.nodeType);
		if (n && n.parentNode !== e) throw new j(O, "child not in parent");
		if (!ue(t) || B(t) && e.nodeType !== L.DOCUMENT_NODE) throw new j(E, "Unexpected node type " + t.nodeType + " for parent node type " + e.nodeType);
	}
	function fe(e, t, r) {
		var i = e.childNodes || [], a = t.childNodes || [];
		if (t.nodeType === L.DOCUMENT_FRAGMENT_NODE) {
			var o = a.filter(V);
			if (o.length > 1 || n(a, de)) throw new j(E, "More than one element or text in fragment");
			if (o.length === 1 && !H(e, r)) throw new j(E, "Element in fragment can not be inserted before doctype");
		}
		if (V(t) && !H(e, r)) throw new j(E, "Only one element can be added and only after doctype");
		if (B(t)) {
			if (n(i, B)) throw new j(E, "Only one doctype is allowed");
			var s = n(i, V);
			if (r && i.indexOf(s) < i.indexOf(r)) throw new j(E, "Doctype can only be inserted before an element");
			if (!r && s) throw new j(E, "Doctype can not be appended since element is present");
		}
	}
	function pe(e, t, r) {
		var i = e.childNodes || [], a = t.childNodes || [];
		if (t.nodeType === L.DOCUMENT_FRAGMENT_NODE) {
			var o = a.filter(V);
			if (o.length > 1 || n(a, de)) throw new j(E, "More than one element or text in fragment");
			if (o.length === 1 && !U(e, r)) throw new j(E, "Element in fragment can not be inserted before doctype");
		}
		if (V(t) && !U(e, r)) throw new j(E, "Only one element can be added and only after doctype");
		if (B(t)) {
			function e(e) {
				return B(e) && e !== r;
			}
			if (n(i, e)) throw new j(E, "Only one doctype is allowed");
			var s = n(i, V);
			if (r && i.indexOf(s) < i.indexOf(r)) throw new j(E, "Doctype can only be inserted before an element");
		}
	}
	function G(e, t, n, r) {
		W(e, t, n), e.nodeType === L.DOCUMENT_NODE && (r || fe)(e, t, n);
		var i = t.parentNode;
		if (i && i.removeChild(t), t.nodeType === S) {
			var a = t.firstChild;
			if (a == null) return t;
			var o = t.lastChild;
		} else a = o = t;
		var s = n ? n.previousSibling : e.lastChild;
		a.previousSibling = s, o.nextSibling = n, s ? s.nextSibling = a : e.firstChild = a, n == null ? e.lastChild = o : n.previousSibling = o;
		do {
			a.parentNode = e;
			var c = e.ownerDocument || e;
			me(a, c);
		} while (a !== o && (a = a.nextSibling));
		return se(e.ownerDocument || e, e), t.nodeType == S && (t.firstChild = t.lastChild = null), t;
	}
	function me(e, t) {
		if (e.ownerDocument !== t) {
			if (e.ownerDocument = t, e.nodeType === f && e.attributes) for (var n = 0; n < e.attributes.length; n++) {
				var r = e.attributes.item(n);
				r && (r.ownerDocument = t);
			}
			for (var i = e.firstChild; i;) me(i, t), i = i.nextSibling;
		}
	}
	function K(e, t) {
		return t.parentNode && t.parentNode.removeChild(t), t.parentNode = e, t.previousSibling = e.lastChild, t.nextSibling = null, t.previousSibling ? t.previousSibling.nextSibling = t : e.firstChild = t, e.lastChild = t, se(e.ownerDocument, e, t), me(t, e.ownerDocument || e), t;
	}
	ae.prototype = {
		nodeName: "#document",
		nodeType: b,
		doctype: null,
		documentElement: null,
		_inc: 1,
		insertBefore: function(e, t) {
			if (e.nodeType == S) {
				for (var n = e.firstChild; n;) {
					var r = n.nextSibling;
					this.insertBefore(n, t), n = r;
				}
				return e;
			}
			return G(this, e, t), me(e, this), this.documentElement === null && e.nodeType === f && (this.documentElement = e), e;
		},
		removeChild: function(e) {
			return this.documentElement == e && (this.documentElement = null), ce(this, e);
		},
		replaceChild: function(e, t) {
			G(this, e, t, pe), me(e, this), t && this.removeChild(t), V(e) && (this.documentElement = e);
		},
		importNode: function(e, t) {
			return De(this, e, t);
		},
		getElementById: function(e) {
			var t = null;
			return ie(this.documentElement, function(n) {
				if (n.nodeType == f && n.getAttribute("id") == e) return t = n, !0;
			}), t;
		},
		getElementsByClassName: function(e) {
			var t = s(e);
			return new N(this, function(n) {
				var r = [];
				return t.length > 0 && ie(n.documentElement, function(i) {
					if (i !== n && i.nodeType === f) {
						var a = i.getAttribute("class");
						if (a) {
							var o = e === a;
							if (!o) {
								var l = s(a);
								o = t.every(c(l));
							}
							o && r.push(i);
						}
					}
				}), r;
			});
		},
		createElement: function(e) {
			var t = new q();
			t.ownerDocument = this, t.nodeName = e, t.tagName = e, t.localName = e, t.childNodes = new M();
			var n = t.attributes = new F();
			return n._ownerElement = t, t;
		},
		createDocumentFragment: function() {
			var e = new ye();
			return e.ownerDocument = this, e.childNodes = new M(), e;
		},
		createTextNode: function(e) {
			var t = new Y();
			return t.ownerDocument = this, t.appendData(e), t;
		},
		createComment: function(e) {
			var t = new X();
			return t.ownerDocument = this, t.appendData(e), t;
		},
		createCDATASection: function(e) {
			if (e.indexOf("]]>") !== -1) throw new j(D, "data contains \"]]>\"");
			var t = new ge();
			return t.ownerDocument = this, t.appendData(e), t;
		},
		createProcessingInstruction: function(e, t) {
			var n = new be();
			return n.ownerDocument = this, n.tagName = n.nodeName = n.target = e, n.nodeValue = n.data = t, n;
		},
		createAttribute: function(e) {
			var t = new he();
			return t.ownerDocument = this, t.name = e, t.nodeName = e, t.localName = e, t.specified = !0, t;
		},
		createEntityReference: function(e) {
			var t = new Q();
			return t.ownerDocument = this, t.nodeName = e, t;
		},
		createElementNS: function(e, t) {
			var n = new q(), r = t.split(":"), i = n.attributes = new F();
			return n.childNodes = new M(), n.ownerDocument = this, n.nodeName = t, n.tagName = t, n.namespaceURI = e, r.length == 2 ? (n.prefix = r[0], n.localName = r[1]) : n.localName = t, i._ownerElement = n, n;
		},
		createAttributeNS: function(e, t) {
			var n = new he(), r = t.split(":");
			return n.ownerDocument = this, n.nodeName = t, n.name = t, n.namespaceURI = e, n.specified = !0, r.length == 2 ? (n.prefix = r[0], n.localName = r[1]) : n.localName = t, n;
		}
	}, u(ae, L);
	function q() {
		this._nsMap = {};
	}
	q.prototype = {
		nodeType: f,
		hasAttribute: function(e) {
			return this.getAttributeNode(e) != null;
		},
		getAttribute: function(e) {
			var t = this.getAttributeNode(e);
			return t && t.value || "";
		},
		getAttributeNode: function(e) {
			return this.attributes.getNamedItem(e);
		},
		setAttribute: function(e, t) {
			var n = this.ownerDocument.createAttribute(e);
			n.value = n.nodeValue = "" + t, this.setAttributeNode(n);
		},
		removeAttribute: function(e) {
			var t = this.getAttributeNode(e);
			t && this.removeAttributeNode(t);
		},
		appendChild: function(e) {
			return e.nodeType === S ? this.insertBefore(e, null) : K(this, e);
		},
		setAttributeNode: function(e) {
			return this.attributes.setNamedItem(e);
		},
		setAttributeNodeNS: function(e) {
			return this.attributes.setNamedItemNS(e);
		},
		removeAttributeNode: function(e) {
			return this.attributes.removeNamedItem(e.nodeName);
		},
		removeAttributeNS: function(e, t) {
			var n = this.getAttributeNodeNS(e, t);
			n && this.removeAttributeNode(n);
		},
		hasAttributeNS: function(e, t) {
			return this.getAttributeNodeNS(e, t) != null;
		},
		getAttributeNS: function(e, t) {
			var n = this.getAttributeNodeNS(e, t);
			return n && n.value || "";
		},
		setAttributeNS: function(e, t, n) {
			var r = this.ownerDocument.createAttributeNS(e, t);
			r.value = r.nodeValue = "" + n, this.setAttributeNode(r);
		},
		getAttributeNodeNS: function(e, t) {
			return this.attributes.getNamedItemNS(e, t);
		},
		getElementsByTagName: function(e) {
			return new N(this, function(t) {
				var n = [];
				return ie(t, function(r) {
					r !== t && r.nodeType == f && (e === "*" || r.tagName == e) && n.push(r);
				}), n;
			});
		},
		getElementsByTagNameNS: function(e, t) {
			return new N(this, function(n) {
				var r = [];
				return ie(n, function(i) {
					i !== n && i.nodeType === f && (e === "*" || i.namespaceURI === e) && (t === "*" || i.localName == t) && r.push(i);
				}), r;
			});
		}
	}, ae.prototype.getElementsByTagName = q.prototype.getElementsByTagName, ae.prototype.getElementsByTagNameNS = q.prototype.getElementsByTagNameNS, u(q, L);
	function he() {}
	he.prototype.nodeType = p, u(he, L);
	function J() {}
	J.prototype = {
		data: "",
		substringData: function(e, t) {
			return this.data.substring(e, e + t);
		},
		appendData: function(e) {
			e = this.data + e, this.nodeValue = this.data = e, this.length = e.length;
		},
		insertData: function(e, t) {
			this.replaceData(e, 0, t);
		},
		appendChild: function(e) {
			throw Error(T[E]);
		},
		deleteData: function(e, t) {
			this.replaceData(e, t, "");
		},
		replaceData: function(e, t, n) {
			var r = this.data.substring(0, e), i = this.data.substring(e + t);
			n = r + n + i, this.nodeValue = this.data = n, this.length = n.length;
		}
	}, u(J, L);
	function Y() {}
	Y.prototype = {
		nodeName: "#text",
		nodeType: m,
		splitText: function(e) {
			var t = this.data, n = t.substring(e);
			t = t.substring(0, e), this.data = this.nodeValue = t, this.length = t.length;
			var r = this.ownerDocument.createTextNode(n);
			return this.parentNode && this.parentNode.insertBefore(r, this.nextSibling), r;
		}
	}, u(Y, J);
	function X() {}
	X.prototype = {
		nodeName: "#comment",
		nodeType: y
	}, u(X, J);
	function ge() {}
	ge.prototype = {
		nodeName: "#cdata-section",
		nodeType: h
	}, u(ge, J);
	function Z() {}
	Z.prototype.nodeType = x, u(Z, L);
	function _e() {}
	_e.prototype.nodeType = C, u(_e, L);
	function ve() {}
	ve.prototype.nodeType = _, u(ve, L);
	function Q() {}
	Q.prototype.nodeType = g, u(Q, L);
	function ye() {}
	ye.prototype.nodeName = "#document-fragment", ye.prototype.nodeType = S, u(ye, L);
	function be() {}
	be.prototype.nodeType = v, u(be, L);
	function xe() {}
	xe.prototype.serializeToString = function(e, t, n, r) {
		return Se.call(e, t, n, r);
	}, L.prototype.toString = Se;
	function Se(e, t, n) {
		var r = !!n && !!n.requireWellFormed, i = [], a = this.nodeType == 9 && this.documentElement || this, o = a.prefix, s = a.namespaceURI;
		if (s && o == null) {
			var o = a.lookupPrefix(s);
			if (o == null) var c = [{
				namespace: s,
				prefix: null
			}];
		}
		return Ee(this, i, e, t, c, r), i.join("");
	}
	function Ce(e, t, n) {
		var i = e.prefix || "", a = e.namespaceURI;
		if (!a || i === "xml" && a === r.XML || a === r.XMLNS) return !1;
		for (var o = n.length; o--;) {
			var s = n[o];
			if (s.prefix === i) return s.namespace !== a;
		}
		return !0;
	}
	function Te(e, t, n) {
		e.push(" ", t, "=\"", n.replace(/[<>&"\t\n\r]/g, re), "\"");
	}
	function Ee(e, t, n, i, a, o) {
		a ||= [], R(e, {
			ns: a,
			isHTML: n
		}, {
			enter: function(e, n) {
				var a = n.ns, s = n.isHTML;
				if (i) if (e = i(e), e) {
					if (typeof e == "string") return t.push(e), null;
				} else return null;
				switch (e.nodeType) {
					case f:
						var c = e.attributes, l = c.length, u = e.tagName;
						s = r.isHTML(e.namespaceURI) || s;
						var d = u;
						if (!s && !e.prefix && e.namespaceURI) {
							for (var _, C = 0; C < c.length; C++) if (c.item(C).name === "xmlns") {
								_ = c.item(C).value;
								break;
							}
							if (!_) for (var w = a.length - 1; w >= 0; w--) {
								var T = a[w];
								if (T.prefix === "" && T.namespace === e.namespaceURI) {
									_ = T.namespace;
									break;
								}
							}
							if (_ !== e.namespaceURI) for (var w = a.length - 1; w >= 0; w--) {
								var T = a[w];
								if (T.namespace === e.namespaceURI) {
									T.prefix && (d = T.prefix + ":" + u);
									break;
								}
							}
						}
						t.push("<", d);
						for (var E = a.slice(), D = 0; D < l; D++) {
							var O = c.item(D);
							O.prefix == "xmlns" ? E.push({
								prefix: O.localName,
								namespace: O.value
							}) : O.nodeName == "xmlns" && E.push({
								prefix: "",
								namespace: O.value
							});
						}
						for (var D = 0; D < l; D++) {
							var O = c.item(D);
							if (Ce(O, s, E)) {
								var k = O.prefix || "", M = O.namespaceURI;
								Te(t, k ? "xmlns:" + k : "xmlns", M), E.push({
									prefix: k,
									namespace: M
								});
							}
							var N = i ? i(O) : O;
							N && (typeof N == "string" ? t.push(N) : Te(t, N.name, N.value));
						}
						if (u === d && Ce(e, s, E)) {
							var P = e.prefix || "", M = e.namespaceURI;
							Te(t, P ? "xmlns:" + P : "xmlns", M), E.push({
								prefix: P,
								namespace: M
							});
						}
						var F = e.firstChild;
						if (F || s && !/^(?:meta|link|img|br|hr|input)$/i.test(u)) {
							if (t.push(">"), s && /^script$/i.test(u)) {
								for (; F;) F.data ? t.push(F.data) : Ee(F, t, s, i, E.slice(), o), F = F.nextSibling;
								return t.push("</", u, ">"), null;
							}
							return {
								ns: E,
								isHTML: s,
								tag: d
							};
						} else return t.push("/>"), null;
					case b:
					case S: return {
						ns: a.slice(),
						isHTML: s,
						tag: null
					};
					case p: return Te(t, e.name, e.value), null;
					case m: return t.push(e.data.replace(/[<&>]/g, re)), null;
					case h:
						if (o && e.data.indexOf("]]>") !== -1) throw new j(A, "The CDATASection data contains \"]]>\"");
						return t.push("<![CDATA[", e.data.replace(/]]>/g, "]]]]><![CDATA[>"), "]]>"), null;
					case y:
						if (o && e.data.indexOf("-->") !== -1) throw new j(A, "The comment node data contains \"-->\"");
						return t.push("<!--", e.data, "-->"), null;
					case x:
						if (o) {
							if (e.publicId && !/^("[\x20\r\na-zA-Z0-9\-()+,.\/:=?;!*#@$_%']*"|'[\x20\r\na-zA-Z0-9\-()+,.\/:=?;!*#@$_%'"]*')$/.test(e.publicId)) throw new j(A, "DocumentType publicId is not a valid PubidLiteral");
							if (e.systemId && !/^("[^"]*"|'[^']*')$/.test(e.systemId)) throw new j(A, "DocumentType systemId is not a valid SystemLiteral");
							if (e.internalSubset && e.internalSubset.indexOf("]>") !== -1) throw new j(A, "DocumentType internalSubset contains \"]>\"");
						}
						var I = e.publicId, ee = e.systemId;
						if (t.push("<!DOCTYPE ", e.name), I) t.push(" PUBLIC ", I), ee && ee != "." && t.push(" ", ee), t.push(">");
						else if (ee && ee != ".") t.push(" SYSTEM ", ee, ">");
						else {
							var te = e.internalSubset;
							te && t.push(" [", te, "]"), t.push(">");
						}
						return null;
					case v:
						if (o && e.data.indexOf("?>") !== -1) throw new j(A, "The ProcessingInstruction data contains \"?>\"");
						return t.push("<?", e.target, " ", e.data, "?>"), null;
					case g: return t.push("&", e.nodeName, ";"), null;
					default: return t.push("??", e.nodeName), null;
				}
			},
			exit: function(e, n) {
				n && n.tag && t.push("</", n.tag, ">");
			}
		});
	}
	function De(e, t, n) {
		var r;
		return R(t, null, { enter: function(t, i) {
			var a = t.cloneNode(!1);
			return a.ownerDocument = e, a.parentNode = null, i === null ? r = a : i.appendChild(a), t.nodeType === p || n ? a : null;
		} }), r;
	}
	function Oe(e, t, n) {
		var r;
		return R(t, null, { enter: function(t, i) {
			var a = new t.constructor();
			for (var o in t) if (Object.prototype.hasOwnProperty.call(t, o)) {
				var s = t[o];
				typeof s != "object" && s != a[o] && (a[o] = s);
			}
			t.childNodes && (a.childNodes = new M()), a.ownerDocument = e;
			var c = n;
			switch (a.nodeType) {
				case f:
					var l = t.attributes, u = a.attributes = new F(), d = l.length;
					u._ownerElement = a;
					for (var m = 0; m < d; m++) a.setAttributeNode(Oe(e, l.item(m), !0));
					break;
				case p: c = !0;
			}
			return i === null ? r = a : i.appendChild(a), c ? a : null;
		} }), r;
	}
	function ke(e, t, n) {
		e[t] = n;
	}
	try {
		Object.defineProperty && (Object.defineProperty(N.prototype, "length", { get: function() {
			return P(this), this.$$length;
		} }), Object.defineProperty(L.prototype, "textContent", {
			get: function() {
				if (this.nodeType === f || this.nodeType === S) {
					var e = [];
					return R(this, null, { enter: function(t) {
						if (t.nodeType === f || t.nodeType === S) return !0;
						if (t.nodeType === v || t.nodeType === y) return null;
						e.push(t.nodeValue);
					} }), e.join("");
				}
				return this.nodeValue;
			},
			set: function(e) {
				switch (this.nodeType) {
					case f:
					case S:
						for (; this.firstChild;) this.removeChild(this.firstChild);
						(e || String(e)) && this.appendChild(this.ownerDocument.createTextNode(e));
						break;
					default: this.data = e, this.value = e, this.nodeValue = e;
				}
			}
		}), ke = function(e, t, n) {
			e["$$" + t] = n;
		});
	} catch {}
	e.DocumentType = Z, e.DOMException = j, e.DOMImplementation = ne, e.Element = q, e.Node = L, e.NodeList = M, e.walkDOM = R, e.XMLSerializer = xe;
})), Ee = /* @__PURE__ */ o(((e) => {
	var t = we().freeze;
	e.XML_ENTITIES = t({
		amp: "&",
		apos: "'",
		gt: ">",
		lt: "<",
		quot: "\""
	}), e.HTML_ENTITIES = t({
		Aacute: "Á",
		aacute: "á",
		Abreve: "Ă",
		abreve: "ă",
		ac: "∾",
		acd: "∿",
		acE: "∾̳",
		Acirc: "Â",
		acirc: "â",
		acute: "´",
		Acy: "А",
		acy: "а",
		AElig: "Æ",
		aelig: "æ",
		af: "⁡",
		Afr: "𝔄",
		afr: "𝔞",
		Agrave: "À",
		agrave: "à",
		alefsym: "ℵ",
		aleph: "ℵ",
		Alpha: "Α",
		alpha: "α",
		Amacr: "Ā",
		amacr: "ā",
		amalg: "⨿",
		AMP: "&",
		amp: "&",
		And: "⩓",
		and: "∧",
		andand: "⩕",
		andd: "⩜",
		andslope: "⩘",
		andv: "⩚",
		ang: "∠",
		ange: "⦤",
		angle: "∠",
		angmsd: "∡",
		angmsdaa: "⦨",
		angmsdab: "⦩",
		angmsdac: "⦪",
		angmsdad: "⦫",
		angmsdae: "⦬",
		angmsdaf: "⦭",
		angmsdag: "⦮",
		angmsdah: "⦯",
		angrt: "∟",
		angrtvb: "⊾",
		angrtvbd: "⦝",
		angsph: "∢",
		angst: "Å",
		angzarr: "⍼",
		Aogon: "Ą",
		aogon: "ą",
		Aopf: "𝔸",
		aopf: "𝕒",
		ap: "≈",
		apacir: "⩯",
		apE: "⩰",
		ape: "≊",
		apid: "≋",
		apos: "'",
		ApplyFunction: "⁡",
		approx: "≈",
		approxeq: "≊",
		Aring: "Å",
		aring: "å",
		Ascr: "𝒜",
		ascr: "𝒶",
		Assign: "≔",
		ast: "*",
		asymp: "≈",
		asympeq: "≍",
		Atilde: "Ã",
		atilde: "ã",
		Auml: "Ä",
		auml: "ä",
		awconint: "∳",
		awint: "⨑",
		backcong: "≌",
		backepsilon: "϶",
		backprime: "‵",
		backsim: "∽",
		backsimeq: "⋍",
		Backslash: "∖",
		Barv: "⫧",
		barvee: "⊽",
		Barwed: "⌆",
		barwed: "⌅",
		barwedge: "⌅",
		bbrk: "⎵",
		bbrktbrk: "⎶",
		bcong: "≌",
		Bcy: "Б",
		bcy: "б",
		bdquo: "„",
		becaus: "∵",
		Because: "∵",
		because: "∵",
		bemptyv: "⦰",
		bepsi: "϶",
		bernou: "ℬ",
		Bernoullis: "ℬ",
		Beta: "Β",
		beta: "β",
		beth: "ℶ",
		between: "≬",
		Bfr: "𝔅",
		bfr: "𝔟",
		bigcap: "⋂",
		bigcirc: "◯",
		bigcup: "⋃",
		bigodot: "⨀",
		bigoplus: "⨁",
		bigotimes: "⨂",
		bigsqcup: "⨆",
		bigstar: "★",
		bigtriangledown: "▽",
		bigtriangleup: "△",
		biguplus: "⨄",
		bigvee: "⋁",
		bigwedge: "⋀",
		bkarow: "⤍",
		blacklozenge: "⧫",
		blacksquare: "▪",
		blacktriangle: "▴",
		blacktriangledown: "▾",
		blacktriangleleft: "◂",
		blacktriangleright: "▸",
		blank: "␣",
		blk12: "▒",
		blk14: "░",
		blk34: "▓",
		block: "█",
		bne: "=⃥",
		bnequiv: "≡⃥",
		bNot: "⫭",
		bnot: "⌐",
		Bopf: "𝔹",
		bopf: "𝕓",
		bot: "⊥",
		bottom: "⊥",
		bowtie: "⋈",
		boxbox: "⧉",
		boxDL: "╗",
		boxDl: "╖",
		boxdL: "╕",
		boxdl: "┐",
		boxDR: "╔",
		boxDr: "╓",
		boxdR: "╒",
		boxdr: "┌",
		boxH: "═",
		boxh: "─",
		boxHD: "╦",
		boxHd: "╤",
		boxhD: "╥",
		boxhd: "┬",
		boxHU: "╩",
		boxHu: "╧",
		boxhU: "╨",
		boxhu: "┴",
		boxminus: "⊟",
		boxplus: "⊞",
		boxtimes: "⊠",
		boxUL: "╝",
		boxUl: "╜",
		boxuL: "╛",
		boxul: "┘",
		boxUR: "╚",
		boxUr: "╙",
		boxuR: "╘",
		boxur: "└",
		boxV: "║",
		boxv: "│",
		boxVH: "╬",
		boxVh: "╫",
		boxvH: "╪",
		boxvh: "┼",
		boxVL: "╣",
		boxVl: "╢",
		boxvL: "╡",
		boxvl: "┤",
		boxVR: "╠",
		boxVr: "╟",
		boxvR: "╞",
		boxvr: "├",
		bprime: "‵",
		Breve: "˘",
		breve: "˘",
		brvbar: "¦",
		Bscr: "ℬ",
		bscr: "𝒷",
		bsemi: "⁏",
		bsim: "∽",
		bsime: "⋍",
		bsol: "\\",
		bsolb: "⧅",
		bsolhsub: "⟈",
		bull: "•",
		bullet: "•",
		bump: "≎",
		bumpE: "⪮",
		bumpe: "≏",
		Bumpeq: "≎",
		bumpeq: "≏",
		Cacute: "Ć",
		cacute: "ć",
		Cap: "⋒",
		cap: "∩",
		capand: "⩄",
		capbrcup: "⩉",
		capcap: "⩋",
		capcup: "⩇",
		capdot: "⩀",
		CapitalDifferentialD: "ⅅ",
		caps: "∩︀",
		caret: "⁁",
		caron: "ˇ",
		Cayleys: "ℭ",
		ccaps: "⩍",
		Ccaron: "Č",
		ccaron: "č",
		Ccedil: "Ç",
		ccedil: "ç",
		Ccirc: "Ĉ",
		ccirc: "ĉ",
		Cconint: "∰",
		ccups: "⩌",
		ccupssm: "⩐",
		Cdot: "Ċ",
		cdot: "ċ",
		cedil: "¸",
		Cedilla: "¸",
		cemptyv: "⦲",
		cent: "¢",
		CenterDot: "·",
		centerdot: "·",
		Cfr: "ℭ",
		cfr: "𝔠",
		CHcy: "Ч",
		chcy: "ч",
		check: "✓",
		checkmark: "✓",
		Chi: "Χ",
		chi: "χ",
		cir: "○",
		circ: "ˆ",
		circeq: "≗",
		circlearrowleft: "↺",
		circlearrowright: "↻",
		circledast: "⊛",
		circledcirc: "⊚",
		circleddash: "⊝",
		CircleDot: "⊙",
		circledR: "®",
		circledS: "Ⓢ",
		CircleMinus: "⊖",
		CirclePlus: "⊕",
		CircleTimes: "⊗",
		cirE: "⧃",
		cire: "≗",
		cirfnint: "⨐",
		cirmid: "⫯",
		cirscir: "⧂",
		ClockwiseContourIntegral: "∲",
		CloseCurlyDoubleQuote: "”",
		CloseCurlyQuote: "’",
		clubs: "♣",
		clubsuit: "♣",
		Colon: "∷",
		colon: ":",
		Colone: "⩴",
		colone: "≔",
		coloneq: "≔",
		comma: ",",
		commat: "@",
		comp: "∁",
		compfn: "∘",
		complement: "∁",
		complexes: "ℂ",
		cong: "≅",
		congdot: "⩭",
		Congruent: "≡",
		Conint: "∯",
		conint: "∮",
		ContourIntegral: "∮",
		Copf: "ℂ",
		copf: "𝕔",
		coprod: "∐",
		Coproduct: "∐",
		COPY: "©",
		copy: "©",
		copysr: "℗",
		CounterClockwiseContourIntegral: "∳",
		crarr: "↵",
		Cross: "⨯",
		cross: "✗",
		Cscr: "𝒞",
		cscr: "𝒸",
		csub: "⫏",
		csube: "⫑",
		csup: "⫐",
		csupe: "⫒",
		ctdot: "⋯",
		cudarrl: "⤸",
		cudarrr: "⤵",
		cuepr: "⋞",
		cuesc: "⋟",
		cularr: "↶",
		cularrp: "⤽",
		Cup: "⋓",
		cup: "∪",
		cupbrcap: "⩈",
		CupCap: "≍",
		cupcap: "⩆",
		cupcup: "⩊",
		cupdot: "⊍",
		cupor: "⩅",
		cups: "∪︀",
		curarr: "↷",
		curarrm: "⤼",
		curlyeqprec: "⋞",
		curlyeqsucc: "⋟",
		curlyvee: "⋎",
		curlywedge: "⋏",
		curren: "¤",
		curvearrowleft: "↶",
		curvearrowright: "↷",
		cuvee: "⋎",
		cuwed: "⋏",
		cwconint: "∲",
		cwint: "∱",
		cylcty: "⌭",
		Dagger: "‡",
		dagger: "†",
		daleth: "ℸ",
		Darr: "↡",
		dArr: "⇓",
		darr: "↓",
		dash: "‐",
		Dashv: "⫤",
		dashv: "⊣",
		dbkarow: "⤏",
		dblac: "˝",
		Dcaron: "Ď",
		dcaron: "ď",
		Dcy: "Д",
		dcy: "д",
		DD: "ⅅ",
		dd: "ⅆ",
		ddagger: "‡",
		ddarr: "⇊",
		DDotrahd: "⤑",
		ddotseq: "⩷",
		deg: "°",
		Del: "∇",
		Delta: "Δ",
		delta: "δ",
		demptyv: "⦱",
		dfisht: "⥿",
		Dfr: "𝔇",
		dfr: "𝔡",
		dHar: "⥥",
		dharl: "⇃",
		dharr: "⇂",
		DiacriticalAcute: "´",
		DiacriticalDot: "˙",
		DiacriticalDoubleAcute: "˝",
		DiacriticalGrave: "`",
		DiacriticalTilde: "˜",
		diam: "⋄",
		Diamond: "⋄",
		diamond: "⋄",
		diamondsuit: "♦",
		diams: "♦",
		die: "¨",
		DifferentialD: "ⅆ",
		digamma: "ϝ",
		disin: "⋲",
		div: "÷",
		divide: "÷",
		divideontimes: "⋇",
		divonx: "⋇",
		DJcy: "Ђ",
		djcy: "ђ",
		dlcorn: "⌞",
		dlcrop: "⌍",
		dollar: "$",
		Dopf: "𝔻",
		dopf: "𝕕",
		Dot: "¨",
		dot: "˙",
		DotDot: "⃜",
		doteq: "≐",
		doteqdot: "≑",
		DotEqual: "≐",
		dotminus: "∸",
		dotplus: "∔",
		dotsquare: "⊡",
		doublebarwedge: "⌆",
		DoubleContourIntegral: "∯",
		DoubleDot: "¨",
		DoubleDownArrow: "⇓",
		DoubleLeftArrow: "⇐",
		DoubleLeftRightArrow: "⇔",
		DoubleLeftTee: "⫤",
		DoubleLongLeftArrow: "⟸",
		DoubleLongLeftRightArrow: "⟺",
		DoubleLongRightArrow: "⟹",
		DoubleRightArrow: "⇒",
		DoubleRightTee: "⊨",
		DoubleUpArrow: "⇑",
		DoubleUpDownArrow: "⇕",
		DoubleVerticalBar: "∥",
		DownArrow: "↓",
		Downarrow: "⇓",
		downarrow: "↓",
		DownArrowBar: "⤓",
		DownArrowUpArrow: "⇵",
		DownBreve: "̑",
		downdownarrows: "⇊",
		downharpoonleft: "⇃",
		downharpoonright: "⇂",
		DownLeftRightVector: "⥐",
		DownLeftTeeVector: "⥞",
		DownLeftVector: "↽",
		DownLeftVectorBar: "⥖",
		DownRightTeeVector: "⥟",
		DownRightVector: "⇁",
		DownRightVectorBar: "⥗",
		DownTee: "⊤",
		DownTeeArrow: "↧",
		drbkarow: "⤐",
		drcorn: "⌟",
		drcrop: "⌌",
		Dscr: "𝒟",
		dscr: "𝒹",
		DScy: "Ѕ",
		dscy: "ѕ",
		dsol: "⧶",
		Dstrok: "Đ",
		dstrok: "đ",
		dtdot: "⋱",
		dtri: "▿",
		dtrif: "▾",
		duarr: "⇵",
		duhar: "⥯",
		dwangle: "⦦",
		DZcy: "Џ",
		dzcy: "џ",
		dzigrarr: "⟿",
		Eacute: "É",
		eacute: "é",
		easter: "⩮",
		Ecaron: "Ě",
		ecaron: "ě",
		ecir: "≖",
		Ecirc: "Ê",
		ecirc: "ê",
		ecolon: "≕",
		Ecy: "Э",
		ecy: "э",
		eDDot: "⩷",
		Edot: "Ė",
		eDot: "≑",
		edot: "ė",
		ee: "ⅇ",
		efDot: "≒",
		Efr: "𝔈",
		efr: "𝔢",
		eg: "⪚",
		Egrave: "È",
		egrave: "è",
		egs: "⪖",
		egsdot: "⪘",
		el: "⪙",
		Element: "∈",
		elinters: "⏧",
		ell: "ℓ",
		els: "⪕",
		elsdot: "⪗",
		Emacr: "Ē",
		emacr: "ē",
		empty: "∅",
		emptyset: "∅",
		EmptySmallSquare: "◻",
		emptyv: "∅",
		EmptyVerySmallSquare: "▫",
		emsp: " ",
		emsp13: " ",
		emsp14: " ",
		ENG: "Ŋ",
		eng: "ŋ",
		ensp: " ",
		Eogon: "Ę",
		eogon: "ę",
		Eopf: "𝔼",
		eopf: "𝕖",
		epar: "⋕",
		eparsl: "⧣",
		eplus: "⩱",
		epsi: "ε",
		Epsilon: "Ε",
		epsilon: "ε",
		epsiv: "ϵ",
		eqcirc: "≖",
		eqcolon: "≕",
		eqsim: "≂",
		eqslantgtr: "⪖",
		eqslantless: "⪕",
		Equal: "⩵",
		equals: "=",
		EqualTilde: "≂",
		equest: "≟",
		Equilibrium: "⇌",
		equiv: "≡",
		equivDD: "⩸",
		eqvparsl: "⧥",
		erarr: "⥱",
		erDot: "≓",
		Escr: "ℰ",
		escr: "ℯ",
		esdot: "≐",
		Esim: "⩳",
		esim: "≂",
		Eta: "Η",
		eta: "η",
		ETH: "Ð",
		eth: "ð",
		Euml: "Ë",
		euml: "ë",
		euro: "€",
		excl: "!",
		exist: "∃",
		Exists: "∃",
		expectation: "ℰ",
		ExponentialE: "ⅇ",
		exponentiale: "ⅇ",
		fallingdotseq: "≒",
		Fcy: "Ф",
		fcy: "ф",
		female: "♀",
		ffilig: "ﬃ",
		fflig: "ﬀ",
		ffllig: "ﬄ",
		Ffr: "𝔉",
		ffr: "𝔣",
		filig: "ﬁ",
		FilledSmallSquare: "◼",
		FilledVerySmallSquare: "▪",
		fjlig: "fj",
		flat: "♭",
		fllig: "ﬂ",
		fltns: "▱",
		fnof: "ƒ",
		Fopf: "𝔽",
		fopf: "𝕗",
		ForAll: "∀",
		forall: "∀",
		fork: "⋔",
		forkv: "⫙",
		Fouriertrf: "ℱ",
		fpartint: "⨍",
		frac12: "½",
		frac13: "⅓",
		frac14: "¼",
		frac15: "⅕",
		frac16: "⅙",
		frac18: "⅛",
		frac23: "⅔",
		frac25: "⅖",
		frac34: "¾",
		frac35: "⅗",
		frac38: "⅜",
		frac45: "⅘",
		frac56: "⅚",
		frac58: "⅝",
		frac78: "⅞",
		frasl: "⁄",
		frown: "⌢",
		Fscr: "ℱ",
		fscr: "𝒻",
		gacute: "ǵ",
		Gamma: "Γ",
		gamma: "γ",
		Gammad: "Ϝ",
		gammad: "ϝ",
		gap: "⪆",
		Gbreve: "Ğ",
		gbreve: "ğ",
		Gcedil: "Ģ",
		Gcirc: "Ĝ",
		gcirc: "ĝ",
		Gcy: "Г",
		gcy: "г",
		Gdot: "Ġ",
		gdot: "ġ",
		gE: "≧",
		ge: "≥",
		gEl: "⪌",
		gel: "⋛",
		geq: "≥",
		geqq: "≧",
		geqslant: "⩾",
		ges: "⩾",
		gescc: "⪩",
		gesdot: "⪀",
		gesdoto: "⪂",
		gesdotol: "⪄",
		gesl: "⋛︀",
		gesles: "⪔",
		Gfr: "𝔊",
		gfr: "𝔤",
		Gg: "⋙",
		gg: "≫",
		ggg: "⋙",
		gimel: "ℷ",
		GJcy: "Ѓ",
		gjcy: "ѓ",
		gl: "≷",
		gla: "⪥",
		glE: "⪒",
		glj: "⪤",
		gnap: "⪊",
		gnapprox: "⪊",
		gnE: "≩",
		gne: "⪈",
		gneq: "⪈",
		gneqq: "≩",
		gnsim: "⋧",
		Gopf: "𝔾",
		gopf: "𝕘",
		grave: "`",
		GreaterEqual: "≥",
		GreaterEqualLess: "⋛",
		GreaterFullEqual: "≧",
		GreaterGreater: "⪢",
		GreaterLess: "≷",
		GreaterSlantEqual: "⩾",
		GreaterTilde: "≳",
		Gscr: "𝒢",
		gscr: "ℊ",
		gsim: "≳",
		gsime: "⪎",
		gsiml: "⪐",
		Gt: "≫",
		GT: ">",
		gt: ">",
		gtcc: "⪧",
		gtcir: "⩺",
		gtdot: "⋗",
		gtlPar: "⦕",
		gtquest: "⩼",
		gtrapprox: "⪆",
		gtrarr: "⥸",
		gtrdot: "⋗",
		gtreqless: "⋛",
		gtreqqless: "⪌",
		gtrless: "≷",
		gtrsim: "≳",
		gvertneqq: "≩︀",
		gvnE: "≩︀",
		Hacek: "ˇ",
		hairsp: " ",
		half: "½",
		hamilt: "ℋ",
		HARDcy: "Ъ",
		hardcy: "ъ",
		hArr: "⇔",
		harr: "↔",
		harrcir: "⥈",
		harrw: "↭",
		Hat: "^",
		hbar: "ℏ",
		Hcirc: "Ĥ",
		hcirc: "ĥ",
		hearts: "♥",
		heartsuit: "♥",
		hellip: "…",
		hercon: "⊹",
		Hfr: "ℌ",
		hfr: "𝔥",
		HilbertSpace: "ℋ",
		hksearow: "⤥",
		hkswarow: "⤦",
		hoarr: "⇿",
		homtht: "∻",
		hookleftarrow: "↩",
		hookrightarrow: "↪",
		Hopf: "ℍ",
		hopf: "𝕙",
		horbar: "―",
		HorizontalLine: "─",
		Hscr: "ℋ",
		hscr: "𝒽",
		hslash: "ℏ",
		Hstrok: "Ħ",
		hstrok: "ħ",
		HumpDownHump: "≎",
		HumpEqual: "≏",
		hybull: "⁃",
		hyphen: "‐",
		Iacute: "Í",
		iacute: "í",
		ic: "⁣",
		Icirc: "Î",
		icirc: "î",
		Icy: "И",
		icy: "и",
		Idot: "İ",
		IEcy: "Е",
		iecy: "е",
		iexcl: "¡",
		iff: "⇔",
		Ifr: "ℑ",
		ifr: "𝔦",
		Igrave: "Ì",
		igrave: "ì",
		ii: "ⅈ",
		iiiint: "⨌",
		iiint: "∭",
		iinfin: "⧜",
		iiota: "℩",
		IJlig: "Ĳ",
		ijlig: "ĳ",
		Im: "ℑ",
		Imacr: "Ī",
		imacr: "ī",
		image: "ℑ",
		ImaginaryI: "ⅈ",
		imagline: "ℐ",
		imagpart: "ℑ",
		imath: "ı",
		imof: "⊷",
		imped: "Ƶ",
		Implies: "⇒",
		in: "∈",
		incare: "℅",
		infin: "∞",
		infintie: "⧝",
		inodot: "ı",
		Int: "∬",
		int: "∫",
		intcal: "⊺",
		integers: "ℤ",
		Integral: "∫",
		intercal: "⊺",
		Intersection: "⋂",
		intlarhk: "⨗",
		intprod: "⨼",
		InvisibleComma: "⁣",
		InvisibleTimes: "⁢",
		IOcy: "Ё",
		iocy: "ё",
		Iogon: "Į",
		iogon: "į",
		Iopf: "𝕀",
		iopf: "𝕚",
		Iota: "Ι",
		iota: "ι",
		iprod: "⨼",
		iquest: "¿",
		Iscr: "ℐ",
		iscr: "𝒾",
		isin: "∈",
		isindot: "⋵",
		isinE: "⋹",
		isins: "⋴",
		isinsv: "⋳",
		isinv: "∈",
		it: "⁢",
		Itilde: "Ĩ",
		itilde: "ĩ",
		Iukcy: "І",
		iukcy: "і",
		Iuml: "Ï",
		iuml: "ï",
		Jcirc: "Ĵ",
		jcirc: "ĵ",
		Jcy: "Й",
		jcy: "й",
		Jfr: "𝔍",
		jfr: "𝔧",
		jmath: "ȷ",
		Jopf: "𝕁",
		jopf: "𝕛",
		Jscr: "𝒥",
		jscr: "𝒿",
		Jsercy: "Ј",
		jsercy: "ј",
		Jukcy: "Є",
		jukcy: "є",
		Kappa: "Κ",
		kappa: "κ",
		kappav: "ϰ",
		Kcedil: "Ķ",
		kcedil: "ķ",
		Kcy: "К",
		kcy: "к",
		Kfr: "𝔎",
		kfr: "𝔨",
		kgreen: "ĸ",
		KHcy: "Х",
		khcy: "х",
		KJcy: "Ќ",
		kjcy: "ќ",
		Kopf: "𝕂",
		kopf: "𝕜",
		Kscr: "𝒦",
		kscr: "𝓀",
		lAarr: "⇚",
		Lacute: "Ĺ",
		lacute: "ĺ",
		laemptyv: "⦴",
		lagran: "ℒ",
		Lambda: "Λ",
		lambda: "λ",
		Lang: "⟪",
		lang: "⟨",
		langd: "⦑",
		langle: "⟨",
		lap: "⪅",
		Laplacetrf: "ℒ",
		laquo: "«",
		Larr: "↞",
		lArr: "⇐",
		larr: "←",
		larrb: "⇤",
		larrbfs: "⤟",
		larrfs: "⤝",
		larrhk: "↩",
		larrlp: "↫",
		larrpl: "⤹",
		larrsim: "⥳",
		larrtl: "↢",
		lat: "⪫",
		lAtail: "⤛",
		latail: "⤙",
		late: "⪭",
		lates: "⪭︀",
		lBarr: "⤎",
		lbarr: "⤌",
		lbbrk: "❲",
		lbrace: "{",
		lbrack: "[",
		lbrke: "⦋",
		lbrksld: "⦏",
		lbrkslu: "⦍",
		Lcaron: "Ľ",
		lcaron: "ľ",
		Lcedil: "Ļ",
		lcedil: "ļ",
		lceil: "⌈",
		lcub: "{",
		Lcy: "Л",
		lcy: "л",
		ldca: "⤶",
		ldquo: "“",
		ldquor: "„",
		ldrdhar: "⥧",
		ldrushar: "⥋",
		ldsh: "↲",
		lE: "≦",
		le: "≤",
		LeftAngleBracket: "⟨",
		LeftArrow: "←",
		Leftarrow: "⇐",
		leftarrow: "←",
		LeftArrowBar: "⇤",
		LeftArrowRightArrow: "⇆",
		leftarrowtail: "↢",
		LeftCeiling: "⌈",
		LeftDoubleBracket: "⟦",
		LeftDownTeeVector: "⥡",
		LeftDownVector: "⇃",
		LeftDownVectorBar: "⥙",
		LeftFloor: "⌊",
		leftharpoondown: "↽",
		leftharpoonup: "↼",
		leftleftarrows: "⇇",
		LeftRightArrow: "↔",
		Leftrightarrow: "⇔",
		leftrightarrow: "↔",
		leftrightarrows: "⇆",
		leftrightharpoons: "⇋",
		leftrightsquigarrow: "↭",
		LeftRightVector: "⥎",
		LeftTee: "⊣",
		LeftTeeArrow: "↤",
		LeftTeeVector: "⥚",
		leftthreetimes: "⋋",
		LeftTriangle: "⊲",
		LeftTriangleBar: "⧏",
		LeftTriangleEqual: "⊴",
		LeftUpDownVector: "⥑",
		LeftUpTeeVector: "⥠",
		LeftUpVector: "↿",
		LeftUpVectorBar: "⥘",
		LeftVector: "↼",
		LeftVectorBar: "⥒",
		lEg: "⪋",
		leg: "⋚",
		leq: "≤",
		leqq: "≦",
		leqslant: "⩽",
		les: "⩽",
		lescc: "⪨",
		lesdot: "⩿",
		lesdoto: "⪁",
		lesdotor: "⪃",
		lesg: "⋚︀",
		lesges: "⪓",
		lessapprox: "⪅",
		lessdot: "⋖",
		lesseqgtr: "⋚",
		lesseqqgtr: "⪋",
		LessEqualGreater: "⋚",
		LessFullEqual: "≦",
		LessGreater: "≶",
		lessgtr: "≶",
		LessLess: "⪡",
		lesssim: "≲",
		LessSlantEqual: "⩽",
		LessTilde: "≲",
		lfisht: "⥼",
		lfloor: "⌊",
		Lfr: "𝔏",
		lfr: "𝔩",
		lg: "≶",
		lgE: "⪑",
		lHar: "⥢",
		lhard: "↽",
		lharu: "↼",
		lharul: "⥪",
		lhblk: "▄",
		LJcy: "Љ",
		ljcy: "љ",
		Ll: "⋘",
		ll: "≪",
		llarr: "⇇",
		llcorner: "⌞",
		Lleftarrow: "⇚",
		llhard: "⥫",
		lltri: "◺",
		Lmidot: "Ŀ",
		lmidot: "ŀ",
		lmoust: "⎰",
		lmoustache: "⎰",
		lnap: "⪉",
		lnapprox: "⪉",
		lnE: "≨",
		lne: "⪇",
		lneq: "⪇",
		lneqq: "≨",
		lnsim: "⋦",
		loang: "⟬",
		loarr: "⇽",
		lobrk: "⟦",
		LongLeftArrow: "⟵",
		Longleftarrow: "⟸",
		longleftarrow: "⟵",
		LongLeftRightArrow: "⟷",
		Longleftrightarrow: "⟺",
		longleftrightarrow: "⟷",
		longmapsto: "⟼",
		LongRightArrow: "⟶",
		Longrightarrow: "⟹",
		longrightarrow: "⟶",
		looparrowleft: "↫",
		looparrowright: "↬",
		lopar: "⦅",
		Lopf: "𝕃",
		lopf: "𝕝",
		loplus: "⨭",
		lotimes: "⨴",
		lowast: "∗",
		lowbar: "_",
		LowerLeftArrow: "↙",
		LowerRightArrow: "↘",
		loz: "◊",
		lozenge: "◊",
		lozf: "⧫",
		lpar: "(",
		lparlt: "⦓",
		lrarr: "⇆",
		lrcorner: "⌟",
		lrhar: "⇋",
		lrhard: "⥭",
		lrm: "‎",
		lrtri: "⊿",
		lsaquo: "‹",
		Lscr: "ℒ",
		lscr: "𝓁",
		Lsh: "↰",
		lsh: "↰",
		lsim: "≲",
		lsime: "⪍",
		lsimg: "⪏",
		lsqb: "[",
		lsquo: "‘",
		lsquor: "‚",
		Lstrok: "Ł",
		lstrok: "ł",
		Lt: "≪",
		LT: "<",
		lt: "<",
		ltcc: "⪦",
		ltcir: "⩹",
		ltdot: "⋖",
		lthree: "⋋",
		ltimes: "⋉",
		ltlarr: "⥶",
		ltquest: "⩻",
		ltri: "◃",
		ltrie: "⊴",
		ltrif: "◂",
		ltrPar: "⦖",
		lurdshar: "⥊",
		luruhar: "⥦",
		lvertneqq: "≨︀",
		lvnE: "≨︀",
		macr: "¯",
		male: "♂",
		malt: "✠",
		maltese: "✠",
		Map: "⤅",
		map: "↦",
		mapsto: "↦",
		mapstodown: "↧",
		mapstoleft: "↤",
		mapstoup: "↥",
		marker: "▮",
		mcomma: "⨩",
		Mcy: "М",
		mcy: "м",
		mdash: "—",
		mDDot: "∺",
		measuredangle: "∡",
		MediumSpace: " ",
		Mellintrf: "ℳ",
		Mfr: "𝔐",
		mfr: "𝔪",
		mho: "℧",
		micro: "µ",
		mid: "∣",
		midast: "*",
		midcir: "⫰",
		middot: "·",
		minus: "−",
		minusb: "⊟",
		minusd: "∸",
		minusdu: "⨪",
		MinusPlus: "∓",
		mlcp: "⫛",
		mldr: "…",
		mnplus: "∓",
		models: "⊧",
		Mopf: "𝕄",
		mopf: "𝕞",
		mp: "∓",
		Mscr: "ℳ",
		mscr: "𝓂",
		mstpos: "∾",
		Mu: "Μ",
		mu: "μ",
		multimap: "⊸",
		mumap: "⊸",
		nabla: "∇",
		Nacute: "Ń",
		nacute: "ń",
		nang: "∠⃒",
		nap: "≉",
		napE: "⩰̸",
		napid: "≋̸",
		napos: "ŉ",
		napprox: "≉",
		natur: "♮",
		natural: "♮",
		naturals: "ℕ",
		nbsp: "\xA0",
		nbump: "≎̸",
		nbumpe: "≏̸",
		ncap: "⩃",
		Ncaron: "Ň",
		ncaron: "ň",
		Ncedil: "Ņ",
		ncedil: "ņ",
		ncong: "≇",
		ncongdot: "⩭̸",
		ncup: "⩂",
		Ncy: "Н",
		ncy: "н",
		ndash: "–",
		ne: "≠",
		nearhk: "⤤",
		neArr: "⇗",
		nearr: "↗",
		nearrow: "↗",
		nedot: "≐̸",
		NegativeMediumSpace: "​",
		NegativeThickSpace: "​",
		NegativeThinSpace: "​",
		NegativeVeryThinSpace: "​",
		nequiv: "≢",
		nesear: "⤨",
		nesim: "≂̸",
		NestedGreaterGreater: "≫",
		NestedLessLess: "≪",
		NewLine: "\n",
		nexist: "∄",
		nexists: "∄",
		Nfr: "𝔑",
		nfr: "𝔫",
		ngE: "≧̸",
		nge: "≱",
		ngeq: "≱",
		ngeqq: "≧̸",
		ngeqslant: "⩾̸",
		nges: "⩾̸",
		nGg: "⋙̸",
		ngsim: "≵",
		nGt: "≫⃒",
		ngt: "≯",
		ngtr: "≯",
		nGtv: "≫̸",
		nhArr: "⇎",
		nharr: "↮",
		nhpar: "⫲",
		ni: "∋",
		nis: "⋼",
		nisd: "⋺",
		niv: "∋",
		NJcy: "Њ",
		njcy: "њ",
		nlArr: "⇍",
		nlarr: "↚",
		nldr: "‥",
		nlE: "≦̸",
		nle: "≰",
		nLeftarrow: "⇍",
		nleftarrow: "↚",
		nLeftrightarrow: "⇎",
		nleftrightarrow: "↮",
		nleq: "≰",
		nleqq: "≦̸",
		nleqslant: "⩽̸",
		nles: "⩽̸",
		nless: "≮",
		nLl: "⋘̸",
		nlsim: "≴",
		nLt: "≪⃒",
		nlt: "≮",
		nltri: "⋪",
		nltrie: "⋬",
		nLtv: "≪̸",
		nmid: "∤",
		NoBreak: "⁠",
		NonBreakingSpace: "\xA0",
		Nopf: "ℕ",
		nopf: "𝕟",
		Not: "⫬",
		not: "¬",
		NotCongruent: "≢",
		NotCupCap: "≭",
		NotDoubleVerticalBar: "∦",
		NotElement: "∉",
		NotEqual: "≠",
		NotEqualTilde: "≂̸",
		NotExists: "∄",
		NotGreater: "≯",
		NotGreaterEqual: "≱",
		NotGreaterFullEqual: "≧̸",
		NotGreaterGreater: "≫̸",
		NotGreaterLess: "≹",
		NotGreaterSlantEqual: "⩾̸",
		NotGreaterTilde: "≵",
		NotHumpDownHump: "≎̸",
		NotHumpEqual: "≏̸",
		notin: "∉",
		notindot: "⋵̸",
		notinE: "⋹̸",
		notinva: "∉",
		notinvb: "⋷",
		notinvc: "⋶",
		NotLeftTriangle: "⋪",
		NotLeftTriangleBar: "⧏̸",
		NotLeftTriangleEqual: "⋬",
		NotLess: "≮",
		NotLessEqual: "≰",
		NotLessGreater: "≸",
		NotLessLess: "≪̸",
		NotLessSlantEqual: "⩽̸",
		NotLessTilde: "≴",
		NotNestedGreaterGreater: "⪢̸",
		NotNestedLessLess: "⪡̸",
		notni: "∌",
		notniva: "∌",
		notnivb: "⋾",
		notnivc: "⋽",
		NotPrecedes: "⊀",
		NotPrecedesEqual: "⪯̸",
		NotPrecedesSlantEqual: "⋠",
		NotReverseElement: "∌",
		NotRightTriangle: "⋫",
		NotRightTriangleBar: "⧐̸",
		NotRightTriangleEqual: "⋭",
		NotSquareSubset: "⊏̸",
		NotSquareSubsetEqual: "⋢",
		NotSquareSuperset: "⊐̸",
		NotSquareSupersetEqual: "⋣",
		NotSubset: "⊂⃒",
		NotSubsetEqual: "⊈",
		NotSucceeds: "⊁",
		NotSucceedsEqual: "⪰̸",
		NotSucceedsSlantEqual: "⋡",
		NotSucceedsTilde: "≿̸",
		NotSuperset: "⊃⃒",
		NotSupersetEqual: "⊉",
		NotTilde: "≁",
		NotTildeEqual: "≄",
		NotTildeFullEqual: "≇",
		NotTildeTilde: "≉",
		NotVerticalBar: "∤",
		npar: "∦",
		nparallel: "∦",
		nparsl: "⫽⃥",
		npart: "∂̸",
		npolint: "⨔",
		npr: "⊀",
		nprcue: "⋠",
		npre: "⪯̸",
		nprec: "⊀",
		npreceq: "⪯̸",
		nrArr: "⇏",
		nrarr: "↛",
		nrarrc: "⤳̸",
		nrarrw: "↝̸",
		nRightarrow: "⇏",
		nrightarrow: "↛",
		nrtri: "⋫",
		nrtrie: "⋭",
		nsc: "⊁",
		nsccue: "⋡",
		nsce: "⪰̸",
		Nscr: "𝒩",
		nscr: "𝓃",
		nshortmid: "∤",
		nshortparallel: "∦",
		nsim: "≁",
		nsime: "≄",
		nsimeq: "≄",
		nsmid: "∤",
		nspar: "∦",
		nsqsube: "⋢",
		nsqsupe: "⋣",
		nsub: "⊄",
		nsubE: "⫅̸",
		nsube: "⊈",
		nsubset: "⊂⃒",
		nsubseteq: "⊈",
		nsubseteqq: "⫅̸",
		nsucc: "⊁",
		nsucceq: "⪰̸",
		nsup: "⊅",
		nsupE: "⫆̸",
		nsupe: "⊉",
		nsupset: "⊃⃒",
		nsupseteq: "⊉",
		nsupseteqq: "⫆̸",
		ntgl: "≹",
		Ntilde: "Ñ",
		ntilde: "ñ",
		ntlg: "≸",
		ntriangleleft: "⋪",
		ntrianglelefteq: "⋬",
		ntriangleright: "⋫",
		ntrianglerighteq: "⋭",
		Nu: "Ν",
		nu: "ν",
		num: "#",
		numero: "№",
		numsp: " ",
		nvap: "≍⃒",
		nVDash: "⊯",
		nVdash: "⊮",
		nvDash: "⊭",
		nvdash: "⊬",
		nvge: "≥⃒",
		nvgt: ">⃒",
		nvHarr: "⤄",
		nvinfin: "⧞",
		nvlArr: "⤂",
		nvle: "≤⃒",
		nvlt: "<⃒",
		nvltrie: "⊴⃒",
		nvrArr: "⤃",
		nvrtrie: "⊵⃒",
		nvsim: "∼⃒",
		nwarhk: "⤣",
		nwArr: "⇖",
		nwarr: "↖",
		nwarrow: "↖",
		nwnear: "⤧",
		Oacute: "Ó",
		oacute: "ó",
		oast: "⊛",
		ocir: "⊚",
		Ocirc: "Ô",
		ocirc: "ô",
		Ocy: "О",
		ocy: "о",
		odash: "⊝",
		Odblac: "Ő",
		odblac: "ő",
		odiv: "⨸",
		odot: "⊙",
		odsold: "⦼",
		OElig: "Œ",
		oelig: "œ",
		ofcir: "⦿",
		Ofr: "𝔒",
		ofr: "𝔬",
		ogon: "˛",
		Ograve: "Ò",
		ograve: "ò",
		ogt: "⧁",
		ohbar: "⦵",
		ohm: "Ω",
		oint: "∮",
		olarr: "↺",
		olcir: "⦾",
		olcross: "⦻",
		oline: "‾",
		olt: "⧀",
		Omacr: "Ō",
		omacr: "ō",
		Omega: "Ω",
		omega: "ω",
		Omicron: "Ο",
		omicron: "ο",
		omid: "⦶",
		ominus: "⊖",
		Oopf: "𝕆",
		oopf: "𝕠",
		opar: "⦷",
		OpenCurlyDoubleQuote: "“",
		OpenCurlyQuote: "‘",
		operp: "⦹",
		oplus: "⊕",
		Or: "⩔",
		or: "∨",
		orarr: "↻",
		ord: "⩝",
		order: "ℴ",
		orderof: "ℴ",
		ordf: "ª",
		ordm: "º",
		origof: "⊶",
		oror: "⩖",
		orslope: "⩗",
		orv: "⩛",
		oS: "Ⓢ",
		Oscr: "𝒪",
		oscr: "ℴ",
		Oslash: "Ø",
		oslash: "ø",
		osol: "⊘",
		Otilde: "Õ",
		otilde: "õ",
		Otimes: "⨷",
		otimes: "⊗",
		otimesas: "⨶",
		Ouml: "Ö",
		ouml: "ö",
		ovbar: "⌽",
		OverBar: "‾",
		OverBrace: "⏞",
		OverBracket: "⎴",
		OverParenthesis: "⏜",
		par: "∥",
		para: "¶",
		parallel: "∥",
		parsim: "⫳",
		parsl: "⫽",
		part: "∂",
		PartialD: "∂",
		Pcy: "П",
		pcy: "п",
		percnt: "%",
		period: ".",
		permil: "‰",
		perp: "⊥",
		pertenk: "‱",
		Pfr: "𝔓",
		pfr: "𝔭",
		Phi: "Φ",
		phi: "φ",
		phiv: "ϕ",
		phmmat: "ℳ",
		phone: "☎",
		Pi: "Π",
		pi: "π",
		pitchfork: "⋔",
		piv: "ϖ",
		planck: "ℏ",
		planckh: "ℎ",
		plankv: "ℏ",
		plus: "+",
		plusacir: "⨣",
		plusb: "⊞",
		pluscir: "⨢",
		plusdo: "∔",
		plusdu: "⨥",
		pluse: "⩲",
		PlusMinus: "±",
		plusmn: "±",
		plussim: "⨦",
		plustwo: "⨧",
		pm: "±",
		Poincareplane: "ℌ",
		pointint: "⨕",
		Popf: "ℙ",
		popf: "𝕡",
		pound: "£",
		Pr: "⪻",
		pr: "≺",
		prap: "⪷",
		prcue: "≼",
		prE: "⪳",
		pre: "⪯",
		prec: "≺",
		precapprox: "⪷",
		preccurlyeq: "≼",
		Precedes: "≺",
		PrecedesEqual: "⪯",
		PrecedesSlantEqual: "≼",
		PrecedesTilde: "≾",
		preceq: "⪯",
		precnapprox: "⪹",
		precneqq: "⪵",
		precnsim: "⋨",
		precsim: "≾",
		Prime: "″",
		prime: "′",
		primes: "ℙ",
		prnap: "⪹",
		prnE: "⪵",
		prnsim: "⋨",
		prod: "∏",
		Product: "∏",
		profalar: "⌮",
		profline: "⌒",
		profsurf: "⌓",
		prop: "∝",
		Proportion: "∷",
		Proportional: "∝",
		propto: "∝",
		prsim: "≾",
		prurel: "⊰",
		Pscr: "𝒫",
		pscr: "𝓅",
		Psi: "Ψ",
		psi: "ψ",
		puncsp: " ",
		Qfr: "𝔔",
		qfr: "𝔮",
		qint: "⨌",
		Qopf: "ℚ",
		qopf: "𝕢",
		qprime: "⁗",
		Qscr: "𝒬",
		qscr: "𝓆",
		quaternions: "ℍ",
		quatint: "⨖",
		quest: "?",
		questeq: "≟",
		QUOT: "\"",
		quot: "\"",
		rAarr: "⇛",
		race: "∽̱",
		Racute: "Ŕ",
		racute: "ŕ",
		radic: "√",
		raemptyv: "⦳",
		Rang: "⟫",
		rang: "⟩",
		rangd: "⦒",
		range: "⦥",
		rangle: "⟩",
		raquo: "»",
		Rarr: "↠",
		rArr: "⇒",
		rarr: "→",
		rarrap: "⥵",
		rarrb: "⇥",
		rarrbfs: "⤠",
		rarrc: "⤳",
		rarrfs: "⤞",
		rarrhk: "↪",
		rarrlp: "↬",
		rarrpl: "⥅",
		rarrsim: "⥴",
		Rarrtl: "⤖",
		rarrtl: "↣",
		rarrw: "↝",
		rAtail: "⤜",
		ratail: "⤚",
		ratio: "∶",
		rationals: "ℚ",
		RBarr: "⤐",
		rBarr: "⤏",
		rbarr: "⤍",
		rbbrk: "❳",
		rbrace: "}",
		rbrack: "]",
		rbrke: "⦌",
		rbrksld: "⦎",
		rbrkslu: "⦐",
		Rcaron: "Ř",
		rcaron: "ř",
		Rcedil: "Ŗ",
		rcedil: "ŗ",
		rceil: "⌉",
		rcub: "}",
		Rcy: "Р",
		rcy: "р",
		rdca: "⤷",
		rdldhar: "⥩",
		rdquo: "”",
		rdquor: "”",
		rdsh: "↳",
		Re: "ℜ",
		real: "ℜ",
		realine: "ℛ",
		realpart: "ℜ",
		reals: "ℝ",
		rect: "▭",
		REG: "®",
		reg: "®",
		ReverseElement: "∋",
		ReverseEquilibrium: "⇋",
		ReverseUpEquilibrium: "⥯",
		rfisht: "⥽",
		rfloor: "⌋",
		Rfr: "ℜ",
		rfr: "𝔯",
		rHar: "⥤",
		rhard: "⇁",
		rharu: "⇀",
		rharul: "⥬",
		Rho: "Ρ",
		rho: "ρ",
		rhov: "ϱ",
		RightAngleBracket: "⟩",
		RightArrow: "→",
		Rightarrow: "⇒",
		rightarrow: "→",
		RightArrowBar: "⇥",
		RightArrowLeftArrow: "⇄",
		rightarrowtail: "↣",
		RightCeiling: "⌉",
		RightDoubleBracket: "⟧",
		RightDownTeeVector: "⥝",
		RightDownVector: "⇂",
		RightDownVectorBar: "⥕",
		RightFloor: "⌋",
		rightharpoondown: "⇁",
		rightharpoonup: "⇀",
		rightleftarrows: "⇄",
		rightleftharpoons: "⇌",
		rightrightarrows: "⇉",
		rightsquigarrow: "↝",
		RightTee: "⊢",
		RightTeeArrow: "↦",
		RightTeeVector: "⥛",
		rightthreetimes: "⋌",
		RightTriangle: "⊳",
		RightTriangleBar: "⧐",
		RightTriangleEqual: "⊵",
		RightUpDownVector: "⥏",
		RightUpTeeVector: "⥜",
		RightUpVector: "↾",
		RightUpVectorBar: "⥔",
		RightVector: "⇀",
		RightVectorBar: "⥓",
		ring: "˚",
		risingdotseq: "≓",
		rlarr: "⇄",
		rlhar: "⇌",
		rlm: "‏",
		rmoust: "⎱",
		rmoustache: "⎱",
		rnmid: "⫮",
		roang: "⟭",
		roarr: "⇾",
		robrk: "⟧",
		ropar: "⦆",
		Ropf: "ℝ",
		ropf: "𝕣",
		roplus: "⨮",
		rotimes: "⨵",
		RoundImplies: "⥰",
		rpar: ")",
		rpargt: "⦔",
		rppolint: "⨒",
		rrarr: "⇉",
		Rrightarrow: "⇛",
		rsaquo: "›",
		Rscr: "ℛ",
		rscr: "𝓇",
		Rsh: "↱",
		rsh: "↱",
		rsqb: "]",
		rsquo: "’",
		rsquor: "’",
		rthree: "⋌",
		rtimes: "⋊",
		rtri: "▹",
		rtrie: "⊵",
		rtrif: "▸",
		rtriltri: "⧎",
		RuleDelayed: "⧴",
		ruluhar: "⥨",
		rx: "℞",
		Sacute: "Ś",
		sacute: "ś",
		sbquo: "‚",
		Sc: "⪼",
		sc: "≻",
		scap: "⪸",
		Scaron: "Š",
		scaron: "š",
		sccue: "≽",
		scE: "⪴",
		sce: "⪰",
		Scedil: "Ş",
		scedil: "ş",
		Scirc: "Ŝ",
		scirc: "ŝ",
		scnap: "⪺",
		scnE: "⪶",
		scnsim: "⋩",
		scpolint: "⨓",
		scsim: "≿",
		Scy: "С",
		scy: "с",
		sdot: "⋅",
		sdotb: "⊡",
		sdote: "⩦",
		searhk: "⤥",
		seArr: "⇘",
		searr: "↘",
		searrow: "↘",
		sect: "§",
		semi: ";",
		seswar: "⤩",
		setminus: "∖",
		setmn: "∖",
		sext: "✶",
		Sfr: "𝔖",
		sfr: "𝔰",
		sfrown: "⌢",
		sharp: "♯",
		SHCHcy: "Щ",
		shchcy: "щ",
		SHcy: "Ш",
		shcy: "ш",
		ShortDownArrow: "↓",
		ShortLeftArrow: "←",
		shortmid: "∣",
		shortparallel: "∥",
		ShortRightArrow: "→",
		ShortUpArrow: "↑",
		shy: "­",
		Sigma: "Σ",
		sigma: "σ",
		sigmaf: "ς",
		sigmav: "ς",
		sim: "∼",
		simdot: "⩪",
		sime: "≃",
		simeq: "≃",
		simg: "⪞",
		simgE: "⪠",
		siml: "⪝",
		simlE: "⪟",
		simne: "≆",
		simplus: "⨤",
		simrarr: "⥲",
		slarr: "←",
		SmallCircle: "∘",
		smallsetminus: "∖",
		smashp: "⨳",
		smeparsl: "⧤",
		smid: "∣",
		smile: "⌣",
		smt: "⪪",
		smte: "⪬",
		smtes: "⪬︀",
		SOFTcy: "Ь",
		softcy: "ь",
		sol: "/",
		solb: "⧄",
		solbar: "⌿",
		Sopf: "𝕊",
		sopf: "𝕤",
		spades: "♠",
		spadesuit: "♠",
		spar: "∥",
		sqcap: "⊓",
		sqcaps: "⊓︀",
		sqcup: "⊔",
		sqcups: "⊔︀",
		Sqrt: "√",
		sqsub: "⊏",
		sqsube: "⊑",
		sqsubset: "⊏",
		sqsubseteq: "⊑",
		sqsup: "⊐",
		sqsupe: "⊒",
		sqsupset: "⊐",
		sqsupseteq: "⊒",
		squ: "□",
		Square: "□",
		square: "□",
		SquareIntersection: "⊓",
		SquareSubset: "⊏",
		SquareSubsetEqual: "⊑",
		SquareSuperset: "⊐",
		SquareSupersetEqual: "⊒",
		SquareUnion: "⊔",
		squarf: "▪",
		squf: "▪",
		srarr: "→",
		Sscr: "𝒮",
		sscr: "𝓈",
		ssetmn: "∖",
		ssmile: "⌣",
		sstarf: "⋆",
		Star: "⋆",
		star: "☆",
		starf: "★",
		straightepsilon: "ϵ",
		straightphi: "ϕ",
		strns: "¯",
		Sub: "⋐",
		sub: "⊂",
		subdot: "⪽",
		subE: "⫅",
		sube: "⊆",
		subedot: "⫃",
		submult: "⫁",
		subnE: "⫋",
		subne: "⊊",
		subplus: "⪿",
		subrarr: "⥹",
		Subset: "⋐",
		subset: "⊂",
		subseteq: "⊆",
		subseteqq: "⫅",
		SubsetEqual: "⊆",
		subsetneq: "⊊",
		subsetneqq: "⫋",
		subsim: "⫇",
		subsub: "⫕",
		subsup: "⫓",
		succ: "≻",
		succapprox: "⪸",
		succcurlyeq: "≽",
		Succeeds: "≻",
		SucceedsEqual: "⪰",
		SucceedsSlantEqual: "≽",
		SucceedsTilde: "≿",
		succeq: "⪰",
		succnapprox: "⪺",
		succneqq: "⪶",
		succnsim: "⋩",
		succsim: "≿",
		SuchThat: "∋",
		Sum: "∑",
		sum: "∑",
		sung: "♪",
		Sup: "⋑",
		sup: "⊃",
		sup1: "¹",
		sup2: "²",
		sup3: "³",
		supdot: "⪾",
		supdsub: "⫘",
		supE: "⫆",
		supe: "⊇",
		supedot: "⫄",
		Superset: "⊃",
		SupersetEqual: "⊇",
		suphsol: "⟉",
		suphsub: "⫗",
		suplarr: "⥻",
		supmult: "⫂",
		supnE: "⫌",
		supne: "⊋",
		supplus: "⫀",
		Supset: "⋑",
		supset: "⊃",
		supseteq: "⊇",
		supseteqq: "⫆",
		supsetneq: "⊋",
		supsetneqq: "⫌",
		supsim: "⫈",
		supsub: "⫔",
		supsup: "⫖",
		swarhk: "⤦",
		swArr: "⇙",
		swarr: "↙",
		swarrow: "↙",
		swnwar: "⤪",
		szlig: "ß",
		Tab: "	",
		target: "⌖",
		Tau: "Τ",
		tau: "τ",
		tbrk: "⎴",
		Tcaron: "Ť",
		tcaron: "ť",
		Tcedil: "Ţ",
		tcedil: "ţ",
		Tcy: "Т",
		tcy: "т",
		tdot: "⃛",
		telrec: "⌕",
		Tfr: "𝔗",
		tfr: "𝔱",
		there4: "∴",
		Therefore: "∴",
		therefore: "∴",
		Theta: "Θ",
		theta: "θ",
		thetasym: "ϑ",
		thetav: "ϑ",
		thickapprox: "≈",
		thicksim: "∼",
		ThickSpace: "  ",
		thinsp: " ",
		ThinSpace: " ",
		thkap: "≈",
		thksim: "∼",
		THORN: "Þ",
		thorn: "þ",
		Tilde: "∼",
		tilde: "˜",
		TildeEqual: "≃",
		TildeFullEqual: "≅",
		TildeTilde: "≈",
		times: "×",
		timesb: "⊠",
		timesbar: "⨱",
		timesd: "⨰",
		tint: "∭",
		toea: "⤨",
		top: "⊤",
		topbot: "⌶",
		topcir: "⫱",
		Topf: "𝕋",
		topf: "𝕥",
		topfork: "⫚",
		tosa: "⤩",
		tprime: "‴",
		TRADE: "™",
		trade: "™",
		triangle: "▵",
		triangledown: "▿",
		triangleleft: "◃",
		trianglelefteq: "⊴",
		triangleq: "≜",
		triangleright: "▹",
		trianglerighteq: "⊵",
		tridot: "◬",
		trie: "≜",
		triminus: "⨺",
		TripleDot: "⃛",
		triplus: "⨹",
		trisb: "⧍",
		tritime: "⨻",
		trpezium: "⏢",
		Tscr: "𝒯",
		tscr: "𝓉",
		TScy: "Ц",
		tscy: "ц",
		TSHcy: "Ћ",
		tshcy: "ћ",
		Tstrok: "Ŧ",
		tstrok: "ŧ",
		twixt: "≬",
		twoheadleftarrow: "↞",
		twoheadrightarrow: "↠",
		Uacute: "Ú",
		uacute: "ú",
		Uarr: "↟",
		uArr: "⇑",
		uarr: "↑",
		Uarrocir: "⥉",
		Ubrcy: "Ў",
		ubrcy: "ў",
		Ubreve: "Ŭ",
		ubreve: "ŭ",
		Ucirc: "Û",
		ucirc: "û",
		Ucy: "У",
		ucy: "у",
		udarr: "⇅",
		Udblac: "Ű",
		udblac: "ű",
		udhar: "⥮",
		ufisht: "⥾",
		Ufr: "𝔘",
		ufr: "𝔲",
		Ugrave: "Ù",
		ugrave: "ù",
		uHar: "⥣",
		uharl: "↿",
		uharr: "↾",
		uhblk: "▀",
		ulcorn: "⌜",
		ulcorner: "⌜",
		ulcrop: "⌏",
		ultri: "◸",
		Umacr: "Ū",
		umacr: "ū",
		uml: "¨",
		UnderBar: "_",
		UnderBrace: "⏟",
		UnderBracket: "⎵",
		UnderParenthesis: "⏝",
		Union: "⋃",
		UnionPlus: "⊎",
		Uogon: "Ų",
		uogon: "ų",
		Uopf: "𝕌",
		uopf: "𝕦",
		UpArrow: "↑",
		Uparrow: "⇑",
		uparrow: "↑",
		UpArrowBar: "⤒",
		UpArrowDownArrow: "⇅",
		UpDownArrow: "↕",
		Updownarrow: "⇕",
		updownarrow: "↕",
		UpEquilibrium: "⥮",
		upharpoonleft: "↿",
		upharpoonright: "↾",
		uplus: "⊎",
		UpperLeftArrow: "↖",
		UpperRightArrow: "↗",
		Upsi: "ϒ",
		upsi: "υ",
		upsih: "ϒ",
		Upsilon: "Υ",
		upsilon: "υ",
		UpTee: "⊥",
		UpTeeArrow: "↥",
		upuparrows: "⇈",
		urcorn: "⌝",
		urcorner: "⌝",
		urcrop: "⌎",
		Uring: "Ů",
		uring: "ů",
		urtri: "◹",
		Uscr: "𝒰",
		uscr: "𝓊",
		utdot: "⋰",
		Utilde: "Ũ",
		utilde: "ũ",
		utri: "▵",
		utrif: "▴",
		uuarr: "⇈",
		Uuml: "Ü",
		uuml: "ü",
		uwangle: "⦧",
		vangrt: "⦜",
		varepsilon: "ϵ",
		varkappa: "ϰ",
		varnothing: "∅",
		varphi: "ϕ",
		varpi: "ϖ",
		varpropto: "∝",
		vArr: "⇕",
		varr: "↕",
		varrho: "ϱ",
		varsigma: "ς",
		varsubsetneq: "⊊︀",
		varsubsetneqq: "⫋︀",
		varsupsetneq: "⊋︀",
		varsupsetneqq: "⫌︀",
		vartheta: "ϑ",
		vartriangleleft: "⊲",
		vartriangleright: "⊳",
		Vbar: "⫫",
		vBar: "⫨",
		vBarv: "⫩",
		Vcy: "В",
		vcy: "в",
		VDash: "⊫",
		Vdash: "⊩",
		vDash: "⊨",
		vdash: "⊢",
		Vdashl: "⫦",
		Vee: "⋁",
		vee: "∨",
		veebar: "⊻",
		veeeq: "≚",
		vellip: "⋮",
		Verbar: "‖",
		verbar: "|",
		Vert: "‖",
		vert: "|",
		VerticalBar: "∣",
		VerticalLine: "|",
		VerticalSeparator: "❘",
		VerticalTilde: "≀",
		VeryThinSpace: " ",
		Vfr: "𝔙",
		vfr: "𝔳",
		vltri: "⊲",
		vnsub: "⊂⃒",
		vnsup: "⊃⃒",
		Vopf: "𝕍",
		vopf: "𝕧",
		vprop: "∝",
		vrtri: "⊳",
		Vscr: "𝒱",
		vscr: "𝓋",
		vsubnE: "⫋︀",
		vsubne: "⊊︀",
		vsupnE: "⫌︀",
		vsupne: "⊋︀",
		Vvdash: "⊪",
		vzigzag: "⦚",
		Wcirc: "Ŵ",
		wcirc: "ŵ",
		wedbar: "⩟",
		Wedge: "⋀",
		wedge: "∧",
		wedgeq: "≙",
		weierp: "℘",
		Wfr: "𝔚",
		wfr: "𝔴",
		Wopf: "𝕎",
		wopf: "𝕨",
		wp: "℘",
		wr: "≀",
		wreath: "≀",
		Wscr: "𝒲",
		wscr: "𝓌",
		xcap: "⋂",
		xcirc: "◯",
		xcup: "⋃",
		xdtri: "▽",
		Xfr: "𝔛",
		xfr: "𝔵",
		xhArr: "⟺",
		xharr: "⟷",
		Xi: "Ξ",
		xi: "ξ",
		xlArr: "⟸",
		xlarr: "⟵",
		xmap: "⟼",
		xnis: "⋻",
		xodot: "⨀",
		Xopf: "𝕏",
		xopf: "𝕩",
		xoplus: "⨁",
		xotime: "⨂",
		xrArr: "⟹",
		xrarr: "⟶",
		Xscr: "𝒳",
		xscr: "𝓍",
		xsqcup: "⨆",
		xuplus: "⨄",
		xutri: "△",
		xvee: "⋁",
		xwedge: "⋀",
		Yacute: "Ý",
		yacute: "ý",
		YAcy: "Я",
		yacy: "я",
		Ycirc: "Ŷ",
		ycirc: "ŷ",
		Ycy: "Ы",
		ycy: "ы",
		yen: "¥",
		Yfr: "𝔜",
		yfr: "𝔶",
		YIcy: "Ї",
		yicy: "ї",
		Yopf: "𝕐",
		yopf: "𝕪",
		Yscr: "𝒴",
		yscr: "𝓎",
		YUcy: "Ю",
		yucy: "ю",
		Yuml: "Ÿ",
		yuml: "ÿ",
		Zacute: "Ź",
		zacute: "ź",
		Zcaron: "Ž",
		zcaron: "ž",
		Zcy: "З",
		zcy: "з",
		Zdot: "Ż",
		zdot: "ż",
		zeetrf: "ℨ",
		ZeroWidthSpace: "​",
		Zeta: "Ζ",
		zeta: "ζ",
		Zfr: "ℨ",
		zfr: "𝔷",
		ZHcy: "Ж",
		zhcy: "ж",
		zigrarr: "⇝",
		Zopf: "ℤ",
		zopf: "𝕫",
		Zscr: "𝒵",
		zscr: "𝓏",
		zwj: "‍",
		zwnj: "‌"
	}), e.entityMap = e.HTML_ENTITIES;
})), De = /* @__PURE__ */ o(((e) => {
	var t = we().NAMESPACE, n = /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, r = RegExp("[\\-\\.0-9" + n.source.slice(1, -1) + "\\u00B7\\u0300-\\u036F\\u203F-\\u2040]"), i = RegExp("^" + n.source + r.source + "*(?::" + n.source + r.source + "*)?$"), a = 0, o = 1, s = 2, c = 3, l = 4, u = 5, d = 6, f = 7;
	function p(e, t) {
		this.message = e, this.locator = t, Error.captureStackTrace && Error.captureStackTrace(this, p);
	}
	p.prototype = /* @__PURE__ */ Error(), p.prototype.name = p.name;
	function m() {}
	m.prototype = { parse: function(e, t, n) {
		var r = this.domBuilder;
		r.startDocument(), x(t, t = {}), h(e, t, n, r, this.errorHandler), r.endDocument();
	} };
	function h(e, n, r, i, a) {
		function o(e) {
			if (e > 65535) {
				e -= 65536;
				var t = 55296 + (e >> 10), n = 56320 + (e & 1023);
				return String.fromCharCode(t, n);
			} else return String.fromCharCode(e);
		}
		function s(e) {
			var t = e.slice(1, -1);
			return Object.hasOwnProperty.call(r, t) ? r[t] : t.charAt(0) === "#" ? o(parseInt(t.substr(1).replace("x", "0x"))) : (a.error("entity not found:" + e), e);
		}
		function c(t) {
			if (t > T) {
				var n = e.substring(T, t).replace(/&#?\w+;/g, s);
				m && l(T), i.characters(n, 0, t - T), T = t;
			}
		}
		function l(t, n) {
			for (; t >= d && (n = f.exec(e));) u = n.index, d = u + n[0].length, m.lineNumber++;
			m.columnNumber = t - u + 1;
		}
		for (var u = 0, d = 0, f = /.*(?:\r\n?|\n)|.*$/g, m = i.locator, h = [{ currentNSMap: n }], x = {}, T = 0;;) {
			try {
				var E = e.indexOf("<", T);
				if (E < 0) {
					if (!e.substr(T).match(/^\s*$/)) {
						var D = i.doc, O = D.createTextNode(e.substr(T));
						D.appendChild(O), i.currentElement = O;
					}
					return;
				}
				switch (E > T && c(E), e.charAt(E + 1)) {
					case "/":
						var k = e.indexOf(">", E + 3), A = e.substring(E + 2, k).replace(/[ \t\n\r]+$/g, ""), j = h.pop();
						k < 0 ? (A = e.substring(E + 2).replace(/[\s<].*/, ""), a.error("end tag name: " + A + " is not complete:" + j.tagName), k = E + 1 + A.length) : A.match(/\s</) && (A = A.replace(/[\s<].*/, ""), a.error("end tag name: " + A + " maybe not complete"), k = E + 1 + A.length);
						var M = j.localNSMap, N = j.tagName == A;
						if (N || j.tagName && j.tagName.toLowerCase() == A.toLowerCase()) {
							if (i.endElement(j.uri, j.localName, A), M) for (var P in M) Object.prototype.hasOwnProperty.call(M, P) && i.endPrefixMapping(P);
							N || a.fatalError("end tag name: " + A + " is not match the current start tagName:" + j.tagName);
						} else h.push(j);
						k++;
						break;
					case "?":
						m && l(E), k = C(e, E, i);
						break;
					case "!":
						m && l(E), k = S(e, E, i, a);
						break;
					default:
						m && l(E);
						var F = new w(), I = h[h.length - 1].currentNSMap, k = _(e, E, F, I, s, a), ee = F.length;
						if (!F.closed && b(e, k, F.tagName, x) && (F.closed = !0, r.nbsp || a.warning("unclosed xml attribute")), m && ee) {
							for (var te = g(m, {}), ne = 0; ne < ee; ne++) {
								var L = F[ne];
								l(L.offset), L.locator = g(m, {});
							}
							i.locator = te, v(F, i, I) && h.push(F), i.locator = m;
						} else v(F, i, I) && h.push(F);
						t.isHTML(F.uri) && !F.closed ? k = y(e, k, F.tagName, s, i) : k++;
				}
			} catch (e) {
				if (e instanceof p) throw e;
				a.error("element parse error: " + e), k = -1;
			}
			k > T ? T = k : c(Math.max(E, T) + 1);
		}
	}
	function g(e, t) {
		return t.lineNumber = e.lineNumber, t.columnNumber = e.columnNumber, t;
	}
	function _(e, n, r, i, p, m) {
		function h(e, t, n) {
			r.attributeNames.hasOwnProperty(e) && m.fatalError("Attribute " + e + " redefined"), r.addValue(e, t.replace(/[\t\n\r]/g, " ").replace(/&#?\w+;/g, p), n);
		}
		for (var g, _, v = ++n, y = a;;) {
			var b = e.charAt(v);
			switch (b) {
				case "=":
					if (y === o) g = e.slice(n, v), y = c;
					else if (y === s) y = c;
					else throw Error("attribute equal must after attrName");
					break;
				case "'":
				case "\"":
					if (y === c || y === o) if (y === o && (m.warning("attribute value must after \"=\""), g = e.slice(n, v)), n = v + 1, v = e.indexOf(b, n), v > 0) _ = e.slice(n, v), h(g, _, n - 1), y = u;
					else throw Error("attribute value no end '" + b + "' match");
					else if (y == l) _ = e.slice(n, v), h(g, _, n), m.warning("attribute \"" + g + "\" missed start quot(" + b + ")!!"), n = v + 1, y = u;
					else throw Error("attribute value must after \"=\"");
					break;
				case "/":
					switch (y) {
						case a: r.setTagName(e.slice(n, v));
						case u:
						case d:
						case f: y = f, r.closed = !0;
						case l:
						case o: break;
						case s:
							r.closed = !0;
							break;
						default: throw Error("attribute invalid close char('/')");
					}
					break;
				case "": return m.error("unexpected end of input"), y == a && r.setTagName(e.slice(n, v)), v;
				case ">":
					switch (y) {
						case a: r.setTagName(e.slice(n, v));
						case u:
						case d:
						case f: break;
						case l:
						case o: _ = e.slice(n, v), _.slice(-1) === "/" && (r.closed = !0, _ = _.slice(0, -1));
						case s:
							y === s && (_ = g), y == l ? (m.warning("attribute \"" + _ + "\" missed quot(\")!"), h(g, _, n)) : ((!t.isHTML(i[""]) || !_.match(/^(?:disabled|checked|selected)$/i)) && m.warning("attribute \"" + _ + "\" missed value!! \"" + _ + "\" instead!!"), h(_, _, n));
							break;
						case c: throw Error("attribute value missed!!");
					}
					return v;
				case "": b = " ";
				default: if (b <= " ") switch (y) {
					case a:
						r.setTagName(e.slice(n, v)), y = d;
						break;
					case o:
						g = e.slice(n, v), y = s;
						break;
					case l:
						var _ = e.slice(n, v);
						m.warning("attribute \"" + _ + "\" missed quot(\")!!"), h(g, _, n);
					case u:
						y = d;
						break;
				}
				else switch (y) {
					case s:
						r.tagName, (!t.isHTML(i[""]) || !g.match(/^(?:disabled|checked|selected)$/i)) && m.warning("attribute \"" + g + "\" missed value!! \"" + g + "\" instead2!!"), h(g, g, n), n = v, y = o;
						break;
					case u: m.warning("attribute space is required\"" + g + "\"!!");
					case d:
						y = o, n = v;
						break;
					case c:
						y = l, n = v;
						break;
					case f: throw Error("elements closed character '/' and '>' must be connected to");
				}
			}
			v++;
		}
	}
	function v(e, n, r) {
		for (var i = e.tagName, a = null, o = e.length; o--;) {
			var s = e[o], c = s.qName, l = s.value, u = c.indexOf(":");
			if (u > 0) var d = s.prefix = c.slice(0, u), f = c.slice(u + 1), p = d === "xmlns" && f;
			else f = c, d = null, p = c === "xmlns" && "";
			s.localName = f, p !== !1 && (a ?? (a = {}, x(r, r = {})), r[p] = a[p] = l, s.uri = t.XMLNS, n.startPrefixMapping(p, l));
		}
		for (var o = e.length; o--;) {
			s = e[o];
			var d = s.prefix;
			d && (d === "xml" && (s.uri = t.XML), d !== "xmlns" && (s.uri = r[d || ""]));
		}
		var u = i.indexOf(":");
		u > 0 ? (d = e.prefix = i.slice(0, u), f = e.localName = i.slice(u + 1)) : (d = null, f = e.localName = i);
		var m = e.uri = r[d || ""];
		if (n.startElement(m, f, i, e), e.closed) {
			if (n.endElement(m, f, i), a) for (d in a) Object.prototype.hasOwnProperty.call(a, d) && n.endPrefixMapping(d);
		} else return e.currentNSMap = r, e.localNSMap = a, !0;
	}
	function y(e, t, n, r, i) {
		if (/^(?:script|textarea)$/i.test(n)) {
			var a = e.indexOf("</" + n + ">", t), o = e.substring(t + 1, a);
			if (/[&<]/.test(o)) return /^script$/i.test(n) ? (i.characters(o, 0, o.length), a) : (o = o.replace(/&#?\w+;/g, r), i.characters(o, 0, o.length), a);
		}
		return t + 1;
	}
	function b(e, t, n, r) {
		var i = r[n];
		return i ?? (i = e.lastIndexOf("</" + n + ">"), i < t && (i = e.lastIndexOf("</" + n)), r[n] = i), i < t;
	}
	function x(e, t) {
		for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
	}
	function S(e, t, n, r) {
		switch (e.charAt(t + 2)) {
			case "-": if (e.charAt(t + 3) === "-") {
				var i = e.indexOf("-->", t + 4);
				return i > t ? (n.comment(e, t + 4, i - t - 4), i + 3) : (r.error("Unclosed comment"), -1);
			} else return -1;
			default:
				if (e.substr(t + 3, 6) == "CDATA[") {
					var i = e.indexOf("]]>", t + 9);
					return n.startCDATA(), n.characters(e, t + 9, i - t - 9), n.endCDATA(), i + 3;
				}
				var a = T(e, t), o = a.length;
				if (o > 1 && /!doctype/i.test(a[0][0])) {
					var s = a[1][0], c = !1, l = !1;
					o > 3 && (/^public$/i.test(a[2][0]) ? (c = a[3][0], l = o > 4 && a[4][0]) : /^system$/i.test(a[2][0]) && (l = a[3][0]));
					var u = a[o - 1];
					return n.startDTD(s, c, l), n.endDTD(), u.index + u[0].length;
				}
		}
		return -1;
	}
	function C(e, t, n) {
		var r = e.indexOf("?>", t);
		if (r) {
			var i = e.substring(t, r).match(/^<\?(\S*)\s*([\s\S]*?)$/);
			return i ? (i[0].length, n.processingInstruction(i[1], i[2]), r + 2) : -1;
		}
		return -1;
	}
	function w() {
		this.attributeNames = {};
	}
	w.prototype = {
		setTagName: function(e) {
			if (!i.test(e)) throw Error("invalid tagName:" + e);
			this.tagName = e;
		},
		addValue: function(e, t, n) {
			if (!i.test(e)) throw Error("invalid attribute:" + e);
			this.attributeNames[e] = this.length, this[this.length++] = {
				qName: e,
				value: t,
				offset: n
			};
		},
		length: 0,
		getLocalName: function(e) {
			return this[e].localName;
		},
		getLocator: function(e) {
			return this[e].locator;
		},
		getQName: function(e) {
			return this[e].qName;
		},
		getURI: function(e) {
			return this[e].uri;
		},
		getValue: function(e) {
			return this[e].value;
		}
	};
	function T(e, t) {
		var n, r = [], i = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;
		for (i.lastIndex = t, i.exec(e); n = i.exec(e);) if (r.push(n), n[1]) return r;
	}
	e.XMLReader = m, e.ParseError = p;
})), Oe = /* @__PURE__ */ o(((e) => {
	var t = we(), n = Te(), r = Ee(), i = De(), a = n.DOMImplementation, o = t.NAMESPACE, s = i.ParseError, c = i.XMLReader;
	function l(e) {
		return e.replace(/\r[\n\u0085]/g, "\n").replace(/[\r\u0085\u2028]/g, "\n");
	}
	function u(e) {
		this.options = e || { locator: {} };
	}
	u.prototype.parseFromString = function(e, t) {
		var n = this.options, i = new c(), a = n.domBuilder || new f(), s = n.errorHandler, u = n.locator, p = n.xmlns || {}, m = /\/x?html?$/.test(t), h = m ? r.HTML_ENTITIES : r.XML_ENTITIES;
		u && a.setDocumentLocator(u), i.errorHandler = d(s, a, u), i.domBuilder = n.domBuilder || a, m && (p[""] = o.HTML), p.xml = p.xml || o.XML;
		var g = n.normalizeLineEndings || l;
		return e && typeof e == "string" ? i.parse(g(e), p, h) : i.errorHandler.error("invalid doc source"), a.doc;
	};
	function d(e, t, n) {
		if (!e) {
			if (t instanceof f) return t;
			e = t;
		}
		var r = {}, i = e instanceof Function;
		n ||= {};
		function a(t) {
			var a = e[t];
			!a && i && (a = e.length == 2 ? function(n) {
				e(t, n);
			} : e), r[t] = a && function(e) {
				a("[xmldom " + t + "]	" + e + m(n));
			} || function() {};
		}
		return a("warning"), a("error"), a("fatalError"), r;
	}
	function f() {
		this.cdata = !1;
	}
	function p(e, t) {
		t.lineNumber = e.lineNumber, t.columnNumber = e.columnNumber;
	}
	f.prototype = {
		startDocument: function() {
			this.doc = new a().createDocument(null, null, null), this.locator && (this.doc.documentURI = this.locator.systemId);
		},
		startElement: function(e, t, n, r) {
			var i = this.doc, a = i.createElementNS(e, n || t), o = r.length;
			g(this, a), this.currentElement = a, this.locator && p(this.locator, a);
			for (var s = 0; s < o; s++) {
				var e = r.getURI(s), c = r.getValue(s), n = r.getQName(s), l = i.createAttributeNS(e, n);
				this.locator && p(r.getLocator(s), l), l.value = l.nodeValue = c, a.setAttributeNode(l);
			}
		},
		endElement: function(e, t, n) {
			var r = this.currentElement;
			r.tagName, this.currentElement = r.parentNode;
		},
		startPrefixMapping: function(e, t) {},
		endPrefixMapping: function(e) {},
		processingInstruction: function(e, t) {
			var n = this.doc.createProcessingInstruction(e, t);
			this.locator && p(this.locator, n), g(this, n);
		},
		ignorableWhitespace: function(e, t, n) {},
		characters: function(e, t, n) {
			if (e = h.apply(this, arguments), e) {
				if (this.cdata) var r = this.doc.createCDATASection(e);
				else var r = this.doc.createTextNode(e);
				this.currentElement ? this.currentElement.appendChild(r) : /^\s*$/.test(e) && this.doc.appendChild(r), this.locator && p(this.locator, r);
			}
		},
		skippedEntity: function(e) {},
		endDocument: function() {
			this.doc.normalize();
		},
		setDocumentLocator: function(e) {
			(this.locator = e) && (e.lineNumber = 0);
		},
		comment: function(e, t, n) {
			e = h.apply(this, arguments);
			var r = this.doc.createComment(e);
			this.locator && p(this.locator, r), g(this, r);
		},
		startCDATA: function() {
			this.cdata = !0;
		},
		endCDATA: function() {
			this.cdata = !1;
		},
		startDTD: function(e, t, n) {
			var r = this.doc.implementation;
			if (r && r.createDocumentType) {
				var i = r.createDocumentType(e, t, n);
				this.locator && p(this.locator, i), g(this, i), this.doc.doctype = i;
			}
		},
		warning: function(e) {
			console.warn("[xmldom warning]	" + e, m(this.locator));
		},
		error: function(e) {
			console.error("[xmldom error]	" + e, m(this.locator));
		},
		fatalError: function(e) {
			throw new s(e, this.locator);
		}
	};
	function m(e) {
		if (e) return "\n@" + (e.systemId || "") + "#[line:" + e.lineNumber + ",col:" + e.columnNumber + "]";
	}
	function h(e, t, n) {
		return typeof e == "string" ? e.substr(t, n) : e.length >= t + n || t ? new java.lang.String(e, t, n) + "" : e;
	}
	"endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g, function(e) {
		f.prototype[e] = function() {
			return null;
		};
	});
	function g(e, t) {
		e.currentElement ? e.currentElement.appendChild(t) : e.doc.appendChild(t);
	}
	e.__DOMHandler = f, e.normalizeLineEndings = l, e.DOMParser = u;
})), ke = (/* @__PURE__ */ o(((e) => {
	var t = Te();
	e.DOMImplementation = t.DOMImplementation, e.XMLSerializer = t.XMLSerializer, e.DOMParser = Oe().DOMParser;
})))();
function Ae() {
	return typeof window < "u" ? window : void 0;
}
function je() {
	return typeof document < "u" ? document : void 0;
}
function Me() {
	if (typeof URL < "u") return URL;
	var e = Ae();
	return e ? e.URL || e.webkitURL || e.mozURL : void 0;
}
var Ne = (function() {
	var e = Ae();
	return e ? e.requestAnimationFrame || e.mozRequestAnimationFrame || e.webkitRequestAnimationFrame || e.msRequestAnimationFrame : !1;
})();
//#endregion
//#region src/platform/parser.ts
function Pe(e) {
	var t;
	return e ? ke.DOMParser : typeof DOMParser < "u" ? DOMParser : (t = Ae(), t && t.DOMParser ? t.DOMParser : ke.DOMParser);
}
function Fe(e) {
	return e && e.charCodeAt(0) === 65279 ? e.slice(1) : e;
}
function Ie(e, t, n) {
	return new (Pe(n))().parseFromString(Fe(e), t);
}
//#endregion
//#region src/utils/mime.ts
var Le = {
	application: {
		ecmascript: ["es", "ecma"],
		javascript: "js",
		ogg: "ogx",
		pdf: "pdf",
		postscript: [
			"ps",
			"ai",
			"eps",
			"epsi",
			"epsf",
			"eps2",
			"eps3"
		],
		"rdf+xml": "rdf",
		smil: ["smi", "smil"],
		"xhtml+xml": ["xhtml", "xht"],
		xml: [
			"xml",
			"xsl",
			"xsd",
			"opf",
			"ncx"
		],
		zip: "zip",
		"x-httpd-eruby": "rhtml",
		"x-latex": "latex",
		"x-maker": [
			"frm",
			"maker",
			"frame",
			"fm",
			"fb",
			"book",
			"fbdoc"
		],
		"x-object": "o",
		"x-shockwave-flash": ["swf", "swfl"],
		"x-silverlight": "scr",
		"epub+zip": "epub",
		"font-tdpfr": "pfr",
		"inkml+xml": ["ink", "inkml"],
		json: "json",
		"jsonml+json": "jsonml",
		"mathml+xml": "mathml",
		"metalink+xml": "metalink",
		mp4: "mp4s",
		"omdoc+xml": "omdoc",
		oxps: "oxps",
		"vnd.amazon.ebook": "azw",
		widget: "wgt",
		"x-dtbook+xml": "dtb",
		"x-dtbresource+xml": "res",
		"x-font-bdf": "bdf",
		"x-font-ghostscript": "gsf",
		"x-font-linux-psf": "psf",
		"x-font-otf": "otf",
		"x-font-pcf": "pcf",
		"x-font-snf": "snf",
		"x-font-ttf": ["ttf", "ttc"],
		"x-font-type1": [
			"pfa",
			"pfb",
			"pfm",
			"afm"
		],
		"x-font-woff": "woff",
		"x-mobipocket-ebook": ["prc", "mobi"],
		"x-mspublisher": "pub",
		"x-nzb": "nzb",
		"x-tgif": "obj",
		"xaml+xml": "xaml",
		"xml-dtd": "dtd",
		"xproc+xml": "xpl",
		"xslt+xml": "xslt",
		"internet-property-stream": "acx",
		"x-compress": "z",
		"x-compressed": "tgz",
		"x-gzip": "gz"
	},
	audio: {
		flac: "flac",
		midi: [
			"mid",
			"midi",
			"kar",
			"rmi"
		],
		mpeg: [
			"mpga",
			"mpega",
			"mp2",
			"mp3",
			"m4a",
			"mp2a",
			"m2a",
			"m3a"
		],
		mpegurl: "m3u",
		ogg: [
			"oga",
			"ogg",
			"spx"
		],
		"x-aiff": [
			"aif",
			"aiff",
			"aifc"
		],
		"x-ms-wma": "wma",
		"x-wav": "wav",
		adpcm: "adp",
		mp4: "mp4a",
		webm: "weba",
		"x-aac": "aac",
		"x-caf": "caf",
		"x-matroska": "mka",
		"x-pn-realaudio-plugin": "rmp",
		xm: "xm",
		mid: ["mid", "rmi"]
	},
	image: {
		gif: "gif",
		ief: "ief",
		jpeg: [
			"jpeg",
			"jpg",
			"jpe"
		],
		pcx: "pcx",
		png: "png",
		"svg+xml": ["svg", "svgz"],
		tiff: ["tiff", "tif"],
		"x-icon": "ico",
		bmp: "bmp",
		webp: "webp",
		"x-pict": ["pic", "pct"],
		"x-tga": "tga",
		"cis-cod": "cod"
	},
	text: {
		"cache-manifest": ["manifest", "appcache"],
		css: "css",
		csv: "csv",
		html: [
			"html",
			"htm",
			"shtml",
			"stm"
		],
		mathml: "mml",
		plain: [
			"txt",
			"text",
			"brf",
			"conf",
			"def",
			"list",
			"log",
			"in",
			"bas"
		],
		richtext: "rtx",
		"tab-separated-values": "tsv",
		"x-bibtex": "bib"
	},
	video: {
		mpeg: [
			"mpeg",
			"mpg",
			"mpe",
			"m1v",
			"m2v",
			"mp2",
			"mpa",
			"mpv2"
		],
		mp4: [
			"mp4",
			"mp4v",
			"mpg4"
		],
		quicktime: ["qt", "mov"],
		ogg: "ogv",
		"vnd.mpegurl": ["mxu", "m4u"],
		"x-flv": "flv",
		"x-la-asf": ["lsf", "lsx"],
		"x-mng": "mng",
		"x-ms-asf": [
			"asf",
			"asx",
			"asr"
		],
		"x-ms-wm": "wm",
		"x-ms-wmv": "wmv",
		"x-ms-wmx": "wmx",
		"x-ms-wvx": "wvx",
		"x-msvideo": "avi",
		"x-sgi-movie": "movie",
		"x-matroska": [
			"mpv",
			"mkv",
			"mk3d",
			"mks"
		],
		"3gpp2": "3g2",
		h261: "h261",
		h263: "h263",
		h264: "h264",
		jpeg: "jpgv",
		jpm: ["jpm", "jpgm"],
		mj2: ["mj2", "mjp2"],
		"vnd.ms-playready.media.pyv": "pyv",
		"vnd.uvvu.mp4": ["uvu", "uvvu"],
		"vnd.vivo": "viv",
		webm: "webm",
		"x-f4v": "f4v",
		"x-m4v": "m4v",
		"x-ms-vob": "vob",
		"x-smv": "smv"
	}
}, Re = (function() {
	var e, t, n, r, i = {};
	for (e in Le) if (Object.prototype.hasOwnProperty.call(Le, e)) {
		for (t in Le[e]) if (Object.prototype.hasOwnProperty.call(Le[e], t)) if (n = Le[e][t], typeof n == "string") i[n] = e + "/" + t;
		else for (r = 0; r < n.length; r++) i[n[r]] = e + "/" + t;
	}
	return i;
})(), ze = "text/plain";
function Be(e) {
	return e && Re[e.split(".").pop().toLowerCase()] || ze;
}
function Ve(e) {
	return [
		"xml",
		"opf",
		"ncx"
	].indexOf(e) > -1;
}
var He = { lookup: Be };
//#endregion
//#region src/utils/request.ts
function Ue(e, t, n, r) {
	var i = typeof window < "u" ? window.URL : !1, a = i ? "blob" : "arraybuffer", o = new N(), s = new XMLHttpRequest(), c = XMLHttpRequest.prototype, l;
	for (l in "overrideMimeType" in c || Object.defineProperty(c, "overrideMimeType", { value: function() {} }), n && (s.withCredentials = !0), s.onreadystatechange = d, s.onerror = u, s.open("GET", e, !0), r || {}) s.setRequestHeader(l, r[l]);
	t == "json" && s.setRequestHeader("Accept", "application/json"), t ||= new re(e).extension, t == "blob" && (s.responseType = a), Ve(t) && s.overrideMimeType("text/xml"), t == "binary" && (s.responseType = "arraybuffer"), s.send();
	function u(e) {
		o.reject(e);
	}
	function d() {
		if (this.readyState === XMLHttpRequest.DONE) {
			var e = !1;
			if ((this.responseType === "" || this.responseType === "document") && (e = this.responseXML), this.status === 200 || this.status === 0 || e) {
				var n;
				if (!this.response && !e) return o.reject({
					status: this.status,
					message: "Empty Response",
					stack: (/* @__PURE__ */ Error()).stack
				}), o.promise;
				if (this.status === 403) return o.reject({
					status: this.status,
					response: this.response,
					message: "Forbidden",
					stack: (/* @__PURE__ */ Error()).stack
				}), o.promise;
				n = e || (Ve(t) ? Ie(this.response, "text/xml") : t == "xhtml" ? Ie(this.response, "application/xhtml+xml") : t == "html" || t == "htm" ? Ie(this.response, "text/html") : t == "json" ? JSON.parse(this.response) : t == "blob" ? i ? this.response : new Blob([this.response]) : this.response), o.resolve(n);
			} else o.reject({
				status: this.status,
				message: this.response,
				stack: (/* @__PURE__ */ Error()).stack
			});
		}
	}
	return o.promise;
}
//#endregion
//#region src/section.ts
var We = class {
	idref;
	linear;
	properties;
	index;
	href;
	url;
	canonical;
	mediaType;
	originalHref;
	originalMediaType;
	fallback;
	fallbackChain;
	next;
	prev;
	cfiBase;
	hooks;
	document;
	contents;
	output;
	request;
	constructor(e, t) {
		this.idref = e.idref, this.linear = e.linear === "yes", this.properties = e.properties || [], this.index = e.index, this.href = e.href, this.url = e.url, this.canonical = e.canonical, this.mediaType = e.mediaType, this.originalHref = e.originalHref, this.originalMediaType = e.originalMediaType, this.fallback = e.fallback, this.fallbackChain = e.fallbackChain, this.next = e.next, this.prev = e.prev, this.cfiBase = e.cfiBase, t ? this.hooks = t : this.hooks = {
			serialize: new ge(this),
			content: new ge(this)
		}, this.document = void 0, this.contents = void 0, this.output = void 0;
	}
	load(e) {
		var t = e || this.request || Ue, n = new N(), r = n.promise;
		return this.contents ? n.resolve(this.contents) : t(this.url).then((e) => (this.document = e, this.contents = e.documentElement, this.hooks.content.trigger(this.document, this))).then(() => {
			n.resolve(this.contents);
		}).catch((e) => {
			n.reject(e);
		}), r;
	}
	base() {
		return ye(this.document, this);
	}
	render(e) {
		var t = new N(), n = t.promise;
		return this.output, this.load(e).then((e) => {
			var t = (typeof navigator < "u" && navigator.userAgent || "").indexOf("Trident") >= 0, n = new (typeof XMLSerializer > "u" || t ? ke.DOMParser : XMLSerializer)();
			return this.output = n.serializeToString(e), this.output;
		}).then(() => this.hooks.serialize.trigger(this.output, this)).then(() => {
			t.resolve(this.output);
		}).catch((e) => {
			t.reject(e);
		}), n;
	}
	find(e) {
		var t = this, n = [], r = e.toLowerCase(), i = function(e) {
			for (var i = e.textContent.toLowerCase(), a = t.document.createRange(), o, s, c = -1, l, u = 150; s != -1;) s = i.indexOf(r, c + 1), s != -1 && (a = t.document.createRange(), a.setStart(e, s), a.setEnd(e, s + r.length), o = t.cfiFromRange(a), e.textContent.length < u ? l = e.textContent : (l = e.textContent.substring(s - u / 2, s + u / 2), l = "..." + l + "..."), n.push({
				cfi: o,
				excerpt: l
			})), c = s;
		};
		return z(t.document, function(e) {
			i(e);
		}), n;
	}
	search(e, t = 5) {
		if (document.createTreeWalker === void 0) return this.find(e);
		let n = [], r = this, i = e.toLowerCase(), a = function(e) {
			let t = e.reduce((e, t) => e + t.textContent, "").toLowerCase().indexOf(i);
			if (t != -1) {
				let a = t + i.length, o = 0, s = 0;
				if (t < e[0].length) {
					let i;
					for (; o < e.length - 1 && (s += e[o].length, !(a <= s));) o += 1;
					let c = e[0], l = e[o], u = r.document.createRange();
					u.setStart(c, t);
					let d = e.slice(0, o).reduce((e, t) => e + t.textContent.length, 0);
					u.setEnd(l, d > a ? a : a - d), i = r.cfiFromRange(u);
					let f = e.slice(0, o + 1).reduce((e, t) => e + t.textContent, "");
					f.length > 150 && (f = f.substring(t - 150 / 2, t + 150 / 2), f = "..." + f + "..."), n.push({
						cfi: i,
						excerpt: f
					});
				}
			}
		}, o = document.createTreeWalker(r.document, NodeFilter.SHOW_TEXT, null), s, c = [];
		for (; s = o.nextNode();) c.push(s), c.length == t && (a(c.slice(0, t)), c = c.slice(1, t));
		return c.length > 0 && a(c), n;
	}
	reconcileLayoutSettings(e) {
		var t = {
			layout: e.layout,
			spread: e.spread,
			orientation: e.orientation
		};
		return this.properties.forEach(function(e) {
			var n = e.replace("rendition:", ""), r = n.indexOf("-"), i, a;
			r != -1 && (i = n.slice(0, r), a = n.slice(r + 1), t[i] = a);
		}), t;
	}
	cfiFromRange(e) {
		return new X(e, this.cfiBase).toString();
	}
	cfiFromElement(e) {
		return new X(e, this.cfiBase).toString();
	}
	unload() {
		this.document = void 0, this.contents = void 0, this.output = void 0;
	}
	destroy() {
		this.unload(), this.hooks.serialize.clear(), this.hooks.content.clear(), this.hooks = void 0, this.idref = void 0, this.linear = void 0, this.properties = void 0, this.index = void 0, this.href = void 0, this.url = void 0, this.next = void 0, this.prev = void 0, this.cfiBase = void 0;
	}
}, Ge = class {
	spineItems;
	spineByHref;
	spineById;
	hooks;
	epubcfi;
	loaded;
	items;
	manifest;
	spineNodeIndex;
	baseUrl;
	length;
	constructor() {
		this.spineItems = [], this.spineByHref = {}, this.spineById = {}, this.hooks = {
			serialize: new ge(),
			content: new ge()
		}, this.hooks.content.register(ye), this.hooks.content.register(be), this.hooks.content.register(xe), this.epubcfi = new X(), this.loaded = !1, this.items = void 0, this.manifest = void 0, this.spineNodeIndex = void 0, this.baseUrl = void 0, this.length = void 0;
	}
	unpack(e, t, n) {
		this.items = e.spine, this.manifest = e.manifest, this.spineNodeIndex = e.spineNodeIndex, this.baseUrl = e.baseUrl || e.basePath || "", this.length = this.items.length, this.items.forEach((e, r) => {
			var i = this.manifest[e.idref], a, o;
			e.index = r, e.cfiBase = this.epubcfi.generateChapterComponent(this.spineNodeIndex, e.index, e.id), e.href && (e.url = t(e.href, !0), e.canonical = n(e.href)), i && (a = this.resolveFallbackItem(i), e.href = a.href, e.url = t(e.href, !0), e.canonical = n(e.href), e.mediaType = a.type, e.originalHref = i.href, e.originalMediaType = i.type, e.fallback = i.fallback, e.fallbackChain = i.fallbackChain || [], i.properties.length && e.properties.push.apply(e.properties, i.properties), a !== i && a.properties.length && e.properties.push.apply(e.properties, a.properties)), e.linear === "yes" ? (e.prev = () => {
				let t = e.index;
				for (; t > 0;) {
					let e = this.get(t - 1);
					if (e && e.linear) return e;
					--t;
				}
			}, e.next = () => {
				let t = e.index;
				for (; t < this.spineItems.length - 1;) {
					let e = this.get(t + 1);
					if (e && e.linear) return e;
					t += 1;
				}
			}) : (e.prev = function() {}, e.next = function() {}), o = new We(e, this.hooks), this.append(o);
		}), this.loaded = !0;
	}
	resolveFallbackItem(e) {
		if (this.isRenderableType(e.type)) return e;
		for (var t = e.fallbackChain || [], n = 0, r; n < t.length;) {
			if (r = this.manifest[t[n]], r && this.isRenderableType(r.type)) return r;
			n += 1;
		}
		return e;
	}
	isRenderableType(e) {
		return e ? [
			"application/xhtml+xml",
			"text/html",
			"image/svg+xml"
		].indexOf(e) > -1 : !0;
	}
	get(e) {
		var t = 0;
		if (e === void 0) for (; t < this.spineItems.length;) {
			let e = this.spineItems[t];
			if (e && e.linear) break;
			t += 1;
		}
		else typeof e == "string" && this.epubcfi.isCfiString(e) ? t = new X(e).spinePos : typeof e == "number" || isNaN(Number(e)) === !1 ? t = Number(e) : typeof e == "string" && e.indexOf("#") === 0 ? t = this.spineById[e.substring(1)] : typeof e == "string" && (e = e.split("#")[0], t = this.spineByHref[e] || this.spineByHref[encodeURI(e)]);
		return this.spineItems[t] || null;
	}
	indexHref(e, t) {
		e && (this.spineByHref[decodeURI(e)] = t, this.spineByHref[encodeURI(e)] = t, this.spineByHref[e] = t);
	}
	removeHref(e) {
		e && (delete this.spineByHref[decodeURI(e)], delete this.spineByHref[encodeURI(e)], delete this.spineByHref[e]);
	}
	append(e) {
		var t = this.spineItems.length;
		return e.index = t, this.spineItems.push(e), this.indexHref(e.href, t), e.originalHref !== e.href && this.indexHref(e.originalHref, t), this.spineById[e.idref] = t, t;
	}
	prepend(e) {
		return this.indexHref(e.href, 0), e.originalHref !== e.href && this.indexHref(e.originalHref, 0), this.spineById[e.idref] = 0, this.spineItems.forEach(function(e, t) {
			e.index = t;
		}), 0;
	}
	remove(e) {
		var t = this.spineItems.indexOf(e);
		if (t > -1) return this.removeHref(e.href), e.originalHref !== e.href && this.removeHref(e.originalHref), delete this.spineById[e.idref], this.spineItems.splice(t, 1);
	}
	each(e, t) {
		return this.spineItems.forEach(e, t);
	}
	first() {
		let e = 0;
		do {
			let t = this.get(e);
			if (t && t.linear) return t;
			e += 1;
		} while (e < this.spineItems.length);
	}
	last() {
		let e = this.spineItems.length - 1;
		do {
			let t = this.get(e);
			if (t && t.linear) return t;
			--e;
		} while (e >= 0);
	}
	destroy() {
		this.each((e) => e.destroy()), this.spineItems = void 0, this.spineByHref = void 0, this.spineById = void 0, this.hooks.serialize.clear(), this.hooks.content.clear(), this.hooks = void 0, this.epubcfi = void 0, this.loaded = !1, this.items = void 0, this.manifest = void 0, this.spineNodeIndex = void 0, this.baseUrl = void 0, this.length = void 0;
	}
}, Ke = N, qe = class {
	_q;
	context;
	defered;
	paused;
	running;
	tick;
	constructor(e) {
		this._q = [], this.context = e, this.tick = Ne, this.running = !1, this.paused = !1;
	}
	enqueue(...e) {
		var t, n, r, i = e.shift(), a = e;
		if (!i) throw Error("No Task Provided");
		return typeof i == "function" ? (t = new Ke(), n = t.promise, r = {
			task: i,
			args: a,
			deferred: t,
			promise: n
		}) : r = { promise: i }, this._q.push(r), this.paused == 0 && !this.running && this.run(), r.promise;
	}
	dequeue() {
		var e, t, n;
		if (this._q.length && !this.paused) {
			if (e = this._q.shift(), t = e?.task, t) return n = t.apply(this.context, e.args), n && typeof n.then == "function" ? n.then(function() {
				e.deferred?.resolve?.apply(this.context, arguments);
			}.bind(this), function() {
				e.deferred?.reject?.apply(this.context, arguments);
			}.bind(this)) : (e.deferred?.resolve?.call(this.context, n), e.promise);
			if (e.promise) return e.promise;
		} else {
			let e = new Ke();
			return e.resolve?.(void 0), e.promise;
		}
	}
	dump() {
		for (; this._q.length;) this.dequeue();
	}
	run() {
		return this.running || (this.running = !0, this.defered = new Ke()), this.tick.call(window, () => {
			this._q.length ? this.dequeue().then(function() {
				this.run();
			}.bind(this)) : (this.defered.resolve?.(void 0), this.running = void 0);
		}), this.paused == 1 && (this.paused = !1), this.defered.promise;
	}
	flush() {
		if (this.running) return this.running;
		if (this._q.length) return this.running = this.dequeue().then(function() {
			return this.running = void 0, this.flush();
		}.bind(this)), this.running;
	}
	clear() {
		this._q = [];
	}
	length() {
		return this._q.length;
	}
	pause() {
		this.paused = !0;
	}
	stop() {
		this._q = [], this.running = !1, this.paused = !0;
	}
}, Je = [
	"keydown",
	"keyup",
	"keypressed",
	"mouseup",
	"mousedown",
	"mousemove",
	"click",
	"touchend",
	"touchstart",
	"touchmove"
], $ = {
	BOOK: { OPEN_FAILED: "openFailed" },
	CONTENTS: {
		EXPAND: "expand",
		RESIZE: "resize",
		SELECTED: "selected",
		SELECTED_RANGE: "selectedRange",
		LINK_CLICKED: "linkClicked"
	},
	LOCATIONS: { CHANGED: "changed" },
	MANAGERS: {
		RESIZE: "resize",
		RESIZED: "resized",
		ORIENTATION_CHANGE: "orientationchange",
		ADDED: "added",
		SCROLL: "scroll",
		SCROLLED: "scrolled",
		REMOVED: "removed"
	},
	VIEWS: {
		AXIS: "axis",
		WRITING_MODE: "writingMode",
		LOAD_ERROR: "loaderror",
		RENDERED: "rendered",
		RESIZED: "resized",
		DISPLAYED: "displayed",
		SHOWN: "shown",
		HIDDEN: "hidden",
		MARK_CLICKED: "markClicked"
	},
	RENDITION: {
		STARTED: "started",
		ATTACHED: "attached",
		DISPLAYED: "displayed",
		DISPLAY_ERROR: "displayerror",
		RENDERED: "rendered",
		REMOVED: "removed",
		RESIZED: "resized",
		ORIENTATION_CHANGE: "orientationchange",
		LOCATION_CHANGED: "locationChanged",
		RELOCATED: "relocated",
		MARK_CLICKED: "markClicked",
		SELECTED: "selected",
		LAYOUT: "layout"
	},
	LAYOUT: { UPDATED: "updated" },
	ANNOTATION: {
		ATTACH: "attach",
		DETACH: "detach"
	}
}, Ye = class {
	spine;
	request;
	pause;
	q;
	epubcfi;
	_locations;
	_locationsWords;
	total;
	break;
	_current;
	_wordCounter;
	_currentCfi;
	processingTimeout;
	constructor(e, t, n) {
		this.spine = e, this.request = t, this.pause = n || 100, this.q = new qe(this), this.epubcfi = new X(), this._locations = [], this._locationsWords = [], this.total = 0, this.break = 150, this._current = 0, this._wordCounter = 0, this.currentLocation = "", this._currentCfi = "", this.processingTimeout = void 0;
	}
	generate(e) {
		return e && (this.break = e), this.q.pause(), this.spine.each(function(e) {
			e.linear && this.q.enqueue(this.process.bind(this), e);
		}.bind(this)), this.q.run().then(function() {
			return this.total = this._locations.length - 1, this._currentCfi && (this.currentLocation = this._currentCfi), this._locations;
		}.bind(this));
	}
	createRange() {
		return {
			startContainer: void 0,
			startOffset: void 0,
			endContainer: void 0,
			endOffset: void 0
		};
	}
	process(e) {
		return e.load(this.request).then(function(t) {
			var n = new N(), r = this.parse(t, e.cfiBase);
			return this._locations = this._locations.concat(r), e.unload(), this.processingTimeout = setTimeout(() => n.resolve(r), this.pause), n.promise;
		}.bind(this));
	}
	parse(e, t, n) {
		var r = [], i, a = e.ownerDocument, o = Z(a, "body"), s = 0, c, l = n || this.break;
		if (z(o, function(e) {
			var n = e.length, a, o = 0;
			if (s === 0 && i === void 0 && (i = this.createRange(), i.startContainer = e, i.startOffset = 0), e.textContent.trim().length === 0) return c = e, !1;
			for (a = l - s, a > n && (s += n, o = n); o < n;) if (a = l - s, s === 0 && (o += 1, i = this.createRange(), i.startContainer = e, i.startOffset = o), o + a >= n) s += n - o, o = n;
			else {
				o += a, i.endContainer = e, i.endOffset = o;
				let n = new X(i, t).toString();
				r.push(n), s = 0;
			}
			c = e;
		}.bind(this)), i && i.startContainer && c) {
			i.endContainer = c, i.endOffset = c.length;
			let e = new X(i, t).toString();
			r.push(e), s = 0;
		}
		if (r.length === 0 && o) {
			let e = this.fallbackCfi(o, t);
			e && r.push(e);
		}
		return r;
	}
	fallbackCfi(e, t) {
		var n = e, r = e.children;
		r.length && (n = r[0]);
		try {
			return new X(n, t).toString();
		} catch {
			return "";
		}
	}
	generateForSection(e, t) {
		if (!e || !e.linear || !e.cfiBase) return Promise.resolve(this._locations);
		var n = t || this.break, r = "epubcfi(" + e.cfiBase + "!";
		return e.load(this.request).then(function(t) {
			var i = this.parse(t, e.cfiBase, n);
			if (e.unload(), i.length === 0) return this._locations;
			for (var a = -1, o = 0, s = 0; s < this._locations.length; s++) if (this._locations[s].startsWith(r)) a === -1 && (a = s), o++;
			else if (a !== -1) break;
			if (a !== -1) this._locations.splice.apply(this._locations, [a, o].concat(i));
			else {
				var c = te(new X(i[0]), this._locations, this.epubcfi.compare);
				this._locations.splice.apply(this._locations, [c, 0].concat(i));
			}
			return this.total = this._locations.length - 1, this._locations;
		}.bind(this));
	}
	generateFromWords(e, t, n) {
		var r = e ? new X(e) : void 0;
		return this.q.pause(), this._locationsWords = [], this._wordCounter = 0, this.spine.each(function(e) {
			e.linear && (r ? e.index >= r.spinePos && this.q.enqueue(this.processWords.bind(this), e, t, r, n) : this.q.enqueue(this.processWords.bind(this), e, t, r, n));
		}.bind(this)), this.q.run().then(function() {
			return this._currentCfi && (this.currentLocation = this._currentCfi), this._locationsWords;
		}.bind(this));
	}
	processWords(e, t, n, r) {
		return r && this._locationsWords.length >= r ? Promise.resolve() : e.load(this.request).then(function(i) {
			var a = new N(), o = this.parseWords(i, e, t, n), s = r ? r - this._locationsWords.length : o.length;
			return this._locationsWords = this._locationsWords.concat(r && o.length >= r ? o.slice(0, s) : o), e.unload(), this.processingTimeout = setTimeout(() => a.resolve(o), this.pause), a.promise;
		}.bind(this));
	}
	countWords(e) {
		return e = e.replace(/(^\s*)|(\s*$)/gi, ""), e = e.replace(/[ ]{2,}/gi, " "), e = e.replace(/\n /, "\n"), e.split(" ").length;
	}
	parseWords(e, t, n, r) {
		var i = t.cfiBase, a = [], o = e.ownerDocument, s = Z(o, "body"), c = n, l = r ? r.spinePos !== t.index : !0, u;
		return r && t.index === r.spinePos && (u = r.findNode(r.range ? r.path.steps.concat(r.start.steps) : r.path.steps, e.ownerDocument)), z(s, function(e) {
			if (!l) if (e === u) l = !0;
			else return !1;
			if (e.textContent.length < 10 && e.textContent.trim().length === 0) return !1;
			var t = this.countWords(e.textContent), n, r = 0;
			if (t === 0) return !1;
			for (n = c - this._wordCounter, n > t && (this._wordCounter += t, r = t); r < t;) if (n = c - this._wordCounter, r + n >= t) this._wordCounter += t - r, r = t;
			else {
				r += n;
				let t = new X(e, i);
				a.push({
					cfi: t.toString(),
					wordCount: this._wordCounter
				}), this._wordCounter = 0;
			}
		}.bind(this)), a;
	}
	locationFromCfi(e) {
		let t;
		return X.prototype.isCfiString(e) && (e = new X(e)), this._locations.length === 0 ? -1 : (t = te(e, this._locations, this.epubcfi.compare), t > this.total ? this.total : t);
	}
	percentageFromCfi(e) {
		if (this._locations.length === 0) return null;
		var t = this.locationFromCfi(e);
		return this.percentageFromLocation(t);
	}
	percentageFromLocation(e) {
		return !e || !this.total ? 0 : e / this.total;
	}
	cfiFromLocation(e) {
		var t = -1;
		return typeof e != "number" && (e = parseInt(e)), e >= 0 && e < this._locations.length && (t = this._locations[e]), t;
	}
	cfiFromPercentage(e) {
		let t;
		if (e > 1 && console.warn("Normalize cfiFromPercentage value to between 0 - 1"), e >= 1) {
			let e = new X(this._locations[this.total]);
			return e.collapse(), e.toString();
		}
		return t = Math.ceil(this.total * e), this.cfiFromLocation(t);
	}
	load(e) {
		return typeof e == "string" ? this._locations = JSON.parse(e) : this._locations = e, this.total = this._locations.length - 1, this._locations;
	}
	save() {
		return JSON.stringify(this._locations);
	}
	getCurrent() {
		return this._current;
	}
	setCurrent(e) {
		var t;
		if (typeof e == "string") this._currentCfi = e;
		else if (typeof e == "number") this._current = e;
		else return;
		this._locations.length !== 0 && (typeof e == "string" ? (t = this.locationFromCfi(e), this._current = t) : t = e, this.emit($.LOCATIONS.CHANGED, { percentage: this.percentageFromLocation(t) }));
	}
	get currentLocation() {
		return this._current;
	}
	set currentLocation(e) {
		this.setCurrent(e);
	}
	length() {
		return this._locations.length;
	}
	destroy() {
		this.spine = void 0, this.request = void 0, this.pause = void 0, this.q.stop(), this.q = void 0, this.epubcfi = void 0, this._locations = void 0, this.total = void 0, this.break = void 0, this._current = void 0, this.currentLocation = void 0, this._currentCfi = void 0, clearTimeout(this.processingTimeout);
	}
};
(0, j.default)(Ye.prototype);
//#endregion
//#region src/container.ts
var Xe = class {
	packagePath;
	directory;
	encoding;
	constructor(e) {
		this.packagePath = "", this.directory = "", this.encoding = "", e && this.parse(e);
	}
	parse(e) {
		var t;
		if (!e) throw Error("Container File Not Found");
		if (t = Z(e, "rootfile"), !t) throw Error("No RootFile Found");
		this.packagePath = t.getAttribute("full-path"), this.directory = L.default.dirname(this.packagePath), this.encoding = e.xmlEncoding;
	}
	destroy() {
		this.packagePath = void 0, this.directory = void 0, this.encoding = void 0;
	}
}, Ze = class {
	manifest;
	navPath;
	ncxPath;
	coverPath;
	spineNodeIndex;
	spine;
	metadata;
	uniqueIdentifier;
	toc;
	constructor(e) {
		this.manifest = {}, this.navPath = "", this.ncxPath = "", this.coverPath = "", this.spineNodeIndex = 0, this.spine = [], this.metadata = {}, e && this.parse(e);
	}
	parse(e) {
		var t, n, r;
		if (!e) throw Error("Package File Not Found");
		if (t = Z(e, "metadata"), !t) throw Error("No Metadata Found");
		if (n = Z(e, "manifest"), !n) throw Error("No Manifest Found");
		if (r = Z(e, "spine"), !r) throw Error("No Spine Found");
		return this.manifest = this.parseManifest(n), this.navPath = this.findNavPath(n), this.ncxPath = this.findNcxPath(n, r), this.coverPath = this.findCoverPath(e), this.spineNodeIndex = W(r), this.spine = this.parseSpine(r, this.manifest), this.uniqueIdentifier = this.findUniqueIdentifier(e), this.metadata = this.parseMetadata(t), this.metadata.direction = r.getAttribute("page-progression-direction"), {
			metadata: this.metadata,
			spine: this.spine,
			manifest: this.manifest,
			navPath: this.navPath,
			ncxPath: this.ncxPath,
			coverPath: this.coverPath,
			spineNodeIndex: this.spineNodeIndex
		};
	}
	parseMetadata(e) {
		var t = {};
		return t.title = this.getElementText(e, "title"), t.creator = this.getElementText(e, "creator"), t.description = this.getElementText(e, "description"), t.pubdate = this.getElementText(e, "date"), t.publisher = this.getElementText(e, "publisher"), t.identifier = this.getElementText(e, "identifier"), t.language = this.getElementText(e, "language"), t.rights = this.getElementText(e, "rights"), t.modified_date = this.getPropertyText(e, "dcterms:modified"), t.layout = this.getPropertyText(e, "rendition:layout"), t.orientation = this.getPropertyText(e, "rendition:orientation"), t.flow = this.getPropertyText(e, "rendition:flow"), t.viewport = this.getPropertyText(e, "rendition:viewport"), t.media_active_class = this.getPropertyText(e, "media:active-class"), t.spread = this.getPropertyText(e, "rendition:spread"), t;
	}
	parseManifest(e) {
		var t = {}, n = _e(e, "item");
		return Array.prototype.slice.call(n).forEach(function(e) {
			var n = e.getAttribute("id"), r = e.getAttribute("href") || "", i = e.getAttribute("media-type") || "", a = e.getAttribute("media-overlay") || "", o = e.getAttribute("fallback") || "", s = e.getAttribute("properties") || "";
			n && (t[n] = {
				href: r,
				type: i,
				overlay: a,
				mediaOverlay: a,
				fallback: o,
				fallbackChain: [],
				properties: s.length ? s.split(" ") : []
			});
		}), Object.keys(t).forEach(function(e) {
			var n = t[e], r = n.fallback, i = {};
			for (i[e] = !0; r && t[r] && !i[r];) n.fallbackChain.push(r), i[r] = !0, r = t[r].fallback;
		}), t;
	}
	parseSpine(e, t) {
		var n = [], r = _e(e, "itemref");
		return Array.prototype.slice.call(r).forEach(function(e, t) {
			var r = e.getAttribute("idref"), i = e.getAttribute("properties") || "", a = i.length ? i.split(" ") : [], o = {
				id: e.getAttribute("id"),
				idref: r,
				linear: e.getAttribute("linear") || "yes",
				properties: a,
				index: t
			};
			n.push(o);
		}), n;
	}
	findUniqueIdentifier(e) {
		var t = e.documentElement.getAttribute("unique-identifier");
		if (!t) return "";
		var n = e.getElementById(t);
		return n && n.localName === "identifier" && n.namespaceURI === "http://purl.org/dc/elements/1.1/" && n.childNodes.length > 0 ? (n.childNodes[0].nodeValue || "").trim() : "";
	}
	findNavPath(e) {
		var t = ve(e, "item", { properties: "nav" });
		return t ? t.getAttribute("href") : !1;
	}
	findNcxPath(e, t) {
		var n = ve(e, "item", { "media-type": "application/x-dtbncx+xml" }), r;
		return n || (r = t.getAttribute("toc"), r && (n = e.querySelector(`#${r}`))), n ? n.getAttribute("href") : !1;
	}
	findCoverPath(e) {
		Z(e, "package").getAttribute("version");
		var t = ve(e, "item", { properties: "cover-image" });
		if (t) return t.getAttribute("href");
		var n = ve(e, "meta", { name: "cover" });
		if (n) {
			var r = n.getAttribute("content"), i = e.getElementById(r);
			return i ? i.getAttribute("href") : "";
		} else return !1;
	}
	getElementText(e, t) {
		var n = e.getElementsByTagNameNS("http://purl.org/dc/elements/1.1/", t), r;
		return !n || n.length === 0 ? "" : (r = n[0], r.childNodes.length && r.childNodes[0].nodeValue || "");
	}
	getPropertyText(e, t) {
		var n = ve(e, "meta", { property: t });
		return n && n.childNodes.length && n.childNodes[0].nodeValue || "";
	}
	load(e) {
		this.metadata = e.metadata;
		let t = e.readingOrder || e.spine;
		return this.spine = t.map((e, t) => (e.index = t, e.linear = e.linear || "yes", e)), e.resources.forEach((e, t) => {
			this.manifest[t] = e, e.rel && e.rel[0] === "cover" && (this.coverPath = e.href);
		}), this.spineNodeIndex = 0, this.toc = e.toc.map((e, t) => (e.label = e.title, e)), {
			metadata: this.metadata,
			spine: this.spine,
			manifest: this.manifest,
			navPath: this.navPath,
			ncxPath: this.ncxPath,
			coverPath: this.coverPath,
			spineNodeIndex: this.spineNodeIndex,
			toc: this.toc
		};
	}
	destroy() {
		this.manifest = void 0, this.navPath = void 0, this.ncxPath = void 0, this.coverPath = void 0, this.spineNodeIndex = void 0, this.spine = void 0, this.metadata = void 0;
	}
}, Qe = class {
	toc;
	tocByHref;
	tocById;
	landmarks;
	landmarksByType;
	length;
	constructor(e) {
		this.toc = [], this.tocByHref = {}, this.tocById = {}, this.landmarks = [], this.landmarksByType = {}, this.length = 0, e && this.parse(e);
	}
	parse(e) {
		let t = !Array.isArray(e) && e.nodeType, n, r;
		t && (n = Z(e, "html"), r = Z(e, "ncx")), t ? n ? (this.toc = this.parseNav(e), this.landmarks = this.parseLandmarks(e)) : r && (this.toc = this.parseNcx(e)) : this.toc = this.load(e), this.length = 0, this.unpack(this.toc);
	}
	unpack(e) {
		for (var t, n = 0; n < e.length; n++) t = e[n], t.href && (this.tocByHref[t.href] = n), t.id && (this.tocById[t.id] = n), this.length++, t.subitems.length && this.unpack(t.subitems);
	}
	get(e) {
		var t, n = e;
		return e ? (e.indexOf("#") === 0 ? (n = e.substring(1), t = this.tocById[n]) : e in this.tocByHref ? t = this.tocByHref[e] : e in this.tocById && (t = this.tocById[e]), this.getByIndex(n, t, this.toc)) : this.toc;
	}
	getByIndex(e, t, n) {
		if (n.length === 0) return;
		let r = n[t];
		if (r && (e === r.id || e === r.href)) return r;
		{
			let r;
			for (let i = 0; i < n.length && (r = this.getByIndex(e, t, n[i].subitems), !r); ++i);
			return r;
		}
	}
	landmark(e) {
		var t;
		return e ? (t = this.landmarksByType[e], this.landmarks[t]) : this.landmarks;
	}
	parseNav(e) {
		var t = Q(e, "nav", "toc"), n = [];
		if (!t) return n;
		let r = V(t, "ol", !0);
		return r && (n = this.parseNavList(r)), n;
	}
	parseNavList(e, t) {
		let n = [];
		if (!e || !e.children) return n;
		for (let r = 0; r < e.children.length; r++) {
			let i = this.navItem(e.children[r], t);
			i && n.push(i);
		}
		return n;
	}
	navItem(e, t) {
		let n = e.getAttribute("id") || void 0, r = V(e, "a", !0) || V(e, "span", !0);
		if (!r) return;
		let i = r.getAttribute("href") || "";
		n ||= i;
		let a = r.textContent || "", o = [], s = V(e, "ol", !0);
		return s && (o = this.parseNavList(s, n)), {
			id: n,
			href: i,
			label: a,
			subitems: o,
			parent: t
		};
	}
	parseLandmarks(e) {
		var t = Q(e, "nav", "landmarks"), n = t ? _e(t, "li") : [], r = n.length, i, a = [], o;
		if (!n || r === 0) return a;
		for (i = 0; i < r; ++i) o = this.landmarkItem(n[i]), o && (a.push(o), this.landmarksByType[o.type] = i);
		return a;
	}
	landmarkItem(e) {
		let t = V(e, "a", !0);
		if (!t) return;
		let n = t.getAttributeNS("http://www.idpf.org/2007/ops", "type") || void 0;
		return {
			href: t.getAttribute("href") || "",
			label: t.textContent || "",
			type: n
		};
	}
	parseNcx(e) {
		var t = _e(e, "navPoint"), n = t.length, r, i = {}, a = [], o, s;
		if (!t || n === 0) return a;
		for (r = 0; r < n; ++r) o = this.ncxItem(t[r]), i[o.id] = o, o.parent ? (s = i[o.parent], s.subitems.push(o)) : a.push(o);
		return a;
	}
	ncxItem(e) {
		var t = e.getAttribute("id") || "", n = Z(e, "content").getAttribute("src") || "", r = Z(e, "navLabel"), i = r.textContent ? r.textContent : "", a = [], o = e.parentNode, s;
		return o && (o.nodeName === "navPoint" || o.nodeName.split(":").slice(-1)[0] === "navPoint") && (s = o.getAttribute("id") || void 0), {
			id: t,
			href: n,
			label: i,
			subitems: a,
			parent: s
		};
	}
	load(e) {
		return e.map((e) => {
			let t = e;
			return t.label = e.title, t.subitems = e.children ? this.load(e.children) : [], t;
		});
	}
	forEach(e) {
		return this.toc.forEach(e);
	}
};
//#endregion
//#region src/platform/blob.ts
function $e(e, t) {
	return new Blob([e], { type: t });
}
function et(e, t) {
	var n = $e(e, t);
	return Me().createObjectURL(n);
}
function tt(e) {
	return Me().revokeObjectURL(e);
}
function nt(e, t) {
	var n;
	if (typeof e == "string") return n = btoa(e), "data:" + t + ";base64," + n;
}
function rt(e) {
	return new Promise(function(t, n) {
		var r = new FileReader();
		r.onloadend = function() {
			t(r.result);
		}, r.onerror = function() {
			n(r.error);
		}, r.readAsDataURL(e);
	});
}
//#endregion
//#region src/resources.ts
var it = class {
	settings;
	manifest;
	resources;
	replacementUrls;
	html;
	assets;
	css;
	urls;
	cssUrls;
	constructor(e, t) {
		this.settings = {
			replacements: t && t.replacements || "base64",
			archive: t && t.archive,
			resolver: t && t.resolver,
			request: t && t.request
		}, this.process(e);
	}
	process(e) {
		this.manifest = e, this.resources = Object.keys(e).map(function(t) {
			return e[t];
		}), this.replacementUrls = [], this.html = [], this.assets = [], this.css = [], this.urls = [], this.cssUrls = [], this.split(), this.splitUrls();
	}
	split() {
		this.html = this.resources.filter(function(e) {
			if (e.type === "application/xhtml+xml" || e.type === "text/html") return !0;
		}), this.assets = this.resources.filter(function(e) {
			if (e.type !== "application/xhtml+xml" && e.type !== "text/html") return !0;
		}), this.css = this.resources.filter(function(e) {
			if (e.type === "text/css") return !0;
		});
	}
	splitUrls() {
		this.urls = this.assets.map((e) => e.href), this.cssUrls = this.css.map((e) => e.href);
	}
	createUrl(e) {
		var t = new ie(e), n = He.lookup(t.filename);
		return this.settings.archive ? this.settings.archive.createUrl(e, { base64: this.settings.replacements === "base64" }) : this.settings.replacements === "base64" ? this.settings.request(e, "blob").then((e) => rt(e)).then((e) => nt(e, n)) : this.settings.request(e, "blob").then((e) => et(e, n));
	}
	replacements() {
		if (this.settings.replacements === "none") return Promise.resolve(this.urls);
		var e = this.urls.map((e) => {
			var t = this.settings.resolver(e);
			return this.createUrl(t).catch((e) => (console.error(e), null));
		});
		return Promise.all(e).then((e) => (this.replacementUrls = e.filter((e) => typeof e == "string"), e));
	}
	replaceCss(e, t) {
		var n = [];
		return e ||= this.settings.archive, t ||= this.settings.resolver, this.cssUrls.forEach((r) => {
			var i = this.createCssFile(r, e, t).then((e) => {
				var t = this.urls.indexOf(r);
				t > -1 && (this.replacementUrls[t] = e);
			});
			n.push(i);
		}), Promise.all(n);
	}
	createCssFile(e, t, n) {
		var r;
		if (L.default.isAbsolute(e)) return Promise.resolve(void 0);
		n ||= this.settings.resolver, t ||= this.settings.archive;
		var i = n(e), a = t ? t.getText(i) : this.settings.request(i, "text"), o = this.urls.map((e) => {
			var t = n(e);
			return new re(i).relative(t);
		});
		return a ? a.then((e) => (e = Ce(e, o, this.replacementUrls), r = this.settings.replacements === "base64" ? nt(e, "text/css") : et(e, "text/css"), r), (e) => Promise.resolve(void 0)) : Promise.resolve(void 0);
	}
	relativeTo(e, t) {
		return t ||= this.settings.resolver, this.urls.map((n) => {
			var r = t(n);
			return new re(e).relative(r);
		});
	}
	get(e) {
		var t = this.urls.indexOf(e);
		if (t !== -1) return this.replacementUrls.length ? Promise.resolve(this.replacementUrls[t]) : this.createUrl(e);
	}
	substitute(e, t) {
		return Ce(e, t ? this.relativeTo(t) : this.urls, this.replacementUrls);
	}
	destroy() {
		this.settings = void 0, this.manifest = void 0, this.resources = void 0, this.replacementUrls = void 0, this.html = void 0, this.assets = void 0, this.css = void 0, this.urls = void 0, this.cssUrls = void 0;
	}
}, at = class {
	pages;
	locations;
	hrefs;
	hrefByPage;
	pageByHref;
	epubcfi;
	firstPage;
	lastPage;
	totalPages;
	toc;
	ncx;
	pageList;
	constructor(e) {
		this.pages = [], this.locations = [], this.hrefs = [], this.hrefByPage = {}, this.pageByHref = {}, this.epubcfi = new X(), this.firstPage = 0, this.lastPage = 0, this.totalPages = 0, this.toc = void 0, this.ncx = void 0, e && (this.pageList = this.parse(e)), this.pageList && this.pageList.length && this.process(this.pageList);
	}
	parse(e) {
		var t = Z(e, "html"), n = Z(e, "ncx");
		if (t) return this.parseNav(e);
		if (n) return this.parseNcx(e);
	}
	parseNav(e) {
		var t = Q(e, "nav", "page-list"), n = t ? _e(t, "li") : [], r = n.length, i, a = [], o;
		if (!n || r === 0) return a;
		for (i = 0; i < r; ++i) o = this.item(n[i]), a.push(o);
		return a;
	}
	parseNcx(e) {
		var t = [], n = 0, r, i, a, o = 0;
		if (i = Z(e, "pageList"), !i || (a = _e(i, "pageTarget"), o = a.length, !a || a.length === 0)) return t;
		for (n = 0; n < o; ++n) r = this.ncxItem(a[n]), t.push(r);
		return t;
	}
	ncxItem(e) {
		var t = Z(Z(e, "navLabel"), "text").textContent || "";
		return {
			href: Z(e, "content").getAttribute("src") || "",
			page: t
		};
	}
	item(e) {
		var t = Z(e, "a"), n = t.getAttribute("href") || "", r = t.textContent || "", i = n.indexOf("epubcfi"), a, o, s;
		return i == -1 ? {
			href: n,
			page: r
		} : (a = n.split("#"), o = a[0], s = a.length > 1 ? a[1] : !1, {
			cfi: s,
			href: n,
			packageUrl: o,
			page: r
		});
	}
	process(e) {
		e.forEach(function(e) {
			this.pages.push(e.page), e.href && (this.hrefs.push(e.href), this.hrefByPage[e.page] = e.href, this.pageByHref[e.href] = e.page), e.cfi && this.locations.push(e.cfi);
		}, this), this.firstPage = parseInt(String(this.pages[0])), this.lastPage = parseInt(String(this.pages[this.pages.length - 1])), this.totalPages = isNaN(this.firstPage) || isNaN(this.lastPage) ? this.pages.length : this.lastPage - this.firstPage;
	}
	pageFromCfi(e) {
		var t = -1;
		if (this.locations.length === 0) return -1;
		var n = ne(e, this.locations, this.epubcfi.compare);
		return n == -1 ? (n = te(e, this.locations, this.epubcfi.compare), t = n - 1 >= 0 ? this.pages[n - 1] : this.pages[0], t !== void 0 || (t = -1)) : t = this.pages[n], t;
	}
	cfiFromPage(e) {
		var t = -1, n = this.pages.indexOf(e);
		return n != -1 && (t = this.locations[n]), t;
	}
	hrefFromPage(e) {
		return this.hrefByPage[e];
	}
	pageFromHref(e) {
		return this.pageByHref[e];
	}
	pageFromPercentage(e) {
		return Math.round(this.totalPages * e);
	}
	percentageFromPage(e) {
		var t = (e - this.firstPage) / this.totalPages;
		return Math.round(t * 1e3) / 1e3;
	}
	percentageFromCfi(e) {
		var t = this.pageFromCfi(e);
		return this.percentageFromPage(Number(t));
	}
	destroy() {
		this.pages = void 0, this.locations = void 0, this.hrefs = void 0, this.hrefByPage = void 0, this.pageByHref = void 0, this.epubcfi = void 0, this.pageList = void 0, this.toc = void 0, this.ncx = void 0;
	}
}, ot = class {
	settings;
	name;
	_spread;
	_minSpreadWidth;
	_evenSpreads;
	_flow;
	width;
	height;
	spreadWidth;
	pageWidth;
	delta;
	effectivePageAdvance;
	viewportPageWidth;
	pageBoundaryShift;
	edgeGuardPx;
	columnWidth;
	gap;
	divisor;
	props;
	constructor(e = {}) {
		this.settings = e, this.name = e.layout || "reflowable", this._spread = e.spread !== "none", this._minSpreadWidth = e.minSpreadWidth || 800, this._evenSpreads = e.evenSpreads || !1, e.flow === "scrolled" || e.flow === "scrolled-continuous" || e.flow === "scrolled-doc" ? this._flow = "scrolled" : this._flow = "paginated", this.width = 0, this.height = 0, this.spreadWidth = 0, this.pageWidth = 0, this.delta = 0, this.effectivePageAdvance = 0, this.viewportPageWidth = 0, this.pageBoundaryShift = 0, this.edgeGuardPx = 0, this.columnWidth = 0, this.gap = 0, this.divisor = 1, this.props = {
			name: this.name,
			spread: this._spread,
			flow: this._flow,
			width: 0,
			height: 0,
			spreadWidth: 0,
			pageWidth: 0,
			delta: 0,
			effectivePageAdvance: 0,
			viewportPageWidth: 0,
			pageBoundaryShift: 0,
			edgeGuardPx: 0,
			columnWidth: 0,
			gap: 0,
			divisor: 1
		};
	}
	flow(e) {
		return e !== void 0 && (e === "scrolled" || e === "scrolled-continuous" || e === "scrolled-doc" ? this._flow = "scrolled" : this._flow = "paginated", this.update({ flow: this._flow })), this._flow;
	}
	spread(e, t) {
		return e && (this._spread = e !== "none", this.update({ spread: this._spread })), typeof t == "number" && t >= 0 && (this._minSpreadWidth = t), this._spread;
	}
	calculate(e, t, n) {
		var r = 1, i = n || 0, a = e, o = t, s = Math.floor(a / 12), c, l, u, d;
		r = this._spread && a >= this._minSpreadWidth ? 2 : 1, this.name === "reflowable" && this._flow === "paginated" && !(n >= 0) && (i = s % 2 == 0 ? s : s - 1), this.name === "pre-paginated" && (i = 0), r > 1 ? (c = a / r - i, u = c + i) : (c = a, u = a), this.name === "pre-paginated" && r > 1 && (a = c), l = c * r + i, d = a, this.width = a, this.height = o, this.spreadWidth = l, this.pageWidth = u, this.delta = d, this.effectivePageAdvance = d, this.viewportPageWidth = a, this.pageBoundaryShift = 0, this.columnWidth = c, this.gap = i, this.divisor = r, this.update({
			width: a,
			height: o,
			spreadWidth: l,
			pageWidth: u,
			delta: d,
			effectivePageAdvance: this.effectivePageAdvance,
			viewportPageWidth: this.viewportPageWidth,
			pageBoundaryShift: this.pageBoundaryShift,
			columnWidth: c,
			gap: i,
			divisor: r
		});
	}
	format(e, t, n) {
		return this.name === "pre-paginated" ? e.fit(this.columnWidth, this.height, t) : this._flow === "paginated" ? e.columns(this.width, this.height, this.columnWidth, this.gap, this.settings.direction) : n && n === "horizontal" ? e.size(null, this.height) : e.size(this.width, null);
	}
	count(e, t) {
		let n, r, i = this.viewportPageWidth || this.pageWidth || this.width || t, a = this.effectivePageAdvance || this.delta || t;
		return this.name === "pre-paginated" ? (n = 1, r = 1) : this._flow === "paginated" ? (t ||= a, a && i && i > a ? (r = Math.ceil(Math.max(0, e - i) / a) + 1, n = Math.ceil(r / this.divisor)) : (n = Math.ceil(e / t), r = n * this.divisor)) : (t ||= this.height, n = Math.ceil(e / t), r = n), {
			spreads: n,
			pages: r
		};
	}
	update(e) {
		if (Object.keys(e).forEach((t) => {
			this.props[t] === e[t] && delete e[t];
		}), Object.keys(e).length > 0) {
			let t = I(this.props, e);
			this.emit($.LAYOUT.UPDATED, t, e);
		}
	}
};
(0, j.default)(ot.prototype);
//#endregion
//#region src/themes.ts
var st = class {
	rendition;
	_themes;
	_overrides;
	_current;
	_injected;
	constructor(e) {
		this.rendition = e, this._themes = { default: {
			rules: {},
			url: "",
			serialized: ""
		} }, this._overrides = {}, this._current = "default", this._injected = [], this.rendition.hooks.content.register(this.inject.bind(this)), this.rendition.hooks.content.register(this.overrides.bind(this));
	}
	register(...e) {
		if (e.length !== 0) {
			if (e.length === 1 && typeof e[0] == "object") return this.registerThemes(e[0]);
			if (e.length === 1 && typeof e[0] == "string") return this.default(e[0]);
			if (e.length === 2 && typeof e[1] == "string") return this.registerUrl(e[0], e[1]);
			if (e.length === 2 && typeof e[1] == "object") return this.registerRules(e[0], e[1]);
		}
	}
	default(e) {
		if (e) {
			if (typeof e == "string") return this.registerUrl("default", e);
			if (typeof e == "object") return this.registerRules("default", e);
		}
	}
	registerThemes(e) {
		for (var t in e) e.hasOwnProperty(t) && (typeof e[t] == "string" ? this.registerUrl(t, e[t]) : this.registerRules(t, e[t]));
	}
	registerCss(e, t) {
		this._themes[e] = { serialized: t }, (this._injected[e] || e == "default") && this.update(e);
	}
	registerUrl(e, t) {
		var n = new ie(t);
		this._themes[e] = { url: n.toString() }, (this._injected[e] || e == "default") && this.update(e);
	}
	registerRules(e, t) {
		this._themes[e] = { rules: t }, (this._injected[e] || e == "default") && this.update(e);
	}
	select(e) {
		var t = this._current, n;
		this._current = e, this.update(e), n = this.rendition.getContents(), n.forEach((n) => {
			n.removeClass(t), n.addClass(e);
		});
	}
	update(e) {
		this.rendition.getContents().forEach((t) => {
			this.add(e, t);
		});
	}
	inject(e) {
		var t = [], n = this._themes, r;
		for (var i in n) n.hasOwnProperty(i) && (i === this._current || i === "default") && (r = n[i], (r.rules && Object.keys(r.rules).length > 0 || r.url && t.indexOf(r.url) === -1) && this.add(i, e), this._injected.push(i));
		this._current != "default" && e.addClass(this._current);
	}
	add(e, t) {
		var n = this._themes[e];
		!n || !t || (n.url ? t.addStylesheet(n.url) : n.serialized ? (t.addStylesheetCss(n.serialized, e), n.injected = !0) : n.rules && (t.addStylesheetRules(n.rules, e), n.injected = !0));
	}
	override(e, t, n) {
		var r = this.rendition.getContents();
		this._overrides[e] = {
			value: t,
			priority: n === !0
		}, r.forEach((t) => {
			t.css(e, this._overrides[e].value, this._overrides[e].priority);
		});
	}
	removeOverride(e) {
		var t = this.rendition.getContents();
		delete this._overrides[e], t.forEach((t) => {
			t.css(e);
		});
	}
	overrides(e) {
		var t = this._overrides;
		for (var n in t) t.hasOwnProperty(n) && e.css(n, t[n].value, t[n].priority);
	}
	fontSize(e) {
		this.override("font-size", e);
	}
	font(e) {
		this.override("font-family", e, !0);
	}
	destroy() {
		this.rendition = void 0, this._themes = void 0, this._overrides = void 0, this._current = void 0, this._injected = void 0;
	}
}, ct = class {
	rendition;
	highlights;
	underlines;
	marks;
	_annotations;
	_annotationsBySectionIndex;
	constructor(e) {
		this.rendition = e, this.highlights = [], this.underlines = [], this.marks = [], this._annotations = {}, this._annotationsBySectionIndex = {}, this.rendition.hooks.render.register(this.inject.bind(this)), this.rendition.hooks.unloaded.register(this.clear.bind(this));
	}
	add(e, t, n, r, i, a) {
		let o = encodeURI(t + e), s = new X(t).spinePos, c = new lt({
			type: e,
			cfiRange: t,
			data: n,
			sectionIndex: s,
			cb: r,
			className: i,
			styles: a
		});
		return this._annotations[o] = c, s in this._annotationsBySectionIndex ? this._annotationsBySectionIndex[s].push(o) : this._annotationsBySectionIndex[s] = [o], this.rendition.views().forEach((e) => {
			c.sectionIndex === e.index && c.attach(e);
		}), c;
	}
	remove(e, t) {
		let n = encodeURI(e + t);
		if (n in this._annotations) {
			let e = this._annotations[n];
			if (t && e.type !== t) return;
			this.rendition.views().forEach((t) => {
				this._removeFromAnnotationBySectionIndex(e.sectionIndex, n), e.sectionIndex === t.index && e.detach(t);
			}), delete this._annotations[n];
		}
	}
	_removeFromAnnotationBySectionIndex(e, t) {
		this._annotationsBySectionIndex[e] = this._annotationsAt(e).filter((e) => e !== t);
	}
	_annotationsAt(e) {
		return this._annotationsBySectionIndex[e];
	}
	highlight(e, t, n, r, i) {
		return this.add("highlight", e, t, n, r, i);
	}
	underline(e, t, n, r, i) {
		return this.add("underline", e, t, n, r, i);
	}
	mark(e, t, n) {
		return this.add("mark", e, t, n);
	}
	each(...e) {
		return this._annotations.forEach.apply(this._annotations, e);
	}
	inject(e) {
		let t = e.index;
		t in this._annotationsBySectionIndex && this._annotationsBySectionIndex[t].forEach((t) => {
			this._annotations[t].attach(e);
		});
	}
	clear(e) {
		let t = e.index;
		t in this._annotationsBySectionIndex && this._annotationsBySectionIndex[t].forEach((t) => {
			this._annotations[t].detach(e);
		});
	}
	show() {}
	hide() {}
}, lt = class {
	type;
	cfiRange;
	data;
	sectionIndex;
	mark;
	cb;
	className;
	styles;
	constructor({ type: e, cfiRange: t, data: n, sectionIndex: r, cb: i, className: a, styles: o }) {
		this.type = e, this.cfiRange = t, this.data = n, this.sectionIndex = r, this.mark = void 0, this.cb = i, this.className = a, this.styles = o;
	}
	update(e) {
		this.data = e;
	}
	attach(e) {
		let { cfiRange: t, data: n, type: r, cb: i, className: a, styles: o } = this, s;
		return r === "highlight" ? s = e.highlight(t, n, i, a, o) : r === "underline" ? s = e.underline(t, n, i, a, o) : r === "mark" && (s = e.mark(t, n, i)), this.mark = s, this.emit($.ANNOTATION.ATTACH, s), s;
	}
	detach(e) {
		let { cfiRange: t, type: n } = this, r;
		return e && (n === "highlight" ? r = e.unhighlight(t) : n === "underline" ? r = e.ununderline(t) : n === "mark" && (r = e.unmark(t))), this.mark = void 0, this.emit($.ANNOTATION.DETACH, r), r;
	}
	text() {}
};
(0, j.default)(lt.prototype);
//#endregion
//#region src/compat/css.ts
function ut(e) {
	var t = je(), n = [
		"Webkit",
		"webkit",
		"Moz",
		"O",
		"ms"
	], r = [
		"-webkit-",
		"-webkit-",
		"-moz-",
		"-o-",
		"-ms-"
	], i = e.toLowerCase(), a = n.length, o = t && t.body ? t.body.style : void 0;
	if (!t || !t.body || o[i] !== void 0) return e;
	for (var s = 0; s < a; s++) if (o[r[s] + i] !== void 0) return r[s] + i;
	return e;
}
//#endregion
//#region src/platform/layout.ts
function dt(e, t) {
	var n = 0;
	return t.forEach(function(t) {
		n += parseFloat(e[t]) || 0;
	}), n;
}
function ft() {
	var e = je();
	return Math.max(e.documentElement.clientHeight, e.body.scrollHeight, e.documentElement.scrollHeight, e.body.offsetHeight, e.documentElement.offsetHeight);
}
function pt(e) {
	var t = Ae().getComputedStyle(e);
	return {
		height: dt(t, [
			"height",
			"paddingTop",
			"paddingBottom",
			"marginTop",
			"marginBottom",
			"borderTopWidth",
			"borderBottomWidth"
		]),
		width: dt(t, [
			"width",
			"paddingRight",
			"paddingLeft",
			"marginRight",
			"marginLeft",
			"borderRightWidth",
			"borderLeftWidth"
		])
	};
}
function mt(e) {
	var t = Ae().getComputedStyle(e);
	return {
		height: dt(t, [
			"paddingTop",
			"paddingBottom",
			"marginTop",
			"marginBottom",
			"borderTopWidth",
			"borderBottomWidth"
		]),
		width: dt(t, [
			"paddingRight",
			"paddingLeft",
			"marginRight",
			"marginLeft",
			"borderRightWidth",
			"borderLeftWidth"
		])
	};
}
function ht(e) {
	var t = e.ownerDocument, n;
	return e.nodeType == 3 ? (n = t.createRange(), n.selectNodeContents(e), n.getBoundingClientRect()) : e.getBoundingClientRect();
}
function gt() {
	var e = Ae(), t = e.innerWidth, n = e.innerHeight;
	return {
		top: 0,
		left: 0,
		right: t,
		bottom: n,
		width: t,
		height: n
	};
}
//#endregion
//#region src/mapping.ts
var _t = class {
	layout;
	horizontal;
	direction;
	_dev;
	constructor(e, t, n, r = !1) {
		this.layout = e, this.horizontal = n === "horizontal", this.direction = t || "ltr", this._dev = r;
	}
	section(e) {
		var t = this.findRanges(e);
		return this.rangeListToCfiList(e.section.cfiBase, t);
	}
	page(e, t, n, r) {
		var i = e && e.document ? e.document.body : !1, a;
		if (i) {
			if (a = this.rangePairToCfiPair(t, {
				start: this.findStart(i, n, r),
				end: this.findEnd(i, n, r)
			}), this._dev === !0) {
				let t = e.document, n = new X(a.start).toRange(t), r = new X(a.end).toRange(t), i = t.defaultView.getSelection(), o = t.createRange();
				i.removeAllRanges(), o.setStart(n.startContainer, n.startOffset), o.setEnd(r.endContainer, r.endOffset), i.addRange(o);
			}
			return a;
		}
	}
	walk(e, t) {
		if (!(e && e.nodeType === Node.TEXT_NODE)) {
			var n = { acceptNode: function(e) {
				return e.data.trim().length > 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
			} }, r = n.acceptNode;
			r.acceptNode = n.acceptNode;
			for (var i = document.createTreeWalker(e, NodeFilter.SHOW_TEXT, r, !1), a, o; (a = i.nextNode()) && (o = t(a), !o););
			return o;
		}
	}
	findRanges(e) {
		for (var t = [], n = e.contents.scrollWidth(), r = Math.ceil(n / this.layout.spreadWidth) * this.layout.divisor, i = this.layout.columnWidth, a = this.layout.gap, o, s, c = 0; c < r; c++) o = (i + a) * c, s = i * (c + 1) + a * c, t.push({
			start: this.findStart(e.document.body, o, s),
			end: this.findEnd(e.document.body, o, s)
		});
		return t;
	}
	findStart(e, t, n) {
		for (var r = [e], i, a, o = e; r.length;) if (i = r.shift(), a = this.walk(i, (e) => {
			var i, a, s, c, l = ht(e);
			if (this.horizontal && this.direction === "ltr") {
				if (i = this.horizontal ? l.left : l.top, a = this.horizontal ? l.right : l.bottom, i >= t && i <= n || a > t) return e;
				o = e, r.push(e);
			} else if (this.horizontal && this.direction === "rtl") {
				if (i = l.left, a = l.right, a <= n && a >= t || i < n) return e;
				o = e, r.push(e);
			} else {
				if (s = l.top, c = l.bottom, s >= t && s <= n || c > t) return e;
				o = e, r.push(e);
			}
		}), a) return this.findTextStartRange(a, t, n);
		return this.findTextStartRange(o, t, n);
	}
	findEnd(e, t, n) {
		for (var r = [e], i, a = e, o; r.length;) if (i = r.shift(), o = this.walk(i, (e) => {
			var i, o, s, c, l = ht(e);
			if (this.horizontal && this.direction === "ltr") {
				if (i = Math.round(l.left), o = Math.round(l.right), i > n && a) return a;
				if (o > n) return e;
				a = e, r.push(e);
			} else if (this.horizontal && this.direction === "rtl") {
				if (i = Math.round(this.horizontal ? l.left : l.top), o = Math.round(this.horizontal ? l.right : l.bottom), o < t && a) return a;
				if (i < t) return e;
				a = e, r.push(e);
			} else {
				if (s = Math.round(l.top), c = Math.round(l.bottom), s > n && a) return a;
				if (c > n) return e;
				a = e, r.push(e);
			}
		}), o) return this.findTextEndRange(o, t, n);
		return this.findTextEndRange(a, t, n);
	}
	findTextStartRange(e, t, n) {
		for (var r = this.splitTextNodeIntoRanges(e), i, a, o, s, c, l = 0; l < r.length; l++) if (i = r[l], a = i.getBoundingClientRect(), this.horizontal && this.direction === "ltr") {
			if (o = a.left, o >= t) return i;
		} else if (this.horizontal && this.direction === "rtl") {
			if (c = a.right, c <= n) return i;
		} else if (s = a.top, s >= t) return i;
		return r[0];
	}
	findTextEndRange(e, t, n) {
		for (var r = this.splitTextNodeIntoRanges(e), i, a, o, s, c, l, u, d = 0; d < r.length; d++) {
			if (a = r[d], o = a.getBoundingClientRect(), this.horizontal && this.direction === "ltr") {
				if (s = o.left, c = o.right, s > n && i) return i;
				if (c > n) return a;
			} else if (this.horizontal && this.direction === "rtl") {
				if (s = o.left, c = o.right, c < t && i) return i;
				if (s < t) return a;
			} else {
				if (l = o.top, u = o.bottom, l > n && i) return i;
				if (u > n) return a;
			}
			i = a;
		}
		return r[r.length - 1];
	}
	splitTextNodeIntoRanges(e, t) {
		var n = [], r = (e.textContent || "").trim(), i, a = e.ownerDocument, o = t || " ", s = r.indexOf(o);
		if (s === -1 || e.nodeType != Node.TEXT_NODE) return i = a.createRange(), i.selectNodeContents(e), [i];
		for (i = a.createRange(), i.setStart(e, 0), i.setEnd(e, s), n.push(i), i = !1; s != -1;) s = r.indexOf(o, s + 1), s > 0 && (i && (i.setEnd(e, s), n.push(i)), i = a.createRange(), i.setStart(e, s + 1));
		return i && (i.setEnd(e, r.length), n.push(i)), n;
	}
	rangePairToCfiPair(e, t) {
		var n = t.start, r = t.end;
		return n.collapse(!0), r.collapse(!1), {
			start: new X(n, e).toString(),
			end: new X(r, e).toString()
		};
	}
	rangeListToCfiList(e, t) {
		for (var n = [], r, i = 0; i < t.length; i++) r = this.rangePairToCfiPair(e, t[i]), n.push(r);
		return n;
	}
	axis(e) {
		return e && (this.horizontal = e === "horizontal"), this.horizontal;
	}
}, vt = typeof navigator < "u", yt = vt && /Chrome/.test(navigator.userAgent), bt = vt && !yt && /AppleWebKit/.test(navigator.userAgent), xt = 1, St = 3, Ct = 2, wt = 2, Tt = "img, svg, image, video, canvas", Et = "p, h1, h2, h3, h4, h5, h6, li, table, pre, code, blockquote", Dt = (e) => {
	if (!e.length) return null;
	let t = e.slice().sort((e, t) => e - t);
	return t[Math.floor(t.length / 2)];
}, Ot = (e) => !!(e && typeof e == "object" && Array.isArray(e.properties) && e.properties.includes("page-spread-left")), kt = (e) => {
	let t = parseFloat(e);
	return Number.isFinite(t) ? t : 0;
}, At = (e, t, n, r) => {
	let i = 0;
	for (let a = 1; a < n; a += 1) {
		let n = e - a * t;
		for (let e of r) e.left < n && e.right > n && (i += 1);
	}
	return i;
}, jt = ({ snappedContentWidth: e, pageLength: t, totalPages: n, rawWidth: r, lineBoxes: i }) => {
	if (!Number.isFinite(e) || !Number.isFinite(t) || !Number.isFinite(n) || n <= 1 || !Array.isArray(i) || !i.length) return e;
	let a = [0], o = At(e, t, n, i), s = Math.max(0, ...i.map((e) => Number(e && e.right)).filter((e) => Number.isFinite(e) && e > 0)), c = Number.isFinite(r) && r > 0 ? r : 0, l = o > 0 && c > 0 && s > 0 && c > s + Ct && c - s <= Math.max(32, t * .1), u = Math.max(l ? s + Ct : c, (n - 1) * t + 1);
	for (let r = 1; r < n; r += 1) {
		let n = e - r * t;
		for (let e of i) e.left < n && e.right > n && a.push(Math.floor(e.left - n - 1));
	}
	let d = {
		width: e,
		delta: 0,
		crossings: o
	};
	for (let r of Array.from(new Set(a))) {
		if (!Number.isFinite(r) || r >= 0) continue;
		let a = e + r;
		if (a < u) continue;
		let o = At(a, t, n, i);
		(o < d.crossings || o === d.crossings && Math.abs(r) < Math.abs(d.delta)) && (d = {
			width: a,
			delta: r,
			crossings: o
		});
	}
	return d.crossings < o ? Math.ceil(d.width) : e;
}, Mt = ({ previous: e, snappedContentWidth: t, pageLength: n, totalPages: r, lineWidth: i }) => {
	let a = Number(t), o = Number(e && e.width);
	if (!Number.isFinite(a) || a <= 0 || !e || !Number.isFinite(o) || o <= 0 || e.totalPages !== r || Math.abs(Number(e.pageLength || 0) - Number(n || 0)) > 1) return t;
	let s = Math.max(24, Math.min(48, Math.ceil(Number(i || 0) + Ct)));
	return Math.abs(a - o) > s ? t : Math.min(a, o);
}, Nt = ({ viewportPageWidth: e, linePitch: t, lineBoxes: n }) => {
	let r = Number(e), i = Number(t);
	if (!Number.isFinite(r) || r <= 0 || !Number.isFinite(i) || i <= 1 || !Array.isArray(n) || !n.length) return r;
	let a = Math.round(r / i) * i;
	if (Math.abs(a - r) <= Ct) return r;
	let o = Math.floor(r / i) * i;
	return Number.isFinite(o) && o > 0 && r - o > wt ? o : r;
}, Pt = (e, t, n) => {
	let r = Number(t && t.width), i = Number(n && n.scrollWidth), a = Number(n && n.clientWidth), o = n && n.ownerDocument, s = Number(o && o.documentElement && o.documentElement.clientWidth), c = Number(o && o.body && o.body.scrollWidth), l = Math.max(Number.isFinite(i) ? i : 0, Number.isFinite(c) ? c : 0), u = Math.max(Number.isFinite(a) ? a : 0, Number.isFinite(c) ? c : 0), d = Math.max(Number.isFinite(c) ? c : 0, Number.isFinite(i) ? i : 0), f = Number.isFinite(s) && s > 0 ? s : u, p = Number.isFinite(a) && a > 0 ? a : u || l, m = Number.isFinite(r) && r > 0 && t.left < -Math.max(1, p) && r > Math.max(1, u || p) * 2;
	if (Number.isFinite(r) && r > 0 && d > 0 && f > 0 && d <= f + 1 && r > d + 1) return d;
	if (Number.isFinite(r) && r > 0 && u > 0 && p > 0 && u <= p + 1 && r > p + 1) return u;
	if (!m || !e || typeof e.getClientRects != "function") return r;
	let h = Array.from(e.getClientRects()).filter((e) => Number.isFinite(e.left) && Number.isFinite(e.right) && Number.isFinite(e.bottom) && e.width > 0 && e.height > 0 && e.right > 0 && e.bottom > 0);
	if (!h.length) return u || i;
	let g = Math.min(...h.map((e) => e.left)), _ = Math.max(...h.map((e) => e.right)), v = Math.max(0, _ - g);
	return Math.max(v, u);
}, Ft = (e, t) => {
	let n = Number(e), r = Number(t && t.scrollWidth), i = t && t.ownerDocument, a = Number(i && i.documentElement && i.documentElement.clientWidth), o = Number(i && i.body && i.body.scrollWidth), s = Math.max(Number.isFinite(o) ? o : 0, Number.isFinite(r) ? r : 0), c = Number.isFinite(a) && a > 0 ? a : s;
	return Number.isFinite(n) && n > 0 && s > 0 && c > 0 && s <= c + 1 && n > s + 1 ? s : n;
}, It = class {
	constructor(e, t, n, r, i) {
		this.epubcfi = new X(), this.document = e, this.documentElement = this.document.documentElement, this.content = t || this.document.body, this.window = this.document.defaultView, this._size = {
			width: 0,
			height: 0
		}, this.sectionIndex = r || 0, this.cfiBase = n || "", this.sectionHref = i || "", this._verticalRlMetricsCache = null, this._verticalRlPageMetricsCache = null, this._forcedWritingMode = "", this.epubReadingSystem("epub.js", "0.3"), this.called = 0, this.active = !0, this.listeners();
	}
	static get listenedEvents() {
		return Je;
	}
	width(e) {
		var t = this.content;
		return e && G(e) && (e += "px"), e && (t.style.width = String(e)), parseInt(this.window.getComputedStyle(t).width);
	}
	height(e) {
		var t = this.content;
		return e && G(e) && (e += "px"), e && (t.style.height = String(e)), parseInt(this.window.getComputedStyle(t).height);
	}
	contentWidth(e) {
		var t = this.content || this.document.body;
		return e && G(e) && (e += "px"), e && (t.style.width = String(e)), parseInt(this.window.getComputedStyle(t).width);
	}
	contentHeight(e) {
		var t = this.content || this.document.body;
		return e && G(e) && (e += "px"), e && (t.style.height = String(e)), parseInt(this.window.getComputedStyle(t).height);
	}
	textWidth() {
		let e, t, n = this.document.createRange(), r = this.content || this.document.body, i = mt(r);
		if ((this.window && this.window.getComputedStyle(r).writingMode) === "vertical-rl") {
			let e = this.verticalRlMetricsCacheKey();
			return this._verticalRlMetricsCache && this._verticalRlMetricsCache.key === e ? this._verticalRlMetricsCache.width : (t = this.measureVerticalRlRect().rawWidth, (!Number.isFinite(t) || t <= 0) && (t = Math.max(r.scrollWidth || 0, this.documentElement && this.documentElement.scrollWidth || 0)), i && i.width && (t += i.width), t = Math.ceil(t + Ct), this._verticalRlMetricsCache = {
				key: e,
				width: t
			}, t);
		}
		return n.selectNodeContents(r), e = n.getBoundingClientRect(), t = Pt(n, e, r), i && i.width && (t += i.width), t = Ft(t, r), Math.round(t);
	}
	isViewportFillingSingleMediaPage(e) {
		let t = Number(e), n = this.content || this.document.body;
		if (!n || !this.document || !this.window || typeof n.querySelectorAll != "function" || !Number.isFinite(t) || t <= 0 || Array.from(n.querySelectorAll(Et)).filter((e) => {
			if (!(e.textContent || "").replace(/\s+/g, "").trim() || typeof e.getBoundingClientRect != "function") return !1;
			let t = this.window.getComputedStyle(e), n = e.getBoundingClientRect();
			return t.display !== "none" && t.visibility !== "hidden" && n.width > 0 && n.height > 0;
		}).length > 0) return !1;
		let r = [], i = (e) => {
			if (!e) return;
			if (e.nodeType === St) {
				r.push(e.nodeValue || "");
				return;
			}
			if (e.nodeType !== xt) return;
			let t = this.window.getComputedStyle(e);
			e.hidden || t.display === "none" || t.visibility === "hidden" || t.visibility === "collapse" || Array.from(e.childNodes || []).forEach(i);
		};
		if (i(n), r.join(" ").replace(/\s+/g, " ").trim().length > 40) return !1;
		let a = Array.from(n.querySelectorAll(Tt)).filter((e) => {
			if ((e.tagName ? e.tagName.toLowerCase() : "") !== "svg" && e.closest("svg") || typeof e.getBoundingClientRect != "function") return !1;
			let t = this.window.getComputedStyle(e), n = e.getBoundingClientRect();
			return t.display !== "none" && t.visibility !== "hidden" && n.width > 0 && n.height > 0;
		});
		if (a.length !== 1) return !1;
		let o = a[0], s = o.tagName ? o.tagName.toLowerCase() : "", c = this.window.getComputedStyle(o), l = o.getBoundingClientRect(), u = n.getAttribute && n.getAttribute("data-epub-single-image-centered") === "1", d = c.objectFit === "contain" || c.position === "absolute" || c.position === "fixed", f = l.width >= t * .75, p = s === "svg" && (o.getAttribute && o.getAttribute("viewBox") || o.querySelector && o.querySelector("image")), m = l.width > t * 1.5 || (n.scrollWidth || 0) > t * 1.5 || this.documentElement && (this.documentElement.scrollWidth || 0) > t * 1.5;
		return !!(u || d && (m || f || p));
	}
	textHeight() {
		let e, t, n = this.document.createRange(), r = this.content || this.document.body;
		if ((this.window && this.window.getComputedStyle(r).writingMode) === "vertical-rl") {
			let e = this.measureVerticalRlRect();
			if (Number.isFinite(e.rawHeight) && e.rawHeight > 0) return Math.ceil(e.rawHeight);
			let t = this.documentElement, n = Math.max(r.scrollHeight || 0, t ? t.scrollHeight : 0);
			if (n > 0) return n;
		}
		return n.selectNodeContents(r), e = n.getBoundingClientRect(), t = e.bottom, Math.round(t);
	}
	scrollWidth() {
		return this.documentElement.scrollWidth;
	}
	scrollHeight() {
		return this.documentElement.scrollHeight;
	}
	verticalRlMetricsCacheKey(e, t) {
		let n = this.content || this.document.body, r = this.documentElement, i = n && this.window ? this.window.getComputedStyle(n) : null, a = this.document && this.document.fonts ? this.document.fonts : null;
		return [
			Number.isFinite(Number(e)) ? Number(e) : "",
			Number.isFinite(Number(t)) ? Number(t) : "",
			r ? r.clientWidth : 0,
			r ? r.clientHeight : 0,
			n ? n.clientWidth : 0,
			n ? n.clientHeight : 0,
			n ? n.childElementCount : 0,
			i ? i.fontSize : "",
			i ? i.lineHeight : "",
			i ? i.letterSpacing : "",
			i ? i.fontFamily : "",
			a ? a.status : ""
		].join(":");
	}
	invalidateVerticalRlMetricsCache() {
		this._verticalRlMetricsCache = null, this._verticalRlPageMetricsCache = null, this._verticalRlStableSnappedContentWidth = null;
	}
	overflow(e) {
		return e && (this.documentElement.style.overflow = e), this.window.getComputedStyle(this.documentElement).overflow;
	}
	overflowX(e) {
		return e && (this.documentElement.style.overflowX = e), this.window.getComputedStyle(this.documentElement).overflowX;
	}
	overflowY(e) {
		return e && (this.documentElement.style.overflowY = e), this.window.getComputedStyle(this.documentElement).overflowY;
	}
	css(e, t, n) {
		var r = this.content || this.document.body;
		return this.invalidateVerticalRlMetricsCache(), t ? r.style.setProperty(e, t, n ? "important" : "") : r.style.removeProperty(e), this.window.getComputedStyle(r).getPropertyValue(e);
	}
	viewport(e) {
		var t = this.document.querySelector("meta[name='viewport']"), n = {
			width: void 0,
			height: void 0,
			scale: void 0,
			minimum: void 0,
			maximum: void 0,
			scalable: void 0
		}, r = [], i = {};
		if (t && t.hasAttribute("content")) {
			let e = t.getAttribute("content") || "", r = e.match(/width\s*=\s*([^,]*)/), i = e.match(/height\s*=\s*([^,]*)/), a = e.match(/initial-scale\s*=\s*([^,]*)/), o = e.match(/minimum-scale\s*=\s*([^,]*)/), s = e.match(/maximum-scale\s*=\s*([^,]*)/), c = e.match(/user-scalable\s*=\s*([^,]*)/);
			r && r.length && r[1] !== void 0 && (n.width = r[1]), i && i.length && i[1] !== void 0 && (n.height = i[1]), a && a.length && a[1] !== void 0 && (n.scale = a[1]), o && o.length && o[1] !== void 0 && (n.minimum = o[1]), s && s.length && s[1] !== void 0 && (n.maximum = s[1]), c && c.length && c[1] !== void 0 && (n.scalable = c[1]);
		}
		return i = F(e || {}, n), e && (i.width && r.push("width=" + i.width), i.height && r.push("height=" + i.height), i.scale && r.push("initial-scale=" + i.scale), i.scalable === "no" ? (r.push("minimum-scale=" + i.scale), r.push("maximum-scale=" + i.scale), r.push("user-scalable=" + i.scalable)) : (i.scalable && r.push("user-scalable=" + i.scalable), i.minimum && r.push("minimum-scale=" + i.minimum), i.maximum && r.push("minimum-scale=" + i.maximum)), t || (t = this.document.createElement("meta"), t.setAttribute("name", "viewport"), this.document.querySelector("head").appendChild(t)), t.setAttribute("content", r.join(", ")), this.window.scrollTo(0, 0)), i;
	}
	expand() {
		this.emit($.CONTENTS.EXPAND);
	}
	listeners() {
		this.imageLoadListeners(), this.mediaQueryListeners(), this.addEventListeners(), this.addSelectionListeners(), typeof ResizeObserver > "u" ? (this.resizeListeners(), this.visibilityListeners()) : this.resizeObservers(), this.linksHandler();
	}
	removeListeners() {
		this.removeEventListeners(), this.removeSelectionListeners(), this.observer && this.observer.disconnect(), clearTimeout(this.expanding);
	}
	resizeCheck() {
		if (!this.document) return;
		this.invalidateVerticalRlMetricsCache();
		let e = this.textWidth(), t = this.textHeight();
		(e != this._size.width || t != this._size.height) && (this._size = {
			width: e,
			height: t
		}, this.onResize && this.onResize(this._size), this.emit($.CONTENTS.RESIZE, this._size));
	}
	resizeListeners() {
		clearTimeout(this.expanding), requestAnimationFrame(this.resizeCheck.bind(this)), this.expanding = setTimeout(this.resizeListeners.bind(this), 350);
	}
	visibilityListeners() {
		document.addEventListener("visibilitychange", () => {
			document.visibilityState === "visible" && this.active === !1 ? (this.active = !0, this.resizeListeners()) : (this.active = !1, clearTimeout(this.expanding));
		});
	}
	transitionListeners() {
		let e = this.content;
		e.style.transitionProperty = "font, font-size, font-size-adjust, font-stretch, font-variation-settings, font-weight, width, height", e.style.transitionDuration = "0.001ms", e.style.transitionTimingFunction = "linear", e.style.transitionDelay = "0", this._resizeCheck = this.resizeCheck.bind(this), this.document.addEventListener("transitionend", this._resizeCheck);
	}
	mediaQueryListeners() {
		for (var e = this.document.styleSheets, t = function(e) {
			e.matches && !this._expanding && setTimeout(this.expand.bind(this), 1);
		}.bind(this), n = 0; n < e.length; n += 1) {
			var r;
			try {
				r = e[n].cssRules;
			} catch {
				return;
			}
			if (!r) return;
			for (var i = 0; i < r.length; i += 1) r[i].media && this.window.matchMedia(r[i].media.mediaText).addListener(t);
		}
	}
	resizeObservers() {
		this.observer = new ResizeObserver((e) => {
			requestAnimationFrame(this.resizeCheck.bind(this));
		}), this.observer.observe(this.document.documentElement);
	}
	mutationObservers() {
		this.observer = new MutationObserver((e) => {
			this.resizeCheck();
		}), this.observer.observe(this.document, {
			attributes: !0,
			childList: !0,
			characterData: !0,
			subtree: !0
		});
	}
	imageLoadListeners() {
		for (var e = this.document.querySelectorAll("img"), t, n = 0; n < e.length; n++) t = e[n], t.naturalWidth !== void 0 && t.naturalWidth === 0 && (t.onload = this.expand.bind(this));
	}
	fontLoadListeners() {
		!this.document || !this.document.fonts || this.document.fonts.ready.then(function() {
			this.resizeCheck();
		}.bind(this));
	}
	root() {
		return this.document ? this.document.documentElement : null;
	}
	locationOf(e, t) {
		var n, r = {
			left: 0,
			top: 0
		};
		if (!this.document) return r;
		if (this.epubcfi.isCfiString(e)) {
			let i = new X(e).toRange(this.document, t);
			if (i) {
				try {
					if (!i.endContainer || i.startContainer == i.endContainer && i.startOffset == i.endOffset) {
						let e = i.startContainer.textContent.indexOf(" ", i.startOffset);
						e == -1 && (e = i.startContainer.textContent.length), i.setEnd(i.startContainer, e);
					}
				} catch (e) {
					console.error("setting end offset to start container length failed", e);
				}
				if (i.startContainer.nodeType === Node.ELEMENT_NODE) n = i.startContainer.getBoundingClientRect(), r.left = n.left, r.top = n.top;
				else if (bt) {
					let e = i.startContainer, t = new Range();
					try {
						e.nodeType === xt ? n = e.getBoundingClientRect() : i.startOffset + 2 < (e.length || 0) ? (t.setStart(e, i.startOffset), t.setEnd(e, i.startOffset + 2), n = t.getBoundingClientRect()) : i.startOffset - 2 > 0 ? (t.setStart(e, i.startOffset - 2), t.setEnd(e, i.startOffset), n = t.getBoundingClientRect()) : n = e.parentNode.getBoundingClientRect();
					} catch (e) {
						console.error(e, e.stack);
					}
				} else n = i.getBoundingClientRect();
			}
		} else if (typeof e == "string" && e.indexOf("#") > -1) {
			let t = e.substring(e.indexOf("#") + 1), r = this.document.getElementById(t);
			if (r) {
				if (bt) {
					let e = new Range();
					e.selectNode(r), n = e.getBoundingClientRect();
				} else n = r.getBoundingClientRect();
				(!n || !n.width && !n.height) && (n = this.locationOfElement(r));
			}
		}
		return n && (r.left = n.left, r.top = n.top), r;
	}
	locationOfElement(e) {
		let t = e, n;
		for (; t && t !== this.document.body;) {
			if (t.getBoundingClientRect && (n = t.getBoundingClientRect(), n && (n.width || n.height))) return n;
			t = t.firstElementChild || t.nextElementSibling || t.parentElement;
		}
		return n;
	}
	addStylesheet(e) {
		return new Promise(function(t, n) {
			var r, i = !1;
			if (!this.document) {
				t(!1);
				return;
			}
			if (r = this.document.querySelector("link[href='" + e + "']"), r) {
				t(!0);
				return;
			}
			r = this.document.createElement("link"), r.type = "text/css", r.rel = "stylesheet", r.href = e, r.onload = r.onreadystatechange = function() {
				!i && (!this.readyState || this.readyState == "complete") && (i = !0, setTimeout(() => {
					t(!0);
				}, 1));
			}, this.document.head.appendChild(r);
		}.bind(this));
	}
	_getStylesheetNode(e) {
		var t;
		return e = "epubjs-inserted-css-" + (e || ""), this.document ? (t = this.document.getElementById(e), t || (t = this.document.createElement("style"), t.id = e, this.document.head.appendChild(t)), t) : !1;
	}
	addStylesheetCss(e, t) {
		if (!this.document || !e) return !1;
		this.invalidateVerticalRlMetricsCache();
		var n = this._getStylesheetNode(t);
		return n ? (n.innerHTML = e, !0) : !1;
	}
	addStylesheetRules(e, t) {
		var n;
		if (!this.document || !e || e.length === 0) return;
		this.invalidateVerticalRlMetricsCache();
		let r = this._getStylesheetNode(t);
		if (!(!r || !r.sheet)) if (n = r.sheet, Object.prototype.toString.call(e) === "[object Array]") {
			let t = e;
			for (var i = 0, a = t.length; i < a; i++) {
				var o = 1, s = t[i], c = t[i][0], l = "";
				Object.prototype.toString.call(s[1][0]) === "[object Array]" && (s = s[1], o = 0);
				for (var u = s.length; o < u; o++) {
					var d = s[o];
					l += d[0] + ":" + d[1] + (d[2] ? " !important" : "") + ";\n";
				}
				n.insertRule(c + "{" + l + "}", n.cssRules.length);
			}
		} else {
			let t = e;
			Object.keys(t).forEach((e) => {
				let r = t[e];
				if (Array.isArray(r)) r.forEach((t) => {
					let r = Object.keys(t).map((e) => `${e}:${t[e]}`).join(";");
					n.insertRule(`${e}{${r}}`, n.cssRules.length);
				});
				else {
					let t = r, i = Object.keys(t).map((e) => `${e}:${t[e]}`).join(";");
					n.insertRule(`${e}{${i}}`, n.cssRules.length);
				}
			});
		}
	}
	addScript(e) {
		return new Promise(function(t, n) {
			var r, i = !1;
			if (!this.document) {
				t(!1);
				return;
			}
			r = this.document.createElement("script"), r.type = "text/javascript", r.async = !0, r.src = e, r.onload = r.onreadystatechange = function() {
				!i && (!this.readyState || this.readyState == "complete") && (i = !0, setTimeout(function() {
					t(!0);
				}, 1));
			}, this.document.head.appendChild(r);
		}.bind(this));
	}
	addClass(e) {
		var t;
		this.document && (t = this.content || this.document.body, t && t.classList.add(e));
	}
	removeClass(e) {
		var t;
		this.document && (t = this.content || this.document.body, t && t.classList.remove(e));
	}
	addEventListeners() {
		this.document && (this._triggerEvent = this.triggerEvent.bind(this), Je.forEach(function(e) {
			this.document.addEventListener(e, this._triggerEvent, { passive: !0 });
		}, this));
	}
	removeEventListeners() {
		this.document && (Je.forEach(function(e) {
			this.document.removeEventListener(e, this._triggerEvent, { passive: !0 });
		}, this), this._triggerEvent = void 0);
	}
	triggerEvent(e) {
		this.emit(e.type, e);
	}
	addSelectionListeners() {
		this.document && (this._onSelectionChange = this.onSelectionChange.bind(this), this.document.addEventListener("selectionchange", this._onSelectionChange, { passive: !0 }));
	}
	removeSelectionListeners() {
		this.document && (this.document.removeEventListener("selectionchange", this._onSelectionChange, { passive: !0 }), this._onSelectionChange = void 0);
	}
	onSelectionChange(e) {
		this.selectionEndTimeout && clearTimeout(this.selectionEndTimeout), this.selectionEndTimeout = setTimeout(function() {
			var e = this.window.getSelection();
			this.triggerSelectedEvent(e);
		}.bind(this), 250);
	}
	triggerSelectedEvent(e) {
		var t, n;
		e && e.rangeCount > 0 && (t = e.getRangeAt(0), t.collapsed || (n = new X(t, this.cfiBase).toString(), this.emit($.CONTENTS.SELECTED, n), this.emit($.CONTENTS.SELECTED_RANGE, t)));
	}
	range(e, t) {
		return new X(e).toRange(this.document, t);
	}
	cfiFromRange(e, t) {
		return new X(e, this.cfiBase, t).toString();
	}
	cfiFromNode(e, t) {
		return new X(e, this.cfiBase, t).toString();
	}
	map(e) {
		return new _t(e).section(void 0);
	}
	size(e, t) {
		var n = {
			scale: 1,
			scalable: "no"
		};
		this.layoutStyle("scrolling"), e >= 0 && (this.width(e), n.width = e, this.css("padding", "0 " + e / 12 + "px")), t >= 0 && (this.height(t), n.height = t), this.css("margin", "0"), this.css("box-sizing", "border-box"), this.viewport(n);
	}
	columns(e, t, n, r, i) {
		this.invalidateVerticalRlMetricsCache();
		let a = ut("column-axis"), o = ut("column-gap"), s = ut("column-width"), c = ut("column-fill"), l = this.writingMode(), u = l.indexOf("vertical") === 0 ? "vertical" : "horizontal";
		if (this.layoutStyle("paginated"), i === "rtl" && u === "horizontal" && this.direction(i), l !== "vertical-rl" && this.width(e), this.height(t), this.viewport({
			width: e,
			height: t,
			scale: 1,
			scalable: "no"
		}), l === "vertical-rl") {
			this.documentElement && (this.documentElement.style.setProperty("overflow", "hidden", "important"), this.documentElement.style.setProperty("margin", "0", ""), this.documentElement.style.setProperty("padding", "0", ""));
			let e = this.content || this.document.body;
			e.style.margin = "0", e.style.padding = "0", e.style.width = "", e.style.height = t + "px", e.style.overflow = "visible", e.style.maxWidth = "none", e.style.minWidth = "", e.style.boxSizing = "border-box", e.style.removeProperty(s), e.style.removeProperty(o), e.style.removeProperty(c), e.style.removeProperty(a);
		} else this.css("overflow-y", "hidden"), this.css("margin", "0", !0), u === "vertical" ? (this.css("padding-top", r / 2 + "px", !0), this.css("padding-bottom", r / 2 + "px", !0), this.css("padding-left", "20px"), this.css("padding-right", "20px"), this.css(a, "vertical")) : (this.css("padding-top", "20px"), this.css("padding-bottom", "20px"), this.css("padding-left", r / 2 + "px", !0), this.css("padding-right", r / 2 + "px", !0), this.css(a, "horizontal")), this.css("box-sizing", "border-box"), this.css("max-width", "inherit"), this.css(c, "auto"), this.css(o, r + "px"), this.css(s, n + "px");
		this.css("-webkit-line-box-contain", "block glyphs replaced");
	}
	measureVerticalRlRect() {
		let e = this.content || this.document.body;
		if (!e || !this.document) return {
			left: 0,
			right: 0,
			top: 0,
			bottom: 0,
			rawWidth: 0,
			rawHeight: 0
		};
		try {
			let t = this.document.createRange();
			t.selectNodeContents(e);
			let n = t.getBoundingClientRect(), r = Math.max(n.width || 0, n.right || 0);
			return {
				left: n.left,
				right: n.right,
				top: n.top,
				bottom: n.bottom,
				rawWidth: r,
				rawHeight: Math.max(n.height || 0, n.bottom - Math.min(n.top, 0))
			};
		} catch {
			return {
				left: 0,
				right: 0,
				top: 0,
				bottom: 0,
				rawWidth: 0,
				rawHeight: 0
			};
		}
	}
	detectFixedColumnPitch(e) {
		let t = this.content || this.document.body;
		if (!t || !this.document || !this.window) return null;
		let n = [];
		try {
			let e = this.document.createRange();
			e.selectNodeContents(t), n = Array.from(e.getClientRects ? e.getClientRects() : []);
		} catch {
			n = [];
		}
		let r = Number(e), i = Number.isFinite(r) && r > 0 ? r * .75 : 140, a = [], o = [], s = [];
		for (let e of n) e.width > 0 && e.height > 0 && (a.push(Math.round(e.left * 2) / 2), o.push(e.width), s.push({
			left: e.left,
			right: e.right,
			width: e.width
		}));
		let c = Array.from(new Set(a)).sort((e, t) => e - t), l = [];
		for (let e = 1; e < c.length; e += 1) {
			let t = Math.abs(c[e] - c[e - 1]);
			t > 2 && t < i && l.push(t);
		}
		let u = Dt(l), d = Dt(o.filter((e) => e >= 4 && e <= 80)), f = Number.isFinite(u) ? Dt(l.map((e) => Math.abs(e - u))) : null, p = !!(l.length >= 4 && Number.isFinite(u) && Number.isFinite(f) && f <= Math.max(3, u * .08));
		return !Number.isFinite(u) || !p ? null : {
			linePitch: u,
			lineWidth: d,
			lineLefts: c,
			lineBoxes: s,
			sampleCount: l.length,
			gapMad: f,
			stable: p
		};
	}
	estimateVerticalRlLineMetrics(e) {
		return this.detectFixedColumnPitch(e) || {
			linePitch: null,
			lineWidth: null,
			lineLefts: [],
			lineBoxes: [],
			sampleCount: 0,
			gapMad: null,
			stable: !1
		};
	}
	verticalRlPageMetrics(e, t) {
		let n = Number(e), r = Number(t), i = this.verticalRlMetricsCacheKey(n, r);
		if (this._verticalRlPageMetricsCache && this._verticalRlPageMetricsCache.key === i) return this._verticalRlPageMetricsCache.metrics;
		let a = this.measureVerticalRlRect(), o = a.rawWidth, s = a.rawHeight, c = this.content || this.document.body;
		if (this.isViewportFillingSingleMediaPage(n)) {
			let e = Number.isFinite(n) && n > 0 ? n : 1;
			s = Math.ceil(Math.max(Number.isFinite(s) && s > 0 ? s : 0, Number.isFinite(r) && r > 0 ? r : 0, c && c.scrollHeight || 0, this.documentElement && this.documentElement.scrollHeight || 0));
			let t = {
				rawWidth: e,
				rawPaintWidth: e,
				rawHeight: s,
				pageWidth: e,
				viewportPageWidth: e,
				effectivePageAdvance: e,
				linePitch: null,
				lineWidth: null,
				edgeGuardPx: 0,
				edgeGuard: 0,
				pageBoundaryShift: 0,
				sampleCount: 0,
				gapMad: null,
				stable: !1,
				verticalFragmentPages: 1,
				totalPages: 1,
				snappedContentWidth: e
			};
			return this._verticalRlPageMetricsCache = {
				key: i,
				metrics: t
			}, this._verticalRlStableSnappedContentWidth = {
				pageLength: e,
				totalPages: 1,
				width: e
			}, t;
		}
		let l = c && c.scrollWidth || 0, u = c && (c.clientWidth || c.offsetWidth) || 0, d = this.documentElement && this.documentElement.scrollWidth || 0, f = d > 0 && u > 0 && u >= d - Ct, p = Number.isFinite(a.left) && Number.isFinite(a.right) && Number.isFinite(a.rawWidth) && f && a.left > Ct && a.right >= a.rawWidth - Ct && a.rawWidth > l + Ct && d >= a.rawWidth - Ct ? Math.max(l, d) : l;
		!Number.isFinite(o) || o <= 0 ? o = Math.max(l, d) : Number.isFinite(p) && p > n && o > p + Ct && (o = p), (!Number.isFinite(s) || s <= 0) && (s = Math.max(c && c.scrollHeight || 0, this.documentElement && this.documentElement.scrollHeight || 0)), o = Math.ceil(o + Ct), s = Math.ceil(s);
		let m = this.estimateVerticalRlLineMetrics(n), h = Number.isFinite(n) && n > 0 ? n : null, g = m.stable ? Nt({
			viewportPageWidth: h,
			linePitch: m.linePitch,
			lineBoxes: m.lineBoxes
		}) : h, _ = h && g ? Math.max(0, h - g) : 0, v = m.stable && Number.isFinite(m.lineWidth) && m.lineWidth > 0 && _ > wt ? Math.min(Math.floor(_ / 2), Math.max(wt, Math.ceil(m.lineWidth / 2) + 1)) : 0, y = g || h || 1, b = Math.max(1, h && g && h > g ? Math.ceil(Math.max(0, o - h) / g) + 1 : Math.ceil(o / y)), x = 1;
		if (b <= 1 && Number.isFinite(r) && r > 0 && Number.isFinite(s) && s > r + wt) {
			let e = c && this.window ? this.window.getComputedStyle(c) : null, t = e ? kt(e.columnGap) : 0, n = Math.max(1, r + Math.max(0, t));
			x = Math.max(1, Math.ceil(Math.max(0, s - r) / n) + 1), b = Math.max(b, x);
		}
		let S = jt({
			snappedContentWidth: h && g && h > g ? (b - 1) * g + h : b * y,
			pageLength: y,
			totalPages: b,
			rawWidth: o,
			lineBoxes: m.lineBoxes
		});
		S = Mt({
			previous: this._verticalRlStableSnappedContentWidth,
			snappedContentWidth: S,
			pageLength: y,
			totalPages: b,
			lineWidth: m.lineWidth
		}), this._verticalRlStableSnappedContentWidth = {
			pageLength: y,
			totalPages: b,
			width: S
		};
		let C = v, w = {
			rawWidth: o,
			rawPaintWidth: o,
			rawHeight: s,
			pageWidth: h || y,
			viewportPageWidth: h,
			effectivePageAdvance: g,
			linePitch: m.linePitch,
			lineWidth: m.lineWidth,
			edgeGuardPx: v,
			edgeGuard: v,
			pageBoundaryShift: C,
			sampleCount: m.sampleCount,
			gapMad: m.gapMad,
			stable: m.stable,
			verticalFragmentPages: x,
			totalPages: b,
			snappedContentWidth: S
		};
		return this._verticalRlPageMetricsCache = {
			key: i,
			metrics: w
		}, w;
	}
	debugVerticalRlMetrics(e) {
		let t = this.content || this.document.body, n = this.documentElement ? this.window.getComputedStyle(this.documentElement) : null, r = t ? this.window.getComputedStyle(t) : null, i = null;
		try {
			let e = this.document.createRange();
			e.selectNodeContents(t), i = e.getBoundingClientRect();
		} catch {
			i = null;
		}
		let a = t && t.getBoundingClientRect ? t.getBoundingClientRect() : null, o = this.verticalRlPageMetrics(e), s = o.rawWidth, c = o.snappedContentWidth, l = o.totalPages, u = {
			userAgent: this.window.navigator.userAgent,
			htmlWritingMode: n ? n.writingMode : null,
			bodyWritingMode: r ? r.writingMode : null,
			htmlDirection: n ? n.direction : null,
			bodyDirection: r ? r.direction : null,
			htmlOverflow: n ? n.overflow : null,
			bodyOverflow: r ? r.overflow : null,
			bodyRectLeft: a ? a.left : null,
			bodyRectRight: a ? a.right : null,
			bodyRectWidth: a ? a.width : null,
			rangeRectLeft: i ? i.left : null,
			rangeRectRight: i ? i.right : null,
			rangeRectWidth: i ? i.width : null,
			rawContentWidth: s,
			rawContentHeight: o.rawHeight,
			snappedContentWidth: c,
			pageWidth: o.pageWidth,
			effectivePageAdvance: o.effectivePageAdvance,
			linePitch: o.linePitch,
			lineWidth: o.lineWidth,
			edgeGuardPx: o.edgeGuardPx,
			sampleCount: o.sampleCount,
			gapMad: o.gapMad,
			stable: o.stable,
			totalPages: l
		};
		return this.window.console && this.window.console.debug && this.window.console.debug("[epubjs:vertical-rl]", u), u;
	}
	scaler(e, t, n) {
		var r = "scale(" + e + ")", i = "";
		this.css("transform-origin", "top left"), (t >= 0 || n >= 0) && (i = " translate(" + (t || 0) + "px, " + (n || 0) + "px )"), this.css("transform", r + i);
	}
	fit(e, t, n) {
		var r = this.viewport(), i = parseInt(String(r.width)), a = parseInt(String(r.height)), o = e / i, s = t / a, c = o < s ? o : s;
		if (this.layoutStyle("paginated"), this.width(i), this.height(a), this.overflow("hidden"), this.scaler(c, 0, 0), this.css("background-size", i * c + "px " + a * c + "px"), this.css("background-color", "transparent"), Ot(n)) {
			var l = e - i * c;
			this.css("margin-left", l + "px");
		}
	}
	direction(e) {
		this.documentElement && (this.documentElement.style.direction = e || "");
	}
	mapPage(e, t, n, r, i) {
		return new _t(t, void 0, void 0, i).page(this, e, n, r);
	}
	linksHandler() {
		Se(this.content, (e) => {
			this.emit($.CONTENTS.LINK_CLICKED, e);
		}, this.sectionHref);
	}
	writingMode(e) {
		let t = ut("writing-mode");
		e && this.documentElement && this.documentElement.style.setProperty(t, e);
		let n = this.document && this.document.body;
		if (n) {
			let e = n.style && n.style.getPropertyValue(t);
			if (e && e !== "horizontal-tb") return e;
			try {
				let e = Array.from(this.document.styleSheets || []);
				for (let n of e) {
					let e;
					try {
						e = Array.from(n.cssRules || []);
					} catch {
						continue;
					}
					for (let n of e) {
						let e = n;
						if (e.style && e.selectorText) {
							let n = e.selectorText.toLowerCase();
							if (n === "body" || n === "html, body" || n === "body, html") {
								let n = e.style.getPropertyValue(t);
								if (n && n !== "horizontal-tb") return n;
							}
						}
					}
				}
			} catch {}
		}
		if (n) {
			let e = this.window.getComputedStyle(n).getPropertyValue(t);
			if (e && e !== "horizontal-tb") return e;
		}
		let r = this.window.getComputedStyle(this.documentElement).getPropertyValue(t) || "";
		return r && r !== "horizontal-tb" ? r : this._forcedWritingMode || r;
	}
	forceWritingMode(e) {
		return (e === "vertical-rl" || e === "vertical-lr" || e === "horizontal-tb") && (this._forcedWritingMode = e), this._forcedWritingMode;
	}
	layoutStyle(e) {
		return e && (this._layoutStyle = e, navigator.epubReadingSystem.layoutStyle = this._layoutStyle), this._layoutStyle || "paginated";
	}
	epubReadingSystem(e, t) {
		return navigator.epubReadingSystem = {
			name: e,
			version: t,
			layoutStyle: this.layoutStyle(),
			hasFeature: function(e) {
				switch (e) {
					case "dom-manipulation": return !0;
					case "layout-changes": return !0;
					case "touch-events": return !0;
					case "mouse-events": return !0;
					case "keyboard-events": return !0;
					case "spine-scripting": return !1;
					default: return !1;
				}
			}
		}, navigator.epubReadingSystem;
	}
	destroy() {
		this.removeListeners();
	}
};
(0, j.default)(It.prototype);
//#endregion
//#region node_modules/marks-pane/lib/svg.js
var Lt = /* @__PURE__ */ o(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.createElement = t;
	function t(e) {
		return document.createElementNS("http://www.w3.org/2000/svg", e);
	}
	e.default = { createElement: t };
})), Rt = /* @__PURE__ */ o(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.proxyMouse = t, e.clone = n, e.default = { proxyMouse: t };
	function t(e, t) {
		function i(i) {
			for (var a = t.length - 1; a >= 0; a--) {
				var o = t[a], s = i.clientX, c = i.clientY;
				if (i.touches && i.touches.length && (s = i.touches[0].clientX, c = i.touches[0].clientY), r(o, e, s, c)) {
					o.dispatchEvent(n(i));
					break;
				}
			}
		}
		if (e.nodeName === "iframe" || e.nodeName === "IFRAME") try {
			this.target = e.contentDocument;
		} catch {
			this.target = e;
		}
		else this.target = e;
		for (var a = [
			"mouseup",
			"mousedown",
			"click",
			"touchstart"
		], o = 0; o < a.length; o++) {
			var s = a[o];
			this.target.addEventListener(s, function(e) {
				return i(e);
			}, !1);
		}
	}
	function n(e) {
		var t = Object.assign({}, e, { bubbles: !1 });
		try {
			return new MouseEvent(e.type, t);
		} catch {
			var n = document.createEvent("MouseEvents");
			return n.initMouseEvent(e.type, !1, t.cancelable, t.view, t.detail, t.screenX, t.screenY, t.clientX, t.clientY, t.ctrlKey, t.altKey, t.shiftKey, t.metaKey, t.button, t.relatedTarget), n;
		}
	}
	function r(e, t, n, r) {
		var i = t.getBoundingClientRect();
		function a(e, t, n) {
			var r = e.top - i.top, a = e.left - i.left, o = r + e.height, s = a + e.width;
			return r <= n && a <= t && o > n && s > t;
		}
		if (!a(e.getBoundingClientRect(), n, r)) return !1;
		for (var o = e.getClientRects(), s = 0, c = o.length; s < c; s++) if (a(o[s], n, r)) return !0;
		return !1;
	}
})), zt = (/* @__PURE__ */ o(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.Underline = e.Highlight = e.Mark = e.Pane = void 0;
	var t = function e(t, n, r) {
		t === null && (t = Function.prototype);
		var i = Object.getOwnPropertyDescriptor(t, n);
		if (i === void 0) {
			var a = Object.getPrototypeOf(t);
			return a === null ? void 0 : e(a, n, r);
		} else if ("value" in i) return i.value;
		else {
			var o = i.get;
			return o === void 0 ? void 0 : o.call(r);
		}
	}, n = function() {
		function e(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
			}
		}
		return function(t, n, r) {
			return n && e(t.prototype, n), r && e(t, r), t;
		};
	}(), r = a(Lt()), i = a(Rt());
	function a(e) {
		return e && e.__esModule ? e : { default: e };
	}
	function o(e, t) {
		if (!e) throw ReferenceError("this hasn't been initialised - super() hasn't been called");
		return t && (typeof t == "object" || typeof t == "function") ? t : e;
	}
	function s(e, t) {
		if (typeof t != "function" && t !== null) throw TypeError("Super expression must either be null or a function, not " + typeof t);
		e.prototype = Object.create(t && t.prototype, { constructor: {
			value: e,
			enumerable: !1,
			writable: !0,
			configurable: !0
		} }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
	}
	function c(e, t) {
		if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
	}
	e.Pane = function() {
		function e(t) {
			var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : document.body;
			c(this, e), this.target = t, this.element = r.default.createElement("svg"), this.marks = [], this.element.style.position = "absolute", this.element.setAttribute("pointer-events", "none"), i.default.proxyMouse(this.target, this.marks), this.container = n, this.container.appendChild(this.element), this.render();
		}
		return n(e, [
			{
				key: "addMark",
				value: function(e) {
					var t = r.default.createElement("g");
					return this.element.appendChild(t), e.bind(t, this.container), this.marks.push(e), e.render(), e;
				}
			},
			{
				key: "removeMark",
				value: function(e) {
					var t = this.marks.indexOf(e);
					if (t !== -1) {
						var n = e.unbind();
						this.element.removeChild(n), this.marks.splice(t, 1);
					}
				}
			},
			{
				key: "render",
				value: function() {
					u(this.element, l(this.target, this.container));
					var e = !0, t = !1, n = void 0;
					try {
						for (var r = this.marks[Symbol.iterator](), i; !(e = (i = r.next()).done); e = !0) i.value.render();
					} catch (e) {
						t = !0, n = e;
					} finally {
						try {
							!e && r.return && r.return();
						} finally {
							if (t) throw n;
						}
					}
				}
			}
		]), e;
	}(), e.Underline = function(e) {
		s(t, e);
		function t(e, n, r, i) {
			return c(this, t), o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n, r, i));
		}
		return n(t, [{
			key: "render",
			value: function() {
				for (; this.element.firstChild;) this.element.removeChild(this.element.firstChild);
				for (var e = this.element.ownerDocument.createDocumentFragment(), t = this.filteredRanges(), n = this.element.getBoundingClientRect(), i = this.container.getBoundingClientRect(), a = 0, o = t.length; a < o; a++) {
					var s = t[a], c = r.default.createElement("rect");
					c.setAttribute("x", s.left - n.left + i.left), c.setAttribute("y", s.top - n.top + i.top), c.setAttribute("height", s.height), c.setAttribute("width", s.width), c.setAttribute("fill", "none");
					var l = r.default.createElement("line");
					l.setAttribute("x1", s.left - n.left + i.left), l.setAttribute("x2", s.left - n.left + i.left + s.width), l.setAttribute("y1", s.top - n.top + i.top + s.height - 1), l.setAttribute("y2", s.top - n.top + i.top + s.height - 1), l.setAttribute("stroke-width", 1), l.setAttribute("stroke", "black"), l.setAttribute("stroke-linecap", "square"), e.appendChild(c), e.appendChild(l);
				}
				this.element.appendChild(e);
			}
		}]), t;
	}(e.Highlight = function(e) {
		s(i, e);
		function i(e, t, n, r) {
			c(this, i);
			var a = o(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this));
			return a.range = e, a.className = t, a.data = n || {}, a.attributes = r || {}, a;
		}
		return n(i, [{
			key: "bind",
			value: function(e, n) {
				for (var r in t(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "bind", this).call(this, e, n), this.data) this.data.hasOwnProperty(r) && (this.element.dataset[r] = this.data[r]);
				for (var r in this.attributes) this.attributes.hasOwnProperty(r) && this.element.setAttribute(r, this.attributes[r]);
				this.className && this.element.classList.add(this.className);
			}
		}, {
			key: "render",
			value: function() {
				for (; this.element.firstChild;) this.element.removeChild(this.element.firstChild);
				for (var e = this.element.ownerDocument.createDocumentFragment(), t = this.filteredRanges(), n = this.element.getBoundingClientRect(), i = this.container.getBoundingClientRect(), a = 0, o = t.length; a < o; a++) {
					var s = t[a], c = r.default.createElement("rect");
					c.setAttribute("x", s.left - n.left + i.left), c.setAttribute("y", s.top - n.top + i.top), c.setAttribute("height", s.height), c.setAttribute("width", s.width), e.appendChild(c);
				}
				this.element.appendChild(e);
			}
		}]), i;
	}(e.Mark = function() {
		function e() {
			c(this, e), this.element = null;
		}
		return n(e, [
			{
				key: "bind",
				value: function(e, t) {
					this.element = e, this.container = t;
				}
			},
			{
				key: "unbind",
				value: function() {
					var e = this.element;
					return this.element = null, e;
				}
			},
			{
				key: "render",
				value: function() {}
			},
			{
				key: "dispatchEvent",
				value: function(e) {
					this.element && this.element.dispatchEvent(e);
				}
			},
			{
				key: "getBoundingClientRect",
				value: function() {
					return this.element.getBoundingClientRect();
				}
			},
			{
				key: "getClientRects",
				value: function() {
					for (var e = [], t = this.element.firstChild; t;) e.push(t.getBoundingClientRect()), t = t.nextSibling;
					return e;
				}
			},
			{
				key: "filteredRanges",
				value: function() {
					var e = Array.from(this.range.getClientRects());
					return e.filter(function(t) {
						for (var n = 0; n < e.length; n++) {
							if (e[n] === t) return !0;
							if (d(e[n], t)) return !1;
						}
						return !0;
					});
				}
			}
		]), e;
	}()));
	function l(e, t) {
		var n = t.getBoundingClientRect(), r = e.getBoundingClientRect();
		return {
			top: r.top - n.top,
			left: r.left - n.left,
			height: e.scrollHeight,
			width: e.scrollWidth
		};
	}
	function u(e, t) {
		e.style.setProperty("top", t.top + "px", "important"), e.style.setProperty("left", t.left + "px", "important"), e.style.setProperty("height", t.height + "px", "important"), e.style.setProperty("width", t.width + "px", "important");
	}
	function d(e, t) {
		return t.right <= e.right && t.left >= e.left && t.top >= e.top && t.bottom <= e.bottom;
	}
})))(), Bt = N, Vt = It;
function Ht(e) {
	return typeof e != "string" || e.toLowerCase().indexOf("<script") === -1 ? e : e.replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, "").replace(/<script\b[^>]*\/\s*>/gi, "");
}
var Ut = () => typeof window < "u" && window.__EPUB_VRL_DEBUG__ === !0, Wt = class {
	constructor(e, t) {
		this.settings = I({
			ignoreClass: "",
			axis: void 0,
			direction: void 0,
			width: 0,
			height: 0,
			layout: void 0,
			globalLayoutProperties: {},
			method: void 0,
			forceRight: !1,
			allowScriptedContent: !1,
			allowPopups: !1
		}, t || {}), this.id = "epubjs-view-" + M(), this.section = e, this.index = e.index, this.element = this.container(this.settings.axis), this.added = !1, this.displayed = !1, this.rendered = !1, this.fixedWidth = 0, this.fixedHeight = 0, this.epubcfi = new X(), this.layout = this.settings.layout, this.pane = void 0, this.highlights = {}, this.underlines = {}, this.marks = {};
	}
	container(e) {
		var t = document.createElement("div");
		return t.classList.add("epub-view"), t.style.height = "0px", t.style.width = "0px", t.style.overflow = "hidden", t.style.position = "relative", t.style.display = "block", e && e == "horizontal" ? t.style.flex = "none" : t.style.flex = "initial", t;
	}
	create() {
		return this.iframe ? this.iframe : (this.element ||= this.createContainer(), this.iframe = document.createElement("iframe"), this.iframe.id = this.id, this.iframe.scrolling = "no", this.iframe.style.overflow = "hidden", this.iframe.seamless = "seamless", this.iframe.style.border = "none", this.iframe.sandbox = "allow-same-origin", this.settings.allowScriptedContent && (this.iframe.sandbox += " allow-scripts"), this.settings.allowPopups && (this.iframe.sandbox += " allow-popups"), this.iframe.setAttribute("enable-annotation", "true"), this.resizing = !0, this.element.style.visibility = "hidden", this.iframe.style.visibility = "hidden", this.iframe.style.width = "0", this.iframe.style.height = "0", this._width = 0, this._height = 0, this.element.setAttribute("ref", this.index), this.added = !0, this.elementBounds = pt(this.element), "srcdoc" in this.iframe ? this.supportsSrcdoc = !0 : this.supportsSrcdoc = !1, this.settings.method || (this.settings.method = this.supportsSrcdoc ? "srcdoc" : "write"), this.iframe);
	}
	render(e, t) {
		return this.create(), this.size(), this.sectionRender ||= this.section.render(e), this.sectionRender.then(function(e) {
			return this.load(e);
		}.bind(this)).then(function() {
			let e = this.settings.writingMode ? this.contents.writingMode(this.settings.writingMode) : this.contents.writingMode(), t;
			return t = this.settings.flow === "scrolled" ? e.indexOf("vertical") === 0 ? "horizontal" : "vertical" : e.indexOf("vertical") === 0 ? "vertical" : "horizontal", e === "vertical-rl" && this.settings.flow === "paginated" && (t = "horizontal"), e.indexOf("vertical") === 0 && e !== "vertical-rl" && this.settings.flow === "paginated" && (this.layout.delta = this.layout.height), this.setAxis(t), this.emit($.VIEWS.AXIS, t), this.setWritingMode(e), this.emit($.VIEWS.WRITING_MODE, e), this.layout.format(this.contents, this.section, this.axis), this.addListeners(), new Promise((e, t) => {
				this.expand(), this.settings.forceRight && (this.element.style.marginLeft = this.width() + "px"), e();
			});
		}.bind(this), function(e) {
			return this.emit($.VIEWS.LOAD_ERROR, e), new Promise((t, n) => {
				n(e);
			});
		}.bind(this)).then(function() {
			this.emit($.VIEWS.RENDERED, this.section);
		}.bind(this));
	}
	reset() {
		this.iframe && (this.iframe.style.width = "0", this.iframe.style.height = "0", this._width = 0, this._height = 0, this._textWidth = void 0, this._contentWidth = void 0, this._textHeight = void 0, this._contentHeight = void 0), this._needsReframe = !0;
	}
	size(e, t) {
		var n = e || this.settings.width, r = t || this.settings.height;
		this.layout.name === "pre-paginated" ? this.lock("both", n, r) : this.settings.axis === "horizontal" ? this.lock("height", n, r) : this.lock("width", n, r), this.settings.width = n, this.settings.height = r;
	}
	lock(e, t, n) {
		var r = mt(this.element), i = this.iframe ? mt(this.iframe) : {
			width: 0,
			height: 0
		};
		e == "width" && G(t) && (this.lockedWidth = Number(t) - r.width - i.width), e == "height" && G(n) && (this.lockedHeight = Number(n) - r.height - i.height), e === "both" && G(t) && G(n) && (this.lockedWidth = Number(t) - r.width - i.width, this.lockedHeight = Number(n) - r.height - i.height), this.displayed && this.iframe && this.expand();
	}
	expand(e) {
		var t = this.lockedWidth, n = this.lockedHeight, r;
		if (!(!this.iframe || this._expanding)) {
			if (this._expanding = !0, this.layout.name === "pre-paginated") t = this.layout.columnWidth, n = this.layout.height;
			else if (this.settings.axis === "horizontal") {
				t = this.contents.textWidth();
				let e = this.layout.pageWidth, i = this.layout.viewportPageWidth || this.lockedWidth || this.layout.width || this.layout.pageWidth, a = (this.element && this.element.parentElement ? this.element.parentElement.clientWidth : 0) || this.lockedWidth || this.layout.columnWidth || this.layout.pageWidth || this.settings.width || i, o = null, s = !1;
				if (this.settings.flow === "paginated" && this.contents.isViewportFillingSingleMediaPage && this.contents.isViewportFillingSingleMediaPage(a) && (s = !0, i = a, e = a, t = Math.ceil(a)), this._viewportFillingSingleMediaPage = s, !s && this.settings.flow === "paginated" && this.contents.writingMode && this.contents.writingMode() === "vertical-rl" && this.contents.verticalRlPageMetrics && (o = this.contents.verticalRlPageMetrics(i, n), t = o.rawWidth, o.effectivePageAdvance > 0)) {
					e = o.effectivePageAdvance;
					let t = o.pageWidth || this.layout.pageWidth, n = o.viewportPageWidth || i, r = o.pageBoundaryShift || 0, a = o.edgeGuardPx || 0;
					(this.layout.pageWidth !== t || this.layout.viewportPageWidth !== n || this.layout.effectivePageAdvance !== e || this.layout.delta !== e || this.layout.pageBoundaryShift !== r || this.layout.edgeGuardPx !== a) && (this.layout.pageWidth = t, this.layout.viewportPageWidth = n, this.layout.effectivePageAdvance = e, this.layout.delta = e, this.layout.pageBoundaryShift = r, this.layout.edgeGuardPx = a, this.layout.update({
						pageWidth: t,
						viewportPageWidth: n,
						delta: e,
						effectivePageAdvance: e,
						pageBoundaryShift: this.layout.pageBoundaryShift,
						edgeGuardPx: this.layout.edgeGuardPx
					}));
				}
				o && o.snappedContentWidth > 0 ? t = o.snappedContentWidth : e > 0 && i > 0 ? t = (Math.max(1, Math.ceil(Math.max(0, t - i) / e) + 1) - 1) * e + i : t % this.layout.pageWidth > 0 && (t = Math.ceil(t / this.layout.pageWidth) * this.layout.pageWidth), this._contentWidth = t, this.settings.forceEvenPages && !s && (r = this.layout.effectivePageAdvance && this.layout.effectivePageAdvance !== this.layout.pageWidth ? this.layout.count(t).pages : t / this.layout.pageWidth, this.layout.divisor > 1 && this.layout.name === "reflowable" && r % 2 > 0 && (t += this.layout.effectivePageAdvance || this.layout.pageWidth)), o && Ut() && window.console && window.console.debug && window.console.debug("[epubjs:vertical-rl:expand]", {
					href: this.section && this.section.href,
					rawWidth: o.rawWidth,
					rawPaintWidth: o.rawPaintWidth,
					snappedContentWidth: o.snappedContentWidth,
					pageAdvance: e,
					viewportPageWidth: o.viewportPageWidth,
					pageCount: o.totalPages,
					linePitch: o.linePitch,
					edgeGuardPx: o.edgeGuardPx,
					pageBoundaryShift: o.pageBoundaryShift
				});
			} else this.settings.axis === "vertical" && (n = this.contents.textHeight(), this.settings.flow === "paginated" && n % this.layout.height > 0 && (n = Math.ceil(n / this.layout.height) * this.layout.height));
			(this._needsReframe || t != this._width || n != this._height) && this.reframe(t, n), this._expanding = !1;
		}
	}
	reframe(e, t) {
		var n;
		G(e) && (this.element.style.width = e + "px", this.iframe.style.width = e + "px", this._width = e), G(t) && (this.element.style.height = t + "px", this.iframe.style.height = t + "px", this._height = t);
		let r = Number(e) || 0, i = Number(t) || 0;
		n = {
			width: r,
			height: i,
			widthDelta: this.prevBounds ? r - this.prevBounds.width : r,
			heightDelta: this.prevBounds ? i - this.prevBounds.height : i
		}, this.pane && this.pane.render(), requestAnimationFrame(() => {
			let e;
			for (let t in this.marks) Object.prototype.hasOwnProperty.call(this.marks, t) && (e = this.marks[t], this.placeMark(e.element, e.range));
		}), this.onResize(this, n), this.emit($.VIEWS.RESIZED, n), this.prevBounds = n, this.elementBounds = pt(this.element);
	}
	load(e) {
		var t = new Bt(), n = t.promise;
		if (!this.iframe) return t.reject(/* @__PURE__ */ Error("No Iframe Available")), n;
		if (this.iframe.onload = function(e) {
			this.onLoad(e, t);
		}.bind(this), this.settings.allowScriptedContent || (e = Ht(e)), this.settings.method === "blobUrl") this.blobUrl = et(e, "application/xhtml+xml"), this.iframe.src = this.blobUrl, this.element.appendChild(this.iframe);
		else if (this.settings.method === "srcdoc") this.iframe.srcdoc = e, this.element.appendChild(this.iframe);
		else {
			if (this.element.appendChild(this.iframe), this.document = this.iframe.contentDocument, !this.document) return t.reject(/* @__PURE__ */ Error("No Document Available")), n;
			if (this.iframe.contentDocument.open(), window.MSApp && window.MSApp.execUnsafeLocalFunction) {
				var r = this;
				window.MSApp.execUnsafeLocalFunction(function() {
					r.iframe.contentDocument.write(e);
				});
			} else this.iframe.contentDocument.write(e);
			this.iframe.contentDocument.close();
		}
		return n;
	}
	onLoad(e, t) {
		this.window = this.iframe.contentWindow, this.document = this.iframe.contentDocument, this.contents = new Vt(this.document, this.document.body, this.section.cfiBase, this.section.index, this.section.href), this.rendering = !1;
		var n = this.document.querySelector("link[rel='canonical']");
		n ? n.setAttribute("href", this.section.canonical) : (n = this.document.createElement("link"), n.setAttribute("rel", "canonical"), n.setAttribute("href", this.section.canonical), this.document.querySelector("head").appendChild(n)), this.contents.on($.CONTENTS.EXPAND, () => {
			this.displayed && this.iframe && (this.expand(), this.contents && this.layout.format(this.contents));
		}), this.contents.on($.CONTENTS.RESIZE, (e) => {
			this.displayed && this.iframe && (this.expand(), this.contents && this.layout.format(this.contents));
		}), t.resolve(this.contents);
	}
	setLayout(e) {
		this.layout = e, this.contents && (this.layout.format(this.contents), this.expand());
	}
	setAxis(e) {
		this.settings.axis = e, e == "horizontal" ? this.element.style.flex = "none" : this.element.style.flex = "initial", this.size();
	}
	setWritingMode(e) {
		this.writingMode = e;
	}
	addListeners() {}
	removeListeners(e) {}
	display(e) {
		var t = new Bt();
		return this.displayed ? t.resolve(this) : this.render(e).then(function() {
			this.emit($.VIEWS.DISPLAYED, this), this.onDisplayed(this), this.displayed = !0, t.resolve(this);
		}.bind(this), function(e) {
			t.reject(e, this);
		}), t.promise;
	}
	show() {
		this.element.style.visibility = "visible", this.iframe && (this.iframe.style.visibility = "visible", this.iframe.style.transform = "translateZ(0)", this.iframe.offsetWidth, this.iframe.style.transform = null), this.emit($.VIEWS.SHOWN, this);
	}
	hide() {
		this.element.style.visibility = "hidden", this.iframe.style.visibility = "hidden", this.stopExpanding = !0, this.emit($.VIEWS.HIDDEN, this);
	}
	offset() {
		return {
			top: this.element.offsetTop,
			left: this.element.offsetLeft
		};
	}
	width() {
		return this._width;
	}
	height() {
		return this._height;
	}
	position() {
		return this.element.getBoundingClientRect();
	}
	locationOf(e) {
		var t = this.contents.locationOf(e, this.settings.ignoreClass);
		return {
			left: t.left,
			top: t.top
		};
	}
	onDisplayed(e) {}
	onResize(e, t) {}
	bounds(e) {
		return (e || !this.elementBounds) && (this.elementBounds = pt(this.element)), this.elementBounds;
	}
	highlight(e, t = {}, n, r = "epubjs-hl", i = {}) {
		if (!this.contents) return;
		let a = Object.assign({
			fill: "yellow",
			"fill-opacity": "0.3",
			"mix-blend-mode": "multiply"
		}, i), o = this.contents.range(e), s = () => {
			this.emit($.VIEWS.MARK_CLICKED, e, t);
		};
		t.epubcfi = e, this.pane ||= new zt.Pane(this.iframe, this.element);
		let c = new zt.Highlight(o, r, t, a), l = this.pane.addMark(c);
		return this.highlights[e] = {
			mark: l,
			element: l.element,
			listeners: [s, n]
		}, l.element.setAttribute("ref", r), l.element.addEventListener("click", s), l.element.addEventListener("touchstart", s), n && (l.element.addEventListener("click", n), l.element.addEventListener("touchstart", n)), l;
	}
	underline(e, t = {}, n, r = "epubjs-ul", i = {}) {
		if (!this.contents) return;
		let a = Object.assign({
			stroke: "black",
			"stroke-opacity": "0.3",
			"mix-blend-mode": "multiply"
		}, i), o = this.contents.range(e), s = () => {
			this.emit($.VIEWS.MARK_CLICKED, e, t);
		};
		t.epubcfi = e, this.pane ||= new zt.Pane(this.iframe, this.element);
		let c = new zt.Underline(o, r, t, a), l = this.pane.addMark(c);
		return this.underlines[e] = {
			mark: l,
			element: l.element,
			listeners: [s, n]
		}, l.element.setAttribute("ref", r), l.element.addEventListener("click", s), l.element.addEventListener("touchstart", s), n && (l.element.addEventListener("click", n), l.element.addEventListener("touchstart", n)), l;
	}
	mark(e, t = {}, n) {
		if (!this.contents) return;
		if (e in this.marks) return this.marks[e];
		let r = this.contents.range(e);
		if (!r) return;
		let i = r.commonAncestorContainer, a = i.nodeType === 1 ? i : i.parentNode, o = (n) => {
			this.emit($.VIEWS.MARK_CLICKED, e, t);
		};
		r.collapsed && i.nodeType === 1 ? (r = new Range(), r.selectNodeContents(i)) : r.collapsed && (r = new Range(), r.selectNodeContents(a));
		let s = this.document.createElement("a");
		return s.setAttribute("ref", "epubjs-mk"), s.style.position = "absolute", s.dataset.epubcfi = e, t && Object.keys(t).forEach((e) => {
			s.dataset[e] = t[e];
		}), n && (s.addEventListener("click", n), s.addEventListener("touchstart", n)), s.addEventListener("click", o), s.addEventListener("touchstart", o), this.placeMark(s, r), this.element.appendChild(s), this.marks[e] = {
			element: s,
			range: r,
			listeners: [o, n]
		}, a;
	}
	placeMark(e, t) {
		let n, r, i;
		if (this.layout.name === "pre-paginated" || this.settings.axis !== "horizontal") {
			let e = t.getBoundingClientRect();
			n = e.top, r = e.right;
		} else {
			let e = t.getClientRects(), o;
			for (var a = 0; a != e.length; a++) o = e[a], (!i || o.left < i) && (i = o.left, r = Math.ceil(i / this.layout.props.pageWidth) * this.layout.props.pageWidth - this.layout.gap / 2, n = o.top);
		}
		e.style.top = `${n}px`, e.style.left = `${r}px`;
	}
	unhighlight(e) {
		let t;
		e in this.highlights && (t = this.highlights[e], this.pane.removeMark(t.mark), t.listeners.forEach((e) => {
			e && (t.element.removeEventListener("click", e), t.element.removeEventListener("touchstart", e));
		}), delete this.highlights[e]);
	}
	ununderline(e) {
		let t;
		e in this.underlines && (t = this.underlines[e], this.pane.removeMark(t.mark), t.listeners.forEach((e) => {
			e && (t.element.removeEventListener("click", e), t.element.removeEventListener("touchstart", e));
		}), delete this.underlines[e]);
	}
	unmark(e) {
		let t;
		e in this.marks && (t = this.marks[e], this.element.removeChild(t.element), t.listeners.forEach((e) => {
			e && (t.element.removeEventListener("click", e), t.element.removeEventListener("touchstart", e));
		}), delete this.marks[e]);
	}
	destroy() {
		for (let e in this.highlights) this.unhighlight(e);
		for (let e in this.underlines) this.ununderline(e);
		for (let e in this.marks) this.unmark(e);
		this.blobUrl && tt(this.blobUrl), this.displayed && (this.displayed = !1, this.removeListeners(), this.contents.destroy(), this.stopExpanding = !0, this.element.removeChild(this.iframe), this.pane &&= (this.pane.element.remove(), void 0), this.iframe = void 0, this.contents = void 0, this._textWidth = null, this._textHeight = null, this._width = null, this._height = null);
	}
};
(0, j.default)(Wt.prototype);
//#endregion
//#region src/utils/scrolltype.ts
function Gt() {
	var e = "reverse", t = Kt();
	return document.body.appendChild(t), t.scrollLeft > 0 ? e = "default" : typeof Element < "u" && Element.prototype.scrollIntoView ? (t.children[0].children[1].scrollIntoView(), t.scrollLeft < 0 && (e = "negative")) : (t.scrollLeft = 1, t.scrollLeft === 0 && (e = "negative")), document.body.removeChild(t), e;
}
function Kt() {
	var e = document.createElement("div");
	e.dir = "rtl", e.style.position = "fixed", e.style.width = "1px", e.style.height = "1px", e.style.top = "0px", e.style.left = "0px", e.style.overflow = "hidden";
	var t = document.createElement("div");
	t.style.width = "2px";
	var n = document.createElement("span");
	n.style.width = "1px", n.style.display = "inline-block";
	var r = document.createElement("span");
	return r.style.width = "1px", r.style.display = "inline-block", t.appendChild(n), t.appendChild(r), e.appendChild(t), e;
}
//#endregion
//#region src/rendering/page-metrics.ts
function qt(e, t) {
	if (!Number.isFinite(e) || e <= 0 || !Number.isFinite(t) || t <= 0) return 1;
	let n = e / t, r = Math.max(1, Math.round(n)), i = Math.max(1, Math.min(4, t * .005));
	return Math.abs(e - r * t) <= i ? r : Math.max(1, Math.ceil(n));
}
function Jt(e, t = 0) {
	let n = Number(e) || 0, r = Number(t) || 0, i = Math.max(2, r, Math.round(n * .08));
	return n > 0 ? Math.min(Math.max(2, Math.round(n / 4)), i) : 2;
}
function Yt(e, t, n = !1) {
	if (!n) return 0;
	let r = Number(e || 0), i = Number(t) || 0;
	return !Number.isFinite(r) || r <= 0 || !i ? 0 : Math.min(r, Math.max(0, Math.floor(i / 3)));
}
function Xt(e, t, n, r = !1) {
	let i = Number(e) || 0, a = Number(t) || 0, o = Number(n) || 0;
	return !!(r && i && a && a - i > 1 && o === 0);
}
//#endregion
//#region src/rendering/logical-page.ts
function Zt(e, t, n, r, i, a, o) {
	let s = Number(e) || 0, c = Number(t) || 0, l = Number(r) || 0, u = Math.abs((Number(a) || 0) - (Number(i) || 0));
	return l === c - 1 && u > s && o ? s : u > 0 ? u : s;
}
function Qt(e, t, n, r, i, a = 0) {
	let o = Number(n) || 0, s = Number(r) || 0, c = Number(i) || 0;
	return !o || !s || !c ? null : [
		Math.round((Number(e) || 0) * 100) / 100,
		Math.round((Number(t) || 0) * 100) / 100,
		Math.round(o * 100) / 100,
		Math.round(s * 100) / 100,
		Math.round(c * 100) / 100,
		Math.round((Number(a) || 0) * 100) / 100
	].join(":");
}
function $t(e, t, n) {
	if (!e || e.key !== n || !e.offsets) return null;
	let r = Number(e.offsets[t]);
	return Number.isFinite(r) ? r : null;
}
function en(e, t, n, r) {
	if (!r || !Number.isFinite(Number(n))) return e;
	let i = !e || e.key !== r ? {
		key: r,
		offsets: Object.create(null)
	} : e;
	return i.offsets[t] = Number(n), i;
}
function tn(e, t, n, r, i = 0, a = !1) {
	let o = Number(r) || 0, s = Math.max(0, Math.min(t - 1, e)), c = s * o;
	return a && i > 0 && s > 0 && s < t - 1 && (c = Math.max(0, c - i)), Math.min(n, c);
}
function nn(e, t, n, r, i, a = 0, o = !1) {
	let s = Number(n) || 0;
	if (!s || s <= 0) return 0;
	let c = Math.max(1, Math.floor(Number(t) || 1)), l = Number(e) || 0, u = Number(r) || 0, d = Number(i) || 0;
	if (o && c > 1 && u > 0 && l >= u - d) return c - 1;
	if (o) {
		let e = 0, t = Infinity;
		for (let n = 0; n < c; n++) {
			let r = tn(n, c, u, s, a, o), i = Math.abs(l - r);
			i < t && (t = i, e = n);
		}
		return e;
	}
	let f = Math.round(l / s);
	if (Math.abs(l - f * s) <= d) return Math.max(0, Math.min(c - 1, f));
	let p = Math.floor((l + .5) / s);
	return Math.max(0, Math.min(c - 1, p));
}
//#endregion
//#region src/rendering/edge-mask.ts
function rn(e) {
	let t = Number(e) || 0;
	return Math.max(0, Math.floor(t / 4));
}
function an(e, t, n = 4) {
	let r = Math.max(0, Math.floor(Number(n) || 0)), i = 0, a = 0;
	for (let n = 0; n < r; n++) if (i++, a = (Number(e()) || 0) + (Number(t()) || 0), !a) return {
		iterations: i,
		lastShift: a,
		stopped: !0
	};
	return {
		iterations: i,
		lastShift: a,
		stopped: !1
	};
}
function on(e, t, n, r, i, a) {
	let o = Number(e) || 0, s = Number(t) || 0, c = Number(n) || 0, l = Number(r) || 0, u = Number(i) || 0, d = Number(a) || 0;
	return !!(o && s && Math.abs(o - s - c) <= 1 && l === 0 && (u <= 0 || Math.abs(d - s) <= 1));
}
function sn(e, t, n, r) {
	let i = Number(e) || 0, a = Number(t) || 0, o = Number(n) || 0, s = Math.max(0, Number(r) || 0);
	if (!i || !a || !s) return 0;
	let c = Math.max(0, i - a - o);
	return Math.min(Math.ceil(c), s);
}
function cn(e, t, n, r = 0) {
	let i = Math.max(0, Number(n) || 0);
	if (!i) return null;
	let a = Math.min(Number(t) || 0, i);
	return {
		widths: {
			left: Math.min(Number(e) || 0, i),
			right: a
		},
		maxMask: i,
		previousPageStep: Number(r) || 0,
		rightMaxMask: a
	};
}
function ln(e, t, n, r) {
	let i = Math.max(0, Number(n) || 0);
	return i ? {
		widths: {
			left: Math.min(Number(e) || 0, i),
			right: Number(t) || 0
		},
		maxMask: i,
		nextPageStep: Number(r) || 0,
		rightMaxMask: 0
	} : null;
}
function un(e, t, n, r) {
	let i = Number(t), a = Number(n);
	return Number.isFinite(i) || (i = Number(r)), Number.isFinite(a) || (a = 0), {
		left: Math.max(Number(e && e.left) || 0, i || 0),
		right: Math.max(Number(e && e.right) || 0, a || 0)
	};
}
function dn(e) {
	return Math.max(Number(e && e.left) || 0, Number(e && e.right) || 0);
}
function fn(e, t, n, r, i, a, o, s = 0) {
	let c = Math.max(0, Number(t) || 0), l = Math.max(0, Number(a.leftMaxMask === void 0 ? c : a.leftMaxMask) || 0), u = Math.max(0, Number(a.rightMaxMask === void 0 ? c : a.rightMaxMask) || 0), d = Number.isFinite(Number(a.rawLeft)) ? Number(a.rawLeft) : (Number(n) || 0) - (Number(i) || 0), f = Number.isFinite(Number(a.rawRight)) ? Number(a.rawRight) : (Number(r) || 0) - (Number(i) || 0), p = Number(s) || 0, m = Math.max(1, Math.min(4, Math.round(p || 1))), h = p > 0, g = (Number(i) || 0) < 0 || h || !!a.allowRawRightMask;
	return {
		rawLeft: d,
		rawRight: f,
		leftMaxMask: l,
		rightMaxMask: u,
		left: Math.max(0, Math.min(Number(e && e.left) || 0, l)),
		right: Math.max(0, Math.min(Number(e && e.right) || 0, u)),
		nextPageStep: Number(a.nextPageStep === void 0 ? o : a.nextPageStep) || 0,
		previousPageStep: Number(a.previousPageStep) || 0,
		forceRawLeftMask: !!a.forceRawLeftMask,
		allowRawLeftMask: !!a.allowRawLeftMask,
		edgeTolerance: m,
		hasStructuralEdgeGuard: h,
		canExpandClippedRawRight: g,
		rightPaintGuardMax: Math.min(c, Math.max(u, m))
	};
}
function pn(e, t, n, r, i, a, o) {
	let s = Math.max(0, Number(e) || 0), c = Math.max(0, Number(n) || 0), l = Number(t) || 0;
	if (!l) return s;
	let u = l > 0 ? o ? c : Math.max(0, Number(a) || 0) : Math.max(Math.max(0, Number(r) || 0), Math.max(0, Number(i) || 0), s + l);
	return Math.max(0, Math.min(u, s + l));
}
function mn(e, t, n) {
	let r = Math.max(0, Number(e) || 0), i = Number(t) || 0;
	return i ? Math.max(0, Math.min(Math.max(0, Number(n) || 0), r + i)) : r;
}
//#endregion
//#region src/rendering/raw-right-snap.ts
function hn(e, t, n, r, i, a, o, s) {
	let c = Math.max(0, Number(e) || 0), l = Number(t) || 0, u = Number(n) || 0, d = Number(r) || 0, f = Number(i) || 0, p = Number(a) || 0, m = Number(o) || 0, h = Math.max(0, Number(s) || 0);
	if (!(l < f && u > f) || m > 0 && l < p && u > p) return c;
	let g = u - f, _ = f - Math.max(l, d);
	return _ > h && g > Math.max(h, 4) ? Math.max(c, Math.ceil(_ + 1)) : c;
}
function gn(e, t, n, r, i, a, o = 0) {
	let s = Math.max(0, Number(o) || 0);
	for (let o of e || []) s = hn(s, o.left, o.right, t, n, r, i, a);
	return s;
}
function _n(e, t, n, r, i, a) {
	let o = Number(e) || 0, s = Number(t) || 0, c = Number(n) || 0, l = Number(r) || 0, u = Number(i) || 0, d = Number(a) || 0, f = o < l && s > l;
	return {
		clippedAtPreviousLeft: d > 0 && o < u && s > u,
		rawRightStraddler: f,
		rawRightOverhang: f ? s - l : 0,
		visibleInsideRawRight: f ? l - Math.max(o, c) : 0
	};
}
function vn(e, t, n, r, i) {
	let a = Number(n) || 0, o = Number(t) || 0, s = Number(r) || 0, c = Number(i) || 0;
	return !!(e && o < a && a <= Math.max(o, s) + c);
}
function yn(e, t, n) {
	let r = Number(e) || 0, i = Number(t) || 0, a = Math.max(0, Number(n) || 0);
	return r < i || r - i > a ? 0 : Math.ceil(Math.min(a, r - i + a));
}
function bn(e, t, n) {
	let r = Math.max(0, Number(t) || 0), i = Math.max(0, Number(n) || 0);
	return !e || r > i ? 0 : Math.ceil(r + 1);
}
function xn(e, t, n, r, i, a) {
	let o = Number(t) || 0, s = Math.max(0, Number(n) || 0), c = Math.max(0, Number(i) || 0), l = Number(a) || 0;
	return !!(e && (o <= Math.max(s, 4) || r && (c <= 0 || l <= 0)));
}
function Sn(e, t, n, r, i, a, o) {
	let s = Math.max(0, Number(t) || 0), c = Math.max(0, Number(n) || 0), l = Math.max(0, Number(r) || 0), u = Math.max(0, Number(i) || 0), d = Math.max(0, Number(a) || 0), f = Number(o) || 0;
	return !!(e && s > c && l >= s && u >= s && (d <= 0 || f <= 0));
}
function Cn(e, t, n) {
	let r = Math.max(0, Number(t) || 0), i = Math.max(0, Number(n) || 0);
	return !e || r <= i ? 0 : Math.ceil(r + 1);
}
function wn(e, t, n) {
	let r = Number(e) || 0, i = Number(t) || 0, a = Number(n) || 0;
	return r >= a || i <= a ? 0 : Math.ceil(a - r + 1);
}
function Tn(e, t, n) {
	let r = Math.max(0, Number(e) || 0), i = Number(t) || 0, a = Number(n) || 0, o = Math.max(0, Math.floor(a - Math.min(i, a)));
	return Math.max(r, o);
}
function En(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
	let m = Number(e) || 0, h = Number(t) || 0, g = Number(n) || 0, _ = Number(r) || 0, v = Math.max(0, Number(i) || 0);
	if (a && h > _ && m < g) {
		let e = Tn(d, h, g);
		return {
			shift: e < v ? e - v : 0,
			expandBeyondPaintGuard: !1
		};
	}
	let y = yn(m, g, l);
	if (y > 0) return {
		shift: y > v ? y - v : 0,
		expandBeyondPaintGuard: !1
	};
	let b = bn(o, c, l);
	if (b > 0) return {
		shift: b > v ? b - v : 0,
		expandBeyondPaintGuard: !1
	};
	if (xn(o, s, l, vn(o, v, c, u, l), d, f) || Sn(o, c, l, v, u, d, f)) return {
		shift: v > 0 ? -v : 0,
		expandBeyondPaintGuard: !1
	};
	let x = Cn(o, c, l);
	if (x > 0) {
		let e = p && x > v;
		return {
			shift: e ? x - v : 0,
			expandBeyondPaintGuard: e
		};
	}
	return {
		shift: wn(m, h, _),
		expandBeyondPaintGuard: !1
	};
}
function Dn(e, t, n, r, i, a, o, s, c, l, u, d, f) {
	let { clippedAtPreviousLeft: p, rawRightStraddler: m, rawRightOverhang: h, visibleInsideRawRight: g } = _n(e, t, n, r, i, a);
	return En(e, t, r, o, s, p, m, h, g, c, l, u, d, f);
}
function On(e, t, n, r) {
	let i = Number(r.shift) || 0, a = Number(e) || 0, o = Number(t) || 0;
	return i < 0 ? {
		expand: a,
		shrink: Math.min(o, i),
		expandBeyondPaintGuard: n
	} : i > 0 ? {
		expand: Math.max(a, i),
		shrink: o,
		expandBeyondPaintGuard: n || r.expandBeyondPaintGuard
	} : {
		expand: a,
		shrink: o,
		expandBeyondPaintGuard: n
	};
}
function kn(e, t, n, r, i, a, o, s, c, l, u, d) {
	let f = 0, p = 0, m = !1;
	for (let h of e || []) {
		let e = Dn(h.left, h.right, t, n, a, o, r, i, s, c, l, u, d), g = On(f, p, m, e);
		f = g.expand, p = g.shrink, m = g.expandBeyondPaintGuard;
	}
	return {
		expand: f,
		shrink: p,
		expandBeyondPaintGuard: m
	};
}
function An(e, t, n, r, i, a, o, s, c, l, u) {
	let d = n - r, f = t + i, p = gn(e, t, n, f, i, a), m = kn(e, t, n, d, r, f, i, a, s, p, l, u);
	return {
		shift: m.shrink < 0 ? m.shrink : m.expand,
		right: pn(r, m.shrink < 0 ? m.shrink : m.expand, o, s, p, c, m.expandBeyondPaintGuard),
		requiredRawRightMask: p,
		expandBeyondPaintGuard: m.expandBeyondPaintGuard
	};
}
//#endregion
//#region src/rendering/raw-left-snap.ts
function jn(e, t, n, r, i, a) {
	let o = Number(e) || 0, s = Number(t) || 0, c = Number(n) || 0, l = Number(r) || 0, u = Number(i) || 0, d = Number(a) || 0, f = s + u, p = u > 0;
	return {
		rawLeftStraddler: o < c && s > c,
		hasNextPage: p,
		clippedAtNextRight: !p || f > l,
		visibleAtNextRight: p && f <= l,
		nearlyVisibleAtNextRight: p && f <= l + d
	};
}
function Mn(e, t, n, r, i, a, o, s) {
	let c = Number(e) || 0, l = Number(t) || 0, u = Number(n) || 0, d = Math.max(0, Number(r) || 0);
	if (c >= u || l <= u) return 0;
	let f = Math.ceil(l - u + 1), p = Math.ceil(u - c + 1);
	return i && (a || o || s) ? f : p > 0 && d - p >= 0 ? -p : f;
}
function Nn(e, t, n, r, i, a, o, s, c, l, u, d) {
	let f = Number(e) || 0, p = Number(t) || 0, m = Number(n) || 0, h = Number(r) || 0, g = Math.max(0, Number(i) || 0);
	if (g <= 0 || p <= m || f >= h || p > h || a && o || (a ? s || c && l || u : l) || a && !d) return 0;
	let _ = Math.max(0, Math.floor(Math.max(f, m) - m - 1));
	return _ < g ? _ - g : 0;
}
function Pn(e, t, n, r, i, a, o) {
	let s = Number(e) || 0, c = Number(t) || 0, l = Number(n) || 0, u = Number(r) || 0, d = Math.max(0, Number(i) || 0), f = Math.max(0, Number(o) || 0);
	if (d <= 0 || !a || s < u || s - u > f) return 0;
	let p = Math.ceil(c - l + 1);
	return p > d ? p - d : 0;
}
function Fn(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
	let m = Math.max(0, Number(i) || 0);
	if (m <= 0 && a && s && !u && !d) return 0;
	let h = Mn(e, t, r, m, o, c, l, d);
	if (h) return h;
	let g = Nn(e, t, n, r, m, a, u, c, f, l, d, s);
	return g < 0 ? g : Pn(e, t, n, r, m, c, p);
}
function In(e, t) {
	let n = Number(e) || 0, r = Number(t) || 0;
	return r > 0 ? Math.max(n, r) : r < 0 ? Math.min(n, r) : n;
}
function Ln(e, t, n, r, i, a, o, s, c, l) {
	let u = 0;
	for (let d of e || []) {
		let { rawLeftStraddler: e, hasNextPage: f, clippedAtNextRight: p, visibleAtNextRight: m, nearlyVisibleAtNextRight: h } = jn(d.left, d.right, t, n, a, l), g = Fn(d.left, d.right, t, r, i, e, f, p, m, h, o, s, c, l);
		u = In(u, g);
	}
	return u;
}
function Rn(e, t, n, r, i, a, o, s, c, l) {
	let u = Ln(e, t, n, t + r, r, a, o, s, c, l);
	return {
		shift: u,
		left: mn(r, u, i)
	};
}
//#endregion
//#region src/rendering/boundary-mask.ts
function zn(e, t, n, r) {
	let i = Number(e) - Number(t) - Number(n) + (Number(r) || 0);
	return Number.isFinite(i) && i > 0 ? i : null;
}
function Bn(e, t, n, r, i, a, o, s) {
	let c = Number(t), l = Number(e) || 0;
	if (Number.isFinite(c) && c > 0) return {
		pageIndex: l,
		maxRightBoundary: c,
		preferredRightBoundary: c
	};
	let u = Number(a) || 0, d = Number(o) || 0, f = Number(s) || 0, p = f > 0 && Math.max(0, u - d) <= 1, m = zn(n, r, u, f);
	return m !== null && (Math.abs((Number(r) || 0) - (Number(i) || 0)) > 1 || p) ? {
		pageIndex: l,
		maxRightBoundary: m,
		preferredRightBoundary: m
	} : null;
}
function Vn(e = {}) {
	return !!(e.iframe && e.document && e.window && e.body && e.contentWidth && e.visibleWidth && typeof e.document.createTreeWalker == "function");
}
function Hn(e = {}) {
	let t = Number(e && e.maxRightBoundary), n = Number(e && e.preferredRightBoundary);
	return {
		maxRightBoundary: t,
		hasMaxRightBoundary: Number.isFinite(t),
		preferredRightBoundary: n,
		hasPreferredRightBoundary: Number.isFinite(n)
	};
}
function Un(e) {
	return {
		hasMaxRightBoundary: e.hasMaxRightBoundary,
		maxRightBoundary: e.maxRightBoundary
	};
}
function Wn(e) {
	return {
		...Un(e),
		hasPreferredRightBoundary: e.hasPreferredRightBoundary,
		preferredRightBoundary: e.preferredRightBoundary
	};
}
function Gn(e, t) {
	return e && e.key === t ? e.value : null;
}
function Kn(e, t, n) {
	return n ? {
		key: e,
		value: t
	} : null;
}
function qn(e, t, n, r = {}) {
	let i = Number(t) || 0, a = Number(n) || 0, o = Number(e) || 0, s = Number(r.preferredRightBoundary), c = Number(r.maxRightBoundary);
	if (r.hasPreferredRightBoundary) {
		let e = Math.max(0, s);
		r.hasMaxRightBoundary && (e = Math.min(e, c)), s = e, o = Math.max(0, Math.min(i, a - e));
	}
	return r.hasMaxRightBoundary && (o = Math.max(o, Math.max(0, Math.min(i, a - c)))), {
		logicalOffset: o,
		preferredRightBoundary: s
	};
}
function Jn(e, t, n, r, i, a = {}) {
	let o = (e) => Math.round((Number(e) || 0) * 100) / 100;
	return [
		o(e),
		o(t),
		o(n),
		o(r),
		Number(i) || 0,
		a.hasMaxRightBoundary ? o(Number(a.maxRightBoundary)) : "none",
		a.hasPreferredRightBoundary ? o(Number(a.preferredRightBoundary)) : "none"
	].join(":");
}
function Yn(e, t, n, r, i, a, o = {}) {
	let s = Jn(t, n, r, i, a, o);
	return {
		cacheKey: s,
		cachedSnap: Gn(e, s)
	};
}
function Xn(e, t, n, r, i, a, o = {}, s = {}) {
	let c = Hn(o), l = qn(t, n, r, Wn(c));
	c.preferredRightBoundary = l.preferredRightBoundary;
	let u = Wn(c), d = Un(c), f = Vn({
		...s,
		contentWidth: r,
		visibleWidth: i
	});
	return {
		cacheLookup: f ? Yn(e, l.logicalOffset, n, r, i, a, u) : null,
		logicalOffset: l.logicalOffset,
		maxRightBoundaryOptions: d,
		rightBoundaryLimits: c,
		rightBoundaryOptions: u,
		shouldMeasureText: f
	};
}
function Zn(e, t, n) {
	let r = Number(e) || 0, i = Number(t) || 0, a = Number(n) || 0, o = i - r, s = o - a, c = r, l = r + a;
	return [{
		left: s,
		right: o
	}, {
		left: c,
		right: l
	}];
}
function Qn(e) {
	return Math.max(1, Math.min(8, Math.round(Number(e) || 2)));
}
function $n(e) {
	return Number(e) || 0;
}
function er(e) {
	return {
		edgeGuard: Qn(e),
		rawEdgeGuard: $n(e)
	};
}
function tr(e, t) {
	let n = Number(e) || 0;
	return n - (Number(t) || n);
}
function nr(e) {
	return {
		left: Number(e && e.left) || 0,
		right: Number(e && e.right) || 0
	};
}
function rr(e, t, n, r, i) {
	let a = er(e);
	return {
		edgeGuard: a.edgeGuard,
		edgeGuardPx: a.rawEdgeGuard,
		structuralMasks: nr(t),
		boundaryShift: i,
		structuralBleed: tr(n, r)
	};
}
function ir(e, t, n, r, i, a, o, s) {
	let c = Number(e) || 0, l = Number(t) || 0, u = Number(n) || 0, d = rn(c);
	if (!c || l <= 1 || u <= 0 || !d) return null;
	let f = Math.abs((Number(r) || 0) - (Number(i) || 0)) || c, p = Number.isFinite(Number(s)) && Number(s) === u || Math.abs((Number(a) || 0) - (Number(o) || 0)) > 1;
	return {
		widths: {
			left: 0,
			right: 0
		},
		maxMask: d,
		nextPageStep: f,
		previousPageStep: f,
		rightMaxMask: d,
		allowRawRightMask: !0,
		allowRawLeftMask: u === l - 2,
		forceRawLeftMask: p
	};
}
function ar(e, t, n, r, i, a) {
	let o = Number(e) || 0, s = Math.max(0, Number(n) || 0);
	if (!o || !s) return null;
	let c = (Number(r) || 0) - (Number(a) || 0) + o, l = (Number(i) || 0) - (Number(a) || 0) + o;
	return {
		widths: {
			left: Math.min(Number(t) || 0, s),
			right: 0
		},
		maxMask: s,
		rawLeft: c,
		rawRight: l,
		nextPageStep: o,
		rightMaxMask: 0
	};
}
function or(e, t, n, r) {
	let i = Number(r) || 0, a = Number(t) || 0, o = Number(n) || 0, s = Number(e) || 0, c = o - i;
	if (!i || !a || !o || c <= 1) return null;
	let l = a - s, u = l - o, d = rn(i);
	return {
		widths: {
			left: Math.min(Math.ceil(c), d),
			right: 0
		},
		maxMask: d,
		rawLeft: u,
		rawRight: l,
		nextPageStep: i,
		rightMaxMask: 0
	};
}
function sr(e, t, n, r) {
	return t < n ? n - t : e > r ? e - r : 0;
}
function cr(e, t, n, r, i, a, o, s = .5) {
	let c = Number(e) || 0, l = Number(t) || 0, u = Number(n) || 0, d = Number(r) || 0;
	if ((Number(o) || 0) >= 0) return {
		left: c,
		right: l
	};
	let f = sr(c, l, i, a);
	return sr(u, d, i, a) + (Number(s) || 0) < f ? {
		left: u,
		right: d
	} : {
		left: c,
		right: l
	};
}
function lr(e, t, n, r, i = .5) {
	let a = Number(e && e.left) || 0, o = Number(e && e.right) || 0, s = cr(a, o, a - (Number(r) || 0), o - (Number(r) || 0), t, n, r, i);
	return {
		...e,
		left: s.left,
		right: s.right
	};
}
function ur(e, t, n, r, i = .5) {
	return (e || []).map((e) => lr(e, t, n, r, i));
}
function dr(e, t, n, r, i, a = .5) {
	let o = Number(e) || 0, s = Number(t) || 0, c = Number(n) || 0, l = Number(r) || 0, u = (Array.isArray(i) ? i : []).map((e) => ({
		left: Number(e && e.left),
		right: Number(e && e.right)
	})).filter((e) => Number.isFinite(e.left) && Number.isFinite(e.right) && e.right >= e.left);
	if (!u.length) return {
		left: o,
		right: s
	};
	let d = Math.min(...u.map((e) => sr(o, s, e.left, e.right)));
	return Math.min(...u.map((e) => sr(c, l, e.left, e.right))) + (Number(a) || 0) < d ? {
		left: c,
		right: l
	} : {
		left: o,
		right: s
	};
}
function fr(e, t, n, r = .5) {
	let i = Number(e && e.left) || 0, a = Number(e && e.right) || 0, o = dr(i, a, i - (Number(t) || 0), a - (Number(t) || 0), n, r);
	return {
		...e,
		left: o.left,
		right: o.right
	};
}
function pr(e, t, n, r = .5) {
	return (e || []).map((e) => fr(e, t, n, r));
}
function mr(e, t, n, r, i, a = .5) {
	return pr(e, t, Zn(n, r, i), a);
}
function hr(e, t, n, r, i, a, o, s, c, l = .5) {
	return {
		rects: mr(e, t, n, r, i, l),
		deltaInputs: rr(a, o, i, s, c)
	};
}
function gr(e, t, n) {
	let r = 0;
	for (let i of e || []) (i.left < t && i.right > t || i.left < n && i.right > n) && (r += 1);
	return r;
}
function _r(e, t, n, r, i, a, o, s = {}) {
	let c = [], l = (e) => e < 0 ? Math.floor(e) : Math.ceil(e), u = (t) => {
		let n = (e || []).filter((e) => e.left < t && e.right > t);
		if (!n.length) return;
		let i = Math.min(...n.map((e) => e.left)), a = Math.max(...n.map((e) => e.right));
		c.push(l((i - o - t) / r)), c.push(l((a + o - t) / r));
	}, d = gr(e, t, n), f = null;
	if (d > 0) {
		u(t), u(n);
		let o = Array.from(new Set(c.filter((e) => Number.isFinite(e) && e !== 0)));
		for (let c of o) {
			let o = Math.max(0, Math.min(a, i + c)), l = o - i;
			if (!l || s.hasMaxRightBoundary && r < 0 && (Number(s.contentWidth) || 0) - o > (Number(s.maxRightBoundary) || 0) + 1) continue;
			let u = r * l, d = gr(e, t + u, n + u), p = Math.abs(l);
			(!f || d < f.score || d === f.score && p < f.distance) && (f = {
				delta: l,
				distance: p,
				score: d
			});
		}
	}
	return f && f.score < d ? {
		delta: f.delta,
		distance: f.distance,
		initialCrossings: d,
		score: f.score
	} : {
		delta: 0,
		distance: 0,
		initialCrossings: d,
		score: d
	};
}
function vr(e) {
	return (e || []).filter((e) => e && e.delta).sort(function(e, t) {
		return e.score === t.score ? e.model === t.model ? e.distance - t.distance : e.model === "right-origin" ? -1 : 1 : e.score - t.score;
	})[0] || null;
}
function yr(e, t, n, r, i, a, o, s, c = {}) {
	let l = Number(t) || 0, u = Number(n) || 0, d = Number(r) || 0, f = Number(o) || 0, p = Number(s) || 0, m = u - l, h = _r(e, m - d + f, m - p, -1, l, i, a, {
		hasMaxRightBoundary: c.hasMaxRightBoundary,
		maxRightBoundary: c.maxRightBoundary,
		contentWidth: u
	});
	h.model = "right-origin";
	let g = _r(e, l + f, l + d - p, 1, l, i, a, {
		hasMaxRightBoundary: c.hasMaxRightBoundary,
		maxRightBoundary: c.maxRightBoundary,
		contentWidth: u
	});
	return g.model = "left-origin", {
		rightOriginSnap: h,
		leftOriginSnap: g
	};
}
function br(e, t, n, r) {
	let i = Number(e) || 0, a = Number(t) || 0, o = Number(n) || 0, s = Number(r) || 0;
	return i > 0 && a > 0 && o > 0 && s > 1 && Math.abs(a - o) <= 1 ? Math.min(i, Math.max(1, Math.floor(o / 2))) : i;
}
function xr(e, t, n, r, i, a, o, s, c, l, u, d = {}) {
	let f = yr(e, t, n, r, i, a, o, s, d), p = vr([f.rightOriginSnap, f.leftOriginSnap]);
	return br(p ? p.delta : 0, c, l, u);
}
function Sr(e, t, n, r, i = {}) {
	let a = Number(t) || 0, o = Number(n) || 0, s = Number(r) || 0, c = Number(e) || 0, l = c ? Math.max(0, Math.min(o, a + c)) : a;
	if (i.hasPreferredRightBoundary) {
		let e = Number(i.preferredRightBoundary) || 0;
		s - l < e - 1 && (l = Math.min(l, Math.max(0, Math.min(o, s - e))));
	}
	if (i.hasMaxRightBoundary) {
		let e = Number(i.maxRightBoundary) || 0;
		s - l > e + 1 && (l = Math.max(l, Math.max(0, Math.min(o, s - e))));
	}
	return l;
}
function Cr(e, t, n, r, i, a = {}) {
	let o = Sr(t, n, r, i, a);
	return {
		cacheEntry: Kn(e, o, t),
		snapped: o
	};
}
function wr(e, t, n, r, i, a, o = {}, s = {}) {
	return Cr(e, xr(t.rects, n, r, i, a, t.deltaInputs.edgeGuard, t.deltaInputs.structuralMasks.left, t.deltaInputs.structuralMasks.right, t.deltaInputs.boundaryShift, t.deltaInputs.edgeGuardPx, t.deltaInputs.structuralBleed, o), n, a, r, s);
}
//#endregion
//#region node_modules/lodash/isObject.js
var Tr = /* @__PURE__ */ o(((e, t) => {
	function n(e) {
		var t = typeof e;
		return e != null && (t == "object" || t == "function");
	}
	t.exports = n;
})), Er = /* @__PURE__ */ o(((e, t) => {
	t.exports = typeof global == "object" && global && global.Object === Object && global;
})), Dr = /* @__PURE__ */ o(((e, t) => {
	var n = Er(), r = typeof self == "object" && self && self.Object === Object && self;
	t.exports = n || r || Function("return this")();
})), Or = /* @__PURE__ */ o(((e, t) => {
	var n = Dr();
	t.exports = function() {
		return n.Date.now();
	};
})), kr = /* @__PURE__ */ o(((e, t) => {
	var n = /\s/;
	function r(e) {
		for (var t = e.length; t-- && n.test(e.charAt(t)););
		return t;
	}
	t.exports = r;
})), Ar = /* @__PURE__ */ o(((e, t) => {
	var n = kr(), r = /^\s+/;
	function i(e) {
		return e && e.slice(0, n(e) + 1).replace(r, "");
	}
	t.exports = i;
})), jr = /* @__PURE__ */ o(((e, t) => {
	t.exports = Dr().Symbol;
})), Mr = /* @__PURE__ */ o(((e, t) => {
	var n = jr(), r = Object.prototype, i = r.hasOwnProperty, a = r.toString, o = n ? n.toStringTag : void 0;
	function s(e) {
		var t = i.call(e, o), n = e[o];
		try {
			e[o] = void 0;
			var r = !0;
		} catch {}
		var s = a.call(e);
		return r && (t ? e[o] = n : delete e[o]), s;
	}
	t.exports = s;
})), Nr = /* @__PURE__ */ o(((e, t) => {
	var n = Object.prototype.toString;
	function r(e) {
		return n.call(e);
	}
	t.exports = r;
})), Pr = /* @__PURE__ */ o(((e, t) => {
	var n = jr(), r = Mr(), i = Nr(), a = "[object Null]", o = "[object Undefined]", s = n ? n.toStringTag : void 0;
	function c(e) {
		return e == null ? e === void 0 ? o : a : s && s in Object(e) ? r(e) : i(e);
	}
	t.exports = c;
})), Fr = /* @__PURE__ */ o(((e, t) => {
	function n(e) {
		return typeof e == "object" && !!e;
	}
	t.exports = n;
})), Ir = /* @__PURE__ */ o(((e, t) => {
	var n = Pr(), r = Fr(), i = "[object Symbol]";
	function a(e) {
		return typeof e == "symbol" || r(e) && n(e) == i;
	}
	t.exports = a;
})), Lr = /* @__PURE__ */ o(((e, t) => {
	var n = Ar(), r = Tr(), i = Ir(), a = NaN, o = /^[-+]0x[0-9a-f]+$/i, s = /^0b[01]+$/i, c = /^0o[0-7]+$/i, l = parseInt;
	function u(e) {
		if (typeof e == "number") return e;
		if (i(e)) return a;
		if (r(e)) {
			var t = typeof e.valueOf == "function" ? e.valueOf() : e;
			e = r(t) ? t + "" : t;
		}
		if (typeof e != "string") return e === 0 ? e : +e;
		e = n(e);
		var u = s.test(e);
		return u || c.test(e) ? l(e.slice(2), u ? 2 : 8) : o.test(e) ? a : +e;
	}
	t.exports = u;
})), Rr = /* @__PURE__ */ o(((e, t) => {
	var n = Tr(), r = Or(), i = Lr(), a = "Expected a function", o = Math.max, s = Math.min;
	function c(e, t, c) {
		var l, u, d, f, p, m, h = 0, g = !1, _ = !1, v = !0;
		if (typeof e != "function") throw TypeError(a);
		t = i(t) || 0, n(c) && (g = !!c.leading, _ = "maxWait" in c, d = _ ? o(i(c.maxWait) || 0, t) : d, v = "trailing" in c ? !!c.trailing : v);
		function y(t) {
			var n = l, r = u;
			return l = u = void 0, h = t, f = e.apply(r, n), f;
		}
		function b(e) {
			return h = e, p = setTimeout(C, t), g ? y(e) : f;
		}
		function x(e) {
			var n = e - m, r = e - h, i = t - n;
			return _ ? s(i, d - r) : i;
		}
		function S(e) {
			var n = e - m, r = e - h;
			return m === void 0 || n >= t || n < 0 || _ && r >= d;
		}
		function C() {
			var e = r();
			if (S(e)) return w(e);
			p = setTimeout(C, x(e));
		}
		function w(e) {
			return p = void 0, v && l ? y(e) : (l = u = void 0, f);
		}
		function T() {
			p !== void 0 && clearTimeout(p), h = 0, l = m = u = p = void 0;
		}
		function E() {
			return p === void 0 ? f : w(r());
		}
		function D() {
			var e = r(), n = S(e);
			if (l = arguments, u = this, m = e, n) {
				if (p === void 0) return b(m);
				if (_) return clearTimeout(p), p = setTimeout(C, t), y(m);
			}
			return p === void 0 && (p = setTimeout(C, t)), f;
		}
		return D.cancel = T, D.flush = E, D;
	}
	t.exports = c;
})), zr = /* @__PURE__ */ l((/* @__PURE__ */ o(((e, t) => {
	var n = Rr(), r = Tr(), i = "Expected a function";
	function a(e, t, a) {
		var o = !0, s = !0;
		if (typeof e != "function") throw TypeError(i);
		return r(a) && (o = "leading" in a ? !!a.leading : o, s = "trailing" in a ? !!a.trailing : s), n(e, t, {
			leading: o,
			maxWait: t,
			trailing: s
		});
	}
	t.exports = a;
})))()), Br = class {
	settings;
	id;
	container;
	wrapper;
	element;
	resizeFunc;
	orientationChangeFunc;
	containerStyles;
	containerPadding;
	sheet;
	constructor(e) {
		this.settings = e || {}, this.id = "epubjs-container-" + M(), this.container = this.create(this.settings), this.settings.hidden && (this.wrapper = this.wrap(this.container));
	}
	create(e) {
		let t = e.height, n = e.width, r = e.overflow || !1, i = e.axis || "vertical", a = e.direction;
		I(this.settings, e), e.height && G(e.height) && (t = e.height + "px"), e.width && G(e.width) && (n = e.width + "px");
		let o = document.createElement("div");
		return o.id = this.id, o.classList.add("epub-container"), o.style.wordSpacing = "0", o.style.lineHeight = "0", o.style.verticalAlign = "top", o.style.position = "relative", i === "horizontal" && (o.style.display = "flex", o.style.flexDirection = "row", o.style.flexWrap = "nowrap"), n && (o.style.width = n), t && (o.style.height = t), r && (r === "scroll" && i === "vertical" ? (o.style.overflowY = r, o.style.overflowX = "hidden") : r === "scroll" && i === "horizontal" ? (o.style.overflowY = "hidden", o.style.overflowX = r) : o.style.overflow = r), a && (o.dir = a, o.style.direction = a), a && this.settings.fullsize && (document.body.style.direction = a), o;
	}
	wrap(e) {
		var t = document.createElement("div");
		return t.style.visibility = "hidden", t.style.overflow = "hidden", t.style.width = "0", t.style.height = "0", t.appendChild(e), t;
	}
	getElement(e) {
		var t;
		if (pe(e) ? t = e : typeof e == "string" && (t = document.getElementById(e)), !t) throw Error("Not an Element");
		return t;
	}
	attachTo(e) {
		var t = this.getElement(e), n;
		if (t) return n = this.settings.hidden ? this.wrapper : this.container, t.appendChild(n), this.element = t, t;
	}
	getContainer() {
		return this.container;
	}
	onResize(e) {
		(!G(this.settings.width) || !G(this.settings.height)) && (this.resizeFunc = (0, zr.default)(e, 50), window.addEventListener("resize", this.resizeFunc, !1));
	}
	onOrientationChange(e) {
		this.orientationChangeFunc = e, window.addEventListener("orientationchange", this.orientationChangeFunc, !1);
	}
	size(e, t) {
		var n;
		let r = e || this.settings.width, i = t || this.settings.height;
		if (e === null ? (n = this.element.getBoundingClientRect(), n.width && (e = Math.floor(n.width), this.container.style.width = e + "px")) : G(e) ? this.container.style.width = e + "px" : this.container.style.width = e, t === null ? (n ||= this.element.getBoundingClientRect(), n.height && (t = n.height, this.container.style.height = t + "px")) : G(t) ? this.container.style.height = t + "px" : this.container.style.height = t, !G(e)) {
			let t = this.container && this.container.getBoundingClientRect ? this.container.getBoundingClientRect() : null;
			e = t && t.width ? t.width : this.container.clientWidth;
		}
		G(t) || (t = this.container.clientHeight), this.containerStyles = window.getComputedStyle(this.container), this.containerPadding = {
			left: parseFloat(this.containerStyles.paddingLeft) || 0,
			right: parseFloat(this.containerStyles.paddingRight) || 0,
			top: parseFloat(this.containerStyles.paddingTop) || 0,
			bottom: parseFloat(this.containerStyles.paddingBottom) || 0
		};
		let a = gt(), o = window.getComputedStyle(document.body), s = {
			left: parseFloat(o.paddingLeft) || 0,
			right: parseFloat(o.paddingRight) || 0,
			top: parseFloat(o.paddingTop) || 0,
			bottom: parseFloat(o.paddingBottom) || 0
		};
		return r || (e = a.width - s.left - s.right), (this.settings.fullsize && !i || !i) && (t = a.height - s.top - s.bottom), {
			width: e - this.containerPadding.left - this.containerPadding.right,
			height: t - this.containerPadding.top - this.containerPadding.bottom
		};
	}
	bounds() {
		let e;
		return this.container.style.overflow !== "visible" && (e = this.container && this.container.getBoundingClientRect()), !e || !e.width || !e.height ? gt() : e;
	}
	getSheet() {
		var e = document.createElement("style");
		return e.appendChild(document.createTextNode("")), document.head.appendChild(e), e.sheet;
	}
	addStyleRules(e, t) {
		var n = "#" + this.id + " ", r = "";
		this.sheet ||= this.getSheet(), t.forEach(function(e) {
			for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && (r += t + ":" + e[t] + ";");
		}), this.sheet.insertRule(n + e + " {" + r + "}", 0);
	}
	axis(e) {
		e === "horizontal" ? (this.container.style.display = "flex", this.container.style.flexDirection = "row", this.container.style.flexWrap = "nowrap") : this.container.style.display = "block", this.settings.axis = e;
	}
	direction(e) {
		this.container && (this.container.dir = e, this.container.style.direction = e), this.settings.fullsize && (document.body.style.direction = e), this.settings.dir = e;
	}
	overflow(e) {
		this.container && (e === "scroll" && this.settings.axis === "vertical" ? (this.container.style.overflowY = e, this.container.style.overflowX = "hidden") : e === "scroll" && this.settings.axis === "horizontal" ? (this.container.style.overflowY = "hidden", this.container.style.overflowX = e) : this.container.style.overflow = e), this.settings.overflow = e;
	}
	destroy() {
		this.element && (this.element.contains(this.container) && this.element.removeChild(this.container), window.removeEventListener("resize", this.resizeFunc), window.removeEventListener("orientationchange", this.orientationChangeFunc));
	}
}, Vr = class {
	container;
	_views;
	length;
	hidden;
	constructor(e) {
		this.container = e, this._views = [], this.length = 0, this.hidden = !1;
	}
	all() {
		return this._views;
	}
	first() {
		return this._views[0];
	}
	last() {
		return this._views[this._views.length - 1];
	}
	indexOf(e) {
		return this._views.indexOf(e);
	}
	slice(...e) {
		return this._views.slice.apply(this._views, e);
	}
	get(e) {
		return this._views[e];
	}
	append(e) {
		return this._views.push(e), this.container && this.container.appendChild(e.element), this.length++, e;
	}
	prepend(e) {
		return this._views.unshift(e), this.container && this.container.insertBefore(e.element, this.container.firstChild), this.length++, e;
	}
	insert(e, t) {
		return this._views.splice(t, 0, e), this.container && (t < this.container.children.length ? this.container.insertBefore(e.element, this.container.children[t]) : this.container.appendChild(e.element)), this.length++, e;
	}
	remove(e) {
		var t = this._views.indexOf(e);
		t > -1 && this._views.splice(t, 1), this.destroy(e), this.length--;
	}
	destroy(e) {
		e.destroy(), this.container && this.container.removeChild(e.element), e = null;
	}
	forEach(...e) {
		return this._views.forEach.apply(this._views, e);
	}
	clear() {
		var e, t = this.length;
		if (this.length) {
			for (var n = 0; n < t; n++) e = this._views[n], this.destroy(e);
			this._views = [], this.length = 0;
		}
	}
	find(e) {
		for (var t, n = this.length, r = 0; r < n; r++) if (t = this._views[r], t.displayed && t.section.index == e.index) return t;
	}
	displayed() {
		for (var e = [], t, n = this.length, r = 0; r < n; r++) t = this._views[r], t.displayed && e.push(t);
		return e;
	}
	show() {
		for (var e, t = this.length, n = 0; n < t; n++) e = this._views[n], e.displayed && e.show();
		this.hidden = !1;
	}
	hide() {
		for (var e, t = this.length, n = 0; n < t; n++) e = this._views[n], e.displayed && e.hide();
		this.hidden = !0;
	}
}, Hr = N, Ur = class {
	constructor(e) {
		this.name = "default", this.optsSettings = e.settings, this.View = e.view, this.request = e.request, this.renditionQueue = e.queue, this.q = new qe(this), this.settings = I(this.settings || {}, {
			infinite: !0,
			hidden: !1,
			width: void 0,
			height: void 0,
			axis: void 0,
			writingMode: void 0,
			flow: "scrolled",
			ignoreClass: "",
			fullsize: void 0,
			allowScriptedContent: !1,
			allowPopups: !1
		}), I(this.settings, e.settings || {}), this.viewSettings = {
			ignoreClass: this.settings.ignoreClass,
			axis: this.settings.axis,
			flow: this.settings.flow,
			layout: this.layout,
			method: this.settings.method,
			width: 0,
			height: 0,
			forceEvenPages: !0,
			allowScriptedContent: this.settings.allowScriptedContent,
			allowPopups: this.settings.allowPopups
		}, this.rendered = !1, this._layoutDirty = !0, this._lastLayoutStageSize = null;
	}
	render(e, t) {
		let n = e.tagName;
		this.settings.fullsize === void 0 && n && (n.toLowerCase() == "body" || n.toLowerCase() == "html") && (this.settings.fullsize = !0), this.settings.fullsize && (this.settings.overflow = "visible", this.overflow = this.settings.overflow), this.settings.size = t, this.settings.rtlScrollType = Gt(), this.stage = new Br({
			width: t.width,
			height: t.height,
			overflow: this.overflow,
			hidden: this.settings.hidden,
			axis: this.settings.axis,
			fullsize: this.settings.fullsize,
			direction: this.settings.direction
		}), this.stage.attachTo(e), this.container = this.stage.getContainer(), this.views = new Vr(this.container), this._bounds = this.bounds(), this._stageSize = this.stage.size(), this.viewSettings.width = this._stageSize.width, this.viewSettings.height = this._stageSize.height, this.stage.onResize(this.onResized.bind(this)), this.stage.onOrientationChange(this.onOrientationChange.bind(this)), this.addEventListeners(), this.layout && this.updateLayout(), this.rendered = !0;
	}
	addEventListeners() {
		var e;
		this._onUnload = function(e) {
			this.destroy();
		}.bind(this), window.addEventListener("unload", this._onUnload), e = this.settings.fullsize ? window : this.container, this._onScroll = this.onScroll.bind(this), e.addEventListener("scroll", this._onScroll);
	}
	removeEventListeners() {
		(this.settings.fullsize ? window : this.container).removeEventListener("scroll", this._onScroll), this._onScroll = void 0, window.removeEventListener("unload", this._onUnload), this._onUnload = void 0;
	}
	destroy() {
		clearTimeout(this.orientationTimeout), clearTimeout(this.resizeTimeout), clearTimeout(this.afterScrolled), this.clear(), this.removeEventListeners(), this.removeVerticalRlViewportClip(), this.stage.destroy(), this.rendered = !1;
	}
	onOrientationChange(e) {
		let { orientation: t } = window;
		this.optsSettings.resizeOnOrientationChange && this.resize(), clearTimeout(this.orientationTimeout), this.orientationTimeout = setTimeout(function() {
			this.orientationTimeout = void 0, this.optsSettings.resizeOnOrientationChange && this.resize(), this.emit($.MANAGERS.ORIENTATION_CHANGE, t);
		}.bind(this), 500);
	}
	onResized(e) {
		this.resize();
	}
	resize(e, t, n) {
		let r = this.stage.size(e, t);
		if (this.winBounds = gt(), this.orientationTimeout && this.winBounds.width === this.winBounds.height) {
			this._stageSize = void 0;
			return;
		}
		this._stageSize && this._stageSize.width === r.width && this._stageSize.height === r.height || (this._stageSize = r, this._bounds = this.bounds(), this.clear(), this.viewSettings.width = this._stageSize.width, this.viewSettings.height = this._stageSize.height, this.updateLayout(), this.emit($.MANAGERS.RESIZED, {
			width: this._stageSize.width,
			height: this._stageSize.height
		}, n || this.target));
	}
	createView(e, t) {
		return new this.View(e, I(this.viewSettings, { forceRight: t }));
	}
	handleNextPrePaginated(e, t, n) {
		let r;
		if (this.layout.name === "pre-paginated" && this.layout.divisor > 1) {
			if (e || t.index === 0) return;
			if (r = t.next(), r && !r.properties.includes("page-spread-left")) return n.call(this, r);
		}
	}
	display(e, t) {
		var n = new Hr(), r = n.promise;
		(t === e.href || G(t)) && (t = void 0), this.target = t;
		var i = this.views.find(e);
		if (i && e && this.layout.name !== "pre-paginated") {
			let e = i.offset();
			if (this.settings.direction === "ltr") this.scrollTo(e.left, e.top, !0);
			else {
				let t = i.width();
				this.scrollTo(e.left + t, e.top, !0);
			}
			if (t) {
				let e = i.locationOf(t), n = i.width();
				this.moveTo(e, n);
			}
			return n.resolve(), r;
		}
		this.clear();
		let a = !1;
		return this.layout.name === "pre-paginated" && this.layout.divisor === 2 && e.properties.includes("page-spread-right") && (a = !0), this.add(e, a).then(function(e) {
			if (t) {
				let n = e.locationOf(t), r = e.width();
				this.moveTo(n, r);
			}
		}.bind(this), (e) => {
			n.reject(e);
		}).then(function() {
			return this.handleNextPrePaginated(a, e, this.add);
		}.bind(this)).then(function() {
			this.views.show(), this.isRtlVerticalPaginated() && !t && this.scrollToLogicalPage(0), n.resolve();
		}.bind(this)), r;
	}
	afterDisplayed(e) {
		this.isRtlVerticalPaginated() && this.queueVerticalRlBoundarySnapRetryForCurrentOffset(), this.emit($.MANAGERS.ADDED, e);
	}
	afterResized(e) {
		this.syncVerticalRlViewportClip(), this.emit($.MANAGERS.RESIZE, e.section);
	}
	getVerticalRlPageIndexForOffset(e, t) {
		let n = this.getPageAdvance() || 0, r = this.views && (this.views.first() || this.views.last()), i = Math.max(t || 0, (r && r.width ? r.width() : 0) || 0, this.container.scrollWidth || 0), a = this.layout.pageWidth || this.layout.width || n, o = this.getTotalPagesForCurrentView(), s = Math.max(0, i - a), c = this.getMaxLogicalScrollLeft(), l = Math.max(0, Math.min(i, Number(e.left) || 0)), u = this.getPageSnapTolerance(), d = null, f = 0, p = Infinity;
		for (let e = 0; e < o; e++) {
			let t = this.getLogicalOffsetForPageIndex(e, o, c), n = Math.max(0, Math.min(s, s - t)), r = Math.min(i, n + a);
			if (l >= n && l <= r) return e;
			d === null && l >= n - u && l <= r + u && (d = e);
			let m = l < n ? n - l : l - r;
			m < p && (p = m, f = e);
		}
		return d === null ? f : d;
	}
	moveTo(e, t) {
		var n = 0, r = 0;
		if (!this.isPaginated) r = e.top;
		else {
			let i = this.getPageAdvance() || this.layout.delta || this.layout.width || 1;
			if (this.isRtlVerticalPaginated()) {
				this.scrollToLogicalPage(this.getVerticalRlPageIndexForOffset(e, t));
				return;
			}
			n = Math.floor(e.left / i) * i, n + i > this.container.scrollWidth && (n = Math.max(0, this.container.scrollWidth - i)), this.settings.axis === "vertical" ? (r = Math.floor(e.top / this.layout.height) * this.layout.height, r + this.layout.height > this.container.scrollHeight && (r = Math.max(0, this.container.scrollHeight - this.layout.height))) : (r = Math.floor(e.top / i) * i, r + i > this.container.scrollHeight && (r = Math.max(0, this.container.scrollHeight - i)));
		}
		this.settings.direction === "rtl" && (n += this.getPageAdvance(), n -= t), this.scrollTo(n, r, !0);
	}
	add(e, t) {
		var n = this.createView(e, t);
		return this.views.append(n), n.onDisplayed = this.afterDisplayed.bind(this), n.onResize = this.afterResized.bind(this), n.on($.VIEWS.AXIS, (e) => {
			this.updateAxis(e);
		}), n.on($.VIEWS.WRITING_MODE, (e) => {
			this.updateWritingMode(e);
		}), n.display(this.request);
	}
	append(e, t) {
		var n = this.createView(e, t);
		return this.views.append(n), n.onDisplayed = this.afterDisplayed.bind(this), n.onResize = this.afterResized.bind(this), n.on($.VIEWS.AXIS, (e) => {
			this.updateAxis(e);
		}), n.on($.VIEWS.WRITING_MODE, (e) => {
			this.updateWritingMode(e);
		}), n.display(this.request);
	}
	prepend(e, t) {
		var n = this.createView(e, t);
		return n.on($.VIEWS.RESIZED, (e) => {
			this.counter(e);
		}), this.views.prepend(n), n.onDisplayed = this.afterDisplayed.bind(this), n.onResize = this.afterResized.bind(this), n.on($.VIEWS.AXIS, (e) => {
			this.updateAxis(e);
		}), n.on($.VIEWS.WRITING_MODE, (e) => {
			this.updateWritingMode(e);
		}), n.display(this.request);
	}
	counter(e) {
		this.settings.axis === "vertical" ? this.scrollBy(0, e.heightDelta, !0) : this.scrollBy(e.widthDelta, 0, !0);
	}
	isRtlVerticalPaginated() {
		if (!(this.isPaginated && this.settings.axis === "horizontal" && this.settings.direction === "rtl")) return !1;
		let e = this.views && (this.views.first() || this.views.last()), t = e && e.contents && e.contents.writingMode ? e.contents.writingMode() : "";
		return (this.settings.writingMode || t) === "vertical-rl";
	}
	getPageAdvance() {
		return this.layout && (this.layout.effectivePageAdvance || this.layout.delta || this.layout.pageWidth || this.layout.width);
	}
	getVerticalRlEdgeMaskColor() {
		let e = this.views && (this.views.first() || this.views.last()), t = e && e.contents && e.contents.document, n = e && e.contents && e.contents.window, r = [];
		t && n && r.push(t.body, t.documentElement), this.container && typeof window < "u" && r.push(this.container);
		for (let e of r) {
			if (!e) continue;
			let t = e.ownerDocument && e.ownerDocument.defaultView ? e.ownerDocument.defaultView.getComputedStyle(e) : window.getComputedStyle(e), n = t && t.backgroundColor;
			if (n && n !== "transparent" && n !== "rgba(0, 0, 0, 0)") return n;
		}
		return "rgb(255, 255, 255)";
	}
	getVerticalRlEdgeMaskWidths() {
		let e = this.getPageAdvance() || 0, t = this.container && this.container.clientWidth || 0, n = t - e;
		if (!this.isRtlVerticalPaginated() || !e || !t) return {
			left: 0,
			right: 0
		};
		if (n <= 1) return this.getVerticalRlCleanPageEdgeMaskWidths(e);
		let r = Math.ceil(n), i = 0, a = rn(e), o = this.getTotalPagesForCurrentView(), s = this.getCurrentPageIndex(), c = 0;
		if (s > 0) {
			let e = this.getMaxLogicalScrollLeft(), t = this.getLogicalOffsetForPageIndex(s, o, e), n = this.getLogicalOffsetForPageIndex(s - 1, o, e);
			c = Math.abs(t - n);
		}
		if (on(t, e, r, this.getPageBoundaryShift(), s, c)) {
			let t = ln(r, i, a, e);
			return t ? this.snapVerticalRlEdgeMaskWidths(t.widths, t.maxMask, {
				nextPageStep: t.nextPageStep,
				rightMaxMask: t.rightMaxMask
			}) : {
				left: 0,
				right: 0
			};
		}
		if (s > 0) {
			let e = this.getPreviousVerticalRlLeftMask(c, r, a);
			i = sn(t, c, e, a);
		}
		let l = cn(r, i, a, c);
		return l ? this.snapVerticalRlEdgeMaskWidths(l.widths, l.maxMask, {
			previousPageStep: l.previousPageStep,
			rightMaxMask: l.rightMaxMask
		}) : {
			left: 0,
			right: 0
		};
	}
	getVerticalRlRenderedEdgeMaskWidths() {
		let e = this.getVerticalRlEdgeMaskWidths(), t = this.container && this.container.dataset ? this.container.dataset : {};
		return un(e, Number(t.epubVrlEdgeMaskLeft), Number(t.epubVrlEdgeMaskRight), Number(t.epubVrlEdgeMask));
	}
	getVerticalRlCurrentEffectiveLeftBoundary() {
		if (!this.isRtlVerticalPaginated() || !this.container || !this.views || !this.layout) return null;
		let e = this.views.first() || this.views.last(), t = e ? this.getVerticalRlVisualContentWidth(e) : 0, n = this.getPageAdvance() || 0, r = this.layout.pageWidth || this.layout.width || n || this.container.clientWidth || 0, i = this.getNormalizedLogicalScrollLeft(), a = this.getVerticalRlRenderedEdgeMaskWidths();
		return zn(t, i, r, Number(a && a.left) || 0);
	}
	getVerticalRlLogicalPageOffsetCacheKey(e, t) {
		if (!this.isRtlVerticalPaginated() || !this.container || !this.views || !this.layout) return null;
		let n = this.views.first() || this.views.last();
		return Qt(e, t, n ? this.getVerticalRlVisualContentWidth(n) : 0, this.layout.pageWidth || this.layout.width || this.getPageAdvance() || this.container.clientWidth || 0, this.getPageAdvance() || 0, this.layout.edgeGuardPx || 0);
	}
	getCachedVerticalRlLogicalPageOffset(e, t) {
		return $t(this._verticalRlLogicalPageOffsetCache, e, t);
	}
	cacheVerticalRlLogicalPageOffset(e, t, n) {
		this._verticalRlLogicalPageOffsetCache = en(this._verticalRlLogicalPageOffsetCache, e, t, n);
	}
	getVerticalRlCleanPageEdgeMaskWidths(e) {
		if (!this.container || !this.views || !e) return {
			left: 0,
			right: 0
		};
		let t = this.getTotalPagesForCurrentView(), n = this.getCurrentPageIndex();
		if (t <= 1 || n <= 0 || !rn(e)) return {
			left: 0,
			right: 0
		};
		let r = this.getMaxLogicalScrollLeft(), i = ir(e, t, n, this.getLogicalOffsetForPageIndex(n, t, r), this.getLogicalOffsetForPageIndex(n - 1, t, r), this.getNormalizedLogicalScrollLeft(), this.getLogicalOffsetForPageIndex(n, t, r), this._verticalRlSequentialBoundaryConstraint ? this._verticalRlSequentialBoundaryConstraint.pageIndex : null);
		return i ? this.snapVerticalRlEdgeMaskWidths(i.widths, i.maxMask, {
			nextPageStep: i.nextPageStep,
			previousPageStep: i.previousPageStep,
			rightMaxMask: i.rightMaxMask,
			allowRawRightMask: i.allowRawRightMask,
			allowRawLeftMask: i.allowRawLeftMask,
			forceRawLeftMask: i.forceRawLeftMask
		}) : {
			left: 0,
			right: 0
		};
	}
	getPreviousVerticalRlLeftMask(e, t, n) {
		if (!e || !this.container || !this.views) return Math.min(t, n);
		let r = this.views.first() || this.views.last(), i = r && r.iframe;
		if (!i) return Math.min(t, n);
		let a = this.container.getBoundingClientRect(), o = i.getBoundingClientRect(), s = ar(e, t, n, a.left, a.right, o.left);
		if (!s) return Math.min(t, n);
		let c = this.snapVerticalRlEdgeMaskWidths(s.widths, s.maxMask, {
			rawLeft: s.rawLeft,
			rawRight: s.rawRight,
			nextPageStep: s.nextPageStep,
			rightMaxMask: s.rightMaxMask
		});
		return Math.min(Number(c && c.left) || 0, n);
	}
	getVerticalRlEdgeMaskWidth() {
		return dn(this.getVerticalRlEdgeMaskWidths());
	}
	expandVerticalRlLeftMaskToVisibleLine(e) {
		if (!e || !e.left || !this.container || !this.views) return e;
		let t = this.views.first() || this.views.last(), n = t && t.iframe, r = t && t.contents && t.contents.document, i = t && t.contents && t.contents.window, a = r && r.body;
		if (!n || !r || !i || !a) return e;
		let o = rn(this.getPageAdvance() || 0);
		if (!o) return e;
		let s = this.container.getBoundingClientRect(), c = n.getBoundingClientRect(), l = s.left - c.left, u = s.right - c.left, d = Math.max(0, Number(e.left) || 0), f = ce(r, i, a, {
			limit: 1e3,
			countInvalidRects: !0
		});
		if (!f) return e;
		for (let e of f) {
			let t = lr(e, l, u, c.left), n = t.left, r = t.right;
			n < l && r > l && (d = Math.max(d, Math.ceil(r - l + 1)));
		}
		return {
			left: Math.min(d, o),
			right: e.right
		};
	}
	getLogicalPageStepToNextPage() {
		let e = this.getPageAdvance() || 0;
		if (!e || !this.container || !this.isRtlVerticalPaginated()) return e;
		let t = this.getTotalPagesForCurrentView(), n = this.getCurrentPageIndex(), r = Math.min(t - 1, n + 1);
		if (r <= n) return 0;
		let i = this.getMaxLogicalScrollLeft();
		return Zt(e, t, n, r, this.getLogicalOffsetForPageIndex(n, t, i), this.getLogicalOffsetForPageIndex(r, t, i), this.hasVerticalRlStructuralPageGutter());
	}
	snapVerticalRlEdgeMaskWidths(e, t, n = {}) {
		if (!this.container || !e || t <= 0) return e;
		let r = this.views && (this.views.first() || this.views.last()), i = r && r.iframe, a = r && r.contents && r.contents.document, o = r && r.contents && r.contents.window, s = a && a.body;
		if (!i || !a || !o || !s) return e;
		let c = this.container.getBoundingClientRect(), l = i.getBoundingClientRect(), u = n.nextPageStep === void 0 ? this.getLogicalPageStepToNextPage() : 0, d = fn(e, t, c.left, c.right, l.left, n, u, this.layout && this.layout.edgeGuardPx), f = d.rawLeft, p = d.rawRight, m = d.leftMaxMask, h = d.rightMaxMask, g = d.left, _ = d.right, v = d.nextPageStep, y = d.previousPageStep, b = d.forceRawLeftMask, x = d.allowRawLeftMask, S = d.edgeTolerance, C = d.hasStructuralEdgeGuard, w = d.canExpandClippedRawRight, T = d.rightPaintGuardMax, E = ce(a, o, s, { limit: 1e3 });
		if (!E) return e;
		let D = ur(E, f, p, l.left);
		return an(() => {
			let e = Rn(D, f, p, g, m, v, b, x, C, S), t = e.shift;
			return t !== 0 && (g = e.left), t;
		}, () => {
			let e = An(D, f, p, _, y, S, t, h, T, v, w), n = e.shift;
			return n !== 0 && (_ = e.right), n;
		}, 4), {
			left: g,
			right: _
		};
	}
	syncVerticalRlViewportClip() {
		if (!this.container || !this.container.style) return;
		let e = this.expandVerticalRlLeftMaskToVisibleLine(this.getVerticalRlEdgeMaskWidths());
		if (!e.left && !e.right) {
			this.removeVerticalRlViewportClip(), this.container.dataset && this.container.dataset.epubVrlEdgeMask && (delete this.container.dataset.epubVrlEdgeMask, delete this.container.dataset.epubVrlEdgeMaskLeft, delete this.container.dataset.epubVrlEdgeMaskRight);
			return;
		}
		let t = this.getVerticalRlViewportClipOverlay();
		if (!t) return;
		let n = t.parentElement.getBoundingClientRect(), r = this.container.getBoundingClientRect(), i = this.getVerticalRlEdgeMaskColor(), a = Math.ceil(r.width || this.container.clientWidth || 0) + 1, o = Math.ceil(r.height || this.container.clientHeight || 0) + 1;
		t.style.left = `${r.left - n.left}px`, t.style.top = `${r.top - n.top}px`, t.style.width = `${a}px`, t.style.height = `${o}px`, t.style.boxShadow = `inset ${e.left}px 0 0 ${i}, inset -${e.right}px 0 0 ${i}`, this.container.dataset.epubVrlEdgeMask = String(dn(e)), this.container.dataset.epubVrlEdgeMaskLeft = String(e.left), this.container.dataset.epubVrlEdgeMaskRight = String(e.right);
	}
	getVerticalRlViewportClipOverlay() {
		let e = this.container && this.container.parentElement;
		if (!e || !e.style) return null;
		if (this._verticalRlViewportClipOverlay && this._verticalRlViewportClipOverlay.parentElement === e) return this._verticalRlViewportClipOverlay;
		this._verticalRlViewportClipOverlay && this._verticalRlViewportClipOverlay.remove(), window.getComputedStyle(e).position === "static" && (this._verticalRlPreviousParentPosition = e.style.position || "", e.style.position = "relative");
		let t = document.createElement("div");
		return t.className = "epub-vrl-edge-mask", t.setAttribute("aria-hidden", "true"), t.style.position = "absolute", t.style.pointerEvents = "none", t.style.zIndex = "2147483647", t.style.background = "transparent", t.style.contain = "strict", e.appendChild(t), this._verticalRlViewportClipOverlay = t, t;
	}
	removeVerticalRlViewportClip() {
		this._verticalRlViewportClipOverlay &&= (this._verticalRlViewportClipOverlay.remove(), void 0);
		let e = this.container && this.container.parentElement;
		e && this._verticalRlPreviousParentPosition !== void 0 && (e.style.position = this._verticalRlPreviousParentPosition, this._verticalRlPreviousParentPosition = void 0);
	}
	getPageBoundaryShift() {
		return this.layout ? Yt(this.layout.pageBoundaryShift || 0, this.getPageAdvance() || 0, this.isRtlVerticalPaginated()) : 0;
	}
	hasVerticalRlStructuralPageGutter() {
		return !this.isRtlVerticalPaginated() || !this.container || !this.layout ? !1 : Xt(this.getPageAdvance() || 0, this.container.clientWidth || 0, this.getPageBoundaryShift(), this.isRtlVerticalPaginated());
	}
	getVerticalRlStructuralEdgeMaskWidthsForLogicalOffset(e, t, n) {
		if (!this.hasVerticalRlStructuralPageGutter()) return null;
		let r = or(e, t, n, this.getPageAdvance() || 0);
		return r ? this.snapVerticalRlEdgeMaskWidths(r.widths, r.maxMask, {
			rawLeft: r.rawLeft,
			rawRight: r.rawRight,
			nextPageStep: r.nextPageStep,
			rightMaxMask: r.rightMaxMask
		}) : null;
	}
	getLogicalOffsetForPageIndex(e, t, n) {
		return tn(e, t, n, this.getPageAdvance() || 0, this.getPageBoundaryShift(), this.isRtlVerticalPaginated());
	}
	snapVerticalRlLogicalOffsetToTextBoundary(e, t, n = {}) {
		if (!this.container || !this.views || !this.layout) return e;
		let r = this.views.first() || this.views.last(), i = r && r.iframe, a = r && r.contents && r.contents.document, o = r && r.contents && r.contents.window, s = a && a.body, c = this.isRtlVerticalPaginated() ? this.getVerticalRlVisualContentWidth(r) : this.getNavigableWidthForView(r), l = this.layout.pageWidth || this.layout.width || this.getPageAdvance() || 0, u = Xn(this._verticalRlBoundarySnapCache, e, t, c, l, this.layout.edgeGuardPx || 0, n, {
			iframe: i,
			document: a,
			window: o,
			body: s
		});
		if (e = u.logicalOffset, !u.shouldMeasureText || !u.cacheLookup) return e;
		if (u.cacheLookup.cachedSnap !== null) return u.cacheLookup.cachedSnap;
		let d = i.getBoundingClientRect(), f = this.getVerticalRlStructuralEdgeMaskWidthsForLogicalOffset(e, c, l), p = ce(a, o, s, { limit: 1e3 });
		if (!p) return null;
		let m = hr(p, d.left, e, c, l, this.layout && this.layout.edgeGuardPx, f, this.getPageAdvance(), this.getPageBoundaryShift()), h = wr(u.cacheLookup.cacheKey, m, e, c, l, t, u.maxRightBoundaryOptions, u.rightBoundaryOptions);
		return h.cacheEntry && (this._verticalRlBoundarySnapCache = h.cacheEntry), h.snapped;
	}
	getVerticalRlRectDistanceToLogicalViewport(e, t, n, r) {
		return sr(e, t, n, r);
	}
	snapVerticalRlLogicalOffsetFromEdgeMask(e, t) {
		if (!this.isRtlVerticalPaginated() || !this.container || !this.layout) return e;
		let n = this.getVerticalRlEdgeMaskWidths(), r = Number(n && n.right) || 0, i = Math.max(1, Math.min(8, Math.round(this.layout && this.layout.edgeGuardPx || 2))), a = Math.ceil(r - Math.max(1, i / 2));
		return !Number.isFinite(a) || a <= 1 ? e : Math.max(0, Math.min(t, e + a));
	}
	getNormalizedLogicalScrollLeft() {
		if (!this.container) return 0;
		let e = this.container.scrollLeft || 0;
		if (this.settings.direction === "rtl") {
			if (this.settings.rtlScrollType === "negative" || e < 0) return Math.abs(e);
			if (this.settings.rtlScrollType === "default") {
				let t = Math.max(0, this.container.scrollWidth - this.container.clientWidth);
				return Math.max(0, t - e);
			}
		}
		return Math.max(0, e);
	}
	getMaxLogicalScrollLeft() {
		return this.container ? Math.max(0, this.container.scrollWidth - this.container.clientWidth) : 0;
	}
	getVerticalRlVisualContentWidth(e) {
		let t = this.container && this.container.clientWidth ? this.container.clientWidth : 0, n = this.getMaxLogicalScrollLeft(), r = [
			this.container && this.container.scrollWidth,
			e && e.width ? e.width() : 0,
			e && e._contentWidth,
			n + t
		];
		return Math.max(0, ...r.map(function(e) {
			return Number(e) || 0;
		}).filter(function(e) {
			return Number.isFinite(e) && e > 0;
		}));
	}
	getNavigableWidthForView(e) {
		let t = e && e.width ? e.width() : 0;
		return e && this.isRtlVerticalPaginated() ? Math.max(t || 0, this.getVerticalRlVisualContentWidth(e)) : e && !this.isRtlVerticalPaginated() && this.isPaginated && this.settings.axis === "horizontal" && this.layout && this.layout.name === "reflowable" && Number.isFinite(e._contentWidth) && e._contentWidth > 0 ? e._contentWidth : t;
	}
	getPageSnapTolerance() {
		return Jt(this.getPageAdvance() || 0, this.layout && this.layout.edgeGuardPx ? this.layout.edgeGuardPx : 0);
	}
	countPagesWithFractionalTolerance(e, t) {
		return qt(e, t);
	}
	getTotalPagesForCurrentView() {
		let e = this.views && (this.views.first() || this.views.last());
		if (!e || e._viewportFillingSingleMediaPage) return 1;
		let t = this.getNavigableWidthForView(e), n = this.getPageAdvance(), r = this.layout.pageWidth || this.layout.width || n;
		if (this.layout.effectivePageAdvance && this.layout.effectivePageAdvance !== this.layout.pageWidth) {
			let e = Math.max(0, t - r);
			return e > 0 ? Math.max(1, this.countPagesWithFractionalTolerance(e, n) + 1) : 1;
		}
		return this.countPagesWithFractionalTolerance(t, n);
	}
	getCurrentPageIndex() {
		let e = this.getPageAdvance();
		if (!e || e <= 0 || !this.container) return 0;
		let t = this.getTotalPagesForCurrentView();
		return nn(this.getNormalizedLogicalScrollLeft(), t, e, this.getMaxLogicalScrollLeft(), this.getPageSnapTolerance(), this.getPageBoundaryShift(), this.isRtlVerticalPaginated());
	}
	scrollToLogicalPage(e, t = {}) {
		this.syncVerticalRlViewportClip();
		let n = this.getPageAdvance(), r = this.getTotalPagesForCurrentView(), i = Math.max(0, Math.min(r - 1, e)), a = this.getMaxLogicalScrollLeft(), o = null, s = this.getVerticalRlLogicalPageOffsetCacheKey(r, a), c = t && t.ignoreCachedLogicalOffset ? null : this.getCachedVerticalRlLogicalPageOffset(i, s);
		if (this.isRtlVerticalPaginated() && i > 0) {
			let e = Number(t && t.sequentialRightBoundary);
			if (Number.isFinite(e) && e > 0) o = Bn(i, e, 0, 0, 0, 0, 0, 0);
			else if (i < r - 1) {
				let t = this.getCurrentPageIndex();
				if (t === i - 1) {
					let s = this.views && (this.views.first() || this.views.last()), c = s ? this.getVerticalRlVisualContentWidth(s) : 0, l = this.layout.pageWidth || this.layout.width || n || 0, u = this.getNormalizedLogicalScrollLeft(), d = this.getLogicalOffsetForPageIndex(t, r, a), f = this.getVerticalRlRenderedEdgeMaskWidths();
					o = Bn(i, e, c, u, d, l, n, Number(f && f.left) || 0);
				}
			}
		}
		let l = c !== null && !o ? c : this.getLogicalOffsetForPageIndex(i, r, a);
		(c === null || o) && this.isRtlVerticalPaginated() && i > 0 && (i < r - 1 || o) && (l = this.snapVerticalRlLogicalOffsetToTextBoundary(l, a, o || {})), this._verticalRlSequentialBoundaryConstraint = o, this.isRtlVerticalPaginated() && this.cacheVerticalRlLogicalPageOffset(i, l, s);
		let u = l;
		this.settings.direction === "rtl" ? this.settings.rtlScrollType === "negative" || this.container.scrollLeft < 0 ? u = -l : this.settings.rtlScrollType === "default" && (u = Math.max(0, a - l)) : u = l, this._verticalRlBoundarySnapApplying = !0;
		try {
			this.scrollTo(u, 0, !0);
		} finally {
			this._verticalRlBoundarySnapApplying = !1;
		}
		this.syncVerticalRlViewportClip(), this.queueVerticalRlBoundarySnapRetry(i);
	}
	waitForVerticalRlLayoutReady() {
		let e = this.views && (this.views.first() || this.views.last()), t = e && e.contents && e.contents.document, n = t && t.fonts && t.fonts.ready ? t.fonts.ready.catch(function() {}) : Promise.resolve(), r = Number(this.settings && this.settings.verticalRlFontReadyTimeout), i = Number.isFinite(r) && r >= 0 ? r : 160, a = Promise.race([n, new Promise(function(e) {
			setTimeout(e, i);
		})]), o = () => new Promise((e) => {
			typeof requestAnimationFrame == "function" ? requestAnimationFrame(function() {
				requestAnimationFrame(e);
			}) : setTimeout(e, 0);
		});
		return o().then(function() {
			return a;
		}).then(o);
	}
	queueVerticalRlBoundarySnapRetry(e, t = {}) {
		if (!this.isRtlVerticalPaginated() || !this.container) return;
		let n = this.getTotalPagesForCurrentView(), r = Math.max(0, Math.min(n - 1, e)), i = (this._verticalRlBoundarySnapRetryToken || 0) + 1;
		if (this._verticalRlBoundarySnapRetryToken = i, r <= 0 || r >= n - 1) return;
		let a = Array.isArray(this.settings && this.settings.verticalRlBoundarySnapRetryDelays) ? this.settings.verticalRlBoundarySnapRetryDelays : [
			250,
			750,
			1500,
			3e3,
			6e3,
			9e3
		], o = function(e) {
			this.waitForVerticalRlLayoutReady().then(function() {
				if (this._verticalRlBoundarySnapRetryToken !== i || !this.container) return;
				let n = this.getTotalPagesForCurrentView(), s = this.getMaxLogicalScrollLeft(), c = this.getNormalizedLogicalScrollLeft(), l = this.getVerticalRlLogicalPageOffsetCacheKey(n, s), u = this.getCachedVerticalRlLogicalPageOffset(r, l), d = u !== null && (!t.useCurrentOffset || Math.abs(c - u) <= this.getPageSnapTolerance()), f = d ? u : t.useCurrentOffset ? Math.max(0, Math.min(s, c)) : this.getLogicalOffsetForPageIndex(r, n, s);
				if (t.useCurrentOffset && this.getPageBoundaryShift() === 0 && this.container) {
					let e = this.getCurrentPageIndex(), t = this.getLogicalOffsetForPageIndex(e, n, s);
					Math.abs(c - t) <= this.getPageSnapTolerance() && (f = t);
				}
				let p = this._verticalRlSequentialBoundaryConstraint && this._verticalRlSequentialBoundaryConstraint.pageIndex === r ? this._verticalRlSequentialBoundaryConstraint : {}, m = d ? f : this.snapVerticalRlLogicalOffsetToTextBoundary(f, s, p);
				if (!d && Math.abs(m - f) <= 1 && (m = this.snapVerticalRlLogicalOffsetFromEdgeMask(f, s)), Math.abs(m - f) <= 1 && (m = f), Math.abs(m - c) <= 1) {
					let t = Number(a[e]);
					Number.isFinite(t) && t >= 0 && setTimeout(function() {
						o(e + 1);
					}, t);
					return;
				}
				this.cacheVerticalRlLogicalPageOffset(r, m, l);
				let h = m;
				this.settings.direction === "rtl" && (this.settings.rtlScrollType === "negative" || this.container.scrollLeft < 0 ? h = -m : this.settings.rtlScrollType === "default" && (h = Math.max(0, s - m))), this._verticalRlBoundarySnapApplying = !0;
				try {
					this.scrollTo(h, 0, !0);
				} finally {
					this._verticalRlBoundarySnapApplying = !1;
				}
				this.syncVerticalRlViewportClip();
			}.bind(this));
		}.bind(this);
		o(0);
	}
	queueVerticalRlBoundarySnapRetryForCurrentOffset() {
		!this.isRtlVerticalPaginated() || !this.container || (clearTimeout(this._verticalRlBoundarySnapAfterScroll), this._verticalRlBoundarySnapAfterScroll = setTimeout(function() {
			!this.isRtlVerticalPaginated() || !this.container || (this.syncVerticalRlViewportClip(), this.queueVerticalRlBoundarySnapRetry(this.getCurrentPageIndex(), { useCurrentOffset: !0 }));
		}.bind(this), 0));
	}
	displaySpineItemAtEnd(e, t) {
		return this.prepend(e, t).then(function() {
			var t;
			if (this.layout.name === "pre-paginated" && this.layout.divisor > 1 && (t = e.prev(), t)) return this.prepend(t);
		}.bind(this)).then(function() {
			if (this.isRtlVerticalPaginated()) return this.waitForVerticalRlLayoutReady();
		}.bind(this)).then(function() {
			if (this.isPaginated && this.settings.axis === "horizontal") {
				let e = this.getPageAdvance();
				this.isRtlVerticalPaginated() ? this.scrollToLogicalPage(this.getTotalPagesForCurrentView() - 1) : this.settings.direction === "rtl" ? this.settings.rtlScrollType === "default" ? this.scrollTo(0, 0, !0) : this.scrollTo(this.container.scrollWidth * -1 + e, 0, !0) : this.scrollTo(this.container.scrollWidth - e, 0, !0);
			}
			this.views.show();
		}.bind(this));
	}
	next() {
		var e, t;
		let n = this.settings.direction;
		if (this.views.length) {
			if (this.isRtlVerticalPaginated()) {
				let t = this.getCurrentPageIndex();
				if (t < this.getTotalPagesForCurrentView() - 1) {
					this.scrollToLogicalPage(t + 1, { sequentialRightBoundary: this.getVerticalRlCurrentEffectiveLeftBoundary() });
					return;
				} else e = this.views.last().section.next();
			}
			if (!e && this.isPaginated && this.settings.axis === "horizontal" && (!n || n === "ltr")) {
				let t = this.getCurrentPageIndex(), n = this.getTotalPagesForCurrentView();
				this.scrollLeft = this.container.scrollLeft, t < n - 1 ? this.scrollToLogicalPage(t + 1) : e = this.views.last().section.next();
			} else if (!e && this.isPaginated && this.settings.axis === "horizontal" && n === "rtl") {
				let n = this.getPageAdvance();
				this.scrollLeft = this.container.scrollLeft, this.settings.rtlScrollType === "default" ? (t = this.container.scrollLeft, t > 0 ? this.scrollBy(n, 0, !0) : e = this.views.last().section.next()) : (t = this.container.scrollLeft + n * -1, t > this.container.scrollWidth * -1 ? this.scrollBy(n, 0, !0) : e = this.views.last().section.next());
			} else !e && this.isPaginated && this.settings.axis === "vertical" ? (this.scrollTop = this.container.scrollTop, Math.abs(this.container.scrollHeight - this.container.clientHeight - this.container.scrollTop) < 1 ? e = this.views.last().section.next() : this.scrollBy(0, this.layout.height, !0)) : e ||= this.views.last().section.next();
			if (e) {
				this.clear(), this.updateLayout();
				let t = !1;
				return this.layout.name === "pre-paginated" && this.layout.divisor === 2 && e.properties.includes("page-spread-right") && (t = !0), this.append(e, t).then(function() {
					return this.handleNextPrePaginated(t, e, this.append);
				}.bind(this), (e) => e).then(function() {
					!this.isPaginated && this.settings.axis === "horizontal" && this.settings.direction === "rtl" && this.settings.rtlScrollType === "default" && this.scrollTo(this.container.scrollWidth, 0, !0), this.views.show();
				}.bind(this));
			}
		}
	}
	prev() {
		var e, t;
		let n = this.settings.direction;
		if (this.views.length) {
			if (this.isRtlVerticalPaginated()) {
				let t = this.getCurrentPageIndex();
				if (t > 0) {
					this.scrollToLogicalPage(t - 1, { ignoreCachedLogicalOffset: !0 });
					return;
				} else e = this.views.first().section.prev();
			}
			if (!e && this.isPaginated && this.settings.axis === "horizontal" && (!n || n === "ltr")) {
				let t = this.getCurrentPageIndex();
				this.scrollLeft = this.container.scrollLeft, t > 0 ? this.scrollToLogicalPage(t - 1, { ignoreCachedLogicalOffset: !0 }) : e = this.views.first().section.prev();
			} else if (!e && this.isPaginated && this.settings.axis === "horizontal" && n === "rtl") {
				let n = this.getPageAdvance();
				this.scrollLeft = this.container.scrollLeft, this.settings.rtlScrollType === "default" ? (t = this.container.scrollLeft + this.container.offsetWidth, t < this.container.scrollWidth ? this.scrollBy(-n, 0, !0) : e = this.views.first().section.prev()) : (t = this.container.scrollLeft, t < 0 ? this.scrollBy(-n, 0, !0) : e = this.views.first().section.prev());
			} else !e && this.isPaginated && this.settings.axis === "vertical" ? (this.scrollTop = this.container.scrollTop, this.container.scrollTop > 0 ? this.scrollBy(0, -this.layout.height, !0) : e = this.views.first().section.prev()) : e ||= this.views.first().section.prev();
			if (e) {
				this.clear(), this.updateLayout();
				let t = !1;
				return this.layout.name === "pre-paginated" && this.layout.divisor === 2 && typeof e.prev() != "object" && (t = !0), this.displaySpineItemAtEnd(e, t).catch((e) => e);
			}
		}
	}
	current() {
		var e = this.visible();
		return e.length ? e[e.length - 1] : null;
	}
	clear() {
		this.views && (this.views.hide(), this.scrollTo(0, 0, !0), this.views.clear());
	}
	currentLocation() {
		return this.shouldUpdateLayoutForLocation() && this.updateLayout(), this.isPaginated && this.settings.axis === "horizontal" ? this.location = this.paginatedLocation() : this.location = this.scrolledLocation(), this.location;
	}
	scrolledLocation() {
		let e = this.visible(), t = this.container.getBoundingClientRect(), n = t.height < window.innerHeight ? t.height : window.innerHeight, r = t.width < window.innerWidth ? t.width : window.innerWidth, i = this.settings.axis === "vertical", a = 0;
		return this.settings.fullsize && (a = i ? window.scrollY : window.scrollX), e.map((e) => {
			let { index: o, href: s } = e.section, c = e.position(), l = e.width(), u = e.height(), d, f, p, m;
			i ? (d = a + t.top - c.top + 0, f = d + n - 0, m = this.layout.count(u, n).pages, p = n) : (d = a + t.left - c.left + 0, f = d + r - 0, m = this.layout.count(l, r).pages, p = r);
			let h = Math.ceil(d / p), g = [], _ = Math.ceil(f / p);
			if (this.settings.direction === "rtl" && !i) {
				let e = h;
				h = m - _, _ = m - e;
			}
			g = [];
			for (var v = h; v <= _; v++) {
				let e = v + 1;
				g.push(e);
			}
			let y = this.mapping.page(e.contents, e.section.cfiBase, d, f);
			return {
				index: o,
				href: s,
				pages: g,
				totalPages: m,
				mapping: y
			};
		});
	}
	paginatedLocation() {
		let e = this.visible(), t = this.container.getBoundingClientRect(), n = this.isRtlVerticalPaginated(), r = 0, i = 0;
		return this.settings.fullsize && (r = window.scrollX), e.map((e) => {
			let { index: a, href: o } = e.section, s, c = e.position(), l = e.width(), u, d, f;
			this.settings.direction === "rtl" ? (s = t.right - r, f = Math.min(Math.abs(s - c.left), this.layout.width) - i, d = c.width - (c.right - s) - i, u = d - f) : (s = t.left + r, f = Math.min(c.right - s, this.layout.width) - i, u = s - c.left + i, d = u + f), i += f;
			let p = this.mapping.page(e.contents, e.section.cfiBase, u, d), m = this.getPageAdvance(), h = this.layout.count(l, m).pages, g = Math.floor(u / m), _ = [], v = Math.floor(d / m);
			if (n) {
				let t = this.getCurrentPageIndex(), n = this.layout.pageWidth || this.layout.width || m, r = l, i = Math.max(0, r - n), s = Math.max(0, Math.min(i, i - t * m)), c = Math.min(r, s + n);
				return h = this.getTotalPagesForCurrentView(), _ = [t + 1], u = s, d = c, p = this.mapping.page(e.contents, e.section.cfiBase, s, c), {
					index: a,
					href: o,
					pages: _,
					totalPages: h,
					mapping: p
				};
			}
			if (g < 0 && (g = 0, v += 1), this.settings.direction === "rtl") {
				let e = g;
				g = h - v, v = h - e;
			}
			for (var y = g + 1; y <= v; y++) {
				let e = y;
				_.push(e);
			}
			return {
				index: a,
				href: o,
				pages: _,
				totalPages: h,
				mapping: p
			};
		});
	}
	isVisible(e, t, n, r) {
		var i = e.position(), a = r || this.bounds();
		return this.settings.axis === "horizontal" && i.right > a.left - t && i.left < a.right + n ? !0 : this.settings.axis === "vertical" && i.bottom > a.top - t && i.top < a.bottom + n;
	}
	visible() {
		for (var e = this.bounds(), t = this.views.displayed(), n = t.length, r = [], i, a, o = 0; o < n; o++) a = t[o], i = this.isVisible(a, 0, 0, e), i === !0 && r.push(a);
		return r;
	}
	scrollBy(e, t, n) {
		let r = this.settings.direction === "rtl" ? -1 : 1;
		n && (this.ignore = !0), this.settings.fullsize ? window.scrollBy(e * r, t * r) : (e && (this.container.scrollLeft += e * r), t && (this.container.scrollTop += t)), this.scrolled = !0;
	}
	scrollTo(e, t, n) {
		n && (this.ignore = !0), this.settings.fullsize ? window.scrollTo(e, t) : (this.container.scrollLeft = e, this.container.scrollTop = t), this.scrolled = !0, !this._verticalRlBoundarySnapApplying && this.isRtlVerticalPaginated() && this.queueVerticalRlBoundarySnapRetryForCurrentOffset();
	}
	onScroll() {
		let e, t, n = this.ignore;
		this.settings.fullsize ? (e = window.scrollY, t = window.scrollX) : (e = this.container.scrollTop, t = this.container.scrollLeft), this.scrollTop = e, this.scrollLeft = t, this.target = void 0, this.ignore ? this.ignore = !1 : (this.emit($.MANAGERS.SCROLL, {
			top: e,
			left: t
		}), clearTimeout(this.afterScrolled), this.afterScrolled = setTimeout(function() {
			this.emit($.MANAGERS.SCROLLED, {
				top: this.scrollTop,
				left: this.scrollLeft
			});
		}.bind(this), 20)), !n && !this._verticalRlBoundarySnapApplying && this.isRtlVerticalPaginated() && this.queueVerticalRlBoundarySnapRetryForCurrentOffset();
	}
	bounds() {
		return this.stage.bounds();
	}
	applyLayout(e) {
		this.layout = e, this._layoutDirty = !0, this.updateLayout(), this.views && this.views.length > 0 && this.layout.name === "pre-paginated" && this.display(this.views.first().section);
	}
	shouldUpdateLayoutForLocation() {
		if (!this.stage || !this.layout) return !1;
		if (this._layoutDirty || !this._lastLayoutStageSize) return !0;
		let e = this.stage.size();
		return e.width !== this._lastLayoutStageSize.width || e.height !== this._lastLayoutStageSize.height;
	}
	updateLayout() {
		this.stage && (this._stageSize = this.stage.size(), this._lastLayoutStageSize = {
			width: this._stageSize.width,
			height: this._stageSize.height
		}, this._layoutDirty = !1, this.isPaginated ? (this.layout.calculate(this._stageSize.width, this._stageSize.height, this.settings.gap), this.settings.offset = this.getPageAdvance() / this.layout.divisor) : this.layout.calculate(this._stageSize.width, this._stageSize.height), this.viewSettings.width = this.layout.width, this.viewSettings.height = this.layout.height, this.setLayout(this.layout), this.syncVerticalRlViewportClip());
	}
	setLayout(e) {
		this.viewSettings.layout = e, this.mapping = new _t(e.props, this.settings.direction, this.settings.axis), this.views && this.views.forEach(function(t) {
			t && t.setLayout(e);
		});
	}
	updateWritingMode(e) {
		this.writingMode = e;
	}
	updateAxis(e, t) {
		!t && e === this.settings.axis || (this.settings.axis = e, this._layoutDirty = !0, this.stage && this.stage.axis(e), this.viewSettings.axis = e, this.mapping &&= new _t(this.layout.props, this.settings.direction, this.settings.axis), this.layout && (e === "vertical" ? this.layout.spread("none") : this.layout.spread(this.layout.settings.spread)));
	}
	updateFlow(e, t = "auto") {
		let n = e === "paginated" || e === "auto";
		this.isPaginated = n, this._layoutDirty = !0, e === "scrolled-doc" || e === "scrolled-continuous" || e === "scrolled" ? this.updateAxis("vertical") : this.updateAxis("horizontal"), this.viewSettings.flow = e, this.settings.overflow ? this.overflow = this.settings.overflow : this.overflow = n ? "hidden" : t, this.stage && this.stage.overflow(this.overflow), this.updateLayout();
	}
	getContents() {
		var e = [];
		return this.views && this.views.forEach(function(t) {
			let n = t && t.contents;
			n && e.push(n);
		}), e;
	}
	direction(e = "ltr") {
		this.settings.direction = e, this.stage && this.stage.direction(e), this.viewSettings.direction = e, this.updateLayout();
	}
	isRendered() {
		return this.rendered;
	}
};
(0, j.default)(Ur.prototype);
//#endregion
//#region src/managers/helpers/snap.ts
var Wr = N, Gr = Math.PI / 2, Kr = {
	easeOutSine: function(e) {
		return Math.sin(e * Gr);
	},
	easeInOutSine: function(e) {
		return -.5 * (Math.cos(Math.PI * e) - 1);
	},
	easeInOutQuint: function(e) {
		return (e /= .5) < 1 ? .5 * e ** 5 : .5 * ((e - 2) ** 5 + 2);
	},
	easeInCubic: function(e) {
		return e ** 3;
	}
}, qr = class {
	settings;
	supportsTouch;
	manager;
	layout;
	fullsize;
	element;
	scroller;
	isVertical;
	touchCanceler;
	resizeCanceler;
	snapping;
	scrollLeft;
	scrollTop;
	startTouchX;
	startTouchY;
	startTime;
	endTouchX;
	endTouchY;
	endTime;
	_onResize;
	_onScroll;
	_onTouchStart;
	_onTouchMove;
	_onTouchEnd;
	_afterDisplayed;
	constructor(e, t) {
		this.settings = I({
			duration: 80,
			minVelocity: .2,
			minDistance: 10,
			easing: Kr.easeInCubic
		}, t || {}), this.supportsTouch = this.detectSupportsTouch(), this.supportsTouch && this.setup(e);
	}
	setup(e) {
		this.manager = e, this.layout = this.manager.layout, this.fullsize = this.manager.settings.fullsize, this.fullsize ? (this.element = this.manager.stage.element, this.scroller = window, this.disableScroll()) : (this.element = this.manager.stage.container, this.scroller = this.element, this.element.style.WebkitOverflowScrolling = "touch"), this.manager.settings.offset = this.layout.width, this.manager.settings.afterScrolledTimeout = this.settings.duration * 2, this.isVertical = this.manager.settings.axis === "vertical", !(!this.manager.isPaginated || this.isVertical) && (this.touchCanceler = !1, this.resizeCanceler = !1, this.snapping = !1, this.scrollLeft, this.scrollTop, this.startTouchX = void 0, this.startTouchY = void 0, this.startTime = void 0, this.endTouchX = void 0, this.endTouchY = void 0, this.endTime = void 0, this.addListeners());
	}
	detectSupportsTouch() {
		return !!("ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch);
	}
	disableScroll() {
		this.element.style.overflow = "hidden";
	}
	enableScroll() {
		this.element.style.overflow = "";
	}
	addListeners() {
		this._onResize = this.onResize.bind(this), window.addEventListener("resize", this._onResize), this._onScroll = this.onScroll.bind(this), this.scroller.addEventListener("scroll", this._onScroll), this._onTouchStart = this.onTouchStart.bind(this), this.scroller.addEventListener("touchstart", this._onTouchStart, { passive: !0 }), this.on("touchstart", this._onTouchStart), this._onTouchMove = this.onTouchMove.bind(this), this.scroller.addEventListener("touchmove", this._onTouchMove, { passive: !0 }), this.on("touchmove", this._onTouchMove), this._onTouchEnd = this.onTouchEnd.bind(this), this.scroller.addEventListener("touchend", this._onTouchEnd, { passive: !0 }), this.on("touchend", this._onTouchEnd), this._afterDisplayed = this.afterDisplayed.bind(this), this.manager.on($.MANAGERS.ADDED, this._afterDisplayed);
	}
	removeListeners() {
		window.removeEventListener("resize", this._onResize), this._onResize = void 0, this.scroller.removeEventListener("scroll", this._onScroll), this._onScroll = void 0, this.scroller.removeEventListener("touchstart", this._onTouchStart, { passive: !0 }), this.off("touchstart", this._onTouchStart), this._onTouchStart = void 0, this.scroller.removeEventListener("touchmove", this._onTouchMove, { passive: !0 }), this.off("touchmove", this._onTouchMove), this._onTouchMove = void 0, this.scroller.removeEventListener("touchend", this._onTouchEnd, { passive: !0 }), this.off("touchend", this._onTouchEnd), this._onTouchEnd = void 0, this.manager.off($.MANAGERS.ADDED, this._afterDisplayed), this._afterDisplayed = void 0;
	}
	afterDisplayed(e) {
		let t = e.contents;
		[
			"touchstart",
			"touchmove",
			"touchend"
		].forEach((e) => {
			t.on(e, (e) => this.triggerViewEvent(e, t));
		});
	}
	triggerViewEvent(e, t) {
		this.emit(e.type, e, t);
	}
	onScroll(e) {
		this.scrollLeft = this.fullsize ? window.scrollX : this.scroller.scrollLeft, this.scrollTop = this.fullsize ? window.scrollY : this.scroller.scrollTop;
	}
	onResize(e) {
		this.resizeCanceler = !0;
	}
	onTouchStart(e) {
		let { screenX: t, screenY: n } = e.touches[0];
		this.fullsize && this.enableScroll(), this.touchCanceler = !0, this.startTouchX || (this.startTouchX = t, this.startTouchY = n, this.startTime = this.now()), this.endTouchX = t, this.endTouchY = n, this.endTime = this.now();
	}
	onTouchMove(e) {
		let { screenX: t, screenY: n } = e.touches[0], r = Math.abs(n - this.endTouchY);
		this.touchCanceler = !0, !this.fullsize && r < 10 && (this.element.scrollLeft -= t - this.endTouchX), this.endTouchX = t, this.endTouchY = n, this.endTime = this.now();
	}
	onTouchEnd(e) {
		this.fullsize && this.disableScroll(), this.touchCanceler = !1;
		let t = this.wasSwiped();
		t === 0 ? this.snap() : this.snap(t), this.startTouchX = void 0, this.startTouchY = void 0, this.startTime = void 0, this.endTouchX = void 0, this.endTouchY = void 0, this.endTime = void 0;
	}
	wasSwiped() {
		let e = this.layout.pageWidth * this.layout.divisor, t = this.endTouchX - this.startTouchX, n = Math.abs(t), r = t / (this.endTime - this.startTime), i = this.settings.minVelocity;
		if (n <= this.settings.minDistance || n >= e) return 0;
		if (r > i) return -1;
		if (r < -i) return 1;
	}
	needsSnap() {
		return this.scrollLeft % (this.layout.pageWidth * this.layout.divisor) !== 0;
	}
	snap(e = 0) {
		let t = this.scrollLeft, n = this.layout.pageWidth * this.layout.divisor, r = Math.round(t / n) * n;
		return e && (r += e * n), this.smoothScrollTo(r);
	}
	smoothScrollTo(e) {
		let t = new Wr(), n = this.scrollLeft, r = this.now(), i = this.settings.duration;
		this.snapping = !0;
		function a() {
			let o = this.now(), s = Math.min(1, (o - r) / i);
			if (this.touchCanceler || this.resizeCanceler) {
				this.resizeCanceler = !1, this.snapping = !1, t.resolve();
				return;
			}
			s < 1 ? (window.requestAnimationFrame(a.bind(this)), this.scrollTo(n + (e - n) * s, 0)) : (this.scrollTo(e, 0), this.snapping = !1, t.resolve());
		}
		return a.call(this), t.promise;
	}
	scrollTo(e = 0, t = 0) {
		this.fullsize ? window.scroll(e, t) : (this.scroller.scrollLeft = e, this.scroller.scrollTop = t);
	}
	now() {
		return "now" in window.performance ? performance.now() : (/* @__PURE__ */ new Date()).getTime();
	}
	destroy() {
		this.scroller &&= (this.fullsize && this.enableScroll(), this.removeListeners(), void 0);
	}
};
(0, j.default)(qr.prototype);
//#endregion
//#region src/managers/continuous/index.ts
var Jr = /* @__PURE__ */ l(Rr()), Yr = N, Xr = class extends Ur {
	constructor(e) {
		super(e), this.name = "continuous", this.settings = I(this.settings || {}, {
			infinite: !0,
			overflow: void 0,
			axis: void 0,
			writingMode: void 0,
			flow: "scrolled",
			offset: 500,
			offsetDelta: 250,
			width: void 0,
			height: void 0,
			snap: !1,
			afterScrolledTimeout: 10,
			allowScriptedContent: !1,
			allowPopups: !1
		}), I(this.settings, e.settings || {}), e.settings.gap != "undefined" && e.settings.gap === 0 && (this.settings.gap = e.settings.gap), this.viewSettings = {
			ignoreClass: this.settings.ignoreClass,
			axis: this.settings.axis,
			flow: this.settings.flow,
			layout: this.layout,
			width: 0,
			height: 0,
			forceEvenPages: !1,
			allowScriptedContent: this.settings.allowScriptedContent,
			allowPopups: this.settings.allowPopups
		}, this.scrollTop = 0, this.scrollLeft = 0;
	}
	getScrollPosition() {
		let e = this.settings.direction === "rtl" && this.settings.rtlScrollType === "default" ? -1 : 1;
		return this.settings.fullsize ? {
			top: window.scrollY * e,
			left: window.scrollX * e
		} : {
			top: this.container.scrollTop,
			left: this.container.scrollLeft
		};
	}
	syncScrollPosition() {
		let { top: e, left: t } = this.getScrollPosition();
		return this.scrollTop = e, this.scrollLeft = t, {
			top: e,
			left: t
		};
	}
	display(e, t) {
		return Ur.prototype.display.call(this, e, t).then(function() {
			return this.fill();
		}.bind(this));
	}
	fill(e) {
		var t = e || new Yr();
		return this.q.enqueue(() => this.check()).then((e) => {
			e ? this.fill(t) : t.resolve();
		}), t.promise;
	}
	moveTo(e) {
		var t = 0, n = 0;
		this.isPaginated ? t = Math.floor(e.left / this.layout.delta) * this.layout.delta : n = e.top, (t > 0 || n > 0) && this.scrollBy(t, n, !0);
	}
	afterResized(e) {
		this.emit($.MANAGERS.RESIZE, e.section);
	}
	removeShownListeners(e) {
		e.onDisplayed = function() {};
	}
	add(e) {
		var t = this.createView(e, void 0);
		return this.views.append(t), t.on($.VIEWS.RESIZED, (e) => {
			t.expanded = !0;
		}), t.on($.VIEWS.AXIS, (e) => {
			this.updateAxis(e, void 0);
		}), t.on($.VIEWS.WRITING_MODE, (e) => {
			this.updateWritingMode(e);
		}), t.onDisplayed = this.afterDisplayed.bind(this), t.onResize = this.afterResized.bind(this), t.display(this.request);
	}
	append(e) {
		var t = this.createView(e, void 0);
		return t.on($.VIEWS.RESIZED, (e) => {
			t.expanded = !0;
		}), t.on($.VIEWS.AXIS, (e) => {
			this.updateAxis(e, void 0);
		}), t.on($.VIEWS.WRITING_MODE, (e) => {
			this.updateWritingMode(e);
		}), this.views.append(t), t.onDisplayed = this.afterDisplayed.bind(this), t;
	}
	prepend(e) {
		var t = this.createView(e, void 0);
		return t.on($.VIEWS.RESIZED, (e) => {
			this.counter(e), t.expanded = !0;
		}), t.on($.VIEWS.AXIS, (e) => {
			this.updateAxis(e, void 0);
		}), t.on($.VIEWS.WRITING_MODE, (e) => {
			this.updateWritingMode(e);
		}), this.views.prepend(t), t.onDisplayed = this.afterDisplayed.bind(this), t;
	}
	counter(e) {
		this.settings.axis === "vertical" ? this.scrollBy(0, e.heightDelta || 0, !0) : this.scrollBy(e.widthDelta || 0, 0, !0);
	}
	update(e) {
		for (var t = this.bounds(), n = this.views.all(), r = n.length, i = [], a = e === void 0 ? this.settings.offset || 0 : e, o, s, c = new Yr(), l = [], u = 0; u < r; u++) if (s = n[u], o = this.isVisible(s, a, a, t), o === !0) {
			if (s.displayed) (s.element && s.element.style.visibility !== "visible" || s.iframe && s.iframe.style.visibility !== "visible") && s.show();
			else {
				let e = s.display(this.request).then(function(e) {
					e.show();
				}, (e) => {
					s.hide();
				});
				l.push(e);
			}
			i.push(s);
		} else s.displayed && s.element && s.element.style.visibility !== "hidden" && s.hide(), this.scheduleTrim(350);
		return l.length ? Promise.all(l).catch((e) => {
			c.reject(e);
		}) : (c.resolve(), c.promise);
	}
	scheduleTrim(e = 250) {
		clearTimeout(this.trimTimeout), this.trimTimeout = setTimeout(function() {
			if ((this.scrollDeltaVert || 0) > 2 || (this.scrollDeltaHorz || 0) > 2) {
				this.scheduleTrim(120);
				return;
			}
			this.q.enqueue(this.trim.bind(this));
		}.bind(this), e);
	}
	check(e, t) {
		var n = new Yr(), r = [], i = this.settings.axis === "horizontal", a = this.settings.offset || 0;
		e && i && (a = e), t && !i && (a = t);
		var o = this._bounds;
		let { top: s, left: c } = this.syncScrollPosition(), l = i ? c : s, u = i ? Math.floor(o.width) : o.height, d = i ? this.container.scrollWidth : this.container.scrollHeight, f = this.writingMode && this.writingMode.indexOf("vertical") === 0 ? "vertical" : "horizontal", p = this.settings.rtlScrollType, m = this.settings.direction === "rtl";
		this.settings.fullsize ? (i && m && p === "negative" || !i && m && p === "default") && (l *= -1) : (m && p === "default" && f === "horizontal" && (l = d - u - l), m && p === "negative" && f === "horizontal" && (l *= -1));
		let h = () => {
			let e = this.views.first(), t = e && e.section.prev();
			t && r.push(this.prepend(t));
		}, g = () => {
			let e = this.views.last(), t = e && e.section.next();
			t && r.push(this.append(t));
		}, _ = l + u + a, v = l - a;
		_ >= d && g(), v < 0 && h();
		let y = r.map((e) => e.display(this.request));
		return r.length ? Promise.all(y).then(() => this.check()).then(() => this.update(a), (e) => e) : (this.q.enqueue(function() {
			this.update();
		}.bind(this)), n.resolve(!1), n.promise);
	}
	trim() {
		for (var e = new Yr(), t = this.views.displayed(), n = t[0], r = t[t.length - 1], i = this.views.indexOf(n), a = this.views.indexOf(r), o = this.views.slice(0, i), s = this.views.slice(a + 1), c = 0; c < o.length - 1; c++) this.erase(o[c], o);
		for (var l = 1; l < s.length; l++) this.erase(s[l]);
		return e.resolve(), e.promise;
	}
	erase(e, t) {
		var n, r;
		this.settings.fullsize ? (n = window.scrollY, r = window.scrollX) : (n = this.container.scrollTop, r = this.container.scrollLeft);
		var i = e.bounds();
		this.views.remove(e), t && (this.settings.axis === "vertical" ? this.scrollTo(0, n - i.height, !0) : this.settings.direction === "rtl" ? this.settings.fullsize ? this.scrollTo(r + Math.floor(i.width), 0, !0) : this.scrollTo(r, 0, !0) : this.scrollTo(r - Math.floor(i.width), 0, !0));
	}
	addEventListeners(e) {
		this._onUnload = function(e) {
			this.ignore = !0, this.destroy();
		}.bind(this), window.addEventListener("unload", this._onUnload), this.addScrollListeners(), this.isPaginated && this.settings.snap && (this.snapper = new qr(this, this.settings.snap && typeof this.settings.snap == "object" && this.settings.snap));
	}
	addScrollListeners() {
		var e;
		this.tick = Ne, this.scrollDeltaVert = 0, this.scrollDeltaHorz = 0, e = this.settings.fullsize ? window : this.container;
		let { top: t, left: n } = this.syncScrollPosition();
		this.prevScrollTop = t, this.prevScrollLeft = n, this._onScroll = this.onScroll.bind(this), e.addEventListener("scroll", this._onScroll), this._scrolled = (0, Jr.default)(this.scrolled.bind(this), 30), this.didScroll = !1;
	}
	removeEventListeners() {
		(this.settings.fullsize ? window : this.container).removeEventListener("scroll", this._onScroll), this._onScroll = void 0, window.removeEventListener("unload", this._onUnload), this._onUnload = void 0;
	}
	onScroll() {
		let { top: e, left: t } = this.syncScrollPosition();
		this.ignore ? this.ignore = !1 : this._scrolled(), this.scrollDeltaVert += Math.abs(e - this.prevScrollTop), this.scrollDeltaHorz += Math.abs(t - this.prevScrollLeft), this.prevScrollTop = e, this.prevScrollLeft = t, clearTimeout(this.scrollTimeout), this.scrollTimeout = setTimeout(function() {
			this.scrollDeltaVert = 0, this.scrollDeltaHorz = 0;
		}.bind(this), 150), clearTimeout(this.afterScrolled), this.didScroll = !1;
	}
	scrolled() {
		let e = this.q.enqueue(function() {
			return this.check();
		}.bind(this));
		this.scrolledRequestId = (this.scrolledRequestId || 0) + 1;
		let t = this.scrolledRequestId;
		this.emit($.MANAGERS.SCROLL, {
			top: this.scrollTop,
			left: this.scrollLeft
		}), clearTimeout(this.afterScrolled), this.afterScrolled = setTimeout(function() {
			Promise.resolve(e).catch(function() {}).then(function() {
				t === this.scrolledRequestId && (this.snapper && this.snapper.supportsTouch && this.snapper.needsSnap() || this.emit($.MANAGERS.SCROLLED, {
					top: this.scrollTop,
					left: this.scrollLeft
				}));
			}.bind(this));
		}.bind(this), this.settings.afterScrolledTimeout);
	}
	next() {
		let e = this.layout.props.name === "pre-paginated" && this.layout.props.spread ? this.layout.props.delta * 2 : this.layout.props.delta;
		this.views.length && (this.isPaginated && this.settings.axis === "horizontal" ? this.scrollBy(e, 0, !0) : this.scrollBy(0, this.layout.height, !0), this.q.enqueue(function() {
			return this.check();
		}.bind(this)));
	}
	prev() {
		let e = this.layout.props.name === "pre-paginated" && this.layout.props.spread ? this.layout.props.delta * 2 : this.layout.props.delta;
		this.views.length && (this.isPaginated && this.settings.axis === "horizontal" ? this.scrollBy(-e, 0, !0) : this.scrollBy(0, -this.layout.height, !0), this.q.enqueue(function() {
			return this.check();
		}.bind(this)));
	}
	updateFlow(e) {
		this.rendered && this.snapper && (this.snapper.destroy(), this.snapper = void 0), super.updateFlow(e, "scroll"), this.rendered && this.isPaginated && this.settings.snap && (this.snapper = new qr(this, this.settings.snap && typeof this.settings.snap == "object" && this.settings.snap));
	}
	destroy() {
		clearTimeout(this.trimTimeout), clearTimeout(this.scrollTimeout), super.destroy(), this.snapper && this.snapper.destroy();
	}
}, Zr = N;
function Qr(e) {
	return typeof e.then == "function";
}
var $r = class {
	settings;
	book;
	hooks;
	manager;
	ViewManager;
	View;
	q;
	_layout;
	themes;
	annotations;
	epubcfi;
	location;
	starting;
	started;
	displaying;
	constructor(e, t) {
		this.settings = I(this.settings || {}, {
			width: null,
			height: null,
			ignoreClass: "",
			manager: "default",
			view: "iframe",
			flow: null,
			layout: null,
			spread: null,
			minSpreadWidth: 800,
			stylesheet: null,
			resizeOnOrientationChange: !0,
			script: null,
			snap: !1,
			defaultDirection: "ltr",
			allowScriptedContent: !1,
			allowPopups: !1
		}), I(this.settings, t), typeof this.settings.manager == "object" && (this.manager = this.settings.manager), this.book = e, this.hooks = {}, this.hooks.display = new ge(this), this.hooks.serialize = new ge(this), this.hooks.content = new ge(this), this.hooks.unloaded = new ge(this), this.hooks.layout = new ge(this), this.hooks.render = new ge(this), this.hooks.show = new ge(this), this.hooks.content.register(this.handleLinks.bind(this)), this.hooks.content.register(this.passEvents.bind(this)), this.hooks.content.register(this.adjustImages.bind(this)), this.book.spine.hooks.content.register(this.injectIdentifier.bind(this)), this.settings.stylesheet && this.book.spine.hooks.content.register(this.injectStylesheet.bind(this)), this.settings.script && this.book.spine.hooks.content.register(this.injectScript.bind(this)), this.themes = new st(this), this.annotations = new ct(this), this.epubcfi = new X(), this.q = new qe(this), this.location = void 0, this.q.enqueue(this.book.opened), this.starting = new Zr(), this.started = this.starting.promise, this.q.enqueue(this.start);
	}
	setManager(e) {
		this.manager = e;
	}
	requireManager(e) {
		return typeof e == "string" && e === "default" ? Ur : typeof e == "string" && e === "continuous" ? Xr : e;
	}
	requireView(e) {
		return typeof e == "string" && e === "iframe" ? Wt : e;
	}
	start() {
		switch (!this.settings.layout && (this.book.package.metadata.layout === "pre-paginated" || this.book.displayOptions.fixedLayout === "true") && (this.settings.layout = "pre-paginated"), this.book.package.metadata.spread) {
			case "none":
				this.settings.spread = "none";
				break;
			case "both":
				this.settings.spread = !0;
				break;
		}
		this.manager ||= (this.ViewManager = this.requireManager(this.settings.manager), this.View = this.requireView(this.settings.view), new this.ViewManager({
			view: this.View,
			queue: this.q,
			request: this.book.load.bind(this.book),
			settings: this.settings
		})), this.direction(this.book.package.metadata.direction || this.settings.defaultDirection), this.settings.globalLayoutProperties = this.determineLayoutProperties(this.book.package.metadata), this.flow(this.settings.globalLayoutProperties.flow), this.layout(this.settings.globalLayoutProperties), this.manager.on($.MANAGERS.ADDED, this.afterDisplayed.bind(this)), this.manager.on($.MANAGERS.REMOVED, this.afterRemoved.bind(this)), this.manager.on($.MANAGERS.RESIZED, this.onResized.bind(this)), this.manager.on($.MANAGERS.ORIENTATION_CHANGE, this.onOrientationChange.bind(this)), this.manager.on($.MANAGERS.SCROLLED, this.reportLocation.bind(this)), this.emit($.RENDITION.STARTED), this.starting.resolve();
	}
	attachTo(e) {
		return this.q.enqueue(function() {
			this.manager.render(e, {
				width: this.settings.width,
				height: this.settings.height
			}), this.emit($.RENDITION.ATTACHED);
		}.bind(this));
	}
	display(e) {
		return this.displaying && this.displaying.resolve(void 0), this.q.enqueue(this._display, e);
	}
	_display(e) {
		if (this.book) {
			var t = new Zr(), n = t.promise, r;
			return this.displaying = t, this.book.locations.length() && me(e) && (e = this.book.locations.cfiFromPercentage(parseFloat(String(e)))), r = this.book.spine.get(e), r ? (this.manager.display(r, e).then(() => {
				t.resolve(r), this.displaying = void 0, this.emit($.RENDITION.DISPLAYED, r), this.reportLocation();
			}, (e) => {
				this.emit($.RENDITION.DISPLAY_ERROR, e);
			}), n) : (t.reject(/* @__PURE__ */ Error("No Section Found")), n);
		}
	}
	afterDisplayed(e) {
		e.on($.VIEWS.MARK_CLICKED, (t, n) => this.triggerMarkEvent(t, n, e.contents)), this.hooks.render.trigger(e, this).then(() => {
			e.contents ? this.hooks.content.trigger(e.contents, this).then(() => {
				this.emit($.RENDITION.RENDERED, e.section, e);
			}) : this.emit($.RENDITION.RENDERED, e.section, e);
		});
	}
	afterRemoved(e) {
		this.hooks.unloaded.trigger(e, this).then(() => {
			this.emit($.RENDITION.REMOVED, e.section, e);
		});
	}
	onResized(e, t) {
		this.emit($.RENDITION.RESIZED, {
			width: e.width,
			height: e.height
		}, t), t ? this.display(t) : this.location && this.location.start && this.display(this.location.start.cfi);
	}
	onOrientationChange(e) {
		this.emit($.RENDITION.ORIENTATION_CHANGE, e);
	}
	moveTo(e) {
		this.manager.moveTo(e);
	}
	resize(e, t, n) {
		e && (this.settings.width = e), t && (this.settings.height = t), this.manager.resize(e, t, n);
	}
	clear() {
		this.manager.clear();
	}
	next() {
		return this.q.enqueue(this.manager.next.bind(this.manager)).then(this.reportLocation.bind(this));
	}
	prev() {
		return this.q.enqueue(this.manager.prev.bind(this.manager)).then(this.reportLocation.bind(this));
	}
	debugVerticalRlPage() {
		let e = this.manager, t = e && e.views && (e.views.first() || e.views.last()), n = t && t.contents, r = e && e.container, i = e && e.layout ? e.layout.pageWidth : null, a = n && n.debugVerticalRlMetrics ? n.debugVerticalRlMetrics(i) : {}, o = e && e.getPageAdvance ? e.getPageAdvance() : i, s = e && e.getTotalPagesForCurrentView ? e.getTotalPagesForCurrentView() : null, c = e && e.getCurrentPageIndex ? e.getCurrentPageIndex() : null, l = e && e.getNormalizedLogicalScrollLeft ? e.getNormalizedLogicalScrollLeft() : null, u = e && e.layout && (e.layout.pageWidth || e.layout.width) || o, d = t && t.width ? t.width() : null, f = Number.isFinite(d) && Number.isFinite(u) ? Math.max(0, d - u) : null, p = Number.isFinite(f) && Number.isFinite(c) && Number.isFinite(o) ? Math.max(0, Math.min(f, f - c * o)) : null, m = Number.isFinite(d) && Number.isFinite(p) && Number.isFinite(u) ? Math.min(d, p + u) : null, h = Object.assign({}, a, {
			containerClientWidth: r ? r.clientWidth : null,
			containerScrollWidth: r ? r.scrollWidth : null,
			containerScrollLeft: r ? r.scrollLeft : null,
			iframeOffsetWidth: t && t.iframe ? t.iframe.offsetWidth : null,
			iframeClientWidth: t && t.iframe ? t.iframe.clientWidth : null,
			normalizedLogicalScrollLeft: l,
			physicalStart: p,
			physicalEnd: m,
			pageWidth: i,
			effectivePageAdvance: o,
			totalPages: s,
			currentPageIndex: c
		});
		return typeof console < "u" && console.debug && console.debug("[epubjs:vertical-rl-page]", h), h;
	}
	remeasure({ preserveLocation: e = !0, waitForFonts: t = !0 } = {}) {
		let n = e && this.location && this.location.start ? this.location.start.cfi : null, r = this.manager, i = r && r.views && (r.views.first() || r.views.last()), a = i && i.contents && i.contents.document;
		return (t && a && a.fonts && a.fonts.ready ? a.fonts.ready.catch(function() {}) : Promise.resolve()).then(function() {
			r && typeof r.updateLayout == "function" && (r._layoutDirty = !0, r.updateLayout());
		}).then(function() {
			return n ? this.display(n) : this.reportLocation();
		}.bind(this));
	}
	determineLayoutProperties(e) {
		var t, n = this.settings.layout || e.layout || "reflowable", r = this.settings.spread || e.spread || "auto", i = this.settings.orientation || e.orientation || "auto", a = this.settings.flow || e.flow || "auto", o = e.viewport || "", s = this.settings.minSpreadWidth || (typeof e.minSpreadWidth == "number" ? e.minSpreadWidth : 800), c = this.settings.direction || e.direction || "ltr";
		return (Number(this.settings.width) === 0 || Number(this.settings.width) > 0) && (Number(this.settings.height) === 0 || Number(this.settings.height)), t = {
			layout: n,
			spread: r,
			orientation: i,
			flow: a,
			viewport: o,
			minSpreadWidth: s,
			direction: c
		}, t;
	}
	flow(e) {
		var t = e;
		(e === "scrolled" || e === "scrolled-doc" || e === "scrolled-continuous") && (t = "scrolled"), (e === "auto" || e === "paginated") && (t = "paginated"), this.settings.flow = e, this._layout && this._layout.flow(t), this.manager && this._layout && this.manager.applyLayout(this._layout), this.manager && this.manager.updateFlow(t), this.manager && this.manager.isRendered() && this.location && (this.manager.clear(), this.display(this.location.start.cfi));
	}
	layout(e) {
		if (e) {
			let t = e;
			this._layout = new ot(t), this._layout.spread(t.spread, this.settings.minSpreadWidth), this._layout.on($.LAYOUT.UPDATED, (e, t) => {
				this.emit($.RENDITION.LAYOUT, e, t);
			});
		}
		return this.manager && this._layout && this.manager.applyLayout(this._layout), this._layout;
	}
	spread(e, t) {
		this.settings.spread = e, t && (this.settings.minSpreadWidth = t), this._layout && this._layout.spread(e, t), this.manager && this.manager.isRendered() && this.manager.updateLayout();
	}
	direction(e) {
		this.settings.direction = e || "ltr", this.manager && this.manager.direction(this.settings.direction), this.manager && this.manager.isRendered() && this.location && (this.manager.clear(), this.display(this.location.start.cfi));
	}
	reportLocation() {
		return this.q.enqueue(function() {
			requestAnimationFrame(function() {
				if (this.manager) {
					var e;
					try {
						e = this.manager.currentLocation();
					} catch {
						return;
					}
					if (e && Qr(e)) e.then(function(e) {
						let t = this.located(e);
						!t || !t.start || !t.end || (this.location = t, this.emit($.RENDITION.LOCATION_CHANGED, {
							index: this.location.start.index,
							href: this.location.start.href,
							start: this.location.start.cfi,
							end: this.location.end.cfi,
							percentage: this.location.start.percentage
						}), this.emit($.RENDITION.RELOCATED, this.location));
					}.bind(this));
					else if (e && !Qr(e)) {
						let t = this.located(e);
						if (!t || !t.start || !t.end) return;
						this.location = t, this.emit($.RENDITION.LOCATION_CHANGED, {
							index: this.location.start.index,
							href: this.location.start.href,
							start: this.location.start.cfi,
							end: this.location.end.cfi,
							percentage: this.location.start.percentage
						}), this.emit($.RENDITION.RELOCATED, this.location);
					}
				}
			}.bind(this));
		}.bind(this)).then(function() {});
	}
	currentLocation() {
		var e = this.manager.currentLocation();
		if (e && Qr(e)) return e.then(function(e) {
			return this.located(e);
		}.bind(this));
		if (e && !Qr(e)) return this.located(e);
	}
	located(e) {
		if (!e || !e.length) return {};
		let t = e.filter(function(e) {
			return e && e.mapping && e.mapping.start && e.mapping.end && Array.isArray(e.pages);
		});
		if (!t.length) return {};
		let n = t[0], r = t[t.length - 1], i = {
			start: {
				index: n.index,
				href: n.href,
				cfi: n.mapping.start,
				displayed: {
					page: n.pages[0] || 1,
					total: n.totalPages
				}
			},
			end: {
				index: r.index,
				href: r.href,
				cfi: r.mapping.end,
				displayed: {
					page: r.pages[r.pages.length - 1] || 1,
					total: r.totalPages
				}
			}
		}, a = this.book.locations.locationFromCfi(n.mapping.start), o = this.book.locations.locationFromCfi(r.mapping.end);
		a != null && (i.start.location = a, i.start.percentage = this.book.locations.percentageFromLocation(a)), o != null && (i.end.location = o, i.end.percentage = this.book.locations.percentageFromLocation(o));
		let s = this.book.pageList.pageFromCfi(n.mapping.start), c = this.book.pageList.pageFromCfi(r.mapping.end);
		return s != -1 && (i.start.page = s), c != -1 && (i.end.page = c), r.index === this.book.spine.last().index && i.end.displayed.page >= i.end.displayed.total && (i.atEnd = !0), n.index === this.book.spine.first().index && i.start.displayed.page === 1 && (i.atStart = !0), i;
	}
	destroy() {
		this.manager && this.manager.destroy(), this.book = void 0;
	}
	passEvents(e) {
		Je.forEach((t) => {
			e.on(t, (t) => this.triggerViewEvent(t, e));
		}), e.on($.CONTENTS.SELECTED, (t) => this.triggerSelectedEvent(t, e));
	}
	triggerViewEvent(e, t) {
		this.emit(e.type, e, t);
	}
	triggerSelectedEvent(e, t) {
		this.emit($.RENDITION.SELECTED, e, t);
	}
	triggerMarkEvent(e, t, n) {
		this.emit($.RENDITION.MARK_CLICKED, e, t, n);
	}
	getRange(e, t) {
		var n = new X(e), r = this.manager.visible().filter(function(e) {
			if (n.spinePos === e.index) return !0;
		});
		if (r.length) return r[0].contents.range(n, t);
	}
	adjustImages(e) {
		if (this._layout.name === "pre-paginated") return new Promise(function(e) {
			e();
		});
		let t = e.window.getComputedStyle(e.content, null), n = (e.content.offsetHeight - (parseFloat(t.paddingTop) + parseFloat(t.paddingBottom))) * .95, r = parseFloat(t.paddingLeft) + parseFloat(t.paddingRight);
		return e.addStylesheetRules({
			img: {
				"max-width": (this._layout.columnWidth ? this._layout.columnWidth - r + "px" : "100%") + "!important",
				"max-height": n + "px!important",
				"object-fit": "contain",
				"page-break-inside": "avoid",
				"break-inside": "avoid",
				"box-sizing": "border-box"
			},
			svg: {
				"max-width": (this._layout.columnWidth ? this._layout.columnWidth - r + "px" : "100%") + "!important",
				"max-height": n + "px!important",
				"page-break-inside": "avoid",
				"break-inside": "avoid"
			}
		}), new Promise(function(e) {
			setTimeout(function() {
				e();
			}, 1);
		});
	}
	getContents() {
		return this.manager ? this.manager.getContents() : [];
	}
	views() {
		return (this.manager ? this.manager.views : void 0) || [];
	}
	handleLinks(e) {
		e && e.on($.CONTENTS.LINK_CLICKED, (t) => {
			let n = this.resolveLinkHref(t, e);
			this.display(n);
		});
	}
	resolveLinkHref(e, t) {
		return e && (e.indexOf("#") === 0 && t && t.sectionHref ? t.sectionHref + e : /^[a-z][a-z0-9+.-]*:/i.test(e) || e.indexOf("/") === 0 ? this.book.path.relative(e) : e);
	}
	injectStylesheet(e, t) {
		let n = e.createElement("link");
		n.setAttribute("type", "text/css"), n.setAttribute("rel", "stylesheet"), n.setAttribute("href", this.settings.stylesheet), e.getElementsByTagName("head")[0].appendChild(n);
	}
	injectScript(e, t) {
		let n = e.createElement("script");
		n.setAttribute("type", "text/javascript"), n.setAttribute("src", this.settings.script), n.textContent = " ", e.getElementsByTagName("head")[0].appendChild(n);
	}
	injectIdentifier(e, t) {
		let n = this.book.packaging.metadata.identifier, r = e.createElement("meta");
		r.setAttribute("name", "dc.relation.ispartof"), n && r.setAttribute("content", n), e.getElementsByTagName("head")[0].appendChild(r);
	}
};
(0, j.default)($r.prototype);
//#endregion
//#region src/archive.ts
var ei = /* @__PURE__ */ l((/* @__PURE__ */ o(((e, t) => {
	(function(n) {
		if (typeof e == "object" && t !== void 0) t.exports = n();
		else if (typeof define == "function" && define.amd) define([], n);
		else {
			var r = typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : this;
			r.JSZip = n();
		}
	})(function() {
		return (function e(t, n, r) {
			function i(o, s) {
				if (!n[o]) {
					if (!t[o]) {
						var c = typeof u == "function" && u;
						if (!s && c) return c(o, !0);
						if (a) return a(o, !0);
						var l = /* @__PURE__ */ Error("Cannot find module '" + o + "'");
						throw l.code = "MODULE_NOT_FOUND", l;
					}
					var d = n[o] = { exports: {} };
					t[o][0].call(d.exports, function(e) {
						var n = t[o][1][e];
						return i(n || e);
					}, d, d.exports, e, t, n, r);
				}
				return n[o].exports;
			}
			for (var a = typeof u == "function" && u, o = 0; o < r.length; o++) i(r[o]);
			return i;
		})({
			1: [function(e, t, n) {
				var r = e("./utils"), i = e("./support"), a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
				n.encode = function(e) {
					for (var t = [], n, i, o, s, c, l, u, d = 0, f = e.length, p = f, m = r.getTypeOf(e) !== "string"; d < e.length;) p = f - d, m ? (n = e[d++], i = d < f ? e[d++] : 0, o = d < f ? e[d++] : 0) : (n = e.charCodeAt(d++), i = d < f ? e.charCodeAt(d++) : 0, o = d < f ? e.charCodeAt(d++) : 0), s = n >> 2, c = (n & 3) << 4 | i >> 4, l = p > 1 ? (i & 15) << 2 | o >> 6 : 64, u = p > 2 ? o & 63 : 64, t.push(a.charAt(s) + a.charAt(c) + a.charAt(l) + a.charAt(u));
					return t.join("");
				}, n.decode = function(e) {
					var t, n, r, o, s, c, l, u = 0, d = 0, f = "data:";
					if (e.substr(0, f.length) === f) throw Error("Invalid base64 input, it looks like a data url.");
					e = e.replace(/[^A-Za-z0-9+/=]/g, "");
					var p = e.length * 3 / 4;
					if (e.charAt(e.length - 1) === a.charAt(64) && p--, e.charAt(e.length - 2) === a.charAt(64) && p--, p % 1 != 0) throw Error("Invalid base64 input, bad content length.");
					for (var m = i.uint8array ? new Uint8Array(p | 0) : Array(p | 0); u < e.length;) o = a.indexOf(e.charAt(u++)), s = a.indexOf(e.charAt(u++)), c = a.indexOf(e.charAt(u++)), l = a.indexOf(e.charAt(u++)), t = o << 2 | s >> 4, n = (s & 15) << 4 | c >> 2, r = (c & 3) << 6 | l, m[d++] = t, c !== 64 && (m[d++] = n), l !== 64 && (m[d++] = r);
					return m;
				};
			}, {
				"./support": 30,
				"./utils": 32
			}],
			2: [function(e, t, n) {
				var r = e("./external"), i = e("./stream/DataWorker"), a = e("./stream/Crc32Probe"), o = e("./stream/DataLengthProbe");
				function s(e, t, n, r, i) {
					this.compressedSize = e, this.uncompressedSize = t, this.crc32 = n, this.compression = r, this.compressedContent = i;
				}
				s.prototype = {
					getContentWorker: function() {
						var e = new i(r.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new o("data_length")), t = this;
						return e.on("end", function() {
							if (this.streamInfo.data_length !== t.uncompressedSize) throw Error("Bug : uncompressed data size mismatch");
						}), e;
					},
					getCompressedWorker: function() {
						return new i(r.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
					}
				}, s.createWorkerFrom = function(e, t, n) {
					return e.pipe(new a()).pipe(new o("uncompressedSize")).pipe(t.compressWorker(n)).pipe(new o("compressedSize")).withStreamInfo("compression", t);
				}, t.exports = s;
			}, {
				"./external": 6,
				"./stream/Crc32Probe": 25,
				"./stream/DataLengthProbe": 26,
				"./stream/DataWorker": 27
			}],
			3: [function(e, t, n) {
				var r = e("./stream/GenericWorker");
				n.STORE = {
					magic: "\0\0",
					compressWorker: function() {
						return new r("STORE compression");
					},
					uncompressWorker: function() {
						return new r("STORE decompression");
					}
				}, n.DEFLATE = e("./flate");
			}, {
				"./flate": 7,
				"./stream/GenericWorker": 28
			}],
			4: [function(e, t, n) {
				var r = e("./utils");
				function i() {
					for (var e, t = [], n = 0; n < 256; n++) {
						e = n;
						for (var r = 0; r < 8; r++) e = e & 1 ? 3988292384 ^ e >>> 1 : e >>> 1;
						t[n] = e;
					}
					return t;
				}
				var a = i();
				function o(e, t, n, r) {
					var i = a, o = r + n;
					e ^= -1;
					for (var s = r; s < o; s++) e = e >>> 8 ^ i[(e ^ t[s]) & 255];
					return e ^ -1;
				}
				function s(e, t, n, r) {
					var i = a, o = r + n;
					e ^= -1;
					for (var s = r; s < o; s++) e = e >>> 8 ^ i[(e ^ t.charCodeAt(s)) & 255];
					return e ^ -1;
				}
				t.exports = function(e, t) {
					return e === void 0 || !e.length ? 0 : r.getTypeOf(e) === "string" ? s(t | 0, e, e.length, 0) : o(t | 0, e, e.length, 0);
				};
			}, { "./utils": 32 }],
			5: [function(e, t, n) {
				n.base64 = !1, n.binary = !1, n.dir = !1, n.createFolders = !0, n.date = null, n.compression = null, n.compressionOptions = null, n.comment = null, n.unixPermissions = null, n.dosPermissions = null;
			}, {}],
			6: [function(e, t, n) {
				var r = null;
				r = typeof Promise < "u" ? Promise : e("lie"), t.exports = { Promise: r };
			}, { lie: 37 }],
			7: [function(e, t, n) {
				var r = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Uint32Array < "u", i = e("pako"), a = e("./utils"), o = e("./stream/GenericWorker"), s = r ? "uint8array" : "array";
				n.magic = "\b\0";
				function c(e, t) {
					o.call(this, "FlateWorker/" + e), this._pako = null, this._pakoAction = e, this._pakoOptions = t, this.meta = {};
				}
				a.inherits(c, o), c.prototype.processChunk = function(e) {
					this.meta = e.meta, this._pako === null && this._createPako(), this._pako.push(a.transformTo(s, e.data), !1);
				}, c.prototype.flush = function() {
					o.prototype.flush.call(this), this._pako === null && this._createPako(), this._pako.push([], !0);
				}, c.prototype.cleanUp = function() {
					o.prototype.cleanUp.call(this), this._pako = null;
				}, c.prototype._createPako = function() {
					this._pako = new i[this._pakoAction]({
						raw: !0,
						level: this._pakoOptions.level || -1
					});
					var e = this;
					this._pako.onData = function(t) {
						e.push({
							data: t,
							meta: e.meta
						});
					};
				}, n.compressWorker = function(e) {
					return new c("Deflate", e);
				}, n.uncompressWorker = function() {
					return new c("Inflate", {});
				};
			}, {
				"./stream/GenericWorker": 28,
				"./utils": 32,
				pako: 38
			}],
			8: [function(e, t, n) {
				var r = e("../utils"), i = e("../stream/GenericWorker"), a = e("../utf8"), o = e("../crc32"), s = e("../signature"), c = function(e, t) {
					var n = "", r;
					for (r = 0; r < t; r++) n += String.fromCharCode(e & 255), e >>>= 8;
					return n;
				}, l = function(e, t) {
					var n = e;
					return e || (n = t ? 16893 : 33204), (n & 65535) << 16;
				}, u = function(e) {
					return (e || 0) & 63;
				}, d = function(e, t, n, i, d, f) {
					var p = e.file, m = e.compression, h = f !== a.utf8encode, g = r.transformTo("string", f(p.name)), _ = r.transformTo("string", a.utf8encode(p.name)), v = p.comment, y = r.transformTo("string", f(v)), b = r.transformTo("string", a.utf8encode(v)), x = _.length !== p.name.length, S = b.length !== v.length, C, w, T = "", E = "", D = "", O = p.dir, k = p.date, A = {
						crc32: 0,
						compressedSize: 0,
						uncompressedSize: 0
					};
					(!t || n) && (A.crc32 = e.crc32, A.compressedSize = e.compressedSize, A.uncompressedSize = e.uncompressedSize);
					var j = 0;
					t && (j |= 8), !h && (x || S) && (j |= 2048);
					var M = 0, N = 0;
					O && (M |= 16), d === "UNIX" ? (N = 798, M |= l(p.unixPermissions, O)) : (N = 20, M |= u(p.dosPermissions, O)), C = k.getUTCHours(), C <<= 6, C |= k.getUTCMinutes(), C <<= 5, C |= k.getUTCSeconds() / 2, w = k.getUTCFullYear() - 1980, w <<= 4, w |= k.getUTCMonth() + 1, w <<= 5, w |= k.getUTCDate(), x && (E = c(1, 1) + c(o(g), 4) + _, T += "up" + c(E.length, 2) + E), S && (D = c(1, 1) + c(o(y), 4) + b, T += "uc" + c(D.length, 2) + D);
					var P = "";
					return P += "\n\0", P += c(j, 2), P += m.magic, P += c(C, 2), P += c(w, 2), P += c(A.crc32, 4), P += c(A.compressedSize, 4), P += c(A.uncompressedSize, 4), P += c(g.length, 2), P += c(T.length, 2), {
						fileRecord: s.LOCAL_FILE_HEADER + P + g + T,
						dirRecord: s.CENTRAL_FILE_HEADER + c(N, 2) + P + c(y.length, 2) + "\0\0\0\0" + c(M, 4) + c(i, 4) + g + T + y
					};
				}, f = function(e, t, n, i, a) {
					var o = "", l = r.transformTo("string", a(i));
					return o = s.CENTRAL_DIRECTORY_END + "\0\0\0\0" + c(e, 2) + c(e, 2) + c(t, 4) + c(n, 4) + c(l.length, 2) + l, o;
				}, p = function(e) {
					var t = "";
					return t = s.DATA_DESCRIPTOR + c(e.crc32, 4) + c(e.compressedSize, 4) + c(e.uncompressedSize, 4), t;
				};
				function m(e, t, n, r) {
					i.call(this, "ZipFileWorker"), this.bytesWritten = 0, this.zipComment = t, this.zipPlatform = n, this.encodeFileName = r, this.streamFiles = e, this.accumulate = !1, this.contentBuffer = [], this.dirRecords = [], this.currentSourceOffset = 0, this.entriesCount = 0, this.currentFile = null, this._sources = [];
				}
				r.inherits(m, i), m.prototype.push = function(e) {
					var t = e.meta.percent || 0, n = this.entriesCount, r = this._sources.length;
					this.accumulate ? this.contentBuffer.push(e) : (this.bytesWritten += e.data.length, i.prototype.push.call(this, {
						data: e.data,
						meta: {
							currentFile: this.currentFile,
							percent: n ? (t + 100 * (n - r - 1)) / n : 100
						}
					}));
				}, m.prototype.openedSource = function(e) {
					this.currentSourceOffset = this.bytesWritten, this.currentFile = e.file.name;
					var t = this.streamFiles && !e.file.dir;
					if (t) {
						var n = d(e, t, !1, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
						this.push({
							data: n.fileRecord,
							meta: { percent: 0 }
						});
					} else this.accumulate = !0;
				}, m.prototype.closedSource = function(e) {
					this.accumulate = !1;
					var t = this.streamFiles && !e.file.dir, n = d(e, t, !0, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
					if (this.dirRecords.push(n.dirRecord), t) this.push({
						data: p(e),
						meta: { percent: 100 }
					});
					else for (this.push({
						data: n.fileRecord,
						meta: { percent: 0 }
					}); this.contentBuffer.length;) this.push(this.contentBuffer.shift());
					this.currentFile = null;
				}, m.prototype.flush = function() {
					for (var e = this.bytesWritten, t = 0; t < this.dirRecords.length; t++) this.push({
						data: this.dirRecords[t],
						meta: { percent: 100 }
					});
					var n = this.bytesWritten - e, r = f(this.dirRecords.length, n, e, this.zipComment, this.encodeFileName);
					this.push({
						data: r,
						meta: { percent: 100 }
					});
				}, m.prototype.prepareNextSource = function() {
					this.previous = this._sources.shift(), this.openedSource(this.previous.streamInfo), this.isPaused ? this.previous.pause() : this.previous.resume();
				}, m.prototype.registerPrevious = function(e) {
					this._sources.push(e);
					var t = this;
					return e.on("data", function(e) {
						t.processChunk(e);
					}), e.on("end", function() {
						t.closedSource(t.previous.streamInfo), t._sources.length ? t.prepareNextSource() : t.end();
					}), e.on("error", function(e) {
						t.error(e);
					}), this;
				}, m.prototype.resume = function() {
					if (!i.prototype.resume.call(this)) return !1;
					if (!this.previous && this._sources.length) return this.prepareNextSource(), !0;
					if (!this.previous && !this._sources.length && !this.generatedError) return this.end(), !0;
				}, m.prototype.error = function(e) {
					var t = this._sources;
					if (!i.prototype.error.call(this, e)) return !1;
					for (var n = 0; n < t.length; n++) try {
						t[n].error(e);
					} catch {}
					return !0;
				}, m.prototype.lock = function() {
					i.prototype.lock.call(this);
					for (var e = this._sources, t = 0; t < e.length; t++) e[t].lock();
				}, t.exports = m;
			}, {
				"../crc32": 4,
				"../signature": 23,
				"../stream/GenericWorker": 28,
				"../utf8": 31,
				"../utils": 32
			}],
			9: [function(e, t, n) {
				var r = e("../compressions"), i = e("./ZipFileWorker"), a = function(e, t) {
					var n = e || t, i = r[n];
					if (!i) throw Error(n + " is not a valid compression method !");
					return i;
				};
				n.generateWorker = function(e, t, n) {
					var r = new i(t.streamFiles, n, t.platform, t.encodeFileName), o = 0;
					try {
						e.forEach(function(e, n) {
							o++;
							var i = a(n.options.compression, t.compression), s = n.options.compressionOptions || t.compressionOptions || {}, c = n.dir, l = n.date;
							n._compressWorker(i, s).withStreamInfo("file", {
								name: e,
								dir: c,
								date: l,
								comment: n.comment || "",
								unixPermissions: n.unixPermissions,
								dosPermissions: n.dosPermissions
							}).pipe(r);
						}), r.entriesCount = o;
					} catch (e) {
						r.error(e);
					}
					return r;
				};
			}, {
				"../compressions": 3,
				"./ZipFileWorker": 8
			}],
			10: [function(e, t, n) {
				function r() {
					if (!(this instanceof r)) return new r();
					if (arguments.length) throw Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
					this.files = Object.create(null), this.comment = null, this.root = "", this.clone = function() {
						var e = new r();
						for (var t in this) typeof this[t] != "function" && (e[t] = this[t]);
						return e;
					};
				}
				r.prototype = e("./object"), r.prototype.loadAsync = e("./load"), r.support = e("./support"), r.defaults = e("./defaults"), r.version = "3.10.1", r.loadAsync = function(e, t) {
					return new r().loadAsync(e, t);
				}, r.external = e("./external"), t.exports = r;
			}, {
				"./defaults": 5,
				"./external": 6,
				"./load": 11,
				"./object": 15,
				"./support": 30
			}],
			11: [function(e, t, n) {
				var r = e("./utils"), i = e("./external"), a = e("./utf8"), o = e("./zipEntries"), s = e("./stream/Crc32Probe"), c = e("./nodejsUtils");
				function l(e) {
					return new i.Promise(function(t, n) {
						var r = e.decompressed.getContentWorker().pipe(new s());
						r.on("error", function(e) {
							n(e);
						}).on("end", function() {
							r.streamInfo.crc32 === e.decompressed.crc32 ? t() : n(/* @__PURE__ */ Error("Corrupted zip : CRC32 mismatch"));
						}).resume();
					});
				}
				t.exports = function(e, t) {
					var n = this;
					return t = r.extend(t || {}, {
						base64: !1,
						checkCRC32: !1,
						optimizedBinaryString: !1,
						createFolders: !1,
						decodeFileName: a.utf8decode
					}), c.isNode && c.isStream(e) ? i.Promise.reject(/* @__PURE__ */ Error("JSZip can't accept a stream when loading a zip file.")) : r.prepareContent("the loaded zip file", e, !0, t.optimizedBinaryString, t.base64).then(function(e) {
						var n = new o(t);
						return n.load(e), n;
					}).then(function(e) {
						var n = [i.Promise.resolve(e)], r = e.files;
						if (t.checkCRC32) for (var a = 0; a < r.length; a++) n.push(l(r[a]));
						return i.Promise.all(n);
					}).then(function(e) {
						for (var i = e.shift(), a = i.files, o = 0; o < a.length; o++) {
							var s = a[o], c = s.fileNameStr, l = r.resolve(s.fileNameStr);
							n.file(l, s.decompressed, {
								binary: !0,
								optimizedBinaryString: !0,
								date: s.date,
								dir: s.dir,
								comment: s.fileCommentStr.length ? s.fileCommentStr : null,
								unixPermissions: s.unixPermissions,
								dosPermissions: s.dosPermissions,
								createFolders: t.createFolders
							}), s.dir || (n.file(l).unsafeOriginalName = c);
						}
						return i.zipComment.length && (n.comment = i.zipComment), n;
					});
				};
			}, {
				"./external": 6,
				"./nodejsUtils": 14,
				"./stream/Crc32Probe": 25,
				"./utf8": 31,
				"./utils": 32,
				"./zipEntries": 33
			}],
			12: [function(e, t, n) {
				var r = e("../utils"), i = e("../stream/GenericWorker");
				function a(e, t) {
					i.call(this, "Nodejs stream input adapter for " + e), this._upstreamEnded = !1, this._bindStream(t);
				}
				r.inherits(a, i), a.prototype._bindStream = function(e) {
					var t = this;
					this._stream = e, e.pause(), e.on("data", function(e) {
						t.push({
							data: e,
							meta: { percent: 0 }
						});
					}).on("error", function(e) {
						t.isPaused ? this.generatedError = e : t.error(e);
					}).on("end", function() {
						t.isPaused ? t._upstreamEnded = !0 : t.end();
					});
				}, a.prototype.pause = function() {
					return i.prototype.pause.call(this) ? (this._stream.pause(), !0) : !1;
				}, a.prototype.resume = function() {
					return i.prototype.resume.call(this) ? (this._upstreamEnded ? this.end() : this._stream.resume(), !0) : !1;
				}, t.exports = a;
			}, {
				"../stream/GenericWorker": 28,
				"../utils": 32
			}],
			13: [function(e, t, n) {
				var r = e("readable-stream").Readable;
				e("../utils").inherits(i, r);
				function i(e, t, n) {
					r.call(this, t), this._helper = e;
					var i = this;
					e.on("data", function(e, t) {
						i.push(e) || i._helper.pause(), n && n(t);
					}).on("error", function(e) {
						i.emit("error", e);
					}).on("end", function() {
						i.push(null);
					});
				}
				i.prototype._read = function() {
					this._helper.resume();
				}, t.exports = i;
			}, {
				"../utils": 32,
				"readable-stream": 16
			}],
			14: [function(e, t, n) {
				t.exports = {
					isNode: typeof Buffer < "u",
					newBufferFrom: function(e, t) {
						if (Buffer.from && Buffer.from !== Uint8Array.from) return Buffer.from(e, t);
						if (typeof e == "number") throw Error("The \"data\" argument must not be a number");
						return new Buffer(e, t);
					},
					allocBuffer: function(e) {
						if (Buffer.alloc) return Buffer.alloc(e);
						var t = new Buffer(e);
						return t.fill(0), t;
					},
					isBuffer: function(e) {
						return Buffer.isBuffer(e);
					},
					isStream: function(e) {
						return e && typeof e.on == "function" && typeof e.pause == "function" && typeof e.resume == "function";
					}
				};
			}, {}],
			15: [function(e, t, n) {
				var r = e("./utf8"), i = e("./utils"), a = e("./stream/GenericWorker"), o = e("./stream/StreamHelper"), s = e("./defaults"), c = e("./compressedObject"), l = e("./zipObject"), u = e("./generate"), d = e("./nodejsUtils"), f = e("./nodejs/NodejsStreamInputAdapter"), p = function(e, t, n) {
					var r = i.getTypeOf(t), o, u = i.extend(n || {}, s);
					u.date = u.date || /* @__PURE__ */ new Date(), u.compression !== null && (u.compression = u.compression.toUpperCase()), typeof u.unixPermissions == "string" && (u.unixPermissions = parseInt(u.unixPermissions, 8)), u.unixPermissions && u.unixPermissions & 16384 && (u.dir = !0), u.dosPermissions && u.dosPermissions & 16 && (u.dir = !0), u.dir && (e = h(e)), u.createFolders && (o = m(e)) && g.call(this, o, !0);
					var p = r === "string" && u.binary === !1 && u.base64 === !1;
					(!n || n.binary === void 0) && (u.binary = !p), (t instanceof c && t.uncompressedSize === 0 || u.dir || !t || t.length === 0) && (u.base64 = !1, u.binary = !0, t = "", u.compression = "STORE", r = "string");
					var _ = null;
					_ = t instanceof c || t instanceof a ? t : d.isNode && d.isStream(t) ? new f(e, t) : i.prepareContent(e, t, u.binary, u.optimizedBinaryString, u.base64);
					var v = new l(e, _, u);
					this.files[e] = v;
				}, m = function(e) {
					e.slice(-1) === "/" && (e = e.substring(0, e.length - 1));
					var t = e.lastIndexOf("/");
					return t > 0 ? e.substring(0, t) : "";
				}, h = function(e) {
					return e.slice(-1) !== "/" && (e += "/"), e;
				}, g = function(e, t) {
					return t = t === void 0 ? s.createFolders : t, e = h(e), this.files[e] || p.call(this, e, null, {
						dir: !0,
						createFolders: t
					}), this.files[e];
				};
				function _(e) {
					return Object.prototype.toString.call(e) === "[object RegExp]";
				}
				t.exports = {
					load: function() {
						throw Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
					},
					forEach: function(e) {
						var t, n, r;
						for (t in this.files) r = this.files[t], n = t.slice(this.root.length, t.length), n && t.slice(0, this.root.length) === this.root && e(n, r);
					},
					filter: function(e) {
						var t = [];
						return this.forEach(function(n, r) {
							e(n, r) && t.push(r);
						}), t;
					},
					file: function(e, t, n) {
						if (arguments.length === 1) if (_(e)) {
							var r = e;
							return this.filter(function(e, t) {
								return !t.dir && r.test(e);
							});
						} else {
							var i = this.files[this.root + e];
							return i && !i.dir ? i : null;
						}
						else e = this.root + e, p.call(this, e, t, n);
						return this;
					},
					folder: function(e) {
						if (!e) return this;
						if (_(e)) return this.filter(function(t, n) {
							return n.dir && e.test(t);
						});
						var t = this.root + e, n = g.call(this, t), r = this.clone();
						return r.root = n.name, r;
					},
					remove: function(e) {
						e = this.root + e;
						var t = this.files[e];
						if (t ||= (e.slice(-1) !== "/" && (e += "/"), this.files[e]), t && !t.dir) delete this.files[e];
						else for (var n = this.filter(function(t, n) {
							return n.name.slice(0, e.length) === e;
						}), r = 0; r < n.length; r++) delete this.files[n[r].name];
						return this;
					},
					generate: function() {
						throw Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
					},
					generateInternalStream: function(e) {
						var t, n = {};
						try {
							if (n = i.extend(e || {}, {
								streamFiles: !1,
								compression: "STORE",
								compressionOptions: null,
								type: "",
								platform: "DOS",
								comment: null,
								mimeType: "application/zip",
								encodeFileName: r.utf8encode
							}), n.type = n.type.toLowerCase(), n.compression = n.compression.toUpperCase(), n.type === "binarystring" && (n.type = "string"), !n.type) throw Error("No output type specified.");
							i.checkSupport(n.type), (n.platform === "darwin" || n.platform === "freebsd" || n.platform === "linux" || n.platform === "sunos") && (n.platform = "UNIX"), n.platform === "win32" && (n.platform = "DOS");
							var s = n.comment || this.comment || "";
							t = u.generateWorker(this, n, s);
						} catch (e) {
							t = new a("error"), t.error(e);
						}
						return new o(t, n.type || "string", n.mimeType);
					},
					generateAsync: function(e, t) {
						return this.generateInternalStream(e).accumulate(t);
					},
					generateNodeStream: function(e, t) {
						return e ||= {}, e.type ||= "nodebuffer", this.generateInternalStream(e).toNodejsStream(t);
					}
				};
			}, {
				"./compressedObject": 2,
				"./defaults": 5,
				"./generate": 9,
				"./nodejs/NodejsStreamInputAdapter": 12,
				"./nodejsUtils": 14,
				"./stream/GenericWorker": 28,
				"./stream/StreamHelper": 29,
				"./utf8": 31,
				"./utils": 32,
				"./zipObject": 35
			}],
			16: [function(e, t, n) {
				t.exports = e("stream");
			}, { stream: void 0 }],
			17: [function(e, t, n) {
				var r = e("./DataReader"), i = e("../utils");
				function a(e) {
					r.call(this, e);
					for (var t = 0; t < this.data.length; t++) e[t] = e[t] & 255;
				}
				i.inherits(a, r), a.prototype.byteAt = function(e) {
					return this.data[this.zero + e];
				}, a.prototype.lastIndexOfSignature = function(e) {
					for (var t = e.charCodeAt(0), n = e.charCodeAt(1), r = e.charCodeAt(2), i = e.charCodeAt(3), a = this.length - 4; a >= 0; --a) if (this.data[a] === t && this.data[a + 1] === n && this.data[a + 2] === r && this.data[a + 3] === i) return a - this.zero;
					return -1;
				}, a.prototype.readAndCheckSignature = function(e) {
					var t = e.charCodeAt(0), n = e.charCodeAt(1), r = e.charCodeAt(2), i = e.charCodeAt(3), a = this.readData(4);
					return t === a[0] && n === a[1] && r === a[2] && i === a[3];
				}, a.prototype.readData = function(e) {
					if (this.checkOffset(e), e === 0) return [];
					var t = this.data.slice(this.zero + this.index, this.zero + this.index + e);
					return this.index += e, t;
				}, t.exports = a;
			}, {
				"../utils": 32,
				"./DataReader": 18
			}],
			18: [function(e, t, n) {
				var r = e("../utils");
				function i(e) {
					this.data = e, this.length = e.length, this.index = 0, this.zero = 0;
				}
				i.prototype = {
					checkOffset: function(e) {
						this.checkIndex(this.index + e);
					},
					checkIndex: function(e) {
						if (this.length < this.zero + e || e < 0) throw Error("End of data reached (data length = " + this.length + ", asked index = " + e + "). Corrupted zip ?");
					},
					setIndex: function(e) {
						this.checkIndex(e), this.index = e;
					},
					skip: function(e) {
						this.setIndex(this.index + e);
					},
					byteAt: function() {},
					readInt: function(e) {
						var t = 0, n;
						for (this.checkOffset(e), n = this.index + e - 1; n >= this.index; n--) t = (t << 8) + this.byteAt(n);
						return this.index += e, t;
					},
					readString: function(e) {
						return r.transformTo("string", this.readData(e));
					},
					readData: function() {},
					lastIndexOfSignature: function() {},
					readAndCheckSignature: function() {},
					readDate: function() {
						var e = this.readInt(4);
						return new Date(Date.UTC((e >> 25 & 127) + 1980, (e >> 21 & 15) - 1, e >> 16 & 31, e >> 11 & 31, e >> 5 & 63, (e & 31) << 1));
					}
				}, t.exports = i;
			}, { "../utils": 32 }],
			19: [function(e, t, n) {
				var r = e("./Uint8ArrayReader"), i = e("../utils");
				function a(e) {
					r.call(this, e);
				}
				i.inherits(a, r), a.prototype.readData = function(e) {
					this.checkOffset(e);
					var t = this.data.slice(this.zero + this.index, this.zero + this.index + e);
					return this.index += e, t;
				}, t.exports = a;
			}, {
				"../utils": 32,
				"./Uint8ArrayReader": 21
			}],
			20: [function(e, t, n) {
				var r = e("./DataReader"), i = e("../utils");
				function a(e) {
					r.call(this, e);
				}
				i.inherits(a, r), a.prototype.byteAt = function(e) {
					return this.data.charCodeAt(this.zero + e);
				}, a.prototype.lastIndexOfSignature = function(e) {
					return this.data.lastIndexOf(e) - this.zero;
				}, a.prototype.readAndCheckSignature = function(e) {
					return e === this.readData(4);
				}, a.prototype.readData = function(e) {
					this.checkOffset(e);
					var t = this.data.slice(this.zero + this.index, this.zero + this.index + e);
					return this.index += e, t;
				}, t.exports = a;
			}, {
				"../utils": 32,
				"./DataReader": 18
			}],
			21: [function(e, t, n) {
				var r = e("./ArrayReader"), i = e("../utils");
				function a(e) {
					r.call(this, e);
				}
				i.inherits(a, r), a.prototype.readData = function(e) {
					if (this.checkOffset(e), e === 0) return new Uint8Array();
					var t = this.data.subarray(this.zero + this.index, this.zero + this.index + e);
					return this.index += e, t;
				}, t.exports = a;
			}, {
				"../utils": 32,
				"./ArrayReader": 17
			}],
			22: [function(e, t, n) {
				var r = e("../utils"), i = e("../support"), a = e("./ArrayReader"), o = e("./StringReader"), s = e("./NodeBufferReader"), c = e("./Uint8ArrayReader");
				t.exports = function(e) {
					var t = r.getTypeOf(e);
					return r.checkSupport(t), t === "string" && !i.uint8array ? new o(e) : t === "nodebuffer" ? new s(e) : i.uint8array ? new c(r.transformTo("uint8array", e)) : new a(r.transformTo("array", e));
				};
			}, {
				"../support": 30,
				"../utils": 32,
				"./ArrayReader": 17,
				"./NodeBufferReader": 19,
				"./StringReader": 20,
				"./Uint8ArrayReader": 21
			}],
			23: [function(e, t, n) {
				n.LOCAL_FILE_HEADER = "PK", n.CENTRAL_FILE_HEADER = "PK", n.CENTRAL_DIRECTORY_END = "PK", n.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x07", n.ZIP64_CENTRAL_DIRECTORY_END = "PK", n.DATA_DESCRIPTOR = "PK\x07\b";
			}, {}],
			24: [function(e, t, n) {
				var r = e("./GenericWorker"), i = e("../utils");
				function a(e) {
					r.call(this, "ConvertWorker to " + e), this.destType = e;
				}
				i.inherits(a, r), a.prototype.processChunk = function(e) {
					this.push({
						data: i.transformTo(this.destType, e.data),
						meta: e.meta
					});
				}, t.exports = a;
			}, {
				"../utils": 32,
				"./GenericWorker": 28
			}],
			25: [function(e, t, n) {
				var r = e("./GenericWorker"), i = e("../crc32"), a = e("../utils");
				function o() {
					r.call(this, "Crc32Probe"), this.withStreamInfo("crc32", 0);
				}
				a.inherits(o, r), o.prototype.processChunk = function(e) {
					this.streamInfo.crc32 = i(e.data, this.streamInfo.crc32 || 0), this.push(e);
				}, t.exports = o;
			}, {
				"../crc32": 4,
				"../utils": 32,
				"./GenericWorker": 28
			}],
			26: [function(e, t, n) {
				var r = e("../utils"), i = e("./GenericWorker");
				function a(e) {
					i.call(this, "DataLengthProbe for " + e), this.propName = e, this.withStreamInfo(e, 0);
				}
				r.inherits(a, i), a.prototype.processChunk = function(e) {
					if (e) {
						var t = this.streamInfo[this.propName] || 0;
						this.streamInfo[this.propName] = t + e.data.length;
					}
					i.prototype.processChunk.call(this, e);
				}, t.exports = a;
			}, {
				"../utils": 32,
				"./GenericWorker": 28
			}],
			27: [function(e, t, n) {
				var r = e("../utils"), i = e("./GenericWorker"), a = 16 * 1024;
				function o(e) {
					i.call(this, "DataWorker");
					var t = this;
					this.dataIsReady = !1, this.index = 0, this.max = 0, this.data = null, this.type = "", this._tickScheduled = !1, e.then(function(e) {
						t.dataIsReady = !0, t.data = e, t.max = e && e.length || 0, t.type = r.getTypeOf(e), t.isPaused || t._tickAndRepeat();
					}, function(e) {
						t.error(e);
					});
				}
				r.inherits(o, i), o.prototype.cleanUp = function() {
					i.prototype.cleanUp.call(this), this.data = null;
				}, o.prototype.resume = function() {
					return i.prototype.resume.call(this) ? (!this._tickScheduled && this.dataIsReady && (this._tickScheduled = !0, r.delay(this._tickAndRepeat, [], this)), !0) : !1;
				}, o.prototype._tickAndRepeat = function() {
					this._tickScheduled = !1, !(this.isPaused || this.isFinished) && (this._tick(), this.isFinished || (r.delay(this._tickAndRepeat, [], this), this._tickScheduled = !0));
				}, o.prototype._tick = function() {
					if (this.isPaused || this.isFinished) return !1;
					var e = a, t = null, n = Math.min(this.max, this.index + e);
					if (this.index >= this.max) return this.end();
					switch (this.type) {
						case "string":
							t = this.data.substring(this.index, n);
							break;
						case "uint8array":
							t = this.data.subarray(this.index, n);
							break;
						case "array":
						case "nodebuffer":
							t = this.data.slice(this.index, n);
							break;
					}
					return this.index = n, this.push({
						data: t,
						meta: { percent: this.max ? this.index / this.max * 100 : 0 }
					});
				}, t.exports = o;
			}, {
				"../utils": 32,
				"./GenericWorker": 28
			}],
			28: [function(e, t, n) {
				function r(e) {
					this.name = e || "default", this.streamInfo = {}, this.generatedError = null, this.extraStreamInfo = {}, this.isPaused = !0, this.isFinished = !1, this.isLocked = !1, this._listeners = {
						data: [],
						end: [],
						error: []
					}, this.previous = null;
				}
				r.prototype = {
					push: function(e) {
						this.emit("data", e);
					},
					end: function() {
						if (this.isFinished) return !1;
						this.flush();
						try {
							this.emit("end"), this.cleanUp(), this.isFinished = !0;
						} catch (e) {
							this.emit("error", e);
						}
						return !0;
					},
					error: function(e) {
						return this.isFinished ? !1 : (this.isPaused ? this.generatedError = e : (this.isFinished = !0, this.emit("error", e), this.previous && this.previous.error(e), this.cleanUp()), !0);
					},
					on: function(e, t) {
						return this._listeners[e].push(t), this;
					},
					cleanUp: function() {
						this.streamInfo = this.generatedError = this.extraStreamInfo = null, this._listeners = [];
					},
					emit: function(e, t) {
						if (this._listeners[e]) for (var n = 0; n < this._listeners[e].length; n++) this._listeners[e][n].call(this, t);
					},
					pipe: function(e) {
						return e.registerPrevious(this);
					},
					registerPrevious: function(e) {
						if (this.isLocked) throw Error("The stream '" + this + "' has already been used.");
						this.streamInfo = e.streamInfo, this.mergeStreamInfo(), this.previous = e;
						var t = this;
						return e.on("data", function(e) {
							t.processChunk(e);
						}), e.on("end", function() {
							t.end();
						}), e.on("error", function(e) {
							t.error(e);
						}), this;
					},
					pause: function() {
						return this.isPaused || this.isFinished ? !1 : (this.isPaused = !0, this.previous && this.previous.pause(), !0);
					},
					resume: function() {
						if (!this.isPaused || this.isFinished) return !1;
						this.isPaused = !1;
						var e = !1;
						return this.generatedError && (this.error(this.generatedError), e = !0), this.previous && this.previous.resume(), !e;
					},
					flush: function() {},
					processChunk: function(e) {
						this.push(e);
					},
					withStreamInfo: function(e, t) {
						return this.extraStreamInfo[e] = t, this.mergeStreamInfo(), this;
					},
					mergeStreamInfo: function() {
						for (var e in this.extraStreamInfo) Object.prototype.hasOwnProperty.call(this.extraStreamInfo, e) && (this.streamInfo[e] = this.extraStreamInfo[e]);
					},
					lock: function() {
						if (this.isLocked) throw Error("The stream '" + this + "' has already been used.");
						this.isLocked = !0, this.previous && this.previous.lock();
					},
					toString: function() {
						var e = "Worker " + this.name;
						return this.previous ? this.previous + " -> " + e : e;
					}
				}, t.exports = r;
			}, {}],
			29: [function(e, t, n) {
				var r = e("../utils"), i = e("./ConvertWorker"), a = e("./GenericWorker"), o = e("../base64"), s = e("../support"), c = e("../external"), l = null;
				if (s.nodestream) try {
					l = e("../nodejs/NodejsStreamOutputAdapter");
				} catch {}
				function u(e, t, n) {
					switch (e) {
						case "blob": return r.newBlob(r.transformTo("arraybuffer", t), n);
						case "base64": return o.encode(t);
						default: return r.transformTo(e, t);
					}
				}
				function d(e, t) {
					var n, r = 0, i = null, a = 0;
					for (n = 0; n < t.length; n++) a += t[n].length;
					switch (e) {
						case "string": return t.join("");
						case "array": return Array.prototype.concat.apply([], t);
						case "uint8array":
							for (i = new Uint8Array(a), n = 0; n < t.length; n++) i.set(t[n], r), r += t[n].length;
							return i;
						case "nodebuffer": return Buffer.concat(t);
						default: throw Error("concat : unsupported type '" + e + "'");
					}
				}
				function f(e, t) {
					return new c.Promise(function(n, r) {
						var i = [], a = e._internalType, o = e._outputType, s = e._mimeType;
						e.on("data", function(e, n) {
							i.push(e), t && t(n);
						}).on("error", function(e) {
							i = [], r(e);
						}).on("end", function() {
							try {
								n(u(o, d(a, i), s));
							} catch (e) {
								r(e);
							}
							i = [];
						}).resume();
					});
				}
				function p(e, t, n) {
					var o = t;
					switch (t) {
						case "blob":
						case "arraybuffer":
							o = "uint8array";
							break;
						case "base64":
							o = "string";
							break;
					}
					try {
						this._internalType = o, this._outputType = t, this._mimeType = n, r.checkSupport(o), this._worker = e.pipe(new i(o)), e.lock();
					} catch (e) {
						this._worker = new a("error"), this._worker.error(e);
					}
				}
				p.prototype = {
					accumulate: function(e) {
						return f(this, e);
					},
					on: function(e, t) {
						var n = this;
						return e === "data" ? this._worker.on(e, function(e) {
							t.call(n, e.data, e.meta);
						}) : this._worker.on(e, function() {
							r.delay(t, arguments, n);
						}), this;
					},
					resume: function() {
						return r.delay(this._worker.resume, [], this._worker), this;
					},
					pause: function() {
						return this._worker.pause(), this;
					},
					toNodejsStream: function(e) {
						if (r.checkSupport("nodestream"), this._outputType !== "nodebuffer") throw Error(this._outputType + " is not supported by this method");
						return new l(this, { objectMode: this._outputType !== "nodebuffer" }, e);
					}
				}, t.exports = p;
			}, {
				"../base64": 1,
				"../external": 6,
				"../nodejs/NodejsStreamOutputAdapter": 13,
				"../support": 30,
				"../utils": 32,
				"./ConvertWorker": 24,
				"./GenericWorker": 28
			}],
			30: [function(e, t, n) {
				if (n.base64 = !0, n.array = !0, n.string = !0, n.arraybuffer = typeof ArrayBuffer < "u" && typeof Uint8Array < "u", n.nodebuffer = typeof Buffer < "u", n.uint8array = typeof Uint8Array < "u", typeof ArrayBuffer > "u") n.blob = !1;
				else {
					var r = /* @__PURE__ */ new ArrayBuffer(0);
					try {
						n.blob = new Blob([r], { type: "application/zip" }).size === 0;
					} catch {
						try {
							var i = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
							i.append(r), n.blob = i.getBlob("application/zip").size === 0;
						} catch {
							n.blob = !1;
						}
					}
				}
				try {
					n.nodestream = !!e("readable-stream").Readable;
				} catch {
					n.nodestream = !1;
				}
			}, { "readable-stream": 16 }],
			31: [function(e, t, n) {
				for (var r = e("./utils"), i = e("./support"), a = e("./nodejsUtils"), o = e("./stream/GenericWorker"), s = Array(256), c = 0; c < 256; c++) s[c] = c >= 252 ? 6 : c >= 248 ? 5 : c >= 240 ? 4 : c >= 224 ? 3 : c >= 192 ? 2 : 1;
				s[254] = s[254] = 1;
				var l = function(e) {
					var t, n, r, a, o, s = e.length, c = 0;
					for (a = 0; a < s; a++) n = e.charCodeAt(a), (n & 64512) == 55296 && a + 1 < s && (r = e.charCodeAt(a + 1), (r & 64512) == 56320 && (n = 65536 + (n - 55296 << 10) + (r - 56320), a++)), c += n < 128 ? 1 : n < 2048 ? 2 : n < 65536 ? 3 : 4;
					for (t = i.uint8array ? new Uint8Array(c) : Array(c), o = 0, a = 0; o < c; a++) n = e.charCodeAt(a), (n & 64512) == 55296 && a + 1 < s && (r = e.charCodeAt(a + 1), (r & 64512) == 56320 && (n = 65536 + (n - 55296 << 10) + (r - 56320), a++)), n < 128 ? t[o++] = n : n < 2048 ? (t[o++] = 192 | n >>> 6, t[o++] = 128 | n & 63) : n < 65536 ? (t[o++] = 224 | n >>> 12, t[o++] = 128 | n >>> 6 & 63, t[o++] = 128 | n & 63) : (t[o++] = 240 | n >>> 18, t[o++] = 128 | n >>> 12 & 63, t[o++] = 128 | n >>> 6 & 63, t[o++] = 128 | n & 63);
					return t;
				}, u = function(e, t) {
					var n;
					for (t ||= e.length, t > e.length && (t = e.length), n = t - 1; n >= 0 && (e[n] & 192) == 128;) n--;
					return n < 0 || n === 0 ? t : n + s[e[n]] > t ? n : t;
				}, d = function(e) {
					var t, n, i, a, o = e.length, c = Array(o * 2);
					for (n = 0, t = 0; t < o;) {
						if (i = e[t++], i < 128) {
							c[n++] = i;
							continue;
						}
						if (a = s[i], a > 4) {
							c[n++] = 65533, t += a - 1;
							continue;
						}
						for (i &= a === 2 ? 31 : a === 3 ? 15 : 7; a > 1 && t < o;) i = i << 6 | e[t++] & 63, a--;
						if (a > 1) {
							c[n++] = 65533;
							continue;
						}
						i < 65536 ? c[n++] = i : (i -= 65536, c[n++] = 55296 | i >> 10 & 1023, c[n++] = 56320 | i & 1023);
					}
					return c.length !== n && (c.subarray ? c = c.subarray(0, n) : c.length = n), r.applyFromCharCode(c);
				};
				n.utf8encode = function(e) {
					return i.nodebuffer ? a.newBufferFrom(e, "utf-8") : l(e);
				}, n.utf8decode = function(e) {
					return i.nodebuffer ? r.transformTo("nodebuffer", e).toString("utf-8") : (e = r.transformTo(i.uint8array ? "uint8array" : "array", e), d(e));
				};
				function f() {
					o.call(this, "utf-8 decode"), this.leftOver = null;
				}
				r.inherits(f, o), f.prototype.processChunk = function(e) {
					var t = r.transformTo(i.uint8array ? "uint8array" : "array", e.data);
					if (this.leftOver && this.leftOver.length) {
						if (i.uint8array) {
							var a = t;
							t = new Uint8Array(a.length + this.leftOver.length), t.set(this.leftOver, 0), t.set(a, this.leftOver.length);
						} else t = this.leftOver.concat(t);
						this.leftOver = null;
					}
					var o = u(t), s = t;
					o !== t.length && (i.uint8array ? (s = t.subarray(0, o), this.leftOver = t.subarray(o, t.length)) : (s = t.slice(0, o), this.leftOver = t.slice(o, t.length))), this.push({
						data: n.utf8decode(s),
						meta: e.meta
					});
				}, f.prototype.flush = function() {
					this.leftOver && this.leftOver.length && (this.push({
						data: n.utf8decode(this.leftOver),
						meta: {}
					}), this.leftOver = null);
				}, n.Utf8DecodeWorker = f;
				function p() {
					o.call(this, "utf-8 encode");
				}
				r.inherits(p, o), p.prototype.processChunk = function(e) {
					this.push({
						data: n.utf8encode(e.data),
						meta: e.meta
					});
				}, n.Utf8EncodeWorker = p;
			}, {
				"./nodejsUtils": 14,
				"./stream/GenericWorker": 28,
				"./support": 30,
				"./utils": 32
			}],
			32: [function(e, t, n) {
				var r = e("./support"), i = e("./base64"), a = e("./nodejsUtils"), o = e("./external");
				e("setimmediate");
				function s(e) {
					var t = null;
					return t = r.uint8array ? new Uint8Array(e.length) : Array(e.length), l(e, t);
				}
				n.newBlob = function(e, t) {
					n.checkSupport("blob");
					try {
						return new Blob([e], { type: t });
					} catch {
						try {
							var r = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
							return r.append(e), r.getBlob(t);
						} catch {
							throw Error("Bug : can't construct the Blob.");
						}
					}
				};
				function c(e) {
					return e;
				}
				function l(e, t) {
					for (var n = 0; n < e.length; ++n) t[n] = e.charCodeAt(n) & 255;
					return t;
				}
				var u = {
					stringifyByChunk: function(e, t, n) {
						var r = [], i = 0, a = e.length;
						if (a <= n) return String.fromCharCode.apply(null, e);
						for (; i < a;) t === "array" || t === "nodebuffer" ? r.push(String.fromCharCode.apply(null, e.slice(i, Math.min(i + n, a)))) : r.push(String.fromCharCode.apply(null, e.subarray(i, Math.min(i + n, a)))), i += n;
						return r.join("");
					},
					stringifyByChar: function(e) {
						for (var t = "", n = 0; n < e.length; n++) t += String.fromCharCode(e[n]);
						return t;
					},
					applyCanBeUsed: {
						uint8array: (function() {
							try {
								return r.uint8array && String.fromCharCode.apply(null, new Uint8Array(1)).length === 1;
							} catch {
								return !1;
							}
						})(),
						nodebuffer: (function() {
							try {
								return r.nodebuffer && String.fromCharCode.apply(null, a.allocBuffer(1)).length === 1;
							} catch {
								return !1;
							}
						})()
					}
				};
				function d(e) {
					var t = 65536, r = n.getTypeOf(e), i = !0;
					if (r === "uint8array" ? i = u.applyCanBeUsed.uint8array : r === "nodebuffer" && (i = u.applyCanBeUsed.nodebuffer), i) for (; t > 1;) try {
						return u.stringifyByChunk(e, r, t);
					} catch {
						t = Math.floor(t / 2);
					}
					return u.stringifyByChar(e);
				}
				n.applyFromCharCode = d;
				function f(e, t) {
					for (var n = 0; n < e.length; n++) t[n] = e[n];
					return t;
				}
				var p = {};
				p.string = {
					string: c,
					array: function(e) {
						return l(e, Array(e.length));
					},
					arraybuffer: function(e) {
						return p.string.uint8array(e).buffer;
					},
					uint8array: function(e) {
						return l(e, new Uint8Array(e.length));
					},
					nodebuffer: function(e) {
						return l(e, a.allocBuffer(e.length));
					}
				}, p.array = {
					string: d,
					array: c,
					arraybuffer: function(e) {
						return new Uint8Array(e).buffer;
					},
					uint8array: function(e) {
						return new Uint8Array(e);
					},
					nodebuffer: function(e) {
						return a.newBufferFrom(e);
					}
				}, p.arraybuffer = {
					string: function(e) {
						return d(new Uint8Array(e));
					},
					array: function(e) {
						return f(new Uint8Array(e), Array(e.byteLength));
					},
					arraybuffer: c,
					uint8array: function(e) {
						return new Uint8Array(e);
					},
					nodebuffer: function(e) {
						return a.newBufferFrom(new Uint8Array(e));
					}
				}, p.uint8array = {
					string: d,
					array: function(e) {
						return f(e, Array(e.length));
					},
					arraybuffer: function(e) {
						return e.buffer;
					},
					uint8array: c,
					nodebuffer: function(e) {
						return a.newBufferFrom(e);
					}
				}, p.nodebuffer = {
					string: d,
					array: function(e) {
						return f(e, Array(e.length));
					},
					arraybuffer: function(e) {
						return p.nodebuffer.uint8array(e).buffer;
					},
					uint8array: function(e) {
						return f(e, new Uint8Array(e.length));
					},
					nodebuffer: c
				}, n.transformTo = function(e, t) {
					return t ||= "", e ? (n.checkSupport(e), p[n.getTypeOf(t)][e](t)) : t;
				}, n.resolve = function(e) {
					for (var t = e.split("/"), n = [], r = 0; r < t.length; r++) {
						var i = t[r];
						i === "." || i === "" && r !== 0 && r !== t.length - 1 || (i === ".." ? n.pop() : n.push(i));
					}
					return n.join("/");
				}, n.getTypeOf = function(e) {
					if (typeof e == "string") return "string";
					if (Object.prototype.toString.call(e) === "[object Array]") return "array";
					if (r.nodebuffer && a.isBuffer(e)) return "nodebuffer";
					if (r.uint8array && e instanceof Uint8Array) return "uint8array";
					if (r.arraybuffer && e instanceof ArrayBuffer) return "arraybuffer";
				}, n.checkSupport = function(e) {
					if (!r[e.toLowerCase()]) throw Error(e + " is not supported by this platform");
				}, n.MAX_VALUE_16BITS = 65535, n.MAX_VALUE_32BITS = -1, n.pretty = function(e) {
					var t = "", n, r;
					for (r = 0; r < (e || "").length; r++) n = e.charCodeAt(r), t += "\\x" + (n < 16 ? "0" : "") + n.toString(16).toUpperCase();
					return t;
				}, n.delay = function(e, t, n) {
					setImmediate(function() {
						e.apply(n || null, t || []);
					});
				}, n.inherits = function(e, t) {
					var n = function() {};
					n.prototype = t.prototype, e.prototype = new n();
				}, n.extend = function() {
					var e = {}, t, n;
					for (t = 0; t < arguments.length; t++) for (n in arguments[t]) Object.prototype.hasOwnProperty.call(arguments[t], n) && e[n] === void 0 && (e[n] = arguments[t][n]);
					return e;
				}, n.prepareContent = function(e, t, a, c, l) {
					return o.Promise.resolve(t).then(function(e) {
						return r.blob && (e instanceof Blob || ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(e)) !== -1) && typeof FileReader < "u" ? new o.Promise(function(t, n) {
							var r = new FileReader();
							r.onload = function(e) {
								t(e.target.result);
							}, r.onerror = function(e) {
								n(e.target.error);
							}, r.readAsArrayBuffer(e);
						}) : e;
					}).then(function(t) {
						var r = n.getTypeOf(t);
						return r ? (r === "arraybuffer" ? t = n.transformTo("uint8array", t) : r === "string" && (l ? t = i.decode(t) : a && c !== !0 && (t = s(t))), t) : o.Promise.reject(/* @__PURE__ */ Error("Can't read the data of '" + e + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"));
					});
				};
			}, {
				"./base64": 1,
				"./external": 6,
				"./nodejsUtils": 14,
				"./support": 30,
				setimmediate: 54
			}],
			33: [function(e, t, n) {
				var r = e("./reader/readerFor"), i = e("./utils"), a = e("./signature"), o = e("./zipEntry"), s = e("./support");
				function c(e) {
					this.files = [], this.loadOptions = e;
				}
				c.prototype = {
					checkSignature: function(e) {
						if (!this.reader.readAndCheckSignature(e)) {
							this.reader.index -= 4;
							var t = this.reader.readString(4);
							throw Error("Corrupted zip or bug: unexpected signature (" + i.pretty(t) + ", expected " + i.pretty(e) + ")");
						}
					},
					isSignature: function(e, t) {
						var n = this.reader.index;
						this.reader.setIndex(e);
						var r = this.reader.readString(4) === t;
						return this.reader.setIndex(n), r;
					},
					readBlockEndOfCentral: function() {
						this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2);
						var e = this.reader.readData(this.zipCommentLength), t = s.uint8array ? "uint8array" : "array", n = i.transformTo(t, e);
						this.zipComment = this.loadOptions.decodeFileName(n);
					},
					readBlockZip64EndOfCentral: function() {
						this.zip64EndOfCentralSize = this.reader.readInt(8), this.reader.skip(4), this.diskNumber = this.reader.readInt(4), this.diskWithCentralDirStart = this.reader.readInt(4), this.centralDirRecordsOnThisDisk = this.reader.readInt(8), this.centralDirRecords = this.reader.readInt(8), this.centralDirSize = this.reader.readInt(8), this.centralDirOffset = this.reader.readInt(8), this.zip64ExtensibleData = {};
						for (var e = this.zip64EndOfCentralSize - 44, t = 0, n, r, i; t < e;) n = this.reader.readInt(2), r = this.reader.readInt(4), i = this.reader.readData(r), this.zip64ExtensibleData[n] = {
							id: n,
							length: r,
							value: i
						};
					},
					readBlockZip64EndOfCentralLocator: function() {
						if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), this.disksCount > 1) throw Error("Multi-volumes zip are not supported");
					},
					readLocalFiles: function() {
						var e, t;
						for (e = 0; e < this.files.length; e++) t = this.files[e], this.reader.setIndex(t.localHeaderOffset), this.checkSignature(a.LOCAL_FILE_HEADER), t.readLocalPart(this.reader), t.handleUTF8(), t.processAttributes();
					},
					readCentralDir: function() {
						var e;
						for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(a.CENTRAL_FILE_HEADER);) e = new o({ zip64: this.zip64 }, this.loadOptions), e.readCentralPart(this.reader), this.files.push(e);
						if (this.centralDirRecords !== this.files.length && this.centralDirRecords !== 0 && this.files.length === 0) throw Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
					},
					readEndOfCentral: function() {
						var e = this.reader.lastIndexOfSignature(a.CENTRAL_DIRECTORY_END);
						if (e < 0) throw this.isSignature(0, a.LOCAL_FILE_HEADER) ? Error("Corrupted zip: can't find end of central directory") : Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");
						this.reader.setIndex(e);
						var t = e;
						if (this.checkSignature(a.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === i.MAX_VALUE_16BITS || this.diskWithCentralDirStart === i.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === i.MAX_VALUE_16BITS || this.centralDirRecords === i.MAX_VALUE_16BITS || this.centralDirSize === i.MAX_VALUE_32BITS || this.centralDirOffset === i.MAX_VALUE_32BITS) {
							if (this.zip64 = !0, e = this.reader.lastIndexOfSignature(a.ZIP64_CENTRAL_DIRECTORY_LOCATOR), e < 0) throw Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
							if (this.reader.setIndex(e), this.checkSignature(a.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, a.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(a.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0)) throw Error("Corrupted zip: can't find the ZIP64 end of central directory");
							this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(a.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral();
						}
						var n = this.centralDirOffset + this.centralDirSize;
						this.zip64 && (n += 20, n += 12 + this.zip64EndOfCentralSize);
						var r = t - n;
						if (r > 0) this.isSignature(t, a.CENTRAL_FILE_HEADER) || (this.reader.zero = r);
						else if (r < 0) throw Error("Corrupted zip: missing " + Math.abs(r) + " bytes.");
					},
					prepareReader: function(e) {
						this.reader = r(e);
					},
					load: function(e) {
						this.prepareReader(e), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles();
					}
				}, t.exports = c;
			}, {
				"./reader/readerFor": 22,
				"./signature": 23,
				"./support": 30,
				"./utils": 32,
				"./zipEntry": 34
			}],
			34: [function(e, t, n) {
				var r = e("./reader/readerFor"), i = e("./utils"), a = e("./compressedObject"), o = e("./crc32"), s = e("./utf8"), c = e("./compressions"), l = e("./support"), u = 0, d = 3, f = function(e) {
					for (var t in c) if (Object.prototype.hasOwnProperty.call(c, t) && c[t].magic === e) return c[t];
					return null;
				};
				function p(e, t) {
					this.options = e, this.loadOptions = t;
				}
				p.prototype = {
					isEncrypted: function() {
						return (this.bitFlag & 1) == 1;
					},
					useUTF8: function() {
						return (this.bitFlag & 2048) == 2048;
					},
					readLocalPart: function(e) {
						var t, n;
						if (e.skip(22), this.fileNameLength = e.readInt(2), n = e.readInt(2), this.fileName = e.readData(this.fileNameLength), e.skip(n), this.compressedSize === -1 || this.uncompressedSize === -1) throw Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
						if (t = f(this.compressionMethod), t === null) throw Error("Corrupted zip : compression " + i.pretty(this.compressionMethod) + " unknown (inner file : " + i.transformTo("string", this.fileName) + ")");
						this.decompressed = new a(this.compressedSize, this.uncompressedSize, this.crc32, t, e.readData(this.compressedSize));
					},
					readCentralPart: function(e) {
						this.versionMadeBy = e.readInt(2), e.skip(2), this.bitFlag = e.readInt(2), this.compressionMethod = e.readString(2), this.date = e.readDate(), this.crc32 = e.readInt(4), this.compressedSize = e.readInt(4), this.uncompressedSize = e.readInt(4);
						var t = e.readInt(2);
						if (this.extraFieldsLength = e.readInt(2), this.fileCommentLength = e.readInt(2), this.diskNumberStart = e.readInt(2), this.internalFileAttributes = e.readInt(2), this.externalFileAttributes = e.readInt(4), this.localHeaderOffset = e.readInt(4), this.isEncrypted()) throw Error("Encrypted zip are not supported");
						e.skip(t), this.readExtraFields(e), this.parseZIP64ExtraField(e), this.fileComment = e.readData(this.fileCommentLength);
					},
					processAttributes: function() {
						this.unixPermissions = null, this.dosPermissions = null;
						var e = this.versionMadeBy >> 8;
						this.dir = !!(this.externalFileAttributes & 16), e === u && (this.dosPermissions = this.externalFileAttributes & 63), e === d && (this.unixPermissions = this.externalFileAttributes >> 16 & 65535), !this.dir && this.fileNameStr.slice(-1) === "/" && (this.dir = !0);
					},
					parseZIP64ExtraField: function() {
						if (this.extraFields[1]) {
							var e = r(this.extraFields[1].value);
							this.uncompressedSize === i.MAX_VALUE_32BITS && (this.uncompressedSize = e.readInt(8)), this.compressedSize === i.MAX_VALUE_32BITS && (this.compressedSize = e.readInt(8)), this.localHeaderOffset === i.MAX_VALUE_32BITS && (this.localHeaderOffset = e.readInt(8)), this.diskNumberStart === i.MAX_VALUE_32BITS && (this.diskNumberStart = e.readInt(4));
						}
					},
					readExtraFields: function(e) {
						var t = e.index + this.extraFieldsLength, n, r, i;
						for (this.extraFields ||= {}; e.index + 4 < t;) n = e.readInt(2), r = e.readInt(2), i = e.readData(r), this.extraFields[n] = {
							id: n,
							length: r,
							value: i
						};
						e.setIndex(t);
					},
					handleUTF8: function() {
						var e = l.uint8array ? "uint8array" : "array";
						if (this.useUTF8()) this.fileNameStr = s.utf8decode(this.fileName), this.fileCommentStr = s.utf8decode(this.fileComment);
						else {
							var t = this.findExtraFieldUnicodePath();
							if (t !== null) this.fileNameStr = t;
							else {
								var n = i.transformTo(e, this.fileName);
								this.fileNameStr = this.loadOptions.decodeFileName(n);
							}
							var r = this.findExtraFieldUnicodeComment();
							if (r !== null) this.fileCommentStr = r;
							else {
								var a = i.transformTo(e, this.fileComment);
								this.fileCommentStr = this.loadOptions.decodeFileName(a);
							}
						}
					},
					findExtraFieldUnicodePath: function() {
						var e = this.extraFields[28789];
						if (e) {
							var t = r(e.value);
							return t.readInt(1) !== 1 || o(this.fileName) !== t.readInt(4) ? null : s.utf8decode(t.readData(e.length - 5));
						}
						return null;
					},
					findExtraFieldUnicodeComment: function() {
						var e = this.extraFields[25461];
						if (e) {
							var t = r(e.value);
							return t.readInt(1) !== 1 || o(this.fileComment) !== t.readInt(4) ? null : s.utf8decode(t.readData(e.length - 5));
						}
						return null;
					}
				}, t.exports = p;
			}, {
				"./compressedObject": 2,
				"./compressions": 3,
				"./crc32": 4,
				"./reader/readerFor": 22,
				"./support": 30,
				"./utf8": 31,
				"./utils": 32
			}],
			35: [function(e, t, n) {
				var r = e("./stream/StreamHelper"), i = e("./stream/DataWorker"), a = e("./utf8"), o = e("./compressedObject"), s = e("./stream/GenericWorker"), c = function(e, t, n) {
					this.name = e, this.dir = n.dir, this.date = n.date, this.comment = n.comment, this.unixPermissions = n.unixPermissions, this.dosPermissions = n.dosPermissions, this._data = t, this._dataBinary = n.binary, this.options = {
						compression: n.compression,
						compressionOptions: n.compressionOptions
					};
				};
				c.prototype = {
					internalStream: function(e) {
						var t = null, n = "string";
						try {
							if (!e) throw Error("No output type specified.");
							n = e.toLowerCase();
							var i = n === "string" || n === "text";
							(n === "binarystring" || n === "text") && (n = "string"), t = this._decompressWorker();
							var o = !this._dataBinary;
							o && !i && (t = t.pipe(new a.Utf8EncodeWorker())), !o && i && (t = t.pipe(new a.Utf8DecodeWorker()));
						} catch (e) {
							t = new s("error"), t.error(e);
						}
						return new r(t, n, "");
					},
					async: function(e, t) {
						return this.internalStream(e).accumulate(t);
					},
					nodeStream: function(e, t) {
						return this.internalStream(e || "nodebuffer").toNodejsStream(t);
					},
					_compressWorker: function(e, t) {
						if (this._data instanceof o && this._data.compression.magic === e.magic) return this._data.getCompressedWorker();
						var n = this._decompressWorker();
						return this._dataBinary || (n = n.pipe(new a.Utf8EncodeWorker())), o.createWorkerFrom(n, e, t);
					},
					_decompressWorker: function() {
						return this._data instanceof o ? this._data.getContentWorker() : this._data instanceof s ? this._data : new i(this._data);
					}
				};
				for (var l = [
					"asText",
					"asBinary",
					"asNodeBuffer",
					"asUint8Array",
					"asArrayBuffer"
				], u = function() {
					throw Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
				}, d = 0; d < l.length; d++) c.prototype[l[d]] = u;
				t.exports = c;
			}, {
				"./compressedObject": 2,
				"./stream/DataWorker": 27,
				"./stream/GenericWorker": 28,
				"./stream/StreamHelper": 29,
				"./utf8": 31
			}],
			36: [function(e, t, n) {
				(function(e) {
					var n = e.MutationObserver || e.WebKitMutationObserver, r;
					if (n) {
						var i = 0, a = new n(u), o = e.document.createTextNode("");
						a.observe(o, { characterData: !0 }), r = function() {
							o.data = i = ++i % 2;
						};
					} else if (!e.setImmediate && e.MessageChannel !== void 0) {
						var s = new e.MessageChannel();
						s.port1.onmessage = u, r = function() {
							s.port2.postMessage(0);
						};
					} else r = "document" in e && "onreadystatechange" in e.document.createElement("script") ? function() {
						var t = e.document.createElement("script");
						t.onreadystatechange = function() {
							u(), t.onreadystatechange = null, t.parentNode.removeChild(t), t = null;
						}, e.document.documentElement.appendChild(t);
					} : function() {
						setTimeout(u, 0);
					};
					var c, l = [];
					function u() {
						c = !0;
						for (var e, t, n = l.length; n;) {
							for (t = l, l = [], e = -1; ++e < n;) t[e]();
							n = l.length;
						}
						c = !1;
					}
					t.exports = d;
					function d(e) {
						l.push(e) === 1 && !c && r();
					}
				}).call(this, typeof global < "u" ? global : typeof self < "u" ? self : typeof window < "u" ? window : {});
			}, {}],
			37: [function(e, t, n) {
				var r = e("immediate");
				/* istanbul ignore next */
				function i() {}
				var a = {}, o = ["REJECTED"], s = ["FULFILLED"], c = ["PENDING"];
				t.exports = l;
				function l(e) {
					if (typeof e != "function") throw TypeError("resolver must be a function");
					this.state = c, this.queue = [], this.outcome = void 0, e !== i && p(this, e);
				}
				l.prototype.finally = function(e) {
					if (typeof e != "function") return this;
					var t = this.constructor;
					return this.then(n, r);
					function n(n) {
						function r() {
							return n;
						}
						return t.resolve(e()).then(r);
					}
					function r(n) {
						function r() {
							throw n;
						}
						return t.resolve(e()).then(r);
					}
				}, l.prototype.catch = function(e) {
					return this.then(null, e);
				}, l.prototype.then = function(e, t) {
					if (typeof e != "function" && this.state === s || typeof t != "function" && this.state === o) return this;
					var n = new this.constructor(i);
					return this.state === c ? this.queue.push(new u(n, e, t)) : d(n, this.state === s ? e : t, this.outcome), n;
				};
				function u(e, t, n) {
					this.promise = e, typeof t == "function" && (this.onFulfilled = t, this.callFulfilled = this.otherCallFulfilled), typeof n == "function" && (this.onRejected = n, this.callRejected = this.otherCallRejected);
				}
				u.prototype.callFulfilled = function(e) {
					a.resolve(this.promise, e);
				}, u.prototype.otherCallFulfilled = function(e) {
					d(this.promise, this.onFulfilled, e);
				}, u.prototype.callRejected = function(e) {
					a.reject(this.promise, e);
				}, u.prototype.otherCallRejected = function(e) {
					d(this.promise, this.onRejected, e);
				};
				function d(e, t, n) {
					r(function() {
						var r;
						try {
							r = t(n);
						} catch (t) {
							return a.reject(e, t);
						}
						r === e ? a.reject(e, /* @__PURE__ */ TypeError("Cannot resolve promise with itself")) : a.resolve(e, r);
					});
				}
				a.resolve = function(e, t) {
					var n = m(f, t);
					if (n.status === "error") return a.reject(e, n.value);
					var r = n.value;
					if (r) p(e, r);
					else {
						e.state = s, e.outcome = t;
						for (var i = -1, o = e.queue.length; ++i < o;) e.queue[i].callFulfilled(t);
					}
					return e;
				}, a.reject = function(e, t) {
					e.state = o, e.outcome = t;
					for (var n = -1, r = e.queue.length; ++n < r;) e.queue[n].callRejected(t);
					return e;
				};
				function f(e) {
					var t = e && e.then;
					if (e && (typeof e == "object" || typeof e == "function") && typeof t == "function") return function() {
						t.apply(e, arguments);
					};
				}
				function p(e, t) {
					var n = !1;
					function r(t) {
						n || (n = !0, a.reject(e, t));
					}
					function i(t) {
						n || (n = !0, a.resolve(e, t));
					}
					function o() {
						t(i, r);
					}
					var s = m(o);
					s.status === "error" && r(s.value);
				}
				function m(e, t) {
					var n = {};
					try {
						n.value = e(t), n.status = "success";
					} catch (e) {
						n.status = "error", n.value = e;
					}
					return n;
				}
				l.resolve = h;
				function h(e) {
					return e instanceof this ? e : a.resolve(new this(i), e);
				}
				l.reject = g;
				function g(e) {
					var t = new this(i);
					return a.reject(t, e);
				}
				l.all = _;
				function _(e) {
					var t = this;
					if (Object.prototype.toString.call(e) !== "[object Array]") return this.reject(/* @__PURE__ */ TypeError("must be an array"));
					var n = e.length, r = !1;
					if (!n) return this.resolve([]);
					for (var o = Array(n), s = 0, c = -1, l = new this(i); ++c < n;) u(e[c], c);
					return l;
					function u(e, i) {
						t.resolve(e).then(c, function(e) {
							r || (r = !0, a.reject(l, e));
						});
						function c(e) {
							o[i] = e, ++s === n && !r && (r = !0, a.resolve(l, o));
						}
					}
				}
				l.race = v;
				function v(e) {
					var t = this;
					if (Object.prototype.toString.call(e) !== "[object Array]") return this.reject(/* @__PURE__ */ TypeError("must be an array"));
					var n = e.length, r = !1;
					if (!n) return this.resolve([]);
					for (var o = -1, s = new this(i); ++o < n;) c(e[o]);
					return s;
					function c(e) {
						t.resolve(e).then(function(e) {
							r || (r = !0, a.resolve(s, e));
						}, function(e) {
							r || (r = !0, a.reject(s, e));
						});
					}
				}
			}, { immediate: 36 }],
			38: [function(e, t, n) {
				var r = e("./lib/utils/common").assign, i = e("./lib/deflate"), a = e("./lib/inflate"), o = e("./lib/zlib/constants"), s = {};
				r(s, i, a, o), t.exports = s;
			}, {
				"./lib/deflate": 39,
				"./lib/inflate": 40,
				"./lib/utils/common": 41,
				"./lib/zlib/constants": 44
			}],
			39: [function(e, t, n) {
				var r = e("./zlib/deflate"), i = e("./utils/common"), a = e("./utils/strings"), o = e("./zlib/messages"), s = e("./zlib/zstream"), c = Object.prototype.toString, l = 0, u = 4, d = 0, f = 1, p = 2, m = -1, h = 0, g = 8;
				function _(e) {
					if (!(this instanceof _)) return new _(e);
					this.options = i.assign({
						level: m,
						method: g,
						chunkSize: 16384,
						windowBits: 15,
						memLevel: 8,
						strategy: h,
						to: ""
					}, e || {});
					var t = this.options;
					t.raw && t.windowBits > 0 ? t.windowBits = -t.windowBits : t.gzip && t.windowBits > 0 && t.windowBits < 16 && (t.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new s(), this.strm.avail_out = 0;
					var n = r.deflateInit2(this.strm, t.level, t.method, t.windowBits, t.memLevel, t.strategy);
					if (n !== d) throw Error(o[n]);
					if (t.header && r.deflateSetHeader(this.strm, t.header), t.dictionary) {
						var l = typeof t.dictionary == "string" ? a.string2buf(t.dictionary) : c.call(t.dictionary) === "[object ArrayBuffer]" ? new Uint8Array(t.dictionary) : t.dictionary;
						if (n = r.deflateSetDictionary(this.strm, l), n !== d) throw Error(o[n]);
						this._dict_set = !0;
					}
				}
				_.prototype.push = function(e, t) {
					var n = this.strm, o = this.options.chunkSize, s, m;
					if (this.ended) return !1;
					m = t === ~~t ? t : t === !0 ? u : l, typeof e == "string" ? n.input = a.string2buf(e) : c.call(e) === "[object ArrayBuffer]" ? n.input = new Uint8Array(e) : n.input = e, n.next_in = 0, n.avail_in = n.input.length;
					do {
						if (n.avail_out === 0 && (n.output = new i.Buf8(o), n.next_out = 0, n.avail_out = o), s = r.deflate(n, m), s !== f && s !== d) return this.onEnd(s), this.ended = !0, !1;
						(n.avail_out === 0 || n.avail_in === 0 && (m === u || m === p)) && (this.options.to === "string" ? this.onData(a.buf2binstring(i.shrinkBuf(n.output, n.next_out))) : this.onData(i.shrinkBuf(n.output, n.next_out)));
					} while ((n.avail_in > 0 || n.avail_out === 0) && s !== f);
					return m === u ? (s = r.deflateEnd(this.strm), this.onEnd(s), this.ended = !0, s === d) : m === p ? (this.onEnd(d), n.avail_out = 0, !0) : !0;
				}, _.prototype.onData = function(e) {
					this.chunks.push(e);
				}, _.prototype.onEnd = function(e) {
					e === d && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = i.flattenChunks(this.chunks)), this.chunks = [], this.err = e, this.msg = this.strm.msg;
				};
				function v(e, t) {
					var n = new _(t);
					if (n.push(e, !0), n.err) throw n.msg || o[n.err];
					return n.result;
				}
				function y(e, t) {
					return t ||= {}, t.raw = !0, v(e, t);
				}
				function b(e, t) {
					return t ||= {}, t.gzip = !0, v(e, t);
				}
				n.Deflate = _, n.deflate = v, n.deflateRaw = y, n.gzip = b;
			}, {
				"./utils/common": 41,
				"./utils/strings": 42,
				"./zlib/deflate": 46,
				"./zlib/messages": 51,
				"./zlib/zstream": 53
			}],
			40: [function(e, t, n) {
				var r = e("./zlib/inflate"), i = e("./utils/common"), a = e("./utils/strings"), o = e("./zlib/constants"), s = e("./zlib/messages"), c = e("./zlib/zstream"), l = e("./zlib/gzheader"), u = Object.prototype.toString;
				function d(e) {
					if (!(this instanceof d)) return new d(e);
					this.options = i.assign({
						chunkSize: 16384,
						windowBits: 0,
						to: ""
					}, e || {});
					var t = this.options;
					t.raw && t.windowBits >= 0 && t.windowBits < 16 && (t.windowBits = -t.windowBits, t.windowBits === 0 && (t.windowBits = -15)), t.windowBits >= 0 && t.windowBits < 16 && !(e && e.windowBits) && (t.windowBits += 32), t.windowBits > 15 && t.windowBits < 48 && (t.windowBits & 15 || (t.windowBits |= 15)), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new c(), this.strm.avail_out = 0;
					var n = r.inflateInit2(this.strm, t.windowBits);
					if (n !== o.Z_OK) throw Error(s[n]);
					this.header = new l(), r.inflateGetHeader(this.strm, this.header);
				}
				d.prototype.push = function(e, t) {
					var n = this.strm, s = this.options.chunkSize, c = this.options.dictionary, l, d, f, p, m, h, g = !1;
					if (this.ended) return !1;
					d = t === ~~t ? t : t === !0 ? o.Z_FINISH : o.Z_NO_FLUSH, typeof e == "string" ? n.input = a.binstring2buf(e) : u.call(e) === "[object ArrayBuffer]" ? n.input = new Uint8Array(e) : n.input = e, n.next_in = 0, n.avail_in = n.input.length;
					do {
						if (n.avail_out === 0 && (n.output = new i.Buf8(s), n.next_out = 0, n.avail_out = s), l = r.inflate(n, o.Z_NO_FLUSH), l === o.Z_NEED_DICT && c && (h = typeof c == "string" ? a.string2buf(c) : u.call(c) === "[object ArrayBuffer]" ? new Uint8Array(c) : c, l = r.inflateSetDictionary(this.strm, h)), l === o.Z_BUF_ERROR && g === !0 && (l = o.Z_OK, g = !1), l !== o.Z_STREAM_END && l !== o.Z_OK) return this.onEnd(l), this.ended = !0, !1;
						n.next_out && (n.avail_out === 0 || l === o.Z_STREAM_END || n.avail_in === 0 && (d === o.Z_FINISH || d === o.Z_SYNC_FLUSH)) && (this.options.to === "string" ? (f = a.utf8border(n.output, n.next_out), p = n.next_out - f, m = a.buf2string(n.output, f), n.next_out = p, n.avail_out = s - p, p && i.arraySet(n.output, n.output, f, p, 0), this.onData(m)) : this.onData(i.shrinkBuf(n.output, n.next_out))), n.avail_in === 0 && n.avail_out === 0 && (g = !0);
					} while ((n.avail_in > 0 || n.avail_out === 0) && l !== o.Z_STREAM_END);
					return l === o.Z_STREAM_END && (d = o.Z_FINISH), d === o.Z_FINISH ? (l = r.inflateEnd(this.strm), this.onEnd(l), this.ended = !0, l === o.Z_OK) : d === o.Z_SYNC_FLUSH ? (this.onEnd(o.Z_OK), n.avail_out = 0, !0) : !0;
				}, d.prototype.onData = function(e) {
					this.chunks.push(e);
				}, d.prototype.onEnd = function(e) {
					e === o.Z_OK && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = i.flattenChunks(this.chunks)), this.chunks = [], this.err = e, this.msg = this.strm.msg;
				};
				function f(e, t) {
					var n = new d(t);
					if (n.push(e, !0), n.err) throw n.msg || s[n.err];
					return n.result;
				}
				function p(e, t) {
					return t ||= {}, t.raw = !0, f(e, t);
				}
				n.Inflate = d, n.inflate = f, n.inflateRaw = p, n.ungzip = f;
			}, {
				"./utils/common": 41,
				"./utils/strings": 42,
				"./zlib/constants": 44,
				"./zlib/gzheader": 47,
				"./zlib/inflate": 49,
				"./zlib/messages": 51,
				"./zlib/zstream": 53
			}],
			41: [function(e, t, n) {
				var r = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Int32Array < "u";
				n.assign = function(e) {
					for (var t = Array.prototype.slice.call(arguments, 1); t.length;) {
						var n = t.shift();
						if (n) {
							if (typeof n != "object") throw TypeError(n + "must be non-object");
							for (var r in n) n.hasOwnProperty(r) && (e[r] = n[r]);
						}
					}
					return e;
				}, n.shrinkBuf = function(e, t) {
					return e.length === t ? e : e.subarray ? e.subarray(0, t) : (e.length = t, e);
				};
				var i = {
					arraySet: function(e, t, n, r, i) {
						if (t.subarray && e.subarray) {
							e.set(t.subarray(n, n + r), i);
							return;
						}
						for (var a = 0; a < r; a++) e[i + a] = t[n + a];
					},
					flattenChunks: function(e) {
						var t, n, r = 0, i, a, o;
						for (t = 0, n = e.length; t < n; t++) r += e[t].length;
						for (o = new Uint8Array(r), i = 0, t = 0, n = e.length; t < n; t++) a = e[t], o.set(a, i), i += a.length;
						return o;
					}
				}, a = {
					arraySet: function(e, t, n, r, i) {
						for (var a = 0; a < r; a++) e[i + a] = t[n + a];
					},
					flattenChunks: function(e) {
						return [].concat.apply([], e);
					}
				};
				n.setTyped = function(e) {
					e ? (n.Buf8 = Uint8Array, n.Buf16 = Uint16Array, n.Buf32 = Int32Array, n.assign(n, i)) : (n.Buf8 = Array, n.Buf16 = Array, n.Buf32 = Array, n.assign(n, a));
				}, n.setTyped(r);
			}, {}],
			42: [function(e, t, n) {
				var r = e("./common"), i = !0, a = !0;
				try {
					String.fromCharCode.apply(null, [0]);
				} catch {
					i = !1;
				}
				try {
					String.fromCharCode.apply(null, new Uint8Array(1));
				} catch {
					a = !1;
				}
				for (var o = new r.Buf8(256), s = 0; s < 256; s++) o[s] = s >= 252 ? 6 : s >= 248 ? 5 : s >= 240 ? 4 : s >= 224 ? 3 : s >= 192 ? 2 : 1;
				o[254] = o[254] = 1, n.string2buf = function(e) {
					var t, n, i, a, o, s = e.length, c = 0;
					for (a = 0; a < s; a++) n = e.charCodeAt(a), (n & 64512) == 55296 && a + 1 < s && (i = e.charCodeAt(a + 1), (i & 64512) == 56320 && (n = 65536 + (n - 55296 << 10) + (i - 56320), a++)), c += n < 128 ? 1 : n < 2048 ? 2 : n < 65536 ? 3 : 4;
					for (t = new r.Buf8(c), o = 0, a = 0; o < c; a++) n = e.charCodeAt(a), (n & 64512) == 55296 && a + 1 < s && (i = e.charCodeAt(a + 1), (i & 64512) == 56320 && (n = 65536 + (n - 55296 << 10) + (i - 56320), a++)), n < 128 ? t[o++] = n : n < 2048 ? (t[o++] = 192 | n >>> 6, t[o++] = 128 | n & 63) : n < 65536 ? (t[o++] = 224 | n >>> 12, t[o++] = 128 | n >>> 6 & 63, t[o++] = 128 | n & 63) : (t[o++] = 240 | n >>> 18, t[o++] = 128 | n >>> 12 & 63, t[o++] = 128 | n >>> 6 & 63, t[o++] = 128 | n & 63);
					return t;
				};
				function c(e, t) {
					if (t < 65537 && (e.subarray && a || !e.subarray && i)) return String.fromCharCode.apply(null, r.shrinkBuf(e, t));
					for (var n = "", o = 0; o < t; o++) n += String.fromCharCode(e[o]);
					return n;
				}
				n.buf2binstring = function(e) {
					return c(e, e.length);
				}, n.binstring2buf = function(e) {
					for (var t = new r.Buf8(e.length), n = 0, i = t.length; n < i; n++) t[n] = e.charCodeAt(n);
					return t;
				}, n.buf2string = function(e, t) {
					var n, r, i, a, s = t || e.length, l = Array(s * 2);
					for (r = 0, n = 0; n < s;) {
						if (i = e[n++], i < 128) {
							l[r++] = i;
							continue;
						}
						if (a = o[i], a > 4) {
							l[r++] = 65533, n += a - 1;
							continue;
						}
						for (i &= a === 2 ? 31 : a === 3 ? 15 : 7; a > 1 && n < s;) i = i << 6 | e[n++] & 63, a--;
						if (a > 1) {
							l[r++] = 65533;
							continue;
						}
						i < 65536 ? l[r++] = i : (i -= 65536, l[r++] = 55296 | i >> 10 & 1023, l[r++] = 56320 | i & 1023);
					}
					return c(l, r);
				}, n.utf8border = function(e, t) {
					var n;
					for (t ||= e.length, t > e.length && (t = e.length), n = t - 1; n >= 0 && (e[n] & 192) == 128;) n--;
					return n < 0 || n === 0 ? t : n + o[e[n]] > t ? n : t;
				};
			}, { "./common": 41 }],
			43: [function(e, t, n) {
				function r(e, t, n, r) {
					for (var i = e & 65535 | 0, a = e >>> 16 & 65535 | 0, o = 0; n !== 0;) {
						o = n > 2e3 ? 2e3 : n, n -= o;
						do
							i = i + t[r++] | 0, a = a + i | 0;
						while (--o);
						i %= 65521, a %= 65521;
					}
					return i | a << 16 | 0;
				}
				t.exports = r;
			}, {}],
			44: [function(e, t, n) {
				t.exports = {
					Z_NO_FLUSH: 0,
					Z_PARTIAL_FLUSH: 1,
					Z_SYNC_FLUSH: 2,
					Z_FULL_FLUSH: 3,
					Z_FINISH: 4,
					Z_BLOCK: 5,
					Z_TREES: 6,
					Z_OK: 0,
					Z_STREAM_END: 1,
					Z_NEED_DICT: 2,
					Z_ERRNO: -1,
					Z_STREAM_ERROR: -2,
					Z_DATA_ERROR: -3,
					Z_BUF_ERROR: -5,
					Z_NO_COMPRESSION: 0,
					Z_BEST_SPEED: 1,
					Z_BEST_COMPRESSION: 9,
					Z_DEFAULT_COMPRESSION: -1,
					Z_FILTERED: 1,
					Z_HUFFMAN_ONLY: 2,
					Z_RLE: 3,
					Z_FIXED: 4,
					Z_DEFAULT_STRATEGY: 0,
					Z_BINARY: 0,
					Z_TEXT: 1,
					Z_UNKNOWN: 2,
					Z_DEFLATED: 8
				};
			}, {}],
			45: [function(e, t, n) {
				function r() {
					for (var e, t = [], n = 0; n < 256; n++) {
						e = n;
						for (var r = 0; r < 8; r++) e = e & 1 ? 3988292384 ^ e >>> 1 : e >>> 1;
						t[n] = e;
					}
					return t;
				}
				var i = r();
				function a(e, t, n, r) {
					var a = i, o = r + n;
					e ^= -1;
					for (var s = r; s < o; s++) e = e >>> 8 ^ a[(e ^ t[s]) & 255];
					return e ^ -1;
				}
				t.exports = a;
			}, {}],
			46: [function(e, t, n) {
				var r = e("../utils/common"), i = e("./trees"), a = e("./adler32"), o = e("./crc32"), s = e("./messages"), c = 0, l = 1, u = 3, d = 4, f = 5, p = 0, m = 1, h = -2, g = -3, _ = -5, v = -1, y = 1, b = 2, x = 3, S = 4, C = 0, w = 2, T = 8, E = 9, D = 15, O = 8, k = 286, A = 30, j = 19, M = 2 * k + 1, N = 15, P = 3, F = 258, I = F + P + 1, ee = 32, te = 42, ne = 69, L = 73, re = 91, ie = 103, R = 113, ae = 666, z = 1, oe = 2, se = 3, ce = 4, le = 3;
				function ue(e, t) {
					return e.msg = s[t], t;
				}
				function B(e) {
					return (e << 1) - (e > 4 ? 9 : 0);
				}
				function V(e) {
					for (var t = e.length; --t >= 0;) e[t] = 0;
				}
				function de(e) {
					var t = e.state, n = t.pending;
					n > e.avail_out && (n = e.avail_out), n !== 0 && (r.arraySet(e.output, t.pending_buf, t.pending_out, n, e.next_out), e.next_out += n, t.pending_out += n, e.total_out += n, e.avail_out -= n, t.pending -= n, t.pending === 0 && (t.pending_out = 0));
				}
				function H(e, t) {
					i._tr_flush_block(e, e.block_start >= 0 ? e.block_start : -1, e.strstart - e.block_start, t), e.block_start = e.strstart, de(e.strm);
				}
				function U(e, t) {
					e.pending_buf[e.pending++] = t;
				}
				function W(e, t) {
					e.pending_buf[e.pending++] = t >>> 8 & 255, e.pending_buf[e.pending++] = t & 255;
				}
				function fe(e, t, n, i) {
					var s = e.avail_in;
					return s > i && (s = i), s === 0 ? 0 : (e.avail_in -= s, r.arraySet(t, e.input, e.next_in, s, n), e.state.wrap === 1 ? e.adler = a(e.adler, t, s, n) : e.state.wrap === 2 && (e.adler = o(e.adler, t, s, n)), e.next_in += s, e.total_in += s, s);
				}
				function pe(e, t) {
					var n = e.max_chain_length, r = e.strstart, i, a, o = e.prev_length, s = e.nice_match, c = e.strstart > e.w_size - I ? e.strstart - (e.w_size - I) : 0, l = e.window, u = e.w_mask, d = e.prev, f = e.strstart + F, p = l[r + o - 1], m = l[r + o];
					e.prev_length >= e.good_match && (n >>= 2), s > e.lookahead && (s = e.lookahead);
					do {
						if (i = t, l[i + o] !== m || l[i + o - 1] !== p || l[i] !== l[r] || l[++i] !== l[r + 1]) continue;
						r += 2, i++;
						do						;
while (l[++r] === l[++i] && l[++r] === l[++i] && l[++r] === l[++i] && l[++r] === l[++i] && l[++r] === l[++i] && l[++r] === l[++i] && l[++r] === l[++i] && l[++r] === l[++i] && r < f);
						if (a = F - (f - r), r = f - F, a > o) {
							if (e.match_start = t, o = a, a >= s) break;
							p = l[r + o - 1], m = l[r + o];
						}
					} while ((t = d[t & u]) > c && --n !== 0);
					return o <= e.lookahead ? o : e.lookahead;
				}
				function G(e) {
					var t = e.w_size, n, i, a, o, s;
					do {
						if (o = e.window_size - e.lookahead - e.strstart, e.strstart >= t + (t - I)) {
							r.arraySet(e.window, e.window, t, t, 0), e.match_start -= t, e.strstart -= t, e.block_start -= t, i = e.hash_size, n = i;
							do
								a = e.head[--n], e.head[n] = a >= t ? a - t : 0;
							while (--i);
							i = t, n = i;
							do
								a = e.prev[--n], e.prev[n] = a >= t ? a - t : 0;
							while (--i);
							o += t;
						}
						if (e.strm.avail_in === 0) break;
						if (i = fe(e.strm, e.window, e.strstart + e.lookahead, o), e.lookahead += i, e.lookahead + e.insert >= P) for (s = e.strstart - e.insert, e.ins_h = e.window[s], e.ins_h = (e.ins_h << e.hash_shift ^ e.window[s + 1]) & e.hash_mask; e.insert && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[s + P - 1]) & e.hash_mask, e.prev[s & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = s, s++, e.insert--, !(e.lookahead + e.insert < P)););
					} while (e.lookahead < I && e.strm.avail_in !== 0);
				}
				function me(e, t) {
					var n = 65535;
					for (n > e.pending_buf_size - 5 && (n = e.pending_buf_size - 5);;) {
						if (e.lookahead <= 1) {
							if (G(e), e.lookahead === 0 && t === c) return z;
							if (e.lookahead === 0) break;
						}
						e.strstart += e.lookahead, e.lookahead = 0;
						var r = e.block_start + n;
						if ((e.strstart === 0 || e.strstart >= r) && (e.lookahead = e.strstart - r, e.strstart = r, H(e, !1), e.strm.avail_out === 0) || e.strstart - e.block_start >= e.w_size - I && (H(e, !1), e.strm.avail_out === 0)) return z;
					}
					return e.insert = 0, t === d ? (H(e, !0), e.strm.avail_out === 0 ? se : ce) : (e.strstart > e.block_start && (H(e, !1), e.strm.avail_out), z);
				}
				function K(e, t) {
					for (var n, r;;) {
						if (e.lookahead < I) {
							if (G(e), e.lookahead < I && t === c) return z;
							if (e.lookahead === 0) break;
						}
						if (n = 0, e.lookahead >= P && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + P - 1]) & e.hash_mask, n = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart), n !== 0 && e.strstart - n <= e.w_size - I && (e.match_length = pe(e, n)), e.match_length >= P) if (r = i._tr_tally(e, e.strstart - e.match_start, e.match_length - P), e.lookahead -= e.match_length, e.match_length <= e.max_lazy_match && e.lookahead >= P) {
							e.match_length--;
							do
								e.strstart++, e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + P - 1]) & e.hash_mask, n = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart;
							while (--e.match_length !== 0);
							e.strstart++;
						} else e.strstart += e.match_length, e.match_length = 0, e.ins_h = e.window[e.strstart], e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + 1]) & e.hash_mask;
						else r = i._tr_tally(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++;
						if (r && (H(e, !1), e.strm.avail_out === 0)) return z;
					}
					return e.insert = e.strstart < P - 1 ? e.strstart : P - 1, t === d ? (H(e, !0), e.strm.avail_out === 0 ? se : ce) : e.last_lit && (H(e, !1), e.strm.avail_out === 0) ? z : oe;
				}
				function q(e, t) {
					for (var n, r, a;;) {
						if (e.lookahead < I) {
							if (G(e), e.lookahead < I && t === c) return z;
							if (e.lookahead === 0) break;
						}
						if (n = 0, e.lookahead >= P && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + P - 1]) & e.hash_mask, n = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart), e.prev_length = e.match_length, e.prev_match = e.match_start, e.match_length = P - 1, n !== 0 && e.prev_length < e.max_lazy_match && e.strstart - n <= e.w_size - I && (e.match_length = pe(e, n), e.match_length <= 5 && (e.strategy === y || e.match_length === P && e.strstart - e.match_start > 4096) && (e.match_length = P - 1)), e.prev_length >= P && e.match_length <= e.prev_length) {
							a = e.strstart + e.lookahead - P, r = i._tr_tally(e, e.strstart - 1 - e.prev_match, e.prev_length - P), e.lookahead -= e.prev_length - 1, e.prev_length -= 2;
							do
								++e.strstart <= a && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + P - 1]) & e.hash_mask, n = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart);
							while (--e.prev_length !== 0);
							if (e.match_available = 0, e.match_length = P - 1, e.strstart++, r && (H(e, !1), e.strm.avail_out === 0)) return z;
						} else if (e.match_available) {
							if (r = i._tr_tally(e, 0, e.window[e.strstart - 1]), r && H(e, !1), e.strstart++, e.lookahead--, e.strm.avail_out === 0) return z;
						} else e.match_available = 1, e.strstart++, e.lookahead--;
					}
					return e.match_available &&= (r = i._tr_tally(e, 0, e.window[e.strstart - 1]), 0), e.insert = e.strstart < P - 1 ? e.strstart : P - 1, t === d ? (H(e, !0), e.strm.avail_out === 0 ? se : ce) : e.last_lit && (H(e, !1), e.strm.avail_out === 0) ? z : oe;
				}
				function he(e, t) {
					for (var n, r, a, o, s = e.window;;) {
						if (e.lookahead <= F) {
							if (G(e), e.lookahead <= F && t === c) return z;
							if (e.lookahead === 0) break;
						}
						if (e.match_length = 0, e.lookahead >= P && e.strstart > 0 && (a = e.strstart - 1, r = s[a], r === s[++a] && r === s[++a] && r === s[++a])) {
							o = e.strstart + F;
							do							;
while (r === s[++a] && r === s[++a] && r === s[++a] && r === s[++a] && r === s[++a] && r === s[++a] && r === s[++a] && r === s[++a] && a < o);
							e.match_length = F - (o - a), e.match_length > e.lookahead && (e.match_length = e.lookahead);
						}
						if (e.match_length >= P ? (n = i._tr_tally(e, 1, e.match_length - P), e.lookahead -= e.match_length, e.strstart += e.match_length, e.match_length = 0) : (n = i._tr_tally(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++), n && (H(e, !1), e.strm.avail_out === 0)) return z;
					}
					return e.insert = 0, t === d ? (H(e, !0), e.strm.avail_out === 0 ? se : ce) : e.last_lit && (H(e, !1), e.strm.avail_out === 0) ? z : oe;
				}
				function J(e, t) {
					for (var n;;) {
						if (e.lookahead === 0 && (G(e), e.lookahead === 0)) {
							if (t === c) return z;
							break;
						}
						if (e.match_length = 0, n = i._tr_tally(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++, n && (H(e, !1), e.strm.avail_out === 0)) return z;
					}
					return e.insert = 0, t === d ? (H(e, !0), e.strm.avail_out === 0 ? se : ce) : e.last_lit && (H(e, !1), e.strm.avail_out === 0) ? z : oe;
				}
				function Y(e, t, n, r, i) {
					this.good_length = e, this.max_lazy = t, this.nice_length = n, this.max_chain = r, this.func = i;
				}
				var X = [
					new Y(0, 0, 0, 0, me),
					new Y(4, 4, 8, 4, K),
					new Y(4, 5, 16, 8, K),
					new Y(4, 6, 32, 32, K),
					new Y(4, 4, 16, 16, q),
					new Y(8, 16, 32, 32, q),
					new Y(8, 16, 128, 128, q),
					new Y(8, 32, 128, 256, q),
					new Y(32, 128, 258, 1024, q),
					new Y(32, 258, 258, 4096, q)
				];
				function ge(e) {
					e.window_size = 2 * e.w_size, V(e.head), e.max_lazy_match = X[e.level].max_lazy, e.good_match = X[e.level].good_length, e.nice_match = X[e.level].nice_length, e.max_chain_length = X[e.level].max_chain, e.strstart = 0, e.block_start = 0, e.lookahead = 0, e.insert = 0, e.match_length = e.prev_length = P - 1, e.match_available = 0, e.ins_h = 0;
				}
				function Z() {
					this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = T, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new r.Buf16(M * 2), this.dyn_dtree = new r.Buf16((2 * A + 1) * 2), this.bl_tree = new r.Buf16((2 * j + 1) * 2), V(this.dyn_ltree), V(this.dyn_dtree), V(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new r.Buf16(N + 1), this.heap = new r.Buf16(2 * k + 1), V(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new r.Buf16(2 * k + 1), V(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
				}
				function _e(e) {
					var t;
					return !e || !e.state ? ue(e, h) : (e.total_in = e.total_out = 0, e.data_type = w, t = e.state, t.pending = 0, t.pending_out = 0, t.wrap < 0 && (t.wrap = -t.wrap), t.status = t.wrap ? te : R, e.adler = t.wrap === 2 ? 0 : 1, t.last_flush = c, i._tr_init(t), p);
				}
				function ve(e) {
					var t = _e(e);
					return t === p && ge(e.state), t;
				}
				function Q(e, t) {
					return !e || !e.state || e.state.wrap !== 2 ? h : (e.state.gzhead = t, p);
				}
				function ye(e, t, n, i, a, o) {
					if (!e) return h;
					var s = 1;
					if (t === v && (t = 6), i < 0 ? (s = 0, i = -i) : i > 15 && (s = 2, i -= 16), a < 1 || a > E || n !== T || i < 8 || i > 15 || t < 0 || t > 9 || o < 0 || o > S) return ue(e, h);
					i === 8 && (i = 9);
					var c = new Z();
					return e.state = c, c.strm = e, c.wrap = s, c.gzhead = null, c.w_bits = i, c.w_size = 1 << c.w_bits, c.w_mask = c.w_size - 1, c.hash_bits = a + 7, c.hash_size = 1 << c.hash_bits, c.hash_mask = c.hash_size - 1, c.hash_shift = ~~((c.hash_bits + P - 1) / P), c.window = new r.Buf8(c.w_size * 2), c.head = new r.Buf16(c.hash_size), c.prev = new r.Buf16(c.w_size), c.lit_bufsize = 1 << a + 6, c.pending_buf_size = c.lit_bufsize * 4, c.pending_buf = new r.Buf8(c.pending_buf_size), c.d_buf = 1 * c.lit_bufsize, c.l_buf = 3 * c.lit_bufsize, c.level = t, c.strategy = o, c.method = n, ve(e);
				}
				function be(e, t) {
					return ye(e, t, T, D, O, C);
				}
				function xe(e, t) {
					var n, r, a, s;
					if (!e || !e.state || t > f || t < 0) return e ? ue(e, h) : h;
					if (r = e.state, !e.output || !e.input && e.avail_in !== 0 || r.status === ae && t !== d) return ue(e, e.avail_out === 0 ? _ : h);
					if (r.strm = e, n = r.last_flush, r.last_flush = t, r.status === te) if (r.wrap === 2) e.adler = 0, U(r, 31), U(r, 139), U(r, 8), r.gzhead ? (U(r, +!!r.gzhead.text + (r.gzhead.hcrc ? 2 : 0) + (r.gzhead.extra ? 4 : 0) + (r.gzhead.name ? 8 : 0) + (r.gzhead.comment ? 16 : 0)), U(r, r.gzhead.time & 255), U(r, r.gzhead.time >> 8 & 255), U(r, r.gzhead.time >> 16 & 255), U(r, r.gzhead.time >> 24 & 255), U(r, r.level === 9 ? 2 : r.strategy >= b || r.level < 2 ? 4 : 0), U(r, r.gzhead.os & 255), r.gzhead.extra && r.gzhead.extra.length && (U(r, r.gzhead.extra.length & 255), U(r, r.gzhead.extra.length >> 8 & 255)), r.gzhead.hcrc && (e.adler = o(e.adler, r.pending_buf, r.pending, 0)), r.gzindex = 0, r.status = ne) : (U(r, 0), U(r, 0), U(r, 0), U(r, 0), U(r, 0), U(r, r.level === 9 ? 2 : r.strategy >= b || r.level < 2 ? 4 : 0), U(r, le), r.status = R);
					else {
						var g = T + (r.w_bits - 8 << 4) << 8, v = -1;
						v = r.strategy >= b || r.level < 2 ? 0 : r.level < 6 ? 1 : r.level === 6 ? 2 : 3, g |= v << 6, r.strstart !== 0 && (g |= ee), g += 31 - g % 31, r.status = R, W(r, g), r.strstart !== 0 && (W(r, e.adler >>> 16), W(r, e.adler & 65535)), e.adler = 1;
					}
					if (r.status === ne) if (r.gzhead.extra) {
						for (a = r.pending; r.gzindex < (r.gzhead.extra.length & 65535) && !(r.pending === r.pending_buf_size && (r.gzhead.hcrc && r.pending > a && (e.adler = o(e.adler, r.pending_buf, r.pending - a, a)), de(e), a = r.pending, r.pending === r.pending_buf_size));) U(r, r.gzhead.extra[r.gzindex] & 255), r.gzindex++;
						r.gzhead.hcrc && r.pending > a && (e.adler = o(e.adler, r.pending_buf, r.pending - a, a)), r.gzindex === r.gzhead.extra.length && (r.gzindex = 0, r.status = L);
					} else r.status = L;
					if (r.status === L) if (r.gzhead.name) {
						a = r.pending;
						do {
							if (r.pending === r.pending_buf_size && (r.gzhead.hcrc && r.pending > a && (e.adler = o(e.adler, r.pending_buf, r.pending - a, a)), de(e), a = r.pending, r.pending === r.pending_buf_size)) {
								s = 1;
								break;
							}
							s = r.gzindex < r.gzhead.name.length ? r.gzhead.name.charCodeAt(r.gzindex++) & 255 : 0, U(r, s);
						} while (s !== 0);
						r.gzhead.hcrc && r.pending > a && (e.adler = o(e.adler, r.pending_buf, r.pending - a, a)), s === 0 && (r.gzindex = 0, r.status = re);
					} else r.status = re;
					if (r.status === re) if (r.gzhead.comment) {
						a = r.pending;
						do {
							if (r.pending === r.pending_buf_size && (r.gzhead.hcrc && r.pending > a && (e.adler = o(e.adler, r.pending_buf, r.pending - a, a)), de(e), a = r.pending, r.pending === r.pending_buf_size)) {
								s = 1;
								break;
							}
							s = r.gzindex < r.gzhead.comment.length ? r.gzhead.comment.charCodeAt(r.gzindex++) & 255 : 0, U(r, s);
						} while (s !== 0);
						r.gzhead.hcrc && r.pending > a && (e.adler = o(e.adler, r.pending_buf, r.pending - a, a)), s === 0 && (r.status = ie);
					} else r.status = ie;
					if (r.status === ie && (r.gzhead.hcrc ? (r.pending + 2 > r.pending_buf_size && de(e), r.pending + 2 <= r.pending_buf_size && (U(r, e.adler & 255), U(r, e.adler >> 8 & 255), e.adler = 0, r.status = R)) : r.status = R), r.pending !== 0) {
						if (de(e), e.avail_out === 0) return r.last_flush = -1, p;
					} else if (e.avail_in === 0 && B(t) <= B(n) && t !== d) return ue(e, _);
					if (r.status === ae && e.avail_in !== 0) return ue(e, _);
					if (e.avail_in !== 0 || r.lookahead !== 0 || t !== c && r.status !== ae) {
						var y = r.strategy === b ? J(r, t) : r.strategy === x ? he(r, t) : X[r.level].func(r, t);
						if ((y === se || y === ce) && (r.status = ae), y === z || y === se) return e.avail_out === 0 && (r.last_flush = -1), p;
						if (y === oe && (t === l ? i._tr_align(r) : t !== f && (i._tr_stored_block(r, 0, 0, !1), t === u && (V(r.head), r.lookahead === 0 && (r.strstart = 0, r.block_start = 0, r.insert = 0))), de(e), e.avail_out === 0)) return r.last_flush = -1, p;
					}
					return t === d ? r.wrap <= 0 ? m : (r.wrap === 2 ? (U(r, e.adler & 255), U(r, e.adler >> 8 & 255), U(r, e.adler >> 16 & 255), U(r, e.adler >> 24 & 255), U(r, e.total_in & 255), U(r, e.total_in >> 8 & 255), U(r, e.total_in >> 16 & 255), U(r, e.total_in >> 24 & 255)) : (W(r, e.adler >>> 16), W(r, e.adler & 65535)), de(e), r.wrap > 0 && (r.wrap = -r.wrap), r.pending === 0 ? m : p) : p;
				}
				function Se(e) {
					var t;
					return !e || !e.state ? h : (t = e.state.status, t !== te && t !== ne && t !== L && t !== re && t !== ie && t !== R && t !== ae ? ue(e, h) : (e.state = null, t === R ? ue(e, g) : p));
				}
				function Ce(e, t) {
					var n = t.length, i, o, s, c, l, u, d, f;
					if (!e || !e.state || (i = e.state, c = i.wrap, c === 2 || c === 1 && i.status !== te || i.lookahead)) return h;
					for (c === 1 && (e.adler = a(e.adler, t, n, 0)), i.wrap = 0, n >= i.w_size && (c === 0 && (V(i.head), i.strstart = 0, i.block_start = 0, i.insert = 0), f = new r.Buf8(i.w_size), r.arraySet(f, t, n - i.w_size, i.w_size, 0), t = f, n = i.w_size), l = e.avail_in, u = e.next_in, d = e.input, e.avail_in = n, e.next_in = 0, e.input = t, G(i); i.lookahead >= P;) {
						o = i.strstart, s = i.lookahead - (P - 1);
						do
							i.ins_h = (i.ins_h << i.hash_shift ^ i.window[o + P - 1]) & i.hash_mask, i.prev[o & i.w_mask] = i.head[i.ins_h], i.head[i.ins_h] = o, o++;
						while (--s);
						i.strstart = o, i.lookahead = P - 1, G(i);
					}
					return i.strstart += i.lookahead, i.block_start = i.strstart, i.insert = i.lookahead, i.lookahead = 0, i.match_length = i.prev_length = P - 1, i.match_available = 0, e.next_in = u, e.input = d, e.avail_in = l, i.wrap = c, p;
				}
				n.deflateInit = be, n.deflateInit2 = ye, n.deflateReset = ve, n.deflateResetKeep = _e, n.deflateSetHeader = Q, n.deflate = xe, n.deflateEnd = Se, n.deflateSetDictionary = Ce, n.deflateInfo = "pako deflate (from Nodeca project)";
			}, {
				"../utils/common": 41,
				"./adler32": 43,
				"./crc32": 45,
				"./messages": 51,
				"./trees": 52
			}],
			47: [function(e, t, n) {
				function r() {
					this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
				}
				t.exports = r;
			}, {}],
			48: [function(e, t, n) {
				var r = 30, i = 12;
				t.exports = function(e, t) {
					var n = e.state, a = e.next_in, o, s, c, l, u, d, f, p, m, h, g, _, v, y, b, x, S, C, w, T, E, D = e.input, O;
					o = a + (e.avail_in - 5), s = e.next_out, O = e.output, c = s - (t - e.avail_out), l = s + (e.avail_out - 257), u = n.dmax, d = n.wsize, f = n.whave, p = n.wnext, m = n.window, h = n.hold, g = n.bits, _ = n.lencode, v = n.distcode, y = (1 << n.lenbits) - 1, b = (1 << n.distbits) - 1;
					top: do {
						g < 15 && (h += D[a++] << g, g += 8, h += D[a++] << g, g += 8), x = _[h & y];
						dolen: for (;;) {
							if (S = x >>> 24, h >>>= S, g -= S, S = x >>> 16 & 255, S === 0) O[s++] = x & 65535;
							else if (S & 16) {
								C = x & 65535, S &= 15, S && (g < S && (h += D[a++] << g, g += 8), C += h & (1 << S) - 1, h >>>= S, g -= S), g < 15 && (h += D[a++] << g, g += 8, h += D[a++] << g, g += 8), x = v[h & b];
								dodist: for (;;) {
									if (S = x >>> 24, h >>>= S, g -= S, S = x >>> 16 & 255, S & 16) {
										if (w = x & 65535, S &= 15, g < S && (h += D[a++] << g, g += 8, g < S && (h += D[a++] << g, g += 8)), w += h & (1 << S) - 1, w > u) {
											e.msg = "invalid distance too far back", n.mode = r;
											break top;
										}
										if (h >>>= S, g -= S, S = s - c, w > S) {
											if (S = w - S, S > f && n.sane) {
												e.msg = "invalid distance too far back", n.mode = r;
												break top;
											}
											if (T = 0, E = m, p === 0) {
												if (T += d - S, S < C) {
													C -= S;
													do
														O[s++] = m[T++];
													while (--S);
													T = s - w, E = O;
												}
											} else if (p < S) {
												if (T += d + p - S, S -= p, S < C) {
													C -= S;
													do
														O[s++] = m[T++];
													while (--S);
													if (T = 0, p < C) {
														S = p, C -= S;
														do
															O[s++] = m[T++];
														while (--S);
														T = s - w, E = O;
													}
												}
											} else if (T += p - S, S < C) {
												C -= S;
												do
													O[s++] = m[T++];
												while (--S);
												T = s - w, E = O;
											}
											for (; C > 2;) O[s++] = E[T++], O[s++] = E[T++], O[s++] = E[T++], C -= 3;
											C && (O[s++] = E[T++], C > 1 && (O[s++] = E[T++]));
										} else {
											T = s - w;
											do
												O[s++] = O[T++], O[s++] = O[T++], O[s++] = O[T++], C -= 3;
											while (C > 2);
											C && (O[s++] = O[T++], C > 1 && (O[s++] = O[T++]));
										}
									} else if (S & 64) {
										e.msg = "invalid distance code", n.mode = r;
										break top;
									} else {
										x = v[(x & 65535) + (h & (1 << S) - 1)];
										continue dodist;
									}
									break;
								}
							} else if (!(S & 64)) {
								x = _[(x & 65535) + (h & (1 << S) - 1)];
								continue dolen;
							} else if (S & 32) {
								n.mode = i;
								break top;
							} else {
								e.msg = "invalid literal/length code", n.mode = r;
								break top;
							}
							break;
						}
					} while (a < o && s < l);
					C = g >> 3, a -= C, g -= C << 3, h &= (1 << g) - 1, e.next_in = a, e.next_out = s, e.avail_in = a < o ? 5 + (o - a) : 5 - (a - o), e.avail_out = s < l ? 257 + (l - s) : 257 - (s - l), n.hold = h, n.bits = g;
				};
			}, {}],
			49: [function(e, t, n) {
				var r = e("../utils/common"), i = e("./adler32"), a = e("./crc32"), o = e("./inffast"), s = e("./inftrees"), c = 0, l = 1, u = 2, d = 4, f = 5, p = 6, m = 0, h = 1, g = 2, _ = -2, v = -3, y = -4, b = -5, x = 8, S = 1, C = 2, w = 3, T = 4, E = 5, D = 6, O = 7, k = 8, A = 9, j = 10, M = 11, N = 12, P = 13, F = 14, I = 15, ee = 16, te = 17, ne = 18, L = 19, re = 20, ie = 21, R = 22, ae = 23, z = 24, oe = 25, se = 26, ce = 27, le = 28, ue = 29, B = 30, V = 31, de = 32, H = 852, U = 592, W = 15;
				function fe(e) {
					return (e >>> 24 & 255) + (e >>> 8 & 65280) + ((e & 65280) << 8) + ((e & 255) << 24);
				}
				function pe() {
					this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new r.Buf16(320), this.work = new r.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
				}
				function G(e) {
					var t;
					return !e || !e.state ? _ : (t = e.state, e.total_in = e.total_out = t.total = 0, e.msg = "", t.wrap && (e.adler = t.wrap & 1), t.mode = S, t.last = 0, t.havedict = 0, t.dmax = 32768, t.head = null, t.hold = 0, t.bits = 0, t.lencode = t.lendyn = new r.Buf32(H), t.distcode = t.distdyn = new r.Buf32(U), t.sane = 1, t.back = -1, m);
				}
				function me(e) {
					var t;
					return !e || !e.state ? _ : (t = e.state, t.wsize = 0, t.whave = 0, t.wnext = 0, G(e));
				}
				function K(e, t) {
					var n, r;
					return !e || !e.state || (r = e.state, t < 0 ? (n = 0, t = -t) : (n = (t >> 4) + 1, t < 48 && (t &= 15)), t && (t < 8 || t > 15)) ? _ : (r.window !== null && r.wbits !== t && (r.window = null), r.wrap = n, r.wbits = t, me(e));
				}
				function q(e, t) {
					var n, r;
					return e ? (r = new pe(), e.state = r, r.window = null, n = K(e, t), n !== m && (e.state = null), n) : _;
				}
				function he(e) {
					return q(e, W);
				}
				var J = !0, Y, X;
				function ge(e) {
					if (J) {
						var t;
						for (Y = new r.Buf32(512), X = new r.Buf32(32), t = 0; t < 144;) e.lens[t++] = 8;
						for (; t < 256;) e.lens[t++] = 9;
						for (; t < 280;) e.lens[t++] = 7;
						for (; t < 288;) e.lens[t++] = 8;
						for (s(l, e.lens, 0, 288, Y, 0, e.work, { bits: 9 }), t = 0; t < 32;) e.lens[t++] = 5;
						s(u, e.lens, 0, 32, X, 0, e.work, { bits: 5 }), J = !1;
					}
					e.lencode = Y, e.lenbits = 9, e.distcode = X, e.distbits = 5;
				}
				function Z(e, t, n, i) {
					var a, o = e.state;
					return o.window === null && (o.wsize = 1 << o.wbits, o.wnext = 0, o.whave = 0, o.window = new r.Buf8(o.wsize)), i >= o.wsize ? (r.arraySet(o.window, t, n - o.wsize, o.wsize, 0), o.wnext = 0, o.whave = o.wsize) : (a = o.wsize - o.wnext, a > i && (a = i), r.arraySet(o.window, t, n - i, a, o.wnext), i -= a, i ? (r.arraySet(o.window, t, n - i, i, 0), o.wnext = i, o.whave = o.wsize) : (o.wnext += a, o.wnext === o.wsize && (o.wnext = 0), o.whave < o.wsize && (o.whave += a))), 0;
				}
				function _e(e, t) {
					var n, H, U, W, pe, G, me, K, q, he, J, Y, X, _e, ve = 0, Q, ye, be, xe, Se, Ce, we, Te, Ee = new r.Buf8(4), De, Oe, ke = [
						16,
						17,
						18,
						0,
						8,
						7,
						9,
						6,
						10,
						5,
						11,
						4,
						12,
						3,
						13,
						2,
						14,
						1,
						15
					];
					if (!e || !e.state || !e.output || !e.input && e.avail_in !== 0) return _;
					n = e.state, n.mode === N && (n.mode = P), pe = e.next_out, U = e.output, me = e.avail_out, W = e.next_in, H = e.input, G = e.avail_in, K = n.hold, q = n.bits, he = G, J = me, Te = m;
					inf_leave: for (;;) switch (n.mode) {
						case S:
							if (n.wrap === 0) {
								n.mode = P;
								break;
							}
							for (; q < 16;) {
								if (G === 0) break inf_leave;
								G--, K += H[W++] << q, q += 8;
							}
							if (n.wrap & 2 && K === 35615) {
								n.check = 0, Ee[0] = K & 255, Ee[1] = K >>> 8 & 255, n.check = a(n.check, Ee, 2, 0), K = 0, q = 0, n.mode = C;
								break;
							}
							if (n.flags = 0, n.head && (n.head.done = !1), !(n.wrap & 1) || (((K & 255) << 8) + (K >> 8)) % 31) {
								e.msg = "incorrect header check", n.mode = B;
								break;
							}
							if ((K & 15) !== x) {
								e.msg = "unknown compression method", n.mode = B;
								break;
							}
							if (K >>>= 4, q -= 4, we = (K & 15) + 8, n.wbits === 0) n.wbits = we;
							else if (we > n.wbits) {
								e.msg = "invalid window size", n.mode = B;
								break;
							}
							n.dmax = 1 << we, e.adler = n.check = 1, n.mode = K & 512 ? j : N, K = 0, q = 0;
							break;
						case C:
							for (; q < 16;) {
								if (G === 0) break inf_leave;
								G--, K += H[W++] << q, q += 8;
							}
							if (n.flags = K, (n.flags & 255) !== x) {
								e.msg = "unknown compression method", n.mode = B;
								break;
							}
							if (n.flags & 57344) {
								e.msg = "unknown header flags set", n.mode = B;
								break;
							}
							n.head && (n.head.text = K >> 8 & 1), n.flags & 512 && (Ee[0] = K & 255, Ee[1] = K >>> 8 & 255, n.check = a(n.check, Ee, 2, 0)), K = 0, q = 0, n.mode = w;
						case w:
							for (; q < 32;) {
								if (G === 0) break inf_leave;
								G--, K += H[W++] << q, q += 8;
							}
							n.head && (n.head.time = K), n.flags & 512 && (Ee[0] = K & 255, Ee[1] = K >>> 8 & 255, Ee[2] = K >>> 16 & 255, Ee[3] = K >>> 24 & 255, n.check = a(n.check, Ee, 4, 0)), K = 0, q = 0, n.mode = T;
						case T:
							for (; q < 16;) {
								if (G === 0) break inf_leave;
								G--, K += H[W++] << q, q += 8;
							}
							n.head && (n.head.xflags = K & 255, n.head.os = K >> 8), n.flags & 512 && (Ee[0] = K & 255, Ee[1] = K >>> 8 & 255, n.check = a(n.check, Ee, 2, 0)), K = 0, q = 0, n.mode = E;
						case E:
							if (n.flags & 1024) {
								for (; q < 16;) {
									if (G === 0) break inf_leave;
									G--, K += H[W++] << q, q += 8;
								}
								n.length = K, n.head && (n.head.extra_len = K), n.flags & 512 && (Ee[0] = K & 255, Ee[1] = K >>> 8 & 255, n.check = a(n.check, Ee, 2, 0)), K = 0, q = 0;
							} else n.head && (n.head.extra = null);
							n.mode = D;
						case D:
							if (n.flags & 1024 && (Y = n.length, Y > G && (Y = G), Y && (n.head && (we = n.head.extra_len - n.length, n.head.extra || (n.head.extra = Array(n.head.extra_len)), r.arraySet(n.head.extra, H, W, Y, we)), n.flags & 512 && (n.check = a(n.check, H, Y, W)), G -= Y, W += Y, n.length -= Y), n.length)) break inf_leave;
							n.length = 0, n.mode = O;
						case O:
							if (n.flags & 2048) {
								if (G === 0) break inf_leave;
								Y = 0;
								do
									we = H[W + Y++], n.head && we && n.length < 65536 && (n.head.name += String.fromCharCode(we));
								while (we && Y < G);
								if (n.flags & 512 && (n.check = a(n.check, H, Y, W)), G -= Y, W += Y, we) break inf_leave;
							} else n.head && (n.head.name = null);
							n.length = 0, n.mode = k;
						case k:
							if (n.flags & 4096) {
								if (G === 0) break inf_leave;
								Y = 0;
								do
									we = H[W + Y++], n.head && we && n.length < 65536 && (n.head.comment += String.fromCharCode(we));
								while (we && Y < G);
								if (n.flags & 512 && (n.check = a(n.check, H, Y, W)), G -= Y, W += Y, we) break inf_leave;
							} else n.head && (n.head.comment = null);
							n.mode = A;
						case A:
							if (n.flags & 512) {
								for (; q < 16;) {
									if (G === 0) break inf_leave;
									G--, K += H[W++] << q, q += 8;
								}
								if (K !== (n.check & 65535)) {
									e.msg = "header crc mismatch", n.mode = B;
									break;
								}
								K = 0, q = 0;
							}
							n.head && (n.head.hcrc = n.flags >> 9 & 1, n.head.done = !0), e.adler = n.check = 0, n.mode = N;
							break;
						case j:
							for (; q < 32;) {
								if (G === 0) break inf_leave;
								G--, K += H[W++] << q, q += 8;
							}
							e.adler = n.check = fe(K), K = 0, q = 0, n.mode = M;
						case M:
							if (n.havedict === 0) return e.next_out = pe, e.avail_out = me, e.next_in = W, e.avail_in = G, n.hold = K, n.bits = q, g;
							e.adler = n.check = 1, n.mode = N;
						case N: if (t === f || t === p) break inf_leave;
						case P:
							if (n.last) {
								K >>>= q & 7, q -= q & 7, n.mode = ce;
								break;
							}
							for (; q < 3;) {
								if (G === 0) break inf_leave;
								G--, K += H[W++] << q, q += 8;
							}
							switch (n.last = K & 1, K >>>= 1, --q, K & 3) {
								case 0:
									n.mode = F;
									break;
								case 1:
									if (ge(n), n.mode = re, t === p) {
										K >>>= 2, q -= 2;
										break inf_leave;
									}
									break;
								case 2:
									n.mode = te;
									break;
								case 3: e.msg = "invalid block type", n.mode = B;
							}
							K >>>= 2, q -= 2;
							break;
						case F:
							for (K >>>= q & 7, q -= q & 7; q < 32;) {
								if (G === 0) break inf_leave;
								G--, K += H[W++] << q, q += 8;
							}
							if ((K & 65535) != (K >>> 16 ^ 65535)) {
								e.msg = "invalid stored block lengths", n.mode = B;
								break;
							}
							if (n.length = K & 65535, K = 0, q = 0, n.mode = I, t === p) break inf_leave;
						case I: n.mode = ee;
						case ee:
							if (Y = n.length, Y) {
								if (Y > G && (Y = G), Y > me && (Y = me), Y === 0) break inf_leave;
								r.arraySet(U, H, W, Y, pe), G -= Y, W += Y, me -= Y, pe += Y, n.length -= Y;
								break;
							}
							n.mode = N;
							break;
						case te:
							for (; q < 14;) {
								if (G === 0) break inf_leave;
								G--, K += H[W++] << q, q += 8;
							}
							if (n.nlen = (K & 31) + 257, K >>>= 5, q -= 5, n.ndist = (K & 31) + 1, K >>>= 5, q -= 5, n.ncode = (K & 15) + 4, K >>>= 4, q -= 4, n.nlen > 286 || n.ndist > 30) {
								e.msg = "too many length or distance symbols", n.mode = B;
								break;
							}
							n.have = 0, n.mode = ne;
						case ne:
							for (; n.have < n.ncode;) {
								for (; q < 3;) {
									if (G === 0) break inf_leave;
									G--, K += H[W++] << q, q += 8;
								}
								n.lens[ke[n.have++]] = K & 7, K >>>= 3, q -= 3;
							}
							for (; n.have < 19;) n.lens[ke[n.have++]] = 0;
							if (n.lencode = n.lendyn, n.lenbits = 7, De = { bits: n.lenbits }, Te = s(c, n.lens, 0, 19, n.lencode, 0, n.work, De), n.lenbits = De.bits, Te) {
								e.msg = "invalid code lengths set", n.mode = B;
								break;
							}
							n.have = 0, n.mode = L;
						case L:
							for (; n.have < n.nlen + n.ndist;) {
								for (; ve = n.lencode[K & (1 << n.lenbits) - 1], Q = ve >>> 24, ye = ve >>> 16 & 255, be = ve & 65535, !(Q <= q);) {
									if (G === 0) break inf_leave;
									G--, K += H[W++] << q, q += 8;
								}
								if (be < 16) K >>>= Q, q -= Q, n.lens[n.have++] = be;
								else {
									if (be === 16) {
										for (Oe = Q + 2; q < Oe;) {
											if (G === 0) break inf_leave;
											G--, K += H[W++] << q, q += 8;
										}
										if (K >>>= Q, q -= Q, n.have === 0) {
											e.msg = "invalid bit length repeat", n.mode = B;
											break;
										}
										we = n.lens[n.have - 1], Y = 3 + (K & 3), K >>>= 2, q -= 2;
									} else if (be === 17) {
										for (Oe = Q + 3; q < Oe;) {
											if (G === 0) break inf_leave;
											G--, K += H[W++] << q, q += 8;
										}
										K >>>= Q, q -= Q, we = 0, Y = 3 + (K & 7), K >>>= 3, q -= 3;
									} else {
										for (Oe = Q + 7; q < Oe;) {
											if (G === 0) break inf_leave;
											G--, K += H[W++] << q, q += 8;
										}
										K >>>= Q, q -= Q, we = 0, Y = 11 + (K & 127), K >>>= 7, q -= 7;
									}
									if (n.have + Y > n.nlen + n.ndist) {
										e.msg = "invalid bit length repeat", n.mode = B;
										break;
									}
									for (; Y--;) n.lens[n.have++] = we;
								}
							}
							if (n.mode === B) break;
							if (n.lens[256] === 0) {
								e.msg = "invalid code -- missing end-of-block", n.mode = B;
								break;
							}
							if (n.lenbits = 9, De = { bits: n.lenbits }, Te = s(l, n.lens, 0, n.nlen, n.lencode, 0, n.work, De), n.lenbits = De.bits, Te) {
								e.msg = "invalid literal/lengths set", n.mode = B;
								break;
							}
							if (n.distbits = 6, n.distcode = n.distdyn, De = { bits: n.distbits }, Te = s(u, n.lens, n.nlen, n.ndist, n.distcode, 0, n.work, De), n.distbits = De.bits, Te) {
								e.msg = "invalid distances set", n.mode = B;
								break;
							}
							if (n.mode = re, t === p) break inf_leave;
						case re: n.mode = ie;
						case ie:
							if (G >= 6 && me >= 258) {
								e.next_out = pe, e.avail_out = me, e.next_in = W, e.avail_in = G, n.hold = K, n.bits = q, o(e, J), pe = e.next_out, U = e.output, me = e.avail_out, W = e.next_in, H = e.input, G = e.avail_in, K = n.hold, q = n.bits, n.mode === N && (n.back = -1);
								break;
							}
							for (n.back = 0; ve = n.lencode[K & (1 << n.lenbits) - 1], Q = ve >>> 24, ye = ve >>> 16 & 255, be = ve & 65535, !(Q <= q);) {
								if (G === 0) break inf_leave;
								G--, K += H[W++] << q, q += 8;
							}
							if (ye && !(ye & 240)) {
								for (xe = Q, Se = ye, Ce = be; ve = n.lencode[Ce + ((K & (1 << xe + Se) - 1) >> xe)], Q = ve >>> 24, ye = ve >>> 16 & 255, be = ve & 65535, !(xe + Q <= q);) {
									if (G === 0) break inf_leave;
									G--, K += H[W++] << q, q += 8;
								}
								K >>>= xe, q -= xe, n.back += xe;
							}
							if (K >>>= Q, q -= Q, n.back += Q, n.length = be, ye === 0) {
								n.mode = se;
								break;
							}
							if (ye & 32) {
								n.back = -1, n.mode = N;
								break;
							}
							if (ye & 64) {
								e.msg = "invalid literal/length code", n.mode = B;
								break;
							}
							n.extra = ye & 15, n.mode = R;
						case R:
							if (n.extra) {
								for (Oe = n.extra; q < Oe;) {
									if (G === 0) break inf_leave;
									G--, K += H[W++] << q, q += 8;
								}
								n.length += K & (1 << n.extra) - 1, K >>>= n.extra, q -= n.extra, n.back += n.extra;
							}
							n.was = n.length, n.mode = ae;
						case ae:
							for (; ve = n.distcode[K & (1 << n.distbits) - 1], Q = ve >>> 24, ye = ve >>> 16 & 255, be = ve & 65535, !(Q <= q);) {
								if (G === 0) break inf_leave;
								G--, K += H[W++] << q, q += 8;
							}
							if (!(ye & 240)) {
								for (xe = Q, Se = ye, Ce = be; ve = n.distcode[Ce + ((K & (1 << xe + Se) - 1) >> xe)], Q = ve >>> 24, ye = ve >>> 16 & 255, be = ve & 65535, !(xe + Q <= q);) {
									if (G === 0) break inf_leave;
									G--, K += H[W++] << q, q += 8;
								}
								K >>>= xe, q -= xe, n.back += xe;
							}
							if (K >>>= Q, q -= Q, n.back += Q, ye & 64) {
								e.msg = "invalid distance code", n.mode = B;
								break;
							}
							n.offset = be, n.extra = ye & 15, n.mode = z;
						case z:
							if (n.extra) {
								for (Oe = n.extra; q < Oe;) {
									if (G === 0) break inf_leave;
									G--, K += H[W++] << q, q += 8;
								}
								n.offset += K & (1 << n.extra) - 1, K >>>= n.extra, q -= n.extra, n.back += n.extra;
							}
							if (n.offset > n.dmax) {
								e.msg = "invalid distance too far back", n.mode = B;
								break;
							}
							n.mode = oe;
						case oe:
							if (me === 0) break inf_leave;
							if (Y = J - me, n.offset > Y) {
								if (Y = n.offset - Y, Y > n.whave && n.sane) {
									e.msg = "invalid distance too far back", n.mode = B;
									break;
								}
								Y > n.wnext ? (Y -= n.wnext, X = n.wsize - Y) : X = n.wnext - Y, Y > n.length && (Y = n.length), _e = n.window;
							} else _e = U, X = pe - n.offset, Y = n.length;
							Y > me && (Y = me), me -= Y, n.length -= Y;
							do
								U[pe++] = _e[X++];
							while (--Y);
							n.length === 0 && (n.mode = ie);
							break;
						case se:
							if (me === 0) break inf_leave;
							U[pe++] = n.length, me--, n.mode = ie;
							break;
						case ce:
							if (n.wrap) {
								for (; q < 32;) {
									if (G === 0) break inf_leave;
									G--, K |= H[W++] << q, q += 8;
								}
								if (J -= me, e.total_out += J, n.total += J, J && (e.adler = n.check = n.flags ? a(n.check, U, J, pe - J) : i(n.check, U, J, pe - J)), J = me, (n.flags ? K : fe(K)) !== n.check) {
									e.msg = "incorrect data check", n.mode = B;
									break;
								}
								K = 0, q = 0;
							}
							n.mode = le;
						case le:
							if (n.wrap && n.flags) {
								for (; q < 32;) {
									if (G === 0) break inf_leave;
									G--, K += H[W++] << q, q += 8;
								}
								if (K !== (n.total & 4294967295)) {
									e.msg = "incorrect length check", n.mode = B;
									break;
								}
								K = 0, q = 0;
							}
							n.mode = ue;
						case ue:
							Te = h;
							break inf_leave;
						case B:
							Te = v;
							break inf_leave;
						case V: return y;
						case de:
						default: return _;
					}
					return e.next_out = pe, e.avail_out = me, e.next_in = W, e.avail_in = G, n.hold = K, n.bits = q, (n.wsize || J !== e.avail_out && n.mode < B && (n.mode < ce || t !== d)) && Z(e, e.output, e.next_out, J - e.avail_out) ? (n.mode = V, y) : (he -= e.avail_in, J -= e.avail_out, e.total_in += he, e.total_out += J, n.total += J, n.wrap && J && (e.adler = n.check = n.flags ? a(n.check, U, J, e.next_out - J) : i(n.check, U, J, e.next_out - J)), e.data_type = n.bits + (n.last ? 64 : 0) + (n.mode === N ? 128 : 0) + (n.mode === re || n.mode === I ? 256 : 0), (he === 0 && J === 0 || t === d) && Te === m && (Te = b), Te);
				}
				function ve(e) {
					if (!e || !e.state) return _;
					var t = e.state;
					return t.window &&= null, e.state = null, m;
				}
				function Q(e, t) {
					var n;
					return !e || !e.state || (n = e.state, !(n.wrap & 2)) ? _ : (n.head = t, t.done = !1, m);
				}
				function ye(e, t) {
					var n = t.length, r, a, o;
					return !e || !e.state || (r = e.state, r.wrap !== 0 && r.mode !== M) ? _ : r.mode === M && (a = 1, a = i(a, t, n, 0), a !== r.check) ? v : (o = Z(e, t, n, n), o ? (r.mode = V, y) : (r.havedict = 1, m));
				}
				n.inflateReset = me, n.inflateReset2 = K, n.inflateResetKeep = G, n.inflateInit = he, n.inflateInit2 = q, n.inflate = _e, n.inflateEnd = ve, n.inflateGetHeader = Q, n.inflateSetDictionary = ye, n.inflateInfo = "pako inflate (from Nodeca project)";
			}, {
				"../utils/common": 41,
				"./adler32": 43,
				"./crc32": 45,
				"./inffast": 48,
				"./inftrees": 50
			}],
			50: [function(e, t, n) {
				var r = e("../utils/common"), i = 15, a = 852, o = 592, s = 0, c = 1, l = 2, u = [
					3,
					4,
					5,
					6,
					7,
					8,
					9,
					10,
					11,
					13,
					15,
					17,
					19,
					23,
					27,
					31,
					35,
					43,
					51,
					59,
					67,
					83,
					99,
					115,
					131,
					163,
					195,
					227,
					258,
					0,
					0
				], d = [
					16,
					16,
					16,
					16,
					16,
					16,
					16,
					16,
					17,
					17,
					17,
					17,
					18,
					18,
					18,
					18,
					19,
					19,
					19,
					19,
					20,
					20,
					20,
					20,
					21,
					21,
					21,
					21,
					16,
					72,
					78
				], f = [
					1,
					2,
					3,
					4,
					5,
					7,
					9,
					13,
					17,
					25,
					33,
					49,
					65,
					97,
					129,
					193,
					257,
					385,
					513,
					769,
					1025,
					1537,
					2049,
					3073,
					4097,
					6145,
					8193,
					12289,
					16385,
					24577,
					0,
					0
				], p = [
					16,
					16,
					16,
					16,
					17,
					17,
					18,
					18,
					19,
					19,
					20,
					20,
					21,
					21,
					22,
					22,
					23,
					23,
					24,
					24,
					25,
					25,
					26,
					26,
					27,
					27,
					28,
					28,
					29,
					29,
					64,
					64
				];
				t.exports = function(e, t, n, m, h, g, _, v) {
					var y = v.bits, b = 0, x = 0, S = 0, C = 0, w = 0, T = 0, E = 0, D = 0, O = 0, k = 0, A, j, M, N, P, F = null, I = 0, ee, te = new r.Buf16(i + 1), ne = new r.Buf16(i + 1), L = null, re = 0, ie, R, ae;
					for (b = 0; b <= i; b++) te[b] = 0;
					for (x = 0; x < m; x++) te[t[n + x]]++;
					for (w = y, C = i; C >= 1 && te[C] === 0; C--);
					if (w > C && (w = C), C === 0) return h[g++] = 20971520, h[g++] = 20971520, v.bits = 1, 0;
					for (S = 1; S < C && te[S] === 0; S++);
					for (w < S && (w = S), D = 1, b = 1; b <= i; b++) if (D <<= 1, D -= te[b], D < 0) return -1;
					if (D > 0 && (e === s || C !== 1)) return -1;
					for (ne[1] = 0, b = 1; b < i; b++) ne[b + 1] = ne[b] + te[b];
					for (x = 0; x < m; x++) t[n + x] !== 0 && (_[ne[t[n + x]]++] = x);
					if (e === s ? (F = L = _, ee = 19) : e === c ? (F = u, I -= 257, L = d, re -= 257, ee = 256) : (F = f, L = p, ee = -1), k = 0, x = 0, b = S, P = g, T = w, E = 0, M = -1, O = 1 << w, N = O - 1, e === c && O > a || e === l && O > o) return 1;
					for (;;) {
						ie = b - E, _[x] < ee ? (R = 0, ae = _[x]) : _[x] > ee ? (R = L[re + _[x]], ae = F[I + _[x]]) : (R = 96, ae = 0), A = 1 << b - E, j = 1 << T, S = j;
						do
							j -= A, h[P + (k >> E) + j] = ie << 24 | R << 16 | ae | 0;
						while (j !== 0);
						for (A = 1 << b - 1; k & A;) A >>= 1;
						if (A === 0 ? k = 0 : (k &= A - 1, k += A), x++, --te[b] === 0) {
							if (b === C) break;
							b = t[n + _[x]];
						}
						if (b > w && (k & N) !== M) {
							for (E === 0 && (E = w), P += S, T = b - E, D = 1 << T; T + E < C && (D -= te[T + E], !(D <= 0));) T++, D <<= 1;
							if (O += 1 << T, e === c && O > a || e === l && O > o) return 1;
							M = k & N, h[M] = w << 24 | T << 16 | P - g | 0;
						}
					}
					return k !== 0 && (h[P + k] = b - E << 24 | 4194304), v.bits = w, 0;
				};
			}, { "../utils/common": 41 }],
			51: [function(e, t, n) {
				t.exports = {
					2: "need dictionary",
					1: "stream end",
					0: "",
					"-1": "file error",
					"-2": "stream error",
					"-3": "data error",
					"-4": "insufficient memory",
					"-5": "buffer error",
					"-6": "incompatible version"
				};
			}, {}],
			52: [function(e, t, n) {
				var r = e("../utils/common"), i = 4, a = 0, o = 1, s = 2;
				function c(e) {
					for (var t = e.length; --t >= 0;) e[t] = 0;
				}
				var l = 0, u = 1, d = 2, f = 3, p = 258, m = 29, h = 256, g = h + 1 + m, _ = 30, v = 19, y = 2 * g + 1, b = 15, x = 16, S = 7, C = 256, w = 16, T = 17, E = 18, D = [
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					1,
					1,
					1,
					1,
					2,
					2,
					2,
					2,
					3,
					3,
					3,
					3,
					4,
					4,
					4,
					4,
					5,
					5,
					5,
					5,
					0
				], O = [
					0,
					0,
					0,
					0,
					1,
					1,
					2,
					2,
					3,
					3,
					4,
					4,
					5,
					5,
					6,
					6,
					7,
					7,
					8,
					8,
					9,
					9,
					10,
					10,
					11,
					11,
					12,
					12,
					13,
					13
				], k = [
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					2,
					3,
					7
				], A = [
					16,
					17,
					18,
					0,
					8,
					7,
					9,
					6,
					10,
					5,
					11,
					4,
					12,
					3,
					13,
					2,
					14,
					1,
					15
				], j = 512, M = Array((g + 2) * 2);
				c(M);
				var N = Array(_ * 2);
				c(N);
				var P = Array(j);
				c(P);
				var F = Array(p - f + 1);
				c(F);
				var I = Array(m);
				c(I);
				var ee = Array(_);
				c(ee);
				function te(e, t, n, r, i) {
					this.static_tree = e, this.extra_bits = t, this.extra_base = n, this.elems = r, this.max_length = i, this.has_stree = e && e.length;
				}
				var ne, L, re;
				function ie(e, t) {
					this.dyn_tree = e, this.max_code = 0, this.stat_desc = t;
				}
				function R(e) {
					return e < 256 ? P[e] : P[256 + (e >>> 7)];
				}
				function ae(e, t) {
					e.pending_buf[e.pending++] = t & 255, e.pending_buf[e.pending++] = t >>> 8 & 255;
				}
				function z(e, t, n) {
					e.bi_valid > x - n ? (e.bi_buf |= t << e.bi_valid & 65535, ae(e, e.bi_buf), e.bi_buf = t >> x - e.bi_valid, e.bi_valid += n - x) : (e.bi_buf |= t << e.bi_valid & 65535, e.bi_valid += n);
				}
				function oe(e, t, n) {
					z(e, n[t * 2], n[t * 2 + 1]);
				}
				function se(e, t) {
					var n = 0;
					do
						n |= e & 1, e >>>= 1, n <<= 1;
					while (--t > 0);
					return n >>> 1;
				}
				function ce(e) {
					e.bi_valid === 16 ? (ae(e, e.bi_buf), e.bi_buf = 0, e.bi_valid = 0) : e.bi_valid >= 8 && (e.pending_buf[e.pending++] = e.bi_buf & 255, e.bi_buf >>= 8, e.bi_valid -= 8);
				}
				function le(e, t) {
					var n = t.dyn_tree, r = t.max_code, i = t.stat_desc.static_tree, a = t.stat_desc.has_stree, o = t.stat_desc.extra_bits, s = t.stat_desc.extra_base, c = t.stat_desc.max_length, l, u, d, f, p, m, h = 0;
					for (f = 0; f <= b; f++) e.bl_count[f] = 0;
					for (n[e.heap[e.heap_max] * 2 + 1] = 0, l = e.heap_max + 1; l < y; l++) u = e.heap[l], f = n[n[u * 2 + 1] * 2 + 1] + 1, f > c && (f = c, h++), n[u * 2 + 1] = f, !(u > r) && (e.bl_count[f]++, p = 0, u >= s && (p = o[u - s]), m = n[u * 2], e.opt_len += m * (f + p), a && (e.static_len += m * (i[u * 2 + 1] + p)));
					if (h !== 0) {
						do {
							for (f = c - 1; e.bl_count[f] === 0;) f--;
							e.bl_count[f]--, e.bl_count[f + 1] += 2, e.bl_count[c]--, h -= 2;
						} while (h > 0);
						for (f = c; f !== 0; f--) for (u = e.bl_count[f]; u !== 0;) d = e.heap[--l], !(d > r) && (n[d * 2 + 1] !== f && (e.opt_len += (f - n[d * 2 + 1]) * n[d * 2], n[d * 2 + 1] = f), u--);
					}
				}
				function ue(e, t, n) {
					var r = Array(b + 1), i = 0, a, o;
					for (a = 1; a <= b; a++) r[a] = i = i + n[a - 1] << 1;
					for (o = 0; o <= t; o++) {
						var s = e[o * 2 + 1];
						s !== 0 && (e[o * 2] = se(r[s]++, s));
					}
				}
				function B() {
					var e, t, n, r, i, a = Array(b + 1);
					for (n = 0, r = 0; r < m - 1; r++) for (I[r] = n, e = 0; e < 1 << D[r]; e++) F[n++] = r;
					for (F[n - 1] = r, i = 0, r = 0; r < 16; r++) for (ee[r] = i, e = 0; e < 1 << O[r]; e++) P[i++] = r;
					for (i >>= 7; r < _; r++) for (ee[r] = i << 7, e = 0; e < 1 << O[r] - 7; e++) P[256 + i++] = r;
					for (t = 0; t <= b; t++) a[t] = 0;
					for (e = 0; e <= 143;) M[e * 2 + 1] = 8, e++, a[8]++;
					for (; e <= 255;) M[e * 2 + 1] = 9, e++, a[9]++;
					for (; e <= 279;) M[e * 2 + 1] = 7, e++, a[7]++;
					for (; e <= 287;) M[e * 2 + 1] = 8, e++, a[8]++;
					for (ue(M, g + 1, a), e = 0; e < _; e++) N[e * 2 + 1] = 5, N[e * 2] = se(e, 5);
					ne = new te(M, D, h + 1, g, b), L = new te(N, O, 0, _, b), re = new te([], k, 0, v, S);
				}
				function V(e) {
					var t;
					for (t = 0; t < g; t++) e.dyn_ltree[t * 2] = 0;
					for (t = 0; t < _; t++) e.dyn_dtree[t * 2] = 0;
					for (t = 0; t < v; t++) e.bl_tree[t * 2] = 0;
					e.dyn_ltree[C * 2] = 1, e.opt_len = e.static_len = 0, e.last_lit = e.matches = 0;
				}
				function de(e) {
					e.bi_valid > 8 ? ae(e, e.bi_buf) : e.bi_valid > 0 && (e.pending_buf[e.pending++] = e.bi_buf), e.bi_buf = 0, e.bi_valid = 0;
				}
				function H(e, t, n, i) {
					de(e), i && (ae(e, n), ae(e, ~n)), r.arraySet(e.pending_buf, e.window, t, n, e.pending), e.pending += n;
				}
				function U(e, t, n, r) {
					var i = t * 2, a = n * 2;
					return e[i] < e[a] || e[i] === e[a] && r[t] <= r[n];
				}
				function W(e, t, n) {
					for (var r = e.heap[n], i = n << 1; i <= e.heap_len && (i < e.heap_len && U(t, e.heap[i + 1], e.heap[i], e.depth) && i++, !U(t, r, e.heap[i], e.depth));) e.heap[n] = e.heap[i], n = i, i <<= 1;
					e.heap[n] = r;
				}
				function fe(e, t, n) {
					var r, i, a = 0, o, s;
					if (e.last_lit !== 0) do
						r = e.pending_buf[e.d_buf + a * 2] << 8 | e.pending_buf[e.d_buf + a * 2 + 1], i = e.pending_buf[e.l_buf + a], a++, r === 0 ? oe(e, i, t) : (o = F[i], oe(e, o + h + 1, t), s = D[o], s !== 0 && (i -= I[o], z(e, i, s)), r--, o = R(r), oe(e, o, n), s = O[o], s !== 0 && (r -= ee[o], z(e, r, s)));
					while (a < e.last_lit);
					oe(e, C, t);
				}
				function pe(e, t) {
					var n = t.dyn_tree, r = t.stat_desc.static_tree, i = t.stat_desc.has_stree, a = t.stat_desc.elems, o, s, c = -1, l;
					for (e.heap_len = 0, e.heap_max = y, o = 0; o < a; o++) n[o * 2] === 0 ? n[o * 2 + 1] = 0 : (e.heap[++e.heap_len] = c = o, e.depth[o] = 0);
					for (; e.heap_len < 2;) l = e.heap[++e.heap_len] = c < 2 ? ++c : 0, n[l * 2] = 1, e.depth[l] = 0, e.opt_len--, i && (e.static_len -= r[l * 2 + 1]);
					for (t.max_code = c, o = e.heap_len >> 1; o >= 1; o--) W(e, n, o);
					l = a;
					do
						o = e.heap[1], e.heap[1] = e.heap[e.heap_len--], W(e, n, 1), s = e.heap[1], e.heap[--e.heap_max] = o, e.heap[--e.heap_max] = s, n[l * 2] = n[o * 2] + n[s * 2], e.depth[l] = (e.depth[o] >= e.depth[s] ? e.depth[o] : e.depth[s]) + 1, n[o * 2 + 1] = n[s * 2 + 1] = l, e.heap[1] = l++, W(e, n, 1);
					while (e.heap_len >= 2);
					e.heap[--e.heap_max] = e.heap[1], le(e, t), ue(n, c, e.bl_count);
				}
				function G(e, t, n) {
					var r, i = -1, a, o = t[1], s = 0, c = 7, l = 4;
					for (o === 0 && (c = 138, l = 3), t[(n + 1) * 2 + 1] = 65535, r = 0; r <= n; r++) a = o, o = t[(r + 1) * 2 + 1], !(++s < c && a === o) && (s < l ? e.bl_tree[a * 2] += s : a === 0 ? s <= 10 ? e.bl_tree[T * 2]++ : e.bl_tree[E * 2]++ : (a !== i && e.bl_tree[a * 2]++, e.bl_tree[w * 2]++), s = 0, i = a, o === 0 ? (c = 138, l = 3) : a === o ? (c = 6, l = 3) : (c = 7, l = 4));
				}
				function me(e, t, n) {
					var r, i = -1, a, o = t[1], s = 0, c = 7, l = 4;
					for (o === 0 && (c = 138, l = 3), r = 0; r <= n; r++) if (a = o, o = t[(r + 1) * 2 + 1], !(++s < c && a === o)) {
						if (s < l) do
							oe(e, a, e.bl_tree);
						while (--s !== 0);
						else a === 0 ? s <= 10 ? (oe(e, T, e.bl_tree), z(e, s - 3, 3)) : (oe(e, E, e.bl_tree), z(e, s - 11, 7)) : (a !== i && (oe(e, a, e.bl_tree), s--), oe(e, w, e.bl_tree), z(e, s - 3, 2));
						s = 0, i = a, o === 0 ? (c = 138, l = 3) : a === o ? (c = 6, l = 3) : (c = 7, l = 4);
					}
				}
				function K(e) {
					var t;
					for (G(e, e.dyn_ltree, e.l_desc.max_code), G(e, e.dyn_dtree, e.d_desc.max_code), pe(e, e.bl_desc), t = v - 1; t >= 3 && e.bl_tree[A[t] * 2 + 1] === 0; t--);
					return e.opt_len += 3 * (t + 1) + 5 + 5 + 4, t;
				}
				function q(e, t, n, r) {
					var i;
					for (z(e, t - 257, 5), z(e, n - 1, 5), z(e, r - 4, 4), i = 0; i < r; i++) z(e, e.bl_tree[A[i] * 2 + 1], 3);
					me(e, e.dyn_ltree, t - 1), me(e, e.dyn_dtree, n - 1);
				}
				function he(e) {
					var t = 4093624447, n;
					for (n = 0; n <= 31; n++, t >>>= 1) if (t & 1 && e.dyn_ltree[n * 2] !== 0) return a;
					if (e.dyn_ltree[18] !== 0 || e.dyn_ltree[20] !== 0 || e.dyn_ltree[26] !== 0) return o;
					for (n = 32; n < h; n++) if (e.dyn_ltree[n * 2] !== 0) return o;
					return a;
				}
				var J = !1;
				function Y(e) {
					J ||= (B(), !0), e.l_desc = new ie(e.dyn_ltree, ne), e.d_desc = new ie(e.dyn_dtree, L), e.bl_desc = new ie(e.bl_tree, re), e.bi_buf = 0, e.bi_valid = 0, V(e);
				}
				function X(e, t, n, r) {
					z(e, (l << 1) + +!!r, 3), H(e, t, n, !0);
				}
				function ge(e) {
					z(e, u << 1, 3), oe(e, C, M), ce(e);
				}
				function Z(e, t, n, r) {
					var a, o, c = 0;
					e.level > 0 ? (e.strm.data_type === s && (e.strm.data_type = he(e)), pe(e, e.l_desc), pe(e, e.d_desc), c = K(e), a = e.opt_len + 3 + 7 >>> 3, o = e.static_len + 3 + 7 >>> 3, o <= a && (a = o)) : a = o = n + 5, n + 4 <= a && t !== -1 ? X(e, t, n, r) : e.strategy === i || o === a ? (z(e, (u << 1) + +!!r, 3), fe(e, M, N)) : (z(e, (d << 1) + +!!r, 3), q(e, e.l_desc.max_code + 1, e.d_desc.max_code + 1, c + 1), fe(e, e.dyn_ltree, e.dyn_dtree)), V(e), r && de(e);
				}
				function _e(e, t, n) {
					return e.pending_buf[e.d_buf + e.last_lit * 2] = t >>> 8 & 255, e.pending_buf[e.d_buf + e.last_lit * 2 + 1] = t & 255, e.pending_buf[e.l_buf + e.last_lit] = n & 255, e.last_lit++, t === 0 ? e.dyn_ltree[n * 2]++ : (e.matches++, t--, e.dyn_ltree[(F[n] + h + 1) * 2]++, e.dyn_dtree[R(t) * 2]++), e.last_lit === e.lit_bufsize - 1;
				}
				n._tr_init = Y, n._tr_stored_block = X, n._tr_flush_block = Z, n._tr_tally = _e, n._tr_align = ge;
			}, { "../utils/common": 41 }],
			53: [function(e, t, n) {
				function r() {
					this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
				}
				t.exports = r;
			}, {}],
			54: [function(e, t, n) {
				(function(e) {
					(function(e, t) {
						if (e.setImmediate) return;
						var n = 1, r = {}, i = !1, a = e.document, o;
						function s(e) {
							typeof e != "function" && (e = Function("" + e));
							for (var t = Array(arguments.length - 1), i = 0; i < t.length; i++) t[i] = arguments[i + 1];
							return r[n] = {
								callback: e,
								args: t
							}, o(n), n++;
						}
						function c(e) {
							delete r[e];
						}
						function l(e) {
							var n = e.callback, r = e.args;
							switch (r.length) {
								case 0:
									n();
									break;
								case 1:
									n(r[0]);
									break;
								case 2:
									n(r[0], r[1]);
									break;
								case 3:
									n(r[0], r[1], r[2]);
									break;
								default:
									n.apply(t, r);
									break;
							}
						}
						function u(e) {
							if (i) setTimeout(u, 0, e);
							else {
								var t = r[e];
								if (t) {
									i = !0;
									try {
										l(t);
									} finally {
										c(e), i = !1;
									}
								}
							}
						}
						function d() {
							o = function(e) {
								process.nextTick(function() {
									u(e);
								});
							};
						}
						function f() {
							if (e.postMessage && !e.importScripts) {
								var t = !0, n = e.onmessage;
								return e.onmessage = function() {
									t = !1;
								}, e.postMessage("", "*"), e.onmessage = n, t;
							}
						}
						function p() {
							var t = "setImmediate$" + Math.random() + "$", n = function(n) {
								n.source === e && typeof n.data == "string" && n.data.indexOf(t) === 0 && u(+n.data.slice(t.length));
							};
							e.addEventListener ? e.addEventListener("message", n, !1) : e.attachEvent("onmessage", n), o = function(n) {
								e.postMessage(t + n, "*");
							};
						}
						function m() {
							var e = new MessageChannel();
							e.port1.onmessage = function(e) {
								var t = e.data;
								u(t);
							}, o = function(t) {
								e.port2.postMessage(t);
							};
						}
						function h() {
							var e = a.documentElement;
							o = function(t) {
								var n = a.createElement("script");
								n.onreadystatechange = function() {
									u(t), n.onreadystatechange = null, e.removeChild(n), n = null;
								}, e.appendChild(n);
							};
						}
						function g() {
							o = function(e) {
								setTimeout(u, 0, e);
							};
						}
						var _ = Object.getPrototypeOf && Object.getPrototypeOf(e);
						_ = _ && _.setTimeout ? _ : e, {}.toString.call(e.process) === "[object process]" ? d() : f() ? p() : e.MessageChannel ? m() : a && "onreadystatechange" in a.createElement("script") ? h() : g(), _.setImmediate = s, _.clearImmediate = c;
					})(typeof self > "u" ? e === void 0 ? this : e : self);
				}).call(this, typeof global < "u" ? global : typeof self < "u" ? self : typeof window < "u" ? window : {});
			}, {}]
		}, {}, [10])(10);
	});
})))()), ti = class {
	zip;
	urlCache;
	constructor() {
		this.zip = void 0, this.urlCache = {}, this.checkRequirements();
	}
	checkRequirements() {
		try {
			this.zip = new ei.default();
		} catch {
			throw Error("JSZip lib not loaded");
		}
	}
	open(e, t) {
		return this.zip.loadAsync(e, { base64: t });
	}
	openUrl(e, t) {
		return Ue(e, "binary").then((e) => this.zip.loadAsync(e, { base64: t }));
	}
	request(e, t) {
		var n = new N(), r, i = new re(e);
		return t ||= i.extension, r = t == "blob" ? this.getBlob(e) : this.getText(e), r ? r.then((e) => {
			let r = this.handleResponse(e, t);
			n.resolve(r);
		}) : n.reject({
			message: "File not found in the epub: " + e,
			stack: (/* @__PURE__ */ Error()).stack
		}), n.promise;
	}
	handleResponse(e, t) {
		return t == "json" ? JSON.parse(e) : Ve(t) ? Ie(e, "text/xml") : t == "xhtml" ? Ie(e, "application/xhtml+xml") : t == "html" || t == "htm" ? Ie(e, "text/html") : e;
	}
	getBlob(e, t) {
		var n = window.decodeURIComponent(e.substr(1)), r = this.zip.file(n);
		if (r) return t ||= He.lookup(r.name), r.async("uint8array").then(function(e) {
			return new Blob([e], { type: t });
		});
	}
	getText(e, t) {
		var n = window.decodeURIComponent(e.substr(1)), r = this.zip.file(n);
		if (r) return r.async("string").then(function(e) {
			return e;
		});
	}
	getBase64(e, t) {
		var n = window.decodeURIComponent(e.substr(1)), r = this.zip.file(n);
		if (r) return t ||= He.lookup(r.name), r.async("base64").then(function(e) {
			return "data:" + t + ";base64," + e;
		});
	}
	createUrl(e, t) {
		var n = new N(), r = window.URL || window.webkitURL || window.mozURL, i, a, o = t && t.base64;
		if (e in this.urlCache) return n.resolve(this.urlCache[e]), n.promise;
		if (o) {
			var s = this.getBase64(e);
			a = s, s && s.then((t) => {
				this.urlCache[e] = t, n.resolve(t);
			});
		} else {
			var c = this.getBlob(e);
			a = c, c && c.then((t) => {
				i = r.createObjectURL(t), this.urlCache[e] = i, n.resolve(i);
			});
		}
		return a || n.reject({
			message: "File not found in the epub: " + e,
			stack: (/* @__PURE__ */ Error()).stack
		}), n.promise;
	}
	revokeUrl(e) {
		var t = window.URL || window.webkitURL || window.mozURL, n = this.urlCache[e];
		n && t.revokeObjectURL(n);
	}
	destroy() {
		var e = window.URL || window.webkitURL || window.mozURL;
		for (let t in this.urlCache) e.revokeObjectURL(t);
		this.zip = void 0, this.urlCache = {};
	}
}, ni = /* @__PURE__ */ l((/* @__PURE__ */ o(((e, t) => {
	(function(n) {
		if (typeof e == "object" && t !== void 0) t.exports = n();
		else if (typeof define == "function" && define.amd) define([], n);
		else {
			var r = typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : this;
			r.localforage = n();
		}
	})(function() {
		return (function e(t, n, r) {
			function i(o, s) {
				if (!n[o]) {
					if (!t[o]) {
						var c = typeof u == "function" && u;
						if (!s && c) return c(o, !0);
						if (a) return a(o, !0);
						var l = /* @__PURE__ */ Error("Cannot find module '" + o + "'");
						throw l.code = "MODULE_NOT_FOUND", l;
					}
					var d = n[o] = { exports: {} };
					t[o][0].call(d.exports, function(e) {
						var n = t[o][1][e];
						return i(n || e);
					}, d, d.exports, e, t, n, r);
				}
				return n[o].exports;
			}
			for (var a = typeof u == "function" && u, o = 0; o < r.length; o++) i(r[o]);
			return i;
		})({
			1: [function(e, t, n) {
				(function(e) {
					var n = e.MutationObserver || e.WebKitMutationObserver, r;
					if (n) {
						var i = 0, a = new n(u), o = e.document.createTextNode("");
						a.observe(o, { characterData: !0 }), r = function() {
							o.data = i = ++i % 2;
						};
					} else if (!e.setImmediate && e.MessageChannel !== void 0) {
						var s = new e.MessageChannel();
						s.port1.onmessage = u, r = function() {
							s.port2.postMessage(0);
						};
					} else r = "document" in e && "onreadystatechange" in e.document.createElement("script") ? function() {
						var t = e.document.createElement("script");
						t.onreadystatechange = function() {
							u(), t.onreadystatechange = null, t.parentNode.removeChild(t), t = null;
						}, e.document.documentElement.appendChild(t);
					} : function() {
						setTimeout(u, 0);
					};
					var c, l = [];
					function u() {
						c = !0;
						for (var e, t, n = l.length; n;) {
							for (t = l, l = [], e = -1; ++e < n;) t[e]();
							n = l.length;
						}
						c = !1;
					}
					t.exports = d;
					function d(e) {
						l.push(e) === 1 && !c && r();
					}
				}).call(this, typeof global < "u" ? global : typeof self < "u" ? self : typeof window < "u" ? window : {});
			}, {}],
			2: [function(e, t, n) {
				var r = e(1);
				/* istanbul ignore next */
				function i() {}
				var a = {}, o = ["REJECTED"], s = ["FULFILLED"], c = ["PENDING"];
				t.exports = l;
				function l(e) {
					if (typeof e != "function") throw TypeError("resolver must be a function");
					this.state = c, this.queue = [], this.outcome = void 0, e !== i && p(this, e);
				}
				l.prototype.catch = function(e) {
					return this.then(null, e);
				}, l.prototype.then = function(e, t) {
					if (typeof e != "function" && this.state === s || typeof t != "function" && this.state === o) return this;
					var n = new this.constructor(i);
					return this.state === c ? this.queue.push(new u(n, e, t)) : d(n, this.state === s ? e : t, this.outcome), n;
				};
				function u(e, t, n) {
					this.promise = e, typeof t == "function" && (this.onFulfilled = t, this.callFulfilled = this.otherCallFulfilled), typeof n == "function" && (this.onRejected = n, this.callRejected = this.otherCallRejected);
				}
				u.prototype.callFulfilled = function(e) {
					a.resolve(this.promise, e);
				}, u.prototype.otherCallFulfilled = function(e) {
					d(this.promise, this.onFulfilled, e);
				}, u.prototype.callRejected = function(e) {
					a.reject(this.promise, e);
				}, u.prototype.otherCallRejected = function(e) {
					d(this.promise, this.onRejected, e);
				};
				function d(e, t, n) {
					r(function() {
						var r;
						try {
							r = t(n);
						} catch (t) {
							return a.reject(e, t);
						}
						r === e ? a.reject(e, /* @__PURE__ */ TypeError("Cannot resolve promise with itself")) : a.resolve(e, r);
					});
				}
				a.resolve = function(e, t) {
					var n = m(f, t);
					if (n.status === "error") return a.reject(e, n.value);
					var r = n.value;
					if (r) p(e, r);
					else {
						e.state = s, e.outcome = t;
						for (var i = -1, o = e.queue.length; ++i < o;) e.queue[i].callFulfilled(t);
					}
					return e;
				}, a.reject = function(e, t) {
					e.state = o, e.outcome = t;
					for (var n = -1, r = e.queue.length; ++n < r;) e.queue[n].callRejected(t);
					return e;
				};
				function f(e) {
					var t = e && e.then;
					if (e && (typeof e == "object" || typeof e == "function") && typeof t == "function") return function() {
						t.apply(e, arguments);
					};
				}
				function p(e, t) {
					var n = !1;
					function r(t) {
						n || (n = !0, a.reject(e, t));
					}
					function i(t) {
						n || (n = !0, a.resolve(e, t));
					}
					function o() {
						t(i, r);
					}
					var s = m(o);
					s.status === "error" && r(s.value);
				}
				function m(e, t) {
					var n = {};
					try {
						n.value = e(t), n.status = "success";
					} catch (e) {
						n.status = "error", n.value = e;
					}
					return n;
				}
				l.resolve = h;
				function h(e) {
					return e instanceof this ? e : a.resolve(new this(i), e);
				}
				l.reject = g;
				function g(e) {
					var t = new this(i);
					return a.reject(t, e);
				}
				l.all = _;
				function _(e) {
					var t = this;
					if (Object.prototype.toString.call(e) !== "[object Array]") return this.reject(/* @__PURE__ */ TypeError("must be an array"));
					var n = e.length, r = !1;
					if (!n) return this.resolve([]);
					for (var o = Array(n), s = 0, c = -1, l = new this(i); ++c < n;) u(e[c], c);
					return l;
					function u(e, i) {
						t.resolve(e).then(c, function(e) {
							r || (r = !0, a.reject(l, e));
						});
						function c(e) {
							o[i] = e, ++s === n && !r && (r = !0, a.resolve(l, o));
						}
					}
				}
				l.race = v;
				function v(e) {
					var t = this;
					if (Object.prototype.toString.call(e) !== "[object Array]") return this.reject(/* @__PURE__ */ TypeError("must be an array"));
					var n = e.length, r = !1;
					if (!n) return this.resolve([]);
					for (var o = -1, s = new this(i); ++o < n;) c(e[o]);
					return s;
					function c(e) {
						t.resolve(e).then(function(e) {
							r || (r = !0, a.resolve(s, e));
						}, function(e) {
							r || (r = !0, a.reject(s, e));
						});
					}
				}
			}, { 1: 1 }],
			3: [function(e, t, n) {
				(function(t) {
					typeof t.Promise != "function" && (t.Promise = e(2));
				}).call(this, typeof global < "u" ? global : typeof self < "u" ? self : typeof window < "u" ? window : {});
			}, { 2: 2 }],
			4: [function(e, t, n) {
				var r = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
					return typeof e;
				} : function(e) {
					return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
				};
				function i(e, t) {
					if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
				}
				function a() {
					try {
						if (typeof indexedDB < "u") return indexedDB;
						if (typeof webkitIndexedDB < "u") return webkitIndexedDB;
						if (typeof mozIndexedDB < "u") return mozIndexedDB;
						if (typeof OIndexedDB < "u") return OIndexedDB;
						if (typeof msIndexedDB < "u") return msIndexedDB;
					} catch {
						return;
					}
				}
				var o = a();
				function s() {
					try {
						if (!o || !o.open) return !1;
						var e = typeof openDatabase < "u" && /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !/BlackBerry/.test(navigator.platform), t = typeof fetch == "function" && fetch.toString().indexOf("[native code") !== -1;
						return (!e || t) && typeof indexedDB < "u" && typeof IDBKeyRange < "u";
					} catch {
						return !1;
					}
				}
				function c(e, t) {
					e ||= [], t ||= {};
					try {
						return new Blob(e, t);
					} catch (i) {
						if (i.name !== "TypeError") throw i;
						for (var n = new (typeof BlobBuilder < "u" ? BlobBuilder : typeof MSBlobBuilder < "u" ? MSBlobBuilder : typeof MozBlobBuilder < "u" ? MozBlobBuilder : WebKitBlobBuilder)(), r = 0; r < e.length; r += 1) n.append(e[r]);
						return n.getBlob(t.type);
					}
				}
				typeof Promise > "u" && e(3);
				var l = Promise;
				function u(e, t) {
					t && e.then(function(e) {
						t(null, e);
					}, function(e) {
						t(e);
					});
				}
				function d(e, t, n) {
					typeof t == "function" && e.then(t), typeof n == "function" && e.catch(n);
				}
				function f(e) {
					return typeof e != "string" && (console.warn(e + " used as a key, but it is not a string."), e = String(e)), e;
				}
				function p() {
					if (arguments.length && typeof arguments[arguments.length - 1] == "function") return arguments[arguments.length - 1];
				}
				var m = "local-forage-detect-blob-support", h = void 0, g = {}, _ = Object.prototype.toString, v = "readonly", y = "readwrite";
				function b(e) {
					for (var t = e.length, n = new ArrayBuffer(t), r = new Uint8Array(n), i = 0; i < t; i++) r[i] = e.charCodeAt(i);
					return n;
				}
				function x(e) {
					return new l(function(t) {
						var n = e.transaction(m, y), r = c([""]);
						n.objectStore(m).put(r, "key"), n.onabort = function(e) {
							e.preventDefault(), e.stopPropagation(), t(!1);
						}, n.oncomplete = function() {
							var e = navigator.userAgent.match(/Chrome\/(\d+)/);
							t(navigator.userAgent.match(/Edge\//) || !e || parseInt(e[1], 10) >= 43);
						};
					}).catch(function() {
						return !1;
					});
				}
				function S(e) {
					return typeof h == "boolean" ? l.resolve(h) : x(e).then(function(e) {
						return h = e, h;
					});
				}
				function C(e) {
					var t = g[e.name], n = {};
					n.promise = new l(function(e, t) {
						n.resolve = e, n.reject = t;
					}), t.deferredOperations.push(n), t.dbReady ? t.dbReady = t.dbReady.then(function() {
						return n.promise;
					}) : t.dbReady = n.promise;
				}
				function w(e) {
					var t = g[e.name].deferredOperations.pop();
					if (t) return t.resolve(), t.promise;
				}
				function T(e, t) {
					var n = g[e.name].deferredOperations.pop();
					if (n) return n.reject(t), n.promise;
				}
				function E(e, t) {
					return new l(function(n, r) {
						if (g[e.name] = g[e.name] || I(), e.db) if (t) C(e), e.db.close();
						else return n(e.db);
						var i = [e.name];
						t && i.push(e.version);
						var a = o.open.apply(o, i);
						t && (a.onupgradeneeded = function(t) {
							var n = a.result;
							try {
								n.createObjectStore(e.storeName), t.oldVersion <= 1 && n.createObjectStore(m);
							} catch (n) {
								if (n.name === "ConstraintError") console.warn("The database \"" + e.name + "\" has been upgraded from version " + t.oldVersion + " to version " + t.newVersion + ", but the storage \"" + e.storeName + "\" already exists.");
								else throw n;
							}
						}), a.onerror = function(e) {
							e.preventDefault(), r(a.error);
						}, a.onsuccess = function() {
							var t = a.result;
							t.onversionchange = function(e) {
								e.target.close();
							}, n(t), w(e);
						};
					});
				}
				function D(e) {
					return E(e, !1);
				}
				function O(e) {
					return E(e, !0);
				}
				function k(e, t) {
					if (!e.db) return !0;
					var n = !e.db.objectStoreNames.contains(e.storeName), r = e.version < e.db.version, i = e.version > e.db.version;
					if (r && (e.version !== t && console.warn("The database \"" + e.name + "\" can't be downgraded from version " + e.db.version + " to version " + e.version + "."), e.version = e.db.version), i || n) {
						if (n) {
							var a = e.db.version + 1;
							a > e.version && (e.version = a);
						}
						return !0;
					}
					return !1;
				}
				function A(e) {
					return new l(function(t, n) {
						var r = new FileReader();
						r.onerror = n, r.onloadend = function(n) {
							t({
								__local_forage_encoded_blob: !0,
								data: btoa(n.target.result || ""),
								type: e.type
							});
						}, r.readAsBinaryString(e);
					});
				}
				function j(e) {
					return c([b(atob(e.data))], { type: e.type });
				}
				function M(e) {
					return e && e.__local_forage_encoded_blob;
				}
				function N(e) {
					var t = this, n = t._initReady().then(function() {
						var e = g[t._dbInfo.name];
						if (e && e.dbReady) return e.dbReady;
					});
					return d(n, e, e), n;
				}
				function P(e) {
					C(e);
					for (var t = g[e.name], n = t.forages, r = 0; r < n.length; r++) {
						var i = n[r];
						i._dbInfo.db && (i._dbInfo.db.close(), i._dbInfo.db = null);
					}
					return e.db = null, D(e).then(function(t) {
						return e.db = t, k(e) ? O(e) : t;
					}).then(function(r) {
						e.db = t.db = r;
						for (var i = 0; i < n.length; i++) n[i]._dbInfo.db = r;
					}).catch(function(t) {
						throw T(e, t), t;
					});
				}
				function F(e, t, n, r) {
					r === void 0 && (r = 1);
					try {
						n(null, e.db.transaction(e.storeName, t));
					} catch (i) {
						if (r > 0 && (!e.db || i.name === "InvalidStateError" || i.name === "NotFoundError")) return l.resolve().then(function() {
							if (!e.db || i.name === "NotFoundError" && !e.db.objectStoreNames.contains(e.storeName) && e.version <= e.db.version) return e.db && (e.version = e.db.version + 1), O(e);
						}).then(function() {
							return P(e).then(function() {
								F(e, t, n, r - 1);
							});
						}).catch(n);
						n(i);
					}
				}
				function I() {
					return {
						forages: [],
						db: null,
						dbReady: null,
						deferredOperations: []
					};
				}
				function ee(e) {
					var t = this, n = { db: null };
					if (e) for (var r in e) n[r] = e[r];
					var i = g[n.name];
					i || (i = I(), g[n.name] = i), i.forages.push(t), t._initReady || (t._initReady = t.ready, t.ready = N);
					var a = [];
					function o() {
						return l.resolve();
					}
					for (var s = 0; s < i.forages.length; s++) {
						var c = i.forages[s];
						c !== t && a.push(c._initReady().catch(o));
					}
					var u = i.forages.slice(0);
					return l.all(a).then(function() {
						return n.db = i.db, D(n);
					}).then(function(e) {
						return n.db = e, k(n, t._defaultConfig.version) ? O(n) : e;
					}).then(function(e) {
						n.db = i.db = e, t._dbInfo = n;
						for (var r = 0; r < u.length; r++) {
							var a = u[r];
							a !== t && (a._dbInfo.db = n.db, a._dbInfo.version = n.version);
						}
					});
				}
				function te(e, t) {
					var n = this;
					e = f(e);
					var r = new l(function(t, r) {
						n.ready().then(function() {
							F(n._dbInfo, v, function(i, a) {
								if (i) return r(i);
								try {
									var o = a.objectStore(n._dbInfo.storeName).get(e);
									o.onsuccess = function() {
										var e = o.result;
										e === void 0 && (e = null), M(e) && (e = j(e)), t(e);
									}, o.onerror = function() {
										r(o.error);
									};
								} catch (e) {
									r(e);
								}
							});
						}).catch(r);
					});
					return u(r, t), r;
				}
				function ne(e, t) {
					var n = this, r = new l(function(t, r) {
						n.ready().then(function() {
							F(n._dbInfo, v, function(i, a) {
								if (i) return r(i);
								try {
									var o = a.objectStore(n._dbInfo.storeName).openCursor(), s = 1;
									o.onsuccess = function() {
										var n = o.result;
										if (n) {
											var r = n.value;
											M(r) && (r = j(r));
											var i = e(r, n.key, s++);
											i === void 0 ? n.continue() : t(i);
										} else t();
									}, o.onerror = function() {
										r(o.error);
									};
								} catch (e) {
									r(e);
								}
							});
						}).catch(r);
					});
					return u(r, t), r;
				}
				function L(e, t, n) {
					var r = this;
					e = f(e);
					var i = new l(function(n, i) {
						var a;
						r.ready().then(function() {
							return a = r._dbInfo, _.call(t) === "[object Blob]" ? S(a.db).then(function(e) {
								return e ? t : A(t);
							}) : t;
						}).then(function(t) {
							F(r._dbInfo, y, function(a, o) {
								if (a) return i(a);
								try {
									var s = o.objectStore(r._dbInfo.storeName);
									t === null && (t = void 0);
									var c = s.put(t, e);
									o.oncomplete = function() {
										t === void 0 && (t = null), n(t);
									}, o.onabort = o.onerror = function() {
										i(c.error ? c.error : c.transaction.error);
									};
								} catch (e) {
									i(e);
								}
							});
						}).catch(i);
					});
					return u(i, n), i;
				}
				function re(e, t) {
					var n = this;
					e = f(e);
					var r = new l(function(t, r) {
						n.ready().then(function() {
							F(n._dbInfo, y, function(i, a) {
								if (i) return r(i);
								try {
									var o = a.objectStore(n._dbInfo.storeName).delete(e);
									a.oncomplete = function() {
										t();
									}, a.onerror = function() {
										r(o.error);
									}, a.onabort = function() {
										r(o.error ? o.error : o.transaction.error);
									};
								} catch (e) {
									r(e);
								}
							});
						}).catch(r);
					});
					return u(r, t), r;
				}
				function ie(e) {
					var t = this, n = new l(function(e, n) {
						t.ready().then(function() {
							F(t._dbInfo, y, function(r, i) {
								if (r) return n(r);
								try {
									var a = i.objectStore(t._dbInfo.storeName).clear();
									i.oncomplete = function() {
										e();
									}, i.onabort = i.onerror = function() {
										n(a.error ? a.error : a.transaction.error);
									};
								} catch (e) {
									n(e);
								}
							});
						}).catch(n);
					});
					return u(n, e), n;
				}
				function R(e) {
					var t = this, n = new l(function(e, n) {
						t.ready().then(function() {
							F(t._dbInfo, v, function(r, i) {
								if (r) return n(r);
								try {
									var a = i.objectStore(t._dbInfo.storeName).count();
									a.onsuccess = function() {
										e(a.result);
									}, a.onerror = function() {
										n(a.error);
									};
								} catch (e) {
									n(e);
								}
							});
						}).catch(n);
					});
					return u(n, e), n;
				}
				function ae(e, t) {
					var n = this, r = new l(function(t, r) {
						if (e < 0) {
							t(null);
							return;
						}
						n.ready().then(function() {
							F(n._dbInfo, v, function(i, a) {
								if (i) return r(i);
								try {
									var o = a.objectStore(n._dbInfo.storeName), s = !1, c = o.openKeyCursor();
									c.onsuccess = function() {
										var n = c.result;
										if (!n) {
											t(null);
											return;
										}
										e === 0 || s ? t(n.key) : (s = !0, n.advance(e));
									}, c.onerror = function() {
										r(c.error);
									};
								} catch (e) {
									r(e);
								}
							});
						}).catch(r);
					});
					return u(r, t), r;
				}
				function z(e) {
					var t = this, n = new l(function(e, n) {
						t.ready().then(function() {
							F(t._dbInfo, v, function(r, i) {
								if (r) return n(r);
								try {
									var a = i.objectStore(t._dbInfo.storeName).openKeyCursor(), o = [];
									a.onsuccess = function() {
										var t = a.result;
										if (!t) {
											e(o);
											return;
										}
										o.push(t.key), t.continue();
									}, a.onerror = function() {
										n(a.error);
									};
								} catch (e) {
									n(e);
								}
							});
						}).catch(n);
					});
					return u(n, e), n;
				}
				function oe(e, t) {
					t = p.apply(this, arguments);
					var n = this.config();
					e = typeof e != "function" && e || {}, e.name || (e.name = e.name || n.name, e.storeName = e.storeName || n.storeName);
					var r = this, i;
					if (!e.name) i = l.reject("Invalid arguments");
					else {
						var a = e.name === n.name && r._dbInfo.db ? l.resolve(r._dbInfo.db) : D(e).then(function(t) {
							var n = g[e.name], r = n.forages;
							n.db = t;
							for (var i = 0; i < r.length; i++) r[i]._dbInfo.db = t;
							return t;
						});
						i = e.storeName ? a.then(function(t) {
							if (t.objectStoreNames.contains(e.storeName)) {
								var n = t.version + 1;
								C(e);
								var r = g[e.name], i = r.forages;
								t.close();
								for (var a = 0; a < i.length; a++) {
									var s = i[a];
									s._dbInfo.db = null, s._dbInfo.version = n;
								}
								return new l(function(t, r) {
									var i = o.open(e.name, n);
									i.onerror = function(e) {
										i.result.close(), r(e);
									}, i.onupgradeneeded = function() {
										i.result.deleteObjectStore(e.storeName);
									}, i.onsuccess = function() {
										var e = i.result;
										e.close(), t(e);
									};
								}).then(function(e) {
									r.db = e;
									for (var t = 0; t < i.length; t++) {
										var n = i[t];
										n._dbInfo.db = e, w(n._dbInfo);
									}
								}).catch(function(t) {
									throw (T(e, t) || l.resolve()).catch(function() {}), t;
								});
							}
						}) : a.then(function(t) {
							C(e);
							var n = g[e.name], r = n.forages;
							t.close();
							for (var i = 0; i < r.length; i++) {
								var a = r[i];
								a._dbInfo.db = null;
							}
							return new l(function(t, n) {
								var r = o.deleteDatabase(e.name);
								r.onerror = function() {
									var e = r.result;
									e && e.close(), n(r.error);
								}, r.onblocked = function() {
									console.warn("dropInstance blocked for database \"" + e.name + "\" until all open connections are closed");
								}, r.onsuccess = function() {
									var e = r.result;
									e && e.close(), t(e);
								};
							}).then(function(e) {
								n.db = e;
								for (var t = 0; t < r.length; t++) {
									var i = r[t];
									w(i._dbInfo);
								}
							}).catch(function(t) {
								throw (T(e, t) || l.resolve()).catch(function() {}), t;
							});
						});
					}
					return u(i, t), i;
				}
				var se = {
					_driver: "asyncStorage",
					_initStorage: ee,
					_support: s(),
					iterate: ne,
					getItem: te,
					setItem: L,
					removeItem: re,
					clear: ie,
					length: R,
					key: ae,
					keys: z,
					dropInstance: oe
				};
				function ce() {
					return typeof openDatabase == "function";
				}
				var le = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", ue = "~~local_forage_type~", B = /^~~local_forage_type~([^~]+)~/, V = "__lfsc__:", de = V.length, H = "arbf", U = "blob", W = "si08", fe = "ui08", pe = "uic8", G = "si16", me = "si32", K = "ur16", q = "ui32", he = "fl32", J = "fl64", Y = de + H.length, X = Object.prototype.toString;
				function ge(e) {
					var t = e.length * .75, n = e.length, r, i = 0, a, o, s, c;
					e[e.length - 1] === "=" && (t--, e[e.length - 2] === "=" && t--);
					var l = new ArrayBuffer(t), u = new Uint8Array(l);
					for (r = 0; r < n; r += 4) a = le.indexOf(e[r]), o = le.indexOf(e[r + 1]), s = le.indexOf(e[r + 2]), c = le.indexOf(e[r + 3]), u[i++] = a << 2 | o >> 4, u[i++] = (o & 15) << 4 | s >> 2, u[i++] = (s & 3) << 6 | c & 63;
					return l;
				}
				function Z(e) {
					var t = new Uint8Array(e), n = "", r;
					for (r = 0; r < t.length; r += 3) n += le[t[r] >> 2], n += le[(t[r] & 3) << 4 | t[r + 1] >> 4], n += le[(t[r + 1] & 15) << 2 | t[r + 2] >> 6], n += le[t[r + 2] & 63];
					return t.length % 3 == 2 ? n = n.substring(0, n.length - 1) + "=" : t.length % 3 == 1 && (n = n.substring(0, n.length - 2) + "=="), n;
				}
				function _e(e, t) {
					var n = "";
					if (e && (n = X.call(e)), e && (n === "[object ArrayBuffer]" || e.buffer && X.call(e.buffer) === "[object ArrayBuffer]")) {
						var r, i = V;
						e instanceof ArrayBuffer ? (r = e, i += H) : (r = e.buffer, n === "[object Int8Array]" ? i += W : n === "[object Uint8Array]" ? i += fe : n === "[object Uint8ClampedArray]" ? i += pe : n === "[object Int16Array]" ? i += G : n === "[object Uint16Array]" ? i += K : n === "[object Int32Array]" ? i += me : n === "[object Uint32Array]" ? i += q : n === "[object Float32Array]" ? i += he : n === "[object Float64Array]" ? i += J : t(/* @__PURE__ */ Error("Failed to get type for BinaryArray"))), t(i + Z(r));
					} else if (n === "[object Blob]") {
						var a = new FileReader();
						a.onload = function() {
							var n = ue + e.type + "~" + Z(this.result);
							t(V + U + n);
						}, a.readAsArrayBuffer(e);
					} else try {
						t(JSON.stringify(e));
					} catch (n) {
						console.error("Couldn't convert value into a JSON string: ", e), t(null, n);
					}
				}
				function ve(e) {
					if (e.substring(0, de) !== V) return JSON.parse(e);
					var t = e.substring(Y), n = e.substring(de, Y), r;
					if (n === U && B.test(t)) {
						var i = t.match(B);
						r = i[1], t = t.substring(i[0].length);
					}
					var a = ge(t);
					switch (n) {
						case H: return a;
						case U: return c([a], { type: r });
						case W: return new Int8Array(a);
						case fe: return new Uint8Array(a);
						case pe: return new Uint8ClampedArray(a);
						case G: return new Int16Array(a);
						case K: return new Uint16Array(a);
						case me: return new Int32Array(a);
						case q: return new Uint32Array(a);
						case he: return new Float32Array(a);
						case J: return new Float64Array(a);
						default: throw Error("Unkown type: " + n);
					}
				}
				var Q = {
					serialize: _e,
					deserialize: ve,
					stringToBuffer: ge,
					bufferToString: Z
				};
				function ye(e, t, n, r) {
					e.executeSql("CREATE TABLE IF NOT EXISTS " + t.storeName + " (id INTEGER PRIMARY KEY, key unique, value)", [], n, r);
				}
				function be(e) {
					var t = this, n = { db: null };
					if (e) for (var r in e) n[r] = typeof e[r] == "string" ? e[r] : e[r].toString();
					var i = new l(function(e, r) {
						try {
							n.db = openDatabase(n.name, String(n.version), n.description, n.size);
						} catch (e) {
							return r(e);
						}
						n.db.transaction(function(i) {
							ye(i, n, function() {
								t._dbInfo = n, e();
							}, function(e, t) {
								r(t);
							});
						}, r);
					});
					return n.serializer = Q, i;
				}
				function xe(e, t, n, r, i, a) {
					e.executeSql(n, r, i, function(e, o) {
						o.code === o.SYNTAX_ERR ? e.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name = ?", [t.storeName], function(e, s) {
							s.rows.length ? a(e, o) : ye(e, t, function() {
								e.executeSql(n, r, i, a);
							}, a);
						}, a) : a(e, o);
					}, a);
				}
				function Se(e, t) {
					var n = this;
					e = f(e);
					var r = new l(function(t, r) {
						n.ready().then(function() {
							var i = n._dbInfo;
							i.db.transaction(function(n) {
								xe(n, i, "SELECT * FROM " + i.storeName + " WHERE key = ? LIMIT 1", [e], function(e, n) {
									var r = n.rows.length ? n.rows.item(0).value : null;
									r &&= i.serializer.deserialize(r), t(r);
								}, function(e, t) {
									r(t);
								});
							});
						}).catch(r);
					});
					return u(r, t), r;
				}
				function Ce(e, t) {
					var n = this, r = new l(function(t, r) {
						n.ready().then(function() {
							var i = n._dbInfo;
							i.db.transaction(function(n) {
								xe(n, i, "SELECT * FROM " + i.storeName, [], function(n, r) {
									for (var a = r.rows, o = a.length, s = 0; s < o; s++) {
										var c = a.item(s), l = c.value;
										if (l &&= i.serializer.deserialize(l), l = e(l, c.key, s + 1), l !== void 0) {
											t(l);
											return;
										}
									}
									t();
								}, function(e, t) {
									r(t);
								});
							});
						}).catch(r);
					});
					return u(r, t), r;
				}
				function we(e, t, n, r) {
					var i = this;
					e = f(e);
					var a = new l(function(a, o) {
						i.ready().then(function() {
							t === void 0 && (t = null);
							var s = t, c = i._dbInfo;
							c.serializer.serialize(t, function(t, l) {
								l ? o(l) : c.db.transaction(function(n) {
									xe(n, c, "INSERT OR REPLACE INTO " + c.storeName + " (key, value) VALUES (?, ?)", [e, t], function() {
										a(s);
									}, function(e, t) {
										o(t);
									});
								}, function(t) {
									if (t.code === t.QUOTA_ERR) {
										if (r > 0) {
											a(we.apply(i, [
												e,
												s,
												n,
												r - 1
											]));
											return;
										}
										o(t);
									}
								});
							});
						}).catch(o);
					});
					return u(a, n), a;
				}
				function Te(e, t, n) {
					return we.apply(this, [
						e,
						t,
						n,
						1
					]);
				}
				function Ee(e, t) {
					var n = this;
					e = f(e);
					var r = new l(function(t, r) {
						n.ready().then(function() {
							var i = n._dbInfo;
							i.db.transaction(function(n) {
								xe(n, i, "DELETE FROM " + i.storeName + " WHERE key = ?", [e], function() {
									t();
								}, function(e, t) {
									r(t);
								});
							});
						}).catch(r);
					});
					return u(r, t), r;
				}
				function De(e) {
					var t = this, n = new l(function(e, n) {
						t.ready().then(function() {
							var r = t._dbInfo;
							r.db.transaction(function(t) {
								xe(t, r, "DELETE FROM " + r.storeName, [], function() {
									e();
								}, function(e, t) {
									n(t);
								});
							});
						}).catch(n);
					});
					return u(n, e), n;
				}
				function Oe(e) {
					var t = this, n = new l(function(e, n) {
						t.ready().then(function() {
							var r = t._dbInfo;
							r.db.transaction(function(t) {
								xe(t, r, "SELECT COUNT(key) as c FROM " + r.storeName, [], function(t, n) {
									var r = n.rows.item(0).c;
									e(r);
								}, function(e, t) {
									n(t);
								});
							});
						}).catch(n);
					});
					return u(n, e), n;
				}
				function ke(e, t) {
					var n = this, r = new l(function(t, r) {
						n.ready().then(function() {
							var i = n._dbInfo;
							i.db.transaction(function(n) {
								xe(n, i, "SELECT key FROM " + i.storeName + " WHERE id = ? LIMIT 1", [e + 1], function(e, n) {
									t(n.rows.length ? n.rows.item(0).key : null);
								}, function(e, t) {
									r(t);
								});
							});
						}).catch(r);
					});
					return u(r, t), r;
				}
				function Ae(e) {
					var t = this, n = new l(function(e, n) {
						t.ready().then(function() {
							var r = t._dbInfo;
							r.db.transaction(function(t) {
								xe(t, r, "SELECT key FROM " + r.storeName, [], function(t, n) {
									for (var r = [], i = 0; i < n.rows.length; i++) r.push(n.rows.item(i).key);
									e(r);
								}, function(e, t) {
									n(t);
								});
							});
						}).catch(n);
					});
					return u(n, e), n;
				}
				function je(e) {
					return new l(function(t, n) {
						e.transaction(function(r) {
							r.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'", [], function(n, r) {
								for (var i = [], a = 0; a < r.rows.length; a++) i.push(r.rows.item(a).name);
								t({
									db: e,
									storeNames: i
								});
							}, function(e, t) {
								n(t);
							});
						}, function(e) {
							n(e);
						});
					});
				}
				function Me(e, t) {
					t = p.apply(this, arguments);
					var n = this.config();
					e = typeof e != "function" && e || {}, e.name || (e.name = e.name || n.name, e.storeName = e.storeName || n.storeName);
					var r = this, i = e.name ? new l(function(t) {
						var i = e.name === n.name ? r._dbInfo.db : openDatabase(e.name, "", "", 0);
						e.storeName ? t({
							db: i,
							storeNames: [e.storeName]
						}) : t(je(i));
					}).then(function(e) {
						return new l(function(t, n) {
							e.db.transaction(function(r) {
								function i(e) {
									return new l(function(t, n) {
										r.executeSql("DROP TABLE IF EXISTS " + e, [], function() {
											t();
										}, function(e, t) {
											n(t);
										});
									});
								}
								for (var a = [], o = 0, s = e.storeNames.length; o < s; o++) a.push(i(e.storeNames[o]));
								l.all(a).then(function() {
									t();
								}).catch(function(e) {
									n(e);
								});
							}, function(e) {
								n(e);
							});
						});
					}) : l.reject("Invalid arguments");
					return u(i, t), i;
				}
				var Ne = {
					_driver: "webSQLStorage",
					_initStorage: be,
					_support: ce(),
					iterate: Ce,
					getItem: Se,
					setItem: Te,
					removeItem: Ee,
					clear: De,
					length: Oe,
					key: ke,
					keys: Ae,
					dropInstance: Me
				};
				function Pe() {
					try {
						return typeof localStorage < "u" && "setItem" in localStorage && !!localStorage.setItem;
					} catch {
						return !1;
					}
				}
				function Fe(e, t) {
					var n = e.name + "/";
					return e.storeName !== t.storeName && (n += e.storeName + "/"), n;
				}
				function Ie() {
					var e = "_localforage_support_test";
					try {
						return localStorage.setItem(e, !0), localStorage.removeItem(e), !1;
					} catch {
						return !0;
					}
				}
				function Le() {
					return !Ie() || localStorage.length > 0;
				}
				function Re(e) {
					var t = this, n = {};
					if (e) for (var r in e) n[r] = e[r];
					return n.keyPrefix = Fe(e, t._defaultConfig), Le() ? (t._dbInfo = n, n.serializer = Q, l.resolve()) : l.reject();
				}
				function ze(e) {
					var t = this, n = t.ready().then(function() {
						for (var e = t._dbInfo.keyPrefix, n = localStorage.length - 1; n >= 0; n--) {
							var r = localStorage.key(n);
							r.indexOf(e) === 0 && localStorage.removeItem(r);
						}
					});
					return u(n, e), n;
				}
				function Be(e, t) {
					var n = this;
					e = f(e);
					var r = n.ready().then(function() {
						var t = n._dbInfo, r = localStorage.getItem(t.keyPrefix + e);
						return r &&= t.serializer.deserialize(r), r;
					});
					return u(r, t), r;
				}
				function Ve(e, t) {
					var n = this, r = n.ready().then(function() {
						for (var t = n._dbInfo, r = t.keyPrefix, i = r.length, a = localStorage.length, o = 1, s = 0; s < a; s++) {
							var c = localStorage.key(s);
							if (c.indexOf(r) === 0) {
								var l = localStorage.getItem(c);
								if (l &&= t.serializer.deserialize(l), l = e(l, c.substring(i), o++), l !== void 0) return l;
							}
						}
					});
					return u(r, t), r;
				}
				function He(e, t) {
					var n = this, r = n.ready().then(function() {
						var t = n._dbInfo, r;
						try {
							r = localStorage.key(e);
						} catch {
							r = null;
						}
						return r &&= r.substring(t.keyPrefix.length), r;
					});
					return u(r, t), r;
				}
				function Ue(e) {
					var t = this, n = t.ready().then(function() {
						for (var e = t._dbInfo, n = localStorage.length, r = [], i = 0; i < n; i++) {
							var a = localStorage.key(i);
							a.indexOf(e.keyPrefix) === 0 && r.push(a.substring(e.keyPrefix.length));
						}
						return r;
					});
					return u(n, e), n;
				}
				function We(e) {
					var t = this.keys().then(function(e) {
						return e.length;
					});
					return u(t, e), t;
				}
				function Ge(e, t) {
					var n = this;
					e = f(e);
					var r = n.ready().then(function() {
						var t = n._dbInfo;
						localStorage.removeItem(t.keyPrefix + e);
					});
					return u(r, t), r;
				}
				function Ke(e, t, n) {
					var r = this;
					e = f(e);
					var i = r.ready().then(function() {
						t === void 0 && (t = null);
						var n = t;
						return new l(function(i, a) {
							var o = r._dbInfo;
							o.serializer.serialize(t, function(t, r) {
								if (r) a(r);
								else try {
									localStorage.setItem(o.keyPrefix + e, t), i(n);
								} catch (e) {
									(e.name === "QuotaExceededError" || e.name === "NS_ERROR_DOM_QUOTA_REACHED") && a(e), a(e);
								}
							});
						});
					});
					return u(i, n), i;
				}
				function qe(e, t) {
					if (t = p.apply(this, arguments), e = typeof e != "function" && e || {}, !e.name) {
						var n = this.config();
						e.name = e.name || n.name, e.storeName = e.storeName || n.storeName;
					}
					var r = this, i = e.name ? new l(function(t) {
						e.storeName ? t(Fe(e, r._defaultConfig)) : t(e.name + "/");
					}).then(function(e) {
						for (var t = localStorage.length - 1; t >= 0; t--) {
							var n = localStorage.key(t);
							n.indexOf(e) === 0 && localStorage.removeItem(n);
						}
					}) : l.reject("Invalid arguments");
					return u(i, t), i;
				}
				var Je = {
					_driver: "localStorageWrapper",
					_initStorage: Re,
					_support: Pe(),
					iterate: Ve,
					getItem: Be,
					setItem: Ke,
					removeItem: Ge,
					clear: ze,
					length: We,
					key: He,
					keys: Ue,
					dropInstance: qe
				}, $ = function(e, t) {
					return e === t || typeof e == "number" && typeof t == "number" && isNaN(e) && isNaN(t);
				}, Ye = function(e, t) {
					for (var n = e.length, r = 0; r < n;) {
						if ($(e[r], t)) return !0;
						r++;
					}
					return !1;
				}, Xe = Array.isArray || function(e) {
					return Object.prototype.toString.call(e) === "[object Array]";
				}, Ze = {}, Qe = {}, $e = {
					INDEXEDDB: se,
					WEBSQL: Ne,
					LOCALSTORAGE: Je
				}, et = [
					$e.INDEXEDDB._driver,
					$e.WEBSQL._driver,
					$e.LOCALSTORAGE._driver
				], tt = ["dropInstance"], nt = [
					"clear",
					"getItem",
					"iterate",
					"key",
					"keys",
					"length",
					"removeItem",
					"setItem"
				].concat(tt), rt = {
					description: "",
					driver: et.slice(),
					name: "localforage",
					size: 4980736,
					storeName: "keyvaluepairs",
					version: 1
				};
				function it(e, t) {
					e[t] = function() {
						var n = arguments;
						return e.ready().then(function() {
							return e[t].apply(e, n);
						});
					};
				}
				function at() {
					for (var e = 1; e < arguments.length; e++) {
						var t = arguments[e];
						if (t) for (var n in t) t.hasOwnProperty(n) && (Xe(t[n]) ? arguments[0][n] = t[n].slice() : arguments[0][n] = t[n]);
					}
					return arguments[0];
				}
				t.exports = new (function() {
					function e(t) {
						for (var n in i(this, e), $e) if ($e.hasOwnProperty(n)) {
							var r = $e[n], a = r._driver;
							this[n] = a, Ze[a] || this.defineDriver(r);
						}
						this._defaultConfig = at({}, rt), this._config = at({}, this._defaultConfig, t), this._driverSet = null, this._initDriver = null, this._ready = !1, this._dbInfo = null, this._wrapLibraryMethodsWithReady(), this.setDriver(this._config.driver).catch(function() {});
					}
					return e.prototype.config = function(e) {
						if ((e === void 0 ? "undefined" : r(e)) === "object") {
							if (this._ready) return /* @__PURE__ */ Error("Can't call config() after localforage has been used.");
							for (var t in e) {
								if (t === "storeName" && (e[t] = e[t].replace(/\W/g, "_")), t === "version" && typeof e[t] != "number") return /* @__PURE__ */ Error("Database version must be a number.");
								this._config[t] = e[t];
							}
							return "driver" in e && e.driver ? this.setDriver(this._config.driver) : !0;
						} else if (typeof e == "string") return this._config[e];
						else return this._config;
					}, e.prototype.defineDriver = function(e, t, n) {
						var r = new l(function(t, n) {
							try {
								var r = e._driver, i = /* @__PURE__ */ Error("Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver");
								if (!e._driver) {
									n(i);
									return;
								}
								for (var a = nt.concat("_initStorage"), o = 0, s = a.length; o < s; o++) {
									var c = a[o];
									if ((!Ye(tt, c) || e[c]) && typeof e[c] != "function") {
										n(i);
										return;
									}
								}
								(function() {
									for (var t = function(e) {
										return function() {
											var t = /* @__PURE__ */ Error("Method " + e + " is not implemented by the current driver"), n = l.reject(t);
											return u(n, arguments[arguments.length - 1]), n;
										};
									}, n = 0, r = tt.length; n < r; n++) {
										var i = tt[n];
										e[i] || (e[i] = t(i));
									}
								})();
								var d = function(n) {
									Ze[r] && console.info("Redefining LocalForage driver: " + r), Ze[r] = e, Qe[r] = n, t();
								};
								"_support" in e ? e._support && typeof e._support == "function" ? e._support().then(d, n) : d(!!e._support) : d(!0);
							} catch (e) {
								n(e);
							}
						});
						return d(r, t, n), r;
					}, e.prototype.driver = function() {
						return this._driver || null;
					}, e.prototype.getDriver = function(e, t, n) {
						var r = Ze[e] ? l.resolve(Ze[e]) : l.reject(/* @__PURE__ */ Error("Driver not found."));
						return d(r, t, n), r;
					}, e.prototype.getSerializer = function(e) {
						var t = l.resolve(Q);
						return d(t, e), t;
					}, e.prototype.ready = function(e) {
						var t = this, n = t._driverSet.then(function() {
							return t._ready === null && (t._ready = t._initDriver()), t._ready;
						});
						return d(n, e, e), n;
					}, e.prototype.setDriver = function(e, t, n) {
						var r = this;
						Xe(e) || (e = [e]);
						var i = this._getSupportedDrivers(e);
						function a() {
							r._config.driver = r.driver();
						}
						function o(e) {
							return r._extend(e), a(), r._ready = r._initStorage(r._config), r._ready;
						}
						function s(e) {
							return function() {
								var t = 0;
								function n() {
									for (; t < e.length;) {
										var i = e[t];
										return t++, r._dbInfo = null, r._ready = null, r.getDriver(i).then(o).catch(n);
									}
									a();
									var s = /* @__PURE__ */ Error("No available storage method found.");
									return r._driverSet = l.reject(s), r._driverSet;
								}
								return n();
							};
						}
						var c = this._driverSet === null ? l.resolve() : this._driverSet.catch(function() {
							return l.resolve();
						});
						return this._driverSet = c.then(function() {
							var e = i[0];
							return r._dbInfo = null, r._ready = null, r.getDriver(e).then(function(e) {
								r._driver = e._driver, a(), r._wrapLibraryMethodsWithReady(), r._initDriver = s(i);
							});
						}).catch(function() {
							a();
							var e = /* @__PURE__ */ Error("No available storage method found.");
							return r._driverSet = l.reject(e), r._driverSet;
						}), d(this._driverSet, t, n), this._driverSet;
					}, e.prototype.supports = function(e) {
						return !!Qe[e];
					}, e.prototype._extend = function(e) {
						at(this, e);
					}, e.prototype._getSupportedDrivers = function(e) {
						for (var t = [], n = 0, r = e.length; n < r; n++) {
							var i = e[n];
							this.supports(i) && t.push(i);
						}
						return t;
					}, e.prototype._wrapLibraryMethodsWithReady = function() {
						for (var e = 0, t = nt.length; e < t; e++) it(this, nt[e]);
					}, e.prototype.createInstance = function(t) {
						return new e(t);
					}, e;
				}())();
			}, { 3: 3 }]
		}, {}, [4])(4);
	});
})))()), ri = class {
	urlCache;
	storage;
	name;
	requester;
	resolver;
	online;
	_status;
	constructor(e, t, n) {
		this.urlCache = {}, this.storage = void 0, this.name = e, this.requester = t || Ue, this.resolver = n, this.online = !0, this.checkRequirements(), this.addListeners();
	}
	checkRequirements() {
		try {
			let e = ni.default;
			ni.default === void 0 && (e = ni.default), this.storage = e.createInstance({ name: this.name });
		} catch {
			throw Error("localForage lib not loaded");
		}
	}
	addListeners() {
		this._status = this.status.bind(this), window.addEventListener("online", this._status), window.addEventListener("offline", this._status);
	}
	removeListeners() {
		window.removeEventListener("online", this._status), window.removeEventListener("offline", this._status), this._status = void 0;
	}
	status(e) {
		let t = navigator.onLine;
		this.online = t, t ? this.emit("online", this) : this.emit("offline", this);
	}
	add(e, t) {
		let n = e.resources.map((e) => {
			let { href: n } = e, r = this.resolver(n), i = window.encodeURIComponent(r);
			return this.storage.getItem(i).then((e) => !e || t ? this.requester(r, "binary").then((e) => this.storage.setItem(i, e)) : e);
		});
		return Promise.all(n);
	}
	put(e, t, n) {
		let r = window.encodeURIComponent(e);
		return this.storage.getItem(r).then((i) => i || this.requester(e, "binary", t, n).then((e) => this.storage.setItem(r, e)));
	}
	request(e, t, n, r) {
		return this.online ? this.requester(e, t, n, r).then((t) => (this.put(e), t)) : this.retrieve(e, t);
	}
	retrieve(e, t) {
		var n, r = new re(e);
		return t ||= r.extension, n = t == "blob" ? this.getBlob(e) : this.getText(e), n.then((n) => {
			var r = new N(), i;
			return n ? (i = this.handleResponse(n, t), r.resolve(i)) : r.reject({
				message: "File not found in storage: " + e,
				stack: (/* @__PURE__ */ Error()).stack
			}), r.promise;
		});
	}
	handleResponse(e, t) {
		return t == "json" ? JSON.parse(e) : Ve(t) ? Ie(e, "text/xml") : t == "xhtml" ? Ie(e, "application/xhtml+xml") : t == "html" || t == "htm" ? Ie(e, "text/html") : e;
	}
	getBlob(e, t) {
		let n = window.encodeURIComponent(e);
		return this.storage.getItem(n).then(function(n) {
			if (n) return t ||= He.lookup(e), new Blob([n], { type: t });
		});
	}
	getText(e, t) {
		let n = window.encodeURIComponent(e);
		return t ||= He.lookup(e), this.storage.getItem(n).then(function(e) {
			var n = new N(), r = new FileReader(), i;
			if (e) return i = new Blob([e], { type: t }), r.addEventListener("loadend", () => {
				n.resolve(r.result);
			}), r.readAsText(i, t), n.promise;
		});
	}
	getBase64(e, t) {
		let n = window.encodeURIComponent(e);
		return t ||= He.lookup(e), this.storage.getItem(n).then((e) => {
			var n = new N(), r = new FileReader(), i;
			if (e) return i = new Blob([e], { type: t }), r.addEventListener("loadend", () => {
				n.resolve(r.result);
			}), r.readAsDataURL(i), n.promise;
		});
	}
	createUrl(e, t) {
		var n = new N(), r = window.URL || window.webkitURL || window.mozURL, i, a, o = t && t.base64;
		if (e in this.urlCache) return n.resolve(this.urlCache[e]), n.promise;
		if (o) {
			var s = this.getBase64(e);
			a = s, s && s.then((t) => {
				this.urlCache[e] = t, n.resolve(t);
			});
		} else {
			var c = this.getBlob(e);
			a = c, c && c.then((t) => {
				i = r.createObjectURL(t), this.urlCache[e] = i, n.resolve(i);
			});
		}
		return a || n.reject({
			message: "File not found in storage: " + e,
			stack: (/* @__PURE__ */ Error()).stack
		}), n.promise;
	}
	revokeUrl(e) {
		var t = window.URL || window.webkitURL || window.mozURL, n = this.urlCache[e];
		n && t.revokeObjectURL(n);
	}
	destroy() {
		var e = window.URL || window.webkitURL || window.mozURL;
		for (let t in this.urlCache) e.revokeObjectURL(t);
		this.urlCache = {}, this.removeListeners();
	}
};
(0, j.default)(ri.prototype);
//#endregion
//#region src/displayoptions.ts
var ii = class {
	interactive;
	fixedLayout;
	openToSpread;
	orientationLock;
	constructor(e) {
		this.interactive = "", this.fixedLayout = "", this.openToSpread = "", this.orientationLock = "", e && this.parse(e);
	}
	parse(e) {
		if (!e) return this;
		let t = Z(e, "display_options");
		if (!t) return this;
		let n = _e(t, "option");
		return Array.from(n).forEach((e) => {
			let t = "";
			switch (e.childNodes.length && (t = e.childNodes[0].nodeValue || ""), e.attributes.name.value) {
				case "interactive":
					this.interactive = t;
					break;
				case "fixed-layout":
					this.fixedLayout = t;
					break;
				case "open-to-spread":
					this.openToSpread = t;
					break;
				case "orientation-lock":
					this.orientationLock = t;
					break;
			}
		}), this;
	}
	destroy() {
		this.interactive = void 0, this.fixedLayout = void 0, this.openToSpread = void 0, this.orientationLock = void 0;
	}
}, ai = N, oi = "META-INF/container.xml", si = "META-INF/com.apple.ibooks.display-options.xml", ci = {
	BINARY: "binary",
	BASE64: "base64",
	EPUB: "epub",
	OPF: "opf",
	MANIFEST: "json",
	DIRECTORY: "directory"
}, li = class {
	settings;
	opening;
	opened;
	isOpen;
	loading;
	loaded;
	ready;
	isRendered;
	request;
	spine;
	locations;
	navigation;
	pageList;
	url;
	path;
	archived;
	archive;
	storage;
	resources;
	rendition;
	container;
	packaging;
	package;
	displayOptions;
	cover;
	constructor(e, t) {
		t === void 0 && typeof e != "string" && !(e instanceof Blob) && !(e instanceof ArrayBuffer) && (t = e, e = void 0), this.settings = I(this.settings || {}, {
			requestMethod: void 0,
			requestCredentials: void 0,
			requestHeaders: void 0,
			encoding: void 0,
			replacements: void 0,
			canonical: void 0,
			openAs: void 0,
			store: void 0
		}), I(this.settings, t), this.opening = new ai(), this.opened = this.opening.promise, this.isOpen = !1, this.loading = {
			manifest: new ai(),
			spine: new ai(),
			metadata: new ai(),
			cover: new ai(),
			navigation: new ai(),
			pageList: new ai(),
			resources: new ai(),
			displayOptions: new ai()
		}, this.loaded = {
			manifest: this.loading.manifest.promise,
			spine: this.loading.spine.promise,
			metadata: this.loading.metadata.promise,
			cover: this.loading.cover.promise,
			navigation: this.loading.navigation.promise,
			pageList: this.loading.pageList.promise,
			resources: this.loading.resources.promise,
			displayOptions: this.loading.displayOptions.promise
		}, this.ready = Promise.all([
			this.loaded.manifest,
			this.loaded.spine,
			this.loaded.metadata,
			this.loaded.cover,
			this.loaded.navigation,
			this.loaded.resources,
			this.loaded.displayOptions
		]), this.isRendered = !1, this.request = this.settings.requestMethod || Ue, this.spine = new Ge(), this.locations = new Ye(this.spine, this.load.bind(this)), this.navigation = void 0, this.pageList = void 0, this.url = void 0, this.path = void 0, this.archived = !1, this.archive = void 0, this.storage = void 0, this.resources = void 0, this.rendition = void 0, this.container = void 0, this.packaging = void 0, this.displayOptions = void 0, this.settings.store && this.store(this.settings.store), e && this.open(e, this.settings.openAs).catch((t) => {
			var n = /* @__PURE__ */ Error("Cannot load book at " + e);
			this.emit($.BOOK.OPEN_FAILED, n);
		});
	}
	open(e, t) {
		var n, r = t || this.determineType(e);
		return r === ci.BINARY ? (this.archived = !0, this.url = new ie("/", ""), n = this.openEpub(e)) : r === ci.BASE64 ? (this.archived = !0, this.url = new ie("/", ""), n = this.openEpub(e, r)) : r === ci.EPUB ? (this.archived = !0, this.url = new ie("/", ""), n = this.request(e, "binary", this.settings.requestCredentials, this.settings.requestHeaders).then(this.openEpub.bind(this))) : r == ci.OPF ? (this.url = new ie(e), n = this.openPackaging(this.url.Path.toString())) : r == ci.MANIFEST ? (this.url = new ie(e), n = this.openManifest(this.url.Path.toString())) : (this.url = new ie(e), n = this.openContainer(oi).then(this.openPackaging.bind(this))), n;
	}
	openEpub(e, t) {
		return this.unarchive(e, t || this.settings.encoding).then(() => this.openContainer(oi)).then((e) => this.openPackaging(e));
	}
	openContainer(e) {
		return this.load(e, "xml").then((e) => (this.container = new Xe(e), this.resolve(this.container.packagePath)));
	}
	openPackaging(e) {
		return this.path = new re(e), this.load(e, "xml").then((e) => (this.packaging = new Ze(e), this.unpack(this.packaging)));
	}
	openManifest(e) {
		return this.path = new re(e), this.load(e, "json").then((e) => (this.packaging = new Ze(), this.packaging.load(e), this.unpack(this.packaging)));
	}
	load(e, t) {
		var n = this.resolve(e);
		return this.archived ? this.archive.request(n, t || void 0) : this.request(n, t || null, this.settings.requestCredentials, this.settings.requestHeaders);
	}
	resolve(e, t) {
		if (e) {
			var n = e;
			return e.indexOf("://") > -1 ? e : (this.path && (n = this.path.resolve(e)), t != 0 && this.url && (n = this.url.resolve(n)), n);
		}
	}
	canonical(e) {
		var t = e;
		return e ? (t = this.settings.canonical ? this.settings.canonical(e) : this.resolve(e, !0) || "", t) : "";
	}
	determineType(e) {
		var t, n, r;
		if (this.settings.encoding === "base64") return ci.BASE64;
		if (typeof e != "string") return ci.BINARY;
		if (t = new ie(e), n = t.path(), r = n.extension, r &&= r.replace(/\?.*$/, ""), !r) return ci.DIRECTORY;
		if (r === "epub") return ci.EPUB;
		if (r === "opf") return ci.OPF;
		if (r === "json") return ci.MANIFEST;
	}
	unpack(e) {
		this.package = e, this.packaging.metadata.layout === "" ? this.load(this.url.resolve(si), "xml").then((e) => {
			this.displayOptions = new ii(e), this.loading.displayOptions.resolve(this.displayOptions);
		}).catch((e) => {
			this.displayOptions = new ii(), this.loading.displayOptions.resolve(this.displayOptions);
		}) : (this.displayOptions = new ii(), this.loading.displayOptions.resolve(this.displayOptions)), this.spine.unpack(this.packaging, this.resolve.bind(this), this.canonical.bind(this)), this.resources = new it(this.packaging.manifest, {
			archive: this.archive,
			resolver: this.resolve.bind(this),
			request: this.request.bind(this),
			replacements: this.settings.replacements || (this.archived ? "blobUrl" : "base64")
		}), this.loadNavigation(this.packaging).then(() => {
			this.loading.navigation.resolve(this.navigation);
		}), this.packaging.coverPath && (this.cover = this.resolve(this.packaging.coverPath)), this.loading.manifest.resolve(this.packaging.manifest), this.loading.metadata.resolve(this.packaging.metadata), this.loading.spine.resolve(this.spine), this.loading.cover.resolve(this.cover), this.loading.resources.resolve(this.resources), this.loading.pageList.resolve(this.pageList), this.isOpen = !0, this.archived || this.settings.replacements && this.settings.replacements != "none" ? this.replacements().then(() => {
			this.loaded.displayOptions.then(() => {
				this.opening.resolve(this);
			});
		}).catch((e) => {
			console.error(e);
		}) : this.loaded.displayOptions.then(() => {
			this.opening.resolve(this);
		});
	}
	loadNavigation(e) {
		let t = e.navPath || e.ncxPath, n = e.toc;
		return n ? new Promise((t) => {
			this.navigation = new Qe(n), e.pageList && (this.pageList = new at(e.pageList)), t(this.navigation);
		}) : t ? this.load(t, "xml").then((e) => (this.navigation = new Qe(e), this.pageList = new at(e), this.navigation)) : new Promise((e) => {
			this.navigation = new Qe(), this.pageList = new at(), e(this.navigation);
		});
	}
	section(e) {
		return this.spine.get(e);
	}
	renderTo(e, t) {
		return this.rendition = new $r(this, t), this.rendition.attachTo(e), this.rendition;
	}
	setRequestCredentials(e) {
		this.settings.requestCredentials = e;
	}
	setRequestHeaders(e) {
		this.settings.requestHeaders = e;
	}
	unarchive(e, t) {
		return this.archive = new ti(), this.archive.open(e, t);
	}
	store(e) {
		let t = this.settings.replacements && this.settings.replacements !== "none", n = this.url, r = this.settings.requestMethod || Ue.bind(this);
		return this.storage = new ri(e, r, this.resolve.bind(this)), this.request = this.storage.request.bind(this.storage), this.opened.then(() => {
			this.archived && (this.storage.requester = this.archive.request.bind(this.archive));
			let e = (e, t) => {
				t.output = this.resources.substitute(e, t.url);
			};
			this.resources.settings.replacements = t || "blobUrl", this.resources.replacements().then(() => this.resources.replaceCss()), this.storage.on("offline", () => {
				this.url = new ie("/", ""), this.spine.hooks.serialize.register(e);
			}), this.storage.on("online", () => {
				this.url = n, this.spine.hooks.serialize.deregister(e);
			});
		}), this.storage;
	}
	coverUrl() {
		return this.loaded.cover.then(() => this.cover ? this.archived ? this.archive.createUrl(this.cover) : this.cover : null);
	}
	replacements() {
		return this.spine.hooks.serialize.register((e, t) => {
			t.output = this.resources.substitute(e, t.url);
		}), this.resources.replacements().then(() => this.resources.replaceCss());
	}
	getRange(e) {
		var t = new X(e), n = this.spine.get(t.spinePos), r = this.load.bind(this);
		return n ? n.load(r).then(function(e) {
			return t.toRange(n.document);
		}) : new Promise((e, t) => {
			t("CFI could not be found");
		});
	}
	key(e) {
		return `epubjs:0.3:${e || this.packaging.metadata.identifier || this.url.filename}`;
	}
	destroy() {
		this.opened = void 0, this.loading = void 0, this.loaded = void 0, this.ready = void 0, this.isOpen = !1, this.isRendered = !1, this.spine && this.spine.destroy(), this.locations && this.locations.destroy(), this.pageList && this.pageList.destroy(), this.archive && this.archive.destroy(), this.resources && this.resources.destroy(), this.container && this.container.destroy(), this.packaging && this.packaging.destroy(), this.rendition && this.rendition.destroy(), this.displayOptions && this.displayOptions.destroy(), this.spine = void 0, this.locations = void 0, this.pageList = void 0, this.archive = void 0, this.resources = void 0, this.container = void 0, this.packaging = void 0, this.rendition = void 0, this.navigation = void 0, this.url = void 0, this.path = void 0, this.archived = !1;
	}
};
(0, j.default)(li.prototype);
//#endregion
//#region src/utils/core.ts
var ui = /* @__PURE__ */ s({
	RangeObject: () => Xi,
	blob2base64: () => Ui,
	borders: () => wi,
	bounds: () => Ci,
	createBase64Url: () => Pi,
	createBlob: () => ji,
	createBlobUrl: () => Mi,
	defaults: () => vi,
	defer: () => Wi,
	documentHeight: () => pi,
	extend: () => yi,
	filterChildren: () => Ji,
	findChildren: () => Ki,
	getParentByTagName: () => Yi,
	indexOfElementNode: () => ki,
	indexOfNode: () => Di,
	indexOfSorted: () => Si,
	indexOfTextNode: () => Oi,
	insert: () => bi,
	isElement: () => mi,
	isFloat: () => gi,
	isNumber: () => hi,
	isXml: () => Ai,
	locationOf: () => xi,
	nodeBounds: () => Ti,
	parents: () => qi,
	parse: () => Ii,
	prefixed: () => _i,
	qs: () => Li,
	qsa: () => Ri,
	qsp: () => zi,
	querySelectorByType: () => Gi,
	requestAnimationFrame: () => di,
	revokeBlobUrl: () => Ni,
	sprint: () => Bi,
	treeWalker: () => Vi,
	type: () => Fi,
	uuid: () => fi,
	walk: () => Hi,
	windowBounds: () => Ei
}), di = Ne;
function fi() {
	return M();
}
function pi() {
	return ft();
}
function mi(e) {
	return pe(e);
}
function hi(e) {
	return G(e);
}
function gi(e) {
	return me(e);
}
function _i(e) {
	return ut(e);
}
function vi(e, ...t) {
	return F.apply(null, arguments);
}
function yi(e, ...t) {
	return I.apply(null, arguments);
}
function bi(e, t, n) {
	return ee(e, t, n);
}
function xi(e, t, n, r, i) {
	return te(e, t, n, r, i);
}
function Si(e, t, n, r, i) {
	return ne(e, t, n, r, i);
}
function Ci(e) {
	return pt(e);
}
function wi(e) {
	return mt(e);
}
function Ti(e) {
	return ht(e);
}
function Ei() {
	return gt();
}
function Di(e, t) {
	return H(e, t);
}
function Oi(e) {
	return U(e);
}
function ki(e) {
	return W(e);
}
function Ai(e) {
	return Ve(e);
}
function ji(e, t) {
	return $e(e, t);
}
function Mi(e, t) {
	return et(e, t);
}
function Ni(e) {
	return tt(e);
}
function Pi(e, t) {
	return nt(e, t);
}
function Fi(e) {
	return K(e);
}
function Ii(e, t, n) {
	return Ie(e, t, n);
}
function Li(e, t) {
	return Z(e, t);
}
function Ri(e, t) {
	return _e(e, t);
}
function zi(e, t, n) {
	return ve(e, t, n);
}
function Bi(e, t) {
	return z(e, t);
}
function Vi(e, t, n) {
	return oe(e, t, n);
}
function Hi(e, t) {
	return le(e, t);
}
function Ui(e) {
	return rt(e);
}
function Wi() {
	N.call(this);
}
function Gi(e, t, n) {
	return Q(e, t, n);
}
function Ki(e) {
	return ue(e);
}
function qi(e) {
	return B(e);
}
function Ji(e, t, n) {
	return V(e, t, n);
}
function Yi(e, t) {
	return de(e, t);
}
var Xi = class extends fe {}, Zi = function(e, t) {
	return t === void 0 && typeof e != "string" && !(e instanceof Blob) && !(e instanceof ArrayBuffer) ? new li(e) : new li(e, t);
};
Zi.VERSION = "0.3", globalThis.EPUBJS_VERSION = "0.3", Zi.Book = li, Zi.Rendition = $r, Zi.Contents = It, Zi.CFI = X, Zi.utils = ui;
//#endregion
//#region src/index.ts
var Qi = Zi;
//#endregion
export { li as Book, It as Contents, X as EpubCFI, ot as Layout, $r as Rendition, Qi as default, ye as replaceBase, be as replaceCanonical, Se as replaceLinks, xe as replaceMeta, Ue as request, Ce as substitute };

//# sourceMappingURL=epub.mjs.map