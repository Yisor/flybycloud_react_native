import React, { Component } from 'react';
import { View, Text, Image, CheckBox, TextInput, ListView, StyleSheet, InteractionManager, Alert, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import window from '../../../../utils/window';
import { pinyin } from '../../../../utils/pinyin';
import Divider from '../../../../components/Divider';
import { get } from '../../../../service/request';
import apiUrl from '../../../../constants/api';
import SearchBox from './SearchBox';

class EmpList extends Component {
  constructor(props) {
    super(props);
    let getSectionData = (dataBlob, sectionID) => {
      return sectionID;
    };
    let getRowData = (dataBlob, sectionID, rowID) => {
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
    let newList = await this.extendedAttr(datas);
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

  async formatEmplist(datas) {
    let newList = [];
    for (let item of datas) {
      if (item['pinyin']) {
        newList.push(item);
      } else {
        let newObj = {};
        let letter = await pinyin.getPinYin(item.userName);
        newObj['name'] = item.userName;
        newObj['idcardType'] = item.idcardType;
        newObj['idcardCode'] = item.idcardCode;
        newObj['userId'] = item.userId;
        newObj['phone'] = item.userPhone;
        newObj['corpId'] = item.corpId;
        newObj['userName'] = item.userName;
        newObj['orderRole'] = item.orderRole;
        newObj['departmentName'] = item.departmentName;
        newObj['pinyin'] = letter;
        newObj['roleName'] = item.roleName;
        newObj['isEmployee'] = 1;
        newObj['desc'] = '';
        newObj['isSelected'] = false;
        newObj['userPosition'] = item.userPosition;
        // TODO 已有选择数据，要更改isSelected状态
        newList.push(newObj);
      }
    }
    return newList
  }

  // 扩展属性
  async extendedAttr(datas) {
    let newList = [];
    for (let item of datas) {
      if (!item['pinyin']) {
        let letter = await pinyin.getPinYin(item.userName);
        item['pinyin'] = letter;
        item['isSelected'] = false;
      }
      newList.push(item);
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
      <View style={styles.rowItem}>
        <Text>{rowData.userName}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text>{rowData.departmentName}</Text>
          <CheckBox
            onValueChange={(value) => {
              dataBlob[sectionID][rowID].isSelected = value;
              value ? selected.push(rowData) : selected.splice(selected.indexOf(rowData), 1);
              this.setState({ isSelected: value });
              this.onSelected(selected);
            }}
            value={rowData.isSelected} />
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
        return item.pinyin.includes(lowerCase) || item.userName.includes(lowerCase);
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
  rowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 15,
    marginBottom: 15
  },
  textInput: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    borderRadius: 5,
    backgroundColor: "#ffffff"
  }
});

export default EmpList;
