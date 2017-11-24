import { MD5 } from '../utils/encrypt';
import { appType } from '../constants/constDefines';

/**
 * 应用环境
 * @type {string}
 */
const baseUrl = 'http://mapi.flybycloud.com:8091'
const mockToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0bWNJZCI6MTExLCJjb3JwSWQiOjEwMDYsInVzZXJJZCI6MTE1NzcyLCJ0cyI6MTUxMTMzNTA4ODk1OX0.gELoJRf0GBLcLfaPdjS2CQmgag1IA5w3BzoZYwTEgtE';


/**
 * 请求头
 * @type {{appId: string, appVersion: string, appType: string, token: string}}
 */
const Headers = {
  'Content-Type': 'application/json',
  'appId': '111',
  'appVersion': '1.0.1',
  'appType': appType,
  'token': ''
}

/**
 *
 * @param api 接口名称
 * @returns {Promise.<U>|Promise.<T>}
 */
export const get = (api) => {
  let url = baseUrl + api;
  console.log('路径：' + url);
  Headers.ts = getTs()
  Headers.sign = getSign(api)
  Headers.token = mockToken
  return fetch(url, {
    method: 'GET',
    headers: Headers
  })
    .then((response) => response.json())
    .then((json) => { return json })
    .catch((error) => { return { code: error.code, data: null, message: error.message } })
}

/**
 *
 * @param api 接口名称
 * @param params 提交参数
 * @returns {Promise.<U>|Promise.<T>}
 */
export const post = (api, params) => {
  let url = baseUrl + api;
  console.log('参数：' + JSON.stringify(params));
  let tempParams = JSON.parse(JSON.stringify(params));//深拷贝
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
  let sign = api;
  let allParams = params ? Object.assign(params, Headers) : Headers;
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