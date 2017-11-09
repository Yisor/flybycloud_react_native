'use strict';

import { Alert } from 'react-native';

import * as TYPES from './types';

//  login
export function login(opt) {
  return {
    'type': TYPES.LOGGED_IN,
    'user': opt,
  }
}