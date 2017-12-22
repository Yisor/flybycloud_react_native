'use strict';
import * as TYPES from './actionTypes';

export const queryRefundDetail = data => ({ 'type': TYPES.QUERY_REFUND_DETAIL, 'data': data })