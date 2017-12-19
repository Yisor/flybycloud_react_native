
/**
 * 
 * @param {any} timeString 0623
 * @returns 格式化时间 06:23
 */
export const formatTime = (timeString) => {
  if (timeString) {
    let hour = timeString.substr(0, 2);
    let min = timeString.substr(2, 3);
    return `${hour}:${min}`;
  }
  return null;
}

/**
 * 
 * @param {any} time 02:25
 * @returns 2分25秒
 */
export const getTimeString = (time) => {
  if (time) {
    let data = time.split(':');
    return `${data[0]}小时${data[1]}分`;
  }
  return null;
}

//获取格式化后的日期(默认取当前时间)
export const getCurrentTime = (timestamp) => {
  if (timestamp) {
    return getFormatDate(timestamp);
  } else {
    // 获取当前时间戳
    const currentTimestamp = new Date().getTime();
    return getFormatDate(currentTimestamp);
  }
}

/*
 timeStr:时间，格式可为："September 16,2016 14:15:05、
 "September 16,2016"、"2016/09/16 14:15:05"、"2016/09/16"、
 '2014-04-23T18:55:49'和毫秒
 dateSeparator：年、月、日之间的分隔符，默认为"-"，
 timeSeparator：时、分、秒之间的分隔符，默认为":"
 */
export const getFormatDate = (timeStr, dateSeparator, timeSeparator) => {
  dateSeparator = dateSeparator ? dateSeparator : "-";
  timeSeparator = timeSeparator ? timeSeparator : ":";
  let date = new Date(timeStr),
    year = date.getFullYear(),// 获取完整的年份(4位,1970)
    month = date.getMonth(),// 获取月份(0-11,0代表1月,用的时候记得加上1)
    day = date.getDate(),// 获取日(1-31)
    hour = date.getHours(),// 获取小时数(0-23)
    minute = date.getMinutes(),// 获取分钟数(0-59)
    seconds = date.getSeconds(),// 获取秒数(0-59)
    Y = year + dateSeparator,
    M = ((month + 1) > 9 ? (month + 1) : ('0' + (month + 1))) + dateSeparator,
    D = (day > 9 ? day : ('0' + day)) + ' ',
    h = (hour > 9 ? hour : ('0' + hour)) + timeSeparator,
    m = (minute > 9 ? minute : ('0' + minute)) + timeSeparator,
    s = (seconds > 9 ? seconds : ('0' + seconds)),
    formatDate = Y + M + D + h + m + s;
  return formatDate;
}
