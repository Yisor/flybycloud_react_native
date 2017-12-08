import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Text, Image, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import SegmentedBar from '../../../../components/SegmentedBar';
import TabView from '../../../../components/TabView';
import Button from '../../../../components/Button';
import Divider from '../../../../components/Divider';
import window from '../../../../utils/window';
import RouteSelection from '../../../../components/RouteSelection';

// 机票搜索
class FlightMain extends Component {

  static propTypes = {
    onSelectCityStart: PropTypes.func,
    onSelectCityEnd: PropTypes.func,
    onSelectStartDate: PropTypes.func,
    onSelectBackDate: PropTypes.func,
    onQuery: PropTypes.func,
    onQueryGpticket: PropTypes.func,
    startCity: PropTypes.string,
    endCity: PropTypes.string,
    onExchange: PropTypes.func,
    startDate: PropTypes.string,
    endDate: PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    }
  }

  // 查询
  onQuery = () => {
    let { onQuery } = this.props;
    onQuery && onQuery();
  }

  // 政采查询
  onQueryGovernment = () => {
    let { onQueryGpticket } = this.props;
    onQueryGpticket && onQueryGpticket();
  }

  /** 
 * 根据日期字符串获取星期几 
 * @param dateString 日期字符串（如：2016-12-29）
 * @returns {String} 
 */
  getWeek(dateString) {
    let date;
    if (dateString) {
      let dateArray = dateString.split("-");
      date = new Date(dateArray[0], parseInt(dateArray[1] - 1), dateArray[2]);
    } else {
      date = new Date();
    }
    return "周" + "日一二三四五六".charAt(date.getDay());
  }

  getDateAndWeek(dateString) {
    return `${dateString} ${this.getWeek(dateString)}`;
  }

  renderAirTop() {
    return (
      <ImageBackground
        style={styles.imgAirTop}
        resizeMode="cover"
        source={require('../../../../resources/assets/plane/plane_head_bg.png')}>
        <SegmentedBar indicatorPosition='bottom' onChange={(index) => { this.setState({ index: index }) }}>
          <SegmentedBar.Item title='单程' />
          <SegmentedBar.Item title='往返' />
          <SegmentedBar.Item title='国际多程' />
        </SegmentedBar>
      </ImageBackground>

    );
  }

  // 出行时间
  renderTime() {
    return this.state.index == 0 ? this.renderOneWayTime() : this.renderDoubleWayTime();
  }

  // 单程时间
  renderOneWayTime() {
    return (
      <View style={{ marginTop: 19, marginBottom: 19 }}>
        <TouchableOpacity activeOpacity={0.5}>
          <Text ref="start_date" style={styles.dateText}>{this.getDateAndWeek(this.props.startDate)}</Text>
        </TouchableOpacity>
        <Divider style={styles.divider} />
      </View>
    )
  }

  // 往返时间
  renderDoubleWayTime() {
    return (
      <View style={{ marginTop: 19, marginBottom: 19 }}>
        <View style={styles.timeContainer}>
          <TouchableOpacity activeOpacity={0.5}>
            <Text style={styles.dateText}>{this.getDateAndWeek(this.props.startDate)}</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5}>
            <Text style={styles.dateText}>{this.getDateAndWeek(this.props.endDate)}</Text>
          </TouchableOpacity>
        </View>
        <Divider style={styles.divider} />
      </View>
    )
  }

  renderBottomTab() {
    return (
      <TabView barStyle={{ backgroundColor: 'white' }} type='projector'>
        <TabView.Sheet
          type='button'
          title='航班动态'
          icon={require('../../../../resources/assets/plane/plane_dynamics.png')}
          activeIcon={require('../../../../resources/assets/plane/plane_dynamics.png')}
        />
        <TabView.Sheet
          type='button'
          title='机票订单'
          icon={require('../../../../resources/assets/plane/plane_orderForm.png')}
          activeIcon={require('../../../../resources/assets/plane/plane_orderForm.png')}
        />
      </TabView>
    );
  }

  // 查询表单
  renderMainContent() {
    return (
      <View style={{ backgroundColor: 'white' }}>
        <RouteSelection
          startCity={this.props.startCity}
          endCity={this.props.endCity}
          onSelectCityStart={this.props.onSelectCityStart}
          onSelectCityEnd={this.props.onSelectCityEnd}
          onExchange={this.props.onExchange}
          style={styles.routeSelect} />
        {this.renderTime()}
        <View style={{ flexDirection: 'row', margin: 20 }}>
          <Button type='primary' title='查询' onPress={this.onQuery} style={styles.queryButton} titleStyle={{ color: 'white' }} />
          <Button type='primary' title='政采' onPress={this.onQueryGovernment} style={styles.govQueryBtn} titleStyle={{ color: 'white' }} />
        </View>
      </View>
    )
  }

  renderExtra() {
    return (
      <View style={styles.extraContainer}>
        <Text style={styles.appText}>机票服务由萧山票务公司提供</Text>
        <TouchableOpacity onPress={() => { Alert.alert('确认致电?') }}>
          <Text style={styles.phoneLink}>致电咨询</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ flex: 1 }} >
          {this.renderAirTop()}
          {this.renderMainContent()}
          {this.renderExtra()}
        </ScrollView>
        {this.renderBottomTab()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgAirTop: {
    width: window.width,
    height: 170,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  divider: {
    backgroundColor: 'gray',
    marginLeft: 20,
    marginRight: 20
  },
  phoneLink: {
    textAlign: 'center',
    marginTop: 10,
    color: '#74b8f3',
    fontSize: 12,
    textDecorationLine: 'underline'
  },
  queryButton: {
    flex: 1,
    height: 44,
    marginRight: 10,
    backgroundColor: "#51a6f0",
    borderColor: '#51a6f0'
  },
  govQueryBtn: {
    width: 80,
    backgroundColor: "#f0b051",
    borderColor: "#f0b051"
  },
  dateText: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 18,
    color: "#323b43"
  },
  appText: {
    textAlign: 'center',
    marginTop: 12,
    color: '#90a7b9',
    fontSize: 12
  },
  routeSelect: {
    marginTop: 18,
    marginLeft: 20,
    marginRight: 20,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 20,
  },
  extraContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
export default FlightMain;