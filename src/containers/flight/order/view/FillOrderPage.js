import React, { Component } from 'react';
import { View, Text, Image, ListView, ScrollView, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Overlay from '../../../../components/Overlay';
import window from '../../../../utils/window';
import Divider from '../../../../components/Divider';
import { get, post } from '../../../../service/request';
import apiUrl from '../../../../constants/api';
import { insuranceChecked, fetchFillOrderData, checkPassenger } from '../action';
import { formatTime, getTimeString } from '../../../../utils/timeUtils';
import costCenter from './costcenter.json';
import InsuranceList from './InsuranceList';
import CostCenterPicker from './CostCenterPicker';
import ExpressTypePicker from './ExpressTypePicker';
import FlightInfo from './FlightInfo';
import DeliveryMode from './DeliveryMode';
import CostDetail from './CostDetail';

const isStopover = [false, true]; // 是否经停
const expressTypes = ['不需要配送', '快递', '自取', '票务公司自取', '企业统一配送'];

class FillOrderPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
      passengers: [],
      reasonSelectedIndex: -1,
      costCenterSelectedIndex: 0,
      expressTypeSelectedIndex: this.props.user.expressType,
      receiveAddress: null,
      selectedInsurances: [],
      modalVisible: false,
    };
  }

  componentWillMount() {
    flight = this.props.flight;
    ticket = this.props.ticket;
  }

  componentDidMount() {
    this.props.dispatch(fetchFillOrderData());
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.passengers && nextProps.passengers != this.state.passengers) {
      this.checkPolicy(nextProps.passengers);
      this.setState({ passengers: nextProps.passengers });
    }
    if (nextProps.address) {
      this.setState({ receiveAddress: nextProps.address.receiveAddress });
    }
  }

  // 校验乘客是否违规
  checkPolicy(passengers) {
    this.props.dispatch(checkPassenger({ ticket, passengers }));
  }

  // 显示违规原因选择窗口
  onPressCheckPolicy() {
    CostCenterPicker.showReason(
      this.props.reasons,
      this.state.reasonSelectedIndex,
      (item, index) => { this.setState({ reasonSelectedIndex: index }) }
    );
  }

  // 添加乘客
  onAddPassenger() {
    Actions.passengerSelect();
  }

  // 配送方式
  onPressDeliveries() {
    ExpressTypePicker.show(
      expressTypes,
      this.state.expressTypeSelectedIndex,
      (item, index) => { this.setState({ expressTypeSelectedIndex: index }) }
    );
  }

  // 配送地址
  onReceiveAddress() {
    Actions.addressList();
  }

  // 成本中心点击
  onPressCostCenter() {
    CostCenterPicker.show(
      this.props.costCenter,
      this.state.costCenterSelectedIndex,
      (item, index) => { this.setState({ costCenterSelectedIndex: index }) }
    );
  }

  // 保险选择
  onSelectInsurance(datas) {
    this.props.dispatch(insuranceChecked(datas));
  }

  onPressDetail() {
    // Actions.costDetail({ flight: flight, ticket: ticket, passengers: this.state.passengers, insurances: this.props.insurances });
    // let visible = this.state.modalVisible;
    // this.setState({ modalVisible: !visible });
  }

  renderFlightInfo() { return (<FlightInfo flight={flight} ticket={ticket} />) }

  // 是否违反差旅政策
  renderTravelPolicy() {
    let { reasonSelectedIndex } = this.state;
    let { reasons, checkResult } = this.props;
    let reason = (reasonSelectedIndex > -1 && reasons.length > 0) ? reasons[reasonSelectedIndex].reasonInfo : '请选择原因';
    let TravelPolicyItem = checkResult.length > 0 ?
      <View style={styles.approverView}>
        <View>
          <Text style={[styles.approverTxt, { color: "#e26a6a", marginRight: 55 }]}>
            已选乘机人当中有人违反了对应级别的差旅政策
          </Text>
          <TouchableOpacity activeOpacity={0.6} onPress={() => this.onPressCheckPolicy()}>
            <Text style={[styles.approverTxt, { color: "#e26a6a", marginRight: 55, marginTop: 0 }]}>{reason}</Text>
          </TouchableOpacity>
        </View>
      </View> : null;
    return TravelPolicyItem;
  }

  // 审批人
  renderApprover() {
    return (
      <TouchableOpacity
        style={styles.approverView}
        activeOpacity={0.6}
        onPress={() => { Actions.auditorList({ audits: this.props.audits }) }}>
        <Text style={styles.approverTxt}>查看审批人</Text>
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
    let { user } = this.props;
    return (
      <View style={{ backgroundColor: "#ffffff", marginTop: 8 }}>
        <View style={styles.contactItemView}>
          <Text style={{ fontSize: 14, color: "#797f85", marginLeft: 10 }}>联系人</Text>
          <Text style={{ fontSize: 14, color: "#323b43", marginLeft: 40 }}>{user.userName}</Text>
        </View>
        <Divider style={{ marginLeft: 10 }} />
        <View style={styles.contactItemView}>
          <Text style={{ fontSize: 14, color: "#797f85", marginLeft: 10 }}>联系方式</Text>
          <Text style={{ fontSize: 14, color: "#323b43", marginLeft: 25 }}>{user.userPhone}</Text>
        </View>
        <View style={styles.contactItemView}>
          <Text style={{ fontSize: 14, color: "#797f85", marginLeft: 10 }}>选择短信接收人:</Text>
          <Text style={{ fontSize: 14, color: "#323b43", marginLeft: 25 }}>{user.userPhone}</Text>
        </View>
      </View>
    );
  }

  // 保险
  renderInsurance() {
    return (
      <InsuranceList
        style={{ marginTop: 8 }}
        datas={this.props.insurances}
        onSelect={(datas, index) => this.onSelectInsurance(datas)} />);
  }

  // 配送方式
  renderDeliveries() {
    let { user } = this.props;
    return (
      <DeliveryMode
        expressFee={user.expressFee}
        receiveAddress={this.state.receiveAddress}
        selectedIndex={this.state.expressTypeSelectedIndex}
        onPressDelivery={() => this.onPressDeliveries()}
        onPressAddress={() => this.onReceiveAddress()} />
    );
  }

  // 支付方式
  renderPayment() {
    let { user } = this.props;
    return (
      <TouchableOpacity style={styles.rowItem} activeOpacity={0.6}>
        <Text style={styles.rowItemLeftText}>支付方式</Text>
        <Text style={styles.rowItemRightText}>{user.payType == 1 ? '在线支付' : '企业垫付'}</Text>
      </TouchableOpacity>
    );
  }

  // 成本中心
  renderCostCenter() {
    let { costCenterSelectedIndex } = this.state;
    let selected = this.props.costCenter ? this.props.costCenter[costCenterSelectedIndex] : null;
    let costCenterName = (selected && selected.costCenterName) ? selected.costCenterName : null;
    return (
      <TouchableOpacity style={styles.rowItem} activeOpacity={0.6} onPress={() => this.onPressCostCenter()}>
        <Text style={styles.rowItemLeftText}>成本中心</Text>
        <Text style={styles.rowItemRightText}>{costCenterName}</Text>
      </TouchableOpacity>
    );
  }

  // 常旅客卡积分
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

  // 计算总价
  calculateCost() {
    let insurancesTotal = 0;
    this.props.insuranceChecked.map((item) => {
      insurancesTotal += item.unitPrice;
    });

    let totalPerson = this.state.passengers.length == 0 ? 1 : this.state.passengers.length;
    let totalPrice = (Number(ticket.price) + Number(ticket.buildFee) + Number(ticket.oilFee) + Number(insurancesTotal)) * totalPerson;
    return totalPrice;
  }

  renderBottom() {
    let totalPrice = this.calculateCost();
    return (
      <View style={{ position: 'absolute', bottom: 0, flexDirection: 'row', }}>
        <View style={styles.priceDetail}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ marginLeft: 10 }}>订单总价</Text>
            <Text style={{ color: "#e26a6a" }}>{`￥${totalPrice}`}</Text>
          </View>
          <TouchableOpacity style={{ marginRight: 10 }} activeOpacity={0.6} onPress={() => this.onPressDetail()}>
            <Text style={{ fontSize: 11, color: "#797f85" }}>明细</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.submitView}>
          <Text style={{ fontSize: 20, color: "#f1f2f3", marginTop: 17, marginBottom: 17 }}>提交审批</Text>
        </View>
      </View>
    );
  }

  renderModal() {
    return (
      <CostDetail flight={flight} ticket={ticket} passengers={this.state.passengers} insurances={this.props.insurances} />
    )
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.scrollView}>
          {this.renderFlightInfo()}
          {this.renderApprover()}
          {this.renderTravelPolicy()}
          {this.renderPassenger()}
          {this.renderContacts()}
          {this.renderInsurance()}
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
  scrollView: {
    position: 'relative',
    bottom: 60,
    marginTop: 60
  },
  rowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: "#ffffff",
    marginTop: 8,
    alignItems: 'center',
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
  approverTxt: {
    fontSize: 14,
    color: "#323b43",
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 20
  },
  deleteIcon: {
    marginLeft: 10,
    marginTop: 20,
    marginBottom: 20
  },
  contactItemView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 15
  }
});

const select = store => ({
  audits: store.flight.order.audits,
  insurances: store.flight.order.insurances,
  insuranceChecked: store.flight.order.insuranceChecked,
  costCenter: store.flight.order.costCenter,
  checkResult: store.flight.order.checkResult,
  reasons: store.flight.order.reasons,
  status: store.flight.order.status,
  user: store.user.login.user
})
export default connect(select)(FillOrderPage);