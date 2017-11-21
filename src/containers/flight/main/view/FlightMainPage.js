/*
 * @Author: lsl 
 * @Date: 2017-11-17 14:11:13 
 * @Last Modified by: lsl
 * @Last Modified time: 2017-11-21 17:26:39
 */
import React, { Component } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import FlightMain from './FlightMain';
import { ticketQuery } from '../action';

import * as TYPES from '../actionTypes';


// 机票搜索
class AirSearchPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      startCity: '杭州',
      endCity: '北京'
    }
  }

  onReverse = () => {
    const { startCity, endCity } = this.state
    this.setState({ startCity: endCity, endCity: startCity });
  }
  
  onSelectCityStart = () => {
    Actions.city({ 'title': '出发城市', 'action': TYPES.SELECT_START_CITY });
  }

  onSelectCityEnd = () => {
    Actions.city({ 'title': '到达城市', 'action': TYPES.SELECT_END_CITY });
  }

  onSelectStartDate = () => {
    // TODO 出发时间
  }

  onSelectBackDate = () => {
    // TODO 返程时间
  }

  onQueryFlight = () => {
    this.props.dispatch(ticketQuery());
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.action === TYPES.SELECT_START_CITY) {
      this.setState({ startCity: nextProps.city });
    }
    if (nextProps.action === TYPES.SELECT_END_CITY) {
      this.setState({ endCity: nextProps.city });
    }
  }

  render() {
    return (
      <FlightMain
        startCity={this.state.startCity}
        endCity={this.state.endCity}
        onSelectCityStart={this.onSelectCityStart}
        onSelectCityEnd={this.onSelectCityEnd}
        onQuery={this.onQueryFlight} />
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