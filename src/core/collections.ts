type MutableRecord = Record<string, unknown>;
type CompareResult = number | undefined;
type CompareFunction<T> = (a: T, b: T) => CompareResult;

function defaultCompare<T>(a: T, b: T): CompareResult {
	if (a > b) {
		return 1;
	}
	if (a < b) {
		return -1;
	}
	if (a == b) {
		return 0;
	}
}

/**
 * Apply defaults to an object.
 * @param {object} obj Target object.
 * @returns {object} Target object with defaults applied.
 */
export function defaults<T extends MutableRecord>(obj: T, ..._sources: MutableRecord[]): T;
/**
 * Apply defaults to an object.
 * @param {object} obj Target object.
 * @returns {object} Target object with defaults applied.
 */
export function defaults<T extends MutableRecord>(obj: T): T {
	var target: MutableRecord = obj;

	for (var i = 1, length = arguments.length; i < length; i++) {
		var source = arguments[i] as MutableRecord;
		for (var prop in source) {
			if (target[prop] === void 0) {
				target[prop] = source[prop];
			}
		}
	}
	return obj;
}

/**
 * Extend properties of an object.
 * @param {object} target Target object.
 * @returns {object} Target object with copied descriptors.
 */
export function extend<T extends object>(target: T, ..._sources: Array<object | null | undefined>): T {
	var sources = Array.prototype.slice.call(arguments, 1) as Array<object | null | undefined>;

	sources.forEach(function(source) {
		if (!source) {
			return;
		}
		Object.getOwnPropertyNames(source).forEach(function(propName) {
			Object.defineProperty(target, propName, Object.getOwnPropertyDescriptor(source, propName)!);
		});
	});
	return target;
}

/**
 * Fast quicksort insert for sorted array.
 * @param {T} item Item to insert.
 * @param {array} array Sorted array.
 * @param {function} [compareFunction] Optional compare function.
 * @returns {number} Inserted index.
 */
export function insert<T>(item: T, array: T[], compareFunction?: CompareFunction<T>): number {
	var location = locationOf(item, array, compareFunction);
	array.splice(location, 0, item);

	return location;
}

/**
 * Finds where something would fit into a sorted array.
 * @param {T} item Item to locate.
 * @param {array} array Sorted array.
 * @param {function} [compareFunction] Optional compare function.
 * @param {function} [_start] Start index.
 * @param {function} [_end] End index.
 * @returns {number} Location in array.
 */
export function locationOf<T>(
	item: T,
	array: T[],
	compareFunction?: CompareFunction<T>,
	_start?: number,
	_end?: number
): number {
	var start = _start || 0;
	var end = _end || array.length;
	var pivot = parseInt(String(start + (end - start) / 2));
	var compared;

	if (!compareFunction) {
		compareFunction = defaultCompare;
	}

	if (end - start <= 0) {
		return pivot;
	}

	compared = compareFunction(array[pivot], item);
	if (end - start === 1) {
		return compared >= 0 ? pivot : pivot + 1;
	}
	if (compared === 0) {
		return pivot;
	}
	if (compared === -1) {
		return locationOf(item, array, compareFunction, pivot, end);
	} else {
		return locationOf(item, array, compareFunction, start, pivot);
	}
}

/**
 * Finds index of something in a sorted array.
 * @param {T} item Item to locate.
 * @param {array} array Sorted array.
 * @param {function} [compareFunction] Optional compare function.
 * @param {function} [_start] Start index.
 * @param {function} [_end] End index.
 * @returns {number} Index in array or -1.
 */
export function indexOfSorted<T>(
	item: T,
	array: T[],
	compareFunction?: CompareFunction<T>,
	_start?: number,
	_end?: number
): number {
	var start = _start || 0;
	var end = _end || array.length;
	var pivot = parseInt(String(start + (end - start) / 2));
	var compared;

	if (!compareFunction) {
		compareFunction = defaultCompare;
	}

	if (end - start <= 0) {
		return -1;
	}

	compared = compareFunction(array[pivot], item);
	if (end - start === 1) {
		return compared === 0 ? pivot : -1;
	}
	if (compared === 0) {
		return pivot;
	}
	if (compared === -1) {
		return indexOfSorted(item, array, compareFunction, pivot, end);
	} else {
		return indexOfSorted(item, array, compareFunction, start, pivot);
	}
}
