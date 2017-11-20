import MD5 from 'react-native-md5'
import apiUrl from '../constants/apiUrl';
import constants from '../constants/constants';

/**
 * 请求头
 * @type {{appId: string, appVersion: string, appType: string, token: string}}
 */
const Headers = {
  'Content-Type': 'application/json',
  'appId': '111',
  'appVersion': '1.0.1',
  'appType': constants.appType,
  'token': ''
}

/**
 *
 * @param api 接口名称
 * @returns {Promise.<U>|Promise.<T>}
 */
export const get = (api) => {
  let url = apiUrl.baseUrl + api;
  console.log('路径：' + url);
  Headers.ts = getTs()
  Headers.sign = getSign(api)
  Headers.token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0bWNJZCI6MTExLCJjb3JwSWQiOjEwNTIsInVzZXJJZCI6MTExMTE2MzQyLCJ0cyI6MTUxMTE2ODQ5OTk2Nn0.5K0LyYPM_m7h45Lg8Sk0N3srxiCMnfBR4UkTIckvgmk'
  return fetch(url, {
    method: 'GET',
    headers: Headers
  })
    .then((response) => response.json())
    .then((json) => {
      console.log('返回数据：' + JSON.stringify(json));
      return json
    })
    .catch((error) => { return { code: error.code, data: null, message: error.message } })
}

/**
 *
 * @param api 接口名称
 * @param params 提交参数
 * @returns {Promise.<U>|Promise.<T>}
 */
export const post = (api, params) => {
  let url = apiUrl.baseUrl + api;
  console.log('参数：' + JSON.stringify(params));
  let tempParams = JSON.parse(JSON.stringify(params));
  Headers.ts = getTs()
  Headers.sign = getSign(api, tempParams)
  return fetch(url, {
    method: 'POST',
    headers: Headers,
    body: JSON.stringify(params)
  })
    .then((response) => response.json())
    .then((json) => { return json })
    .catch((error) => { return { code: error.code, data: null, message: error.message } })
}

/**
 * MD5签名
 * @param api 接口名称
 * @param params 提交参数
 * @returns {string} 签名
 */
const getSign = (api, params) => {
  var sign = api;
  var allParams = params ? Object.assign(params, Headers) : Headers;
  //清空value为对象的值
  for (let props in allParams) {
    if ((props instanceof Object) === true) {
      allParams[props] = '';
    }
  }
  for (let key in allParams) {
    let keyValue = key + '=' + allParams[key];
    sign += keyValue;
  }

  return MD5.hex_md5(sign);
}

/**
 * 时间戳
 * @returns {number}
 */
const getTs = () => {
  return new Date().getTime()
}