import { Dimensions, PixelRatio, Platform } from 'react-native';

export default {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
  onePixel: 1 / PixelRatio.get(),
  tabBarHeight: 49,
  navBarHeight: (Platform.OS === 'ios' ? 64 : 44)
}