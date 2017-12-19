'use strict';
import * as TYPES from './actionTypes';

export const fetchFlightOrders = data => ({ 'type': TYPES.QUERY_FLIGHT_ORDER, 'data': data })

export const loadMoreOrders = data => ({ 'type': TYPES.LOAD_MORE_ORDER, 'data': data })