/**
 * 加密相关
 */
import { NativeModules } from 'react-native';

export const MD5 = require('react-native-md5');
export const RSA = NativeModules.EncryptModule;

