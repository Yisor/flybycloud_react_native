/*
 * @Author: lsl 
 * @Date: 2017-11-17 14:11:13 
 * @Last Modified by: lsl
 * @Last Modified time: 2017-11-23 17:33:36
 */
import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import FlightMain from './FlightMain';
import { ticketQuery } from '../action';
import * as TYPES from '../actionTypes';
import Store from '../../../../utils/store';
import { storeUserKey } from '../../../../constants/constDefines';

// 机票搜索
class FlightMainPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      startCity: {
        "cityCode": "HGH",
        "cityName": "杭州",
        "cityPinyin": "HANGZHOU"
      },
      endCity: {
        "cityCode": "PEK",
        "cityName": "北京",
        "cityPinyin": "BEIJING"
      },
      startDate: '2017-12-23',
      endDate: '2017-12-25'
    }
  }

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.action === TYPES.SELECT_START_CITY) {
      this.setState({ startCity: nextProps.city });
    }
    if (nextProps.action === TYPES.SELECT_END_CITY) {
      this.setState({ endCity: nextProps.city });
    }
  }

  componentDidMount() {
    Store.get(storeUserKey).then((res) => {
      console.log('本地用户信息' + JSON.stringify(res));
      if (res) {
        this.props.dispatch({ 'type': 'LOGGED_DOING', data: res });
      } else {
        Actions.login();
      }
    });
  }

  onExchange = () => {
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
    let flightDate = this.state.startDate;
    let fromCity = this.state.startCity.cityCode;
    let toCity = this.state.endCity.cityCode;
    let params = { flightDate, fromCity, toCity }
    let title = this.state.startCity.cityName + "-" + this.state.endCity.cityName;
    Actions.flightList({ 'title': title, 'params': params });
    // this.props.dispatch(ticketQuery(params));
  }

  render() {
    return (
      <FlightMain
        startDate={this.state.startDate}
        endDate={this.state.endDate}
        startCity={this.state.startCity.cityName}
        endCity={this.state.endCity.cityName}
        onSelectCityStart={this.onSelectCityStart}
        onSelectCityEnd={this.onSelectCityEnd}
        onQuery={this.onQueryFlight}
        onExchange={this.onExchange} />
    );
  }
}


const select = store => ({
  status: store.flightStore.status,
  data: store.flightStore.data,
})
export default connect(select)(FlightMainPage);