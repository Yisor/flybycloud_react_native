import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ListView,
  StyleSheet,
  InteractionManager,
  Alert,
  TouchableOpacity,
  Platform
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import SegmentedBar from '../../../../components/SegmentedBar';
import window from '../../../../utils/window';
import { pinyin } from '../../../../utils/pinyin';
import { get, post } from '../../../../service/request';
import apiUrl from '../../../../constants/api';
import passengerJson from './passengers.json';
import empJson from './emplist.json'
import EmpList from './EmpList';
import PassengerList from './PassengerList';

let empList;
let passengerList;

class PassengerSelectPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      total: 0,
      empList: [],
      passengerList: []
    };
    empList = [];
    passengerList = [];
  }

  componentDidMount() { }

  async formatEmplist(datas) {
    let newList = [];
    for (let item of datas) {
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
    return newList
  }

  // 员工选择
  onEmpSelected = (datas) => {
    empList = datas;
    this.setState({ total: empList.length + passengerList.length });
  }

  // 常旅客选择
  onPassengerSelected = (datas) => {
    passengerList = datas;
    this.setState({ total: empList.length + passengerList.length });
  }

  onSubmit() {
    let passengers = empList.concat(passengerList);
    Actions.pop({ refresh: ({ 'passengers': passengers }) });
  }

  renderSegmentedBar() {
    return (
      <SegmentedBar
        style={{ height: 50 }}
        indicatorPosition='bottom'
        indicatorType='boxWidth'
        onChange={(index) => { this.setState({ index: index }) }}>
        <SegmentedBar.Item title='员工' titleStyle={styles.itemBarTitle} activeTitleStyle={{ fontSize: 15 }} />
        <SegmentedBar.Item title='常用出行人' titleStyle={styles.itemBarTitle} activeTitleStyle={{ fontSize: 15 }} />
      </SegmentedBar>
    );
  }

  renderList() {
    return (
      <View style={{ flex: 1, position: 'relative', bottom: 60, marginTop: 60 }}>
        {this.state.index == 0 ? <EmpList ref='emplist' dataSet={empJson} onSelected={this.onEmpSelected} />
          : <PassengerList dataSet={passengerJson} onSelected={this.onPassengerSelected} />}
      </View>
    );
  }

  renderBottom() {
    return (
      <View style={{ position: 'absolute', bottom: 0, flexDirection: 'row', }}>
        <View style={styles.resultView}>
          <Text style={{ fontSize: 18, color: "#323b43", marginLeft: 10 }}>已选</Text>
          <Text style={{ fontSize: 18, color: "#323b43", marginLeft: 10 }}>{`${this.state.total}人`}</Text>
        </View>
        <TouchableOpacity style={styles.submit} activeOpacity={0.6} onPress={this.onSubmit}>
          <Text style={{ fontSize: 20, color: "#f1f2f3", marginTop: 17, marginBottom: 17 }}>确定</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderSegmentedBar()}
        {this.renderList()}
        {this.renderBottom()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  submit: {
    flex: 1,
    backgroundColor: "#f0b051",
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemBarTitle: {
    fontSize: 15,
    color: "#323b43"
  },
  resultView: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: "#ffffff",
    alignItems: 'center'
  }
});

export default PassengerSelectPage;
