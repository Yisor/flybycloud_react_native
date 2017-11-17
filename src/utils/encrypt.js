/**
 * 加密相关
 */
import { NativeModules } from 'react-native';
import MD5 from 'react-native-md5'

const RSA = NativeModules.Encrypt;

export default {
	MD5,
	RSA
}