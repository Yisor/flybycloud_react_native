import { Platform } from 'react-native';
export default {
  appType: (Platform.OS === 'ios' ? 2 : 1)
}