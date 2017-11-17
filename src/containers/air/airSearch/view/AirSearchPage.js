/*
 * @Author: lsl 
 * @Date: 2017-11-17 14:11:13 
 * @Last Modified by: lsl
 * @Last Modified time: 2017-11-17 14:43:52
 */
import React, { Component } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import AirSearch from './AirSearch';

// 机票搜索
class AirSearchPage extends Component {
  onQueryAir = () => {
    Alert.alert('正在查询...');
  }

  render() {
    return (
      <AirSearch onQuery={this.onQueryAir} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AirSearchPage;