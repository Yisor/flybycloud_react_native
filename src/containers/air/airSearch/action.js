'use strict';
import * as TYPES from './actionTypes';

export const ticketQuery = data => ({ 'type': TYPES.TICKET_QUERY, 'data': data })