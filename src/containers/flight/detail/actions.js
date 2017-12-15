'use strict';
import * as TYPES from './actionTypes';

export const flightDetailQuery = data => ({ 'type': TYPES.FLIGHT_DETAIL_QUERY, 'data': data })

export const flightDetails = data => ({ 'type': TYPES.FLIGHT_DETAILS, 'data': data })

export const returnDetails = data => ({ 'type': TYPES.RETURN_DETAILS, 'data': data })