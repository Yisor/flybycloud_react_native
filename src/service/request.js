import { appType, baseUrl, userLogin } from '../constants/Urls';
import { md5 } from '../common/MD5';
const mock_url = 'http://www.baidu.com';
// let nowTime = (new Date()).valueOf()
// const httpHeader = {
//   'Accept': 'application/json',
//   'Content-Type': 'application/json',
//   'appId': '1',
//   'appVersion': '1.0.0.1',
//   'appType': appType,
//   'ts': nowTime,
//   'token': global.token,
// }

// export const request = (url, method = 'POST', headers, body) => {
//   return new Promise((resolve, reject) => {
//     fetch(url, {
//       method,
//       headers,
//       body
//     }).then((response) => {
//       result = response.json();
//       resolve(result);
//     }).catch((error) => {
//       reject(error);
//     });
//   });
// };

 request = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url).then((response) => {
      result = response.json();
      resolve(result);
    }).catch((error) => {
      reject(error);
    });
  });
};

export function login(url) {
  return request(mock_url);
}

