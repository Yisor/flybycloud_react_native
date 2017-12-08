'use strict';
import * as TYPES from './actionTypes';

export const flightDetailQuery = data => ({ 'type': TYPES.FLIGHT_DETAIL_QUERY, 'data': data })