import React, { Component } from 'react';
import { View, Text, Image, CheckBox, ListView, StyleSheet, InteractionManager, Alert, TouchableOpacity } from 'react-native';
import window from '../../../../utils/window';
import insurances from './insurances.json';

let newList = [];
class InsuranceList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
      isChecked: false
    };
  }

  componentDidMount() {
    insurances.map((item) => {
      item['isChecked'] = false;
      newList.push(item);
    });

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newList)
    });
  }

  onPressRow(rowData, sectionID, rowID) {
    // alert(rowData.insuranceName);

    let newData = Objcet.assign(newList);
    console.log('点击：' + JSON.stringify(newData[rowID]));
    newData[rowID].isChecked = !newData[rowID].isChecked;//重点在这里，给数据源动态添加一个isSelected属性。
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newData)
    });
  }

  renderRow = (rowData, sectionID, rowID) => {
    return (
      <TouchableOpacity activeOpacity={0.6} style={styles.insuranceView} onPress={() => this.onPressRow(rowData, rowID)} >
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
          <Text style={{ fontSize: 14, color: "#797f85" }}>{rowData.insuranceName}</Text>
          <View >
            <Text style={{ fontSize: 11, color: "#51a6f0", marginLeft: 5 }}>详细说明</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ marginRight: 10, fontSize: 14, color: "#323b43" }}>{`￥${rowData.unitPrice}/份`}</Text>
          <CheckBox
            value={rowData.isChecked} />
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <ListView
        contentContainerStyle={[styles.contentContainer, this.props.style]}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        enableEmptySections={true} />
    );
  }
}

const styles = StyleSheet.create({
  insuranceView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15,
    paddingBottom: 15
  },
  contentContainer: {
    width: window.width,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
  },
});

export default InsuranceList;
