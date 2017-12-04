'use strict';
import * as TYPES from './actionTypes';

export const queryAddress = () => ({ 'type': TYPES.ADDRESS_QUERY })

export const addAddr = () => ({ 'type': TYPES.ADDRESS_ADD })

export const updateAddr = () => ({ 'type': TYPES.ADDRESS_UPDATE })

export const deleteAddr = () => ({ 'type': TYPES.ADDRESS_DELETE })