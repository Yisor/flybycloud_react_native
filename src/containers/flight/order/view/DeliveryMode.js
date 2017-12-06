import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Image, Alert, TouchableOpacity } from 'react-native';
const expressTypes = ['不需要配送', '快递', '自取', '票务公司自取', '企业统一配送']

class DeliveryMode extends Component {

  static propTypes = {
    onPressDelivery: PropTypes.func,
    onPressAddress: PropTypes.func,
    selectedIndex: PropTypes.number.isRequired,
    receiveAddress: PropTypes.string,
    expressFee: PropTypes.number,
  }

  // 配送方式
  onPressDelivery() {
    let { onPressDelivery } = this.props;
    onPressDelivery && onPressDelivery();
  }

  // 配送地址
  onPressAddress() {
    let { onPressAddress } = this.props;
    onPressAddress && onPressAddress();
  }

  render() {
    let expressType = expressTypes[this.props.selectedIndex];
    let { expressFee } = this.props;
    if (expressType == '快递') {
      return (
        <View style={{ backgroundColor: "#fff", marginTop: 8 }}>
          <TouchableOpacity style={styles.rowItem} activeOpacity={0.6} onPress={() => this.onPressDelivery()}>
            <Text style={styles.rowItemLeftText}>配送方式</Text>
            <View style={styles.expressTypeView}>
              <Text style={styles.rowItemRightText}>{expressType}</Text>
              <Text style={{ fontSize: 14, color: "#51a6f0" }}>{`快递费￥${expressFee}`}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginRight: 10 }}
            activeOpacity={0.6}
            onPress={() => this.onPressAddress()}>
            <Text style={styles.rowItemLeftText}>配送地址</Text>
            <Text style={styles.rowItemRightText}>{this.props.receiveAddress}</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <TouchableOpacity style={styles.rowItem} activeOpacity={0.6} onPress={() => this.onPressDelivery()}>
          <Text style={styles.rowItemLeftText}>配送方式</Text>
          <View style={styles.expressTypeView}>
            <Text style={styles.rowItemRightText}>{expressType}</Text>
          </View>
        </TouchableOpacity>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
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
  expressTypeView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 15,
    marginRight: 10
  }
});

export default DeliveryMode;
