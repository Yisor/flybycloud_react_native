import React, { Component } from 'react';
import { View, Text, Image, ListView, ScrollView, StyleSheet, InteractionManager, Alert, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Overlay } from 'teaset';
import window from '../../../../utils/window';
import Divider from '../../../../components/Divider';
import { get } from '../../../../service/request';
import apiUrl from '../../../../constants/api';
import { formatTime, getTimeString } from '../../../../utils/timeUtils';
const isStopover = [false, true]; // 是否经停
import costCenter from './costcenter.json';
import InsuranceList from './InsuranceList';

class FillOrderPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
      passengers: [],
      costCenter: '默认成本中心',
    };
  }

  componentWillMount() {
    flight = this.props.flight;
    ticket = this.props.ticket;
  }

  componentDidMount() {
    // get(apiUrl.costCenter).then((response) => {
    //   console.log('get返回：' + JSON.stringify(response));
    // });

    //  get(apiUrl.auditing).then((response) => {
    //   console.log('get返回：' + JSON.stringify(response));
    // });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.passengers) {
      console.log(JSON.stringify(nextProps.passengers));
      this.setState({ passengers: nextProps.passengers });
    }
  }

  // 添加乘客
  onAddPassenger() {
    Actions.passengerSelect();
  }

  onPressCostCenter = () => {
    this.showPull(false);
  }

  showPull(modal, rootTransform) {
    let overlayView = (
      <Overlay.PullView side={'bottom'} modal={modal} rootTransform={rootTransform} ref={v => this.overlayPullView = v}>
        <View style={{ backgroundColor: '#fff', minWidth: 300, minHeight: 260, justifyContent: 'center', alignItems: 'center' }}>
          <ListView
            contentContainerStyle={{ width: window.width }}
            dataSource={this.state.dataSource.cloneWithRows(costCenter)}
            renderRow={this.renderCostCenterRow}
            enableEmptySections={true}
            renderSeparator={() => <Divider />} />
        </View>
      </Overlay.PullView>
    );
    Overlay.show(overlayView);
  }

  renderCostCenterRow = (rowData) => {
    return (
      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
        onPress={() => {
          this.setState({ costCenter: rowData.costCenterName });
          this.overlayPullView && this.overlayPullView.close();
        }}>
        <Text style={{ fontSize: 14, color: "#333b43", margin: 10 }}>{rowData.costCenterName}</Text>
      </TouchableOpacity>
    );
  }

  renderFlightInfo() {
    return (
      <View style={{ width: window.width, backgroundColor: "#51a6f0" }}>
        <View style={{ backgroundColor: "white", borderRadius: 5, margin: 10 }}>
          <View style={{ flexDirection: 'row', marginLeft: 10, marginTop: 10, }}>
            <View style={{ borderRadius: 2, marginRight: 10, backgroundColor: "#f0b051" }}>
              <Text style={{ fontSize: 9, color: "#ffffff", marginLeft: 5, marginRight: 5 }}>实际承运</Text>
            </View>
            <Text style={{ fontSize: 11, color: "#797f85" }}>{`${flight.airlineShortName}${flight.flightNumber}`}</Text>
          </View>
          <View style={[styles.rowCenter, { marginTop: 10 }]}>
            <Text style={{ fontSize: 24, color: "#323b43" }}>{formatTime(flight.departureTime)}</Text>
            <View style={{ alignItems: 'center', }}>
              <Text style={{ fontSize: 11, color: "#797f85" }}>{isStopover[flight.isStopover] ? 经停 : ' '}</Text>
              <Divider style={{ width: 60, marginLeft: 32, marginRight: 32, marginTop: 5, marginBottom: 5 }} />
              <Text style={{ fontSize: 11, color: "#797f85" }}>{getTimeString(flight.flyingTime)}</Text>
            </View>
            <Text style={{ fontSize: 24, color: "#323b43" }}>{formatTime(flight.destinationTime)}</Text>
          </View>
          <View style={[styles.rowCenter, { marginTop: 5 }]}>
            <Text style={{ fontSize: 14, color: "#797f85", marginRight: 124 }}>{flight.departureAirport}</Text>
            <Text style={{ fontSize: 14, color: "#797f85" }}>{flight.destinationAirport}</Text>
          </View>
          <View style={[styles.rowCenter, { marginTop: 10 }]}>
            <Text style={{ fontSize: 11, color: "#797f85" }}>{flight.planeType}</Text>
            <Text style={{ marginLeft: 5, marginRight: 5 }}>|</Text>
            <Text style={{ fontSize: 11, color: "#797f85" }}>{ticket.mainClassName}</Text>
          </View>
          <Divider style={{ marginTop: 10, borderStyle: "solid", }} />
          <View style={{ flexDirection: 'row', margin: 10, justifyContent: 'space-between', }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 11, color: "#797f85", marginRight: 20 }}>{`成人票价￥${ticket.price}`}</Text>
              <Text style={{ fontSize: 11, color: "#797f85" }}>{`机建燃油￥${ticket.buildFee}`}</Text>
            </View>
            <TouchableOpacity activeOpacity={0.6}>
              <Text style={{ fontSize: 11, color: "#51a6f0" }}>查看退改签</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  // 审批人
  renderApprover() {
    return (
      <TouchableOpacity style={styles.approverView} activeOpacity={0.6} onPress={() => { Actions.auditorList() }}>
        <Text style={{ fontSize: 14, color: "#323b43", marginTop: 15, marginBottom: 15, marginLeft: 20 }}>查看审批人</Text>
      </TouchableOpacity>
    );
  }

  renderPassenger() {
    return (
      <View>
        <View style={styles.passengerView}>
          <View style={{ flexDirection: 'row', alignItems: 'center', }}>
            <Text style={{ fontSize: 14, color: "#797f85", marginLeft: 10 }}>乘机人</Text>
            <Text style={{ fontSize: 11, color: "#323b43", marginLeft: 10 }}>仅支持成人票预定</Text>
          </View>
          <TouchableOpacity style={styles.addPassengerBtn} activeOpacity={0.6} onPress={() => this.onAddPassenger()}>
            <Text style={styles.addPassengerTxt}>
              新增乘客
          </Text>
          </TouchableOpacity>
        </View>
        <ListView
          contentContainerStyle={styles.contentContainer}
          dataSource={this.state.dataSource.cloneWithRows(this.state.passengers)}
          renderRow={this.renderPassengeRow}
          enableEmptySections={true}
          renderSeparator={() => <Divider />} />
      </View>
    );
  }

  renderPassengeRow = (rowData) => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', }}>
        <Image style={styles.deleteIcon} source={require('../../../../resources/assets/order/order_delete_icon.png')} />
        <View style={{ margin: 10 }}>
          <Text style={{ fontSize: 14, color: "#333b43" }}>{rowData.userName}</Text>
          <Text style={{ fontSize: 12, color: "#323b43", marginTop: 10 }}>{rowData.idcardCode}</Text>
        </View>
      </View>
    );
  }

  renderContacts() {
    return (
      <View style={{ backgroundColor: "#ffffff", marginTop: 8 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15, marginBottom: 15 }}>
          <Text style={{ fontSize: 14, color: "#797f85", marginLeft: 10 }}>联系人</Text>
          <Text style={{ fontSize: 14, color: "#323b43", marginLeft: 40 }}>王测试</Text>
        </View>
        <Divider style={{ marginLeft: 10 }} />
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15, marginBottom: 15 }}>
          <Text style={{ fontSize: 14, color: "#797f85", marginLeft: 10 }}>联系方式</Text>
          <Text style={{ fontSize: 14, color: "#323b43", marginLeft: 25 }}>134123456789</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15, marginBottom: 15 }}>
          <Text style={{ fontSize: 14, color: "#797f85", marginLeft: 10 }}>选择短信接收人:</Text>
          <Text style={{ fontSize: 14, color: "#323b43", marginLeft: 25 }}>134123456789</Text>
        </View>
      </View>
    );
  }

  // 保险
  renderInsurance() {
    return (
      <View style={{ backgroundColor: "#ffffff", marginTop: 8, }}>
        <View style={styles.insuranceView}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
            <Text style={{ fontSize: 14, color: "#797f85" }}>意外险</Text>
            <Text style={{ fontSize: 11, color: "#51a6f0", marginLeft: 5 }}>详细说明</Text>
          </View>
          <Text style={{ marginRight: 10 }}>￥50/份</Text>
        </View>
        <View style={styles.insuranceView}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
            <Text style={{ fontSize: 14, color: "#797f85" }}>延误险</Text>
            <Text style={{ fontSize: 11, color: "#51a6f0", marginLeft: 5 }}>详细说明</Text>
          </View>
          <Text style={{ marginRight: 10 }}>￥50/份</Text>
        </View>
      </View>
    );
  }

  // 配送方式
  renderDeliveries() {
    return (
      <TouchableOpacity style={styles.rowItem} activeOpacity={0.6}>
        <Text style={styles.rowItemLeftText}>配送方式</Text>
        <Text style={styles.rowItemRightText}>不需要配送</Text>
      </TouchableOpacity>
    );
  }

  // 支付方式
  renderPayment() {
    return (
      <TouchableOpacity style={styles.rowItem} activeOpacity={0.6}>
        <Text style={styles.rowItemLeftText}>支付方式</Text>
        <Text style={styles.rowItemRightText}>企业垫付</Text>
      </TouchableOpacity>
    );
  }

  // 成本中心
  renderCostCenter() {
    return (
      <TouchableOpacity style={styles.rowItem} activeOpacity={0.6} onPress={this.onPressCostCenter}>
        <Text style={styles.rowItemLeftText}>成本中心</Text>
        <Text style={styles.rowItemRightText}>{this.state.costCenter}</Text>
      </TouchableOpacity>
    );
  }

  renderIntegral() {
    return (
      <TouchableOpacity style={styles.rowItem} activeOpacity={0.6}>
        <Text style={styles.rowItemLeftText}>常旅客卡积分</Text>
        <Text style={styles.rowItemRightText}>不累计</Text>
      </TouchableOpacity>
    );
  }

  renderExtraInfo() {
    return (
      <View style={{ alignItems: 'center', margin: 10 }}>
        <Text>飞巴商旅</Text>
        <Text style={styles.phoneLink}> 致电质询</Text>
        <Text>下单表示已经阅读并接受服务条款</Text>
      </View>
    );
  }

  renderBottom() {
    return (
      <View style={{ position: 'absolute', bottom: 0, flexDirection: 'row', }}>
        <View style={styles.priceDetail}>
          <Text style={{ marginLeft: 10 }}>订单总价</Text>
          <Text style={{ fontSize: 11, color: "#797f85", marginRight: 10 }}>明细</Text>
        </View>
        <View style={styles.submitView}>
          <Text style={{ fontSize: 20, color: "#f1f2f3", marginTop: 17, marginBottom: 17 }}> 提交审批</Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View >
        <ScrollView style={styles.scrollView}>
          {this.renderFlightInfo()}
          {this.renderApprover()}
          {this.renderPassenger()}
          {this.renderContacts()}
          {/* this.renderInsurance() */}
         {<InsuranceList style={{ marginTop: 8 }} />} 
          {this.renderDeliveries()}
          {this.renderPayment()}
          {this.renderCostCenter()}
          {this.renderIntegral()}
          {this.renderExtraInfo()}
        </ScrollView>
        {this.renderBottom()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    position: 'relative',
    bottom: 60,
    marginTop: 60
  },
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: "#ffffff",
    marginTop: 8
  },
  rowItemLeftText: {
    fontSize: 14,
    color: "#323b43",
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 10
  },
  rowItemRightText: {
    fontSize: 14,
    color: "#323b43",
    marginTop: 15,
    marginBottom: 15,
    marginRight: 10
  },
  passengerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: "#ffffff",
    marginTop: 8
  },
  contentContainer: {
    width: window.width,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
  },
  priceDetail: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: "#ffffff",
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  phoneLink: {
    fontSize: 12,
    color: '#74b8f3',
    marginTop: 10,
    textDecorationLine: 'underline'
  },
  submitView: {
    flex: 1,
    backgroundColor: "#e26a6a",
    justifyContent: 'center',
    alignItems: 'center'
  },
  insuranceView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15,
    paddingBottom: 15
  },
  addPassengerBtn: {
    marginTop: 8,
    marginBottom: 8,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: "#51a6f0"
  },
  addPassengerTxt: {
    fontSize: 10,
    color: "#ffffff",
    marginLeft: 8,
    marginRight: 8,
    marginTop: 5,
    marginBottom: 5
  },
  approverView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: "#ffffff",
    marginTop: 8
  },
  deleteIcon: {
    marginLeft: 10,
    marginTop: 20,
    marginBottom: 20
  }
});

export default FillOrderPage;
