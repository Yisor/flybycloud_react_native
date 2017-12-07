'use strict';
import * as TYPES from './actionTypes';

export const fetchFillOrderData = () => ({ 'type': TYPES.FETCH_FILL_ORDER_DATA })

export const insuranceChecked = (params) => ({ 'type': TYPES.INSURANCE_CHECKED, data: params })

export const auditingQuery = () => ({ 'type': TYPES.AUDITING_QUERY })

export const costCenterQuery = () => ({ 'type': TYPES.COST_CENTER_QUERY })

export const insuranceQuery = () => ({ 'type': TYPES.INSURANCE_QUERY })