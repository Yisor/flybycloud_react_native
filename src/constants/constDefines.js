import { Platform } from 'react-native';
/**
 *  app类型
 */
export const appType = Platform.OS === 'ios' ? 2 : 1;

export const storeUserKey = 'store_user_key';

export const flightMarkerKey = 'flight_marker_key';// 1去、2返