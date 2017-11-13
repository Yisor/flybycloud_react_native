/*
 * @Author: lsl 
 * @Date: 2017-11-09 10:12:47 
 * @Last Modified by: lsl
 * @Last Modified time: 2017-11-13 10:21:17
 */
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ListView,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { width } from '../common/window';

const boxW = 100;
const boxM = (width - 2 * boxW) / 3;
const datas = [
  {
    "icon": require('../../icons/airplane.png'),
    "title": "机票"
  },
  {
    "icon": require('../../icons/car.png'),
    "title": "用车"
  },
  {
    "icon": require('../../icons/train.png'),
    "title": "火车票"
  },
  {
    "icon": require('../../icons/hotel.png'),
    "title": "酒店"
  }
];

class HomePage extends Component {

  constructor(props) {
    super(props);
    let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = { dataSource: ds.cloneWithRows(datas) };
  }

  // 返回cell  
  renderRow = (rowData) => {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => { Actions.login() }} >
        <View style={styles.innerViewStyle}>
          <Image source={rowData.icon} style={styles.iconStyle} />
          <Text>{rowData.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        contentContainerStyle={styles.listViewStyle}
      />
    );
  }
}

const styles = StyleSheet.create({
  listViewStyle: {
    // 主轴方向  
    flexDirection: 'row',
    // 一行显示不下,换一行  
    flexWrap: 'wrap',
    // 侧轴方向  
    alignItems: 'center', // 必须设置,否则换行不起作用  
    marginLeft: boxM,
    marginRight: boxM,
    marginTop: 60,
  },
  innerViewStyle: {
    width: boxW,
    height: boxW,
    marginLeft: 10,
    marginTop: 10,
    // 文字内容居中对齐  
    alignItems: 'center'
  },
  iconStyle: {
    width: 80,
    height: 80,
  },
});

export default HomePage;
