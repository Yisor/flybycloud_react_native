'use strict';
import * as TYPES from './actionTypes';

export const ticketQuery = data => ({ 'type': TYPES.FLIGHT_QUERY, 'data': data })