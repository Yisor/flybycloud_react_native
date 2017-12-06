'use strict';
import * as TYPES from './actionTypes';

export const login = data => ({ 'type': TYPES.LOGGED_IN, 'user': data })

export const logining = data => ({ 'type': TYPES.LOGGED_IN, 'user': data })

export const loginDone = data => ({ 'type': TYPES.LOGGED_DOING, data: data })