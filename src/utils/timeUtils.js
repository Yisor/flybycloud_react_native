
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
