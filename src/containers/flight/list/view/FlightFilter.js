import React, { Component } from 'react';
import { View, Text, ListView, TouchableOpacity, CheckBox, Modal, StyleSheet, Image } from 'react-native';

import window from '../../../../utils/window';
import Divider from '../../../../components/Divider';
import { get } from '../../../../service/request';
import apiUrl from '../../../../constants/api';
import FilterItem from './FilterItem';

// import airlines from './airlines.json';
const categories = ['起飞时间', '航空公司']
const times = [
  { 'title': '不限', 'isCheck': true },
  { 'title': '00:00-06:00', 'isCheck': false },
  { 'title': '06:00-12:00', 'isCheck': false },
  { 'title': '12:00-18:00', 'isCheck': false },
  { 'title': '18:00-24:00', 'isCheck': false },
]

class FlightFilter extends Component {
  state = {
    dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
    selectedIndex: 0,
    visible: true,
  }

  onPressCategory(rowID) {
    this.setState({ selectedIndex: rowID });
  }

  onPressCancel() {
    let { onCancel } = this.props;
    onCancel && onCancel();
  }

  onSubmit() {
    let { onSubmit, dataSource } = this.props;
    let timeFilters = times.filter((item) => {
      return item.isCheck == true;
    });
    // 增加原始数据筛选
    onSubmit && onSubmit(timeFilters);
  }

  renderHeader() {
    return (
      <View style={styles.headerView}>
        <TouchableOpacity onPress={() => this.onPressCancel()}>
          <Text style={[styles.headerTxt, { marginLeft: 11 }]}>取消</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
          <Image style={{ width: 15, height: 15 }} source={require('../../../../resources/assets/common/clear_icon.png')} />
          <Text style={styles.headerTxt}>清空筛选</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.onSubmit()}>
          <Text style={[styles.headerTxt, { marginRight: 11 }]}>确定</Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderCategory = (rowData, sectionID, rowID) => {
    let bgColor = this.state.selectedIndex == rowID ? '#fff' : null;
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: bgColor }}
        onPress={() => this.onPressCategory(rowID)}>
        <Text style={styles.categoryTxt}>{rowData}</Text>
      </TouchableOpacity>
    )
  }

  renderOption = (rowData, sectionID, rowID) => {
    return this.state.selectedIndex == 0 ? this.renderTime(rowData, rowID) : this.renderAirline(rowData, rowID);
  }

  renderTime = (rowData, rowID) => {
    return <FilterItem
      title={rowData.title}
      isCheck={rowData.isCheck}
      onPress={() => {
        let isCheck = times[rowID].isCheck;
        times[rowID].isCheck = !isCheck;
      }} />
  }

  renderAirline = (rowData, rowID) => {
    return <FilterItem
      title={rowData.airlineShortName}
      isCheck={rowData.isCheck}
      onPress={() => {
      }} />
  }

  render() {
    let options = this.state.selectedIndex == 0 ? times : this.props.filters;
    return (
      <Modal
        transparent={true}
        visible={this.props.visible && this.state.visible}
        onRequestClose={() => { }} >
        <View style={styles.container}>
          <View style={{ height: window.heigh * 0.5, backgroundColor: '#fff' }}>
            {this.renderHeader()}
            <View style={{ flexDirection: 'row' }}>
              <ListView
                contentContainerStyle={styles.leftContainer}
                dataSource={this.state.dataSource.cloneWithRows(categories)}
                renderRow={this.renderCategory}
                enableEmptySections={true}
                renderSeparator={() => <Divider />} />
              <ListView
                contentContainerStyle={styles.rightContainer}
                dataSource={this.state.dataSource.cloneWithRows(options)}
                renderRow={this.renderOption}
                enableEmptySections={true}
                renderSeparator={() => <Divider />} />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  categoryTxt: {
    fontSize: 15,
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 25,
    marginRight: 25
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: "#323b43",
    width: window.width
  },
  headerTxt: {
    color: '#fff',
    fontSize: 15,
    marginTop: 16,
    marginBottom: 16,
    marginLeft: 10,
  },
  leftContainer: {
    width: window.width * 0.3,
    backgroundColor: "#f1f2f3",
  },
  rightContainer: {
    width: window.width * 0.7,
    backgroundColor: 'white',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  optionTxt: {
    fontSize: 15,
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 25,
    marginRight: 25
  },
});

export default FlightFilter;


