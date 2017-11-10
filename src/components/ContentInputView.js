/*
 * @Author: lsl 
 * @Date: 2017-11-10 15:08:45 
 * @Last Modified by:   lsl 
 * @Last Modified time: 2017-11-10 15:08:45 
 */
import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
const width = Dimensions.get('window').width;

export default class ContentInputView extends PureComponent {
  static propTypes = {
    name: PropTypes.string,
    nameStyle: PropTypes.any,
    placeholderStyle: PropTypes.any,
    style: PropTypes.any,
    onChangeText: PropTypes.func,
    onFocus: PropTypes.func,
  }

  _renderText() {
    if (this.props.name) {
      return (
        <Text
          style={[{ fontSize: 16, color: '#494c4f', backgroundColor: 'transparent', marginTop: 5, marginRight: 5, justifyContent: 'flex-start', alignItems: 'center' }, this.props.nameStyle]}>
          {this.props.name}
        </Text>
      );
    }
    return null;
  }

  _downloadLayout(e) {
    console.log(e.nativeEvent.layout.y);
  }

  _downLoadFocus() {
    const scroller = this.refs.scroller;
    iOS && setTimeout(() => {
      const y = this.state.downloadY - 1 / 3 * Dev_height;// Dev_height为屏幕的高度
      scroller && scroller.scrollTo({ x: 0, y, animated: true });
    }, 50);
  }

  render() {
    return (
      <View
        style={[styles.container, this.props.style]}
        onLayout={this._downloadLayout.bind(this)}
      >
        {this._renderText()}
        <TextInput
          {...this.props}
          style={[styles.contentInput, this.props.placeholderStyle, { fontSize: 14 }]}
          numberOfLines={5}
          multiline={true}
          underlineColorAndroid="transparent"
          placeholderTextColor="gray"
          onChangeText={this.props.onChangeText}
          onFocus={this.props.onFocus}
          showDoneButton={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 130,
    width: width - 10,
    paddingRight: 10,
    paddingTop: 10,
    backgroundColor: '#fff',
    borderBottomColor: '#d8d8d8',
    borderBottomWidth: 0.5,
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  contentInput: {
    flex: 1,
    fontSize: 16,
    borderColor: 'transparent',
    textAlignVertical: 'top',
  },
});
