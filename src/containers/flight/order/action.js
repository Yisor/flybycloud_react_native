'use strict';
import * as TYPES from './actionTypes';

export const auditingQuery = () => ({ 'type': TYPES.AUDITING_QUERY })

export const costCenterQuery = () => ({ 'type': TYPES.COST_CENTER_QUERY })

export const insuranceQuery = () => ({ 'type': TYPES.INSURANCE_QUERY })

export const insuranceChecked = (params) => ({ 'type': TYPES.INSURANCE_CHECKED, data: params })