/*
 * @Author: lsl 
 * @Date: 2017-11-17 14:11:13 
 * @Last Modified by: lsl
 * @Last Modified time: 2017-11-20 15:38:09
 */
import React, { Component } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { connect } from 'react-redux';
import FlightMain from './FlightMain';
import { ticketQuery } from '../action';


// 机票搜索
class AirSearchPage extends Component {

  onQueryAirTicket = () => {
    this.props.dispatch(ticketQuery());
  }

  render() {
    return (
      <FlightMain onQuery={this.onQueryAirTicket} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const select = store => ({
  status: store.flightStore.status,
  data: store.flightStore.data,
})
export default connect(select)(AirSearchPage);