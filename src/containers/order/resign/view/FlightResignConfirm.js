import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, TextInput, TouchableOpacity, ListView, ScrollView, StyleSheet } from 'react-native';
import FlightInfo from '../../../flight/order/view/FlightInfo';
import Divider from '../../../../components/Divider';
import window from '../../../../utils/window';
import Overlay from '../../../../components/Overlay';
import PassengerListRow from '../../refund/view/PassengerListRow';
import { queryChangeFee } from '../actions';

const reasons = ['行程变更、订错等主观原因', '航司、机场或天气原因造成航班延误或取消', '个人健康原因(有二甲以上医院医生开具不宜乘机证明)', '其他']
const reasonList = ['自愿退票', '非自愿(航班延误或取消)', '非自愿(个人健康原因)', '非自愿(其他)']

class FlightResignConfirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
      selectReasonIndex: null,
      isShowDetail: false
    };
    selectedUser = [];
    windowKey = null;
  }

  componentDidMount() {
    let { flightDetails, params } = this.props;
    let orderDetail = params.orderDetail;
    let ticket = flightDetails.ticket;
    let flightId = ticket.flightId;
    let ticketId = ticket.ticketId;
    let orderFlightId = orderDetail.flightId;
    let orderId = orderDetail.orderId;
    let param = { orderId, flightId, ticketId, orderFlightId }
    this.props.dispatch(queryChangeFee(param));
  }

  // 计算费用
  calculatCost() {
    let { resign, params } = this.props;
    let userNumber = params.passengers.length;
    return (Number(resign.changeFee) + Number(resign.upgradeFee) + Number(resign.serviceFee)) * userNumber;
  }

  // 选择改签原因
  onSelectReason(index) {
    windowKey ? Overlay.hide(windowKey) : null;
    this.setState({ selectReasonIndex: index });
  }

  getReasonTxt(index) {
    return reasonList[index];
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

  // 显示明细
  onShowDetail = () => {
    let isShow = this.state.isShowDetail;
    this.setState({ isShowDetail: !isShow });
  }

  renderFlightInfo() {
    let { flightDetails } = this.props;
    return (<FlightInfo flightDetails={flightDetails} />)
  }

  renderPassengers() {
    let { passengers } = this.props.params;
    return (
      <View style={{ backgroundColor: '#fff', marginTop: 8, }}>
        <View style={{ justifyContent: 'center', borderColor: '#d4d4d4', borderBottomWidth: 0.5 }} >
          <Text style={{ fontSize: 14, color: "#797f85", margin: 15, marginLeft: 10 }}>请选择改签乘客</Text>
        </View>
        <ListView
          contentContainerStyle={styles.contentContainer}
          dataSource={this.state.dataSource.cloneWithRows(passengers)}
          renderRow={this.renderPassengerRow}
          enableEmptySections={true}
          renderSeparator={() => <Divider />} />
      </View>
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
          <Text style={{ fontSize: 14, color: "#797f85", margin: 15, marginLeft: 10 }}>改签原因</Text>
          <Text style={{ fontSize: 14, color: "#323b43", margin: 15, }}>{reasonTxt}</Text>
          <Image style={styles.imgNext} source={require('../../../../resources/assets/common/1_arrow_icon.png')} />
        </TouchableOpacity>
        {index && index > 0 ? <View>
          <View style={styles.resignView} >
            <Text style={{ fontSize: 14, color: "#797f85", margin: 15, marginLeft: 10 }}>改签说明</Text>
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

  renderDetail() {
    let { resign, params } = this.props;
    let userNumber = params.passengers.length;
    return this.state.isShowDetail ?
      <View style={{ position: 'absolute', bottom: 55, width: window.width, height: window.heigh }}>
        <View style={{ backgroundColor: 'rgba(52, 52, 52, 0.5)', flex: 1 }} />
        <View style={{ backgroundColor: "#fff", }}>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <Text style={{ fontSize: 14, color: "#323b43", marginLeft: 10, }}>改签费用</Text>
            <Text style={{ fontSize: 10, color: "#e26a6a", marginLeft: 10 }}>{`￥${resign.changeFee}`}</Text>
            <Text style={{ fontSize: 14, color: "#323b43", marginLeft: 10 }}>{`x${userNumber}人`}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 7 }}>
            <Text style={{ fontSize: 14, color: "#323b43", marginLeft: 10, }}>升舱费</Text>
            <Text style={{ fontSize: 10, color: "#e26a6a", marginLeft: 10 }}>{`￥${resign.upgradeFee}`}</Text>
            <Text style={{ fontSize: 14, color: "#323b43", marginLeft: 10 }}>{`x${userNumber}人`}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 7, marginBottom: 10 }}>
            <Text style={{ fontSize: 14, color: "#323b43", marginLeft: 10, }}>服务费</Text>
            <Text style={{ fontSize: 10, color: "#e26a6a", marginLeft: 10 }}>{`￥${resign.serviceFee}`}</Text>
            <Text style={{ fontSize: 14, color: "#323b43", marginLeft: 10 }}>{`x${userNumber}人`}</Text>
          </View>
        </View>
      </View> : null;
  }

  renderButtomBtn() {
    let totalCost = this.calculatCost();
    return (
      <View style={styles.bottomView}>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginLeft: 10 }}>
          <Text style={{ fontSize: 18, color: '#e26a6a' }}>{`￥${totalCost}`}</Text>
          <TouchableOpacity style={styles.detailContainer} activeOpacity={0.6} onPress={this.onShowDetail}>
            <Text style={{ fontSize: 11, color: "#797f85" }}>明细</Text>
            <Image style={styles.imgDown} source={require('../../../../resources/assets/common/2_arrow_icon.png')} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity activeOpacity={0.6} style={styles.submitView}>
          <Text style={{ fontSize: 20, color: "#f1f2f3" }}>提交审批</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container} >
        <ScrollView style={styles.scrollView}>
          {this.renderFlightInfo()}
          {this.renderPassengers()}
          {this.renderReason()}
        </ScrollView>
        {this.renderDetail()}
        {this.renderButtomBtn()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  resignView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#d4d4d4',
    borderBottomWidth: 0.5
  },
  reasonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    marginTop: 8,
    alignItems: 'center'
  },
  imgDown: {
    marginLeft: 10,
    marginRight: 10,
    transform: [{ rotateZ: '270deg' }]
  },
  imgNext: {
    margin: 15,
    transform: [{ rotate: '180deg' }]
  },
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
});

const select = store => ({
  status: store.flight.order.status,
  resign: store.resign.changeFee,
  flightDetails: store.flight.detail.flightDetails
})
export default connect(select)(FlightResignConfirm);
