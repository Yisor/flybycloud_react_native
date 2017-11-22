/**
 * Created by feiba on 2017/11/21.
 */

/**
 * 是否同月
 * @param a
 * @param b
 * @returns {boolean}
 */
function sameMonth(a, b) {
	return a instanceof Date && b instanceof Date &&
			a.getFullYear() === b.getFullYear() &&
			a.getMonth() === b.getMonth();
}

/**
 * 是否同天
 * @param a
 * @param b
 * @returns {boolean}
 */
function sameDate(a, b) {
	return a instanceof Date && b instanceof Date &&
			a.getFullYear() === b.getFullYear() &&
			a.getMonth() === b.getMonth() &&
			a.getDate() === b.getDate();
}

/**
 * a > b
 * @param a
 * @param b
 * @returns {boolean}
 */
function isGTE(a, b) {
	return b.diffDays(a) > -1;
}

/**
 * a < b
 * @param a
 * @param b
 * @returns {boolean}
 */
function isLTE(a, b) {
	return a.diffDays(b) > -1;
}

export default {
	sameMonth,
	sameDate,
	isGTE,
	isLTE
}

