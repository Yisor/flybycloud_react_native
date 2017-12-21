import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { View, Text, Image, ListView, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import window from '../../../../utils/window';
import Divider from '../../../../components/Divider';
import Overlay from '../../../../components/Overlay';
import { fetchOrderDetail } from '../actions';
import { formatTime, getTimeString } from '../../../../utils/timeUtils';
import ResignRule from './ResignRule';
import orderDetail from './orderdetail.json';
const isStopover = [false, true]; // 是否经停

const orderStatus = ['待支付', '出票失败', '退改签', '已完成', '已取消', '出票中', '等待出票', '出票中', '需要补款', '等待出票',
  '出票中', '出票失败', '退票中', '退票失败', '退票成功', '待确认', '等待出票', '出票中', '退改签', '退改签', '退改签', '退改签']

class FlightOrderDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchOrderDetail(this.props.order));
  }

  /**
  * 退改签政策
  * @param {机票} ticket 
  */
  showResignRule(ticket) {
    let overlayView = (
      <Overlay.PullView
        style={{ alignItems: 'center', justifyContent: 'center' }}
        side='bottom'
        modal={false}
        ref={v => this.overlayPopView = v}>
        <ResignRule ticket={ticket} />
      </Overlay.PullView>
    );
    Overlay.show(overlayView);
  }

  // 改签
  onResign() {
    let { detail } = this.props;
    Actions.flightResign({ detail: detail });
  }

  // 退票
  onRefund() {
    let { detail } = this.props;
    Actions.flightRefund({ detail: detail });
  }

  // 去付款
  onPay() {
    alert('去付款');
  }

  // 取消订单
  onCancel() {
    alert('取消订单');
  }

  getFormatTime(timeStamp) {
    let date = new Date(timeStamp);
    let hour = date.getHours();
    let min = date.getMinutes();
    return `${hour}:${min}`;
  }

  renderFlightContent() {
    let { detail } = this.props;
    return (
      <View style={{ width: window.width, backgroundColor: "#51a6f0" }}>
        <View style={{ backgroundColor: "white", borderRadius: 5, margin: 10 }}>
          <View style={{ flexDirection: 'row', marginLeft: 10, marginTop: 10, }}>
            <View style={styles.carrierView}>
              <Text style={styles.carrierTxt}>实际承运</Text>
            </View>
            <Text style={{ fontSize: 11, color: "#797f85" }}>{`${detail.airlineShortName}${detail.flightNumber}`}</Text>
          </View>
          <View style={[styles.rowCenter, { marginTop: 10 }]}>
            <Text style={{ fontSize: 24, color: "#323b43" }}>{this.getFormatTime(detail.departureTime)}</Text>
            <View style={{ alignItems: 'center', }}>
              <Text style={{ fontSize: 11, color: "#797f85" }}>{isStopover[detail.isStop] ? 经停 : ' '}</Text>
              <Divider style={{ width: 60, marginLeft: 32, marginRight: 32, marginTop: 5, marginBottom: 5 }} />
              <Text style={{ fontSize: 11, color: "#797f85" }}>{}</Text>
            </View>
            <Text style={{ fontSize: 24, color: "#323b43" }}>{this.getFormatTime(detail.destinationTime)}</Text>
          </View>
          <View style={[styles.rowCenter, { marginTop: 5 }]}>
            <Text style={{ fontSize: 14, color: "#797f85", marginRight: 124 }}>{detail.departureAirportName}</Text>
            <Text style={{ fontSize: 14, color: "#797f85" }}>{detail.destinationAirportName}</Text>
          </View>
          <View style={[styles.rowCenter, { marginTop: 10 }]}>
            <Text style={{ fontSize: 11, color: "#797f85" }}>{detail.planeType}</Text>
            <Text style={{ marginLeft: 5, marginRight: 5 }}>|</Text>
            <Text style={{ fontSize: 11, color: "#797f85" }}>{detail.mainClassName}</Text>
          </View>
          <Divider style={{ marginTop: 10, borderStyle: "solid", }} />
          <View style={{ flexDirection: 'row', margin: 10 }}>
            <TouchableOpacity activeOpacity={0.6} onPress={() => this.showResignRule(detail)}>
              <Text style={{ fontSize: 11, color: "#51a6f0" }}>查看退改签</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  renderButtons() {
    let { detail } = this.props;
    let orderStatus = detail.orderStatus;
    if (orderStatus == 0) {
      return (
        <View style={styles.btnContainer}>
          <TouchableOpacity activeOpacity={0.6} style={styles.payBtn} onPress={() => this.onPay()}>
            <Text style={[styles.buttonTxt, { color: "#f1f2f3" }]}>去付款</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.6} style={styles.btnCancel} onPress={() => this.onCancel()}>
            <Text style={styles.buttonTxt}>取消订单</Text>
          </TouchableOpacity>
        </View>
      )
    } else if (orderStatus == 3) {
      return (
        <View style={styles.btnContainer}>
          <TouchableOpacity style={[styles.blueBtn, { marginRight: 10, }]} activeOpacity={0.6} onPress={() => this.onResign()}>
            <Text style={[styles.buttonTxt, { color: "#323b43" }]}>改签</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.blueBtn} activeOpacity={0.6} onPress={() => this.onRefund()}>
            <Text style={[styles.buttonTxt, { color: "#323b43" }]}>退票</Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      return null;
    }
  }

  renderOrderInfo() {
    let { detail } = this.props;
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8, backgroundColor: '#fff' }}>
        <View style={{ marginLeft: 10 }}>
          <Text style={{ fontSize: 18, color: "#e26a6a", marginTop: 15 }}>{orderStatus[detail.orderStatus]}</Text>
          <Text style={{ fontSize: 11, color: "#797f85", marginTop: 10 }}>{`订单号：${detail.orderNumber}`}</Text>
          <Text style={{ fontSize: 11, color: "#797f85", marginTop: 10, marginBottom: 10 }}>{`预定时间：${detail.createTime}`}</Text>
        </View>
        <TouchableOpacity style={{ marginRight: 10, alignItems: 'flex-end' }} activeOpacity={0.6}>
          <Text style={{ fontSize: 16, color: "#e26a6a" }}>{`￥${detail.orderPay}`}</Text>
          <Text style={{ fontSize: 11, color: "#797f85", marginTop: 8 }}>价格明细</Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderPassenger() {
    let { detail } = this.props;
    let passengers = detail.passengers ? detail.passengers : [];
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', marginTop: 8 }}>
        <Text style={{ marginLeft: 10, fontSize: 14, color: "#797f85" }}>乘机人</Text>
        <ListView
          contentContainerStyle={styles.contentContainer}
          dataSource={this.state.dataSource.cloneWithRows(passengers)}
          renderRow={this.renderPassengeRow}
          enableEmptySections={true}
          renderSeparator={() => <Divider />} />
      </View>
    );
  }

  renderPassengeRow = (rowData) => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', }}>
        <View style={{ margin: 10 }}>
          <Text style={{ fontSize: 14, color: "#333b43" }}>{rowData.name}</Text>
          <Text style={{ fontSize: 12, color: "#323b43", marginTop: 10 }}>{rowData.idcardCode}</Text>
        </View>
      </View>
    );
  }

  renderContact() {
    let { detail } = this.props;
    let contact = detail.contact ? detail.contact : {};
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', }}>
        <Text style={{ marginLeft: 10, fontSize: 14, color: "#797f85" }}>联系人</Text>
        <View style={{ margin: 10, marginLeft: 15 }}>
          <Text style={{ fontSize: 14, color: "#333b43" }}>{contact.name}</Text>
          <Text style={{ fontSize: 12, color: "#323b43", marginTop: 10 }}>{contact.phone}</Text>
        </View>
      </View>
    );
  }

  // 成本中心
  renderCostCenter() {
    return (
      <View style={styles.rowItem}>
        <Text style={styles.rowItemLeftText}>成本中心</Text>
        <Text style={styles.rowItemRightText}>{orderDetail.costCenterName}</Text>
      </View>
    )
  }

  renderExpress() {
    let { detail } = this.props;
    let express = detail.express ? detail.express : {};
    return (
      <View style={styles.rowItem}>
        <Text style={styles.rowItemLeftText}>配送信息</Text>
        <Text style={styles.rowItemRightText}>{express ? express.address : null}</Text>
      </View>
    )
  }

  renderPolicys() {
    let { detail } = this.props;
    let policys = detail.policys ? detail.policys : [];
    return (
      <TouchableOpacity style={styles.rowItem} activeOpacity={0.6}>
        <Text style={styles.rowItemLeftText}>差旅违规</Text>
        {policys && policys.map((policy, index) => (
          <Text key={index} style={styles.rowItemRightText}>{policy.overReason}</Text>
        ))}
      </TouchableOpacity>
    )
  }

  renderInsurance() {
    let { detail } = this.props;
    let insurances = detail.insurances ? detail.insurances : [];
    return (
      <TouchableOpacity style={{ width: window.width, backgroundColor: 'white', marginTop: 8 }} activeOpacity={0.6}>
        {insurances && insurances.map((item, index) => (
          <View key={index} style={{ alignItems: 'center', flexDirection: 'row', margin: 10 }}>
            <Text style={{ fontSize: 14, color: "#797f85", }}>{item.insuranceName}</Text>
            <Text style={{ fontSize: 14, color: "#323b43", marginLeft: 15 }}>{`￥${item.unitPrice}x${item.number}`}</Text>
          </View>
        ))}
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <ScrollView>
        {this.renderFlightContent()}
        {this.renderOrderInfo()}
        {this.renderButtons()}
        {this.renderPassenger()}
        {this.renderContact()}
        {this.renderPolicys()}
        {this.renderInsurance()}
        {this.renderExpress()}
        {this.renderCostCenter()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    width: window.width,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
  },
  carrierTxt: {
    fontSize: 9,
    color: "#ffffff",
    marginLeft: 5,
    marginRight: 5
  },
  carrierView: {
    borderRadius: 2,
    marginRight: 10,
    backgroundColor: "#f0b051"
  },
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowItem: {
    flexDirection: 'row',
    backgroundColor: "#fff",
    marginTop: 8,
    alignItems: 'center',
  },
  rowItemLeftText: {
    fontSize: 14,
    color: "#797f85",
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 10
  },
  rowItemRightText: {
    fontSize: 14,
    color: "#323b43",
    marginRight: 10,
    marginLeft: 15
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: "#fff",
    padding: 10
  },
  buttonTxt: {
    fontSize: 18,
    color: "#797f85",
    marginTop: 12,
    marginBottom: 12,
  },
  blueBtn: {
    flex: 1,
    borderRadius: 5,
    backgroundColor: "#78c0ff",
    alignItems: 'center',
    justifyContent: 'center'
  },
  payBtn: {
    flex: 1,
    borderRadius: 5,
    backgroundColor: "#e26a6a",
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnCancel: {
    flex: 1,
    borderRadius: 5,
    borderColor: "#d4d4d4",
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});


const select = store => ({
  detail: store.order.flightOrderDetail,
})
export default connect(select)(FlightOrderDetail);