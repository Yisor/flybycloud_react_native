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
import * as TYPES from '../actionTypes';
import Store from '../../../../utils/store';
import { storeUserKey, flightMarkerKey } from '../../../../constants/constDefines';

// 机票搜索
class FlightMainPage extends Component {

  state = {
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
    startDate: null,
    endDate: null
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
    this.checkLogin();
    this.initData();
  }

  checkLogin() {
    Store.get(storeUserKey).then((res) => {
      if (res) {
        this.props.dispatch({ 'type': 'LOGGED_DOING', data: res });
      } else {
        Actions.login();
      }
    });
  }

  initData() {
    Store.remove(flightMarkerKey);// 清除缓存
    this.setState({ startDate: '2018-01-16', endDate: '2018-01-18' });
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

  getRequestParams(isOneWay, isGpTicket) {
    let startDate = this.state.startDate;
    let endDate = this.state.endDate;
    let flightDate = this.state.startDate;
    let fromCity = this.state.startCity.cityCode;
    let toCity = this.state.endCity.cityCode;
    let params = { startDate, endDate, flightDate, fromCity, toCity, isOneWay, isGpTicket }
    let title = this.state.startCity.cityName + "-" + this.state.endCity.cityName;
    return { 'title': title, 'params': params };
  }

  onQueryFlight(isOneWay, isGpTicket) {
    let params = this.getRequestParams(isOneWay, isGpTicket);
    Actions.flightList(params);
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
        onQuery={(isOneWay) => this.onQueryFlight(isOneWay, false)}
        onQueryGpticket={(isOneWay) => this.onQueryFlight(isOneWay, true)}
        onExchange={this.onExchange} />
    );
  }
}

const select = store => ({
  user: store.user.login.user
})
export default connect(select)(FlightMainPage);