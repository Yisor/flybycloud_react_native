'use strict';
import React, { Component } from 'react';
import {
  Alert,
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import Header from './Header';
import SearchBox from './SearchBox';
import SearchResult from './SearchResult';
import CityList from './IndexListView';

// 下面是数据部分
import CityJson from './city-list.json';
import JsonData from './list.json';
const nowCityList = [
  {
    "name": "阿里",
    "spellName": "alidi",
    "id": 6134,
    "fullname": "西藏/阿里",
    "sortLetters": "a"
  }
];
const allCityList = CityJson.allCityList;
const hotCityList = CityJson.hotCityList;
const lastVisitCityList = CityJson.lastVisitCityList;

export default class SelectCity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSearchResult: false,
      keyword: '',
      searchResultList: [],
      allCityList: allCityList,
      hotCityList: hotCityList,
      lastVisitCityList: lastVisitCityList,
      nowCityList: nowCityList
    };
  }

  onPressBack = () => {
    alert('你选择了返回');
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
    for (let idx = 0; idx < allCityList.length; idx++) {
      let item = allCityList[idx];
      if (item.name.indexOf(text) === 0 || item.spellName.indexOf(text) === 0) {
        rst.push(item);
      }
    }
    return rst;
  }

  onSelectCity = (cityJson) => {
    if (this.state.showSearchResult) {
      this.setState({ showSearchResult: false, keyword: '' });
    }

    alert('你选择了城市====》' + cityJson.id + '#####' + cityJson.name);
  }

  render() {
    return (
      <View style={styles.container}>
        <Header onPressBack={this.onPressBack} title="当前城市：北京" />
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
                allCityList={this.state.allCityList}
                hotCityList={this.state.hotCityList}
                lastVisitCityList={this.state.lastVisitCityList}
                nowCityList={this.state.nowCityList} />
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
