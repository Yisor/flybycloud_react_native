'use strict';
import * as TYPES from './actionTypes';

export const flightQuery = data => ({ 'type': TYPES.FLIGHT_QUERY, 'data': data })

export const airlineQuery = data => ({ 'type': TYPES.AIRLINE_QUERY })

export const flightDescByTime = data => ({ 'type': TYPES.TIME_DESC_ORDER, 'data': data })

export const flightDescByPrice = data => ({ 'type': TYPES.PRICE_DESC_ORDER, 'data': data })