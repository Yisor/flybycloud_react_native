'use strict';
import React, { Component } from 'react';
import {
  Alert,
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';

export default class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  onChanegeTextKeyword = (text) => {
    this.setState({ value: text });
    this.props.onChanegeTextKeyword(text);
  }

  render() {
    return (
      <View>
        <TextInput ref="keyword"
          autoCapitalize="none"
          value={this.props.keyword}
          onChangeText={this.onChanegeTextKeyword}
          returnKeyType="search"
          maxLength={20}
          style={styles.inputText}
          underlineColorAndroid="transparent"
          placeholder={'中文/拼音/首字母'}>
        </TextInput>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  inputText: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    textDecorationLine: 'none',
    paddingLeft: 10,
    textAlign: 'center',
  }
});
