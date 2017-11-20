import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Text, Image, ImageBackground, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import SegmentedBar from '../../../../components/SegmentedBar';
import TabView from '../../../../components/TabView';
import Button from '../../../../components/Button';
import Divider from '../../../../components/Divider';
import window from '../../../../utils/window';
import RouteSelection from '../../../../components/RouteSelection';

// 机票搜索
class AirSearch extends Component {

  static propTypes = {
    onOriginClick: PropTypes.func,
    onDestinationClick: PropTypes.func,
    onQuery: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    }
  }

  renderAirTop() {
    return (
      <ImageBackground
        style={styles.imgAirTop}
        resizeMode="cover"
        source={require('../../../../../icons/ticketbg.png')}>
        <SegmentedBar indicatorPosition='top' style={{ width: 100 }} onChange={(index) => { this.setState({ index: index }) }}>
          <SegmentedBar.Item title='单程' />
          <SegmentedBar.Item title='往返' />
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
      <View>
        <Text style={styles.returnText} > </Text>
        <TouchableOpacity activeOpacity={0.5}>
          <Text style={styles.dateText}>2017-09-23 周四</Text>
        </TouchableOpacity>
        <Divider style={styles.divider} />
      </View>
    )
  }

  // 往返时间
  renderDoubleWayTime() {
    return (
      <View>
        <Text style={styles.returnText}>返程</Text>
        <View style={styles.timeContainer}>
          <TouchableOpacity activeOpacity={0.5}>
            <Text style={styles.dateText}>2017-09-23 周四</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5}>
            <Text style={styles.dateText}>2017-09-23 周四</Text>
          </TouchableOpacity>
        </View>
        <Divider style={styles.divider} />
      </View>
    )
  }

  // 致电咨询
  renderTakePhone() {
    return (
      <TouchableOpacity onPress={() => { Alert.alert('确认致电?') }}>
        <Text style={styles.phoneLink}>致电咨询</Text>
      </TouchableOpacity>
    );
  }

  renderBottomTab() {
    return (
      <TabView style={{ flex: 1 }} type='projector'>
        <TabView.Sheet
          type='button'
          title='航班动态'
          icon={require('../../../../../icons/flight_dynamics.png')}
          activeIcon={require('../../../../../icons/flight_dynamics.png')}
        />
        <TabView.Sheet
          type='button'
          title='机票订单'
          icon={require('../../../../../icons/flight_orderform.png')}
          activeIcon={require('../../../../../icons/flight_orderform.png')}
        />
      </TabView>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderAirTop()}
        <RouteSelection style={styles.routeSelect} />
        {this.renderTime()}
        <Button title='查询' onPress={this.props.onQuery} type='primary' style={styles.queryButton} />
        <Text style={styles.appText}>飞巴商旅</Text>
        {this.renderTakePhone()}
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
  imgReverse: {
    width: 80,
    height: 80,
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
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20
  },
  dateText: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 12
  },
  appText: {
    textAlign: 'center',
    marginTop: 12,
    color: '#90a7b9',
    fontSize: 12
  },
  routeSelect: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  returnText: {
    fontSize: 12,
    textAlign: 'right',
    marginRight: 20,
    marginTop: 10
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 20,
  }
});
export default AirSearch;