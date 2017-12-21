import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Divider from '../../../../components/Divider';

class RefundConfirmPage extends Component {
  renderActualPay() {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fff' }}>
        <Text style={{ fontSize: 18, color: "#323b43", marginTop: 15, marginBottom: 15, marginLeft: 10 }}>实际支付</Text>
        <Text style={{ fontSize: 16, color: "#e26a6a", marginTop: 15, marginBottom: 15, marginRight: 10 }}>{`￥${2180}`}</Text>
      </View>
    );
  }

  render() {
    return (
      <View>
        {this.renderActualPay()}
        <Divider />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fff' }}>
          <Text style={{ fontSize: 18, color: "#323b43", marginTop: 15, marginBottom: 15, marginLeft: 10 }}>需扣款项</Text>
          <Text style={{ fontSize: 16, color: "#e26a6a", marginTop: 15, marginBottom: 15, marginRight: 10 }}>{`￥${280}`}</Text>
        </View>
        <View style={{ flexDirection: 'row', backgroundColor: '#fff', alignItems: 'center' }}>
          <Text style={{ fontSize: 12, color: "#a0a4a8", marginLeft: 20, marginBottom: 10, marginTop: 10 }}>退保险请联系代理人处理</Text>
          <TouchableOpacity>
            <Image
              style={{ width: 25, height: 25, marginLeft: 10, marginBottom: 10, marginTop: 10 }}
              source={require('../../../../resources/assets/order/order_phone.png')} />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{ fontSize: 12, color: "#a0a4a8", margin: 10 }}>
            *起飞前7日、2小时和起飞前后等时间申请退票可能会产生不同的退票费用，实际退还金额以航司为准。
          </Text>
        </View>
        <View style={{ flexDirection: 'row', backgroundColor: '#fff' }}>
          <Text style={{ fontSize: 13, color: "#323b43", margin: 15, marginLeft: 10 }}>11月21日</Text>
          <Text style={{ fontSize: 13, color: "#323b43", margin: 15, }}>杭州-北京</Text>
          <Text style={{ fontSize: 13, color: "#323b43", margin: 15, }}>17:50起飞</Text>
        </View>
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
});

export default RefundConfirmPage;
