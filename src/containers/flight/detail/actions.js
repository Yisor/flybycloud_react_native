'use strict';
import * as TYPES from './actionTypes';

export const flightDetailQuery = flightId => ({ 'type': TYPES.FLIGHT_DETAIL_QUERY, 'data': flightId })