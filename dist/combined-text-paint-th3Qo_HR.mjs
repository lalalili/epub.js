// src/rendering/combined-text-paint.ts
var e = /* @__PURE__ */ new WeakMap();
function t(t) {
	let r = t.body;
	if (!r) return {
		markup: "",
		normalizedHints: 0
	};
	let i = e.get(t);
	if (!i?.size) return {
		markup: r.innerHTML,
		normalizedHints: 0
	};
	let a = r.cloneNode(!0), o = [r, ...r.querySelectorAll("*")], s = [a, ...a.querySelectorAll("*")], c = 0;
	for (let [e, t] of i) {
		let r = o.indexOf(e);
		r < 0 || e.style.willChange !== t.applied || e.style.getPropertyPriority("will-change") !== "important" || (n(s[r], t), c++);
	}
	return {
		markup: a.innerHTML,
		normalizedHints: c
	};
}
function n(e, t) {
	e.style.willChange === t.applied && e.style.getPropertyPriority("will-change") === "important" && (t.value ? e.style.setProperty("will-change", t.value, t.priority) : e.style.removeProperty("will-change"), !t.hadStyle && e.getAttribute("style") === "" && e.removeAttribute("style"));
}
function r(t, r) {
	let i = t.defaultView;
	if (!i || !t.body) return 0;
	let a = e.get(t) || /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Set();
	if (/Chrome|Chromium/.test(i.navigator.userAgent) && i.getComputedStyle(t.body).writingMode === "vertical-rl") for (let e of t.body.querySelectorAll("*")) {
		if (i.getComputedStyle(e).getPropertyValue("text-combine-upright") !== "all") continue;
		let t = e.getBoundingClientRect();
		t.width > 0 && t.height > 0 && t.left >= r.left && t.right <= r.right && t.top >= r.top && t.bottom <= r.bottom && o.add(e);
	}
	for (let [e, t] of a) o.has(e) || (n(e, t), a.delete(e));
	let s = 0;
	for (let e of o) {
		if (a.has(e)) continue;
		let t = i.getComputedStyle(e).willChange;
		if (t.split(",").some((e) => e.trim() === "contents")) continue;
		let n = t === "auto" ? "contents" : `${t}, contents`;
		a.set(e, {
			value: e.style.getPropertyValue("will-change"),
			priority: e.style.getPropertyPriority("will-change"),
			applied: n,
			hadStyle: e.hasAttribute("style")
		}), e.style.setProperty("will-change", n, "important"), s++;
	}
	return e.set(t, a), s;
}
export { r as n, t };

//# sourceMappingURL=combined-text-paint-th3Qo_HR.mjs.map