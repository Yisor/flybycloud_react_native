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
  StatusBar
} from 'react-native';

export default class Header extends Component {
  onPressBack(e) {
    this.props.onPressBack();
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={[styles.cellfixed]}>
          <TouchableOpacity onPress={e => this.onPressBack(e)}>
            <Image color="gray" size={20} />
          </TouchableOpacity>
        </View>
        <View style={styles.cell}>
          <Text style={[styles.title]}>{this.props.title}</Text>
        </View>
        <View style={[styles.cellfixed]}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'ios' ? 20 : 0, // 处理iOS状态栏
    height: Platform.OS === 'ios' ? 50 : 35, // 处理iOS状态栏
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 10
  },
  cell: {
    flex: 1,
    marginTop: 5
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    marginLeft: 5,
    marginRight: 5,
    color: 'black'
  },
  cellfixed: {
    marginTop: 5,
    width: 80
  }
});
