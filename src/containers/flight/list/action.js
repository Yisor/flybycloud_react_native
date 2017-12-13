'use strict';
import * as TYPES from './actionTypes';

export const flightQuery = data => ({ 'type': TYPES.FLIGHT_QUERY, 'data': data })

export const airlineQuery = data => ({ 'type': TYPES.AIRLINE_QUERY })

export const flightSortUpTime = data => ({ 'type': TYPES.TIME_DESC_ORDER, 'data': data })

export const flightSortUpPrice = data => ({ 'type': TYPES.PRICE_DESC_ORDER, 'data': data })

export const flightFilterByTime = data => ({ 'type': TYPES.FILTER_BY_TIME, 'data': data })

export const flightFilterByAirline = data => ({ 'type': TYPES.FILTER_BY_AIRLINE, 'data': data })