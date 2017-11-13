
import {
  Dimensions,
  PixelRatio,
} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const borderWidth = 1 / PixelRatio.get();

export {
  width,
  height,
  borderWidth,
};