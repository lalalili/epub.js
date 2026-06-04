(function(global, factory) {
	typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory(require("jszip/dist/jszip")) : typeof define === "function" && define.amd ? define(["jszip/dist/jszip"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.ePub = factory(global.JSZip));
})(this, function(jszip_dist_jszip) {
	//#region \0rolldown/runtime.js
	var __create = Object.create;
	var __defProp = Object.defineProperty;
	var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
	var __getOwnPropNames = Object.getOwnPropertyNames;
	var __getProtoOf = Object.getPrototypeOf;
	var __hasOwnProp = Object.prototype.hasOwnProperty;
	var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod), cb = null), mod.exports);
	var __exportAll = (all, no_symbols) => {
		let target = {};
		for (var name in all) __defProp(target, name, {
			get: all[name],
			enumerable: true
		});
		if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
		return target;
	};
	var __copyProps = (to, from, except, desc) => {
		if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
			key = keys[i];
			if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
				get: ((k) => from[k]).bind(null, key),
				enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
			});
		}
		return to;
	};
	var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
		value: mod,
		enumerable: true
	}) : target, mod));
	//#endregion
	jszip_dist_jszip = __toESM(jszip_dist_jszip);
	//#region node_modules/type/value/is.js
	var require_is$4 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var _undefined = void 0;
		module.exports = function(value) {
			return value !== _undefined && value !== null;
		};
	}));
	//#endregion
	//#region node_modules/type/object/is.js
	var require_is$3 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var isValue = require_is$4();
		var possibleTypes = {
			"object": true,
			"function": true,
			"undefined": true
		};
		module.exports = function(value) {
			if (!isValue(value)) return false;
			return hasOwnProperty.call(possibleTypes, typeof value);
		};
	}));
	//#endregion
	//#region node_modules/type/prototype/is.js
	var require_is$2 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var isObject = require_is$3();
		module.exports = function(value) {
			if (!isObject(value)) return false;
			try {
				if (!value.constructor) return false;
				return value.constructor.prototype === value;
			} catch (error) {
				return false;
			}
		};
	}));
	//#endregion
	//#region node_modules/type/function/is.js
	var require_is$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var isPrototype = require_is$2();
		module.exports = function(value) {
			if (typeof value !== "function") return false;
			if (!hasOwnProperty.call(value, "length")) return false;
			try {
				if (typeof value.length !== "number") return false;
				if (typeof value.call !== "function") return false;
				if (typeof value.apply !== "function") return false;
			} catch (error) {
				return false;
			}
			return !isPrototype(value);
		};
	}));
	//#endregion
	//#region node_modules/type/plain-function/is.js
	var require_is = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var isFunction = require_is$1();
		var classRe = /^\s*class[\s{/}]/, functionToString = Function.prototype.toString;
		module.exports = function(value) {
			if (!isFunction(value)) return false;
			if (classRe.test(functionToString.call(value))) return false;
			return true;
		};
	}));
	//#endregion
	//#region node_modules/es5-ext/object/assign/is-implemented.js
	var require_is_implemented$2 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = function() {
			var assign = Object.assign, obj;
			if (typeof assign !== "function") return false;
			obj = { foo: "raz" };
			assign(obj, { bar: "dwa" }, { trzy: "trzy" });
			return obj.foo + obj.bar + obj.trzy === "razdwatrzy";
		};
	}));
	//#endregion
	//#region node_modules/es5-ext/object/keys/is-implemented.js
	var require_is_implemented$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = function() {
			try {
				return true;
			} catch (e) {
				return false;
			}
		};
	}));
	//#endregion
	//#region node_modules/es5-ext/function/noop.js
	var require_noop = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = function() {};
	}));
	//#endregion
	//#region node_modules/es5-ext/object/is-value.js
	var require_is_value = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var _undefined = require_noop()();
		module.exports = function(val) {
			return val !== _undefined && val !== null;
		};
	}));
	//#endregion
	//#region node_modules/es5-ext/object/keys/shim.js
	var require_shim$2 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var isValue = require_is_value();
		var keys = Object.keys;
		module.exports = function(object) {
			return keys(isValue(object) ? Object(object) : object);
		};
	}));
	//#endregion
	//#region node_modules/es5-ext/object/keys/index.js
	var require_keys = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = require_is_implemented$1()() ? Object.keys : require_shim$2();
	}));
	//#endregion
	//#region node_modules/es5-ext/object/valid-value.js
	var require_valid_value = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var isValue = require_is_value();
		module.exports = function(value) {
			if (!isValue(value)) throw new TypeError("Cannot use null or undefined");
			return value;
		};
	}));
	//#endregion
	//#region node_modules/es5-ext/object/assign/shim.js
	var require_shim$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var keys = require_keys(), value = require_valid_value(), max = Math.max;
		module.exports = function(dest, src) {
			var error, i, length = max(arguments.length, 2), assign;
			dest = Object(value(dest));
			assign = function(key) {
				try {
					dest[key] = src[key];
				} catch (e) {
					if (!error) error = e;
				}
			};
			for (i = 1; i < length; ++i) {
				src = arguments[i];
				keys(src).forEach(assign);
			}
			if (error !== void 0) throw error;
			return dest;
		};
	}));
	//#endregion
	//#region node_modules/es5-ext/object/assign/index.js
	var require_assign = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = require_is_implemented$2()() ? Object.assign : require_shim$1();
	}));
	//#endregion
	//#region node_modules/es5-ext/object/normalize-options.js
	var require_normalize_options = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var isValue = require_is_value();
		var forEach = Array.prototype.forEach, create = Object.create;
		var process = function(src, obj) {
			var key;
			for (key in src) obj[key] = src[key];
		};
		module.exports = function(opts1) {
			var result = create(null);
			forEach.call(arguments, function(options) {
				if (!isValue(options)) return;
				process(Object(options), result);
			});
			return result;
		};
	}));
	//#endregion
	//#region node_modules/es5-ext/string/#/contains/is-implemented.js
	var require_is_implemented = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var str = "razdwatrzy";
		module.exports = function() {
			if (typeof str.contains !== "function") return false;
			return str.contains("dwa") === true && str.contains("foo") === false;
		};
	}));
	//#endregion
	//#region node_modules/es5-ext/string/#/contains/shim.js
	var require_shim = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var indexOf = String.prototype.indexOf;
		module.exports = function(searchString) {
			return indexOf.call(this, searchString, arguments[1]) > -1;
		};
	}));
	//#endregion
	//#region node_modules/es5-ext/string/#/contains/index.js
	var require_contains = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = require_is_implemented()() ? String.prototype.contains : require_shim();
	}));
	//#endregion
	//#region node_modules/d/index.js
	var require_d = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var isValue = require_is$4(), isPlainFunction = require_is(), assign = require_assign(), normalizeOpts = require_normalize_options(), contains = require_contains();
		var d = module.exports = function(dscr, value) {
			var c, e, w, options, desc;
			if (arguments.length < 2 || typeof dscr !== "string") {
				options = value;
				value = dscr;
				dscr = null;
			} else options = arguments[2];
			if (isValue(dscr)) {
				c = contains.call(dscr, "c");
				e = contains.call(dscr, "e");
				w = contains.call(dscr, "w");
			} else {
				c = w = true;
				e = false;
			}
			desc = {
				value,
				configurable: c,
				enumerable: e,
				writable: w
			};
			return !options ? desc : assign(normalizeOpts(options), desc);
		};
		d.gs = function(dscr, get, set) {
			var c, e, options, desc;
			if (typeof dscr !== "string") {
				options = set;
				set = get;
				get = dscr;
				dscr = null;
			} else options = arguments[3];
			if (!isValue(get)) get = void 0;
			else if (!isPlainFunction(get)) {
				options = get;
				get = set = void 0;
			} else if (!isValue(set)) set = void 0;
			else if (!isPlainFunction(set)) {
				options = set;
				set = void 0;
			}
			if (isValue(dscr)) {
				c = contains.call(dscr, "c");
				e = contains.call(dscr, "e");
			} else {
				c = true;
				e = false;
			}
			desc = {
				get,
				set,
				configurable: c,
				enumerable: e
			};
			return !options ? desc : assign(normalizeOpts(options), desc);
		};
	}));
	//#endregion
	//#region node_modules/es5-ext/object/valid-callable.js
	var require_valid_callable = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = function(fn) {
			if (typeof fn !== "function") throw new TypeError(fn + " is not a function");
			return fn;
		};
	}));
	//#endregion
	//#region src/core/async.ts
	var import_event_emitter = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports, module) => {
		var d = require_d(), callable = require_valid_callable(), apply = Function.prototype.apply, call = Function.prototype.call, create = Object.create, defineProperty = Object.defineProperty, defineProperties = Object.defineProperties, hasOwnProperty = Object.prototype.hasOwnProperty, descriptor = {
			configurable: true,
			enumerable: false,
			writable: true
		}, on = function(type, listener) {
			var data;
			callable(listener);
			if (!hasOwnProperty.call(this, "__ee__")) {
				data = descriptor.value = create(null);
				defineProperty(this, "__ee__", descriptor);
				descriptor.value = null;
			} else data = this.__ee__;
			if (!data[type]) data[type] = listener;
			else if (typeof data[type] === "object") data[type].push(listener);
			else data[type] = [data[type], listener];
			return this;
		}, once = function(type, listener) {
			var once, self;
			callable(listener);
			self = this;
			on.call(this, type, once = function() {
				off.call(self, type, once);
				apply.call(listener, this, arguments);
			});
			once.__eeOnceListener__ = listener;
			return this;
		}, off = function(type, listener) {
			var data, listeners, candidate, i;
			callable(listener);
			if (!hasOwnProperty.call(this, "__ee__")) return this;
			data = this.__ee__;
			if (!data[type]) return this;
			listeners = data[type];
			if (typeof listeners === "object") {
				for (i = 0; candidate = listeners[i]; ++i) if (candidate === listener || candidate.__eeOnceListener__ === listener) if (listeners.length === 2) data[type] = listeners[i ? 0 : 1];
				else listeners.splice(i, 1);
			} else if (listeners === listener || listeners.__eeOnceListener__ === listener) delete data[type];
			return this;
		}, emit = function(type) {
			var i, l, listener, listeners, args;
			if (!hasOwnProperty.call(this, "__ee__")) return;
			listeners = this.__ee__[type];
			if (!listeners) return;
			if (typeof listeners === "object") {
				l = arguments.length;
				args = new Array(l - 1);
				for (i = 1; i < l; ++i) args[i - 1] = arguments[i];
				listeners = listeners.slice();
				for (i = 0; listener = listeners[i]; ++i) apply.call(listener, this, args);
			} else switch (arguments.length) {
				case 1:
					call.call(listeners, this);
					break;
				case 2:
					call.call(listeners, this, arguments[1]);
					break;
				case 3:
					call.call(listeners, this, arguments[1], arguments[2]);
					break;
				default:
					l = arguments.length;
					args = new Array(l - 1);
					for (i = 1; i < l; ++i) args[i - 1] = arguments[i];
					apply.call(listeners, this, args);
			}
		}, methods = {
			on,
			once,
			off,
			emit
		}, descriptors = {
			on: d(on),
			once: d(once),
			off: d(off),
			emit: d(emit)
		}, base = defineProperties({}, descriptors);
		module.exports = exports = function(o) {
			return o == null ? create(base) : defineProperties(Object(o), descriptors);
		};
		exports.methods = methods;
	})))());
	/**
	* Generates a UUID.
	* Based on: http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
	* @returns {string} UUID string.
	*/
	function uuid$1() {
		var d = (/* @__PURE__ */ new Date()).getTime();
		return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
			var r = (d + Math.random() * 16) % 16 | 0;
			d = Math.floor(d / 16);
			return (c == "x" ? r : r & 7 | 8).toString(16);
		});
	}
	/**
	* Creates a new pending promise and provides methods to resolve or reject it.
	* @constructor
	*/
	function defer$1() {
		this.resolve = null;
		this.reject = null;
		this.id = uuid$1();
		this.promise = new Promise((resolve, reject) => {
			this.resolve = resolve;
			this.reject = reject;
		});
		Object.freeze(this);
	}
	//#endregion
	//#region src/core/collections.ts
	function defaultCompare(a, b) {
		if (a > b) return 1;
		if (a < b) return -1;
		if (a == b) return 0;
	}
	/**
	* Apply defaults to an object.
	* @param {object} obj Target object.
	* @returns {object} Target object with defaults applied.
	*/
	function defaults$1(obj) {
		var target = obj;
		for (var i = 1, length = arguments.length; i < length; i++) {
			var source = arguments[i];
			for (var prop in source) if (target[prop] === void 0) target[prop] = source[prop];
		}
		return obj;
	}
	/**
	* Extend properties of an object.
	* @param {object} target Target object.
	* @returns {object} Target object with copied descriptors.
	*/
	function extend$1(target, ..._sources) {
		Array.prototype.slice.call(arguments, 1).forEach(function(source) {
			if (!source) return;
			Object.getOwnPropertyNames(source).forEach(function(propName) {
				Object.defineProperty(target, propName, Object.getOwnPropertyDescriptor(source, propName));
			});
		});
		return target;
	}
	/**
	* Fast quicksort insert for sorted array.
	* @param {any} item Item to insert.
	* @param {array} array Sorted array.
	* @param {function} [compareFunction] Optional compare function.
	* @returns {number} Inserted index.
	*/
	function insert$1(item, array, compareFunction) {
		var location = locationOf$1(item, array, compareFunction);
		array.splice(location, 0, item);
		return location;
	}
	/**
	* Finds where something would fit into a sorted array.
	* @param {any} item Item to locate.
	* @param {array} array Sorted array.
	* @param {function} [compareFunction] Optional compare function.
	* @param {function} [_start] Start index.
	* @param {function} [_end] End index.
	* @returns {number} Location in array.
	*/
	function locationOf$1(item, array, compareFunction, _start, _end) {
		var start = _start || 0;
		var end = _end || array.length;
		var pivot = parseInt(String(start + (end - start) / 2));
		var compared;
		if (!compareFunction) compareFunction = defaultCompare;
		if (end - start <= 0) return pivot;
		compared = compareFunction(array[pivot], item);
		if (end - start === 1) return compared >= 0 ? pivot : pivot + 1;
		if (compared === 0) return pivot;
		if (compared === -1) return locationOf$1(item, array, compareFunction, pivot, end);
		else return locationOf$1(item, array, compareFunction, start, pivot);
	}
	/**
	* Finds index of something in a sorted array.
	* @param {any} item Item to locate.
	* @param {array} array Sorted array.
	* @param {function} [compareFunction] Optional compare function.
	* @param {function} [_start] Start index.
	* @param {function} [_end] End index.
	* @returns {number} Index in array or -1.
	*/
	function indexOfSorted$1(item, array, compareFunction, _start, _end) {
		var start = _start || 0;
		var end = _end || array.length;
		var pivot = parseInt(String(start + (end - start) / 2));
		var compared;
		if (!compareFunction) compareFunction = defaultCompare;
		if (end - start <= 0) return -1;
		compared = compareFunction(array[pivot], item);
		if (end - start === 1) return compared === 0 ? pivot : -1;
		if (compared === 0) return pivot;
		if (compared === -1) return indexOfSorted$1(item, array, compareFunction, pivot, end);
		else return indexOfSorted$1(item, array, compareFunction, start, pivot);
	}
	//#endregion
	//#region src/utils/path.ts
	var import_path = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports, module) => {
		if (!process) var process = { "cwd": function() {
			return "/";
		} };
		function assertPath(path) {
			if (typeof path !== "string") throw new TypeError("Path must be a string. Received " + path);
		}
		function normalizeStringPosix(path, allowAboveRoot) {
			var res = "";
			var lastSlash = -1;
			var dots = 0;
			var code;
			for (var i = 0; i <= path.length; ++i) {
				if (i < path.length) code = path.charCodeAt(i);
				else if (code === 47) break;
				else code = 47;
				if (code === 47) {
					if (lastSlash === i - 1 || dots === 1) {} else if (lastSlash !== i - 1 && dots === 2) {
						if (res.length < 2 || res.charCodeAt(res.length - 1) !== 46 || res.charCodeAt(res.length - 2) !== 46) {
							if (res.length > 2) {
								var start = res.length - 1;
								var j = start;
								for (; j >= 0; --j) if (res.charCodeAt(j) === 47) break;
								if (j !== start) {
									if (j === -1) res = "";
									else res = res.slice(0, j);
									lastSlash = i;
									dots = 0;
									continue;
								}
							} else if (res.length === 2 || res.length === 1) {
								res = "";
								lastSlash = i;
								dots = 0;
								continue;
							}
						}
						if (allowAboveRoot) if (res.length > 0) res += "/..";
						else res = "..";
					} else if (res.length > 0) res += "/" + path.slice(lastSlash + 1, i);
					else res = path.slice(lastSlash + 1, i);
					lastSlash = i;
					dots = 0;
				} else if (code === 46 && dots !== -1) ++dots;
				else dots = -1;
			}
			return res;
		}
		function _format(sep, pathObject) {
			var dir = pathObject.dir || pathObject.root;
			var base = pathObject.base || (pathObject.name || "") + (pathObject.ext || "");
			if (!dir) return base;
			if (dir === pathObject.root) return dir + base;
			return dir + sep + base;
		}
		var posix = {
			resolve: function resolve() {
				var resolvedPath = "";
				var resolvedAbsolute = false;
				var cwd;
				for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
					var path;
					if (i >= 0) path = arguments[i];
					else {
						if (cwd === void 0) cwd = process.cwd();
						path = cwd;
					}
					assertPath(path);
					if (path.length === 0) continue;
					resolvedPath = path + "/" + resolvedPath;
					resolvedAbsolute = path.charCodeAt(0) === 47;
				}
				resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);
				if (resolvedAbsolute) if (resolvedPath.length > 0) return "/" + resolvedPath;
				else return "/";
				else if (resolvedPath.length > 0) return resolvedPath;
				else return ".";
			},
			normalize: function normalize(path) {
				assertPath(path);
				if (path.length === 0) return ".";
				var isAbsolute = path.charCodeAt(0) === 47;
				var trailingSeparator = path.charCodeAt(path.length - 1) === 47;
				path = normalizeStringPosix(path, !isAbsolute);
				if (path.length === 0 && !isAbsolute) path = ".";
				if (path.length > 0 && trailingSeparator) path += "/";
				if (isAbsolute) return "/" + path;
				return path;
			},
			isAbsolute: function isAbsolute(path) {
				assertPath(path);
				return path.length > 0 && path.charCodeAt(0) === 47;
			},
			join: function join() {
				if (arguments.length === 0) return ".";
				var joined;
				for (var i = 0; i < arguments.length; ++i) {
					var arg = arguments[i];
					assertPath(arg);
					if (arg.length > 0) if (joined === void 0) joined = arg;
					else joined += "/" + arg;
				}
				if (joined === void 0) return ".";
				return posix.normalize(joined);
			},
			relative: function relative(from, to) {
				assertPath(from);
				assertPath(to);
				if (from === to) return "";
				from = posix.resolve(from);
				to = posix.resolve(to);
				if (from === to) return "";
				var fromStart = 1;
				for (; fromStart < from.length; ++fromStart) if (from.charCodeAt(fromStart) !== 47) break;
				var fromEnd = from.length;
				var fromLen = fromEnd - fromStart;
				var toStart = 1;
				for (; toStart < to.length; ++toStart) if (to.charCodeAt(toStart) !== 47) break;
				var toLen = to.length - toStart;
				var length = fromLen < toLen ? fromLen : toLen;
				var lastCommonSep = -1;
				var i = 0;
				for (; i <= length; ++i) {
					if (i === length) {
						if (toLen > length) {
							if (to.charCodeAt(toStart + i) === 47) return to.slice(toStart + i + 1);
							else if (i === 0) return to.slice(toStart + i);
						} else if (fromLen > length) {
							if (from.charCodeAt(fromStart + i) === 47) lastCommonSep = i;
							else if (i === 0) lastCommonSep = 0;
						}
						break;
					}
					var fromCode = from.charCodeAt(fromStart + i);
					if (fromCode !== to.charCodeAt(toStart + i)) break;
					else if (fromCode === 47) lastCommonSep = i;
				}
				var out = "";
				for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) if (i === fromEnd || from.charCodeAt(i) === 47) if (out.length === 0) out += "..";
				else out += "/..";
				if (out.length > 0) return out + to.slice(toStart + lastCommonSep);
				else {
					toStart += lastCommonSep;
					if (to.charCodeAt(toStart) === 47) ++toStart;
					return to.slice(toStart);
				}
			},
			_makeLong: function _makeLong(path) {
				return path;
			},
			dirname: function dirname(path) {
				assertPath(path);
				if (path.length === 0) return ".";
				var code = path.charCodeAt(0);
				var hasRoot = code === 47;
				var end = -1;
				var matchedSlash = true;
				for (var i = path.length - 1; i >= 1; --i) {
					code = path.charCodeAt(i);
					if (code === 47) {
						if (!matchedSlash) {
							end = i;
							break;
						}
					} else matchedSlash = false;
				}
				if (end === -1) return hasRoot ? "/" : ".";
				if (hasRoot && end === 1) return "//";
				return path.slice(0, end);
			},
			basename: function basename(path, ext) {
				if (ext !== void 0 && typeof ext !== "string") throw new TypeError("\"ext\" argument must be a string");
				assertPath(path);
				var start = 0;
				var end = -1;
				var matchedSlash = true;
				var i;
				if (ext !== void 0 && ext.length > 0 && ext.length <= path.length) {
					if (ext.length === path.length && ext === path) return "";
					var extIdx = ext.length - 1;
					var firstNonSlashEnd = -1;
					for (i = path.length - 1; i >= 0; --i) {
						var code = path.charCodeAt(i);
						if (code === 47) {
							if (!matchedSlash) {
								start = i + 1;
								break;
							}
						} else {
							if (firstNonSlashEnd === -1) {
								matchedSlash = false;
								firstNonSlashEnd = i + 1;
							}
							if (extIdx >= 0) if (code === ext.charCodeAt(extIdx)) {
								if (--extIdx === -1) end = i;
							} else {
								extIdx = -1;
								end = firstNonSlashEnd;
							}
						}
					}
					if (start === end) end = firstNonSlashEnd;
					else if (end === -1) end = path.length;
					return path.slice(start, end);
				} else {
					for (i = path.length - 1; i >= 0; --i) if (path.charCodeAt(i) === 47) {
						if (!matchedSlash) {
							start = i + 1;
							break;
						}
					} else if (end === -1) {
						matchedSlash = false;
						end = i + 1;
					}
					if (end === -1) return "";
					return path.slice(start, end);
				}
			},
			extname: function extname(path) {
				assertPath(path);
				var startDot = -1;
				var startPart = 0;
				var end = -1;
				var matchedSlash = true;
				var preDotState = 0;
				for (var i = path.length - 1; i >= 0; --i) {
					var code = path.charCodeAt(i);
					if (code === 47) {
						if (!matchedSlash) {
							startPart = i + 1;
							break;
						}
						continue;
					}
					if (end === -1) {
						matchedSlash = false;
						end = i + 1;
					}
					if (code === 46) {
						if (startDot === -1) startDot = i;
						else if (preDotState !== 1) preDotState = 1;
					} else if (startDot !== -1) preDotState = -1;
				}
				if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) return "";
				return path.slice(startDot, end);
			},
			format: function format(pathObject) {
				if (pathObject === null || typeof pathObject !== "object") throw new TypeError("Parameter \"pathObject\" must be an object, not " + typeof pathObject);
				return _format("/", pathObject);
			},
			parse: function parse(path) {
				assertPath(path);
				var ret = {
					root: "",
					dir: "",
					base: "",
					ext: "",
					name: ""
				};
				if (path.length === 0) return ret;
				var code = path.charCodeAt(0);
				var isAbsolute = code === 47;
				var start;
				if (isAbsolute) {
					ret.root = "/";
					start = 1;
				} else start = 0;
				var startDot = -1;
				var startPart = 0;
				var end = -1;
				var matchedSlash = true;
				var i = path.length - 1;
				var preDotState = 0;
				for (; i >= start; --i) {
					code = path.charCodeAt(i);
					if (code === 47) {
						if (!matchedSlash) {
							startPart = i + 1;
							break;
						}
						continue;
					}
					if (end === -1) {
						matchedSlash = false;
						end = i + 1;
					}
					if (code === 46) {
						if (startDot === -1) startDot = i;
						else if (preDotState !== 1) preDotState = 1;
					} else if (startDot !== -1) preDotState = -1;
				}
				if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
					if (end !== -1) if (startPart === 0 && isAbsolute) ret.base = ret.name = path.slice(1, end);
					else ret.base = ret.name = path.slice(startPart, end);
				} else {
					if (startPart === 0 && isAbsolute) {
						ret.name = path.slice(1, startDot);
						ret.base = path.slice(1, end);
					} else {
						ret.name = path.slice(startPart, startDot);
						ret.base = path.slice(startPart, end);
					}
					ret.ext = path.slice(startDot, end);
				}
				if (startPart > 0) ret.dir = path.slice(0, startPart - 1);
				else if (isAbsolute) ret.dir = "/";
				return ret;
			},
			sep: "/",
			delimiter: ":",
			posix: null
		};
		module.exports = posix;
	})))());
	/**
	* Creates a Path object for parsing and manipulation of a path strings
	*
	* Uses a polyfill for Nodejs path: https://nodejs.org/api/path.html
	* @param	{string} pathString	a url string (relative or absolute)
	* @class
	*/
	var Path = class {
		path;
		directory;
		filename;
		extension;
		splitPathRe;
		constructor(pathString) {
			var protocol;
			var parsed;
			protocol = pathString.indexOf("://");
			if (protocol > -1) pathString = new URL(pathString).pathname;
			parsed = this.parse(pathString);
			this.path = pathString;
			if (this.isDirectory(pathString)) this.directory = pathString;
			else this.directory = parsed.dir + "/";
			this.filename = parsed.base;
			this.extension = parsed.ext.slice(1);
		}
		/**
		* Parse the path: https://nodejs.org/api/path.html#path_path_parse_path
		* @param	{string} what
		* @returns {object}
		*/
		parse(what) {
			return import_path.default.parse(what);
		}
		/**
		* @param	{string} what
		* @returns {boolean}
		*/
		isAbsolute(what) {
			return import_path.default.isAbsolute(what || this.path);
		}
		/**
		* Check if path ends with a directory
		* @param	{string} what
		* @returns {boolean}
		*/
		isDirectory(what) {
			return what.charAt(what.length - 1) === "/";
		}
		/**
		* Resolve a path against the directory of the Path
		*
		* https://nodejs.org/api/path.html#path_path_resolve_paths
		* @param	{string} what
		* @returns {string} resolved
		*/
		resolve(what) {
			return import_path.default.resolve(this.directory, what);
		}
		/**
		* Resolve a path relative to the directory of the Path
		*
		* https://nodejs.org/api/path.html#path_path_relative_from_to
		* @param	{string} what
		* @returns {string} relative
		*/
		relative(what) {
			if (what && what.indexOf("://") > -1) return what;
			return import_path.default.relative(this.directory, what);
		}
		splitPath(filename) {
			return this.splitPathRe.exec(filename).slice(1);
		}
		/**
		* Return the path string
		* @returns {string} path
		*/
		toString() {
			return this.path;
		}
	};
	//#endregion
	//#region src/utils/url.ts
	/**
	* creates a Url object for parsing and manipulation of a url string
	* @param	{string} urlString	a url string (relative or absolute)
	* @param	{string} [baseString] optional base for the url,
	* default to window.location.href
	*/
	var Url = class {
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
		constructor(urlString, baseString) {
			var absolute = urlString.indexOf("://") > -1;
			var pathname = urlString;
			var basePath;
			this.Url = void 0;
			this.href = urlString;
			this.protocol = "";
			this.origin = "";
			this.hash = "";
			this.hash = "";
			this.search = "";
			this.base = baseString;
			if (!absolute && baseString !== false && typeof baseString !== "string" && window && window.location) this.base = window.location.href;
			if (absolute || this.base) try {
				if (this.base) this.Url = new URL(urlString, this.base);
				else this.Url = new URL(urlString);
				this.href = this.Url.href;
				this.protocol = this.Url.protocol;
				this.origin = this.Url.origin;
				this.hash = this.Url.hash;
				this.search = this.Url.search;
				pathname = this.Url.pathname + (this.Url.search ? this.Url.search : "");
			} catch (e) {
				this.Url = void 0;
				if (this.base) {
					basePath = new Path(this.base);
					pathname = basePath.resolve(pathname);
				}
			}
			this.Path = new Path(pathname);
			this.directory = this.Path.directory;
			this.filename = this.Path.filename;
			this.extension = this.Path.extension;
		}
		/**
		* @returns {Path}
		*/
		path() {
			return this.Path;
		}
		/**
		* Resolves a relative path to a absolute url
		* @param {string} what
		* @returns {string} url
		*/
		resolve(what) {
			var isAbsolute = what.indexOf("://") > -1;
			var fullpath;
			if (isAbsolute) return what;
			fullpath = import_path.default.resolve(this.directory, what);
			return this.origin + fullpath;
		}
		/**
		* Resolve a path relative to the url
		* @param {string} what
		* @returns {string} path
		*/
		relative(what) {
			return import_path.default.relative(what, this.directory);
		}
		/**
		* @returns {string}
		*/
		toString() {
			return this.href;
		}
	};
	//#endregion
	//#region src/platform/traversal.ts
	var ELEMENT_NODE$2 = 1;
	var TEXT_NODE$2 = 3;
	/**
	* Sprint through all text nodes in a document.
	* @param {Element | Document} root Root element or document.
	* @param {Function} func Function to run on each text node.
	* @returns {void}
	*/
	function sprint$1(root, func) {
		if (typeof (root.ownerDocument || root).createTreeWalker !== "undefined") treeWalker$1(root, func, NodeFilter.SHOW_TEXT);
		else walk$1(root, function(node) {
			if (node && node.nodeType === 3) func(node);
		}, true);
	}
	/**
	* Walk a DOM tree with the browser TreeWalker API.
	* @param {Element | Document} root Root element or document.
	* @param {Function} func Function to run on each matching node.
	* @param {Function | object} filter TreeWalker filter.
	* @returns {void}
	*/
	function treeWalker$1(root, func, filter) {
		var walker = document.createTreeWalker(root, filter, null);
		var node;
		while (node = walker.nextNode()) func(node);
	}
	function createVisibleTextWalker(doc, win, root) {
		if (!doc || !win || !root || typeof doc.createTreeWalker !== "function") return null;
		return doc.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode(node) {
			if (String(node.nodeValue || "").replace(/\s+/g, "").length < 2) return NodeFilter.FILTER_REJECT;
			let parent = node.parentElement;
			if (!parent) return NodeFilter.FILTER_REJECT;
			let style = win.getComputedStyle(parent);
			if (style.display === "none" || style.visibility === "hidden") return NodeFilter.FILTER_REJECT;
			return NodeFilter.FILTER_ACCEPT;
		} });
	}
	function collectVisibleTextClientRects(doc, win, root, options = {}) {
		const walker = createVisibleTextWalker(doc, win, root);
		if (!walker) return null;
		const limit = Math.max(0, Number(options.limit) || 1e3);
		const countInvalidRects = Boolean(options.countInvalidRects);
		const rects = [];
		let inspected = 0;
		let node;
		while ((node = walker.nextNode()) && inspected < limit) {
			let range = doc.createRange();
			range.selectNodeContents(node);
			for (const rect of Array.from(range.getClientRects())) {
				const isValidRect = rect.width > 0 && rect.height > 0;
				if (countInvalidRects || isValidRect) inspected += 1;
				if (isValidRect) rects.push({
					left: rect.left,
					right: rect.right,
					top: rect.top,
					bottom: rect.bottom,
					width: rect.width,
					height: rect.height
				});
				if (inspected >= limit) break;
			}
			if (range.detach) range.detach();
		}
		return rects;
	}
	/**
	* Recursively walk a DOM node tree.
	* @param {Node} node Root node.
	* @param {Function} callback Return true to stop walking.
	* @returns {boolean | undefined} True when walking was stopped.
	*/
	function walk$1(node, callback, _ignore) {
		var walked;
		if (callback(node)) return true;
		node = node.firstChild;
		if (node) do {
			walked = walk$1(node, callback);
			if (walked) return true;
			node = node.nextSibling;
		} while (node);
	}
	/**
	* Find direct descendants of an element.
	* @param {Element} el Parent element.
	* @returns {Element[]} Element children.
	*/
	function findChildren$1(el) {
		var result = [];
		var childNodes = el.childNodes;
		for (var i = 0; i < childNodes.length; i++) {
			let node = childNodes[i];
			if (node.nodeType === 1) result.push(node);
		}
		return result;
	}
	/**
	* Find all parents and ancestors of an element.
	* @param {Element} node Node to inspect.
	* @returns {Element[]} Parent chain.
	*/
	function parents$1(node) {
		var nodes = [node];
		for (; node; node = node.parentNode) nodes.unshift(node);
		return nodes;
	}
	/**
	* Find all direct descendants of a specific type.
	* @param {Element} el Parent element.
	* @param {string} nodeName Element name.
	* @param {boolean} [single] Return first match only.
	* @returns {Element | Element[] | undefined} Matching child or children.
	*/
	function filterChildren$1(el, nodeName, single) {
		var result = [];
		var childNodes = el.childNodes;
		for (var i = 0; i < childNodes.length; i++) {
			let node = childNodes[i];
			if (node.nodeType === 1 && node.nodeName.toLowerCase() === nodeName) if (single) return node;
			else result.push(node);
		}
		if (!single) return result;
	}
	/**
	* Find the first parent with a matching tag name.
	* @param {Element} node Node to inspect.
	* @param {string} tagname Tag name.
	* @returns {Element | undefined} Matching parent.
	*/
	function getParentByTagName$1(node, tagname) {
		var parent;
		if (node === null || tagname === "") return;
		parent = node.parentNode;
		while (parent.nodeType === 1) {
			if (parent.tagName.toLowerCase() === tagname) return parent;
			parent = parent.parentNode;
		}
	}
	/**
	* Gets the index of a node in its parent among matching node types.
	* @param {Node} node Node to inspect.
	* @param {number} typeId Node type to count.
	* @returns {number} Index in parent or -1.
	*/
	function indexOfNode$1(node, typeId) {
		var children = node.parentNode.childNodes;
		var sib;
		var index = -1;
		for (var i = 0; i < children.length; i++) {
			sib = children[i];
			if (sib.nodeType === typeId) index++;
			if (sib == node) break;
		}
		return index;
	}
	/**
	* Gets the index of a text node in its parent.
	* @param {Node} textNode Text node to inspect.
	* @returns {number} Index in parent.
	*/
	function indexOfTextNode$1(textNode) {
		return indexOfNode$1(textNode, TEXT_NODE$2);
	}
	/**
	* Gets the index of an element node in its parent.
	* @param {Element} elementNode Element node to inspect.
	* @returns {number} Index in parent.
	*/
	function indexOfElementNode$1(elementNode) {
		return indexOfNode$1(elementNode, ELEMENT_NODE$2);
	}
	//#endregion
	//#region src/compat/range.ts
	/**
	* Lightweight Polyfill for DOM Range.
	*/
	var RangeObject$1 = class {
		collapsed;
		commonAncestorContainer;
		endContainer;
		endOffset;
		startContainer;
		startOffset;
		constructor() {
			this.collapsed = false;
			this.commonAncestorContainer = void 0;
			this.endContainer = void 0;
			this.endOffset = void 0;
			this.startContainer = void 0;
			this.startOffset = void 0;
		}
		setStart(startNode, startOffset) {
			this.startContainer = startNode;
			this.startOffset = startOffset;
			if (!this.endContainer) this.collapse(true);
			else this.commonAncestorContainer = this._commonAncestorContainer();
			this._checkCollapsed();
		}
		setEnd(endNode, endOffset) {
			this.endContainer = endNode;
			this.endOffset = endOffset;
			if (!this.startContainer) this.collapse(false);
			else {
				this.collapsed = false;
				this.commonAncestorContainer = this._commonAncestorContainer();
			}
			this._checkCollapsed();
		}
		collapse(toStart) {
			this.collapsed = true;
			if (toStart) {
				this.endContainer = this.startContainer;
				this.endOffset = this.startOffset;
				this.commonAncestorContainer = this.startContainer.parentNode;
			} else {
				this.startContainer = this.endContainer;
				this.startOffset = this.endOffset;
				this.commonAncestorContainer = this.endOffset.parentNode;
			}
		}
		selectNode(referenceNode) {
			let parent = referenceNode.parentNode;
			let index = Array.prototype.indexOf.call(parent.childNodes, referenceNode);
			this.setStart(parent, index);
			this.setEnd(parent, index + 1);
		}
		selectNodeContents(referenceNode) {
			let endIndex = referenceNode.nodeType === 3 ? referenceNode.textContent.length : referenceNode.childNodes.length;
			this.setStart(referenceNode, 0);
			this.setEnd(referenceNode, endIndex);
		}
		_commonAncestorContainer(startContainer, endContainer) {
			var startParents = parents$1(startContainer || this.startContainer);
			var endParents = parents$1(endContainer || this.endContainer);
			if (startParents[0] != endParents[0]) return void 0;
			for (var i = 0; i < startParents.length; i++) if (startParents[i] != endParents[i]) return startParents[i - 1];
		}
		_checkCollapsed() {
			if (this.startContainer === this.endContainer && this.startOffset === this.endOffset) this.collapsed = true;
			else this.collapsed = false;
		}
		toString() {}
	};
	//#endregion
	//#region src/core/types.ts
	/**
	* Checks if a node is an element
	* @param {unknown} obj Candidate object.
	* @returns {boolean} True when the object is an element node.
	*/
	function isElement$1(obj) {
		return !!(obj && typeof obj === "object" && "nodeType" in obj && obj.nodeType === 1);
	}
	/**
	* Checks if a value can be parsed as a finite number.
	* @param {unknown} n Candidate value.
	* @returns {boolean} True when the value is numeric.
	*/
	function isNumber$1(n) {
		return !isNaN(parseFloat(String(n))) && isFinite(Number(n));
	}
	/**
	* Checks if a value is a float.
	* @param {unknown} n Candidate value.
	* @returns {boolean} True when the value is numeric and has a decimal value.
	*/
	function isFloat$1(n) {
		var f = parseFloat(String(n));
		if (isNumber$1(n) === false) return false;
		if (typeof n === "string" && n.indexOf(".") > -1) return true;
		return Math.floor(f) !== f;
	}
	/**
	* Returns the JavaScript object type
	* @param {unknown} obj Candidate object.
	* @returns {string} Object type name.
	*/
	function type$1(obj) {
		return Object.prototype.toString.call(obj).slice(8, -1);
	}
	//#endregion
	//#region src/epubcfi.ts
	var ELEMENT_NODE$1 = 1;
	var TEXT_NODE$1 = 3;
	var COMMENT_NODE = 8;
	var DOCUMENT_NODE = 9;
	/**
	* Parsing and creation of EpubCFIs: http://www.idpf.org/epub/linking/cfi/epub-cfi.html

	* Implements:
	* - Character Offset: epubcfi(/6/4[chap01ref]!/4[body01]/10[para05]/2/1:3)
	* - Simple Ranges : epubcfi(/6/4[chap01ref]!/4[body01]/10[para05],/2/1:1,/3:4)

	* Does Not Implement:
	* - Temporal Offset (~)
	* - Spatial Offset (@)
	* - Temporal-Spatial Offset (~ + @)
	* - Text Location Assertion ([)
	* @class
	@param {string | Range | Node } [cfiFrom]
	@param {string | object} [base]
	@param {string} [ignoreClass] class to ignore when parsing DOM
	*/
	var EpubCFI = class EpubCFI {
		str;
		base;
		spinePos;
		range;
		path;
		start;
		end;
		constructor(cfiFrom, base, ignoreClass) {
			var type;
			this.str = "";
			this.base = {};
			this.spinePos = 0;
			this.range = false;
			this.path = {};
			this.start = null;
			this.end = null;
			if (!(this instanceof EpubCFI)) return new EpubCFI(cfiFrom, base, ignoreClass);
			if (typeof base === "string") this.base = this.parseComponent(base);
			else if (typeof base === "object" && base.steps) this.base = base;
			type = this.checkType(cfiFrom);
			if (type === "string") {
				this.str = cfiFrom;
				return extend$1(this, this.parse(cfiFrom));
			} else if (type === "range") return extend$1(this, this.fromRange(cfiFrom, this.base, ignoreClass));
			else if (type === "node") return extend$1(this, this.fromNode(cfiFrom, this.base, ignoreClass));
			else if (type === "EpubCFI" && cfiFrom.path) return cfiFrom;
			else if (!cfiFrom) return this;
			else throw new TypeError("not a valid argument for EpubCFI");
		}
		/**
		* Check the type of constructor input
		* @private
		*/
		checkType(cfi) {
			if (this.isCfiString(cfi)) return "string";
			else if (cfi && typeof cfi === "object" && (type$1(cfi) === "Range" || typeof cfi.startContainer != "undefined")) return "range";
			else if (cfi && typeof cfi === "object" && typeof cfi.nodeType != "undefined") return "node";
			else if (cfi && typeof cfi === "object" && cfi instanceof EpubCFI) return "EpubCFI";
			else return false;
		}
		/**
		* Parse a cfi string to a CFI object representation
		* @param {string} cfiStr
		* @returns {object} cfi
		*/
		parse(cfiStr) {
			var cfi = {
				spinePos: -1,
				range: false,
				base: {},
				path: {},
				start: null,
				end: null
			};
			var baseComponent, pathComponent, range;
			if (typeof cfiStr !== "string") return { spinePos: -1 };
			if (cfiStr.indexOf("epubcfi(") === 0 && cfiStr[cfiStr.length - 1] === ")") cfiStr = cfiStr.slice(8, cfiStr.length - 1);
			baseComponent = this.getChapterComponent(cfiStr);
			if (!baseComponent) return { spinePos: -1 };
			cfi.base = this.parseComponent(baseComponent);
			pathComponent = this.getPathComponent(cfiStr);
			cfi.path = this.parseComponent(pathComponent);
			range = this.getRange(cfiStr);
			if (range) {
				cfi.range = true;
				cfi.start = this.parseComponent(range[0]);
				cfi.end = this.parseComponent(range[1]);
			}
			cfi.spinePos = cfi.base.steps[1].index;
			return cfi;
		}
		parseComponent(componentStr) {
			var component = {
				steps: [],
				terminal: {
					offset: null,
					assertion: null
				}
			};
			var parts = componentStr.split(":");
			var steps = parts[0].split("/");
			var terminal;
			if (parts.length > 1) {
				terminal = parts[1];
				component.terminal = this.parseTerminal(terminal);
			}
			if (steps[0] === "") steps.shift();
			component.steps = steps.map(function(step) {
				return this.parseStep(step);
			}.bind(this)).filter(Boolean);
			return component;
		}
		parseStep(stepStr) {
			var stepType, num, index, has_brackets = stepStr.match(/\[(.*)\]/), id;
			if (has_brackets && has_brackets[1]) id = has_brackets[1];
			num = parseInt(stepStr);
			if (isNaN(num)) return;
			if (num % 2 === 0) {
				stepType = "element";
				index = num / 2 - 1;
			} else {
				stepType = "text";
				index = (num - 1) / 2;
			}
			return {
				"type": stepType,
				"index": index,
				"id": id || null
			};
		}
		parseTerminal(termialStr) {
			var characterOffset, textLocationAssertion;
			var assertion = termialStr.match(/\[(.*)\]/);
			if (assertion && assertion[1]) {
				characterOffset = parseInt(termialStr.split("[")[0]);
				textLocationAssertion = assertion[1];
			} else characterOffset = parseInt(termialStr);
			if (!isNumber$1(characterOffset)) characterOffset = null;
			return {
				"offset": characterOffset,
				"assertion": textLocationAssertion
			};
		}
		getChapterComponent(cfiStr) {
			return cfiStr.split("!")[0];
		}
		getPathComponent(cfiStr) {
			var indirection = cfiStr.split("!");
			if (indirection[1]) return indirection[1].split(",")[0];
		}
		getRange(cfiStr) {
			var ranges = cfiStr.split(",");
			if (ranges.length === 3) return [ranges[1], ranges[2]];
			return false;
		}
		getCharecterOffsetComponent(cfiStr) {
			return cfiStr.split(":")[1] || "";
		}
		joinSteps(steps) {
			if (!steps) return "";
			return steps.map(function(part) {
				var segment = "";
				if (part.type === "element") segment += (part.index + 1) * 2;
				if (part.type === "text") segment += 1 + 2 * part.index;
				if (part.id) segment += "[" + part.id + "]";
				return segment;
			}).join("/");
		}
		segmentString(segment) {
			var segmentString = "/";
			segmentString += this.joinSteps(segment.steps);
			if (segment.terminal && segment.terminal.offset != null) segmentString += ":" + segment.terminal.offset;
			if (segment.terminal && segment.terminal.assertion != null) segmentString += "[" + segment.terminal.assertion + "]";
			return segmentString;
		}
		/**
		* Convert CFI to a epubcfi(...) string
		* @returns {string} epubcfi
		*/
		toString() {
			var cfiString = "epubcfi(";
			cfiString += this.segmentString(this.base);
			cfiString += "!";
			cfiString += this.segmentString(this.path);
			if (this.range && this.start) {
				cfiString += ",";
				cfiString += this.segmentString(this.start);
			}
			if (this.range && this.end) {
				cfiString += ",";
				cfiString += this.segmentString(this.end);
			}
			cfiString += ")";
			return cfiString;
		}
		/**
		* Compare which of two CFIs is earlier in the text
		* @returns {number} First is earlier = -1, Second is earlier = 1, They are equal = 0
		*/
		compare(cfiOne, cfiTwo) {
			var stepsA, stepsB;
			var terminalA, terminalB;
			if (typeof cfiOne === "string") cfiOne = new EpubCFI(cfiOne);
			if (typeof cfiTwo === "string") cfiTwo = new EpubCFI(cfiTwo);
			if (cfiOne.spinePos > cfiTwo.spinePos) return 1;
			if (cfiOne.spinePos < cfiTwo.spinePos) return -1;
			if (cfiOne.range) {
				stepsA = cfiOne.path.steps.concat(cfiOne.start.steps);
				terminalA = cfiOne.start.terminal;
			} else {
				stepsA = cfiOne.path.steps;
				terminalA = cfiOne.path.terminal;
			}
			if (cfiTwo.range) {
				stepsB = cfiTwo.path.steps.concat(cfiTwo.start.steps);
				terminalB = cfiTwo.start.terminal;
			} else {
				stepsB = cfiTwo.path.steps;
				terminalB = cfiTwo.path.terminal;
			}
			for (var i = 0; i < stepsA.length; i++) {
				if (!stepsA[i]) return -1;
				if (!stepsB[i]) return 1;
				if (stepsA[i].index > stepsB[i].index) return 1;
				if (stepsA[i].index < stepsB[i].index) return -1;
			}
			if (stepsA.length < stepsB.length) return -1;
			if (terminalA.offset > terminalB.offset) return 1;
			if (terminalA.offset < terminalB.offset) return -1;
			return 0;
		}
		step(node) {
			var nodeType = node.nodeType === TEXT_NODE$1 ? "text" : "element";
			var element = node;
			return {
				"id": element.id,
				"tagName": element.tagName,
				"type": nodeType,
				"index": this.position(node)
			};
		}
		filteredStep(node, ignoreClass) {
			var filteredNode = this.filter(node, ignoreClass);
			var nodeType;
			if (!filteredNode) return;
			nodeType = filteredNode.nodeType === TEXT_NODE$1 ? "text" : "element";
			return {
				"id": filteredNode.id,
				"tagName": filteredNode.tagName,
				"type": nodeType,
				"index": this.filteredPosition(filteredNode, ignoreClass)
			};
		}
		pathTo(node, offset, ignoreClass) {
			var segment = {
				steps: [],
				terminal: {
					offset: null,
					assertion: null
				}
			};
			var currentNode = node;
			var step;
			while (currentNode && currentNode.parentNode && currentNode.parentNode.nodeType != DOCUMENT_NODE) {
				if (ignoreClass) step = this.filteredStep(currentNode, ignoreClass);
				else step = this.step(currentNode);
				if (step) segment.steps.unshift(step);
				currentNode = currentNode.parentNode;
			}
			if (offset != null && offset >= 0) {
				segment.terminal.offset = offset;
				if (segment.steps[segment.steps.length - 1].type != "text") segment.steps.push({
					"type": "text",
					"index": 0
				});
			}
			return segment;
		}
		equalStep(stepA, stepB) {
			if (!stepA || !stepB) return false;
			if (stepA.index === stepB.index && stepA.id === stepB.id && stepA.type === stepB.type) return true;
			return false;
		}
		/**
		* Create a CFI object from a Range
		* @param {Range} range
		* @param {string | object} base
		* @param {string} [ignoreClass]
		* @returns {object} cfi
		*/
		fromRange(range, base, ignoreClass) {
			var cfi = {
				range: false,
				base: {},
				path: {},
				start: null,
				end: null
			};
			var start = range.startContainer;
			var end = range.endContainer;
			var startOffset = range.startOffset;
			var endOffset = range.endOffset;
			var needsIgnoring = false;
			if (ignoreClass) needsIgnoring = start.ownerDocument.querySelector("." + ignoreClass) != null;
			if (typeof base === "string") {
				cfi.base = this.parseComponent(base);
				cfi.spinePos = cfi.base.steps[1].index;
			} else if (typeof base === "object") cfi.base = base;
			if (range.collapsed) {
				if (needsIgnoring) startOffset = this.patchOffset(start, startOffset, ignoreClass);
				cfi.path = this.pathTo(start, startOffset, ignoreClass);
			} else {
				cfi.range = true;
				if (needsIgnoring) startOffset = this.patchOffset(start, startOffset, ignoreClass);
				cfi.start = this.pathTo(start, startOffset, ignoreClass);
				if (needsIgnoring) endOffset = this.patchOffset(end, endOffset, ignoreClass);
				cfi.end = this.pathTo(end, endOffset, ignoreClass);
				cfi.path = {
					steps: [],
					terminal: null
				};
				var len = cfi.start.steps.length;
				var i;
				for (i = 0; i < len; i++) if (this.equalStep(cfi.start.steps[i], cfi.end.steps[i])) if (i === len - 1) {
					if (cfi.start.terminal === cfi.end.terminal) {
						cfi.path.steps.push(cfi.start.steps[i]);
						cfi.range = false;
					}
				} else cfi.path.steps.push(cfi.start.steps[i]);
				else break;
				cfi.start.steps = cfi.start.steps.slice(cfi.path.steps.length);
				cfi.end.steps = cfi.end.steps.slice(cfi.path.steps.length);
			}
			return cfi;
		}
		/**
		* Create a CFI object from a Node
		* @param {Node} anchor
		* @param {string | object} base
		* @param {string} [ignoreClass]
		* @returns {object} cfi
		*/
		fromNode(anchor, base, ignoreClass) {
			var cfi = {
				range: false,
				base: {},
				path: {},
				start: null,
				end: null
			};
			if (typeof base === "string") {
				cfi.base = this.parseComponent(base);
				cfi.spinePos = cfi.base.steps[1].index;
			} else if (typeof base === "object") cfi.base = base;
			cfi.path = this.pathTo(anchor, null, ignoreClass);
			return cfi;
		}
		filter(anchor, ignoreClass) {
			var needsIgnoring;
			var sibling;
			var parent, previousSibling, nextSibling;
			var isText = false;
			if (anchor.nodeType === TEXT_NODE$1) {
				isText = true;
				parent = anchor.parentNode;
				needsIgnoring = anchor.parentNode.classList.contains(ignoreClass || "");
			} else {
				isText = false;
				needsIgnoring = anchor.classList.contains(ignoreClass || "");
			}
			if (needsIgnoring && isText) {
				previousSibling = parent.previousSibling;
				nextSibling = parent.nextSibling;
				if (previousSibling && previousSibling.nodeType === TEXT_NODE$1) sibling = previousSibling;
				else if (nextSibling && nextSibling.nodeType === TEXT_NODE$1) sibling = nextSibling;
				if (sibling) return sibling;
				else return anchor;
			} else if (needsIgnoring && !isText) return false;
			else return anchor;
		}
		patchOffset(anchor, offset, ignoreClass) {
			if (anchor.nodeType != TEXT_NODE$1) throw new Error("Anchor must be a text node");
			var curr = anchor;
			var totalOffset = offset;
			if (anchor.parentNode.classList.contains(ignoreClass || "")) curr = anchor.parentNode;
			while (curr.previousSibling) {
				if (curr.previousSibling.nodeType === ELEMENT_NODE$1) if (curr.previousSibling.classList.contains(ignoreClass || "")) totalOffset += curr.previousSibling.textContent.length;
				else break;
				else totalOffset += curr.previousSibling.textContent.length;
				curr = curr.previousSibling;
			}
			return totalOffset;
		}
		normalizedMap(children, nodeType, ignoreClass) {
			var output = {};
			var prevIndex = -1;
			var i, len = children.length;
			var currNodeType;
			var prevNodeType;
			for (i = 0; i < len; i++) {
				currNodeType = children[i].nodeType;
				if (currNodeType === ELEMENT_NODE$1 && children[i].classList.contains(ignoreClass || "")) currNodeType = TEXT_NODE$1;
				if (i > 0 && currNodeType === TEXT_NODE$1 && prevNodeType === TEXT_NODE$1) output[i] = prevIndex;
				else if (nodeType === currNodeType) {
					prevIndex = prevIndex + 1;
					output[i] = prevIndex;
				}
				prevNodeType = currNodeType;
			}
			return output;
		}
		position(anchor) {
			var children, index;
			if (anchor.nodeType === ELEMENT_NODE$1) {
				children = anchor.parentNode.children;
				if (!children) children = findChildren$1(anchor.parentNode);
				index = Array.prototype.indexOf.call(children, anchor);
			} else {
				children = this.textNodes(anchor.parentNode);
				index = children.indexOf(anchor);
			}
			return index;
		}
		filteredPosition(anchor, ignoreClass) {
			var children, index, map;
			if (anchor.nodeType === ELEMENT_NODE$1) {
				children = anchor.parentNode.children;
				map = this.normalizedMap(children, ELEMENT_NODE$1, ignoreClass);
			} else {
				children = anchor.parentNode.childNodes;
				if (anchor.parentNode.classList.contains(ignoreClass || "")) {
					anchor = anchor.parentNode;
					children = anchor.parentNode.childNodes;
				}
				map = this.normalizedMap(children, TEXT_NODE$1, ignoreClass);
			}
			index = Array.prototype.indexOf.call(children, anchor);
			return map[index];
		}
		stepsToXpath(steps) {
			var xpath = [".", "*"];
			steps.forEach(function(step) {
				var position = step.index + 1;
				if (step.id) xpath.push("*[position()=" + position + " and @id='" + step.id + "']");
				else if (step.type === "text") xpath.push("text()[" + position + "]");
				else xpath.push("*[" + position + "]");
			});
			return xpath.join("/");
		}
		stepsToQuerySelector(steps) {
			var query = ["html"];
			steps.forEach(function(step) {
				var position = step.index + 1;
				if (step.id) query.push("#" + step.id);
				else if (step.type === "text") {} else query.push("*:nth-child(" + position + ")");
			});
			return query.join(">");
		}
		textNodes(container, ignoreClass) {
			return Array.prototype.slice.call(container.childNodes).filter(function(node) {
				if (node.nodeType === TEXT_NODE$1) return true;
				else if (ignoreClass && node.classList.contains(ignoreClass)) return true;
				return false;
			});
		}
		walkToNode(steps, _doc, ignoreClass) {
			var doc = _doc || document;
			var container = doc.documentElement;
			var children;
			var step;
			var len = steps.length;
			var i;
			for (i = 0; i < len; i++) {
				step = steps[i];
				if (step.type === "element") if (step.id) container = doc.getElementById(step.id);
				else {
					children = container.children || findChildren$1(container);
					container = children[step.index];
				}
				else if (step.type === "text") container = this.textNodes(container, ignoreClass)[step.index];
				if (!container) break;
			}
			return container;
		}
		findNode(steps, _doc, ignoreClass) {
			var doc = _doc || document;
			var container;
			var xpath;
			if (!ignoreClass && typeof doc.evaluate != "undefined") {
				xpath = this.stepsToXpath(steps);
				container = doc.evaluate(xpath, doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			} else if (ignoreClass) container = this.walkToNode(steps, doc, ignoreClass);
			else container = this.walkToNode(steps, doc);
			return container;
		}
		normalizeOffset(container, offset) {
			var normalized = isNumber$1(offset) ? offset : 0;
			if (!container) return 0;
			if (normalized < 0) normalized = 0;
			if (container.nodeType === TEXT_NODE$1 || container.nodeType === COMMENT_NODE) return Math.min(normalized, container.textContent.length);
			if (container.childNodes) return Math.min(normalized, container.childNodes.length);
			return normalized;
		}
		fixMiss(steps, offset, _doc, ignoreClass) {
			var container = this.findNode(steps.slice(0, -1), _doc, ignoreClass);
			if (!container || !container.childNodes) return {
				container: container || null,
				offset: this.normalizeOffset(container, offset)
			};
			var children = container.childNodes;
			var map = this.normalizedMap(children, TEXT_NODE$1, ignoreClass || void 0);
			var child;
			var len;
			var lastStepIndex = steps[steps.length - 1].index;
			for (let childIndex in map) {
				if (!Object.prototype.hasOwnProperty.call(map, childIndex)) continue;
				if (map[childIndex] === lastStepIndex) {
					child = children[Number(childIndex)];
					len = child.textContent.length;
					if ((offset || 0) > len) offset = (offset || 0) - len;
					else {
						if (child.nodeType === ELEMENT_NODE$1) container = child.childNodes[0];
						else container = child;
						break;
					}
				}
			}
			return {
				container,
				offset: this.normalizeOffset(container, offset)
			};
		}
		setRangeBoundary(range, method, container, offset, steps, doc, ignoreClass) {
			var safeContainer = container;
			var safeOffset = isNumber$1(offset) ? offset : 0;
			var missed;
			if (!safeContainer) return false;
			try {
				range[method](safeContainer, safeOffset);
				return true;
			} catch (e) {
				missed = this.fixMiss(steps, offset, doc, ignoreClass);
				if (missed && missed.container) {
					safeContainer = missed.container;
					safeOffset = missed.offset;
				}
				if (!safeContainer) return false;
				safeOffset = this.normalizeOffset(safeContainer, safeOffset);
				try {
					range[method](safeContainer, safeOffset);
					return true;
				} catch (_e) {
					return false;
				}
			}
		}
		/**
		* Creates a DOM range representing a CFI
		* @param {document} _doc document referenced in the base
		* @param {string} [ignoreClass]
		* @return {Range}
		*/
		toRange(_doc, ignoreClass) {
			var doc = _doc || document;
			var range;
			var start, end, startContainer, endContainer;
			var cfi = this;
			var startSteps, endSteps;
			var needsIgnoring = ignoreClass ? doc.querySelector("." + ignoreClass) != null : false;
			if (typeof doc.createRange !== "undefined") range = doc.createRange();
			else range = new RangeObject$1();
			if (cfi.range) {
				start = cfi.start;
				startSteps = cfi.path.steps.concat(start.steps);
				startContainer = this.findNode(startSteps, doc, needsIgnoring ? ignoreClass : null);
				end = cfi.end;
				endSteps = cfi.path.steps.concat(end.steps);
				endContainer = this.findNode(endSteps, doc, needsIgnoring ? ignoreClass : null);
			} else {
				start = cfi.path;
				startSteps = cfi.path.steps;
				startContainer = this.findNode(cfi.path.steps, doc, needsIgnoring ? ignoreClass : null);
			}
			if (startContainer) {
				if (!this.setRangeBoundary(range, "setStart", startContainer, start.terminal.offset != null ? start.terminal.offset : 0, startSteps, doc, needsIgnoring ? ignoreClass : null)) {
					console.log("No valid range start found for", this.toString());
					return null;
				}
			} else {
				console.log("No startContainer found for", this.toString());
				return null;
			}
			if (endContainer) this.setRangeBoundary(range, "setEnd", endContainer, end.terminal.offset != null ? end.terminal.offset : 0, endSteps, doc, needsIgnoring ? ignoreClass : null);
			return range;
		}
		/**
		* Check if a string is wrapped with "epubcfi()"
		* @param {string} str
		* @returns {boolean}
		*/
		isCfiString(str) {
			if (typeof str === "string" && str.indexOf("epubcfi(") === 0 && str[str.length - 1] === ")") return true;
			return false;
		}
		generateChapterComponent(_spineNodeIndex, _pos, id) {
			var pos = parseInt(String(_pos)), cfi = "/" + (_spineNodeIndex + 1) * 2 + "/";
			cfi += (pos + 1) * 2;
			if (id) cfi += "[" + id + "]";
			return cfi;
		}
		/**
		* Collapse a CFI Range to a single CFI Position
		* @param {boolean} [toStart=false]
		*/
		collapse(toStart) {
			if (!this.range) return;
			this.range = false;
			if (toStart) {
				this.path.steps = this.path.steps.concat(this.start.steps);
				this.path.terminal = this.start.terminal;
			} else {
				this.path.steps = this.path.steps.concat(this.end.steps);
				this.path.terminal = this.end.terminal;
			}
		}
	};
	//#endregion
	//#region src/utils/hook.ts
	var Hook = class {
		context;
		hooks;
		constructor(context) {
			this.context = context || this;
			this.hooks = [];
		}
		/**
		* Adds a function to be run before a hook completes
		* @example this.content.register(function(){...});
		*/
		register(...items) {
			for (var i = 0; i < arguments.length; ++i) if (typeof arguments[i] === "function") this.hooks.push(arguments[i]);
			else for (var j = 0; j < arguments[i].length; ++j) this.hooks.push(arguments[i][j]);
		}
		/**
		* Removes a function
		* @example this.content.deregister(function(){...});
		*/
		deregister(func) {
			let hook;
			for (let i = 0; i < this.hooks.length; i++) {
				hook = this.hooks[i];
				if (hook === func) {
					this.hooks.splice(i, 1);
					break;
				}
			}
		}
		/**
		* Triggers a hook to run all functions
		* @example this.content.trigger(args).then(function(){...});
		*/
		trigger(...items) {
			var args = arguments;
			var context = this.context;
			var promises = [];
			this.hooks.forEach(function(task) {
				var executing;
				try {
					executing = task.apply(context, args);
				} catch (err) {
					console.log(err);
				}
				if (executing && typeof executing["then"] === "function") promises.push(executing);
			});
			return Promise.all(promises);
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
	/**
	* Select the first matching element with legacy fallback behavior.
	* @param {Element | Document} el Root element or document.
	* @param {string} sel Selector string.
	* @returns {Element | undefined} First matching element.
	*/
	function qs$1(el, sel) {
		var elements;
		if (!el) throw new Error("No Element Provided");
		if (typeof el.querySelector !== "undefined") return el.querySelector(sel);
		elements = el.getElementsByTagName(sel);
		if (elements.length) return elements[0];
	}
	/**
	* Select all matching elements with legacy fallback behavior.
	* @param {Element | Document} el Root element or document.
	* @param {string} sel Selector string.
	* @returns {NodeList | HTMLCollection} Matching elements.
	*/
	function qsa$1(el, sel) {
		if (typeof el.querySelector !== "undefined") return el.querySelectorAll(sel);
		return el.getElementsByTagName(sel);
	}
	/**
	* Select the first element matching a tag and property map.
	* @param {Element | Document} el Root element or document.
	* @param {string} sel Element name.
	* @param {object} props Attribute/value map.
	* @returns {Element | undefined} First matching element.
	*/
	function qsp$1(el, sel, props) {
		var q;
		var filtered;
		if (typeof el.querySelector !== "undefined") {
			sel += "[";
			for (var prop in props) sel += prop + "~='" + props[prop] + "'";
			sel += "]";
			return el.querySelector(sel);
		}
		q = el.getElementsByTagName(sel);
		filtered = Array.prototype.slice.call(q, 0).filter(function(el) {
			for (var prop in props) if (el.getAttribute(prop) === props[prop]) return true;
			return false;
		});
		if (filtered) return filtered[0];
	}
	/**
	* Select by EPUB type with namespace fallback behavior.
	* @param {Element | Document} html Root element or document.
	* @param {string} element Element name.
	* @param {string} type EPUB type.
	* @returns {Element | undefined} First matching element.
	*/
	function querySelectorByType$1(html, element, type) {
		var query;
		if (typeof html.querySelector !== "undefined") query = html.querySelector(`${element}[*|type="${type}"]`);
		if (!query || query.length === 0) {
			query = qsa$1(html, element);
			for (var i = 0; i < query.length; i++) if (query[i].getAttributeNS("http://www.idpf.org/2007/ops", "type") === type || query[i].getAttribute("epub:type") === type) return query[i];
		} else return query;
	}
	//#endregion
	//#region src/utils/replacements.ts
	function replaceBase(doc, section) {
		var base;
		var head;
		var url = section.url;
		var absolute = url.indexOf("://") > -1;
		if (!doc) return;
		head = qs$1(doc, "head");
		base = qs$1(head, "base");
		if (!base) {
			base = doc.createElement("base");
			head.insertBefore(base, head.firstChild);
		}
		if (!absolute && window && window.location) url = window.location.origin + url;
		base.setAttribute("href", url);
	}
	function replaceCanonical(doc, section) {
		var head;
		var link;
		var url = section.canonical;
		if (!doc) return;
		head = qs$1(doc, "head");
		link = qs$1(head, "link[rel='canonical']");
		if (link) link.setAttribute("href", url);
		else {
			link = doc.createElement("link");
			link.setAttribute("rel", "canonical");
			link.setAttribute("href", url);
			head.appendChild(link);
		}
	}
	function replaceMeta(doc, section) {
		var head;
		var meta;
		var id = section.idref;
		if (!doc) return;
		head = qs$1(doc, "head");
		meta = qs$1(head, "meta[name='dc.identifier']");
		if (meta) meta.setAttribute("content", id);
		else {
			meta = doc.createElement("meta");
			meta.setAttribute("name", "dc.identifier");
			meta.setAttribute("content", id);
			head.appendChild(meta);
		}
	}
	function replaceLinks(contents, fn, sectionHref) {
		var links = contents.querySelectorAll("a[href]");
		if (!links.length) return;
		var base = qs$1(contents.ownerDocument, "base");
		var location = base ? base.getAttribute("href") : void 0;
		var replaceLink = function(link) {
			var href = link.getAttribute("href");
			if (href.indexOf("mailto:") === 0) return;
			if (href.indexOf("://") > -1) link.setAttribute("target", "_blank");
			else {
				var linkUrl;
				try {
					linkUrl = new Url(href, location);
				} catch (error) {}
				link.onclick = function() {
					if (sectionHref && href && href.indexOf("#") === 0) fn(sectionHref + href);
					else if (linkUrl && linkUrl.hash) fn(linkUrl.Path.path + linkUrl.hash);
					else if (linkUrl) fn(linkUrl.Path.path);
					else fn(href);
					return false;
				};
			}
		}.bind(this);
		for (var i = 0; i < links.length; i++) replaceLink(links[i]);
	}
	function substitute(content, urls, replacements) {
		urls.forEach(function(url, i) {
			if (url && replacements[i]) {
				url = url.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
				content = content.replace(new RegExp(url, "g"), replacements[i]);
			}
		});
		return content;
	}
	//#endregion
	//#region node_modules/@xmldom/xmldom/lib/conventions.js
	var require_conventions = /* @__PURE__ */ __commonJSMin(((exports) => {
		/**
		* Ponyfill for `Array.prototype.find` which is only available in ES6 runtimes.
		*
		* Works with anything that has a `length` property and index access properties, including NodeList.
		*
		* @template {unknown} T
		* @param {Array<T> | ({length:number, [number]: T})} list
		* @param {function (item: T, index: number, list:Array<T> | ({length:number, [number]: T})):boolean} predicate
		* @param {Partial<Pick<ArrayConstructor['prototype'], 'find'>>?} ac `Array.prototype` by default,
		* 				allows injecting a custom implementation in tests
		* @returns {T | undefined}
		*
		* @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
		* @see https://tc39.es/ecma262/multipage/indexed-collections.html#sec-array.prototype.find
		*/
		function find(list, predicate, ac) {
			if (ac === void 0) ac = Array.prototype;
			if (list && typeof ac.find === "function") return ac.find.call(list, predicate);
			for (var i = 0; i < list.length; i++) if (Object.prototype.hasOwnProperty.call(list, i)) {
				var item = list[i];
				if (predicate.call(void 0, item, i, list)) return item;
			}
		}
		/**
		* "Shallow freezes" an object to render it immutable.
		* Uses `Object.freeze` if available,
		* otherwise the immutability is only in the type.
		*
		* Is used to create "enum like" objects.
		*
		* @template T
		* @param {T} object the object to freeze
		* @param {Pick<ObjectConstructor, 'freeze'> = Object} oc `Object` by default,
		* 				allows to inject custom object constructor for tests
		* @returns {Readonly<T>}
		*
		* @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
		*/
		function freeze(object, oc) {
			if (oc === void 0) oc = Object;
			return oc && typeof oc.freeze === "function" ? oc.freeze(object) : object;
		}
		/**
		* Since we can not rely on `Object.assign` we provide a simplified version
		* that is sufficient for our needs.
		*
		* @param {Object} target
		* @param {Object | null | undefined} source
		*
		* @returns {Object} target
		* @throws TypeError if target is not an object
		*
		* @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
		* @see https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.assign
		*/
		function assign(target, source) {
			if (target === null || typeof target !== "object") throw new TypeError("target is not an object");
			for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
			return target;
		}
		/**
		* All mime types that are allowed as input to `DOMParser.parseFromString`
		*
		* @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString#Argument02 MDN
		* @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#domparsersupportedtype WHATWG HTML Spec
		* @see DOMParser.prototype.parseFromString
		*/
		var MIME_TYPE = freeze({
			/**
			* `text/html`, the only mime type that triggers treating an XML document as HTML.
			*
			* @see DOMParser.SupportedType.isHTML
			* @see https://www.iana.org/assignments/media-types/text/html IANA MimeType registration
			* @see https://en.wikipedia.org/wiki/HTML Wikipedia
			* @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString MDN
			* @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#dom-domparser-parsefromstring WHATWG HTML Spec
			*/
			HTML: "text/html",
			/**
			* Helper method to check a mime type if it indicates an HTML document
			*
			* @param {string} [value]
			* @returns {boolean}
			*
			* @see https://www.iana.org/assignments/media-types/text/html IANA MimeType registration
			* @see https://en.wikipedia.org/wiki/HTML Wikipedia
			* @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString MDN
			* @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#dom-domparser-parsefromstring 	 */
			isHTML: function(value) {
				return value === MIME_TYPE.HTML;
			},
			/**
			* `application/xml`, the standard mime type for XML documents.
			*
			* @see https://www.iana.org/assignments/media-types/application/xml IANA MimeType registration
			* @see https://tools.ietf.org/html/rfc7303#section-9.1 RFC 7303
			* @see https://en.wikipedia.org/wiki/XML_and_MIME Wikipedia
			*/
			XML_APPLICATION: "application/xml",
			/**
			* `text/html`, an alias for `application/xml`.
			*
			* @see https://tools.ietf.org/html/rfc7303#section-9.2 RFC 7303
			* @see https://www.iana.org/assignments/media-types/text/xml IANA MimeType registration
			* @see https://en.wikipedia.org/wiki/XML_and_MIME Wikipedia
			*/
			XML_TEXT: "text/xml",
			/**
			* `application/xhtml+xml`, indicates an XML document that has the default HTML namespace,
			* but is parsed as an XML document.
			*
			* @see https://www.iana.org/assignments/media-types/application/xhtml+xml IANA MimeType registration
			* @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocument WHATWG DOM Spec
			* @see https://en.wikipedia.org/wiki/XHTML Wikipedia
			*/
			XML_XHTML_APPLICATION: "application/xhtml+xml",
			/**
			* `image/svg+xml`,
			*
			* @see https://www.iana.org/assignments/media-types/image/svg+xml IANA MimeType registration
			* @see https://www.w3.org/TR/SVG11/ W3C SVG 1.1
			* @see https://en.wikipedia.org/wiki/Scalable_Vector_Graphics Wikipedia
			*/
			XML_SVG_IMAGE: "image/svg+xml"
		});
		/**
		* Namespaces that are used in this code base.
		*
		* @see http://www.w3.org/TR/REC-xml-names
		*/
		var NAMESPACE = freeze({
			/**
			* The XHTML namespace.
			*
			* @see http://www.w3.org/1999/xhtml
			*/
			HTML: "http://www.w3.org/1999/xhtml",
			/**
			* Checks if `uri` equals `NAMESPACE.HTML`.
			*
			* @param {string} [uri]
			*
			* @see NAMESPACE.HTML
			*/
			isHTML: function(uri) {
				return uri === NAMESPACE.HTML;
			},
			/**
			* The SVG namespace.
			*
			* @see http://www.w3.org/2000/svg
			*/
			SVG: "http://www.w3.org/2000/svg",
			/**
			* The `xml:` namespace.
			*
			* @see http://www.w3.org/XML/1998/namespace
			*/
			XML: "http://www.w3.org/XML/1998/namespace",
			/**
			* The `xmlns:` namespace
			*
			* @see https://www.w3.org/2000/xmlns/
			*/
			XMLNS: "http://www.w3.org/2000/xmlns/"
		});
		exports.assign = assign;
		exports.find = find;
		exports.freeze = freeze;
		exports.MIME_TYPE = MIME_TYPE;
		exports.NAMESPACE = NAMESPACE;
	}));
	//#endregion
	//#region node_modules/@xmldom/xmldom/lib/dom.js
	var require_dom = /* @__PURE__ */ __commonJSMin(((exports) => {
		var conventions = require_conventions();
		var find = conventions.find;
		var NAMESPACE = conventions.NAMESPACE;
		/**
		* A prerequisite for `[].filter`, to drop elements that are empty
		* @param {string} input
		* @returns {boolean}
		*/
		function notEmptyString(input) {
			return input !== "";
		}
		/**
		* @see https://infra.spec.whatwg.org/#split-on-ascii-whitespace
		* @see https://infra.spec.whatwg.org/#ascii-whitespace
		*
		* @param {string} input
		* @returns {string[]} (can be empty)
		*/
		function splitOnASCIIWhitespace(input) {
			return input ? input.split(/[\t\n\f\r ]+/).filter(notEmptyString) : [];
		}
		/**
		* Adds element as a key to current if it is not already present.
		*
		* @param {Record<string, boolean | undefined>} current
		* @param {string} element
		* @returns {Record<string, boolean | undefined>}
		*/
		function orderedSetReducer(current, element) {
			if (!current.hasOwnProperty(element)) current[element] = true;
			return current;
		}
		/**
		* @see https://infra.spec.whatwg.org/#ordered-set
		* @param {string} input
		* @returns {string[]}
		*/
		function toOrderedSet(input) {
			if (!input) return [];
			var list = splitOnASCIIWhitespace(input);
			return Object.keys(list.reduce(orderedSetReducer, {}));
		}
		/**
		* Uses `list.indexOf` to implement something like `Array.prototype.includes`,
		* which we can not rely on being available.
		*
		* @param {any[]} list
		* @returns {function(any): boolean}
		*/
		function arrayIncludes(list) {
			return function(element) {
				return list && list.indexOf(element) !== -1;
			};
		}
		function copy(src, dest) {
			for (var p in src) if (Object.prototype.hasOwnProperty.call(src, p)) dest[p] = src[p];
		}
		/**
		^\w+\.prototype\.([_\w]+)\s*=\s*((?:.*\{\s*?[\r\n][\s\S]*?^})|\S.*?(?=[;\r\n]));?
		^\w+\.prototype\.([_\w]+)\s*=\s*(\S.*?(?=[;\r\n]));?
		*/
		function _extends(Class, Super) {
			var pt = Class.prototype;
			if (!(pt instanceof Super)) {
				function t() {}
				t.prototype = Super.prototype;
				t = new t();
				copy(pt, t);
				Class.prototype = pt = t;
			}
			if (pt.constructor != Class) {
				if (typeof Class != "function") console.error("unknown Class:" + Class);
				pt.constructor = Class;
			}
		}
		var NodeType = {};
		var ELEMENT_NODE = NodeType.ELEMENT_NODE = 1;
		var ATTRIBUTE_NODE = NodeType.ATTRIBUTE_NODE = 2;
		var TEXT_NODE = NodeType.TEXT_NODE = 3;
		var CDATA_SECTION_NODE = NodeType.CDATA_SECTION_NODE = 4;
		var ENTITY_REFERENCE_NODE = NodeType.ENTITY_REFERENCE_NODE = 5;
		var ENTITY_NODE = NodeType.ENTITY_NODE = 6;
		var PROCESSING_INSTRUCTION_NODE = NodeType.PROCESSING_INSTRUCTION_NODE = 7;
		var COMMENT_NODE = NodeType.COMMENT_NODE = 8;
		var DOCUMENT_NODE = NodeType.DOCUMENT_NODE = 9;
		var DOCUMENT_TYPE_NODE = NodeType.DOCUMENT_TYPE_NODE = 10;
		var DOCUMENT_FRAGMENT_NODE = NodeType.DOCUMENT_FRAGMENT_NODE = 11;
		var NOTATION_NODE = NodeType.NOTATION_NODE = 12;
		var ExceptionCode = {};
		var ExceptionMessage = {};
		ExceptionCode.INDEX_SIZE_ERR = (ExceptionMessage[1] = "Index size error", 1);
		ExceptionCode.DOMSTRING_SIZE_ERR = (ExceptionMessage[2] = "DOMString size error", 2);
		var HIERARCHY_REQUEST_ERR = ExceptionCode.HIERARCHY_REQUEST_ERR = (ExceptionMessage[3] = "Hierarchy request error", 3);
		ExceptionCode.WRONG_DOCUMENT_ERR = (ExceptionMessage[4] = "Wrong document", 4);
		var INVALID_CHARACTER_ERR = ExceptionCode.INVALID_CHARACTER_ERR = (ExceptionMessage[5] = "Invalid character", 5);
		ExceptionCode.NO_DATA_ALLOWED_ERR = (ExceptionMessage[6] = "No data allowed", 6);
		ExceptionCode.NO_MODIFICATION_ALLOWED_ERR = (ExceptionMessage[7] = "No modification allowed", 7);
		var NOT_FOUND_ERR = ExceptionCode.NOT_FOUND_ERR = (ExceptionMessage[8] = "Not found", 8);
		ExceptionCode.NOT_SUPPORTED_ERR = (ExceptionMessage[9] = "Not supported", 9);
		var INUSE_ATTRIBUTE_ERR = ExceptionCode.INUSE_ATTRIBUTE_ERR = (ExceptionMessage[10] = "Attribute in use", 10);
		var INVALID_STATE_ERR = ExceptionCode.INVALID_STATE_ERR = (ExceptionMessage[11] = "Invalid state", 11);
		ExceptionCode.SYNTAX_ERR = (ExceptionMessage[12] = "Syntax error", 12);
		ExceptionCode.INVALID_MODIFICATION_ERR = (ExceptionMessage[13] = "Invalid modification", 13);
		ExceptionCode.NAMESPACE_ERR = (ExceptionMessage[14] = "Invalid namespace", 14);
		ExceptionCode.INVALID_ACCESS_ERR = (ExceptionMessage[15] = "Invalid access", 15);
		/**
		* DOM Level 2
		* Object DOMException
		* @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/ecma-script-binding.html
		* @see http://www.w3.org/TR/REC-DOM-Level-1/ecma-script-language-binding.html
		*/
		function DOMException(code, message) {
			if (message instanceof Error) var error = message;
			else {
				error = this;
				Error.call(this, ExceptionMessage[code]);
				this.message = ExceptionMessage[code];
				if (Error.captureStackTrace) Error.captureStackTrace(this, DOMException);
			}
			error.code = code;
			if (message) this.message = this.message + ": " + message;
			return error;
		}
		DOMException.prototype = Error.prototype;
		copy(ExceptionCode, DOMException);
		/**
		* @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-536297177
		* The NodeList interface provides the abstraction of an ordered collection of nodes, without defining or constraining how this collection is implemented. NodeList objects in the DOM are live.
		* The items in the NodeList are accessible via an integral index, starting from 0.
		*/
		function NodeList() {}
		NodeList.prototype = {
			/**
			* The number of nodes in the list. The range of valid child node indices is 0 to length-1 inclusive.
			* @standard level1
			*/
			length: 0,
			/**
			* Returns the indexth item in the collection. If index is greater than or equal to the number of nodes in the list, this returns null.
			* @standard level1
			* @param index  unsigned long
			*   Index into the collection.
			* @return Node
			* 	The node at the indexth position in the NodeList, or null if that is not a valid index.
			*/
			item: function(index) {
				return index >= 0 && index < this.length ? this[index] : null;
			},
			toString: function(isHTML, nodeFilter, options) {
				var requireWellFormed = !!options && !!options.requireWellFormed;
				for (var buf = [], i = 0; i < this.length; i++) serializeToString(this[i], buf, isHTML, nodeFilter, null, requireWellFormed);
				return buf.join("");
			},
			/**
			* @private
			* @param {function (Node):boolean} predicate
			* @returns {Node[]}
			*/
			filter: function(predicate) {
				return Array.prototype.filter.call(this, predicate);
			},
			/**
			* @private
			* @param {Node} item
			* @returns {number}
			*/
			indexOf: function(item) {
				return Array.prototype.indexOf.call(this, item);
			}
		};
		function LiveNodeList(node, refresh) {
			this._node = node;
			this._refresh = refresh;
			_updateLiveList(this);
		}
		function _updateLiveList(list) {
			var inc = list._node._inc || list._node.ownerDocument._inc;
			if (list._inc !== inc) {
				var ls = list._refresh(list._node);
				__set__(list, "length", ls.length);
				if (!list.$$length || ls.length < list.$$length) {
					for (var i = ls.length; i in list; i++) if (Object.prototype.hasOwnProperty.call(list, i)) delete list[i];
				}
				copy(ls, list);
				list._inc = inc;
			}
		}
		LiveNodeList.prototype.item = function(i) {
			_updateLiveList(this);
			return this[i] || null;
		};
		_extends(LiveNodeList, NodeList);
		/**
		* Objects implementing the NamedNodeMap interface are used
		* to represent collections of nodes that can be accessed by name.
		* Note that NamedNodeMap does not inherit from NodeList;
		* NamedNodeMaps are not maintained in any particular order.
		* Objects contained in an object implementing NamedNodeMap may also be accessed by an ordinal index,
		* but this is simply to allow convenient enumeration of the contents of a NamedNodeMap,
		* and does not imply that the DOM specifies an order to these Nodes.
		* NamedNodeMap objects in the DOM are live.
		* used for attributes or DocumentType entities
		*/
		function NamedNodeMap() {}
		function _findNodeIndex(list, node) {
			var i = list.length;
			while (i--) if (list[i] === node) return i;
		}
		function _addNamedNode(el, list, newAttr, oldAttr) {
			if (oldAttr) list[_findNodeIndex(list, oldAttr)] = newAttr;
			else list[list.length++] = newAttr;
			if (el) {
				newAttr.ownerElement = el;
				var doc = el.ownerDocument;
				if (doc) {
					oldAttr && _onRemoveAttribute(doc, el, oldAttr);
					_onAddAttribute(doc, el, newAttr);
				}
			}
		}
		function _removeNamedNode(el, list, attr) {
			var i = _findNodeIndex(list, attr);
			if (i >= 0) {
				var lastIndex = list.length - 1;
				while (i < lastIndex) list[i] = list[++i];
				list.length = lastIndex;
				if (el) {
					var doc = el.ownerDocument;
					if (doc) {
						_onRemoveAttribute(doc, el, attr);
						attr.ownerElement = null;
					}
				}
			} else throw new DOMException(NOT_FOUND_ERR, /* @__PURE__ */ new Error(el.tagName + "@" + attr));
		}
		NamedNodeMap.prototype = {
			length: 0,
			item: NodeList.prototype.item,
			getNamedItem: function(key) {
				var i = this.length;
				while (i--) {
					var attr = this[i];
					if (attr.nodeName == key) return attr;
				}
			},
			setNamedItem: function(attr) {
				var el = attr.ownerElement;
				if (el && el != this._ownerElement) throw new DOMException(INUSE_ATTRIBUTE_ERR);
				var oldAttr = this.getNamedItem(attr.nodeName);
				_addNamedNode(this._ownerElement, this, attr, oldAttr);
				return oldAttr;
			},
			setNamedItemNS: function(attr) {
				var el = attr.ownerElement, oldAttr;
				if (el && el != this._ownerElement) throw new DOMException(INUSE_ATTRIBUTE_ERR);
				oldAttr = this.getNamedItemNS(attr.namespaceURI, attr.localName);
				_addNamedNode(this._ownerElement, this, attr, oldAttr);
				return oldAttr;
			},
			removeNamedItem: function(key) {
				var attr = this.getNamedItem(key);
				_removeNamedNode(this._ownerElement, this, attr);
				return attr;
			},
			removeNamedItemNS: function(namespaceURI, localName) {
				var attr = this.getNamedItemNS(namespaceURI, localName);
				_removeNamedNode(this._ownerElement, this, attr);
				return attr;
			},
			getNamedItemNS: function(namespaceURI, localName) {
				var i = this.length;
				while (i--) {
					var node = this[i];
					if (node.localName == localName && node.namespaceURI == namespaceURI) return node;
				}
				return null;
			}
		};
		/**
		* The DOMImplementation interface represents an object providing methods
		* which are not dependent on any particular document.
		* Such an object is returned by the `Document.implementation` property.
		*
		* __The individual methods describe the differences compared to the specs.__
		*
		* @constructor
		*
		* @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation MDN
		* @see https://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-102161490 DOM Level 1 Core (Initial)
		* @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#ID-102161490 DOM Level 2 Core
		* @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#ID-102161490 DOM Level 3 Core
		* @see https://dom.spec.whatwg.org/#domimplementation DOM Living Standard
		*/
		function DOMImplementation() {}
		DOMImplementation.prototype = {
			/**
			* The DOMImplementation.hasFeature() method returns a Boolean flag indicating if a given feature is supported.
			* The different implementations fairly diverged in what kind of features were reported.
			* The latest version of the spec settled to force this method to always return true, where the functionality was accurate and in use.
			*
			* @deprecated It is deprecated and modern browsers return true in all cases.
			*
			* @param {string} feature
			* @param {string} [version]
			* @returns {boolean} always true
			*
			* @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/hasFeature MDN
			* @see https://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-5CED94D7 DOM Level 1 Core
			* @see https://dom.spec.whatwg.org/#dom-domimplementation-hasfeature DOM Living Standard
			*/
			hasFeature: function(feature, version) {
				return true;
			},
			/**
			* Creates an XML Document object of the specified type with its document element.
			*
			* __It behaves slightly different from the description in the living standard__:
			* - There is no interface/class `XMLDocument`, it returns a `Document` instance.
			* - `contentType`, `encoding`, `mode`, `origin`, `url` fields are currently not declared.
			* - this implementation is not validating names or qualified names
			*   (when parsing XML strings, the SAX parser takes care of that)
			*
			* @param {string|null} namespaceURI
			* @param {string} qualifiedName
			* @param {DocumentType=null} doctype
			* @returns {Document}
			*
			* @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createDocument MDN
			* @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#Level-2-Core-DOM-createDocument DOM Level 2 Core (initial)
			* @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocument  DOM Level 2 Core
			*
			* @see https://dom.spec.whatwg.org/#validate-and-extract DOM: Validate and extract
			* @see https://www.w3.org/TR/xml/#NT-NameStartChar XML Spec: Names
			* @see https://www.w3.org/TR/xml-names/#ns-qualnames XML Namespaces: Qualified names
			*/
			createDocument: function(namespaceURI, qualifiedName, doctype) {
				var doc = new Document();
				doc.implementation = this;
				doc.childNodes = new NodeList();
				doc.doctype = doctype || null;
				if (doctype) doc.appendChild(doctype);
				if (qualifiedName) {
					var root = doc.createElementNS(namespaceURI, qualifiedName);
					doc.appendChild(root);
				}
				return doc;
			},
			/**
			* Returns a doctype, with the given `qualifiedName`, `publicId`, and `systemId`.
			*
			* __This implementation differs from the specification:__
			* - this implementation is not validating names or qualified names
			*   (when parsing XML strings, the SAX parser takes care of that)
			*
			* Note: `internalSubset` can only be introduced via a direct property write to `node.internalSubset` after creation.
			* Creation-time validation of `publicId`, `systemId` is not enforced.
			* The serializer-level check covers all mutation vectors, including direct property writes.
			* `internalSubset` is only serialized as `[ ... ]` when both `publicId` and `systemId` are
			* absent (empty or `'.'`) — if either external identifier is present, `internalSubset` is
			* silently omitted from the serialized output.
			*
			* @param {string} qualifiedName
			* @param {string} [publicId]
			* The external subset public identifier. Stored verbatim including surrounding quotes.
			* When serialized with `requireWellFormed: true` (via the 4th-parameter options object),
			* throws `DOMException` with code `INVALID_STATE_ERR` if the value is non-empty and does
			* not match the XML `PubidLiteral` production (W3C DOM Parsing §3.2.1.3; XML 1.0 [12]).
			* @param {string} [systemId]
			* The external subset system identifier. Stored verbatim including surrounding quotes.
			* When serialized with `requireWellFormed: true`, throws `DOMException` with code
			* `INVALID_STATE_ERR` if the value is non-empty and does not match the XML `SystemLiteral`
			* production (W3C DOM Parsing §3.2.1.3; XML 1.0 [11]).
			* @returns {DocumentType} which can either be used with `DOMImplementation.createDocument` upon document creation
			* 				  or can be put into the document via methods like `Node.insertBefore()` or `Node.replaceChild()`
			*
			* @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createDocumentType MDN
			* @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#Level-2-Core-DOM-createDocType DOM Level 2 Core
			* @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocumenttype DOM Living Standard
			*
			* @see https://dom.spec.whatwg.org/#validate-and-extract DOM: Validate and extract
			* @see https://www.w3.org/TR/xml/#NT-NameStartChar XML Spec: Names
			* @see https://www.w3.org/TR/xml-names/#ns-qualnames XML Namespaces: Qualified names
			*/
			createDocumentType: function(qualifiedName, publicId, systemId) {
				var node = new DocumentType();
				node.name = qualifiedName;
				node.nodeName = qualifiedName;
				node.publicId = publicId || "";
				node.systemId = systemId || "";
				return node;
			}
		};
		/**
		* @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-1950641247
		*/
		function Node() {}
		Node.prototype = {
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
			insertBefore: function(newChild, refChild) {
				return _insertBefore(this, newChild, refChild);
			},
			replaceChild: function(newChild, oldChild) {
				_insertBefore(this, newChild, oldChild, assertPreReplacementValidityInDocument);
				if (oldChild) this.removeChild(oldChild);
			},
			removeChild: function(oldChild) {
				return _removeChild(this, oldChild);
			},
			appendChild: function(newChild) {
				return this.insertBefore(newChild, null);
			},
			hasChildNodes: function() {
				return this.firstChild != null;
			},
			cloneNode: function(deep) {
				return cloneNode(this.ownerDocument || this, this, deep);
			},
			/**
			* Puts the specified node and all of its subtree into a "normalized" form. In a normalized
			* subtree, no text nodes in the subtree are empty and there are no adjacent text nodes.
			*
			* Specifically, this method merges any adjacent text nodes (i.e., nodes for which `nodeType`
			* is `TEXT_NODE`) into a single node with the combined data. It also removes any empty text
			* nodes.
			*
			* This method iteratively traverses all child nodes to normalize all descendant nodes within
			* the subtree.
			*
			* @throws {DOMException}
			* May throw a DOMException if operations within removeChild or appendData (which are
			* potentially invoked in this method) do not meet their specific constraints.
			* @see {@link Node.removeChild}
			* @see {@link CharacterData.appendData}
			* @see ../docs/walk-dom.md.
			*/
			normalize: function() {
				walkDOM(this, null, { enter: function(node) {
					var child = node.firstChild;
					while (child) {
						var next = child.nextSibling;
						if (next !== null && next.nodeType === TEXT_NODE && child.nodeType === TEXT_NODE) {
							node.removeChild(next);
							child.appendData(next.data);
						} else child = next;
					}
					return true;
				} });
			},
			isSupported: function(feature, version) {
				return this.ownerDocument.implementation.hasFeature(feature, version);
			},
			hasAttributes: function() {
				return this.attributes.length > 0;
			},
			/**
			* Look up the prefix associated to the given namespace URI, starting from this node.
			* **The default namespace declarations are ignored by this method.**
			* See Namespace Prefix Lookup for details on the algorithm used by this method.
			*
			* _Note: The implementation seems to be incomplete when compared to the algorithm described in the specs._
			*
			* @param {string | null} namespaceURI
			* @returns {string | null}
			* @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Node3-lookupNamespacePrefix
			* @see https://www.w3.org/TR/DOM-Level-3-Core/namespaces-algorithms.html#lookupNamespacePrefixAlgo
			* @see https://dom.spec.whatwg.org/#dom-node-lookupprefix
			* @see https://github.com/xmldom/xmldom/issues/322
			*/
			lookupPrefix: function(namespaceURI) {
				var el = this;
				while (el) {
					var map = el._nsMap;
					if (map) {
						for (var n in map) if (Object.prototype.hasOwnProperty.call(map, n) && map[n] === namespaceURI) return n;
					}
					el = el.nodeType == ATTRIBUTE_NODE ? el.ownerDocument : el.parentNode;
				}
				return null;
			},
			lookupNamespaceURI: function(prefix) {
				var el = this;
				while (el) {
					var map = el._nsMap;
					if (map) {
						if (Object.prototype.hasOwnProperty.call(map, prefix)) return map[prefix];
					}
					el = el.nodeType == ATTRIBUTE_NODE ? el.ownerDocument : el.parentNode;
				}
				return null;
			},
			isDefaultNamespace: function(namespaceURI) {
				return this.lookupPrefix(namespaceURI) == null;
			}
		};
		function _xmlEncoder(c) {
			return c == "<" && "&lt;" || c == ">" && "&gt;" || c == "&" && "&amp;" || c == "\"" && "&quot;" || "&#" + c.charCodeAt() + ";";
		}
		copy(NodeType, Node);
		copy(NodeType, Node.prototype);
		/**
		* @param {Node} node
		* Root of the subtree to visit.
		* @param {function(Node): boolean} callback
		* Called for each node in depth-first pre-order. Return a truthy value to stop traversal early.
		* @return {boolean} `true` if traversal was aborted by the callback, `false` otherwise.
		*/
		function _visitNode(node, callback) {
			return walkDOM(node, null, { enter: function(n) {
				return callback(n) ? walkDOM.STOP : true;
			} }) === walkDOM.STOP;
		}
		/**
		* Depth-first pre/post-order DOM tree walker.
		*
		* Visits every node in the subtree rooted at `node`. For each node:
		*
		* 1. Calls `callbacks.enter(node, context)` before descending into the node's children. The
		* return value becomes the `context` passed to each child's `enter` call and to the matching
		* `exit` call.
		* 2. If `enter` returns `null` or `undefined`, the node's children are skipped;
		* sibling traversal continues normally.
		* 3. If `enter` returns `walkDOM.STOP`, the entire traversal is aborted immediately — no
		* further `enter` or `exit` calls are made.
		* 4. `lastChild` and `previousSibling` are read **after** `enter` returns, so `enter` may
		* safely modify the node's own child list before the walker descends. Modifying siblings of
		* the current node or any other part of the tree produces unpredictable results: nodes already
		* queued on the stack are visited regardless of DOM changes, and newly inserted nodes outside
		* the current child list are never visited.
		* 5. Calls `callbacks.exit(node, context)` (if provided) after all of a node's children have
		* been visited, passing the same `context` that `enter`
		* returned for that node.
		*
		* This implementation uses an explicit stack and does not recurse — it is safe on arbitrarily
		* deep trees.
		*
		* @param {Node} node
		* Root of the subtree to walk.
		* @param {*} context
		* Initial context value passed to the root node's `enter`.
		* @param {{ enter: function(Node, *): *, exit?: function(Node, *): void }} callbacks
		* @returns {void | walkDOM.STOP}
		* @see ../docs/walk-dom.md.
		*/
		function walkDOM(node, context, callbacks) {
			var stack = [{
				node,
				context,
				phase: walkDOM.ENTER
			}];
			while (stack.length > 0) {
				var frame = stack.pop();
				if (frame.phase === walkDOM.ENTER) {
					var childContext = callbacks.enter(frame.node, frame.context);
					if (childContext === walkDOM.STOP) return walkDOM.STOP;
					stack.push({
						node: frame.node,
						context: childContext,
						phase: walkDOM.EXIT
					});
					if (childContext === null || childContext === void 0) continue;
					var child = frame.node.lastChild;
					while (child) {
						stack.push({
							node: child,
							context: childContext,
							phase: walkDOM.ENTER
						});
						child = child.previousSibling;
					}
				} else if (callbacks.exit) callbacks.exit(frame.node, frame.context);
			}
		}
		/**
		* Sentinel value returned from a `walkDOM` `enter` callback to abort the entire traversal
		* immediately.
		*
		* @type {symbol}
		*/
		walkDOM.STOP = Symbol("walkDOM.STOP");
		/**
		* Phase constant for a stack frame that has not yet been visited.
		* The `enter` callback is called and children are scheduled.
		*
		* @type {number}
		*/
		walkDOM.ENTER = 0;
		/**
		* Phase constant for a stack frame whose subtree has been fully visited.
		* The `exit` callback is called.
		*
		* @type {number}
		*/
		walkDOM.EXIT = 1;
		function Document() {
			this.ownerDocument = this;
		}
		function _onAddAttribute(doc, el, newAttr) {
			doc && doc._inc++;
			if (newAttr.namespaceURI === NAMESPACE.XMLNS) el._nsMap[newAttr.prefix ? newAttr.localName : ""] = newAttr.value;
		}
		function _onRemoveAttribute(doc, el, newAttr, remove) {
			doc && doc._inc++;
			if (newAttr.namespaceURI === NAMESPACE.XMLNS) delete el._nsMap[newAttr.prefix ? newAttr.localName : ""];
		}
		/**
		* Updates `el.childNodes`, updating the indexed items and it's `length`.
		* Passing `newChild` means it will be appended.
		* Otherwise it's assumed that an item has been removed,
		* and `el.firstNode` and it's `.nextSibling` are used
		* to walk the current list of child nodes.
		*
		* @param {Document} doc
		* @param {Node} el
		* @param {Node} [newChild]
		* @private
		*/
		function _onUpdateChild(doc, el, newChild) {
			if (doc && doc._inc) {
				doc._inc++;
				var cs = el.childNodes;
				if (newChild) cs[cs.length++] = newChild;
				else {
					var child = el.firstChild;
					var i = 0;
					while (child) {
						cs[i++] = child;
						child = child.nextSibling;
					}
					cs.length = i;
					delete cs[cs.length];
				}
			}
		}
		/**
		* Removes the connections between `parentNode` and `child`
		* and any existing `child.previousSibling` or `child.nextSibling`.
		*
		* @see https://github.com/xmldom/xmldom/issues/135
		* @see https://github.com/xmldom/xmldom/issues/145
		*
		* @param {Node} parentNode
		* @param {Node} child
		* @returns {Node} the child that was removed.
		* @private
		*/
		function _removeChild(parentNode, child) {
			var previous = child.previousSibling;
			var next = child.nextSibling;
			if (previous) previous.nextSibling = next;
			else parentNode.firstChild = next;
			if (next) next.previousSibling = previous;
			else parentNode.lastChild = previous;
			child.parentNode = null;
			child.previousSibling = null;
			child.nextSibling = null;
			_onUpdateChild(parentNode.ownerDocument, parentNode);
			return child;
		}
		/**
		* Returns `true` if `node` can be a parent for insertion.
		* @param {Node} node
		* @returns {boolean}
		*/
		function hasValidParentNodeType(node) {
			return node && (node.nodeType === Node.DOCUMENT_NODE || node.nodeType === Node.DOCUMENT_FRAGMENT_NODE || node.nodeType === Node.ELEMENT_NODE);
		}
		/**
		* Returns `true` if `node` can be inserted according to it's `nodeType`.
		* @param {Node} node
		* @returns {boolean}
		*/
		function hasInsertableNodeType(node) {
			return node && (isElementNode(node) || isTextNode(node) || isDocTypeNode(node) || node.nodeType === Node.DOCUMENT_FRAGMENT_NODE || node.nodeType === Node.COMMENT_NODE || node.nodeType === Node.PROCESSING_INSTRUCTION_NODE);
		}
		/**
		* Returns true if `node` is a DOCTYPE node
		* @param {Node} node
		* @returns {boolean}
		*/
		function isDocTypeNode(node) {
			return node && node.nodeType === Node.DOCUMENT_TYPE_NODE;
		}
		/**
		* Returns true if the node is an element
		* @param {Node} node
		* @returns {boolean}
		*/
		function isElementNode(node) {
			return node && node.nodeType === Node.ELEMENT_NODE;
		}
		/**
		* Returns true if `node` is a text node
		* @param {Node} node
		* @returns {boolean}
		*/
		function isTextNode(node) {
			return node && node.nodeType === Node.TEXT_NODE;
		}
		/**
		* Check if en element node can be inserted before `child`, or at the end if child is falsy,
		* according to the presence and position of a doctype node on the same level.
		*
		* @param {Document} doc The document node
		* @param {Node} child the node that would become the nextSibling if the element would be inserted
		* @returns {boolean} `true` if an element can be inserted before child
		* @private
		* https://dom.spec.whatwg.org/#concept-node-ensure-pre-insertion-validity
		*/
		function isElementInsertionPossible(doc, child) {
			var parentChildNodes = doc.childNodes || [];
			if (find(parentChildNodes, isElementNode) || isDocTypeNode(child)) return false;
			var docTypeNode = find(parentChildNodes, isDocTypeNode);
			return !(child && docTypeNode && parentChildNodes.indexOf(docTypeNode) > parentChildNodes.indexOf(child));
		}
		/**
		* Check if en element node can be inserted before `child`, or at the end if child is falsy,
		* according to the presence and position of a doctype node on the same level.
		*
		* @param {Node} doc The document node
		* @param {Node} child the node that would become the nextSibling if the element would be inserted
		* @returns {boolean} `true` if an element can be inserted before child
		* @private
		* https://dom.spec.whatwg.org/#concept-node-ensure-pre-insertion-validity
		*/
		function isElementReplacementPossible(doc, child) {
			var parentChildNodes = doc.childNodes || [];
			function hasElementChildThatIsNotChild(node) {
				return isElementNode(node) && node !== child;
			}
			if (find(parentChildNodes, hasElementChildThatIsNotChild)) return false;
			var docTypeNode = find(parentChildNodes, isDocTypeNode);
			return !(child && docTypeNode && parentChildNodes.indexOf(docTypeNode) > parentChildNodes.indexOf(child));
		}
		/**
		* @private
		* Steps 1-5 of the checks before inserting and before replacing a child are the same.
		*
		* @param {Node} parent the parent node to insert `node` into
		* @param {Node} node the node to insert
		* @param {Node=} child the node that should become the `nextSibling` of `node`
		* @returns {Node}
		* @throws DOMException for several node combinations that would create a DOM that is not well-formed.
		* @throws DOMException if `child` is provided but is not a child of `parent`.
		* @see https://dom.spec.whatwg.org/#concept-node-ensure-pre-insertion-validity
		* @see https://dom.spec.whatwg.org/#concept-node-replace
		*/
		function assertPreInsertionValidity1to5(parent, node, child) {
			if (!hasValidParentNodeType(parent)) throw new DOMException(HIERARCHY_REQUEST_ERR, "Unexpected parent node type " + parent.nodeType);
			if (child && child.parentNode !== parent) throw new DOMException(NOT_FOUND_ERR, "child not in parent");
			if (!hasInsertableNodeType(node) || isDocTypeNode(node) && parent.nodeType !== Node.DOCUMENT_NODE) throw new DOMException(HIERARCHY_REQUEST_ERR, "Unexpected node type " + node.nodeType + " for parent node type " + parent.nodeType);
		}
		/**
		* @private
		* Step 6 of the checks before inserting and before replacing a child are different.
		*
		* @param {Document} parent the parent node to insert `node` into
		* @param {Node} node the node to insert
		* @param {Node | undefined} child the node that should become the `nextSibling` of `node`
		* @returns {Node}
		* @throws DOMException for several node combinations that would create a DOM that is not well-formed.
		* @throws DOMException if `child` is provided but is not a child of `parent`.
		* @see https://dom.spec.whatwg.org/#concept-node-ensure-pre-insertion-validity
		* @see https://dom.spec.whatwg.org/#concept-node-replace
		*/
		function assertPreInsertionValidityInDocument(parent, node, child) {
			var parentChildNodes = parent.childNodes || [];
			var nodeChildNodes = node.childNodes || [];
			if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
				var nodeChildElements = nodeChildNodes.filter(isElementNode);
				if (nodeChildElements.length > 1 || find(nodeChildNodes, isTextNode)) throw new DOMException(HIERARCHY_REQUEST_ERR, "More than one element or text in fragment");
				if (nodeChildElements.length === 1 && !isElementInsertionPossible(parent, child)) throw new DOMException(HIERARCHY_REQUEST_ERR, "Element in fragment can not be inserted before doctype");
			}
			if (isElementNode(node)) {
				if (!isElementInsertionPossible(parent, child)) throw new DOMException(HIERARCHY_REQUEST_ERR, "Only one element can be added and only after doctype");
			}
			if (isDocTypeNode(node)) {
				if (find(parentChildNodes, isDocTypeNode)) throw new DOMException(HIERARCHY_REQUEST_ERR, "Only one doctype is allowed");
				var parentElementChild = find(parentChildNodes, isElementNode);
				if (child && parentChildNodes.indexOf(parentElementChild) < parentChildNodes.indexOf(child)) throw new DOMException(HIERARCHY_REQUEST_ERR, "Doctype can only be inserted before an element");
				if (!child && parentElementChild) throw new DOMException(HIERARCHY_REQUEST_ERR, "Doctype can not be appended since element is present");
			}
		}
		/**
		* @private
		* Step 6 of the checks before inserting and before replacing a child are different.
		*
		* @param {Document} parent the parent node to insert `node` into
		* @param {Node} node the node to insert
		* @param {Node | undefined} child the node that should become the `nextSibling` of `node`
		* @returns {Node}
		* @throws DOMException for several node combinations that would create a DOM that is not well-formed.
		* @throws DOMException if `child` is provided but is not a child of `parent`.
		* @see https://dom.spec.whatwg.org/#concept-node-ensure-pre-insertion-validity
		* @see https://dom.spec.whatwg.org/#concept-node-replace
		*/
		function assertPreReplacementValidityInDocument(parent, node, child) {
			var parentChildNodes = parent.childNodes || [];
			var nodeChildNodes = node.childNodes || [];
			if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
				var nodeChildElements = nodeChildNodes.filter(isElementNode);
				if (nodeChildElements.length > 1 || find(nodeChildNodes, isTextNode)) throw new DOMException(HIERARCHY_REQUEST_ERR, "More than one element or text in fragment");
				if (nodeChildElements.length === 1 && !isElementReplacementPossible(parent, child)) throw new DOMException(HIERARCHY_REQUEST_ERR, "Element in fragment can not be inserted before doctype");
			}
			if (isElementNode(node)) {
				if (!isElementReplacementPossible(parent, child)) throw new DOMException(HIERARCHY_REQUEST_ERR, "Only one element can be added and only after doctype");
			}
			if (isDocTypeNode(node)) {
				function hasDoctypeChildThatIsNotChild(node) {
					return isDocTypeNode(node) && node !== child;
				}
				if (find(parentChildNodes, hasDoctypeChildThatIsNotChild)) throw new DOMException(HIERARCHY_REQUEST_ERR, "Only one doctype is allowed");
				var parentElementChild = find(parentChildNodes, isElementNode);
				if (child && parentChildNodes.indexOf(parentElementChild) < parentChildNodes.indexOf(child)) throw new DOMException(HIERARCHY_REQUEST_ERR, "Doctype can only be inserted before an element");
			}
		}
		/**
		* @private
		* @param {Node} parent the parent node to insert `node` into
		* @param {Node} node the node to insert
		* @param {Node=} child the node that should become the `nextSibling` of `node`
		* @returns {Node}
		* @throws DOMException for several node combinations that would create a DOM that is not well-formed.
		* @throws DOMException if `child` is provided but is not a child of `parent`.
		* @see https://dom.spec.whatwg.org/#concept-node-ensure-pre-insertion-validity
		*/
		function _insertBefore(parent, node, child, _inDocumentAssertion) {
			assertPreInsertionValidity1to5(parent, node, child);
			if (parent.nodeType === Node.DOCUMENT_NODE) (_inDocumentAssertion || assertPreInsertionValidityInDocument)(parent, node, child);
			var cp = node.parentNode;
			if (cp) cp.removeChild(node);
			if (node.nodeType === DOCUMENT_FRAGMENT_NODE) {
				var newFirst = node.firstChild;
				if (newFirst == null) return node;
				var newLast = node.lastChild;
			} else newFirst = newLast = node;
			var pre = child ? child.previousSibling : parent.lastChild;
			newFirst.previousSibling = pre;
			newLast.nextSibling = child;
			if (pre) pre.nextSibling = newFirst;
			else parent.firstChild = newFirst;
			if (child == null) parent.lastChild = newLast;
			else child.previousSibling = newLast;
			do {
				newFirst.parentNode = parent;
				var targetDoc = parent.ownerDocument || parent;
				_updateOwnerDocument(newFirst, targetDoc);
			} while (newFirst !== newLast && (newFirst = newFirst.nextSibling));
			_onUpdateChild(parent.ownerDocument || parent, parent);
			if (node.nodeType == DOCUMENT_FRAGMENT_NODE) node.firstChild = node.lastChild = null;
			return node;
		}
		/**
		* Recursively updates the ownerDocument property for a node and all its descendants
		* @param {Node} node
		* @param {Document} newOwnerDocument
		* @private
		*/
		function _updateOwnerDocument(node, newOwnerDocument) {
			if (node.ownerDocument === newOwnerDocument) return;
			node.ownerDocument = newOwnerDocument;
			if (node.nodeType === ELEMENT_NODE && node.attributes) for (var i = 0; i < node.attributes.length; i++) {
				var attr = node.attributes.item(i);
				if (attr) attr.ownerDocument = newOwnerDocument;
			}
			var child = node.firstChild;
			while (child) {
				_updateOwnerDocument(child, newOwnerDocument);
				child = child.nextSibling;
			}
		}
		/**
		* Appends `newChild` to `parentNode`.
		* If `newChild` is already connected to a `parentNode` it is first removed from it.
		*
		* @see https://github.com/xmldom/xmldom/issues/135
		* @see https://github.com/xmldom/xmldom/issues/145
		* @param {Node} parentNode
		* @param {Node} newChild
		* @returns {Node}
		* @private
		*/
		function _appendSingleChild(parentNode, newChild) {
			if (newChild.parentNode) newChild.parentNode.removeChild(newChild);
			newChild.parentNode = parentNode;
			newChild.previousSibling = parentNode.lastChild;
			newChild.nextSibling = null;
			if (newChild.previousSibling) newChild.previousSibling.nextSibling = newChild;
			else parentNode.firstChild = newChild;
			parentNode.lastChild = newChild;
			_onUpdateChild(parentNode.ownerDocument, parentNode, newChild);
			_updateOwnerDocument(newChild, parentNode.ownerDocument || parentNode);
			return newChild;
		}
		Document.prototype = {
			nodeName: "#document",
			nodeType: DOCUMENT_NODE,
			/**
			* The DocumentType node of the document.
			*
			* @readonly
			* @type DocumentType
			*/
			doctype: null,
			documentElement: null,
			_inc: 1,
			insertBefore: function(newChild, refChild) {
				if (newChild.nodeType == DOCUMENT_FRAGMENT_NODE) {
					var child = newChild.firstChild;
					while (child) {
						var next = child.nextSibling;
						this.insertBefore(child, refChild);
						child = next;
					}
					return newChild;
				}
				_insertBefore(this, newChild, refChild);
				_updateOwnerDocument(newChild, this);
				if (this.documentElement === null && newChild.nodeType === ELEMENT_NODE) this.documentElement = newChild;
				return newChild;
			},
			removeChild: function(oldChild) {
				if (this.documentElement == oldChild) this.documentElement = null;
				return _removeChild(this, oldChild);
			},
			replaceChild: function(newChild, oldChild) {
				_insertBefore(this, newChild, oldChild, assertPreReplacementValidityInDocument);
				_updateOwnerDocument(newChild, this);
				if (oldChild) this.removeChild(oldChild);
				if (isElementNode(newChild)) this.documentElement = newChild;
			},
			importNode: function(importedNode, deep) {
				return importNode(this, importedNode, deep);
			},
			getElementById: function(id) {
				var rtv = null;
				_visitNode(this.documentElement, function(node) {
					if (node.nodeType == ELEMENT_NODE) {
						if (node.getAttribute("id") == id) {
							rtv = node;
							return true;
						}
					}
				});
				return rtv;
			},
			/**
			* The `getElementsByClassName` method of `Document` interface returns an array-like object
			* of all child elements which have **all** of the given class name(s).
			*
			* Returns an empty list if `classeNames` is an empty string or only contains HTML white space characters.
			*
			*
			* Warning: This is a live LiveNodeList.
			* Changes in the DOM will reflect in the array as the changes occur.
			* If an element selected by this array no longer qualifies for the selector,
			* it will automatically be removed. Be aware of this for iteration purposes.
			*
			* @param {string} classNames is a string representing the class name(s) to match; multiple class names are separated by (ASCII-)whitespace
			*
			* @see https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName
			* @see https://dom.spec.whatwg.org/#concept-getelementsbyclassname
			*/
			getElementsByClassName: function(classNames) {
				var classNamesSet = toOrderedSet(classNames);
				return new LiveNodeList(this, function(base) {
					var ls = [];
					if (classNamesSet.length > 0) _visitNode(base.documentElement, function(node) {
						if (node !== base && node.nodeType === ELEMENT_NODE) {
							var nodeClassNames = node.getAttribute("class");
							if (nodeClassNames) {
								var matches = classNames === nodeClassNames;
								if (!matches) {
									var nodeClassNamesSet = toOrderedSet(nodeClassNames);
									matches = classNamesSet.every(arrayIncludes(nodeClassNamesSet));
								}
								if (matches) ls.push(node);
							}
						}
					});
					return ls;
				});
			},
			createElement: function(tagName) {
				var node = new Element();
				node.ownerDocument = this;
				node.nodeName = tagName;
				node.tagName = tagName;
				node.localName = tagName;
				node.childNodes = new NodeList();
				var attrs = node.attributes = new NamedNodeMap();
				attrs._ownerElement = node;
				return node;
			},
			createDocumentFragment: function() {
				var node = new DocumentFragment();
				node.ownerDocument = this;
				node.childNodes = new NodeList();
				return node;
			},
			createTextNode: function(data) {
				var node = new Text();
				node.ownerDocument = this;
				node.appendData(data);
				return node;
			},
			createComment: function(data) {
				var node = new Comment();
				node.ownerDocument = this;
				node.appendData(data);
				return node;
			},
			/**
			* Returns a new CDATASection node whose data is `data`.
			*
			* __This implementation differs from the specification:__
			* - calling this method on an HTML document does not throw `NotSupportedError`.
			*
			* @param {string} data
			* @returns {CDATASection}
			* @throws DOMException with code `INVALID_CHARACTER_ERR` if `data` contains `"]]>"`.
			* @see https://developer.mozilla.org/en-US/docs/Web/API/Document/createCDATASection
			* @see https://dom.spec.whatwg.org/#dom-document-createcdatasection
			*/
			createCDATASection: function(data) {
				if (data.indexOf("]]>") !== -1) throw new DOMException(INVALID_CHARACTER_ERR, "data contains \"]]>\"");
				var node = new CDATASection();
				node.ownerDocument = this;
				node.appendData(data);
				return node;
			},
			/**
			* Returns a ProcessingInstruction node whose target is target and data is data.
			*
			* __This implementation differs from the specification:__
			* - it does not do any input validation on the arguments and doesn't throw "InvalidCharacterError".
			*
			* Note: When the resulting document is serialized with `requireWellFormed: true`, the
			* serializer throws with code `INVALID_STATE_ERR` if `.data` contains `?>` (W3C DOM Parsing
			* §3.2.1.7). Without that option the data is emitted verbatim.
			*
			* @param {string} target
			* @param {string} data
			* @returns {ProcessingInstruction}
			* @see https://developer.mozilla.org/docs/Web/API/Document/createProcessingInstruction
			* @see https://dom.spec.whatwg.org/#dom-document-createprocessinginstruction
			* @see https://www.w3.org/TR/DOM-Parsing/#dfn-concept-serialize-xml §3.2.1.7
			*/
			createProcessingInstruction: function(target, data) {
				var node = new ProcessingInstruction();
				node.ownerDocument = this;
				node.tagName = node.nodeName = node.target = target;
				node.nodeValue = node.data = data;
				return node;
			},
			createAttribute: function(name) {
				var node = new Attr();
				node.ownerDocument = this;
				node.name = name;
				node.nodeName = name;
				node.localName = name;
				node.specified = true;
				return node;
			},
			createEntityReference: function(name) {
				var node = new EntityReference();
				node.ownerDocument = this;
				node.nodeName = name;
				return node;
			},
			createElementNS: function(namespaceURI, qualifiedName) {
				var node = new Element();
				var pl = qualifiedName.split(":");
				var attrs = node.attributes = new NamedNodeMap();
				node.childNodes = new NodeList();
				node.ownerDocument = this;
				node.nodeName = qualifiedName;
				node.tagName = qualifiedName;
				node.namespaceURI = namespaceURI;
				if (pl.length == 2) {
					node.prefix = pl[0];
					node.localName = pl[1];
				} else node.localName = qualifiedName;
				attrs._ownerElement = node;
				return node;
			},
			createAttributeNS: function(namespaceURI, qualifiedName) {
				var node = new Attr();
				var pl = qualifiedName.split(":");
				node.ownerDocument = this;
				node.nodeName = qualifiedName;
				node.name = qualifiedName;
				node.namespaceURI = namespaceURI;
				node.specified = true;
				if (pl.length == 2) {
					node.prefix = pl[0];
					node.localName = pl[1];
				} else node.localName = qualifiedName;
				return node;
			}
		};
		_extends(Document, Node);
		function Element() {
			this._nsMap = {};
		}
		Element.prototype = {
			nodeType: ELEMENT_NODE,
			hasAttribute: function(name) {
				return this.getAttributeNode(name) != null;
			},
			getAttribute: function(name) {
				var attr = this.getAttributeNode(name);
				return attr && attr.value || "";
			},
			getAttributeNode: function(name) {
				return this.attributes.getNamedItem(name);
			},
			setAttribute: function(name, value) {
				var attr = this.ownerDocument.createAttribute(name);
				attr.value = attr.nodeValue = "" + value;
				this.setAttributeNode(attr);
			},
			removeAttribute: function(name) {
				var attr = this.getAttributeNode(name);
				attr && this.removeAttributeNode(attr);
			},
			appendChild: function(newChild) {
				if (newChild.nodeType === DOCUMENT_FRAGMENT_NODE) return this.insertBefore(newChild, null);
				else return _appendSingleChild(this, newChild);
			},
			setAttributeNode: function(newAttr) {
				return this.attributes.setNamedItem(newAttr);
			},
			setAttributeNodeNS: function(newAttr) {
				return this.attributes.setNamedItemNS(newAttr);
			},
			removeAttributeNode: function(oldAttr) {
				return this.attributes.removeNamedItem(oldAttr.nodeName);
			},
			removeAttributeNS: function(namespaceURI, localName) {
				var old = this.getAttributeNodeNS(namespaceURI, localName);
				old && this.removeAttributeNode(old);
			},
			hasAttributeNS: function(namespaceURI, localName) {
				return this.getAttributeNodeNS(namespaceURI, localName) != null;
			},
			getAttributeNS: function(namespaceURI, localName) {
				var attr = this.getAttributeNodeNS(namespaceURI, localName);
				return attr && attr.value || "";
			},
			setAttributeNS: function(namespaceURI, qualifiedName, value) {
				var attr = this.ownerDocument.createAttributeNS(namespaceURI, qualifiedName);
				attr.value = attr.nodeValue = "" + value;
				this.setAttributeNode(attr);
			},
			getAttributeNodeNS: function(namespaceURI, localName) {
				return this.attributes.getNamedItemNS(namespaceURI, localName);
			},
			getElementsByTagName: function(tagName) {
				return new LiveNodeList(this, function(base) {
					var ls = [];
					_visitNode(base, function(node) {
						if (node !== base && node.nodeType == ELEMENT_NODE && (tagName === "*" || node.tagName == tagName)) ls.push(node);
					});
					return ls;
				});
			},
			getElementsByTagNameNS: function(namespaceURI, localName) {
				return new LiveNodeList(this, function(base) {
					var ls = [];
					_visitNode(base, function(node) {
						if (node !== base && node.nodeType === ELEMENT_NODE && (namespaceURI === "*" || node.namespaceURI === namespaceURI) && (localName === "*" || node.localName == localName)) ls.push(node);
					});
					return ls;
				});
			}
		};
		Document.prototype.getElementsByTagName = Element.prototype.getElementsByTagName;
		Document.prototype.getElementsByTagNameNS = Element.prototype.getElementsByTagNameNS;
		_extends(Element, Node);
		function Attr() {}
		Attr.prototype.nodeType = ATTRIBUTE_NODE;
		_extends(Attr, Node);
		function CharacterData() {}
		CharacterData.prototype = {
			data: "",
			substringData: function(offset, count) {
				return this.data.substring(offset, offset + count);
			},
			appendData: function(text) {
				text = this.data + text;
				this.nodeValue = this.data = text;
				this.length = text.length;
			},
			insertData: function(offset, text) {
				this.replaceData(offset, 0, text);
			},
			appendChild: function(newChild) {
				throw new Error(ExceptionMessage[HIERARCHY_REQUEST_ERR]);
			},
			deleteData: function(offset, count) {
				this.replaceData(offset, count, "");
			},
			replaceData: function(offset, count, text) {
				var start = this.data.substring(0, offset);
				var end = this.data.substring(offset + count);
				text = start + text + end;
				this.nodeValue = this.data = text;
				this.length = text.length;
			}
		};
		_extends(CharacterData, Node);
		function Text() {}
		Text.prototype = {
			nodeName: "#text",
			nodeType: TEXT_NODE,
			splitText: function(offset) {
				var text = this.data;
				var newText = text.substring(offset);
				text = text.substring(0, offset);
				this.data = this.nodeValue = text;
				this.length = text.length;
				var newNode = this.ownerDocument.createTextNode(newText);
				if (this.parentNode) this.parentNode.insertBefore(newNode, this.nextSibling);
				return newNode;
			}
		};
		_extends(Text, CharacterData);
		function Comment() {}
		Comment.prototype = {
			nodeName: "#comment",
			nodeType: COMMENT_NODE
		};
		_extends(Comment, CharacterData);
		function CDATASection() {}
		CDATASection.prototype = {
			nodeName: "#cdata-section",
			nodeType: CDATA_SECTION_NODE
		};
		_extends(CDATASection, CharacterData);
		/**
		* Represents a DocumentType node (the `<!DOCTYPE ...>` declaration).
		*
		* `publicId`, `systemId`, and `internalSubset` are plain own-property assignments.
		* xmldom does not enforce the `readonly` constraint declared by the WHATWG DOM spec —
		* direct property writes succeed silently. Values are serialized verbatim when
		* `requireWellFormed` is false (the default). When the serializer is invoked with
		* `requireWellFormed: true` (via the 4th-parameter options object), it validates each
		* field and throws `DOMException` with code `INVALID_STATE_ERR` on invalid values.
		*
		* @class
		* @see https://developer.mozilla.org/en-US/docs/Web/API/DocumentType MDN
		*/
		function DocumentType() {}
		DocumentType.prototype.nodeType = DOCUMENT_TYPE_NODE;
		_extends(DocumentType, Node);
		function Notation() {}
		Notation.prototype.nodeType = NOTATION_NODE;
		_extends(Notation, Node);
		function Entity() {}
		Entity.prototype.nodeType = ENTITY_NODE;
		_extends(Entity, Node);
		function EntityReference() {}
		EntityReference.prototype.nodeType = ENTITY_REFERENCE_NODE;
		_extends(EntityReference, Node);
		function DocumentFragment() {}
		DocumentFragment.prototype.nodeName = "#document-fragment";
		DocumentFragment.prototype.nodeType = DOCUMENT_FRAGMENT_NODE;
		_extends(DocumentFragment, Node);
		function ProcessingInstruction() {}
		ProcessingInstruction.prototype.nodeType = PROCESSING_INSTRUCTION_NODE;
		_extends(ProcessingInstruction, Node);
		function XMLSerializer() {}
		/**
		* Returns the result of serializing `node` to XML.
		*
		* When `options.requireWellFormed` is `true`, the serializer throws for content that would
		* produce ill-formed XML.
		*
		* __This implementation differs from the specification:__
		* - CDATASection nodes whose data contains `]]>` are serialized by splitting the section
		*   at each `]]>` occurrence (following W3C DOM Level 3 Core `split-cdata-sections`
		*   default behaviour) unless `requireWellFormed` is `true`.
		* - when `requireWellFormed` is `true`, `DOMException` with code `INVALID_STATE_ERR`
		*   is only thrown to prevent injection vectors, not for all the spec mandated checks.
		*
		* @param {Node} node
		* @param {boolean} [isHtml]
		* @param {function} [nodeFilter]
		* @param {Object} [options]
		* @param {boolean} [options.requireWellFormed=false]
		* When `true`, throws for content that would produce ill-formed XML.
		* @returns {string}
		* @throws {DOMException}
		* With code `INVALID_STATE_ERR` when `requireWellFormed` is `true` and:
		* - a CDATASection node's data contains `"]]>"`,
		* - a Comment node's data contains `"-->"` (bare `"--"` does not throw on this branch),
		* - a ProcessingInstruction's data contains `"?>"`,
		* - a DocumentType's `publicId` is non-empty and does not match the XML `PubidLiteral`
		*   production,
		* - a DocumentType's `systemId` is non-empty and does not match the XML `SystemLiteral`
		*   production, or
		* - a DocumentType's `internalSubset` contains `"]>"`.
		* Note: xmldom does not enforce `readonly` on DocumentType fields — direct property
		* writes succeed and are covered by the serializer-level checks above.
		* @see https://html.spec.whatwg.org/#dom-xmlserializer-serializetostring
		* @see https://w3c.github.io/DOM-Parsing/#xml-serialization
		* @see https://github.com/w3c/DOM-Parsing/issues/84
		*/
		XMLSerializer.prototype.serializeToString = function(node, isHtml, nodeFilter, options) {
			return nodeSerializeToString.call(node, isHtml, nodeFilter, options);
		};
		Node.prototype.toString = nodeSerializeToString;
		function nodeSerializeToString(isHtml, nodeFilter, options) {
			var requireWellFormed = !!options && !!options.requireWellFormed;
			var buf = [];
			var refNode = this.nodeType == 9 && this.documentElement || this;
			var prefix = refNode.prefix;
			var uri = refNode.namespaceURI;
			if (uri && prefix == null) {
				var prefix = refNode.lookupPrefix(uri);
				if (prefix == null) var visibleNamespaces = [{
					namespace: uri,
					prefix: null
				}];
			}
			serializeToString(this, buf, isHtml, nodeFilter, visibleNamespaces, requireWellFormed);
			return buf.join("");
		}
		function needNamespaceDefine(node, isHTML, visibleNamespaces) {
			var prefix = node.prefix || "";
			var uri = node.namespaceURI;
			if (!uri) return false;
			if (prefix === "xml" && uri === NAMESPACE.XML || uri === NAMESPACE.XMLNS) return false;
			var i = visibleNamespaces.length;
			while (i--) {
				var ns = visibleNamespaces[i];
				if (ns.prefix === prefix) return ns.namespace !== uri;
			}
			return true;
		}
		/**
		* Well-formed constraint: No < in Attribute Values
		* > The replacement text of any entity referred to directly or indirectly
		* > in an attribute value must not contain a <.
		* @see https://www.w3.org/TR/xml11/#CleanAttrVals
		* @see https://www.w3.org/TR/xml11/#NT-AttValue
		*
		* Literal whitespace other than space that appear in attribute values
		* are serialized as their entity references, so they will be preserved.
		* (In contrast to whitespace literals in the input which are normalized to spaces)
		* @see https://www.w3.org/TR/xml11/#AVNormalize
		* @see https://w3c.github.io/DOM-Parsing/#serializing-an-element-s-attributes
		*/
		function addSerializedAttribute(buf, qualifiedName, value) {
			buf.push(" ", qualifiedName, "=\"", value.replace(/[<>&"\t\n\r]/g, _xmlEncoder), "\"");
		}
		function serializeToString(node, buf, isHTML, nodeFilter, visibleNamespaces, requireWellFormed) {
			if (!visibleNamespaces) visibleNamespaces = [];
			walkDOM(node, {
				ns: visibleNamespaces,
				isHTML
			}, {
				enter: function(n, ctx) {
					var ns = ctx.ns;
					var html = ctx.isHTML;
					if (nodeFilter) {
						n = nodeFilter(n);
						if (n) {
							if (typeof n == "string") {
								buf.push(n);
								return null;
							}
						} else return null;
					}
					switch (n.nodeType) {
						case ELEMENT_NODE:
							var attrs = n.attributes;
							var len = attrs.length;
							var nodeName = n.tagName;
							html = NAMESPACE.isHTML(n.namespaceURI) || html;
							var prefixedNodeName = nodeName;
							if (!html && !n.prefix && n.namespaceURI) {
								var defaultNS;
								for (var ai = 0; ai < attrs.length; ai++) if (attrs.item(ai).name === "xmlns") {
									defaultNS = attrs.item(ai).value;
									break;
								}
								if (!defaultNS) for (var nsi = ns.length - 1; nsi >= 0; nsi--) {
									var nsEntry = ns[nsi];
									if (nsEntry.prefix === "" && nsEntry.namespace === n.namespaceURI) {
										defaultNS = nsEntry.namespace;
										break;
									}
								}
								if (defaultNS !== n.namespaceURI) for (var nsi = ns.length - 1; nsi >= 0; nsi--) {
									var nsEntry = ns[nsi];
									if (nsEntry.namespace === n.namespaceURI) {
										if (nsEntry.prefix) prefixedNodeName = nsEntry.prefix + ":" + nodeName;
										break;
									}
								}
							}
							buf.push("<", prefixedNodeName);
							var childNs = ns.slice();
							for (var i = 0; i < len; i++) {
								var attr = attrs.item(i);
								if (attr.prefix == "xmlns") childNs.push({
									prefix: attr.localName,
									namespace: attr.value
								});
								else if (attr.nodeName == "xmlns") childNs.push({
									prefix: "",
									namespace: attr.value
								});
							}
							for (var i = 0; i < len; i++) {
								var attr = attrs.item(i);
								if (needNamespaceDefine(attr, html, childNs)) {
									var attrPrefix = attr.prefix || "";
									var uri = attr.namespaceURI;
									addSerializedAttribute(buf, attrPrefix ? "xmlns:" + attrPrefix : "xmlns", uri);
									childNs.push({
										prefix: attrPrefix,
										namespace: uri
									});
								}
								var filteredAttr = nodeFilter ? nodeFilter(attr) : attr;
								if (filteredAttr) if (typeof filteredAttr === "string") buf.push(filteredAttr);
								else addSerializedAttribute(buf, filteredAttr.name, filteredAttr.value);
							}
							if (nodeName === prefixedNodeName && needNamespaceDefine(n, html, childNs)) {
								var nodePrefix = n.prefix || "";
								var uri = n.namespaceURI;
								addSerializedAttribute(buf, nodePrefix ? "xmlns:" + nodePrefix : "xmlns", uri);
								childNs.push({
									prefix: nodePrefix,
									namespace: uri
								});
							}
							var child = n.firstChild;
							if (child || html && !/^(?:meta|link|img|br|hr|input)$/i.test(nodeName)) {
								buf.push(">");
								if (html && /^script$/i.test(nodeName)) {
									while (child) {
										if (child.data) buf.push(child.data);
										else serializeToString(child, buf, html, nodeFilter, childNs.slice(), requireWellFormed);
										child = child.nextSibling;
									}
									buf.push("</", nodeName, ">");
									return null;
								}
								return {
									ns: childNs,
									isHTML: html,
									tag: prefixedNodeName
								};
							} else {
								buf.push("/>");
								return null;
							}
						case DOCUMENT_NODE:
						case DOCUMENT_FRAGMENT_NODE: return {
							ns: ns.slice(),
							isHTML: html,
							tag: null
						};
						case ATTRIBUTE_NODE:
							addSerializedAttribute(buf, n.name, n.value);
							return null;
						case TEXT_NODE:
							/**
							* The ampersand character (&) and the left angle bracket (<) must not appear in their literal form,
							* except when used as markup delimiters, or within a comment, a processing instruction, or a CDATA section.
							* If they are needed elsewhere, they must be escaped using either numeric character references or the strings
							* `&amp;` and `&lt;` respectively.
							* The right angle bracket (>) may be represented using the string " &gt; ", and must, for compatibility,
							* be escaped using either `&gt;` or a character reference when it appears in the string `]]>` in content,
							* when that string is not marking the end of a CDATA section.
							*
							* In the content of elements, character data is any string of characters
							* which does not contain the start-delimiter of any markup
							* and does not include the CDATA-section-close delimiter, `]]>`.
							*
							* @see https://www.w3.org/TR/xml/#NT-CharData
							* @see https://w3c.github.io/DOM-Parsing/#xml-serializing-a-text-node
							*/
							buf.push(n.data.replace(/[<&>]/g, _xmlEncoder));
							return null;
						case CDATA_SECTION_NODE:
							if (requireWellFormed && n.data.indexOf("]]>") !== -1) throw new DOMException(INVALID_STATE_ERR, "The CDATASection data contains \"]]>\"");
							buf.push("<![CDATA[", n.data.replace(/]]>/g, "]]]]><![CDATA[>"), "]]>");
							return null;
						case COMMENT_NODE:
							if (requireWellFormed && n.data.indexOf("-->") !== -1) throw new DOMException(INVALID_STATE_ERR, "The comment node data contains \"-->\"");
							buf.push("<!--", n.data, "-->");
							return null;
						case DOCUMENT_TYPE_NODE:
							if (requireWellFormed) {
								if (n.publicId && !/^("[\x20\r\na-zA-Z0-9\-()+,.\/:=?;!*#@$_%']*"|'[\x20\r\na-zA-Z0-9\-()+,.\/:=?;!*#@$_%'"]*')$/.test(n.publicId)) throw new DOMException(INVALID_STATE_ERR, "DocumentType publicId is not a valid PubidLiteral");
								if (n.systemId && !/^("[^"]*"|'[^']*')$/.test(n.systemId)) throw new DOMException(INVALID_STATE_ERR, "DocumentType systemId is not a valid SystemLiteral");
								if (n.internalSubset && n.internalSubset.indexOf("]>") !== -1) throw new DOMException(INVALID_STATE_ERR, "DocumentType internalSubset contains \"]>\"");
							}
							var pubid = n.publicId;
							var sysid = n.systemId;
							buf.push("<!DOCTYPE ", n.name);
							if (pubid) {
								buf.push(" PUBLIC ", pubid);
								if (sysid && sysid != ".") buf.push(" ", sysid);
								buf.push(">");
							} else if (sysid && sysid != ".") buf.push(" SYSTEM ", sysid, ">");
							else {
								var sub = n.internalSubset;
								if (sub) buf.push(" [", sub, "]");
								buf.push(">");
							}
							return null;
						case PROCESSING_INSTRUCTION_NODE:
							if (requireWellFormed && n.data.indexOf("?>") !== -1) throw new DOMException(INVALID_STATE_ERR, "The ProcessingInstruction data contains \"?>\"");
							buf.push("<?", n.target, " ", n.data, "?>");
							return null;
						case ENTITY_REFERENCE_NODE:
							buf.push("&", n.nodeName, ";");
							return null;
						default:
							buf.push("??", n.nodeName);
							return null;
					}
				},
				exit: function(n, childCtx) {
					if (childCtx && childCtx.tag) buf.push("</", childCtx.tag, ">");
				}
			});
		}
		/**
		* Imports a node from a different document into `doc`, creating a new copy.
		* Delegates to {@link walkDOM} for traversal. Each node in the subtree is shallow-cloned,
		* stamped with `doc` as its `ownerDocument`, and detached (`parentNode` set to `null`).
		* Children are imported recursively when `deep` is `true`; for {@link Attr} nodes `deep` is
		* always forced to `true`
		* because an attribute's value lives in a child text node.
		*
		* @param {Document} doc
		* The document that will own the imported node.
		* @param {Node} node
		* The node to import.
		* @param {boolean} deep
		* If `true`, descendants are imported recursively.
		* @returns {Node}
		* The newly imported node, now owned by `doc`.
		*/
		function importNode(doc, node, deep) {
			var destRoot;
			walkDOM(node, null, { enter: function(srcNode, destParent) {
				var destNode = srcNode.cloneNode(false);
				destNode.ownerDocument = doc;
				destNode.parentNode = null;
				if (destParent === null) destRoot = destNode;
				else destParent.appendChild(destNode);
				return srcNode.nodeType === ATTRIBUTE_NODE || deep ? destNode : null;
			} });
			return destRoot;
		}
		function cloneNode(doc, node, deep) {
			var destRoot;
			walkDOM(node, null, { enter: function(srcNode, destParent) {
				var destNode = new srcNode.constructor();
				for (var n in srcNode) if (Object.prototype.hasOwnProperty.call(srcNode, n)) {
					var v = srcNode[n];
					if (typeof v != "object") {
						if (v != destNode[n]) destNode[n] = v;
					}
				}
				if (srcNode.childNodes) destNode.childNodes = new NodeList();
				destNode.ownerDocument = doc;
				var shouldDeep = deep;
				switch (destNode.nodeType) {
					case ELEMENT_NODE:
						var attrs = srcNode.attributes;
						var attrs2 = destNode.attributes = new NamedNodeMap();
						var len = attrs.length;
						attrs2._ownerElement = destNode;
						for (var i = 0; i < len; i++) destNode.setAttributeNode(cloneNode(doc, attrs.item(i), true));
						break;
					case ATTRIBUTE_NODE: shouldDeep = true;
				}
				if (destParent !== null) destParent.appendChild(destNode);
				else destRoot = destNode;
				return shouldDeep ? destNode : null;
			} });
			return destRoot;
		}
		function __set__(object, key, value) {
			object[key] = value;
		}
		try {
			if (Object.defineProperty) {
				Object.defineProperty(LiveNodeList.prototype, "length", { get: function() {
					_updateLiveList(this);
					return this.$$length;
				} });
				/**
				* The text content of this node and its descendants.
				*
				* Setting `textContent` on an element or document fragment replaces all child nodes with a
				* single text node; on other nodes it sets `data`, `value`, and `nodeValue` directly.
				*
				* @type {string | null}
				* @see {@link https://dom.spec.whatwg.org/#dom-node-textcontent}
				*/
				Object.defineProperty(Node.prototype, "textContent", {
					get: function() {
						if (this.nodeType === ELEMENT_NODE || this.nodeType === DOCUMENT_FRAGMENT_NODE) {
							var buf = [];
							walkDOM(this, null, { enter: function(n) {
								if (n.nodeType === ELEMENT_NODE || n.nodeType === DOCUMENT_FRAGMENT_NODE) return true;
								if (n.nodeType === PROCESSING_INSTRUCTION_NODE || n.nodeType === COMMENT_NODE) return null;
								buf.push(n.nodeValue);
							} });
							return buf.join("");
						}
						return this.nodeValue;
					},
					set: function(data) {
						switch (this.nodeType) {
							case ELEMENT_NODE:
							case DOCUMENT_FRAGMENT_NODE:
								while (this.firstChild) this.removeChild(this.firstChild);
								if (data || String(data)) this.appendChild(this.ownerDocument.createTextNode(data));
								break;
							default:
								this.data = data;
								this.value = data;
								this.nodeValue = data;
						}
					}
				});
				__set__ = function(object, key, value) {
					object["$$" + key] = value;
				};
			}
		} catch (e) {}
		exports.DocumentType = DocumentType;
		exports.DOMException = DOMException;
		exports.DOMImplementation = DOMImplementation;
		exports.Element = Element;
		exports.Node = Node;
		exports.NodeList = NodeList;
		exports.walkDOM = walkDOM;
		exports.XMLSerializer = XMLSerializer;
	}));
	//#endregion
	//#region node_modules/@xmldom/xmldom/lib/entities.js
	var require_entities = /* @__PURE__ */ __commonJSMin(((exports) => {
		var freeze = require_conventions().freeze;
		/**
		* The entities that are predefined in every XML document.
		*
		* @see https://www.w3.org/TR/2006/REC-xml11-20060816/#sec-predefined-ent W3C XML 1.1
		* @see https://www.w3.org/TR/2008/REC-xml-20081126/#sec-predefined-ent W3C XML 1.0
		* @see https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references#Predefined_entities_in_XML Wikipedia
		*/
		exports.XML_ENTITIES = freeze({
			amp: "&",
			apos: "'",
			gt: ">",
			lt: "<",
			quot: "\""
		});
		/**
		* A map of all entities that are detected in an HTML document.
		* They contain all entries from `XML_ENTITIES`.
		*
		* @see XML_ENTITIES
		* @see DOMParser.parseFromString
		* @see DOMImplementation.prototype.createHTMLDocument
		* @see https://html.spec.whatwg.org/#named-character-references WHATWG HTML(5) Spec
		* @see https://html.spec.whatwg.org/entities.json JSON
		* @see https://www.w3.org/TR/xml-entity-names/ W3C XML Entity Names
		* @see https://www.w3.org/TR/html4/sgml/entities.html W3C HTML4/SGML
		* @see https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references#Character_entity_references_in_HTML Wikipedia (HTML)
		* @see https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references#Entities_representing_special_characters_in_XHTML Wikpedia (XHTML)
		*/
		exports.HTML_ENTITIES = freeze({
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
		});
		/**
		* @deprecated use `HTML_ENTITIES` instead
		* @see HTML_ENTITIES
		*/
		exports.entityMap = exports.HTML_ENTITIES;
	}));
	//#endregion
	//#region node_modules/@xmldom/xmldom/lib/sax.js
	var require_sax = /* @__PURE__ */ __commonJSMin(((exports) => {
		var NAMESPACE = require_conventions().NAMESPACE;
		var nameStartChar = /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
		var nameChar = new RegExp("[\\-\\.0-9" + nameStartChar.source.slice(1, -1) + "\\u00B7\\u0300-\\u036F\\u203F-\\u2040]");
		var tagNamePattern = new RegExp("^" + nameStartChar.source + nameChar.source + "*(?::" + nameStartChar.source + nameChar.source + "*)?$");
		var S_TAG = 0;
		var S_ATTR = 1;
		var S_ATTR_SPACE = 2;
		var S_EQ = 3;
		var S_ATTR_NOQUOT_VALUE = 4;
		var S_ATTR_END = 5;
		var S_TAG_SPACE = 6;
		var S_TAG_CLOSE = 7;
		/**
		* Creates an error that will not be caught by XMLReader aka the SAX parser.
		*
		* @param {string} message
		* @param {any?} locator Optional, can provide details about the location in the source
		* @constructor
		*/
		function ParseError(message, locator) {
			this.message = message;
			this.locator = locator;
			if (Error.captureStackTrace) Error.captureStackTrace(this, ParseError);
		}
		ParseError.prototype = /* @__PURE__ */ new Error();
		ParseError.prototype.name = ParseError.name;
		function XMLReader() {}
		XMLReader.prototype = { parse: function(source, defaultNSMap, entityMap) {
			var domBuilder = this.domBuilder;
			domBuilder.startDocument();
			_copy(defaultNSMap, defaultNSMap = {});
			parse(source, defaultNSMap, entityMap, domBuilder, this.errorHandler);
			domBuilder.endDocument();
		} };
		function parse(source, defaultNSMapCopy, entityMap, domBuilder, errorHandler) {
			function fixedFromCharCode(code) {
				if (code > 65535) {
					code -= 65536;
					var surrogate1 = 55296 + (code >> 10), surrogate2 = 56320 + (code & 1023);
					return String.fromCharCode(surrogate1, surrogate2);
				} else return String.fromCharCode(code);
			}
			function entityReplacer(a) {
				var k = a.slice(1, -1);
				if (Object.hasOwnProperty.call(entityMap, k)) return entityMap[k];
				else if (k.charAt(0) === "#") return fixedFromCharCode(parseInt(k.substr(1).replace("x", "0x")));
				else {
					errorHandler.error("entity not found:" + a);
					return a;
				}
			}
			function appendText(end) {
				if (end > start) {
					var xt = source.substring(start, end).replace(/&#?\w+;/g, entityReplacer);
					locator && position(start);
					domBuilder.characters(xt, 0, end - start);
					start = end;
				}
			}
			function position(p, m) {
				while (p >= lineEnd && (m = linePattern.exec(source))) {
					lineStart = m.index;
					lineEnd = lineStart + m[0].length;
					locator.lineNumber++;
				}
				locator.columnNumber = p - lineStart + 1;
			}
			var lineStart = 0;
			var lineEnd = 0;
			var linePattern = /.*(?:\r\n?|\n)|.*$/g;
			var locator = domBuilder.locator;
			var parseStack = [{ currentNSMap: defaultNSMapCopy }];
			var closeMap = {};
			var start = 0;
			while (true) {
				try {
					var tagStart = source.indexOf("<", start);
					if (tagStart < 0) {
						if (!source.substr(start).match(/^\s*$/)) {
							var doc = domBuilder.doc;
							var text = doc.createTextNode(source.substr(start));
							doc.appendChild(text);
							domBuilder.currentElement = text;
						}
						return;
					}
					if (tagStart > start) appendText(tagStart);
					switch (source.charAt(tagStart + 1)) {
						case "/":
							var end = source.indexOf(">", tagStart + 3);
							var tagName = source.substring(tagStart + 2, end).replace(/[ \t\n\r]+$/g, "");
							var config = parseStack.pop();
							if (end < 0) {
								tagName = source.substring(tagStart + 2).replace(/[\s<].*/, "");
								errorHandler.error("end tag name: " + tagName + " is not complete:" + config.tagName);
								end = tagStart + 1 + tagName.length;
							} else if (tagName.match(/\s</)) {
								tagName = tagName.replace(/[\s<].*/, "");
								errorHandler.error("end tag name: " + tagName + " maybe not complete");
								end = tagStart + 1 + tagName.length;
							}
							var localNSMap = config.localNSMap;
							var endMatch = config.tagName == tagName;
							if (endMatch || config.tagName && config.tagName.toLowerCase() == tagName.toLowerCase()) {
								domBuilder.endElement(config.uri, config.localName, tagName);
								if (localNSMap) {
									for (var prefix in localNSMap) if (Object.prototype.hasOwnProperty.call(localNSMap, prefix)) domBuilder.endPrefixMapping(prefix);
								}
								if (!endMatch) errorHandler.fatalError("end tag name: " + tagName + " is not match the current start tagName:" + config.tagName);
							} else parseStack.push(config);
							end++;
							break;
						case "?":
							locator && position(tagStart);
							end = parseInstruction(source, tagStart, domBuilder);
							break;
						case "!":
							locator && position(tagStart);
							end = parseDCC(source, tagStart, domBuilder, errorHandler);
							break;
						default:
							locator && position(tagStart);
							var el = new ElementAttributes();
							var currentNSMap = parseStack[parseStack.length - 1].currentNSMap;
							var end = parseElementStartPart(source, tagStart, el, currentNSMap, entityReplacer, errorHandler);
							var len = el.length;
							if (!el.closed && fixSelfClosed(source, end, el.tagName, closeMap)) {
								el.closed = true;
								if (!entityMap.nbsp) errorHandler.warning("unclosed xml attribute");
							}
							if (locator && len) {
								var locator2 = copyLocator(locator, {});
								for (var i = 0; i < len; i++) {
									var a = el[i];
									position(a.offset);
									a.locator = copyLocator(locator, {});
								}
								domBuilder.locator = locator2;
								if (appendElement(el, domBuilder, currentNSMap)) parseStack.push(el);
								domBuilder.locator = locator;
							} else if (appendElement(el, domBuilder, currentNSMap)) parseStack.push(el);
							if (NAMESPACE.isHTML(el.uri) && !el.closed) end = parseHtmlSpecialContent(source, end, el.tagName, entityReplacer, domBuilder);
							else end++;
					}
				} catch (e) {
					if (e instanceof ParseError) throw e;
					errorHandler.error("element parse error: " + e);
					end = -1;
				}
				if (end > start) start = end;
				else appendText(Math.max(tagStart, start) + 1);
			}
		}
		function copyLocator(f, t) {
			t.lineNumber = f.lineNumber;
			t.columnNumber = f.columnNumber;
			return t;
		}
		/**
		* @see #appendElement(source,elStartEnd,el,selfClosed,entityReplacer,domBuilder,parseStack);
		* @return end of the elementStartPart(end of elementEndPart for selfClosed el)
		*/
		function parseElementStartPart(source, start, el, currentNSMap, entityReplacer, errorHandler) {
			/**
			* @param {string} qname
			* @param {string} value
			* @param {number} startIndex
			*/
			function addAttribute(qname, value, startIndex) {
				if (el.attributeNames.hasOwnProperty(qname)) errorHandler.fatalError("Attribute " + qname + " redefined");
				el.addValue(qname, value.replace(/[\t\n\r]/g, " ").replace(/&#?\w+;/g, entityReplacer), startIndex);
			}
			var attrName;
			var value;
			var p = ++start;
			var s = S_TAG;
			while (true) {
				var c = source.charAt(p);
				switch (c) {
					case "=":
						if (s === S_ATTR) {
							attrName = source.slice(start, p);
							s = S_EQ;
						} else if (s === S_ATTR_SPACE) s = S_EQ;
						else throw new Error("attribute equal must after attrName");
						break;
					case "'":
					case "\"":
						if (s === S_EQ || s === S_ATTR) {
							if (s === S_ATTR) {
								errorHandler.warning("attribute value must after \"=\"");
								attrName = source.slice(start, p);
							}
							start = p + 1;
							p = source.indexOf(c, start);
							if (p > 0) {
								value = source.slice(start, p);
								addAttribute(attrName, value, start - 1);
								s = S_ATTR_END;
							} else throw new Error("attribute value no end '" + c + "' match");
						} else if (s == S_ATTR_NOQUOT_VALUE) {
							value = source.slice(start, p);
							addAttribute(attrName, value, start);
							errorHandler.warning("attribute \"" + attrName + "\" missed start quot(" + c + ")!!");
							start = p + 1;
							s = S_ATTR_END;
						} else throw new Error("attribute value must after \"=\"");
						break;
					case "/":
						switch (s) {
							case S_TAG: el.setTagName(source.slice(start, p));
							case S_ATTR_END:
							case S_TAG_SPACE:
							case S_TAG_CLOSE:
								s = S_TAG_CLOSE;
								el.closed = true;
							case S_ATTR_NOQUOT_VALUE:
							case S_ATTR: break;
							case S_ATTR_SPACE:
								el.closed = true;
								break;
							default: throw new Error("attribute invalid close char('/')");
						}
						break;
					case "":
						errorHandler.error("unexpected end of input");
						if (s == S_TAG) el.setTagName(source.slice(start, p));
						return p;
					case ">":
						switch (s) {
							case S_TAG: el.setTagName(source.slice(start, p));
							case S_ATTR_END:
							case S_TAG_SPACE:
							case S_TAG_CLOSE: break;
							case S_ATTR_NOQUOT_VALUE:
							case S_ATTR:
								value = source.slice(start, p);
								if (value.slice(-1) === "/") {
									el.closed = true;
									value = value.slice(0, -1);
								}
							case S_ATTR_SPACE:
								if (s === S_ATTR_SPACE) value = attrName;
								if (s == S_ATTR_NOQUOT_VALUE) {
									errorHandler.warning("attribute \"" + value + "\" missed quot(\")!");
									addAttribute(attrName, value, start);
								} else {
									if (!NAMESPACE.isHTML(currentNSMap[""]) || !value.match(/^(?:disabled|checked|selected)$/i)) errorHandler.warning("attribute \"" + value + "\" missed value!! \"" + value + "\" instead!!");
									addAttribute(value, value, start);
								}
								break;
							case S_EQ: throw new Error("attribute value missed!!");
						}
						return p;
					case "": c = " ";
					default: if (c <= " ") switch (s) {
						case S_TAG:
							el.setTagName(source.slice(start, p));
							s = S_TAG_SPACE;
							break;
						case S_ATTR:
							attrName = source.slice(start, p);
							s = S_ATTR_SPACE;
							break;
						case S_ATTR_NOQUOT_VALUE:
							var value = source.slice(start, p);
							errorHandler.warning("attribute \"" + value + "\" missed quot(\")!!");
							addAttribute(attrName, value, start);
						case S_ATTR_END:
							s = S_TAG_SPACE;
							break;
					}
					else switch (s) {
						case S_ATTR_SPACE:
							el.tagName;
							if (!NAMESPACE.isHTML(currentNSMap[""]) || !attrName.match(/^(?:disabled|checked|selected)$/i)) errorHandler.warning("attribute \"" + attrName + "\" missed value!! \"" + attrName + "\" instead2!!");
							addAttribute(attrName, attrName, start);
							start = p;
							s = S_ATTR;
							break;
						case S_ATTR_END: errorHandler.warning("attribute space is required\"" + attrName + "\"!!");
						case S_TAG_SPACE:
							s = S_ATTR;
							start = p;
							break;
						case S_EQ:
							s = S_ATTR_NOQUOT_VALUE;
							start = p;
							break;
						case S_TAG_CLOSE: throw new Error("elements closed character '/' and '>' must be connected to");
					}
				}
				p++;
			}
		}
		/**
		* @return true if has new namespace define
		*/
		function appendElement(el, domBuilder, currentNSMap) {
			var tagName = el.tagName;
			var localNSMap = null;
			var i = el.length;
			while (i--) {
				var a = el[i];
				var qName = a.qName;
				var value = a.value;
				var nsp = qName.indexOf(":");
				if (nsp > 0) {
					var prefix = a.prefix = qName.slice(0, nsp);
					var localName = qName.slice(nsp + 1);
					var nsPrefix = prefix === "xmlns" && localName;
				} else {
					localName = qName;
					prefix = null;
					nsPrefix = qName === "xmlns" && "";
				}
				a.localName = localName;
				if (nsPrefix !== false) {
					if (localNSMap == null) {
						localNSMap = {};
						_copy(currentNSMap, currentNSMap = {});
					}
					currentNSMap[nsPrefix] = localNSMap[nsPrefix] = value;
					a.uri = NAMESPACE.XMLNS;
					domBuilder.startPrefixMapping(nsPrefix, value);
				}
			}
			var i = el.length;
			while (i--) {
				a = el[i];
				var prefix = a.prefix;
				if (prefix) {
					if (prefix === "xml") a.uri = NAMESPACE.XML;
					if (prefix !== "xmlns") a.uri = currentNSMap[prefix || ""];
				}
			}
			var nsp = tagName.indexOf(":");
			if (nsp > 0) {
				prefix = el.prefix = tagName.slice(0, nsp);
				localName = el.localName = tagName.slice(nsp + 1);
			} else {
				prefix = null;
				localName = el.localName = tagName;
			}
			var ns = el.uri = currentNSMap[prefix || ""];
			domBuilder.startElement(ns, localName, tagName, el);
			if (el.closed) {
				domBuilder.endElement(ns, localName, tagName);
				if (localNSMap) {
					for (prefix in localNSMap) if (Object.prototype.hasOwnProperty.call(localNSMap, prefix)) domBuilder.endPrefixMapping(prefix);
				}
			} else {
				el.currentNSMap = currentNSMap;
				el.localNSMap = localNSMap;
				return true;
			}
		}
		function parseHtmlSpecialContent(source, elStartEnd, tagName, entityReplacer, domBuilder) {
			if (/^(?:script|textarea)$/i.test(tagName)) {
				var elEndStart = source.indexOf("</" + tagName + ">", elStartEnd);
				var text = source.substring(elStartEnd + 1, elEndStart);
				if (/[&<]/.test(text)) {
					if (/^script$/i.test(tagName)) {
						domBuilder.characters(text, 0, text.length);
						return elEndStart;
					}
					text = text.replace(/&#?\w+;/g, entityReplacer);
					domBuilder.characters(text, 0, text.length);
					return elEndStart;
				}
			}
			return elStartEnd + 1;
		}
		function fixSelfClosed(source, elStartEnd, tagName, closeMap) {
			var pos = closeMap[tagName];
			if (pos == null) {
				pos = source.lastIndexOf("</" + tagName + ">");
				if (pos < elStartEnd) pos = source.lastIndexOf("</" + tagName);
				closeMap[tagName] = pos;
			}
			return pos < elStartEnd;
		}
		function _copy(source, target) {
			for (var n in source) if (Object.prototype.hasOwnProperty.call(source, n)) target[n] = source[n];
		}
		function parseDCC(source, start, domBuilder, errorHandler) {
			switch (source.charAt(start + 2)) {
				case "-": if (source.charAt(start + 3) === "-") {
					var end = source.indexOf("-->", start + 4);
					if (end > start) {
						domBuilder.comment(source, start + 4, end - start - 4);
						return end + 3;
					} else {
						errorHandler.error("Unclosed comment");
						return -1;
					}
				} else return -1;
				default:
					if (source.substr(start + 3, 6) == "CDATA[") {
						var end = source.indexOf("]]>", start + 9);
						domBuilder.startCDATA();
						domBuilder.characters(source, start + 9, end - start - 9);
						domBuilder.endCDATA();
						return end + 3;
					}
					var matchs = split(source, start);
					var len = matchs.length;
					if (len > 1 && /!doctype/i.test(matchs[0][0])) {
						var name = matchs[1][0];
						var pubid = false;
						var sysid = false;
						if (len > 3) {
							if (/^public$/i.test(matchs[2][0])) {
								pubid = matchs[3][0];
								sysid = len > 4 && matchs[4][0];
							} else if (/^system$/i.test(matchs[2][0])) sysid = matchs[3][0];
						}
						var lastMatch = matchs[len - 1];
						domBuilder.startDTD(name, pubid, sysid);
						domBuilder.endDTD();
						return lastMatch.index + lastMatch[0].length;
					}
			}
			return -1;
		}
		function parseInstruction(source, start, domBuilder) {
			var end = source.indexOf("?>", start);
			if (end) {
				var match = source.substring(start, end).match(/^<\?(\S*)\s*([\s\S]*?)$/);
				if (match) {
					match[0].length;
					domBuilder.processingInstruction(match[1], match[2]);
					return end + 2;
				} else return -1;
			}
			return -1;
		}
		function ElementAttributes() {
			this.attributeNames = {};
		}
		ElementAttributes.prototype = {
			setTagName: function(tagName) {
				if (!tagNamePattern.test(tagName)) throw new Error("invalid tagName:" + tagName);
				this.tagName = tagName;
			},
			addValue: function(qName, value, offset) {
				if (!tagNamePattern.test(qName)) throw new Error("invalid attribute:" + qName);
				this.attributeNames[qName] = this.length;
				this[this.length++] = {
					qName,
					value,
					offset
				};
			},
			length: 0,
			getLocalName: function(i) {
				return this[i].localName;
			},
			getLocator: function(i) {
				return this[i].locator;
			},
			getQName: function(i) {
				return this[i].qName;
			},
			getURI: function(i) {
				return this[i].uri;
			},
			getValue: function(i) {
				return this[i].value;
			}
		};
		function split(source, start) {
			var match;
			var buf = [];
			var reg = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;
			reg.lastIndex = start;
			reg.exec(source);
			while (match = reg.exec(source)) {
				buf.push(match);
				if (match[1]) return buf;
			}
		}
		exports.XMLReader = XMLReader;
		exports.ParseError = ParseError;
	}));
	//#endregion
	//#region node_modules/@xmldom/xmldom/lib/dom-parser.js
	var require_dom_parser = /* @__PURE__ */ __commonJSMin(((exports) => {
		var conventions = require_conventions();
		var dom = require_dom();
		var entities = require_entities();
		var sax = require_sax();
		var DOMImplementation = dom.DOMImplementation;
		var NAMESPACE = conventions.NAMESPACE;
		var ParseError = sax.ParseError;
		var XMLReader = sax.XMLReader;
		/**
		* Normalizes line ending according to https://www.w3.org/TR/xml11/#sec-line-ends:
		*
		* > XML parsed entities are often stored in computer files which,
		* > for editing convenience, are organized into lines.
		* > These lines are typically separated by some combination
		* > of the characters CARRIAGE RETURN (#xD) and LINE FEED (#xA).
		* >
		* > To simplify the tasks of applications, the XML processor must behave
		* > as if it normalized all line breaks in external parsed entities (including the document entity)
		* > on input, before parsing, by translating all of the following to a single #xA character:
		* >
		* > 1. the two-character sequence #xD #xA
		* > 2. the two-character sequence #xD #x85
		* > 3. the single character #x85
		* > 4. the single character #x2028
		* > 5. any #xD character that is not immediately followed by #xA or #x85.
		*
		* @param {string} input
		* @returns {string}
		*/
		function normalizeLineEndings(input) {
			return input.replace(/\r[\n\u0085]/g, "\n").replace(/[\r\u0085\u2028]/g, "\n");
		}
		/**
		* @typedef Locator
		* @property {number} [columnNumber]
		* @property {number} [lineNumber]
		*/
		/**
		* @typedef DOMParserOptions
		* @property {DOMHandler} [domBuilder]
		* @property {Function} [errorHandler]
		* @property {(string) => string} [normalizeLineEndings] used to replace line endings before parsing
		* 						defaults to `normalizeLineEndings`
		* @property {Locator} [locator]
		* @property {Record<string, string>} [xmlns]
		*
		* @see normalizeLineEndings
		*/
		/**
		* The DOMParser interface provides the ability to parse XML or HTML source code
		* from a string into a DOM `Document`.
		*
		* _xmldom is different from the spec in that it allows an `options` parameter,
		* to override the default behavior._
		*
		* @param {DOMParserOptions} [options]
		* @constructor
		*
		* @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser
		* @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#dom-parsing-and-serialization
		*/
		function DOMParser(options) {
			this.options = options || { locator: {} };
		}
		DOMParser.prototype.parseFromString = function(source, mimeType) {
			var options = this.options;
			var sax = new XMLReader();
			var domBuilder = options.domBuilder || new DOMHandler();
			var errorHandler = options.errorHandler;
			var locator = options.locator;
			var defaultNSMap = options.xmlns || {};
			var isHTML = /\/x?html?$/.test(mimeType);
			var entityMap = isHTML ? entities.HTML_ENTITIES : entities.XML_ENTITIES;
			if (locator) domBuilder.setDocumentLocator(locator);
			sax.errorHandler = buildErrorHandler(errorHandler, domBuilder, locator);
			sax.domBuilder = options.domBuilder || domBuilder;
			if (isHTML) defaultNSMap[""] = NAMESPACE.HTML;
			defaultNSMap.xml = defaultNSMap.xml || NAMESPACE.XML;
			var normalize = options.normalizeLineEndings || normalizeLineEndings;
			if (source && typeof source === "string") sax.parse(normalize(source), defaultNSMap, entityMap);
			else sax.errorHandler.error("invalid doc source");
			return domBuilder.doc;
		};
		function buildErrorHandler(errorImpl, domBuilder, locator) {
			if (!errorImpl) {
				if (domBuilder instanceof DOMHandler) return domBuilder;
				errorImpl = domBuilder;
			}
			var errorHandler = {};
			var isCallback = errorImpl instanceof Function;
			locator = locator || {};
			function build(key) {
				var fn = errorImpl[key];
				if (!fn && isCallback) fn = errorImpl.length == 2 ? function(msg) {
					errorImpl(key, msg);
				} : errorImpl;
				errorHandler[key] = fn && function(msg) {
					fn("[xmldom " + key + "]	" + msg + _locator(locator));
				} || function() {};
			}
			build("warning");
			build("error");
			build("fatalError");
			return errorHandler;
		}
		/**
		* +ContentHandler+ErrorHandler
		* +LexicalHandler+EntityResolver2
		* -DeclHandler-DTDHandler
		*
		* DefaultHandler:EntityResolver, DTDHandler, ContentHandler, ErrorHandler
		* DefaultHandler2:DefaultHandler,LexicalHandler, DeclHandler, EntityResolver2
		* @link http://www.saxproject.org/apidoc/org/xml/sax/helpers/DefaultHandler.html
		*/
		function DOMHandler() {
			this.cdata = false;
		}
		function position(locator, node) {
			node.lineNumber = locator.lineNumber;
			node.columnNumber = locator.columnNumber;
		}
		/**
		* @see org.xml.sax.ContentHandler#startDocument
		* @link http://www.saxproject.org/apidoc/org/xml/sax/ContentHandler.html
		*/
		DOMHandler.prototype = {
			startDocument: function() {
				this.doc = new DOMImplementation().createDocument(null, null, null);
				if (this.locator) this.doc.documentURI = this.locator.systemId;
			},
			startElement: function(namespaceURI, localName, qName, attrs) {
				var doc = this.doc;
				var el = doc.createElementNS(namespaceURI, qName || localName);
				var len = attrs.length;
				appendElement(this, el);
				this.currentElement = el;
				this.locator && position(this.locator, el);
				for (var i = 0; i < len; i++) {
					var namespaceURI = attrs.getURI(i);
					var value = attrs.getValue(i);
					var qName = attrs.getQName(i);
					var attr = doc.createAttributeNS(namespaceURI, qName);
					this.locator && position(attrs.getLocator(i), attr);
					attr.value = attr.nodeValue = value;
					el.setAttributeNode(attr);
				}
			},
			endElement: function(namespaceURI, localName, qName) {
				var current = this.currentElement;
				current.tagName;
				this.currentElement = current.parentNode;
			},
			startPrefixMapping: function(prefix, uri) {},
			endPrefixMapping: function(prefix) {},
			processingInstruction: function(target, data) {
				var ins = this.doc.createProcessingInstruction(target, data);
				this.locator && position(this.locator, ins);
				appendElement(this, ins);
			},
			ignorableWhitespace: function(ch, start, length) {},
			characters: function(chars, start, length) {
				chars = _toString.apply(this, arguments);
				if (chars) {
					if (this.cdata) var charNode = this.doc.createCDATASection(chars);
					else var charNode = this.doc.createTextNode(chars);
					if (this.currentElement) this.currentElement.appendChild(charNode);
					else if (/^\s*$/.test(chars)) this.doc.appendChild(charNode);
					this.locator && position(this.locator, charNode);
				}
			},
			skippedEntity: function(name) {},
			endDocument: function() {
				this.doc.normalize();
			},
			setDocumentLocator: function(locator) {
				if (this.locator = locator) locator.lineNumber = 0;
			},
			comment: function(chars, start, length) {
				chars = _toString.apply(this, arguments);
				var comm = this.doc.createComment(chars);
				this.locator && position(this.locator, comm);
				appendElement(this, comm);
			},
			startCDATA: function() {
				this.cdata = true;
			},
			endCDATA: function() {
				this.cdata = false;
			},
			startDTD: function(name, publicId, systemId) {
				var impl = this.doc.implementation;
				if (impl && impl.createDocumentType) {
					var dt = impl.createDocumentType(name, publicId, systemId);
					this.locator && position(this.locator, dt);
					appendElement(this, dt);
					this.doc.doctype = dt;
				}
			},
			/**
			* @see org.xml.sax.ErrorHandler
			* @link http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
			*/
			warning: function(error) {
				console.warn("[xmldom warning]	" + error, _locator(this.locator));
			},
			error: function(error) {
				console.error("[xmldom error]	" + error, _locator(this.locator));
			},
			fatalError: function(error) {
				throw new ParseError(error, this.locator);
			}
		};
		function _locator(l) {
			if (l) return "\n@" + (l.systemId || "") + "#[line:" + l.lineNumber + ",col:" + l.columnNumber + "]";
		}
		function _toString(chars, start, length) {
			if (typeof chars == "string") return chars.substr(start, length);
			else {
				if (chars.length >= start + length || start) return new java.lang.String(chars, start, length) + "";
				return chars;
			}
		}
		"endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g, function(key) {
			DOMHandler.prototype[key] = function() {
				return null;
			};
		});
		function appendElement(hander, node) {
			if (!hander.currentElement) hander.doc.appendChild(node);
			else hander.currentElement.appendChild(node);
		}
		exports.__DOMHandler = DOMHandler;
		exports.normalizeLineEndings = normalizeLineEndings;
		exports.DOMParser = DOMParser;
	}));
	//#endregion
	//#region src/platform/browser.ts
	var import_lib = (/* @__PURE__ */ __commonJSMin(((exports) => {
		var dom = require_dom();
		exports.DOMImplementation = dom.DOMImplementation;
		exports.XMLSerializer = dom.XMLSerializer;
		exports.DOMParser = require_dom_parser().DOMParser;
	})))();
	function getWindow() {
		return typeof window !== "undefined" ? window : void 0;
	}
	function getDocument() {
		return typeof document !== "undefined" ? document : void 0;
	}
	function getURLConstructor() {
		if (typeof URL !== "undefined") return URL;
		var win = getWindow();
		return win ? win.URL || win.webkitURL || win.mozURL : void 0;
	}
	var requestAnimationFrame$2 = (function() {
		var win = getWindow();
		return win ? win.requestAnimationFrame || win.mozRequestAnimationFrame || win.webkitRequestAnimationFrame || win.msRequestAnimationFrame : false;
	})();
	//#endregion
	//#region src/platform/parser.ts
	/**
	* Resolve the parser constructor for browser/native or XMLDOM parsing.
	* @param {boolean} forceXMLDom Force XMLDOMParser even when native parser exists.
	* @returns {Function} Parser constructor.
	*/
	function getParserConstructor(forceXMLDom) {
		var win;
		if (forceXMLDom) return import_lib.DOMParser;
		if (typeof DOMParser !== "undefined") return DOMParser;
		win = getWindow();
		return win && win.DOMParser ? win.DOMParser : import_lib.DOMParser;
	}
	/**
	* Remove a leading byte order mark before parser handoff.
	* @param {string} markup Source markup.
	* @returns {string} Markup without a leading BOM.
	*/
	function stripByteOrderMark(markup) {
		if (markup && markup.charCodeAt(0) === 65279) return markup.slice(1);
		return markup;
	}
	/**
	* Parse XML or HTML markup through the platform parser boundary.
	* @param {string} markup Source markup.
	* @param {string} mime Markup MIME type.
	* @param {boolean} forceXMLDom Force XMLDOMParser instead of native DOMParser.
	* @returns {Document} Parsed document.
	*/
	function parseMarkup(markup, mime, forceXMLDom) {
		return new (getParserConstructor(forceXMLDom))().parseFromString(stripByteOrderMark(markup), mime);
	}
	//#endregion
	//#region src/utils/mime.ts
	var table = {
		"application": {
			"ecmascript": ["es", "ecma"],
			"javascript": "js",
			"ogg": "ogx",
			"pdf": "pdf",
			"postscript": [
				"ps",
				"ai",
				"eps",
				"epsi",
				"epsf",
				"eps2",
				"eps3"
			],
			"rdf+xml": "rdf",
			"smil": ["smi", "smil"],
			"xhtml+xml": ["xhtml", "xht"],
			"xml": [
				"xml",
				"xsl",
				"xsd",
				"opf",
				"ncx"
			],
			"zip": "zip",
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
			"json": "json",
			"jsonml+json": "jsonml",
			"mathml+xml": "mathml",
			"metalink+xml": "metalink",
			"mp4": "mp4s",
			"omdoc+xml": "omdoc",
			"oxps": "oxps",
			"vnd.amazon.ebook": "azw",
			"widget": "wgt",
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
		"audio": {
			"flac": "flac",
			"midi": [
				"mid",
				"midi",
				"kar",
				"rmi"
			],
			"mpeg": [
				"mpga",
				"mpega",
				"mp2",
				"mp3",
				"m4a",
				"mp2a",
				"m2a",
				"m3a"
			],
			"mpegurl": "m3u",
			"ogg": [
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
			"adpcm": "adp",
			"mp4": "mp4a",
			"webm": "weba",
			"x-aac": "aac",
			"x-caf": "caf",
			"x-matroska": "mka",
			"x-pn-realaudio-plugin": "rmp",
			"xm": "xm",
			"mid": ["mid", "rmi"]
		},
		"image": {
			"gif": "gif",
			"ief": "ief",
			"jpeg": [
				"jpeg",
				"jpg",
				"jpe"
			],
			"pcx": "pcx",
			"png": "png",
			"svg+xml": ["svg", "svgz"],
			"tiff": ["tiff", "tif"],
			"x-icon": "ico",
			"bmp": "bmp",
			"webp": "webp",
			"x-pict": ["pic", "pct"],
			"x-tga": "tga",
			"cis-cod": "cod"
		},
		"text": {
			"cache-manifest": ["manifest", "appcache"],
			"css": "css",
			"csv": "csv",
			"html": [
				"html",
				"htm",
				"shtml",
				"stm"
			],
			"mathml": "mml",
			"plain": [
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
			"richtext": "rtx",
			"tab-separated-values": "tsv",
			"x-bibtex": "bib"
		},
		"video": {
			"mpeg": [
				"mpeg",
				"mpg",
				"mpe",
				"m1v",
				"m2v",
				"mp2",
				"mpa",
				"mpv2"
			],
			"mp4": [
				"mp4",
				"mp4v",
				"mpg4"
			],
			"quicktime": ["qt", "mov"],
			"ogg": "ogv",
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
			"h261": "h261",
			"h263": "h263",
			"h264": "h264",
			"jpeg": "jpgv",
			"jpm": ["jpm", "jpgm"],
			"mj2": ["mj2", "mjp2"],
			"vnd.ms-playready.media.pyv": "pyv",
			"vnd.uvvu.mp4": ["uvu", "uvvu"],
			"vnd.vivo": "viv",
			"webm": "webm",
			"x-f4v": "f4v",
			"x-m4v": "m4v",
			"x-ms-vob": "vob",
			"x-smv": "smv"
		}
	};
	var mimeTypes = (function() {
		var type, subtype, val, index, mimeTypes = {};
		for (type in table) if (Object.prototype.hasOwnProperty.call(table, type)) {
			for (subtype in table[type]) if (Object.prototype.hasOwnProperty.call(table[type], subtype)) {
				val = table[type][subtype];
				if (typeof val == "string") mimeTypes[val] = type + "/" + subtype;
				else for (index = 0; index < val.length; index++) mimeTypes[val[index]] = type + "/" + subtype;
			}
		}
		return mimeTypes;
	})();
	var defaultValue = "text/plain";
	function lookup(filename) {
		return filename && mimeTypes[filename.split(".").pop().toLowerCase()] || defaultValue;
	}
	/**
	* Check if extension is xml.
	* @param {string} ext Extension to inspect.
	* @returns {boolean} True for XML-based EPUB resource extensions.
	*/
	function isXml$1(ext) {
		return [
			"xml",
			"opf",
			"ncx"
		].indexOf(ext) > -1;
	}
	var mime_default = { lookup };
	//#endregion
	//#region src/utils/request.ts
	function request(url, type, withCredentials, headers) {
		var supportsURL = typeof window != "undefined" ? window.URL : false;
		var BLOB_RESPONSE = supportsURL ? "blob" : "arraybuffer";
		var deferred = new defer$1();
		var xhr = new XMLHttpRequest();
		var xhrPrototype = XMLHttpRequest.prototype;
		var header;
		if (!("overrideMimeType" in xhrPrototype)) Object.defineProperty(xhrPrototype, "overrideMimeType", { value: function xmlHttpRequestOverrideMimeType() {} });
		if (withCredentials) xhr.withCredentials = true;
		xhr.onreadystatechange = handler;
		xhr.onerror = err;
		xhr.open("GET", url, true);
		for (header in headers || {}) xhr.setRequestHeader(header, headers[header]);
		if (type == "json") xhr.setRequestHeader("Accept", "application/json");
		if (!type) type = new Path(url).extension;
		if (type == "blob") xhr.responseType = BLOB_RESPONSE;
		if (isXml$1(type)) xhr.overrideMimeType("text/xml");
		if (type == "xhtml") {}
		if (type == "html" || type == "htm") {}
		if (type == "binary") xhr.responseType = "arraybuffer";
		xhr.send();
		function err(e) {
			deferred.reject(e);
		}
		function handler() {
			if (this.readyState === XMLHttpRequest.DONE) {
				var responseXML = false;
				if (this.responseType === "" || this.responseType === "document") responseXML = this.responseXML;
				if (this.status === 200 || this.status === 0 || responseXML) {
					var r;
					if (!this.response && !responseXML) {
						deferred.reject({
							status: this.status,
							message: "Empty Response",
							stack: (/* @__PURE__ */ new Error()).stack
						});
						return deferred.promise;
					}
					if (this.status === 403) {
						deferred.reject({
							status: this.status,
							response: this.response,
							message: "Forbidden",
							stack: (/* @__PURE__ */ new Error()).stack
						});
						return deferred.promise;
					}
					if (responseXML) r = this.responseXML;
					else if (isXml$1(type)) r = parseMarkup(this.response, "text/xml");
					else if (type == "xhtml") r = parseMarkup(this.response, "application/xhtml+xml");
					else if (type == "html" || type == "htm") r = parseMarkup(this.response, "text/html");
					else if (type == "json") r = JSON.parse(this.response);
					else if (type == "blob") if (supportsURL) r = this.response;
					else r = new Blob([this.response]);
					else r = this.response;
					deferred.resolve(r);
				} else deferred.reject({
					status: this.status,
					message: this.response,
					stack: (/* @__PURE__ */ new Error()).stack
				});
			}
		}
		return deferred.promise;
	}
	//#endregion
	//#region src/section.ts
	/**
	* Represents a Section of the Book
	*
	* In most books this is equivalent to a Chapter
	* @param {object} item  The spine item representing the section
	* @param {object} hooks hooks for serialize and content
	*/
	var Section = class {
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
		constructor(item, hooks) {
			this.idref = item.idref;
			this.linear = item.linear === "yes";
			this.properties = item.properties || [];
			this.index = item.index;
			this.href = item.href;
			this.url = item.url;
			this.canonical = item.canonical;
			this.mediaType = item.mediaType;
			this.originalHref = item.originalHref;
			this.originalMediaType = item.originalMediaType;
			this.fallback = item.fallback;
			this.fallbackChain = item.fallbackChain;
			this.next = item.next;
			this.prev = item.prev;
			this.cfiBase = item.cfiBase;
			if (hooks) this.hooks = hooks;
			else this.hooks = {
				serialize: new Hook(this),
				content: new Hook(this)
			};
			this.document = void 0;
			this.contents = void 0;
			this.output = void 0;
		}
		/**
		* Load the section from its url
		* @param  {method} [_request] a request method to use for loading
		* @return {document} a promise with the xml document
		*/
		load(_request) {
			var request$1 = _request || this.request || request;
			var loading = new defer$1();
			var loaded = loading.promise;
			if (this.contents) loading.resolve(this.contents);
			else request$1(this.url).then((xml) => {
				this.document = xml;
				this.contents = xml.documentElement;
				return this.hooks.content.trigger(this.document, this);
			}).then(() => {
				loading.resolve(this.contents);
			}).catch((error) => {
				loading.reject(error);
			});
			return loaded;
		}
		/**
		* Adds a base tag for resolving urls in the section
		* @private
		*/
		base() {
			return replaceBase(this.document, this);
		}
		/**
		* Render the contents of a section
		* @param  {method} [_request] a request method to use for loading
		* @return {string} output a serialized XML Document
		*/
		render(_request) {
			var rendering = new defer$1();
			var rendered = rendering.promise;
			this.output;
			this.load(_request).then((contents) => {
				var isIE = (typeof navigator !== "undefined" && navigator.userAgent || "").indexOf("Trident") >= 0;
				var Serializer;
				if (typeof XMLSerializer === "undefined" || isIE) Serializer = import_lib.DOMParser;
				else Serializer = XMLSerializer;
				var serializer = new Serializer();
				this.output = serializer.serializeToString(contents);
				return this.output;
			}).then(() => {
				return this.hooks.serialize.trigger(this.output, this);
			}).then(() => {
				rendering.resolve(this.output);
			}).catch((error) => {
				rendering.reject(error);
			});
			return rendered;
		}
		/**
		* Find a string in a section
		* @param  {string} _query The query string to find
		* @return {object[]} A list of matches, with form {cfi, excerpt}
		*/
		find(_query) {
			var section = this;
			var matches = [];
			var query = _query.toLowerCase();
			var find = function(node) {
				var text = node.textContent.toLowerCase();
				var range = section.document.createRange();
				var cfi;
				var pos;
				var last = -1;
				var excerpt;
				var limit = 150;
				while (pos != -1) {
					pos = text.indexOf(query, last + 1);
					if (pos != -1) {
						range = section.document.createRange();
						range.setStart(node, pos);
						range.setEnd(node, pos + query.length);
						cfi = section.cfiFromRange(range);
						if (node.textContent.length < limit) excerpt = node.textContent;
						else {
							excerpt = node.textContent.substring(pos - limit / 2, pos + limit / 2);
							excerpt = "..." + excerpt + "...";
						}
						matches.push({
							cfi,
							excerpt
						});
					}
					last = pos;
				}
			};
			sprint$1(section.document, function(node) {
				find(node);
			});
			return matches;
		}
		/**
		* Search a string in multiple sequential Element of the section. If the document.createTreeWalker api is missed(eg: IE8), use `find` as a fallback.
		* @param  {string} _query The query string to search
		* @param  {int} maxSeqEle The maximum number of Element that are combined for search, default value is 5.
		* @return {object[]} A list of matches, with form {cfi, excerpt}
		*/
		search(_query, maxSeqEle = 5) {
			if (typeof document.createTreeWalker == "undefined") return this.find(_query);
			let matches = [];
			const excerptLimit = 150;
			const section = this;
			const query = _query.toLowerCase();
			const search = function(nodeList) {
				const pos = nodeList.reduce((acc, current) => {
					return acc + current.textContent;
				}, "").toLowerCase().indexOf(query);
				if (pos != -1) {
					const startNodeIndex = 0, endPos = pos + query.length;
					let endNodeIndex = 0, l = 0;
					if (pos < nodeList[startNodeIndex].length) {
						let cfi;
						while (endNodeIndex < nodeList.length - 1) {
							l += nodeList[endNodeIndex].length;
							if (endPos <= l) break;
							endNodeIndex += 1;
						}
						let startNode = nodeList[startNodeIndex], endNode = nodeList[endNodeIndex];
						let range = section.document.createRange();
						range.setStart(startNode, pos);
						let beforeEndLengthCount = nodeList.slice(0, endNodeIndex).reduce((acc, current) => {
							return acc + current.textContent.length;
						}, 0);
						range.setEnd(endNode, beforeEndLengthCount > endPos ? endPos : endPos - beforeEndLengthCount);
						cfi = section.cfiFromRange(range);
						let excerpt = nodeList.slice(0, endNodeIndex + 1).reduce((acc, current) => {
							return acc + current.textContent;
						}, "");
						if (excerpt.length > excerptLimit) {
							excerpt = excerpt.substring(pos - excerptLimit / 2, pos + excerptLimit / 2);
							excerpt = "..." + excerpt + "...";
						}
						matches.push({
							cfi,
							excerpt
						});
					}
				}
			};
			const treeWalker = document.createTreeWalker(section.document, NodeFilter.SHOW_TEXT, null);
			let node;
			let nodeList = [];
			while (node = treeWalker.nextNode()) {
				nodeList.push(node);
				if (nodeList.length == maxSeqEle) {
					search(nodeList.slice(0, maxSeqEle));
					nodeList = nodeList.slice(1, maxSeqEle);
				}
			}
			if (nodeList.length > 0) search(nodeList);
			return matches;
		}
		/**
		* Reconciles the current chapters layout properties with
		* the global layout properties.
		* @param {object} globalLayout  The global layout settings object, chapter properties string
		* @return {object} layoutProperties Object with layout properties
		*/
		reconcileLayoutSettings(globalLayout) {
			var settings = {
				layout: globalLayout.layout,
				spread: globalLayout.spread,
				orientation: globalLayout.orientation
			};
			this.properties.forEach(function(prop) {
				var rendition = prop.replace("rendition:", "");
				var split = rendition.indexOf("-");
				var property, value;
				if (split != -1) {
					property = rendition.slice(0, split);
					value = rendition.slice(split + 1);
					settings[property] = value;
				}
			});
			return settings;
		}
		/**
		* Get a CFI from a Range in the Section
		* @param  {range} _range
		* @return {string} cfi an EpubCFI string
		*/
		cfiFromRange(_range) {
			return new EpubCFI(_range, this.cfiBase).toString();
		}
		/**
		* Get a CFI from an Element in the Section
		* @param  {element} el
		* @return {string} cfi an EpubCFI string
		*/
		cfiFromElement(el) {
			return new EpubCFI(el, this.cfiBase).toString();
		}
		/**
		* Unload the section document
		*/
		unload() {
			this.document = void 0;
			this.contents = void 0;
			this.output = void 0;
		}
		destroy() {
			this.unload();
			this.hooks.serialize.clear();
			this.hooks.content.clear();
			this.hooks = void 0;
			this.idref = void 0;
			this.linear = void 0;
			this.properties = void 0;
			this.index = void 0;
			this.href = void 0;
			this.url = void 0;
			this.next = void 0;
			this.prev = void 0;
			this.cfiBase = void 0;
		}
	};
	//#endregion
	//#region src/spine.ts
	/**
	* A collection of Spine Items
	*/
	var Spine = class {
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
			this.spineItems = [];
			this.spineByHref = {};
			this.spineById = {};
			this.hooks = {
				serialize: new Hook(),
				content: new Hook()
			};
			this.hooks.content.register(replaceBase);
			this.hooks.content.register(replaceCanonical);
			this.hooks.content.register(replaceMeta);
			this.epubcfi = new EpubCFI();
			this.loaded = false;
			this.items = void 0;
			this.manifest = void 0;
			this.spineNodeIndex = void 0;
			this.baseUrl = void 0;
			this.length = void 0;
		}
		/**
		* Unpack items from a opf into spine items
		* @param  {Packaging} _package
		* @param  {method} resolver URL resolver
		* @param  {method} canonical Resolve canonical url
		*/
		unpack(_package, resolver, canonical) {
			this.items = _package.spine;
			this.manifest = _package.manifest;
			this.spineNodeIndex = _package.spineNodeIndex;
			this.baseUrl = _package.baseUrl || _package.basePath || "";
			this.length = this.items.length;
			this.items.forEach((item, index) => {
				var manifestItem = this.manifest[item.idref];
				var resolvedManifestItem;
				var spineItem;
				item.index = index;
				item.cfiBase = this.epubcfi.generateChapterComponent(this.spineNodeIndex, item.index, item.id);
				if (item.href) {
					item.url = resolver(item.href, true);
					item.canonical = canonical(item.href);
				}
				if (manifestItem) {
					resolvedManifestItem = this.resolveFallbackItem(manifestItem);
					item.href = resolvedManifestItem.href;
					item.url = resolver(item.href, true);
					item.canonical = canonical(item.href);
					item.mediaType = resolvedManifestItem.type;
					item.originalHref = manifestItem.href;
					item.originalMediaType = manifestItem.type;
					item.fallback = manifestItem.fallback;
					item.fallbackChain = manifestItem.fallbackChain || [];
					if (manifestItem.properties.length) item.properties.push.apply(item.properties, manifestItem.properties);
					if (resolvedManifestItem !== manifestItem && resolvedManifestItem.properties.length) item.properties.push.apply(item.properties, resolvedManifestItem.properties);
				}
				if (item.linear === "yes") {
					item.prev = () => {
						let prevIndex = item.index;
						while (prevIndex > 0) {
							let prev = this.get(prevIndex - 1);
							if (prev && prev.linear) return prev;
							prevIndex -= 1;
						}
					};
					item.next = () => {
						let nextIndex = item.index;
						while (nextIndex < this.spineItems.length - 1) {
							let next = this.get(nextIndex + 1);
							if (next && next.linear) return next;
							nextIndex += 1;
						}
					};
				} else {
					item.prev = function() {};
					item.next = function() {};
				}
				spineItem = new Section(item, this.hooks);
				this.append(spineItem);
			});
			this.loaded = true;
		}
		/**
		* Resolve a manifest item to a renderable fallback item when needed
		* @private
		* @param  {PackagingManifestItem} manifestItem
		* @return {PackagingManifestItem} manifestItem
		*/
		resolveFallbackItem(manifestItem) {
			if (this.isRenderableType(manifestItem.type)) return manifestItem;
			var fallbackChain = manifestItem.fallbackChain || [];
			var index = 0;
			var fallbackItem;
			while (index < fallbackChain.length) {
				fallbackItem = this.manifest[fallbackChain[index]];
				if (fallbackItem && this.isRenderableType(fallbackItem.type)) return fallbackItem;
				index += 1;
			}
			return manifestItem;
		}
		/**
		* Check whether a manifest media type can be rendered as a spine section
		* @private
		* @param  {string} type
		* @return {boolean}
		*/
		isRenderableType(type) {
			if (!type) return true;
			return [
				"application/xhtml+xml",
				"text/html",
				"image/svg+xml"
			].indexOf(type) > -1;
		}
		/**
		* Get an item from the spine
		* @param  {string|number} [target]
		* @return {Section} section
		* @example spine.get();
		* @example spine.get(1);
		* @example spine.get("chap1.html");
		* @example spine.get("#id1234");
		*/
		get(target) {
			var index = 0;
			if (typeof target === "undefined") while (index < this.spineItems.length) {
				let next = this.spineItems[index];
				if (next && next.linear) break;
				index += 1;
			}
			else if (typeof target === "string" && this.epubcfi.isCfiString(target)) index = new EpubCFI(target).spinePos;
			else if (typeof target === "number" || isNaN(Number(target)) === false) index = Number(target);
			else if (typeof target === "string" && target.indexOf("#") === 0) index = this.spineById[target.substring(1)];
			else if (typeof target === "string") {
				target = target.split("#")[0];
				index = this.spineByHref[target] || this.spineByHref[encodeURI(target)];
			}
			return this.spineItems[index] || null;
		}
		/**
		* Index an href and encoded variants for spine lookups
		* @private
		* @param  {string} href
		* @param  {number} index
		*/
		indexHref(href, index) {
			if (!href) return;
			this.spineByHref[decodeURI(href)] = index;
			this.spineByHref[encodeURI(href)] = index;
			this.spineByHref[href] = index;
		}
		/**
		* Remove an href and encoded variants from spine lookups
		* @private
		* @param  {string} href
		*/
		removeHref(href) {
			if (!href) return;
			delete this.spineByHref[decodeURI(href)];
			delete this.spineByHref[encodeURI(href)];
			delete this.spineByHref[href];
		}
		/**
		* Append a Section to the Spine
		* @private
		* @param  {Section} section
		*/
		append(section) {
			var index = this.spineItems.length;
			section.index = index;
			this.spineItems.push(section);
			this.indexHref(section.href, index);
			if (section.originalHref !== section.href) this.indexHref(section.originalHref, index);
			this.spineById[section.idref] = index;
			return index;
		}
		/**
		* Prepend a Section to the Spine
		* @private
		* @param  {Section} section
		*/
		prepend(section) {
			this.indexHref(section.href, 0);
			if (section.originalHref !== section.href) this.indexHref(section.originalHref, 0);
			this.spineById[section.idref] = 0;
			this.spineItems.forEach(function(item, index) {
				item.index = index;
			});
			return 0;
		}
		/**
		* Remove a Section from the Spine
		* @private
		* @param  {Section} section
		*/
		remove(section) {
			var index = this.spineItems.indexOf(section);
			if (index > -1) {
				this.removeHref(section.href);
				if (section.originalHref !== section.href) this.removeHref(section.originalHref);
				delete this.spineById[section.idref];
				return this.spineItems.splice(index, 1);
			}
		}
		/**
		* Loop over the Sections in the Spine
		* @return {method} forEach
		*/
		each(callback, thisArg) {
			return this.spineItems.forEach(callback, thisArg);
		}
		/**
		* Find the first Section in the Spine
		* @return {Section} first section
		*/
		first() {
			let index = 0;
			do {
				let next = this.get(index);
				if (next && next.linear) return next;
				index += 1;
			} while (index < this.spineItems.length);
		}
		/**
		* Find the last Section in the Spine
		* @return {Section} last section
		*/
		last() {
			let index = this.spineItems.length - 1;
			do {
				let prev = this.get(index);
				if (prev && prev.linear) return prev;
				index -= 1;
			} while (index >= 0);
		}
		destroy() {
			this.each((section) => section.destroy());
			this.spineItems = void 0;
			this.spineByHref = void 0;
			this.spineById = void 0;
			this.hooks.serialize.clear();
			this.hooks.content.clear();
			this.hooks = void 0;
			this.epubcfi = void 0;
			this.loaded = false;
			this.items = void 0;
			this.manifest = void 0;
			this.spineNodeIndex = void 0;
			this.baseUrl = void 0;
			this.length = void 0;
		}
	};
	//#endregion
	//#region src/utils/queue.ts
	var Defer$5 = defer$1;
	/**
	* Queue for handling tasks one at a time
	* @class
	* @param {scope} context what this will resolve to in the tasks
	*/
	var Queue = class {
		_q;
		context;
		defered;
		paused;
		running;
		tick;
		constructor(context) {
			this._q = [];
			this.context = context;
			this.tick = requestAnimationFrame$2;
			this.running = false;
			this.paused = false;
		}
		/**
		* Add an item to the queue
		* @return {Promise}
		*/
		enqueue(...items) {
			var deferred, promise;
			var queued;
			var task = items.shift();
			var args = items;
			if (!task) throw new Error("No Task Provided");
			if (typeof task === "function") {
				deferred = new Defer$5();
				promise = deferred.promise;
				queued = {
					"task": task,
					"args": args,
					"deferred": deferred,
					"promise": promise
				};
			} else queued = { "promise": task };
			this._q.push(queued);
			if (this.paused == false && !this.running) this.run();
			return queued.promise;
		}
		/**
		* Run one item
		* @return {Promise}
		*/
		dequeue() {
			var inwait, task, result;
			if (this._q.length && !this.paused) {
				inwait = this._q.shift();
				task = inwait?.task;
				if (task) {
					result = task.apply(this.context, inwait.args);
					if (result && typeof result["then"] === "function") return result.then(function() {
						inwait.deferred?.resolve?.apply(this.context, arguments);
					}.bind(this), function() {
						inwait.deferred?.reject?.apply(this.context, arguments);
					}.bind(this));
					else {
						inwait.deferred?.resolve?.call(this.context, result);
						return inwait.promise;
					}
				} else if (inwait.promise) return inwait.promise;
			} else {
				const completed = new Defer$5();
				completed.resolve?.(void 0);
				return completed.promise;
			}
		}
		dump() {
			while (this._q.length) this.dequeue();
		}
		/**
		* Run all tasks sequentially, at convince
		* @return {Promise}
		*/
		run() {
			if (!this.running) {
				this.running = true;
				this.defered = new Defer$5();
			}
			this.tick.call(window, () => {
				if (this._q.length) this.dequeue().then(function() {
					this.run();
				}.bind(this));
				else {
					this.defered.resolve?.(void 0);
					this.running = void 0;
				}
			});
			if (this.paused == true) this.paused = false;
			return this.defered.promise;
		}
		/**
		* Flush all, as quickly as possible
		* @return {Promise}
		*/
		flush() {
			if (this.running) return this.running;
			if (this._q.length) {
				this.running = this.dequeue().then(function() {
					this.running = void 0;
					return this.flush();
				}.bind(this));
				return this.running;
			}
		}
		/**
		* Clear all items in wait
		*/
		clear() {
			this._q = [];
		}
		/**
		* Get the number of tasks in the queue
		* @return {number} tasks
		*/
		length() {
			return this._q.length;
		}
		/**
		* Pause a running queue
		*/
		pause() {
			this.paused = true;
		}
		/**
		* End the queue
		*/
		stop() {
			this._q = [];
			this.running = false;
			this.paused = true;
		}
	};
	//#endregion
	//#region src/utils/constants.ts
	var DOM_EVENTS = [
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
	];
	var EVENTS = {
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
	};
	//#endregion
	//#region src/locations.ts
	/**
	* Find Locations for a Book
	* @param {Spine} spine
	* @param {request} request
	* @param {number} [pause=100]
	*/
	var Locations = class {
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
		constructor(spine, request, pause) {
			this.spine = spine;
			this.request = request;
			this.pause = pause || 100;
			this.q = new Queue(this);
			this.epubcfi = new EpubCFI();
			this._locations = [];
			this._locationsWords = [];
			this.total = 0;
			this.break = 150;
			this._current = 0;
			this._wordCounter = 0;
			this.currentLocation = "";
			this._currentCfi = "";
			this.processingTimeout = void 0;
		}
		/**
		* Load all of sections in the book to generate locations
		* @param  {int} chars how many chars to split on
		* @return {Promise<Array<string>>} locations
		*/
		generate(chars) {
			if (chars) this.break = chars;
			this.q.pause();
			this.spine.each(function(section) {
				if (section.linear) this.q.enqueue(this.process.bind(this), section);
			}.bind(this));
			return this.q.run().then(function() {
				this.total = this._locations.length - 1;
				if (this._currentCfi) this.currentLocation = this._currentCfi;
				return this._locations;
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
		process(section) {
			return section.load(this.request).then(function(contents) {
				var completed = new defer$1();
				var locations = this.parse(contents, section.cfiBase);
				this._locations = this._locations.concat(locations);
				section.unload();
				this.processingTimeout = setTimeout(() => completed.resolve(locations), this.pause);
				return completed.promise;
			}.bind(this));
		}
		parse(contents, cfiBase, chars) {
			var locations = [];
			var range;
			var doc = contents.ownerDocument;
			var body = qs$1(doc, "body");
			var counter = 0;
			var prev;
			var _break = chars || this.break;
			var parser = function(node) {
				var len = node.length;
				var dist;
				var pos = 0;
				if (counter === 0 && range === void 0) {
					range = this.createRange();
					range.startContainer = node;
					range.startOffset = 0;
				}
				if (node.textContent.trim().length === 0) {
					prev = node;
					return false;
				}
				dist = _break - counter;
				if (dist > len) {
					counter += len;
					pos = len;
				}
				while (pos < len) {
					dist = _break - counter;
					if (counter === 0) {
						pos += 1;
						range = this.createRange();
						range.startContainer = node;
						range.startOffset = pos;
					}
					if (pos + dist >= len) {
						counter += len - pos;
						pos = len;
					} else {
						pos += dist;
						range.endContainer = node;
						range.endOffset = pos;
						let cfi = new EpubCFI(range, cfiBase).toString();
						locations.push(cfi);
						counter = 0;
					}
				}
				prev = node;
			};
			sprint$1(body, parser.bind(this));
			if (range && range.startContainer && prev) {
				range.endContainer = prev;
				range.endOffset = prev.length;
				let cfi = new EpubCFI(range, cfiBase).toString();
				locations.push(cfi);
				counter = 0;
			}
			if (locations.length === 0 && body) {
				let fallback = this.fallbackCfi(body, cfiBase);
				if (fallback) locations.push(fallback);
			}
			return locations;
		}
		fallbackCfi(body, cfiBase) {
			var fallbackNode = body;
			var children = body.children;
			if (children.length) fallbackNode = children[0];
			try {
				return new EpubCFI(fallbackNode, cfiBase).toString();
			} catch (error) {
				return "";
			}
		}
		/**
		* Generate precise locations for a single section and splice them into
		* the existing locations array, replacing any entries (e.g. synthetic)
		* that already belong to that section.
		*
		* This allows progressive refinement: call once per section as the reader
		* navigates through the book without the cost of a full generate().
		*
		* @param  {Section} section  epub.js Section object (must have .cfiBase, .load(), .unload(), .linear)
		* @param  {int}     [chars]  chars per location break (defaults to this.break)
		* @return {Promise<Array<string>>} full updated locations array
		*/
		generateForSection(section, chars) {
			if (!section || !section.linear || !section.cfiBase) return Promise.resolve(this._locations);
			var breakSize = chars || this.break;
			var cfiPrefix = "epubcfi(" + section.cfiBase + "!";
			return section.load(this.request).then(function(contents) {
				var newLocs = this.parse(contents, section.cfiBase, breakSize);
				section.unload();
				if (newLocs.length === 0) return this._locations;
				var sectionStart = -1;
				var sectionCount = 0;
				for (var i = 0; i < this._locations.length; i++) if (this._locations[i].startsWith(cfiPrefix)) {
					if (sectionStart === -1) sectionStart = i;
					sectionCount++;
				} else if (sectionStart !== -1) break;
				if (sectionStart !== -1) this._locations.splice.apply(this._locations, [sectionStart, sectionCount].concat(newLocs));
				else {
					var insertIdx = locationOf$1(new EpubCFI(newLocs[0]), this._locations, this.epubcfi.compare);
					this._locations.splice.apply(this._locations, [insertIdx, 0].concat(newLocs));
				}
				this.total = this._locations.length - 1;
				return this._locations;
			}.bind(this));
		}
		/**
		* Load all of sections in the book to generate locations
		* @param  {string} startCfi start position
		* @param  {int} wordCount how many words to split on
		* @param  {int} count result count
		* @return {object} locations
		*/
		generateFromWords(startCfi, wordCount, count) {
			var start = startCfi ? new EpubCFI(startCfi) : void 0;
			this.q.pause();
			this._locationsWords = [];
			this._wordCounter = 0;
			this.spine.each(function(section) {
				if (section.linear) if (start) {
					if (section.index >= start.spinePos) this.q.enqueue(this.processWords.bind(this), section, wordCount, start, count);
				} else this.q.enqueue(this.processWords.bind(this), section, wordCount, start, count);
			}.bind(this));
			return this.q.run().then(function() {
				if (this._currentCfi) this.currentLocation = this._currentCfi;
				return this._locationsWords;
			}.bind(this));
		}
		processWords(section, wordCount, startCfi, count) {
			if (count && this._locationsWords.length >= count) return Promise.resolve();
			return section.load(this.request).then(function(contents) {
				var completed = new defer$1();
				var locations = this.parseWords(contents, section, wordCount, startCfi);
				var remainingCount = count ? count - this._locationsWords.length : locations.length;
				this._locationsWords = this._locationsWords.concat(count && locations.length >= count ? locations.slice(0, remainingCount) : locations);
				section.unload();
				this.processingTimeout = setTimeout(() => completed.resolve(locations), this.pause);
				return completed.promise;
			}.bind(this));
		}
		countWords(s) {
			s = s.replace(/(^\s*)|(\s*$)/gi, "");
			s = s.replace(/[ ]{2,}/gi, " ");
			s = s.replace(/\n /, "\n");
			return s.split(" ").length;
		}
		parseWords(contents, section, wordCount, startCfi) {
			var cfiBase = section.cfiBase;
			var locations = [];
			var doc = contents.ownerDocument;
			var body = qs$1(doc, "body");
			var _break = wordCount;
			var foundStartNode = startCfi ? startCfi.spinePos !== section.index : true;
			var startNode;
			if (startCfi && section.index === startCfi.spinePos) startNode = startCfi.findNode(startCfi.range ? startCfi.path.steps.concat(startCfi.start.steps) : startCfi.path.steps, contents.ownerDocument);
			var parser = function(node) {
				if (!foundStartNode) if (node === startNode) foundStartNode = true;
				else return false;
				if (node.textContent.length < 10) {
					if (node.textContent.trim().length === 0) return false;
				}
				var len = this.countWords(node.textContent);
				var dist;
				var pos = 0;
				if (len === 0) return false;
				dist = _break - this._wordCounter;
				if (dist > len) {
					this._wordCounter += len;
					pos = len;
				}
				while (pos < len) {
					dist = _break - this._wordCounter;
					if (pos + dist >= len) {
						this._wordCounter += len - pos;
						pos = len;
					} else {
						pos += dist;
						let cfi = new EpubCFI(node, cfiBase);
						locations.push({
							cfi: cfi.toString(),
							wordCount: this._wordCounter
						});
						this._wordCounter = 0;
					}
				}
			};
			sprint$1(body, parser.bind(this));
			return locations;
		}
		/**
		* Get a location from an EpubCFI
		* @param {EpubCFI} cfi
		* @return {number}
		*/
		locationFromCfi(cfi) {
			let loc;
			if (EpubCFI.prototype.isCfiString(cfi)) cfi = new EpubCFI(cfi);
			if (this._locations.length === 0) return -1;
			loc = locationOf$1(cfi, this._locations, this.epubcfi.compare);
			if (loc > this.total) return this.total;
			return loc;
		}
		/**
		* Get a percentage position in locations from an EpubCFI
		* @param {EpubCFI} cfi
		* @return {number}
		*/
		percentageFromCfi(cfi) {
			if (this._locations.length === 0) return null;
			var loc = this.locationFromCfi(cfi);
			return this.percentageFromLocation(loc);
		}
		/**
		* Get a percentage position from a location index
		* @param {number} location
		* @return {number}
		*/
		percentageFromLocation(loc) {
			if (!loc || !this.total) return 0;
			return loc / this.total;
		}
		/**
		* Get an EpubCFI from location index
		* @param {number} loc
		* @return {EpubCFI} cfi
		*/
		cfiFromLocation(loc) {
			var cfi = -1;
			if (typeof loc != "number") loc = parseInt(loc);
			if (loc >= 0 && loc < this._locations.length) cfi = this._locations[loc];
			return cfi;
		}
		/**
		* Get an EpubCFI from location percentage
		* @param {number} percentage
		* @return {EpubCFI} cfi
		*/
		cfiFromPercentage(percentage) {
			let loc;
			if (percentage > 1) console.warn("Normalize cfiFromPercentage value to between 0 - 1");
			if (percentage >= 1) {
				let cfi = new EpubCFI(this._locations[this.total]);
				cfi.collapse();
				return cfi.toString();
			}
			loc = Math.ceil(this.total * percentage);
			return this.cfiFromLocation(loc);
		}
		/**
		* Load locations from JSON
		* @param {json} locations
		*/
		load(locations) {
			if (typeof locations === "string") this._locations = JSON.parse(locations);
			else this._locations = locations;
			this.total = this._locations.length - 1;
			return this._locations;
		}
		/**
		* Save locations to JSON
		* @return {json}
		*/
		save() {
			return JSON.stringify(this._locations);
		}
		getCurrent() {
			return this._current;
		}
		setCurrent(curr) {
			var loc;
			if (typeof curr == "string") this._currentCfi = curr;
			else if (typeof curr == "number") this._current = curr;
			else return;
			if (this._locations.length === 0) return;
			if (typeof curr == "string") {
				loc = this.locationFromCfi(curr);
				this._current = loc;
			} else loc = curr;
			this.emit(EVENTS.LOCATIONS.CHANGED, { percentage: this.percentageFromLocation(loc) });
		}
		/**
		* Get the current location
		*/
		get currentLocation() {
			return this._current;
		}
		/**
		* Set the current location
		*/
		set currentLocation(curr) {
			this.setCurrent(curr);
		}
		/**
		* Locations length
		*/
		length() {
			return this._locations.length;
		}
		destroy() {
			this.spine = void 0;
			this.request = void 0;
			this.pause = void 0;
			this.q.stop();
			this.q = void 0;
			this.epubcfi = void 0;
			this._locations = void 0;
			this.total = void 0;
			this.break = void 0;
			this._current = void 0;
			this.currentLocation = void 0;
			this._currentCfi = void 0;
			clearTimeout(this.processingTimeout);
		}
	};
	(0, import_event_emitter.default)(Locations.prototype);
	//#endregion
	//#region src/container.ts
	/**
	* Handles Parsing and Accessing an Epub Container
	* @class
	* @param {document} [containerDocument] xml document
	*/
	var Container = class {
		packagePath;
		directory;
		encoding;
		constructor(containerDocument) {
			this.packagePath = "";
			this.directory = "";
			this.encoding = "";
			if (containerDocument) this.parse(containerDocument);
		}
		/**
		* Parse the Container XML
		* @param  {document} containerDocument
		*/
		parse(containerDocument) {
			var rootfile;
			if (!containerDocument) throw new Error("Container File Not Found");
			rootfile = qs$1(containerDocument, "rootfile");
			if (!rootfile) throw new Error("No RootFile Found");
			this.packagePath = rootfile.getAttribute("full-path");
			this.directory = import_path.default.dirname(this.packagePath);
			this.encoding = containerDocument.xmlEncoding;
		}
		destroy() {
			this.packagePath = void 0;
			this.directory = void 0;
			this.encoding = void 0;
		}
	};
	//#endregion
	//#region src/packaging.ts
	/**
	* Open Packaging Format Parser
	* @class
	* @param {document} packageDocument OPF XML
	*/
	var Packaging = class {
		manifest;
		navPath;
		ncxPath;
		coverPath;
		spineNodeIndex;
		spine;
		metadata;
		uniqueIdentifier;
		toc;
		constructor(packageDocument) {
			this.manifest = {};
			this.navPath = "";
			this.ncxPath = "";
			this.coverPath = "";
			this.spineNodeIndex = 0;
			this.spine = [];
			this.metadata = {};
			if (packageDocument) this.parse(packageDocument);
		}
		/**
		* Parse OPF XML
		* @param  {document} packageDocument OPF XML
		* @return {object} parsed package parts
		*/
		parse(packageDocument) {
			var metadataNode, manifestNode, spineNode;
			if (!packageDocument) throw new Error("Package File Not Found");
			metadataNode = qs$1(packageDocument, "metadata");
			if (!metadataNode) throw new Error("No Metadata Found");
			manifestNode = qs$1(packageDocument, "manifest");
			if (!manifestNode) throw new Error("No Manifest Found");
			spineNode = qs$1(packageDocument, "spine");
			if (!spineNode) throw new Error("No Spine Found");
			this.manifest = this.parseManifest(manifestNode);
			this.navPath = this.findNavPath(manifestNode);
			this.ncxPath = this.findNcxPath(manifestNode, spineNode);
			this.coverPath = this.findCoverPath(packageDocument);
			this.spineNodeIndex = indexOfElementNode$1(spineNode);
			this.spine = this.parseSpine(spineNode, this.manifest);
			this.uniqueIdentifier = this.findUniqueIdentifier(packageDocument);
			this.metadata = this.parseMetadata(metadataNode);
			this.metadata.direction = spineNode.getAttribute("page-progression-direction");
			return {
				"metadata": this.metadata,
				"spine": this.spine,
				"manifest": this.manifest,
				"navPath": this.navPath,
				"ncxPath": this.ncxPath,
				"coverPath": this.coverPath,
				"spineNodeIndex": this.spineNodeIndex
			};
		}
		/**
		* Parse Metadata
		* @private
		* @param  {node} xml
		* @return {object} metadata
		*/
		parseMetadata(xml) {
			var metadata = {};
			metadata.title = this.getElementText(xml, "title");
			metadata.creator = this.getElementText(xml, "creator");
			metadata.description = this.getElementText(xml, "description");
			metadata.pubdate = this.getElementText(xml, "date");
			metadata.publisher = this.getElementText(xml, "publisher");
			metadata.identifier = this.getElementText(xml, "identifier");
			metadata.language = this.getElementText(xml, "language");
			metadata.rights = this.getElementText(xml, "rights");
			metadata.modified_date = this.getPropertyText(xml, "dcterms:modified");
			metadata.layout = this.getPropertyText(xml, "rendition:layout");
			metadata.orientation = this.getPropertyText(xml, "rendition:orientation");
			metadata.flow = this.getPropertyText(xml, "rendition:flow");
			metadata.viewport = this.getPropertyText(xml, "rendition:viewport");
			metadata.media_active_class = this.getPropertyText(xml, "media:active-class");
			metadata.spread = this.getPropertyText(xml, "rendition:spread");
			return metadata;
		}
		/**
		* Parse Manifest
		* @private
		* @param  {node} manifestXml
		* @return {object} manifest
		*/
		parseManifest(manifestXml) {
			var manifest = {};
			var selected = qsa$1(manifestXml, "item");
			Array.prototype.slice.call(selected).forEach(function(item) {
				var id = item.getAttribute("id"), href = item.getAttribute("href") || "", type = item.getAttribute("media-type") || "", overlay = item.getAttribute("media-overlay") || "", fallback = item.getAttribute("fallback") || "", properties = item.getAttribute("properties") || "";
				if (!id) return;
				manifest[id] = {
					"href": href,
					"type": type,
					"overlay": overlay,
					"mediaOverlay": overlay,
					"fallback": fallback,
					"fallbackChain": [],
					"properties": properties.length ? properties.split(" ") : []
				};
			});
			Object.keys(manifest).forEach(function(id) {
				var item = manifest[id], fallback = item.fallback, visited = {};
				visited[id] = true;
				while (fallback && manifest[fallback] && !visited[fallback]) {
					item.fallbackChain.push(fallback);
					visited[fallback] = true;
					fallback = manifest[fallback].fallback;
				}
			});
			return manifest;
		}
		/**
		* Parse Spine
		* @private
		* @param  {node} spineXml
		* @param  {Packaging.manifest} manifest
		* @return {object} spine
		*/
		parseSpine(spineXml, manifest) {
			var spine = [];
			var selected = qsa$1(spineXml, "itemref");
			Array.prototype.slice.call(selected).forEach(function(item, index) {
				var idref = item.getAttribute("idref");
				var props = item.getAttribute("properties") || "";
				var propArray = props.length ? props.split(" ") : [];
				var itemref = {
					"id": item.getAttribute("id"),
					"idref": idref,
					"linear": item.getAttribute("linear") || "yes",
					"properties": propArray,
					"index": index
				};
				spine.push(itemref);
			});
			return spine;
		}
		/**
		* Find Unique Identifier
		* @private
		* @param  {node} packageXml
		* @return {string} Unique Identifier text
		*/
		findUniqueIdentifier(packageXml) {
			var uniqueIdentifierId = packageXml.documentElement.getAttribute("unique-identifier");
			if (!uniqueIdentifierId) return "";
			var identifier = packageXml.getElementById(uniqueIdentifierId);
			if (!identifier) return "";
			if (identifier.localName === "identifier" && identifier.namespaceURI === "http://purl.org/dc/elements/1.1/") return identifier.childNodes.length > 0 ? (identifier.childNodes[0].nodeValue || "").trim() : "";
			return "";
		}
		/**
		* Find TOC NAV
		* @private
		* @param {element} manifestNode
		* @return {string}
		*/
		findNavPath(manifestNode) {
			var node = qsp$1(manifestNode, "item", { "properties": "nav" });
			return node ? node.getAttribute("href") : false;
		}
		/**
		* Find TOC NCX
		* media-type="application/x-dtbncx+xml" href="toc.ncx"
		* @private
		* @param {element} manifestNode
		* @param {element} spineNode
		* @return {string}
		*/
		findNcxPath(manifestNode, spineNode) {
			var node = qsp$1(manifestNode, "item", { "media-type": "application/x-dtbncx+xml" });
			var tocId;
			if (!node) {
				tocId = spineNode.getAttribute("toc");
				if (tocId) node = manifestNode.querySelector(`#${tocId}`);
			}
			return node ? node.getAttribute("href") : false;
		}
		/**
		* Find the Cover Path
		* <item properties="cover-image" id="ci" href="cover.svg" media-type="image/svg+xml" />
		* Fallback for Epub 2.0
		* @private
		* @param  {node} packageXml
		* @return {string} href
		*/
		findCoverPath(packageXml) {
			qs$1(packageXml, "package").getAttribute("version");
			var node = qsp$1(packageXml, "item", { "properties": "cover-image" });
			if (node) return node.getAttribute("href");
			var metaCover = qsp$1(packageXml, "meta", { "name": "cover" });
			if (metaCover) {
				var coverId = metaCover.getAttribute("content");
				var cover = packageXml.getElementById(coverId);
				return cover ? cover.getAttribute("href") : "";
			} else return false;
		}
		/**
		* Get text of a namespaced element
		* @private
		* @param  {node} xml
		* @param  {string} tag
		* @return {string} text
		*/
		getElementText(xml, tag) {
			var found = xml.getElementsByTagNameNS("http://purl.org/dc/elements/1.1/", tag);
			var el;
			if (!found || found.length === 0) return "";
			el = found[0];
			if (el.childNodes.length) return el.childNodes[0].nodeValue || "";
			return "";
		}
		/**
		* Get text by property
		* @private
		* @param  {node} xml
		* @param  {string} property
		* @return {string} text
		*/
		getPropertyText(xml, property) {
			var el = qsp$1(xml, "meta", { "property": property });
			if (el && el.childNodes.length) return el.childNodes[0].nodeValue || "";
			return "";
		}
		/**
		* Load JSON Manifest
		* @param  {document} packageDocument OPF XML
		* @return {object} parsed package parts
		*/
		load(json) {
			this.metadata = json.metadata;
			let spine = json.readingOrder || json.spine;
			this.spine = spine.map((item, index) => {
				item.index = index;
				item.linear = item.linear || "yes";
				return item;
			});
			json.resources.forEach((item, index) => {
				this.manifest[index] = item;
				if (item.rel && item.rel[0] === "cover") this.coverPath = item.href;
			});
			this.spineNodeIndex = 0;
			this.toc = json.toc.map((item, index) => {
				item.label = item.title;
				return item;
			});
			return {
				"metadata": this.metadata,
				"spine": this.spine,
				"manifest": this.manifest,
				"navPath": this.navPath,
				"ncxPath": this.ncxPath,
				"coverPath": this.coverPath,
				"spineNodeIndex": this.spineNodeIndex,
				"toc": this.toc
			};
		}
		destroy() {
			this.manifest = void 0;
			this.navPath = void 0;
			this.ncxPath = void 0;
			this.coverPath = void 0;
			this.spineNodeIndex = void 0;
			this.spine = void 0;
			this.metadata = void 0;
		}
	};
	//#endregion
	//#region src/navigation.ts
	/**
	* Navigation Parser
	* @param {document} xml navigation html / xhtml / ncx
	*/
	var Navigation = class {
		toc;
		tocByHref;
		tocById;
		landmarks;
		landmarksByType;
		length;
		constructor(xml) {
			this.toc = [];
			this.tocByHref = {};
			this.tocById = {};
			this.landmarks = [];
			this.landmarksByType = {};
			this.length = 0;
			if (xml) this.parse(xml);
		}
		/**
		* Parse out the navigation items
		* @param {document} xml navigation html / xhtml / ncx
		*/
		parse(xml) {
			let isXml = !Array.isArray(xml) && xml.nodeType;
			let html;
			let ncx;
			if (isXml) {
				html = qs$1(xml, "html");
				ncx = qs$1(xml, "ncx");
			}
			if (!isXml) this.toc = this.load(xml);
			else if (html) {
				this.toc = this.parseNav(xml);
				this.landmarks = this.parseLandmarks(xml);
			} else if (ncx) this.toc = this.parseNcx(xml);
			this.length = 0;
			this.unpack(this.toc);
		}
		/**
		* Unpack navigation items
		* @private
		* @param  {array} toc
		*/
		unpack(toc) {
			var item;
			for (var i = 0; i < toc.length; i++) {
				item = toc[i];
				if (item.href) this.tocByHref[item.href] = i;
				if (item.id) this.tocById[item.id] = i;
				this.length++;
				if (item.subitems.length) this.unpack(item.subitems);
			}
		}
		get(target) {
			var index;
			var lookupTarget = target;
			if (!target) return this.toc;
			if (target.indexOf("#") === 0) {
				lookupTarget = target.substring(1);
				index = this.tocById[lookupTarget];
			} else if (target in this.tocByHref) index = this.tocByHref[target];
			else if (target in this.tocById) index = this.tocById[target];
			return this.getByIndex(lookupTarget, index, this.toc);
		}
		/**
		* Get an item from navigation subitems recursively by index
		* @param  {string} target
		* @param  {number} index
		* @param  {array} navItems
		* @return {object} navItem
		*/
		getByIndex(target, index, navItems) {
			if (navItems.length === 0) return;
			const item = navItems[index];
			if (item && (target === item.id || target === item.href)) return item;
			else {
				let result;
				for (let i = 0; i < navItems.length; ++i) {
					result = this.getByIndex(target, index, navItems[i].subitems);
					if (result) break;
				}
				return result;
			}
		}
		landmark(type) {
			var index;
			if (!type) return this.landmarks;
			index = this.landmarksByType[type];
			return this.landmarks[index];
		}
		/**
		* Parse toc from a Epub > 3.0 Nav
		* @private
		* @param  {document} navHtml
		* @return {array} navigation list
		*/
		parseNav(navHtml) {
			var navElement = querySelectorByType$1(navHtml, "nav", "toc");
			var list = [];
			if (!navElement) return list;
			let navList = filterChildren$1(navElement, "ol", true);
			if (!navList) return list;
			list = this.parseNavList(navList);
			return list;
		}
		/**
		* Parses lists in the toc
		* @param  {document} navListHtml
		* @param  {string} parent id
		* @return {array} navigation list
		*/
		parseNavList(navListHtml, parent) {
			const result = [];
			if (!navListHtml) return result;
			if (!navListHtml.children) return result;
			for (let i = 0; i < navListHtml.children.length; i++) {
				const item = this.navItem(navListHtml.children[i], parent);
				if (item) result.push(item);
			}
			return result;
		}
		/**
		* Create a navItem
		* @private
		* @param  {element} item
		* @return {object} navItem
		*/
		navItem(item, parent) {
			let id = item.getAttribute("id") || void 0;
			let content = filterChildren$1(item, "a", true) || filterChildren$1(item, "span", true);
			if (!content) return;
			let src = content.getAttribute("href") || "";
			if (!id) id = src;
			let text = content.textContent || "";
			let subitems = [];
			let nested = filterChildren$1(item, "ol", true);
			if (nested) subitems = this.parseNavList(nested, id);
			return {
				"id": id,
				"href": src,
				"label": text,
				"subitems": subitems,
				"parent": parent
			};
		}
		/**
		* Parse landmarks from a Epub > 3.0 Nav
		* @private
		* @param  {document} navHtml
		* @return {array} landmarks list
		*/
		parseLandmarks(navHtml) {
			var navElement = querySelectorByType$1(navHtml, "nav", "landmarks");
			var navItems = navElement ? qsa$1(navElement, "li") : [];
			var length = navItems.length;
			var i;
			var list = [];
			var item;
			if (!navItems || length === 0) return list;
			for (i = 0; i < length; ++i) {
				item = this.landmarkItem(navItems[i]);
				if (item) {
					list.push(item);
					this.landmarksByType[item.type] = i;
				}
			}
			return list;
		}
		/**
		* Create a landmarkItem
		* @private
		* @param  {element} item
		* @return {object} landmarkItem
		*/
		landmarkItem(item) {
			let content = filterChildren$1(item, "a", true);
			if (!content) return;
			let type = content.getAttributeNS("http://www.idpf.org/2007/ops", "type") || void 0;
			return {
				"href": content.getAttribute("href") || "",
				"label": content.textContent || "",
				"type": type
			};
		}
		/**
		* Parse from a Epub > 3.0 NC
		* @private
		* @param  {document} navHtml
		* @return {array} navigation list
		*/
		parseNcx(tocXml) {
			var navPoints = qsa$1(tocXml, "navPoint");
			var length = navPoints.length;
			var i;
			var toc = {};
			var list = [];
			var item, parent;
			if (!navPoints || length === 0) return list;
			for (i = 0; i < length; ++i) {
				item = this.ncxItem(navPoints[i]);
				toc[item.id] = item;
				if (!item.parent) list.push(item);
				else {
					parent = toc[item.parent];
					parent.subitems.push(item);
				}
			}
			return list;
		}
		/**
		* Create a ncxItem
		* @private
		* @param  {element} item
		* @return {object} ncxItem
		*/
		ncxItem(item) {
			var id = item.getAttribute("id") || "", src = qs$1(item, "content").getAttribute("src") || "", navLabel = qs$1(item, "navLabel"), text = navLabel.textContent ? navLabel.textContent : "", subitems = [], parentNode = item.parentNode, parent;
			if (parentNode && (parentNode.nodeName === "navPoint" || parentNode.nodeName.split(":").slice(-1)[0] === "navPoint")) parent = parentNode.getAttribute("id") || void 0;
			return {
				"id": id,
				"href": src,
				"label": text,
				"subitems": subitems,
				"parent": parent
			};
		}
		/**
		* Load Spine Items
		* @param  {object} json the items to be loaded
		* @return {Array} navItems
		*/
		load(json) {
			return json.map((item) => {
				const navItem = item;
				navItem.label = item.title;
				navItem.subitems = item.children ? this.load(item.children) : [];
				return navItem;
			});
		}
		/**
		* forEach pass through
		* @param  {Function} fn function to run on each item
		* @return {method} forEach loop
		*/
		forEach(fn) {
			return this.toc.forEach(fn);
		}
	};
	//#endregion
	//#region src/platform/blob.ts
	/**
	* Create a Blob using the browser platform implementation.
	* @param {any} content Blob content.
	* @param {string} mime Blob MIME type.
	* @returns {Blob} Browser Blob instance.
	*/
	function createBlob$1(content, mime) {
		return new Blob([content], { type: mime });
	}
	/**
	* Create an object URL for browser-rendered content.
	* @param {any} content Blob content.
	* @param {string} mime Blob MIME type.
	* @returns {string} Browser object URL.
	*/
	function createBlobUrl$1(content, mime) {
		var blob = createBlob$1(content, mime);
		return getURLConstructor().createObjectURL(blob);
	}
	/**
	* Revoke an object URL created by the browser platform.
	* @param {string} url Browser object URL.
	* @returns {void}
	*/
	function revokeBlobUrl$1(url) {
		return getURLConstructor().revokeObjectURL(url);
	}
	/**
	* Create a base64 data URL for string content.
	* @param {any} content Source content.
	* @param {string} mime Data URL MIME type.
	* @returns {string | undefined} Base64 data URL.
	*/
	function createBase64Url$1(content, mime) {
		var data;
		if (typeof content !== "string") return;
		data = btoa(content);
		return "data:" + mime + ";base64," + data;
	}
	/**
	* Convert a browser Blob to a base64 data URL.
	* @param {Blob} blob Source Blob.
	* @returns {Promise<string | ArrayBuffer | null>} Base64 data URL.
	*/
	function blobToBase64(blob) {
		return new Promise(function(resolve, reject) {
			var reader = new FileReader();
			reader.onloadend = function() {
				resolve(reader.result);
			};
			reader.onerror = function() {
				reject(reader.error);
			};
			reader.readAsDataURL(blob);
		});
	}
	//#endregion
	//#region src/resources.ts
	/**
	* Handle Package Resources
	* @class
	* @param {Manifest} manifest
	* @param {object} [options]
	* @param {string} [options.replacements="base64"]
	* @param {Archive} [options.archive]
	* @param {method} [options.resolver]
	*/
	var Resources = class {
		settings;
		manifest;
		resources;
		replacementUrls;
		html;
		assets;
		css;
		urls;
		cssUrls;
		constructor(manifest, options) {
			this.settings = {
				replacements: options && options.replacements || "base64",
				archive: options && options.archive,
				resolver: options && options.resolver,
				request: options && options.request
			};
			this.process(manifest);
		}
		/**
		* Process resources
		* @param {Manifest} manifest
		*/
		process(manifest) {
			this.manifest = manifest;
			this.resources = Object.keys(manifest).map(function(key) {
				return manifest[key];
			});
			this.replacementUrls = [];
			this.html = [];
			this.assets = [];
			this.css = [];
			this.urls = [];
			this.cssUrls = [];
			this.split();
			this.splitUrls();
		}
		/**
		* Split resources by type
		* @private
		*/
		split() {
			this.html = this.resources.filter(function(item) {
				if (item.type === "application/xhtml+xml" || item.type === "text/html") return true;
			});
			this.assets = this.resources.filter(function(item) {
				if (item.type !== "application/xhtml+xml" && item.type !== "text/html") return true;
			});
			this.css = this.resources.filter(function(item) {
				if (item.type === "text/css") return true;
			});
		}
		/**
		* Convert split resources into Urls
		* @private
		*/
		splitUrls() {
			this.urls = this.assets.map((item) => {
				return item.href;
			});
			this.cssUrls = this.css.map((item) => {
				return item.href;
			});
		}
		/**
		* Create a url to a resource
		* @param {string} url
		* @return {Promise<string>} Promise resolves with url string
		*/
		createUrl(url) {
			var parsedUrl = new Url(url);
			var mimeType = mime_default.lookup(parsedUrl.filename);
			if (this.settings.archive) return this.settings.archive.createUrl(url, { "base64": this.settings.replacements === "base64" });
			else if (this.settings.replacements === "base64") return this.settings.request(url, "blob").then((blob) => {
				return blobToBase64(blob);
			}).then((blob) => {
				return createBase64Url$1(blob, mimeType);
			});
			else return this.settings.request(url, "blob").then((blob) => {
				return createBlobUrl$1(blob, mimeType);
			});
		}
		/**
		* Create blob urls for all the assets
		* @return {Promise}         returns replacement urls
		*/
		replacements() {
			if (this.settings.replacements === "none") return Promise.resolve(this.urls);
			var replacements = this.urls.map((url) => {
				var absolute = this.settings.resolver(url);
				return this.createUrl(absolute).catch((err) => {
					console.error(err);
					return null;
				});
			});
			return Promise.all(replacements).then((replacementUrls) => {
				this.replacementUrls = replacementUrls.filter((url) => {
					return typeof url === "string";
				});
				return replacementUrls;
			});
		}
		/**
		* Replace URLs in CSS resources
		* @private
		* @param  {Archive} [archive]
		* @param  {method} [resolver]
		* @return {Promise}
		*/
		replaceCss(archive, resolver) {
			var replaced = [];
			archive = archive || this.settings.archive;
			resolver = resolver || this.settings.resolver;
			this.cssUrls.forEach((href) => {
				var replacement = this.createCssFile(href, archive, resolver).then((replacementUrl) => {
					var indexInUrls = this.urls.indexOf(href);
					if (indexInUrls > -1) this.replacementUrls[indexInUrls] = replacementUrl;
				});
				replaced.push(replacement);
			});
			return Promise.all(replaced);
		}
		/**
		* Create a new CSS file with the replaced URLs
		* @private
		* @param  {string} href the original css file
		* @return {Promise}  returns a BlobUrl to the new CSS file or a data url
		*/
		createCssFile(href, archive, resolver) {
			var newUrl;
			if (import_path.default.isAbsolute(href)) return Promise.resolve(void 0);
			resolver = resolver || this.settings.resolver;
			archive = archive || this.settings.archive;
			var absolute = resolver(href);
			var textResponse;
			if (archive) textResponse = archive.getText(absolute);
			else textResponse = this.settings.request(absolute, "text");
			var relUrls = this.urls.map((assetHref) => {
				var resolved = resolver(assetHref);
				return new Path(absolute).relative(resolved);
			});
			if (!textResponse) return Promise.resolve(void 0);
			return textResponse.then((text) => {
				text = substitute(text, relUrls, this.replacementUrls);
				if (this.settings.replacements === "base64") newUrl = createBase64Url$1(text, "text/css");
				else newUrl = createBlobUrl$1(text, "text/css");
				return newUrl;
			}, (err) => {
				return Promise.resolve(void 0);
			});
		}
		/**
		* Resolve all resources URLs relative to an absolute URL
		* @param  {string} absolute to be resolved to
		* @param  {resolver} [resolver]
		* @return {string[]} array with relative Urls
		*/
		relativeTo(absolute, resolver) {
			resolver = resolver || this.settings.resolver;
			return this.urls.map((href) => {
				var resolved = resolver(href);
				return new Path(absolute).relative(resolved);
			});
		}
		/**
		* Get a URL for a resource
		* @param  {string} path
		* @return {string} url
		*/
		get(path) {
			var indexInUrls = this.urls.indexOf(path);
			if (indexInUrls === -1) return;
			if (this.replacementUrls.length) return Promise.resolve(this.replacementUrls[indexInUrls]);
			else return this.createUrl(path);
		}
		/**
		* Substitute urls in content, with replacements,
		* relative to a url if provided
		* @param  {string} content
		* @param  {string} [url]   url to resolve to
		* @return {string}         content with urls substituted
		*/
		substitute(content, url) {
			var relUrls;
			if (url) relUrls = this.relativeTo(url);
			else relUrls = this.urls;
			return substitute(content, relUrls, this.replacementUrls);
		}
		destroy() {
			this.settings = void 0;
			this.manifest = void 0;
			this.resources = void 0;
			this.replacementUrls = void 0;
			this.html = void 0;
			this.assets = void 0;
			this.css = void 0;
			this.urls = void 0;
			this.cssUrls = void 0;
		}
	};
	//#endregion
	//#region src/pagelist.ts
	/**
	* Page List Parser
	* @param {document} [xml]
	*/
	var PageList = class {
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
		constructor(xml) {
			this.pages = [];
			this.locations = [];
			this.hrefs = [];
			this.hrefByPage = {};
			this.pageByHref = {};
			this.epubcfi = new EpubCFI();
			this.firstPage = 0;
			this.lastPage = 0;
			this.totalPages = 0;
			this.toc = void 0;
			this.ncx = void 0;
			if (xml) this.pageList = this.parse(xml);
			if (this.pageList && this.pageList.length) this.process(this.pageList);
		}
		/**
		* Parse PageList Xml
		* @param  {document} xml
		*/
		parse(xml) {
			var html = qs$1(xml, "html");
			var ncx = qs$1(xml, "ncx");
			if (html) return this.parseNav(xml);
			else if (ncx) return this.parseNcx(xml);
		}
		/**
		* Parse a Nav PageList
		* @private
		* @param  {node} navHtml
		* @return {PageList.item[]} list
		*/
		parseNav(navHtml) {
			var navElement = querySelectorByType$1(navHtml, "nav", "page-list");
			var navItems = navElement ? qsa$1(navElement, "li") : [];
			var length = navItems.length;
			var i;
			var list = [];
			var item;
			if (!navItems || length === 0) return list;
			for (i = 0; i < length; ++i) {
				item = this.item(navItems[i]);
				list.push(item);
			}
			return list;
		}
		parseNcx(navXml) {
			var list = [];
			var i = 0;
			var item;
			var pageList;
			var pageTargets;
			var length = 0;
			pageList = qs$1(navXml, "pageList");
			if (!pageList) return list;
			pageTargets = qsa$1(pageList, "pageTarget");
			length = pageTargets.length;
			if (!pageTargets || pageTargets.length === 0) return list;
			for (i = 0; i < length; ++i) {
				item = this.ncxItem(pageTargets[i]);
				list.push(item);
			}
			return list;
		}
		ncxItem(item) {
			var pageText = qs$1(qs$1(item, "navLabel"), "text").textContent || "";
			return {
				"href": qs$1(item, "content").getAttribute("src") || "",
				"page": pageText
			};
		}
		/**
		* Page List Item
		* @private
		* @param  {node} item
		* @return {object} pageListItem
		*/
		item(item) {
			var content = qs$1(item, "a"), href = content.getAttribute("href") || "", page = content.textContent || "", isCfi = href.indexOf("epubcfi"), split, packageUrl, cfi;
			if (isCfi != -1) {
				split = href.split("#");
				packageUrl = split[0];
				cfi = split.length > 1 ? split[1] : false;
				return {
					"cfi": cfi,
					"href": href,
					"packageUrl": packageUrl,
					"page": page
				};
			} else return {
				"href": href,
				"page": page
			};
		}
		/**
		* Process pageList items
		* @private
		* @param  {array} pageList
		*/
		process(pageList) {
			pageList.forEach(function(item) {
				this.pages.push(item.page);
				if (item.href) {
					this.hrefs.push(item.href);
					this.hrefByPage[item.page] = item.href;
					this.pageByHref[item.href] = item.page;
				}
				if (item.cfi) this.locations.push(item.cfi);
			}, this);
			this.firstPage = parseInt(String(this.pages[0]));
			this.lastPage = parseInt(String(this.pages[this.pages.length - 1]));
			this.totalPages = isNaN(this.firstPage) || isNaN(this.lastPage) ? this.pages.length : this.lastPage - this.firstPage;
		}
		/**
		* Get a PageList result from a EpubCFI
		* @param  {string} cfi EpubCFI String
		* @return {string | number} page
		*/
		pageFromCfi(cfi) {
			var pg = -1;
			if (this.locations.length === 0) return -1;
			var index = indexOfSorted$1(cfi, this.locations, this.epubcfi.compare);
			if (index != -1) pg = this.pages[index];
			else {
				index = locationOf$1(cfi, this.locations, this.epubcfi.compare);
				pg = index - 1 >= 0 ? this.pages[index - 1] : this.pages[0];
				if (pg !== void 0) {} else pg = -1;
			}
			return pg;
		}
		/**
		* Get an EpubCFI from a Page List Item
		* @param  {string | number} pg
		* @return {string} cfi
		*/
		cfiFromPage(pg) {
			var cfi = -1;
			var index = this.pages.indexOf(pg);
			if (index != -1) cfi = this.locations[index];
			return cfi;
		}
		/**
		* Get an href from a Page List Item
		* @param  {string | number} pg
		* @return {string | undefined} href
		*/
		hrefFromPage(pg) {
			return this.hrefByPage[pg];
		}
		/**
		* Get a Page List Item from an href
		* @param  {string} href
		* @return {string | number | undefined} page
		*/
		pageFromHref(href) {
			return this.pageByHref[href];
		}
		/**
		* Get a Page from Book percentage
		* @param  {number} percent
		* @return {number} page
		*/
		pageFromPercentage(percent) {
			return Math.round(this.totalPages * percent);
		}
		/**
		* Returns a value between 0 - 1 corresponding to the location of a page
		* @param  {number} pg the page
		* @return {number} percentage
		*/
		percentageFromPage(pg) {
			var percentage = (pg - this.firstPage) / this.totalPages;
			return Math.round(percentage * 1e3) / 1e3;
		}
		/**
		* Returns a value between 0 - 1 corresponding to the location of a cfi
		* @param  {string} cfi EpubCFI String
		* @return {number} percentage
		*/
		percentageFromCfi(cfi) {
			var pg = this.pageFromCfi(cfi);
			return this.percentageFromPage(Number(pg));
		}
		/**
		* Destroy
		*/
		destroy() {
			this.pages = void 0;
			this.locations = void 0;
			this.hrefs = void 0;
			this.hrefByPage = void 0;
			this.pageByHref = void 0;
			this.epubcfi = void 0;
			this.pageList = void 0;
			this.toc = void 0;
			this.ncx = void 0;
		}
	};
	//#endregion
	//#region src/layout.ts
	/**
	* Figures out the CSS values to apply for a layout
	* @class
	* @param {object} settings
	* @param {string} [settings.layout='reflowable']
	* @param {string} [settings.spread]
	* @param {number} [settings.minSpreadWidth=800]
	* @param {boolean} [settings.evenSpreads=false]
	*/
	var Layout = class {
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
		constructor(settings = {}) {
			this.settings = settings;
			this.name = settings.layout || "reflowable";
			this._spread = settings.spread === "none" ? false : true;
			this._minSpreadWidth = settings.minSpreadWidth || 800;
			this._evenSpreads = settings.evenSpreads || false;
			if (settings.flow === "scrolled" || settings.flow === "scrolled-continuous" || settings.flow === "scrolled-doc") this._flow = "scrolled";
			else this._flow = "paginated";
			this.width = 0;
			this.height = 0;
			this.spreadWidth = 0;
			this.pageWidth = 0;
			this.delta = 0;
			this.effectivePageAdvance = 0;
			this.viewportPageWidth = 0;
			this.pageBoundaryShift = 0;
			this.edgeGuardPx = 0;
			this.columnWidth = 0;
			this.gap = 0;
			this.divisor = 1;
			this.props = {
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
		/**
		* Switch the flow between paginated and scrolled
		* @param  {string} flow paginated | scrolled
		* @return {string} simplified flow
		*/
		flow(flow) {
			if (typeof flow !== "undefined") {
				if (flow === "scrolled" || flow === "scrolled-continuous" || flow === "scrolled-doc") this._flow = "scrolled";
				else this._flow = "paginated";
				this.update({ flow: this._flow });
			}
			return this._flow;
		}
		/**
		* Switch between using spreads or not, and set the
		* width at which they switch to single.
		* @param  {string} spread "none" | "always" | "auto"
		* @param  {number} min integer in pixels
		* @return {boolean} spread true | false
		*/
		spread(spread, min) {
			if (spread) {
				this._spread = spread === "none" ? false : true;
				this.update({ spread: this._spread });
			}
			if (typeof min === "number" && min >= 0) this._minSpreadWidth = min;
			return this._spread;
		}
		/**
		* Calculate the dimensions of the pagination
		* @param  {number} _width  width of the rendering
		* @param  {number} _height height of the rendering
		* @param  {number} _gap    width of the gap between columns
		*/
		calculate(_width, _height, _gap) {
			var divisor = 1;
			var gap = _gap || 0;
			var width = _width;
			var height = _height;
			var section = Math.floor(width / 12);
			var columnWidth;
			var spreadWidth;
			var pageWidth;
			var delta;
			if (this._spread && width >= this._minSpreadWidth) divisor = 2;
			else divisor = 1;
			if (this.name === "reflowable" && this._flow === "paginated" && !(_gap >= 0)) gap = section % 2 === 0 ? section : section - 1;
			if (this.name === "pre-paginated") gap = 0;
			if (divisor > 1) {
				columnWidth = width / divisor - gap;
				pageWidth = columnWidth + gap;
			} else {
				columnWidth = width;
				pageWidth = width;
			}
			if (this.name === "pre-paginated" && divisor > 1) width = columnWidth;
			spreadWidth = columnWidth * divisor + gap;
			delta = width;
			this.width = width;
			this.height = height;
			this.spreadWidth = spreadWidth;
			this.pageWidth = pageWidth;
			this.delta = delta;
			this.effectivePageAdvance = delta;
			this.viewportPageWidth = width;
			this.pageBoundaryShift = 0;
			this.columnWidth = columnWidth;
			this.gap = gap;
			this.divisor = divisor;
			this.update({
				width,
				height,
				spreadWidth,
				pageWidth,
				delta,
				effectivePageAdvance: this.effectivePageAdvance,
				viewportPageWidth: this.viewportPageWidth,
				pageBoundaryShift: this.pageBoundaryShift,
				columnWidth,
				gap,
				divisor
			});
		}
		/**
		* Apply Css to a Document
		* @param  {Contents} contents
		* @return {Promise}
		*/
		format(contents, section, axis) {
			var formating;
			if (this.name === "pre-paginated") formating = contents.fit(this.columnWidth, this.height, section);
			else if (this._flow === "paginated") formating = contents.columns(this.width, this.height, this.columnWidth, this.gap, this.settings.direction);
			else if (axis && axis === "horizontal") formating = contents.size(null, this.height);
			else formating = contents.size(this.width, null);
			return formating;
		}
		/**
		* Count number of pages
		* @param  {number} totalLength
		* @param  {number} pageLength
		* @return {{spreads: Number, pages: Number}}
		*/
		count(totalLength, pageLength) {
			let spreads, pages;
			let visiblePageWidth = this.viewportPageWidth || this.pageWidth || this.width || pageLength;
			let effectivePageAdvance = this.effectivePageAdvance || this.delta || pageLength;
			if (this.name === "pre-paginated") {
				spreads = 1;
				pages = 1;
			} else if (this._flow === "paginated") {
				pageLength = pageLength || effectivePageAdvance;
				if (effectivePageAdvance && visiblePageWidth && visiblePageWidth > effectivePageAdvance) {
					pages = Math.ceil(Math.max(0, totalLength - visiblePageWidth) / effectivePageAdvance) + 1;
					spreads = Math.ceil(pages / this.divisor);
				} else {
					spreads = Math.ceil(totalLength / pageLength);
					pages = spreads * this.divisor;
				}
			} else {
				pageLength = pageLength || this.height;
				spreads = Math.ceil(totalLength / pageLength);
				pages = spreads;
			}
			return {
				spreads,
				pages
			};
		}
		/**
		* Update props that have changed
		* @private
		* @param  {object} props
		*/
		update(props) {
			Object.keys(props).forEach((propName) => {
				if (this.props[propName] === props[propName]) delete props[propName];
			});
			if (Object.keys(props).length > 0) {
				let newProps = extend$1(this.props, props);
				this.emit(EVENTS.LAYOUT.UPDATED, newProps, props);
			}
		}
	};
	(0, import_event_emitter.default)(Layout.prototype);
	//#endregion
	//#region src/themes.ts
	/**
	* Themes to apply to displayed content
	* @class
	* @param {Rendition} rendition
	*/
	var Themes = class {
		rendition;
		_themes;
		_overrides;
		_current;
		_injected;
		constructor(rendition) {
			this.rendition = rendition;
			this._themes = { "default": {
				"rules": {},
				"url": "",
				"serialized": ""
			} };
			this._overrides = {};
			this._current = "default";
			this._injected = [];
			this.rendition.hooks.content.register(this.inject.bind(this));
			this.rendition.hooks.content.register(this.overrides.bind(this));
		}
		/**
		* Add themes to be used by a rendition
		* @param {object | Array<object> | string}
		* @example themes.register("light", "http://example.com/light.css")
		* @example themes.register("light", { "body": { "color": "purple"}})
		* @example themes.register({ "light" : {...}, "dark" : {...}})
		*/
		register(...args) {
			if (args.length === 0) return;
			if (args.length === 1 && typeof args[0] === "object") return this.registerThemes(args[0]);
			if (args.length === 1 && typeof args[0] === "string") return this.default(args[0]);
			if (args.length === 2 && typeof args[1] === "string") return this.registerUrl(args[0], args[1]);
			if (args.length === 2 && typeof args[1] === "object") return this.registerRules(args[0], args[1]);
		}
		/**
		* Add a default theme to be used by a rendition
		* @param {object | string} theme
		* @example themes.register("http://example.com/default.css")
		* @example themes.register({ "body": { "color": "purple"}})
		*/
		default(theme) {
			if (!theme) return;
			if (typeof theme === "string") return this.registerUrl("default", theme);
			if (typeof theme === "object") return this.registerRules("default", theme);
		}
		/**
		* Register themes object
		* @param {object} themes
		*/
		registerThemes(themes) {
			for (var theme in themes) if (themes.hasOwnProperty(theme)) if (typeof themes[theme] === "string") this.registerUrl(theme, themes[theme]);
			else this.registerRules(theme, themes[theme]);
		}
		/**
		* Register a theme by passing its css as string
		* @param {string} name
		* @param {string} css
		*/
		registerCss(name, css) {
			this._themes[name] = { "serialized": css };
			if (this._injected[name] || name == "default") this.update(name);
		}
		/**
		* Register a url
		* @param {string} name
		* @param {string} input
		*/
		registerUrl(name, input) {
			var url = new Url(input);
			this._themes[name] = { "url": url.toString() };
			if (this._injected[name] || name == "default") this.update(name);
		}
		/**
		* Register rule
		* @param {string} name
		* @param {object} rules
		*/
		registerRules(name, rules) {
			this._themes[name] = { "rules": rules };
			if (this._injected[name] || name == "default") this.update(name);
		}
		/**
		* Select a theme
		* @param {string} name
		*/
		select(name) {
			var prev = this._current;
			var contents;
			this._current = name;
			this.update(name);
			contents = this.rendition.getContents();
			contents.forEach((content) => {
				content.removeClass(prev);
				content.addClass(name);
			});
		}
		/**
		* Update a theme
		* @param {string} name
		*/
		update(name) {
			this.rendition.getContents().forEach((content) => {
				this.add(name, content);
			});
		}
		/**
		* Inject all themes into contents
		* @param {Contents} contents
		*/
		inject(contents) {
			var links = [];
			var themes = this._themes;
			var theme;
			for (var name in themes) if (themes.hasOwnProperty(name) && (name === this._current || name === "default")) {
				theme = themes[name];
				if (theme.rules && Object.keys(theme.rules).length > 0 || theme.url && links.indexOf(theme.url) === -1) this.add(name, contents);
				this._injected.push(name);
			}
			if (this._current != "default") contents.addClass(this._current);
		}
		/**
		* Add Theme to contents
		* @param {string} name
		* @param {Contents} contents
		*/
		add(name, contents) {
			var theme = this._themes[name];
			if (!theme || !contents) return;
			if (theme.url) contents.addStylesheet(theme.url);
			else if (theme.serialized) {
				contents.addStylesheetCss(theme.serialized, name);
				theme.injected = true;
			} else if (theme.rules) {
				contents.addStylesheetRules(theme.rules, name);
				theme.injected = true;
			}
		}
		/**
		* Add override
		* @param {string} name
		* @param {string} value
		* @param {boolean} priority
		*/
		override(name, value, priority) {
			var contents = this.rendition.getContents();
			this._overrides[name] = {
				value,
				priority: priority === true
			};
			contents.forEach((content) => {
				content.css(name, this._overrides[name].value, this._overrides[name].priority);
			});
		}
		removeOverride(name) {
			var contents = this.rendition.getContents();
			delete this._overrides[name];
			contents.forEach((content) => {
				content.css(name);
			});
		}
		/**
		* Add all overrides
		* @param {Content} content
		*/
		overrides(contents) {
			var overrides = this._overrides;
			for (var rule in overrides) if (overrides.hasOwnProperty(rule)) contents.css(rule, overrides[rule].value, overrides[rule].priority);
		}
		/**
		* Adjust the font size of a rendition
		* @param {number} size
		*/
		fontSize(size) {
			this.override("font-size", size);
		}
		/**
		* Adjust the font-family of a rendition
		* @param {string} f
		*/
		font(f) {
			this.override("font-family", f, true);
		}
		destroy() {
			this.rendition = void 0;
			this._themes = void 0;
			this._overrides = void 0;
			this._current = void 0;
			this._injected = void 0;
		}
	};
	//#endregion
	//#region src/annotations.ts
	/**
	* Handles managing adding & removing Annotations
	* @param {Rendition} rendition
	* @class
	*/
	var Annotations = class {
		rendition;
		highlights;
		underlines;
		marks;
		_annotations;
		_annotationsBySectionIndex;
		constructor(rendition) {
			this.rendition = rendition;
			this.highlights = [];
			this.underlines = [];
			this.marks = [];
			this._annotations = {};
			this._annotationsBySectionIndex = {};
			this.rendition.hooks.render.register(this.inject.bind(this));
			this.rendition.hooks.unloaded.register(this.clear.bind(this));
		}
		/**
		* Add an annotation to store
		* @param {string} type Type of annotation to add: "highlight", "underline", "mark"
		* @param {EpubCFI} cfiRange EpubCFI range to attach annotation to
		* @param {object} data Data to assign to annotation
		* @param {function} [cb] Callback after annotation is added
		* @param {string} className CSS class to assign to annotation
		* @param {object} styles CSS styles to assign to annotation
		* @returns {Annotation} annotation
		*/
		add(type, cfiRange, data, cb, className, styles) {
			let hash = encodeURI(cfiRange + type);
			let sectionIndex = new EpubCFI(cfiRange).spinePos;
			let annotation = new Annotation({
				type,
				cfiRange,
				data,
				sectionIndex,
				cb,
				className,
				styles
			});
			this._annotations[hash] = annotation;
			if (sectionIndex in this._annotationsBySectionIndex) this._annotationsBySectionIndex[sectionIndex].push(hash);
			else this._annotationsBySectionIndex[sectionIndex] = [hash];
			this.rendition.views().forEach((view) => {
				if (annotation.sectionIndex === view.index) annotation.attach(view);
			});
			return annotation;
		}
		/**
		* Remove an annotation from store
		* @param {EpubCFI} cfiRange EpubCFI range the annotation is attached to
		* @param {string} type Type of annotation to add: "highlight", "underline", "mark"
		*/
		remove(cfiRange, type) {
			let hash = encodeURI(cfiRange + type);
			if (hash in this._annotations) {
				let annotation = this._annotations[hash];
				if (type && annotation.type !== type) return;
				this.rendition.views().forEach((view) => {
					this._removeFromAnnotationBySectionIndex(annotation.sectionIndex, hash);
					if (annotation.sectionIndex === view.index) annotation.detach(view);
				});
				delete this._annotations[hash];
			}
		}
		/**
		* Remove an annotations by Section Index
		* @private
		*/
		_removeFromAnnotationBySectionIndex(sectionIndex, hash) {
			this._annotationsBySectionIndex[sectionIndex] = this._annotationsAt(sectionIndex).filter((h) => h !== hash);
		}
		/**
		* Get annotations by Section Index
		* @private
		*/
		_annotationsAt(index) {
			return this._annotationsBySectionIndex[index];
		}
		/**
		* Add a highlight to the store
		* @param {EpubCFI} cfiRange EpubCFI range to attach annotation to
		* @param {object} data Data to assign to annotation
		* @param {function} cb Callback after annotation is clicked
		* @param {string} className CSS class to assign to annotation
		* @param {object} styles CSS styles to assign to annotation
		*/
		highlight(cfiRange, data, cb, className, styles) {
			return this.add("highlight", cfiRange, data, cb, className, styles);
		}
		/**
		* Add a underline to the store
		* @param {EpubCFI} cfiRange EpubCFI range to attach annotation to
		* @param {object} data Data to assign to annotation
		* @param {function} cb Callback after annotation is clicked
		* @param {string} className CSS class to assign to annotation
		* @param {object} styles CSS styles to assign to annotation
		*/
		underline(cfiRange, data, cb, className, styles) {
			return this.add("underline", cfiRange, data, cb, className, styles);
		}
		/**
		* Add a mark to the store
		* @param {EpubCFI} cfiRange EpubCFI range to attach annotation to
		* @param {object} data Data to assign to annotation
		* @param {function} cb Callback after annotation is clicked
		*/
		mark(cfiRange, data, cb) {
			return this.add("mark", cfiRange, data, cb);
		}
		/**
		* iterate over annotations in the store
		*/
		each(...args) {
			return this._annotations.forEach.apply(this._annotations, args);
		}
		/**
		* Hook for injecting annotation into a view
		* @param {View} view
		* @private
		*/
		inject(view) {
			let sectionIndex = view.index;
			if (sectionIndex in this._annotationsBySectionIndex) this._annotationsBySectionIndex[sectionIndex].forEach((hash) => {
				this._annotations[hash].attach(view);
			});
		}
		/**
		* Hook for removing annotation from a view
		* @param {View} view
		* @private
		*/
		clear(view) {
			let sectionIndex = view.index;
			if (sectionIndex in this._annotationsBySectionIndex) this._annotationsBySectionIndex[sectionIndex].forEach((hash) => {
				this._annotations[hash].detach(view);
			});
		}
		/**
		* [Not Implemented] Show annotations
		* @TODO: needs implementation in View
		*/
		show() {}
		/**
		* [Not Implemented] Hide annotations
		* @TODO: needs implementation in View
		*/
		hide() {}
	};
	/**
	* Annotation object
	* @class
	* @param {object} options
	* @param {string} options.type Type of annotation to add: "highlight", "underline", "mark"
	* @param {EpubCFI} options.cfiRange EpubCFI range to attach annotation to
	* @param {object} options.data Data to assign to annotation
	* @param {int} options.sectionIndex Index in the Spine of the Section annotation belongs to
	* @param {function} [options.cb] Callback after annotation is clicked
	* @param {string} className CSS class to assign to annotation
	* @param {object} styles CSS styles to assign to annotation
	* @returns {Annotation} annotation
	*/
	var Annotation = class {
		type;
		cfiRange;
		data;
		sectionIndex;
		mark;
		cb;
		className;
		styles;
		constructor({ type, cfiRange, data, sectionIndex, cb, className, styles }) {
			this.type = type;
			this.cfiRange = cfiRange;
			this.data = data;
			this.sectionIndex = sectionIndex;
			this.mark = void 0;
			this.cb = cb;
			this.className = className;
			this.styles = styles;
		}
		/**
		* Update stored data
		* @param {object} data
		*/
		update(data) {
			this.data = data;
		}
		/**
		* Add to a view
		* @param {View} view
		*/
		attach(view) {
			let { cfiRange, data, type, cb, className, styles } = this;
			let result;
			if (type === "highlight") result = view.highlight(cfiRange, data, cb, className, styles);
			else if (type === "underline") result = view.underline(cfiRange, data, cb, className, styles);
			else if (type === "mark") result = view.mark(cfiRange, data, cb);
			this.mark = result;
			this.emit(EVENTS.ANNOTATION.ATTACH, result);
			return result;
		}
		/**
		* Remove from a view
		* @param {View} view
		*/
		detach(view) {
			let { cfiRange, type } = this;
			let result;
			if (view) {
				if (type === "highlight") result = view.unhighlight(cfiRange);
				else if (type === "underline") result = view.ununderline(cfiRange);
				else if (type === "mark") result = view.unmark(cfiRange);
			}
			this.mark = void 0;
			this.emit(EVENTS.ANNOTATION.DETACH, result);
			return result;
		}
		/**
		* [Not Implemented] Get text of an annotation
		* @TODO: needs implementation in contents
		*/
		text() {}
	};
	(0, import_event_emitter.default)(Annotation.prototype);
	//#endregion
	//#region src/compat/css.ts
	/**
	* Resolve the CSS property spelling supported by the current browser.
	*
	* This keeps legacy prefixed CSS lookup separate from generic core helpers
	* while `utils/core.prefixed()` remains the compatibility export.
	* @param {string} unprefixed CSS property name without a vendor prefix
	* @returns {string} supported CSS property name
	*/
	function prefixed$1(unprefixed) {
		var doc = getDocument();
		var vendors = [
			"Webkit",
			"webkit",
			"Moz",
			"O",
			"ms"
		];
		var prefixes = [
			"-webkit-",
			"-webkit-",
			"-moz-",
			"-o-",
			"-ms-"
		];
		var lower = unprefixed.toLowerCase();
		var length = vendors.length;
		var style = doc && doc.body ? doc.body.style : void 0;
		if (!doc || !doc.body || typeof style[lower] != "undefined") return unprefixed;
		for (var i = 0; i < length; i++) if (typeof style[prefixes[i] + lower] != "undefined") return prefixes[i] + lower;
		return unprefixed;
	}
	//#endregion
	//#region src/platform/layout.ts
	function sumStylePixels(style, props) {
		var total = 0;
		props.forEach(function(prop) {
			total += parseFloat(style[prop]) || 0;
		});
		return total;
	}
	/**
	* Gets the height of the current browser document.
	* @returns {number} Document height.
	*/
	function documentHeight$1() {
		var doc = getDocument();
		return Math.max(doc.documentElement.clientHeight, doc.body.scrollHeight, doc.documentElement.scrollHeight, doc.body.offsetHeight, doc.documentElement.offsetHeight);
	}
	/**
	* Find the bounds of an element, taking padding and margin into account.
	* @param {Element} el Target element.
	* @returns {{ width: number, height: number }} Element bounds.
	*/
	function bounds$1(el) {
		var style = getWindow().getComputedStyle(el);
		return {
			height: sumStylePixels(style, [
				"height",
				"paddingTop",
				"paddingBottom",
				"marginTop",
				"marginBottom",
				"borderTopWidth",
				"borderBottomWidth"
			]),
			width: sumStylePixels(style, [
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
	/**
	* Find the bounds added around an element by padding, margin, and borders.
	* @param {Element} el Target element.
	* @returns {{ width: number, height: number }} Element border bounds.
	*/
	function borders$1(el) {
		var style = getWindow().getComputedStyle(el);
		return {
			height: sumStylePixels(style, [
				"paddingTop",
				"paddingBottom",
				"marginTop",
				"marginBottom",
				"borderTopWidth",
				"borderBottomWidth"
			]),
			width: sumStylePixels(style, [
				"paddingRight",
				"paddingLeft",
				"marginRight",
				"marginLeft",
				"borderRightWidth",
				"borderLeftWidth"
			])
		};
	}
	/**
	* Find the bounds of any node, including text nodes.
	* @param {Node} node Target node.
	* @returns {BoundingClientRect} Node bounds.
	*/
	function nodeBounds$1(node) {
		var doc = node.ownerDocument;
		var range;
		if (node.nodeType == 3) {
			range = doc.createRange();
			range.selectNodeContents(node);
			return range.getBoundingClientRect();
		}
		return node.getBoundingClientRect();
	}
	/**
	* Find the equivalent of getBoundingClientRect for the browser window.
	* @returns {{ width: number, height: number, top: number, left: number, right: number, bottom: number }} Window bounds.
	*/
	function windowBounds$1() {
		var win = getWindow();
		var width = win.innerWidth;
		var height = win.innerHeight;
		return {
			top: 0,
			left: 0,
			right: width,
			bottom: height,
			width,
			height
		};
	}
	//#endregion
	//#region src/mapping.ts
	/**
	* Map text locations to CFI ranges
	* @class
	* @param {Layout} layout Layout to apply
	* @param {string} [direction="ltr"] Text direction
	* @param {string} [axis="horizontal"] vertical or horizontal axis
	* @param {boolean} [dev] toggle developer highlighting
	*/
	var Mapping = class {
		layout;
		horizontal;
		direction;
		_dev;
		constructor(layout, direction, axis, dev = false) {
			this.layout = layout;
			this.horizontal = axis === "horizontal" ? true : false;
			this.direction = direction || "ltr";
			this._dev = dev;
		}
		/**
		* Find CFI pairs for entire section at once
		*/
		section(view) {
			var ranges = this.findRanges(view);
			return this.rangeListToCfiList(view.section.cfiBase, ranges);
		}
		/**
		* Find CFI pairs for a page
		* @param {Contents} contents Contents from view
		* @param {string} cfiBase string of the base for a cfi
		* @param {number} start position to start at
		* @param {number} end position to end at
		*/
		page(contents, cfiBase, start, end) {
			var root = contents && contents.document ? contents.document.body : false;
			var result;
			if (!root) return;
			result = this.rangePairToCfiPair(cfiBase, {
				start: this.findStart(root, start, end),
				end: this.findEnd(root, start, end)
			});
			if (this._dev === true) {
				let doc = contents.document;
				let startRange = new EpubCFI(result.start).toRange(doc);
				let endRange = new EpubCFI(result.end).toRange(doc);
				let selection = doc.defaultView.getSelection();
				let r = doc.createRange();
				selection.removeAllRanges();
				r.setStart(startRange.startContainer, startRange.startOffset);
				r.setEnd(endRange.endContainer, endRange.endOffset);
				selection.addRange(r);
			}
			return result;
		}
		/**
		* Walk a node, preforming a function on each node it finds
		* @private
		* @param {Node} root Node to walkToNode
		* @param {function} func walk function
		* @return {*} returns the result of the walk function
		*/
		walk(root, func) {
			if (root && root.nodeType === Node.TEXT_NODE) return;
			var filter = { acceptNode: function(node) {
				if (node.data.trim().length > 0) return NodeFilter.FILTER_ACCEPT;
				else return NodeFilter.FILTER_REJECT;
			} };
			var safeFilter = filter.acceptNode;
			safeFilter.acceptNode = filter.acceptNode;
			var treeWalker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, safeFilter, false);
			var node;
			var result;
			while (node = treeWalker.nextNode()) {
				result = func(node);
				if (result) break;
			}
			return result;
		}
		findRanges(view) {
			var columns = [];
			var scrollWidth = view.contents.scrollWidth();
			var count = Math.ceil(scrollWidth / this.layout.spreadWidth) * this.layout.divisor;
			var columnWidth = this.layout.columnWidth;
			var gap = this.layout.gap;
			var start, end;
			for (var i = 0; i < count.pages; i++) {
				start = (columnWidth + gap) * i;
				end = columnWidth * (i + 1) + gap * i;
				columns.push({
					start: this.findStart(view.document.body, start, end),
					end: this.findEnd(view.document.body, start, end)
				});
			}
			return columns;
		}
		/**
		* Find Start Range
		* @private
		* @param {Node} root root node
		* @param {number} start position to start at
		* @param {number} end position to end at
		* @return {Range}
		*/
		findStart(root, start, end) {
			var stack = [root];
			var $el;
			var found;
			var $prev = root;
			while (stack.length) {
				$el = stack.shift();
				found = this.walk($el, (node) => {
					var left, right, top, bottom;
					var elPos = nodeBounds$1(node);
					if (this.horizontal && this.direction === "ltr") {
						left = this.horizontal ? elPos.left : elPos.top;
						right = this.horizontal ? elPos.right : elPos.bottom;
						if (left >= start && left <= end) return node;
						else if (right > start) return node;
						else {
							$prev = node;
							stack.push(node);
						}
					} else if (this.horizontal && this.direction === "rtl") {
						left = elPos.left;
						right = elPos.right;
						if (right <= end && right >= start) return node;
						else if (left < end) return node;
						else {
							$prev = node;
							stack.push(node);
						}
					} else {
						top = elPos.top;
						bottom = elPos.bottom;
						if (top >= start && top <= end) return node;
						else if (bottom > start) return node;
						else {
							$prev = node;
							stack.push(node);
						}
					}
				});
				if (found) return this.findTextStartRange(found, start, end);
			}
			return this.findTextStartRange($prev, start, end);
		}
		/**
		* Find End Range
		* @private
		* @param {Node} root root node
		* @param {number} start position to start at
		* @param {number} end position to end at
		* @return {Range}
		*/
		findEnd(root, start, end) {
			var stack = [root];
			var $el;
			var $prev = root;
			var found;
			while (stack.length) {
				$el = stack.shift();
				found = this.walk($el, (node) => {
					var left, right, top, bottom;
					var elPos = nodeBounds$1(node);
					if (this.horizontal && this.direction === "ltr") {
						left = Math.round(elPos.left);
						right = Math.round(elPos.right);
						if (left > end && $prev) return $prev;
						else if (right > end) return node;
						else {
							$prev = node;
							stack.push(node);
						}
					} else if (this.horizontal && this.direction === "rtl") {
						left = Math.round(this.horizontal ? elPos.left : elPos.top);
						right = Math.round(this.horizontal ? elPos.right : elPos.bottom);
						if (right < start && $prev) return $prev;
						else if (left < start) return node;
						else {
							$prev = node;
							stack.push(node);
						}
					} else {
						top = Math.round(elPos.top);
						bottom = Math.round(elPos.bottom);
						if (top > end && $prev) return $prev;
						else if (bottom > end) return node;
						else {
							$prev = node;
							stack.push(node);
						}
					}
				});
				if (found) return this.findTextEndRange(found, start, end);
			}
			return this.findTextEndRange($prev, start, end);
		}
		/**
		* Find Text Start Range
		* @private
		* @param {Node} root root node
		* @param {number} start position to start at
		* @param {number} end position to end at
		* @return {Range}
		*/
		findTextStartRange(node, start, end) {
			var ranges = this.splitTextNodeIntoRanges(node);
			var range;
			var pos;
			var left, top, right;
			for (var i = 0; i < ranges.length; i++) {
				range = ranges[i];
				pos = range.getBoundingClientRect();
				if (this.horizontal && this.direction === "ltr") {
					left = pos.left;
					if (left >= start) return range;
				} else if (this.horizontal && this.direction === "rtl") {
					right = pos.right;
					if (right <= end) return range;
				} else {
					top = pos.top;
					if (top >= start) return range;
				}
			}
			return ranges[0];
		}
		/**
		* Find Text End Range
		* @private
		* @param {Node} root root node
		* @param {number} start position to start at
		* @param {number} end position to end at
		* @return {Range}
		*/
		findTextEndRange(node, start, end) {
			var ranges = this.splitTextNodeIntoRanges(node);
			var prev;
			var range;
			var pos;
			var left, right, top, bottom;
			for (var i = 0; i < ranges.length; i++) {
				range = ranges[i];
				pos = range.getBoundingClientRect();
				if (this.horizontal && this.direction === "ltr") {
					left = pos.left;
					right = pos.right;
					if (left > end && prev) return prev;
					else if (right > end) return range;
				} else if (this.horizontal && this.direction === "rtl") {
					left = pos.left;
					right = pos.right;
					if (right < start && prev) return prev;
					else if (left < start) return range;
				} else {
					top = pos.top;
					bottom = pos.bottom;
					if (top > end && prev) return prev;
					else if (bottom > end) return range;
				}
				prev = range;
			}
			return ranges[ranges.length - 1];
		}
		/**
		* Split up a text node into ranges for each word
		* @private
		* @param {Node} root root node
		* @param {string} [_splitter] what to split on
		* @return {Range[]}
		*/
		splitTextNodeIntoRanges(node, _splitter) {
			var ranges = [];
			var text = (node.textContent || "").trim();
			var range;
			var doc = node.ownerDocument;
			var splitter = _splitter || " ";
			var pos = text.indexOf(splitter);
			if (pos === -1 || node.nodeType != Node.TEXT_NODE) {
				range = doc.createRange();
				range.selectNodeContents(node);
				return [range];
			}
			range = doc.createRange();
			range.setStart(node, 0);
			range.setEnd(node, pos);
			ranges.push(range);
			range = false;
			while (pos != -1) {
				pos = text.indexOf(splitter, pos + 1);
				if (pos > 0) {
					if (range) {
						range.setEnd(node, pos);
						ranges.push(range);
					}
					range = doc.createRange();
					range.setStart(node, pos + 1);
				}
			}
			if (range) {
				range.setEnd(node, text.length);
				ranges.push(range);
			}
			return ranges;
		}
		/**
		* Turn a pair of ranges into a pair of CFIs
		* @private
		* @param {string} cfiBase base string for an EpubCFI
		* @param {object} rangePair { start: Range, end: Range }
		* @return {object} { start: "epubcfi(...)", end: "epubcfi(...)" }
		*/
		rangePairToCfiPair(cfiBase, rangePair) {
			var startRange = rangePair.start;
			var endRange = rangePair.end;
			startRange.collapse(true);
			endRange.collapse(false);
			return {
				start: new EpubCFI(startRange, cfiBase).toString(),
				end: new EpubCFI(endRange, cfiBase).toString()
			};
		}
		rangeListToCfiList(cfiBase, columns) {
			var map = [];
			var cifPair;
			for (var i = 0; i < columns.length; i++) {
				cifPair = this.rangePairToCfiPair(cfiBase, columns[i]);
				map.push(cifPair);
			}
			return map;
		}
		/**
		* Set the axis for mapping
		* @param {string} axis horizontal | vertical
		* @return {boolean} is it horizontal?
		*/
		axis(axis) {
			if (axis) this.horizontal = axis === "horizontal" ? true : false;
			return this.horizontal;
		}
	};
	//#endregion
	//#region src/contents.ts
	var hasNavigator = typeof navigator !== "undefined";
	var isChrome = hasNavigator && /Chrome/.test(navigator.userAgent);
	var isWebkit = hasNavigator && !isChrome && /AppleWebKit/.test(navigator.userAgent);
	var ELEMENT_NODE = 1;
	var TEXT_NODE = 3;
	var VERTICAL_RL_WIDTH_GUARD = 2;
	var VERTICAL_RL_MIN_EDGE_GUARD = 2;
	var SINGLE_MEDIA_SELECTOR = "img, svg, image, video, canvas";
	var VISIBLE_TEXT_BLOCK_SELECTOR = "p, h1, h2, h3, h4, h5, h6, li, table, pre, code, blockquote";
	var median = (values) => {
		if (!values.length) return null;
		const sorted = values.slice().sort((a, b) => a - b);
		return sorted[Math.floor(sorted.length / 2)];
	};
	var hasPageSpreadLeft = (section) => {
		return Boolean(section && typeof section === "object" && Array.isArray(section.properties) && section.properties.includes("page-spread-left"));
	};
	var cssPixelValue = (value) => {
		const parsed = parseFloat(value);
		return Number.isFinite(parsed) ? parsed : 0;
	};
	var countVerticalRlBoundaryCrossings$1 = (contentWidth, pageLength, totalPages, lineBoxes) => {
		let count = 0;
		for (let page = 1; page < totalPages; page += 1) {
			const boundary = contentWidth - page * pageLength;
			for (const box of lineBoxes) if (box.left < boundary && box.right > boundary) count += 1;
		}
		return count;
	};
	var snapVerticalRlContentWidthToTextBoundaries = ({ snappedContentWidth, pageLength, totalPages, rawWidth, lineBoxes }) => {
		if (!Number.isFinite(snappedContentWidth) || !Number.isFinite(pageLength) || !Number.isFinite(totalPages) || totalPages <= 1 || !Array.isArray(lineBoxes) || !lineBoxes.length) return snappedContentWidth;
		const candidates = [0];
		const initialCrossings = countVerticalRlBoundaryCrossings$1(snappedContentWidth, pageLength, totalPages, lineBoxes);
		const maxLineRight = Math.max(0, ...lineBoxes.map((box) => Number(box && box.right)).filter((value) => Number.isFinite(value) && value > 0));
		const rawWidthValue = Number.isFinite(rawWidth) && rawWidth > 0 ? rawWidth : 0;
		const rawWidthLooksLikeFrameOverhang = Boolean(initialCrossings > 0 && rawWidthValue > 0 && maxLineRight > 0 && rawWidthValue > maxLineRight + VERTICAL_RL_WIDTH_GUARD && rawWidthValue - maxLineRight <= Math.max(32, pageLength * .1));
		const minContentWidth = Math.max(rawWidthLooksLikeFrameOverhang ? maxLineRight + VERTICAL_RL_WIDTH_GUARD : rawWidthValue, (totalPages - 1) * pageLength + 1);
		for (let page = 1; page < totalPages; page += 1) {
			const boundary = snappedContentWidth - page * pageLength;
			for (const box of lineBoxes) if (box.left < boundary && box.right > boundary) candidates.push(Math.floor(box.left - boundary - 1));
		}
		let best = {
			width: snappedContentWidth,
			delta: 0,
			crossings: initialCrossings
		};
		for (const delta of Array.from(new Set(candidates))) {
			if (!Number.isFinite(delta) || delta >= 0) continue;
			const width = snappedContentWidth + delta;
			if (width < minContentWidth) continue;
			const crossings = countVerticalRlBoundaryCrossings$1(width, pageLength, totalPages, lineBoxes);
			if (crossings < best.crossings || crossings === best.crossings && Math.abs(delta) < Math.abs(best.delta)) best = {
				width,
				delta,
				crossings
			};
		}
		return best.crossings < initialCrossings ? Math.ceil(best.width) : snappedContentWidth;
	};
	var stabilizeVerticalRlSnappedContentWidth = ({ previous, snappedContentWidth, pageLength, totalPages, lineWidth }) => {
		const width = Number(snappedContentWidth);
		const previousWidth = Number(previous && previous.width);
		if (!Number.isFinite(width) || width <= 0 || !previous || !Number.isFinite(previousWidth) || previousWidth <= 0 || previous.totalPages !== totalPages || Math.abs(Number(previous.pageLength || 0) - Number(pageLength || 0)) > 1) return snappedContentWidth;
		const maxReframeDrift = Math.max(24, Math.min(48, Math.ceil(Number(lineWidth || 0) + VERTICAL_RL_WIDTH_GUARD)));
		if (Math.abs(width - previousWidth) > maxReframeDrift) return snappedContentWidth;
		return Math.min(width, previousWidth);
	};
	var resolveVerticalRlEffectivePageAdvance = ({ viewportPageWidth, linePitch, lineBoxes }) => {
		const safeViewportPageWidth = Number(viewportPageWidth);
		const safeLinePitch = Number(linePitch);
		if (!Number.isFinite(safeViewportPageWidth) || safeViewportPageWidth <= 0 || !Number.isFinite(safeLinePitch) || safeLinePitch <= 1 || !Array.isArray(lineBoxes) || !lineBoxes.length) return safeViewportPageWidth;
		const nearestColumnAdvance = Math.round(safeViewportPageWidth / safeLinePitch) * safeLinePitch;
		if (Math.abs(nearestColumnAdvance - safeViewportPageWidth) <= VERTICAL_RL_WIDTH_GUARD) return safeViewportPageWidth;
		const flooredColumnAdvance = Math.floor(safeViewportPageWidth / safeLinePitch) * safeLinePitch;
		if (Number.isFinite(flooredColumnAdvance) && flooredColumnAdvance > 0 && safeViewportPageWidth - flooredColumnAdvance > VERTICAL_RL_MIN_EDGE_GUARD) return flooredColumnAdvance;
		return safeViewportPageWidth;
	};
	var resolveHorizontalTextWidth = (range, rangeRect, content) => {
		const width = Number(rangeRect && rangeRect.width);
		const scrollWidth = Number(content && content.scrollWidth);
		const clientWidth = Number(content && content.clientWidth);
		const ownerDocument = content && content.ownerDocument;
		const documentElementClientWidth = Number(ownerDocument && ownerDocument.documentElement && ownerDocument.documentElement.clientWidth);
		const bodyScrollWidth = Number(ownerDocument && ownerDocument.body && ownerDocument.body.scrollWidth);
		const viewportScrollWidth = Math.max(Number.isFinite(scrollWidth) ? scrollWidth : 0, Number.isFinite(bodyScrollWidth) ? bodyScrollWidth : 0);
		const visibleScrollWidth = Math.max(Number.isFinite(clientWidth) ? clientWidth : 0, Number.isFinite(bodyScrollWidth) ? bodyScrollWidth : 0);
		const visibleBodyWidth = Math.max(Number.isFinite(bodyScrollWidth) ? bodyScrollWidth : 0, Number.isFinite(scrollWidth) ? scrollWidth : 0);
		const frameViewportWidth = Number.isFinite(documentElementClientWidth) && documentElementClientWidth > 0 ? documentElementClientWidth : visibleScrollWidth;
		const viewportWidth = Number.isFinite(clientWidth) && clientWidth > 0 ? clientWidth : visibleScrollWidth || viewportScrollWidth;
		const pollutedByOffscreenContent = Number.isFinite(width) && width > 0 && rangeRect.left < -Math.max(1, viewportWidth) && width > Math.max(1, visibleScrollWidth || viewportWidth) * 2;
		if (Number.isFinite(width) && width > 0 && visibleBodyWidth > 0 && frameViewportWidth > 0 && visibleBodyWidth <= frameViewportWidth + 1 && width > visibleBodyWidth + 1) return visibleBodyWidth;
		if (Number.isFinite(width) && width > 0 && visibleScrollWidth > 0 && viewportWidth > 0 && visibleScrollWidth <= viewportWidth + 1 && width > viewportWidth + 1) return visibleScrollWidth;
		if (!pollutedByOffscreenContent || !range || typeof range.getClientRects !== "function") return width;
		const rects = Array.from(range.getClientRects()).filter((rect) => {
			return Number.isFinite(rect.left) && Number.isFinite(rect.right) && Number.isFinite(rect.bottom) && rect.width > 0 && rect.height > 0 && rect.right > 0 && rect.bottom > 0;
		});
		if (!rects.length) return visibleScrollWidth || scrollWidth;
		const minLeft = Math.min(...rects.map((rect) => rect.left));
		const maxRight = Math.max(...rects.map((rect) => rect.right));
		const filteredWidth = Math.max(0, maxRight - minLeft);
		return Math.max(filteredWidth, visibleScrollWidth);
	};
	var clampOnePageHorizontalTextWidth = (width, content) => {
		const safeWidth = Number(width);
		const scrollWidth = Number(content && content.scrollWidth);
		const ownerDocument = content && content.ownerDocument;
		const documentElementClientWidth = Number(ownerDocument && ownerDocument.documentElement && ownerDocument.documentElement.clientWidth);
		const bodyScrollWidth = Number(ownerDocument && ownerDocument.body && ownerDocument.body.scrollWidth);
		const visibleBodyWidth = Math.max(Number.isFinite(bodyScrollWidth) ? bodyScrollWidth : 0, Number.isFinite(scrollWidth) ? scrollWidth : 0);
		const frameViewportWidth = Number.isFinite(documentElementClientWidth) && documentElementClientWidth > 0 ? documentElementClientWidth : visibleBodyWidth;
		if (Number.isFinite(safeWidth) && safeWidth > 0 && visibleBodyWidth > 0 && frameViewportWidth > 0 && visibleBodyWidth <= frameViewportWidth + 1 && safeWidth > visibleBodyWidth + 1) return visibleBodyWidth;
		return safeWidth;
	};
	/**
	* Handles DOM manipulation, queries and events for View contents
	* @class
	* @param {document} doc Document
	* @param {element} content Parent Element (typically Body)
	* @param {string} cfiBase Section component of CFIs
	* @param {number} sectionIndex Index in Spine of Conntent's Section
	* @param {string} sectionHref Section href
	*/
	var Contents = class {
		constructor(doc, content, cfiBase, sectionIndex, sectionHref) {
			this.epubcfi = new EpubCFI();
			this.document = doc;
			this.documentElement = this.document.documentElement;
			this.content = content || this.document.body;
			this.window = this.document.defaultView;
			this._size = {
				width: 0,
				height: 0
			};
			this.sectionIndex = sectionIndex || 0;
			this.cfiBase = cfiBase || "";
			this.sectionHref = sectionHref || "";
			this._verticalRlMetricsCache = null;
			this._verticalRlPageMetricsCache = null;
			this._forcedWritingMode = "";
			this.epubReadingSystem("epub.js", "0.3");
			this.called = 0;
			this.active = true;
			this.listeners();
		}
		/**
		* Get DOM events that are listened for and passed along
		*/
		static get listenedEvents() {
			return DOM_EVENTS;
		}
		/**
		* Get or Set width
		* @param {number} [w]
		* @returns {number} width
		*/
		width(w) {
			var frame = this.content;
			if (w && isNumber$1(w)) w = w + "px";
			if (w) frame.style.width = String(w);
			return parseInt(this.window.getComputedStyle(frame)["width"]);
		}
		/**
		* Get or Set height
		* @param {number} [h]
		* @returns {number} height
		*/
		height(h) {
			var frame = this.content;
			if (h && isNumber$1(h)) h = h + "px";
			if (h) frame.style.height = String(h);
			return parseInt(this.window.getComputedStyle(frame)["height"]);
		}
		/**
		* Get or Set width of the contents
		* @param {number} [w]
		* @returns {number} width
		*/
		contentWidth(w) {
			var content = this.content || this.document.body;
			if (w && isNumber$1(w)) w = w + "px";
			if (w) content.style.width = String(w);
			return parseInt(this.window.getComputedStyle(content)["width"]);
		}
		/**
		* Get or Set height of the contents
		* @param {number} [h]
		* @returns {number} height
		*/
		contentHeight(h) {
			var content = this.content || this.document.body;
			if (h && isNumber$1(h)) h = h + "px";
			if (h) content.style.height = String(h);
			return parseInt(this.window.getComputedStyle(content)["height"]);
		}
		/**
		* Get the width of the text using Range
		* @returns {number} width
		*/
		textWidth() {
			let rect;
			let width;
			let range = this.document.createRange();
			let content = this.content || this.document.body;
			let border = borders$1(content);
			if ((this.window && this.window.getComputedStyle(content).writingMode) === "vertical-rl") {
				const cacheKey = this.verticalRlMetricsCacheKey();
				if (this._verticalRlMetricsCache && this._verticalRlMetricsCache.key === cacheKey) return this._verticalRlMetricsCache.width;
				width = this.measureVerticalRlRect().rawWidth;
				if (!Number.isFinite(width) || width <= 0) width = Math.max(content.scrollWidth || 0, this.documentElement ? this.documentElement.scrollWidth || 0 : 0);
				if (border && border.width) width += border.width;
				width = Math.ceil(width + VERTICAL_RL_WIDTH_GUARD);
				this._verticalRlMetricsCache = {
					key: cacheKey,
					width
				};
				return width;
			}
			range.selectNodeContents(content);
			rect = range.getBoundingClientRect();
			width = resolveHorizontalTextWidth(range, rect, content);
			if (border && border.width) width += border.width;
			width = clampOnePageHorizontalTextWidth(width, content);
			return Math.round(width);
		}
		isViewportFillingSingleMediaPage(viewportWidth) {
			const safeViewportWidth = Number(viewportWidth);
			const content = this.content || this.document.body;
			if (!content || !this.document || !this.window || typeof content.querySelectorAll !== "function" || !Number.isFinite(safeViewportWidth) || safeViewportWidth <= 0) return false;
			if (Array.from(content.querySelectorAll(VISIBLE_TEXT_BLOCK_SELECTOR)).filter((node) => {
				if (!(node.textContent || "").replace(/\s+/g, "").trim() || typeof node.getBoundingClientRect !== "function") return false;
				const style = this.window.getComputedStyle(node);
				const rect = node.getBoundingClientRect();
				return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0;
			}).length > 0) return false;
			const visibleText = [];
			const collectVisibleText = (node) => {
				if (!node) return;
				if (node.nodeType === TEXT_NODE) {
					visibleText.push(node.nodeValue || "");
					return;
				}
				if (node.nodeType !== ELEMENT_NODE) return;
				const style = this.window.getComputedStyle(node);
				if (node.hidden || style.display === "none" || style.visibility === "hidden" || style.visibility === "collapse") return;
				Array.from(node.childNodes || []).forEach(collectVisibleText);
			};
			collectVisibleText(content);
			if (visibleText.join(" ").replace(/\s+/g, " ").trim().length > 40) return false;
			const mediaNodes = Array.from(content.querySelectorAll(SINGLE_MEDIA_SELECTOR)).filter((node) => {
				if ((node.tagName ? node.tagName.toLowerCase() : "") !== "svg" && node.closest("svg")) return false;
				if (typeof node.getBoundingClientRect !== "function") return false;
				const style = this.window.getComputedStyle(node);
				const rect = node.getBoundingClientRect();
				return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0;
			});
			if (mediaNodes.length !== 1) return false;
			const media = mediaNodes[0];
			const tagName = media.tagName ? media.tagName.toLowerCase() : "";
			const mediaStyle = this.window.getComputedStyle(media);
			const mediaRect = media.getBoundingClientRect();
			const markedSingleImagePage = content.getAttribute && content.getAttribute("data-epub-single-image-centered") === "1";
			const viewportFillingStyle = mediaStyle.objectFit === "contain" || mediaStyle.position === "absolute" || mediaStyle.position === "fixed";
			const fillsViewportWidth = mediaRect.width >= safeViewportWidth * .75;
			const svgMediaPage = tagName === "svg" && (media.getAttribute && media.getAttribute("viewBox") || media.querySelector && media.querySelector("image"));
			const oversizedMedia = mediaRect.width > safeViewportWidth * 1.5 || (content.scrollWidth || 0) > safeViewportWidth * 1.5 || this.documentElement && (this.documentElement.scrollWidth || 0) > safeViewportWidth * 1.5;
			return Boolean(markedSingleImagePage || viewportFillingStyle && (oversizedMedia || fillsViewportWidth || svgMediaPage));
		}
		/**
		* Get the height of the text using Range
		* @returns {number} height
		*/
		textHeight() {
			let rect;
			let height;
			let range = this.document.createRange();
			let content = this.content || this.document.body;
			if ((this.window && this.window.getComputedStyle(content).writingMode) === "vertical-rl") {
				const rect = this.measureVerticalRlRect();
				if (Number.isFinite(rect.rawHeight) && rect.rawHeight > 0) return Math.ceil(rect.rawHeight);
				const de = this.documentElement;
				const h = Math.max(content.scrollHeight || 0, de ? de.scrollHeight : 0);
				if (h > 0) return h;
			}
			range.selectNodeContents(content);
			rect = range.getBoundingClientRect();
			height = rect.bottom;
			return Math.round(height);
		}
		/**
		* Get documentElement scrollWidth
		* @returns {number} width
		*/
		scrollWidth() {
			return this.documentElement.scrollWidth;
		}
		/**
		* Get documentElement scrollHeight
		* @returns {number} height
		*/
		scrollHeight() {
			return this.documentElement.scrollHeight;
		}
		verticalRlMetricsCacheKey(visiblePageWidth, visiblePageHeight) {
			const content = this.content || this.document.body;
			const docEl = this.documentElement;
			const bodyStyle = content && this.window ? this.window.getComputedStyle(content) : null;
			const docFonts = this.document && this.document.fonts ? this.document.fonts : null;
			return [
				Number.isFinite(Number(visiblePageWidth)) ? Number(visiblePageWidth) : "",
				Number.isFinite(Number(visiblePageHeight)) ? Number(visiblePageHeight) : "",
				docEl ? docEl.clientWidth : 0,
				docEl ? docEl.clientHeight : 0,
				content ? content.clientWidth : 0,
				content ? content.clientHeight : 0,
				content ? content.childElementCount : 0,
				bodyStyle ? bodyStyle.fontSize : "",
				bodyStyle ? bodyStyle.lineHeight : "",
				bodyStyle ? bodyStyle.letterSpacing : "",
				bodyStyle ? bodyStyle.fontFamily : "",
				docFonts ? docFonts.status : ""
			].join(":");
		}
		invalidateVerticalRlMetricsCache() {
			this._verticalRlMetricsCache = null;
			this._verticalRlPageMetricsCache = null;
			this._verticalRlStableSnappedContentWidth = null;
		}
		/**
		* Set overflow css style of the contents
		* @param {string} [overflow]
		*/
		overflow(overflow) {
			if (overflow) this.documentElement.style.overflow = overflow;
			return this.window.getComputedStyle(this.documentElement)["overflow"];
		}
		/**
		* Set overflowX css style of the documentElement
		* @param {string} [overflow]
		*/
		overflowX(overflow) {
			if (overflow) this.documentElement.style.overflowX = overflow;
			return this.window.getComputedStyle(this.documentElement)["overflowX"];
		}
		/**
		* Set overflowY css style of the documentElement
		* @param {string} [overflow]
		*/
		overflowY(overflow) {
			if (overflow) this.documentElement.style.overflowY = overflow;
			return this.window.getComputedStyle(this.documentElement)["overflowY"];
		}
		/**
		* Set Css styles on the contents element (typically Body)
		* @param {string} property
		* @param {string} value
		* @param {boolean} [priority] set as "important"
		*/
		css(property, value, priority) {
			var content = this.content || this.document.body;
			this.invalidateVerticalRlMetricsCache();
			if (value) content.style.setProperty(property, value, priority ? "important" : "");
			else content.style.removeProperty(property);
			return this.window.getComputedStyle(content).getPropertyValue(property);
		}
		/**
		* Get or Set the viewport element
		* @param {object} [options]
		* @param {string} [options.width]
		* @param {string} [options.height]
		* @param {string} [options.scale]
		* @param {string} [options.minimum]
		* @param {string} [options.maximum]
		* @param {string} [options.scalable]
		*/
		viewport(options) {
			var $viewport = this.document.querySelector("meta[name='viewport']");
			var parsed = {
				"width": void 0,
				"height": void 0,
				"scale": void 0,
				"minimum": void 0,
				"maximum": void 0,
				"scalable": void 0
			};
			var newContent = [];
			var settings = {};
			if ($viewport && $viewport.hasAttribute("content")) {
				let content = $viewport.getAttribute("content") || "";
				let _width = content.match(/width\s*=\s*([^,]*)/);
				let _height = content.match(/height\s*=\s*([^,]*)/);
				let _scale = content.match(/initial-scale\s*=\s*([^,]*)/);
				let _minimum = content.match(/minimum-scale\s*=\s*([^,]*)/);
				let _maximum = content.match(/maximum-scale\s*=\s*([^,]*)/);
				let _scalable = content.match(/user-scalable\s*=\s*([^,]*)/);
				if (_width && _width.length && typeof _width[1] !== "undefined") parsed.width = _width[1];
				if (_height && _height.length && typeof _height[1] !== "undefined") parsed.height = _height[1];
				if (_scale && _scale.length && typeof _scale[1] !== "undefined") parsed.scale = _scale[1];
				if (_minimum && _minimum.length && typeof _minimum[1] !== "undefined") parsed.minimum = _minimum[1];
				if (_maximum && _maximum.length && typeof _maximum[1] !== "undefined") parsed.maximum = _maximum[1];
				if (_scalable && _scalable.length && typeof _scalable[1] !== "undefined") parsed.scalable = _scalable[1];
			}
			settings = defaults$1(options || {}, parsed);
			if (options) {
				if (settings.width) newContent.push("width=" + settings.width);
				if (settings.height) newContent.push("height=" + settings.height);
				if (settings.scale) newContent.push("initial-scale=" + settings.scale);
				if (settings.scalable === "no") {
					newContent.push("minimum-scale=" + settings.scale);
					newContent.push("maximum-scale=" + settings.scale);
					newContent.push("user-scalable=" + settings.scalable);
				} else {
					if (settings.scalable) newContent.push("user-scalable=" + settings.scalable);
					if (settings.minimum) newContent.push("minimum-scale=" + settings.minimum);
					if (settings.maximum) newContent.push("minimum-scale=" + settings.maximum);
				}
				if (!$viewport) {
					$viewport = this.document.createElement("meta");
					$viewport.setAttribute("name", "viewport");
					this.document.querySelector("head").appendChild($viewport);
				}
				$viewport.setAttribute("content", newContent.join(", "));
				this.window.scrollTo(0, 0);
			}
			return settings;
		}
		/**
		* Event emitter for when the contents has expanded
		* @private
		*/
		expand() {
			this.emit(EVENTS.CONTENTS.EXPAND);
		}
		/**
		* Add DOM listeners
		* @private
		*/
		listeners() {
			this.imageLoadListeners();
			this.mediaQueryListeners();
			this.addEventListeners();
			this.addSelectionListeners();
			if (typeof ResizeObserver === "undefined") {
				this.resizeListeners();
				this.visibilityListeners();
			} else this.resizeObservers();
			this.linksHandler();
		}
		/**
		* Remove DOM listeners
		* @private
		*/
		removeListeners() {
			this.removeEventListeners();
			this.removeSelectionListeners();
			if (this.observer) this.observer.disconnect();
			clearTimeout(this.expanding);
		}
		/**
		* Check if size of contents has changed and
		* emit 'resize' event if it has.
		* @private
		*/
		resizeCheck() {
			if (!this.document) return;
			this.invalidateVerticalRlMetricsCache();
			let width = this.textWidth();
			let height = this.textHeight();
			if (width != this._size.width || height != this._size.height) {
				this._size = {
					width,
					height
				};
				this.onResize && this.onResize(this._size);
				this.emit(EVENTS.CONTENTS.RESIZE, this._size);
			}
		}
		/**
		* Poll for resize detection
		* @private
		*/
		resizeListeners() {
			clearTimeout(this.expanding);
			requestAnimationFrame(this.resizeCheck.bind(this));
			this.expanding = setTimeout(this.resizeListeners.bind(this), 350);
		}
		/**
		* Listen for visibility of tab to change
		* @private
		*/
		visibilityListeners() {
			document.addEventListener("visibilitychange", () => {
				if (document.visibilityState === "visible" && this.active === false) {
					this.active = true;
					this.resizeListeners();
				} else {
					this.active = false;
					clearTimeout(this.expanding);
				}
			});
		}
		/**
		* Use css transitions to detect resize
		* @private
		*/
		transitionListeners() {
			let body = this.content;
			body.style["transitionProperty"] = "font, font-size, font-size-adjust, font-stretch, font-variation-settings, font-weight, width, height";
			body.style["transitionDuration"] = "0.001ms";
			body.style["transitionTimingFunction"] = "linear";
			body.style["transitionDelay"] = "0";
			this._resizeCheck = this.resizeCheck.bind(this);
			this.document.addEventListener("transitionend", this._resizeCheck);
		}
		/**
		* Listen for media query changes and emit 'expand' event
		* Adapted from: https://github.com/tylergaw/media-query-events/blob/master/js/mq-events.js
		* @private
		*/
		mediaQueryListeners() {
			var sheets = this.document.styleSheets;
			var mediaChangeHandler = function(m) {
				if (m.matches && !this._expanding) setTimeout(this.expand.bind(this), 1);
			}.bind(this);
			for (var i = 0; i < sheets.length; i += 1) {
				var rules;
				try {
					rules = sheets[i].cssRules;
				} catch (e) {
					return;
				}
				if (!rules) return;
				for (var j = 0; j < rules.length; j += 1) if (rules[j].media) this.window.matchMedia(rules[j].media.mediaText).addListener(mediaChangeHandler);
			}
		}
		/**
		* Use ResizeObserver to listen for changes in the DOM and check for resize
		* @private
		*/
		resizeObservers() {
			this.observer = new ResizeObserver((e) => {
				requestAnimationFrame(this.resizeCheck.bind(this));
			});
			this.observer.observe(this.document.documentElement);
		}
		/**
		* Use MutationObserver to listen for changes in the DOM and check for resize
		* @private
		*/
		mutationObservers() {
			this.observer = new MutationObserver((mutations) => {
				this.resizeCheck();
			});
			this.observer.observe(this.document, {
				attributes: true,
				childList: true,
				characterData: true,
				subtree: true
			});
		}
		/**
		* Test if images are loaded or add listener for when they load
		* @private
		*/
		imageLoadListeners() {
			var images = this.document.querySelectorAll("img");
			var img;
			for (var i = 0; i < images.length; i++) {
				img = images[i];
				if (typeof img.naturalWidth !== "undefined" && img.naturalWidth === 0) img.onload = this.expand.bind(this);
			}
		}
		/**
		* Listen for font load and check for resize when loaded
		* @private
		*/
		fontLoadListeners() {
			if (!this.document || !this.document.fonts) return;
			this.document.fonts.ready.then(function() {
				this.resizeCheck();
			}.bind(this));
		}
		/**
		* Get the documentElement
		* @returns {element} documentElement
		*/
		root() {
			if (!this.document) return null;
			return this.document.documentElement;
		}
		/**
		* Get the location offset of a EpubCFI or an #id
		* @param {string | EpubCFI} target
		* @param {string} [ignoreClass] for the cfi
		* @returns { {left: Number, top: Number }
		*/
		locationOf(target, ignoreClass) {
			var position;
			var targetPos = {
				"left": 0,
				"top": 0
			};
			if (!this.document) return targetPos;
			if (this.epubcfi.isCfiString(target)) {
				let range = new EpubCFI(target).toRange(this.document, ignoreClass);
				if (range) {
					try {
						if (!range.endContainer || range.startContainer == range.endContainer && range.startOffset == range.endOffset) {
							let pos = range.startContainer.textContent.indexOf(" ", range.startOffset);
							if (pos == -1) pos = range.startContainer.textContent.length;
							range.setEnd(range.startContainer, pos);
						}
					} catch (e) {
						console.error("setting end offset to start container length failed", e);
					}
					if (range.startContainer.nodeType === Node.ELEMENT_NODE) {
						position = range.startContainer.getBoundingClientRect();
						targetPos.left = position.left;
						targetPos.top = position.top;
					} else if (isWebkit) {
						let container = range.startContainer;
						let newRange = new Range();
						try {
							if (container.nodeType === ELEMENT_NODE) position = container.getBoundingClientRect();
							else if (range.startOffset + 2 < (container.length || 0)) {
								newRange.setStart(container, range.startOffset);
								newRange.setEnd(container, range.startOffset + 2);
								position = newRange.getBoundingClientRect();
							} else if (range.startOffset - 2 > 0) {
								newRange.setStart(container, range.startOffset - 2);
								newRange.setEnd(container, range.startOffset);
								position = newRange.getBoundingClientRect();
							} else position = container.parentNode.getBoundingClientRect();
						} catch (e) {
							console.error(e, e.stack);
						}
					} else position = range.getBoundingClientRect();
				}
			} else if (typeof target === "string" && target.indexOf("#") > -1) {
				let id = target.substring(target.indexOf("#") + 1);
				let el = this.document.getElementById(id);
				if (el) {
					if (isWebkit) {
						let newRange = new Range();
						newRange.selectNode(el);
						position = newRange.getBoundingClientRect();
					} else position = el.getBoundingClientRect();
					if (!position || !position.width && !position.height) position = this.locationOfElement(el);
				}
			}
			if (position) {
				targetPos.left = position.left;
				targetPos.top = position.top;
			}
			return targetPos;
		}
		locationOfElement(el) {
			let candidate = el;
			let position;
			while (candidate && candidate !== this.document.body) {
				if (candidate.getBoundingClientRect) {
					position = candidate.getBoundingClientRect();
					if (position && (position.width || position.height)) return position;
				}
				candidate = candidate.firstElementChild || candidate.nextElementSibling || candidate.parentElement;
			}
			return position;
		}
		/**
		* Append a stylesheet link to the document head
		* @param {string} src url
		*/
		addStylesheet(src) {
			return new Promise(function(resolve, reject) {
				var $stylesheet;
				var ready = false;
				if (!this.document) {
					resolve(false);
					return;
				}
				$stylesheet = this.document.querySelector("link[href='" + src + "']");
				if ($stylesheet) {
					resolve(true);
					return;
				}
				$stylesheet = this.document.createElement("link");
				$stylesheet.type = "text/css";
				$stylesheet.rel = "stylesheet";
				$stylesheet.href = src;
				$stylesheet.onload = $stylesheet.onreadystatechange = function() {
					if (!ready && (!this.readyState || this.readyState == "complete")) {
						ready = true;
						setTimeout(() => {
							resolve(true);
						}, 1);
					}
				};
				this.document.head.appendChild($stylesheet);
			}.bind(this));
		}
		_getStylesheetNode(key) {
			var styleEl;
			key = "epubjs-inserted-css-" + (key || "");
			if (!this.document) return false;
			styleEl = this.document.getElementById(key);
			if (!styleEl) {
				styleEl = this.document.createElement("style");
				styleEl.id = key;
				this.document.head.appendChild(styleEl);
			}
			return styleEl;
		}
		/**
		* Append stylesheet css
		* @param {string} serializedCss
		* @param {string} key If the key is the same, the CSS will be replaced instead of inserted
		*/
		addStylesheetCss(serializedCss, key) {
			if (!this.document || !serializedCss) return false;
			this.invalidateVerticalRlMetricsCache();
			var styleEl = this._getStylesheetNode(key);
			if (!styleEl) return false;
			styleEl.innerHTML = serializedCss;
			return true;
		}
		/**
		* Append stylesheet rules to a generate stylesheet
		* Array: https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet/insertRule
		* Object: https://github.com/desirable-objects/json-to-css
		* @param {array | object} rules
		* @param {string} key If the key is the same, the CSS will be replaced instead of inserted
		*/
		addStylesheetRules(rules, key) {
			var styleSheet;
			if (!this.document || !rules || rules.length === 0) return;
			this.invalidateVerticalRlMetricsCache();
			const styleEl = this._getStylesheetNode(key);
			if (!styleEl || !styleEl.sheet) return;
			styleSheet = styleEl.sheet;
			if (Object.prototype.toString.call(rules) === "[object Array]") for (var i = 0, rl = rules.length; i < rl; i++) {
				var j = 1, rule = rules[i], selector = rules[i][0], propStr = "";
				if (Object.prototype.toString.call(rule[1][0]) === "[object Array]") {
					rule = rule[1];
					j = 0;
				}
				for (var pl = rule.length; j < pl; j++) {
					var prop = rule[j];
					propStr += prop[0] + ":" + prop[1] + (prop[2] ? " !important" : "") + ";\n";
				}
				styleSheet.insertRule(selector + "{" + propStr + "}", styleSheet.cssRules.length);
			}
			else Object.keys(rules).forEach((selector) => {
				const definition = rules[selector];
				if (Array.isArray(definition)) definition.forEach((item) => {
					const result = Object.keys(item).map((rule) => {
						return `${rule}:${item[rule]}`;
					}).join(";");
					styleSheet.insertRule(`${selector}{${result}}`, styleSheet.cssRules.length);
				});
				else {
					const result = Object.keys(definition).map((rule) => {
						return `${rule}:${definition[rule]}`;
					}).join(";");
					styleSheet.insertRule(`${selector}{${result}}`, styleSheet.cssRules.length);
				}
			});
		}
		/**
		* Append a script tag to the document head
		* @param {string} src url
		* @returns {Promise} loaded
		*/
		addScript(src) {
			return new Promise(function(resolve, reject) {
				var $script;
				var ready = false;
				if (!this.document) {
					resolve(false);
					return;
				}
				$script = this.document.createElement("script");
				$script.type = "text/javascript";
				$script.async = true;
				$script.src = src;
				$script.onload = $script.onreadystatechange = function() {
					if (!ready && (!this.readyState || this.readyState == "complete")) {
						ready = true;
						setTimeout(function() {
							resolve(true);
						}, 1);
					}
				};
				this.document.head.appendChild($script);
			}.bind(this));
		}
		/**
		* Add a class to the contents container
		* @param {string} className
		*/
		addClass(className) {
			var content;
			if (!this.document) return;
			content = this.content || this.document.body;
			if (content) content.classList.add(className);
		}
		/**
		* Remove a class from the contents container
		* @param {string} removeClass
		*/
		removeClass(className) {
			var content;
			if (!this.document) return;
			content = this.content || this.document.body;
			if (content) content.classList.remove(className);
		}
		/**
		* Add DOM event listeners
		* @private
		*/
		addEventListeners() {
			if (!this.document) return;
			this._triggerEvent = this.triggerEvent.bind(this);
			DOM_EVENTS.forEach(function(eventName) {
				this.document.addEventListener(eventName, this._triggerEvent, { passive: true });
			}, this);
		}
		/**
		* Remove DOM event listeners
		* @private
		*/
		removeEventListeners() {
			if (!this.document) return;
			DOM_EVENTS.forEach(function(eventName) {
				this.document.removeEventListener(eventName, this._triggerEvent, { passive: true });
			}, this);
			this._triggerEvent = void 0;
		}
		/**
		* Emit passed browser events
		* @private
		*/
		triggerEvent(e) {
			this.emit(e.type, e);
		}
		/**
		* Add listener for text selection
		* @private
		*/
		addSelectionListeners() {
			if (!this.document) return;
			this._onSelectionChange = this.onSelectionChange.bind(this);
			this.document.addEventListener("selectionchange", this._onSelectionChange, { passive: true });
		}
		/**
		* Remove listener for text selection
		* @private
		*/
		removeSelectionListeners() {
			if (!this.document) return;
			this.document.removeEventListener("selectionchange", this._onSelectionChange, { passive: true });
			this._onSelectionChange = void 0;
		}
		/**
		* Handle getting text on selection
		* @private
		*/
		onSelectionChange(e) {
			if (this.selectionEndTimeout) clearTimeout(this.selectionEndTimeout);
			this.selectionEndTimeout = setTimeout(function() {
				var selection = this.window.getSelection();
				this.triggerSelectedEvent(selection);
			}.bind(this), 250);
		}
		/**
		* Emit event on text selection
		* @private
		*/
		triggerSelectedEvent(selection) {
			var range, cfirange;
			if (selection && selection.rangeCount > 0) {
				range = selection.getRangeAt(0);
				if (!range.collapsed) {
					cfirange = new EpubCFI(range, this.cfiBase).toString();
					this.emit(EVENTS.CONTENTS.SELECTED, cfirange);
					this.emit(EVENTS.CONTENTS.SELECTED_RANGE, range);
				}
			}
		}
		/**
		* Get a Dom Range from EpubCFI
		* @param {EpubCFI} _cfi
		* @param {string} [ignoreClass]
		* @returns {Range} range
		*/
		range(_cfi, ignoreClass) {
			return new EpubCFI(_cfi).toRange(this.document, ignoreClass);
		}
		/**
		* Get an EpubCFI from a Dom Range
		* @param {Range} range
		* @param {string} [ignoreClass]
		* @returns {EpubCFI} cfi
		*/
		cfiFromRange(range, ignoreClass) {
			return new EpubCFI(range, this.cfiBase, ignoreClass).toString();
		}
		/**
		* Get an EpubCFI from a Dom node
		* @param {node} node
		* @param {string} [ignoreClass]
		* @returns {EpubCFI} cfi
		*/
		cfiFromNode(node, ignoreClass) {
			return new EpubCFI(node, this.cfiBase, ignoreClass).toString();
		}
		map(layout) {
			return new Mapping(layout).section(void 0);
		}
		/**
		* Size the contents to a given width and height
		* @param {number} [width]
		* @param {number} [height]
		*/
		size(width, height) {
			var viewport = {
				scale: 1,
				scalable: "no"
			};
			this.layoutStyle("scrolling");
			if (width >= 0) {
				this.width(width);
				viewport.width = width;
				this.css("padding", "0 " + width / 12 + "px");
			}
			if (height >= 0) {
				this.height(height);
				viewport.height = height;
			}
			this.css("margin", "0");
			this.css("box-sizing", "border-box");
			this.viewport(viewport);
		}
		/**
		* Apply columns to the contents for pagination
		* @param {number} width
		* @param {number} height
		* @param {number} columnWidth
		* @param {number} gap
		*/
		columns(width, height, columnWidth, gap, dir) {
			this.invalidateVerticalRlMetricsCache();
			let COLUMN_AXIS = prefixed$1("column-axis");
			let COLUMN_GAP = prefixed$1("column-gap");
			let COLUMN_WIDTH = prefixed$1("column-width");
			let COLUMN_FILL = prefixed$1("column-fill");
			let writingMode = this.writingMode();
			let axis = writingMode.indexOf("vertical") === 0 ? "vertical" : "horizontal";
			this.layoutStyle("paginated");
			if (dir === "rtl" && axis === "horizontal") this.direction(dir);
			if (writingMode !== "vertical-rl") this.width(width);
			this.height(height);
			this.viewport({
				width,
				height,
				scale: 1,
				scalable: "no"
			});
			if (writingMode === "vertical-rl") {
				if (this.documentElement) {
					this.documentElement.style.setProperty("overflow", "hidden", "important");
					this.documentElement.style.setProperty("margin", "0", "");
					this.documentElement.style.setProperty("padding", "0", "");
				}
				const body = this.content || this.document.body;
				body.style.margin = "0";
				body.style.padding = "0";
				body.style.width = "";
				body.style.height = height + "px";
				body.style.overflow = "visible";
				body.style.maxWidth = "none";
				body.style.minWidth = "";
				body.style.boxSizing = "border-box";
				body.style.removeProperty(COLUMN_WIDTH);
				body.style.removeProperty(COLUMN_GAP);
				body.style.removeProperty(COLUMN_FILL);
				body.style.removeProperty(COLUMN_AXIS);
			} else {
				this.css("overflow-y", "hidden");
				this.css("margin", "0", true);
				if (axis === "vertical") {
					this.css("padding-top", gap / 2 + "px", true);
					this.css("padding-bottom", gap / 2 + "px", true);
					this.css("padding-left", "20px");
					this.css("padding-right", "20px");
					this.css(COLUMN_AXIS, "vertical");
				} else {
					this.css("padding-top", "20px");
					this.css("padding-bottom", "20px");
					this.css("padding-left", gap / 2 + "px", true);
					this.css("padding-right", gap / 2 + "px", true);
					this.css(COLUMN_AXIS, "horizontal");
				}
				this.css("box-sizing", "border-box");
				this.css("max-width", "inherit");
				this.css(COLUMN_FILL, "auto");
				this.css(COLUMN_GAP, gap + "px");
				this.css(COLUMN_WIDTH, columnWidth + "px");
			}
			this.css("-webkit-line-box-contain", "block glyphs replaced");
		}
		measureVerticalRlRect() {
			const content = this.content || this.document.body;
			if (!content || !this.document) return {
				left: 0,
				right: 0,
				top: 0,
				bottom: 0,
				rawWidth: 0,
				rawHeight: 0
			};
			try {
				const range = this.document.createRange();
				range.selectNodeContents(content);
				const rect = range.getBoundingClientRect();
				const rawWidth = Math.max(rect.width || 0, rect.right || 0);
				return {
					left: rect.left,
					right: rect.right,
					top: rect.top,
					bottom: rect.bottom,
					rawWidth,
					rawHeight: Math.max(rect.height || 0, rect.bottom - Math.min(rect.top, 0))
				};
			} catch (e) {
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
		detectFixedColumnPitch(visiblePageWidth) {
			const content = this.content || this.document.body;
			if (!content || !this.document || !this.window) return null;
			let rects = [];
			try {
				const range = this.document.createRange();
				range.selectNodeContents(content);
				rects = Array.from(range.getClientRects ? range.getClientRects() : []);
			} catch (e) {
				rects = [];
			}
			const safePageWidth = Number(visiblePageWidth);
			const maxGap = Number.isFinite(safePageWidth) && safePageWidth > 0 ? safePageWidth * .75 : 140;
			const xs = [];
			const widths = [];
			const lineBoxes = [];
			for (const rect of rects) if (rect.width > 0 && rect.height > 0) {
				xs.push(Math.round(rect.left * 2) / 2);
				widths.push(rect.width);
				lineBoxes.push({
					left: rect.left,
					right: rect.right,
					width: rect.width
				});
			}
			const uniqueXs = Array.from(new Set(xs)).sort((a, b) => a - b);
			const gaps = [];
			for (let i = 1; i < uniqueXs.length; i += 1) {
				const gap = Math.abs(uniqueXs[i] - uniqueXs[i - 1]);
				if (gap > 2 && gap < maxGap) gaps.push(gap);
			}
			const linePitch = median(gaps);
			const lineWidth = median(widths.filter((width) => width >= 4 && width <= 80));
			const gapMad = Number.isFinite(linePitch) ? median(gaps.map((gap) => Math.abs(gap - linePitch))) : null;
			const stable = Boolean(gaps.length >= 4 && Number.isFinite(linePitch) && Number.isFinite(gapMad) && gapMad <= Math.max(3, linePitch * .08));
			if (!Number.isFinite(linePitch) || !stable) return null;
			return {
				linePitch,
				lineWidth,
				lineLefts: uniqueXs,
				lineBoxes,
				sampleCount: gaps.length,
				gapMad,
				stable
			};
		}
		estimateVerticalRlLineMetrics(visiblePageWidth) {
			return this.detectFixedColumnPitch(visiblePageWidth) || {
				linePitch: null,
				lineWidth: null,
				lineLefts: [],
				lineBoxes: [],
				sampleCount: 0,
				gapMad: null,
				stable: false
			};
		}
		verticalRlPageMetrics(pageWidth, pageHeight) {
			const safePageWidth = Number(pageWidth);
			const safePageHeight = Number(pageHeight);
			const cacheKey = this.verticalRlMetricsCacheKey(safePageWidth, safePageHeight);
			if (this._verticalRlPageMetricsCache && this._verticalRlPageMetricsCache.key === cacheKey) return this._verticalRlPageMetricsCache.metrics;
			const rect = this.measureVerticalRlRect();
			let rawWidth = rect.rawWidth;
			let rawHeight = rect.rawHeight;
			const content = this.content || this.document.body;
			if (this.isViewportFillingSingleMediaPage(safePageWidth)) {
				const pageLength = Number.isFinite(safePageWidth) && safePageWidth > 0 ? safePageWidth : 1;
				rawHeight = Math.ceil(Math.max(Number.isFinite(rawHeight) && rawHeight > 0 ? rawHeight : 0, Number.isFinite(safePageHeight) && safePageHeight > 0 ? safePageHeight : 0, content ? content.scrollHeight || 0 : 0, this.documentElement ? this.documentElement.scrollHeight || 0 : 0));
				const result = {
					rawWidth: pageLength,
					rawPaintWidth: pageLength,
					rawHeight,
					pageWidth: pageLength,
					viewportPageWidth: pageLength,
					effectivePageAdvance: pageLength,
					linePitch: null,
					lineWidth: null,
					edgeGuardPx: 0,
					edgeGuard: 0,
					pageBoundaryShift: 0,
					sampleCount: 0,
					gapMad: null,
					stable: false,
					verticalFragmentPages: 1,
					totalPages: 1,
					snappedContentWidth: pageLength
				};
				this._verticalRlPageMetricsCache = {
					key: cacheKey,
					metrics: result
				};
				this._verticalRlStableSnappedContentWidth = {
					pageLength,
					totalPages: 1,
					width: pageLength
				};
				return result;
			}
			const contentScrollWidth = content ? content.scrollWidth || 0 : 0;
			const contentClientWidth = content ? content.clientWidth || content.offsetWidth || 0 : 0;
			const documentScrollWidth = this.documentElement ? this.documentElement.scrollWidth || 0 : 0;
			const contentCoversDocumentCanvas = Boolean(documentScrollWidth > 0 && contentClientWidth > 0 && contentClientWidth >= documentScrollWidth - VERTICAL_RL_WIDTH_GUARD);
			const scrollWidthLimit = Boolean(Number.isFinite(rect.left) && Number.isFinite(rect.right) && Number.isFinite(rect.rawWidth) && contentCoversDocumentCanvas && rect.left > VERTICAL_RL_WIDTH_GUARD && rect.right >= rect.rawWidth - VERTICAL_RL_WIDTH_GUARD && rect.rawWidth > contentScrollWidth + VERTICAL_RL_WIDTH_GUARD && documentScrollWidth >= rect.rawWidth - VERTICAL_RL_WIDTH_GUARD) ? Math.max(contentScrollWidth, documentScrollWidth) : contentScrollWidth;
			if (!Number.isFinite(rawWidth) || rawWidth <= 0) rawWidth = Math.max(contentScrollWidth, documentScrollWidth);
			else if (Number.isFinite(scrollWidthLimit) && scrollWidthLimit > safePageWidth && rawWidth > scrollWidthLimit + VERTICAL_RL_WIDTH_GUARD) rawWidth = scrollWidthLimit;
			if (!Number.isFinite(rawHeight) || rawHeight <= 0) rawHeight = Math.max(content ? content.scrollHeight || 0 : 0, this.documentElement ? this.documentElement.scrollHeight || 0 : 0);
			rawWidth = Math.ceil(rawWidth + VERTICAL_RL_WIDTH_GUARD);
			rawHeight = Math.ceil(rawHeight);
			const metrics = this.estimateVerticalRlLineMetrics(safePageWidth);
			let viewportPageWidth = Number.isFinite(safePageWidth) && safePageWidth > 0 ? safePageWidth : null;
			let effectivePageAdvance = metrics.stable ? resolveVerticalRlEffectivePageAdvance({
				viewportPageWidth,
				linePitch: metrics.linePitch,
				lineBoxes: metrics.lineBoxes
			}) : viewportPageWidth;
			const structuralBleed = viewportPageWidth && effectivePageAdvance ? Math.max(0, viewportPageWidth - effectivePageAdvance) : 0;
			const edgeGuardPx = metrics.stable && Number.isFinite(metrics.lineWidth) && metrics.lineWidth > 0 && structuralBleed > VERTICAL_RL_MIN_EDGE_GUARD ? Math.min(Math.floor(structuralBleed / 2), Math.max(VERTICAL_RL_MIN_EDGE_GUARD, Math.ceil(metrics.lineWidth / 2) + 1)) : 0;
			const pageLength = effectivePageAdvance || viewportPageWidth || 1;
			let totalPages = Math.max(1, viewportPageWidth && effectivePageAdvance && viewportPageWidth > effectivePageAdvance ? Math.ceil(Math.max(0, rawWidth - viewportPageWidth) / effectivePageAdvance) + 1 : Math.ceil(rawWidth / pageLength));
			let verticalFragmentPages = 1;
			if (totalPages <= 1 && Number.isFinite(safePageHeight) && safePageHeight > 0 && Number.isFinite(rawHeight) && rawHeight > safePageHeight + VERTICAL_RL_MIN_EDGE_GUARD) {
				const contentStyle = content && this.window ? this.window.getComputedStyle(content) : null;
				const columnGap = contentStyle ? cssPixelValue(contentStyle.columnGap) : 0;
				const blockAdvance = Math.max(1, safePageHeight + Math.max(0, columnGap));
				verticalFragmentPages = Math.max(1, Math.ceil(Math.max(0, rawHeight - safePageHeight) / blockAdvance) + 1);
				totalPages = Math.max(totalPages, verticalFragmentPages);
			}
			let snappedContentWidth = snapVerticalRlContentWidthToTextBoundaries({
				snappedContentWidth: viewportPageWidth && effectivePageAdvance && viewportPageWidth > effectivePageAdvance ? (totalPages - 1) * effectivePageAdvance + viewportPageWidth : totalPages * pageLength,
				pageLength,
				totalPages,
				rawWidth,
				lineBoxes: metrics.lineBoxes
			});
			snappedContentWidth = stabilizeVerticalRlSnappedContentWidth({
				previous: this._verticalRlStableSnappedContentWidth,
				snappedContentWidth,
				pageLength,
				totalPages,
				lineWidth: metrics.lineWidth
			});
			this._verticalRlStableSnappedContentWidth = {
				pageLength,
				totalPages,
				width: snappedContentWidth
			};
			const pageBoundaryShift = edgeGuardPx;
			const result = {
				rawWidth,
				rawPaintWidth: rawWidth,
				rawHeight,
				pageWidth: viewportPageWidth || pageLength,
				viewportPageWidth,
				effectivePageAdvance,
				linePitch: metrics.linePitch,
				lineWidth: metrics.lineWidth,
				edgeGuardPx,
				edgeGuard: edgeGuardPx,
				pageBoundaryShift,
				sampleCount: metrics.sampleCount,
				gapMad: metrics.gapMad,
				stable: metrics.stable,
				verticalFragmentPages,
				totalPages,
				snappedContentWidth
			};
			this._verticalRlPageMetricsCache = {
				key: cacheKey,
				metrics: result
			};
			return result;
		}
		debugVerticalRlMetrics(pageWidth) {
			const content = this.content || this.document.body;
			const htmlStyle = this.documentElement ? this.window.getComputedStyle(this.documentElement) : null;
			const bodyStyle = content ? this.window.getComputedStyle(content) : null;
			let rangeRect = null;
			try {
				const range = this.document.createRange();
				range.selectNodeContents(content);
				rangeRect = range.getBoundingClientRect();
			} catch (e) {
				rangeRect = null;
			}
			const bodyRect = content && content.getBoundingClientRect ? content.getBoundingClientRect() : null;
			const pageMetrics = this.verticalRlPageMetrics(pageWidth);
			const rawContentWidth = pageMetrics.rawWidth;
			const snappedContentWidth = pageMetrics.snappedContentWidth;
			const totalPages = pageMetrics.totalPages;
			const result = {
				userAgent: this.window.navigator.userAgent,
				htmlWritingMode: htmlStyle ? htmlStyle.writingMode : null,
				bodyWritingMode: bodyStyle ? bodyStyle.writingMode : null,
				htmlDirection: htmlStyle ? htmlStyle.direction : null,
				bodyDirection: bodyStyle ? bodyStyle.direction : null,
				htmlOverflow: htmlStyle ? htmlStyle.overflow : null,
				bodyOverflow: bodyStyle ? bodyStyle.overflow : null,
				bodyRectLeft: bodyRect ? bodyRect.left : null,
				bodyRectRight: bodyRect ? bodyRect.right : null,
				bodyRectWidth: bodyRect ? bodyRect.width : null,
				rangeRectLeft: rangeRect ? rangeRect.left : null,
				rangeRectRight: rangeRect ? rangeRect.right : null,
				rangeRectWidth: rangeRect ? rangeRect.width : null,
				rawContentWidth,
				rawContentHeight: pageMetrics.rawHeight,
				snappedContentWidth,
				pageWidth: pageMetrics.pageWidth,
				effectivePageAdvance: pageMetrics.effectivePageAdvance,
				linePitch: pageMetrics.linePitch,
				lineWidth: pageMetrics.lineWidth,
				edgeGuardPx: pageMetrics.edgeGuardPx,
				sampleCount: pageMetrics.sampleCount,
				gapMad: pageMetrics.gapMad,
				stable: pageMetrics.stable,
				totalPages
			};
			if (this.window.console && this.window.console.debug) this.window.console.debug("[epubjs:vertical-rl]", result);
			return result;
		}
		/**
		* Scale contents from center
		* @param {number} scale
		* @param {number} offsetX
		* @param {number} offsetY
		*/
		scaler(scale, offsetX, offsetY) {
			var scaleStr = "scale(" + scale + ")";
			var translateStr = "";
			this.css("transform-origin", "top left");
			if (offsetX >= 0 || offsetY >= 0) translateStr = " translate(" + (offsetX || 0) + "px, " + (offsetY || 0) + "px )";
			this.css("transform", scaleStr + translateStr);
		}
		/**
		* Fit contents into a fixed width and height
		* @param {number} width
		* @param {number} height
		*/
		fit(width, height, section) {
			var viewport = this.viewport();
			var viewportWidth = parseInt(String(viewport.width));
			var viewportHeight = parseInt(String(viewport.height));
			var widthScale = width / viewportWidth;
			var heightScale = height / viewportHeight;
			var scale = widthScale < heightScale ? widthScale : heightScale;
			this.layoutStyle("paginated");
			this.width(viewportWidth);
			this.height(viewportHeight);
			this.overflow("hidden");
			this.scaler(scale, 0, 0);
			this.css("background-size", viewportWidth * scale + "px " + viewportHeight * scale + "px");
			this.css("background-color", "transparent");
			if (hasPageSpreadLeft(section)) {
				var marginLeft = width - viewportWidth * scale;
				this.css("margin-left", marginLeft + "px");
			}
		}
		/**
		* Set the direction of the text
		* @param {string} [dir="ltr"] "rtl" | "ltr"
		*/
		direction(dir) {
			if (this.documentElement) this.documentElement.style["direction"] = dir || "";
		}
		mapPage(cfiBase, layout, start, end, dev) {
			return new Mapping(layout, void 0, void 0, dev).page(this, cfiBase, start, end);
		}
		/**
		* Emit event when link in content is clicked
		* @private
		*/
		linksHandler() {
			replaceLinks(this.content, (href) => {
				this.emit(EVENTS.CONTENTS.LINK_CLICKED, href);
			}, this.sectionHref);
		}
		/**
		* Set the writingMode of the text
		* @param {string} [mode="horizontal-tb"] "horizontal-tb" | "vertical-rl" | "vertical-lr"
		*/
		writingMode(mode) {
			let WRITING_MODE = prefixed$1("writing-mode");
			if (mode && this.documentElement) this.documentElement.style.setProperty(WRITING_MODE, mode);
			const bodyEl = this.document && this.document.body;
			if (bodyEl) {
				const inlineWM = bodyEl.style && bodyEl.style.getPropertyValue(WRITING_MODE);
				if (inlineWM && inlineWM !== "horizontal-tb") return inlineWM;
				try {
					const sheets = Array.from(this.document.styleSheets || []);
					for (const sheet of sheets) {
						let rules;
						try {
							rules = Array.from(sheet.cssRules || []);
						} catch (e) {
							continue;
						}
						for (const rule of rules) {
							const styleRule = rule;
							if (styleRule.style && styleRule.selectorText) {
								const sel = styleRule.selectorText.toLowerCase();
								if (sel === "body" || sel === "html, body" || sel === "body, html") {
									const wm = styleRule.style.getPropertyValue(WRITING_MODE);
									if (wm && wm !== "horizontal-tb") return wm;
								}
							}
						}
					}
				} catch (e) {}
			}
			if (bodyEl) {
				const bodyComputedWM = this.window.getComputedStyle(bodyEl).getPropertyValue(WRITING_MODE);
				if (bodyComputedWM && bodyComputedWM !== "horizontal-tb") return bodyComputedWM;
			}
			const documentComputedWM = this.window.getComputedStyle(this.documentElement).getPropertyValue(WRITING_MODE) || "";
			if (documentComputedWM && documentComputedWM !== "horizontal-tb") return documentComputedWM;
			return this._forcedWritingMode || documentComputedWM;
		}
		forceWritingMode(mode) {
			if (mode === "vertical-rl" || mode === "vertical-lr" || mode === "horizontal-tb") this._forcedWritingMode = mode;
			return this._forcedWritingMode;
		}
		/**
		* Set the layoutStyle of the content
		* @param {string} [style="paginated"] "scrolling" | "paginated"
		* @private
		*/
		layoutStyle(style) {
			if (style) {
				this._layoutStyle = style;
				navigator.epubReadingSystem.layoutStyle = this._layoutStyle;
			}
			return this._layoutStyle || "paginated";
		}
		/**
		* Add the epubReadingSystem object to the navigator
		* @param {string} name
		* @param {string} version
		* @private
		*/
		epubReadingSystem(name, version) {
			navigator.epubReadingSystem = {
				name,
				version,
				layoutStyle: this.layoutStyle(),
				hasFeature: function(feature) {
					switch (feature) {
						case "dom-manipulation": return true;
						case "layout-changes": return true;
						case "touch-events": return true;
						case "mouse-events": return true;
						case "keyboard-events": return true;
						case "spine-scripting": return false;
						default: return false;
					}
				}
			};
			return navigator.epubReadingSystem;
		}
		destroy() {
			this.removeListeners();
		}
	};
	(0, import_event_emitter.default)(Contents.prototype);
	//#endregion
	//#region node_modules/marks-pane/lib/svg.js
	var require_svg = /* @__PURE__ */ __commonJSMin(((exports) => {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.createElement = createElement;
		function createElement(name) {
			return document.createElementNS("http://www.w3.org/2000/svg", name);
		}
		exports.default = { createElement };
	}));
	//#endregion
	//#region node_modules/marks-pane/lib/events.js
	var require_events = /* @__PURE__ */ __commonJSMin(((exports) => {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.proxyMouse = proxyMouse;
		exports.clone = clone;
		exports.default = { proxyMouse };
		/**
		* Start proxying all mouse events that occur on the target node to each node in
		* a set of tracked nodes.
		*
		* The items in tracked do not strictly have to be DOM Nodes, but they do have
		* to have dispatchEvent, getBoundingClientRect, and getClientRects methods.
		*
		* @param target {Node} The node on which to listen for mouse events.
		* @param tracked {Node[]} A (possibly mutable) array of nodes to which to proxy
		*                         events.
		*/
		function proxyMouse(target, tracked) {
			function dispatch(e) {
				for (var i = tracked.length - 1; i >= 0; i--) {
					var t = tracked[i];
					var x = e.clientX;
					var y = e.clientY;
					if (e.touches && e.touches.length) {
						x = e.touches[0].clientX;
						y = e.touches[0].clientY;
					}
					if (!contains(t, target, x, y)) continue;
					t.dispatchEvent(clone(e));
					break;
				}
			}
			if (target.nodeName === "iframe" || target.nodeName === "IFRAME") try {
				this.target = target.contentDocument;
			} catch (err) {
				this.target = target;
			}
			else this.target = target;
			var _arr = [
				"mouseup",
				"mousedown",
				"click",
				"touchstart"
			];
			for (var _i = 0; _i < _arr.length; _i++) {
				var ev = _arr[_i];
				this.target.addEventListener(ev, function(e) {
					return dispatch(e);
				}, false);
			}
		}
		/**
		* Clone a mouse event object.
		*
		* @param e {MouseEvent} A mouse event object to clone.
		* @returns {MouseEvent}
		*/
		function clone(e) {
			var opts = Object.assign({}, e, { bubbles: false });
			try {
				return new MouseEvent(e.type, opts);
			} catch (err) {
				var copy = document.createEvent("MouseEvents");
				copy.initMouseEvent(e.type, false, opts.cancelable, opts.view, opts.detail, opts.screenX, opts.screenY, opts.clientX, opts.clientY, opts.ctrlKey, opts.altKey, opts.shiftKey, opts.metaKey, opts.button, opts.relatedTarget);
				return copy;
			}
		}
		/**
		* Check if the item contains the point denoted by the passed coordinates
		* @param item {Object} An object with getBoundingClientRect and getClientRects
		*                      methods.
		* @param x {Number}
		* @param y {Number}
		* @returns {Boolean}
		*/
		function contains(item, target, x, y) {
			var offset = target.getBoundingClientRect();
			function rectContains(r, x, y) {
				var top = r.top - offset.top;
				var left = r.left - offset.left;
				var bottom = top + r.height;
				var right = left + r.width;
				return top <= y && left <= x && bottom > y && right > x;
			}
			if (!rectContains(item.getBoundingClientRect(), x, y)) return false;
			var rects = item.getClientRects();
			for (var i = 0, len = rects.length; i < len; i++) if (rectContains(rects[i], x, y)) return true;
			return false;
		}
	}));
	//#endregion
	//#region src/managers/views/iframe.ts
	var import_marks = (/* @__PURE__ */ __commonJSMin(((exports) => {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.Underline = exports.Highlight = exports.Mark = exports.Pane = void 0;
		var _get = function get(object, property, receiver) {
			if (object === null) object = Function.prototype;
			var desc = Object.getOwnPropertyDescriptor(object, property);
			if (desc === void 0) {
				var parent = Object.getPrototypeOf(object);
				if (parent === null) return;
				else return get(parent, property, receiver);
			} else if ("value" in desc) return desc.value;
			else {
				var getter = desc.get;
				if (getter === void 0) return;
				return getter.call(receiver);
			}
		};
		var _createClass = function() {
			function defineProperties(target, props) {
				for (var i = 0; i < props.length; i++) {
					var descriptor = props[i];
					descriptor.enumerable = descriptor.enumerable || false;
					descriptor.configurable = true;
					if ("value" in descriptor) descriptor.writable = true;
					Object.defineProperty(target, descriptor.key, descriptor);
				}
			}
			return function(Constructor, protoProps, staticProps) {
				if (protoProps) defineProperties(Constructor.prototype, protoProps);
				if (staticProps) defineProperties(Constructor, staticProps);
				return Constructor;
			};
		}();
		var _svg2 = _interopRequireDefault(require_svg());
		var _events2 = _interopRequireDefault(require_events());
		function _interopRequireDefault(obj) {
			return obj && obj.__esModule ? obj : { default: obj };
		}
		function _possibleConstructorReturn(self, call) {
			if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			return call && (typeof call === "object" || typeof call === "function") ? call : self;
		}
		function _inherits(subClass, superClass) {
			if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
			subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
				value: subClass,
				enumerable: false,
				writable: true,
				configurable: true
			} });
			if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
		}
		function _classCallCheck(instance, Constructor) {
			if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
		}
		exports.Pane = function() {
			function Pane(target) {
				var container = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : document.body;
				_classCallCheck(this, Pane);
				this.target = target;
				this.element = _svg2.default.createElement("svg");
				this.marks = [];
				this.element.style.position = "absolute";
				this.element.setAttribute("pointer-events", "none");
				_events2.default.proxyMouse(this.target, this.marks);
				this.container = container;
				this.container.appendChild(this.element);
				this.render();
			}
			_createClass(Pane, [
				{
					key: "addMark",
					value: function addMark(mark) {
						var g = _svg2.default.createElement("g");
						this.element.appendChild(g);
						mark.bind(g, this.container);
						this.marks.push(mark);
						mark.render();
						return mark;
					}
				},
				{
					key: "removeMark",
					value: function removeMark(mark) {
						var idx = this.marks.indexOf(mark);
						if (idx === -1) return;
						var el = mark.unbind();
						this.element.removeChild(el);
						this.marks.splice(idx, 1);
					}
				},
				{
					key: "render",
					value: function render() {
						setCoords(this.element, coords(this.target, this.container));
						var _iteratorNormalCompletion = true;
						var _didIteratorError = false;
						var _iteratorError = void 0;
						try {
							for (var _iterator = this.marks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) _step.value.render();
						} catch (err) {
							_didIteratorError = true;
							_iteratorError = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion && _iterator.return) _iterator.return();
							} finally {
								if (_didIteratorError) throw _iteratorError;
							}
						}
					}
				}
			]);
			return Pane;
		}();
		exports.Underline = function(_Highlight) {
			_inherits(Underline, _Highlight);
			function Underline(range, className, data, attributes) {
				_classCallCheck(this, Underline);
				return _possibleConstructorReturn(this, (Underline.__proto__ || Object.getPrototypeOf(Underline)).call(this, range, className, data, attributes));
			}
			_createClass(Underline, [{
				key: "render",
				value: function render() {
					while (this.element.firstChild) this.element.removeChild(this.element.firstChild);
					var docFrag = this.element.ownerDocument.createDocumentFragment();
					var filtered = this.filteredRanges();
					var offset = this.element.getBoundingClientRect();
					var container = this.container.getBoundingClientRect();
					for (var i = 0, len = filtered.length; i < len; i++) {
						var r = filtered[i];
						var rect = _svg2.default.createElement("rect");
						rect.setAttribute("x", r.left - offset.left + container.left);
						rect.setAttribute("y", r.top - offset.top + container.top);
						rect.setAttribute("height", r.height);
						rect.setAttribute("width", r.width);
						rect.setAttribute("fill", "none");
						var line = _svg2.default.createElement("line");
						line.setAttribute("x1", r.left - offset.left + container.left);
						line.setAttribute("x2", r.left - offset.left + container.left + r.width);
						line.setAttribute("y1", r.top - offset.top + container.top + r.height - 1);
						line.setAttribute("y2", r.top - offset.top + container.top + r.height - 1);
						line.setAttribute("stroke-width", 1);
						line.setAttribute("stroke", "black");
						line.setAttribute("stroke-linecap", "square");
						docFrag.appendChild(rect);
						docFrag.appendChild(line);
					}
					this.element.appendChild(docFrag);
				}
			}]);
			return Underline;
		}(exports.Highlight = function(_Mark) {
			_inherits(Highlight, _Mark);
			function Highlight(range, className, data, attributes) {
				_classCallCheck(this, Highlight);
				var _this = _possibleConstructorReturn(this, (Highlight.__proto__ || Object.getPrototypeOf(Highlight)).call(this));
				_this.range = range;
				_this.className = className;
				_this.data = data || {};
				_this.attributes = attributes || {};
				return _this;
			}
			_createClass(Highlight, [{
				key: "bind",
				value: function bind(element, container) {
					_get(Highlight.prototype.__proto__ || Object.getPrototypeOf(Highlight.prototype), "bind", this).call(this, element, container);
					for (var attr in this.data) if (this.data.hasOwnProperty(attr)) this.element.dataset[attr] = this.data[attr];
					for (var attr in this.attributes) if (this.attributes.hasOwnProperty(attr)) this.element.setAttribute(attr, this.attributes[attr]);
					if (this.className) this.element.classList.add(this.className);
				}
			}, {
				key: "render",
				value: function render() {
					while (this.element.firstChild) this.element.removeChild(this.element.firstChild);
					var docFrag = this.element.ownerDocument.createDocumentFragment();
					var filtered = this.filteredRanges();
					var offset = this.element.getBoundingClientRect();
					var container = this.container.getBoundingClientRect();
					for (var i = 0, len = filtered.length; i < len; i++) {
						var r = filtered[i];
						var el = _svg2.default.createElement("rect");
						el.setAttribute("x", r.left - offset.left + container.left);
						el.setAttribute("y", r.top - offset.top + container.top);
						el.setAttribute("height", r.height);
						el.setAttribute("width", r.width);
						docFrag.appendChild(el);
					}
					this.element.appendChild(docFrag);
				}
			}]);
			return Highlight;
		}(exports.Mark = function() {
			function Mark() {
				_classCallCheck(this, Mark);
				this.element = null;
			}
			_createClass(Mark, [
				{
					key: "bind",
					value: function bind(element, container) {
						this.element = element;
						this.container = container;
					}
				},
				{
					key: "unbind",
					value: function unbind() {
						var el = this.element;
						this.element = null;
						return el;
					}
				},
				{
					key: "render",
					value: function render() {}
				},
				{
					key: "dispatchEvent",
					value: function dispatchEvent(e) {
						if (!this.element) return;
						this.element.dispatchEvent(e);
					}
				},
				{
					key: "getBoundingClientRect",
					value: function getBoundingClientRect() {
						return this.element.getBoundingClientRect();
					}
				},
				{
					key: "getClientRects",
					value: function getClientRects() {
						var rects = [];
						var el = this.element.firstChild;
						while (el) {
							rects.push(el.getBoundingClientRect());
							el = el.nextSibling;
						}
						return rects;
					}
				},
				{
					key: "filteredRanges",
					value: function filteredRanges() {
						var rects = Array.from(this.range.getClientRects());
						return rects.filter(function(box) {
							for (var i = 0; i < rects.length; i++) {
								if (rects[i] === box) return true;
								if (contains(rects[i], box)) return false;
							}
							return true;
						});
					}
				}
			]);
			return Mark;
		}()));
		function coords(el, container) {
			var offset = container.getBoundingClientRect();
			var rect = el.getBoundingClientRect();
			return {
				top: rect.top - offset.top,
				left: rect.left - offset.left,
				height: el.scrollHeight,
				width: el.scrollWidth
			};
		}
		function setCoords(el, coords) {
			el.style.setProperty("top", coords.top + "px", "important");
			el.style.setProperty("left", coords.left + "px", "important");
			el.style.setProperty("height", coords.height + "px", "important");
			el.style.setProperty("width", coords.width + "px", "important");
		}
		function contains(rect1, rect2) {
			return rect2.right <= rect1.right && rect2.left >= rect1.left && rect2.top >= rect1.top && rect2.bottom <= rect1.bottom;
		}
	})))();
	var Defer$4 = defer$1;
	var ContentsCtor = Contents;
	function stripScriptTagsFromContents(contents) {
		if (typeof contents !== "string" || contents.toLowerCase().indexOf("<script") === -1) return contents;
		return contents.replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, "").replace(/<script\b[^>]*\/\s*>/gi, "");
	}
	var shouldDebugVerticalRl = () => {
		return typeof window !== "undefined" && window.__EPUB_VRL_DEBUG__ === true;
	};
	var IframeView = class {
		constructor(section, options) {
			this.settings = extend$1({
				ignoreClass: "",
				axis: void 0,
				direction: void 0,
				width: 0,
				height: 0,
				layout: void 0,
				globalLayoutProperties: {},
				method: void 0,
				forceRight: false,
				allowScriptedContent: false,
				allowPopups: false
			}, options || {});
			this.id = "epubjs-view-" + uuid$1();
			this.section = section;
			this.index = section.index;
			this.element = this.container(this.settings.axis);
			this.added = false;
			this.displayed = false;
			this.rendered = false;
			this.fixedWidth = 0;
			this.fixedHeight = 0;
			this.epubcfi = new EpubCFI();
			this.layout = this.settings.layout;
			this.pane = void 0;
			this.highlights = {};
			this.underlines = {};
			this.marks = {};
		}
		container(axis) {
			var element = document.createElement("div");
			element.classList.add("epub-view");
			element.style.height = "0px";
			element.style.width = "0px";
			element.style.overflow = "hidden";
			element.style.position = "relative";
			element.style.display = "block";
			if (axis && axis == "horizontal") element.style.flex = "none";
			else element.style.flex = "initial";
			return element;
		}
		create() {
			if (this.iframe) return this.iframe;
			if (!this.element) this.element = this.createContainer();
			this.iframe = document.createElement("iframe");
			this.iframe.id = this.id;
			this.iframe.scrolling = "no";
			this.iframe.style.overflow = "hidden";
			this.iframe.seamless = "seamless";
			this.iframe.style.border = "none";
			this.iframe.sandbox = "allow-same-origin";
			if (this.settings.allowScriptedContent) this.iframe.sandbox += " allow-scripts";
			if (this.settings.allowPopups) this.iframe.sandbox += " allow-popups";
			this.iframe.setAttribute("enable-annotation", "true");
			this.resizing = true;
			this.element.style.visibility = "hidden";
			this.iframe.style.visibility = "hidden";
			this.iframe.style.width = "0";
			this.iframe.style.height = "0";
			this._width = 0;
			this._height = 0;
			this.element.setAttribute("ref", this.index);
			this.added = true;
			this.elementBounds = bounds$1(this.element);
			if ("srcdoc" in this.iframe) this.supportsSrcdoc = true;
			else this.supportsSrcdoc = false;
			if (!this.settings.method) this.settings.method = this.supportsSrcdoc ? "srcdoc" : "write";
			return this.iframe;
		}
		render(request, show) {
			this.create();
			this.size();
			if (!this.sectionRender) this.sectionRender = this.section.render(request);
			return this.sectionRender.then(function(contents) {
				return this.load(contents);
			}.bind(this)).then(function() {
				let writingMode = this.settings.writingMode ? this.contents.writingMode(this.settings.writingMode) : this.contents.writingMode();
				let axis;
				if (this.settings.flow === "scrolled") axis = writingMode.indexOf("vertical") === 0 ? "horizontal" : "vertical";
				else axis = writingMode.indexOf("vertical") === 0 ? "vertical" : "horizontal";
				if (writingMode === "vertical-rl" && this.settings.flow === "paginated") axis = "horizontal";
				if (writingMode.indexOf("vertical") === 0 && writingMode !== "vertical-rl" && this.settings.flow === "paginated") this.layout.delta = this.layout.height;
				this.setAxis(axis);
				this.emit(EVENTS.VIEWS.AXIS, axis);
				this.setWritingMode(writingMode);
				this.emit(EVENTS.VIEWS.WRITING_MODE, writingMode);
				this.layout.format(this.contents, this.section, this.axis);
				this.addListeners();
				return new Promise((resolve, reject) => {
					this.expand();
					if (this.settings.forceRight) this.element.style.marginLeft = this.width() + "px";
					resolve();
				});
			}.bind(this), function(e) {
				this.emit(EVENTS.VIEWS.LOAD_ERROR, e);
				return new Promise((resolve, reject) => {
					reject(e);
				});
			}.bind(this)).then(function() {
				this.emit(EVENTS.VIEWS.RENDERED, this.section);
			}.bind(this));
		}
		reset() {
			if (this.iframe) {
				this.iframe.style.width = "0";
				this.iframe.style.height = "0";
				this._width = 0;
				this._height = 0;
				this._textWidth = void 0;
				this._contentWidth = void 0;
				this._textHeight = void 0;
				this._contentHeight = void 0;
			}
			this._needsReframe = true;
		}
		size(_width, _height) {
			var width = _width || this.settings.width;
			var height = _height || this.settings.height;
			if (this.layout.name === "pre-paginated") this.lock("both", width, height);
			else if (this.settings.axis === "horizontal") this.lock("height", width, height);
			else this.lock("width", width, height);
			this.settings.width = width;
			this.settings.height = height;
		}
		lock(what, width, height) {
			var elBorders = borders$1(this.element);
			var iframeBorders;
			if (this.iframe) iframeBorders = borders$1(this.iframe);
			else iframeBorders = {
				width: 0,
				height: 0
			};
			if (what == "width" && isNumber$1(width)) this.lockedWidth = Number(width) - elBorders.width - iframeBorders.width;
			if (what == "height" && isNumber$1(height)) this.lockedHeight = Number(height) - elBorders.height - iframeBorders.height;
			if (what === "both" && isNumber$1(width) && isNumber$1(height)) {
				this.lockedWidth = Number(width) - elBorders.width - iframeBorders.width;
				this.lockedHeight = Number(height) - elBorders.height - iframeBorders.height;
			}
			if (this.displayed && this.iframe) this.expand();
		}
		expand(force) {
			var width = this.lockedWidth;
			var height = this.lockedHeight;
			var columns;
			if (!this.iframe || this._expanding) return;
			this._expanding = true;
			if (this.layout.name === "pre-paginated") {
				width = this.layout.columnWidth;
				height = this.layout.height;
			} else if (this.settings.axis === "horizontal") {
				width = this.contents.textWidth();
				let pageAdvance = this.layout.pageWidth;
				let visiblePageWidth = this.layout.viewportPageWidth || this.lockedWidth || this.layout.width || this.layout.pageWidth;
				let singleMediaPageWidth = (this.element && this.element.parentElement ? this.element.parentElement.clientWidth : 0) || this.lockedWidth || this.layout.columnWidth || this.layout.pageWidth || this.settings.width || visiblePageWidth;
				let pageMetrics = null;
				let viewportFillingSingleMediaPage = false;
				if (this.settings.flow === "paginated" && this.contents.isViewportFillingSingleMediaPage && this.contents.isViewportFillingSingleMediaPage(singleMediaPageWidth)) {
					viewportFillingSingleMediaPage = true;
					visiblePageWidth = singleMediaPageWidth;
					pageAdvance = singleMediaPageWidth;
					width = Math.ceil(singleMediaPageWidth);
				}
				this._viewportFillingSingleMediaPage = viewportFillingSingleMediaPage;
				if (!viewportFillingSingleMediaPage && this.settings.flow === "paginated" && this.contents.writingMode && this.contents.writingMode() === "vertical-rl" && this.contents.verticalRlPageMetrics) {
					pageMetrics = this.contents.verticalRlPageMetrics(visiblePageWidth, height);
					width = pageMetrics.rawWidth;
					if (pageMetrics.effectivePageAdvance > 0) {
						pageAdvance = pageMetrics.effectivePageAdvance;
						const pageWidth = pageMetrics.pageWidth || this.layout.pageWidth;
						const viewportPageWidth = pageMetrics.viewportPageWidth || visiblePageWidth;
						const pageBoundaryShift = pageMetrics.pageBoundaryShift || 0;
						const edgeGuardPx = pageMetrics.edgeGuardPx || 0;
						if (this.layout.pageWidth !== pageWidth || this.layout.viewportPageWidth !== viewportPageWidth || this.layout.effectivePageAdvance !== pageAdvance || this.layout.delta !== pageAdvance || this.layout.pageBoundaryShift !== pageBoundaryShift || this.layout.edgeGuardPx !== edgeGuardPx) {
							this.layout.pageWidth = pageWidth;
							this.layout.viewportPageWidth = viewportPageWidth;
							this.layout.effectivePageAdvance = pageAdvance;
							this.layout.delta = pageAdvance;
							this.layout.pageBoundaryShift = pageBoundaryShift;
							this.layout.edgeGuardPx = edgeGuardPx;
							this.layout.update({
								pageWidth,
								viewportPageWidth,
								delta: pageAdvance,
								effectivePageAdvance: pageAdvance,
								pageBoundaryShift: this.layout.pageBoundaryShift,
								edgeGuardPx: this.layout.edgeGuardPx
							});
						}
					}
				}
				if (pageMetrics && pageMetrics.snappedContentWidth > 0) width = pageMetrics.snappedContentWidth;
				else if (pageAdvance > 0 && visiblePageWidth > 0) width = (Math.max(1, Math.ceil(Math.max(0, width - visiblePageWidth) / pageAdvance) + 1) - 1) * pageAdvance + visiblePageWidth;
				else if (width % this.layout.pageWidth > 0) width = Math.ceil(width / this.layout.pageWidth) * this.layout.pageWidth;
				this._contentWidth = width;
				if (this.settings.forceEvenPages && !viewportFillingSingleMediaPage) {
					columns = this.layout.effectivePageAdvance && this.layout.effectivePageAdvance !== this.layout.pageWidth ? this.layout.count(width).pages : width / this.layout.pageWidth;
					if (this.layout.divisor > 1 && this.layout.name === "reflowable" && columns % 2 > 0) width += this.layout.effectivePageAdvance || this.layout.pageWidth;
				}
				if (pageMetrics && shouldDebugVerticalRl() && window.console && window.console.debug) window.console.debug("[epubjs:vertical-rl:expand]", {
					href: this.section && this.section.href,
					rawWidth: pageMetrics.rawWidth,
					rawPaintWidth: pageMetrics.rawPaintWidth,
					snappedContentWidth: pageMetrics.snappedContentWidth,
					pageAdvance,
					viewportPageWidth: pageMetrics.viewportPageWidth,
					pageCount: pageMetrics.totalPages,
					linePitch: pageMetrics.linePitch,
					edgeGuardPx: pageMetrics.edgeGuardPx,
					pageBoundaryShift: pageMetrics.pageBoundaryShift
				});
			} else if (this.settings.axis === "vertical") {
				height = this.contents.textHeight();
				if (this.settings.flow === "paginated" && height % this.layout.height > 0) height = Math.ceil(height / this.layout.height) * this.layout.height;
			}
			if (this._needsReframe || width != this._width || height != this._height) this.reframe(width, height);
			this._expanding = false;
		}
		reframe(width, height) {
			var size;
			if (isNumber$1(width)) {
				this.element.style.width = width + "px";
				this.iframe.style.width = width + "px";
				this._width = width;
			}
			if (isNumber$1(height)) {
				this.element.style.height = height + "px";
				this.iframe.style.height = height + "px";
				this._height = height;
			}
			let safeWidth = Number(width) || 0;
			let safeHeight = Number(height) || 0;
			size = {
				width: safeWidth,
				height: safeHeight,
				widthDelta: this.prevBounds ? safeWidth - this.prevBounds.width : safeWidth,
				heightDelta: this.prevBounds ? safeHeight - this.prevBounds.height : safeHeight
			};
			this.pane && this.pane.render();
			requestAnimationFrame(() => {
				let mark;
				for (let m in this.marks) if (Object.prototype.hasOwnProperty.call(this.marks, m)) {
					mark = this.marks[m];
					this.placeMark(mark.element, mark.range);
				}
			});
			this.onResize(this, size);
			this.emit(EVENTS.VIEWS.RESIZED, size);
			this.prevBounds = size;
			this.elementBounds = bounds$1(this.element);
		}
		load(contents) {
			var loading = new Defer$4();
			var loaded = loading.promise;
			if (!this.iframe) {
				loading.reject(/* @__PURE__ */ new Error("No Iframe Available"));
				return loaded;
			}
			this.iframe.onload = function(event) {
				this.onLoad(event, loading);
			}.bind(this);
			if (!this.settings.allowScriptedContent) contents = stripScriptTagsFromContents(contents);
			if (this.settings.method === "blobUrl") {
				this.blobUrl = createBlobUrl$1(contents, "application/xhtml+xml");
				this.iframe.src = this.blobUrl;
				this.element.appendChild(this.iframe);
			} else if (this.settings.method === "srcdoc") {
				this.iframe.srcdoc = contents;
				this.element.appendChild(this.iframe);
			} else {
				this.element.appendChild(this.iframe);
				this.document = this.iframe.contentDocument;
				if (!this.document) {
					loading.reject(/* @__PURE__ */ new Error("No Document Available"));
					return loaded;
				}
				this.iframe.contentDocument.open();
				if (window.MSApp && window.MSApp.execUnsafeLocalFunction) {
					var outerThis = this;
					window.MSApp.execUnsafeLocalFunction(function() {
						outerThis.iframe.contentDocument.write(contents);
					});
				} else this.iframe.contentDocument.write(contents);
				this.iframe.contentDocument.close();
			}
			return loaded;
		}
		onLoad(event, promise) {
			this.window = this.iframe.contentWindow;
			this.document = this.iframe.contentDocument;
			this.contents = new ContentsCtor(this.document, this.document.body, this.section.cfiBase, this.section.index, this.section.href);
			this.rendering = false;
			var link = this.document.querySelector("link[rel='canonical']");
			if (link) link.setAttribute("href", this.section.canonical);
			else {
				link = this.document.createElement("link");
				link.setAttribute("rel", "canonical");
				link.setAttribute("href", this.section.canonical);
				this.document.querySelector("head").appendChild(link);
			}
			this.contents.on(EVENTS.CONTENTS.EXPAND, () => {
				if (this.displayed && this.iframe) {
					this.expand();
					if (this.contents) this.layout.format(this.contents);
				}
			});
			this.contents.on(EVENTS.CONTENTS.RESIZE, (e) => {
				if (this.displayed && this.iframe) {
					this.expand();
					if (this.contents) this.layout.format(this.contents);
				}
			});
			promise.resolve(this.contents);
		}
		setLayout(layout) {
			this.layout = layout;
			if (this.contents) {
				this.layout.format(this.contents);
				this.expand();
			}
		}
		setAxis(axis) {
			this.settings.axis = axis;
			if (axis == "horizontal") this.element.style.flex = "none";
			else this.element.style.flex = "initial";
			this.size();
		}
		setWritingMode(mode) {
			this.writingMode = mode;
		}
		addListeners() {}
		removeListeners(layoutFunc) {}
		display(request) {
			var displayed = new Defer$4();
			if (!this.displayed) this.render(request).then(function() {
				this.emit(EVENTS.VIEWS.DISPLAYED, this);
				this.onDisplayed(this);
				this.displayed = true;
				displayed.resolve(this);
			}.bind(this), function(err) {
				displayed.reject(err, this);
			});
			else displayed.resolve(this);
			return displayed.promise;
		}
		show() {
			this.element.style.visibility = "visible";
			if (this.iframe) {
				this.iframe.style.visibility = "visible";
				this.iframe.style.transform = "translateZ(0)";
				this.iframe.offsetWidth;
				this.iframe.style.transform = null;
			}
			this.emit(EVENTS.VIEWS.SHOWN, this);
		}
		hide() {
			this.element.style.visibility = "hidden";
			this.iframe.style.visibility = "hidden";
			this.stopExpanding = true;
			this.emit(EVENTS.VIEWS.HIDDEN, this);
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
		locationOf(target) {
			var targetPos = this.contents.locationOf(target, this.settings.ignoreClass);
			return {
				"left": targetPos.left,
				"top": targetPos.top
			};
		}
		onDisplayed(view) {}
		onResize(view, e) {}
		bounds(force) {
			if (force || !this.elementBounds) this.elementBounds = bounds$1(this.element);
			return this.elementBounds;
		}
		highlight(cfiRange, data = {}, cb, className = "epubjs-hl", styles = {}) {
			if (!this.contents) return;
			const attributes = Object.assign({
				"fill": "yellow",
				"fill-opacity": "0.3",
				"mix-blend-mode": "multiply"
			}, styles);
			let range = this.contents.range(cfiRange);
			let emitter = () => {
				this.emit(EVENTS.VIEWS.MARK_CLICKED, cfiRange, data);
			};
			data["epubcfi"] = cfiRange;
			if (!this.pane) this.pane = new import_marks.Pane(this.iframe, this.element);
			let m = new import_marks.Highlight(range, className, data, attributes);
			let h = this.pane.addMark(m);
			this.highlights[cfiRange] = {
				"mark": h,
				"element": h.element,
				"listeners": [emitter, cb]
			};
			h.element.setAttribute("ref", className);
			h.element.addEventListener("click", emitter);
			h.element.addEventListener("touchstart", emitter);
			if (cb) {
				h.element.addEventListener("click", cb);
				h.element.addEventListener("touchstart", cb);
			}
			return h;
		}
		underline(cfiRange, data = {}, cb, className = "epubjs-ul", styles = {}) {
			if (!this.contents) return;
			const attributes = Object.assign({
				"stroke": "black",
				"stroke-opacity": "0.3",
				"mix-blend-mode": "multiply"
			}, styles);
			let range = this.contents.range(cfiRange);
			let emitter = () => {
				this.emit(EVENTS.VIEWS.MARK_CLICKED, cfiRange, data);
			};
			data["epubcfi"] = cfiRange;
			if (!this.pane) this.pane = new import_marks.Pane(this.iframe, this.element);
			let m = new import_marks.Underline(range, className, data, attributes);
			let h = this.pane.addMark(m);
			this.underlines[cfiRange] = {
				"mark": h,
				"element": h.element,
				"listeners": [emitter, cb]
			};
			h.element.setAttribute("ref", className);
			h.element.addEventListener("click", emitter);
			h.element.addEventListener("touchstart", emitter);
			if (cb) {
				h.element.addEventListener("click", cb);
				h.element.addEventListener("touchstart", cb);
			}
			return h;
		}
		mark(cfiRange, data = {}, cb) {
			if (!this.contents) return;
			if (cfiRange in this.marks) return this.marks[cfiRange];
			let range = this.contents.range(cfiRange);
			if (!range) return;
			let container = range.commonAncestorContainer;
			let parent = container.nodeType === 1 ? container : container.parentNode;
			let emitter = (e) => {
				this.emit(EVENTS.VIEWS.MARK_CLICKED, cfiRange, data);
			};
			if (range.collapsed && container.nodeType === 1) {
				range = new Range();
				range.selectNodeContents(container);
			} else if (range.collapsed) {
				range = new Range();
				range.selectNodeContents(parent);
			}
			let mark = this.document.createElement("a");
			mark.setAttribute("ref", "epubjs-mk");
			mark.style.position = "absolute";
			mark.dataset["epubcfi"] = cfiRange;
			if (data) Object.keys(data).forEach((key) => {
				mark.dataset[key] = data[key];
			});
			if (cb) {
				mark.addEventListener("click", cb);
				mark.addEventListener("touchstart", cb);
			}
			mark.addEventListener("click", emitter);
			mark.addEventListener("touchstart", emitter);
			this.placeMark(mark, range);
			this.element.appendChild(mark);
			this.marks[cfiRange] = {
				"element": mark,
				"range": range,
				"listeners": [emitter, cb]
			};
			return parent;
		}
		placeMark(element, range) {
			let top, right, left;
			if (this.layout.name === "pre-paginated" || this.settings.axis !== "horizontal") {
				let pos = range.getBoundingClientRect();
				top = pos.top;
				right = pos.right;
			} else {
				let rects = range.getClientRects();
				let rect;
				for (var i = 0; i != rects.length; i++) {
					rect = rects[i];
					if (!left || rect.left < left) {
						left = rect.left;
						right = Math.ceil(left / this.layout.props.pageWidth) * this.layout.props.pageWidth - this.layout.gap / 2;
						top = rect.top;
					}
				}
			}
			element.style.top = `${top}px`;
			element.style.left = `${right}px`;
		}
		unhighlight(cfiRange) {
			let item;
			if (cfiRange in this.highlights) {
				item = this.highlights[cfiRange];
				this.pane.removeMark(item.mark);
				item.listeners.forEach((l) => {
					if (l) {
						item.element.removeEventListener("click", l);
						item.element.removeEventListener("touchstart", l);
					}
				});
				delete this.highlights[cfiRange];
			}
		}
		ununderline(cfiRange) {
			let item;
			if (cfiRange in this.underlines) {
				item = this.underlines[cfiRange];
				this.pane.removeMark(item.mark);
				item.listeners.forEach((l) => {
					if (l) {
						item.element.removeEventListener("click", l);
						item.element.removeEventListener("touchstart", l);
					}
				});
				delete this.underlines[cfiRange];
			}
		}
		unmark(cfiRange) {
			let item;
			if (cfiRange in this.marks) {
				item = this.marks[cfiRange];
				this.element.removeChild(item.element);
				item.listeners.forEach((l) => {
					if (l) {
						item.element.removeEventListener("click", l);
						item.element.removeEventListener("touchstart", l);
					}
				});
				delete this.marks[cfiRange];
			}
		}
		destroy() {
			for (let cfiRange in this.highlights) this.unhighlight(cfiRange);
			for (let cfiRange in this.underlines) this.ununderline(cfiRange);
			for (let cfiRange in this.marks) this.unmark(cfiRange);
			if (this.blobUrl) revokeBlobUrl$1(this.blobUrl);
			if (this.displayed) {
				this.displayed = false;
				this.removeListeners();
				this.contents.destroy();
				this.stopExpanding = true;
				this.element.removeChild(this.iframe);
				if (this.pane) {
					this.pane.element.remove();
					this.pane = void 0;
				}
				this.iframe = void 0;
				this.contents = void 0;
				this._textWidth = null;
				this._textHeight = null;
				this._width = null;
				this._height = null;
			}
		}
	};
	(0, import_event_emitter.default)(IframeView.prototype);
	//#endregion
	//#region src/utils/scrolltype.ts
	function scrollType() {
		var type = "reverse";
		var definer = createDefiner();
		document.body.appendChild(definer);
		if (definer.scrollLeft > 0) type = "default";
		else if (typeof Element !== "undefined" && Element.prototype.scrollIntoView) {
			definer.children[0].children[1].scrollIntoView();
			if (definer.scrollLeft < 0) type = "negative";
		} else {
			definer.scrollLeft = 1;
			if (definer.scrollLeft === 0) type = "negative";
		}
		document.body.removeChild(definer);
		return type;
	}
	function createDefiner() {
		var definer = document.createElement("div");
		definer.dir = "rtl";
		definer.style.position = "fixed";
		definer.style.width = "1px";
		definer.style.height = "1px";
		definer.style.top = "0px";
		definer.style.left = "0px";
		definer.style.overflow = "hidden";
		var innerDiv = document.createElement("div");
		innerDiv.style.width = "2px";
		var spanA = document.createElement("span");
		spanA.style.width = "1px";
		spanA.style.display = "inline-block";
		var spanB = document.createElement("span");
		spanB.style.width = "1px";
		spanB.style.display = "inline-block";
		innerDiv.appendChild(spanA);
		innerDiv.appendChild(spanB);
		definer.appendChild(innerDiv);
		return definer;
	}
	//#endregion
	//#region src/rendering/page-metrics.ts
	function countPagesWithFractionalTolerance(totalLength, pageLength) {
		if (!Number.isFinite(totalLength) || totalLength <= 0 || !Number.isFinite(pageLength) || pageLength <= 0) return 1;
		const ratio = totalLength / pageLength;
		const rounded = Math.max(1, Math.round(ratio));
		const tolerance = Math.max(1, Math.min(4, pageLength * .005));
		if (Math.abs(totalLength - rounded * pageLength) <= tolerance) return rounded;
		return Math.max(1, Math.ceil(ratio));
	}
	function getPageSnapTolerance(pageAdvance, edgeGuard = 0) {
		const advance = Number(pageAdvance) || 0;
		const safeEdgeGuard = Number(edgeGuard) || 0;
		const tolerance = Math.max(2, safeEdgeGuard, Math.round(advance * .08));
		return advance > 0 ? Math.min(Math.max(2, Math.round(advance / 4)), tolerance) : 2;
	}
	function getPageBoundaryShift(pageBoundaryShift, pageAdvance, isRtlVerticalPaginated = false) {
		if (!isRtlVerticalPaginated) return 0;
		const shift = Number(pageBoundaryShift || 0);
		const advance = Number(pageAdvance) || 0;
		if (!Number.isFinite(shift) || shift <= 0 || !advance) return 0;
		return Math.min(shift, Math.max(0, Math.floor(advance / 3)));
	}
	function hasVerticalRlStructuralPageGutter(pageAdvance, visibleWidth, boundaryShift, isRtlVerticalPaginated = false) {
		const advance = Number(pageAdvance) || 0;
		const width = Number(visibleWidth) || 0;
		const shift = Number(boundaryShift) || 0;
		return !!(isRtlVerticalPaginated && advance && width && width - advance > 1 && shift === 0);
	}
	//#endregion
	//#region src/rendering/logical-page.ts
	function getVerticalRlLogicalPageStepToNextPage(pageAdvance, totalPages, currentPageIndex, nextPageIndex, currentOffset, nextOffset, hasStructuralPageGutter) {
		const advance = Number(pageAdvance) || 0;
		const total = Number(totalPages) || 0;
		const nextIndex = Number(nextPageIndex) || 0;
		const step = Math.abs((Number(nextOffset) || 0) - (Number(currentOffset) || 0));
		if (nextIndex === total - 1 && step > advance && hasStructuralPageGutter) return advance;
		return step > 0 ? step : advance;
	}
	function getVerticalRlLogicalPageOffsetCacheKey(totalPages, maxScroll, contentWidth, visibleWidth, pageAdvance, edgeGuard = 0) {
		const content = Number(contentWidth) || 0;
		const visible = Number(visibleWidth) || 0;
		const advance = Number(pageAdvance) || 0;
		if (!content || !visible || !advance) return null;
		return [
			Math.round((Number(totalPages) || 0) * 100) / 100,
			Math.round((Number(maxScroll) || 0) * 100) / 100,
			Math.round(content * 100) / 100,
			Math.round(visible * 100) / 100,
			Math.round(advance * 100) / 100,
			Math.round((Number(edgeGuard) || 0) * 100) / 100
		].join(":");
	}
	function getCachedVerticalRlLogicalPageOffset(cache, pageIndex, cacheKey) {
		if (!cache || cache.key !== cacheKey || !cache.offsets) return null;
		const cachedOffset = Number(cache.offsets[pageIndex]);
		return Number.isFinite(cachedOffset) ? cachedOffset : null;
	}
	function cacheVerticalRlLogicalPageOffset(cache, pageIndex, logicalOffset, cacheKey) {
		if (!cacheKey || !Number.isFinite(Number(logicalOffset))) return cache;
		const nextCache = !cache || cache.key !== cacheKey ? {
			key: cacheKey,
			offsets: Object.create(null)
		} : cache;
		nextCache.offsets[pageIndex] = Number(logicalOffset);
		return nextCache;
	}
	function getLogicalOffsetForPageIndex(pageIndex, totalPages, maxScroll, pageAdvance, boundaryShift = 0, isRtlVerticalPaginated = false) {
		const advance = Number(pageAdvance) || 0;
		const targetIndex = Math.max(0, Math.min(totalPages - 1, pageIndex));
		let logicalOffset = targetIndex * advance;
		if (isRtlVerticalPaginated && boundaryShift > 0 && targetIndex > 0 && targetIndex < totalPages - 1) logicalOffset = Math.max(0, logicalOffset - boundaryShift);
		return Math.min(maxScroll, logicalOffset);
	}
	function getCurrentPageIndexForOffset(normalizedOffset, totalPages, pageAdvance, maxScroll, snapTolerance, boundaryShift = 0, isRtlVerticalPaginated = false) {
		const advance = Number(pageAdvance) || 0;
		if (!advance || advance <= 0) return 0;
		const pageCount = Math.max(1, Math.floor(Number(totalPages) || 1));
		const normalized = Number(normalizedOffset) || 0;
		const maxLogicalScroll = Number(maxScroll) || 0;
		const tolerance = Number(snapTolerance) || 0;
		if (isRtlVerticalPaginated && pageCount > 1 && maxLogicalScroll > 0 && normalized >= maxLogicalScroll - tolerance) return pageCount - 1;
		if (isRtlVerticalPaginated) {
			let nearestPageIndex = 0;
			let nearestDistance = Infinity;
			for (let i = 0; i < pageCount; i++) {
				const targetOffset = getLogicalOffsetForPageIndex(i, pageCount, maxLogicalScroll, advance, boundaryShift, isRtlVerticalPaginated);
				const distance = Math.abs(normalized - targetOffset);
				if (distance < nearestDistance) {
					nearestDistance = distance;
					nearestPageIndex = i;
				}
			}
			return nearestPageIndex;
		}
		const nearestPageIndex = Math.round(normalized / advance);
		if (Math.abs(normalized - nearestPageIndex * advance) <= tolerance) return Math.max(0, Math.min(pageCount - 1, nearestPageIndex));
		const pageIndex = Math.floor((normalized + .5) / advance);
		return Math.max(0, Math.min(pageCount - 1, pageIndex));
	}
	//#endregion
	//#region src/rendering/edge-mask.ts
	function getVerticalRlEdgeMaskLimit(pageAdvance) {
		const advance = Number(pageAdvance) || 0;
		return Math.max(0, Math.floor(advance / 4));
	}
	function runVerticalRlEdgeMaskSnapLoop(snapLeft, snapRight, maxIterations = 4) {
		const iterationsLimit = Math.max(0, Math.floor(Number(maxIterations) || 0));
		let iterations = 0;
		let lastShift = 0;
		for (let i = 0; i < iterationsLimit; i++) {
			iterations++;
			lastShift = (Number(snapLeft()) || 0) + (Number(snapRight()) || 0);
			if (!lastShift) return {
				iterations,
				lastShift,
				stopped: true
			};
		}
		return {
			iterations,
			lastShift,
			stopped: false
		};
	}
	function hasVerticalRlEdgeMaskStructuralGutter(visibleWidth, pageAdvance, leftMask, boundaryShift, currentPageIndex, previousPageStep) {
		const visible = Number(visibleWidth) || 0;
		const advance = Number(pageAdvance) || 0;
		const left = Number(leftMask) || 0;
		const shift = Number(boundaryShift) || 0;
		const pageIndex = Number(currentPageIndex) || 0;
		const previousStep = Number(previousPageStep) || 0;
		return !!(visible && advance && Math.abs(visible - advance - left) <= 1 && shift === 0 && (pageIndex <= 0 || Math.abs(previousStep - advance) <= 1));
	}
	function getVerticalRlPreviousPageRightMask(visibleWidth, previousPageStep, previousPageLeftMask, maxMask) {
		const visible = Number(visibleWidth) || 0;
		const previousStep = Number(previousPageStep) || 0;
		const previousLeft = Number(previousPageLeftMask) || 0;
		const maskLimit = Math.max(0, Number(maxMask) || 0);
		if (!visible || !previousStep || !maskLimit) return 0;
		const overlap = Math.max(0, visible - previousStep - previousLeft);
		return Math.min(Math.ceil(overlap), maskLimit);
	}
	function getVerticalRlEdgeMaskSnapInput(left, right, maxMask, previousPageStep = 0) {
		const maskLimit = Math.max(0, Number(maxMask) || 0);
		if (!maskLimit) return null;
		const rightMask = Math.min(Number(right) || 0, maskLimit);
		return {
			widths: {
				left: Math.min(Number(left) || 0, maskLimit),
				right: rightMask
			},
			maxMask: maskLimit,
			previousPageStep: Number(previousPageStep) || 0,
			rightMaxMask: rightMask
		};
	}
	function getVerticalRlStructuralGutterEdgeMaskSnapInput(left, right, maxMask, nextPageStep) {
		const maskLimit = Math.max(0, Number(maxMask) || 0);
		if (!maskLimit) return null;
		return {
			widths: {
				left: Math.min(Number(left) || 0, maskLimit),
				right: Number(right) || 0
			},
			maxMask: maskLimit,
			nextPageStep: Number(nextPageStep) || 0,
			rightMaxMask: 0
		};
	}
	function getRenderedVerticalRlEdgeMaskWidths(computed, renderedLeft, renderedRight, renderedFallback) {
		let left = Number(renderedLeft);
		let right = Number(renderedRight);
		if (!Number.isFinite(left)) left = Number(renderedFallback);
		if (!Number.isFinite(right)) right = 0;
		return {
			left: Math.max(Number(computed && computed.left) || 0, left || 0),
			right: Math.max(Number(computed && computed.right) || 0, right || 0)
		};
	}
	function getVerticalRlEdgeMaskWidth(widths) {
		return Math.max(Number(widths && widths.left) || 0, Number(widths && widths.right) || 0);
	}
	function getVerticalRlEdgeMaskSnapViewportInput(widths, maxMask, containerLeft, containerRight, iframeLeft, limits, defaultNextPageStep, edgeGuardPx = 0) {
		const maskLimit = Math.max(0, Number(maxMask) || 0);
		const leftLimit = Math.max(0, Number(limits.leftMaxMask !== void 0 ? limits.leftMaxMask : maskLimit) || 0);
		const rightLimit = Math.max(0, Number(limits.rightMaxMask !== void 0 ? limits.rightMaxMask : maskLimit) || 0);
		const rawLeft = Number.isFinite(Number(limits.rawLeft)) ? Number(limits.rawLeft) : (Number(containerLeft) || 0) - (Number(iframeLeft) || 0);
		const rawRight = Number.isFinite(Number(limits.rawRight)) ? Number(limits.rawRight) : (Number(containerRight) || 0) - (Number(iframeLeft) || 0);
		const guard = Number(edgeGuardPx) || 0;
		const edgeTolerance = Math.max(1, Math.min(4, Math.round(guard || 1)));
		const hasStructuralEdgeGuard = guard > 0;
		const canExpandClippedRawRight = (Number(iframeLeft) || 0) < 0 || hasStructuralEdgeGuard || !!limits.allowRawRightMask;
		return {
			rawLeft,
			rawRight,
			leftMaxMask: leftLimit,
			rightMaxMask: rightLimit,
			left: Math.max(0, Math.min(Number(widths && widths.left) || 0, leftLimit)),
			right: Math.max(0, Math.min(Number(widths && widths.right) || 0, rightLimit)),
			nextPageStep: Number(limits.nextPageStep !== void 0 ? limits.nextPageStep : defaultNextPageStep) || 0,
			previousPageStep: Number(limits.previousPageStep) || 0,
			forceRawLeftMask: !!limits.forceRawLeftMask,
			allowRawLeftMask: !!limits.allowRawLeftMask,
			edgeTolerance,
			hasStructuralEdgeGuard,
			canExpandClippedRawRight,
			rightPaintGuardMax: Math.min(maskLimit, Math.max(rightLimit, edgeTolerance))
		};
	}
	function getVerticalRlSnappedRightEdgeMask(right, shift, maxMask, rightMaxMask, requiredRawRightMask, rightPaintGuardMax, expandBeyondPaintGuard) {
		const currentRight = Math.max(0, Number(right) || 0);
		const maskLimit = Math.max(0, Number(maxMask) || 0);
		const delta = Number(shift) || 0;
		if (!delta) return currentRight;
		const maxAllowedRight = delta > 0 ? expandBeyondPaintGuard ? maskLimit : Math.max(0, Number(rightPaintGuardMax) || 0) : Math.max(Math.max(0, Number(rightMaxMask) || 0), Math.max(0, Number(requiredRawRightMask) || 0), currentRight + delta);
		return Math.max(0, Math.min(maxAllowedRight, currentRight + delta));
	}
	function getVerticalRlSnappedLeftEdgeMask(left, shift, leftMaxMask) {
		const currentLeft = Math.max(0, Number(left) || 0);
		const delta = Number(shift) || 0;
		if (!delta) return currentLeft;
		return Math.max(0, Math.min(Math.max(0, Number(leftMaxMask) || 0), currentLeft + delta));
	}
	//#endregion
	//#region src/rendering/raw-right-snap.ts
	function getVerticalRlRequiredRawRightMask(currentRequiredRawRightMask, rectLeft, rectRight, rawLeft, rawRight, previousRawLeft, previousPageStep, edgeTolerance) {
		const currentRequired = Math.max(0, Number(currentRequiredRawRightMask) || 0);
		const left = Number(rectLeft) || 0;
		const right = Number(rectRight) || 0;
		const viewportLeft = Number(rawLeft) || 0;
		const viewportRight = Number(rawRight) || 0;
		const previousLeft = Number(previousRawLeft) || 0;
		const previousStep = Number(previousPageStep) || 0;
		const tolerance = Math.max(0, Number(edgeTolerance) || 0);
		if (!(left < viewportRight && right > viewportRight)) return currentRequired;
		if (previousStep > 0 && left < previousLeft && right > previousLeft) return currentRequired;
		const rawRightOverhang = right - viewportRight;
		const visibleInsideRawRight = viewportRight - Math.max(left, viewportLeft);
		if (visibleInsideRawRight > tolerance && rawRightOverhang > Math.max(tolerance, 4)) return Math.max(currentRequired, Math.ceil(visibleInsideRawRight + 1));
		return currentRequired;
	}
	function getVerticalRlRequiredRawRightMaskForRects(rects, rawLeft, rawRight, previousRawLeft, previousPageStep, edgeTolerance, initialRequiredRawRightMask = 0) {
		let requiredRawRightMask = Math.max(0, Number(initialRequiredRawRightMask) || 0);
		for (const rect of rects || []) requiredRawRightMask = getVerticalRlRequiredRawRightMask(requiredRawRightMask, rect.left, rect.right, rawLeft, rawRight, previousRawLeft, previousPageStep, edgeTolerance);
		return requiredRawRightMask;
	}
	function getVerticalRlRawRightSnapRectInput(rectLeft, rectRight, rawLeft, rawRight, previousRawLeft, previousPageStep) {
		const left = Number(rectLeft) || 0;
		const right = Number(rectRight) || 0;
		const viewportLeft = Number(rawLeft) || 0;
		const viewportRight = Number(rawRight) || 0;
		const previousLeft = Number(previousRawLeft) || 0;
		const previousStep = Number(previousPageStep) || 0;
		const rawRightStraddler = left < viewportRight && right > viewportRight;
		return {
			clippedAtPreviousLeft: previousStep > 0 && left < previousLeft && right > previousLeft,
			rawRightStraddler,
			rawRightOverhang: rawRightStraddler ? right - viewportRight : 0,
			visibleInsideRawRight: rawRightStraddler ? viewportRight - Math.max(left, viewportLeft) : 0
		};
	}
	function hasVerticalRlRightEdgeMaskConsumingVisibleEdge(isRawRightStraddler, right, visibleInsideRawRight, rightMaxMask, edgeTolerance) {
		const visibleInside = Number(visibleInsideRawRight) || 0;
		const currentRight = Number(right) || 0;
		const rightLimit = Number(rightMaxMask) || 0;
		const tolerance = Number(edgeTolerance) || 0;
		return !!(isRawRightStraddler && currentRight < visibleInside && visibleInside <= Math.max(currentRight, rightLimit) + tolerance);
	}
	function getVerticalRlJustOutsideRawRightMaskTarget(rectLeft, rawRight, edgeTolerance) {
		const left = Number(rectLeft) || 0;
		const viewportRight = Number(rawRight) || 0;
		const tolerance = Math.max(0, Number(edgeTolerance) || 0);
		if (left < viewportRight || left - viewportRight > tolerance) return 0;
		return Math.ceil(Math.min(tolerance, left - viewportRight + tolerance));
	}
	function getVerticalRlShallowRawRightStraddlerMaskTarget(isRawRightStraddler, visibleInsideRawRight, edgeTolerance) {
		const visibleInside = Math.max(0, Number(visibleInsideRawRight) || 0);
		const tolerance = Math.max(0, Number(edgeTolerance) || 0);
		if (!isRawRightStraddler || visibleInside > tolerance) return 0;
		return Math.ceil(visibleInside + 1);
	}
	function shouldClearVerticalRlRawRightStraddlerMask(isRawRightStraddler, rawRightOverhang, edgeTolerance, maskConsumesVisibleRightEdge, requiredRawRightMask, nextPageStep) {
		const overhang = Number(rawRightOverhang) || 0;
		const tolerance = Math.max(0, Number(edgeTolerance) || 0);
		const required = Math.max(0, Number(requiredRawRightMask) || 0);
		const nextStep = Number(nextPageStep) || 0;
		return !!(isRawRightStraddler && (overhang <= Math.max(tolerance, 4) || maskConsumesVisibleRightEdge && (required <= 0 || nextStep <= 0)));
	}
	function shouldClearVerticalRlCoveredRawRightStraddlerMask(isRawRightStraddler, visibleInsideRawRight, edgeTolerance, right, rightMaxMask, requiredRawRightMask, nextPageStep) {
		const visibleInside = Math.max(0, Number(visibleInsideRawRight) || 0);
		const tolerance = Math.max(0, Number(edgeTolerance) || 0);
		const currentRight = Math.max(0, Number(right) || 0);
		const rightLimit = Math.max(0, Number(rightMaxMask) || 0);
		const required = Math.max(0, Number(requiredRawRightMask) || 0);
		const nextStep = Number(nextPageStep) || 0;
		return !!(isRawRightStraddler && visibleInside > tolerance && currentRight >= visibleInside && rightLimit >= visibleInside && (required <= 0 || nextStep <= 0));
	}
	function getVerticalRlDeepRawRightStraddlerExpandTarget(isRawRightStraddler, visibleInsideRawRight, edgeTolerance) {
		const visibleInside = Math.max(0, Number(visibleInsideRawRight) || 0);
		const tolerance = Math.max(0, Number(edgeTolerance) || 0);
		if (!isRawRightStraddler || visibleInside <= tolerance) return 0;
		return Math.ceil(visibleInside + 1);
	}
	function getVerticalRlBoundaryCrossingExpandTarget(rectLeft, rectRight, boundary) {
		const left = Number(rectLeft) || 0;
		const right = Number(rectRight) || 0;
		const targetBoundary = Number(boundary) || 0;
		if (left >= targetBoundary || right <= targetBoundary) return 0;
		return Math.ceil(targetBoundary - left + 1);
	}
	function getVerticalRlPreviousLeftClippedRightMaskTarget(requiredRawRightMask, rectRight, rawRight) {
		const required = Math.max(0, Number(requiredRawRightMask) || 0);
		const right = Number(rectRight) || 0;
		const viewportRight = Number(rawRight) || 0;
		const clippedWidth = Math.max(0, Math.floor(viewportRight - Math.min(right, viewportRight)));
		return Math.max(required, clippedWidth);
	}
	function getVerticalRlRawRightSnapRectShift(rectLeft, rectRight, rawRight, boundary, right, clippedAtPreviousLeft, rawRightStraddler, rawRightOverhang, visibleInsideRawRight, edgeTolerance, rightMaxMask, requiredRawRightMask, nextPageStep, canExpandClippedRawRight) {
		const rectStart = Number(rectLeft) || 0;
		const rectEnd = Number(rectRight) || 0;
		const viewportRight = Number(rawRight) || 0;
		const edge = Number(boundary) || 0;
		const currentRight = Math.max(0, Number(right) || 0);
		if (clippedAtPreviousLeft && rectEnd > edge && rectStart < viewportRight) {
			const targetRight = getVerticalRlPreviousLeftClippedRightMaskTarget(requiredRawRightMask, rectEnd, viewportRight);
			return {
				shift: targetRight < currentRight ? targetRight - currentRight : 0,
				expandBeyondPaintGuard: false
			};
		}
		const justOutsideRawRightTarget = getVerticalRlJustOutsideRawRightMaskTarget(rectStart, viewportRight, edgeTolerance);
		if (justOutsideRawRightTarget > 0) return {
			shift: justOutsideRawRightTarget > currentRight ? justOutsideRawRightTarget - currentRight : 0,
			expandBeyondPaintGuard: false
		};
		const shallowRawRightStraddlerTarget = getVerticalRlShallowRawRightStraddlerMaskTarget(rawRightStraddler, visibleInsideRawRight, edgeTolerance);
		if (shallowRawRightStraddlerTarget > 0) return {
			shift: shallowRawRightStraddlerTarget > currentRight ? shallowRawRightStraddlerTarget - currentRight : 0,
			expandBeyondPaintGuard: false
		};
		if (shouldClearVerticalRlRawRightStraddlerMask(rawRightStraddler, rawRightOverhang, edgeTolerance, hasVerticalRlRightEdgeMaskConsumingVisibleEdge(rawRightStraddler, currentRight, visibleInsideRawRight, rightMaxMask, edgeTolerance), requiredRawRightMask, nextPageStep) || shouldClearVerticalRlCoveredRawRightStraddlerMask(rawRightStraddler, visibleInsideRawRight, edgeTolerance, currentRight, rightMaxMask, requiredRawRightMask, nextPageStep)) return {
			shift: currentRight > 0 ? -currentRight : 0,
			expandBeyondPaintGuard: false
		};
		const deepRawRightStraddlerExpandTarget = getVerticalRlDeepRawRightStraddlerExpandTarget(rawRightStraddler, visibleInsideRawRight, edgeTolerance);
		if (deepRawRightStraddlerExpandTarget > 0) {
			const shouldExpand = canExpandClippedRawRight && deepRawRightStraddlerExpandTarget > currentRight;
			return {
				shift: shouldExpand ? deepRawRightStraddlerExpandTarget - currentRight : 0,
				expandBeyondPaintGuard: shouldExpand
			};
		}
		return {
			shift: getVerticalRlBoundaryCrossingExpandTarget(rectStart, rectEnd, edge),
			expandBeyondPaintGuard: false
		};
	}
	function getVerticalRlRawRightSnapRectShiftForRect(rectLeft, rectRight, rawLeft, rawRight, previousRawLeft, previousPageStep, boundary, right, edgeTolerance, rightMaxMask, requiredRawRightMask, nextPageStep, canExpandClippedRawRight) {
		const { clippedAtPreviousLeft, rawRightStraddler, rawRightOverhang, visibleInsideRawRight } = getVerticalRlRawRightSnapRectInput(rectLeft, rectRight, rawLeft, rawRight, previousRawLeft, previousPageStep);
		return getVerticalRlRawRightSnapRectShift(rectLeft, rectRight, rawRight, boundary, right, clippedAtPreviousLeft, rawRightStraddler, rawRightOverhang, visibleInsideRawRight, edgeTolerance, rightMaxMask, requiredRawRightMask, nextPageStep, canExpandClippedRawRight);
	}
	function getVerticalRlRawRightSnapShiftAggregate(currentExpand, currentShrink, currentExpandBeyondPaintGuard, rectShift) {
		const shift = Number(rectShift.shift) || 0;
		const expand = Number(currentExpand) || 0;
		const shrink = Number(currentShrink) || 0;
		if (shift < 0) return {
			expand,
			shrink: Math.min(shrink, shift),
			expandBeyondPaintGuard: currentExpandBeyondPaintGuard
		};
		if (shift > 0) return {
			expand: Math.max(expand, shift),
			shrink,
			expandBeyondPaintGuard: currentExpandBeyondPaintGuard || rectShift.expandBeyondPaintGuard
		};
		return {
			expand,
			shrink,
			expandBeyondPaintGuard: currentExpandBeyondPaintGuard
		};
	}
	function getVerticalRlRawRightSnapShiftForRects(rects, rawLeft, rawRight, boundary, right, previousRawLeft, previousPageStep, edgeTolerance, rightMaxMask, requiredRawRightMask, nextPageStep, canExpandClippedRawRight) {
		let expand = 0;
		let shrink = 0;
		let expandBeyondPaintGuard = false;
		for (const rect of rects || []) {
			const rectShift = getVerticalRlRawRightSnapRectShiftForRect(rect.left, rect.right, rawLeft, rawRight, previousRawLeft, previousPageStep, boundary, right, edgeTolerance, rightMaxMask, requiredRawRightMask, nextPageStep, canExpandClippedRawRight);
			const aggregate = getVerticalRlRawRightSnapShiftAggregate(expand, shrink, expandBeyondPaintGuard, rectShift);
			expand = aggregate.expand;
			shrink = aggregate.shrink;
			expandBeyondPaintGuard = aggregate.expandBeyondPaintGuard;
		}
		return {
			expand,
			shrink,
			expandBeyondPaintGuard
		};
	}
	function getVerticalRlRawRightSnapDecisionForRects(rects, rawLeft, rawRight, right, previousPageStep, edgeTolerance, maxMask, rightMaxMask, rightPaintGuardMax, nextPageStep, canExpandClippedRawRight) {
		const boundary = rawRight - right;
		const previousRawLeft = rawLeft + previousPageStep;
		const requiredRawRightMask = getVerticalRlRequiredRawRightMaskForRects(rects, rawLeft, rawRight, previousRawLeft, previousPageStep, edgeTolerance);
		const aggregate = getVerticalRlRawRightSnapShiftForRects(rects, rawLeft, rawRight, boundary, right, previousRawLeft, previousPageStep, edgeTolerance, rightMaxMask, requiredRawRightMask, nextPageStep, canExpandClippedRawRight);
		return {
			shift: aggregate.shrink < 0 ? aggregate.shrink : aggregate.expand,
			right: getVerticalRlSnappedRightEdgeMask(right, aggregate.shrink < 0 ? aggregate.shrink : aggregate.expand, maxMask, rightMaxMask, requiredRawRightMask, rightPaintGuardMax, aggregate.expandBeyondPaintGuard),
			requiredRawRightMask,
			expandBeyondPaintGuard: aggregate.expandBeyondPaintGuard
		};
	}
	//#endregion
	//#region src/rendering/raw-left-snap.ts
	function getVerticalRlRawLeftSnapRectInput(rectLeft, rectRight, rawLeft, rawRight, nextPageStep, edgeTolerance) {
		const left = Number(rectLeft) || 0;
		const right = Number(rectRight) || 0;
		const viewportLeft = Number(rawLeft) || 0;
		const viewportRight = Number(rawRight) || 0;
		const nextStep = Number(nextPageStep) || 0;
		const tolerance = Number(edgeTolerance) || 0;
		const shiftedRight = right + nextStep;
		const hasNextPage = nextStep > 0;
		return {
			rawLeftStraddler: left < viewportLeft && right > viewportLeft,
			hasNextPage,
			clippedAtNextRight: !hasNextPage || shiftedRight > viewportRight,
			visibleAtNextRight: hasNextPage && shiftedRight <= viewportRight,
			nearlyVisibleAtNextRight: hasNextPage && shiftedRight <= viewportRight + tolerance
		};
	}
	function getVerticalRlRawLeftBoundaryCrossingShift(rectLeft, rectRight, boundary, left, hasNextPage, visibleAtNextRight, nearlyVisibleAtNextRight, allowRawLeftMask) {
		const rectStart = Number(rectLeft) || 0;
		const rectEnd = Number(rectRight) || 0;
		const edge = Number(boundary) || 0;
		const currentLeft = Math.max(0, Number(left) || 0);
		if (rectStart >= edge || rectEnd <= edge) return 0;
		const expand = Math.ceil(rectEnd - edge + 1);
		const shrink = Math.ceil(edge - rectStart + 1);
		if (hasNextPage && (visibleAtNextRight || nearlyVisibleAtNextRight || allowRawLeftMask)) return expand;
		if (shrink > 0 && currentLeft - shrink >= 0) return -shrink;
		return expand;
	}
	function getVerticalRlRawLeftCoveredShrinkShift(rectLeft, rectRight, rawLeft, boundary, left, rawLeftStraddler, forceRawLeftMask, visibleAtNextRight, hasStructuralEdgeGuard, nearlyVisibleAtNextRight, allowRawLeftMask, clippedAtNextRight) {
		const rectStart = Number(rectLeft) || 0;
		const rectEnd = Number(rectRight) || 0;
		const viewportLeft = Number(rawLeft) || 0;
		const edge = Number(boundary) || 0;
		const currentLeft = Math.max(0, Number(left) || 0);
		if (currentLeft <= 0 || rectEnd <= viewportLeft || rectStart >= edge || rectEnd > edge || rawLeftStraddler && forceRawLeftMask || (rawLeftStraddler ? visibleAtNextRight || hasStructuralEdgeGuard && nearlyVisibleAtNextRight || allowRawLeftMask : nearlyVisibleAtNextRight) || rawLeftStraddler && !clippedAtNextRight) return 0;
		const targetLeft = Math.max(0, Math.floor(Math.max(rectStart, viewportLeft) - viewportLeft - 1));
		return targetLeft < currentLeft ? targetLeft - currentLeft : 0;
	}
	function getVerticalRlRawLeftVisibleExpandShift(rectLeft, rectRight, rawLeft, boundary, left, visibleAtNextRight, edgeTolerance) {
		const rectStart = Number(rectLeft) || 0;
		const rectEnd = Number(rectRight) || 0;
		const viewportLeft = Number(rawLeft) || 0;
		const edge = Number(boundary) || 0;
		const currentLeft = Math.max(0, Number(left) || 0);
		const tolerance = Math.max(0, Number(edgeTolerance) || 0);
		if (currentLeft <= 0 || !visibleAtNextRight || rectStart < edge || rectStart - edge > tolerance) return 0;
		const targetLeft = Math.ceil(rectEnd - viewportLeft + 1);
		return targetLeft > currentLeft ? targetLeft - currentLeft : 0;
	}
	function getVerticalRlRawLeftSnapRectShift(rectLeft, rectRight, rawLeft, boundary, left, rawLeftStraddler, hasNextPage, clippedAtNextRight, visibleAtNextRight, nearlyVisibleAtNextRight, forceRawLeftMask, allowRawLeftMask, hasStructuralEdgeGuard, edgeTolerance) {
		const currentLeft = Math.max(0, Number(left) || 0);
		if (currentLeft <= 0 && rawLeftStraddler && clippedAtNextRight && !forceRawLeftMask && !allowRawLeftMask) return 0;
		const boundaryCrossingShift = getVerticalRlRawLeftBoundaryCrossingShift(rectLeft, rectRight, boundary, currentLeft, hasNextPage, visibleAtNextRight, nearlyVisibleAtNextRight, allowRawLeftMask);
		if (boundaryCrossingShift) return boundaryCrossingShift;
		const coveredShrinkShift = getVerticalRlRawLeftCoveredShrinkShift(rectLeft, rectRight, rawLeft, boundary, currentLeft, rawLeftStraddler, forceRawLeftMask, visibleAtNextRight, hasStructuralEdgeGuard, nearlyVisibleAtNextRight, allowRawLeftMask, clippedAtNextRight);
		if (coveredShrinkShift < 0) return coveredShrinkShift;
		return getVerticalRlRawLeftVisibleExpandShift(rectLeft, rectRight, rawLeft, boundary, currentLeft, visibleAtNextRight, edgeTolerance);
	}
	function getVerticalRlRawLeftSnapShiftAggregate(currentShift, rectShift) {
		const shift = Number(currentShift) || 0;
		const nextShift = Number(rectShift) || 0;
		if (nextShift > 0) return Math.max(shift, nextShift);
		if (nextShift < 0) return Math.min(shift, nextShift);
		return shift;
	}
	function getVerticalRlRawLeftSnapShiftForRects(rects, rawLeft, rawRight, boundary, left, nextPageStep, forceRawLeftMask, allowRawLeftMask, hasStructuralEdgeGuard, edgeTolerance) {
		let shift = 0;
		for (const rect of rects || []) {
			let { rawLeftStraddler, hasNextPage, clippedAtNextRight, visibleAtNextRight, nearlyVisibleAtNextRight } = getVerticalRlRawLeftSnapRectInput(rect.left, rect.right, rawLeft, rawRight, nextPageStep, edgeTolerance);
			let rectShift = getVerticalRlRawLeftSnapRectShift(rect.left, rect.right, rawLeft, boundary, left, rawLeftStraddler, hasNextPage, clippedAtNextRight, visibleAtNextRight, nearlyVisibleAtNextRight, forceRawLeftMask, allowRawLeftMask, hasStructuralEdgeGuard, edgeTolerance);
			shift = getVerticalRlRawLeftSnapShiftAggregate(shift, rectShift);
		}
		return shift;
	}
	function getVerticalRlRawLeftSnapDecisionForRects(rects, rawLeft, rawRight, left, leftMaxMask, nextPageStep, forceRawLeftMask, allowRawLeftMask, hasStructuralEdgeGuard, edgeTolerance) {
		const shift = getVerticalRlRawLeftSnapShiftForRects(rects, rawLeft, rawRight, rawLeft + left, left, nextPageStep, forceRawLeftMask, allowRawLeftMask, hasStructuralEdgeGuard, edgeTolerance);
		return {
			shift,
			left: getVerticalRlSnappedLeftEdgeMask(left, shift, leftMaxMask)
		};
	}
	//#endregion
	//#region src/rendering/boundary-mask.ts
	function getVerticalRlCurrentEffectiveLeftBoundary(contentWidth, currentOffset, visibleWidth, currentLeftMask) {
		const effectiveLeftBoundary = Number(contentWidth) - Number(currentOffset) - Number(visibleWidth) + (Number(currentLeftMask) || 0);
		return Number.isFinite(effectiveLeftBoundary) && effectiveLeftBoundary > 0 ? effectiveLeftBoundary : null;
	}
	function getVerticalRlSequentialRightBoundaryConstraint(pageIndex, forcedRightBoundary, contentWidth, currentOffset, currentGridOffset, visibleWidth, pageAdvance, currentLeftMask) {
		const forcedBoundary = Number(forcedRightBoundary);
		const targetPageIndex = Number(pageIndex) || 0;
		if (Number.isFinite(forcedBoundary) && forcedBoundary > 0) return {
			pageIndex: targetPageIndex,
			maxRightBoundary: forcedBoundary,
			preferredRightBoundary: forcedBoundary
		};
		const visible = Number(visibleWidth) || 0;
		const advance = Number(pageAdvance) || 0;
		const leftMask = Number(currentLeftMask) || 0;
		const hasCleanPageLeftMask = leftMask > 0 && Math.max(0, visible - advance) <= 1;
		const maxRightBoundary = getVerticalRlCurrentEffectiveLeftBoundary(contentWidth, currentOffset, visible, leftMask);
		if (maxRightBoundary !== null && (Math.abs((Number(currentOffset) || 0) - (Number(currentGridOffset) || 0)) > 1 || hasCleanPageLeftMask)) return {
			pageIndex: targetPageIndex,
			maxRightBoundary,
			preferredRightBoundary: maxRightBoundary
		};
		return null;
	}
	function isVerticalRlBoundarySnapTextReady(options = {}) {
		return !!(options.iframe && options.document && options.window && options.body && options.contentWidth && options.visibleWidth && typeof options.document.createTreeWalker === "function");
	}
	function getVerticalRlBoundaryRightBoundaryLimits(options = {}) {
		const maxRightBoundary = Number(options && options.maxRightBoundary);
		const preferredRightBoundary = Number(options && options.preferredRightBoundary);
		return {
			maxRightBoundary,
			hasMaxRightBoundary: Number.isFinite(maxRightBoundary),
			preferredRightBoundary,
			hasPreferredRightBoundary: Number.isFinite(preferredRightBoundary)
		};
	}
	function getVerticalRlBoundaryMaxRightBoundaryLimitOptions(limits) {
		return {
			hasMaxRightBoundary: limits.hasMaxRightBoundary,
			maxRightBoundary: limits.maxRightBoundary
		};
	}
	function getVerticalRlBoundaryRightBoundaryLimitOptions(limits) {
		return {
			...getVerticalRlBoundaryMaxRightBoundaryLimitOptions(limits),
			hasPreferredRightBoundary: limits.hasPreferredRightBoundary,
			preferredRightBoundary: limits.preferredRightBoundary
		};
	}
	function getCachedVerticalRlBoundarySnap(cache, key) {
		return cache && cache.key === key ? cache.value : null;
	}
	function getVerticalRlBoundarySnapCacheEntry(key, value, nearestDelta) {
		return nearestDelta ? {
			key,
			value
		} : null;
	}
	function getVerticalRlBoundaryConstrainedOffset(logicalOffset, maxScroll, contentWidth, options = {}) {
		const scrollMax = Number(maxScroll) || 0;
		const content = Number(contentWidth) || 0;
		let offset = Number(logicalOffset) || 0;
		let preferredRightBoundary = Number(options.preferredRightBoundary);
		const maxRightBoundary = Number(options.maxRightBoundary);
		if (options.hasPreferredRightBoundary) {
			let targetRightBoundary = Math.max(0, preferredRightBoundary);
			if (options.hasMaxRightBoundary) targetRightBoundary = Math.min(targetRightBoundary, maxRightBoundary);
			preferredRightBoundary = targetRightBoundary;
			offset = Math.max(0, Math.min(scrollMax, content - targetRightBoundary));
		}
		if (options.hasMaxRightBoundary) offset = Math.max(offset, Math.max(0, Math.min(scrollMax, content - maxRightBoundary)));
		return {
			logicalOffset: offset,
			preferredRightBoundary
		};
	}
	function getVerticalRlBoundarySnapCacheKey(logicalOffset, maxScroll, contentWidth, visibleWidth, edgeGuardPx, options = {}) {
		const round = (value) => Math.round((Number(value) || 0) * 100) / 100;
		return [
			round(logicalOffset),
			round(maxScroll),
			round(contentWidth),
			round(visibleWidth),
			Number(edgeGuardPx) || 0,
			options.hasMaxRightBoundary ? round(Number(options.maxRightBoundary)) : "none",
			options.hasPreferredRightBoundary ? round(Number(options.preferredRightBoundary)) : "none"
		].join(":");
	}
	function getVerticalRlBoundarySnapCacheLookup(cache, logicalOffset, maxScroll, contentWidth, visibleWidth, edgeGuardPx, options = {}) {
		const cacheKey = getVerticalRlBoundarySnapCacheKey(logicalOffset, maxScroll, contentWidth, visibleWidth, edgeGuardPx, options);
		return {
			cacheKey,
			cachedSnap: getCachedVerticalRlBoundarySnap(cache, cacheKey)
		};
	}
	function getVerticalRlBoundarySnapPreflight(cache, logicalOffset, maxScroll, contentWidth, visibleWidth, edgeGuardPx, limitOptions = {}, readiness = {}) {
		const rightBoundaryLimits = getVerticalRlBoundaryRightBoundaryLimits(limitOptions);
		const constrainedOffset = getVerticalRlBoundaryConstrainedOffset(logicalOffset, maxScroll, contentWidth, getVerticalRlBoundaryRightBoundaryLimitOptions(rightBoundaryLimits));
		rightBoundaryLimits.preferredRightBoundary = constrainedOffset.preferredRightBoundary;
		const rightBoundaryOptions = getVerticalRlBoundaryRightBoundaryLimitOptions(rightBoundaryLimits);
		const maxRightBoundaryOptions = getVerticalRlBoundaryMaxRightBoundaryLimitOptions(rightBoundaryLimits);
		const shouldMeasureText = isVerticalRlBoundarySnapTextReady({
			...readiness,
			contentWidth,
			visibleWidth
		});
		return {
			cacheLookup: shouldMeasureText ? getVerticalRlBoundarySnapCacheLookup(cache, constrainedOffset.logicalOffset, maxScroll, contentWidth, visibleWidth, edgeGuardPx, rightBoundaryOptions) : null,
			logicalOffset: constrainedOffset.logicalOffset,
			maxRightBoundaryOptions,
			rightBoundaryLimits,
			rightBoundaryOptions,
			shouldMeasureText
		};
	}
	function getVerticalRlBoundarySnapViewportBounds(logicalOffset, contentWidth, visibleWidth) {
		const offset = Number(logicalOffset) || 0;
		const content = Number(contentWidth) || 0;
		const visible = Number(visibleWidth) || 0;
		const rightOriginRight = content - offset;
		const rightOriginLeft = rightOriginRight - visible;
		const leftOriginLeft = offset;
		const leftOriginRight = offset + visible;
		return [{
			left: rightOriginLeft,
			right: rightOriginRight
		}, {
			left: leftOriginLeft,
			right: leftOriginRight
		}];
	}
	function getVerticalRlBoundarySnapEdgeGuard(edgeGuardPx) {
		return Math.max(1, Math.min(8, Math.round(Number(edgeGuardPx) || 2)));
	}
	function getVerticalRlBoundarySnapRawEdgeGuard(edgeGuardPx) {
		return Number(edgeGuardPx) || 0;
	}
	function getVerticalRlBoundarySnapEdgeGuards(edgeGuardPx) {
		return {
			edgeGuard: getVerticalRlBoundarySnapEdgeGuard(edgeGuardPx),
			rawEdgeGuard: getVerticalRlBoundarySnapRawEdgeGuard(edgeGuardPx)
		};
	}
	function getVerticalRlBoundarySnapStructuralBleed(visibleWidth, pageAdvance) {
		const visible = Number(visibleWidth) || 0;
		return visible - (Number(pageAdvance) || visible);
	}
	function getVerticalRlBoundarySnapStructuralMasks(widths) {
		return {
			left: Number(widths && widths.left) || 0,
			right: Number(widths && widths.right) || 0
		};
	}
	function getVerticalRlBoundarySnapDeltaInputs(edgeGuardPx, structuralGutterMask, visibleWidth, pageAdvance, boundaryShift) {
		const edgeGuards = getVerticalRlBoundarySnapEdgeGuards(edgeGuardPx);
		return {
			edgeGuard: edgeGuards.edgeGuard,
			edgeGuardPx: edgeGuards.rawEdgeGuard,
			structuralMasks: getVerticalRlBoundarySnapStructuralMasks(structuralGutterMask),
			boundaryShift,
			structuralBleed: getVerticalRlBoundarySnapStructuralBleed(visibleWidth, pageAdvance)
		};
	}
	function getVerticalRlCleanPageEdgeMaskInput(pageAdvance, totalPages, currentPageIndex, currentOffset, previousOffset, actualCurrentOffset, currentGridOffset, sequentialBoundaryPageIndex) {
		const advance = Number(pageAdvance) || 0;
		const total = Number(totalPages) || 0;
		const pageIndex = Number(currentPageIndex) || 0;
		const maxMask = getVerticalRlEdgeMaskLimit(advance);
		if (!advance || total <= 1 || pageIndex <= 0 || !maxMask) return null;
		const previousPageStep = Math.abs((Number(currentOffset) || 0) - (Number(previousOffset) || 0)) || advance;
		const forceRawLeftMask = Number.isFinite(Number(sequentialBoundaryPageIndex)) && Number(sequentialBoundaryPageIndex) === pageIndex || Math.abs((Number(actualCurrentOffset) || 0) - (Number(currentGridOffset) || 0)) > 1;
		return {
			widths: {
				left: 0,
				right: 0
			},
			maxMask,
			nextPageStep: previousPageStep,
			previousPageStep,
			rightMaxMask: maxMask,
			allowRawRightMask: true,
			allowRawLeftMask: pageIndex === total - 2,
			forceRawLeftMask
		};
	}
	function getPreviousVerticalRlLeftMaskInput(previousPageStep, left, maxMask, containerLeft, containerRight, iframeLeft) {
		const previousStep = Number(previousPageStep) || 0;
		const maskLimit = Math.max(0, Number(maxMask) || 0);
		if (!previousStep || !maskLimit) return null;
		const rawLeft = (Number(containerLeft) || 0) - (Number(iframeLeft) || 0) + previousStep;
		const rawRight = (Number(containerRight) || 0) - (Number(iframeLeft) || 0) + previousStep;
		return {
			widths: {
				left: Math.min(Number(left) || 0, maskLimit),
				right: 0
			},
			maxMask: maskLimit,
			rawLeft,
			rawRight,
			nextPageStep: previousStep,
			rightMaxMask: 0
		};
	}
	function getVerticalRlStructuralEdgeMaskInput(logicalOffset, contentWidth, visibleWidth, pageAdvance) {
		const advance = Number(pageAdvance) || 0;
		const content = Number(contentWidth) || 0;
		const visible = Number(visibleWidth) || 0;
		const offset = Number(logicalOffset) || 0;
		const bleed = visible - advance;
		if (!advance || !content || !visible || bleed <= 1) return null;
		const rawRight = content - offset;
		const rawLeft = rawRight - visible;
		const maxMask = getVerticalRlEdgeMaskLimit(advance);
		return {
			widths: {
				left: Math.min(Math.ceil(bleed), maxMask),
				right: 0
			},
			maxMask,
			rawLeft,
			rawRight,
			nextPageStep: advance,
			rightMaxMask: 0
		};
	}
	function getVerticalRlRectDistanceToLogicalViewport(left, right, rawLeft, rawRight) {
		if (right < rawLeft) return rawLeft - right;
		if (left > rawRight) return left - rawRight;
		return 0;
	}
	function getVerticalRlViewportRectCoordinates(rectLeft, rectRight, shiftedLeft, shiftedRight, rawLeft, rawRight, iframeLeft, tolerance = .5) {
		const directLeft = Number(rectLeft) || 0;
		const directRight = Number(rectRight) || 0;
		const embeddedLeft = Number(shiftedLeft) || 0;
		const embeddedRight = Number(shiftedRight) || 0;
		if ((Number(iframeLeft) || 0) >= 0) return {
			left: directLeft,
			right: directRight
		};
		const directDistance = getVerticalRlRectDistanceToLogicalViewport(directLeft, directRight, rawLeft, rawRight);
		if (getVerticalRlRectDistanceToLogicalViewport(embeddedLeft, embeddedRight, rawLeft, rawRight) + (Number(tolerance) || 0) < directDistance) return {
			left: embeddedLeft,
			right: embeddedRight
		};
		return {
			left: directLeft,
			right: directRight
		};
	}
	function getVerticalRlViewportRect(rect, rawLeft, rawRight, iframeLeft, tolerance = .5) {
		const rectLeft = Number(rect && rect.left) || 0;
		const rectRight = Number(rect && rect.right) || 0;
		const rectCoordinates = getVerticalRlViewportRectCoordinates(rectLeft, rectRight, rectLeft - (Number(iframeLeft) || 0), rectRight - (Number(iframeLeft) || 0), rawLeft, rawRight, iframeLeft, tolerance);
		return {
			...rect,
			left: rectCoordinates.left,
			right: rectCoordinates.right
		};
	}
	function getVerticalRlViewportRects(rects, rawLeft, rawRight, iframeLeft, tolerance = .5) {
		return (rects || []).map((rect) => getVerticalRlViewportRect(rect, rawLeft, rawRight, iframeLeft, tolerance));
	}
	function getVerticalRlClosestViewportRectCoordinates(rectLeft, rectRight, shiftedLeft, shiftedRight, viewports, tolerance = .5) {
		const directLeft = Number(rectLeft) || 0;
		const directRight = Number(rectRight) || 0;
		const embeddedLeft = Number(shiftedLeft) || 0;
		const embeddedRight = Number(shiftedRight) || 0;
		const normalizedViewports = (Array.isArray(viewports) ? viewports : []).map((viewport) => ({
			left: Number(viewport && viewport.left),
			right: Number(viewport && viewport.right)
		})).filter((viewport) => Number.isFinite(viewport.left) && Number.isFinite(viewport.right) && viewport.right >= viewport.left);
		if (!normalizedViewports.length) return {
			left: directLeft,
			right: directRight
		};
		const directDistance = Math.min(...normalizedViewports.map((viewport) => getVerticalRlRectDistanceToLogicalViewport(directLeft, directRight, viewport.left, viewport.right)));
		if (Math.min(...normalizedViewports.map((viewport) => getVerticalRlRectDistanceToLogicalViewport(embeddedLeft, embeddedRight, viewport.left, viewport.right))) + (Number(tolerance) || 0) < directDistance) return {
			left: embeddedLeft,
			right: embeddedRight
		};
		return {
			left: directLeft,
			right: directRight
		};
	}
	function getVerticalRlClosestViewportRect(rect, iframeLeft, viewports, tolerance = .5) {
		const rectLeft = Number(rect && rect.left) || 0;
		const rectRight = Number(rect && rect.right) || 0;
		const rectCoordinates = getVerticalRlClosestViewportRectCoordinates(rectLeft, rectRight, rectLeft - (Number(iframeLeft) || 0), rectRight - (Number(iframeLeft) || 0), viewports, tolerance);
		return {
			...rect,
			left: rectCoordinates.left,
			right: rectCoordinates.right
		};
	}
	function getVerticalRlClosestViewportRects(rects, iframeLeft, viewports, tolerance = .5) {
		return (rects || []).map((rect) => getVerticalRlClosestViewportRect(rect, iframeLeft, viewports, tolerance));
	}
	function getVerticalRlBoundarySnapCandidateRects(rects, iframeLeft, logicalOffset, contentWidth, visibleWidth, tolerance = .5) {
		return getVerticalRlClosestViewportRects(rects, iframeLeft, getVerticalRlBoundarySnapViewportBounds(logicalOffset, contentWidth, visibleWidth), tolerance);
	}
	function getVerticalRlBoundarySnapMeasurementInputs(rects, iframeLeft, logicalOffset, contentWidth, visibleWidth, edgeGuardPx, structuralGutterMask, pageAdvance, boundaryShift, tolerance = .5) {
		return {
			rects: getVerticalRlBoundarySnapCandidateRects(rects, iframeLeft, logicalOffset, contentWidth, visibleWidth, tolerance),
			deltaInputs: getVerticalRlBoundarySnapDeltaInputs(edgeGuardPx, structuralGutterMask, visibleWidth, pageAdvance, boundaryShift)
		};
	}
	function countVerticalRlBoundaryCrossings(rects, leftBoundary, rightBoundary) {
		let count = 0;
		for (const rect of rects || []) if (rect.left < leftBoundary && rect.right > leftBoundary || rect.left < rightBoundary && rect.right > rightBoundary) count += 1;
		return count;
	}
	function evaluateVerticalRlBoundaryModel(rects, leftBoundary, rightBoundary, boundaryOffsetDirection, logicalOffset, maxScroll, edgeGuard, options = {}) {
		let candidates = [];
		let roundDelta = (delta) => delta < 0 ? Math.floor(delta) : Math.ceil(delta);
		let addBoundaryCandidates = (boundary) => {
			let straddlers = (rects || []).filter((rect) => rect.left < boundary && rect.right > boundary);
			if (!straddlers.length) return;
			let minLeft = Math.min(...straddlers.map((rect) => rect.left));
			let maxRight = Math.max(...straddlers.map((rect) => rect.right));
			candidates.push(roundDelta((minLeft - edgeGuard - boundary) / boundaryOffsetDirection));
			candidates.push(roundDelta((maxRight + edgeGuard - boundary) / boundaryOffsetDirection));
		};
		let initialCrossings = countVerticalRlBoundaryCrossings(rects, leftBoundary, rightBoundary);
		let best = null;
		if (initialCrossings > 0) {
			addBoundaryCandidates(leftBoundary);
			addBoundaryCandidates(rightBoundary);
			let uniqueCandidates = Array.from(new Set(candidates.filter((delta) => Number.isFinite(delta) && delta !== 0)));
			for (const delta of uniqueCandidates) {
				let snappedOffset = Math.max(0, Math.min(maxScroll, logicalOffset + delta));
				let clampedDelta = snappedOffset - logicalOffset;
				if (!clampedDelta) continue;
				if (options.hasMaxRightBoundary && boundaryOffsetDirection < 0 && (Number(options.contentWidth) || 0) - snappedOffset > (Number(options.maxRightBoundary) || 0) + 1) continue;
				let shiftedDelta = boundaryOffsetDirection * clampedDelta;
				let score = countVerticalRlBoundaryCrossings(rects, leftBoundary + shiftedDelta, rightBoundary + shiftedDelta);
				let distance = Math.abs(clampedDelta);
				if (!best || score < best.score || score === best.score && distance < best.distance) best = {
					delta: clampedDelta,
					distance,
					score
				};
			}
		}
		if (best && best.score < initialCrossings) return {
			delta: best.delta,
			distance: best.distance,
			initialCrossings,
			score: best.score
		};
		return {
			delta: 0,
			distance: 0,
			initialCrossings,
			score: initialCrossings
		};
	}
	function getBestVerticalRlBoundarySnap(snaps) {
		return (snaps || []).filter((snap) => snap && snap.delta).sort(function(a, b) {
			if (a.score !== b.score) return a.score - b.score;
			if (a.model !== b.model) return a.model === "right-origin" ? -1 : 1;
			return a.distance - b.distance;
		})[0] || null;
	}
	function getVerticalRlBoundarySnapModels(rects, logicalOffset, contentWidth, visibleWidth, maxScroll, edgeGuard, structuralLeftMask, structuralRightMask, options = {}) {
		const offset = Number(logicalOffset) || 0;
		const content = Number(contentWidth) || 0;
		const visible = Number(visibleWidth) || 0;
		const leftMask = Number(structuralLeftMask) || 0;
		const rightMask = Number(structuralRightMask) || 0;
		const rightOriginRawRight = content - offset;
		let rightOriginSnap = evaluateVerticalRlBoundaryModel(rects, rightOriginRawRight - visible + leftMask, rightOriginRawRight - rightMask, -1, offset, maxScroll, edgeGuard, {
			hasMaxRightBoundary: options.hasMaxRightBoundary,
			maxRightBoundary: options.maxRightBoundary,
			contentWidth: content
		});
		rightOriginSnap.model = "right-origin";
		let leftOriginSnap = evaluateVerticalRlBoundaryModel(rects, offset + leftMask, offset + visible - rightMask, 1, offset, maxScroll, edgeGuard, {
			hasMaxRightBoundary: options.hasMaxRightBoundary,
			maxRightBoundary: options.maxRightBoundary,
			contentWidth: content
		});
		leftOriginSnap.model = "left-origin";
		return {
			rightOriginSnap,
			leftOriginSnap
		};
	}
	function getVerticalRlBoundaryShiftAdjustedDelta(nearestDelta, boundaryShift, edgeGuardPx, structuralBleed) {
		const delta = Number(nearestDelta) || 0;
		const shift = Number(boundaryShift) || 0;
		const guard = Number(edgeGuardPx) || 0;
		const bleed = Number(structuralBleed) || 0;
		if (delta > 0 && shift > 0 && guard > 0 && bleed > 1 && Math.abs(shift - guard) <= 1) return Math.min(delta, Math.max(1, Math.floor(guard / 2)));
		return delta;
	}
	function getVerticalRlBoundarySnapDelta(rects, logicalOffset, contentWidth, visibleWidth, maxScroll, edgeGuard, structuralLeftMask, structuralRightMask, boundaryShift, boundaryShiftEdgeGuardPx, structuralBleed, options = {}) {
		const models = getVerticalRlBoundarySnapModels(rects, logicalOffset, contentWidth, visibleWidth, maxScroll, edgeGuard, structuralLeftMask, structuralRightMask, options);
		const bestSnap = getBestVerticalRlBoundarySnap([models.rightOriginSnap, models.leftOriginSnap]);
		return getVerticalRlBoundaryShiftAdjustedDelta(bestSnap ? bestSnap.delta : 0, boundaryShift, boundaryShiftEdgeGuardPx, structuralBleed);
	}
	function getVerticalRlBoundarySnappedOffset(nearestDelta, logicalOffset, maxScroll, contentWidth, options = {}) {
		const offset = Number(logicalOffset) || 0;
		const scrollMax = Number(maxScroll) || 0;
		const content = Number(contentWidth) || 0;
		const delta = Number(nearestDelta) || 0;
		let snapped = delta ? Math.max(0, Math.min(scrollMax, offset + delta)) : offset;
		if (options.hasPreferredRightBoundary) {
			let preferredRightBoundary = Number(options.preferredRightBoundary) || 0;
			if (content - snapped < preferredRightBoundary - 1) snapped = Math.min(snapped, Math.max(0, Math.min(scrollMax, content - preferredRightBoundary)));
		}
		if (options.hasMaxRightBoundary) {
			let maxRightBoundary = Number(options.maxRightBoundary) || 0;
			if (content - snapped > maxRightBoundary + 1) snapped = Math.max(snapped, Math.max(0, Math.min(scrollMax, content - maxRightBoundary)));
		}
		return snapped;
	}
	function getVerticalRlBoundarySnapResult(cacheKey, nearestDelta, logicalOffset, maxScroll, contentWidth, options = {}) {
		const snapped = getVerticalRlBoundarySnappedOffset(nearestDelta, logicalOffset, maxScroll, contentWidth, options);
		return {
			cacheEntry: getVerticalRlBoundarySnapCacheEntry(cacheKey, snapped, nearestDelta),
			snapped
		};
	}
	function getVerticalRlBoundarySnapPipelineResult(cacheKey, measurementInputs, logicalOffset, contentWidth, visibleWidth, maxScroll, maxRightBoundaryOptions = {}, rightBoundaryOptions = {}) {
		return getVerticalRlBoundarySnapResult(cacheKey, getVerticalRlBoundarySnapDelta(measurementInputs.rects, logicalOffset, contentWidth, visibleWidth, maxScroll, measurementInputs.deltaInputs.edgeGuard, measurementInputs.deltaInputs.structuralMasks.left, measurementInputs.deltaInputs.structuralMasks.right, measurementInputs.deltaInputs.boundaryShift, measurementInputs.deltaInputs.edgeGuardPx, measurementInputs.deltaInputs.structuralBleed, maxRightBoundaryOptions), logicalOffset, maxScroll, contentWidth, rightBoundaryOptions);
	}
	//#endregion
	//#region node_modules/lodash/isObject.js
	var require_isObject = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		/**
		* Checks if `value` is the
		* [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
		* of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
		*
		* @static
		* @memberOf _
		* @since 0.1.0
		* @category Lang
		* @param {*} value The value to check.
		* @returns {boolean} Returns `true` if `value` is an object, else `false`.
		* @example
		*
		* _.isObject({});
		* // => true
		*
		* _.isObject([1, 2, 3]);
		* // => true
		*
		* _.isObject(_.noop);
		* // => true
		*
		* _.isObject(null);
		* // => false
		*/
		function isObject(value) {
			var type = typeof value;
			return value != null && (type == "object" || type == "function");
		}
		module.exports = isObject;
	}));
	//#endregion
	//#region node_modules/lodash/_freeGlobal.js
	var require__freeGlobal = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = typeof global == "object" && global && global.Object === Object && global;
	}));
	//#endregion
	//#region node_modules/lodash/_root.js
	var require__root = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var freeGlobal = require__freeGlobal();
		/** Detect free variable `self`. */
		var freeSelf = typeof self == "object" && self && self.Object === Object && self;
		module.exports = freeGlobal || freeSelf || Function("return this")();
	}));
	//#endregion
	//#region node_modules/lodash/now.js
	var require_now = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var root = require__root();
		/**
		* Gets the timestamp of the number of milliseconds that have elapsed since
		* the Unix epoch (1 January 1970 00:00:00 UTC).
		*
		* @static
		* @memberOf _
		* @since 2.4.0
		* @category Date
		* @returns {number} Returns the timestamp.
		* @example
		*
		* _.defer(function(stamp) {
		*   console.log(_.now() - stamp);
		* }, _.now());
		* // => Logs the number of milliseconds it took for the deferred invocation.
		*/
		var now = function() {
			return root.Date.now();
		};
		module.exports = now;
	}));
	//#endregion
	//#region node_modules/lodash/_trimmedEndIndex.js
	var require__trimmedEndIndex = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		/** Used to match a single whitespace character. */
		var reWhitespace = /\s/;
		/**
		* Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
		* character of `string`.
		*
		* @private
		* @param {string} string The string to inspect.
		* @returns {number} Returns the index of the last non-whitespace character.
		*/
		function trimmedEndIndex(string) {
			var index = string.length;
			while (index-- && reWhitespace.test(string.charAt(index)));
			return index;
		}
		module.exports = trimmedEndIndex;
	}));
	//#endregion
	//#region node_modules/lodash/_baseTrim.js
	var require__baseTrim = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var trimmedEndIndex = require__trimmedEndIndex();
		/** Used to match leading whitespace. */
		var reTrimStart = /^\s+/;
		/**
		* The base implementation of `_.trim`.
		*
		* @private
		* @param {string} string The string to trim.
		* @returns {string} Returns the trimmed string.
		*/
		function baseTrim(string) {
			return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
		}
		module.exports = baseTrim;
	}));
	//#endregion
	//#region node_modules/lodash/_Symbol.js
	var require__Symbol = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = require__root().Symbol;
	}));
	//#endregion
	//#region node_modules/lodash/_getRawTag.js
	var require__getRawTag = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var Symbol = require__Symbol();
		/** Used for built-in method references. */
		var objectProto = Object.prototype;
		/** Used to check objects for own properties. */
		var hasOwnProperty = objectProto.hasOwnProperty;
		/**
		* Used to resolve the
		* [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
		* of values.
		*/
		var nativeObjectToString = objectProto.toString;
		/** Built-in value references. */
		var symToStringTag = Symbol ? Symbol.toStringTag : void 0;
		/**
		* A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
		*
		* @private
		* @param {*} value The value to query.
		* @returns {string} Returns the raw `toStringTag`.
		*/
		function getRawTag(value) {
			var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
			try {
				value[symToStringTag] = void 0;
				var unmasked = true;
			} catch (e) {}
			var result = nativeObjectToString.call(value);
			if (unmasked) if (isOwn) value[symToStringTag] = tag;
			else delete value[symToStringTag];
			return result;
		}
		module.exports = getRawTag;
	}));
	//#endregion
	//#region node_modules/lodash/_objectToString.js
	var require__objectToString = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		/**
		* Used to resolve the
		* [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
		* of values.
		*/
		var nativeObjectToString = Object.prototype.toString;
		/**
		* Converts `value` to a string using `Object.prototype.toString`.
		*
		* @private
		* @param {*} value The value to convert.
		* @returns {string} Returns the converted string.
		*/
		function objectToString(value) {
			return nativeObjectToString.call(value);
		}
		module.exports = objectToString;
	}));
	//#endregion
	//#region node_modules/lodash/_baseGetTag.js
	var require__baseGetTag = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var Symbol = require__Symbol(), getRawTag = require__getRawTag(), objectToString = require__objectToString();
		/** `Object#toString` result references. */
		var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
		/** Built-in value references. */
		var symToStringTag = Symbol ? Symbol.toStringTag : void 0;
		/**
		* The base implementation of `getTag` without fallbacks for buggy environments.
		*
		* @private
		* @param {*} value The value to query.
		* @returns {string} Returns the `toStringTag`.
		*/
		function baseGetTag(value) {
			if (value == null) return value === void 0 ? undefinedTag : nullTag;
			return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
		}
		module.exports = baseGetTag;
	}));
	//#endregion
	//#region node_modules/lodash/isObjectLike.js
	var require_isObjectLike = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		/**
		* Checks if `value` is object-like. A value is object-like if it's not `null`
		* and has a `typeof` result of "object".
		*
		* @static
		* @memberOf _
		* @since 4.0.0
		* @category Lang
		* @param {*} value The value to check.
		* @returns {boolean} Returns `true` if `value` is object-like, else `false`.
		* @example
		*
		* _.isObjectLike({});
		* // => true
		*
		* _.isObjectLike([1, 2, 3]);
		* // => true
		*
		* _.isObjectLike(_.noop);
		* // => false
		*
		* _.isObjectLike(null);
		* // => false
		*/
		function isObjectLike(value) {
			return value != null && typeof value == "object";
		}
		module.exports = isObjectLike;
	}));
	//#endregion
	//#region node_modules/lodash/isSymbol.js
	var require_isSymbol = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var baseGetTag = require__baseGetTag(), isObjectLike = require_isObjectLike();
		/** `Object#toString` result references. */
		var symbolTag = "[object Symbol]";
		/**
		* Checks if `value` is classified as a `Symbol` primitive or object.
		*
		* @static
		* @memberOf _
		* @since 4.0.0
		* @category Lang
		* @param {*} value The value to check.
		* @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
		* @example
		*
		* _.isSymbol(Symbol.iterator);
		* // => true
		*
		* _.isSymbol('abc');
		* // => false
		*/
		function isSymbol(value) {
			return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
		}
		module.exports = isSymbol;
	}));
	//#endregion
	//#region node_modules/lodash/toNumber.js
	var require_toNumber = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var baseTrim = require__baseTrim(), isObject = require_isObject(), isSymbol = require_isSymbol();
		/** Used as references for various `Number` constants. */
		var NAN = NaN;
		/** Used to detect bad signed hexadecimal string values. */
		var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
		/** Used to detect binary string values. */
		var reIsBinary = /^0b[01]+$/i;
		/** Used to detect octal string values. */
		var reIsOctal = /^0o[0-7]+$/i;
		/** Built-in method references without a dependency on `root`. */
		var freeParseInt = parseInt;
		/**
		* Converts `value` to a number.
		*
		* @static
		* @memberOf _
		* @since 4.0.0
		* @category Lang
		* @param {*} value The value to process.
		* @returns {number} Returns the number.
		* @example
		*
		* _.toNumber(3.2);
		* // => 3.2
		*
		* _.toNumber(Number.MIN_VALUE);
		* // => 5e-324
		*
		* _.toNumber(Infinity);
		* // => Infinity
		*
		* _.toNumber('3.2');
		* // => 3.2
		*/
		function toNumber(value) {
			if (typeof value == "number") return value;
			if (isSymbol(value)) return NAN;
			if (isObject(value)) {
				var other = typeof value.valueOf == "function" ? value.valueOf() : value;
				value = isObject(other) ? other + "" : other;
			}
			if (typeof value != "string") return value === 0 ? value : +value;
			value = baseTrim(value);
			var isBinary = reIsBinary.test(value);
			return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
		}
		module.exports = toNumber;
	}));
	//#endregion
	//#region node_modules/lodash/debounce.js
	var require_debounce = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var isObject = require_isObject(), now = require_now(), toNumber = require_toNumber();
		/** Error message constants. */
		var FUNC_ERROR_TEXT = "Expected a function";
		var nativeMax = Math.max, nativeMin = Math.min;
		/**
		* Creates a debounced function that delays invoking `func` until after `wait`
		* milliseconds have elapsed since the last time the debounced function was
		* invoked. The debounced function comes with a `cancel` method to cancel
		* delayed `func` invocations and a `flush` method to immediately invoke them.
		* Provide `options` to indicate whether `func` should be invoked on the
		* leading and/or trailing edge of the `wait` timeout. The `func` is invoked
		* with the last arguments provided to the debounced function. Subsequent
		* calls to the debounced function return the result of the last `func`
		* invocation.
		*
		* **Note:** If `leading` and `trailing` options are `true`, `func` is
		* invoked on the trailing edge of the timeout only if the debounced function
		* is invoked more than once during the `wait` timeout.
		*
		* If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
		* until to the next tick, similar to `setTimeout` with a timeout of `0`.
		*
		* See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
		* for details over the differences between `_.debounce` and `_.throttle`.
		*
		* @static
		* @memberOf _
		* @since 0.1.0
		* @category Function
		* @param {Function} func The function to debounce.
		* @param {number} [wait=0] The number of milliseconds to delay.
		* @param {Object} [options={}] The options object.
		* @param {boolean} [options.leading=false]
		*  Specify invoking on the leading edge of the timeout.
		* @param {number} [options.maxWait]
		*  The maximum time `func` is allowed to be delayed before it's invoked.
		* @param {boolean} [options.trailing=true]
		*  Specify invoking on the trailing edge of the timeout.
		* @returns {Function} Returns the new debounced function.
		* @example
		*
		* // Avoid costly calculations while the window size is in flux.
		* jQuery(window).on('resize', _.debounce(calculateLayout, 150));
		*
		* // Invoke `sendMail` when clicked, debouncing subsequent calls.
		* jQuery(element).on('click', _.debounce(sendMail, 300, {
		*   'leading': true,
		*   'trailing': false
		* }));
		*
		* // Ensure `batchLog` is invoked once after 1 second of debounced calls.
		* var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
		* var source = new EventSource('/stream');
		* jQuery(source).on('message', debounced);
		*
		* // Cancel the trailing debounced invocation.
		* jQuery(window).on('popstate', debounced.cancel);
		*/
		function debounce(func, wait, options) {
			var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
			if (typeof func != "function") throw new TypeError(FUNC_ERROR_TEXT);
			wait = toNumber(wait) || 0;
			if (isObject(options)) {
				leading = !!options.leading;
				maxing = "maxWait" in options;
				maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
				trailing = "trailing" in options ? !!options.trailing : trailing;
			}
			function invokeFunc(time) {
				var args = lastArgs, thisArg = lastThis;
				lastArgs = lastThis = void 0;
				lastInvokeTime = time;
				result = func.apply(thisArg, args);
				return result;
			}
			function leadingEdge(time) {
				lastInvokeTime = time;
				timerId = setTimeout(timerExpired, wait);
				return leading ? invokeFunc(time) : result;
			}
			function remainingWait(time) {
				var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
				return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
			}
			function shouldInvoke(time) {
				var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
				return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
			}
			function timerExpired() {
				var time = now();
				if (shouldInvoke(time)) return trailingEdge(time);
				timerId = setTimeout(timerExpired, remainingWait(time));
			}
			function trailingEdge(time) {
				timerId = void 0;
				if (trailing && lastArgs) return invokeFunc(time);
				lastArgs = lastThis = void 0;
				return result;
			}
			function cancel() {
				if (timerId !== void 0) clearTimeout(timerId);
				lastInvokeTime = 0;
				lastArgs = lastCallTime = lastThis = timerId = void 0;
			}
			function flush() {
				return timerId === void 0 ? result : trailingEdge(now());
			}
			function debounced() {
				var time = now(), isInvoking = shouldInvoke(time);
				lastArgs = arguments;
				lastThis = this;
				lastCallTime = time;
				if (isInvoking) {
					if (timerId === void 0) return leadingEdge(lastCallTime);
					if (maxing) {
						clearTimeout(timerId);
						timerId = setTimeout(timerExpired, wait);
						return invokeFunc(lastCallTime);
					}
				}
				if (timerId === void 0) timerId = setTimeout(timerExpired, wait);
				return result;
			}
			debounced.cancel = cancel;
			debounced.flush = flush;
			return debounced;
		}
		module.exports = debounce;
	}));
	//#endregion
	//#region src/managers/helpers/stage.ts
	var import_throttle = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports, module) => {
		var debounce = require_debounce(), isObject = require_isObject();
		/** Error message constants. */
		var FUNC_ERROR_TEXT = "Expected a function";
		/**
		* Creates a throttled function that only invokes `func` at most once per
		* every `wait` milliseconds. The throttled function comes with a `cancel`
		* method to cancel delayed `func` invocations and a `flush` method to
		* immediately invoke them. Provide `options` to indicate whether `func`
		* should be invoked on the leading and/or trailing edge of the `wait`
		* timeout. The `func` is invoked with the last arguments provided to the
		* throttled function. Subsequent calls to the throttled function return the
		* result of the last `func` invocation.
		*
		* **Note:** If `leading` and `trailing` options are `true`, `func` is
		* invoked on the trailing edge of the timeout only if the throttled function
		* is invoked more than once during the `wait` timeout.
		*
		* If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
		* until to the next tick, similar to `setTimeout` with a timeout of `0`.
		*
		* See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
		* for details over the differences between `_.throttle` and `_.debounce`.
		*
		* @static
		* @memberOf _
		* @since 0.1.0
		* @category Function
		* @param {Function} func The function to throttle.
		* @param {number} [wait=0] The number of milliseconds to throttle invocations to.
		* @param {Object} [options={}] The options object.
		* @param {boolean} [options.leading=true]
		*  Specify invoking on the leading edge of the timeout.
		* @param {boolean} [options.trailing=true]
		*  Specify invoking on the trailing edge of the timeout.
		* @returns {Function} Returns the new throttled function.
		* @example
		*
		* // Avoid excessively updating the position while scrolling.
		* jQuery(window).on('scroll', _.throttle(updatePosition, 100));
		*
		* // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
		* var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
		* jQuery(element).on('click', throttled);
		*
		* // Cancel the trailing throttled invocation.
		* jQuery(window).on('popstate', throttled.cancel);
		*/
		function throttle(func, wait, options) {
			var leading = true, trailing = true;
			if (typeof func != "function") throw new TypeError(FUNC_ERROR_TEXT);
			if (isObject(options)) {
				leading = "leading" in options ? !!options.leading : leading;
				trailing = "trailing" in options ? !!options.trailing : trailing;
			}
			return debounce(func, wait, {
				"leading": leading,
				"maxWait": wait,
				"trailing": trailing
			});
		}
		module.exports = throttle;
	})))());
	var Stage = class {
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
		constructor(_options) {
			this.settings = _options || {};
			this.id = "epubjs-container-" + uuid$1();
			this.container = this.create(this.settings);
			if (this.settings.hidden) this.wrapper = this.wrap(this.container);
		}
		create(options) {
			let height = options.height;
			let width = options.width;
			let overflow = options.overflow || false;
			let axis = options.axis || "vertical";
			let direction = options.direction;
			extend$1(this.settings, options);
			if (options.height && isNumber$1(options.height)) height = options.height + "px";
			if (options.width && isNumber$1(options.width)) width = options.width + "px";
			let container = document.createElement("div");
			container.id = this.id;
			container.classList.add("epub-container");
			container.style.wordSpacing = "0";
			container.style.lineHeight = "0";
			container.style.verticalAlign = "top";
			container.style.position = "relative";
			if (axis === "horizontal") {
				container.style.display = "flex";
				container.style.flexDirection = "row";
				container.style.flexWrap = "nowrap";
			}
			if (width) container.style.width = width;
			if (height) container.style.height = height;
			if (overflow) if (overflow === "scroll" && axis === "vertical") {
				container.style.overflowY = overflow;
				container.style.overflowX = "hidden";
			} else if (overflow === "scroll" && axis === "horizontal") {
				container.style.overflowY = "hidden";
				container.style.overflowX = overflow;
			} else container.style.overflow = overflow;
			if (direction) {
				container.dir = direction;
				container.style["direction"] = direction;
			}
			if (direction && this.settings.fullsize) document.body.style["direction"] = direction;
			return container;
		}
		wrap(container) {
			var wrapper = document.createElement("div");
			wrapper.style.visibility = "hidden";
			wrapper.style.overflow = "hidden";
			wrapper.style.width = "0";
			wrapper.style.height = "0";
			wrapper.appendChild(container);
			return wrapper;
		}
		getElement(_element) {
			var element;
			if (isElement$1(_element)) element = _element;
			else if (typeof _element === "string") element = document.getElementById(_element);
			if (!element) throw new Error("Not an Element");
			return element;
		}
		attachTo(what) {
			var element = this.getElement(what);
			var base;
			if (!element) return;
			if (this.settings.hidden) base = this.wrapper;
			else base = this.container;
			element.appendChild(base);
			this.element = element;
			return element;
		}
		getContainer() {
			return this.container;
		}
		onResize(func) {
			if (!isNumber$1(this.settings.width) || !isNumber$1(this.settings.height)) {
				this.resizeFunc = (0, import_throttle.default)(func, 50);
				window.addEventListener("resize", this.resizeFunc, false);
			}
		}
		onOrientationChange(func) {
			this.orientationChangeFunc = func;
			window.addEventListener("orientationchange", this.orientationChangeFunc, false);
		}
		size(width, height) {
			var bounds;
			let _width = width || this.settings.width;
			let _height = height || this.settings.height;
			if (width === null) {
				bounds = this.element.getBoundingClientRect();
				if (bounds.width) {
					width = Math.floor(bounds.width);
					this.container.style.width = width + "px";
				}
			} else if (isNumber$1(width)) this.container.style.width = width + "px";
			else this.container.style.width = width;
			if (height === null) {
				bounds = bounds || this.element.getBoundingClientRect();
				if (bounds.height) {
					height = bounds.height;
					this.container.style.height = height + "px";
				}
			} else if (isNumber$1(height)) this.container.style.height = height + "px";
			else this.container.style.height = height;
			if (!isNumber$1(width)) {
				let containerBounds = this.container && this.container.getBoundingClientRect ? this.container.getBoundingClientRect() : null;
				width = containerBounds && containerBounds.width ? containerBounds.width : this.container.clientWidth;
			}
			if (!isNumber$1(height)) height = this.container.clientHeight;
			this.containerStyles = window.getComputedStyle(this.container);
			this.containerPadding = {
				left: parseFloat(this.containerStyles.paddingLeft) || 0,
				right: parseFloat(this.containerStyles.paddingRight) || 0,
				top: parseFloat(this.containerStyles.paddingTop) || 0,
				bottom: parseFloat(this.containerStyles.paddingBottom) || 0
			};
			let _windowBounds = windowBounds$1();
			let bodyStyles = window.getComputedStyle(document.body);
			let bodyPadding = {
				left: parseFloat(bodyStyles.paddingLeft) || 0,
				right: parseFloat(bodyStyles.paddingRight) || 0,
				top: parseFloat(bodyStyles.paddingTop) || 0,
				bottom: parseFloat(bodyStyles.paddingBottom) || 0
			};
			if (!_width) width = _windowBounds.width - bodyPadding.left - bodyPadding.right;
			if (this.settings.fullsize && !_height || !_height) height = _windowBounds.height - bodyPadding.top - bodyPadding.bottom;
			return {
				width: width - this.containerPadding.left - this.containerPadding.right,
				height: height - this.containerPadding.top - this.containerPadding.bottom
			};
		}
		bounds() {
			let box;
			if (this.container.style.overflow !== "visible") box = this.container && this.container.getBoundingClientRect();
			if (!box || !box.width || !box.height) return windowBounds$1();
			else return box;
		}
		getSheet() {
			var style = document.createElement("style");
			style.appendChild(document.createTextNode(""));
			document.head.appendChild(style);
			return style.sheet;
		}
		addStyleRules(selector, rulesArray) {
			var scope = "#" + this.id + " ";
			var rules = "";
			if (!this.sheet) this.sheet = this.getSheet();
			rulesArray.forEach(function(set) {
				for (var prop in set) if (Object.prototype.hasOwnProperty.call(set, prop)) rules += prop + ":" + set[prop] + ";";
			});
			this.sheet.insertRule(scope + selector + " {" + rules + "}", 0);
		}
		axis(axis) {
			if (axis === "horizontal") {
				this.container.style.display = "flex";
				this.container.style.flexDirection = "row";
				this.container.style.flexWrap = "nowrap";
			} else this.container.style.display = "block";
			this.settings.axis = axis;
		}
		direction(dir) {
			if (this.container) {
				this.container.dir = dir;
				this.container.style.direction = dir;
			}
			if (this.settings.fullsize) document.body.style.direction = dir;
			this.settings.dir = dir;
		}
		overflow(overflow) {
			if (this.container) if (overflow === "scroll" && this.settings.axis === "vertical") {
				this.container.style.overflowY = overflow;
				this.container.style.overflowX = "hidden";
			} else if (overflow === "scroll" && this.settings.axis === "horizontal") {
				this.container.style.overflowY = "hidden";
				this.container.style.overflowX = overflow;
			} else this.container.style.overflow = overflow;
			this.settings.overflow = overflow;
		}
		destroy() {
			if (this.element) {
				if (this.element.contains(this.container)) this.element.removeChild(this.container);
				window.removeEventListener("resize", this.resizeFunc);
				window.removeEventListener("orientationchange", this.orientationChangeFunc);
			}
		}
	};
	//#endregion
	//#region src/managers/helpers/views.ts
	var Views = class {
		container;
		_views;
		length;
		hidden;
		constructor(container) {
			this.container = container;
			this._views = [];
			this.length = 0;
			this.hidden = false;
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
		indexOf(view) {
			return this._views.indexOf(view);
		}
		slice(...args) {
			return this._views.slice.apply(this._views, args);
		}
		get(i) {
			return this._views[i];
		}
		append(view) {
			this._views.push(view);
			if (this.container) this.container.appendChild(view.element);
			this.length++;
			return view;
		}
		prepend(view) {
			this._views.unshift(view);
			if (this.container) this.container.insertBefore(view.element, this.container.firstChild);
			this.length++;
			return view;
		}
		insert(view, index) {
			this._views.splice(index, 0, view);
			if (this.container) if (index < this.container.children.length) this.container.insertBefore(view.element, this.container.children[index]);
			else this.container.appendChild(view.element);
			this.length++;
			return view;
		}
		remove(view) {
			var index = this._views.indexOf(view);
			if (index > -1) this._views.splice(index, 1);
			this.destroy(view);
			this.length--;
		}
		destroy(view) {
			view.destroy();
			if (this.container) this.container.removeChild(view.element);
			view = null;
		}
		forEach(...args) {
			return this._views.forEach.apply(this._views, args);
		}
		clear() {
			var view;
			var len = this.length;
			if (!this.length) return;
			for (var i = 0; i < len; i++) {
				view = this._views[i];
				this.destroy(view);
			}
			this._views = [];
			this.length = 0;
		}
		find(section) {
			var view;
			var len = this.length;
			for (var i = 0; i < len; i++) {
				view = this._views[i];
				if (view.displayed && view.section.index == section.index) return view;
			}
		}
		displayed() {
			var displayed = [];
			var view;
			var len = this.length;
			for (var i = 0; i < len; i++) {
				view = this._views[i];
				if (view.displayed) displayed.push(view);
			}
			return displayed;
		}
		show() {
			var view;
			var len = this.length;
			for (var i = 0; i < len; i++) {
				view = this._views[i];
				if (view.displayed) view.show();
			}
			this.hidden = false;
		}
		hide() {
			var view;
			var len = this.length;
			for (var i = 0; i < len; i++) {
				view = this._views[i];
				if (view.displayed) view.hide();
			}
			this.hidden = true;
		}
	};
	//#endregion
	//#region src/managers/default/index.ts
	var Deferred = defer$1;
	var DefaultViewManager = class {
		constructor(options) {
			this.name = "default";
			this.optsSettings = options.settings;
			this.View = options.view;
			this.request = options.request;
			this.renditionQueue = options.queue;
			this.q = new Queue(this);
			this.settings = extend$1(this.settings || {}, {
				infinite: true,
				hidden: false,
				width: void 0,
				height: void 0,
				axis: void 0,
				writingMode: void 0,
				flow: "scrolled",
				ignoreClass: "",
				fullsize: void 0,
				allowScriptedContent: false,
				allowPopups: false
			});
			extend$1(this.settings, options.settings || {});
			this.viewSettings = {
				ignoreClass: this.settings.ignoreClass,
				axis: this.settings.axis,
				flow: this.settings.flow,
				layout: this.layout,
				method: this.settings.method,
				width: 0,
				height: 0,
				forceEvenPages: true,
				allowScriptedContent: this.settings.allowScriptedContent,
				allowPopups: this.settings.allowPopups
			};
			this.rendered = false;
			this._layoutDirty = true;
			this._lastLayoutStageSize = null;
		}
		render(element, size) {
			let tag = element.tagName;
			if (typeof this.settings.fullsize === "undefined" && tag && (tag.toLowerCase() == "body" || tag.toLowerCase() == "html")) this.settings.fullsize = true;
			if (this.settings.fullsize) {
				this.settings.overflow = "visible";
				this.overflow = this.settings.overflow;
			}
			this.settings.size = size;
			this.settings.rtlScrollType = scrollType();
			this.stage = new Stage({
				width: size.width,
				height: size.height,
				overflow: this.overflow,
				hidden: this.settings.hidden,
				axis: this.settings.axis,
				fullsize: this.settings.fullsize,
				direction: this.settings.direction
			});
			this.stage.attachTo(element);
			this.container = this.stage.getContainer();
			this.views = new Views(this.container);
			this._bounds = this.bounds();
			this._stageSize = this.stage.size();
			this.viewSettings.width = this._stageSize.width;
			this.viewSettings.height = this._stageSize.height;
			this.stage.onResize(this.onResized.bind(this));
			this.stage.onOrientationChange(this.onOrientationChange.bind(this));
			this.addEventListeners();
			if (this.layout) this.updateLayout();
			this.rendered = true;
		}
		addEventListeners() {
			var scroller;
			this._onUnload = function(e) {
				this.destroy();
			}.bind(this);
			window.addEventListener("unload", this._onUnload);
			if (!this.settings.fullsize) scroller = this.container;
			else scroller = window;
			this._onScroll = this.onScroll.bind(this);
			scroller.addEventListener("scroll", this._onScroll);
		}
		removeEventListeners() {
			var scroller;
			if (!this.settings.fullsize) scroller = this.container;
			else scroller = window;
			scroller.removeEventListener("scroll", this._onScroll);
			this._onScroll = void 0;
			window.removeEventListener("unload", this._onUnload);
			this._onUnload = void 0;
		}
		destroy() {
			clearTimeout(this.orientationTimeout);
			clearTimeout(this.resizeTimeout);
			clearTimeout(this.afterScrolled);
			this.clear();
			this.removeEventListeners();
			this.removeVerticalRlViewportClip();
			this.stage.destroy();
			this.rendered = false;
		}
		onOrientationChange(e) {
			let { orientation } = window;
			if (this.optsSettings.resizeOnOrientationChange) this.resize();
			clearTimeout(this.orientationTimeout);
			this.orientationTimeout = setTimeout(function() {
				this.orientationTimeout = void 0;
				if (this.optsSettings.resizeOnOrientationChange) this.resize();
				this.emit(EVENTS.MANAGERS.ORIENTATION_CHANGE, orientation);
			}.bind(this), 500);
		}
		onResized(e) {
			this.resize();
		}
		resize(width, height, epubcfi) {
			let stageSize = this.stage.size(width, height);
			this.winBounds = windowBounds$1();
			if (this.orientationTimeout && this.winBounds.width === this.winBounds.height) {
				this._stageSize = void 0;
				return;
			}
			if (this._stageSize && this._stageSize.width === stageSize.width && this._stageSize.height === stageSize.height) return;
			this._stageSize = stageSize;
			this._bounds = this.bounds();
			this.clear();
			this.viewSettings.width = this._stageSize.width;
			this.viewSettings.height = this._stageSize.height;
			this.updateLayout();
			this.emit(EVENTS.MANAGERS.RESIZED, {
				width: this._stageSize.width,
				height: this._stageSize.height
			}, epubcfi || this.target);
		}
		createView(section, forceRight) {
			return new this.View(section, extend$1(this.viewSettings, { forceRight }));
		}
		handleNextPrePaginated(forceRight, section, action) {
			let next;
			if (this.layout.name === "pre-paginated" && this.layout.divisor > 1) {
				if (forceRight || section.index === 0) return;
				next = section.next();
				if (next && !next.properties.includes("page-spread-left")) return action.call(this, next);
			}
		}
		display(section, target) {
			var displaying = new Deferred();
			var displayed = displaying.promise;
			if (target === section.href || isNumber$1(target)) target = void 0;
			this.target = target;
			var visible = this.views.find(section);
			if (visible && section && this.layout.name !== "pre-paginated") {
				let offset = visible.offset();
				if (this.settings.direction === "ltr") this.scrollTo(offset.left, offset.top, true);
				else {
					let width = visible.width();
					this.scrollTo(offset.left + width, offset.top, true);
				}
				if (target) {
					let offset = visible.locationOf(target);
					let width = visible.width();
					this.moveTo(offset, width);
				}
				displaying.resolve();
				return displayed;
			}
			this.clear();
			let forceRight = false;
			if (this.layout.name === "pre-paginated" && this.layout.divisor === 2 && section.properties.includes("page-spread-right")) forceRight = true;
			this.add(section, forceRight).then(function(view) {
				if (target) {
					let offset = view.locationOf(target);
					let width = view.width();
					this.moveTo(offset, width);
				}
			}.bind(this), (err) => {
				displaying.reject(err);
			}).then(function() {
				return this.handleNextPrePaginated(forceRight, section, this.add);
			}.bind(this)).then(function() {
				this.views.show();
				if (this.isRtlVerticalPaginated() && !target) this.scrollToLogicalPage(0);
				displaying.resolve();
			}.bind(this));
			return displayed;
		}
		afterDisplayed(view) {
			if (this.isRtlVerticalPaginated()) this.queueVerticalRlBoundarySnapRetryForCurrentOffset();
			this.emit(EVENTS.MANAGERS.ADDED, view);
		}
		afterResized(view) {
			this.syncVerticalRlViewportClip();
			this.emit(EVENTS.MANAGERS.RESIZE, view.section);
		}
		getVerticalRlPageIndexForOffset(offset, width) {
			let advance = this.getPageAdvance() || 0;
			let view = this.views && (this.views.first() || this.views.last());
			let contentWidth = Math.max(width || 0, (view && view.width ? view.width() : 0) || 0, this.container.scrollWidth || 0);
			let visiblePageWidth = this.layout.pageWidth || this.layout.width || advance;
			let totalPages = this.getTotalPagesForCurrentView();
			let maxPhysicalStart = Math.max(0, contentWidth - visiblePageWidth);
			let maxLogicalScroll = this.getMaxLogicalScrollLeft();
			let targetLeft = Math.max(0, Math.min(contentWidth, Number(offset.left) || 0));
			let tolerance = this.getPageSnapTolerance();
			let toleranceMatch = null;
			let nearestIndex = 0;
			let nearestDistance = Infinity;
			for (let i = 0; i < totalPages; i++) {
				let logicalOffset = this.getLogicalOffsetForPageIndex(i, totalPages, maxLogicalScroll);
				let physicalStart = Math.max(0, Math.min(maxPhysicalStart, maxPhysicalStart - logicalOffset));
				let physicalEnd = Math.min(contentWidth, physicalStart + visiblePageWidth);
				if (targetLeft >= physicalStart && targetLeft <= physicalEnd) return i;
				if (toleranceMatch === null && targetLeft >= physicalStart - tolerance && targetLeft <= physicalEnd + tolerance) toleranceMatch = i;
				let distance = targetLeft < physicalStart ? physicalStart - targetLeft : targetLeft - physicalEnd;
				if (distance < nearestDistance) {
					nearestDistance = distance;
					nearestIndex = i;
				}
			}
			if (toleranceMatch !== null) return toleranceMatch;
			return nearestIndex;
		}
		moveTo(offset, width) {
			var distX = 0, distY = 0;
			if (!this.isPaginated) distY = offset.top;
			else {
				let pageAdvance = this.getPageAdvance() || this.layout.delta || this.layout.width || 1;
				if (this.isRtlVerticalPaginated()) {
					this.scrollToLogicalPage(this.getVerticalRlPageIndexForOffset(offset, width));
					return;
				}
				distX = Math.floor(offset.left / pageAdvance) * pageAdvance;
				if (distX + pageAdvance > this.container.scrollWidth) distX = Math.max(0, this.container.scrollWidth - pageAdvance);
				if (this.settings.axis === "vertical") {
					distY = Math.floor(offset.top / this.layout.height) * this.layout.height;
					if (distY + this.layout.height > this.container.scrollHeight) distY = Math.max(0, this.container.scrollHeight - this.layout.height);
				} else {
					distY = Math.floor(offset.top / pageAdvance) * pageAdvance;
					if (distY + pageAdvance > this.container.scrollHeight) distY = Math.max(0, this.container.scrollHeight - pageAdvance);
				}
			}
			if (this.settings.direction === "rtl") {
				/***
				the `floor` function above (L343) is on positive values, so we should add one `layout.delta`
				to distX or use `Math.ceil` function, or multiply offset.left by -1
				before `Math.floor`
				*/
				distX = distX + this.getPageAdvance();
				distX = distX - width;
			}
			this.scrollTo(distX, distY, true);
		}
		add(section, forceRight) {
			var view = this.createView(section, forceRight);
			this.views.append(view);
			view.onDisplayed = this.afterDisplayed.bind(this);
			view.onResize = this.afterResized.bind(this);
			view.on(EVENTS.VIEWS.AXIS, (axis) => {
				this.updateAxis(axis);
			});
			view.on(EVENTS.VIEWS.WRITING_MODE, (mode) => {
				this.updateWritingMode(mode);
			});
			return view.display(this.request);
		}
		append(section, forceRight) {
			var view = this.createView(section, forceRight);
			this.views.append(view);
			view.onDisplayed = this.afterDisplayed.bind(this);
			view.onResize = this.afterResized.bind(this);
			view.on(EVENTS.VIEWS.AXIS, (axis) => {
				this.updateAxis(axis);
			});
			view.on(EVENTS.VIEWS.WRITING_MODE, (mode) => {
				this.updateWritingMode(mode);
			});
			return view.display(this.request);
		}
		prepend(section, forceRight) {
			var view = this.createView(section, forceRight);
			view.on(EVENTS.VIEWS.RESIZED, (bounds) => {
				this.counter(bounds);
			});
			this.views.prepend(view);
			view.onDisplayed = this.afterDisplayed.bind(this);
			view.onResize = this.afterResized.bind(this);
			view.on(EVENTS.VIEWS.AXIS, (axis) => {
				this.updateAxis(axis);
			});
			view.on(EVENTS.VIEWS.WRITING_MODE, (mode) => {
				this.updateWritingMode(mode);
			});
			return view.display(this.request);
		}
		counter(bounds) {
			if (this.settings.axis === "vertical") this.scrollBy(0, bounds.heightDelta, true);
			else this.scrollBy(bounds.widthDelta, 0, true);
		}
		isRtlVerticalPaginated() {
			if (!(this.isPaginated && this.settings.axis === "horizontal" && this.settings.direction === "rtl")) return false;
			let view = this.views && (this.views.first() || this.views.last());
			let contentWritingMode = view && view.contents && view.contents.writingMode ? view.contents.writingMode() : "";
			return (this.settings.writingMode || contentWritingMode) === "vertical-rl";
		}
		getPageAdvance() {
			return this.layout && (this.layout.effectivePageAdvance || this.layout.delta || this.layout.pageWidth || this.layout.width);
		}
		getVerticalRlEdgeMaskColor() {
			let view = this.views && (this.views.first() || this.views.last());
			let doc = view && view.contents && view.contents.document;
			let win = view && view.contents && view.contents.window;
			let candidates = [];
			if (doc && win) candidates.push(doc.body, doc.documentElement);
			if (this.container && typeof window !== "undefined") candidates.push(this.container);
			for (const element of candidates) {
				if (!element) continue;
				let style = element.ownerDocument && element.ownerDocument.defaultView ? element.ownerDocument.defaultView.getComputedStyle(element) : window.getComputedStyle(element);
				let color = style && style.backgroundColor;
				if (color && color !== "transparent" && color !== "rgba(0, 0, 0, 0)") return color;
			}
			return "rgb(255, 255, 255)";
		}
		getVerticalRlEdgeMaskWidths() {
			let advance = this.getPageAdvance() || 0;
			let visibleWidth = this.container ? this.container.clientWidth || 0 : 0;
			let bleed = visibleWidth - advance;
			if (!this.isRtlVerticalPaginated() || !advance || !visibleWidth) return {
				left: 0,
				right: 0
			};
			if (bleed <= 1) return this.getVerticalRlCleanPageEdgeMaskWidths(advance);
			let left = Math.ceil(bleed);
			let right = 0;
			let maxMask = getVerticalRlEdgeMaskLimit(advance);
			let totalPages = this.getTotalPagesForCurrentView();
			let currentPageIndex = this.getCurrentPageIndex();
			let previousPageStep = 0;
			if (currentPageIndex > 0) {
				let maxScroll = this.getMaxLogicalScrollLeft();
				let currentOffset = this.getLogicalOffsetForPageIndex(currentPageIndex, totalPages, maxScroll);
				let previousOffset = this.getLogicalOffsetForPageIndex(currentPageIndex - 1, totalPages, maxScroll);
				previousPageStep = Math.abs(currentOffset - previousOffset);
			}
			if (hasVerticalRlEdgeMaskStructuralGutter(visibleWidth, advance, left, this.getPageBoundaryShift(), currentPageIndex, previousPageStep)) {
				let structuralMask = getVerticalRlStructuralGutterEdgeMaskSnapInput(left, right, maxMask, advance);
				if (!structuralMask) return {
					left: 0,
					right: 0
				};
				return this.snapVerticalRlEdgeMaskWidths(structuralMask.widths, structuralMask.maxMask, {
					nextPageStep: structuralMask.nextPageStep,
					rightMaxMask: structuralMask.rightMaxMask
				});
			}
			if (currentPageIndex > 0) {
				let previousPageLeftMask = this.getPreviousVerticalRlLeftMask(previousPageStep, left, maxMask);
				right = getVerticalRlPreviousPageRightMask(visibleWidth, previousPageStep, previousPageLeftMask, maxMask);
			}
			let edgeMask = getVerticalRlEdgeMaskSnapInput(left, right, maxMask, previousPageStep);
			if (!edgeMask) return {
				left: 0,
				right: 0
			};
			return this.snapVerticalRlEdgeMaskWidths(edgeMask.widths, edgeMask.maxMask, {
				previousPageStep: edgeMask.previousPageStep,
				rightMaxMask: edgeMask.rightMaxMask
			});
		}
		getVerticalRlRenderedEdgeMaskWidths() {
			let computed = this.getVerticalRlEdgeMaskWidths();
			let dataset = this.container && this.container.dataset ? this.container.dataset : {};
			return getRenderedVerticalRlEdgeMaskWidths(computed, Number(dataset.epubVrlEdgeMaskLeft), Number(dataset.epubVrlEdgeMaskRight), Number(dataset.epubVrlEdgeMask));
		}
		getVerticalRlCurrentEffectiveLeftBoundary() {
			if (!this.isRtlVerticalPaginated() || !this.container || !this.views || !this.layout) return null;
			let view = this.views.first() || this.views.last();
			let contentWidth = view ? this.getVerticalRlVisualContentWidth(view) : 0;
			let advance = this.getPageAdvance() || 0;
			let visibleWidth = this.layout.pageWidth || this.layout.width || advance || this.container.clientWidth || 0;
			let currentOffset = this.getNormalizedLogicalScrollLeft();
			let currentMaskWidths = this.getVerticalRlRenderedEdgeMaskWidths();
			return getVerticalRlCurrentEffectiveLeftBoundary(contentWidth, currentOffset, visibleWidth, Number(currentMaskWidths && currentMaskWidths.left) || 0);
		}
		getVerticalRlLogicalPageOffsetCacheKey(totalPages, maxScroll) {
			if (!this.isRtlVerticalPaginated() || !this.container || !this.views || !this.layout) return null;
			let view = this.views.first() || this.views.last();
			return getVerticalRlLogicalPageOffsetCacheKey(totalPages, maxScroll, view ? this.getVerticalRlVisualContentWidth(view) : 0, this.layout.pageWidth || this.layout.width || this.getPageAdvance() || this.container.clientWidth || 0, this.getPageAdvance() || 0, this.layout.edgeGuardPx || 0);
		}
		getCachedVerticalRlLogicalPageOffset(pageIndex, cacheKey) {
			return getCachedVerticalRlLogicalPageOffset(this._verticalRlLogicalPageOffsetCache, pageIndex, cacheKey);
		}
		cacheVerticalRlLogicalPageOffset(pageIndex, logicalOffset, cacheKey) {
			this._verticalRlLogicalPageOffsetCache = cacheVerticalRlLogicalPageOffset(this._verticalRlLogicalPageOffsetCache, pageIndex, logicalOffset, cacheKey);
		}
		getVerticalRlCleanPageEdgeMaskWidths(advance) {
			if (!this.container || !this.views || !advance) return {
				left: 0,
				right: 0
			};
			let totalPages = this.getTotalPagesForCurrentView();
			let currentPageIndex = this.getCurrentPageIndex();
			if (totalPages <= 1 || currentPageIndex <= 0) return {
				left: 0,
				right: 0
			};
			if (!getVerticalRlEdgeMaskLimit(advance)) return {
				left: 0,
				right: 0
			};
			let maxScroll = this.getMaxLogicalScrollLeft();
			let cleanPageMask = getVerticalRlCleanPageEdgeMaskInput(advance, totalPages, currentPageIndex, this.getLogicalOffsetForPageIndex(currentPageIndex, totalPages, maxScroll), this.getLogicalOffsetForPageIndex(currentPageIndex - 1, totalPages, maxScroll), this.getNormalizedLogicalScrollLeft(), this.getLogicalOffsetForPageIndex(currentPageIndex, totalPages, maxScroll), this._verticalRlSequentialBoundaryConstraint ? this._verticalRlSequentialBoundaryConstraint.pageIndex : null);
			if (!cleanPageMask) return {
				left: 0,
				right: 0
			};
			return this.snapVerticalRlEdgeMaskWidths(cleanPageMask.widths, cleanPageMask.maxMask, {
				nextPageStep: cleanPageMask.nextPageStep,
				previousPageStep: cleanPageMask.previousPageStep,
				rightMaxMask: cleanPageMask.rightMaxMask,
				allowRawRightMask: cleanPageMask.allowRawRightMask,
				allowRawLeftMask: cleanPageMask.allowRawLeftMask,
				forceRawLeftMask: cleanPageMask.forceRawLeftMask
			});
		}
		getPreviousVerticalRlLeftMask(previousPageStep, left, maxMask) {
			if (!previousPageStep || !this.container || !this.views) return Math.min(left, maxMask);
			let view = this.views.first() || this.views.last();
			let iframe = view && view.iframe;
			if (!iframe) return Math.min(left, maxMask);
			let containerRect = this.container.getBoundingClientRect();
			let iframeRect = iframe.getBoundingClientRect();
			let previousMask = getPreviousVerticalRlLeftMaskInput(previousPageStep, left, maxMask, containerRect.left, containerRect.right, iframeRect.left);
			if (!previousMask) return Math.min(left, maxMask);
			let snapped = this.snapVerticalRlEdgeMaskWidths(previousMask.widths, previousMask.maxMask, {
				rawLeft: previousMask.rawLeft,
				rawRight: previousMask.rawRight,
				nextPageStep: previousMask.nextPageStep,
				rightMaxMask: previousMask.rightMaxMask
			});
			return Math.min(Number(snapped && snapped.left) || 0, maxMask);
		}
		getVerticalRlEdgeMaskWidth() {
			return getVerticalRlEdgeMaskWidth(this.getVerticalRlEdgeMaskWidths());
		}
		expandVerticalRlLeftMaskToVisibleLine(maskWidths) {
			if (!maskWidths || !maskWidths.left || !this.container || !this.views) return maskWidths;
			let view = this.views.first() || this.views.last();
			let iframe = view && view.iframe;
			let doc = view && view.contents && view.contents.document;
			let win = view && view.contents && view.contents.window;
			let body = doc && doc.body;
			if (!iframe || !doc || !win || !body) return maskWidths;
			let maxMask = getVerticalRlEdgeMaskLimit(this.getPageAdvance() || 0);
			if (!maxMask) return maskWidths;
			let containerRect = this.container.getBoundingClientRect();
			let iframeRect = iframe.getBoundingClientRect();
			let rawLeft = containerRect.left - iframeRect.left;
			let rawRight = containerRect.right - iframeRect.left;
			let left = Math.max(0, Number(maskWidths.left) || 0);
			let textRects = collectVisibleTextClientRects(doc, win, body, {
				limit: 1e3,
				countInvalidRects: true
			});
			if (!textRects) return maskWidths;
			for (const rect of textRects) {
				let logicalRect = getVerticalRlViewportRect(rect, rawLeft, rawRight, iframeRect.left);
				let rectLeft = logicalRect.left;
				let rectRight = logicalRect.right;
				if (rectLeft < rawLeft && rectRight > rawLeft) left = Math.max(left, Math.ceil(rectRight - rawLeft + 1));
			}
			return {
				left: Math.min(left, maxMask),
				right: maskWidths.right
			};
		}
		getLogicalPageStepToNextPage() {
			let advance = this.getPageAdvance() || 0;
			if (!advance || !this.container || !this.isRtlVerticalPaginated()) return advance;
			let totalPages = this.getTotalPagesForCurrentView();
			let currentPageIndex = this.getCurrentPageIndex();
			let nextPageIndex = Math.min(totalPages - 1, currentPageIndex + 1);
			if (nextPageIndex <= currentPageIndex) return 0;
			let maxScroll = this.getMaxLogicalScrollLeft();
			return getVerticalRlLogicalPageStepToNextPage(advance, totalPages, currentPageIndex, nextPageIndex, this.getLogicalOffsetForPageIndex(currentPageIndex, totalPages, maxScroll), this.getLogicalOffsetForPageIndex(nextPageIndex, totalPages, maxScroll), this.hasVerticalRlStructuralPageGutter());
		}
		snapVerticalRlEdgeMaskWidths(widths, maxMask, limits = {}) {
			if (!this.container || !widths || maxMask <= 0) return widths;
			let view = this.views && (this.views.first() || this.views.last());
			let iframe = view && view.iframe;
			let doc = view && view.contents && view.contents.document;
			let win = view && view.contents && view.contents.window;
			let body = doc && doc.body;
			if (!iframe || !doc || !win || !body) return widths;
			let containerRect = this.container.getBoundingClientRect();
			let iframeRect = iframe.getBoundingClientRect();
			let defaultNextPageStep = limits.nextPageStep !== void 0 ? 0 : this.getLogicalPageStepToNextPage();
			let viewportInput = getVerticalRlEdgeMaskSnapViewportInput(widths, maxMask, containerRect.left, containerRect.right, iframeRect.left, limits, defaultNextPageStep, this.layout && this.layout.edgeGuardPx);
			let rawLeft = viewportInput.rawLeft;
			let rawRight = viewportInput.rawRight;
			let leftMaxMask = viewportInput.leftMaxMask;
			let rightMaxMask = viewportInput.rightMaxMask;
			let left = viewportInput.left;
			let right = viewportInput.right;
			let nextPageStep = viewportInput.nextPageStep;
			let previousPageStep = viewportInput.previousPageStep;
			let forceRawLeftMask = viewportInput.forceRawLeftMask;
			let allowRawLeftMask = viewportInput.allowRawLeftMask;
			let edgeTolerance = viewportInput.edgeTolerance;
			let hasStructuralEdgeGuard = viewportInput.hasStructuralEdgeGuard;
			let canExpandClippedRawRight = viewportInput.canExpandClippedRawRight;
			let rightPaintGuardMax = viewportInput.rightPaintGuardMax;
			let textRects = collectVisibleTextClientRects(doc, win, body, { limit: 1e3 });
			if (!textRects) return widths;
			let rects = getVerticalRlViewportRects(textRects, rawLeft, rawRight, iframeRect.left);
			const snapLeft = () => {
				let decision = getVerticalRlRawLeftSnapDecisionForRects(rects, rawLeft, rawRight, left, leftMaxMask, nextPageStep, forceRawLeftMask, allowRawLeftMask, hasStructuralEdgeGuard, edgeTolerance);
				let shift = decision.shift;
				if (shift !== 0) left = decision.left;
				return shift;
			};
			const snapRight = () => {
				let decision = getVerticalRlRawRightSnapDecisionForRects(rects, rawLeft, rawRight, right, previousPageStep, edgeTolerance, maxMask, rightMaxMask, rightPaintGuardMax, nextPageStep, canExpandClippedRawRight);
				let shift = decision.shift;
				if (shift !== 0) right = decision.right;
				return shift;
			};
			runVerticalRlEdgeMaskSnapLoop(snapLeft, snapRight, 4);
			return {
				left,
				right
			};
		}
		syncVerticalRlViewportClip() {
			if (!this.container || !this.container.style) return;
			let maskWidths = this.expandVerticalRlLeftMaskToVisibleLine(this.getVerticalRlEdgeMaskWidths());
			if (!maskWidths.left && !maskWidths.right) {
				this.removeVerticalRlViewportClip();
				if (this.container.dataset && this.container.dataset.epubVrlEdgeMask) {
					delete this.container.dataset.epubVrlEdgeMask;
					delete this.container.dataset.epubVrlEdgeMaskLeft;
					delete this.container.dataset.epubVrlEdgeMaskRight;
				}
				return;
			}
			let overlay = this.getVerticalRlViewportClipOverlay();
			if (!overlay) return;
			let parentRect = overlay.parentElement.getBoundingClientRect();
			let containerRect = this.container.getBoundingClientRect();
			let color = this.getVerticalRlEdgeMaskColor();
			let overlayWidth = Math.ceil(containerRect.width || this.container.clientWidth || 0) + 1;
			let overlayHeight = Math.ceil(containerRect.height || this.container.clientHeight || 0) + 1;
			overlay.style.left = `${containerRect.left - parentRect.left}px`;
			overlay.style.top = `${containerRect.top - parentRect.top}px`;
			overlay.style.width = `${overlayWidth}px`;
			overlay.style.height = `${overlayHeight}px`;
			overlay.style.boxShadow = `inset ${maskWidths.left}px 0 0 ${color}, inset -${maskWidths.right}px 0 0 ${color}`;
			this.container.dataset.epubVrlEdgeMask = String(getVerticalRlEdgeMaskWidth(maskWidths));
			this.container.dataset.epubVrlEdgeMaskLeft = String(maskWidths.left);
			this.container.dataset.epubVrlEdgeMaskRight = String(maskWidths.right);
		}
		getVerticalRlViewportClipOverlay() {
			let parent = this.container && this.container.parentElement;
			if (!parent || !parent.style) return null;
			if (this._verticalRlViewportClipOverlay && this._verticalRlViewportClipOverlay.parentElement === parent) return this._verticalRlViewportClipOverlay;
			if (this._verticalRlViewportClipOverlay) this._verticalRlViewportClipOverlay.remove();
			if (window.getComputedStyle(parent).position === "static") {
				this._verticalRlPreviousParentPosition = parent.style.position || "";
				parent.style.position = "relative";
			}
			let overlay = document.createElement("div");
			overlay.className = "epub-vrl-edge-mask";
			overlay.setAttribute("aria-hidden", "true");
			overlay.style.position = "absolute";
			overlay.style.pointerEvents = "none";
			overlay.style.zIndex = "2147483647";
			overlay.style.background = "transparent";
			overlay.style.contain = "strict";
			parent.appendChild(overlay);
			this._verticalRlViewportClipOverlay = overlay;
			return overlay;
		}
		removeVerticalRlViewportClip() {
			if (this._verticalRlViewportClipOverlay) {
				this._verticalRlViewportClipOverlay.remove();
				this._verticalRlViewportClipOverlay = void 0;
			}
			let parent = this.container && this.container.parentElement;
			if (parent && this._verticalRlPreviousParentPosition !== void 0) {
				parent.style.position = this._verticalRlPreviousParentPosition;
				this._verticalRlPreviousParentPosition = void 0;
			}
		}
		getPageBoundaryShift() {
			if (!this.layout) return 0;
			return getPageBoundaryShift(this.layout.pageBoundaryShift || 0, this.getPageAdvance() || 0, this.isRtlVerticalPaginated());
		}
		hasVerticalRlStructuralPageGutter() {
			if (!this.isRtlVerticalPaginated() || !this.container || !this.layout) return false;
			return hasVerticalRlStructuralPageGutter(this.getPageAdvance() || 0, this.container.clientWidth || 0, this.getPageBoundaryShift(), this.isRtlVerticalPaginated());
		}
		getVerticalRlStructuralEdgeMaskWidthsForLogicalOffset(logicalOffset, contentWidth, visibleWidth) {
			if (!this.hasVerticalRlStructuralPageGutter()) return null;
			let structuralEdgeMask = getVerticalRlStructuralEdgeMaskInput(logicalOffset, contentWidth, visibleWidth, this.getPageAdvance() || 0);
			if (!structuralEdgeMask) return null;
			return this.snapVerticalRlEdgeMaskWidths(structuralEdgeMask.widths, structuralEdgeMask.maxMask, {
				rawLeft: structuralEdgeMask.rawLeft,
				rawRight: structuralEdgeMask.rawRight,
				nextPageStep: structuralEdgeMask.nextPageStep,
				rightMaxMask: structuralEdgeMask.rightMaxMask
			});
		}
		getLogicalOffsetForPageIndex(pageIndex, totalPages, maxScroll) {
			return getLogicalOffsetForPageIndex(pageIndex, totalPages, maxScroll, this.getPageAdvance() || 0, this.getPageBoundaryShift(), this.isRtlVerticalPaginated());
		}
		snapVerticalRlLogicalOffsetToTextBoundary(logicalOffset, maxScroll, options = {}) {
			if (!this.container || !this.views || !this.layout) return logicalOffset;
			let view = this.views.first() || this.views.last();
			let iframe = view && view.iframe;
			let doc = view && view.contents && view.contents.document;
			let win = view && view.contents && view.contents.window;
			let body = doc && doc.body;
			let contentWidth = this.isRtlVerticalPaginated() ? this.getVerticalRlVisualContentWidth(view) : this.getNavigableWidthForView(view);
			let visibleWidth = this.layout.pageWidth || this.layout.width || this.getPageAdvance() || 0;
			let preflight = getVerticalRlBoundarySnapPreflight(this._verticalRlBoundarySnapCache, logicalOffset, maxScroll, contentWidth, visibleWidth, this.layout.edgeGuardPx || 0, options, {
				iframe,
				document: doc,
				window: win,
				body
			});
			logicalOffset = preflight.logicalOffset;
			if (!preflight.shouldMeasureText || !preflight.cacheLookup) return logicalOffset;
			if (preflight.cacheLookup.cachedSnap !== null) return preflight.cacheLookup.cachedSnap;
			let iframeRect = iframe.getBoundingClientRect();
			let structuralGutterMask = this.getVerticalRlStructuralEdgeMaskWidthsForLogicalOffset(logicalOffset, contentWidth, visibleWidth);
			let textRects = collectVisibleTextClientRects(doc, win, body, { limit: 1e3 });
			if (!textRects) return null;
			let measurementInputs = getVerticalRlBoundarySnapMeasurementInputs(textRects, iframeRect.left, logicalOffset, contentWidth, visibleWidth, this.layout && this.layout.edgeGuardPx, structuralGutterMask, this.getPageAdvance(), this.getPageBoundaryShift());
			let snapResult = getVerticalRlBoundarySnapPipelineResult(preflight.cacheLookup.cacheKey, measurementInputs, logicalOffset, contentWidth, visibleWidth, maxScroll, preflight.maxRightBoundaryOptions, preflight.rightBoundaryOptions);
			if (snapResult.cacheEntry) this._verticalRlBoundarySnapCache = snapResult.cacheEntry;
			return snapResult.snapped;
		}
		getVerticalRlRectDistanceToLogicalViewport(left, right, rawLeft, rawRight) {
			return getVerticalRlRectDistanceToLogicalViewport(left, right, rawLeft, rawRight);
		}
		snapVerticalRlLogicalOffsetFromEdgeMask(logicalOffset, maxScroll) {
			if (!this.isRtlVerticalPaginated() || !this.container || !this.layout) return logicalOffset;
			let maskWidths = this.getVerticalRlEdgeMaskWidths();
			let rightMask = Number(maskWidths && maskWidths.right) || 0;
			let edgeGuard = Math.max(1, Math.min(8, Math.round(this.layout && this.layout.edgeGuardPx || 2)));
			let provisionalDelta = Math.ceil(rightMask - Math.max(1, edgeGuard / 2));
			if (!Number.isFinite(provisionalDelta) || provisionalDelta <= 1) return logicalOffset;
			return Math.max(0, Math.min(maxScroll, logicalOffset + provisionalDelta));
		}
		getNormalizedLogicalScrollLeft() {
			if (!this.container) return 0;
			let scrollLeft = this.container.scrollLeft || 0;
			if (this.settings.direction === "rtl") {
				if (this.settings.rtlScrollType === "negative" || scrollLeft < 0) return Math.abs(scrollLeft);
				if (this.settings.rtlScrollType === "default") {
					let maxScroll = Math.max(0, this.container.scrollWidth - this.container.clientWidth);
					return Math.max(0, maxScroll - scrollLeft);
				}
			}
			return Math.max(0, scrollLeft);
		}
		getMaxLogicalScrollLeft() {
			if (!this.container) return 0;
			return Math.max(0, this.container.scrollWidth - this.container.clientWidth);
		}
		getVerticalRlVisualContentWidth(view) {
			let visibleWidth = this.container && this.container.clientWidth ? this.container.clientWidth : 0;
			let maxLogicalScroll = this.getMaxLogicalScrollLeft();
			let candidates = [
				this.container && this.container.scrollWidth,
				view && view.width ? view.width() : 0,
				view && view._contentWidth,
				maxLogicalScroll + visibleWidth
			];
			return Math.max(0, ...candidates.map(function(value) {
				return Number(value) || 0;
			}).filter(function(value) {
				return Number.isFinite(value) && value > 0;
			}));
		}
		getNavigableWidthForView(view) {
			let width = view && view.width ? view.width() : 0;
			if (view && this.isRtlVerticalPaginated()) return Math.max(width || 0, this.getVerticalRlVisualContentWidth(view));
			if (view && !this.isRtlVerticalPaginated() && this.isPaginated && this.settings.axis === "horizontal" && this.layout && this.layout.name === "reflowable" && Number.isFinite(view._contentWidth) && view._contentWidth > 0) return view._contentWidth;
			return width;
		}
		getPageSnapTolerance() {
			return getPageSnapTolerance(this.getPageAdvance() || 0, this.layout && this.layout.edgeGuardPx ? this.layout.edgeGuardPx : 0);
		}
		countPagesWithFractionalTolerance(totalLength, pageLength) {
			return countPagesWithFractionalTolerance(totalLength, pageLength);
		}
		getTotalPagesForCurrentView() {
			let view = this.views && (this.views.first() || this.views.last());
			if (!view) return 1;
			if (view._viewportFillingSingleMediaPage) return 1;
			let width = this.getNavigableWidthForView(view);
			let advance = this.getPageAdvance();
			let pageWidth = this.layout.pageWidth || this.layout.width || advance;
			if (this.layout.effectivePageAdvance && this.layout.effectivePageAdvance !== this.layout.pageWidth) {
				let remainingLength = Math.max(0, width - pageWidth);
				return remainingLength > 0 ? Math.max(1, this.countPagesWithFractionalTolerance(remainingLength, advance) + 1) : 1;
			}
			return this.countPagesWithFractionalTolerance(width, advance);
		}
		getCurrentPageIndex() {
			let advance = this.getPageAdvance();
			if (!advance || advance <= 0 || !this.container) return 0;
			let totalPages = this.getTotalPagesForCurrentView();
			return getCurrentPageIndexForOffset(this.getNormalizedLogicalScrollLeft(), totalPages, advance, this.getMaxLogicalScrollLeft(), this.getPageSnapTolerance(), this.getPageBoundaryShift(), this.isRtlVerticalPaginated());
		}
		scrollToLogicalPage(pageIndex, options = {}) {
			this.syncVerticalRlViewportClip();
			let advance = this.getPageAdvance();
			let totalPages = this.getTotalPagesForCurrentView();
			let targetIndex = Math.max(0, Math.min(totalPages - 1, pageIndex));
			let maxScroll = this.getMaxLogicalScrollLeft();
			let sequentialBoundaryConstraint = null;
			let logicalOffsetCacheKey = this.getVerticalRlLogicalPageOffsetCacheKey(totalPages, maxScroll);
			let cachedLogicalOffset = Boolean(options && options.ignoreCachedLogicalOffset) ? null : this.getCachedVerticalRlLogicalPageOffset(targetIndex, logicalOffsetCacheKey);
			if (this.isRtlVerticalPaginated() && targetIndex > 0) {
				let forcedRightBoundary = Number(options && options.sequentialRightBoundary);
				if (Number.isFinite(forcedRightBoundary) && forcedRightBoundary > 0) sequentialBoundaryConstraint = getVerticalRlSequentialRightBoundaryConstraint(targetIndex, forcedRightBoundary, 0, 0, 0, 0, 0, 0);
				else if (targetIndex < totalPages - 1) {
					let currentIndex = this.getCurrentPageIndex();
					if (currentIndex === targetIndex - 1) {
						let view = this.views && (this.views.first() || this.views.last());
						let contentWidth = view ? this.getVerticalRlVisualContentWidth(view) : 0;
						let visibleWidth = this.layout.pageWidth || this.layout.width || advance || 0;
						let currentOffset = this.getNormalizedLogicalScrollLeft();
						let currentGridOffset = this.getLogicalOffsetForPageIndex(currentIndex, totalPages, maxScroll);
						let currentMaskWidths = this.getVerticalRlRenderedEdgeMaskWidths();
						sequentialBoundaryConstraint = getVerticalRlSequentialRightBoundaryConstraint(targetIndex, forcedRightBoundary, contentWidth, currentOffset, currentGridOffset, visibleWidth, advance, Number(currentMaskWidths && currentMaskWidths.left) || 0);
					}
				}
			}
			let logicalOffset = cachedLogicalOffset !== null && !sequentialBoundaryConstraint ? cachedLogicalOffset : this.getLogicalOffsetForPageIndex(targetIndex, totalPages, maxScroll);
			if (cachedLogicalOffset === null || sequentialBoundaryConstraint) {
				if (this.isRtlVerticalPaginated() && targetIndex > 0 && (targetIndex < totalPages - 1 || sequentialBoundaryConstraint)) logicalOffset = this.snapVerticalRlLogicalOffsetToTextBoundary(logicalOffset, maxScroll, sequentialBoundaryConstraint || {});
			}
			this._verticalRlSequentialBoundaryConstraint = sequentialBoundaryConstraint;
			if (this.isRtlVerticalPaginated()) this.cacheVerticalRlLogicalPageOffset(targetIndex, logicalOffset, logicalOffsetCacheKey);
			let left = logicalOffset;
			if (this.settings.direction === "rtl") {
				if (this.settings.rtlScrollType === "negative" || this.container.scrollLeft < 0) left = -logicalOffset;
				else if (this.settings.rtlScrollType === "default") left = Math.max(0, maxScroll - logicalOffset);
			} else left = logicalOffset;
			this._verticalRlBoundarySnapApplying = true;
			try {
				this.scrollTo(left, 0, true);
			} finally {
				this._verticalRlBoundarySnapApplying = false;
			}
			this.syncVerticalRlViewportClip();
			this.queueVerticalRlBoundarySnapRetry(targetIndex);
		}
		waitForVerticalRlLayoutReady() {
			let view = this.views && (this.views.first() || this.views.last());
			let doc = view && view.contents && view.contents.document;
			let fontsReady = doc && doc.fonts && doc.fonts.ready ? doc.fonts.ready.catch(function() {}) : Promise.resolve();
			let fontReadyTimeout = Number(this.settings && this.settings.verticalRlFontReadyTimeout);
			let safeFontReadyTimeout = Number.isFinite(fontReadyTimeout) && fontReadyTimeout >= 0 ? fontReadyTimeout : 160;
			let fontReadyOrTimeout = Promise.race([fontsReady, new Promise(function(resolve) {
				setTimeout(resolve, safeFontReadyTimeout);
			})]);
			let nextFrame = () => new Promise((resolve) => {
				if (typeof requestAnimationFrame === "function") requestAnimationFrame(function() {
					requestAnimationFrame(resolve);
				});
				else setTimeout(resolve, 0);
			});
			return nextFrame().then(function() {
				return fontReadyOrTimeout;
			}).then(nextFrame);
		}
		queueVerticalRlBoundarySnapRetry(pageIndex, options = {}) {
			if (!this.isRtlVerticalPaginated() || !this.container) return;
			let totalPages = this.getTotalPagesForCurrentView();
			let targetIndex = Math.max(0, Math.min(totalPages - 1, pageIndex));
			let token = (this._verticalRlBoundarySnapRetryToken || 0) + 1;
			this._verticalRlBoundarySnapRetryToken = token;
			if (targetIndex <= 0 || targetIndex >= totalPages - 1) return;
			let retryDelays = Array.isArray(this.settings && this.settings.verticalRlBoundarySnapRetryDelays) ? this.settings.verticalRlBoundarySnapRetryDelays : [
				250,
				750,
				1500,
				3e3,
				6e3,
				9e3
			];
			let retryAttempt = function(attempt) {
				this.waitForVerticalRlLayoutReady().then(function() {
					if (this._verticalRlBoundarySnapRetryToken !== token || !this.container) return;
					let currentTotalPages = this.getTotalPagesForCurrentView();
					let maxScroll = this.getMaxLogicalScrollLeft();
					let currentOffset = this.getNormalizedLogicalScrollLeft();
					let logicalOffsetCacheKey = this.getVerticalRlLogicalPageOffsetCacheKey(currentTotalPages, maxScroll);
					let cachedLogicalOffset = this.getCachedVerticalRlLogicalPageOffset(targetIndex, logicalOffsetCacheKey);
					let shouldUseCachedLogicalOffset = cachedLogicalOffset !== null && (!options.useCurrentOffset || Math.abs(currentOffset - cachedLogicalOffset) <= this.getPageSnapTolerance());
					let logicalOffset = shouldUseCachedLogicalOffset ? cachedLogicalOffset : options.useCurrentOffset ? Math.max(0, Math.min(maxScroll, currentOffset)) : this.getLogicalOffsetForPageIndex(targetIndex, currentTotalPages, maxScroll);
					if (options.useCurrentOffset && this.getPageBoundaryShift() === 0 && this.container) {
						let currentIndex = this.getCurrentPageIndex();
						let pageOffset = this.getLogicalOffsetForPageIndex(currentIndex, currentTotalPages, maxScroll);
						if (Math.abs(currentOffset - pageOffset) <= this.getPageSnapTolerance()) logicalOffset = pageOffset;
					}
					let sequentialBoundaryConstraint = this._verticalRlSequentialBoundaryConstraint && this._verticalRlSequentialBoundaryConstraint.pageIndex === targetIndex ? this._verticalRlSequentialBoundaryConstraint : {};
					let snappedOffset = shouldUseCachedLogicalOffset ? logicalOffset : this.snapVerticalRlLogicalOffsetToTextBoundary(logicalOffset, maxScroll, sequentialBoundaryConstraint);
					if (!shouldUseCachedLogicalOffset && Math.abs(snappedOffset - logicalOffset) <= 1) snappedOffset = this.snapVerticalRlLogicalOffsetFromEdgeMask(logicalOffset, maxScroll);
					if (Math.abs(snappedOffset - logicalOffset) <= 1) snappedOffset = logicalOffset;
					if (Math.abs(snappedOffset - currentOffset) <= 1) {
						let delay = Number(retryDelays[attempt]);
						if (Number.isFinite(delay) && delay >= 0) setTimeout(function() {
							retryAttempt(attempt + 1);
						}, delay);
						return;
					}
					this.cacheVerticalRlLogicalPageOffset(targetIndex, snappedOffset, logicalOffsetCacheKey);
					let left = snappedOffset;
					if (this.settings.direction === "rtl") {
						if (this.settings.rtlScrollType === "negative" || this.container.scrollLeft < 0) left = -snappedOffset;
						else if (this.settings.rtlScrollType === "default") left = Math.max(0, maxScroll - snappedOffset);
					}
					this._verticalRlBoundarySnapApplying = true;
					try {
						this.scrollTo(left, 0, true);
					} finally {
						this._verticalRlBoundarySnapApplying = false;
					}
					this.syncVerticalRlViewportClip();
				}.bind(this));
			}.bind(this);
			retryAttempt(0);
		}
		queueVerticalRlBoundarySnapRetryForCurrentOffset() {
			if (!this.isRtlVerticalPaginated() || !this.container) return;
			clearTimeout(this._verticalRlBoundarySnapAfterScroll);
			this._verticalRlBoundarySnapAfterScroll = setTimeout(function() {
				if (!this.isRtlVerticalPaginated() || !this.container) return;
				this.syncVerticalRlViewportClip();
				this.queueVerticalRlBoundarySnapRetry(this.getCurrentPageIndex(), { useCurrentOffset: true });
			}.bind(this), 0);
		}
		displaySpineItemAtEnd(section, forceRight) {
			return this.prepend(section, forceRight).then(function() {
				var left;
				if (this.layout.name === "pre-paginated" && this.layout.divisor > 1) {
					left = section.prev();
					if (left) return this.prepend(left);
				}
			}.bind(this)).then(function() {
				if (this.isRtlVerticalPaginated()) return this.waitForVerticalRlLayoutReady();
			}.bind(this)).then(function() {
				if (this.isPaginated && this.settings.axis === "horizontal") {
					let pageAdvance = this.getPageAdvance();
					if (this.isRtlVerticalPaginated()) this.scrollToLogicalPage(this.getTotalPagesForCurrentView() - 1);
					else if (this.settings.direction === "rtl") if (this.settings.rtlScrollType === "default") this.scrollTo(0, 0, true);
					else this.scrollTo(this.container.scrollWidth * -1 + pageAdvance, 0, true);
					else this.scrollTo(this.container.scrollWidth - pageAdvance, 0, true);
				}
				this.views.show();
			}.bind(this));
		}
		next() {
			var next;
			var left;
			let dir = this.settings.direction;
			if (!this.views.length) return;
			if (this.isRtlVerticalPaginated()) {
				let pageIndex = this.getCurrentPageIndex();
				if (pageIndex < this.getTotalPagesForCurrentView() - 1) {
					this.scrollToLogicalPage(pageIndex + 1, { sequentialRightBoundary: this.getVerticalRlCurrentEffectiveLeftBoundary() });
					return;
				} else next = this.views.last().section.next();
			}
			if (!next && this.isPaginated && this.settings.axis === "horizontal" && (!dir || dir === "ltr")) {
				let pageIndex = this.getCurrentPageIndex();
				let totalPages = this.getTotalPagesForCurrentView();
				this.scrollLeft = this.container.scrollLeft;
				if (pageIndex < totalPages - 1) this.scrollToLogicalPage(pageIndex + 1);
				else next = this.views.last().section.next();
			} else if (!next && this.isPaginated && this.settings.axis === "horizontal" && dir === "rtl") {
				let pageAdvance = this.getPageAdvance();
				this.scrollLeft = this.container.scrollLeft;
				if (this.settings.rtlScrollType === "default") {
					left = this.container.scrollLeft;
					if (left > 0) this.scrollBy(pageAdvance, 0, true);
					else next = this.views.last().section.next();
				} else {
					left = this.container.scrollLeft + pageAdvance * -1;
					if (left > this.container.scrollWidth * -1) this.scrollBy(pageAdvance, 0, true);
					else next = this.views.last().section.next();
				}
			} else if (!next && this.isPaginated && this.settings.axis === "vertical") {
				this.scrollTop = this.container.scrollTop;
				if (!(Math.abs(this.container.scrollHeight - this.container.clientHeight - this.container.scrollTop) < 1)) this.scrollBy(0, this.layout.height, true);
				else next = this.views.last().section.next();
			} else if (!next) next = this.views.last().section.next();
			if (next) {
				this.clear();
				this.updateLayout();
				let forceRight = false;
				if (this.layout.name === "pre-paginated" && this.layout.divisor === 2 && next.properties.includes("page-spread-right")) forceRight = true;
				return this.append(next, forceRight).then(function() {
					return this.handleNextPrePaginated(forceRight, next, this.append);
				}.bind(this), (err) => {
					return err;
				}).then(function() {
					if (!this.isPaginated && this.settings.axis === "horizontal" && this.settings.direction === "rtl" && this.settings.rtlScrollType === "default") this.scrollTo(this.container.scrollWidth, 0, true);
					this.views.show();
				}.bind(this));
			}
		}
		prev() {
			var prev;
			var left;
			let dir = this.settings.direction;
			if (!this.views.length) return;
			if (this.isRtlVerticalPaginated()) {
				let pageIndex = this.getCurrentPageIndex();
				if (pageIndex > 0) {
					this.scrollToLogicalPage(pageIndex - 1, { ignoreCachedLogicalOffset: true });
					return;
				} else prev = this.views.first().section.prev();
			}
			if (!prev && this.isPaginated && this.settings.axis === "horizontal" && (!dir || dir === "ltr")) {
				let pageIndex = this.getCurrentPageIndex();
				this.scrollLeft = this.container.scrollLeft;
				if (pageIndex > 0) this.scrollToLogicalPage(pageIndex - 1, { ignoreCachedLogicalOffset: true });
				else prev = this.views.first().section.prev();
			} else if (!prev && this.isPaginated && this.settings.axis === "horizontal" && dir === "rtl") {
				let pageAdvance = this.getPageAdvance();
				this.scrollLeft = this.container.scrollLeft;
				if (this.settings.rtlScrollType === "default") {
					left = this.container.scrollLeft + this.container.offsetWidth;
					if (left < this.container.scrollWidth) this.scrollBy(-pageAdvance, 0, true);
					else prev = this.views.first().section.prev();
				} else {
					left = this.container.scrollLeft;
					if (left < 0) this.scrollBy(-pageAdvance, 0, true);
					else prev = this.views.first().section.prev();
				}
			} else if (!prev && this.isPaginated && this.settings.axis === "vertical") {
				this.scrollTop = this.container.scrollTop;
				if (this.container.scrollTop > 0) this.scrollBy(0, -this.layout.height, true);
				else prev = this.views.first().section.prev();
			} else if (!prev) prev = this.views.first().section.prev();
			if (prev) {
				this.clear();
				this.updateLayout();
				let forceRight = false;
				if (this.layout.name === "pre-paginated" && this.layout.divisor === 2 && typeof prev.prev() !== "object") forceRight = true;
				return this.displaySpineItemAtEnd(prev, forceRight).catch((err) => {
					return err;
				});
			}
		}
		current() {
			var visible = this.visible();
			if (visible.length) return visible[visible.length - 1];
			return null;
		}
		clear() {
			if (this.views) {
				this.views.hide();
				this.scrollTo(0, 0, true);
				this.views.clear();
			}
		}
		currentLocation() {
			if (this.shouldUpdateLayoutForLocation()) this.updateLayout();
			if (this.isPaginated && this.settings.axis === "horizontal") this.location = this.paginatedLocation();
			else this.location = this.scrolledLocation();
			return this.location;
		}
		scrolledLocation() {
			let visible = this.visible();
			let container = this.container.getBoundingClientRect();
			let pageHeight = container.height < window.innerHeight ? container.height : window.innerHeight;
			let pageWidth = container.width < window.innerWidth ? container.width : window.innerWidth;
			let vertical = this.settings.axis === "vertical";
			let offset = 0;
			let used = 0;
			if (this.settings.fullsize) offset = vertical ? window.scrollY : window.scrollX;
			return visible.map((view) => {
				let { index, href } = view.section;
				let position = view.position();
				let width = view.width();
				let height = view.height();
				let startPos;
				let endPos;
				let stopPos;
				let totalPages;
				if (vertical) {
					startPos = offset + container.top - position.top + used;
					endPos = startPos + pageHeight - used;
					totalPages = this.layout.count(height, pageHeight).pages;
					stopPos = pageHeight;
				} else {
					startPos = offset + container.left - position.left + used;
					endPos = startPos + pageWidth - used;
					totalPages = this.layout.count(width, pageWidth).pages;
					stopPos = pageWidth;
				}
				let currPage = Math.ceil(startPos / stopPos);
				let pages = [];
				let endPage = Math.ceil(endPos / stopPos);
				if (this.settings.direction === "rtl" && !vertical) {
					let tempStartPage = currPage;
					currPage = totalPages - endPage;
					endPage = totalPages - tempStartPage;
				}
				pages = [];
				for (var i = currPage; i <= endPage; i++) {
					let pg = i + 1;
					pages.push(pg);
				}
				let mapping = this.mapping.page(view.contents, view.section.cfiBase, startPos, endPos);
				return {
					index,
					href,
					pages,
					totalPages,
					mapping
				};
			});
		}
		paginatedLocation() {
			let visible = this.visible();
			let container = this.container.getBoundingClientRect();
			let isRtlVerticalPaginated = this.isRtlVerticalPaginated();
			let left = 0;
			let used = 0;
			if (this.settings.fullsize) left = window.scrollX;
			return visible.map((view) => {
				let { index, href } = view.section;
				let offset;
				let position = view.position();
				let width = view.width();
				let start;
				let end;
				let pageWidth;
				if (this.settings.direction === "rtl") {
					offset = container.right - left;
					pageWidth = Math.min(Math.abs(offset - position.left), this.layout.width) - used;
					end = position.width - (position.right - offset) - used;
					start = end - pageWidth;
				} else {
					offset = container.left + left;
					pageWidth = Math.min(position.right - offset, this.layout.width) - used;
					start = offset - position.left + used;
					end = start + pageWidth;
				}
				used += pageWidth;
				let mapping = this.mapping.page(view.contents, view.section.cfiBase, start, end);
				let pageAdvance = this.getPageAdvance();
				let totalPages = this.layout.count(width, pageAdvance).pages;
				let startPage = Math.floor(start / pageAdvance);
				let pages = [];
				let endPage = Math.floor(end / pageAdvance);
				if (isRtlVerticalPaginated) {
					let currentPageIndex = this.getCurrentPageIndex();
					let visiblePageWidth = this.layout.pageWidth || this.layout.width || pageAdvance;
					let contentWidth = width;
					let maxPhysicalStart = Math.max(0, contentWidth - visiblePageWidth);
					let physicalStart = Math.max(0, Math.min(maxPhysicalStart, maxPhysicalStart - currentPageIndex * pageAdvance));
					let physicalEnd = Math.min(contentWidth, physicalStart + visiblePageWidth);
					totalPages = this.getTotalPagesForCurrentView();
					pages = [currentPageIndex + 1];
					start = physicalStart;
					end = physicalEnd;
					mapping = this.mapping.page(view.contents, view.section.cfiBase, physicalStart, physicalEnd);
					return {
						index,
						href,
						pages,
						totalPages,
						mapping
					};
				}
				if (startPage < 0) {
					startPage = 0;
					endPage = endPage + 1;
				}
				if (this.settings.direction === "rtl") {
					let tempStartPage = startPage;
					startPage = totalPages - endPage;
					endPage = totalPages - tempStartPage;
				}
				for (var i = startPage + 1; i <= endPage; i++) {
					let pg = i;
					pages.push(pg);
				}
				return {
					index,
					href,
					pages,
					totalPages,
					mapping
				};
			});
		}
		isVisible(view, offsetPrev, offsetNext, _container) {
			var position = view.position();
			var container = _container || this.bounds();
			if (this.settings.axis === "horizontal" && position.right > container.left - offsetPrev && position.left < container.right + offsetNext) return true;
			else if (this.settings.axis === "vertical" && position.bottom > container.top - offsetPrev && position.top < container.bottom + offsetNext) return true;
			return false;
		}
		visible() {
			var container = this.bounds();
			var views = this.views.displayed();
			var viewsLength = views.length;
			var visible = [];
			var isVisible;
			var view;
			for (var i = 0; i < viewsLength; i++) {
				view = views[i];
				isVisible = this.isVisible(view, 0, 0, container);
				if (isVisible === true) visible.push(view);
			}
			return visible;
		}
		scrollBy(x, y, silent) {
			let dir = this.settings.direction === "rtl" ? -1 : 1;
			if (silent) this.ignore = true;
			if (!this.settings.fullsize) {
				if (x) this.container.scrollLeft += x * dir;
				if (y) this.container.scrollTop += y;
			} else window.scrollBy(x * dir, y * dir);
			this.scrolled = true;
		}
		scrollTo(x, y, silent) {
			if (silent) this.ignore = true;
			if (!this.settings.fullsize) {
				this.container.scrollLeft = x;
				this.container.scrollTop = y;
			} else window.scrollTo(x, y);
			this.scrolled = true;
			if (!this._verticalRlBoundarySnapApplying && this.isRtlVerticalPaginated()) this.queueVerticalRlBoundarySnapRetryForCurrentOffset();
		}
		onScroll() {
			let scrollTop;
			let scrollLeft;
			let ignored = this.ignore;
			if (!this.settings.fullsize) {
				scrollTop = this.container.scrollTop;
				scrollLeft = this.container.scrollLeft;
			} else {
				scrollTop = window.scrollY;
				scrollLeft = window.scrollX;
			}
			this.scrollTop = scrollTop;
			this.scrollLeft = scrollLeft;
			this.target = void 0;
			if (!this.ignore) {
				this.emit(EVENTS.MANAGERS.SCROLL, {
					top: scrollTop,
					left: scrollLeft
				});
				clearTimeout(this.afterScrolled);
				this.afterScrolled = setTimeout(function() {
					this.emit(EVENTS.MANAGERS.SCROLLED, {
						top: this.scrollTop,
						left: this.scrollLeft
					});
				}.bind(this), 20);
			} else this.ignore = false;
			if (!ignored && !this._verticalRlBoundarySnapApplying && this.isRtlVerticalPaginated()) this.queueVerticalRlBoundarySnapRetryForCurrentOffset();
		}
		bounds() {
			return this.stage.bounds();
		}
		applyLayout(layout) {
			this.layout = layout;
			this._layoutDirty = true;
			this.updateLayout();
			if (this.views && this.views.length > 0 && this.layout.name === "pre-paginated") this.display(this.views.first().section);
		}
		shouldUpdateLayoutForLocation() {
			if (!this.stage || !this.layout) return false;
			if (this._layoutDirty || !this._lastLayoutStageSize) return true;
			let stageSize = this.stage.size();
			return stageSize.width !== this._lastLayoutStageSize.width || stageSize.height !== this._lastLayoutStageSize.height;
		}
		updateLayout() {
			if (!this.stage) return;
			this._stageSize = this.stage.size();
			this._lastLayoutStageSize = {
				width: this._stageSize.width,
				height: this._stageSize.height
			};
			this._layoutDirty = false;
			if (!this.isPaginated) this.layout.calculate(this._stageSize.width, this._stageSize.height);
			else {
				this.layout.calculate(this._stageSize.width, this._stageSize.height, this.settings.gap);
				this.settings.offset = this.getPageAdvance() / this.layout.divisor;
			}
			this.viewSettings.width = this.layout.width;
			this.viewSettings.height = this.layout.height;
			this.setLayout(this.layout);
			this.syncVerticalRlViewportClip();
		}
		setLayout(layout) {
			this.viewSettings.layout = layout;
			this.mapping = new Mapping(layout.props, this.settings.direction, this.settings.axis);
			if (this.views) this.views.forEach(function(view) {
				if (view) view.setLayout(layout);
			});
		}
		updateWritingMode(mode) {
			this.writingMode = mode;
		}
		updateAxis(axis, forceUpdate) {
			if (!forceUpdate && axis === this.settings.axis) return;
			this.settings.axis = axis;
			this._layoutDirty = true;
			this.stage && this.stage.axis(axis);
			this.viewSettings.axis = axis;
			if (this.mapping) this.mapping = new Mapping(this.layout.props, this.settings.direction, this.settings.axis);
			if (this.layout) if (axis === "vertical") this.layout.spread("none");
			else this.layout.spread(this.layout.settings.spread);
		}
		updateFlow(flow, defaultScrolledOverflow = "auto") {
			let isPaginated = flow === "paginated" || flow === "auto";
			this.isPaginated = isPaginated;
			this._layoutDirty = true;
			if (flow === "scrolled-doc" || flow === "scrolled-continuous" || flow === "scrolled") this.updateAxis("vertical");
			else this.updateAxis("horizontal");
			this.viewSettings.flow = flow;
			if (!this.settings.overflow) this.overflow = isPaginated ? "hidden" : defaultScrolledOverflow;
			else this.overflow = this.settings.overflow;
			this.stage && this.stage.overflow(this.overflow);
			this.updateLayout();
		}
		getContents() {
			var contents = [];
			if (!this.views) return contents;
			this.views.forEach(function(view) {
				const viewContents = view && view.contents;
				if (viewContents) contents.push(viewContents);
			});
			return contents;
		}
		direction(dir = "ltr") {
			this.settings.direction = dir;
			this.stage && this.stage.direction(dir);
			this.viewSettings.direction = dir;
			this.updateLayout();
		}
		isRendered() {
			return this.rendered;
		}
	};
	(0, import_event_emitter.default)(DefaultViewManager.prototype);
	//#endregion
	//#region src/managers/helpers/snap.ts
	var Defer$3 = defer$1;
	var PI_D2 = Math.PI / 2;
	var EASING_EQUATIONS = {
		easeOutSine: function(pos) {
			return Math.sin(pos * PI_D2);
		},
		easeInOutSine: function(pos) {
			return -.5 * (Math.cos(Math.PI * pos) - 1);
		},
		easeInOutQuint: function(pos) {
			if ((pos /= .5) < 1) return .5 * Math.pow(pos, 5);
			return .5 * (Math.pow(pos - 2, 5) + 2);
		},
		easeInCubic: function(pos) {
			return Math.pow(pos, 3);
		}
	};
	var Snap = class {
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
		constructor(manager, options) {
			this.settings = extend$1({
				duration: 80,
				minVelocity: .2,
				minDistance: 10,
				easing: EASING_EQUATIONS["easeInCubic"]
			}, options || {});
			this.supportsTouch = this.detectSupportsTouch();
			if (this.supportsTouch) this.setup(manager);
		}
		setup(manager) {
			this.manager = manager;
			this.layout = this.manager.layout;
			this.fullsize = this.manager.settings.fullsize;
			if (this.fullsize) {
				this.element = this.manager.stage.element;
				this.scroller = window;
				this.disableScroll();
			} else {
				this.element = this.manager.stage.container;
				this.scroller = this.element;
				this.element.style["WebkitOverflowScrolling"] = "touch";
			}
			this.manager.settings.offset = this.layout.width;
			this.manager.settings.afterScrolledTimeout = this.settings.duration * 2;
			this.isVertical = this.manager.settings.axis === "vertical";
			if (!this.manager.isPaginated || this.isVertical) return;
			this.touchCanceler = false;
			this.resizeCanceler = false;
			this.snapping = false;
			this.scrollLeft;
			this.scrollTop;
			this.startTouchX = void 0;
			this.startTouchY = void 0;
			this.startTime = void 0;
			this.endTouchX = void 0;
			this.endTouchY = void 0;
			this.endTime = void 0;
			this.addListeners();
		}
		detectSupportsTouch() {
			if ("ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch) return true;
			return false;
		}
		disableScroll() {
			this.element.style.overflow = "hidden";
		}
		enableScroll() {
			this.element.style.overflow = "";
		}
		addListeners() {
			this._onResize = this.onResize.bind(this);
			window.addEventListener("resize", this._onResize);
			this._onScroll = this.onScroll.bind(this);
			this.scroller.addEventListener("scroll", this._onScroll);
			this._onTouchStart = this.onTouchStart.bind(this);
			this.scroller.addEventListener("touchstart", this._onTouchStart, { passive: true });
			this.on("touchstart", this._onTouchStart);
			this._onTouchMove = this.onTouchMove.bind(this);
			this.scroller.addEventListener("touchmove", this._onTouchMove, { passive: true });
			this.on("touchmove", this._onTouchMove);
			this._onTouchEnd = this.onTouchEnd.bind(this);
			this.scroller.addEventListener("touchend", this._onTouchEnd, { passive: true });
			this.on("touchend", this._onTouchEnd);
			this._afterDisplayed = this.afterDisplayed.bind(this);
			this.manager.on(EVENTS.MANAGERS.ADDED, this._afterDisplayed);
		}
		removeListeners() {
			window.removeEventListener("resize", this._onResize);
			this._onResize = void 0;
			this.scroller.removeEventListener("scroll", this._onScroll);
			this._onScroll = void 0;
			this.scroller.removeEventListener("touchstart", this._onTouchStart, { passive: true });
			this.off("touchstart", this._onTouchStart);
			this._onTouchStart = void 0;
			this.scroller.removeEventListener("touchmove", this._onTouchMove, { passive: true });
			this.off("touchmove", this._onTouchMove);
			this._onTouchMove = void 0;
			this.scroller.removeEventListener("touchend", this._onTouchEnd, { passive: true });
			this.off("touchend", this._onTouchEnd);
			this._onTouchEnd = void 0;
			this.manager.off(EVENTS.MANAGERS.ADDED, this._afterDisplayed);
			this._afterDisplayed = void 0;
		}
		afterDisplayed(view) {
			let contents = view.contents;
			[
				"touchstart",
				"touchmove",
				"touchend"
			].forEach((e) => {
				contents.on(e, (ev) => this.triggerViewEvent(ev, contents));
			});
		}
		triggerViewEvent(e, contents) {
			this.emit(e.type, e, contents);
		}
		onScroll(e) {
			this.scrollLeft = this.fullsize ? window.scrollX : this.scroller.scrollLeft;
			this.scrollTop = this.fullsize ? window.scrollY : this.scroller.scrollTop;
		}
		onResize(e) {
			this.resizeCanceler = true;
		}
		onTouchStart(e) {
			let { screenX, screenY } = e.touches[0];
			if (this.fullsize) this.enableScroll();
			this.touchCanceler = true;
			if (!this.startTouchX) {
				this.startTouchX = screenX;
				this.startTouchY = screenY;
				this.startTime = this.now();
			}
			this.endTouchX = screenX;
			this.endTouchY = screenY;
			this.endTime = this.now();
		}
		onTouchMove(e) {
			let { screenX, screenY } = e.touches[0];
			let deltaY = Math.abs(screenY - this.endTouchY);
			this.touchCanceler = true;
			if (!this.fullsize && deltaY < 10) this.element.scrollLeft -= screenX - this.endTouchX;
			this.endTouchX = screenX;
			this.endTouchY = screenY;
			this.endTime = this.now();
		}
		onTouchEnd(e) {
			if (this.fullsize) this.disableScroll();
			this.touchCanceler = false;
			let swipped = this.wasSwiped();
			if (swipped !== 0) this.snap(swipped);
			else this.snap();
			this.startTouchX = void 0;
			this.startTouchY = void 0;
			this.startTime = void 0;
			this.endTouchX = void 0;
			this.endTouchY = void 0;
			this.endTime = void 0;
		}
		wasSwiped() {
			let snapWidth = this.layout.pageWidth * this.layout.divisor;
			let distance = this.endTouchX - this.startTouchX;
			let absolute = Math.abs(distance);
			let velocity = distance / (this.endTime - this.startTime);
			let minVelocity = this.settings.minVelocity;
			if (absolute <= this.settings.minDistance || absolute >= snapWidth) return 0;
			if (velocity > minVelocity) return -1;
			else if (velocity < -minVelocity) return 1;
		}
		needsSnap() {
			return this.scrollLeft % (this.layout.pageWidth * this.layout.divisor) !== 0;
		}
		snap(howMany = 0) {
			let left = this.scrollLeft;
			let snapWidth = this.layout.pageWidth * this.layout.divisor;
			let snapTo = Math.round(left / snapWidth) * snapWidth;
			if (howMany) snapTo += howMany * snapWidth;
			return this.smoothScrollTo(snapTo);
		}
		smoothScrollTo(destination) {
			const deferred = new Defer$3();
			const start = this.scrollLeft;
			const startTime = this.now();
			const duration = this.settings.duration;
			this.snapping = true;
			function tick() {
				const now = this.now();
				const time = Math.min(1, (now - startTime) / duration);
				if (this.touchCanceler || this.resizeCanceler) {
					this.resizeCanceler = false;
					this.snapping = false;
					deferred.resolve();
					return;
				}
				if (time < 1) {
					window.requestAnimationFrame(tick.bind(this));
					this.scrollTo(start + (destination - start) * time, 0);
				} else {
					this.scrollTo(destination, 0);
					this.snapping = false;
					deferred.resolve();
				}
			}
			tick.call(this);
			return deferred.promise;
		}
		scrollTo(left = 0, top = 0) {
			if (this.fullsize) window.scroll(left, top);
			else {
				this.scroller.scrollLeft = left;
				this.scroller.scrollTop = top;
			}
		}
		now() {
			return "now" in window.performance ? performance.now() : (/* @__PURE__ */ new Date()).getTime();
		}
		destroy() {
			if (!this.scroller) return;
			if (this.fullsize) this.enableScroll();
			this.removeListeners();
			this.scroller = void 0;
		}
	};
	(0, import_event_emitter.default)(Snap.prototype);
	//#endregion
	//#region src/managers/continuous/index.ts
	var import_debounce = /* @__PURE__ */ __toESM(require_debounce());
	var Defer$2 = defer$1;
	var ContinuousViewManager = class extends DefaultViewManager {
		constructor(options) {
			super(options);
			this.name = "continuous";
			this.settings = extend$1(this.settings || {}, {
				infinite: true,
				overflow: void 0,
				axis: void 0,
				writingMode: void 0,
				flow: "scrolled",
				offset: 500,
				offsetDelta: 250,
				width: void 0,
				height: void 0,
				snap: false,
				afterScrolledTimeout: 10,
				allowScriptedContent: false,
				allowPopups: false
			});
			extend$1(this.settings, options.settings || {});
			if (options.settings.gap != "undefined" && options.settings.gap === 0) this.settings.gap = options.settings.gap;
			this.viewSettings = {
				ignoreClass: this.settings.ignoreClass,
				axis: this.settings.axis,
				flow: this.settings.flow,
				layout: this.layout,
				width: 0,
				height: 0,
				forceEvenPages: false,
				allowScriptedContent: this.settings.allowScriptedContent,
				allowPopups: this.settings.allowPopups
			};
			this.scrollTop = 0;
			this.scrollLeft = 0;
		}
		getScrollPosition() {
			let dir = this.settings.direction === "rtl" && this.settings.rtlScrollType === "default" ? -1 : 1;
			if (!this.settings.fullsize) return {
				top: this.container.scrollTop,
				left: this.container.scrollLeft
			};
			return {
				top: window.scrollY * dir,
				left: window.scrollX * dir
			};
		}
		syncScrollPosition() {
			let { top, left } = this.getScrollPosition();
			this.scrollTop = top;
			this.scrollLeft = left;
			return {
				top,
				left
			};
		}
		display(section, target) {
			return DefaultViewManager.prototype.display.call(this, section, target).then(function() {
				return this.fill();
			}.bind(this));
		}
		fill(_full) {
			var full = _full || new Defer$2();
			this.q.enqueue(() => {
				return this.check();
			}).then((result) => {
				if (result) this.fill(full);
				else full.resolve();
			});
			return full.promise;
		}
		moveTo(offset) {
			var distX = 0, distY = 0;
			if (!this.isPaginated) distY = offset.top;
			else distX = Math.floor(offset.left / this.layout.delta) * this.layout.delta;
			if (distX > 0 || distY > 0) this.scrollBy(distX, distY, true);
		}
		afterResized(view) {
			this.emit(EVENTS.MANAGERS.RESIZE, view.section);
		}
		removeShownListeners(view) {
			view.onDisplayed = function() {};
		}
		add(section) {
			var view = this.createView(section, void 0);
			this.views.append(view);
			view.on(EVENTS.VIEWS.RESIZED, (bounds) => {
				view.expanded = true;
			});
			view.on(EVENTS.VIEWS.AXIS, (axis) => {
				this.updateAxis(axis, void 0);
			});
			view.on(EVENTS.VIEWS.WRITING_MODE, (mode) => {
				this.updateWritingMode(mode);
			});
			view.onDisplayed = this.afterDisplayed.bind(this);
			view.onResize = this.afterResized.bind(this);
			return view.display(this.request);
		}
		append(section) {
			var view = this.createView(section, void 0);
			view.on(EVENTS.VIEWS.RESIZED, (bounds) => {
				view.expanded = true;
			});
			view.on(EVENTS.VIEWS.AXIS, (axis) => {
				this.updateAxis(axis, void 0);
			});
			view.on(EVENTS.VIEWS.WRITING_MODE, (mode) => {
				this.updateWritingMode(mode);
			});
			this.views.append(view);
			view.onDisplayed = this.afterDisplayed.bind(this);
			return view;
		}
		prepend(section) {
			var view = this.createView(section, void 0);
			view.on(EVENTS.VIEWS.RESIZED, (bounds) => {
				this.counter(bounds);
				view.expanded = true;
			});
			view.on(EVENTS.VIEWS.AXIS, (axis) => {
				this.updateAxis(axis, void 0);
			});
			view.on(EVENTS.VIEWS.WRITING_MODE, (mode) => {
				this.updateWritingMode(mode);
			});
			this.views.prepend(view);
			view.onDisplayed = this.afterDisplayed.bind(this);
			return view;
		}
		counter(bounds) {
			if (this.settings.axis === "vertical") this.scrollBy(0, bounds.heightDelta || 0, true);
			else this.scrollBy(bounds.widthDelta || 0, 0, true);
		}
		update(_offset) {
			var container = this.bounds();
			var views = this.views.all();
			var viewsLength = views.length;
			var visible = [];
			var offset = typeof _offset != "undefined" ? _offset : this.settings.offset || 0;
			var isVisible;
			var view;
			var updating = new Defer$2();
			var promises = [];
			for (var i = 0; i < viewsLength; i++) {
				view = views[i];
				isVisible = this.isVisible(view, offset, offset, container);
				if (isVisible === true) {
					if (!view.displayed) {
						let displayed = view.display(this.request).then(function(view) {
							view.show();
						}, (err) => {
							view.hide();
						});
						promises.push(displayed);
					} else if (view.element && view.element.style.visibility !== "visible" || view.iframe && view.iframe.style.visibility !== "visible") view.show();
					visible.push(view);
				} else {
					if (view.displayed && view.element && view.element.style.visibility !== "hidden") view.hide();
					this.scheduleTrim(350);
				}
			}
			if (promises.length) return Promise.all(promises).catch((err) => {
				updating.reject(err);
			});
			else {
				updating.resolve();
				return updating.promise;
			}
		}
		scheduleTrim(delay = 250) {
			clearTimeout(this.trimTimeout);
			this.trimTimeout = setTimeout(function() {
				if ((this.scrollDeltaVert || 0) > 2 || (this.scrollDeltaHorz || 0) > 2) {
					this.scheduleTrim(120);
					return;
				}
				this.q.enqueue(this.trim.bind(this));
			}.bind(this), delay);
		}
		check(_offsetLeft, _offsetTop) {
			var checking = new Defer$2();
			var newViews = [];
			var horizontal = this.settings.axis === "horizontal";
			var delta = this.settings.offset || 0;
			if (_offsetLeft && horizontal) delta = _offsetLeft;
			if (_offsetTop && !horizontal) delta = _offsetTop;
			var bounds = this._bounds;
			let { top, left } = this.syncScrollPosition();
			let offset = horizontal ? left : top;
			let visibleLength = horizontal ? Math.floor(bounds.width) : bounds.height;
			let contentLength = horizontal ? this.container.scrollWidth : this.container.scrollHeight;
			let writingMode = this.writingMode && this.writingMode.indexOf("vertical") === 0 ? "vertical" : "horizontal";
			let rtlScrollType = this.settings.rtlScrollType;
			let rtl = this.settings.direction === "rtl";
			if (!this.settings.fullsize) {
				if (rtl && rtlScrollType === "default" && writingMode === "horizontal") offset = contentLength - visibleLength - offset;
				if (rtl && rtlScrollType === "negative" && writingMode === "horizontal") offset = offset * -1;
			} else if (horizontal && rtl && rtlScrollType === "negative" || !horizontal && rtl && rtlScrollType === "default") offset = offset * -1;
			let prepend = () => {
				let first = this.views.first();
				let prev = first && first.section.prev();
				if (prev) newViews.push(this.prepend(prev));
			};
			let append = () => {
				let last = this.views.last();
				let next = last && last.section.next();
				if (next) newViews.push(this.append(next));
			};
			let end = offset + visibleLength + delta;
			let start = offset - delta;
			if (end >= contentLength) append();
			if (start < 0) prepend();
			let promises = newViews.map((view) => {
				return view.display(this.request);
			});
			if (newViews.length) return Promise.all(promises).then(() => {
				return this.check();
			}).then(() => {
				return this.update(delta);
			}, (err) => {
				return err;
			});
			else {
				this.q.enqueue(function() {
					this.update();
				}.bind(this));
				checking.resolve(false);
				return checking.promise;
			}
		}
		trim() {
			var task = new Defer$2();
			var displayed = this.views.displayed();
			var first = displayed[0];
			var last = displayed[displayed.length - 1];
			var firstIndex = this.views.indexOf(first);
			var lastIndex = this.views.indexOf(last);
			var above = this.views.slice(0, firstIndex);
			var below = this.views.slice(lastIndex + 1);
			for (var i = 0; i < above.length - 1; i++) this.erase(above[i], above);
			for (var j = 1; j < below.length; j++) this.erase(below[j]);
			task.resolve();
			return task.promise;
		}
		erase(view, above) {
			var prevTop;
			var prevLeft;
			if (!this.settings.fullsize) {
				prevTop = this.container.scrollTop;
				prevLeft = this.container.scrollLeft;
			} else {
				prevTop = window.scrollY;
				prevLeft = window.scrollX;
			}
			var bounds = view.bounds();
			this.views.remove(view);
			if (above) if (this.settings.axis === "vertical") this.scrollTo(0, prevTop - bounds.height, true);
			else if (this.settings.direction === "rtl") if (!this.settings.fullsize) this.scrollTo(prevLeft, 0, true);
			else this.scrollTo(prevLeft + Math.floor(bounds.width), 0, true);
			else this.scrollTo(prevLeft - Math.floor(bounds.width), 0, true);
		}
		addEventListeners(stage) {
			this._onUnload = function(e) {
				this.ignore = true;
				this.destroy();
			}.bind(this);
			window.addEventListener("unload", this._onUnload);
			this.addScrollListeners();
			if (this.isPaginated && this.settings.snap) this.snapper = new Snap(this, this.settings.snap && typeof this.settings.snap === "object" && this.settings.snap);
		}
		addScrollListeners() {
			var scroller;
			this.tick = requestAnimationFrame$2;
			this.scrollDeltaVert = 0;
			this.scrollDeltaHorz = 0;
			if (!this.settings.fullsize) scroller = this.container;
			else scroller = window;
			let { top, left } = this.syncScrollPosition();
			this.prevScrollTop = top;
			this.prevScrollLeft = left;
			this._onScroll = this.onScroll.bind(this);
			scroller.addEventListener("scroll", this._onScroll);
			this._scrolled = (0, import_debounce.default)(this.scrolled.bind(this), 30);
			this.didScroll = false;
		}
		removeEventListeners() {
			var scroller;
			if (!this.settings.fullsize) scroller = this.container;
			else scroller = window;
			scroller.removeEventListener("scroll", this._onScroll);
			this._onScroll = void 0;
			window.removeEventListener("unload", this._onUnload);
			this._onUnload = void 0;
		}
		onScroll() {
			let { top: scrollTop, left: scrollLeft } = this.syncScrollPosition();
			if (!this.ignore) this._scrolled();
			else this.ignore = false;
			this.scrollDeltaVert += Math.abs(scrollTop - this.prevScrollTop);
			this.scrollDeltaHorz += Math.abs(scrollLeft - this.prevScrollLeft);
			this.prevScrollTop = scrollTop;
			this.prevScrollLeft = scrollLeft;
			clearTimeout(this.scrollTimeout);
			this.scrollTimeout = setTimeout(function() {
				this.scrollDeltaVert = 0;
				this.scrollDeltaHorz = 0;
			}.bind(this), 150);
			clearTimeout(this.afterScrolled);
			this.didScroll = false;
		}
		scrolled() {
			let scrolledTask = this.q.enqueue(function() {
				return this.check();
			}.bind(this));
			this.scrolledRequestId = (this.scrolledRequestId || 0) + 1;
			let requestId = this.scrolledRequestId;
			this.emit(EVENTS.MANAGERS.SCROLL, {
				top: this.scrollTop,
				left: this.scrollLeft
			});
			clearTimeout(this.afterScrolled);
			this.afterScrolled = setTimeout(function() {
				Promise.resolve(scrolledTask).catch(function() {}).then(function() {
					if (requestId !== this.scrolledRequestId) return;
					if (this.snapper && this.snapper.supportsTouch && this.snapper.needsSnap()) return;
					this.emit(EVENTS.MANAGERS.SCROLLED, {
						top: this.scrollTop,
						left: this.scrollLeft
					});
				}.bind(this));
			}.bind(this), this.settings.afterScrolledTimeout);
		}
		next() {
			let delta = this.layout.props.name === "pre-paginated" && this.layout.props.spread ? this.layout.props.delta * 2 : this.layout.props.delta;
			if (!this.views.length) return;
			if (this.isPaginated && this.settings.axis === "horizontal") this.scrollBy(delta, 0, true);
			else this.scrollBy(0, this.layout.height, true);
			this.q.enqueue(function() {
				return this.check();
			}.bind(this));
		}
		prev() {
			let delta = this.layout.props.name === "pre-paginated" && this.layout.props.spread ? this.layout.props.delta * 2 : this.layout.props.delta;
			if (!this.views.length) return;
			if (this.isPaginated && this.settings.axis === "horizontal") this.scrollBy(-delta, 0, true);
			else this.scrollBy(0, -this.layout.height, true);
			this.q.enqueue(function() {
				return this.check();
			}.bind(this));
		}
		updateFlow(flow) {
			if (this.rendered && this.snapper) {
				this.snapper.destroy();
				this.snapper = void 0;
			}
			super.updateFlow(flow, "scroll");
			if (this.rendered && this.isPaginated && this.settings.snap) this.snapper = new Snap(this, this.settings.snap && typeof this.settings.snap === "object" && this.settings.snap);
		}
		destroy() {
			clearTimeout(this.trimTimeout);
			clearTimeout(this.scrollTimeout);
			super.destroy();
			if (this.snapper) this.snapper.destroy();
		}
	};
	//#endregion
	//#region src/rendition.ts
	var Defer$1 = defer$1;
	function isManagerLocationPromise(location) {
		return typeof location.then === "function";
	}
	/**
	* Displays an Epub as a series of Views for each Section.
	* Requires Manager and View class to handle specifics of rendering
	* the section content.
	* @class
	* @param {Book} book
	* @param {object} [options]
	* @param {number} [options.width]
	* @param {number} [options.height]
	* @param {string} [options.ignoreClass] class for the cfi parser to ignore
	* @param {string | function | object} [options.manager='default']
	* @param {string | function} [options.view='iframe']
	* @param {string} [options.layout] layout to force
	* @param {string} [options.spread] force spread value
	* @param {number} [options.minSpreadWidth] overridden by spread: none (never) / both (always)
	* @param {string} [options.stylesheet] url of stylesheet to be injected
	* @param {boolean} [options.resizeOnOrientationChange] false to disable orientation events
	* @param {string} [options.script] url of script to be injected
	* @param {boolean | object} [options.snap=false] use snap scrolling
	* @param {string} [options.defaultDirection='ltr'] default text direction
	* @param {boolean} [options.allowScriptedContent=false] enable running scripts in content
	* @param {boolean} [options.allowPopups=false] enable opening popup in content
	*/
	var Rendition = class {
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
		constructor(book, options) {
			this.settings = extend$1(this.settings || {}, {
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
				resizeOnOrientationChange: true,
				script: null,
				snap: false,
				defaultDirection: "ltr",
				allowScriptedContent: false,
				allowPopups: false
			});
			extend$1(this.settings, options);
			if (typeof this.settings.manager === "object") this.manager = this.settings.manager;
			this.book = book;
			/**
			* Adds Hook methods to the Rendition prototype
			* @member {object} hooks
			* @property {Hook} hooks.content
			* @memberof Rendition
			*/
			this.hooks = {};
			this.hooks.display = new Hook(this);
			this.hooks.serialize = new Hook(this);
			this.hooks.content = new Hook(this);
			this.hooks.unloaded = new Hook(this);
			this.hooks.layout = new Hook(this);
			this.hooks.render = new Hook(this);
			this.hooks.show = new Hook(this);
			this.hooks.content.register(this.handleLinks.bind(this));
			this.hooks.content.register(this.passEvents.bind(this));
			this.hooks.content.register(this.adjustImages.bind(this));
			this.book.spine.hooks.content.register(this.injectIdentifier.bind(this));
			if (this.settings.stylesheet) this.book.spine.hooks.content.register(this.injectStylesheet.bind(this));
			if (this.settings.script) this.book.spine.hooks.content.register(this.injectScript.bind(this));
			/**
			* @member {Themes} themes
			* @memberof Rendition
			*/
			this.themes = new Themes(this);
			/**
			* @member {Annotations} annotations
			* @memberof Rendition
			*/
			this.annotations = new Annotations(this);
			this.epubcfi = new EpubCFI();
			this.q = new Queue(this);
			/**
			* A Rendered Location Range
			* @typedef location
			* @type {Object}
			* @property {object} start
			* @property {string} start.index
			* @property {string} start.href
			* @property {object} start.displayed
			* @property {EpubCFI} start.cfi
			* @property {number} start.location
			* @property {number} start.percentage
			* @property {number} start.displayed.page
			* @property {number} start.displayed.total
			* @property {object} end
			* @property {string} end.index
			* @property {string} end.href
			* @property {object} end.displayed
			* @property {EpubCFI} end.cfi
			* @property {number} end.location
			* @property {number} end.percentage
			* @property {number} end.displayed.page
			* @property {number} end.displayed.total
			* @property {boolean} atStart
			* @property {boolean} atEnd
			* @memberof Rendition
			*/
			this.location = void 0;
			this.q.enqueue(this.book.opened);
			this.starting = new Defer$1();
			/**
			* @member {promise} started returns after the rendition has started
			* @memberof Rendition
			*/
			this.started = this.starting.promise;
			this.q.enqueue(this.start);
		}
		/**
		* Set the manager function
		* @param {function} manager
		*/
		setManager(manager) {
			this.manager = manager;
		}
		/**
		* Require the manager from passed string, or as a class function
		* @param  {string|object} manager [description]
		* @return {method}
		*/
		requireManager(manager) {
			var viewManager;
			if (typeof manager === "string" && manager === "default") viewManager = DefaultViewManager;
			else if (typeof manager === "string" && manager === "continuous") viewManager = ContinuousViewManager;
			else viewManager = manager;
			return viewManager;
		}
		/**
		* Require the view from passed string, or as a class function
		* @param  {string|object} view
		* @return {view}
		*/
		requireView(view) {
			var View;
			if (typeof view == "string" && view === "iframe") View = IframeView;
			else View = view;
			return View;
		}
		/**
		* Start the rendering
		* @return {Promise} rendering has started
		*/
		start() {
			if (!this.settings.layout && (this.book.package.metadata.layout === "pre-paginated" || this.book.displayOptions.fixedLayout === "true")) this.settings.layout = "pre-paginated";
			switch (this.book.package.metadata.spread) {
				case "none":
					this.settings.spread = "none";
					break;
				case "both":
					this.settings.spread = true;
					break;
			}
			if (!this.manager) {
				this.ViewManager = this.requireManager(this.settings.manager);
				this.View = this.requireView(this.settings.view);
				this.manager = new this.ViewManager({
					view: this.View,
					queue: this.q,
					request: this.book.load.bind(this.book),
					settings: this.settings
				});
			}
			this.direction(this.book.package.metadata.direction || this.settings.defaultDirection);
			this.settings.globalLayoutProperties = this.determineLayoutProperties(this.book.package.metadata);
			this.flow(this.settings.globalLayoutProperties.flow);
			this.layout(this.settings.globalLayoutProperties);
			this.manager.on(EVENTS.MANAGERS.ADDED, this.afterDisplayed.bind(this));
			this.manager.on(EVENTS.MANAGERS.REMOVED, this.afterRemoved.bind(this));
			this.manager.on(EVENTS.MANAGERS.RESIZED, this.onResized.bind(this));
			this.manager.on(EVENTS.MANAGERS.ORIENTATION_CHANGE, this.onOrientationChange.bind(this));
			this.manager.on(EVENTS.MANAGERS.SCROLLED, this.reportLocation.bind(this));
			/**
			* Emit that rendering has started
			* @event started
			* @memberof Rendition
			*/
			this.emit(EVENTS.RENDITION.STARTED);
			this.starting.resolve();
		}
		/**
		* Call to attach the container to an element in the dom
		* Container must be attached before rendering can begin
		* @param  {element} element to attach to
		* @return {Promise}
		*/
		attachTo(element) {
			return this.q.enqueue(function() {
				this.manager.render(element, {
					"width": this.settings.width,
					"height": this.settings.height
				});
				/**
				* Emit that rendering has attached to an element
				* @event attached
				* @memberof Rendition
				*/
				this.emit(EVENTS.RENDITION.ATTACHED);
			}.bind(this));
		}
		/**
		* Display a point in the book
		* The request will be added to the rendering Queue,
		* so it will wait until book is opened, rendering started
		* and all other rendering tasks have finished to be called.
		* @param  {string} target Url or EpubCFI
		* @return {Promise}
		*/
		display(target) {
			if (this.displaying) this.displaying.resolve(void 0);
			return this.q.enqueue(this._display, target);
		}
		/**
		* Tells the manager what to display immediately
		* @private
		* @param  {string} target Url or EpubCFI
		* @return {Promise}
		*/
		_display(target) {
			if (!this.book) return;
			var displaying = new Defer$1();
			var displayed = displaying.promise;
			var section;
			this.displaying = displaying;
			if (this.book.locations.length() && isFloat$1(target)) target = this.book.locations.cfiFromPercentage(parseFloat(String(target)));
			section = this.book.spine.get(target);
			if (!section) {
				displaying.reject(/* @__PURE__ */ new Error("No Section Found"));
				return displayed;
			}
			this.manager.display(section, target).then(() => {
				displaying.resolve(section);
				this.displaying = void 0;
				/**
				* Emit that a section has been displayed
				* @event displayed
				* @param {Section} section
				* @memberof Rendition
				*/
				this.emit(EVENTS.RENDITION.DISPLAYED, section);
				this.reportLocation();
			}, (err) => {
				/**
				* Emit that has been an error displaying
				* @event displayError
				* @param {Section} section
				* @memberof Rendition
				*/
				this.emit(EVENTS.RENDITION.DISPLAY_ERROR, err);
			});
			return displayed;
		}
		/**
		* Report what section has been displayed
		* @private
		* @param  {*} view
		*/
		afterDisplayed(view) {
			view.on(EVENTS.VIEWS.MARK_CLICKED, (cfiRange, data) => this.triggerMarkEvent(cfiRange, data, view.contents));
			this.hooks.render.trigger(view, this).then(() => {
				if (view.contents) this.hooks.content.trigger(view.contents, this).then(() => {
					/**
					* Emit that a section has been rendered
					* @event rendered
					* @param {Section} section
					* @param {View} view
					* @memberof Rendition
					*/
					this.emit(EVENTS.RENDITION.RENDERED, view.section, view);
				});
				else this.emit(EVENTS.RENDITION.RENDERED, view.section, view);
			});
		}
		/**
		* Report what has been removed
		* @private
		* @param  {*} view
		*/
		afterRemoved(view) {
			this.hooks.unloaded.trigger(view, this).then(() => {
				/**
				* Emit that a section has been removed
				* @event removed
				* @param {Section} section
				* @param {View} view
				* @memberof Rendition
				*/
				this.emit(EVENTS.RENDITION.REMOVED, view.section, view);
			});
		}
		/**
		* Report resize events and display the last seen location
		* @private
		*/
		onResized(size, epubcfi) {
			/**
			* Emit that the rendition has been resized
			* @event resized
			* @param {number} width
			* @param {height} height
			* @param {string} epubcfi (optional)
			* @memberof Rendition
			*/
			this.emit(EVENTS.RENDITION.RESIZED, {
				width: size.width,
				height: size.height
			}, epubcfi);
			if (epubcfi) this.display(epubcfi);
			else if (this.location && this.location.start) this.display(this.location.start.cfi);
		}
		/**
		* Report orientation events and display the last seen location
		* @private
		*/
		onOrientationChange(orientation) {
			/**
			* Emit that the rendition has been rotated
			* @event orientationchange
			* @param {string} orientation
			* @memberof Rendition
			*/
			this.emit(EVENTS.RENDITION.ORIENTATION_CHANGE, orientation);
		}
		/**
		* Move the Rendition to a specific offset
		* Usually you would be better off calling display()
		* @param {object} offset
		*/
		moveTo(offset) {
			this.manager.moveTo(offset);
		}
		/**
		* Trigger a resize of the views
		* @param {number} [width]
		* @param {number} [height]
		* @param {string} [epubcfi] (optional)
		*/
		resize(width, height, epubcfi) {
			if (width) this.settings.width = width;
			if (height) this.settings.height = height;
			this.manager.resize(width, height, epubcfi);
		}
		/**
		* Clear all rendered views
		*/
		clear() {
			this.manager.clear();
		}
		/**
		* Go to the next "page" in the rendition
		* @return {Promise}
		*/
		next() {
			return this.q.enqueue(this.manager.next.bind(this.manager)).then(this.reportLocation.bind(this));
		}
		/**
		* Go to the previous "page" in the rendition
		* @return {Promise}
		*/
		prev() {
			return this.q.enqueue(this.manager.prev.bind(this.manager)).then(this.reportLocation.bind(this));
		}
		debugVerticalRlPage() {
			const manager = this.manager;
			const view = manager && manager.views && (manager.views.first() || manager.views.last());
			const contents = view && view.contents;
			const container = manager && manager.container;
			const pageWidth = manager && manager.layout ? manager.layout.pageWidth : null;
			const metrics = contents && contents.debugVerticalRlMetrics ? contents.debugVerticalRlMetrics(pageWidth) : {};
			const pageAdvance = manager && manager.getPageAdvance ? manager.getPageAdvance() : pageWidth;
			const totalPages = manager && manager.getTotalPagesForCurrentView ? manager.getTotalPagesForCurrentView() : null;
			const currentPageIndex = manager && manager.getCurrentPageIndex ? manager.getCurrentPageIndex() : null;
			const normalizedLogicalScrollLeft = manager && manager.getNormalizedLogicalScrollLeft ? manager.getNormalizedLogicalScrollLeft() : null;
			const visiblePageWidth = manager && manager.layout ? manager.layout.pageWidth || manager.layout.width || pageAdvance : pageAdvance;
			const contentWidth = view && view.width ? view.width() : null;
			const maxPhysicalStart = Number.isFinite(contentWidth) && Number.isFinite(visiblePageWidth) ? Math.max(0, contentWidth - visiblePageWidth) : null;
			const physicalStart = Number.isFinite(maxPhysicalStart) && Number.isFinite(currentPageIndex) && Number.isFinite(pageAdvance) ? Math.max(0, Math.min(maxPhysicalStart, maxPhysicalStart - currentPageIndex * pageAdvance)) : null;
			const physicalEnd = Number.isFinite(contentWidth) && Number.isFinite(physicalStart) && Number.isFinite(visiblePageWidth) ? Math.min(contentWidth, physicalStart + visiblePageWidth) : null;
			const result = Object.assign({}, metrics, {
				containerClientWidth: container ? container.clientWidth : null,
				containerScrollWidth: container ? container.scrollWidth : null,
				containerScrollLeft: container ? container.scrollLeft : null,
				iframeOffsetWidth: view && view.iframe ? view.iframe.offsetWidth : null,
				iframeClientWidth: view && view.iframe ? view.iframe.clientWidth : null,
				normalizedLogicalScrollLeft,
				physicalStart,
				physicalEnd,
				pageWidth,
				effectivePageAdvance: pageAdvance,
				totalPages,
				currentPageIndex
			});
			if (typeof console !== "undefined" && console.debug) console.debug("[epubjs:vertical-rl-page]", result);
			return result;
		}
		remeasure({ preserveLocation = true, waitForFonts = true } = {}) {
			let savedCfi = preserveLocation && this.location && this.location.start ? this.location.start.cfi : null;
			const manager = this.manager;
			const view = manager && manager.views && (manager.views.first() || manager.views.last());
			const doc = view && view.contents && view.contents.document;
			return (waitForFonts && doc && doc.fonts && doc.fonts.ready ? doc.fonts.ready.catch(function() {}) : Promise.resolve()).then(function() {
				if (manager && typeof manager.updateLayout === "function") {
					manager._layoutDirty = true;
					manager.updateLayout();
				}
			}).then(function() {
				if (savedCfi) return this.display(savedCfi);
				return this.reportLocation();
			}.bind(this));
		}
		/**
		* Determine the Layout properties from metadata and settings
		* @private
		* @param  {object} metadata
		* @return {object} properties
		*/
		determineLayoutProperties(metadata) {
			var properties;
			var layout = this.settings.layout || metadata.layout || "reflowable";
			var spread = this.settings.spread || metadata.spread || "auto";
			var orientation = this.settings.orientation || metadata.orientation || "auto";
			var flow = this.settings.flow || metadata.flow || "auto";
			var viewport = metadata.viewport || "";
			var minSpreadWidth = this.settings.minSpreadWidth || (typeof metadata.minSpreadWidth === "number" ? metadata.minSpreadWidth : 800);
			var direction = this.settings.direction || metadata.direction || "ltr";
			if ((Number(this.settings.width) === 0 || Number(this.settings.width) > 0) && (Number(this.settings.height) === 0 || Number(this.settings.height) > 0)) {}
			properties = {
				layout,
				spread,
				orientation,
				flow,
				viewport,
				minSpreadWidth,
				direction
			};
			return properties;
		}
		/**
		* Adjust the flow of the rendition to paginated or scrolled
		* (scrolled-continuous vs scrolled-doc are handled by different view managers)
		* @param  {string} flow
		*/
		flow(flow) {
			var _flow = flow;
			if (flow === "scrolled" || flow === "scrolled-doc" || flow === "scrolled-continuous") _flow = "scrolled";
			if (flow === "auto" || flow === "paginated") _flow = "paginated";
			this.settings.flow = flow;
			if (this._layout) this._layout.flow(_flow);
			if (this.manager && this._layout) this.manager.applyLayout(this._layout);
			if (this.manager) this.manager.updateFlow(_flow);
			if (this.manager && this.manager.isRendered() && this.location) {
				this.manager.clear();
				this.display(this.location.start.cfi);
			}
		}
		/**
		* Adjust the layout of the rendition to reflowable or pre-paginated
		* @param  {object} settings
		*/
		layout(settings) {
			if (settings) {
				const layoutSettings = settings;
				this._layout = new Layout(layoutSettings);
				this._layout.spread(layoutSettings.spread, this.settings.minSpreadWidth);
				this._layout.on(EVENTS.LAYOUT.UPDATED, (props, changed) => {
					this.emit(EVENTS.RENDITION.LAYOUT, props, changed);
				});
			}
			if (this.manager && this._layout) this.manager.applyLayout(this._layout);
			return this._layout;
		}
		/**
		* Adjust if the rendition uses spreads
		* @param  {string} spread none | auto (TODO: implement landscape, portrait, both)
		* @param  {int} [min] min width to use spreads at
		*/
		spread(spread, min) {
			this.settings.spread = spread;
			if (min) this.settings.minSpreadWidth = min;
			if (this._layout) this._layout.spread(spread, min);
			if (this.manager && this.manager.isRendered()) this.manager.updateLayout();
		}
		/**
		* Adjust the direction of the rendition
		* @param  {string} dir
		*/
		direction(dir) {
			this.settings.direction = dir || "ltr";
			if (this.manager) this.manager.direction(this.settings.direction);
			if (this.manager && this.manager.isRendered() && this.location) {
				this.manager.clear();
				this.display(this.location.start.cfi);
			}
		}
		/**
		* Report the current location
		* @fires relocated
		* @fires locationChanged
		*/
		reportLocation() {
			return this.q.enqueue(function reportedLocation() {
				requestAnimationFrame(function reportedLocationAfterRAF() {
					if (!this.manager) return;
					var location;
					try {
						location = this.manager.currentLocation();
					} catch (err) {
						return;
					}
					if (location && isManagerLocationPromise(location)) location.then(function(result) {
						let located = this.located(result);
						if (!located || !located.start || !located.end) return;
						this.location = located;
						this.emit(EVENTS.RENDITION.LOCATION_CHANGED, {
							index: this.location.start.index,
							href: this.location.start.href,
							start: this.location.start.cfi,
							end: this.location.end.cfi,
							percentage: this.location.start.percentage
						});
						this.emit(EVENTS.RENDITION.RELOCATED, this.location);
					}.bind(this));
					else if (location && !isManagerLocationPromise(location)) {
						let located = this.located(location);
						if (!located || !located.start || !located.end) return;
						this.location = located;
						/**
						* @event locationChanged
						* @deprecated
						* @type {object}
						* @property {number} index
						* @property {string} href
						* @property {EpubCFI} start
						* @property {EpubCFI} end
						* @property {number} percentage
						* @memberof Rendition
						*/
						this.emit(EVENTS.RENDITION.LOCATION_CHANGED, {
							index: this.location.start.index,
							href: this.location.start.href,
							start: this.location.start.cfi,
							end: this.location.end.cfi,
							percentage: this.location.start.percentage
						});
						/**
						* @event relocated
						* @type {displayedLocation}
						* @memberof Rendition
						*/
						this.emit(EVENTS.RENDITION.RELOCATED, this.location);
					}
				}.bind(this));
			}.bind(this)).then(function() {});
		}
		/**
		* Get the Current Location object
		* @return {displayedLocation | promise} location (may be a promise)
		*/
		currentLocation() {
			var location = this.manager.currentLocation();
			if (location && isManagerLocationPromise(location)) return location.then(function(result) {
				return this.located(result);
			}.bind(this));
			else if (location && !isManagerLocationPromise(location)) return this.located(location);
		}
		/**
		* Creates a Rendition#locationRange from location
		* passed by the Manager
		* @returns {displayedLocation}
		* @private
		*/
		located(location) {
			if (!location || !location.length) return {};
			let validLocations = location.filter(function(item) {
				return item && item.mapping && item.mapping.start && item.mapping.end && Array.isArray(item.pages);
			});
			if (!validLocations.length) return {};
			let start = validLocations[0];
			let end = validLocations[validLocations.length - 1];
			let located = {
				start: {
					index: start.index,
					href: start.href,
					cfi: start.mapping.start,
					displayed: {
						page: start.pages[0] || 1,
						total: start.totalPages
					}
				},
				end: {
					index: end.index,
					href: end.href,
					cfi: end.mapping.end,
					displayed: {
						page: end.pages[end.pages.length - 1] || 1,
						total: end.totalPages
					}
				}
			};
			let locationStart = this.book.locations.locationFromCfi(start.mapping.start);
			let locationEnd = this.book.locations.locationFromCfi(end.mapping.end);
			if (locationStart != null) {
				located.start.location = locationStart;
				located.start.percentage = this.book.locations.percentageFromLocation(locationStart);
			}
			if (locationEnd != null) {
				located.end.location = locationEnd;
				located.end.percentage = this.book.locations.percentageFromLocation(locationEnd);
			}
			let pageStart = this.book.pageList.pageFromCfi(start.mapping.start);
			let pageEnd = this.book.pageList.pageFromCfi(end.mapping.end);
			if (pageStart != -1) located.start.page = pageStart;
			if (pageEnd != -1) located.end.page = pageEnd;
			if (end.index === this.book.spine.last().index && located.end.displayed.page >= located.end.displayed.total) located.atEnd = true;
			if (start.index === this.book.spine.first().index && located.start.displayed.page === 1) located.atStart = true;
			return located;
		}
		/**
		* Remove and Clean Up the Rendition
		*/
		destroy() {
			this.manager && this.manager.destroy();
			this.book = void 0;
		}
		/**
		* Pass the events from a view's Contents
		* @private
		* @param  {Contents} view contents
		*/
		passEvents(contents) {
			DOM_EVENTS.forEach((e) => {
				contents.on(e, (ev) => this.triggerViewEvent(ev, contents));
			});
			contents.on(EVENTS.CONTENTS.SELECTED, (e) => this.triggerSelectedEvent(e, contents));
		}
		/**
		* Emit events passed by a view
		* @private
		* @param  {event} e
		*/
		triggerViewEvent(e, contents) {
			this.emit(e.type, e, contents);
		}
		/**
		* Emit a selection event's CFI Range passed from a a view
		* @private
		* @param  {string} cfirange
		*/
		triggerSelectedEvent(cfirange, contents) {
			/**
			* Emit that a text selection has occurred
			* @event selected
			* @param {string} cfirange
			* @param {Contents} contents
			* @memberof Rendition
			*/
			this.emit(EVENTS.RENDITION.SELECTED, cfirange, contents);
		}
		/**
		* Emit a markClicked event with the cfiRange and data from a mark
		* @private
		* @param  {EpubCFI} cfirange
		*/
		triggerMarkEvent(cfiRange, data, contents) {
			/**
			* Emit that a mark was clicked
			* @event markClicked
			* @param {EpubCFI} cfirange
			* @param {object} data
			* @param {Contents} contents
			* @memberof Rendition
			*/
			this.emit(EVENTS.RENDITION.MARK_CLICKED, cfiRange, data, contents);
		}
		/**
		* Get a Range from a Visible CFI
		* @param  {string} cfi EpubCfi String
		* @param  {string} ignoreClass
		* @return {range}
		*/
		getRange(cfi, ignoreClass) {
			var _cfi = new EpubCFI(cfi);
			var found = this.manager.visible().filter(function(view) {
				if (_cfi.spinePos === view.index) return true;
			});
			if (found.length) return found[0].contents.range(_cfi, ignoreClass);
		}
		/**
		* Hook to adjust images to fit in columns
		* @param  {Contents} contents
		* @private
		*/
		adjustImages(contents) {
			if (this._layout.name === "pre-paginated") return new Promise(function(resolve) {
				resolve();
			});
			let computed = contents.window.getComputedStyle(contents.content, null);
			let height = (contents.content.offsetHeight - (parseFloat(computed.paddingTop) + parseFloat(computed.paddingBottom))) * .95;
			let horizontalPadding = parseFloat(computed.paddingLeft) + parseFloat(computed.paddingRight);
			contents.addStylesheetRules({
				"img": {
					"max-width": (this._layout.columnWidth ? this._layout.columnWidth - horizontalPadding + "px" : "100%") + "!important",
					"max-height": height + "px!important",
					"object-fit": "contain",
					"page-break-inside": "avoid",
					"break-inside": "avoid",
					"box-sizing": "border-box"
				},
				"svg": {
					"max-width": (this._layout.columnWidth ? this._layout.columnWidth - horizontalPadding + "px" : "100%") + "!important",
					"max-height": height + "px!important",
					"page-break-inside": "avoid",
					"break-inside": "avoid"
				}
			});
			return new Promise(function(resolve) {
				setTimeout(function() {
					resolve();
				}, 1);
			});
		}
		/**
		* Get the Contents object of each rendered view
		* @returns {Contents[]}
		*/
		getContents() {
			return this.manager ? this.manager.getContents() : [];
		}
		/**
		* Get the views member from the manager
		* @returns {Views}
		*/
		views() {
			return (this.manager ? this.manager.views : void 0) || [];
		}
		/**
		* Hook to handle link clicks in rendered content
		* @param  {Contents} contents
		* @private
		*/
		handleLinks(contents) {
			if (contents) contents.on(EVENTS.CONTENTS.LINK_CLICKED, (href) => {
				let relative = this.resolveLinkHref(href, contents);
				this.display(relative);
			});
		}
		resolveLinkHref(href, contents) {
			if (!href) return href;
			if (href.indexOf("#") === 0 && contents && contents.sectionHref) return contents.sectionHref + href;
			if (/^[a-z][a-z0-9+.-]*:/i.test(href) || href.indexOf("/") === 0) return this.book.path.relative(href);
			return href;
		}
		/**
		* Hook to handle injecting stylesheet before
		* a Section is serialized
		* @param  {document} doc
		* @param  {Section} section
		* @private
		*/
		injectStylesheet(doc, _section) {
			let style = doc.createElement("link");
			style.setAttribute("type", "text/css");
			style.setAttribute("rel", "stylesheet");
			style.setAttribute("href", this.settings.stylesheet);
			doc.getElementsByTagName("head")[0].appendChild(style);
		}
		/**
		* Hook to handle injecting scripts before
		* a Section is serialized
		* @param  {document} doc
		* @param  {Section} section
		* @private
		*/
		injectScript(doc, _section) {
			let script = doc.createElement("script");
			script.setAttribute("type", "text/javascript");
			script.setAttribute("src", this.settings.script);
			script.textContent = " ";
			doc.getElementsByTagName("head")[0].appendChild(script);
		}
		/**
		* Hook to handle the document identifier before
		* a Section is serialized
		* @param  {document} doc
		* @param  {Section} section
		* @private
		*/
		injectIdentifier(doc, _section) {
			let ident = this.book.packaging.metadata.identifier;
			let meta = doc.createElement("meta");
			meta.setAttribute("name", "dc.relation.ispartof");
			if (ident) meta.setAttribute("content", ident);
			doc.getElementsByTagName("head")[0].appendChild(meta);
		}
	};
	(0, import_event_emitter.default)(Rendition.prototype);
	//#endregion
	//#region src/archive.ts
	/**
	* Handles Unzipping a requesting files from an Epub Archive
	* @class
	*/
	var Archive = class {
		zip;
		urlCache;
		constructor() {
			this.zip = void 0;
			this.urlCache = {};
			this.checkRequirements();
		}
		/**
		* Checks to see if JSZip exists in global namspace,
		* Requires JSZip if it isn't there
		* @private
		*/
		checkRequirements() {
			try {
				this.zip = new jszip_dist_jszip.default();
			} catch (e) {
				throw new Error("JSZip lib not loaded");
			}
		}
		/**
		* Open an archive
		* @param  {binary} input
		* @param  {boolean} [isBase64] tells JSZip if the input data is base64 encoded
		* @return {Promise} zipfile
		*/
		open(input, isBase64) {
			return this.zip.loadAsync(input, { "base64": isBase64 });
		}
		/**
		* Load and Open an archive
		* @param  {string} zipUrl
		* @param  {boolean} [isBase64] tells JSZip if the input data is base64 encoded
		* @return {Promise} zipfile
		*/
		openUrl(zipUrl, isBase64) {
			return request(zipUrl, "binary").then((data) => {
				return this.zip.loadAsync(data, { "base64": isBase64 });
			});
		}
		request(url, type) {
			var deferred = new defer$1();
			var response;
			var path = new Path(url);
			if (!type) type = path.extension;
			if (type == "blob") response = this.getBlob(url);
			else response = this.getText(url);
			if (response) response.then((r) => {
				let result = this.handleResponse(r, type);
				deferred.resolve(result);
			});
			else deferred.reject({
				message: "File not found in the epub: " + url,
				stack: (/* @__PURE__ */ new Error()).stack
			});
			return deferred.promise;
		}
		handleResponse(response, type) {
			var r;
			if (type == "json") r = JSON.parse(response);
			else if (isXml$1(type)) r = parseMarkup(response, "text/xml");
			else if (type == "xhtml") r = parseMarkup(response, "application/xhtml+xml");
			else if (type == "html" || type == "htm") r = parseMarkup(response, "text/html");
			else r = response;
			return r;
		}
		/**
		* Get a Blob from Archive by Url
		* @param  {string} url
		* @param  {string} [mimeType]
		* @return {Blob}
		*/
		getBlob(url, mimeType) {
			var decodededUrl = window.decodeURIComponent(url.substr(1));
			var entry = this.zip.file(decodededUrl);
			if (entry) {
				mimeType = mimeType || mime_default.lookup(entry.name);
				return entry.async("uint8array").then(function(uint8array) {
					return new Blob([uint8array], { type: mimeType });
				});
			}
		}
		/**
		* Get Text from Archive by Url
		* @param  {string} url
		* @param  {string} [encoding]
		* @return {string}
		*/
		getText(url, encoding) {
			var decodededUrl = window.decodeURIComponent(url.substr(1));
			var entry = this.zip.file(decodededUrl);
			if (entry) return entry.async("string").then(function(text) {
				return text;
			});
		}
		/**
		* Get a base64 encoded result from Archive by Url
		* @param  {string} url
		* @param  {string} [mimeType]
		* @return {string} base64 encoded
		*/
		getBase64(url, mimeType) {
			var decodededUrl = window.decodeURIComponent(url.substr(1));
			var entry = this.zip.file(decodededUrl);
			if (entry) {
				mimeType = mimeType || mime_default.lookup(entry.name);
				return entry.async("base64").then(function(data) {
					return "data:" + mimeType + ";base64," + data;
				});
			}
		}
		/**
		* Create a Url from an unarchived item
		* @param  {string} url
		* @param  {object} [options.base64] use base64 encoding or blob url
		* @return {Promise} url promise with Url string
		*/
		createUrl(url, options) {
			var deferred = new defer$1();
			var _URL = window.URL || window.webkitURL || window.mozURL;
			var tempUrl;
			var response;
			var useBase64 = options && options.base64;
			if (url in this.urlCache) {
				deferred.resolve(this.urlCache[url]);
				return deferred.promise;
			}
			if (useBase64) {
				response = this.getBase64(url);
				if (response) response.then((tempUrl) => {
					this.urlCache[url] = tempUrl;
					deferred.resolve(tempUrl);
				});
			} else {
				response = this.getBlob(url);
				if (response) response.then((blob) => {
					tempUrl = _URL.createObjectURL(blob);
					this.urlCache[url] = tempUrl;
					deferred.resolve(tempUrl);
				});
			}
			if (!response) deferred.reject({
				message: "File not found in the epub: " + url,
				stack: (/* @__PURE__ */ new Error()).stack
			});
			return deferred.promise;
		}
		/**
		* Revoke Temp Url for a archive item
		* @param  {string} url url of the item in the archive
		*/
		revokeUrl(url) {
			var _URL = window.URL || window.webkitURL || window.mozURL;
			var fromCache = this.urlCache[url];
			if (fromCache) _URL.revokeObjectURL(fromCache);
		}
		destroy() {
			var _URL = window.URL || window.webkitURL || window.mozURL;
			for (let fromCache in this.urlCache) _URL.revokeObjectURL(fromCache);
			this.zip = void 0;
			this.urlCache = {};
		}
	};
	/*!
	localForage -- Offline Storage, Improved
	Version 1.10.0
	https://localforage.github.io/localForage
	(c) 2013-2017 Mozilla, Apache License 2.0
	*/
	//#endregion
	//#region src/store.ts
	var import_localforage = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports, module) => {
		(function(f) {
			if (typeof exports === "object" && typeof module !== "undefined") module.exports = f();
			else if (typeof define === "function" && define.amd) define([], f);
			else {
				var g;
				if (typeof window !== "undefined") g = window;
				else if (typeof global !== "undefined") g = global;
				else if (typeof self !== "undefined") g = self;
				else g = this;
				g.localforage = f();
			}
		})(function() {
			return (function e(t, n, r) {
				function s(o, u) {
					if (!n[o]) {
						if (!t[o]) {
							var a = typeof require == "function" && require;
							if (!u && a) return a(o, !0);
							if (i) return i(o, !0);
							var f = /* @__PURE__ */ new Error("Cannot find module '" + o + "'");
							throw f.code = "MODULE_NOT_FOUND", f;
						}
						var l = n[o] = { exports: {} };
						t[o][0].call(l.exports, function(e) {
							var n = t[o][1][e];
							return s(n ? n : e);
						}, l, l.exports, e, t, n, r);
					}
					return n[o].exports;
				}
				var i = typeof require == "function" && require;
				for (var o = 0; o < r.length; o++) s(r[o]);
				return s;
			})({
				1: [function(_dereq_, module$1, exports$1) {
					(function(global) {
						"use strict";
						var Mutation = global.MutationObserver || global.WebKitMutationObserver;
						var scheduleDrain;
						if (Mutation) {
							var called = 0;
							var observer = new Mutation(nextTick);
							var element = global.document.createTextNode("");
							observer.observe(element, { characterData: true });
							scheduleDrain = function() {
								element.data = called = ++called % 2;
							};
						} else if (!global.setImmediate && typeof global.MessageChannel !== "undefined") {
							var channel = new global.MessageChannel();
							channel.port1.onmessage = nextTick;
							scheduleDrain = function() {
								channel.port2.postMessage(0);
							};
						} else if ("document" in global && "onreadystatechange" in global.document.createElement("script")) scheduleDrain = function() {
							var scriptEl = global.document.createElement("script");
							scriptEl.onreadystatechange = function() {
								nextTick();
								scriptEl.onreadystatechange = null;
								scriptEl.parentNode.removeChild(scriptEl);
								scriptEl = null;
							};
							global.document.documentElement.appendChild(scriptEl);
						};
						else scheduleDrain = function() {
							setTimeout(nextTick, 0);
						};
						var draining;
						var queue = [];
						function nextTick() {
							draining = true;
							var i, oldQueue;
							var len = queue.length;
							while (len) {
								oldQueue = queue;
								queue = [];
								i = -1;
								while (++i < len) oldQueue[i]();
								len = queue.length;
							}
							draining = false;
						}
						module$1.exports = immediate;
						function immediate(task) {
							if (queue.push(task) === 1 && !draining) scheduleDrain();
						}
					}).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
				}, {}],
				2: [function(_dereq_, module$2, exports$2) {
					"use strict";
					var immediate = _dereq_(1);
					/* istanbul ignore next */
					function INTERNAL() {}
					var handlers = {};
					var REJECTED = ["REJECTED"];
					var FULFILLED = ["FULFILLED"];
					var PENDING = ["PENDING"];
					module$2.exports = Promise;
					function Promise(resolver) {
						if (typeof resolver !== "function") throw new TypeError("resolver must be a function");
						this.state = PENDING;
						this.queue = [];
						this.outcome = void 0;
						if (resolver !== INTERNAL) safelyResolveThenable(this, resolver);
					}
					Promise.prototype["catch"] = function(onRejected) {
						return this.then(null, onRejected);
					};
					Promise.prototype.then = function(onFulfilled, onRejected) {
						if (typeof onFulfilled !== "function" && this.state === FULFILLED || typeof onRejected !== "function" && this.state === REJECTED) return this;
						var promise = new this.constructor(INTERNAL);
						if (this.state !== PENDING) unwrap(promise, this.state === FULFILLED ? onFulfilled : onRejected, this.outcome);
						else this.queue.push(new QueueItem(promise, onFulfilled, onRejected));
						return promise;
					};
					function QueueItem(promise, onFulfilled, onRejected) {
						this.promise = promise;
						if (typeof onFulfilled === "function") {
							this.onFulfilled = onFulfilled;
							this.callFulfilled = this.otherCallFulfilled;
						}
						if (typeof onRejected === "function") {
							this.onRejected = onRejected;
							this.callRejected = this.otherCallRejected;
						}
					}
					QueueItem.prototype.callFulfilled = function(value) {
						handlers.resolve(this.promise, value);
					};
					QueueItem.prototype.otherCallFulfilled = function(value) {
						unwrap(this.promise, this.onFulfilled, value);
					};
					QueueItem.prototype.callRejected = function(value) {
						handlers.reject(this.promise, value);
					};
					QueueItem.prototype.otherCallRejected = function(value) {
						unwrap(this.promise, this.onRejected, value);
					};
					function unwrap(promise, func, value) {
						immediate(function() {
							var returnValue;
							try {
								returnValue = func(value);
							} catch (e) {
								return handlers.reject(promise, e);
							}
							if (returnValue === promise) handlers.reject(promise, /* @__PURE__ */ new TypeError("Cannot resolve promise with itself"));
							else handlers.resolve(promise, returnValue);
						});
					}
					handlers.resolve = function(self, value) {
						var result = tryCatch(getThen, value);
						if (result.status === "error") return handlers.reject(self, result.value);
						var thenable = result.value;
						if (thenable) safelyResolveThenable(self, thenable);
						else {
							self.state = FULFILLED;
							self.outcome = value;
							var i = -1;
							var len = self.queue.length;
							while (++i < len) self.queue[i].callFulfilled(value);
						}
						return self;
					};
					handlers.reject = function(self, error) {
						self.state = REJECTED;
						self.outcome = error;
						var i = -1;
						var len = self.queue.length;
						while (++i < len) self.queue[i].callRejected(error);
						return self;
					};
					function getThen(obj) {
						var then = obj && obj.then;
						if (obj && (typeof obj === "object" || typeof obj === "function") && typeof then === "function") return function appyThen() {
							then.apply(obj, arguments);
						};
					}
					function safelyResolveThenable(self, thenable) {
						var called = false;
						function onError(value) {
							if (called) return;
							called = true;
							handlers.reject(self, value);
						}
						function onSuccess(value) {
							if (called) return;
							called = true;
							handlers.resolve(self, value);
						}
						function tryToUnwrap() {
							thenable(onSuccess, onError);
						}
						var result = tryCatch(tryToUnwrap);
						if (result.status === "error") onError(result.value);
					}
					function tryCatch(func, value) {
						var out = {};
						try {
							out.value = func(value);
							out.status = "success";
						} catch (e) {
							out.status = "error";
							out.value = e;
						}
						return out;
					}
					Promise.resolve = resolve;
					function resolve(value) {
						if (value instanceof this) return value;
						return handlers.resolve(new this(INTERNAL), value);
					}
					Promise.reject = reject;
					function reject(reason) {
						var promise = new this(INTERNAL);
						return handlers.reject(promise, reason);
					}
					Promise.all = all;
					function all(iterable) {
						var self = this;
						if (Object.prototype.toString.call(iterable) !== "[object Array]") return this.reject(/* @__PURE__ */ new TypeError("must be an array"));
						var len = iterable.length;
						var called = false;
						if (!len) return this.resolve([]);
						var values = new Array(len);
						var resolved = 0;
						var i = -1;
						var promise = new this(INTERNAL);
						while (++i < len) allResolver(iterable[i], i);
						return promise;
						function allResolver(value, i) {
							self.resolve(value).then(resolveFromAll, function(error) {
								if (!called) {
									called = true;
									handlers.reject(promise, error);
								}
							});
							function resolveFromAll(outValue) {
								values[i] = outValue;
								if (++resolved === len && !called) {
									called = true;
									handlers.resolve(promise, values);
								}
							}
						}
					}
					Promise.race = race;
					function race(iterable) {
						var self = this;
						if (Object.prototype.toString.call(iterable) !== "[object Array]") return this.reject(/* @__PURE__ */ new TypeError("must be an array"));
						var len = iterable.length;
						var called = false;
						if (!len) return this.resolve([]);
						var i = -1;
						var promise = new this(INTERNAL);
						while (++i < len) resolver(iterable[i]);
						return promise;
						function resolver(value) {
							self.resolve(value).then(function(response) {
								if (!called) {
									called = true;
									handlers.resolve(promise, response);
								}
							}, function(error) {
								if (!called) {
									called = true;
									handlers.reject(promise, error);
								}
							});
						}
					}
				}, { "1": 1 }],
				3: [function(_dereq_, module$3, exports$3) {
					(function(global) {
						"use strict";
						if (typeof global.Promise !== "function") global.Promise = _dereq_(2);
					}).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
				}, { "2": 2 }],
				4: [function(_dereq_, module$4, exports$4) {
					"use strict";
					var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
						return typeof obj;
					} : function(obj) {
						return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
					};
					function _classCallCheck(instance, Constructor) {
						if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
					}
					function getIDB() {
						try {
							if (typeof indexedDB !== "undefined") return indexedDB;
							if (typeof webkitIndexedDB !== "undefined") return webkitIndexedDB;
							if (typeof mozIndexedDB !== "undefined") return mozIndexedDB;
							if (typeof OIndexedDB !== "undefined") return OIndexedDB;
							if (typeof msIndexedDB !== "undefined") return msIndexedDB;
						} catch (e) {
							return;
						}
					}
					var idb = getIDB();
					function isIndexedDBValid() {
						try {
							if (!idb || !idb.open) return false;
							var isSafari = typeof openDatabase !== "undefined" && /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !/BlackBerry/.test(navigator.platform);
							var hasFetch = typeof fetch === "function" && fetch.toString().indexOf("[native code") !== -1;
							return (!isSafari || hasFetch) && typeof indexedDB !== "undefined" && typeof IDBKeyRange !== "undefined";
						} catch (e) {
							return false;
						}
					}
					function createBlob(parts, properties) {
						parts = parts || [];
						properties = properties || {};
						try {
							return new Blob(parts, properties);
						} catch (e) {
							if (e.name !== "TypeError") throw e;
							var builder = new (typeof BlobBuilder !== "undefined" ? BlobBuilder : typeof MSBlobBuilder !== "undefined" ? MSBlobBuilder : typeof MozBlobBuilder !== "undefined" ? MozBlobBuilder : WebKitBlobBuilder)();
							for (var i = 0; i < parts.length; i += 1) builder.append(parts[i]);
							return builder.getBlob(properties.type);
						}
					}
					if (typeof Promise === "undefined") _dereq_(3);
					var Promise$1 = Promise;
					function executeCallback(promise, callback) {
						if (callback) promise.then(function(result) {
							callback(null, result);
						}, function(error) {
							callback(error);
						});
					}
					function executeTwoCallbacks(promise, callback, errorCallback) {
						if (typeof callback === "function") promise.then(callback);
						if (typeof errorCallback === "function") promise["catch"](errorCallback);
					}
					function normalizeKey(key) {
						if (typeof key !== "string") {
							console.warn(key + " used as a key, but it is not a string.");
							key = String(key);
						}
						return key;
					}
					function getCallback() {
						if (arguments.length && typeof arguments[arguments.length - 1] === "function") return arguments[arguments.length - 1];
					}
					var DETECT_BLOB_SUPPORT_STORE = "local-forage-detect-blob-support";
					var supportsBlobs = void 0;
					var dbContexts = {};
					var toString = Object.prototype.toString;
					var READ_ONLY = "readonly";
					var READ_WRITE = "readwrite";
					function _binStringToArrayBuffer(bin) {
						var length = bin.length;
						var buf = new ArrayBuffer(length);
						var arr = new Uint8Array(buf);
						for (var i = 0; i < length; i++) arr[i] = bin.charCodeAt(i);
						return buf;
					}
					function _checkBlobSupportWithoutCaching(idb) {
						return new Promise$1(function(resolve) {
							var txn = idb.transaction(DETECT_BLOB_SUPPORT_STORE, READ_WRITE);
							var blob = createBlob([""]);
							txn.objectStore(DETECT_BLOB_SUPPORT_STORE).put(blob, "key");
							txn.onabort = function(e) {
								e.preventDefault();
								e.stopPropagation();
								resolve(false);
							};
							txn.oncomplete = function() {
								var matchedChrome = navigator.userAgent.match(/Chrome\/(\d+)/);
								resolve(navigator.userAgent.match(/Edge\//) || !matchedChrome || parseInt(matchedChrome[1], 10) >= 43);
							};
						})["catch"](function() {
							return false;
						});
					}
					function _checkBlobSupport(idb) {
						if (typeof supportsBlobs === "boolean") return Promise$1.resolve(supportsBlobs);
						return _checkBlobSupportWithoutCaching(idb).then(function(value) {
							supportsBlobs = value;
							return supportsBlobs;
						});
					}
					function _deferReadiness(dbInfo) {
						var dbContext = dbContexts[dbInfo.name];
						var deferredOperation = {};
						deferredOperation.promise = new Promise$1(function(resolve, reject) {
							deferredOperation.resolve = resolve;
							deferredOperation.reject = reject;
						});
						dbContext.deferredOperations.push(deferredOperation);
						if (!dbContext.dbReady) dbContext.dbReady = deferredOperation.promise;
						else dbContext.dbReady = dbContext.dbReady.then(function() {
							return deferredOperation.promise;
						});
					}
					function _advanceReadiness(dbInfo) {
						var deferredOperation = dbContexts[dbInfo.name].deferredOperations.pop();
						if (deferredOperation) {
							deferredOperation.resolve();
							return deferredOperation.promise;
						}
					}
					function _rejectReadiness(dbInfo, err) {
						var deferredOperation = dbContexts[dbInfo.name].deferredOperations.pop();
						if (deferredOperation) {
							deferredOperation.reject(err);
							return deferredOperation.promise;
						}
					}
					function _getConnection(dbInfo, upgradeNeeded) {
						return new Promise$1(function(resolve, reject) {
							dbContexts[dbInfo.name] = dbContexts[dbInfo.name] || createDbContext();
							if (dbInfo.db) if (upgradeNeeded) {
								_deferReadiness(dbInfo);
								dbInfo.db.close();
							} else return resolve(dbInfo.db);
							var dbArgs = [dbInfo.name];
							if (upgradeNeeded) dbArgs.push(dbInfo.version);
							var openreq = idb.open.apply(idb, dbArgs);
							if (upgradeNeeded) openreq.onupgradeneeded = function(e) {
								var db = openreq.result;
								try {
									db.createObjectStore(dbInfo.storeName);
									if (e.oldVersion <= 1) db.createObjectStore(DETECT_BLOB_SUPPORT_STORE);
								} catch (ex) {
									if (ex.name === "ConstraintError") console.warn("The database \"" + dbInfo.name + "\" has been upgraded from version " + e.oldVersion + " to version " + e.newVersion + ", but the storage \"" + dbInfo.storeName + "\" already exists.");
									else throw ex;
								}
							};
							openreq.onerror = function(e) {
								e.preventDefault();
								reject(openreq.error);
							};
							openreq.onsuccess = function() {
								var db = openreq.result;
								db.onversionchange = function(e) {
									e.target.close();
								};
								resolve(db);
								_advanceReadiness(dbInfo);
							};
						});
					}
					function _getOriginalConnection(dbInfo) {
						return _getConnection(dbInfo, false);
					}
					function _getUpgradedConnection(dbInfo) {
						return _getConnection(dbInfo, true);
					}
					function _isUpgradeNeeded(dbInfo, defaultVersion) {
						if (!dbInfo.db) return true;
						var isNewStore = !dbInfo.db.objectStoreNames.contains(dbInfo.storeName);
						var isDowngrade = dbInfo.version < dbInfo.db.version;
						var isUpgrade = dbInfo.version > dbInfo.db.version;
						if (isDowngrade) {
							if (dbInfo.version !== defaultVersion) console.warn("The database \"" + dbInfo.name + "\" can't be downgraded from version " + dbInfo.db.version + " to version " + dbInfo.version + ".");
							dbInfo.version = dbInfo.db.version;
						}
						if (isUpgrade || isNewStore) {
							if (isNewStore) {
								var incVersion = dbInfo.db.version + 1;
								if (incVersion > dbInfo.version) dbInfo.version = incVersion;
							}
							return true;
						}
						return false;
					}
					function _encodeBlob(blob) {
						return new Promise$1(function(resolve, reject) {
							var reader = new FileReader();
							reader.onerror = reject;
							reader.onloadend = function(e) {
								resolve({
									__local_forage_encoded_blob: true,
									data: btoa(e.target.result || ""),
									type: blob.type
								});
							};
							reader.readAsBinaryString(blob);
						});
					}
					function _decodeBlob(encodedBlob) {
						return createBlob([_binStringToArrayBuffer(atob(encodedBlob.data))], { type: encodedBlob.type });
					}
					function _isEncodedBlob(value) {
						return value && value.__local_forage_encoded_blob;
					}
					function _fullyReady(callback) {
						var self = this;
						var promise = self._initReady().then(function() {
							var dbContext = dbContexts[self._dbInfo.name];
							if (dbContext && dbContext.dbReady) return dbContext.dbReady;
						});
						executeTwoCallbacks(promise, callback, callback);
						return promise;
					}
					function _tryReconnect(dbInfo) {
						_deferReadiness(dbInfo);
						var dbContext = dbContexts[dbInfo.name];
						var forages = dbContext.forages;
						for (var i = 0; i < forages.length; i++) {
							var forage = forages[i];
							if (forage._dbInfo.db) {
								forage._dbInfo.db.close();
								forage._dbInfo.db = null;
							}
						}
						dbInfo.db = null;
						return _getOriginalConnection(dbInfo).then(function(db) {
							dbInfo.db = db;
							if (_isUpgradeNeeded(dbInfo)) return _getUpgradedConnection(dbInfo);
							return db;
						}).then(function(db) {
							dbInfo.db = dbContext.db = db;
							for (var i = 0; i < forages.length; i++) forages[i]._dbInfo.db = db;
						})["catch"](function(err) {
							_rejectReadiness(dbInfo, err);
							throw err;
						});
					}
					function createTransaction(dbInfo, mode, callback, retries) {
						if (retries === void 0) retries = 1;
						try {
							callback(null, dbInfo.db.transaction(dbInfo.storeName, mode));
						} catch (err) {
							if (retries > 0 && (!dbInfo.db || err.name === "InvalidStateError" || err.name === "NotFoundError")) return Promise$1.resolve().then(function() {
								if (!dbInfo.db || err.name === "NotFoundError" && !dbInfo.db.objectStoreNames.contains(dbInfo.storeName) && dbInfo.version <= dbInfo.db.version) {
									if (dbInfo.db) dbInfo.version = dbInfo.db.version + 1;
									return _getUpgradedConnection(dbInfo);
								}
							}).then(function() {
								return _tryReconnect(dbInfo).then(function() {
									createTransaction(dbInfo, mode, callback, retries - 1);
								});
							})["catch"](callback);
							callback(err);
						}
					}
					function createDbContext() {
						return {
							forages: [],
							db: null,
							dbReady: null,
							deferredOperations: []
						};
					}
					function _initStorage(options) {
						var self = this;
						var dbInfo = { db: null };
						if (options) for (var i in options) dbInfo[i] = options[i];
						var dbContext = dbContexts[dbInfo.name];
						if (!dbContext) {
							dbContext = createDbContext();
							dbContexts[dbInfo.name] = dbContext;
						}
						dbContext.forages.push(self);
						if (!self._initReady) {
							self._initReady = self.ready;
							self.ready = _fullyReady;
						}
						var initPromises = [];
						function ignoreErrors() {
							return Promise$1.resolve();
						}
						for (var j = 0; j < dbContext.forages.length; j++) {
							var forage = dbContext.forages[j];
							if (forage !== self) initPromises.push(forage._initReady()["catch"](ignoreErrors));
						}
						var forages = dbContext.forages.slice(0);
						return Promise$1.all(initPromises).then(function() {
							dbInfo.db = dbContext.db;
							return _getOriginalConnection(dbInfo);
						}).then(function(db) {
							dbInfo.db = db;
							if (_isUpgradeNeeded(dbInfo, self._defaultConfig.version)) return _getUpgradedConnection(dbInfo);
							return db;
						}).then(function(db) {
							dbInfo.db = dbContext.db = db;
							self._dbInfo = dbInfo;
							for (var k = 0; k < forages.length; k++) {
								var forage = forages[k];
								if (forage !== self) {
									forage._dbInfo.db = dbInfo.db;
									forage._dbInfo.version = dbInfo.version;
								}
							}
						});
					}
					function getItem(key, callback) {
						var self = this;
						key = normalizeKey(key);
						var promise = new Promise$1(function(resolve, reject) {
							self.ready().then(function() {
								createTransaction(self._dbInfo, READ_ONLY, function(err, transaction) {
									if (err) return reject(err);
									try {
										var req = transaction.objectStore(self._dbInfo.storeName).get(key);
										req.onsuccess = function() {
											var value = req.result;
											if (value === void 0) value = null;
											if (_isEncodedBlob(value)) value = _decodeBlob(value);
											resolve(value);
										};
										req.onerror = function() {
											reject(req.error);
										};
									} catch (e) {
										reject(e);
									}
								});
							})["catch"](reject);
						});
						executeCallback(promise, callback);
						return promise;
					}
					function iterate(iterator, callback) {
						var self = this;
						var promise = new Promise$1(function(resolve, reject) {
							self.ready().then(function() {
								createTransaction(self._dbInfo, READ_ONLY, function(err, transaction) {
									if (err) return reject(err);
									try {
										var req = transaction.objectStore(self._dbInfo.storeName).openCursor();
										var iterationNumber = 1;
										req.onsuccess = function() {
											var cursor = req.result;
											if (cursor) {
												var value = cursor.value;
												if (_isEncodedBlob(value)) value = _decodeBlob(value);
												var result = iterator(value, cursor.key, iterationNumber++);
												if (result !== void 0) resolve(result);
												else cursor["continue"]();
											} else resolve();
										};
										req.onerror = function() {
											reject(req.error);
										};
									} catch (e) {
										reject(e);
									}
								});
							})["catch"](reject);
						});
						executeCallback(promise, callback);
						return promise;
					}
					function setItem(key, value, callback) {
						var self = this;
						key = normalizeKey(key);
						var promise = new Promise$1(function(resolve, reject) {
							var dbInfo;
							self.ready().then(function() {
								dbInfo = self._dbInfo;
								if (toString.call(value) === "[object Blob]") return _checkBlobSupport(dbInfo.db).then(function(blobSupport) {
									if (blobSupport) return value;
									return _encodeBlob(value);
								});
								return value;
							}).then(function(value) {
								createTransaction(self._dbInfo, READ_WRITE, function(err, transaction) {
									if (err) return reject(err);
									try {
										var store = transaction.objectStore(self._dbInfo.storeName);
										if (value === null) value = void 0;
										var req = store.put(value, key);
										transaction.oncomplete = function() {
											if (value === void 0) value = null;
											resolve(value);
										};
										transaction.onabort = transaction.onerror = function() {
											reject(req.error ? req.error : req.transaction.error);
										};
									} catch (e) {
										reject(e);
									}
								});
							})["catch"](reject);
						});
						executeCallback(promise, callback);
						return promise;
					}
					function removeItem(key, callback) {
						var self = this;
						key = normalizeKey(key);
						var promise = new Promise$1(function(resolve, reject) {
							self.ready().then(function() {
								createTransaction(self._dbInfo, READ_WRITE, function(err, transaction) {
									if (err) return reject(err);
									try {
										var req = transaction.objectStore(self._dbInfo.storeName)["delete"](key);
										transaction.oncomplete = function() {
											resolve();
										};
										transaction.onerror = function() {
											reject(req.error);
										};
										transaction.onabort = function() {
											reject(req.error ? req.error : req.transaction.error);
										};
									} catch (e) {
										reject(e);
									}
								});
							})["catch"](reject);
						});
						executeCallback(promise, callback);
						return promise;
					}
					function clear(callback) {
						var self = this;
						var promise = new Promise$1(function(resolve, reject) {
							self.ready().then(function() {
								createTransaction(self._dbInfo, READ_WRITE, function(err, transaction) {
									if (err) return reject(err);
									try {
										var req = transaction.objectStore(self._dbInfo.storeName).clear();
										transaction.oncomplete = function() {
											resolve();
										};
										transaction.onabort = transaction.onerror = function() {
											reject(req.error ? req.error : req.transaction.error);
										};
									} catch (e) {
										reject(e);
									}
								});
							})["catch"](reject);
						});
						executeCallback(promise, callback);
						return promise;
					}
					function length(callback) {
						var self = this;
						var promise = new Promise$1(function(resolve, reject) {
							self.ready().then(function() {
								createTransaction(self._dbInfo, READ_ONLY, function(err, transaction) {
									if (err) return reject(err);
									try {
										var req = transaction.objectStore(self._dbInfo.storeName).count();
										req.onsuccess = function() {
											resolve(req.result);
										};
										req.onerror = function() {
											reject(req.error);
										};
									} catch (e) {
										reject(e);
									}
								});
							})["catch"](reject);
						});
						executeCallback(promise, callback);
						return promise;
					}
					function key(n, callback) {
						var self = this;
						var promise = new Promise$1(function(resolve, reject) {
							if (n < 0) {
								resolve(null);
								return;
							}
							self.ready().then(function() {
								createTransaction(self._dbInfo, READ_ONLY, function(err, transaction) {
									if (err) return reject(err);
									try {
										var store = transaction.objectStore(self._dbInfo.storeName);
										var advanced = false;
										var req = store.openKeyCursor();
										req.onsuccess = function() {
											var cursor = req.result;
											if (!cursor) {
												resolve(null);
												return;
											}
											if (n === 0) resolve(cursor.key);
											else if (!advanced) {
												advanced = true;
												cursor.advance(n);
											} else resolve(cursor.key);
										};
										req.onerror = function() {
											reject(req.error);
										};
									} catch (e) {
										reject(e);
									}
								});
							})["catch"](reject);
						});
						executeCallback(promise, callback);
						return promise;
					}
					function keys(callback) {
						var self = this;
						var promise = new Promise$1(function(resolve, reject) {
							self.ready().then(function() {
								createTransaction(self._dbInfo, READ_ONLY, function(err, transaction) {
									if (err) return reject(err);
									try {
										var req = transaction.objectStore(self._dbInfo.storeName).openKeyCursor();
										var keys = [];
										req.onsuccess = function() {
											var cursor = req.result;
											if (!cursor) {
												resolve(keys);
												return;
											}
											keys.push(cursor.key);
											cursor["continue"]();
										};
										req.onerror = function() {
											reject(req.error);
										};
									} catch (e) {
										reject(e);
									}
								});
							})["catch"](reject);
						});
						executeCallback(promise, callback);
						return promise;
					}
					function dropInstance(options, callback) {
						callback = getCallback.apply(this, arguments);
						var currentConfig = this.config();
						options = typeof options !== "function" && options || {};
						if (!options.name) {
							options.name = options.name || currentConfig.name;
							options.storeName = options.storeName || currentConfig.storeName;
						}
						var self = this;
						var promise;
						if (!options.name) promise = Promise$1.reject("Invalid arguments");
						else {
							var dbPromise = options.name === currentConfig.name && self._dbInfo.db ? Promise$1.resolve(self._dbInfo.db) : _getOriginalConnection(options).then(function(db) {
								var dbContext = dbContexts[options.name];
								var forages = dbContext.forages;
								dbContext.db = db;
								for (var i = 0; i < forages.length; i++) forages[i]._dbInfo.db = db;
								return db;
							});
							if (!options.storeName) promise = dbPromise.then(function(db) {
								_deferReadiness(options);
								var dbContext = dbContexts[options.name];
								var forages = dbContext.forages;
								db.close();
								for (var i = 0; i < forages.length; i++) {
									var forage = forages[i];
									forage._dbInfo.db = null;
								}
								return new Promise$1(function(resolve, reject) {
									var req = idb.deleteDatabase(options.name);
									req.onerror = function() {
										var db = req.result;
										if (db) db.close();
										reject(req.error);
									};
									req.onblocked = function() {
										console.warn("dropInstance blocked for database \"" + options.name + "\" until all open connections are closed");
									};
									req.onsuccess = function() {
										var db = req.result;
										if (db) db.close();
										resolve(db);
									};
								}).then(function(db) {
									dbContext.db = db;
									for (var i = 0; i < forages.length; i++) {
										var _forage = forages[i];
										_advanceReadiness(_forage._dbInfo);
									}
								})["catch"](function(err) {
									(_rejectReadiness(options, err) || Promise$1.resolve())["catch"](function() {});
									throw err;
								});
							});
							else promise = dbPromise.then(function(db) {
								if (!db.objectStoreNames.contains(options.storeName)) return;
								var newVersion = db.version + 1;
								_deferReadiness(options);
								var dbContext = dbContexts[options.name];
								var forages = dbContext.forages;
								db.close();
								for (var i = 0; i < forages.length; i++) {
									var forage = forages[i];
									forage._dbInfo.db = null;
									forage._dbInfo.version = newVersion;
								}
								return new Promise$1(function(resolve, reject) {
									var req = idb.open(options.name, newVersion);
									req.onerror = function(err) {
										req.result.close();
										reject(err);
									};
									req.onupgradeneeded = function() {
										req.result.deleteObjectStore(options.storeName);
									};
									req.onsuccess = function() {
										var db = req.result;
										db.close();
										resolve(db);
									};
								}).then(function(db) {
									dbContext.db = db;
									for (var j = 0; j < forages.length; j++) {
										var _forage2 = forages[j];
										_forage2._dbInfo.db = db;
										_advanceReadiness(_forage2._dbInfo);
									}
								})["catch"](function(err) {
									(_rejectReadiness(options, err) || Promise$1.resolve())["catch"](function() {});
									throw err;
								});
							});
						}
						executeCallback(promise, callback);
						return promise;
					}
					var asyncStorage = {
						_driver: "asyncStorage",
						_initStorage,
						_support: isIndexedDBValid(),
						iterate,
						getItem,
						setItem,
						removeItem,
						clear,
						length,
						key,
						keys,
						dropInstance
					};
					function isWebSQLValid() {
						return typeof openDatabase === "function";
					}
					var BASE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
					var BLOB_TYPE_PREFIX = "~~local_forage_type~";
					var BLOB_TYPE_PREFIX_REGEX = /^~~local_forage_type~([^~]+)~/;
					var SERIALIZED_MARKER = "__lfsc__:";
					var SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER.length;
					var TYPE_ARRAYBUFFER = "arbf";
					var TYPE_BLOB = "blob";
					var TYPE_INT8ARRAY = "si08";
					var TYPE_UINT8ARRAY = "ui08";
					var TYPE_UINT8CLAMPEDARRAY = "uic8";
					var TYPE_INT16ARRAY = "si16";
					var TYPE_INT32ARRAY = "si32";
					var TYPE_UINT16ARRAY = "ur16";
					var TYPE_UINT32ARRAY = "ui32";
					var TYPE_FLOAT32ARRAY = "fl32";
					var TYPE_FLOAT64ARRAY = "fl64";
					var TYPE_SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER_LENGTH + TYPE_ARRAYBUFFER.length;
					var toString$1 = Object.prototype.toString;
					function stringToBuffer(serializedString) {
						var bufferLength = serializedString.length * .75;
						var len = serializedString.length;
						var i;
						var p = 0;
						var encoded1, encoded2, encoded3, encoded4;
						if (serializedString[serializedString.length - 1] === "=") {
							bufferLength--;
							if (serializedString[serializedString.length - 2] === "=") bufferLength--;
						}
						var buffer = new ArrayBuffer(bufferLength);
						var bytes = new Uint8Array(buffer);
						for (i = 0; i < len; i += 4) {
							encoded1 = BASE_CHARS.indexOf(serializedString[i]);
							encoded2 = BASE_CHARS.indexOf(serializedString[i + 1]);
							encoded3 = BASE_CHARS.indexOf(serializedString[i + 2]);
							encoded4 = BASE_CHARS.indexOf(serializedString[i + 3]);
							bytes[p++] = encoded1 << 2 | encoded2 >> 4;
							bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
							bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
						}
						return buffer;
					}
					function bufferToString(buffer) {
						var bytes = new Uint8Array(buffer);
						var base64String = "";
						var i;
						for (i = 0; i < bytes.length; i += 3) {
							base64String += BASE_CHARS[bytes[i] >> 2];
							base64String += BASE_CHARS[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
							base64String += BASE_CHARS[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
							base64String += BASE_CHARS[bytes[i + 2] & 63];
						}
						if (bytes.length % 3 === 2) base64String = base64String.substring(0, base64String.length - 1) + "=";
						else if (bytes.length % 3 === 1) base64String = base64String.substring(0, base64String.length - 2) + "==";
						return base64String;
					}
					function serialize(value, callback) {
						var valueType = "";
						if (value) valueType = toString$1.call(value);
						if (value && (valueType === "[object ArrayBuffer]" || value.buffer && toString$1.call(value.buffer) === "[object ArrayBuffer]")) {
							var buffer;
							var marker = SERIALIZED_MARKER;
							if (value instanceof ArrayBuffer) {
								buffer = value;
								marker += TYPE_ARRAYBUFFER;
							} else {
								buffer = value.buffer;
								if (valueType === "[object Int8Array]") marker += TYPE_INT8ARRAY;
								else if (valueType === "[object Uint8Array]") marker += TYPE_UINT8ARRAY;
								else if (valueType === "[object Uint8ClampedArray]") marker += TYPE_UINT8CLAMPEDARRAY;
								else if (valueType === "[object Int16Array]") marker += TYPE_INT16ARRAY;
								else if (valueType === "[object Uint16Array]") marker += TYPE_UINT16ARRAY;
								else if (valueType === "[object Int32Array]") marker += TYPE_INT32ARRAY;
								else if (valueType === "[object Uint32Array]") marker += TYPE_UINT32ARRAY;
								else if (valueType === "[object Float32Array]") marker += TYPE_FLOAT32ARRAY;
								else if (valueType === "[object Float64Array]") marker += TYPE_FLOAT64ARRAY;
								else callback(/* @__PURE__ */ new Error("Failed to get type for BinaryArray"));
							}
							callback(marker + bufferToString(buffer));
						} else if (valueType === "[object Blob]") {
							var fileReader = new FileReader();
							fileReader.onload = function() {
								var str = BLOB_TYPE_PREFIX + value.type + "~" + bufferToString(this.result);
								callback(SERIALIZED_MARKER + TYPE_BLOB + str);
							};
							fileReader.readAsArrayBuffer(value);
						} else try {
							callback(JSON.stringify(value));
						} catch (e) {
							console.error("Couldn't convert value into a JSON string: ", value);
							callback(null, e);
						}
					}
					function deserialize(value) {
						if (value.substring(0, SERIALIZED_MARKER_LENGTH) !== SERIALIZED_MARKER) return JSON.parse(value);
						var serializedString = value.substring(TYPE_SERIALIZED_MARKER_LENGTH);
						var type = value.substring(SERIALIZED_MARKER_LENGTH, TYPE_SERIALIZED_MARKER_LENGTH);
						var blobType;
						if (type === TYPE_BLOB && BLOB_TYPE_PREFIX_REGEX.test(serializedString)) {
							var matcher = serializedString.match(BLOB_TYPE_PREFIX_REGEX);
							blobType = matcher[1];
							serializedString = serializedString.substring(matcher[0].length);
						}
						var buffer = stringToBuffer(serializedString);
						switch (type) {
							case TYPE_ARRAYBUFFER: return buffer;
							case TYPE_BLOB: return createBlob([buffer], { type: blobType });
							case TYPE_INT8ARRAY: return new Int8Array(buffer);
							case TYPE_UINT8ARRAY: return new Uint8Array(buffer);
							case TYPE_UINT8CLAMPEDARRAY: return new Uint8ClampedArray(buffer);
							case TYPE_INT16ARRAY: return new Int16Array(buffer);
							case TYPE_UINT16ARRAY: return new Uint16Array(buffer);
							case TYPE_INT32ARRAY: return new Int32Array(buffer);
							case TYPE_UINT32ARRAY: return new Uint32Array(buffer);
							case TYPE_FLOAT32ARRAY: return new Float32Array(buffer);
							case TYPE_FLOAT64ARRAY: return new Float64Array(buffer);
							default: throw new Error("Unkown type: " + type);
						}
					}
					var localforageSerializer = {
						serialize,
						deserialize,
						stringToBuffer,
						bufferToString
					};
					function createDbTable(t, dbInfo, callback, errorCallback) {
						t.executeSql("CREATE TABLE IF NOT EXISTS " + dbInfo.storeName + " (id INTEGER PRIMARY KEY, key unique, value)", [], callback, errorCallback);
					}
					function _initStorage$1(options) {
						var self = this;
						var dbInfo = { db: null };
						if (options) for (var i in options) dbInfo[i] = typeof options[i] !== "string" ? options[i].toString() : options[i];
						var dbInfoPromise = new Promise$1(function(resolve, reject) {
							try {
								dbInfo.db = openDatabase(dbInfo.name, String(dbInfo.version), dbInfo.description, dbInfo.size);
							} catch (e) {
								return reject(e);
							}
							dbInfo.db.transaction(function(t) {
								createDbTable(t, dbInfo, function() {
									self._dbInfo = dbInfo;
									resolve();
								}, function(t, error) {
									reject(error);
								});
							}, reject);
						});
						dbInfo.serializer = localforageSerializer;
						return dbInfoPromise;
					}
					function tryExecuteSql(t, dbInfo, sqlStatement, args, callback, errorCallback) {
						t.executeSql(sqlStatement, args, callback, function(t, error) {
							if (error.code === error.SYNTAX_ERR) t.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name = ?", [dbInfo.storeName], function(t, results) {
								if (!results.rows.length) createDbTable(t, dbInfo, function() {
									t.executeSql(sqlStatement, args, callback, errorCallback);
								}, errorCallback);
								else errorCallback(t, error);
							}, errorCallback);
							else errorCallback(t, error);
						}, errorCallback);
					}
					function getItem$1(key, callback) {
						var self = this;
						key = normalizeKey(key);
						var promise = new Promise$1(function(resolve, reject) {
							self.ready().then(function() {
								var dbInfo = self._dbInfo;
								dbInfo.db.transaction(function(t) {
									tryExecuteSql(t, dbInfo, "SELECT * FROM " + dbInfo.storeName + " WHERE key = ? LIMIT 1", [key], function(t, results) {
										var result = results.rows.length ? results.rows.item(0).value : null;
										if (result) result = dbInfo.serializer.deserialize(result);
										resolve(result);
									}, function(t, error) {
										reject(error);
									});
								});
							})["catch"](reject);
						});
						executeCallback(promise, callback);
						return promise;
					}
					function iterate$1(iterator, callback) {
						var self = this;
						var promise = new Promise$1(function(resolve, reject) {
							self.ready().then(function() {
								var dbInfo = self._dbInfo;
								dbInfo.db.transaction(function(t) {
									tryExecuteSql(t, dbInfo, "SELECT * FROM " + dbInfo.storeName, [], function(t, results) {
										var rows = results.rows;
										var length = rows.length;
										for (var i = 0; i < length; i++) {
											var item = rows.item(i);
											var result = item.value;
											if (result) result = dbInfo.serializer.deserialize(result);
											result = iterator(result, item.key, i + 1);
											if (result !== void 0) {
												resolve(result);
												return;
											}
										}
										resolve();
									}, function(t, error) {
										reject(error);
									});
								});
							})["catch"](reject);
						});
						executeCallback(promise, callback);
						return promise;
					}
					function _setItem(key, value, callback, retriesLeft) {
						var self = this;
						key = normalizeKey(key);
						var promise = new Promise$1(function(resolve, reject) {
							self.ready().then(function() {
								if (value === void 0) value = null;
								var originalValue = value;
								var dbInfo = self._dbInfo;
								dbInfo.serializer.serialize(value, function(value, error) {
									if (error) reject(error);
									else dbInfo.db.transaction(function(t) {
										tryExecuteSql(t, dbInfo, "INSERT OR REPLACE INTO " + dbInfo.storeName + " (key, value) VALUES (?, ?)", [key, value], function() {
											resolve(originalValue);
										}, function(t, error) {
											reject(error);
										});
									}, function(sqlError) {
										if (sqlError.code === sqlError.QUOTA_ERR) {
											if (retriesLeft > 0) {
												resolve(_setItem.apply(self, [
													key,
													originalValue,
													callback,
													retriesLeft - 1
												]));
												return;
											}
											reject(sqlError);
										}
									});
								});
							})["catch"](reject);
						});
						executeCallback(promise, callback);
						return promise;
					}
					function setItem$1(key, value, callback) {
						return _setItem.apply(this, [
							key,
							value,
							callback,
							1
						]);
					}
					function removeItem$1(key, callback) {
						var self = this;
						key = normalizeKey(key);
						var promise = new Promise$1(function(resolve, reject) {
							self.ready().then(function() {
								var dbInfo = self._dbInfo;
								dbInfo.db.transaction(function(t) {
									tryExecuteSql(t, dbInfo, "DELETE FROM " + dbInfo.storeName + " WHERE key = ?", [key], function() {
										resolve();
									}, function(t, error) {
										reject(error);
									});
								});
							})["catch"](reject);
						});
						executeCallback(promise, callback);
						return promise;
					}
					function clear$1(callback) {
						var self = this;
						var promise = new Promise$1(function(resolve, reject) {
							self.ready().then(function() {
								var dbInfo = self._dbInfo;
								dbInfo.db.transaction(function(t) {
									tryExecuteSql(t, dbInfo, "DELETE FROM " + dbInfo.storeName, [], function() {
										resolve();
									}, function(t, error) {
										reject(error);
									});
								});
							})["catch"](reject);
						});
						executeCallback(promise, callback);
						return promise;
					}
					function length$1(callback) {
						var self = this;
						var promise = new Promise$1(function(resolve, reject) {
							self.ready().then(function() {
								var dbInfo = self._dbInfo;
								dbInfo.db.transaction(function(t) {
									tryExecuteSql(t, dbInfo, "SELECT COUNT(key) as c FROM " + dbInfo.storeName, [], function(t, results) {
										var result = results.rows.item(0).c;
										resolve(result);
									}, function(t, error) {
										reject(error);
									});
								});
							})["catch"](reject);
						});
						executeCallback(promise, callback);
						return promise;
					}
					function key$1(n, callback) {
						var self = this;
						var promise = new Promise$1(function(resolve, reject) {
							self.ready().then(function() {
								var dbInfo = self._dbInfo;
								dbInfo.db.transaction(function(t) {
									tryExecuteSql(t, dbInfo, "SELECT key FROM " + dbInfo.storeName + " WHERE id = ? LIMIT 1", [n + 1], function(t, results) {
										resolve(results.rows.length ? results.rows.item(0).key : null);
									}, function(t, error) {
										reject(error);
									});
								});
							})["catch"](reject);
						});
						executeCallback(promise, callback);
						return promise;
					}
					function keys$1(callback) {
						var self = this;
						var promise = new Promise$1(function(resolve, reject) {
							self.ready().then(function() {
								var dbInfo = self._dbInfo;
								dbInfo.db.transaction(function(t) {
									tryExecuteSql(t, dbInfo, "SELECT key FROM " + dbInfo.storeName, [], function(t, results) {
										var keys = [];
										for (var i = 0; i < results.rows.length; i++) keys.push(results.rows.item(i).key);
										resolve(keys);
									}, function(t, error) {
										reject(error);
									});
								});
							})["catch"](reject);
						});
						executeCallback(promise, callback);
						return promise;
					}
					function getAllStoreNames(db) {
						return new Promise$1(function(resolve, reject) {
							db.transaction(function(t) {
								t.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'", [], function(t, results) {
									var storeNames = [];
									for (var i = 0; i < results.rows.length; i++) storeNames.push(results.rows.item(i).name);
									resolve({
										db,
										storeNames
									});
								}, function(t, error) {
									reject(error);
								});
							}, function(sqlError) {
								reject(sqlError);
							});
						});
					}
					function dropInstance$1(options, callback) {
						callback = getCallback.apply(this, arguments);
						var currentConfig = this.config();
						options = typeof options !== "function" && options || {};
						if (!options.name) {
							options.name = options.name || currentConfig.name;
							options.storeName = options.storeName || currentConfig.storeName;
						}
						var self = this;
						var promise;
						if (!options.name) promise = Promise$1.reject("Invalid arguments");
						else promise = new Promise$1(function(resolve) {
							var db;
							if (options.name === currentConfig.name) db = self._dbInfo.db;
							else db = openDatabase(options.name, "", "", 0);
							if (!options.storeName) resolve(getAllStoreNames(db));
							else resolve({
								db,
								storeNames: [options.storeName]
							});
						}).then(function(operationInfo) {
							return new Promise$1(function(resolve, reject) {
								operationInfo.db.transaction(function(t) {
									function dropTable(storeName) {
										return new Promise$1(function(resolve, reject) {
											t.executeSql("DROP TABLE IF EXISTS " + storeName, [], function() {
												resolve();
											}, function(t, error) {
												reject(error);
											});
										});
									}
									var operations = [];
									for (var i = 0, len = operationInfo.storeNames.length; i < len; i++) operations.push(dropTable(operationInfo.storeNames[i]));
									Promise$1.all(operations).then(function() {
										resolve();
									})["catch"](function(e) {
										reject(e);
									});
								}, function(sqlError) {
									reject(sqlError);
								});
							});
						});
						executeCallback(promise, callback);
						return promise;
					}
					var webSQLStorage = {
						_driver: "webSQLStorage",
						_initStorage: _initStorage$1,
						_support: isWebSQLValid(),
						iterate: iterate$1,
						getItem: getItem$1,
						setItem: setItem$1,
						removeItem: removeItem$1,
						clear: clear$1,
						length: length$1,
						key: key$1,
						keys: keys$1,
						dropInstance: dropInstance$1
					};
					function isLocalStorageValid() {
						try {
							return typeof localStorage !== "undefined" && "setItem" in localStorage && !!localStorage.setItem;
						} catch (e) {
							return false;
						}
					}
					function _getKeyPrefix(options, defaultConfig) {
						var keyPrefix = options.name + "/";
						if (options.storeName !== defaultConfig.storeName) keyPrefix += options.storeName + "/";
						return keyPrefix;
					}
					function checkIfLocalStorageThrows() {
						var localStorageTestKey = "_localforage_support_test";
						try {
							localStorage.setItem(localStorageTestKey, true);
							localStorage.removeItem(localStorageTestKey);
							return false;
						} catch (e) {
							return true;
						}
					}
					function _isLocalStorageUsable() {
						return !checkIfLocalStorageThrows() || localStorage.length > 0;
					}
					function _initStorage$2(options) {
						var self = this;
						var dbInfo = {};
						if (options) for (var i in options) dbInfo[i] = options[i];
						dbInfo.keyPrefix = _getKeyPrefix(options, self._defaultConfig);
						if (!_isLocalStorageUsable()) return Promise$1.reject();
						self._dbInfo = dbInfo;
						dbInfo.serializer = localforageSerializer;
						return Promise$1.resolve();
					}
					function clear$2(callback) {
						var self = this;
						var promise = self.ready().then(function() {
							var keyPrefix = self._dbInfo.keyPrefix;
							for (var i = localStorage.length - 1; i >= 0; i--) {
								var key = localStorage.key(i);
								if (key.indexOf(keyPrefix) === 0) localStorage.removeItem(key);
							}
						});
						executeCallback(promise, callback);
						return promise;
					}
					function getItem$2(key, callback) {
						var self = this;
						key = normalizeKey(key);
						var promise = self.ready().then(function() {
							var dbInfo = self._dbInfo;
							var result = localStorage.getItem(dbInfo.keyPrefix + key);
							if (result) result = dbInfo.serializer.deserialize(result);
							return result;
						});
						executeCallback(promise, callback);
						return promise;
					}
					function iterate$2(iterator, callback) {
						var self = this;
						var promise = self.ready().then(function() {
							var dbInfo = self._dbInfo;
							var keyPrefix = dbInfo.keyPrefix;
							var keyPrefixLength = keyPrefix.length;
							var length = localStorage.length;
							var iterationNumber = 1;
							for (var i = 0; i < length; i++) {
								var key = localStorage.key(i);
								if (key.indexOf(keyPrefix) !== 0) continue;
								var value = localStorage.getItem(key);
								if (value) value = dbInfo.serializer.deserialize(value);
								value = iterator(value, key.substring(keyPrefixLength), iterationNumber++);
								if (value !== void 0) return value;
							}
						});
						executeCallback(promise, callback);
						return promise;
					}
					function key$2(n, callback) {
						var self = this;
						var promise = self.ready().then(function() {
							var dbInfo = self._dbInfo;
							var result;
							try {
								result = localStorage.key(n);
							} catch (error) {
								result = null;
							}
							if (result) result = result.substring(dbInfo.keyPrefix.length);
							return result;
						});
						executeCallback(promise, callback);
						return promise;
					}
					function keys$2(callback) {
						var self = this;
						var promise = self.ready().then(function() {
							var dbInfo = self._dbInfo;
							var length = localStorage.length;
							var keys = [];
							for (var i = 0; i < length; i++) {
								var itemKey = localStorage.key(i);
								if (itemKey.indexOf(dbInfo.keyPrefix) === 0) keys.push(itemKey.substring(dbInfo.keyPrefix.length));
							}
							return keys;
						});
						executeCallback(promise, callback);
						return promise;
					}
					function length$2(callback) {
						var promise = this.keys().then(function(keys) {
							return keys.length;
						});
						executeCallback(promise, callback);
						return promise;
					}
					function removeItem$2(key, callback) {
						var self = this;
						key = normalizeKey(key);
						var promise = self.ready().then(function() {
							var dbInfo = self._dbInfo;
							localStorage.removeItem(dbInfo.keyPrefix + key);
						});
						executeCallback(promise, callback);
						return promise;
					}
					function setItem$2(key, value, callback) {
						var self = this;
						key = normalizeKey(key);
						var promise = self.ready().then(function() {
							if (value === void 0) value = null;
							var originalValue = value;
							return new Promise$1(function(resolve, reject) {
								var dbInfo = self._dbInfo;
								dbInfo.serializer.serialize(value, function(value, error) {
									if (error) reject(error);
									else try {
										localStorage.setItem(dbInfo.keyPrefix + key, value);
										resolve(originalValue);
									} catch (e) {
										if (e.name === "QuotaExceededError" || e.name === "NS_ERROR_DOM_QUOTA_REACHED") reject(e);
										reject(e);
									}
								});
							});
						});
						executeCallback(promise, callback);
						return promise;
					}
					function dropInstance$2(options, callback) {
						callback = getCallback.apply(this, arguments);
						options = typeof options !== "function" && options || {};
						if (!options.name) {
							var currentConfig = this.config();
							options.name = options.name || currentConfig.name;
							options.storeName = options.storeName || currentConfig.storeName;
						}
						var self = this;
						var promise;
						if (!options.name) promise = Promise$1.reject("Invalid arguments");
						else promise = new Promise$1(function(resolve) {
							if (!options.storeName) resolve(options.name + "/");
							else resolve(_getKeyPrefix(options, self._defaultConfig));
						}).then(function(keyPrefix) {
							for (var i = localStorage.length - 1; i >= 0; i--) {
								var key = localStorage.key(i);
								if (key.indexOf(keyPrefix) === 0) localStorage.removeItem(key);
							}
						});
						executeCallback(promise, callback);
						return promise;
					}
					var localStorageWrapper = {
						_driver: "localStorageWrapper",
						_initStorage: _initStorage$2,
						_support: isLocalStorageValid(),
						iterate: iterate$2,
						getItem: getItem$2,
						setItem: setItem$2,
						removeItem: removeItem$2,
						clear: clear$2,
						length: length$2,
						key: key$2,
						keys: keys$2,
						dropInstance: dropInstance$2
					};
					var sameValue = function sameValue(x, y) {
						return x === y || typeof x === "number" && typeof y === "number" && isNaN(x) && isNaN(y);
					};
					var includes = function includes(array, searchElement) {
						var len = array.length;
						var i = 0;
						while (i < len) {
							if (sameValue(array[i], searchElement)) return true;
							i++;
						}
						return false;
					};
					var isArray = Array.isArray || function(arg) {
						return Object.prototype.toString.call(arg) === "[object Array]";
					};
					var DefinedDrivers = {};
					var DriverSupport = {};
					var DefaultDrivers = {
						INDEXEDDB: asyncStorage,
						WEBSQL: webSQLStorage,
						LOCALSTORAGE: localStorageWrapper
					};
					var DefaultDriverOrder = [
						DefaultDrivers.INDEXEDDB._driver,
						DefaultDrivers.WEBSQL._driver,
						DefaultDrivers.LOCALSTORAGE._driver
					];
					var OptionalDriverMethods = ["dropInstance"];
					var LibraryMethods = [
						"clear",
						"getItem",
						"iterate",
						"key",
						"keys",
						"length",
						"removeItem",
						"setItem"
					].concat(OptionalDriverMethods);
					var DefaultConfig = {
						description: "",
						driver: DefaultDriverOrder.slice(),
						name: "localforage",
						size: 4980736,
						storeName: "keyvaluepairs",
						version: 1
					};
					function callWhenReady(localForageInstance, libraryMethod) {
						localForageInstance[libraryMethod] = function() {
							var _args = arguments;
							return localForageInstance.ready().then(function() {
								return localForageInstance[libraryMethod].apply(localForageInstance, _args);
							});
						};
					}
					function extend() {
						for (var i = 1; i < arguments.length; i++) {
							var arg = arguments[i];
							if (arg) {
								for (var _key in arg) if (arg.hasOwnProperty(_key)) if (isArray(arg[_key])) arguments[0][_key] = arg[_key].slice();
								else arguments[0][_key] = arg[_key];
							}
						}
						return arguments[0];
					}
					module$4.exports = new (function() {
						function LocalForage(options) {
							_classCallCheck(this, LocalForage);
							for (var driverTypeKey in DefaultDrivers) if (DefaultDrivers.hasOwnProperty(driverTypeKey)) {
								var driver = DefaultDrivers[driverTypeKey];
								var driverName = driver._driver;
								this[driverTypeKey] = driverName;
								if (!DefinedDrivers[driverName]) this.defineDriver(driver);
							}
							this._defaultConfig = extend({}, DefaultConfig);
							this._config = extend({}, this._defaultConfig, options);
							this._driverSet = null;
							this._initDriver = null;
							this._ready = false;
							this._dbInfo = null;
							this._wrapLibraryMethodsWithReady();
							this.setDriver(this._config.driver)["catch"](function() {});
						}
						LocalForage.prototype.config = function config(options) {
							if ((typeof options === "undefined" ? "undefined" : _typeof(options)) === "object") {
								if (this._ready) return /* @__PURE__ */ new Error("Can't call config() after localforage has been used.");
								for (var i in options) {
									if (i === "storeName") options[i] = options[i].replace(/\W/g, "_");
									if (i === "version" && typeof options[i] !== "number") return /* @__PURE__ */ new Error("Database version must be a number.");
									this._config[i] = options[i];
								}
								if ("driver" in options && options.driver) return this.setDriver(this._config.driver);
								return true;
							} else if (typeof options === "string") return this._config[options];
							else return this._config;
						};
						LocalForage.prototype.defineDriver = function defineDriver(driverObject, callback, errorCallback) {
							var promise = new Promise$1(function(resolve, reject) {
								try {
									var driverName = driverObject._driver;
									var complianceError = /* @__PURE__ */ new Error("Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver");
									if (!driverObject._driver) {
										reject(complianceError);
										return;
									}
									var driverMethods = LibraryMethods.concat("_initStorage");
									for (var i = 0, len = driverMethods.length; i < len; i++) {
										var driverMethodName = driverMethods[i];
										if ((!includes(OptionalDriverMethods, driverMethodName) || driverObject[driverMethodName]) && typeof driverObject[driverMethodName] !== "function") {
											reject(complianceError);
											return;
										}
									}
									(function configureMissingMethods() {
										var methodNotImplementedFactory = function methodNotImplementedFactory(methodName) {
											return function() {
												var error = /* @__PURE__ */ new Error("Method " + methodName + " is not implemented by the current driver");
												var promise = Promise$1.reject(error);
												executeCallback(promise, arguments[arguments.length - 1]);
												return promise;
											};
										};
										for (var _i = 0, _len = OptionalDriverMethods.length; _i < _len; _i++) {
											var optionalDriverMethod = OptionalDriverMethods[_i];
											if (!driverObject[optionalDriverMethod]) driverObject[optionalDriverMethod] = methodNotImplementedFactory(optionalDriverMethod);
										}
									})();
									var setDriverSupport = function setDriverSupport(support) {
										if (DefinedDrivers[driverName]) console.info("Redefining LocalForage driver: " + driverName);
										DefinedDrivers[driverName] = driverObject;
										DriverSupport[driverName] = support;
										resolve();
									};
									if ("_support" in driverObject) if (driverObject._support && typeof driverObject._support === "function") driverObject._support().then(setDriverSupport, reject);
									else setDriverSupport(!!driverObject._support);
									else setDriverSupport(true);
								} catch (e) {
									reject(e);
								}
							});
							executeTwoCallbacks(promise, callback, errorCallback);
							return promise;
						};
						LocalForage.prototype.driver = function driver() {
							return this._driver || null;
						};
						LocalForage.prototype.getDriver = function getDriver(driverName, callback, errorCallback) {
							var getDriverPromise = DefinedDrivers[driverName] ? Promise$1.resolve(DefinedDrivers[driverName]) : Promise$1.reject(/* @__PURE__ */ new Error("Driver not found."));
							executeTwoCallbacks(getDriverPromise, callback, errorCallback);
							return getDriverPromise;
						};
						LocalForage.prototype.getSerializer = function getSerializer(callback) {
							var serializerPromise = Promise$1.resolve(localforageSerializer);
							executeTwoCallbacks(serializerPromise, callback);
							return serializerPromise;
						};
						LocalForage.prototype.ready = function ready(callback) {
							var self = this;
							var promise = self._driverSet.then(function() {
								if (self._ready === null) self._ready = self._initDriver();
								return self._ready;
							});
							executeTwoCallbacks(promise, callback, callback);
							return promise;
						};
						LocalForage.prototype.setDriver = function setDriver(drivers, callback, errorCallback) {
							var self = this;
							if (!isArray(drivers)) drivers = [drivers];
							var supportedDrivers = this._getSupportedDrivers(drivers);
							function setDriverToConfig() {
								self._config.driver = self.driver();
							}
							function extendSelfWithDriver(driver) {
								self._extend(driver);
								setDriverToConfig();
								self._ready = self._initStorage(self._config);
								return self._ready;
							}
							function initDriver(supportedDrivers) {
								return function() {
									var currentDriverIndex = 0;
									function driverPromiseLoop() {
										while (currentDriverIndex < supportedDrivers.length) {
											var driverName = supportedDrivers[currentDriverIndex];
											currentDriverIndex++;
											self._dbInfo = null;
											self._ready = null;
											return self.getDriver(driverName).then(extendSelfWithDriver)["catch"](driverPromiseLoop);
										}
										setDriverToConfig();
										var error = /* @__PURE__ */ new Error("No available storage method found.");
										self._driverSet = Promise$1.reject(error);
										return self._driverSet;
									}
									return driverPromiseLoop();
								};
							}
							var oldDriverSetDone = this._driverSet !== null ? this._driverSet["catch"](function() {
								return Promise$1.resolve();
							}) : Promise$1.resolve();
							this._driverSet = oldDriverSetDone.then(function() {
								var driverName = supportedDrivers[0];
								self._dbInfo = null;
								self._ready = null;
								return self.getDriver(driverName).then(function(driver) {
									self._driver = driver._driver;
									setDriverToConfig();
									self._wrapLibraryMethodsWithReady();
									self._initDriver = initDriver(supportedDrivers);
								});
							})["catch"](function() {
								setDriverToConfig();
								var error = /* @__PURE__ */ new Error("No available storage method found.");
								self._driverSet = Promise$1.reject(error);
								return self._driverSet;
							});
							executeTwoCallbacks(this._driverSet, callback, errorCallback);
							return this._driverSet;
						};
						LocalForage.prototype.supports = function supports(driverName) {
							return !!DriverSupport[driverName];
						};
						LocalForage.prototype._extend = function _extend(libraryMethodsAndProperties) {
							extend(this, libraryMethodsAndProperties);
						};
						LocalForage.prototype._getSupportedDrivers = function _getSupportedDrivers(drivers) {
							var supportedDrivers = [];
							for (var i = 0, len = drivers.length; i < len; i++) {
								var driverName = drivers[i];
								if (this.supports(driverName)) supportedDrivers.push(driverName);
							}
							return supportedDrivers;
						};
						LocalForage.prototype._wrapLibraryMethodsWithReady = function _wrapLibraryMethodsWithReady() {
							for (var i = 0, len = LibraryMethods.length; i < len; i++) callWhenReady(this, LibraryMethods[i]);
						};
						LocalForage.prototype.createInstance = function createInstance(options) {
							return new LocalForage(options);
						};
						return LocalForage;
					}())();
				}, { "3": 3 }]
			}, {}, [4])(4);
		});
	})))());
	/**
	* Handles saving and requesting files from local storage
	* @class
	* @param {string} name This should be the name of the application for modals
	* @param {function} [requester]
	* @param {function} [resolver]
	*/
	var Store = class {
		urlCache;
		storage;
		name;
		requester;
		resolver;
		online;
		_status;
		constructor(name, requester, resolver) {
			this.urlCache = {};
			this.storage = void 0;
			this.name = name;
			this.requester = requester || request;
			this.resolver = resolver;
			this.online = true;
			this.checkRequirements();
			this.addListeners();
		}
		/**
		* Checks to see if localForage exists in global namspace,
		* Requires localForage if it isn't there
		* @private
		*/
		checkRequirements() {
			try {
				let store = import_localforage.default;
				if (typeof import_localforage.default === "undefined") store = import_localforage.default;
				this.storage = store.createInstance({ name: this.name });
			} catch (e) {
				throw new Error("localForage lib not loaded");
			}
		}
		/**
		* Add online and offline event listeners
		* @private
		*/
		addListeners() {
			this._status = this.status.bind(this);
			window.addEventListener("online", this._status);
			window.addEventListener("offline", this._status);
		}
		/**
		* Remove online and offline event listeners
		* @private
		*/
		removeListeners() {
			window.removeEventListener("online", this._status);
			window.removeEventListener("offline", this._status);
			this._status = void 0;
		}
		/**
		* Update the online / offline status
		* @private
		*/
		status(event) {
			let online = navigator.onLine;
			this.online = online;
			if (online) this.emit("online", this);
			else this.emit("offline", this);
		}
		/**
		* Add all of a book resources to the store
		* @param  {Resources} resources  book resources
		* @param  {boolean} [force] force resaving resources
		* @return {Promise<object>} store objects
		*/
		add(resources, force) {
			let mapped = resources.resources.map((item) => {
				let { href } = item;
				let url = this.resolver(href);
				let encodedUrl = window.encodeURIComponent(url);
				return this.storage.getItem(encodedUrl).then((item) => {
					if (!item || force) return this.requester(url, "binary").then((data) => {
						return this.storage.setItem(encodedUrl, data);
					});
					else return item;
				});
			});
			return Promise.all(mapped);
		}
		/**
		* Put binary data from a url to storage
		* @param  {string} url  a url to request from storage
		* @param  {boolean} [withCredentials]
		* @param  {object} [headers]
		* @return {Promise<Blob>}
		*/
		put(url, withCredentials, headers) {
			let encodedUrl = window.encodeURIComponent(url);
			return this.storage.getItem(encodedUrl).then((result) => {
				if (!result) return this.requester(url, "binary", withCredentials, headers).then((data) => {
					return this.storage.setItem(encodedUrl, data);
				});
				return result;
			});
		}
		request(url, type, withCredentials, headers) {
			if (this.online) return this.requester(url, type, withCredentials, headers).then((data) => {
				this.put(url);
				return data;
			});
			else return this.retrieve(url, type);
		}
		retrieve(url, type) {
			var response;
			var path = new Path(url);
			if (!type) type = path.extension;
			if (type == "blob") response = this.getBlob(url);
			else response = this.getText(url);
			return response.then((r) => {
				var deferred = new defer$1();
				var result;
				if (r) {
					result = this.handleResponse(r, type);
					deferred.resolve(result);
				} else deferred.reject({
					message: "File not found in storage: " + url,
					stack: (/* @__PURE__ */ new Error()).stack
				});
				return deferred.promise;
			});
		}
		handleResponse(response, type) {
			var r;
			if (type == "json") r = JSON.parse(response);
			else if (isXml$1(type)) r = parseMarkup(response, "text/xml");
			else if (type == "xhtml") r = parseMarkup(response, "application/xhtml+xml");
			else if (type == "html" || type == "htm") r = parseMarkup(response, "text/html");
			else r = response;
			return r;
		}
		/**
		* Get a Blob from Storage by Url
		* @param  {string} url
		* @param  {string} [mimeType]
		* @return {Blob}
		*/
		getBlob(url, mimeType) {
			let encodedUrl = window.encodeURIComponent(url);
			return this.storage.getItem(encodedUrl).then(function(uint8array) {
				if (!uint8array) return;
				mimeType = mimeType || mime_default.lookup(url);
				return new Blob([uint8array], { type: mimeType });
			});
		}
		/**
		* Get Text from Storage by Url
		* @param  {string} url
		* @param  {string} [mimeType]
		* @return {string}
		*/
		getText(url, mimeType) {
			let encodedUrl = window.encodeURIComponent(url);
			mimeType = mimeType || mime_default.lookup(url);
			return this.storage.getItem(encodedUrl).then(function(uint8array) {
				var deferred = new defer$1();
				var reader = new FileReader();
				var blob;
				if (!uint8array) return;
				blob = new Blob([uint8array], { type: mimeType });
				reader.addEventListener("loadend", () => {
					deferred.resolve(reader.result);
				});
				reader.readAsText(blob, mimeType);
				return deferred.promise;
			});
		}
		/**
		* Get a base64 encoded result from Storage by Url
		* @param  {string} url
		* @param  {string} [mimeType]
		* @return {string} base64 encoded
		*/
		getBase64(url, mimeType) {
			let encodedUrl = window.encodeURIComponent(url);
			mimeType = mimeType || mime_default.lookup(url);
			return this.storage.getItem(encodedUrl).then((uint8array) => {
				var deferred = new defer$1();
				var reader = new FileReader();
				var blob;
				if (!uint8array) return;
				blob = new Blob([uint8array], { type: mimeType });
				reader.addEventListener("loadend", () => {
					deferred.resolve(reader.result);
				});
				reader.readAsDataURL(blob);
				return deferred.promise;
			});
		}
		/**
		* Create a Url from a stored item
		* @param  {string} url
		* @param  {object} [options.base64] use base64 encoding or blob url
		* @return {Promise} url promise with Url string
		*/
		createUrl(url, options) {
			var deferred = new defer$1();
			var _URL = window.URL || window.webkitURL || window.mozURL;
			var tempUrl;
			var response;
			var useBase64 = options && options.base64;
			if (url in this.urlCache) {
				deferred.resolve(this.urlCache[url]);
				return deferred.promise;
			}
			if (useBase64) {
				response = this.getBase64(url);
				if (response) response.then((tempUrl) => {
					this.urlCache[url] = tempUrl;
					deferred.resolve(tempUrl);
				});
			} else {
				response = this.getBlob(url);
				if (response) response.then((blob) => {
					tempUrl = _URL.createObjectURL(blob);
					this.urlCache[url] = tempUrl;
					deferred.resolve(tempUrl);
				});
			}
			if (!response) deferred.reject({
				message: "File not found in storage: " + url,
				stack: (/* @__PURE__ */ new Error()).stack
			});
			return deferred.promise;
		}
		/**
		* Revoke Temp Url for a archive item
		* @param  {string} url url of the item in the store
		*/
		revokeUrl(url) {
			var _URL = window.URL || window.webkitURL || window.mozURL;
			var fromCache = this.urlCache[url];
			if (fromCache) _URL.revokeObjectURL(fromCache);
		}
		destroy() {
			var _URL = window.URL || window.webkitURL || window.mozURL;
			for (let fromCache in this.urlCache) _URL.revokeObjectURL(fromCache);
			this.urlCache = {};
			this.removeListeners();
		}
	};
	(0, import_event_emitter.default)(Store.prototype);
	//#endregion
	//#region src/displayoptions.ts
	/**
	* Open DisplayOptions Format Parser
	* @class
	* @param {document} displayOptionsDocument XML
	*/
	var DisplayOptions = class {
		interactive;
		fixedLayout;
		openToSpread;
		orientationLock;
		constructor(displayOptionsDocument) {
			this.interactive = "";
			this.fixedLayout = "";
			this.openToSpread = "";
			this.orientationLock = "";
			if (displayOptionsDocument) this.parse(displayOptionsDocument);
		}
		/**
		* Parse XML
		* @param  {document} displayOptionsDocument XML
		* @return {DisplayOptions} self
		*/
		parse(displayOptionsDocument) {
			if (!displayOptionsDocument) return this;
			const displayOptionsNode = qs$1(displayOptionsDocument, "display_options");
			if (!displayOptionsNode) return this;
			const options = qsa$1(displayOptionsNode, "option");
			Array.from(options).forEach((el) => {
				let value = "";
				if (el.childNodes.length) value = el.childNodes[0].nodeValue || "";
				switch (el.attributes.name.value) {
					case "interactive":
						this.interactive = value;
						break;
					case "fixed-layout":
						this.fixedLayout = value;
						break;
					case "open-to-spread":
						this.openToSpread = value;
						break;
					case "orientation-lock":
						this.orientationLock = value;
						break;
				}
			});
			return this;
		}
		destroy() {
			this.interactive = void 0;
			this.fixedLayout = void 0;
			this.openToSpread = void 0;
			this.orientationLock = void 0;
		}
	};
	//#endregion
	//#region src/book.ts
	var Defer = defer$1;
	var CONTAINER_PATH = "META-INF/container.xml";
	var IBOOKS_DISPLAY_OPTIONS_PATH = "META-INF/com.apple.ibooks.display-options.xml";
	var INPUT_TYPE = {
		BINARY: "binary",
		BASE64: "base64",
		EPUB: "epub",
		OPF: "opf",
		MANIFEST: "json",
		DIRECTORY: "directory"
	};
	/**
	* An Epub representation with methods for the loading, parsing and manipulation
	* of its contents.
	* @class
	* @param {string} [url]
	* @param {object} [options]
	* @param {method} [options.requestMethod] a request function to use instead of the default
	* @param {boolean} [options.requestCredentials=undefined] send the xhr request withCredentials
	* @param {object} [options.requestHeaders=undefined] send the xhr request headers
	* @param {string} [options.encoding=binary] optional to pass 'binary' or base64' for archived Epubs
	* @param {string} [options.replacements=none] use base64, blobUrl, or none for replacing assets in archived Epubs
	* @param {method} [options.canonical] optional function to determine canonical urls for a path
	* @param {string} [options.openAs] optional string to determine the input type
	* @param {string} [options.store=false] cache the contents in local storage, value should be the name of the reader
	* @returns {Book}
	* @example new Book("/path/to/book.epub", {})
	* @example new Book({ replacements: "blobUrl" })
	*/
	var Book = class {
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
		constructor(url, options) {
			if (typeof options === "undefined" && typeof url !== "string" && url instanceof Blob === false && url instanceof ArrayBuffer === false) {
				options = url;
				url = void 0;
			}
			this.settings = extend$1(this.settings || {}, {
				requestMethod: void 0,
				requestCredentials: void 0,
				requestHeaders: void 0,
				encoding: void 0,
				replacements: void 0,
				canonical: void 0,
				openAs: void 0,
				store: void 0
			});
			extend$1(this.settings, options);
			this.opening = new Defer();
			/**
			* @member {promise} opened returns after the book is loaded
			* @memberof Book
			*/
			this.opened = this.opening.promise;
			this.isOpen = false;
			this.loading = {
				manifest: new Defer(),
				spine: new Defer(),
				metadata: new Defer(),
				cover: new Defer(),
				navigation: new Defer(),
				pageList: new Defer(),
				resources: new Defer(),
				displayOptions: new Defer()
			};
			this.loaded = {
				manifest: this.loading.manifest.promise,
				spine: this.loading.spine.promise,
				metadata: this.loading.metadata.promise,
				cover: this.loading.cover.promise,
				navigation: this.loading.navigation.promise,
				pageList: this.loading.pageList.promise,
				resources: this.loading.resources.promise,
				displayOptions: this.loading.displayOptions.promise
			};
			/**
			* @member {promise} ready returns after the book is loaded and parsed
			* @memberof Book
			* @private
			*/
			this.ready = Promise.all([
				this.loaded.manifest,
				this.loaded.spine,
				this.loaded.metadata,
				this.loaded.cover,
				this.loaded.navigation,
				this.loaded.resources,
				this.loaded.displayOptions
			]);
			this.isRendered = false;
			/**
			* @member {method} request
			* @memberof Book
			* @private
			*/
			this.request = this.settings.requestMethod || request;
			/**
			* @member {Spine} spine
			* @memberof Book
			*/
			this.spine = new Spine();
			/**
			* @member {Locations} locations
			* @memberof Book
			*/
			this.locations = new Locations(this.spine, this.load.bind(this));
			/**
			* @member {Navigation} navigation
			* @memberof Book
			*/
			this.navigation = void 0;
			/**
			* @member {PageList} pagelist
			* @memberof Book
			*/
			this.pageList = void 0;
			/**
			* @member {Url} url
			* @memberof Book
			* @private
			*/
			this.url = void 0;
			/**
			* @member {Path} path
			* @memberof Book
			* @private
			*/
			this.path = void 0;
			/**
			* @member {boolean} archived
			* @memberof Book
			* @private
			*/
			this.archived = false;
			/**
			* @member {Archive} archive
			* @memberof Book
			* @private
			*/
			this.archive = void 0;
			/**
			* @member {Store} storage
			* @memberof Book
			* @private
			*/
			this.storage = void 0;
			/**
			* @member {Resources} resources
			* @memberof Book
			* @private
			*/
			this.resources = void 0;
			/**
			* @member {Rendition} rendition
			* @memberof Book
			* @private
			*/
			this.rendition = void 0;
			/**
			* @member {Container} container
			* @memberof Book
			* @private
			*/
			this.container = void 0;
			/**
			* @member {Packaging} packaging
			* @memberof Book
			* @private
			*/
			this.packaging = void 0;
			/**
			* @member {DisplayOptions} displayOptions
			* @memberof DisplayOptions
			* @private
			*/
			this.displayOptions = void 0;
			if (this.settings.store) this.store(this.settings.store);
			if (url) this.open(url, this.settings.openAs).catch((_error) => {
				var err = /* @__PURE__ */ new Error("Cannot load book at " + url);
				this.emit(EVENTS.BOOK.OPEN_FAILED, err);
			});
		}
		/**
		* Open a epub or url
		* @param {string | ArrayBuffer} input Url, Path or ArrayBuffer
		* @param {string} [what="binary", "base64", "epub", "opf", "json", "directory"] force opening as a certain type
		* @returns {Promise} of when the book has been loaded
		* @example book.open("/path/to/book.epub")
		*/
		open(input, what) {
			var opening;
			var type = what || this.determineType(input);
			if (type === INPUT_TYPE.BINARY) {
				this.archived = true;
				this.url = new Url("/", "");
				opening = this.openEpub(input);
			} else if (type === INPUT_TYPE.BASE64) {
				this.archived = true;
				this.url = new Url("/", "");
				opening = this.openEpub(input, type);
			} else if (type === INPUT_TYPE.EPUB) {
				this.archived = true;
				this.url = new Url("/", "");
				opening = this.request(input, "binary", this.settings.requestCredentials, this.settings.requestHeaders).then(this.openEpub.bind(this));
			} else if (type == INPUT_TYPE.OPF) {
				this.url = new Url(input);
				opening = this.openPackaging(this.url.Path.toString());
			} else if (type == INPUT_TYPE.MANIFEST) {
				this.url = new Url(input);
				opening = this.openManifest(this.url.Path.toString());
			} else {
				this.url = new Url(input);
				opening = this.openContainer(CONTAINER_PATH).then(this.openPackaging.bind(this));
			}
			return opening;
		}
		/**
		* Open an archived epub
		* @private
		* @param  {binary} data
		* @param  {string} [encoding]
		* @return {Promise}
		*/
		openEpub(data, encoding) {
			return this.unarchive(data, encoding || this.settings.encoding).then(() => {
				return this.openContainer(CONTAINER_PATH);
			}).then((packagePath) => {
				return this.openPackaging(packagePath);
			});
		}
		/**
		* Open the epub container
		* @private
		* @param  {string} url
		* @return {string} packagePath
		*/
		openContainer(url) {
			return this.load(url, "xml").then((xml) => {
				this.container = new Container(xml);
				return this.resolve(this.container.packagePath);
			});
		}
		/**
		* Open the Open Packaging Format Xml
		* @private
		* @param  {string} url
		* @return {Promise}
		*/
		openPackaging(url) {
			this.path = new Path(url);
			return this.load(url, "xml").then((xml) => {
				this.packaging = new Packaging(xml);
				return this.unpack(this.packaging);
			});
		}
		/**
		* Open the manifest JSON
		* @private
		* @param  {string} url
		* @return {Promise}
		*/
		openManifest(url) {
			this.path = new Path(url);
			return this.load(url, "json").then((json) => {
				this.packaging = new Packaging();
				this.packaging.load(json);
				return this.unpack(this.packaging);
			});
		}
		load(path, _type) {
			var resolved = this.resolve(path);
			if (this.archived) return this.archive.request(resolved, _type || void 0);
			else return this.request(resolved, _type || null, this.settings.requestCredentials, this.settings.requestHeaders);
		}
		/**
		* Resolve a path to it's absolute position in the Book
		* @param  {string} path
		* @param  {boolean} [absolute] force resolving the full URL
		* @return {string}          the resolved path string
		*/
		resolve(path, absolute) {
			if (!path) return;
			var resolved = path;
			if (path.indexOf("://") > -1) return path;
			if (this.path) resolved = this.path.resolve(path);
			if (absolute != false && this.url) resolved = this.url.resolve(resolved);
			return resolved;
		}
		/**
		* Get a canonical link to a path
		* @param  {string} path
		* @return {string} the canonical path string
		*/
		canonical(path) {
			var url = path;
			if (!path) return "";
			if (this.settings.canonical) url = this.settings.canonical(path);
			else url = this.resolve(path, true) || "";
			return url;
		}
		/**
		* Determine the type of they input passed to open
		* @private
		* @param  {string} input
		* @return {string}  binary | directory | epub | opf
		*/
		determineType(input) {
			var url;
			var path;
			var extension;
			if (this.settings.encoding === "base64") return INPUT_TYPE.BASE64;
			if (typeof input != "string") return INPUT_TYPE.BINARY;
			url = new Url(input);
			path = url.path();
			extension = path.extension;
			if (extension) extension = extension.replace(/\?.*$/, "");
			if (!extension) return INPUT_TYPE.DIRECTORY;
			if (extension === "epub") return INPUT_TYPE.EPUB;
			if (extension === "opf") return INPUT_TYPE.OPF;
			if (extension === "json") return INPUT_TYPE.MANIFEST;
		}
		/**
		* unpack the contents of the Books packaging
		* @private
		* @param {Packaging} packaging object
		*/
		unpack(packaging) {
			this.package = packaging;
			if (this.packaging.metadata.layout === "") this.load(this.url.resolve(IBOOKS_DISPLAY_OPTIONS_PATH), "xml").then((xml) => {
				this.displayOptions = new DisplayOptions(xml);
				this.loading.displayOptions.resolve(this.displayOptions);
			}).catch((_err) => {
				this.displayOptions = new DisplayOptions();
				this.loading.displayOptions.resolve(this.displayOptions);
			});
			else {
				this.displayOptions = new DisplayOptions();
				this.loading.displayOptions.resolve(this.displayOptions);
			}
			this.spine.unpack(this.packaging, this.resolve.bind(this), this.canonical.bind(this));
			this.resources = new Resources(this.packaging.manifest, {
				archive: this.archive,
				resolver: this.resolve.bind(this),
				request: this.request.bind(this),
				replacements: this.settings.replacements || (this.archived ? "blobUrl" : "base64")
			});
			this.loadNavigation(this.packaging).then(() => {
				this.loading.navigation.resolve(this.navigation);
			});
			if (this.packaging.coverPath) this.cover = this.resolve(this.packaging.coverPath);
			this.loading.manifest.resolve(this.packaging.manifest);
			this.loading.metadata.resolve(this.packaging.metadata);
			this.loading.spine.resolve(this.spine);
			this.loading.cover.resolve(this.cover);
			this.loading.resources.resolve(this.resources);
			this.loading.pageList.resolve(this.pageList);
			this.isOpen = true;
			if (this.archived || this.settings.replacements && this.settings.replacements != "none") this.replacements().then(() => {
				this.loaded.displayOptions.then(() => {
					this.opening.resolve(this);
				});
			}).catch((err) => {
				console.error(err);
			});
			else this.loaded.displayOptions.then(() => {
				this.opening.resolve(this);
			});
		}
		/**
		* Load Navigation and PageList from package
		* @private
		* @param {Packaging} packaging
		*/
		loadNavigation(packaging) {
			let navPath = packaging.navPath || packaging.ncxPath;
			let toc = packaging.toc;
			if (toc) return new Promise((resolve) => {
				this.navigation = new Navigation(toc);
				if (packaging.pageList) this.pageList = new PageList(packaging.pageList);
				resolve(this.navigation);
			});
			if (!navPath) return new Promise((resolve) => {
				this.navigation = new Navigation();
				this.pageList = new PageList();
				resolve(this.navigation);
			});
			return this.load(navPath, "xml").then((xml) => {
				this.navigation = new Navigation(xml);
				this.pageList = new PageList(xml);
				return this.navigation;
			});
		}
		/**
		* Gets a Section of the Book from the Spine
		* Alias for `book.spine.get`
		* @param {string} target
		* @return {Section}
		*/
		section(target) {
			return this.spine.get(target);
		}
		/**
		* Sugar to render a book to an element
		* @param  {element | string} element element or string to add a rendition to
		* @param  {object} [options]
		* @return {Rendition}
		*/
		renderTo(element, options) {
			this.rendition = new Rendition(this, options);
			this.rendition.attachTo(element);
			return this.rendition;
		}
		/**
		* Set if request should use withCredentials
		* @param {boolean} credentials
		*/
		setRequestCredentials(credentials) {
			this.settings.requestCredentials = credentials;
		}
		/**
		* Set headers request should use
		* @param {object} headers
		*/
		setRequestHeaders(headers) {
			this.settings.requestHeaders = headers;
		}
		/**
		* Unarchive a zipped epub
		* @private
		* @param  {binary} input epub data
		* @param  {string} [encoding]
		* @return {Archive}
		*/
		unarchive(input, encoding) {
			this.archive = new Archive();
			return this.archive.open(input, encoding);
		}
		/**
		* Store the epubs contents
		* @private
		* @param  {binary} input epub data
		* @param  {string} [encoding]
		* @return {Store}
		*/
		store(name) {
			let replacementsSetting = this.settings.replacements && this.settings.replacements !== "none";
			let originalUrl = this.url;
			let requester = this.settings.requestMethod || request.bind(this);
			this.storage = new Store(name, requester, this.resolve.bind(this));
			this.request = this.storage.request.bind(this.storage);
			this.opened.then(() => {
				if (this.archived) this.storage.requester = this.archive.request.bind(this.archive);
				let substituteResources = (output, section) => {
					section.output = this.resources.substitute(output, section.url);
				};
				this.resources.settings.replacements = replacementsSetting || "blobUrl";
				this.resources.replacements().then(() => {
					return this.resources.replaceCss();
				});
				this.storage.on("offline", () => {
					this.url = new Url("/", "");
					this.spine.hooks.serialize.register(substituteResources);
				});
				this.storage.on("online", () => {
					this.url = originalUrl;
					this.spine.hooks.serialize.deregister(substituteResources);
				});
			});
			return this.storage;
		}
		/**
		* Get the cover url
		* @return {Promise<?string>} coverUrl
		*/
		coverUrl() {
			return this.loaded.cover.then(() => {
				if (!this.cover) return null;
				if (this.archived) return this.archive.createUrl(this.cover);
				else return this.cover;
			});
		}
		/**
		* Load replacement urls
		* @private
		* @return {Promise} completed loading urls
		*/
		replacements() {
			this.spine.hooks.serialize.register((output, section) => {
				section.output = this.resources.substitute(output, section.url);
			});
			return this.resources.replacements().then(() => {
				return this.resources.replaceCss();
			});
		}
		/**
		* Find a DOM Range for a given CFI Range
		* @param  {EpubCFI} cfiRange a epub cfi range
		* @return {Promise}
		*/
		getRange(cfiRange) {
			var cfi = new EpubCFI(cfiRange);
			var item = this.spine.get(cfi.spinePos);
			var _request = this.load.bind(this);
			if (!item) return new Promise((resolve, reject) => {
				reject("CFI could not be found");
			});
			return item.load(_request).then(function(_contents) {
				return cfi.toRange(item.document);
			});
		}
		/**
		* Generates the Book Key using the identifier in the manifest or other string provided
		* @param  {string} [identifier] to use instead of metadata identifier
		* @return {string} key
		*/
		key(identifier) {
			return `epubjs:0.3:${identifier || this.packaging.metadata.identifier || this.url.filename}`;
		}
		/**
		* Destroy the Book and all associated objects
		*/
		destroy() {
			this.opened = void 0;
			this.loading = void 0;
			this.loaded = void 0;
			this.ready = void 0;
			this.isOpen = false;
			this.isRendered = false;
			this.spine && this.spine.destroy();
			this.locations && this.locations.destroy();
			this.pageList && this.pageList.destroy();
			this.archive && this.archive.destroy();
			this.resources && this.resources.destroy();
			this.container && this.container.destroy();
			this.packaging && this.packaging.destroy();
			this.rendition && this.rendition.destroy();
			this.displayOptions && this.displayOptions.destroy();
			this.spine = void 0;
			this.locations = void 0;
			this.pageList = void 0;
			this.archive = void 0;
			this.resources = void 0;
			this.container = void 0;
			this.packaging = void 0;
			this.rendition = void 0;
			this.navigation = void 0;
			this.url = void 0;
			this.path = void 0;
			this.archived = false;
		}
	};
	(0, import_event_emitter.default)(Book.prototype);
	//#endregion
	//#region src/utils/core.ts
	/**
	* Core Utilities and Helpers
	* @module Core
	*/
	var core_exports = /* @__PURE__ */ __exportAll({
		RangeObject: () => RangeObject,
		blob2base64: () => blob2base64,
		borders: () => borders,
		bounds: () => bounds,
		createBase64Url: () => createBase64Url,
		createBlob: () => createBlob,
		createBlobUrl: () => createBlobUrl,
		defaults: () => defaults,
		defer: () => defer,
		documentHeight: () => documentHeight,
		extend: () => extend,
		filterChildren: () => filterChildren,
		findChildren: () => findChildren,
		getParentByTagName: () => getParentByTagName,
		indexOfElementNode: () => indexOfElementNode,
		indexOfNode: () => indexOfNode,
		indexOfSorted: () => indexOfSorted,
		indexOfTextNode: () => indexOfTextNode,
		insert: () => insert,
		isElement: () => isElement,
		isFloat: () => isFloat,
		isNumber: () => isNumber,
		isXml: () => isXml,
		locationOf: () => locationOf,
		nodeBounds: () => nodeBounds,
		parents: () => parents,
		parse: () => parse,
		prefixed: () => prefixed,
		qs: () => qs,
		qsa: () => qsa,
		qsp: () => qsp,
		querySelectorByType: () => querySelectorByType,
		requestAnimationFrame: () => requestAnimationFrame$1,
		revokeBlobUrl: () => revokeBlobUrl,
		sprint: () => sprint,
		treeWalker: () => treeWalker,
		type: () => type,
		uuid: () => uuid,
		walk: () => walk,
		windowBounds: () => windowBounds
	});
	/**
	* Vendor prefixed requestAnimationFrame
	* @returns {function} requestAnimationFrame
	* @memberof Core
	*/
	var requestAnimationFrame$1 = requestAnimationFrame$2;
	/**
	* Generates a UUID
	* based on: http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
	* @returns {string} uuid
	* @memberof Core
	*/
	function uuid() {
		return uuid$1();
	}
	/**
	* Gets the height of a document
	* @returns {number} height
	* @memberof Core
	*/
	function documentHeight() {
		return documentHeight$1();
	}
	/**
	* Checks if a node is an element
	* @param {object} obj
	* @returns {boolean}
	* @memberof Core
	*/
	function isElement(obj) {
		return isElement$1(obj);
	}
	/**
	* @param {any} n
	* @returns {boolean}
	* @memberof Core
	*/
	function isNumber(n) {
		return isNumber$1(n);
	}
	/**
	* @param {any} n
	* @returns {boolean}
	* @memberof Core
	*/
	function isFloat(n) {
		return isFloat$1(n);
	}
	/**
	* Get a prefixed css property
	* @param {string} unprefixed
	* @returns {string}
	* @memberof Core
	*/
	function prefixed(unprefixed) {
		return prefixed$1(unprefixed);
	}
	/**
	* Apply defaults to an object
	* @param {object} obj
	* @returns {object}
	* @memberof Core
	*/
	function defaults(obj, ..._sources) {
		return defaults$1.apply(null, arguments);
	}
	/**
	* Extend properties of an object
	* @param {object} target
	* @returns {object}
	* @memberof Core
	*/
	function extend(target, ..._sources) {
		return extend$1.apply(null, arguments);
	}
	/**
	* Fast quicksort insert for sorted array -- based on:
	*  http://stackoverflow.com/questions/1344500/efficient-way-to-insert-a-number-into-a-sorted-array-of-numbers
	* @param {any} item
	* @param {array} array
	* @param {function} [compareFunction]
	* @returns {number} location (in array)
	* @memberof Core
	*/
	function insert(item, array, compareFunction) {
		return insert$1(item, array, compareFunction);
	}
	/**
	* Finds where something would fit into a sorted array
	* @param {any} item
	* @param {array} array
	* @param {function} [compareFunction]
	* @param {function} [_start]
	* @param {function} [_end]
	* @returns {number} location (in array)
	* @memberof Core
	*/
	function locationOf(item, array, compareFunction, _start, _end) {
		return locationOf$1(item, array, compareFunction, _start, _end);
	}
	/**
	* Finds index of something in a sorted array
	* Returns -1 if not found
	* @param {any} item
	* @param {array} array
	* @param {function} [compareFunction]
	* @param {function} [_start]
	* @param {function} [_end]
	* @returns {number} index (in array) or -1
	* @memberof Core
	*/
	function indexOfSorted(item, array, compareFunction, _start, _end) {
		return indexOfSorted$1(item, array, compareFunction, _start, _end);
	}
	/**
	* Find the bounds of an element
	* taking padding and margin into account
	* @param {element} el
	* @returns {{ width: Number, height: Number}}
	* @memberof Core
	*/
	function bounds(el) {
		return bounds$1(el);
	}
	/**
	* Find the bounds of an element
	* taking padding, margin and borders into account
	* @param {element} el
	* @returns {{ width: Number, height: Number}}
	* @memberof Core
	*/
	function borders(el) {
		return borders$1(el);
	}
	/**
	* Find the bounds of any node
	* allows for getting bounds of text nodes by wrapping them in a range
	* @param {node} node
	* @returns {BoundingClientRect}
	* @memberof Core
	*/
	function nodeBounds(node) {
		return nodeBounds$1(node);
	}
	/**
	* Find the equivalent of getBoundingClientRect of a browser window
	* @returns {{ width: Number, height: Number, top: Number, left: Number, right: Number, bottom: Number }}
	* @memberof Core
	*/
	function windowBounds() {
		return windowBounds$1();
	}
	/**
	* Gets the index of a node in its parent
	* @param {Node} node
	* @param {string} typeId
	* @return {number} index
	* @memberof Core
	*/
	function indexOfNode(node, typeId) {
		return indexOfNode$1(node, typeId);
	}
	/**
	* Gets the index of a text node in its parent
	* @param {node} textNode
	* @returns {number} index
	* @memberof Core
	*/
	function indexOfTextNode(textNode) {
		return indexOfTextNode$1(textNode);
	}
	/**
	* Gets the index of an element node in its parent
	* @param {element} elementNode
	* @returns {number} index
	* @memberof Core
	*/
	function indexOfElementNode(elementNode) {
		return indexOfElementNode$1(elementNode);
	}
	/**
	* Check if extension is xml
	* @param {string} ext
	* @returns {boolean}
	* @memberof Core
	*/
	function isXml(ext) {
		return isXml$1(ext);
	}
	/**
	* Create a new blob
	* @param {any} content
	* @param {string} mime
	* @returns {Blob}
	* @memberof Core
	*/
	function createBlob(content, mime) {
		return createBlob$1(content, mime);
	}
	/**
	* Create a new blob url
	* @param {any} content
	* @param {string} mime
	* @returns {string} url
	* @memberof Core
	*/
	function createBlobUrl(content, mime) {
		return createBlobUrl$1(content, mime);
	}
	/**
	* Remove a blob url
	* @param {string} url
	* @memberof Core
	*/
	function revokeBlobUrl(url) {
		return revokeBlobUrl$1(url);
	}
	/**
	* Create a new base64 encoded url
	* @param {any} content
	* @param {string} mime
	* @returns {string} url
	* @memberof Core
	*/
	function createBase64Url(content, mime) {
		return createBase64Url$1(content, mime);
	}
	/**
	* Get type of an object
	* @param {object} obj
	* @returns {string} type
	* @memberof Core
	*/
	function type(obj) {
		return type$1(obj);
	}
	/**
	* Parse xml (or html) markup
	* @param {string} markup
	* @param {string} mime
	* @param {boolean} forceXMLDom force using xmlDom to parse instead of native parser
	* @returns {document} document
	* @memberof Core
	*/
	function parse(markup, mime, forceXMLDom) {
		return parseMarkup(markup, mime, forceXMLDom);
	}
	/**
	* querySelector polyfill
	* @param {element} el
	* @param {string} sel selector string
	* @returns {element} element
	* @memberof Core
	*/
	function qs(el, sel) {
		return qs$1(el, sel);
	}
	/**
	* querySelectorAll polyfill
	* @param {element} el
	* @param {string} sel selector string
	* @returns {element[]} elements
	* @memberof Core
	*/
	function qsa(el, sel) {
		return qsa$1(el, sel);
	}
	/**
	* querySelector by property
	* @param {element} el
	* @param {string} sel selector string
	* @param {object[]} props
	* @returns {element[]} elements
	* @memberof Core
	*/
	function qsp(el, sel, props) {
		return qsp$1(el, sel, props);
	}
	/**
	* Sprint through all text nodes in a document
	* @memberof Core
	* @param  {element} root element to start with
	* @param  {function} func function to run on each element
	*/
	function sprint(root, func) {
		return sprint$1(root, func);
	}
	/**
	* Create a treeWalker
	* @memberof Core
	* @param  {element} root element to start with
	* @param  {function} func function to run on each element
	* @param  {function | object} filter function or object to filter with
	*/
	function treeWalker(root, func, filter) {
		return treeWalker$1(root, func, filter);
	}
	/**
	* @memberof Core
	* @param {node} node
	* @param {callback} return false for continue,true for break inside callback
	*/
	function walk(node, callback) {
		return walk$1(node, callback);
	}
	/**
	* Convert a blob to a base64 encoded string
	* @param {Blob} blob
	* @returns {Promise<string | ArrayBuffer | null>}
	* @memberof Core
	*/
	function blob2base64(blob) {
		return blobToBase64(blob);
	}
	/**
	* Creates a new pending promise and provides methods to resolve or reject it.
	* From: https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/Promise.jsm/Deferred#backwards_forwards_compatible
	* @memberof Core
	*/
	function defer() {
		defer$1.call(this);
	}
	/**
	* querySelector with filter by epub type
	* @param {element} html
	* @param {string} element element type to find
	* @param {string} type epub type to find
	* @returns {element[]} elements
	* @memberof Core
	*/
	function querySelectorByType(html, element, type) {
		return querySelectorByType$1(html, element, type);
	}
	/**
	* Find direct descendents of an element
	* @param {element} el
	* @returns {element[]} children
	* @memberof Core
	*/
	function findChildren(el) {
		return findChildren$1(el);
	}
	/**
	* Find all parents (ancestors) of an element
	* @param {element} node
	* @returns {element[]} parents
	* @memberof Core
	*/
	function parents(node) {
		return parents$1(node);
	}
	/**
	* Find all direct descendents of a specific type
	* @param {element} el
	* @param {string} nodeName
	* @param {boolean} [single]
	* @returns {element[]} children
	* @memberof Core
	*/
	function filterChildren(el, nodeName, single) {
		return filterChildren$1(el, nodeName, single);
	}
	/**
	* Filter all parents (ancestors) with tag name
	* @param {element} node
	* @param {string} tagname
	* @returns {element[]} parents
	* @memberof Core
	*/
	function getParentByTagName(node, tagname) {
		return getParentByTagName$1(node, tagname);
	}
	/**
	* Lightweight Polyfill for DOM Range
	* @class
	* @memberof Core
	*/
	var RangeObject = class extends RangeObject$1 {};
	//#endregion
	//#region src/epub.ts
	/**
	* Creates a new Book
	* @param {string|ArrayBuffer} url URL, Path or ArrayBuffer
	* @param {object} options to pass to the book
	* @returns {Book} a new Book object
	* @example ePub("/path/to/book.epub", {})
	*/
	var ePub = function(url, options) {
		if (typeof options === "undefined" && typeof url !== "string" && url instanceof Blob === false && url instanceof ArrayBuffer === false) return new Book(url);
		return new Book(url, options);
	};
	ePub.VERSION = "0.3";
	globalThis.EPUBJS_VERSION = "0.3";
	ePub.Book = Book;
	ePub.Rendition = Rendition;
	ePub.Contents = Contents;
	ePub.CFI = EpubCFI;
	ePub.utils = core_exports;
	//#endregion
	return ePub;
});

//# sourceMappingURL=epub.js.map