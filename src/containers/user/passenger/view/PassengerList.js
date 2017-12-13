import React, { Component } from 'react';
import { View, Text, Image, ListView, CheckBox, StyleSheet, InteractionManager, Alert, TouchableOpacity, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Divider from '../../../../components/Divider';
import window from '../../../../utils/window';
import { pinyin } from '../../../../utils/pinyin';
import { get } from '../../../../service/request';
import apiUrl from '../../../../constants/api';
import passengers from './passengers.json';
import SearchBox from './SearchBox';

class PassengerList extends Component {
  constructor(props) {
    super(props);
    const getSectionData = (dataBlob, sectionID) => {
      return sectionID;
    };
    const getRowData = (dataBlob, sectionID, rowID) => {
      return dataBlob[sectionID][rowID];
    };
    this.state = {
      dataSource: new ListView.DataSource({
        getRowData: getRowData,
        getSectionHeaderData: getSectionData,
        rowHasChanged: (r1, r2) => r1 !== r2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
      }),
      isSelected: false,
    };
    selected = [];
    dataBlob = {};
  }


  componentDidMount() {
    this.handleData(this.props.dataSet);
    // get(apiUrl.passengers).then((response) => {
    //   console.log('get返回：' + JSON.stringify(response));
    // });
  }

  async handleData(datas) {
    dataBlob = [];
    let newList = await this.formatPasengerList(datas);
    let sortList = newList.sort(this.compareUp("pinyin"));
    sortList.map(passenger => {
      let firstLetter = passenger.pinyin.substr(0, 1).toUpperCase();
      if (dataBlob[firstLetter]) {
        dataBlob[firstLetter].push(passenger);
      } else {
        let subList = [];
        subList.push(passenger);
        dataBlob[firstLetter] = subList;
      }
    })

    InteractionManager.runAfterInteractions(() => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob),
      });
    });
  }

  // 扩展属性
  async extendedAttr(datas) {
    let newList = [];
    for (let item of datas) {
      if (!item['pinyin']) {
        let letter = await pinyin.getPinYin(item.name);
        item['pinyin'] = letter;
        item['isSelected'] = false;
      }
      newList.push(item);
    }
    return newList
  }

  async formatPasengerList(datas) {
    let newList = [];
    for (let item of datas) {
      let newObj = {};
      let letter = await pinyin.getPinYin(item.name);
      newObj['name'] = item.name;
      newObj['idcardType'] = item.idcardType;
      newObj['idcardCode'] = item.idcardCode;
      newObj['passengerId'] = item.passengerId;
      newObj['userId'] = item.passengerId;
      newObj['isEmployee'] = item.isEmployee;
      newObj['passengerUserId'] = item.passengerUserId;
      newObj['cardEndTime'] = item.cardEndTime;
      newObj['phone'] = item.phone;
      newObj['userPhone'] = item.phone;
      newObj['sex'] = item.sex;
      newObj['birthday'] = item.birthday;
      newObj['userPosition'] = item.userPosition;
      newObj['pinyin'] = letter;
      newObj['userName'] = item.name;
      newObj['desc'] = '';
      newObj['isSelected'] = false;

      // TODO 已有选择数据，要更改isSelected状态
      newList.push(newObj);
    }
    return newList
  }

  // 升序排序
  compareUp(propertyName) {
    return (object1, object2) => {
      var value1 = object1[propertyName];
      var value2 = object2[propertyName];
      return value1.localeCompare(value2);
    }
  }

  // Item选择
  onSelected = (datas) => {
    this.props.onSelected(datas);
  }

  renderRow = (rowData, sectionID, rowID) => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginRight: 10, marginTop: 15, marginBottom: 15 }}>
        <Text>{rowData.name}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
          <Text>{rowData.isEmployee ? '本企业员工' : ''}</Text>
          <CheckBox
            onValueChange={(value) => {
              dataBlob[sectionID][rowID].isSelected = value;
              value ? selected.push(rowData) : selected.splice(selected.indexOf(rowData), 1);
              this.setState({ isSelected: value });
              this.onSelected(selected);
            }}
            value={dataBlob[sectionID][rowID].isSelected} />
        </View>
      </View>
    );
  }

  renderSectionHeader(sectionData, sectionID) {
    return (
      <View style={styles.sectionView}>
        <Text style={styles.sectionText}>
          {sectionData}
        </Text>
      </View>
    );
  }

  onChanegeText = (text) => {
    this.filterData(text);
  }

  // 数据筛选
  filterData(text) {
    if (text) {
      let lowerCase = text.toLowerCase();
      let filters = this.props.dataSet.filter((item) => {
        return item.pinyin.includes(lowerCase) || item.name.includes(lowerCase);
      });
      this.handleData(filters);
    } else {
      this.handleData(this.props.dataSet);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <SearchBox onChanegeTextKeyword={this.onChanegeText} />
        <ListView
          contentContainerStyle={styles.contentContainer}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          renderSectionHeader={this.renderSectionHeader}
          enableEmptySections={true}
          initialListSize={500}
          renderSeparator={() => <Divider style={{ marginLeft: 10 }} />} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    width: window.width,
    backgroundColor: 'white',
  },
  sectionView: {
    paddingTop: 5,
    paddingBottom: 5,
    height: 30,
    paddingLeft: 10,
    width: window.width,
    backgroundColor: '#F4F4F4'
  },
  sectionText: {
    color: 'gray',
    fontWeight: 'bold'
  },
});

export default PassengerList;
