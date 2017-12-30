import dateUtils from '../../../../utils/dateUtils';

const weekDays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

export function getCalendarTxt(date) {
  let today = dateUtils.dateFormat(date).slice(5, 11);
  let weekday = date.getDay();
  return `${today} ${weekDays[weekday]}`;
}

/**
 * 日期格式化 'YYYY-MM-DD'
 * 
 * @export
 * @param {any} date 
 * @returns 
 */
export function dateFormat(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const monthStr = month < 10 ? `0${month}` : `${month}`
  const dayStr = day < 10 ? `0${day}` : `${day}`

  return `${year}-${monthStr}-${dayStr}`
}