import React, { Component } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ListView, ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Divider from '../../../../components/Divider';
import window from '../../../../utils/window';
import Overlay from '../../../../components/Overlay';
import PassengerListRow from '../../refund/view/PassengerListRow';
import { queryRefundDetail } from '../actions';


const passengers = [
  {
    "name": "陈磊",
    "idcardType": "1",
    "idcardCode": "330103198301051053",
    "orderPassengerId": 153558,
    "ticketId": 153494,
    "ticketStatus": 7
  },
  {
    "name": "陈经济",
    "idcardType": "1",
    "idcardCode": "330103198301051023",
    "orderPassengerId": 153528,
    "ticketId": 153294,
    "ticketStatus": 7
  }
];
const reasons = ['行程变更、订错等主观原因', '航司、机场或天气原因造成航班延误或取消', '个人健康原因(有二甲以上医院医生开具不宜乘机证明)', '其他']

class RefundConfirmPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
      selectReasonIndex: null,
    };
    selectedUser = [];
    windowKey = null;
  }

  componentDidMount() {
    let params = { refundWay: '1', orderId: 146073, flightId: 146000 };
    this.props.dispatch(queryRefundDetail(params));
  }

  onSelectReason(index) {
    windowKey ? Overlay.hide(windowKey) : null;
    this.setState({ selectReasonIndex: index });
  }

  getReasonTxt(index) {
    switch (index) {
      case 0:
        return '自愿退票';
        break;
      case 1:
        return '非自愿(航班延误或取消)';
        break;
      case 2:
        return '非自愿(个人健康原因)';
        break;
      case 3:
        return '非自愿(其他)';
        break;
    }
  }

  // 退票原因
  showRefundReason() {
    let overlayView = (
      <Overlay.PullView
        style={{ alignItems: 'center', justifyContent: 'center' }}
        side='bottom'
        modal={false}
        ref={v => this.overlayPopView = v}>
        <Text style={{ fontSize: 13, color: "#51a6f0", margin: 10 }}>自愿退票</Text>
        <Text style={styles.reasonTxt} onPress={() => { this.onSelectReason(0) }}>{reasons[0]}</Text>
        <View style={{ backgroundColor: "#f0f2f5", height: 10 }} />
        <Text style={{ fontSize: 13, color: "#f0b051", margin: 10 }}>非自愿退票</Text>
        <Text style={styles.reasonTxt} onPress={() => this.onSelectReason(1)}>{reasons[1]}</Text>
        <Text style={styles.reasonTxt} onPress={() => this.onSelectReason(2)}>{reasons[2]}</Text>
        <Text style={styles.reasonTxt} onPress={() => this.onSelectReason(3)}>{reasons[3]}</Text>
      </Overlay.PullView >
    );
    windowKey = Overlay.show(overlayView);
  }

  // 实际支付
  renderActualPay() {
    let { detail, refund } = this.props;
    let number = detail.passengers.length;
    let sumpay = refund.paidTicketFee + refund.paidTaxFee + refund.paidServiceFee;
    return (
      <View style={{ backgroundColor: '#fff', borderColor: '#d4d4d4', borderBottomWidth: 0.5 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
          <Text style={{ fontSize: 18, color: "#323b43", marginTop: 15, marginBottom: 15, marginLeft: 20 }}>实际支付</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 16, color: "#e26a6a", marginTop: 15, marginBottom: 15 }}>{`￥${sumpay}`}</Text>
            <Image style={{ margin: 15, transform: [{ rotateZ: '270deg' }] }} source={require('../../../../resources/assets/common/1_arrow_icon.png')} />
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 14, color: "#323b43", marginLeft: 20 }}>机票费用</Text>
          <Text style={{ fontSize: 10, color: "#e26a6a", marginLeft: 20 }}>{`￥${refund.paidTicketFee}`}</Text>
          <Text style={{ fontSize: 14, color: "#323b43", marginLeft: 20 }}>{`x${number}人`}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 14, color: "#323b43", marginLeft: 20 }}>税费</Text>
          <Text style={{ fontSize: 10, color: "#e26a6a", marginLeft: 20 }}>{`￥${refund.paidTaxFee}`}</Text>
          <Text style={{ fontSize: 14, color: "#323b43", marginLeft: 20 }}>{`x${number}人`}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          <Text style={{ fontSize: 14, color: "#323b43", marginLeft: 20 }}>服务费</Text>
          <Text style={{ fontSize: 10, color: "#e26a6a", marginLeft: 20 }}>{`￥${refund.paidServiceFee}`}</Text>
          <Text style={{ fontSize: 14, color: "#323b43", marginLeft: 20 }}>{`x${number}人`}</Text>
        </View>
      </View>
    );
  }

  // 需扣款项
  renderNeedPay() {
    let { detail, refund } = this.props;
    let number = detail.passengers.length;
    return (
      <View style={{ backgroundColor: '#fff' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
          <Text style={{ fontSize: 18, color: "#323b43", marginTop: 15, marginBottom: 15, marginLeft: 20 }}>需扣款项</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 16, color: "#e26a6a", marginTop: 15, marginBottom: 15, marginRight: 10 }}>{`￥${refund.deductTicketFee + refund.deductServiceFee}`}</Text>
            <Image style={{ margin: 15, transform: [{ rotateZ: '270deg' }] }} source={require('../../../../resources/assets/common/1_arrow_icon.png')} />
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          <Text style={{ fontSize: 14, color: "#323b43", marginLeft: 20 }}>退票费</Text>
          <Text style={{ fontSize: 10, color: "#e26a6a", marginLeft: 20 }}>{`￥${refund.deductTicketFee}`}</Text>
          <Text style={{ fontSize: 14, color: "#323b43", marginLeft: 20 }}>{`x${number}人`}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          <Text style={{ fontSize: 14, color: "#323b43", marginLeft: 20 }}>服务费</Text>
          <Text style={{ fontSize: 10, color: "#e26a6a", marginLeft: 20 }}>{`￥${refund.deductServiceFee}`}</Text>
          <Text style={{ fontSize: 14, color: "#323b43", marginLeft: 20 }}>{`x${number}人`}</Text>
        </View>
      </View>
    );
  }

  // 退保险
  renderRefundInsurance() {
    return (
      <View style={{ flexDirection: 'row', backgroundColor: '#fff', alignItems: 'center' }}>
        <Text style={{ fontSize: 12, color: "#a0a4a8", marginLeft: 20, marginBottom: 10, marginTop: 10 }}>退保险请联系代理人处理</Text>
        <TouchableOpacity>
          <Image
            style={{ width: 25, height: 25, marginLeft: 10, marginBottom: 10, marginTop: 10 }}
            source={require('../../../../resources/assets/order/order_phone.png')} />
        </TouchableOpacity>
      </View>
    )
  }

  // 退款说明
  renderRefundCaption() {
    return (
      <View>
        <Text style={{ fontSize: 12, color: "#a0a4a8", margin: 10 }}>
          *起飞前7日、2小时和起飞前后等时间申请退票可能会产生不同的退票费用，实际退还金额以航司为准。
       </Text>
      </View>
    );
  }

  // 航班信息
  renderFlightInfo() {
    return (
      <View style={{ flexDirection: 'row', backgroundColor: '#fff' }}>
        <Text style={{ fontSize: 13, color: "#323b43", margin: 15, marginLeft: 10 }}>11月21日</Text>
        <Text style={{ fontSize: 13, color: "#323b43", margin: 15, }}>杭州-北京</Text>
        <Text style={{ fontSize: 13, color: "#323b43", margin: 15, }}>17:50起飞</Text>
      </View>
    );
  }

  renderPassengers() {
    return (
      <ListView
        contentContainerStyle={styles.contentContainer}
        dataSource={this.state.dataSource.cloneWithRows(this.props.passengers)}
        renderRow={this.renderPassengerRow}
        enableEmptySections={true}
        renderSeparator={() => <Divider />} />
    );
  }

  renderPassengerRow = (rowData) => {
    return (
      <PassengerListRow passenger={rowData} onPress={() => {
        let index = selectedUser.indexOf(rowData);
        index > -1 ? selectedUser.splice(index, 1) : selectedUser.push(rowData);
        console.log('选择的是：' + JSON.stringify(selectedUser));
      }} />
    )
  }

  renderReason() {
    let index = this.state.selectReasonIndex;
    let reasonTxt = index != null ? this.getReasonTxt(index) : '请选择退票原因';
    return (
      <View style={{ backgroundColor: '#fff', marginTop: 8 }}>
        <TouchableOpacity activeOpacity={0.6} style={styles.reasonContainer} onPress={() => this.showRefundReason()}>
          <Text style={{ fontSize: 14, color: "#797f85", margin: 15, marginLeft: 10 }}>退票原因</Text>
          <Text style={{ fontSize: 14, color: "#323b43", margin: 15, }}>{reasonTxt}</Text>
          <Image style={{ margin: 15, transform: [{ rotate: '180deg' }] }} source={require('../../../../resources/assets/common/1_arrow_icon.png')} />
        </TouchableOpacity>
        {index && index > 0 ? <View>
          <View style={styles.resignView} >
            <Text style={{ fontSize: 14, color: "#797f85", margin: 15, marginLeft: 10 }}>退票说明</Text>
            <TextInput style={styles.textInput} placeholder='最少1字，最多120字' placeholderTextColor="#a0a4a8" underlineColorAndroid='transparent' />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }} >
            <Text style={{ fontSize: 14, color: "#797f85", margin: 15, marginLeft: 10 }}>上传证明</Text>
            <Text style={{ fontSize: 14, color: "#323b43", margin: 15, }}>请按航司要求上传凭证(选填)</Text>
          </View>
        </View> : null
        }
      </View>
    );
  }

  renderButtomBtn() {
    let { refund } = this.props;
    return (
      <View style={styles.bottomView}>
        <View style={{ flex: 1, height: 55, justifyContent: 'center', marginLeft: 10 }}>
          <Text style={{ fontSize: 18, color: '#e26a6a' }}>{`￥${refund.refundTotalMoney}`}</Text>
          <Text style={{ fontSize: 12, color: '#323b43' }}>预计退还</Text>
        </View>
        <TouchableOpacity activeOpacity={0.6} style={styles.submitView}>
          <Text style={{ fontSize: 20, color: "#f1f2f3" }}>提交审批</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.scrollView}>
          {this.renderActualPay()}
          {this.renderNeedPay()}
          {this.renderRefundInsurance()}
          {this.renderRefundCaption()}
          {this.renderFlightInfo()}
          {this.renderPassengers()}
          {this.renderReason()}
        </ScrollView>
        {this.renderButtomBtn()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  reasonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    marginTop: 8,
    alignItems: 'center'
  },
  scrollView: {
    position: 'relative',
    bottom: 60,
    marginTop: 60
  },
  contentContainer: {
    width: window.width,
    backgroundColor: 'white',
  },
  reasonTxt: {
    fontSize: 15,
    color: "#323b43",
    margin: 10
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: "#323b43",
    height: 40,
    marginLeft: 10
  },
  submitView: {
    flex: 1,
    backgroundColor: "#e26a6a",
    alignItems: 'center',
    height: 55,
    justifyContent: 'center'
  },
  bottomView: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#fff"
  },
  resignView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#d4d4d4',
    borderBottomWidth: 0.5
  }
});

const select = store => ({
  refund: store.refund.refundDetail,
  status: store.refund.status,
})
export default connect(select)(RefundConfirmPage);
