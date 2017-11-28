import React, { Component } from 'react';
import { View, Text, Image, ListView, StyleSheet, InteractionManager, Alert, TouchableOpacity, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';
import SegmentedBar from '../../../../components/SegmentedBar';
import window from '../../../../utils/window';
import { getPinyinLetter } from '../../../../utils/pinyin';
import { get } from '../../../../service/request';
import apiUrl from '../../../../constants/api';
import passengers from './passengers.json';
import EmpList from './EmpList';
import PassengerList from './PassengerList';


class PassengerSelectPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      index: 0
    };
  }

  componentDidMount() {

  }


  render() {
    return (
      <View style={styles.container}>
        <SegmentedBar style={{ height: 50 }} indicatorPosition='bottom' indicatorType='boxWidth' onChange={(index) => { this.setState({ index: index }) }}>
          <SegmentedBar.Item title='员工' titleStyle={{ fontSize: 15, color: "#323b43" }} activeTitleStyle={{ fontSize: 15 }} />
          <SegmentedBar.Item title='常用出行人' titleStyle={{ fontSize: 15, color: "#323b43" }} activeTitleStyle={{ fontSize: 15 }} />
        </SegmentedBar>

        {this.state.index == 0 ? <EmpList /> : <PassengerList />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PassengerSelectPage;
