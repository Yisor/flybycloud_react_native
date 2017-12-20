/*
 *  @File   : FlightOrderList
 *  @Author : lsl
 *  @Date   : 2017-12-2 15:43:16
 *  @Last Modified   : 2017-12-2 15:43:16
 *  @Desc 机票订单
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { View, Text, Image, ListView, StyleSheet, Alert, TouchableOpacity } from 'react-native';

import window from '../../../../utils/window';
import Divider from '../../../../components/Divider';
import SegmentedBar from '../../../../components/SegmentedBar';
import LoadMoreFooter from './LoadMoreFooter';
import { fetchFlightOrders, loadMoreOrders } from '../actions';
import { getCurrentTime } from '../../../../utils/timeUtils';

const orderStatus = ['待支付', '出票失败', '退改签', '已完成', '已取消', '出票中', '等待出票', '出票中', '需要补款', '等待出票',
  '出票中', '出票失败', '退票中', '退票失败', '退票成功', '待确认', '等待出票', '出票中', '退改签', '退改签', '退改签', '退改签']

class FlightOrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
      barIndex: 0,
    }
  }

  componentDidMount() {
    this.getData(0, getCurrentTime());
  }

  getData(status, orderTime) {
    this.props.dispatch(fetchFlightOrders({ status, orderTime }));
  }

  loadMoreData(status, orderTime) {
    this.props.dispatch(loadMoreOrders({ status, orderTime }));
  }

  getLastElement() {
    let { orders } = this.props;
    if (orders && orders.length > 0) {
      let ele = orders[orders.length - 1];
      console.log(JSON.stringify(ele));
      return ele.createTime;
    }
    return;
  }

  onPressRow(rowData) {
    Actions.flightOrderDetail({ order: rowData });
  }

  renderSegmentedBar() {
    return (
      <SegmentedBar
        indicatorPosition='bottom'
        indicatorType='itemWidth'
        onChange={(index) => { this.getData(index, getCurrentTime()) }}>
        <SegmentedBar.Item title='全部' titleStyle={styles.barTitleStyle} activeTitleStyle={{ fontSize: 15 }} />
        <SegmentedBar.Item title='待付款' titleStyle={styles.barTitleStyle} activeTitleStyle={{ fontSize: 15 }} />
        <SegmentedBar.Item title='已完成' titleStyle={styles.barTitleStyle} activeTitleStyle={{ fontSize: 15 }} />
        <SegmentedBar.Item title='已取消' titleStyle={styles.barTitleStyle} activeTitleStyle={{ fontSize: 15 }} />
      </SegmentedBar>
    )
  }

  renderRow = (rowData) => {
    let date = new Date(rowData.departureTime);
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    return (
      <TouchableOpacity activeOpacity={0.6} style={styles.rowContainer} onPress={() => this.onPressRow(rowData)}>
        <View style={{ marginLeft: 18 }}>
          <Text style={{ color: '#323b43', marginTop: 10 }}>{`${rowData.departureCityName} - ${rowData.destinationCityName}`}</Text>
          <Text style={{ color: '#797f85', marginTop: 10 }}>{rowData.airlineShortName}</Text>
          <Text style={{ color: '#797f85', marginTop: 10, marginBottom: 10 }}>{`出发时间：${year} - ${month} - ${day}`}</Text>
        </View>
        <View style={{ marginRight: 18, alignItems: 'flex-end' }}>
          <Text style={{ color: '#e26a6a', marginBottom: 12 }}>{`￥${rowData.orderPay}`}</Text>
          <Text>{`${orderStatus[rowData.orderStatus]}`}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  renderFooter() {
    let { status } = this.props;
    let loadState = status && status == 'Done';
    return (
      <LoadMoreFooter isLoadAll={loadState} />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderSegmentedBar()}
        <ListView
          contentContainerStyle={styles.contentContainer}
          dataSource={this.state.dataSource.cloneWithRows(this.props.orders)}
          renderRow={this.renderRow}
          enableEmptySections={true}
          renderSeparator={() => <Divider />}
          renderFooter={() => this.renderFooter()}
          onEndReachedThreshold={50}
          onEndReached={() => { this.loadMoreData(0, getCurrentTime(this.getLastElement())) }} />
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
  contentContainer: {
    width: window.width,
    justifyContent: 'flex-start',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 10
  },
  barTitleStyle: {
    fontSize: 15,
    color: "#323b43"
  },
});


const select = store => ({
  orders: store.order.flightOrders,
  status: store.order.status,
})
export default connect(select)(FlightOrderList);
