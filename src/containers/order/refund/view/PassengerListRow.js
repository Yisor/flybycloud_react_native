import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, CheckBox, Alert, TouchableOpacity } from 'react-native';

const CHECKED_IMG = require('../../../../resources/assets/common/selected_icon.png');
const CHECK_IMG = require('../../../../resources/assets/common/select_icon.png');

class PassengerListRow extends Component {

  state = { isSelected: false }

  onPressItem() {
    this.setState({ isSelected: !this.state.isSelected });
    let { onPress } = this.props;
    onPress && onPress();
  }

  render() {
    let { passenger } = this.props;
    let ImgSource = this.state.isSelected ? CHECKED_IMG : CHECK_IMG;
    return (
      <TouchableOpacity activeOpacity={0.6} style={styles.optionContainer} onPress={() => { this.onPressItem() }}>
        <Image style={styles.optionTxt} source={ImgSource} />
        <Text style={{ fontSize: 14, color: "#333b43" }}>{passenger.name}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  optionContainer: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center'
  },
  optionTxt: {
    width: 20,
    height: 20,
    resizeMode: 'stretch',
    marginRight: 20
  }
});

export default PassengerListRow;
