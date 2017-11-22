/*
 * @Author: lsl 
 * @Date: 2017-11-21 14:48:00 
 * @Last Modified by: lsl
 * @Last Modified time: 2017-11-21 18:28:55
 */
'use strict';
import React, { PureComponent } from 'react';
import {
  Alert,
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';

import Header from './Header';
import SearchBox from './SearchBox';
import SearchResult from './SearchResult';
import CityList from './IndexListView';

// 下面是数据部分
import CityJson from './cities.json';
const allCityList = CityJson.allCityList;
const hotCityList = CityJson.hotCityList;
const lastVisitCityList = CityJson.lastVisitCityList;

const nowCityList = [
  {
    "cityCode": "YIE",
    "cityName": "阿尔山",
    "cityPinyin": "AERSHAN"
  }
];

export default class SelectCity extends PureComponent {
  static defaultProps = {
    allCityList: allCityList,
    hotCityList: hotCityList,
    lastVisitCityList: lastVisitCityList,
    nowCityList: nowCityList,
  }

  static propTypes = {
    allCityList: PropTypes.array,
    hotCityList: PropTypes.array,
    lastVisitCityList: PropTypes.array,
    nowCityList: PropTypes.array,
    onSelectCity: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      showSearchResult: false,
      keyword: '',
      searchResultList: [],
    };
  }

  onChanegeTextKeyword = (text) => {
    if (text === '') {
      this.setState({ showSearchResult: false });
    } else {
      // 在这里过滤数据结果
      let dataList = this.filterCityData(text);
      this.setState({ keyword: text, showSearchResult: true, searchResultList: dataList });
    }
  }

  filterCityData(text) {
    console.log('search for list', text);
    let rst = [];
    let upperCase = text.toUpperCase();
    for (let i = 0; i < this.props.allCityList.length; i++) {
      let item = this.props.allCityList[i];
      if (item.cityName.indexOf(text) === 0 || item.cityPinyin.indexOf(upperCase) === 0) {
        rst.push(item);
      }
    }
    return rst;
  }

  onSelectCity = (cityJson) => {
    if (this.state.showSearchResult) {
      this.setState({ showSearchResult: false, keyword: '' });
    }
    this.props.onSelectCity(cityJson);
  }

  render() {
    return (
      <View style={styles.container}>
        <SearchBox
          keyword={this.state.keyword}
          onChanegeTextKeyword={this.onChanegeTextKeyword} />
        {
          this.state.showSearchResult
            ? (<SearchResult
              keyword={this.state.keyword}
              onSelectCity={this.onSelectCity}
              searchResultList={this.state.searchResultList} />)
            : (<View style={{ flex: 1 }}>
              <CityList
                onSelectCity={this.onSelectCity}
                allCityList={this.props.allCityList}
                hotCityList={this.props.hotCityList}
                lastVisitCityList={this.props.lastVisitCityList}
                nowCityList={this.props.nowCityList} />
            </View>
            )
        }
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
  currentCity: {
    backgroundColor: '#ffffff',
    height: 20,
    margin: 5
  },
  currentCityText: {
    fontSize: 16
  }
});
