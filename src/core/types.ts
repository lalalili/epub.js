/**
 * Checks if a node is an element
 * @param {unknown} obj Candidate object.
 * @returns {boolean} True when the object is an element node.
 */
export function isElement(obj: unknown): obj is Element {
	return !!(obj && typeof obj === "object" && "nodeType" in obj && obj.nodeType === 1);
}

/**
 * Checks if a value can be parsed as a finite number.
 * @param {unknown} n Candidate value.
 * @returns {boolean} True when the value is numeric.
 */
export function isNumber(n: unknown): boolean {
	return !isNaN(parseFloat(String(n))) && isFinite(Number(n));
}

/**
 * Checks if a value is a float.
 * @param {unknown} n Candidate value.
 * @returns {boolean} True when the value is numeric and has a decimal value.
 */
export function isFloat(n: unknown): boolean {
	var f = parseFloat(String(n));

	if (isNumber(n) === false) {
		return false;
	}

	if (typeof n === "string" && n.indexOf(".") > -1) {
		return true;
	}

	return Math.floor(f) !== f;
}

/**
 * Returns the JavaScript object type
 * @param {unknown} obj Candidate object.
 * @returns {string} Object type name.
 */
export function type(obj: unknown): string {
	return Object.prototype.toString.call(obj).slice(8, -1);
}
