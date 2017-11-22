'use strict';
import * as TYPES from './actionTypes';

export const flightQuery = data => ({ 'type': TYPES.FLIGHT_QUERY, 'data': data })