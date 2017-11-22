/*
 * @Author: lsl 
 * @Date: 2017-11-21 14:45:36 
 * @Last Modified by: lsl
 * @Last Modified time: 2017-11-22 13:51:39
 */
import React, { Component } from 'react';
import { Alert, View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { get } from '../../service/request';
import apiUrl from '../../constants/api';
import { HotCityList, LastVisitCityList, SelectCity } from '../../components/CityPick';

const nowCity = [
  {
    "cityCode": "YIE",
    "cityName": "阿尔山",
    "cityPinyin": "AERSHAN"
  }
];


class SelectCityPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allCityList: [],
      hotCityList: HotCityList,
      lastVisitCityList: LastVisitCityList,
      nowCityList: nowCity
    };
  }

  componentDidMount() {
    // get(apiUrl.cityList).then((response) => {
    //   console.log('get返回：' + JSON.stringify(response));
    //   this.setState({ allCityList: response });
    // });
  }



  onSelectCity = (city) => {
    Actions.pop({ refresh: ({ 'city': city, 'action': this.props.action }) });
  }

  render() {
    return (
      <View style={styles.container}>
        <SelectCity onSelectCity={this.onSelectCity} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
});

export default SelectCityPage;
