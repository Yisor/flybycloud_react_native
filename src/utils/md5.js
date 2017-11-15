import MD5 from 'react-native-md5'

/**
 * MD5签名
 * @param params 提交参数
 * @returns {string} 签名
 */
const md5 = (params) => {
  return MD5.hex_md5(sign);
}