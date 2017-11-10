'use strict';
import * as TYPES from './types';

//  login
// export function login(opt) {
//   return {
//     'type': TYPES.LOGGED_IN,
//     'user': opt,
//   }
// }

// es6写法
export const login = data => ({ 'type': TYPES.LOGGED_IN, 'user': data })

