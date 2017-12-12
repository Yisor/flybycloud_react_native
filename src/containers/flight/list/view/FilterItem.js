//import liraries
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, CheckBox, StyleSheet, Image } from 'react-native';

const CHECKED_IMG = require('../../../../resources/assets/common/selected_icon.png');
const CHECK_IMG = require('../../../../resources/assets/common/select_icon.png');

class FilterItem extends Component {
  state = {
    isSelected: false,
  }

  onPressItem() {
    this.setState({ isSelected: !this.state.isSelected });
    let { onPress } = this.props;
    onPress && onPress();
  }

  componentDidMount() {
    let { isCheck } = this.props;
    this.setState({ isSelected: isCheck });
  }

  render() {
    let { title, isCheck, onPress } = this.props;
    let ImgSource = this.state.isSelected ? CHECKED_IMG : CHECK_IMG;
    return (
      <TouchableOpacity activeOpacity={0.6} style={[styles.optionContainer]} onPress={() => { this.onPressItem() }}>
        <Text style={styles.optionTxt}>{title}</Text>
        <Image style={{ width: 20, height: 20, resizeMode: 'stretch', marginRight: 20 }} source={ImgSource} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  optionTxt: {
    fontSize: 15,
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 25,
    marginRight: 25
  },
});

export default FilterItem;
