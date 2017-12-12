/*
 *  @File   : FlightListPage
 *  @Author : lsl
 *  @Date   : 2017-12-1 16:12:7
 *  @Last Modified   : 2017-12-1 16:12:7
 *  @Desc 航班列表
 */
import React, { Component } from 'react';
import { View, Text, Image, ListView, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { flightQuery, flightDescByTime, flightDescByPrice, airlineQuery } from '../action';
import TabView from '../../../../components/TabView';
import window from '../../../../utils/window';
import Divider from '../../../../components/Divider';
import FlightItem from './FlightItem';
import FlightFilter from './FlightFilter';

class FlightListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
      visible: false,
    };
  }

  componentDidMount() {
    this.props.dispatch(flightQuery(this.props.params));
    this.props.dispatch(airlineQuery());
  }

  onPressItem(rowData) {
    let isGpTicket = this.props.params.isGpTicket;
    Actions.flightDetail({ 'flight': rowData, 'isGpTicket': isGpTicket });
  }

  renderRow = (rowData) => {
    return (<FlightItem rowData={rowData} onPressItem={(data) => this.onPressItem(data)} />)
  }

  descByTime() {
    let { flights } = this.props;
    this.props.dispatch(flightDescByTime(flights));
  }

  descByPrice() {
    let { flights } = this.props;
    this.props.dispatch(flightDescByPrice(flights));
  }

  setFilterVisible(visible) {
    this.setState({ visible });
  }

  renderBottomTab() {
    let { flights } = this.props;
    return (
      <TabView barStyle={{ backgroundColor: 'white' }} type='projector' onChange={(index) => { }}>
        <TabView.Sheet
          title='时间'
          icon={require('../../../../resources/assets/plane/tab_time_active.png')}
          activeIcon={require('../../../../resources/assets/plane/tab_time_active.png')}
          onPress={() => this.descByTime()} />
        <TabView.Sheet
          title='价格'
          icon={require('../../../../resources/assets/plane/tab_price.png')}
          activeIcon={require('../../../../resources/assets/plane/tab_price_2.png')}
          onPress={() => this.descByPrice()} />
        <TabView.Sheet
          title='筛选'
          icon={require('../../../../resources/assets/plane/tab_screening_1.png')}
          activeIcon={require('../../../../resources/assets/plane/tab_screening_2.png')}
          onPress={() => this.setFilterVisible(true)} />
      </TabView>
    );
  }

  renderCalendarNar() {
    return (
      <View style={styles.calendar}>
        <TouchableOpacity style={[styles.rowCenter, { marginLeft: 10 }]} activeOpacity={0.6}>
          <Image style={[styles.arrowImg, { marginRight: 10 }]} resizeMode="contain"
            source={require('../../../../resources/assets/common/arrow_white_icon.png')} />
          <Text style={{ color: 'white' }}>前一天</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.rowCenter, styles.dateView]} activeOpacity={0.6}>
          <Text style={{ marginLeft: 10 }}>02月27日</Text>
          <Text style={{ marginLeft: 10 }}>周一</Text>
          <Image style={{ marginLeft: 10, marginRight: 10 }} resizeMode="contain"
            source={require('../../../../resources/assets/common/vertical_divider.png')} />
          <Image style={{ width: 15, height: 15 }} resizeMode="contain"
            source={require('../../../../resources/assets/plane/plane_calendar.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.rowCenter, { marginRight: 10 }]} activeOpacity={0.6}>
          <Text style={{ color: 'white' }}>后一天</Text>
          <Image style={[styles.arrowImg, { marginLeft: 10 }]} resizeMode="contain"
            source={require('../../../../resources/assets/common/arrow_next.png')} />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderCalendarNar()}
        <View style={{ height: window.heigh - 175, }}>
          <ListView
            contentContainerStyle={styles.contentContainer}
            dataSource={this.state.dataSource.cloneWithRows(this.props.flights)}
            renderRow={this.renderRow}
            enableEmptySections={true}
            renderSeparator={() => <Divider />} />
        </View>
        {this.renderBottomTab()}
        <FlightFilter
          visible={this.state.visible}
          onCancel={() => this.setFilterVisible(false)}
          onSubmit={(datas) => {
            console.log(JSON.stringify(datas));
            this.setFilterVisible(false);
          }}
          datas={this.props.airlines} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    width: window.width,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
  },
  calendar: {
    flexDirection: 'row',
    height: 45,
    backgroundColor: "#51a6f0",
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dateView: {
    backgroundColor: 'white',
    width: 160,
    height: 32,
    borderRadius: 3
  },
  arrowImg: {
    width: 7,
    height: 12,
  }
});

const select = store => ({
  flights: store.flight.list.flights,
  airlines: store.flight.list.airlines,
  status: store.flight.list.status,
})
export default connect(select)(FlightListPage);
