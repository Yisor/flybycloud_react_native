/**
 * Created by feiba on 2017/11/21.
 */

/**
 * 当月的有多少天
 * @param date
 * @returns {number}
 */
function numberOfDaysInCurrentMonth(date) {
	if (date && (date instanceof Date)) {
		let d = new Date(date.getFullYear(),date.getMonth() + 1,0);
		return d.getDate();
	}
	return 0;
}

/**
 * 当月的第一天是星期几
 * @param date
 */
function getWeekFirstDayOfTheMonth(date) {
	if (date && (date instanceof Date)) {
		let d = new Date(date.getFullYear(),date.getMonth(),1);
		return d.getDay()
	}
}

/**
 * 上月的日期信息
 * @param date
 * @returns {Array}
 */
function getDayInfoOfPreMonth(date = new Date()) {
	let preDates = [];
	const week = getWeekFirstDayOfTheMonth(date);
	if (week === 0) return [];
	const preLastDate = new Date(date.getFullYear(),date.getMonth(),0);//上个月的最后一天
	const preMonthDayCount = preLastDate.getDate();//上个月的总天数
	for (let i = preMonthDayCount - week; i < preMonthDayCount; i++) {
		let d = new Date(date.getFullYear(),date.getMonth()-1,i+1);
		preDates.push({
			year: d.getFullYear(),
			month: d.getMonth(),
			day: d.getDate(),
			week: d.getDay(),
			dayType: 'none'
		});
	}
	return preDates;
}

/**
 * 当月的日期信息
 * @param date
 */
function getDayInfoOfCurrentMonth(date = new Date()) {
	let currentDate = [];
	let lastDate = new Date(date.getFullYear(), date.getMonth()+1, 0);
	let dayType = 'normal';
	for (let i = 1; i <= lastDate.getDate(); i++) {
		let d = new Date(date.getFullYear(), date.getMonth(), i);
		currentDate.push({
			year: d.getFullYear(),
			month: d.getMonth(),
			day: d.getDate(),
			week: d.getDay(),
			dayType: dayType
		})
	}
}

/**
 * 获取星期
 * @param isEng
 * @returns {[string,string,string,string,string,string,string]}
 */
function getWeeks(isEng = false) {
	if (isEng) {
		return ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
	}
	return ['日','一','二','三','四','五','六'];
}

