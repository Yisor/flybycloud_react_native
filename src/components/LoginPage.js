/*
 * @Author: lsl 
 * @Date: 2017-11-09 16:58:26 
 * @Last Modified by: lsl
 * @Last Modified time: 2017-11-09 17:10:44
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { login } from '../actions/login';

class LoginPage extends Component {

  _onPress = () => {
    Actions.tabbar();
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this._onPress}>
          <Text>LoginPage</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginPage;
