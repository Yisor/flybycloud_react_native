'use strict';
import * as TYPES from './types';

export const login = data => ({ 'type': TYPES.LOGGED_IN, 'user': data })

